(function () {
    'use strict';

    /* ============================================
       CATEGORY ICONS
       ============================================ */
    var CAT_ICONS = {
        'Scrum Framework': '\u{1F3D7}',
        'Cross-functional Teams': '\u{1F465}',
        'Done & Quality': '\u2705',
        'Sprint Events': '\u{1F4C5}',
        'DevOps & Engineering': '\u2699\uFE0F',
        'Backlog Management': '\u{1F4CB}',
        'Scrum Master': '\u{1F9D1}\u200D\u{1F3EB}',
        'Testing & Quality': '\u{1F9EA}',
        'Agile Principles': '\u{1F4A1}',
        'Advanced Scrum': '\u{1F680}',
    };

    /* ============================================
       STATE
       ============================================ */
    var state = {
        // Filters
        selectedCategories: [],
        selectedDifficulties: ['Easy', 'Medium', 'Hard'],
        bookmarkOnly: false,
        bookmarks: loadBookmarks(),

        // Quiz
        quizSize: 20,
        quizQuestions: [],
        quizIndex: 0,
        quizAnswers: [],
        quizStreak: 0,
        quizBestStreak: 0,
        quizMultiSelected: [],
        quizAnswered: false,

        // Flashcards
        studyQuestions: [],
        studyIndex: 0,
        studyRevealed: false,
    };

    /* ============================================
       DOM REFS
       ============================================ */
    var $ = function (id) { return document.getElementById(id); };

    /* ============================================
       INIT
       ============================================ */
    function init() {
        buildCategoryChips();
        buildCatGrid();
        updateFilteredCount();
        bindEvents();
        InterviewUtils.initThemeToggle('btnTheme');
    }

    /* ============================================
       HELPERS
       ============================================ */
    function getAllCategories() {
        var cats = {};
        PSD_QUESTIONS.forEach(function (q) { cats[q.category] = (cats[q.category] || 0) + 1; });
        return cats;
    }

    function getFilteredQuestions() {
        var qs = PSD_QUESTIONS;
        if (state.selectedCategories.length > 0) {
            qs = qs.filter(function (q) { return state.selectedCategories.indexOf(q.category) !== -1; });
        }
        qs = qs.filter(function (q) { return state.selectedDifficulties.indexOf(q.difficulty) !== -1; });
        if (state.bookmarkOnly) {
            qs = qs.filter(function (q) { return state.bookmarks.indexOf(q.id) !== -1; });
        }
        return qs;
    }

    function shuffle(arr) {
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var t = a[i]; a[i] = a[j]; a[j] = t;
        }
        return a;
    }

    function isMultiSelect(q) {
        return Array.isArray(q.correct);
    }

    function loadBookmarks() {
        try { return JSON.parse(localStorage.getItem('psd-bookmarks')) || []; }
        catch (e) { return []; }
    }

    function saveBookmarks() {
        try { localStorage.setItem('psd-bookmarks', JSON.stringify(state.bookmarks)); }
        catch (e) { /* ignore */ }
    }

    function toggleBookmark(id) {
        var idx = state.bookmarks.indexOf(id);
        if (idx === -1) { state.bookmarks.push(id); }
        else { state.bookmarks.splice(idx, 1); }
        saveBookmarks();
    }

    function isBookmarked(id) {
        return state.bookmarks.indexOf(id) !== -1;
    }

    function difficultyClass(d) {
        if (d === 'Easy') return 'psd-badge--easy';
        if (d === 'Medium') return 'psd-badge--medium';
        return 'psd-badge--hard';
    }

    var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    function getGrade(pct) {
        if (pct >= 95) return 'A+';
        if (pct >= 90) return 'A';
        if (pct >= 85) return 'B+';
        if (pct >= 80) return 'B';
        if (pct >= 70) return 'C';
        if (pct >= 60) return 'D';
        return 'F';
    }

    /* ============================================
       SCREEN SWITCHING
       ============================================ */
    function showScreen(id) {
        var screens = document.querySelectorAll('.screen');
        for (var i = 0; i < screens.length; i++) {
            screens[i].classList.remove('is-active');
        }
        var target = $(id);
        if (target) {
            target.classList.add('is-active');
            window.scrollTo(0, 0);
        }
    }

    /* ============================================
       HOME SCREEN
       ============================================ */
    function buildCategoryChips() {
        var cats = getAllCategories();
        var container = $('categoryChips');
        container.innerHTML = '';
        Object.keys(cats).forEach(function (cat) {
            var btn = document.createElement('button');
            btn.className = 'psd-chip';
            btn.setAttribute('data-category', cat);
            btn.textContent = cat;
            btn.addEventListener('click', function () {
                toggleCategory(cat);
            });
            container.appendChild(btn);
        });
    }

    function buildCatGrid() {
        var cats = getAllCategories();
        var container = $('catGrid');
        container.innerHTML = '';
        Object.keys(cats).forEach(function (cat) {
            var div = document.createElement('div');
            div.className = 'psd-cat-card';
            div.innerHTML =
                '<span class="psd-cat-card__icon">' + (CAT_ICONS[cat] || '\u{1F4D6}') + '</span>' +
                '<div class="psd-cat-card__body">' +
                    '<div class="psd-cat-card__name">' + cat + '</div>' +
                    '<div class="psd-cat-card__count">' + cats[cat] + ' questions</div>' +
                '</div>';
            container.appendChild(div);
        });
    }

    function toggleCategory(cat) {
        var idx = state.selectedCategories.indexOf(cat);
        if (idx === -1) { state.selectedCategories.push(cat); }
        else { state.selectedCategories.splice(idx, 1); }
        updateCategoryChipUI();
        updateFilteredCount();
    }

    function updateCategoryChipUI() {
        var chips = document.querySelectorAll('#categoryChips .psd-chip');
        for (var i = 0; i < chips.length; i++) {
            var cat = chips[i].getAttribute('data-category');
            if (state.selectedCategories.length === 0 || state.selectedCategories.indexOf(cat) !== -1) {
                chips[i].classList.add('is-selected');
            } else {
                chips[i].classList.remove('is-selected');
            }
        }
        // When no specific selection, show all as "selected" (default)
        if (state.selectedCategories.length === 0) {
            for (var j = 0; j < chips.length; j++) {
                chips[j].classList.remove('is-selected');
            }
        }
    }

    function updateFilteredCount() {
        var qs = getFilteredQuestions();
        $('filteredCount').textContent = qs.length + ' question' + (qs.length !== 1 ? 's' : '');
    }

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

        var multiEl = $('quizMulti');
        var multi = isMultiSelect(q);
        if (multi) {
            multiEl.style.display = '';
            multiEl.textContent = 'Select ' + q.correct.length;
        } else {
            multiEl.style.display = 'none';
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
            confirmWrap.style.display = '';
            $('btnConfirm').disabled = true;
        } else {
            confirmWrap.style.display = 'none';
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
        $('quizConfirmWrap').style.display = 'none';

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

        // Missed questions
        renderMissed();
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
                '<div class="psd-breakdown__bar"><div class="psd-breakdown__fill" style="width:0%;background:' + barColor(pct) + '"></div></div>' +
                '<span class="psd-breakdown__pct">' + pct + '%</span>';
            container.appendChild(row);

            // Animate bar
            setTimeout(function () {
                row.querySelector('.psd-breakdown__fill').style.width = pct + '%';
            }, 100);
        });
    }

    function renderMissed() {
        var container = $('resultMissed');
        var items = container.querySelectorAll('.psd-missed__item');
        for (var i = 0; i < items.length; i++) items[i].remove();

        var missed = state.quizAnswers.filter(function (a) { return !a.isCorrect; });

        if (missed.length === 0) {
            container.style.display = 'none';
            return;
        }
        container.style.display = '';

        missed.forEach(function (a) {
            var q = findQuestion(a.questionId);
            if (!q) return;
            var correctLabels = (Array.isArray(q.correct) ? q.correct : [q.correct]).map(function (ci) {
                return LETTERS[ci] + '. ' + q.options[ci];
            }).join(', ');

            var div = document.createElement('div');
            div.className = 'psd-missed__item';
            div.innerHTML =
                '<div class="psd-missed__q">' + escapeHtml(q.question) + '</div>' +
                '<div class="psd-missed__answer">Correct: <strong>' + escapeHtml(correctLabels) + '</strong></div>';
            container.appendChild(div);
        });
    }

    function barColor(pct) {
        if (pct >= 80) return 'var(--color-green)';
        if (pct >= 60) return 'var(--color-teal)';
        if (pct >= 40) return 'var(--color-orange)';
        return 'var(--color-red)';
    }

    function findQuestion(id) {
        for (var i = 0; i < PSD_QUESTIONS.length; i++) {
            if (PSD_QUESTIONS[i].id === id) return PSD_QUESTIONS[i];
        }
        return null;
    }

    /* ============================================
       FLASHCARDS
       ============================================ */
    function startFlashcards() {
        var pool = getFilteredQuestions();
        if (pool.length === 0) return;
        state.studyQuestions = shuffle(pool);
        state.studyIndex = 0;
        state.studyRevealed = false;
        showScreen('screen-study');
        renderFlashcard();
    }

    function renderFlashcard() {
        var q = state.studyQuestions[state.studyIndex];
        var total = state.studyQuestions.length;

        // Progress
        $('studyFill').style.width = ((state.studyIndex + 1) / total * 100) + '%';
        $('studyCounter').textContent = (state.studyIndex + 1) + ' / ' + total;

        // Badges
        $('studyCategory').textContent = q.category;
        var diffEl = $('studyDifficulty');
        diffEl.textContent = q.difficulty;
        diffEl.className = 'psd-badge ' + difficultyClass(q.difficulty);

        // Bookmark
        updateBookmarkBtn($('studyBookmark'), q.id);

        // Question
        $('studyQuestion').textContent = q.question;

        // Hide answer
        state.studyRevealed = false;
        $('studyAnswer').classList.remove('is-visible');
        $('studyHint').style.display = '';

        // Build options
        var optContainer = $('studyOptions');
        optContainer.innerHTML = '';
        var correctArr = isMultiSelect(q) ? q.correct : [q.correct];
        q.options.forEach(function (opt, i) {
            var div = document.createElement('div');
            div.className = 'psd-flashcard__opt' + (correctArr.indexOf(i) !== -1 ? ' is-correct' : '');
            div.innerHTML =
                '<span class="psd-flashcard__opt-letter">' + LETTERS[i] + '</span>' +
                '<span>' + escapeHtml(opt) + '</span>';
            optContainer.appendChild(div);
        });

        // Explanation
        $('studyExplText').textContent = q.explanation;
        $('studyExplTip').textContent = q.tip || '';
        $('studyExplTip').style.display = q.tip ? '' : 'none';
        $('studyExplSource').textContent = q.source || '';
        $('studyExplSource').style.display = q.source ? '' : 'none';

        // Nav buttons
        $('btnStudyPrev').disabled = state.studyIndex === 0;
    }

    function revealFlashcard() {
        if (state.studyRevealed) return;
        state.studyRevealed = true;
        $('studyAnswer').classList.add('is-visible');
        $('studyHint').style.display = 'none';
    }

    /* ============================================
       REVIEW MODE
       ============================================ */
    function openReview() {
        showScreen('screen-review');
        renderReviewList();
    }

    function renderReviewList() {
        var qs = getFilteredQuestions();
        $('reviewSubtitle').textContent = qs.length + ' question' + (qs.length !== 1 ? 's' : '');

        var container = $('reviewList');
        container.innerHTML = '';

        qs.forEach(function (q, idx) {
            var correctArr = isMultiSelect(q) ? q.correct : [q.correct];
            var div = document.createElement('div');
            div.className = 'psd-review__item';

            var answersHtml = q.options.map(function (opt, i) {
                var isCor = correctArr.indexOf(i) !== -1;
                return '<div class="psd-review__answer' + (isCor ? ' is-correct' : '') + '">' +
                    '<span class="psd-review__answer-marker">' + (isCor ? '\u2705' : '\u25CB') + '</span>' +
                    '<span>' + LETTERS[i] + '. ' + escapeHtml(opt) + '</span></div>';
            }).join('');

            div.innerHTML =
                '<div class="psd-review__item-header">' +
                    '<span class="psd-review__item-num">' + (idx + 1) + '</span>' +
                    '<span class="psd-review__item-q">' + escapeHtml(q.question) + '</span>' +
                    '<div class="psd-review__item-badges">' +
                        '<span class="psd-badge ' + difficultyClass(q.difficulty) + '">' + q.difficulty + '</span>' +
                    '</div>' +
                    '<svg class="psd-review__item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>' +
                '</div>' +
                '<div class="psd-review__item-body">' +
                    '<div class="psd-review__answer-list">' + answersHtml + '</div>' +
                    '<div class="psd-review__explanation">' + escapeHtml(q.explanation) + '</div>' +
                '</div>';

            div.querySelector('.psd-review__item-header').addEventListener('click', function () {
                div.classList.toggle('is-open');
            });

            container.appendChild(div);
        });
    }

    /* ============================================
       BOOKMARKS
       ============================================ */
    function updateBookmarkBtn(btn, id) {
        if (isBookmarked(id)) {
            btn.classList.add('is-active');
        } else {
            btn.classList.remove('is-active');
        }
    }

    /* ============================================
       UTILITY
       ============================================ */
    function escapeHtml(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    /* ============================================
       EVENT BINDINGS
       ============================================ */
    function bindEvents() {
        // Mode cards
        var modeCards = document.querySelectorAll('.psd-mode-card');
        for (var i = 0; i < modeCards.length; i++) {
            modeCards[i].addEventListener('click', function () {
                var mode = this.getAttribute('data-mode');
                if (mode === 'quiz') openQuizSetup();
                else if (mode === 'study') startFlashcards();
                else if (mode === 'review') openReview();
            });
        }

        // Difficulty chips
        var diffChips = document.querySelectorAll('#difficultyChips .psd-chip');
        for (var d = 0; d < diffChips.length; d++) {
            diffChips[d].addEventListener('click', function () {
                var diff = this.getAttribute('data-difficulty');
                var idx = state.selectedDifficulties.indexOf(diff);
                if (idx === -1) {
                    state.selectedDifficulties.push(diff);
                    this.classList.add('is-selected');
                } else {
                    state.selectedDifficulties.splice(idx, 1);
                    this.classList.remove('is-selected');
                }
                updateFilteredCount();
            });
        }

        // Bookmark filter
        $('bookmarkFilter').addEventListener('click', function () {
            state.bookmarkOnly = !state.bookmarkOnly;
            this.classList.toggle('is-active', state.bookmarkOnly);
            updateFilteredCount();
        });

        // Quiz setup
        var sizeBtns = document.querySelectorAll('#sizeOptions .psd-size-btn');
        for (var s = 0; s < sizeBtns.length; s++) {
            sizeBtns[s].addEventListener('click', function () {
                var val = this.getAttribute('data-size');
                selectSize(val === 'all' ? 'all' : parseInt(val));
            });
        }
        $('btnSetupBack').addEventListener('click', function () { showScreen('screen-home'); });
        $('btnStartQuiz').addEventListener('click', startQuiz);

        // Quiz
        $('btnConfirm').addEventListener('click', confirmMultiSelect);
        $('btnQuizNext').addEventListener('click', nextQuizQuestion);

        // Quiz bookmark
        $('quizBookmark').addEventListener('click', function () {
            var q = state.quizQuestions[state.quizIndex];
            toggleBookmark(q.id);
            updateBookmarkBtn(this, q.id);
        });

        // Results
        $('btnRetryQuiz').addEventListener('click', function () {
            openQuizSetup();
        });
        $('btnResultsHome').addEventListener('click', function () { showScreen('screen-home'); updateFilteredCount(); });

        // Flashcard
        $('flashcard').addEventListener('click', revealFlashcard);
        $('btnStudyPrev').addEventListener('click', function () {
            if (state.studyIndex > 0) {
                state.studyIndex--;
                renderFlashcard();
            }
        });
        $('btnStudyNext').addEventListener('click', function () {
            if (state.studyIndex < state.studyQuestions.length - 1) {
                state.studyIndex++;
                renderFlashcard();
            } else {
                showScreen('screen-home');
                updateFilteredCount();
            }
        });
        $('studyBookmark').addEventListener('click', function (e) {
            e.stopPropagation();
            var q = state.studyQuestions[state.studyIndex];
            toggleBookmark(q.id);
            updateBookmarkBtn(this, q.id);
        });
        $('btnStudyHome').addEventListener('click', function () { showScreen('screen-home'); updateFilteredCount(); });

        // Review
        $('btnReviewHome').addEventListener('click', function () { showScreen('screen-home'); updateFilteredCount(); });

        // Keyboard navigation
        document.addEventListener('keydown', function (e) {
            var active = document.querySelector('.screen.is-active');
            if (!active) return;
            var screenId = active.id;

            if (screenId === 'screen-quiz' && state.quizAnswered) {
                if (e.key === 'Enter' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    nextQuizQuestion();
                }
            }

            if (screenId === 'screen-study') {
                if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    revealFlashcard();
                }
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    $('btnStudyPrev').click();
                }
                if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    $('btnStudyNext').click();
                }
            }

            if (screenId === 'screen-quiz' && !state.quizAnswered) {
                var q = state.quizQuestions[state.quizIndex];
                // Number keys 1-8 to select options
                var num = parseInt(e.key);
                if (num >= 1 && num <= q.options.length) {
                    e.preventDefault();
                    handleOptionClick(num - 1);
                }
            }
        });
    }

    /* ============================================
       BOOTSTRAP
       ============================================ */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
