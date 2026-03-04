/**
 * Unit tests for InterviewScoring module.
 * Run: node js/interview/scoring.test.cjs
 */
var assert = require('assert');
var { createRequire } = require('module');
var _require = createRequire(require('url').pathToFileURL(__filename).href);

// Load scoring.js — IIFE attaches to `this` which is `module.exports` in CJS context
var globalShim = {};
var fs = require('fs');
var path = require('path');
var code = fs.readFileSync(path.join(__dirname, 'scoring.js'), 'utf8');
var fn = new Function('window', code + '\nreturn window.InterviewScoring;');
var Scoring = fn({});

var passed = 0;
var failed = 0;

function test(name, fn) {
    try {
        fn();
        passed++;
        console.log('  \u2713 ' + name);
    } catch (e) {
        failed++;
        console.error('  \u2717 ' + name);
        console.error('    ' + e.message);
    }
}

console.log('\nInterviewScoring Tests\n');

// ---- Converters ----

test('ratingToOutcome: 1 -> 0, 3 -> 0.5, 5 -> 1.0', function () {
    assert.strictEqual(Scoring.ratingToOutcome(1), 0);
    assert.strictEqual(Scoring.ratingToOutcome(3), 0.5);
    assert.strictEqual(Scoring.ratingToOutcome(5), 1.0);
});

test('ratingToOutcome: clamps out-of-range values', function () {
    assert.strictEqual(Scoring.ratingToOutcome(0), 0);
    assert.strictEqual(Scoring.ratingToOutcome(6), 1.0);
});

test('levelToDifficulty: level 0 -> -2.5, level 5 -> +2.5', function () {
    assert.strictEqual(Scoring.levelToDifficulty(0), -2.5);
    assert.strictEqual(Scoring.levelToDifficulty(2), -0.5);
    assert.strictEqual(Scoring.levelToDifficulty(5), 2.5);
});

test('thetaToScore: theta -3 -> 0, theta 0 -> 50, theta 3 -> 100', function () {
    assert.strictEqual(Scoring.thetaToScore(-3), 0);
    assert.strictEqual(Scoring.thetaToScore(0), 50);
    assert.strictEqual(Scoring.thetaToScore(3), 100);
});

test('thetaToScore: clamps beyond [-3, 3]', function () {
    assert.strictEqual(Scoring.thetaToScore(-5), 0);
    assert.strictEqual(Scoring.thetaToScore(5), 100);
});

test('scoreToLevel: correct level mapping', function () {
    assert.strictEqual(Scoring.scoreToLevel(0).label, 'Intern');
    assert.strictEqual(Scoring.scoreToLevel(15).label, 'Intern');
    assert.strictEqual(Scoring.scoreToLevel(25).label, 'Junior');
    assert.strictEqual(Scoring.scoreToLevel(50).label, 'Middle');
    assert.strictEqual(Scoring.scoreToLevel(70).label, 'Senior');
    assert.strictEqual(Scoring.scoreToLevel(85).label, 'Lead');
    assert.strictEqual(Scoring.scoreToLevel(95).label, 'Principal');
});

// ---- IRT Functions ----

test('expectedOutcome: theta == b -> 0.5', function () {
    var p = Scoring.expectedOutcome(1.0, 1.0);
    assert(Math.abs(p - 0.5) < 0.001, 'Expected ~0.5 got ' + p);
});

test('expectedOutcome: theta >> b -> ~1.0, theta << b -> ~0.0', function () {
    var high = Scoring.expectedOutcome(5.0, 0.0);
    var low = Scoring.expectedOutcome(-5.0, 0.0);
    assert(high > 0.99, 'Expected >0.99 got ' + high);
    assert(low < 0.01, 'Expected <0.01 got ' + low);
});

test('itemInformation: maximum at theta == b', function () {
    var atB = Scoring.itemInformation(1.0, 1.0);
    var away = Scoring.itemInformation(3.0, 1.0);
    assert(atB > away, 'Info at theta=b should be > info away from b');
});

