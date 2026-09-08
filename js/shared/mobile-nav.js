/**
 * Mobile Navigation and Nav Dropdowns
 *
 * Shared utility — wires the `#navToggle` / `#navLinks` pair (open on the
 * toggle, close on a `.nav__link` click and on Escape) plus every
 * `.nav__dropdown` on the page (open on its trigger, closing the others, and
 * close on an outside click or Escape).
 *
 * Include once per page:
 *   <script src="js/shared/mobile-nav.js"></script>
 */
(function () {
    'use strict';

    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    var dropdowns = document.querySelectorAll('.nav__dropdown');

    function closeNav(focusToggle) {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        if (focusToggle) toggle.focus();
    }

    function closeDropdown(dropdown, focusTrigger) {
        dropdown.classList.remove('is-open');
        var trigger = dropdown.querySelector('.nav__dropdown-trigger');
        if (!trigger) return;
        trigger.setAttribute('aria-expanded', 'false');
        if (focusTrigger) trigger.focus();
    }

    if (toggle && links) {
        toggle.addEventListener('click', function () {
            var isOpen = links.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });

        links.addEventListener('click', function (e) {
            if (e.target.closest('.nav__link')) closeNav(false);
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && links.classList.contains('is-open')) closeNav(true);
        });
    }

    if (!dropdowns.length) return;

    dropdowns.forEach(function (dropdown) {
        var trigger = dropdown.querySelector('.nav__dropdown-trigger');
        if (!trigger) return;

        trigger.addEventListener('click', function () {
            dropdowns.forEach(function (other) {
                if (other !== dropdown) closeDropdown(other, false);
            });
            var isOpen = dropdown.classList.toggle('is-open');
            trigger.setAttribute('aria-expanded', String(isOpen));
        });
    });

    document.addEventListener('click', function (e) {
        dropdowns.forEach(function (dropdown) {
            if (!dropdown.contains(e.target)) closeDropdown(dropdown, false);
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        dropdowns.forEach(function (dropdown) {
            if (dropdown.classList.contains('is-open')) closeDropdown(dropdown, true);
        });
    });
})();
