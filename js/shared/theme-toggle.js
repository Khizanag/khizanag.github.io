/**
 * Shared theme toggle utility.
 *
 * Finds the button with id="btnTheme" and wires up:
 *   - Click to toggle light/dark mode
 *   - Persists preference to localStorage
 *   - .theme-light class on <html> for CSS overrides
 *
 * Include once per page:
 *   <script src="js/shared/theme-toggle.js"></script>
 *
 * Pages should also include this inline script in <head> to
 * prevent flash-of-wrong-theme on load:
 *   <script>(function(){try{var t=localStorage.getItem('site-theme');if(t==='light')document.documentElement.classList.add('theme-light');}catch(e){}})();</script>
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'site-theme';
    var btn = document.getElementById('btnTheme');
    if (!btn) return;

    btn.addEventListener('click', function () {
        var isLight = document.documentElement.classList.toggle('theme-light');
        try { localStorage.setItem(STORAGE_KEY, isLight ? 'light' : 'dark'); } catch (e) {}
        // Also sync legacy key used by interview pages
        try { localStorage.setItem('ios-interview-theme', isLight ? 'light' : 'dark'); } catch (e) {}

        // Burst animation
        btn.classList.remove('is-animating');
        void btn.offsetWidth; // force reflow to restart animation
        btn.classList.add('is-animating');
    });

    btn.addEventListener('animationend', function () {
        btn.classList.remove('is-animating');
    });
})();
