(function () {
    'use strict';

    // ---- State ----
    var selectedTopics = [];
    var interviewMode = 'time'; // 'time' or 'count'
    var questionCount = 10;
    var timeLimitMin = 15;
    var MIN_Q = 5;
    var MAX_Q = 30;
    var MIN_TIME = 5;
    var MAX_TIME = 60;
    var TIME_STEP = 5;

    // Timer state
    var timerInterval = null;
    var remainingSeconds = 0;
    var timerExpired = false;

    // ---- DOM refs ----
    var topicGrid = document.getElementById('topicGrid');
    var stepperValue = document.getElementById('stepperValue');
    var stepperMinus = document.getElementById('stepperMinus');
    var stepperPlus = document.getElementById('stepperPlus');
    var btnStart = document.getElementById('btnStart');
    var validationHint = document.getElementById('validationHint');
    var modeToggle = document.getElementById('modeToggle');
    var sectionTime = document.getElementById('sectionTime');
    var sectionCount = document.getElementById('sectionCount');
    var timeMinus = document.getElementById('timeMinus');
    var timePlus = document.getElementById('timePlus');
    var timeValue = document.getElementById('timeValue');
    var qTimer = document.getElementById('qTimer');
    var timerText = document.getElementById('timerText');
    var btnEnd = document.getElementById('btnEnd');

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

    // ---- Time stepper ----
    timeMinus.addEventListener('click', function () {
        if (timeLimitMin > MIN_TIME) {
            timeLimitMin -= TIME_STEP;
            updateTimeStepper();
        }
    });

    timePlus.addEventListener('click', function () {
        if (timeLimitMin < MAX_TIME) {
            timeLimitMin += TIME_STEP;
            updateTimeStepper();
        }
    });

    function updateTimeStepper() {
        timeValue.textContent = timeLimitMin;
        timeMinus.disabled = timeLimitMin <= MIN_TIME;
        timePlus.disabled = timeLimitMin >= MAX_TIME;
    }

    // ---- Topic selection ----
    topicGrid.addEventListener('click', function (e) {
        var chip = e.target.closest('.topic-chip');
        if (!chip) return;

        var topic = chip.dataset.topic;
        chip.classList.toggle('is-selected');

        if (chip.classList.contains('is-selected')) {
            selectedTopics.push(topic);
        } else {
            selectedTopics = selectedTopics.filter(function (t) { return t !== topic; });
        }

        updateStartButton();
    });

    // ---- Count stepper ----
    stepperMinus.addEventListener('click', function () {
        if (questionCount > MIN_Q) {
            questionCount -= 5;
            updateStepper();
        }
    });

    stepperPlus.addEventListener('click', function () {
        if (questionCount < MAX_Q) {
            questionCount += 5;
            updateStepper();
        }
    });

    function updateStepper() {
        stepperValue.textContent = questionCount;
        stepperMinus.disabled = questionCount <= MIN_Q;
        stepperPlus.disabled = questionCount >= MAX_Q;
    }

    var btnToggleAll = document.getElementById('btnToggleAll');
    var allChips = topicGrid.querySelectorAll('.topic-chip');

    function updateStartButton() {
        var hasTopics = selectedTopics.length > 0;
        var allSelected = selectedTopics.length === allChips.length;
        btnStart.disabled = !hasTopics;
        btnToggleAll.textContent = allSelected ? 'Clear All' : 'Select All';
        validationHint.textContent = hasTopics
            ? selectedTopics.length + ' topic' + (selectedTopics.length > 1 ? 's' : '') + ' selected'
            : 'Select at least one topic to begin';
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

    // ---- Screen transitions ----
    function showScreen(id) {
        document.querySelectorAll('.screen').forEach(function (s) {
            s.classList.remove('is-active');
        });
        document.getElementById(id).classList.add('is-active');
        window.scrollTo(0, 0);
    }

    // ---- Timer ----
    function formatTime(seconds) {
        var m = Math.floor(seconds / 60);
        var s = seconds % 60;
        return m + ':' + (s < 10 ? '0' : '') + s;
    }

    function startTimer() {
        remainingSeconds = timeLimitMin * 60;
        timerExpired = false;
        qTimer.style.display = '';
        qTimer.classList.remove('is-warning', 'is-danger');
        timerText.textContent = formatTime(remainingSeconds);

        timerInterval = setInterval(function () {
            remainingSeconds--;
            if (remainingSeconds <= 0) {
                remainingSeconds = 0;
                timerExpired = true;
                clearInterval(timerInterval);
                timerInterval = null;
                timerText.textContent = '0:00';
                qTimer.classList.remove('is-warning');
                qTimer.classList.add('is-danger');
                // Let user finish current question, then auto-end
                btnNext.textContent = 'See Results';
                return;
            }

            timerText.textContent = formatTime(remainingSeconds);

            // Warning at 20% remaining
            var totalSeconds = timeLimitMin * 60;
            if (remainingSeconds <= totalSeconds * 0.2 && remainingSeconds > 60) {
                qTimer.classList.add('is-warning');
                qTimer.classList.remove('is-danger');
            } else if (remainingSeconds <= 60) {
                qTimer.classList.remove('is-warning');
                qTimer.classList.add('is-danger');
            }
        }, 1000);
    }

    function stopTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    // ---- Question screen DOM refs ----
    var progressFill = document.getElementById('progressFill');
    var progressText = document.getElementById('progressText');
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

    var RATING_LABELS = ['', 'No answer', 'Weak', 'Partial', 'Good', 'Perfect'];
    var LEVEL_NAMES = ['intern', 'junior', 'middle', 'senior', 'lead', 'staff'];
    var LEVEL_LABELS = ['Intern', 'Junior', 'Middle', 'Senior', 'Lead', 'Staff'];

    var currentQ = 0;
    var currentRating = 0;
    var ratings = [];
    var sessionQuestions = [];

    // ---- Hint / Answer reveals ----
    btnHint.addEventListener('click', function () {
        hintReveal.classList.toggle('is-open');
        btnHint.textContent = hintReveal.classList.contains('is-open') ? 'Hide Hint' : 'Show Hint';
    });

    btnAnswer.addEventListener('click', function () {
        answerReveal.classList.toggle('is-open');
        btnAnswer.textContent = answerReveal.classList.contains('is-open') ? 'Hide Answer' : 'Show Answer';
    });

    // ---- Star rating ----
    var allStars = ratingStars.querySelectorAll('.rating__star');

    ratingStars.addEventListener('mouseover', function (e) {
        var star = e.target.closest('.rating__star');
        if (!star) return;
        var hoverValue = parseInt(star.dataset.value, 10);
        allStars.forEach(function (s, i) {
            s.classList.toggle('is-hovered', i < hoverValue);
        });
    });

    ratingStars.addEventListener('mouseleave', function () {
        allStars.forEach(function (s) {
            s.classList.remove('is-hovered');
        });
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
    });

    // ---- Swift syntax highlighter ----
    function highlightSwift(code) {
        // Escape HTML first
        var html = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // Comments (// ...)
        html = html.replace(/(\/\/.*)/g, '<span class="cmt">$1</span>');

        // Strings ("...")
        html = html.replace(/("(?:[^"\\]|\\.)*")/g, '<span class="str">$1</span>');

        // Numbers
        html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="num">$1</span>');

        // Keywords
        var keywords = ['func', 'var', 'let', 'class', 'struct', 'enum', 'protocol', 'extension',
            'if', 'else', 'guard', 'switch', 'case', 'default', 'for', 'in', 'while', 'repeat',
            'return', 'throw', 'throws', 'try', 'catch', 'do', 'break', 'continue', 'fallthrough',
            'import', 'typealias', 'associatedtype', 'init', 'deinit', 'self', 'Self',
            'true', 'false', 'nil', 'super', 'where', 'is', 'as',
            'private', 'fileprivate', 'internal', 'public', 'open', 'static', 'final',
            'override', 'mutating', 'nonmutating', 'lazy', 'weak', 'unowned',
            'optional', 'required', 'convenience', 'indirect',
            'async', 'await', 'actor', 'nonisolated', 'isolated',
            'some', 'any', 'inout', 'defer', 'willSet', 'didSet', 'get', 'set',
            '@escaping', '@autoclosure', '@MainActor', '@Published', '@State', '@Observable'];
        var kwPattern = new RegExp('\\b(' + keywords.join('|').replace(/@/g, '@') + ')\\b', 'g');
        // Handle @ keywords separately
        html = html.replace(/@(escaping|autoclosure|MainActor|Published|State|Observable)\b/g, '<span class="kw">@$1</span>');
        html = html.replace(new RegExp('(?<!["\'].*?)\\b(' + keywords.filter(function (k) { return k[0] !== '@'; }).join('|') + ')\\b(?![^<]*>)', 'g'), '<span class="kw">$1</span>');

        // Types (capitalized words not already wrapped)
        html = html.replace(/(?<!["\'].*?)(?<!class="[^"]*)\b([A-Z][a-zA-Z0-9]*)\b(?![^<]*>)/g, '<span class="type">$1</span>');

        // print function
        html = html.replace(/\b(print)\b(?![^<]*>)/g, '<span class="call">$1</span>');

        return html;
    }

    // ---- Display a question ----
    function displayQuestion(index) {
        var q = sessionQuestions[index];

        if (interviewMode === 'count') {
            var progress = ((index) / questionCount) * 100;
            progressFill.style.width = progress + '%';
            progressText.textContent = (index + 1) + ' / ' + questionCount;
        } else {
            // Time mode: show question number only
            var elapsed = timeLimitMin * 60 - remainingSeconds;
            var timePct = (elapsed / (timeLimitMin * 60)) * 100;
            progressFill.style.width = Math.min(timePct, 100) + '%';
            progressText.textContent = 'Q' + (index + 1);
        }

        var isCodeChallenge = q.topic === 'code-challenge';
        qTopic.textContent = isCodeChallenge ? 'CODE CHALLENGE' : q.topic.toUpperCase();
        qTopic.className = 'q-card__topic' + (isCodeChallenge ? ' q-card__topic--code' : '');
        qLevel.textContent = LEVEL_LABELS[q.level];
        qLevel.className = 'q-card__level q-card__level--' + LEVEL_NAMES[q.level];
        qText.textContent = q.question;

        // Code block
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
        ratingStars.querySelectorAll('.rating__star').forEach(function (s) {
            s.classList.remove('is-active');
        });
        ratingDesc.textContent = '';
        btnNext.disabled = true;

        // Button label
        if (interviewMode === 'count') {
            btnNext.textContent = index < questionCount - 1 ? 'Next Question' : 'See Results';
        } else {
            btnNext.textContent = timerExpired ? 'See Results' : 'Next Question';
        }
    }

    // ---- Next question ----
    btnNext.addEventListener('click', function () {
        ratings.push(currentRating);
        currentQ++;

        // End conditions
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

        // Adaptive: pick next question based on performance
        var nextQ = pickNextQuestion();
        sessionQuestions.push(nextQ);
        displayQuestion(currentQ);
        window.scrollTo(0, 0);
    });

    // ---- Adaptive question picker ----
    function pickNextQuestion() {
        var avgRating = ratings.reduce(function (a, b) { return a + b; }, 0) / ratings.length;
        var targetLevel;

        if (avgRating >= 4.5) targetLevel = 5;
        else if (avgRating >= 3.8) targetLevel = 4;
        else if (avgRating >= 3.0) targetLevel = 3;
        else if (avgRating >= 2.2) targetLevel = 2;
        else if (avgRating >= 1.5) targetLevel = 1;
        else targetLevel = 0;

        // Slight variation: 70% target level, 30% adjacent
        var rand = Math.random();
        if (rand < 0.15 && targetLevel > 0) targetLevel--;
        else if (rand > 0.85 && targetLevel < 5) targetLevel++;

        var topic = selectedTopics[Math.floor(Math.random() * selectedTopics.length)];
        var pool = QUESTION_BANK.filter(function (q) {
            return q.topic === topic && q.level === targetLevel;
        });

        // Fallback: any question from selected topics at target level
        if (pool.length === 0) {
            pool = QUESTION_BANK.filter(function (q) {
                return selectedTopics.indexOf(q.topic) !== -1 && q.level === targetLevel;
            });
        }

        // Fallback: any question from selected topics
        if (pool.length === 0) {
            pool = QUESTION_BANK.filter(function (q) {
                return selectedTopics.indexOf(q.topic) !== -1;
            });
        }

        // Avoid repeats
        var used = sessionQuestions.map(function (q) { return q.question; });
        var unused = pool.filter(function (q) { return used.indexOf(q.question) === -1; });
        if (unused.length > 0) pool = unused;

        return pool[Math.floor(Math.random() * pool.length)];
    }

    // ---- Start interview ----
    btnStart.addEventListener('click', function () {
        if (selectedTopics.length === 0) return;

        // Reset state
        currentQ = 0;
        currentRating = 0;
        ratings = [];
        sessionQuestions = [];
        stopTimer();

        // Pick first question at middle level (level 2)
        var pool = QUESTION_BANK.filter(function (q) {
            return selectedTopics.indexOf(q.topic) !== -1 && q.level === 2;
        });
        if (pool.length === 0) {
            pool = QUESTION_BANK.filter(function (q) {
                return selectedTopics.indexOf(q.topic) !== -1;
            });
        }
        sessionQuestions.push(pool[Math.floor(Math.random() * pool.length)]);

        // Timer & End button
        if (interviewMode === 'time') {
            qTimer.style.display = '';
            btnEnd.style.display = '';
            startTimer();
        } else {
            qTimer.style.display = 'none';
            btnEnd.style.display = 'none';
        }

        showScreen('screen-question');
        displayQuestion(0);
    });

    // ---- End Interview (manual) ----
    btnEnd.addEventListener('click', function () {
        // Save current rating if given
        if (currentRating > 0) {
            ratings.push(currentRating);
        } else {
            // Remove the unrated question from session
            sessionQuestions.splice(currentQ, 1);
        }
        stopTimer();
        showResults();
    });

    // ---- Results ----
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

    function showResults() {
        stopTimer();

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

        // Populate
        document.getElementById('levelEmoji').textContent = LEVEL_EMOJIS[levelIndex];
        document.getElementById('levelName').textContent = LEVEL_LABELS[levelIndex];
        document.getElementById('levelName').style.color = LEVEL_COLORS[levelIndex];
        document.getElementById('resultsSubtitle').textContent = LEVEL_DESCS[levelIndex];
        document.getElementById('statAvg').textContent = avg.toFixed(1);
        document.getElementById('statTotal').textContent = ratings.length;
        document.getElementById('statTopics').textContent = uniqueTopics.length;

        // Ring
        var ring = document.getElementById('levelRing');
        var pct = Math.round((avg / 5) * 100);
        ring.style.setProperty('--ring-color', LEVEL_COLORS[levelIndex]);
        ring.style.setProperty('--ring-pct', pct);

        // Breakdown
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

    // ---- Restart ----
    document.getElementById('btnRestart').addEventListener('click', function () {
        stopTimer();
        showScreen('screen-setup');
    });

    // ---- Init ----
    selectAllTopics();
    updateStepper();
    updateTimeStepper();
})();
