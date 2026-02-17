(function (App) {
    'use strict';

    var s = App.state;
    var dom = App.dom;
    var INTERVIEWER_KEY = 'ios-interview-interviewer';

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
        d.qRating = document.querySelector('.rating');
        d.allStars = Array.prototype.slice.call(d.ratingStars.querySelectorAll('.rating__star'));

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

    App.updatePhaseUI = function () {
        var phaseId = App.getCurrentPhaseId ? App.getCurrentPhaseId() : null;
        var isIntro = phaseId === 'intro';
        var isWrapup = phaseId === 'wrapup';
        var isLive = phaseId === 'live';
        var isOverlay = isIntro || isWrapup || isLive;
        var isLast = App.isLastPhase ? App.isLastPhase() : true;

        dom.qIntro.style.display = isIntro ? '' : 'none';
        dom.qWrapup.style.display = isWrapup ? '' : 'none';
        dom.qLiveCoding.style.display = isLive ? '' : 'none';
        dom.qCard.style.display = isOverlay ? 'none' : '';
        dom.qRating.style.display = isOverlay ? 'none' : '';

        // Show skip section button when not on last phase
        dom.btnSkipSection.style.display = !isLast ? '' : 'none';
    };

    // ===========================================================
    //  QUESTION DISPLAY
    // ===========================================================

    App.displayQuestion = function (index) {
        var q = s.sessionQuestions[index];

        var elapsed = s.timeLimitMin * 60 - s.remainingSeconds;
        dom.progressFill.style.width = Math.min((elapsed / (s.timeLimitMin * 60)) * 100, 100) + '%';
        dom.progressText.textContent = 'Q' + (index + 1);

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

        // Reset reveals
        dom.hintReveal.classList.remove('is-open');
        dom.answerReveal.classList.remove('is-open');
        dom.btnHint.textContent = 'Show Hint';
        dom.btnAnswer.textContent = 'Show Answer';

        // Reset rating
        s.currentRating = 0;
        dom.allStars.forEach(function (star) { star.classList.remove('is-active'); });
        dom.ratingDesc.textContent = '';
        dom.btnNext.disabled = true;

        dom.btnNext.textContent = s.timerExpired ? 'See Results' : 'Next Question';

        // Show prev button only if not on the first question
        dom.btnPrev.style.display = index > 0 ? '' : 'none';

        App.updatePhaseUI();
    };

    // ===========================================================
    //  ADAPTIVE QUESTION PICKER
    // ===========================================================

    function isCodePhase() {
        var phaseId = App.getCurrentPhaseId ? App.getCurrentPhaseId() : null;
        return phaseId === 'code';
    }

    function pickNextQuestion() {
        var avgRating = s.ratings.reduce(function (a, b) { return a + b; }, 0) / s.ratings.length;
        var targetLevel = App.getLevelIndex(avgRating);

        var rand = Math.random();
        if (rand < 0.15 && targetLevel > 0) targetLevel--;
        else if (rand > 0.85 && targetLevel < 5) targetLevel++;

        var codePhase = isCodePhase();
        var pool;

        if (codePhase) {
            pool = QUESTION_BANK.filter(function (q) {
                return q.topic === 'code-challenge' && q.level === targetLevel;
            });
            if (pool.length === 0) {
                pool = QUESTION_BANK.filter(function (q) {
                    return q.topic === 'code-challenge';
                });
            }
        } else {
            var topic = s.selectedTopics[Math.floor(Math.random() * s.selectedTopics.length)];
            pool = QUESTION_BANK.filter(function (q) {
                return q.topic === topic && q.topic !== 'code-challenge' && q.level === targetLevel;
            });

            if (pool.length === 0) {
                pool = QUESTION_BANK.filter(function (q) {
                    return s.selectedTopics.indexOf(q.topic) !== -1 && q.topic !== 'code-challenge' && q.level === targetLevel;
                });
            }

            if (pool.length === 0) {
                pool = QUESTION_BANK.filter(function (q) {
                    return s.selectedTopics.indexOf(q.topic) !== -1 && q.topic !== 'code-challenge';
                });
            }
        }

        var used = s.sessionQuestions.map(function (q) { return q.question; });
        var unused = pool.filter(function (q) { return used.indexOf(q.question) === -1; });
        if (unused.length > 0) pool = unused;

        return pool[Math.floor(Math.random() * pool.length)];
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
        var hasNames = s.interviewerName.length > 0 && s.intervieweeName.length > 0;
        var allSelected = s.selectedTopics.length === dom.allChips.length;
        dom.btnStart.disabled = !(hasTopics && hasNames);
        dom.btnToggleAll.textContent = allSelected ? 'Clear All' : 'Select All';
        updateTopicSummary();

        if (!hasNames) {
            dom.validationHint.textContent = 'Enter both participant names to begin';
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

    // ===========================================================
    //  EVENT BINDING
    // ===========================================================

    function bindEvents() {
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
        });
        dom.btnAnswer.addEventListener('click', function () {
            dom.answerReveal.classList.toggle('is-open');
            dom.btnAnswer.textContent = dom.answerReveal.classList.contains('is-open') ? 'Hide Answer' : 'Show Answer';
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
            App.syncPopup();
        }

        function goNextQuestion() {
            if (s.currentRating === 0) return;
            s.ratings.push(s.currentRating);
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
            if (s.selectedTopics.length === 0 || !s.interviewerName || !s.intervieweeName) return;

            s.currentQ = 0;
            s.currentRating = 0;
            s.ratings = [];
            s.sessionQuestions = [];
            s.introNotes = '';
            s.wrapupNotes = '';
            dom.introNotes.value = '';
            dom.wrapupNotes.value = '';
            App.stopTimer();

            var pool = QUESTION_BANK.filter(function (q) {
                return s.selectedTopics.indexOf(q.topic) !== -1 && q.topic !== 'code-challenge' && q.level === 2;
            });
            if (pool.length === 0) {
                pool = QUESTION_BANK.filter(function (q) {
                    return s.selectedTopics.indexOf(q.topic) !== -1 && q.topic !== 'code-challenge';
                });
            }
            s.sessionQuestions.push(pool[Math.floor(Math.random() * pool.length)]);

            dom.qInterviewee.textContent = s.intervieweeName;
            dom.qTimer.style.display = '';
            App.startTimer();
            dom.btnEnd.style.display = '';
            App.showScreen('screen-question');
            App.renderPhaseIndicator();
            App.updatePhaseIndicator();
            App.displayQuestion(0);
            App.saveSession();
        });

        // Notes input handlers
        dom.introNotes.addEventListener('input', function () {
            s.introNotes = dom.introNotes.value;
            App.saveSession();
        });
        dom.wrapupNotes.addEventListener('input', function () {
            s.wrapupNotes = dom.wrapupNotes.value;
            App.saveSession();
        });

        // Skip to next section
        dom.btnSkipSection.addEventListener('click', function () {
            if (!confirm('Skip to the next section?')) return;
            App.skipToNextPhase();
            // Generate a new question matching the new phase
            var newPhaseId = App.getCurrentPhaseId ? App.getCurrentPhaseId() : null;
            if (newPhaseId === 'theory' || newPhaseId === 'code') {
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

        // End interview (manual) with confirmation
        dom.btnEnd.addEventListener('click', function () {
            if (!confirm('End the interview now?')) return;
            if (s.currentRating > 0) {
                s.ratings.push(s.currentRating);
            } else {
                s.sessionQuestions.splice(s.currentQ, 1);
            }
            App.stopTimer();
            App.showResults();
        });

        // Finish interview from wrap-up (no confirmation needed — it's the last section)
        dom.btnFinish.addEventListener('click', function () {
            if (s.currentRating > 0) {
                s.ratings.push(s.currentRating);
            } else {
                s.sessionQuestions.splice(s.currentQ, 1);
            }
            App.stopTimer();
            App.showResults();
        });

        // Download report
        dom.btnDownload.addEventListener('click', function () {
            App.downloadReport();
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
            var isOverlay = phaseId === 'intro' || phaseId === 'wrapup' || phaseId === 'live';
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
                '<p class="q">' + qLabel.replace(/</g, '&lt;') + '</p>' +
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

            var subject = '[Question Report] ' + topicLabel + ' \u2014 ' + q.question.substring(0, 60);
            var body = 'QUESTION REPORT\n' +
                '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n\n' +
                'Topic: ' + topicLabel + '\n' +
                'Level: ' + levelLabel + '\n' +
                'Question: ' + q.question + '\n';

            if (q.code) {
                body += '\nCode:\n' + q.code + '\n';
            }

            body += '\nCategory: ' + category + '\n';

            if (details) {
                body += '\nDetails:\n' + details + '\n';
            }

            body += '\n\u2500\u2500\u2500\n' +
                'Reported from iOS Interview Tool\n' +
                'Session: ' + (s.intervieweeName || 'N/A') + ' | ' + new Date().toLocaleDateString();

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
            var body = 'TOOL FEEDBACK\n' +
                '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n\n' +
                'Category: ' + category + '\n';

            if (feedbackScore > 0) {
                body += 'Satisfaction: ' + feedbackScore + '/5\n';
            }

            if (details) {
                body += '\nDetails:\n' + details + '\n';
            }

            body += '\n\u2500\u2500\u2500\n' +
                'Session info: ' + (s.intervieweeName || 'N/A') + ' | ' +
                new Date().toLocaleDateString() + ' | ' +
                s.ratings.length + ' questions';

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
            App.showScreen('screen-setup');
        });
    }

    // ===========================================================
    //  INIT
    // ===========================================================

    initDom();
    bindEvents();
    App.initPlan();

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

})(InterviewApp);
