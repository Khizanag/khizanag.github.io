/**
 * Scroll Reveal (IntersectionObserver)
 *
 * Shared utility — adds `is-visible` to every element matching the selector
 * once it scrolls into view, then stops observing it. An element postpones its
 * own reveal with `data-delay="<milliseconds>"`.
 *
 * Reads its configuration from its own <script> tag:
 *   data-selector     — what to reveal (required)
 *   data-threshold    — IntersectionObserver threshold (default 0.12)
 *   data-root-margin  — IntersectionObserver rootMargin (default '0px 0px -40px 0px')
 *
 * Usage:
 *   <script src="js/shared/reveal.js"
 *           data-selector="[data-anim]"
 *           data-threshold="0.12"
 *           data-root-margin="0px 0px -40px 0px"></script>
 *
 * Without IntersectionObserver support every target is revealed immediately.
 */
(function () {
    'use strict';

    var scriptTag = document.currentScript;
    if (!scriptTag || !scriptTag.dataset.selector) return;

    var targets = document.querySelectorAll(scriptTag.dataset.selector);
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
        targets.forEach(function (el) { el.classList.add('is-visible'); });
        return;
    }

    var threshold = parseFloat(scriptTag.dataset.threshold);
    if (isNaN(threshold)) threshold = 0.12;

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
    }, {
        threshold: threshold,
        rootMargin: scriptTag.dataset.rootMargin || '0px 0px -40px 0px',
    });

    targets.forEach(function (el) { observer.observe(el); });
})();
