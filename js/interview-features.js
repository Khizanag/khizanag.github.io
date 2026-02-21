(function (App) {
    'use strict';

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

    App.features = Object.assign({}, DEFAULTS);

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
        if (!window.FirebaseService) {
            App.applyFeatureFlags();
            return;
        }

        window.FirebaseService.loadFeatureFlags().then(function (remote) {
            App.features = Object.assign({}, DEFAULTS, remote);
            App.applyFeatureFlags();
        }).catch(function () {
            App.applyFeatureFlags();
        });

        if (_unsubscribe) _unsubscribe();
        _unsubscribe = window.FirebaseService.subscribeFeatureFlags(function (remote) {
            App.features = Object.assign({}, DEFAULTS, remote);
            App.applyFeatureFlags();
        });
    };

})(InterviewApp);
