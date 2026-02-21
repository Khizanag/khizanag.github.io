(function (App) {
    'use strict';

    var s = App.state;
    var dom = App.dom;

    // ---- Live session state ----

    App.live = {
        code: null,
        role: null,       // 'host', 'candidate', 'spectator'
        status: null,      // 'lobby', 'active', 'ended'
        unsubscribe: null,
        syncInterval: null,
        timerInterval: null,
        localRemaining: 0,
        syncTimer: null,
        participantUid: null,
    };

    // ---- Query helpers ----

    App.isLiveSession = function () {
        return !!App.live.code;
    };

    App.isLiveHost = function () {
        return App.live.role === 'host';
    };

    // ---- Create live session ----

    App.createLiveSession = function () {
        if (!FirebaseService.isCloudAvailable()) {
            alert('Please sign in to create a live session.');
            return;
        }

        var config = {
            platform: s.platform || 'ios',
            topics: s.selectedTopics.slice(),
            intervieweeName: s.intervieweeName,
            interviewerName: s.interviewerName,
            timeLimitMin: s.timeLimitMin,
            phases: s.phases ? s.phases.slice() : [],
        };

        FirebaseService.createLiveSession(config).then(function (code) {
            App.live.code = code;
            App.live.role = 'host';
            App.live.status = 'lobby';
            App.live.participantUid = FirebaseService.currentUser.uid;
            showLobby(code, config, true);
            startListening(code);
        }).catch(function (err) {
            alert('Failed to create session: ' + err.message);
        });
    };

    // ---- Join live session ----

    App.joinLiveSession = function (code, name, role) {
        code = code.toUpperCase().trim();
        if (code.length !== 6) {
            showJoinError('Please enter a valid 6-character code.');
            return;
        }

        var joinBtn = document.getElementById('btnJoinSubmit');
        if (joinBtn) joinBtn.disabled = true;

        FirebaseService.joinLiveSession(code, name, role).then(function (result) {
            App.live.code = code;
            App.live.role = role;
            App.live.status = result.data.status;
            App.live.participantUid = FirebaseService.currentUser
                ? FirebaseService.currentUser.uid
                : ('guest-' + Date.now());

            document.getElementById('modalJoin').style.display = 'none';

            if (result.data.status === 'active') {
                enterActiveSession(result.data);
            } else {
                showLobby(code, result.data.config, false);
            }
            startListening(code);
        }).catch(function (err) {
            showJoinError(err.message);
            if (joinBtn) joinBtn.disabled = false;
        });
    };

    // ---- Lobby rendering ----

    function showLobby(code, config, isHost) {
        document.getElementById('lobbyCode').textContent = code;
        renderLobbyConfig(config);

        var actions = document.getElementById('lobbyActions');
        var waiting = document.getElementById('lobbyWaiting');
        if (isHost) {
            actions.style.display = '';
            waiting.style.display = 'none';
            document.getElementById('lobbySubtitle').textContent = 'Share the code with participants to join.';
        } else {
            actions.style.display = 'none';
            waiting.style.display = '';
            document.getElementById('lobbySubtitle').textContent = 'Waiting for the host to start the interview...';
        }

        App.showScreen('screen-lobby');
    }

    function renderLobbyConfig(config) {
        var rows = document.getElementById('lobbyConfigRows');
        var html = '';
        var platformLabel = config.platform ? config.platform.charAt(0).toUpperCase() + config.platform.slice(1) : 'iOS';
        html += '<div class="lobby__config-row"><span class="lobby__config-key">Platform</span><span class="lobby__config-value">' + escapeHtml(platformLabel) + '</span></div>';
        if (config.intervieweeName) {
            html += '<div class="lobby__config-row"><span class="lobby__config-key">Candidate</span><span class="lobby__config-value">' + escapeHtml(config.intervieweeName) + '</span></div>';
        }
        html += '<div class="lobby__config-row"><span class="lobby__config-key">Duration</span><span class="lobby__config-value">' + (config.timeLimitMin || 60) + ' min</span></div>';
        if (config.topics) {
            html += '<div class="lobby__config-row"><span class="lobby__config-key">Topics</span><span class="lobby__config-value">' + config.topics.length + ' selected</span></div>';
        }
        rows.innerHTML = html;
    }

    function renderLobbyParticipants(participants) {
        var list = document.getElementById('lobbyParticipantList');
        if (!participants) { list.innerHTML = ''; return; }

        var html = '';
        var uids = Object.keys(participants);
        uids.forEach(function (uid) {
            var p = participants[uid];
            var initial = (p.name || '?').charAt(0).toUpperCase();
            var avatarContent = p.photoURL
                ? '<img src="' + escapeHtml(p.photoURL) + '" alt="">'
                : initial;
            var badgeClass = 'lobby__badge lobby__badge--' + (p.role || 'spectator');
            var roleLabel = (p.role || 'spectator').charAt(0).toUpperCase() + (p.role || 'spectator').slice(1);

            html += '<div class="lobby__participant">' +
                '<div class="lobby__participant-avatar">' + avatarContent + '</div>' +
                '<span class="lobby__participant-name">' + escapeHtml(p.name || 'Anonymous') + '</span>' +
                '<span class="' + badgeClass + '">' + roleLabel + '</span>' +
                '</div>';
        });
        list.innerHTML = html;

        // Update live indicator count
        var countEl = document.getElementById('liveParticipantCount');
        if (countEl) countEl.textContent = uids.length;
    }

    // ---- Listener ----

    function startListening(code) {
        if (App.live.unsubscribe) App.live.unsubscribe();
        App.live.unsubscribe = FirebaseService.subscribeLiveSession(code, onSessionUpdate);
    }

    function onSessionUpdate(data) {
        if (!data) return;

        renderLobbyParticipants(data.participants);

        var prevStatus = App.live.status;
        App.live.status = data.status;

        // Status transitions
        if (prevStatus === 'lobby' && data.status === 'active') {
            enterActiveSession(data);
        } else if (data.status === 'ended' && prevStatus !== 'ended') {
            onSessionEnded(data);
        } else if (data.status === 'active' && !App.isLiveHost()) {
            applyRemoteLiveState(data.live);
        }

        // Session deleted/cancelled
        if (data.status === 'lobby' && prevStatus === 'lobby') {
            // Still in lobby, just update participants
        }
    }

    // ---- Enter active session ----

    function enterActiveSession(data) {
        App.live.status = 'active';

        // Show live indicator
        var indicator = document.getElementById('liveIndicator');
        if (indicator) indicator.classList.add('is-active');

        if (App.isLiveHost()) {
            // Host starts normal interview flow — sync state periodically
            startHostSync();
        } else {
            // Participant enters role-specific view
            applyRoleCSS(App.live.role);
            setupParticipantView(data);
        }
    }

    function applyRoleCSS(role) {
        document.documentElement.classList.remove('is-live-candidate', 'is-live-spectator');
        if (role === 'candidate') {
            document.documentElement.classList.add('is-live-candidate');
        } else if (role === 'spectator') {
            document.documentElement.classList.add('is-live-spectator');
        }
    }

    function setupParticipantView(data) {
        var config = data.config || {};

        // Set basic state from config
        s.intervieweeName = config.intervieweeName || '';
        s.interviewerName = config.interviewerName || '';
        s.selectedTopics = config.topics || [];
        s.timeLimitMin = config.timeLimitMin || 60;
        s.phases = config.phases || [];

        // Initialize session state
        s.currentQ = 0;
        s.currentRating = 0;
        s.ratings = [];
        s.sessionQuestions = [];

        var d = App.dom;
        if (d.qInterviewee) d.qInterviewee.textContent = s.intervieweeName;

        App.showScreen('screen-question');

        // Apply the current live state if available
        if (data.live && data.live.questionText) {
            applyRemoteLiveState(data.live);
        }
    }

    // ---- Host sync ----

    var syncDebounceTimer = null;

    App.syncLiveState = function () {
        if (!App.isLiveSession() || !App.isLiveHost()) return;
        if (syncDebounceTimer) clearTimeout(syncDebounceTimer);
        syncDebounceTimer = setTimeout(doSyncLiveState, 300);
    };

    function doSyncLiveState() {
        if (!App.isLiveSession() || !App.isLiveHost()) return;
        var d = App.dom;
        var q = s.sessionQuestions[s.currentQ];

        var liveState = {
            currentQ: s.currentQ,
            phaseId: App.getCurrentPhaseId ? App.getCurrentPhaseId() : null,
            questionText: q ? q.question : '',
            questionTopic: q ? q.topic : '',
            questionLevel: q ? q.level : 0,
            questionCode: q ? (q.code || '') : '',
            questionHint: q ? (q.hint || '') : '',
            questionAnswer: q ? (q.answer || '') : '',
            remainingSeconds: s.remainingSeconds || 0,
            timerRunning: !!s.timerInterval && !s.timerPaused,
            currentRating: s.currentRating || 0,
            totalRated: s.ratings.length,
            hintRevealed: d.hintReveal ? d.hintReveal.classList.contains('is-open') : false,
            answerRevealed: d.answerReveal ? d.answerReveal.classList.contains('is-open') : false,
            ratings: s.ratings.slice(),
            sessionQuestions: s.sessionQuestions.map(function (sq) {
                return {
                    question: sq.question,
                    topic: sq.topic,
                    level: sq.level,
                    code: sq.code || '',
                    hint: sq.hint || '',
                    answer: sq.answer || '',
                    skipped: sq.skipped || false,
                    notes: sq.notes || '',
                    _timeSpent: sq._timeSpent || 0,
                    _liveCoding: sq._liveCoding || false,
                };
            }),
            timestamp: Date.now(),
        };

        FirebaseService.updateLiveState(App.live.code, liveState);
    }

    function startHostSync() {
        if (App.live.syncInterval) clearInterval(App.live.syncInterval);
        App.live.syncInterval = setInterval(function () {
            doSyncLiveState();
        }, 5000);
        // Initial sync
        doSyncLiveState();
    }

    // ---- Participant state application ----

    function applyRemoteLiveState(remote) {
        if (!remote || App.isLiveHost()) return;
        var d = App.dom;

        // Update question display
        if (d.qText) d.qText.textContent = remote.questionText || '';
        if (d.qTopic) {
            var isCode = remote.questionTopic === 'code-challenge';
            d.qTopic.textContent = isCode ? 'CODE CHALLENGE' : (remote.questionTopic || '').toUpperCase();
            d.qTopic.className = 'q-card__topic' + (isCode ? ' q-card__topic--code' : '');
        }
        if (d.qLevel && remote.questionLevel !== undefined) {
            d.qLevel.textContent = App.LEVEL_LABELS[remote.questionLevel] || '';
            d.qLevel.className = 'q-card__level q-card__level--' + (App.LEVEL_NAMES[remote.questionLevel] || 'junior');
        }

        // Code block
        if (d.qCodeWrap && d.qCode) {
            if (remote.questionCode) {
                d.qCode.innerHTML = App.highlightSwift ? App.highlightSwift(remote.questionCode) : escapeHtml(remote.questionCode);
                d.qCodeWrap.style.display = '';
            } else {
                d.qCodeWrap.style.display = 'none';
            }
        }

        // Hints & answers (spectator only)
        if (App.live.role === 'spectator') {
            if (d.qHint) d.qHint.textContent = remote.questionHint || '';
            if (d.qAnswer) d.qAnswer.textContent = remote.questionAnswer || '';
            if (d.hintReveal) d.hintReveal.classList.toggle('is-open', !!remote.hintRevealed);
            if (d.answerReveal) d.answerReveal.classList.toggle('is-open', !!remote.answerRevealed);

            // Rating stars (read-only for spectator)
            if (d.allStars && remote.currentRating !== undefined) {
                d.allStars.forEach(function (star, i) {
                    star.classList.toggle('is-active', i < remote.currentRating);
                });
            }
            if (d.ratingDesc) {
                d.ratingDesc.textContent = remote.currentRating > 0
                    ? App.RATING_LABELS[remote.currentRating]
                    : '';
            }
        }

        // Progress text
        if (d.progressText) d.progressText.textContent = 'Q' + ((remote.currentQ || 0) + 1);

        // Progress bar
        if (d.progressFill && remote.remainingSeconds !== undefined) {
            var total = s.timeLimitMin * 60;
            var elapsed = total - remote.remainingSeconds;
            d.progressFill.style.width = Math.min((elapsed / total) * 100, 100) + '%';
        }

        // Timer interpolation
        startTimerInterpolation(
            remote.remainingSeconds || 0,
            remote.timerRunning,
            remote.timestamp
        );
    }

    // ---- Timer interpolation for participants ----

    function startTimerInterpolation(remaining, isRunning, timestamp) {
        if (App.live.timerInterval) clearInterval(App.live.timerInterval);

        // Calculate lag
        var lag = timestamp ? Math.max(0, Math.floor((Date.now() - timestamp) / 1000)) : 0;
        App.live.localRemaining = Math.max(0, remaining - (isRunning ? lag : 0));

        var d = App.dom;
        if (d.qTimer) d.qTimer.style.display = '';
        updateParticipantTimer();

        if (isRunning && App.live.localRemaining > 0) {
            App.live.timerInterval = setInterval(function () {
                App.live.localRemaining = Math.max(0, App.live.localRemaining - 1);
                updateParticipantTimer();
                if (App.live.localRemaining <= 0) {
                    clearInterval(App.live.timerInterval);
                }
            }, 1000);
        }
    }

    function updateParticipantTimer() {
        var d = App.dom;
        if (d.timerText) {
            d.timerText.textContent = App.formatTime(App.live.localRemaining);
        }

        // Timer warning/danger classes
        if (d.qTimer) {
            var total = s.timeLimitMin * 60;
            d.qTimer.classList.remove('is-warning', 'is-danger');
            if (App.live.localRemaining <= 60) {
                d.qTimer.classList.add('is-danger');
            } else if (App.live.localRemaining <= total * 0.2) {
                d.qTimer.classList.add('is-warning');
            }
        }
    }

    // ---- Session ended ----

    function onSessionEnded(data) {
        if (App.isLiveHost()) return; // Host handles results normally

        if (data.results) {
            showParticipantResults(data.results, App.live.role);
        } else {
            alert('The interview has ended.');
            cleanupLive();
            App.showScreen('screen-setup');
        }
    }

    function showParticipantResults(results, role) {
        var d = App.dom;

        // Set basic result info
        if (results.avg !== undefined) {
            var levelIndex = App.getLevelIndex(results.avg);
            document.getElementById('levelEmoji').textContent = App.LEVEL_EMOJIS[levelIndex];
            document.getElementById('levelName').textContent = App.LEVEL_LABELS[levelIndex];
            document.getElementById('levelName').style.color = App.LEVEL_COLORS[levelIndex];
            document.getElementById('resultsSubtitle').textContent = App.LEVEL_DESCS[levelIndex];

            var ring = document.getElementById('levelRing');
            var pct = Math.round((results.avg / 5) * 100);
            ring.style.setProperty('--ring-color', App.LEVEL_COLORS[levelIndex]);
            ring.style.setProperty('--ring-pct', pct);

            document.getElementById('statAvg').textContent = results.avg.toFixed(1);
        }

        if (results.ratedCount !== undefined) {
            var totalText = results.ratedCount + '';
            if (results.skippedCount > 0) totalText += ' (' + results.skippedCount + ' skipped)';
            document.getElementById('statTotal').textContent = totalText;
        }

        if (d.resultsInterviewee) {
            d.resultsInterviewee.textContent = s.intervieweeName + ' — interviewed by ' + s.interviewerName;
        }

        // For spectators, render full breakdown
        if (role === 'spectator' && results.questions) {
            var list = document.getElementById('breakdownList');
            list.innerHTML = '';
            results.questions.forEach(function (q, i) {
                var row = document.createElement('div');
                row.className = 'results__row' + (q.skipped ? ' results__row--skipped' : '');
                if (q.skipped) {
                    row.innerHTML = '<span class="results__row-num">' + (i + 1) + '</span>' +
                        '<span class="results__row-q">' + escapeHtml(q.question) + '</span>' +
                        '<span class="results__row-badge">Skipped</span>';
                } else {
                    var stars = '';
                    for (var st = 1; st <= 5; st++) {
                        var cls = st <= q.rating ? 'results__row-star--filled' : 'results__row-star--empty';
                        stars += '<svg class="results__row-star ' + cls + '" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
                    }
                    row.innerHTML = '<span class="results__row-num">' + (i + 1) + '</span>' +
                        '<span class="results__row-q">' + escapeHtml(q.question) + '</span>' +
                        '<span class="results__row-stars">' + stars + '</span>';
                }
                list.appendChild(row);
            });
        }

        // Topic stats for spectators
        if (role === 'spectator' && results.topicStats) {
            var container = document.getElementById('topicBreakdown');
            container.innerHTML = '';
            var keys = Object.keys(results.topicStats);
            keys.forEach(function (key) {
                var t = results.topicStats[key];
                var avg = t.total / t.count;
                var label = App.TOPIC_LABELS[key] || key;
                var lvlIdx = App.getLevelIndex(avg);
                var pctTopic = Math.round((avg / 5) * 100);
                var row = document.createElement('div');
                row.className = 'results__topic-row';
                row.innerHTML =
                    '<div class="results__topic-info">' +
                        '<span class="results__topic-name">' + escapeHtml(label) + '</span>' +
                        '<span class="results__topic-meta">' + t.count + 'q · ' + avg.toFixed(1) + ' avg · ' + escapeHtml(App.LEVEL_LABELS[lvlIdx]) + '</span>' +
                    '</div>' +
                    '<div class="results__topic-bar">' +
                        '<div class="results__topic-fill" style="width:' + pctTopic + '%;background:' + App.LEVEL_COLORS[lvlIdx] + '"></div>' +
                    '</div>';
                container.appendChild(row);
            });
        }

        // Notes for spectators
        if (role === 'spectator' && results.notes) {
            var introNE = document.getElementById('resultsIntroNotes');
            var wrapupNE = document.getElementById('resultsWrapupNotes');
            if (results.notes.intro) {
                introNE.style.display = '';
                document.getElementById('resultsIntroText').textContent = results.notes.intro;
            } else {
                introNE.style.display = 'none';
            }
            if (results.notes.wrapup) {
                wrapupNE.style.display = '';
                document.getElementById('resultsWrapupText').textContent = results.notes.wrapup;
            } else {
                wrapupNE.style.display = 'none';
            }
        }

        // Candidate minimal: just show level + avg + question count
        document.getElementById('statTopics').textContent = results.topicStats
            ? Object.keys(results.topicStats).length
            : '—';

        // Hide restart button for participants — show "Back to Setup"
        var restartBtn = document.getElementById('btnRestart');
        if (restartBtn) restartBtn.textContent = 'Back to Setup';

        App.showScreen('screen-results');
    }

    // ---- Cleanup ----

    function cleanupLive() {
        if (App.live.unsubscribe) {
            App.live.unsubscribe();
            App.live.unsubscribe = null;
        }
        if (App.live.syncInterval) {
            clearInterval(App.live.syncInterval);
            App.live.syncInterval = null;
        }
        if (App.live.timerInterval) {
            clearInterval(App.live.timerInterval);
            App.live.timerInterval = null;
        }
        if (syncDebounceTimer) {
            clearTimeout(syncDebounceTimer);
            syncDebounceTimer = null;
        }

        // Remove role CSS classes
        document.documentElement.classList.remove('is-live-candidate', 'is-live-spectator');

        // Hide live indicator
        var indicator = document.getElementById('liveIndicator');
        if (indicator) indicator.classList.remove('is-active');

        App.live.code = null;
        App.live.role = null;
        App.live.status = null;
        App.live.participantUid = null;
    }

    App.cleanupLive = cleanupLive;

    // ---- Cancel / Leave ----

    App.cancelLiveSession = function () {
        if (!App.live.code) return;
        if (App.isLiveHost()) {
            FirebaseService.deleteLiveSession(App.live.code);
        } else {
            FirebaseService.leaveLiveSession(App.live.code);
        }
        cleanupLive();
        App.showScreen('screen-setup');
    };

    // ---- Helpers ----

    function escapeHtml(text) {
        if (!text) return '';
        return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function showJoinError(msg) {
        var el = document.getElementById('joinError');
        if (el) {
            el.textContent = msg;
            el.classList.add('is-visible');
        }
    }

})(InterviewApp);
