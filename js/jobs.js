(function () {
    'use strict';

    // ---- Scroll Reveal (IntersectionObserver) ----
    var animEls = document.querySelectorAll('[data-anim]');
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                var delay = parseInt(el.dataset.delay, 10) || 0;
                if (delay > 0) {
                    setTimeout(function () { el.classList.add('is-visible'); }, delay);
                } else {
                    el.classList.add('is-visible');
                }
                observer.unobserve(el);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        animEls.forEach(function (el) { observer.observe(el); });
    } else {
        animEls.forEach(function (el) { el.classList.add('is-visible'); });
    }

    // ---- Reading Progress Bar ----
    var progressBar = document.getElementById('jProgress');
    window.addEventListener('scroll', function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = Math.min(pct, 100) + '%';
    });

    // ---- Mobile Nav Toggle ----
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');

    if (toggle && links) {
        toggle.addEventListener('click', function () {
            var isOpen = links.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });

        links.addEventListener('click', function (e) {
            if (e.target.closest('.nav__link')) {
                links.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ---- Smooth Scroll for Anchor Links ----
    document.addEventListener('click', function (e) {
        var link = e.target.closest('a[href^="#"]');
        if (!link) return;
        var href = link.getAttribute('href');
        if (!href || href === '#') return;
        var target = document.getElementById(href.slice(1));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });

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

    // ---- Back to Top ----
    var btt = document.getElementById('jBtt');
    window.addEventListener('scroll', function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        btt.classList.toggle('is-visible', scrollTop > 500);
    });

    btt.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