test('itemInformation: equals a^2 * 0.25 at theta == b', function () {
    var info = Scoring.itemInformation(0, 0, 1.0);
    assert(Math.abs(info - 0.25) < 0.001, 'Expected 0.25 got ' + info);
});

// ---- Engine ----

test('createEngine: initial state', function () {
    var engine = Scoring.createEngine(['swift', 'swiftui']);
    assert.strictEqual(engine.theta, 0);
    assert.strictEqual(engine.K, 32);
    assert.strictEqual(engine.questionCount, 0);
    assert.deepStrictEqual(engine.topicCounts, { swift: 0, swiftui: 0 });
});

test('High ratings converge theta upward', function () {
    var engine = Scoring.createEngine(['swift']);
    for (var i = 0; i < 5; i++) {
        Scoring.processRating(engine, { topic: 'swift', level: 2 + i }, 5);
    }
    var score = Scoring.thetaToScore(engine.theta);
    assert(score > 60, 'After 5 perfect ratings, score should be >60, got ' + score);
});

test('Low ratings converge theta downward', function () {
    var engine = Scoring.createEngine(['swift']);
    for (var i = 0; i < 5; i++) {
        Scoring.processRating(engine, { topic: 'swift', level: 2 }, 1);
    }
    var score = Scoring.thetaToScore(engine.theta);
    assert(score < 40, 'After 5 poor ratings, score should be <40, got ' + score);
});

test('Mixed ratings converge to middle', function () {
    var engine = Scoring.createEngine(['swift']);
    for (var i = 0; i < 10; i++) {
        Scoring.processRating(engine, { topic: 'swift', level: 2 }, i % 2 === 0 ? 2 : 4);
    }
    var score = Scoring.thetaToScore(engine.theta);
    assert(score > 35 && score < 65, 'Mixed ratings should give mid score, got ' + score);
});

test('SE decreases with more questions', function () {
    var engine = Scoring.createEngine(['swift']);
    Scoring.processRating(engine, { topic: 'swift', level: 2 }, 3);
    var se1 = Scoring.standardError(engine);
    Scoring.processRating(engine, { topic: 'swift', level: 3 }, 3);
    var se2 = Scoring.standardError(engine);
    assert(se2 < se1, 'SE should decrease: ' + se1 + ' -> ' + se2);
});

test('CI narrows with more questions', function () {
    var engine = Scoring.createEngine(['swift']);
    Scoring.processRating(engine, { topic: 'swift', level: 2 }, 3);
    var ci1 = Scoring.confidenceInterval(engine);
    var range1 = ci1.upper - ci1.lower;
    for (var i = 0; i < 5; i++) {
        Scoring.processRating(engine, { topic: 'swift', level: 2 }, 3);
    }
    var ci2 = Scoring.confidenceInterval(engine);
    var range2 = ci2.upper - ci2.lower;
    assert(range2 < range1, 'CI range should narrow: ' + range1 + ' -> ' + range2);
});

// ---- Adaptive Selection ----

test('Topic coverage: underrepresented topic gets selected', function () {
    var engine = Scoring.createEngine(['swift', 'swiftui', 'concurrency']);
    // Simulate 3 questions on swift, 0 on others
    for (var i = 0; i < 3; i++) {
        Scoring.processRating(engine, { topic: 'swift', level: 2 }, 3);
    }
    var pool = [
        { topic: 'swift', level: 2, question: 'Q1' },
        { topic: 'swiftui', level: 2, question: 'Q2' },
        { topic: 'concurrency', level: 2, question: 'Q3' },
    ];
    var selected = Scoring.selectQuestion({
        pool: pool,
        engine: engine,
        topics: ['swift', 'swiftui', 'concurrency'],
    });
    assert(selected.topic !== 'swift', 'Should pick underrepresented topic, got ' + selected.topic);
});

