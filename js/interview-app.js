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
        s.lcHintsRevealed = 0;

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

    function escapeHtml(text) {
        return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    App.displayQuestion = function (index) {
        var q = s.sessionQuestions[index];

        var elapsed = s.timeLimitMin * 60 - s.remainingSeconds;
        dom.progressFill.style.width = Math.min((elapsed / (s.timeLimitMin * 60)) * 100, 100) + '%';
        dom.progressText.textContent = 'Q' + (index + 1);

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

        var nextLabel = q._liveCoding ? 'Next Problem' : 'Next Question';
        dom.btnNext.textContent = s.timerExpired ? 'See Results' : nextLabel;

        // Restore per-question notes
        dom.qNote.value = q.notes || '';

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

        var rand = Math.random();
        if (rand < 0.15 && targetLevel > 0) targetLevel--;
        else if (rand > 0.85 && targetLevel < 5) targetLevel++;

        var codePhase = isCodePhase();
        var livePhase = isLivePhase();

        if (livePhase) {
            // Map 0-5 level to 0-3 difficulty
            var lcDifficulty = Math.min(Math.floor(targetLevel * 4 / 6), 3);
            var lcQ = pickLiveCodingQuestion(lcDifficulty);
            if (lcQ) return lcQ;
            // Fallback to code challenge if no live coding bank
        }

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

        function skipQuestion() {
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
        dom.qNote.addEventListener('input', function () {
            var q = s.sessionQuestions[s.currentQ];
            if (q) q.notes = dom.qNote.value;
            App.saveSession();
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

        // End interview (manual) with confirmation
        dom.btnEnd.addEventListener('click', function () {
            var qCount = s.ratings.length + (s.currentRating > 0 ? 1 : 0);
            var msg = 'End the entire interview now?\n\n' +
                'This will stop the timer and show the results screen with ' +
                qCount + ' rated question' + (qCount !== 1 ? 's' : '') + '. ' +
                'The current question will be ' + (s.currentRating > 0 ? 'included.' : 'discarded (not yet rated).');
            if (!confirm(msg)) return;
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
