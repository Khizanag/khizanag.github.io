(function (App) {
    'use strict';

    var TEMPLATES = [
        {
            id: 'jr-ios',
            name: 'Junior iOS',
            icon: '\uD83C\uDF31',
            desc: 'Swift fundamentals, UIKit basics, and entry-level architecture.',
            platform: 'ios',
            topics: ['swift', 'swiftui', 'uikit', 'lifecycle', 'memory', 'networking'],
            mode: 'interview',
            time: 30,
        },
        {
            id: 'sr-ios',
            name: 'Senior iOS',
            icon: '\uD83D\uDC8E',
            desc: 'Architecture, concurrency, testing, performance, and system design.',
            platform: 'ios',
            topics: ['architecture', 'concurrency', 'testing', 'performance', 'system-design', 'di', 'combine'],
            mode: 'interview',
            time: 60,
        },
        {
            id: 'jr-android',
            name: 'Junior Android',
            icon: '\uD83E\uDD16',
            desc: 'Kotlin basics, Android lifecycle, and Jetpack Compose fundamentals.',
            platform: 'android',
            topics: ['kotlin', 'jetpack-compose', 'android-lifecycle', 'android-storage'],
            mode: 'interview',
            time: 30,
        },
        {
            id: 'sr-android',
            name: 'Senior Android',
            icon: '\u26A1',
            desc: 'Coroutines, architecture patterns, testing, and performance.',
            platform: 'android',
            topics: ['coroutines', 'android-arch', 'android-testing', 'android-performance', 'android-networking'],
            mode: 'interview',
            time: 60,
        },
        {
            id: 'fe-screen',
            name: 'Frontend Screen',
            icon: '\uD83C\uDF10',
            desc: 'JavaScript, TypeScript, React, and CSS fundamentals.',
            platform: 'frontend',
            topics: ['javascript', 'typescript', 'react', 'css', 'html-web'],
            mode: 'interview',
            time: 45,
        },
        {
            id: 'fe-senior',
            name: 'Senior Frontend',
            icon: '\uD83D\uDE80',
            desc: 'Architecture, performance, testing, and advanced patterns.',
            platform: 'frontend',
            topics: ['react', 'fe-architecture', 'fe-performance', 'fe-testing', 'fe-security', 'typescript'],
            mode: 'interview',
            time: 60,
        },
        {
            id: 'be-screen',
            name: 'Backend Screen',
            icon: '\u2699\uFE0F',
            desc: 'APIs, databases, auth, and basic system design.',
            platform: 'backend',
            topics: ['api-design', 'databases', 'be-auth', 'be-system-design'],
            mode: 'interview',
            time: 45,
        },
        {
            id: 'behavioral',
            name: 'Behavioral Round',
            icon: '\uD83E\uDDE0',
            desc: 'Leadership, teamwork, communication, and problem solving.',
            platform: 'behavioral',
            topics: ['leadership', 'teamwork', 'problem-solving', 'communication', 'growth', 'culture'],
            mode: 'interview',
            time: 45,
        },
        {
            id: 'quick-practice',
            name: 'Quick Practice',
            icon: '\u23F1\uFE0F',
            desc: '15-minute self-study session on current platform topics.',
            platform: null,
            topics: [],
            mode: 'practice',
            time: 15,
        },
        {
            id: 'full-review',
            name: 'Full Review',
            icon: '\uD83C\uDFC6',
            desc: 'Comprehensive all-topics interview on current platform.',
            platform: null,
            topics: [],
            mode: 'interview',
            time: 90,
        },
    ];

    var escapeHtml = App.escapeHtml;

    function buildTemplateCards() {
        var container = document.getElementById('templateGrid');
        if (!container) return;

        var html = '';
        for (var i = 0; i < TEMPLATES.length; i++) {
            var t = TEMPLATES[i];
            var platformLabel = t.platform ? (App.PLATFORMS[t.platform] || {}).name || t.platform : 'Current';
            var topicCount = t.topics.length > 0 ? t.topics.length + ' topics' : 'All topics';

            html += '<button class="template-card" data-template="' + i + '">';
            html += '<div class="template-card__top">';
            html += '<span class="template-card__icon">' + t.icon + '</span>';
            html += '<span class="template-card__name">' + escapeHtml(t.name) + '</span>';
            html += '</div>';
            html += '<div class="template-card__desc">' + escapeHtml(t.desc) + '</div>';
            html += '<div class="template-card__meta">';
            html += '<span class="template-card__tag template-card__tag--platform">' + escapeHtml(platformLabel) + '</span>';
            html += '<span class="template-card__tag template-card__tag--time">' + t.time + ' min</span>';
            html += '<span class="template-card__tag template-card__tag--topics">' + escapeHtml(topicCount) + '</span>';
            html += '</div>';
            html += '</button>';
        }
        container.innerHTML = html;
    }

    function applyTemplate(index) {
        var t = TEMPLATES[index];
        if (!t) return;

        // Switch platform if specified
        if (t.platform && App.PLATFORMS[t.platform]) {
            var platformBtns = document.querySelectorAll('.platform-selector__btn');
            for (var i = 0; i < platformBtns.length; i++) {
                platformBtns[i].classList.toggle('is-active', platformBtns[i].dataset.platform === t.platform);
            }
            App.switchPlatform(t.platform);

            var config = App.getPlatformConfig();
            var titleEl = document.getElementById('setupTitle');
            var subtitleEl = document.getElementById('setupSubtitle');
            var iconEl = document.getElementById('setupIcon');
            if (titleEl) titleEl.textContent = config.name + ' Interview';
            if (subtitleEl) subtitleEl.textContent = config.subtitle;
            if (iconEl) iconEl.textContent = config.icon;
        }

        // Rebuild topic chips for the platform
        if (App.renderTopicChips) App.renderTopicChips();

        // Select topics
        var chips = document.querySelectorAll('#topicGrid .topic-chip');
        var s = App.state;
        s.selectedTopics = [];

        if (t.topics.length > 0) {
            chips.forEach(function (c) {
                var selected = t.topics.indexOf(c.dataset.topic) !== -1;
                c.classList.toggle('is-selected', selected);
                if (selected) s.selectedTopics.push(c.dataset.topic);
            });
        } else {
            chips.forEach(function (c) {
                c.classList.add('is-selected');
                s.selectedTopics.push(c.dataset.topic);
            });
        }

        // Set mode
        var btnModeInterview = document.getElementById('btnModeInterview');
        var btnModePractice = document.getElementById('btnModePractice');
        var planSection = document.getElementById('planSection');
        var interviewerField = App.dom.interviewerInput ? App.dom.interviewerInput.closest('.setup__name-field') : null;

        s.practiceMode = t.mode === 'practice';
        if (btnModeInterview) btnModeInterview.classList.toggle('is-active', !s.practiceMode);
        if (btnModePractice) btnModePractice.classList.toggle('is-active', s.practiceMode);
        if (planSection) planSection.style.display = s.practiceMode ? 'none' : '';
        if (interviewerField) interviewerField.style.display = s.practiceMode ? 'none' : '';
        if (s.practiceMode) s.interviewerName = 'Self-Study';

        // Scroll to top to show the filled form
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Update the start button state
        if (App.updateUI) App.updateUI();

        // Flash the start button to draw attention
        var btnStart = document.getElementById('btnStart');
        if (btnStart) {
            btnStart.style.transition = 'none';
            btnStart.style.boxShadow = '0 0 0 4px var(--color-blue-a30)';
            setTimeout(function () {
                btnStart.style.transition = 'box-shadow 0.6s';
                btnStart.style.boxShadow = '';
            }, 100);
        }
    }

    function init() {
        buildTemplateCards();

        var grid = document.getElementById('templateGrid');
        if (grid) {
            grid.addEventListener('click', function (e) {
                var card = e.target.closest('.template-card');
                if (!card) return;
                var idx = parseInt(card.dataset.template, 10);
                applyTemplate(idx);
            });
        }

        // Toggle visibility
        var toggleBtn = document.getElementById('btnToggleTemplates');
        var templateBody = document.getElementById('templateBody');
        if (toggleBtn && templateBody) {
            toggleBtn.addEventListener('click', function () {
                var isOpen = templateBody.style.display !== 'none';
                templateBody.style.display = isOpen ? 'none' : '';
                toggleBtn.textContent = isOpen ? 'Show' : 'Hide';
            });
        }
    }

    init();

})(InterviewApp);
