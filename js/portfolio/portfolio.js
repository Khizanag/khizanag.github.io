(function () {
    'use strict';

    // Mobile navigation toggle
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');

    toggle.addEventListener('click', function () {
        var isOpen = links.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile nav on link click
    links.addEventListener('click', function (e) {
        if (e.target.closest('.nav__link')) {
            links.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close mobile nav on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && links.classList.contains('is-open')) {
            links.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.focus();
        }
    });

    // Nav dropdown keyboard support
    var dropdowns = document.querySelectorAll('.nav__dropdown');
    dropdowns.forEach(function (dropdown) {
        var trigger = dropdown.querySelector('.nav__dropdown-trigger');
        if (!trigger) return;
        trigger.addEventListener('click', function () {
            // Close other open dropdowns
            dropdowns.forEach(function (other) {
                if (other !== dropdown) {
                    other.classList.remove('is-open');
                    var otherTrigger = other.querySelector('.nav__dropdown-trigger');
                    if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
                }
            });
            var isOpen = dropdown.classList.toggle('is-open');
            trigger.setAttribute('aria-expanded', String(isOpen));
        });
    });
    document.addEventListener('click', function (e) {
        dropdowns.forEach(function (dropdown) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('is-open');
                var trigger = dropdown.querySelector('.nav__dropdown-trigger');
                if (trigger) trigger.setAttribute('aria-expanded', 'false');
            }
        });
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            dropdowns.forEach(function (dropdown) {
                var trigger = dropdown.querySelector('.nav__dropdown-trigger');
                if (dropdown.classList.contains('is-open')) {
                    dropdown.classList.remove('is-open');
                    if (trigger) {
                        trigger.setAttribute('aria-expanded', 'false');
                        trigger.focus();
                    }
                }
            });
        }
    });

    // Scroll reveal via IntersectionObserver
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
        );

        document.querySelectorAll('.rv').forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: show everything immediately
        document.querySelectorAll('.rv').forEach(function (el) {
            el.classList.add('is-visible');
        });
    }

    // Experience card toggle (expand/collapse)
    document.querySelectorAll('.exp-card__toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var card = btn.closest('.exp-card');
            var isExpanded = card.classList.toggle('is-expanded');
            btn.setAttribute('aria-expanded', String(isExpanded));
        });
    });

    // Smooth scroll for anchor links (with nav offset)
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();
