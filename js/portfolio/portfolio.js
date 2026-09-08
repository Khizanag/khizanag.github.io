(function () {
    'use strict';

    // Experience card toggle (expand/collapse)
    document.querySelectorAll('.exp-card__toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var card = btn.closest('.exp-card');
            var isExpanded = card.classList.toggle('is-expanded');
            btn.setAttribute('aria-expanded', String(isExpanded));
        });
    });
})();
