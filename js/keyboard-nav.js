/**
 * Keyboard Section Navigation (ArrowLeft / ArrowRight)
 *
 * Shared utility — include on any multi-section page.
 * Reads section IDs from the `data-sections` attribute on its own <script> tag.
 *
 * Usage:
 *   <script src="js/keyboard-nav.js"
 *           data-sections="hero,about,experience,projects"></script>
 *
 * Ported from the presentations' useKeyboardNav React hook.
 */
(function () {
    'use strict';

    // Read section IDs from the script tag's data-sections attribute
    var scriptTag = document.currentScript;
    if (!scriptTag || !scriptTag.dataset.sections) return;

    var sectionIds = scriptTag.dataset.sections.split(',').map(function (s) { return s.trim(); });
    if (sectionIds.length < 2) return;

    var SCROLL_DURATION = 900; // ms — longer than native smooth scroll

    var navIndex = 0;
    var navLock = false;
    var lockTimeout = null;

    function resolveCurrentIndex() {
        var ref = window.scrollY + window.innerHeight * 0.4;
        var best = 0;
        for (var i = 0; i < sectionIds.length; i++) {
            var el = document.getElementById(sectionIds[i]);
            if (el) {
                var top = el.getBoundingClientRect().top + window.scrollY;
                if (top <= ref) best = i;
            }
        }
        return best;
    }

    // Easing: ease-in-out cubic
    function easeInOutCubic(t) {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function smoothScrollTo(targetY, duration) {
        var startY = window.scrollY;
        var diff = targetY - startY;
        if (diff === 0) return;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var elapsed = timestamp - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var eased = easeInOutCubic(progress);
            window.scrollTo(0, startY + diff * eased);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                navLock = false;
                clearTimeout(lockTimeout);
                navIndex = resolveCurrentIndex();
            }
        }

        requestAnimationFrame(step);
    }

    // Sync index from scroll position when no programmatic scroll is in flight
    window.addEventListener('scroll', function () {
        if (!navLock) navIndex = resolveCurrentIndex();
    }, { passive: true });

    document.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        if (navLock) return;

        var next = e.key === 'ArrowRight'
            ? Math.min(navIndex + 1, sectionIds.length - 1)
            : Math.max(navIndex - 1, 0);

        if (next === navIndex) return;

        // Commit target index before scrolling starts
        navIndex = next;
        navLock = true;

        // Fallback: clear lock after duration + buffer if animation doesn't finish
        lockTimeout = setTimeout(function () {
            navLock = false;
            navIndex = resolveCurrentIndex();
        }, SCROLL_DURATION + 500);

        var target = document.getElementById(sectionIds[next]);
        if (target) {
            var targetY = target.getBoundingClientRect().top + window.scrollY;
            smoothScrollTo(targetY, SCROLL_DURATION);
        }
    });
})();
