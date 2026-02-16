(function () {
    'use strict';

    // ---- State ----
    var selectedTopics = [];
    var questionCount = 10;
    var MIN_Q = 5;
    var MAX_Q = 30;

    // ---- DOM refs ----
    var topicGrid = document.getElementById('topicGrid');
    var stepperValue = document.getElementById('stepperValue');
    var stepperMinus = document.getElementById('stepperMinus');
    var stepperPlus = document.getElementById('stepperPlus');
    var btnStart = document.getElementById('btnStart');
    var validationHint = document.getElementById('validationHint');

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

    // ---- Stepper ----
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

    // ---- Question screen DOM refs ----
    var progressFill = document.getElementById('progressFill');
    var progressText = document.getElementById('progressText');
    var qTopic = document.getElementById('qTopic');
    var qLevel = document.getElementById('qLevel');
    var qText = document.getElementById('qText');
    var qHint = document.getElementById('qHint');
    var qAnswer = document.getElementById('qAnswer');
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

    // ---- Display a question ----
    function displayQuestion(index) {
        var q = sessionQuestions[index];
        var progress = ((index) / questionCount) * 100;

        progressFill.style.width = progress + '%';
        progressText.textContent = (index + 1) + ' / ' + questionCount;

        qTopic.textContent = q.topic.toUpperCase();
        qLevel.textContent = LEVEL_LABELS[q.level];
        qLevel.className = 'q-card__level q-card__level--' + LEVEL_NAMES[q.level];
        qText.textContent = q.question;
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
        btnNext.textContent = index < questionCount - 1 ? 'Next Question' : 'See Results';
    }

    // ---- Next question ----
    btnNext.addEventListener('click', function () {
        ratings.push(currentRating);
        currentQ++;

        if (currentQ >= questionCount) {
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

        // Pick first question at middle level (level 2)
        var topic = selectedTopics[Math.floor(Math.random() * selectedTopics.length)];
        var pool = QUESTION_BANK.filter(function (q) {
            return selectedTopics.indexOf(q.topic) !== -1 && q.level === 2;
        });
        if (pool.length === 0) {
            pool = QUESTION_BANK.filter(function (q) {
                return selectedTopics.indexOf(q.topic) !== -1;
            });
        }
        sessionQuestions.push(pool[Math.floor(Math.random() * pool.length)]);

        showScreen('screen-question');
        displayQuestion(0);
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
        showScreen('screen-setup');
    });

    // ---- Init ----
    selectAllTopics();
    updateStepper();
})();
