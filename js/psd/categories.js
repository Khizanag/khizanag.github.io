(function () {
    'use strict';

    var PSD = window.PSD;
    var state = PSD.state;
    var $ = PSD.$;
    var CAT_ICONS = PSD.CAT_ICONS;
    var getAllCategories = PSD.getAllCategories;
    var getFilteredQuestions = PSD.getFilteredQuestions;

    /* ============================================
       QUESTION BANK
       ============================================ */
    var QUESTIONS_URL = 'js/psd/questions.json';

    function loadQuestions() {
        renderBankStatus('Loading questions\u2026', false);
        var failed = false;
        fetch(QUESTIONS_URL)
            .then(function (response) {
                if (!response.ok) throw new Error('HTTP ' + response.status);
                return response.json();
            })
            .then(function (questions) { PSD.questions = questions; })
            // The catch covers the fetch only, so a fault in the render below
            // still reaches the console instead of reading as a failed download.
            .catch(function () {
                failed = true;
                renderBankStatus('Could not load the questions.', true);
            })
            .then(function () {
                if (failed) return;
                buildCategoryChips();
                buildCatGrid();
                updateFilteredCount();
                PSD.bindEvents();
            });
    }

    function renderBankStatus(message, failed) {
        var container = $('catGrid');
        container.innerHTML = '';

        var box = document.createElement('div');
        box.className = failed ? 'psd-bank-status psd-bank-status--error' : 'psd-bank-status';
        box.setAttribute('role', 'status');

        var text = document.createElement('p');
        text.className = 'psd-bank-status__text';
        text.textContent = message;
        box.appendChild(text);

        if (failed) {
            var retry = document.createElement('button');
            retry.className = 'psd-btn-secondary';
            retry.textContent = 'Try again';
            retry.addEventListener('click', loadQuestions);
            box.appendChild(retry);
        }

        container.appendChild(box);
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

    PSD.loadQuestions = loadQuestions;
    PSD.updateFilteredCount = updateFilteredCount;
})();
