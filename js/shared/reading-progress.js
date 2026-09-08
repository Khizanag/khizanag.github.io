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

    window.addEventListener('scroll', function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = Math.min(pct, 100) + '%';
    });
})();
