var InterviewApp = {
    SESSION_KEY: 'ios-interview-session',
    PLATFORM_KEY: 'interview-platform',
    MIN_Q: 5,
    MAX_Q: 30,
    RATING_LABELS: ['', 'No answer', 'Weak', 'Partial', 'Good', 'Perfect'],
    LEVEL_NAMES: ['intern', 'junior', 'middle', 'senior', 'lead', 'staff'],
    LEVEL_LABELS: ['Intern', 'Junior', 'Middle', 'Senior', 'Lead', 'Staff'],
    LEVEL_EMOJIS: ['\u{1F331}', '\u{1F680}', '\u26A1', '\u{1F48E}', '\u{1F451}', '\u{1F3C6}'],
    LEVEL_COLORS: ['#5ac8fa', '#30d158', '#ff9f0a', '#bf5af2', '#ff375f', '#ffd60a'],
    LEVEL_DESCS: [
        'Starting the journey \u2014 strong foundations are being built.',
        'Growing fast \u2014 solid grasp of fundamentals, ready for more responsibility.',
        'Reliable contributor \u2014 handles complex tasks independently.',
        'Expert practitioner \u2014 drives technical decisions and mentors others.',
        'Technical leader \u2014 shapes architecture and enables teams at scale.',
        'Elite engineer \u2014 defines industry standards and solves the hardest problems.',
    ],

    PLATFORMS: {
        ios: {
            name: 'iOS / Swift',
            icon: '\uD83C\uDF4F',
            subtitle: 'Adaptive questioning for iOS developer assessment — from fundamentals to system design.',
            topics: {
                'swift': 'Swift Language',
                'swiftui': 'SwiftUI',
                'observation': 'Observation Framework',
                'uikit': 'UIKit',
                'combine': 'Combine',
                'concurrency': 'Concurrency',
                'architecture': 'Architecture & Patterns',
                'di': 'Dependency Injection',
                'testing': 'Unit Testing',
                'ui-testing': 'UI Testing',
                'snapshot-testing': 'Snapshot Testing',
                'swiftdata': 'SwiftData',
                'coredata': 'Core Data',
                'persistence': 'Data Persistence',
                'memory': 'Memory Management',
                'networking': 'Networking',
                'performance': 'Performance',
                'lifecycle': 'App Lifecycle',
                'security': 'Security',
                'accessibility': 'Accessibility',
                'cicd': 'CI/CD & Tools',
                'system-design': 'System Design',
                'code-challenge': 'Code Challenges',
                'live-coding': 'Live Coding',
            },
        },
        android: {
            name: 'Android / Kotlin',
            icon: '\uD83E\uDD16',
            subtitle: 'Comprehensive Android and Kotlin interview covering Jetpack, Compose, and architecture.',
            topics: {
                'kotlin': 'Kotlin Language',
                'jetpack-compose': 'Jetpack Compose',
                'android-lifecycle': 'Android Lifecycle',
                'android-arch': 'Architecture Patterns',
                'coroutines': 'Kotlin Coroutines',
                'android-storage': 'Data Storage',
                'android-networking': 'Networking',
                'android-testing': 'Testing',
                'android-performance': 'Performance',
                'android-security': 'Security',
            },
        },
        frontend: {
            name: 'Frontend / Web',
            icon: '\uD83C\uDF10',
            subtitle: 'Frontend engineering assessment — JavaScript, TypeScript, React, CSS, and web platform.',
            topics: {
                'javascript': 'JavaScript',
                'typescript': 'TypeScript',
                'react': 'React',
                'css': 'CSS & Styling',
                'html-web': 'HTML & Web APIs',
                'fe-performance': 'Performance',
                'fe-testing': 'Testing',
                'fe-architecture': 'Architecture',
                'fe-security': 'Security',
                'fe-tooling': 'Build Tools & DevOps',
            },
        },
        backend: {
            name: 'Backend',
            icon: '\u2699\uFE0F',
            subtitle: 'Backend engineering interview — APIs, databases, system design, and infrastructure.',
            topics: {
                'api-design': 'API Design',
                'databases': 'Databases',
                'be-auth': 'Auth & Authorization',
                'caching': 'Caching',
                'messaging': 'Message Queues',
                'be-system-design': 'System Design',
                'be-security': 'Security',
                'be-testing': 'Testing',
                'devops': 'DevOps & Infra',
                'be-performance': 'Performance',
            },
        },
        behavioral: {
            name: 'Behavioral',
            icon: '\uD83E\uDDE0',
            subtitle: 'Soft skills and behavioral assessment — leadership, teamwork, and communication.',
            topics: {
                'leadership': 'Leadership & Influence',
                'teamwork': 'Teamwork & Collaboration',
                'problem-solving': 'Problem Solving',
                'communication': 'Communication',
                'growth': 'Growth & Learning',
                'culture': 'Culture & Values',
            },
        },
    },

    TOPIC_LABELS: {},

    state: {
        platform: 'ios',
        selectedTopics: [],
        interviewMode: 'time',
        questionCount: 10,
        timeLimitMin: 15,
        interviewerName: '',
        intervieweeName: '',
        timerInterval: null,
        remainingSeconds: 0,
        timerExpired: false,
        currentQ: 0,
        currentRating: 0,
        ratings: [],
        sessionQuestions: [],
        phases: null,
        timerPaused: false,
        introNotes: '',
        wrapupNotes: '',
        lcHintsRevealed: 0,
        practiceMode: false,
    },

    dom: {},

    getLevelIndex: function (avg) {
        if (avg >= 4.5) return 5;
        if (avg >= 3.8) return 4;
        if (avg >= 3.0) return 3;
        if (avg >= 2.2) return 2;
        if (avg >= 1.5) return 1;
        return 0;
    },

    getQuestionBank: function () {
        var banks = {
            ios: typeof QUESTION_BANK !== 'undefined' ? QUESTION_BANK : [],
            android: typeof QUESTION_BANK_ANDROID !== 'undefined' ? QUESTION_BANK_ANDROID : [],
            frontend: typeof QUESTION_BANK_FRONTEND !== 'undefined' ? QUESTION_BANK_FRONTEND : [],
            backend: typeof QUESTION_BANK_BACKEND !== 'undefined' ? QUESTION_BANK_BACKEND : [],
            behavioral: typeof QUESTION_BANK_BEHAVIORAL !== 'undefined' ? QUESTION_BANK_BEHAVIORAL : [],
        };
        return banks[this.state.platform] || banks.ios;
    },

    getPlatformConfig: function () {
        return this.PLATFORMS[this.state.platform] || this.PLATFORMS.ios;
    },

    switchPlatform: function (platformId) {
        if (!this.PLATFORMS[platformId]) return;
        this.state.platform = platformId;
        var config = this.PLATFORMS[platformId];
        this.TOPIC_LABELS = {};
        for (var key in config.topics) {
            this.TOPIC_LABELS[key] = config.topics[key];
        }
        try { localStorage.setItem(this.PLATFORM_KEY, platformId); } catch (e) { /* */ }
    },

    announce: function (text) {
        var el = document.getElementById('srAnnounce');
        if (!el) return;
        el.textContent = '';
        setTimeout(function () { el.textContent = text; }, 50);
    },
};

// Initialize TOPIC_LABELS from default platform
(function () {
    var saved;
    try { saved = localStorage.getItem(InterviewApp.PLATFORM_KEY); } catch (e) { /* */ }
    var platform = saved && InterviewApp.PLATFORMS[saved] ? saved : 'ios';
    InterviewApp.switchPlatform(platform);
})();
