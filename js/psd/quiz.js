(function () {
    'use strict';

    var PSD = window.PSD;
    var state = PSD.state;
    var $ = PSD.$;
    var LETTERS = PSD.LETTERS;
    var difficultyClass = PSD.difficultyClass;
    var escapeHtml = PSD.escapeHtml;
    var findQuestion = PSD.findQuestion;
    var getFilteredQuestions = PSD.getFilteredQuestions;
    var getGrade = PSD.getGrade;
    var isMultiSelect = PSD.isMultiSelect;
    var showScreen = PSD.showScreen;
    var shuffle = PSD.shuffle;
    var updateBookmarkBtn = PSD.updateBookmarkBtn;

    /* ============================================
       QUIZ SETUP
       ============================================ */
    function openQuizSetup() {
        var available = getFilteredQuestions().length;
        $('setupAvailable').textContent = available;
        $('sizeAllNum').textContent = available;
        showScreen('screen-setup');
    }

    function selectSize(size) {
        state.quizSize = size;
        var btns = document.querySelectorAll('#sizeOptions .psd-size-btn');
        for (var i = 0; i < btns.length; i++) {
            btns[i].classList.remove('is-selected');
            if (btns[i].getAttribute('data-size') === String(size)) {
                btns[i].classList.add('is-selected');
            }
        }
    }

    /* ============================================
       QUIZ ENGINE
       ============================================ */
    function startQuiz() {
        var pool = getFilteredQuestions();
        if (pool.length === 0) return;

        var size = state.quizSize === 'all' ? pool.length : Math.min(state.quizSize, pool.length);
        state.quizQuestions = shuffle(pool).slice(0, size);
        state.quizIndex = 0;
        state.quizAnswers = [];
        state.quizStreak = 0;
        state.quizBestStreak = 0;
        state.quizMultiSelected = [];
        state.quizAnswered = false;

        showScreen('screen-quiz');
        renderQuizQuestion();
    }

    function renderQuizQuestion() {
        var q = state.quizQuestions[state.quizIndex];
        var total = state.quizQuestions.length;
        var pct = ((state.quizIndex) / total * 100);

        // Progress
        $('quizFill').style.width = pct + '%';
        $('quizCounter').textContent = (state.quizIndex + 1) + ' / ' + total;

        // Streak
        $('quizStreak').textContent = state.quizStreak > 1 ? '\u{1F525} ' + state.quizStreak + ' streak' : '';

        // Meta badges
        $('quizCategory').textContent = q.category;
        var diffEl = $('quizDifficulty');
        diffEl.textContent = q.difficulty;
        diffEl.className = 'psd-badge ' + difficultyClass(q.difficulty);
        diffEl.style.display = state.hideDifficulty ? 'none' : '';

        var multiEl = $('quizMulti');
        var multi = isMultiSelect(q);
        if (multi) {
            multiEl.classList.remove('is-hidden');
            multiEl.textContent = 'Select ' + q.correct.length;
        } else {
            multiEl.classList.add('is-hidden');
        }

        // Bookmark
        updateBookmarkBtn($('quizBookmark'), q.id);

        // Question
        $('quizQuestion').textContent = q.question;

        // Options
        var optContainer = $('quizOptions');
        optContainer.innerHTML = '';
        q.options.forEach(function (opt, i) {
            var btn = document.createElement('button');
            btn.className = 'psd-option';
            btn.setAttribute('data-index', i);
            btn.innerHTML =
                '<span class="psd-option__letter">' + LETTERS[i] + '</span>' +
                '<span class="psd-option__text">' + escapeHtml(opt) + '</span>';
            btn.addEventListener('click', function () { handleOptionClick(i); });
            optContainer.appendChild(btn);
        });

        // Confirm button for multi-select
        var confirmWrap = $('quizConfirmWrap');
        if (multi) {
            confirmWrap.classList.remove('is-hidden');
            $('btnConfirm').disabled = true;
        } else {
            confirmWrap.classList.add('is-hidden');
        }

        // Hide explanation & next
        $('quizExplanation').classList.remove('is-visible');
        $('quizNextWrap').classList.remove('is-visible');

        state.quizAnswered = false;
        state.quizMultiSelected = [];
    }

    function handleOptionClick(idx) {
        if (state.quizAnswered) return;

        var q = state.quizQuestions[state.quizIndex];

        if (isMultiSelect(q)) {
            // Toggle selection
            var pos = state.quizMultiSelected.indexOf(idx);
            if (pos === -1) { state.quizMultiSelected.push(idx); }
            else { state.quizMultiSelected.splice(pos, 1); }

            // Update UI
            var opts = document.querySelectorAll('#quizOptions .psd-option');
            for (var i = 0; i < opts.length; i++) {
                var oi = parseInt(opts[i].getAttribute('data-index'));
                if (state.quizMultiSelected.indexOf(oi) !== -1) {
                    opts[i].classList.add('is-multi-selected');
                } else {
                    opts[i].classList.remove('is-multi-selected');
                }
            }

            $('btnConfirm').disabled = state.quizMultiSelected.length === 0;
        } else {
            // Single answer — submit immediately
            submitAnswer([idx]);
        }
    }

    function confirmMultiSelect() {
        if (state.quizMultiSelected.length === 0) return;
        submitAnswer(state.quizMultiSelected);
    }

    function submitAnswer(selected) {
        state.quizAnswered = true;

        var q = state.quizQuestions[state.quizIndex];
        var correctArr = isMultiSelect(q) ? q.correct : [q.correct];
        var isCorrect = arraysEqual(selected.slice().sort(), correctArr.slice().sort());

        // Track answer
        state.quizAnswers.push({
            questionId: q.id,
            selected: selected,
            correct: correctArr,
            isCorrect: isCorrect,
        });

        if (isCorrect) {
            state.quizStreak++;
            if (state.quizStreak > state.quizBestStreak) state.quizBestStreak = state.quizStreak;
        } else {
            state.quizStreak = 0;
        }

        // Update option states
        var opts = document.querySelectorAll('#quizOptions .psd-option');
        for (var i = 0; i < opts.length; i++) {
            var oi = parseInt(opts[i].getAttribute('data-index'));
            opts[i].classList.remove('is-multi-selected');

            if (correctArr.indexOf(oi) !== -1) {
                opts[i].classList.add('is-correct');
            } else if (selected.indexOf(oi) !== -1) {
                opts[i].classList.add('is-wrong');
            } else {
                opts[i].classList.add('is-disabled');
            }
        }

        // Hide confirm
        $('quizConfirmWrap').classList.add('is-hidden');

        // Show explanation
        $('quizExplText').textContent = q.explanation;
        $('quizExplTip').textContent = q.tip || '';
        $('quizExplTip').style.display = q.tip ? '' : 'none';
        $('quizExplSource').textContent = q.source || '';
        $('quizExplSource').style.display = q.source ? '' : 'none';
        $('quizExplanation').classList.add('is-visible');

        // Show next button
        $('quizNextWrap').classList.add('is-visible');

        // Update streak display
        $('quizStreak').textContent = state.quizStreak > 1 ? '\u{1F525} ' + state.quizStreak + ' streak' : '';
    }

    function nextQuizQuestion() {
        state.quizIndex++;
        if (state.quizIndex >= state.quizQuestions.length) {
            showResults();
        } else {
            renderQuizQuestion();
        }
    }

    function arraysEqual(a, b) {
        if (a.length !== b.length) return false;
        for (var i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    /* ============================================
       RESULTS
       ============================================ */
    function showResults() {
        showScreen('screen-results');

        var total = state.quizAnswers.length;
        var correct = state.quizAnswers.filter(function (a) { return a.isCorrect; }).length;
        var wrong = total - correct;
        var pct = Math.round((correct / total) * 100);
        var grade = getGrade(pct);

        // Ring animation
        var circumference = 2 * Math.PI * 54; // r=54
        var offset = circumference - (pct / 100 * circumference);
        var ring = $('resultRing');
        ring.style.strokeDasharray = circumference;
        ring.style.strokeDashoffset = circumference;
        setTimeout(function () { ring.style.strokeDashoffset = offset; }, 50);

        // Text
        $('resultPct').textContent = pct + '%';
        $('resultGrade').textContent = grade;
        $('resultCorrect').textContent = correct;
        $('resultWrong').textContent = wrong;
        $('resultStreak').textContent = state.quizBestStreak;

        if (pct >= 85) {
            $('resultTitle').textContent = 'Excellent!';
            $('resultSubtitle').textContent = 'You\'re well prepared for the PSD exam.';
        } else if (pct >= 70) {
            $('resultTitle').textContent = 'Good Job!';
            $('resultSubtitle').textContent = 'A bit more study and you\'ll be ready.';
        } else {
            $('resultTitle').textContent = 'Keep Studying!';
            $('resultSubtitle').textContent = 'Review the missed questions and try again.';
        }

        // Category breakdown
        renderBreakdown();

        // Full answer log
        renderAnswerLog();
    }

    function renderBreakdown() {
        var container = $('resultBreakdown');
        // Remove old rows (keep title)
        var rows = container.querySelectorAll('.psd-breakdown__row');
        for (var i = 0; i < rows.length; i++) rows[i].remove();

        var cats = {};
        state.quizAnswers.forEach(function (a) {
            var q = findQuestion(a.questionId);
            if (!q) return;
            if (!cats[q.category]) cats[q.category] = { correct: 0, total: 0 };
            cats[q.category].total++;
            if (a.isCorrect) cats[q.category].correct++;
        });

        Object.keys(cats).forEach(function (cat) {
            var d = cats[cat];
            var pct = Math.round((d.correct / d.total) * 100);
            var row = document.createElement('div');
            row.className = 'psd-breakdown__row';
            row.innerHTML =
                '<span class="psd-breakdown__name">' + escapeHtml(cat) + '</span>' +
                '<div class="psd-breakdown__bar"><div class="psd-breakdown__fill ' + barClass(pct) + '"></div></div>' +
                '<span class="psd-breakdown__pct">' + pct + '%</span>';
            container.appendChild(row);

            // Animate bar
            setTimeout(function () {
                row.querySelector('.psd-breakdown__fill').style.width = pct + '%';
            }, 100);
        });
    }

    function renderAnswerLog() {
        var container = $('resultAnswerList');
        container.innerHTML = '';

        if (state.quizAnswers.length === 0) {
            $('resultAnswerLog').style.display = 'none';
            return;
        }
        $('resultAnswerLog').style.display = '';

        state.quizAnswers.forEach(function (a) {
            var q = findQuestion(a.questionId);
            if (!q) return;

            var correctArr = Array.isArray(q.correct) ? q.correct : [q.correct];
            var selected = a.selected;

            var optionsHtml = q.options.map(function (opt, i) {
                var isSel = selected.indexOf(i) !== -1;
                var isCor = correctArr.indexOf(i) !== -1;
                var cls = 'psd-answer-log__opt';
                var marker = '\u25CB';

                if (isCor && isSel) {
                    cls += ' psd-answer-log__opt--correct';
                    marker = '\u2705';
                } else if (isCor) {
                    cls += ' psd-answer-log__opt--correct';
                    marker = '\u2705';
                } else if (isSel) {
                    cls += ' psd-answer-log__opt--user-wrong';
                    marker = '\u274C';
                }

                return '<div class="' + cls + '">' +
                    '<span class="psd-answer-log__opt-marker">' + marker + '</span>' +
                    '<span>' + LETTERS[i] + '. ' + escapeHtml(opt) + '</span></div>';
            }).join('');

            var div = document.createElement('div');
            div.className = 'psd-answer-log__item';
            div.setAttribute('data-result', a.isCorrect ? 'correct' : 'wrong');
            div.innerHTML =
                '<div class="psd-answer-log__header">' +
                    '<span class="psd-answer-log__status psd-answer-log__status--' + (a.isCorrect ? 'correct' : 'wrong') + '">' +
                        (a.isCorrect ? '\u2713' : '\u2717') + '</span>' +
                    '<span class="psd-answer-log__q">' + escapeHtml(q.question) + '</span>' +
                    '<svg class="psd-answer-log__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>' +
                '</div>' +
                '<div class="psd-answer-log__body">' +
                    '<div class="psd-answer-log__options">' + optionsHtml + '</div>' +
                    '<div class="psd-answer-log__explanation">' + escapeHtml(q.explanation) + '</div>' +
                '</div>';

            div.querySelector('.psd-answer-log__header').addEventListener('click', function () {
                div.classList.toggle('is-open');
            });

            container.appendChild(div);
        });
    }

    function filterAnswerLog(filter) {
        var items = document.querySelectorAll('.psd-answer-log__item');
        for (var i = 0; i < items.length; i++) {
            if (filter === 'all' || items[i].getAttribute('data-result') === filter) {
                items[i].style.display = '';
            } else {
                items[i].style.display = 'none';
            }
        }
    }

    function barClass(pct) {
        if (pct >= 80) return 'psd-breakdown__fill--green';
        if (pct >= 60) return 'psd-breakdown__fill--teal';
        if (pct >= 40) return 'psd-breakdown__fill--orange';
        return 'psd-breakdown__fill--red';
    }

    PSD.openQuizSetup = openQuizSetup;
    PSD.selectSize = selectSize;
    PSD.startQuiz = startQuiz;
    PSD.handleOptionClick = handleOptionClick;
    PSD.confirmMultiSelect = confirmMultiSelect;
    PSD.nextQuizQuestion = nextQuizQuestion;
    PSD.filterAnswerLog = filterAnswerLog;
})();
