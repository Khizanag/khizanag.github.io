(function () {
    'use strict';

    // ---- Scroll Animations (IntersectionObserver) ----
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
    var progressBar = document.getElementById('gProgress');
    window.addEventListener('scroll', function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = Math.min(pct, 100) + '%';
    });

    // ---- Accordion ----
    var accordion = document.getElementById('biasAccordion');
    if (accordion) {
        accordion.addEventListener('click', function (e) {
            var trigger = e.target.closest('.g-acc-trigger');
            if (!trigger) return;
            var item = trigger.parentElement;
            var body = item.querySelector('.g-acc-body');
            var isOpen = item.classList.contains('is-open');

            // Close all others
            var items = accordion.querySelectorAll('.g-acc-item');
            items.forEach(function (it) {
                if (it !== item) {
                    it.classList.remove('is-open');
                    it.querySelector('.g-acc-trigger').setAttribute('aria-expanded', 'false');
                    it.querySelector('.g-acc-body').style.maxHeight = '0';
                }
            });

            if (isOpen) {
                item.classList.remove('is-open');
                trigger.setAttribute('aria-expanded', 'false');
                body.style.maxHeight = '0';
            } else {
                item.classList.add('is-open');
                trigger.setAttribute('aria-expanded', 'true');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    }

    // ---- Time Allocation Tabs ----
    var timeTabs = document.getElementById('timeTabs');
    if (timeTabs) {
        timeTabs.addEventListener('click', function (e) {
            var tab = e.target.closest('.g-tab');
            if (!tab) return;
            var targetId = tab.dataset.tab;

            timeTabs.querySelectorAll('.g-tab').forEach(function (t) { t.classList.remove('is-active'); });
            tab.classList.add('is-active');

            var parent = timeTabs.parentElement;
            parent.querySelectorAll('.g-tab-content').forEach(function (c) { c.classList.remove('is-active'); });
            var target = document.getElementById(targetId);
            if (target) target.classList.add('is-active');
        });
    }

    // ---- Level Tabs ----
    var levelTabs = document.getElementById('levelTabs');
    if (levelTabs) {
        levelTabs.addEventListener('click', function (e) {
            var tab = e.target.closest('.g-level-tab');
            if (!tab) return;
            var levelId = 'level-' + tab.dataset.level;

            levelTabs.querySelectorAll('.g-level-tab').forEach(function (t) { t.classList.remove('is-active'); });
            tab.classList.add('is-active');

            var container = levelTabs.parentElement;
            container.querySelectorAll('.g-level-panel').forEach(function (p) { p.classList.remove('is-active'); });
            var panel = document.getElementById(levelId);
            if (panel) panel.classList.add('is-active');
        });
    }

    // ---- TOC smooth scroll ----
    var toc = document.getElementById('gToc');
    if (toc) {
        toc.addEventListener('click', function (e) {
            var link = e.target.closest('.g-toc__item');
            if (!link) return;
            var href = link.getAttribute('href');
            if (!href || href.charAt(0) !== '#') return;
            e.preventDefault();
            var target = document.getElementById(href.slice(1));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // ---- Validity chart bar animation on scroll ----
    var validityChart = document.querySelector('.g-validity-chart');
    if (validityChart && 'IntersectionObserver' in window) {
        var bars = validityChart.querySelectorAll('.g-validity-bar');
        bars.forEach(function (bar) { bar.dataset.width = bar.style.width; bar.style.width = '0'; });

        var chartObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                bars.forEach(function (bar, i) {
                    setTimeout(function () {
                        bar.style.width = bar.dataset.width;
                    }, i * 120);
                });
                chartObserver.unobserve(entry.target);
            });
        }, { threshold: 0.3 });

        chartObserver.observe(validityChart);
    }

})();
