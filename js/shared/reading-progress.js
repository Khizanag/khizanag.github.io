/**
 * Reading Progress Bar
 *
 * Shared utility — widens the bar named by `data-target` to match how far the
 * page has been scrolled.
 *
 * Usage:
 *   <script src="js/shared/reading-progress.js" data-target="jProgress"></script>
 */
(function () {
    'use strict';

    var scriptTag = document.currentScript;
    if (!scriptTag || !scriptTag.dataset.target) return;

    var bar = document.getElementById(scriptTag.dataset.target);
    if (!bar) return;

    function update() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = Math.min(pct, 100) + '%';
    }

    window.addEventListener('scroll', update);
    // A page that grows or shrinks under a reader who is not scrolling — late images,
    // a section revealing, a font swap — changes the answer without a scroll event.
    window.addEventListener('resize', update);
    if (typeof ResizeObserver !== 'undefined') {
        new ResizeObserver(update).observe(document.documentElement);
    }
    update();
})();
