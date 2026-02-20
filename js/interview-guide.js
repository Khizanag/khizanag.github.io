(function (App) {
    'use strict';

    function init() {
        var guideBack = document.getElementById('guideBack');
        var btnGuide = document.getElementById('btnGuide');

        if (!guideBack || !btnGuide) return;

        // Back button — return to setup screen
        guideBack.addEventListener('click', function () {
            App.showScreen('screen-setup');
        });

        // Guide button on setup screen — open guide
        btnGuide.addEventListener('click', function () {
            App.showScreen('screen-guide');
        });

        // Smooth scroll for TOC anchor links
        var tocLinks = document.querySelectorAll('#screen-guide .guide__toc-link');
        for (var i = 0; i < tocLinks.length; i++) {
            tocLinks[i].addEventListener('click', function (e) {
                var href = this.getAttribute('href');
                if (!href || href.charAt(0) !== '#') return;

                var target = document.getElementById(href.substring(1));
                if (!target) return;

                e.preventDefault();
                var navHeight = parseInt(
                    getComputedStyle(document.documentElement)
                        .getPropertyValue('--nav-height'), 10
                ) || 48;
                var offset = target.getBoundingClientRect().top + window.scrollY - navHeight - 24;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            });
        }

        // Collapsible sections — click title to toggle
        var sectionTitles = document.querySelectorAll('#screen-guide .guide__section-title');
        for (var j = 0; j < sectionTitles.length; j++) {
            sectionTitles[j].addEventListener('click', function () {
                var section = this.closest('.guide__section');
                if (section) {
                    section.classList.toggle('is-collapsed');
                }
            });
        }

        // Escape key — return to setup
        document.addEventListener('keydown', function (e) {
            if (e.key !== 'Escape') return;
            var screen = document.getElementById('screen-guide');
            if (screen && screen.classList.contains('is-active')) {
                App.showScreen('screen-setup');
            }
        });
    }

    init();

})(InterviewApp);
