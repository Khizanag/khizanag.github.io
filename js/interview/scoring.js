/**
 * InterviewScoring — 100-point adaptive scoring engine
 *
 * Based on IRT 2PL model with Elo-style theta updates and
 * Computerized Adaptive Testing (CAT) question selection.
 */
(function (root) {
    'use strict';

    var Scoring = {};

    // ---- Constants ----

    var DEFAULT_A = 1.0;          // Discrimination (uniform — no per-item calibration)
    var K_INITIAL = 32;           // Starting K-factor
    var K_DECAY = 0.95;           // K multiplied per question
    var K_FLOOR = 16;             // Minimum K
    var THETA_INITIAL = 0;        // Starting ability estimate
    var RECENT_WINDOW = 3;        // Exclude last N question IDs from selection
    var TOPIC_DEFICIT_THRESHOLD = 0.1;

    // Level-to-theta difficulty mapping (levels 0–5)
    var LEVEL_DIFFICULTIES = [-2.5, -1.5, -0.5, 0.5, 1.5, 2.5];

    // Score boundaries for level classification
    var LEVEL_BOUNDARIES = [
        { min: 0,  max: 20,  index: 0, label: 'Intern' },
        { min: 21, max: 40,  index: 1, label: 'Junior' },
        { min: 41, max: 60,  index: 2, label: 'Middle' },
        { min: 61, max: 78,  index: 3, label: 'Senior' },
        { min: 79, max: 90,  index: 4, label: 'Lead' },
        { min: 91, max: 100, index: 5, label: 'Principal' },
    ];

    var LEVEL_COLORS = ['#5ac8fa', '#30d158', '#ff9f0a', '#bf5af2', '#ff375f', '#ffd60a'];

    // ---- IRT Core Functions ----

    Scoring.expectedOutcome = function (theta, b, a) {
        if (a === undefined) a = DEFAULT_A;
        return 1 / (1 + Math.exp(-a * (theta - b)));
    };

    Scoring.itemInformation = function (theta, b, a) {
        if (a === undefined) a = DEFAULT_A;
        var p = Scoring.expectedOutcome(theta, b, a);
        return a * a * p * (1 - p);
    };

    // ---- Converters ----

    Scoring.ratingToOutcome = function (rating) {
        return (Math.max(1, Math.min(5, rating)) - 1) / 4;
    };

    Scoring.levelToDifficulty = function (level) {
        var idx = Math.max(0, Math.min(5, Math.round(level)));
        return LEVEL_DIFFICULTIES[idx];
    };

    Scoring.thetaToScore = function (theta) {
        return Math.max(0, Math.min(100, ((theta + 3) / 6) * 100));
    };

    Scoring.scoreToLevel = function (score) {
        for (var i = LEVEL_BOUNDARIES.length - 1; i >= 0; i--) {
            if (score >= LEVEL_BOUNDARIES[i].min) {
                return {
                    index: LEVEL_BOUNDARIES[i].index,
                    label: LEVEL_BOUNDARIES[i].label,
                    color: LEVEL_COLORS[LEVEL_BOUNDARIES[i].index],
                };
            }
        }
        return { index: 0, label: 'Intern', color: LEVEL_COLORS[0] };
    };

    // ---- Engine Lifecycle ----

    Scoring.createEngine = function (topics) {
        var topicThetas = {};
        var topicCounts = {};
        (topics || []).forEach(function (t) {
            topicThetas[t] = THETA_INITIAL;
            topicCounts[t] = 0;
        });
        return {
            theta: THETA_INITIAL,
            K: K_INITIAL,
            history: [],
            topicThetas: topicThetas,
            topicCounts: topicCounts,
            totalInfo: 0,
            questionCount: 0,
        };
    };

    Scoring.processRating = function (engine, question, rating) {
        var outcome = Scoring.ratingToOutcome(rating);
        var b = Scoring.levelToDifficulty(question.level);
        var expected = Scoring.expectedOutcome(engine.theta, b);
        var info = Scoring.itemInformation(engine.theta, b);

        // Update global theta
        engine.theta += engine.K * (outcome - expected) / 100;
        engine.totalInfo += info;
        engine.questionCount++;

        // Decay K
        engine.K = Math.max(K_FLOOR, engine.K * K_DECAY);

        // Update per-topic theta
        var topic = question.topic;
        if (engine.topicThetas[topic] === undefined) {
            engine.topicThetas[topic] = THETA_INITIAL;
            engine.topicCounts[topic] = 0;
        }
        var topicExpected = Scoring.expectedOutcome(engine.topicThetas[topic], b);
        engine.topicThetas[topic] += engine.K * (outcome - topicExpected) / 100;
        engine.topicCounts[topic]++;

        // Record history
        engine.history.push({
            topic: topic,
            level: question.level,
            rating: rating,
            outcome: outcome,
            theta: engine.theta,
            info: info,
        });

        return engine;
    };

    // ---- Adaptive Question Selection ----

    Scoring.selectQuestion = function (params) {
        var pool = params.pool;
        var engine = params.engine;
        var topics = params.topics || [];
        var recentIds = params.recentIds || [];

        if (!pool || pool.length === 0) return null;

        // 1. Filter out recently asked
        var candidates = pool;
        if (recentIds.length > 0) {
            var filtered = candidates.filter(function (q) {
                return recentIds.indexOf(q._id || q.question) === -1;
            });
            if (filtered.length > 0) candidates = filtered;
        }

        // 2. Topic coverage balancing
        var selectedTopic = null;
        if (topics.length > 1 && engine.questionCount > 0) {
            var idealProportion = 1 / topics.length;
            var maxDeficit = -Infinity;
            topics.forEach(function (t) {
                var actual = (engine.topicCounts[t] || 0) / engine.questionCount;
                var deficit = idealProportion - actual;
                if (deficit > maxDeficit) {
                    maxDeficit = deficit;
                    selectedTopic = t;
                }
            });
            if (maxDeficit < TOPIC_DEFICIT_THRESHOLD) selectedTopic = null;
        }

        // 3. Filter by topic if needed
        var topicCandidates = candidates;
        if (selectedTopic) {
            var topicFiltered = candidates.filter(function (q) { return q.topic === selectedTopic; });
            if (topicFiltered.length > 0) topicCandidates = topicFiltered;
        }

        // 4. Pick question maximizing Fisher Information at current theta
        var bestQ = null;
        var bestInfo = -Infinity;
        topicCandidates.forEach(function (q) {
            var b = Scoring.levelToDifficulty(q.level);
            var info = Scoring.itemInformation(engine.theta, b);
            if (info > bestInfo) {
                bestInfo = info;
                bestQ = q;
            }
        });

        return bestQ || topicCandidates[Math.floor(Math.random() * topicCandidates.length)] || null;
    };

    // ---- Statistics ----

    Scoring.standardError = function (engine) {
        if (engine.totalInfo <= 0) return Infinity;
        return 1 / Math.sqrt(engine.totalInfo);
    };

    Scoring.confidenceInterval = function (engine) {
        var se = Scoring.standardError(engine);
        var score = Scoring.thetaToScore(engine.theta);
        var lower = Scoring.thetaToScore(engine.theta - 1.96 * se);
        var upper = Scoring.thetaToScore(engine.theta + 1.96 * se);
        return {
            score: Math.round(score),
            se: se,
            lower: Math.round(lower),
            upper: Math.round(upper),
        };
    };

    // ---- Summary ----

    Scoring.getSummary = function (engine) {
        var score = Math.round(Scoring.thetaToScore(engine.theta));
        var level = Scoring.scoreToLevel(score);
        var ci = Scoring.confidenceInterval(engine);

        var topicScores = [];
        Object.keys(engine.topicThetas).forEach(function (topic) {
            if (engine.topicCounts[topic] > 0) {
                var tScore = Math.round(Scoring.thetaToScore(engine.topicThetas[topic]));
                topicScores.push({
                    topic: topic,
                    score: tScore,
                    level: Scoring.scoreToLevel(tScore),
                    count: engine.topicCounts[topic],
                });
            }
        });

        topicScores.sort(function (a, b) { return b.score - a.score; });

        return {
            score: score,
            level: level,
            confidence: ci,
            topicScores: topicScores,
            se: Scoring.standardError(engine),
        };
    };

    // ---- Migration ----

    Scoring.migrateFromAvg = function (avg, ratedCount) {
        // Map 1-5 average to approximate theta
        // avg 1 → theta -2.5, avg 3 → theta 0, avg 5 → theta 2.5
        var theta = ((avg - 1) / 4) * 5 - 2.5;
        var score = Math.round(Scoring.thetaToScore(theta));
        var level = Scoring.scoreToLevel(score);

        // Estimate SE based on question count
        var info = ratedCount * 0.25; // Approximate average info per question
        var se = info > 0 ? 1 / Math.sqrt(info) : Infinity;

        return {
            score: score,
            level: level,
            se: se,
            migrated: true,
        };
    };

    // ---- Persistence ----

    Scoring.serializeEngine = function (engine) {
        return {
            theta: engine.theta,
            K: engine.K,
            history: engine.history,
            topicThetas: engine.topicThetas,
            topicCounts: engine.topicCounts,
            totalInfo: engine.totalInfo,
            questionCount: engine.questionCount,
        };
    };

    Scoring.deserializeEngine = function (data) {
        return {
            theta: data.theta || THETA_INITIAL,
            K: data.K || K_INITIAL,
            history: data.history || [],
            topicThetas: data.topicThetas || {},
            topicCounts: data.topicCounts || {},
            totalInfo: data.totalInfo || 0,
            questionCount: data.questionCount || 0,
        };
    };

    // ---- Export ----

    root.InterviewScoring = Scoring;

    // Node.js/CJS support for testing
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Scoring;
    }

})(typeof window !== 'undefined' ? window : this);
