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
       HELPERS
       ============================================ */
    function getAllCategories() {
        var cats = {};
        PSD.questions.forEach(function (q) { cats[q.category] = (cats[q.category] || 0) + 1; });
        return cats;
    }

    function getFilteredQuestions() {
        var qs = PSD.questions;
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

    function findQuestion(id) {
        for (var i = 0; i < PSD.questions.length; i++) {
            if (PSD.questions[i].id === id) return PSD.questions[i];
        }
        return null;
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
    function escapeHtml(text) {
        if (!text) return '';
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    /* ============================================
       SHARED NAMESPACE
       ============================================ */
    var PSD = window.PSD = {
        questions: [],
        state: state,
        $: $,
        CAT_ICONS: CAT_ICONS,
        LETTERS: LETTERS,
        getAllCategories: getAllCategories,
        getFilteredQuestions: getFilteredQuestions,
        shuffle: shuffle,
        isMultiSelect: isMultiSelect,
        toggleBookmark: toggleBookmark,
        isBookmarked: isBookmarked,
        difficultyClass: difficultyClass,
        getGrade: getGrade,
        showScreen: showScreen,
        findQuestion: findQuestion,
        updateBookmarkBtn: updateBookmarkBtn,
        escapeHtml: escapeHtml,
    };
})();
