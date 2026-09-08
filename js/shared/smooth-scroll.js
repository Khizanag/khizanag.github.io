/**
 * Smooth Scroll for In-Page Anchors
 *
 * Shared utility — scrolls the target of any `a[href^="#"]` into view instead
 * of jumping to it. A bare `#` href is left to the browser.
 *
 * Delegated from the document, so anchors rendered after load work too.
 *
 * Usage:
 *   <script src="js/shared/smooth-scroll.js"></script>
 */
(function () {
    'use strict';

    document.addEventListener('click', function (e) {
        var link = e.target.closest('a[href^="#"]');
        if (!link) return;

        var href = link.getAttribute('href');
        if (!href || href === '#') return;

        var target = document.getElementById(href.slice(1));
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
})();
