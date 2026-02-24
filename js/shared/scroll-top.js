/**
 * Shared scroll-to-top button utility.
 *
 * Finds the button with id="gBtt" and wires up:
 *   - Shows when scrolled > 400px (.is-visible class)
 *   - Click to smooth-scroll to top
 *
 * Include once per page:
 *   <script src="js/shared/scroll-top.js"></script>
 */
(function () {
    'use strict';

    var btn = document.getElementById('gBtt');
    if (!btn) return;

    window.addEventListener('scroll', function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        btn.classList.toggle('is-visible', scrollTop > 400);
    });

    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();
