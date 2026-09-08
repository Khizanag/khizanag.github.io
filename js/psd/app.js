(function () {
    'use strict';

    var PSD = window.PSD;
    var state = PSD.state;
    var $ = PSD.$;
    var applyReviewFilters = PSD.applyReviewFilters;
    var confirmMultiSelect = PSD.confirmMultiSelect;
    var filterAnswerLog = PSD.filterAnswerLog;
    var handleOptionClick = PSD.handleOptionClick;
    var loadQuestions = PSD.loadQuestions;
    var nextQuizQuestion = PSD.nextQuizQuestion;
    var openQuizSetup = PSD.openQuizSetup;
    var openReview = PSD.openReview;
    var renderFlashcard = PSD.renderFlashcard;
    var renderReviewPage = PSD.renderReviewPage;
    var revealFlashcard = PSD.revealFlashcard;
    var selectSize = PSD.selectSize;
    var showScreen = PSD.showScreen;
    var startFlashcards = PSD.startFlashcards;
    var startQuiz = PSD.startQuiz;
    var toggleBookmark = PSD.toggleBookmark;
    var updateBookmarkBtn = PSD.updateBookmarkBtn;
    var updateFilteredCount = PSD.updateFilteredCount;

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
                badges[i].classList.toggle('is-hidden', state.hideReviewDifficulty);
            }
        });
        $('hideReviewCategoryToggle').addEventListener('change', function () {
            state.hideReviewCategory = this.checked;
            var badges = document.querySelectorAll('#reviewList .psd-review__cat-badge');
            for (var i = 0; i < badges.length; i++) {
                badges[i].classList.toggle('is-hidden', state.hideReviewCategory);
            }
        });
        $('hideReviewMultiToggle').addEventListener('change', function () {
            state.hideReviewMulti = this.checked;
            var badges = document.querySelectorAll('#reviewList .psd-review__multi-badge');
            for (var i = 0; i < badges.length; i++) {
                badges[i].classList.toggle('is-hidden', state.hideReviewMulti);
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

    PSD.bindEvents = bindEvents;

    /* ============================================
       BOOTSTRAP
       ============================================ */
    function init() {
        loadQuestions();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
