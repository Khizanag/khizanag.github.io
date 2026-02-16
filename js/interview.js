(function () {
    'use strict';

    // ---- Constants ----
    var SESSION_KEY = 'ios-interview-session';
    var MIN_Q = 5;
    var MAX_Q = 30;
    var MIN_TIME = 5;
    var MAX_TIME = 60;
    var TIME_STEP = 5;
    var RATING_LABELS = ['', 'No answer', 'Weak', 'Partial', 'Good', 'Perfect'];
    var LEVEL_NAMES = ['intern', 'junior', 'middle', 'senior', 'lead', 'staff'];
    var LEVEL_LABELS = ['Intern', 'Junior', 'Middle', 'Senior', 'Lead', 'Staff'];
    var LEVEL_EMOJIS = ['🌱', '🚀', '⚡', '💎', '👑', '🏆'];
    var LEVEL_COLORS = ['#5ac8fa', '#30d158', '#ff9f0a', '#bf5af2', '#ff375f', '#ffd60a'];
    var LEVEL_DESCS = [
        'Starting the journey — strong foundations are being built.',
        'Growing fast — solid grasp of fundamentals, ready for more responsibility.',
        'Reliable contributor — handles complex tasks independently.',
        'Expert practitioner — drives technical decisions and mentors others.',
        'Technical leader — shapes architecture and enables teams at scale.',
        'Elite engineer — defines industry standards and solves the hardest problems.',
    ];

    // ---- State ----
    var selectedTopics = [];
    var interviewMode = 'time';
    var questionCount = 10;
    var timeLimitMin = 15;
    var interviewerName = '';
    var intervieweeName = '';

    // Timer state
    var timerInterval = null;
    var remainingSeconds = 0;
    var timerExpired = false;

    // Session state
    var currentQ = 0;
    var currentRating = 0;
    var ratings = [];
    var sessionQuestions = [];

    // ---- DOM refs: Setup ----
    var topicGrid = document.getElementById('topicGrid');
    var stepperValue = document.getElementById('stepperValue');
    var stepperMinus = document.getElementById('stepperMinus');
    var stepperPlus = document.getElementById('stepperPlus');
    var btnStart = document.getElementById('btnStart');
    var validationHint = document.getElementById('validationHint');
    var modeToggle = document.getElementById('modeToggle');
    var sectionTime = document.getElementById('sectionTime');
    var sectionCount = document.getElementById('sectionCount');
    var timeSlider = document.getElementById('timeSlider');
    var timeDisplay = document.getElementById('timeDisplay');
    var interviewerInput = document.getElementById('interviewerInput');
    var nameInput = document.getElementById('nameInput');
    var btnToggleAll = document.getElementById('btnToggleAll');
    var allChips = topicGrid.querySelectorAll('.topic-chip');

    // ---- DOM refs: Question ----
    var progressFill = document.getElementById('progressFill');
    var progressText = document.getElementById('progressText');
    var qTimer = document.getElementById('qTimer');
    var timerText = document.getElementById('timerText');
    var qInterviewee = document.getElementById('qInterviewee');
    var qTopic = document.getElementById('qTopic');
    var qLevel = document.getElementById('qLevel');
    var qText = document.getElementById('qText');
    var qHint = document.getElementById('qHint');
    var qAnswer = document.getElementById('qAnswer');
    var qCodeWrap = document.getElementById('qCodeWrap');
    var qCode = document.getElementById('qCode');
    var btnHint = document.getElementById('btnHint');
    var btnAnswer = document.getElementById('btnAnswer');
    var hintReveal = document.getElementById('hintReveal');
    var answerReveal = document.getElementById('answerReveal');
    var ratingStars = document.getElementById('ratingStars');
    var ratingDesc = document.getElementById('ratingDesc');
    var btnNext = document.getElementById('btnNext');
    var btnEnd = document.getElementById('btnEnd');
    var allStars = ratingStars.querySelectorAll('.rating__star');

    // ---- DOM refs: Results ----
    var resultsInterviewee = document.getElementById('resultsInterviewee');

    // ===========================================================
    //  SESSION PERSISTENCE
    // ===========================================================

    function saveSession() {
        try {
            localStorage.setItem(SESSION_KEY, JSON.stringify({
                version: 1,
                interviewerName: interviewerName,
                intervieweeName: intervieweeName,
                selectedTopics: selectedTopics,
                interviewMode: interviewMode,
                timeLimitMin: timeLimitMin,
                questionCount: questionCount,
                currentQ: currentQ,
                currentRating: currentRating,
                ratings: ratings,
                sessionQuestions: sessionQuestions,
                remainingSeconds: remainingSeconds,
                timerExpired: timerExpired,
                hintRevealed: hintReveal.classList.contains('is-open'),
                answerRevealed: answerReveal.classList.contains('is-open'),
                timestamp: Date.now(),
            }));
        } catch (e) { /* localStorage unavailable */ }
    }

    function clearSession() {
        try { localStorage.removeItem(SESSION_KEY); } catch (e) { /* */ }
    }

    function restoreSession() {
        var raw;
        try { raw = localStorage.getItem(SESSION_KEY); } catch (e) { return false; }
        if (!raw) return false;

        var s;
        try { s = JSON.parse(raw); } catch (e) { clearSession(); return false; }

        // Validate
        if (!s.version
            || !Array.isArray(s.selectedTopics) || !s.selectedTopics.length
            || !Array.isArray(s.ratings)
            || !Array.isArray(s.sessionQuestions) || !s.sessionQuestions.length
            || typeof s.currentQ !== 'number'
            || !s.intervieweeName
        ) {
            clearSession();
            return false;
        }

        // Discard stale sessions (24h)
        if (Date.now() - s.timestamp > 24 * 60 * 60 * 1000) {
            clearSession();
            return false;
        }

        // Validate question objects
        var valid = s.sessionQuestions.every(function (q) {
            return q && q.topic && typeof q.level === 'number' && q.question;
        });
        if (!valid) { clearSession(); return false; }

        // Restore state
        interviewerName = s.interviewerName || '';
        intervieweeName = s.intervieweeName;
        selectedTopics = s.selectedTopics;
        interviewMode = s.interviewMode || 'time';
        timeLimitMin = s.timeLimitMin || 15;
        questionCount = s.questionCount || 10;
        currentQ = s.currentQ;
        currentRating = s.currentRating || 0;
        ratings = s.ratings;
        sessionQuestions = s.sessionQuestions;
        remainingSeconds = s.remainingSeconds || 0;
        timerExpired = s.timerExpired || false;

        // Restore setup screen UI (for when user restarts later)
        interviewerInput.value = interviewerName;
        nameInput.value = intervieweeName;
        allChips.forEach(function (c) {
            c.classList.toggle('is-selected', selectedTopics.indexOf(c.dataset.topic) !== -1);
        });
        modeToggle.querySelectorAll('.mode-toggle__btn').forEach(function (b) {
            b.classList.toggle('is-active', b.dataset.mode === interviewMode);
        });
        sectionTime.style.display = interviewMode === 'time' ? '' : 'none';
        sectionCount.style.display = interviewMode === 'count' ? '' : 'none';
        timeSlider.value = timeLimitMin;
        timeDisplay.textContent = timeLimitMin + ' min';
        stepperValue.textContent = questionCount;

        // Show interviewee on question screen
        qInterviewee.textContent = intervieweeName;

        // Timer & End button
        btnEnd.style.display = '';
        if (interviewMode === 'time') {
            qTimer.style.display = '';
            resumeTimer();
        } else {
            qTimer.style.display = 'none';
        }

        // Switch to question screen and render current question
        showScreen('screen-question');
        displayQuestion(currentQ);

        // Restore in-progress rating
        if (currentRating > 0) {
            allStars.forEach(function (star, i) {
                star.classList.toggle('is-active', i < currentRating);
            });
            ratingDesc.textContent = RATING_LABELS[currentRating];
            btnNext.disabled = false;
        }

        // Restore reveal states
        if (s.hintRevealed) {
            hintReveal.classList.add('is-open');
            btnHint.textContent = 'Hide Hint';
        }
        if (s.answerRevealed) {
            answerReveal.classList.add('is-open');
            btnAnswer.textContent = 'Hide Answer';
        }

        return true;
    }

    // Safety net: save on page unload
    window.addEventListener('beforeunload', function () {
        if (document.getElementById('screen-question').classList.contains('is-active')) {
            saveSession();
        }
    });

    // ===========================================================
    //  SETUP SCREEN
    // ===========================================================

    // ---- Name inputs ----
    interviewerInput.addEventListener('input', function () {
        interviewerName = interviewerInput.value.trim();
        updateStartButton();
    });
    nameInput.addEventListener('input', function () {
        intervieweeName = nameInput.value.trim();
        updateStartButton();
    });

    // ---- Mode toggle ----
    modeToggle.addEventListener('click', function (e) {
        var btn = e.target.closest('.mode-toggle__btn');
        if (!btn) return;

        interviewMode = btn.dataset.mode;
        modeToggle.querySelectorAll('.mode-toggle__btn').forEach(function (b) {
            b.classList.toggle('is-active', b.dataset.mode === interviewMode);
        });

        sectionTime.style.display = interviewMode === 'time' ? '' : 'none';
        sectionCount.style.display = interviewMode === 'count' ? '' : 'none';
    });

    // ---- Time slider ----
    timeSlider.addEventListener('input', function () {
        timeLimitMin = parseInt(timeSlider.value, 10);
        timeDisplay.textContent = timeLimitMin + ' min';
    });

    function updateTimeStepper() {
        timeSlider.value = timeLimitMin;
        timeDisplay.textContent = timeLimitMin + ' min';
    }

    // ---- Topic selection ----
    topicGrid.addEventListener('click', function (e) {
        var chip = e.target.closest('.topic-chip');
        if (!chip) return;

        chip.classList.toggle('is-selected');
        if (chip.classList.contains('is-selected')) {
            selectedTopics.push(chip.dataset.topic);
        } else {
            selectedTopics = selectedTopics.filter(function (t) { return t !== chip.dataset.topic; });
        }
        updateStartButton();
    });

    // ---- Count stepper ----
    stepperMinus.addEventListener('click', function () {
        if (questionCount > MIN_Q) { questionCount -= 5; updateStepper(); }
    });
    stepperPlus.addEventListener('click', function () {
        if (questionCount < MAX_Q) { questionCount += 5; updateStepper(); }
    });

    function updateStepper() {
        stepperValue.textContent = questionCount;
        stepperMinus.disabled = questionCount <= MIN_Q;
        stepperPlus.disabled = questionCount >= MAX_Q;
    }

    // ---- Start button validation ----
    function updateStartButton() {
        var hasTopics = selectedTopics.length > 0;
        var hasNames = interviewerName.length > 0 && intervieweeName.length > 0;
        var allSelected = selectedTopics.length === allChips.length;
        btnStart.disabled = !(hasTopics && hasNames);
        btnToggleAll.textContent = allSelected ? 'Clear All' : 'Select All';

        if (!hasNames) {
            validationHint.textContent = 'Enter both participant names to begin';
        } else if (!hasTopics) {
            validationHint.textContent = 'Select at least one topic to begin';
        } else {
            validationHint.textContent = selectedTopics.length + ' topic' + (selectedTopics.length > 1 ? 's' : '') + ' selected';
        }
    }

    // ---- Select All / Clear All ----
    btnToggleAll.addEventListener('click', function () {
        var allSelected = selectedTopics.length === allChips.length;
        if (allSelected) {
            selectedTopics = [];
            allChips.forEach(function (c) { c.classList.remove('is-selected'); });
        } else {
            selectedTopics = [];
            allChips.forEach(function (c) {
                c.classList.add('is-selected');
                selectedTopics.push(c.dataset.topic);
            });
        }
        updateStartButton();
    });

    function selectAllTopics() {
        selectedTopics = [];
        allChips.forEach(function (c) {
            c.classList.add('is-selected');
            selectedTopics.push(c.dataset.topic);
        });
        updateStartButton();
    }

    // ===========================================================
    //  SCREEN TRANSITIONS
    // ===========================================================

    function showScreen(id) {
        document.querySelectorAll('.screen').forEach(function (s) {
            s.classList.remove('is-active');
        });
        document.getElementById(id).classList.add('is-active');
        window.scrollTo(0, 0);
    }

    // ===========================================================
    //  TIMER
    // ===========================================================

    function formatTime(seconds) {
        var m = Math.floor(seconds / 60);
        var s = seconds % 60;
        return m + ':' + (s < 10 ? '0' : '') + s;
    }

    function onTimerTick() {
        remainingSeconds--;
        if (remainingSeconds <= 0) {
            remainingSeconds = 0;
            timerExpired = true;
            clearInterval(timerInterval);
            timerInterval = null;
            timerText.textContent = '0:00';
            progressFill.style.width = '100%';
            qTimer.classList.remove('is-warning');
            qTimer.classList.add('is-danger');
            btnNext.textContent = 'See Results';
            saveSession();
            return;
        }

        timerText.textContent = formatTime(remainingSeconds);

        // Update progress bar continuously
        var totalSeconds = timeLimitMin * 60;
        var elapsed = totalSeconds - remainingSeconds;
        progressFill.style.width = Math.min((elapsed / totalSeconds) * 100, 100) + '%';

        // Warning at 20% remaining
        if (remainingSeconds <= totalSeconds * 0.2 && remainingSeconds > 60) {
            qTimer.classList.add('is-warning');
            qTimer.classList.remove('is-danger');
        } else if (remainingSeconds <= 60) {
            qTimer.classList.remove('is-warning');
            qTimer.classList.add('is-danger');
        }

        saveSession();
    }

    function startTimer() {
        remainingSeconds = timeLimitMin * 60;
        timerExpired = false;
        qTimer.style.display = '';
        qTimer.classList.remove('is-warning', 'is-danger');
        timerText.textContent = formatTime(remainingSeconds);
        timerInterval = setInterval(onTimerTick, 1000);
    }

    function resumeTimer() {
        timerExpired = remainingSeconds <= 0;
        qTimer.style.display = '';
        qTimer.classList.remove('is-warning', 'is-danger');
        timerText.textContent = formatTime(remainingSeconds);

        if (timerExpired) {
            qTimer.classList.add('is-danger');
            timerText.textContent = '0:00';
            progressFill.style.width = '100%';
            btnNext.textContent = 'See Results';
            return;
        }

        // Apply correct warning/danger state
        var totalSeconds = timeLimitMin * 60;
        if (remainingSeconds <= 60) {
            qTimer.classList.add('is-danger');
        } else if (remainingSeconds <= totalSeconds * 0.2) {
            qTimer.classList.add('is-warning');
        }

        timerInterval = setInterval(onTimerTick, 1000);
    }

    function stopTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    // ===========================================================
    //  SWIFT SYNTAX HIGHLIGHTER
    // ===========================================================

    function highlightSwift(code) {
        var html = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        html = html.replace(/(\/\/.*)/g, '<span class="cmt">$1</span>');
        html = html.replace(/("(?:[^"\\]|\\.)*")/g, '<span class="str">$1</span>');
        html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="num">$1</span>');

        html = html.replace(/@(escaping|autoclosure|MainActor|Published|State|Observable)\b/g, '<span class="kw">@$1</span>');

        var keywords = ['func', 'var', 'let', 'class', 'struct', 'enum', 'protocol', 'extension',
            'if', 'else', 'guard', 'switch', 'case', 'default', 'for', 'in', 'while', 'repeat',
            'return', 'throw', 'throws', 'try', 'catch', 'do', 'break', 'continue', 'fallthrough',
            'import', 'typealias', 'associatedtype', 'init', 'deinit', 'self', 'Self',
            'true', 'false', 'nil', 'super', 'where', 'is', 'as',
            'private', 'fileprivate', 'internal', 'public', 'open', 'static', 'final',
            'override', 'mutating', 'nonmutating', 'lazy', 'weak', 'unowned',
            'optional', 'required', 'convenience', 'indirect',
            'async', 'await', 'actor', 'nonisolated', 'isolated',
            'some', 'any', 'inout', 'defer', 'willSet', 'didSet', 'get', 'set'];
        html = html.replace(new RegExp('(?<!["\'].*?)\\b(' + keywords.join('|') + ')\\b(?![^<]*>)', 'g'), '<span class="kw">$1</span>');

        html = html.replace(/(?<!["\'].*?)(?<!class="[^"]*)\b([A-Z][a-zA-Z0-9]*)\b(?![^<]*>)/g, '<span class="type">$1</span>');
        html = html.replace(/\b(print)\b(?![^<]*>)/g, '<span class="call">$1</span>');

        return html;
    }

    // ===========================================================
    //  QUESTION DISPLAY
    // ===========================================================

    function displayQuestion(index) {
        var q = sessionQuestions[index];

        if (interviewMode === 'count') {
            progressFill.style.width = ((index) / questionCount * 100) + '%';
            progressText.textContent = (index + 1) + ' / ' + questionCount;
        } else {
            var elapsed = timeLimitMin * 60 - remainingSeconds;
            progressFill.style.width = Math.min((elapsed / (timeLimitMin * 60)) * 100, 100) + '%';
            progressText.textContent = 'Q' + (index + 1);
        }

        var isCodeChallenge = q.topic === 'code-challenge';
        qTopic.textContent = isCodeChallenge ? 'CODE CHALLENGE' : q.topic.toUpperCase();
        qTopic.className = 'q-card__topic' + (isCodeChallenge ? ' q-card__topic--code' : '');
        qLevel.textContent = LEVEL_LABELS[q.level];
        qLevel.className = 'q-card__level q-card__level--' + LEVEL_NAMES[q.level];
        qText.textContent = q.question;

        if (q.code) {
            qCode.innerHTML = highlightSwift(q.code);
            qCodeWrap.style.display = '';
        } else {
            qCodeWrap.style.display = 'none';
        }

        qHint.textContent = q.hint;
        qAnswer.textContent = q.answer;

        // Reset reveals
        hintReveal.classList.remove('is-open');
        answerReveal.classList.remove('is-open');
        btnHint.textContent = 'Show Hint';
        btnAnswer.textContent = 'Show Answer';

        // Reset rating
        currentRating = 0;
        allStars.forEach(function (s) { s.classList.remove('is-active'); });
        ratingDesc.textContent = '';
        btnNext.disabled = true;

        // Button label
        if (interviewMode === 'count') {
            btnNext.textContent = index < questionCount - 1 ? 'Next Question' : 'See Results';
        } else {
            btnNext.textContent = timerExpired ? 'See Results' : 'Next Question';
        }
    }

    // ===========================================================
    //  HINT / ANSWER REVEALS
    // ===========================================================

    btnHint.addEventListener('click', function () {
        hintReveal.classList.toggle('is-open');
        btnHint.textContent = hintReveal.classList.contains('is-open') ? 'Hide Hint' : 'Show Hint';
        saveSession();
    });

    btnAnswer.addEventListener('click', function () {
        answerReveal.classList.toggle('is-open');
        btnAnswer.textContent = answerReveal.classList.contains('is-open') ? 'Hide Answer' : 'Show Answer';
        saveSession();
    });

    // ===========================================================
    //  STAR RATING
    // ===========================================================

    ratingStars.addEventListener('mouseover', function (e) {
        var star = e.target.closest('.rating__star');
        if (!star) return;
        var hoverValue = parseInt(star.dataset.value, 10);
        allStars.forEach(function (s, i) {
            s.classList.toggle('is-hovered', i < hoverValue);
        });
    });

    ratingStars.addEventListener('mouseleave', function () {
        allStars.forEach(function (s) { s.classList.remove('is-hovered'); });
    });

    ratingStars.addEventListener('click', function (e) {
        var star = e.target.closest('.rating__star');
        if (!star) return;

        var tapped = parseInt(star.dataset.value, 10);
        currentRating = tapped === currentRating ? 0 : tapped;
        allStars.forEach(function (s, i) {
            s.classList.toggle('is-active', i < currentRating);
        });
        ratingDesc.textContent = RATING_LABELS[currentRating];
        btnNext.disabled = currentRating === 0;
        saveSession();
    });

    // ===========================================================
    //  ADAPTIVE QUESTION PICKER
    // ===========================================================

    function pickNextQuestion() {
        var avgRating = ratings.reduce(function (a, b) { return a + b; }, 0) / ratings.length;
        var targetLevel;

        if (avgRating >= 4.5) targetLevel = 5;
        else if (avgRating >= 3.8) targetLevel = 4;
        else if (avgRating >= 3.0) targetLevel = 3;
        else if (avgRating >= 2.2) targetLevel = 2;
        else if (avgRating >= 1.5) targetLevel = 1;
        else targetLevel = 0;

        var rand = Math.random();
        if (rand < 0.15 && targetLevel > 0) targetLevel--;
        else if (rand > 0.85 && targetLevel < 5) targetLevel++;

        var topic = selectedTopics[Math.floor(Math.random() * selectedTopics.length)];
        var pool = QUESTION_BANK.filter(function (q) {
            return q.topic === topic && q.level === targetLevel;
        });

        if (pool.length === 0) {
            pool = QUESTION_BANK.filter(function (q) {
                return selectedTopics.indexOf(q.topic) !== -1 && q.level === targetLevel;
            });
        }

        if (pool.length === 0) {
            pool = QUESTION_BANK.filter(function (q) {
                return selectedTopics.indexOf(q.topic) !== -1;
            });
        }

        var used = sessionQuestions.map(function (q) { return q.question; });
        var unused = pool.filter(function (q) { return used.indexOf(q.question) === -1; });
        if (unused.length > 0) pool = unused;

        return pool[Math.floor(Math.random() * pool.length)];
    }

    // ===========================================================
    //  NEXT QUESTION
    // ===========================================================

    btnNext.addEventListener('click', function () {
        ratings.push(currentRating);
        currentQ++;

        var shouldEnd = false;
        if (interviewMode === 'count' && currentQ >= questionCount) {
            shouldEnd = true;
        } else if (interviewMode === 'time' && timerExpired) {
            shouldEnd = true;
        }

        if (shouldEnd) {
            stopTimer();
            showResults();
            return;
        }

        var nextQ = pickNextQuestion();
        sessionQuestions.push(nextQ);
        displayQuestion(currentQ);
        saveSession();
        window.scrollTo(0, 0);
    });

    // ===========================================================
    //  START INTERVIEW
    // ===========================================================

    btnStart.addEventListener('click', function () {
        if (selectedTopics.length === 0 || !interviewerName || !intervieweeName) return;

        // Reset state
        currentQ = 0;
        currentRating = 0;
        ratings = [];
        sessionQuestions = [];
        stopTimer();

        // Pick first question at middle level
        var pool = QUESTION_BANK.filter(function (q) {
            return selectedTopics.indexOf(q.topic) !== -1 && q.level === 2;
        });
        if (pool.length === 0) {
            pool = QUESTION_BANK.filter(function (q) {
                return selectedTopics.indexOf(q.topic) !== -1;
            });
        }
        sessionQuestions.push(pool[Math.floor(Math.random() * pool.length)]);

        // Show interviewee name
        qInterviewee.textContent = intervieweeName;

        // Timer
        if (interviewMode === 'time') {
            qTimer.style.display = '';
            startTimer();
        } else {
            qTimer.style.display = 'none';
        }

        // End button always visible
        btnEnd.style.display = '';

        showScreen('screen-question');
        displayQuestion(0);
        saveSession();
    });

    // ===========================================================
    //  END INTERVIEW (MANUAL)
    // ===========================================================

    btnEnd.addEventListener('click', function () {
        if (currentRating > 0) {
            ratings.push(currentRating);
        } else {
            sessionQuestions.splice(currentQ, 1);
        }
        stopTimer();
        showResults();
    });

    // ===========================================================
    //  RESULTS
    // ===========================================================

    function showResults() {
        stopTimer();
        clearSession();

        // Guard: no rated questions
        if (ratings.length === 0) {
            document.getElementById('levelEmoji').textContent = '🤷';
            document.getElementById('levelName').textContent = 'N/A';
            document.getElementById('levelName').style.color = LEVEL_COLORS[0];
            document.getElementById('resultsSubtitle').textContent = 'No questions were rated during this interview.';
            resultsInterviewee.textContent = intervieweeName + ' — interviewed by ' + interviewerName;
            document.getElementById('statAvg').textContent = '—';
            document.getElementById('statTotal').textContent = '0';
            document.getElementById('statTopics').textContent = '0';
            document.getElementById('breakdownList').innerHTML = '';
            var ring = document.getElementById('levelRing');
            ring.style.setProperty('--ring-color', LEVEL_COLORS[0]);
            ring.style.setProperty('--ring-pct', 0);
            showScreen('screen-results');
            return;
        }

        var avg = ratings.reduce(function (a, b) { return a + b; }, 0) / ratings.length;
        var levelIndex;

        if (avg >= 4.5) levelIndex = 5;
        else if (avg >= 3.8) levelIndex = 4;
        else if (avg >= 3.0) levelIndex = 3;
        else if (avg >= 2.2) levelIndex = 2;
        else if (avg >= 1.5) levelIndex = 1;
        else levelIndex = 0;

        var uniqueTopics = [];
        sessionQuestions.forEach(function (q) {
            if (uniqueTopics.indexOf(q.topic) === -1) uniqueTopics.push(q.topic);
        });

        document.getElementById('levelEmoji').textContent = LEVEL_EMOJIS[levelIndex];
        document.getElementById('levelName').textContent = LEVEL_LABELS[levelIndex];
        document.getElementById('levelName').style.color = LEVEL_COLORS[levelIndex];
        document.getElementById('resultsSubtitle').textContent = LEVEL_DESCS[levelIndex];
        resultsInterviewee.textContent = intervieweeName + ' — interviewed by ' + interviewerName;
        document.getElementById('statAvg').textContent = avg.toFixed(1);
        document.getElementById('statTotal').textContent = ratings.length;
        document.getElementById('statTopics').textContent = uniqueTopics.length;

        var ring = document.getElementById('levelRing');
        var pct = Math.round((avg / 5) * 100);
        ring.style.setProperty('--ring-color', LEVEL_COLORS[levelIndex]);
        ring.style.setProperty('--ring-pct', pct);

        var list = document.getElementById('breakdownList');
        list.innerHTML = '';
        sessionQuestions.forEach(function (q, i) {
            var row = document.createElement('div');
            row.className = 'results__row';

            var starsHtml = '';
            for (var s = 1; s <= 5; s++) {
                var cls = s <= ratings[i] ? 'results__row-star--filled' : 'results__row-star--empty';
                starsHtml += '<svg class="results__row-star ' + cls + '" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
            }

            row.innerHTML =
                '<span class="results__row-num">' + (i + 1) + '</span>' +
                '<span class="results__row-q">' + q.question + '</span>' +
                '<span class="results__row-stars">' + starsHtml + '</span>';

            list.appendChild(row);
        });

        showScreen('screen-results');
    }

    // ===========================================================
    //  RESTART
    // ===========================================================

    document.getElementById('btnRestart').addEventListener('click', function () {
        stopTimer();
        clearSession();
        showScreen('screen-setup');
    });

    // ===========================================================
    //  INIT
    // ===========================================================

    var restored = restoreSession();
    if (!restored) {
        selectAllTopics();
    }
    updateStepper();
    updateTimeStepper();
    updateStartButton();
})();
