(function (App) {
    'use strict';

    var s = App.state;
    var dom = App.dom;
    var INTERVIEWER_KEY = 'ios-interview-interviewer';
    var FAVORITES_KEY = 'ios-interview-favorites';
    var BLACKLIST_KEY = 'ios-interview-blacklist';

    function loadSet(key) {
        try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : []; }
        catch (e) { return []; }
    }
    function saveSet(key, arr) {
        try { localStorage.setItem(key, JSON.stringify(arr)); } catch (e) { /* */ }
    }
    function toggleInSet(key, qId) {
        var arr = loadSet(key);
        var idx = arr.indexOf(qId);
        if (idx === -1) arr.push(qId); else arr.splice(idx, 1);
        saveSet(key, arr);
        return idx === -1;
    }
    function questionId(q) {
        return q.topic + '::' + q.question.substring(0, 80);
    }

    // ===========================================================
    //  DOM REFS
    // ===========================================================

    function initDom() {
        var d = App.dom;

        // Setup
        d.topicGrid = document.getElementById('topicGrid');
        d.btnStart = document.getElementById('btnStart');
        d.validationHint = document.getElementById('validationHint');
        d.interviewerInput = document.getElementById('interviewerInput');
        d.nameInput = document.getElementById('nameInput');
        d.btnToggleAll = document.getElementById('btnToggleAll');
        d.btnFoldTopics = document.getElementById('btnFoldTopics');
        d.topicFoldBody = document.getElementById('topicFoldBody');
        d.topicSummary = document.getElementById('topicSummary');
        d.allChips = Array.prototype.slice.call(d.topicGrid.querySelectorAll('.topic-chip'));

        // Question
        d.progressFill = document.getElementById('progressFill');
        d.progressText = document.getElementById('progressText');
        d.qTimer = document.getElementById('qTimer');
        d.timerText = document.getElementById('timerText');
        d.qInterviewee = document.getElementById('qInterviewee');
        d.qTopic = document.getElementById('qTopic');
        d.qLevel = document.getElementById('qLevel');
        d.qText = document.getElementById('qText');
        d.qHint = document.getElementById('qHint');
        d.qAnswer = document.getElementById('qAnswer');
        d.qCodeWrap = document.getElementById('qCodeWrap');
        d.qCode = document.getElementById('qCode');
        d.btnHint = document.getElementById('btnHint');
        d.btnAnswer = document.getElementById('btnAnswer');
        d.hintReveal = document.getElementById('hintReveal');
        d.answerReveal = document.getElementById('answerReveal');
        d.ratingStars = document.getElementById('ratingStars');
        d.ratingDesc = document.getElementById('ratingDesc');
        d.btnNext = document.getElementById('btnNext');
        d.btnSkip = document.getElementById('btnSkip');
        d.btnPrev = document.getElementById('btnPrev');
        d.btnEnd = document.getElementById('btnEnd');
        d.btnPause = document.getElementById('btnPause');
        d.btnFullscreen = document.getElementById('btnFullscreen');
        d.btnPresenter = document.getElementById('btnPresenter');
        d.btnPopout = document.getElementById('btnPopout');
        d.btnSkipSection = document.getElementById('btnSkipSection');
        d.btnSkipIntro = document.getElementById('btnSkipIntro');
        d.qIntro = document.getElementById('qIntro');
        d.qWrapup = document.getElementById('qWrapup');
        d.qLiveCoding = document.getElementById('qLiveCoding');
        d.btnFinish = document.getElementById('btnFinish');
        d.introNotes = document.getElementById('introNotes');
        d.wrapupNotes = document.getElementById('wrapupNotes');
        d.qCard = document.querySelector('.q-card');
        d.qNote = document.getElementById('qNote');
        d.qRating = document.querySelector('.rating');
        d.allStars = Array.prototype.slice.call(d.ratingStars.querySelectorAll('.rating__star'));

        // Favorite / Blacklist
        d.btnFav = document.getElementById('btnFav');
        d.btnBlacklist = document.getElementById('btnBlacklist');

        // Report question
        d.btnReport = document.getElementById('btnReport');
        d.modalReport = document.getElementById('modalReport');
        d.reportMeta = document.getElementById('reportMeta');
        d.reportCategory = document.getElementById('reportCategory');
        d.reportDetails = document.getElementById('reportDetails');
        d.btnReportSend = document.getElementById('btnReportSend');
        d.btnReportCancel = document.getElementById('btnReportCancel');

        // Plan & Phases
        d.planList = document.getElementById('planList');
        d.planTotal = document.getElementById('planTotal');
        d.qPhases = document.getElementById('qPhases');

        // Results
        d.resultsInterviewee = document.getElementById('resultsInterviewee');
        d.btnDownload = document.getElementById('btnDownload');

        // Feedback
        d.btnFeedback = document.getElementById('btnFeedback');
        d.modalFeedback = document.getElementById('modalFeedback');
        d.feedbackCategory = document.getElementById('feedbackCategory');
        d.feedbackRating = document.getElementById('feedbackRating');
        d.feedbackDetails = document.getElementById('feedbackDetails');
        d.btnFeedbackSend = document.getElementById('btnFeedbackSend');
        d.btnFeedbackCancel = document.getElementById('btnFeedbackCancel');
        d.feedbackRatingBtns = Array.prototype.slice.call(d.feedbackRating.querySelectorAll('.modal__rating-btn'));

        // Phase toast
        d.phaseToast = document.getElementById('phaseToast');
        d.phaseToastIcon = document.getElementById('phaseToastIcon');
        d.phaseToastTitle = document.getElementById('phaseToastTitle');
        d.phaseToastDetail = document.getElementById('phaseToastDetail');

        // Live Coding
        d.lcTopic = document.getElementById('lcTopic');
        d.lcDifficulty = document.getElementById('lcDifficulty');
        d.lcCounter = document.getElementById('lcCounter');
        d.lcTitle = document.getElementById('lcTitle');
        d.lcDescription = document.getElementById('lcDescription');
        d.lcHintButtons = document.getElementById('lcHintButtons');
        d.lcHintContent = document.getElementById('lcHintContent');
        d.btnLcSolution = document.getElementById('btnLcSolution');
        d.lcSolutionContent = document.getElementById('lcSolutionContent');
        d.lcComplexity = document.getElementById('lcComplexity');
        d.lcCode = document.getElementById('lcCode');
        d.lcExplanation = document.getElementById('lcExplanation');
    }

    // ===========================================================
    //  SCREEN TRANSITIONS
    // ===========================================================

    App.showScreen = function (id) {
        document.querySelectorAll('.screen').forEach(function (screen) {
            screen.classList.remove('is-active');
        });
        document.getElementById(id).classList.add('is-active');
        window.scrollTo(0, 0);
    };

    // ===========================================================
    //  PHASE-AWARE DISPLAY
    // ===========================================================

    var prevPhaseId = null;
    var phaseQuestionStart = 0;
    var phaseRatingStart = 0;

    var PHASE_ICONS = {
        intro: '👋',
        theory: '📖',
        code: '💻',
        live: '🧑‍💻',
        wrapup: '🏁'
    };

    var toastTimer = null;

    function showPhaseToast(fromPhaseId, toPhaseId) {
        if (!fromPhaseId || !s.phases) return;

        var fromName = '';
        var toName = '';
        for (var i = 0; i < s.phases.length; i++) {
            if (s.phases[i].id === fromPhaseId) fromName = s.phases[i].name;
            if (s.phases[i].id === toPhaseId) toName = s.phases[i].name;
        }
        if (!fromName) return;

        var questionsInPhase = s.ratings.length - phaseRatingStart;
        var icon = PHASE_ICONS[toPhaseId] || '➡️';
        var title = fromName + ' completed';
        var detail = '';

        if (fromPhaseId === 'intro') {
            detail = 'Moving to ' + toName;
        } else if (fromPhaseId === 'wrapup') {
            detail = 'Finishing interview';
        } else if (questionsInPhase > 0) {
            var sum = 0;
            for (var r = phaseRatingStart; r < s.ratings.length; r++) {
                sum += s.ratings[r];
            }
            var avg = (sum / questionsInPhase).toFixed(1);
            detail = questionsInPhase + ' question' + (questionsInPhase !== 1 ? 's' : '') +
                ' rated, avg ' + avg + '/5';
            if (toName) detail += ' — Moving to ' + toName;
        } else {
            detail = 'No questions rated';
            if (toName) detail += ' — Moving to ' + toName;
        }

        dom.phaseToastIcon.textContent = icon;
        dom.phaseToastTitle.textContent = title;
        dom.phaseToastDetail.textContent = detail;

        // Announce phase transition to screen readers
        App.announce(title + '. ' + detail);

        if (toastTimer) clearTimeout(toastTimer);
        dom.phaseToast.classList.add('is-visible');
        toastTimer = setTimeout(function () {
            dom.phaseToast.classList.remove('is-visible');
        }, 3500);

        phaseQuestionStart = s.currentQ;
        phaseRatingStart = s.ratings.length;
    }

    App.updatePhaseUI = function () {
        var phaseId = App.getCurrentPhaseId ? App.getCurrentPhaseId() : null;
        var isIntro = phaseId === 'intro';
        var isWrapup = phaseId === 'wrapup';
        var isLive = phaseId === 'live';
        var isNonQuestionOverlay = isIntro || isWrapup;
        var isLast = App.isLastPhase ? App.isLastPhase() : true;

        // Detect phase transitions
        // Set prevPhaseId BEFORE displayQuestion to prevent infinite recursion
        // (displayQuestion -> updatePhaseUI -> displayQuestion ...)
        var oldPhase = prevPhaseId;
        var phaseChanged = phaseId && oldPhase && phaseId !== oldPhase;
        var enteringLive = isLive && oldPhase !== 'live';
        prevPhaseId = phaseId;

        if (phaseChanged) {
            showPhaseToast(oldPhase, phaseId);
        }

        if (enteringLive) {
            var lcQ = pickLiveCodingQuestion(1);
            if (lcQ) {
                if (s.currentRating > 0) {
                    s.ratings.push(s.currentRating);
                    s.currentQ++;
                    s.sessionQuestions.push(lcQ);
                } else if (s.sessionQuestions.length > 0) {
                    s.sessionQuestions[s.currentQ] = lcQ;
                } else {
                    s.sessionQuestions.push(lcQ);
                }
                App.displayQuestion(s.currentQ);
            }
        }

        dom.qIntro.style.display = isIntro ? '' : 'none';
        dom.qWrapup.style.display = isWrapup ? '' : 'none';
        dom.qLiveCoding.style.display = isLive ? '' : 'none';
        dom.qCard.style.display = (isNonQuestionOverlay || isLive) ? 'none' : '';
        dom.qNote.style.display = isNonQuestionOverlay ? 'none' : '';
        dom.qRating.style.display = isNonQuestionOverlay ? 'none' : '';

        // Show skip section button when not on last phase
        dom.btnSkipSection.style.display = !isLast ? '' : 'none';
    };

    // ===========================================================
    //  QUESTION DISPLAY
    // ===========================================================

    // ===========================================================
    //  LIVE CODING DISPLAY
    // ===========================================================

    function displayLiveCodingQuestion(q) {
        var lc = q._lcData;
        s.lcHintsRevealed = q._lcHintsRevealed || 0;

        // Topic & difficulty badges
        dom.lcTopic.textContent = lc.topic.toUpperCase().replace(/-/g, ' ');
        dom.lcDifficulty.textContent = lc.difficulty.charAt(0).toUpperCase() + lc.difficulty.slice(1);
        dom.lcDifficulty.className = 'lc-card__difficulty lc-card__difficulty--' + lc.difficulty;

        // Counter
        var lcCount = s.sessionQuestions.filter(function (sq) { return sq._liveCoding; }).length;
        dom.lcCounter.textContent = 'Problem ' + lcCount;

        // Title & description
        dom.lcTitle.textContent = lc.title;
        dom.lcDescription.textContent = lc.question;

        // Progressive hint buttons
        dom.lcHintButtons.innerHTML = '';
        dom.lcHintContent.innerHTML = '';
        for (var i = 0; i < lc.hints.length; i++) {
            var btn = document.createElement('button');
            btn.className = 'lc-hints__btn';
            btn.textContent = i + 1;
            btn.dataset.index = i;
            btn.addEventListener('click', (function (idx) {
                return function () { revealLcHint(idx); };
            })(i));
            dom.lcHintButtons.appendChild(btn);
        }

        // Complexity
        dom.lcComplexity.innerHTML =
            '<span class="lc-complexity-pill lc-complexity-pill--time">' +
                '<span class="lc-complexity-pill__label">Time</span> ' + escapeHtml(lc.timeComplexity) +
            '</span>' +
            '<span class="lc-complexity-pill lc-complexity-pill--space">' +
                '<span class="lc-complexity-pill__label">Space</span> ' + escapeHtml(lc.spaceComplexity) +
            '</span>';

        // Solution code
        dom.lcCode.innerHTML = App.highlightSwift(lc.solution);
        dom.lcExplanation.textContent = lc.explanation;

        // Reset solution reveal
        dom.lcSolutionContent.classList.remove('is-open');
        dom.btnLcSolution.innerHTML =
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Show Solution';
    }

    function revealLcHint(index) {
        var q = s.sessionQuestions[s.currentQ];
        if (!q || !q._liveCoding) return;
        var lc = q._lcData;

        // Reveal up to and including the clicked index
        s.lcHintsRevealed = Math.max(s.lcHintsRevealed, index + 1);
        q._lcHintsRevealed = s.lcHintsRevealed;

        // Update buttons
        var btns = dom.lcHintButtons.querySelectorAll('.lc-hints__btn');
        for (var i = 0; i < btns.length; i++) {
            btns[i].classList.toggle('is-active', i < s.lcHintsRevealed);
        }

        // Show hints
        dom.lcHintContent.innerHTML = '';
        for (var j = 0; j < s.lcHintsRevealed && j < lc.hints.length; j++) {
            var div = document.createElement('div');
            div.className = 'lc-hint-item';
            div.textContent = lc.hints[j];
            dom.lcHintContent.appendChild(div);
        }
        App.saveSession();
    }

    var escapeHtml = InterviewUtils.escapeHtml;
    App.escapeHtml = escapeHtml;

    // ===========================================================
    //  PER-QUESTION TIMER
    // ===========================================================

    var questionStartTime = null;
    var questionTimerInterval = null;

    function startQuestionTimer() {
        questionStartTime = Date.now();
        clearInterval(questionTimerInterval);
        var el = document.getElementById('qQuestionTimer');
        if (!el) return;
        el.textContent = '0:00';
        el.style.display = '';
        questionTimerInterval = setInterval(function () {
            if (!questionStartTime) return;
            var sec = Math.floor((Date.now() - questionStartTime) / 1000);
            var m = Math.floor(sec / 60);
            var ss = sec % 60;
            el.textContent = m + ':' + (ss < 10 ? '0' : '') + ss;
        }, 1000);
    }

    function stopQuestionTimer() {
        if (questionStartTime) {
            var q = s.sessionQuestions[s.currentQ];
            if (q) {
                q._timeSpent = Math.round((Date.now() - questionStartTime) / 1000);
            }
        }
        questionStartTime = null;
        clearInterval(questionTimerInterval);
        questionTimerInterval = null;
    }
    App._stopQuestionTimer = stopQuestionTimer;

    App.displayQuestion = function (index) {
        // Stop previous question timer and start new one
        if (index > 0 || questionStartTime) stopQuestionTimer();
        startQuestionTimer();

        var q = s.sessionQuestions[index];

        var elapsed = s.timeLimitMin * 60 - s.remainingSeconds;
        var pct = Math.min((elapsed / (s.timeLimitMin * 60)) * 100, 100);
        dom.progressFill.style.width = pct + '%';
        dom.progressText.textContent = 'Q' + (index + 1);

        // Update progress bar ARIA
        var progressBar = dom.progressFill.parentElement;
        if (progressBar) progressBar.setAttribute('aria-valuenow', Math.round(pct));

        // Handle live coding questions
        if (q._liveCoding) {
            displayLiveCodingQuestion(q);
        }

        var isCodeChallenge = q.topic === 'code-challenge';
        dom.qTopic.textContent = isCodeChallenge ? 'CODE CHALLENGE' : q.topic.toUpperCase();
        dom.qTopic.className = 'q-card__topic' + (isCodeChallenge ? ' q-card__topic--code' : '');
        dom.qLevel.textContent = App.LEVEL_LABELS[q.level];
        dom.qLevel.className = 'q-card__level q-card__level--' + App.LEVEL_NAMES[q.level];
        dom.qText.textContent = q.question;

        if (q.code) {
            dom.qCode.innerHTML = App.highlightSwift(q.code);
            dom.qCodeWrap.style.display = '';
        } else {
            dom.qCodeWrap.style.display = 'none';
        }

        dom.qHint.textContent = q.hint;
        dom.qAnswer.textContent = q.answer;

        // Reset or auto-reveal hints in practice mode
        if (s.practiceMode) {
            dom.hintReveal.classList.add('is-open');
            dom.answerReveal.classList.add('is-open');
            dom.btnHint.textContent = 'Hide Hint';
            dom.btnAnswer.textContent = 'Hide Answer';
        } else {
            dom.hintReveal.classList.remove('is-open');
            dom.answerReveal.classList.remove('is-open');
            dom.btnHint.textContent = 'Show Hint';
            dom.btnAnswer.textContent = 'Show Answer';
        }

        // Reset rating
        s.currentRating = 0;
        dom.allStars.forEach(function (star) { star.classList.remove('is-active'); });
        dom.ratingDesc.textContent = '';
        dom.btnNext.disabled = s.practiceMode ? false : true;

        var nextLabel = q._liveCoding ? 'Next Problem' : 'Next Question';
        dom.btnNext.textContent = nextLabel;

        // Restore per-question notes
        dom.qNote.value = q.notes || '';

        // Update favorite/blacklist buttons
        var qid = questionId(q);
        dom.btnFav.classList.toggle('is-active', loadSet(FAVORITES_KEY).indexOf(qid) !== -1);
        dom.btnBlacklist.classList.toggle('is-active', loadSet(BLACKLIST_KEY).indexOf(qid) !== -1);

        // Show prev button only if not on the first question of the current phase
        var canGoPrev = index > 0;
        if (canGoPrev && q._phase) {
            var prevQ = s.sessionQuestions[index - 1];
            if (prevQ && prevQ._phase && prevQ._phase !== q._phase) canGoPrev = false;
        }
        dom.btnPrev.style.display = canGoPrev ? '' : 'none';

        App.updatePhaseUI();
    };

    // ===========================================================
    //  ADAPTIVE QUESTION PICKER
    // ===========================================================

    function isCodePhase() {
        var phaseId = App.getCurrentPhaseId ? App.getCurrentPhaseId() : null;
        return phaseId === 'code';
    }

    function isLivePhase() {
        var phaseId = App.getCurrentPhaseId ? App.getCurrentPhaseId() : null;
        return phaseId === 'live';
    }

    // Map live coding difficulty to a display level for adaptive picking
    var LC_DIFFICULTY_MAP = { easy: 0, medium: 1, hard: 2, expert: 3 };

    function pickLiveCodingQuestion(targetDifficulty) {
        if (typeof LIVE_CODING_BANK === 'undefined' || LIVE_CODING_BANK.length === 0) return null;

        var difficulties = ['easy', 'medium', 'hard', 'expert'];
        var targetName = difficulties[Math.min(targetDifficulty, 3)] || 'medium';

        // Try exact difficulty first
        var pool = LIVE_CODING_BANK.filter(function (q) {
            return q.difficulty === targetName;
        });

        // Fallback to any difficulty
        if (pool.length === 0) pool = LIVE_CODING_BANK.slice();

        // Avoid repeats
        var usedTitles = s.sessionQuestions
            .filter(function (q) { return q._liveCoding; })
            .map(function (q) { return q._lcData.title; });
        var unused = pool.filter(function (q) { return usedTitles.indexOf(q.title) === -1; });
        if (unused.length > 0) pool = unused;

        var picked = pool[Math.floor(Math.random() * pool.length)];

        // Wrap live coding question in the standard format for sessionQuestions
        return {
            topic: 'live-coding',
            level: LC_DIFFICULTY_MAP[picked.difficulty] || 1,
            question: picked.title,
            hint: picked.hints.join('\n\n'),
            answer: picked.explanation,
            code: '',
            _liveCoding: true,
            _lcData: picked,
        };
    }

    function pickNextQuestion() {
        var avgRating = s.ratings.reduce(function (a, b) { return a + b; }, 0) / s.ratings.length;
        var targetLevel = App.getLevelIndex(avgRating);
        var currentPhaseId = App.getCurrentPhaseId ? App.getCurrentPhaseId() : null;

        var rand = Math.random();
        if (rand < 0.15 && targetLevel > 0) targetLevel--;
        else if (rand > 0.85 && targetLevel < 5) targetLevel++;

        var codePhase = isCodePhase();
        var livePhase = isLivePhase();

        if (livePhase) {
            // Map 0-5 level to 0-3 difficulty
            var lcDifficulty = Math.min(Math.floor(targetLevel * 4 / 6), 3);
            var lcQ = pickLiveCodingQuestion(lcDifficulty);
            if (lcQ) { lcQ._phase = currentPhaseId; return lcQ; }
            // Fallback to code challenge if no live coding bank
        }

        var bank = App.getQuestionBank();
        var pool;

        if (codePhase) {
            pool = bank.filter(function (q) {
                return q.topic === 'code-challenge' && q.level === targetLevel;
            });
            // Try adjacent levels for code challenges
            for (var co = 1; pool.length === 0 && co <= 2; co++) {
                pool = bank.filter(function (q) {
                    return q.topic === 'code-challenge' &&
                        (q.level === targetLevel + co || q.level === targetLevel - co);
                });
            }
            if (pool.length === 0) {
                pool = bank.filter(function (q) {
                    return q.topic === 'code-challenge';
                });
            }
        } else {
            var topic = s.selectedTopics[Math.floor(Math.random() * s.selectedTopics.length)];
            pool = bank.filter(function (q) {
                return q.topic === topic && q.topic !== 'code-challenge' && q.level === targetLevel;
            });

            // Try all selected topics at same level
            if (pool.length === 0) {
                pool = bank.filter(function (q) {
                    return s.selectedTopics.indexOf(q.topic) !== -1 && q.topic !== 'code-challenge' && q.level === targetLevel;
                });
            }

            // Try adjacent levels ±1, ±2
            for (var offset = 1; pool.length === 0 && offset <= 2; offset++) {
                pool = bank.filter(function (q) {
                    return s.selectedTopics.indexOf(q.topic) !== -1 && q.topic !== 'code-challenge' &&
                        (q.level === targetLevel + offset || q.level === targetLevel - offset);
                });
            }

            // Final fallback: any level from selected topics
            if (pool.length === 0) {
                pool = bank.filter(function (q) {
                    return s.selectedTopics.indexOf(q.topic) !== -1 && q.topic !== 'code-challenge';
                });
            }
        }

        // Filter blacklisted questions
        var blacklist = loadSet(BLACKLIST_KEY);
        if (blacklist.length > 0) {
            var filtered = pool.filter(function (q) { return blacklist.indexOf(questionId(q)) === -1; });
            if (filtered.length > 0) pool = filtered;
        }

        var used = s.sessionQuestions.map(function (q) { return q.question; });
        var unused = pool.filter(function (q) { return used.indexOf(q.question) === -1; });
        if (unused.length > 0) pool = unused;

        // Prioritize favorites
        var favorites = loadSet(FAVORITES_KEY);
        if (favorites.length > 0) {
            var fav = pool.filter(function (q) { return favorites.indexOf(questionId(q)) !== -1; });
            if (fav.length > 0 && Math.random() < 0.5) pool = fav;
        }

        var picked = pool[Math.floor(Math.random() * pool.length)];
        if (picked) picked._phase = currentPhaseId;
        return picked;
    }

    // ===========================================================
    //  SETUP HELPERS
    // ===========================================================

    function updateTopicSummary() {
        var total = dom.allChips.length;
        var count = s.selectedTopics.length;
        if (count === total) {
            dom.topicSummary.textContent = 'All ' + total + ' topics';
        } else if (count === 0) {
            dom.topicSummary.textContent = 'None selected';
        } else {
            dom.topicSummary.textContent = count + ' of ' + total + ' topics';
        }
    }

    function updateStartButton() {
        var hasTopics = s.selectedTopics.length > 0;
        var hasNames = s.practiceMode
            ? s.intervieweeName.length > 0
            : s.interviewerName.length > 0 && s.intervieweeName.length > 0;
        var allSelected = s.selectedTopics.length === dom.allChips.length;
        dom.btnStart.disabled = !(hasTopics && hasNames);
        var btnCreateLive = document.getElementById('btnCreateLive');
        if (btnCreateLive) btnCreateLive.disabled = !(hasTopics && hasNames);
        dom.btnToggleAll.textContent = allSelected ? 'Clear All' : 'Select All';
        updateTopicSummary();

        if (!hasNames) {
            dom.validationHint.textContent = s.practiceMode
                ? 'Enter your name to begin'
                : 'Enter both participant names to begin';
        } else if (!hasTopics) {
            dom.validationHint.textContent = 'Select at least one topic to begin';
        } else {
            dom.validationHint.textContent = s.selectedTopics.length + ' topic' + (s.selectedTopics.length > 1 ? 's' : '') + ' selected';
        }
    }

    function selectAllTopics() {
        s.selectedTopics = [];
        dom.allChips.forEach(function (c) {
            c.classList.add('is-selected');
            s.selectedTopics.push(c.dataset.topic);
        });
        updateStartButton();
    }

    function renderTopicChips() {
        var topics = App.TOPIC_LABELS;
        var html = '';
        var keys = Object.keys(topics).sort(function (a, b) {
            return topics[a].localeCompare(topics[b]);
        });
        for (var i = 0; i < keys.length; i++) {
            html += '<button class="topic-chip" data-topic="' + keys[i] + '">' + topics[keys[i]] + '</button>';
        }
        dom.topicGrid.innerHTML = html;
        dom.allChips = Array.prototype.slice.call(dom.topicGrid.querySelectorAll('.topic-chip'));
    }

    function switchPlatform(platformId) {
        App.switchPlatform(platformId);
        s.platform = platformId;

        // Update platform buttons
        var btns = document.querySelectorAll('.platform-selector__btn');
        for (var i = 0; i < btns.length; i++) {
            btns[i].classList.toggle('is-active', btns[i].dataset.platform === platformId);
        }

        // Update header
        var config = App.getPlatformConfig();
        var titleEl = document.getElementById('setupTitle');
        var subtitleEl = document.getElementById('setupSubtitle');
        var iconEl = document.getElementById('setupIcon');
        if (titleEl) titleEl.textContent = config.name + ' Interview';
        if (subtitleEl) subtitleEl.textContent = config.subtitle;
        if (iconEl) iconEl.textContent = config.icon;

        // Rebuild topic chips
        renderTopicChips();
        selectAllTopics();
    }

    // ===========================================================
    //  EVENT BINDING
    // ===========================================================

    function bindEvents() {
        // Mode toggle (interview vs self-study)
        var btnModeInterview = document.getElementById('btnModeInterview');
        var btnModePractice = document.getElementById('btnModePractice');
        var planSection = document.getElementById('planSection');
        var interviewerField = dom.interviewerInput.closest('.setup__name-field');

        function setMode(mode) {
            s.practiceMode = mode === 'practice';
            btnModeInterview.classList.toggle('is-active', !s.practiceMode);
            btnModePractice.classList.toggle('is-active', s.practiceMode);
            planSection.style.display = s.practiceMode ? 'none' : '';
            interviewerField.style.display = s.practiceMode ? 'none' : '';
            if (s.practiceMode) {
                s.interviewerName = 'Self-Study';
            } else {
                s.interviewerName = dom.interviewerInput.value.trim();
            }
            updateStartButton();
        }

        btnModeInterview.addEventListener('click', function () { setMode('interview'); });
        btnModePractice.addEventListener('click', function () { setMode('practice'); });

        // Platform selector
        var platformSelector = document.getElementById('platformSelector');
        if (platformSelector) {
            platformSelector.addEventListener('click', function (e) {
                var btn = e.target.closest('.platform-selector__btn');
                if (!btn || !btn.dataset.platform) return;
                switchPlatform(btn.dataset.platform);
            });
        }

        // Name inputs
        dom.interviewerInput.addEventListener('input', function () {
            s.interviewerName = dom.interviewerInput.value.trim();
            try { localStorage.setItem(INTERVIEWER_KEY, s.interviewerName); } catch (e) { /* */ }
            updateStartButton();
        });
        dom.nameInput.addEventListener('input', function () {
            s.intervieweeName = dom.nameInput.value.trim();
            updateStartButton();
        });

        // Topic fold toggle
        dom.btnFoldTopics.addEventListener('click', function () {
            dom.btnFoldTopics.classList.toggle('is-open');
            dom.topicFoldBody.classList.toggle('is-open');
        });

        // Topic selection
        dom.topicGrid.addEventListener('click', function (e) {
            var chip = e.target.closest('.topic-chip');
            if (!chip) return;
            chip.classList.toggle('is-selected');
            if (chip.classList.contains('is-selected')) {
                s.selectedTopics.push(chip.dataset.topic);
            } else {
                s.selectedTopics = s.selectedTopics.filter(function (t) { return t !== chip.dataset.topic; });
            }
            updateStartButton();
        });

        // Select All / Clear All
        dom.btnToggleAll.addEventListener('click', function () {
            var allSelected = s.selectedTopics.length === dom.allChips.length;
            if (allSelected) {
                s.selectedTopics = [];
                dom.allChips.forEach(function (c) { c.classList.remove('is-selected'); });
            } else {
                selectAllTopics();
            }
            updateStartButton();
        });

        // Hint / Answer reveals
        dom.btnHint.addEventListener('click', function () {
            dom.hintReveal.classList.toggle('is-open');
            dom.btnHint.textContent = dom.hintReveal.classList.contains('is-open') ? 'Hide Hint' : 'Show Hint';
            App.saveSession();
            if (App.syncLiveState) App.syncLiveState();
        });
        dom.btnAnswer.addEventListener('click', function () {
            dom.answerReveal.classList.toggle('is-open');
            dom.btnAnswer.textContent = dom.answerReveal.classList.contains('is-open') ? 'Hide Answer' : 'Show Answer';
            App.saveSession();
            if (App.syncLiveState) App.syncLiveState();
        });

        // Live coding solution toggle
        dom.btnLcSolution.addEventListener('click', function () {
            var isOpen = dom.lcSolutionContent.classList.toggle('is-open');
            dom.btnLcSolution.innerHTML = isOpen
                ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Hide Solution'
                : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Show Solution';
            App.saveSession();
        });

        // ---- Shared rating helpers ----
        function setRating(value) {
            s.currentRating = value;
            dom.allStars.forEach(function (st, i) {
                st.classList.toggle('is-active', i < value);
            });
            dom.ratingDesc.textContent = App.RATING_LABELS[value];
            dom.btnNext.disabled = value === 0;
            App.saveSession();
            if (App.syncLiveState) App.syncLiveState();
            App.syncPopup();
        }

        function goNextQuestion() {
            if (!s.practiceMode && s.currentRating === 0) return;
            stopQuestionTimer();
            s.ratings.push(s.currentRating || 0);
            s.currentQ++;

            if (!s.practiceMode && s.timerExpired) {
                App.stopTimer();
                App.showResults();
                return;
            }

            var nextQ = pickNextQuestion();
            s.sessionQuestions.push(nextQ);
            App.displayQuestion(s.currentQ);
            App.saveSession();
            if (App.syncLiveState) App.syncLiveState();
            App.syncPopup();
            window.scrollTo(0, 0);
        }

        function skipQuestion() {
            stopQuestionTimer();
            s.sessionQuestions[s.currentQ].skipped = true;
            s.ratings.push(0);
            s.currentQ++;

            if (s.timerExpired) {
                App.stopTimer();
                App.showResults();
                return;
            }

            var nextQ = pickNextQuestion();
            s.sessionQuestions.push(nextQ);
            App.displayQuestion(s.currentQ);
            App.saveSession();
            if (App.syncLiveState) App.syncLiveState();
            App.syncPopup();
            window.scrollTo(0, 0);
        }

        // Expose for popup
        App.setRating = setRating;
        App.goNextQuestion = goNextQuestion;

        // Star rating
        dom.ratingStars.addEventListener('mouseover', function (e) {
            var star = e.target.closest('.rating__star');
            if (!star) return;
            var hoverValue = parseInt(star.dataset.value, 10);
            dom.allStars.forEach(function (st, i) {
                st.classList.toggle('is-hovered', i < hoverValue);
            });
            dom.ratingDesc.textContent = App.RATING_LABELS[hoverValue];
        });
        dom.ratingStars.addEventListener('mouseleave', function () {
            dom.allStars.forEach(function (st) { st.classList.remove('is-hovered'); });
            dom.ratingDesc.textContent = s.currentRating > 0 ? App.RATING_LABELS[s.currentRating] : '';
        });
        dom.ratingStars.addEventListener('click', function (e) {
            var star = e.target.closest('.rating__star');
            if (!star) return;
            var tapped = parseInt(star.dataset.value, 10);
            setRating(tapped === s.currentRating ? 0 : tapped);
        });

        // Next question
        dom.btnNext.addEventListener('click', goNextQuestion);

        // Skip question
        dom.btnSkip.addEventListener('click', skipQuestion);

        // Scoring rubric toggle
        document.getElementById('btnRubric').addEventListener('click', function () {
            var panel = document.getElementById('ratingRubric');
            panel.style.display = panel.style.display === 'none' ? '' : 'none';
        });

        // Previous question
        dom.btnPrev.addEventListener('click', function () {
            if (s.currentQ <= 0) return;
            // Undo last rating if we already rated and moved forward
            if (s.ratings.length > s.currentQ) {
                s.ratings.pop();
            }
            // Remove the current (unanswered) question that was added for "next"
            if (s.sessionQuestions.length > s.currentQ + 1) {
                s.sessionQuestions.splice(s.currentQ + 1);
            }
            s.currentQ--;
            // Restore the previous rating
            var prevRating = s.ratings.length > s.currentQ ? s.ratings.pop() : 0;
            s.currentRating = prevRating;
            App.displayQuestion(s.currentQ);
            // Restore stars for the previous rating
            if (prevRating > 0) {
                dom.allStars.forEach(function (star, i) {
                    star.classList.toggle('is-active', i < prevRating);
                });
                dom.ratingDesc.textContent = App.RATING_LABELS[prevRating];
                dom.btnNext.disabled = false;
            }
            App.saveSession();
            window.scrollTo(0, 0);
        });

        // Start interview
        dom.btnStart.addEventListener('click', function () {
            var validNames = s.practiceMode
                ? s.intervieweeName
                : (s.interviewerName && s.intervieweeName);
            if (s.selectedTopics.length === 0 || !validNames) return;

            s.currentQ = 0;
            s.currentRating = 0;
            s.ratings = [];
            s.sessionQuestions = [];
            s.introNotes = '';
            s.wrapupNotes = '';
            dom.introNotes.value = '';
            dom.wrapupNotes.value = '';
            App.stopTimer();

            var startBank = App.getQuestionBank();
            var pool = startBank.filter(function (q) {
                return s.selectedTopics.indexOf(q.topic) !== -1 && q.topic !== 'code-challenge' && q.level === 2;
            });
            if (pool.length === 0) {
                pool = startBank.filter(function (q) {
                    return s.selectedTopics.indexOf(q.topic) !== -1 && q.topic !== 'code-challenge';
                });
            }
            s.sessionQuestions.push(pool[Math.floor(Math.random() * pool.length)]);

            dom.qInterviewee.textContent = s.intervieweeName;

            if (s.practiceMode) {
                // Self-study: no timer, no phases
                dom.qTimer.style.display = 'none';
                dom.btnEnd.style.display = '';
                dom.btnEnd.innerHTML =
                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> See Results';
                dom.btnSkipSection.style.display = 'none';
                s.remainingSeconds = 0;
                s.timerExpired = false;
                document.documentElement.classList.add('is-practice');
            } else {
                dom.qTimer.style.display = '';
                App.startTimer();
                dom.btnEnd.style.display = '';
                document.documentElement.classList.remove('is-practice');
            }

            App.showScreen('screen-question');
            if (!s.practiceMode) {
                App.renderPhaseIndicator();
                App.updatePhaseIndicator();
            }
            App.displayQuestion(0);
            App.saveSession();
        });

        // Notes input handlers
        dom.introNotes.addEventListener('input', function () {
            s.introNotes = dom.introNotes.value;
            App.saveSession();
            if (App.syncLiveState) App.syncLiveState();
        });
        dom.wrapupNotes.addEventListener('input', function () {
            s.wrapupNotes = dom.wrapupNotes.value;
            App.saveSession();
            if (App.syncLiveState) App.syncLiveState();
        });
        dom.qNote.addEventListener('input', function () {
            var q = s.sessionQuestions[s.currentQ];
            if (q) q.notes = dom.qNote.value;
            App.saveSession();
            if (App.syncLiveState) App.syncLiveState();
        });

        // Skip to next section
        dom.btnSkipSection.addEventListener('click', function () {
            var currentPhase = App.getCurrentPhaseId ? App.getCurrentPhaseId() : null;
            var currentName = 'this section';
            var nextName = 'the next section';
            if (s.phases) {
                for (var i = 0; i < s.phases.length; i++) {
                    if (s.phases[i].id === currentPhase) {
                        currentName = s.phases[i].name;
                        if (i + 1 < s.phases.length) nextName = s.phases[i + 1].name;
                        break;
                    }
                }
            }
            var msg = 'Skip "' + currentName + '" and move to "' + nextName + '"?\n\n' +
                'The remaining time for ' + currentName + ' will be reassigned. ' +
                'Any unrated question will be discarded.';
            if (!confirm(msg)) return;
            App.skipToNextPhase();
            // Generate a new question matching the new phase
            var newPhaseId = App.getCurrentPhaseId ? App.getCurrentPhaseId() : null;
            if (newPhaseId === 'theory' || newPhaseId === 'code' || newPhaseId === 'live') {
                if (s.currentRating > 0) {
                    s.ratings.push(s.currentRating);
                    s.currentQ++;
                }
                var nextQ = pickNextQuestion();
                if (s.currentQ >= s.sessionQuestions.length) {
                    s.sessionQuestions.push(nextQ);
                } else {
                    s.sessionQuestions[s.currentQ] = nextQ;
                }
                App.displayQuestion(s.currentQ);
            }
            App.updatePhaseUI();
            App.saveSession();
        });

        // Skip intro (same as skip section)
        dom.btnSkipIntro.addEventListener('click', function () {
            App.skipToNextPhase();
            App.updatePhaseUI();
        });

        // Timer expiry modal handlers
        document.getElementById('btnTimeUpInclude').addEventListener('click', function () {
            document.getElementById('modalTimeUp').style.display = 'none';
            stopQuestionTimer();
            if (s.currentRating > 0) s.ratings.push(s.currentRating);
            App.stopTimer();
            App.showResults();
        });
        document.getElementById('btnTimeUpDiscard').addEventListener('click', function () {
            document.getElementById('modalTimeUp').style.display = 'none';
            stopQuestionTimer();
            s.sessionQuestions.splice(s.currentQ, 1);
            App.stopTimer();
            App.showResults();
        });

        // End interview (manual) with confirmation
        dom.btnEnd.addEventListener('click', function () {
            var qCount = s.ratings.length + (s.currentRating > 0 ? 1 : 0);
            var msg = 'End the entire interview now?\n\n' +
                'This will stop the timer and show the results screen with ' +
                qCount + ' rated question' + (qCount !== 1 ? 's' : '') + '. ' +
                'The current question will be ' + (s.currentRating > 0 ? 'included.' : 'discarded (not yet rated).');
            if (!confirm(msg)) return;
            stopQuestionTimer();
            if (s.currentRating > 0) {
                s.ratings.push(s.currentRating);
            } else {
                s.sessionQuestions.splice(s.currentQ, 1);
            }
            App.stopTimer();
            if (App.syncLiveState) App.syncLiveState();
            App.showResults();
        });

        // Finish interview from wrap-up (no confirmation needed — it's the last section)
        dom.btnFinish.addEventListener('click', function () {
            stopQuestionTimer();
            if (s.currentRating > 0) {
                s.ratings.push(s.currentRating);
            } else {
                s.sessionQuestions.splice(s.currentQ, 1);
            }
            App.stopTimer();
            if (App.syncLiveState) App.syncLiveState();
            App.showResults();
        });

        // Download report
        dom.btnDownload.addEventListener('click', function () {
            App.downloadReport();
        });

        // Print / PDF
        document.getElementById('btnPrint').addEventListener('click', function () {
            window.print();
        });

        // Pause / Continue
        dom.btnPause.addEventListener('click', function () {
            App.togglePause();
            dom.btnPause.classList.toggle('is-paused', s.timerPaused);
        });

        // Fullscreen
        dom.btnFullscreen.addEventListener('click', function () {
            if (document.fullscreenElement || document.webkitFullscreenElement) {
                (document.exitFullscreen || document.webkitExitFullscreen).call(document);
            } else {
                var el = document.documentElement;
                (el.requestFullscreen || el.webkitRequestFullscreen).call(el);
            }
        });

        function onFullscreenChange() {
            var isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
            document.documentElement.classList.toggle('is-fullscreen', isFs);
        }
        document.addEventListener('fullscreenchange', onFullscreenChange);
        document.addEventListener('webkitfullscreenchange', onFullscreenChange);

        // Presenter mode
        dom.btnPresenter.addEventListener('click', function () {
            s.presenterMode = !s.presenterMode;
            document.documentElement.classList.toggle('is-presenter', s.presenterMode);
            dom.btnPresenter.classList.toggle('is-active', s.presenterMode);
            dom.btnPopout.style.display = s.presenterMode ? '' : 'none';
            App.saveSession();
        });

        // ---- Keyboard shortcuts (1-5 to rate, Enter to advance) ----
        document.addEventListener('keydown', function (e) {
            var screen = document.getElementById('screen-question');
            if (!screen || !screen.classList.contains('is-active')) return;
            // Ignore if typing in a textarea
            if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;

            var phaseId = App.getCurrentPhaseId ? App.getCurrentPhaseId() : null;
            var isOverlay = phaseId === 'intro' || phaseId === 'wrapup';
            if (isOverlay) return;

            var key = e.key;
            if (key >= '1' && key <= '5') {
                e.preventDefault();
                var val = parseInt(key, 10);
                setRating(val === s.currentRating ? 0 : val);
            } else if (key === 'Enter' && s.currentRating > 0) {
                e.preventDefault();
                goNextQuestion();
            }
        });

        // ---- Rating popup window ----
        var ratingPopup = null;

        App.openRatingPopup = function () {
            if (ratingPopup && !ratingPopup.closed) {
                ratingPopup.focus();
                return;
            }
            var w = 340, h = 260;
            var left = window.screenX + window.outerWidth - w - 40;
            var top = window.screenY + 80;
            ratingPopup = window.open('', 'interviewRating',
                'width=' + w + ',height=' + h + ',left=' + left + ',top=' + top +
                ',resizable=no,menubar=no,toolbar=no,status=no');
            App.syncPopup();
        };

        App.syncPopup = function () {
            if (!ratingPopup || ratingPopup.closed) return;
            var q = s.sessionQuestions[s.currentQ];
            var qLabel = q ? 'Q' + (s.currentQ + 1) + ': ' + q.question.substring(0, 60) + (q.question.length > 60 ? '...' : '') : '';
            var doc = ratingPopup.document;
            doc.open();
            doc.write(
                '<!DOCTYPE html><html><head><meta charset="utf-8">' +
                '<title>Rate</title>' +
                '<style>' +
                'body{margin:0;padding:20px;background:#1d1d1f;color:#f5f5f7;font-family:-apple-system,sans-serif;text-align:center;user-select:none}' +
                '.q{font-size:12px;color:#86868b;margin-bottom:16px;line-height:1.4;min-height:34px}' +
                '.stars{display:flex;justify-content:center;gap:8px;margin-bottom:8px}' +
                '.star{width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);cursor:pointer;font-size:18px;color:#6e6e73;transition:all .15s}' +
                '.star:hover{border-color:rgba(255,214,10,0.4);background:rgba(255,214,10,0.08);transform:scale(1.1)}' +
                '.star.on{border-color:#ffd60a;background:rgba(255,214,10,0.15);color:#ffd60a}' +
                '.desc{font-size:12px;color:#6e6e73;margin-bottom:14px;min-height:18px}' +
                '.next{padding:10px 28px;border-radius:980px;border:none;background:#2997ff;color:#fff;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s}' +
                '.next:disabled{opacity:0.35;cursor:not-allowed}' +
                '.next:not(:disabled):hover{background:#3ba0ff;transform:scale(1.04)}' +
                '.hint{font-size:11px;color:#424245;margin-top:14px}' +
                '</style></head><body>' +
                '<p class="q">' + escapeHtml(qLabel) + '</p>' +
                '<div class="stars">' +
                [1,2,3,4,5].map(function (v) {
                    return '<button class="star' + (v <= s.currentRating ? ' on' : '') + '" onclick="r(' + v + ')">\u2605</button>';
                }).join('') +
                '</div>' +
                '<p class="desc">' + (App.RATING_LABELS[s.currentRating] || '') + '</p>' +
                '<button class="next" onclick="n()"' + (s.currentRating === 0 ? ' disabled' : '') + '>Next \u2192</button>' +
                '<p class="hint">Keys: 1\u20135 to rate, Enter to advance</p>' +
                '<script>' +
                'function r(v){window.opener.InterviewApp.setRating(v===window.opener.InterviewApp.state.currentRating?0:v)}' +
                'function n(){window.opener.InterviewApp.goNextQuestion()}' +
                'document.addEventListener("keydown",function(e){' +
                'if(e.key>="1"&&e.key<="5"){e.preventDefault();var v=parseInt(e.key);r(v)}' +
                'else if(e.key==="Enter"){e.preventDefault();n()}' +
                '})' +
                '<\/script></body></html>'
            );
            doc.close();
        };

        // Popout rating window
        dom.btnPopout.addEventListener('click', function () {
            App.openRatingPopup();
        });

        // ---- Modal helpers ----
        var REPORT_EMAIL = 'giga.khizanishvili@gmail.com';

        function showModal(modal) {
            modal.style.display = '';
        }

        function hideModal(modal) {
            modal.style.display = 'none';
        }

        // Close modal on backdrop click
        function initModalBackdrop(modal) {
            modal.addEventListener('click', function (e) {
                if (e.target === modal) hideModal(modal);
            });
        }

        initModalBackdrop(dom.modalReport);
        initModalBackdrop(dom.modalFeedback);

        // Escape closes any open modal
        document.addEventListener('keydown', function (e) {
            if (e.key !== 'Escape') return;
            if (dom.modalReport.style.display !== 'none') hideModal(dom.modalReport);
            if (dom.modalFeedback.style.display !== 'none') hideModal(dom.modalFeedback);
        });

        // ---- Favorite / Blacklist ----
        dom.btnFav.addEventListener('click', function () {
            var q = s.sessionQuestions[s.currentQ];
            if (!q) return;
            var qid = questionId(q);
            // Remove from blacklist if adding to favorites
            var bl = loadSet(BLACKLIST_KEY);
            if (bl.indexOf(qid) !== -1) {
                bl.splice(bl.indexOf(qid), 1);
                saveSet(BLACKLIST_KEY, bl);
                dom.btnBlacklist.classList.remove('is-active');
            }
            var added = toggleInSet(FAVORITES_KEY, qid);
            dom.btnFav.classList.toggle('is-active', added);
        });

        dom.btnBlacklist.addEventListener('click', function () {
            var q = s.sessionQuestions[s.currentQ];
            if (!q) return;
            var qid = questionId(q);
            // Remove from favorites if adding to blacklist
            var favs = loadSet(FAVORITES_KEY);
            if (favs.indexOf(qid) !== -1) {
                favs.splice(favs.indexOf(qid), 1);
                saveSet(FAVORITES_KEY, favs);
                dom.btnFav.classList.remove('is-active');
            }
            var added = toggleInSet(BLACKLIST_KEY, qid);
            dom.btnBlacklist.classList.toggle('is-active', added);
        });

        // ---- Report Question ----
        dom.btnReport.addEventListener('click', function () {
            var q = s.sessionQuestions[s.currentQ];
            if (!q) return;
            var topicLabel = App.TOPIC_LABELS[q.topic] || q.topic;
            var levelLabel = App.LEVEL_LABELS[q.level] || 'Level ' + q.level;
            dom.reportMeta.textContent = topicLabel + '  \u00B7  ' + levelLabel + '\n' + q.question;
            dom.reportCategory.selectedIndex = 0;
            dom.reportDetails.value = '';
            showModal(dom.modalReport);
        });

        dom.btnReportCancel.addEventListener('click', function () {
            hideModal(dom.modalReport);
        });

        dom.btnReportSend.addEventListener('click', function () {
            var q = s.sessionQuestions[s.currentQ];
            if (!q) return;
            var topicLabel = App.TOPIC_LABELS[q.topic] || q.topic;
            var levelLabel = App.LEVEL_LABELS[q.level] || 'Level ' + q.level;
            var category = dom.reportCategory.value;
            var details = dom.reportDetails.value.trim();
            var isLc = q._liveCoding;

            var subject = '[Question Report] ' + topicLabel + ' - ' + (isLc ? q._lcData.title : q.question).substring(0, 60);

            var body = '--- Question Report ---\n\n' +
                '> Question: ' + (isLc ? q._lcData.title : q.question) + '\n' +
                '> Topic: ' + topicLabel + '\n' +
                '> Level: ' + levelLabel + '\n';
            if (isLc && q._lcData.difficulty) {
                body += '> Difficulty: ' + q._lcData.difficulty + '\n';
            }
            if (q.code) {
                body += '\n--- Code ---\n\n' + q.code + '\n';
            }
            body += '\n--- Report ---\n\n' +
                '> Category: ' + category + '\n';
            if (details) {
                body += '> Details: ' + details + '\n';
            }
            body += '\n--- Session ---\n\n' +
                '> Interviewee: ' + (s.intervieweeName || 'N/A') + '\n' +
                '> Interviewer: ' + (s.interviewerName || 'N/A') + '\n' +
                '> Date: ' + new Date().toLocaleDateString() + '\n' +
                '> Question: #' + (s.currentQ + 1) + ' of ' + s.sessionQuestions.length + '\n';

            window.location.href = 'mailto:' + REPORT_EMAIL +
                '?subject=' + encodeURIComponent(subject) +
                '&body=' + encodeURIComponent(body);

            hideModal(dom.modalReport);
        });

        // ---- Feedback ----
        var feedbackScore = 0;

        dom.feedbackRating.addEventListener('click', function (e) {
            var btn = e.target.closest('.modal__rating-btn');
            if (!btn) return;
            var val = parseInt(btn.dataset.value, 10);
            feedbackScore = val === feedbackScore ? 0 : val;
            dom.feedbackRatingBtns.forEach(function (b) {
                b.classList.toggle('is-active', parseInt(b.dataset.value, 10) <= feedbackScore);
            });
        });

        dom.btnFeedback.addEventListener('click', function () {
            feedbackScore = 0;
            dom.feedbackCategory.selectedIndex = 0;
            dom.feedbackDetails.value = '';
            dom.feedbackRatingBtns.forEach(function (b) { b.classList.remove('is-active'); });
            showModal(dom.modalFeedback);
        });

        dom.btnFeedbackCancel.addEventListener('click', function () {
            hideModal(dom.modalFeedback);
        });

        dom.btnFeedbackSend.addEventListener('click', function () {
            var category = dom.feedbackCategory.value;
            var details = dom.feedbackDetails.value.trim();

            var subject = '[Interview Tool Feedback] ' + category;

            var body = '--- Tool Feedback ---\n\n' +
                '> Category: ' + category + '\n';
            if (feedbackScore > 0) {
                body += '> Rating: ' + feedbackScore + ' / 5\n';
            }
            if (details) {
                body += '> Details: ' + details + '\n';
            }
            body += '\n--- Session ---\n\n' +
                '> Interviewee: ' + (s.intervieweeName || 'N/A') + '\n' +
                '> Interviewer: ' + (s.interviewerName || 'N/A') + '\n' +
                '> Date: ' + new Date().toLocaleDateString() + '\n' +
                '> Questions: ' + s.ratings.length + ' completed\n';

            window.location.href = 'mailto:' + REPORT_EMAIL +
                '?subject=' + encodeURIComponent(subject) +
                '&body=' + encodeURIComponent(body);

            hideModal(dom.modalFeedback);
        });

        // Restart
        document.getElementById('btnRestart').addEventListener('click', function () {
            App.stopTimer();
            App.clearSession();
            s.intervieweeName = '';
            s.introNotes = '';
            s.wrapupNotes = '';
            dom.nameInput.value = '';
            dom.introNotes.value = '';
            dom.wrapupNotes.value = '';
            document.documentElement.classList.remove('is-practice');
            App.renderHistory();
            App.showScreen('screen-setup');
        });

        // Compare history
        document.getElementById('btnCompare').addEventListener('click', function () {
            App.showComparison();
        });
        var modalCompare = document.getElementById('modalCompare');
        document.getElementById('btnCompareClose').addEventListener('click', function () {
            modalCompare.style.display = 'none';
        });
        modalCompare.addEventListener('click', function (e) {
            if (e.target === modalCompare) modalCompare.style.display = 'none';
        });

        // ---- Live Session Buttons ----
        var btnCreateLive = document.getElementById('btnCreateLive');
        var btnJoinLive = document.getElementById('btnJoinLive');
        var modalJoin = document.getElementById('modalJoin');
        var joinError = document.getElementById('joinError');

        if (btnCreateLive) {
            btnCreateLive.addEventListener('click', function () {
                if (btnCreateLive.disabled) return;
                App.createLiveSession();
            });
        }

        if (btnJoinLive) {
            btnJoinLive.addEventListener('click', function () {
                if (modalJoin) {
                    modalJoin.style.display = '';
                    if (joinError) joinError.classList.remove('is-visible');
                    document.getElementById('joinCodeInput').value = '';
                    document.getElementById('joinNameInput').value = '';
                    document.getElementById('joinCodeInput').focus();
                }
            });
        }

        // Join modal submit
        var btnJoinSubmit = document.getElementById('btnJoinSubmit');
        if (btnJoinSubmit) {
            btnJoinSubmit.addEventListener('click', function () {
                var code = document.getElementById('joinCodeInput').value.trim();
                var name = document.getElementById('joinNameInput').value.trim();
                var role = document.getElementById('joinRoleSelect').value;
                if (!code) {
                    if (joinError) { joinError.textContent = 'Please enter a session code.'; joinError.classList.add('is-visible'); }
                    return;
                }
                if (!name) {
                    if (joinError) { joinError.textContent = 'Please enter your name.'; joinError.classList.add('is-visible'); }
                    return;
                }
                App.joinLiveSession(code, name, role);
            });
        }

        // Join modal cancel
        var btnJoinCancel = document.getElementById('btnJoinCancel');
        if (btnJoinCancel) {
            btnJoinCancel.addEventListener('click', function () {
                if (modalJoin) modalJoin.style.display = 'none';
            });
        }

        // Join modal backdrop close + Escape
        if (modalJoin) {
            modalJoin.addEventListener('click', function (e) {
                if (e.target === modalJoin) modalJoin.style.display = 'none';
            });
        }

        // Join code auto-uppercase
        var joinCodeInput = document.getElementById('joinCodeInput');
        if (joinCodeInput) {
            joinCodeInput.addEventListener('input', function () {
                joinCodeInput.value = joinCodeInput.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
            });
        }

        // Lobby: copy code
        var btnCopyCode = document.getElementById('btnCopyCode');
        if (btnCopyCode) {
            btnCopyCode.addEventListener('click', function () {
                var codeEl = document.getElementById('lobbyCode');
                var code = codeEl ? codeEl.textContent : '';
                if (!code) return;
                navigator.clipboard.writeText(code).then(function () {
                    btnCopyCode.classList.add('is-copied');
                    var original = btnCopyCode.innerHTML;
                    btnCopyCode.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
                    setTimeout(function () {
                        btnCopyCode.classList.remove('is-copied');
                        btnCopyCode.innerHTML = original;
                    }, 2000);
                }).catch(function () {
                    // Fallback: select the code text for manual copy
                    if (codeEl) {
                        var range = document.createRange();
                        range.selectNodeContents(codeEl);
                        var sel = window.getSelection();
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                });
            });
        }

        // Lobby: start interview (host only)
        var btnLobbyStart = document.getElementById('btnLobbyStart');
        if (btnLobbyStart) {
            btnLobbyStart.addEventListener('click', function () {
                if (!App.isLiveHost() || !App.live.code) return;
                btnLobbyStart.disabled = true;
                FirebaseService.updateLiveStatus(App.live.code, 'active').then(function () {
                    if (dom.btnStart) dom.btnStart.click();
                }).catch(function () {
                    btnLobbyStart.disabled = false;
                });
            });
        }

        // Lobby: cancel session
        var btnLobbyCancel = document.getElementById('btnLobbyCancel');
        if (btnLobbyCancel) {
            btnLobbyCancel.addEventListener('click', function () {
                if (confirm('Cancel this live session? All participants will be disconnected.')) {
                    App.cancelLiveSession();
                }
            });
        }

        // Restart button: cleanup live session if active
        var btnRestart = document.getElementById('btnRestart');
        if (btnRestart) {
            btnRestart.addEventListener('click', function () {
                if (App.isLiveSession && App.isLiveSession()) {
                    App.cleanupLive();
                }
            });
        }
    }

    // ===========================================================
    //  AUTH SCREEN BINDINGS
    // ===========================================================

    function bindAuthEvents() {
        var authMode = 'signin';

        // Tab switching
        var tabSignIn = document.getElementById('authTabSignIn');
        var tabSignUp = document.getElementById('authTabSignUp');
        var nameField = document.getElementById('authNameField');
        var submitBtn = document.getElementById('authSubmitBtn');
        var errorEl = document.getElementById('authError');

        function setAuthMode(mode) {
            authMode = mode;
            tabSignIn.classList.toggle('is-active', mode === 'signin');
            tabSignUp.classList.toggle('is-active', mode === 'signup');
            nameField.style.display = mode === 'signup' ? '' : 'none';
            submitBtn.textContent = mode === 'signup' ? 'Create Account' : 'Sign In';
            errorEl.classList.remove('is-visible');
        }

        tabSignIn.addEventListener('click', function () { setAuthMode('signin'); });
        tabSignUp.addEventListener('click', function () { setAuthMode('signup'); });

        function showAuthError(msg) {
            errorEl.textContent = msg;
            errorEl.classList.add('is-visible');
        }

        // Google sign in
        document.getElementById('authGoogleBtn').addEventListener('click', function () {
            if (!window.FirebaseService) { showAuthError('Firebase not loaded yet. Please wait.'); return; }
            errorEl.classList.remove('is-visible');
            window.FirebaseService.signInWithGoogle().catch(function (err) {
                if (err.code !== 'auth/popup-closed-by-user') {
                    showAuthError(err.message || 'Google sign-in failed');
                }
            });
        });

        // Email form
        document.getElementById('authForm').addEventListener('submit', function (e) {
            e.preventDefault();
            if (!window.FirebaseService) { showAuthError('Firebase not loaded yet. Please wait.'); return; }
            errorEl.classList.remove('is-visible');
            var email = document.getElementById('authEmail').value.trim();
            var password = document.getElementById('authPassword').value;
            var name = document.getElementById('authName').value.trim();

            if (!email || !password) { showAuthError('Email and password are required.'); return; }

            submitBtn.disabled = true;
            var promise;
            if (authMode === 'signup') {
                if (password.length < 6) { showAuthError('Password must be at least 6 characters.'); submitBtn.disabled = false; return; }
                promise = window.FirebaseService.signUpWithEmail(email, password, name);
            } else {
                promise = window.FirebaseService.signInWithEmail(email, password);
            }

            promise.then(function () {
                submitBtn.disabled = false;
            }).catch(function (err) {
                submitBtn.disabled = false;
                var msg = err.message || 'Authentication failed';
                if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                    msg = 'Invalid email or password.';
                } else if (err.code === 'auth/email-already-in-use') {
                    msg = 'An account with this email already exists.';
                } else if (err.code === 'auth/invalid-email') {
                    msg = 'Please enter a valid email address.';
                }
                showAuthError(msg);
            });
        });

        // Guest (anonymous sign-in)
        document.getElementById('authGuestBtn').addEventListener('click', function () {
            if (!window.FirebaseService) { showAuthError('Firebase not loaded yet. Please wait.'); return; }
            errorEl.classList.remove('is-visible');
            window.FirebaseService.continueAsGuest().catch(function (err) {
                showAuthError(err.message || 'Could not continue as guest');
            });
        });

        // Profile from nav
        document.getElementById('navProfileBtn').addEventListener('click', function () {
            var user = window.FirebaseService ? window.FirebaseService.currentUser : null;
            renderProfile(user);
            App.showScreen('screen-profile');
        });
    }

    // ===========================================================
    //  NAV PROFILE WIDGET
    // ===========================================================

    function updateNavProfile(user) {
        var navUser = document.getElementById('navUser');
        var avatarEl = document.getElementById('navUserAvatar');
        var nameEl = document.getElementById('navUserName');

        if (!user) {
            navUser.classList.remove('is-visible');
            return;
        }

        navUser.classList.add('is-visible');

        if (user.isAnonymous) {
            nameEl.textContent = 'Guest';
            avatarEl.textContent = '?';
            return;
        }

        nameEl.textContent = user.displayName || user.email || '';
        if (user.photoURL) {
            var img = document.createElement('img');
            img.className = 'nav__user-avatar';
            img.src = user.photoURL;
            img.alt = 'Avatar';
            img.referrerPolicy = 'no-referrer';
            avatarEl.replaceWith(img);
        } else {
            var initials = (user.displayName || user.email || '?').charAt(0).toUpperCase();
            avatarEl.textContent = initials;
        }
    }

    // ===========================================================
    //  PROFILE
    // ===========================================================

    function renderProfile(user) {
        var avatarEl = document.getElementById('profileAvatar');
        var nameEl = document.getElementById('profileName');
        var emailEl = document.getElementById('profileEmail');
        var joinedEl = document.getElementById('profileJoined');
        var guestEl = document.getElementById('profileGuest');
        var actionsEl = document.getElementById('profileActions');
        var isAnon = !user || user.isAnonymous;

        if (!isAnon) {
            nameEl.textContent = user.displayName || 'User';
            emailEl.textContent = user.email || '';

            if (user.photoURL) {
                var img = document.createElement('img');
                img.className = 'profile__avatar';
                img.src = user.photoURL;
                img.alt = 'Avatar';
                img.referrerPolicy = 'no-referrer';
                avatarEl.replaceWith(img);
            } else {
                avatarEl.textContent = (user.displayName || user.email || '?').charAt(0).toUpperCase();
            }

            joinedEl.textContent = '';
            if (window.FirebaseService) {
                window.FirebaseService.loadUserProfile().then(function (profile) {
                    if (profile && profile.createdAt) {
                        joinedEl.textContent = 'Joined ' + new Date(profile.createdAt).toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric',
                        });
                    }
                }).catch(function () { /* */ });
            }

            guestEl.classList.remove('is-visible');
            actionsEl.style.display = '';
        } else {
            nameEl.textContent = 'Guest';
            emailEl.textContent = 'Not signed in';
            joinedEl.textContent = '';
            avatarEl.textContent = '?';
            guestEl.classList.add('is-visible');
            actionsEl.style.display = 'none';
        }

        renderProfileStats();
    }

    function renderProfileStats() {
        var gData = { xp: 0, totalInterviews: 0, totalQuestions: 0, streak: 0, achievements: [] };
        try {
            var raw = localStorage.getItem('ios-interview-gamification');
            if (raw) gData = JSON.parse(raw) || gData;
        } catch (e) { /* */ }

        var XP_PER_LEVEL = 500;
        document.getElementById('profileInterviews').textContent = gData.totalInterviews || 0;
        document.getElementById('profileQuestions').textContent = gData.totalQuestions || 0;
        document.getElementById('profileXP').textContent = gData.xp || 0;
        document.getElementById('profileLevel').textContent = Math.floor((gData.xp || 0) / XP_PER_LEVEL) + 1;
        document.getElementById('profileStreak').textContent = gData.streak || 0;
        document.getElementById('profileAchievements').textContent = (gData.achievements || []).length;
    }

    function bindProfileEvents() {
        document.getElementById('profileBack').addEventListener('click', function () {
            App.showScreen('screen-setup');
        });

        document.getElementById('profileSignOut').addEventListener('click', function () {
            if (window.FirebaseService) {
                window.FirebaseService.signOut();
            }
        });

        document.getElementById('profileCreateAccount').addEventListener('click', function () {
            if (!window.FirebaseService) return;
            // Link anonymous account to Google
            window.FirebaseService.linkGoogle().then(function (user) {
                if (user) {
                    renderProfile(user);
                    updateNavProfile(user);
                }
            }).catch(function (err) {
                if (err.code === 'auth/credential-already-in-use') {
                    alert('This account is already linked to another user. Please sign out and sign in directly.');
                } else if (err.code !== 'auth/popup-closed-by-user') {
                    alert(err.message || 'Could not link account');
                }
            });
        });
    }

    // ===========================================================
    //  INIT FLOW
    // ===========================================================

    var USER_DATA_KEYS = [
        'ios-interview-history',
        'ios-interview-gamification',
        'ios-interview-sr',
        'interview-custom-questions',
        'ios-interview-streak',
    ];
    var LAST_UID_KEY = 'ios-interview-uid';

    function cloudHasData(cloudData) {
        if (!cloudData) return false;
        if (cloudData.history && cloudData.history.length > 0) return true;
        if (cloudData.gamification && cloudData.gamification.xp > 0) return true;
        if (cloudData.sr && Object.keys(cloudData.sr).length > 0) return true;
        if (cloudData.customQuestions && cloudData.customQuestions.length > 0) return true;
        if (cloudData.streak && cloudData.streak.lastDate) return true;
        return false;
    }

    function clearLocalUserData() {
        USER_DATA_KEYS.forEach(function (key) {
            try { localStorage.removeItem(key); } catch (e) { /* */ }
        });
    }

    function writeCloudToLocal(cloudData) {
        try {
            if (cloudData.history) {
                localStorage.setItem('ios-interview-history', JSON.stringify(cloudData.history.slice(0, 50)));
            }
            if (cloudData.gamification) {
                localStorage.setItem('ios-interview-gamification', JSON.stringify(cloudData.gamification));
            }
            if (cloudData.sr) {
                localStorage.setItem('ios-interview-sr', JSON.stringify(cloudData.sr));
            }
            if (cloudData.customQuestions) {
                localStorage.setItem('interview-custom-questions', JSON.stringify(cloudData.customQuestions));
            }
            if (cloudData.streak) {
                localStorage.setItem('ios-interview-streak', JSON.stringify(cloudData.streak));
            }
        } catch (e) { /* */ }
    }

    function proceedToSetup(cloudData, user) {
        var currentUid = user ? user.uid : null;
        var lastUid = null;
        try { lastUid = localStorage.getItem(LAST_UID_KEY); } catch (e) { /* */ }

        var sameUser = currentUid && lastUid && currentUid === lastUid;

        // Store current UID for future comparisons
        if (currentUid) {
            try { localStorage.setItem(LAST_UID_KEY, currentUid); } catch (e) { /* */ }
        }

        if (cloudHasData(cloudData)) {
            // Cloud is source of truth — always overwrite localStorage
            if (!sameUser) clearLocalUserData();
            writeCloudToLocal(cloudData);
        } else if (sameUser) {
            // Same user, cloud empty — keep existing localStorage cache
        } else {
            // Different user (or first sign-in) with empty cloud — clear stale data
            clearLocalUserData();
        }

        App.applyFeatureFlags();
        initApp();
    }

    function initApp() {
        // Restore saved platform and render dynamic topics
        var savedPlatform;
        try { savedPlatform = localStorage.getItem(App.PLATFORM_KEY); } catch (e) { /* */ }
        switchPlatform(savedPlatform && App.PLATFORMS[savedPlatform] ? savedPlatform : 'ios');

        var restored = App.restoreSession();
        if (!restored) {
            selectAllTopics();
            // Restore cached interviewer name
            try {
                var cachedName = localStorage.getItem(INTERVIEWER_KEY);
                if (cachedName) {
                    s.interviewerName = cachedName;
                    dom.interviewerInput.value = cachedName;
                }
            } catch (e) { /* */ }
        }
        updateStartButton();
        App.renderHistory();
        App.showScreen('screen-setup');
    }

    // ===========================================================
    //  INIT
    // ===========================================================

    initDom();
    bindEvents();
    bindAuthEvents();
    bindProfileEvents();
    App.initPlan();

    // Theme toggle
    InterviewUtils.initThemeToggle('btnTheme');

    // Expose functions for templates module
    App.renderTopicChips = renderTopicChips;
    App.updateUI = updateStartButton;

    // Show loading state while checking auth
    var authLoading = document.getElementById('authLoading');
    var authFormArea = document.getElementById('authFormArea');
    authLoading.classList.add('is-visible');
    authFormArea.classList.add('is-hidden');

    var authResolved = false;

    function showAuthForm() {
        authLoading.classList.remove('is-visible');
        authFormArea.classList.remove('is-hidden');
    }

    document.addEventListener('firebase:authchange', function (e) {
        var user = e.detail.user;

        if (user) {
            // User is signed in (real or anonymous) — stay on loading, go to setup
            updateNavProfile(user);
            if (authResolved) return;
            authResolved = true;
            App.initFeatureFlags();
            if (window.FirebaseService && window.FirebaseService.loadAllUserData) {
                window.FirebaseService.loadAllUserData().then(function (data) {
                    proceedToSetup(data, user);
                }).catch(function () {
                    proceedToSetup(null, user);
                });
            } else {
                proceedToSetup(null, user);
            }
        } else {
            // Signed out — show auth form
            updateNavProfile(null);
            authResolved = false;
            showAuthForm();
            App.showScreen('screen-auth');
        }
    });

    // Fallback: if Firebase module fails to load, show auth form after timeout
    setTimeout(function () {
        if (!authResolved && !window.FirebaseService) {
            showAuthForm();
        }
    }, 3000);

})(InterviewApp);
