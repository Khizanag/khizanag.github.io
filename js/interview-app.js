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
        d.btnSkipSection = document.getElementById('btnSkipSection');
        d.btnSkipIntro = document.getElementById('btnSkipIntro');
        d.qIntro = document.getElementById('qIntro');
        d.qWrapup = document.getElementById('qWrapup');
        d.introNotes = document.getElementById('introNotes');
        d.wrapupNotes = document.getElementById('wrapupNotes');
        d.qCard = document.querySelector('.q-card');
        d.qRating = document.querySelector('.rating');
        d.allStars = Array.prototype.slice.call(d.ratingStars.querySelectorAll('.rating__star'));

        // Plan & Phases
        d.planList = document.getElementById('planList');
        d.planTotal = document.getElementById('planTotal');
        d.qPhases = document.getElementById('qPhases');

        // Results
        d.resultsInterviewee = document.getElementById('resultsInterviewee');
        d.btnDownload = document.getElementById('btnDownload');
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
        var isOverlay = isIntro || isWrapup;
        var isLast = App.isLastPhase ? App.isLastPhase() : true;

        dom.qIntro.style.display = isIntro ? '' : 'none';
        dom.qWrapup.style.display = isWrapup ? '' : 'none';
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

        // Star rating
        dom.ratingStars.addEventListener('mouseover', function (e) {
            var star = e.target.closest('.rating__star');
            if (!star) return;
            var hoverValue = parseInt(star.dataset.value, 10);
            dom.allStars.forEach(function (st, i) {
                st.classList.toggle('is-hovered', i < hoverValue);
            });
        });
        dom.ratingStars.addEventListener('mouseleave', function () {
            dom.allStars.forEach(function (st) { st.classList.remove('is-hovered'); });
        });
        dom.ratingStars.addEventListener('click', function (e) {
            var star = e.target.closest('.rating__star');
            if (!star) return;
            var tapped = parseInt(star.dataset.value, 10);
            s.currentRating = tapped === s.currentRating ? 0 : tapped;
            dom.allStars.forEach(function (st, i) {
                st.classList.toggle('is-active', i < s.currentRating);
            });
            dom.ratingDesc.textContent = App.RATING_LABELS[s.currentRating];
            dom.btnNext.disabled = s.currentRating === 0;
            App.saveSession();
        });

        // Next question
        dom.btnNext.addEventListener('click', function () {
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
            window.scrollTo(0, 0);
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
            dom.btnPause.style.display = '';
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
            App.updatePhaseUI();
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
