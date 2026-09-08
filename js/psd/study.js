(function () {
    'use strict';

    var PSD = window.PSD;
    var state = PSD.state;
    var $ = PSD.$;
    var LETTERS = PSD.LETTERS;
    var difficultyClass = PSD.difficultyClass;
    var escapeHtml = PSD.escapeHtml;
    var getAllCategories = PSD.getAllCategories;
    var getFilteredQuestions = PSD.getFilteredQuestions;
    var isBookmarked = PSD.isBookmarked;
    var isMultiSelect = PSD.isMultiSelect;
    var showScreen = PSD.showScreen;
    var shuffle = PSD.shuffle;
    var toggleBookmark = PSD.toggleBookmark;
    var updateBookmarkBtn = PSD.updateBookmarkBtn;

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
        var qs = PSD.questions.slice();
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
        // id-asc is default order (PSD.questions is already id-asc)

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

    PSD.startFlashcards = startFlashcards;
    PSD.renderFlashcard = renderFlashcard;
    PSD.revealFlashcard = revealFlashcard;
    PSD.openReview = openReview;
    PSD.applyReviewFilters = applyReviewFilters;
    PSD.renderReviewPage = renderReviewPage;
})();
