(function () {
    var basePath = 'js/interview/questions/';
    var platforms = {
        ios: { file: 'ios.json', global: 'QUESTION_BANK' },
        android: { file: 'android.json', global: 'QUESTION_BANK_ANDROID' },
        frontend: { file: 'frontend.json', global: 'QUESTION_BANK_FRONTEND' },
        backend: { file: 'backend.json', global: 'QUESTION_BANK_BACKEND' },
        behavioral: { file: 'behavioral.json', global: 'QUESTION_BANK_BEHAVIORAL' },
    };

    var entries = Object.keys(platforms).map(function (key) {
        return platforms[key];
    });

    window.QuestionsReady = Promise.all(
        entries.map(function (entry) {
            return fetch(basePath + entry.file)
                .then(function (res) { return res.json(); })
                .then(function (data) { window[entry.global] = data; });
        })
    );
})();
