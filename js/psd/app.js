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
        hideDifficulty: true,
        hideReviewDifficulty: true,
        hideReviewCategory: false,
        hideReviewMulti: false,

        // Review controls
        reviewCategoryFilter: 'all',
        reviewDifficultyFilter: 'all',
        reviewSort: 'id-asc',
        reviewPageSize: 25,
        reviewCurrentPage: 0,
        reviewFiltered: [],

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

        // Add label before the grid cards
        var label = document.createElement('div');
        label.className = 'psd-cat-grid__label';
        label.textContent = 'Question Distribution';
        label.style.gridColumn = '1 / -1';
        container.appendChild(label);

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
        diffEl.style.display = state.hideDifficulty ? 'none' : '';

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
                '<div class="psd-breakdown__bar"><div class="psd-breakdown__fill" style="width:0%;background:' + barColor(pct) + '"></div></div>' +
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

        // Build always-visible options (without correct marking)
        var alwaysOptsEl = document.getElementById('studyOptionsAlways');
        if (!alwaysOptsEl) {
            alwaysOptsEl = document.createElement('div');
            alwaysOptsEl.id = 'studyOptionsAlways';
            alwaysOptsEl.className = 'psd-flashcard__options-always';
            // Insert before the reveal hint
            $('studyHint').parentNode.insertBefore(alwaysOptsEl, $('studyHint'));
        }
        alwaysOptsEl.innerHTML = '';
        alwaysOptsEl.style.display = '';
        q.options.forEach(function (opt, i) {
            var div = document.createElement('div');
            div.className = 'psd-flashcard__opt';
            div.innerHTML =
                '<span class="psd-flashcard__opt-letter">' + LETTERS[i] + '</span>' +
                '<span>' + escapeHtml(opt) + '</span>';
            alwaysOptsEl.appendChild(div);
        });

        // Hide answer (correct marking + explanation)
        state.studyRevealed = false;
        $('studyAnswer').classList.remove('is-visible');
        $('studyHint').style.display = '';
        $('studyHint').textContent = 'Tap to reveal correct answer';

        // Build revealed options (with correct marking)
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
        // Hide always-visible options since revealed section shows them with correct marking
        var alwaysOptsEl = document.getElementById('studyOptionsAlways');
        if (alwaysOptsEl) alwaysOptsEl.style.display = 'none';
    }

    /* ============================================
       REVIEW MODE
       ============================================ */
    var DIFF_ORDER = { 'Easy': 0, 'Medium': 1, 'Hard': 2 };

    function openReview() {
        showScreen('screen-review');
        populateReviewCategoryDropdown();
        applyReviewFilters();
    }

    function populateReviewCategoryDropdown() {
        var sel = $('reviewCategoryFilter');
        var current = sel.value;
        sel.innerHTML = '<option value="all">All Categories</option>';
        var cats = getAllCategories();
        Object.keys(cats).forEach(function (cat) {
            var opt = document.createElement('option');
            opt.value = cat;
            opt.textContent = cat + ' (' + cats[cat] + ')';
            sel.appendChild(opt);
        });
        sel.value = current || 'all';
    }

    function applyReviewFilters() {
        var qs = PSD_QUESTIONS.slice();
        var searchTerm = ($('reviewSearchInput').value || '').toLowerCase().trim();

        // Search
        if (searchTerm) {
            qs = qs.filter(function (q) {
                return q.question.toLowerCase().indexOf(searchTerm) !== -1 ||
                       q.category.toLowerCase().indexOf(searchTerm) !== -1 ||
                       q.explanation.toLowerCase().indexOf(searchTerm) !== -1;
            });
        }

        // Category filter
        if (state.reviewCategoryFilter !== 'all') {
            qs = qs.filter(function (q) { return q.category === state.reviewCategoryFilter; });
        }

        // Difficulty filter
        if (state.reviewDifficultyFilter !== 'all') {
            qs = qs.filter(function (q) { return q.difficulty === state.reviewDifficultyFilter; });
        }

        // Sort
        var sort = state.reviewSort;
        if (sort === 'id-desc') {
            qs.sort(function (a, b) { return b.id - a.id; });
        } else if (sort === 'cat-asc') {
            qs.sort(function (a, b) { return a.category.localeCompare(b.category) || a.id - b.id; });
        } else if (sort === 'cat-desc') {
            qs.sort(function (a, b) { return b.category.localeCompare(a.category) || a.id - b.id; });
        } else if (sort === 'diff-asc') {
            qs.sort(function (a, b) { return (DIFF_ORDER[a.difficulty] || 0) - (DIFF_ORDER[b.difficulty] || 0) || a.id - b.id; });
        } else if (sort === 'diff-desc') {
            qs.sort(function (a, b) { return (DIFF_ORDER[b.difficulty] || 0) - (DIFF_ORDER[a.difficulty] || 0) || a.id - b.id; });
        }
        // id-asc is default order (PSD_QUESTIONS is already id-asc)

        state.reviewFiltered = qs;
        state.reviewCurrentPage = 0;
        renderReviewPage();
    }

    function renderReviewPage() {
        var qs = state.reviewFiltered;
        var total = qs.length;
        var pageSize = state.reviewPageSize === 'all' ? total : state.reviewPageSize;
        var start = state.reviewCurrentPage * pageSize;
        var end = Math.min(start + pageSize, total);
        var page = qs.slice(start, end);

        // Update subtitle & info bar
        $('reviewSubtitle').textContent = total + ' question' + (total !== 1 ? 's' : '');
        $('reviewInfoCount').textContent = total + ' question' + (total !== 1 ? 's' : '');
        $('reviewInfoRange').textContent = total > 0
            ? 'Showing ' + (start + 1) + '\u2013' + end + ' of ' + total
            : 'No results';

        var container = $('reviewList');
        container.innerHTML = '';

        page.forEach(function (q, idx) {
            var correctArr = isMultiSelect(q) ? q.correct : [q.correct];
            var div = document.createElement('div');
            div.className = 'psd-review__item';
            var num = start + idx + 1;
            var numClass = 'psd-review__item-num' + (num >= 100 ? ' psd-review__item-num--wide' : '');

            var markerSvg =
                '<span class="psd-review__answer-marker">' +
                    '<svg class="psd-review__marker-circle" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6"/></svg>' +
                    '<svg class="psd-review__marker-check" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 8.5L6.5 11.5L12.5 4.5"/></svg>' +
                '</span>';

            var answersHtml = q.options.map(function (opt, i) {
                return '<div class="psd-review__answer" data-correct="' + (correctArr.indexOf(i) !== -1 ? '1' : '0') + '">' +
                    markerSvg +
                    '<span>' + LETTERS[i] + '. ' + escapeHtml(opt) + '</span></div>';
            }).join('');

            var catStyle = state.hideReviewCategory ? ' style="display:none"' : '';
            var multiStyle = state.hideReviewMulti ? ' style="display:none"' : '';
            var diffStyle = state.hideReviewDifficulty ? ' style="display:none"' : '';

            var badgesHtml =
                '<span class="psd-badge psd-badge--category psd-review__cat-badge"' + catStyle + '>' + escapeHtml(q.category) + '</span>' +
                (isMultiSelect(q) ? '<span class="psd-badge psd-badge--multi psd-review__multi-badge"' + multiStyle + '>Multi</span>' : '') +
                '<span class="psd-badge psd-review__diff-badge ' + difficultyClass(q.difficulty) + '"' + diffStyle + '>' + q.difficulty + '</span>';

            var explanationHtml =
                '<div class="psd-review__explanation-label">Explanation</div>' +
                '<div class="psd-review__explanation-text">' + escapeHtml(q.explanation) + '</div>' +
                (q.tip ? '<div class="psd-review__tip">' + escapeHtml(q.tip) + '</div>' : '') +
                (q.source ? '<div class="psd-review__source">' + escapeHtml(q.source) + '</div>' : '');

            var eyeSvg = '<svg class="psd-review__reveal-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
                '<path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"/><circle cx="8" cy="8" r="2.5"/></svg>';

            div.innerHTML =
                '<div class="psd-review__item-header">' +
                    '<span class="' + numClass + '">' + num + '</span>' +
                    '<span class="psd-review__item-q">' + escapeHtml(q.question) + '</span>' +
                    '<div class="psd-review__item-badges">' + badgesHtml + '</div>' +
                    '<button class="psd-quiz__bookmark psd-review__bookmark' + (isBookmarked(q.id) ? ' is-active' : '') + '" aria-label="Bookmark question" data-id="' + q.id + '">' +
                        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>' +
                    '</button>' +
                    '<svg class="psd-review__item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>' +
                '</div>' +
                '<div class="psd-review__item-collapse"><div class="psd-review__item-collapse-inner">' +
                    '<div class="psd-review__item-body">' +
                        '<div class="psd-review__answer-list">' + answersHtml + '</div>' +
                        '<button class="psd-review__reveal-btn">' + eyeSvg + ' Show Answer</button>' +
                        '<div class="psd-review__explanation-collapse"><div class="psd-review__explanation-collapse-inner">' +
                            '<div class="psd-review__explanation">' + explanationHtml + '</div>' +
                        '</div></div>' +
                    '</div>' +
                '</div></div>';

            // Bookmark button handler
            div.querySelector('.psd-review__bookmark').addEventListener('click', function (e) {
                e.stopPropagation();
                var id = Number(this.getAttribute('data-id'));
                toggleBookmark(id);
                updateBookmarkBtn(this, id);
            });

            div.querySelector('.psd-review__item-header').addEventListener('click', function () {
                div.classList.toggle('is-open');
            });

            // Reveal button handler — staggered highlights + explanation slide-in
            div.querySelector('.psd-review__reveal-btn').addEventListener('click', function () {
                var btn = this;
                btn.classList.add('is-revealed');
                btn.textContent = 'Answer Revealed';

                var answers = div.querySelectorAll('.psd-review__answer');
                var delay = 0;
                for (var a = 0; a < answers.length; a++) {
                    if (answers[a].getAttribute('data-correct') === '1') {
                        (function (el, d) {
                            setTimeout(function () { el.classList.add('is-correct'); }, d);
                        })(answers[a], delay);
                        delay += 120;
                    }
                }

                var explCollapse = div.querySelector('.psd-review__explanation-collapse');
                setTimeout(function () {
                    explCollapse.classList.add('is-open');
                }, delay + 200);
            });

            container.appendChild(div);
        });

        renderReviewPagination();
    }

    function renderReviewPagination() {
        var container = $('reviewPagination');
        container.innerHTML = '';

        var total = state.reviewFiltered.length;
        var pageSize = state.reviewPageSize === 'all' ? total : state.reviewPageSize;
        if (pageSize <= 0 || total <= 0) return;
        var totalPages = Math.ceil(total / pageSize);
        if (totalPages <= 1) return;

        var current = state.reviewCurrentPage;

        // Prev button
        var prevBtn = document.createElement('button');
        prevBtn.className = 'psd-pag-btn psd-pag-btn--arrow';
        prevBtn.setAttribute('data-page', current - 1);
        prevBtn.disabled = current === 0;
        prevBtn.innerHTML = '\u2039 Prev';
        container.appendChild(prevBtn);

        // Page numbers with ellipsis
        var pages = buildPageNumbers(current, totalPages);
        pages.forEach(function (p) {
            if (p === '...') {
                var span = document.createElement('span');
                span.className = 'psd-pag-ellipsis';
                span.textContent = '\u2026';
                container.appendChild(span);
            } else {
                var btn = document.createElement('button');
                btn.className = 'psd-pag-btn' + (p === current ? ' is-active' : '');
                btn.setAttribute('data-page', p);
                btn.textContent = p + 1;
                container.appendChild(btn);
            }
        });

        // Next button
        var nextBtn = document.createElement('button');
        nextBtn.className = 'psd-pag-btn psd-pag-btn--arrow';
        nextBtn.setAttribute('data-page', current + 1);
        nextBtn.disabled = current === totalPages - 1;
        nextBtn.innerHTML = 'Next \u203A';
        container.appendChild(nextBtn);
    }

    function buildPageNumbers(current, total) {
        if (total <= 7) {
            var arr = [];
            for (var i = 0; i < total; i++) arr.push(i);
            return arr;
        }

        var pages = [];
        pages.push(0);

        if (current > 2) pages.push('...');

        var start = Math.max(1, current - 1);
        var end = Math.min(total - 2, current + 1);
        for (var j = start; j <= end; j++) pages.push(j);

        if (current < total - 3) pages.push('...');

        pages.push(total - 1);
        return pages;
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
        $('hideDifficultyToggle').addEventListener('change', function () {
            state.hideDifficulty = this.checked;
        });
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
        $('btnReviewBack').addEventListener('click', function () { showScreen('screen-home'); updateFilteredCount(); });
        $('btnReviewHome').addEventListener('click', function () { showScreen('screen-home'); updateFilteredCount(); });

        // Review selects
        $('reviewCategoryFilter').addEventListener('change', function () {
            state.reviewCategoryFilter = this.value;
            applyReviewFilters();
        });
        $('reviewDifficultyFilter').addEventListener('change', function () {
            state.reviewDifficultyFilter = this.value;
            applyReviewFilters();
        });
        $('reviewSort').addEventListener('change', function () {
            state.reviewSort = this.value;
            applyReviewFilters();
        });
        $('reviewPageSize').addEventListener('change', function () {
            state.reviewPageSize = this.value === 'all' ? 'all' : parseInt(this.value);
            applyReviewFilters();
        });

        // Review toggles — operate on DOM directly
        $('hideReviewDifficultyToggle').addEventListener('change', function () {
            state.hideReviewDifficulty = this.checked;
            var badges = document.querySelectorAll('#reviewList .psd-review__diff-badge');
            for (var i = 0; i < badges.length; i++) {
                badges[i].style.display = state.hideReviewDifficulty ? 'none' : '';
            }
        });
        $('hideReviewCategoryToggle').addEventListener('change', function () {
            state.hideReviewCategory = this.checked;
            var badges = document.querySelectorAll('#reviewList .psd-review__cat-badge');
            for (var i = 0; i < badges.length; i++) {
                badges[i].style.display = state.hideReviewCategory ? 'none' : '';
            }
        });
        $('hideReviewMultiToggle').addEventListener('change', function () {
            state.hideReviewMulti = this.checked;
            var badges = document.querySelectorAll('#reviewList .psd-review__multi-badge');
            for (var i = 0; i < badges.length; i++) {
                badges[i].style.display = state.hideReviewMulti ? 'none' : '';
            }
        });

        // Review search (debounced)
        var searchTimer = null;
        $('reviewSearchInput').addEventListener('input', function () {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(function () {
                applyReviewFilters();
            }, 250);
        });

        // Pagination — delegated click
        $('reviewPagination').addEventListener('click', function (e) {
            var btn = e.target.closest('.psd-pag-btn');
            if (!btn || btn.disabled) return;
            var page = parseInt(btn.getAttribute('data-page'));
            if (isNaN(page)) return;
            state.reviewCurrentPage = page;
            renderReviewPage();
            $('reviewList').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        // Answer log tabs (results)
        var tabBtns = document.querySelectorAll('#resultTabs .psd-answer-log__tab');
        for (var t = 0; t < tabBtns.length; t++) {
            tabBtns[t].addEventListener('click', function () {
                for (var j = 0; j < tabBtns.length; j++) tabBtns[j].classList.remove('is-active');
                this.classList.add('is-active');
                filterAnswerLog(this.getAttribute('data-filter'));
            });
        }

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
