(function (App) {
    'use strict';

    var s = App.state;
    var dom = App.dom;

    // ===========================================================
    //  DOM REFS
    // ===========================================================

    function initDom() {
        var d = App.dom;

        // Setup
        d.topicGrid = document.getElementById('topicGrid');
        d.stepperValue = document.getElementById('stepperValue');
        d.stepperMinus = document.getElementById('stepperMinus');
        d.stepperPlus = document.getElementById('stepperPlus');
        d.btnStart = document.getElementById('btnStart');
        d.validationHint = document.getElementById('validationHint');
        d.modeToggle = document.getElementById('modeToggle');
        d.sectionTime = document.getElementById('sectionTime');
        d.sectionCount = document.getElementById('sectionCount');
        d.timeSlider = document.getElementById('timeSlider');
        d.timeDisplay = document.getElementById('timeDisplay');
        d.interviewerInput = document.getElementById('interviewerInput');
        d.nameInput = document.getElementById('nameInput');
        d.btnToggleAll = document.getElementById('btnToggleAll');
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
        d.btnEnd = document.getElementById('btnEnd');
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
    //  QUESTION DISPLAY
    // ===========================================================

    App.displayQuestion = function (index) {
        var q = s.sessionQuestions[index];

        if (s.interviewMode === 'count') {
            dom.progressFill.style.width = ((index) / s.questionCount * 100) + '%';
            dom.progressText.textContent = (index + 1) + ' / ' + s.questionCount;
        } else {
            var elapsed = s.timeLimitMin * 60 - s.remainingSeconds;
            dom.progressFill.style.width = Math.min((elapsed / (s.timeLimitMin * 60)) * 100, 100) + '%';
            dom.progressText.textContent = 'Q' + (index + 1);
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

        if (s.interviewMode === 'count') {
            dom.btnNext.textContent = index < s.questionCount - 1 ? 'Next Question' : 'See Results';
        } else {
            dom.btnNext.textContent = s.timerExpired ? 'See Results' : 'Next Question';
        }
    };

    // ===========================================================
    //  ADAPTIVE QUESTION PICKER
    // ===========================================================

    function pickNextQuestion() {
        var avgRating = s.ratings.reduce(function (a, b) { return a + b; }, 0) / s.ratings.length;
        var targetLevel = App.getLevelIndex(avgRating);

        var rand = Math.random();
        if (rand < 0.15 && targetLevel > 0) targetLevel--;
        else if (rand > 0.85 && targetLevel < 5) targetLevel++;

        var topic = s.selectedTopics[Math.floor(Math.random() * s.selectedTopics.length)];
        var pool = QUESTION_BANK.filter(function (q) {
            return q.topic === topic && q.level === targetLevel;
        });

        if (pool.length === 0) {
            pool = QUESTION_BANK.filter(function (q) {
                return s.selectedTopics.indexOf(q.topic) !== -1 && q.level === targetLevel;
            });
        }

        if (pool.length === 0) {
            pool = QUESTION_BANK.filter(function (q) {
                return s.selectedTopics.indexOf(q.topic) !== -1;
            });
        }

        var used = s.sessionQuestions.map(function (q) { return q.question; });
        var unused = pool.filter(function (q) { return used.indexOf(q.question) === -1; });
        if (unused.length > 0) pool = unused;

        return pool[Math.floor(Math.random() * pool.length)];
    }

    // ===========================================================
    //  SETUP HELPERS
    // ===========================================================

    function updateStartButton() {
        var hasTopics = s.selectedTopics.length > 0;
        var hasNames = s.interviewerName.length > 0 && s.intervieweeName.length > 0;
        var allSelected = s.selectedTopics.length === dom.allChips.length;
        dom.btnStart.disabled = !(hasTopics && hasNames);
        dom.btnToggleAll.textContent = allSelected ? 'Clear All' : 'Select All';

        if (!hasNames) {
            dom.validationHint.textContent = 'Enter both participant names to begin';
        } else if (!hasTopics) {
            dom.validationHint.textContent = 'Select at least one topic to begin';
        } else {
            dom.validationHint.textContent = s.selectedTopics.length + ' topic' + (s.selectedTopics.length > 1 ? 's' : '') + ' selected';
        }
    }

    function updateStepper() {
        dom.stepperValue.textContent = s.questionCount;
        dom.stepperMinus.disabled = s.questionCount <= App.MIN_Q;
        dom.stepperPlus.disabled = s.questionCount >= App.MAX_Q;
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
            updateStartButton();
        });
        dom.nameInput.addEventListener('input', function () {
            s.intervieweeName = dom.nameInput.value.trim();
            updateStartButton();
        });

        // Mode toggle
        dom.modeToggle.addEventListener('click', function (e) {
            var btn = e.target.closest('.mode-toggle__btn');
            if (!btn) return;
            s.interviewMode = btn.dataset.mode;
            dom.modeToggle.querySelectorAll('.mode-toggle__btn').forEach(function (b) {
                b.classList.toggle('is-active', b.dataset.mode === s.interviewMode);
            });
            dom.sectionTime.style.display = 'none';
            dom.sectionCount.style.display = s.interviewMode === 'count' ? '' : 'none';
        });

        // Time slider
        dom.timeSlider.addEventListener('input', function () {
            s.timeLimitMin = parseInt(dom.timeSlider.value, 10);
            dom.timeDisplay.textContent = s.timeLimitMin + ' min';
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

        // Count stepper
        dom.stepperMinus.addEventListener('click', function () {
            if (s.questionCount > App.MIN_Q) { s.questionCount -= 5; updateStepper(); }
        });
        dom.stepperPlus.addEventListener('click', function () {
            if (s.questionCount < App.MAX_Q) { s.questionCount += 5; updateStepper(); }
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

            var shouldEnd = false;
            if (s.interviewMode === 'count' && s.currentQ >= s.questionCount) {
                shouldEnd = true;
            } else if (s.interviewMode === 'time' && s.timerExpired) {
                shouldEnd = true;
            }

            if (shouldEnd) {
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

        // Start interview
        dom.btnStart.addEventListener('click', function () {
            if (s.selectedTopics.length === 0 || !s.interviewerName || !s.intervieweeName) return;

            s.currentQ = 0;
            s.currentRating = 0;
            s.ratings = [];
            s.sessionQuestions = [];
            App.stopTimer();

            var pool = QUESTION_BANK.filter(function (q) {
                return s.selectedTopics.indexOf(q.topic) !== -1 && q.level === 2;
            });
            if (pool.length === 0) {
                pool = QUESTION_BANK.filter(function (q) {
                    return s.selectedTopics.indexOf(q.topic) !== -1;
                });
            }
            s.sessionQuestions.push(pool[Math.floor(Math.random() * pool.length)]);

            dom.qInterviewee.textContent = s.intervieweeName;

            if (s.interviewMode === 'time') {
                dom.qTimer.style.display = '';
                App.startTimer();
            } else {
                dom.qTimer.style.display = 'none';
            }

            dom.btnEnd.style.display = '';
            App.showScreen('screen-question');
            App.renderPhaseIndicator();
            App.updatePhaseIndicator();
            App.displayQuestion(0);
            App.saveSession();
        });

        // End interview (manual)
        dom.btnEnd.addEventListener('click', function () {
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

        // Restart
        document.getElementById('btnRestart').addEventListener('click', function () {
            App.stopTimer();
            App.clearSession();
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
    }
    updateStepper();
    updateStartButton();

})(InterviewApp);
