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

    // Sync index from scroll position when no programmatic scroll is in flight
    window.addEventListener('scroll', function () {
        if (!navLock) navIndex = resolveCurrentIndex();
    }, { passive: true });

    // scrollend clears the lock precisely after smooth scroll completes
    window.addEventListener('scrollend', function () {
        if (!navLock) return;
        clearTimeout(lockTimeout);
        navLock = false;
        navIndex = resolveCurrentIndex();
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

        // Fallback: clear lock after 2s if scrollend doesn't fire
        lockTimeout = setTimeout(function () {
            navLock = false;
            navIndex = resolveCurrentIndex();
        }, 2000);

        var target = document.getElementById(sectionIds[next]);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
})();
