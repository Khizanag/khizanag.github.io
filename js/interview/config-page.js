(function () {
    'use strict';

    var STORAGE_KEY = 'ios-interview-features';

    var DEFAULTS = {
        liveSessions: true,
        flashcards: true,
        analytics: true,
        sandbox: true,
        gamification: true,
        customQuestions: true,
        questionBank: true,
        interviewGuide: true,
        templates: true,
        liveCoding: true,
        aiFeatures: false,
        teamMode: false,
        exportImport: false,
        videoRecording: false,
    };

    var FEATURE_META = {
        liveSessions:   { icon: '📡', name: 'Live Sessions',     desc: 'Real-time collaborative interview sessions' },
        flashcards:     { icon: '🃏', name: 'Flashcards',        desc: 'Study mode with spaced repetition' },
        analytics:      { icon: '📊', name: 'Analytics',         desc: 'Score trends, topic heatmaps, and insights' },
        sandbox:        { icon: '💻', name: 'Code Sandbox',      desc: 'Interactive coding playground' },
        gamification:   { icon: '🏆', name: 'Gamification',      desc: 'XP, levels, achievements, and streaks' },
        customQuestions: { icon: '📝', name: 'Custom Questions',  desc: 'Add your own interview questions' },
        questionBank:   { icon: '🔍', name: 'Question Bank',     desc: 'Browse and search the full question database' },
        interviewGuide: { icon: '📖', name: 'Interview Guide',   desc: 'Research-backed interviewing best practices' },
        templates:      { icon: '⚡', name: 'Quick Start',       desc: 'Pre-configured interview templates' },
        liveCoding:     { icon: '🖥️', name: 'Live Coding',       desc: 'Coding problems during interviews' },
        aiFeatures:     { icon: '🤖', name: 'AI Features',       desc: 'AI-powered question generation and analysis' },
        teamMode:       { icon: '👥', name: 'Team Mode',         desc: 'Shared question banks and team analytics' },
        exportImport:   { icon: '📦', name: 'Export / Import',   desc: 'Export history and import question sets' },
        videoRecording: { icon: '🎥', name: 'Video Recording',   desc: 'Record interview sessions for review' },
    };

    // ---- Load saved features ----
    function loadFeatures() {
        var saved = InterviewUtils.storageGet(STORAGE_KEY, null);
        return Object.assign({}, DEFAULTS, saved || {});
    }

    function saveFeatures(features) {
        InterviewUtils.storageSet(STORAGE_KEY, features);
    }

    // ---- Render ----
    function render() {
        var features = loadFeatures();
        var activeList = document.getElementById('cfgActiveList');
        var experimentalList = document.getElementById('cfgExperimentalList');
        activeList.innerHTML = '';
        experimentalList.innerHTML = '';

        var keys = Object.keys(DEFAULTS);
        keys.forEach(function (key) {
            var isDefault = DEFAULTS[key];
            var isEnabled = features[key] !== false;
            var meta = FEATURE_META[key] || { icon: '⚙️', name: key, desc: '' };

            var html =
                '<div class="cfg-item">' +
                    '<div class="cfg-item__icon">' + meta.icon + '</div>' +
                    '<div class="cfg-item__body">' +
                        '<span class="cfg-item__name">' + InterviewUtils.escapeHtml(meta.name) + '</span>' +
                        '<span class="cfg-item__desc">' + InterviewUtils.escapeHtml(meta.desc) + '</span>' +
                        '<span class="cfg-item__key">' + InterviewUtils.escapeHtml(key) + '</span>' +
                    '</div>' +
                    '<label class="cfg-toggle">' +
                        '<input type="checkbox" data-key="' + InterviewUtils.escapeHtml(key) + '"' + (isEnabled ? ' checked' : '') + '>' +
                        '<span class="cfg-toggle__track"></span>' +
                    '</label>' +
                '</div>';

            if (isDefault) {
                activeList.innerHTML += html;
            } else {
                experimentalList.innerHTML += html;
            }
        });
    }

    // ---- Toggle handler ----
    document.addEventListener('change', function (e) {
        var input = e.target;
        if (!input.dataset.key) return;
        var features = loadFeatures();
        features[input.dataset.key] = input.checked;
        saveFeatures(features);
    });

    // ---- Reset ----
    document.getElementById('cfgReset').addEventListener('click', function () {
        if (!confirm('Reset all features to their default values?')) return;
        try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* */ }
        render();
    });

    // ---- Init ----
    render();

})();
