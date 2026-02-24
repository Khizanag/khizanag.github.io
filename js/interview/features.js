(function (App) {
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

    function loadLocalOverrides() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return {};
            return JSON.parse(raw);
        } catch (e) {
            return {};
        }
    }

    App.features = Object.assign({}, DEFAULTS, loadLocalOverrides());

    App.isFeatureEnabled = function (name) {
        return App.features[name] !== false;
    };

    App.applyFeatureFlags = function () {
        var els = document.querySelectorAll('[data-feature]');
        for (var i = 0; i < els.length; i++) {
            var name = els[i].getAttribute('data-feature');
            els[i].style.display = App.isFeatureEnabled(name) ? '' : 'none';
        }
    };

    var _unsubscribe = null;

    App.initFeatureFlags = function () {
        var local = loadLocalOverrides();

        if (!window.FirebaseService) {
            App.features = Object.assign({}, DEFAULTS, local);
            App.applyFeatureFlags();
            return;
        }

        window.FirebaseService.loadFeatureFlags().then(function (remote) {
            App.features = Object.assign({}, DEFAULTS, local, remote);
            App.applyFeatureFlags();
        }).catch(function () {
            App.features = Object.assign({}, DEFAULTS, local);
            App.applyFeatureFlags();
        });

        if (_unsubscribe) _unsubscribe();
        _unsubscribe = window.FirebaseService.subscribeFeatureFlags(function (remote) {
            App.features = Object.assign({}, DEFAULTS, local, remote);
            App.applyFeatureFlags();
        });
    };

})(InterviewApp);
