/**
 * Shared fullscreen toggle utility.
 *
 * Finds the button with id="btnFullscreen" and wires up:
 *   - Click to toggle fullscreen
 *   - "F" key shortcut (when no input/textarea is focused)
 *   - .is-fullscreen class on <html> for CSS icon swap
 *
 * Include once per page:
 *   <script src="js/shared/fullscreen.js"></script>
 */
(function () {
    'use strict';

    var btn = document.getElementById('btnFullscreen');
    if (!btn) return;

    var isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    function isFullscreen() {
        return !!(document.fullscreenElement || document.webkitFullscreenElement);
    }

    function toggle() {
        if (isFullscreen()) {
            (document.exitFullscreen || document.webkitExitFullscreen).call(document);
        } else {
            var el = document.documentElement;
            (el.requestFullscreen || el.webkitRequestFullscreen).call(el);
        }
    }

    function sync() {
        var fs = isFullscreen();
        document.documentElement.classList.toggle('is-fullscreen', fs);
        btn.setAttribute('aria-label', fs ? 'Exit fullscreen (F)' : 'Enter fullscreen (F)');
    }

    btn.addEventListener('click', toggle);
    document.addEventListener('fullscreenchange', sync);
    document.addEventListener('webkitfullscreenchange', sync);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'f' || e.key === 'F') {
            var tag = (e.target.tagName || '').toLowerCase();
            if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
            e.preventDefault();
            toggle();
        }
    });
})();
