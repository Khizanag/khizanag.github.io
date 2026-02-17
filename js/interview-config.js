var InterviewApp = {
    SESSION_KEY: 'ios-interview-session',
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
    TOPIC_LABELS: {
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
    },

    state: {
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
};