test('Max info selection: picks question closest to current theta', function () {
    var engine = Scoring.createEngine(['swift']);
    engine.theta = 0; // Middle ability
    var pool = [
        { topic: 'swift', level: 0, question: 'Easy' },     // b = -2.5
        { topic: 'swift', level: 2, question: 'Medium' },   // b = -0.5 (closest to theta 0)
        { topic: 'swift', level: 5, question: 'Expert' },   // b = 2.5
    ];
    var selected = Scoring.selectQuestion({ pool: pool, engine: engine, topics: ['swift'] });
    assert.strictEqual(selected.question, 'Medium', 'Should pick question closest to theta');
});

test('Recent exclusion: filters out recently asked', function () {
    var engine = Scoring.createEngine(['swift']);
    var pool = [
        { topic: 'swift', level: 2, question: 'Q1' },
        { topic: 'swift', level: 2, question: 'Q2' },
    ];
    var selected = Scoring.selectQuestion({
        pool: pool,
        engine: engine,
        topics: ['swift'],
        recentIds: ['Q1'],
    });
    assert.strictEqual(selected.question, 'Q2', 'Should exclude recent Q1');
});

// ---- K-factor ----

test('K-factor decays but never below 16', function () {
    var engine = Scoring.createEngine(['swift']);
    for (var i = 0; i < 50; i++) {
        Scoring.processRating(engine, { topic: 'swift', level: 2 }, 3);
    }
    assert(engine.K >= 16, 'K should never go below 16, got ' + engine.K);
    assert(engine.K < 32, 'K should have decayed from 32, got ' + engine.K);
});

// ---- Serialization ----

test('Serialize/deserialize roundtrip preserves state', function () {
    var engine = Scoring.createEngine(['swift', 'concurrency']);
    Scoring.processRating(engine, { topic: 'swift', level: 3 }, 4);
    Scoring.processRating(engine, { topic: 'concurrency', level: 2 }, 2);

    var serialized = Scoring.serializeEngine(engine);
    var json = JSON.parse(JSON.stringify(serialized)); // Simulate localStorage
    var restored = Scoring.deserializeEngine(json);

    assert.strictEqual(restored.theta, engine.theta);
    assert.strictEqual(restored.K, engine.K);
    assert.strictEqual(restored.totalInfo, engine.totalInfo);
    assert.strictEqual(restored.questionCount, engine.questionCount);
    assert.deepStrictEqual(restored.topicThetas, engine.topicThetas);
    assert.deepStrictEqual(restored.topicCounts, engine.topicCounts);
});

// ---- Migration ----

test('migrateFromAvg: avg 4.5 -> high score, avg 1.5 -> low score', function () {
    var high = Scoring.migrateFromAvg(4.5, 10);
    var low = Scoring.migrateFromAvg(1.5, 10);
    assert(high.score > 70, 'avg 4.5 should give score >70, got ' + high.score);
    assert(low.score < 30, 'avg 1.5 should give score <30, got ' + low.score);
    assert(high.migrated === true);
});

test('migrateFromAvg: avg 3.0 -> middle score', function () {
    var mid = Scoring.migrateFromAvg(3.0, 10);
    assert(mid.score >= 40 && mid.score <= 60, 'avg 3.0 should give mid score, got ' + mid.score);
});

// ---- Summary ----

test('getSummary returns complete data', function () {
    var engine = Scoring.createEngine(['swift', 'concurrency']);
    Scoring.processRating(engine, { topic: 'swift', level: 3 }, 4);
    Scoring.processRating(engine, { topic: 'concurrency', level: 2 }, 3);

    var summary = Scoring.getSummary(engine);
    assert(typeof summary.score === 'number');
    assert(typeof summary.level === 'object');
    assert(typeof summary.confidence === 'object');
    assert(Array.isArray(summary.topicScores));
    assert.strictEqual(summary.topicScores.length, 2);
    assert(summary.confidence.lower <= summary.confidence.score);
    assert(summary.confidence.score <= summary.confidence.upper);
});

// ---- Results ----

console.log('\n' + passed + ' passed, ' + failed + ' failed\n');
if (failed > 0) process.exit(1);
