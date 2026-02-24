(function (App) {
    'use strict';

    var SR_KEY = 'ios-interview-sr';
    var STREAK_KEY = 'ios-interview-streak';

    function loadSR() {
        try { var raw = localStorage.getItem(SR_KEY); return raw ? JSON.parse(raw) : {}; }
        catch (e) { return {}; }
    }

    function saveSR(data) {
        try { localStorage.setItem(SR_KEY, JSON.stringify(data)); } catch (e) { InterviewUtils.logError('flashcard:saveSR', e); }
    }

    function saveSREntryToCloud(qid, cardData) {
        if (window.FirebaseService) {
            var hashedId = qid.replace(/[\/\.#\$\[\]]/g, '_').substring(0, 200);
            window.FirebaseService.saveSREntry(hashedId, cardData);
        }
    }

    function loadStreak() {
        try {
            var raw = localStorage.getItem(STREAK_KEY);
            if (!raw) return { count: 0, lastDate: '' };
            return JSON.parse(raw);
        } catch (e) { return { count: 0, lastDate: '' }; }
    }

    function saveStreak(data) {
        try { localStorage.setItem(STREAK_KEY, JSON.stringify(data)); } catch (e) { InterviewUtils.logError('flashcard:saveStreak', e); }
        if (window.FirebaseService) {
            window.FirebaseService.saveStreak(data);
        }
    }

    function todayStr() {
        return new Date().toISOString().slice(0, 10);
    }

    function updateStreak() {
        var streak = loadStreak();
        var today = todayStr();
        if (streak.lastDate === today) return streak;

        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        var yStr = yesterday.toISOString().slice(0, 10);

        if (streak.lastDate === yStr) {
            streak.count++;
        } else {
            streak.count = 1;
        }
        streak.lastDate = today;
        saveStreak(streak);
        return streak;
    }

    function questionId(q) {
        return q.topic + '::' + q.question.substring(0, 80);
    }

    var escapeHtml = App.escapeHtml;

    var fc = {
        topics: [],
        levels: [],
        deck: [],
        index: 0,
        flipped: false,
        answerRevealed: false,
        results: { again: 0, hard: 0, good: 0, easy: 0, total: 0 },
    };

    function buildDeck() {
        var sr = loadSR();
        var now = Date.now();
        var pool = [];

        var bank = App.getQuestionBank();
        for (var i = 0; i < bank.length; i++) {
            var q = bank[i];
            if (fc.topics.length > 0 && fc.topics.indexOf(q.topic) === -1) continue;
            if (fc.levels.length > 0 && fc.levels.indexOf(q.level) === -1) continue;

            var qid = questionId(q);
            var card = sr[qid];
            var priority = 1;

            if (card) {
                if (card.nextReview && card.nextReview > now) {
                    priority = 0.1;
                } else {
                    if (card.ease === 'again') priority = 4;
                    else if (card.ease === 'hard') priority = 2.5;
                    else if (card.ease === 'good') priority = 1;
                    else priority = 0.5;
                }
            } else {
                priority = 3;
            }

            pool.push({ question: q, priority: priority });
        }

        pool.sort(function (a, b) {
            return (b.priority + Math.random() * 0.5) - (a.priority + Math.random() * 0.5);
        });

        fc.deck = pool.slice(0, 30).map(function (p) { return p.question; });
    }

    function showCard() {
        if (fc.index >= fc.deck.length) {
            showResults();
            return;
        }

        var q = fc.deck[fc.index];
        var levelName = App.LEVEL_NAMES[q.level] || 'intern';
        var levelLabel = App.LEVEL_LABELS[q.level] || 'Intern';
        var topicLabel = App.TOPIC_LABELS[q.topic] || q.topic;

        document.getElementById('fcCardTopic').textContent = topicLabel;
        document.getElementById('fcCardTopic').className = 'fc__card-topic';
        document.getElementById('fcCardLevel').textContent = levelLabel;
        document.getElementById('fcCardLevel').className = 'fc__card-level bank__item-level--' + levelName;
        document.getElementById('fcCardQuestion').textContent = q.question;

        var backMeta = document.getElementById('fcBackMeta');
        backMeta.innerHTML = '<span class="fc__card-topic">' + escapeHtml(topicLabel) + '</span>' +
            '<span class="fc__card-level bank__item-level--' + levelName + '">' + escapeHtml(levelLabel) + '</span>';

        var hintArea = document.getElementById('fcCardHint');
        var revealWrap = document.getElementById('fcRevealWrap');
        var answerSection = document.getElementById('fcAnswerSection');

        if (q.hint) {
            hintArea.style.display = '';
            document.getElementById('fcHintText').textContent = q.hint;
            revealWrap.style.display = '';
            answerSection.style.display = 'none';
        } else {
            hintArea.style.display = 'none';
            revealWrap.style.display = 'none';
            answerSection.style.display = '';
        }

        document.getElementById('fcAnswerText').textContent = q.answer;

        var codeArea = document.getElementById('fcCardCode');
        if (q.code) {
            codeArea.style.display = '';
            document.getElementById('fcCodeContent').innerHTML = App.highlightSwift(q.code);
        } else {
            codeArea.style.display = 'none';
        }

        fc.flipped = false;
        fc.answerRevealed = false;
        document.getElementById('fcCard').classList.remove('is-flipped');

        var pct = (fc.index / fc.deck.length) * 100;
        document.getElementById('fcProgressFill').style.width = pct + '%';
        document.getElementById('fcProgressText').textContent = (fc.index + 1) + ' / ' + fc.deck.length;

        document.getElementById('fcRating').style.display = 'none';
    }

    function revealAnswer() {
        fc.answerRevealed = true;
        document.getElementById('fcRevealWrap').style.display = 'none';
        document.getElementById('fcAnswerSection').style.display = '';
        document.getElementById('fcRating').style.display = '';
    }

    function flipCard() {
        fc.flipped = !fc.flipped;
        document.getElementById('fcCard').classList.toggle('is-flipped', fc.flipped);
        if (fc.flipped) {
            var q = fc.deck[fc.index];
            if (!q.hint) {
                document.getElementById('fcRating').style.display = '';
            }
        }
    }

    function rateCard(ease) {
        var q = fc.deck[fc.index];
        var qid = questionId(q);
        var sr = loadSR();
        var now = Date.now();

        var intervals = {
            again: 1 * 60000,
            hard: 10 * 60000,
            good: 24 * 3600000,
            easy: 4 * 24 * 3600000,
        };

        var existing = sr[qid] || { reviews: 0, interval: 0 };
        var multiplier = 1;
        if (existing.reviews > 0) {
            if (ease === 'again') multiplier = 0.5;
            else if (ease === 'hard') multiplier = 1;
            else if (ease === 'good') multiplier = 2;
            else multiplier = 3;
        }

        var newInterval = ease === 'again' ? intervals.again : Math.max(intervals[ease], (existing.interval || intervals[ease]) * multiplier);

        var cardData = {
            ease: ease,
            reviews: (existing.reviews || 0) + 1,
            lastReview: now,
            nextReview: now + newInterval,
            interval: newInterval,
        };
        sr[qid] = cardData;

        saveSR(sr);
        saveSREntryToCloud(qid, cardData);
        fc.results[ease]++;
        fc.results.total++;
        fc.index++;
        showCard();
    }

    function showResults() {
        var streak = updateStreak();
        document.getElementById('fcCardView').style.display = 'none';
        document.getElementById('fcResultsView').style.display = '';

        document.getElementById('fcResGood').textContent = fc.results.good + fc.results.easy;
        document.getElementById('fcResHard').textContent = fc.results.hard;
        document.getElementById('fcResAgain').textContent = fc.results.again;
        document.getElementById('fcResStreak').textContent = streak.count + ' day' + (streak.count !== 1 ? 's' : '');

        // Award flashcard XP
        var totalCards = fc.results.good + fc.results.easy + fc.results.hard + fc.results.again;
        if (App.awardFlashcardXP && totalCards > 0) App.awardFlashcardXP(totalCards);
    }

    function showConfig() {
        document.getElementById('fcConfigView').style.display = '';
        document.getElementById('fcCardView').style.display = 'none';
        document.getElementById('fcResultsView').style.display = 'none';

        var streak = loadStreak();
        var streakEl = document.getElementById('fcStreak');
        if (streak.count > 0) {
            streakEl.style.display = '';
            streakEl.textContent = '🔥 ' + streak.count + ' day streak';
        } else {
            streakEl.style.display = 'none';
        }

        var sr = loadSR();
        var due = 0;
        var now = Date.now();
        for (var key in sr) {
            if (sr[key].nextReview && sr[key].nextReview <= now) due++;
        }

        var dueEl = document.getElementById('fcDueCount');
        if (due > 0) {
            dueEl.textContent = due + ' card' + (due !== 1 ? 's' : '') + ' due for review';
            dueEl.style.display = '';
        } else {
            dueEl.style.display = 'none';
        }
    }

    function startSession() {
        fc.index = 0;
        fc.results = { again: 0, hard: 0, good: 0, easy: 0, total: 0 };
        buildDeck();

        if (fc.deck.length === 0) {
            alert('No questions match your filters. Try selecting more topics or levels.');
            return;
        }

        document.getElementById('fcConfigView').style.display = 'none';
        document.getElementById('fcCardView').style.display = '';
        document.getElementById('fcResultsView').style.display = 'none';
        showCard();
    }

    function init() {
        // Topic pills
        var topicContainer = document.getElementById('fcTopicPills');
        var topics = Object.keys(App.TOPIC_LABELS).sort(function (a, b) {
            return App.TOPIC_LABELS[a].localeCompare(App.TOPIC_LABELS[b]);
        });
        var html = '';
        topics.forEach(function (t) {
            if (t === 'live-coding' || t === 'code-challenge') return;
            html += '<button class="fc__config-pill" data-topic="' + escapeHtml(t) + '">' + escapeHtml(App.TOPIC_LABELS[t]) + '</button>';
        });
        topicContainer.innerHTML = html;

        topicContainer.addEventListener('click', function (e) {
            var pill = e.target.closest('.fc__config-pill');
            if (!pill) return;
            pill.classList.toggle('is-active');
            fc.topics = [];
            topicContainer.querySelectorAll('.fc__config-pill.is-active').forEach(function (p) {
                fc.topics.push(p.dataset.topic);
            });
        });

        // Level pills
        document.getElementById('fcLevelPills').addEventListener('click', function (e) {
            var pill = e.target.closest('.fc__config-pill');
            if (!pill) return;
            pill.classList.toggle('is-active');
            fc.levels = [];
            document.getElementById('fcLevelPills').querySelectorAll('.fc__config-pill.is-active').forEach(function (p) {
                fc.levels.push(parseInt(p.dataset.level, 10));
            });
        });

        // Start
        document.getElementById('fcBtnStart').addEventListener('click', startSession);

        // Flip card
        document.getElementById('fcCard').addEventListener('click', function (e) {
            if (e.target.closest('.fc__rate-btn')) return;
            if (e.target.closest('.fc__reveal-btn')) return;
            flipCard();
        });

        // Reveal answer button
        document.getElementById('fcRevealBtn').addEventListener('click', function (e) {
            e.stopPropagation();
            revealAnswer();
        });

        // Keyboard: Space to flip/reveal, 1-4 to rate
        document.addEventListener('keydown', function (e) {
            var screen = document.getElementById('screen-flashcard');
            if (!screen || !screen.classList.contains('is-active')) return;
            if (document.getElementById('fcCardView').style.display === 'none') return;
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                if (!fc.flipped) {
                    flipCard();
                } else if (fc.flipped && !fc.answerRevealed && fc.deck[fc.index] && fc.deck[fc.index].hint) {
                    revealAnswer();
                }
            } else if (fc.flipped && fc.answerRevealed) {
                if (e.key === '1') { e.preventDefault(); rateCard('again'); }
                else if (e.key === '2') { e.preventDefault(); rateCard('hard'); }
                else if (e.key === '3') { e.preventDefault(); rateCard('good'); }
                else if (e.key === '4') { e.preventDefault(); rateCard('easy'); }
            } else if (fc.flipped && !fc.deck[fc.index].hint) {
                if (e.key === '1') { e.preventDefault(); rateCard('again'); }
                else if (e.key === '2') { e.preventDefault(); rateCard('hard'); }
                else if (e.key === '3') { e.preventDefault(); rateCard('good'); }
                else if (e.key === '4') { e.preventDefault(); rateCard('easy'); }
            }
        });

        // Rating buttons
        document.querySelectorAll('.fc__rate-btn').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                rateCard(btn.dataset.ease);
            });
        });

        // Back
        document.getElementById('fcBack').addEventListener('click', function () {
            App.showScreen('screen-setup');
        });

        // Study Again
        document.getElementById('fcBtnStudyAgain').addEventListener('click', function () {
            showConfig();
        });

        // Back to Setup from results
        document.getElementById('fcBtnBackSetup').addEventListener('click', function () {
            App.showScreen('screen-setup');
        });

        // Open flashcard from setup
        document.getElementById('btnFlashcard').addEventListener('click', function () {
            fc.topics = [];
            fc.levels = [];
            // Rebuild topic pills for current platform
            var pillHtml = '';
            var pillTopics = Object.keys(App.TOPIC_LABELS).sort(function (a, b) {
                return App.TOPIC_LABELS[a].localeCompare(App.TOPIC_LABELS[b]);
            });
            pillTopics.forEach(function (t) {
                if (t === 'live-coding' || t === 'code-challenge') return;
                pillHtml += '<button class="fc__config-pill" data-topic="' + escapeHtml(t) + '">' + escapeHtml(App.TOPIC_LABELS[t]) + '</button>';
            });
            topicContainer.innerHTML = pillHtml;
            document.querySelectorAll('#fcLevelPills .fc__config-pill').forEach(function (p) {
                p.classList.remove('is-active');
            });
            showConfig();
            App.showScreen('screen-flashcard');
        });

        // Escape
        document.addEventListener('keydown', function (e) {
            if (e.key !== 'Escape') return;
            var screen = document.getElementById('screen-flashcard');
            if (screen && screen.classList.contains('is-active')) {
                App.showScreen('screen-setup');
            }
        });
    }

    init();

})(InterviewApp);
