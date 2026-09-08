(function () {
    'use strict';

    // ---- Platform Filter Tabs ----
    var filterBtns = document.querySelectorAll('.j-filter__btn');
    var platformCards = document.querySelectorAll('.j-platform');

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var filter = btn.dataset.filter;

            filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
            btn.classList.add('is-active');

            platformCards.forEach(function (card) {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ---- Footer Back to Top Link ----
    var footerTop = document.getElementById('footerTop');
    if (footerTop) {
        footerTop.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

})();
