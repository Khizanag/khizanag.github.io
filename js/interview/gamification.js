(function (App) {
    'use strict';

    var STORAGE_KEY = 'ios-interview-gamification';
    var XP_PER_LEVEL = 500;

    // ---- Achievement definitions ----
    var ACHIEVEMENTS = [
        { id: 'first-interview', icon: '🎯', name: 'First Steps', desc: 'Complete your first interview' },
        { id: '5-interviews', icon: '🏅', name: 'Getting Serious', desc: 'Complete 5 interviews' },
        { id: '20-interviews', icon: '🏆', name: 'Veteran', desc: 'Complete 20 interviews' },
        { id: 'perfect-5', icon: '⭐', name: 'Perfect Score', desc: 'Rate a question 5/5' },
        { id: 'all-topics', icon: '🌈', name: 'Well-Rounded', desc: 'Cover 5+ topics in one session' },
        { id: 'speed-demon', icon: '⚡', name: 'Speed Demon', desc: 'Average under 30s per question' },
        { id: 'streak-3', icon: '🔥', name: 'On Fire', desc: 'Maintain a 3-day practice streak' },
        { id: 'streak-7', icon: '💎', name: 'Diamond Streak', desc: 'Maintain a 7-day practice streak' },
        { id: 'flashcard-50', icon: '🃏', name: 'Card Collector', desc: 'Review 50 flashcards' },
        { id: 'flashcard-200', icon: '🧠', name: 'Memory Master', desc: 'Review 200 flashcards' },
        { id: 'multi-platform', icon: '🌐', name: 'Polyglot', desc: 'Practice on 3+ platforms' },
        { id: 'night-owl', icon: '🦉', name: 'Night Owl', desc: 'Practice after 10 PM' },
        { id: 'early-bird', icon: '🐦', name: 'Early Bird', desc: 'Practice before 7 AM' },
        { id: 'level-5', icon: '🚀', name: 'Rising Star', desc: 'Reach level 5' },
        { id: 'level-10', icon: '👑', name: 'Interview King', desc: 'Reach level 10' },
    ];

    // ---- State persistence ----
    function loadData() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (raw) return JSON.parse(raw);
        } catch (e) { InterviewUtils.logError('gamification:load', e); }
        return {
            xp: 0,
            totalInterviews: 0,
            totalQuestions: 0,
            totalFlashcards: 0,
            platforms: [],
            achievements: [],
            streak: 0,
            lastActiveDate: null,
        };
    }

    function saveData(data) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) { InterviewUtils.logError('gamification:save', e); }
        if (window.FirebaseService) {
            window.FirebaseService.saveGamification(data);
        }
    }

    // ---- XP & Level calculation ----
    function getLevel(xp) {
        return Math.floor(xp / XP_PER_LEVEL) + 1;
    }

    function getXpInLevel(xp) {
        return xp % XP_PER_LEVEL;
    }

    function getLevelTitle(level) {
        if (level >= 20) return 'Legendary';
        if (level >= 15) return 'Master';
        if (level >= 10) return 'Expert';
        if (level >= 7) return 'Advanced';
        if (level >= 5) return 'Intermediate';
        if (level >= 3) return 'Apprentice';
        return 'Beginner';
    }

    // ---- Streak ----
    function updateStreak(data) {
        var today = new Date().toISOString().slice(0, 10);
        if (data.lastActiveDate === today) return; // Already counted today

        var yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        if (data.lastActiveDate === yesterday) {
            data.streak++;
        } else if (data.lastActiveDate !== today) {
            data.streak = 1;
        }
        data.lastActiveDate = today;
    }

    // ---- Achievement checking ----
    function checkAndUnlock(data, id) {
        if (data.achievements.indexOf(id) !== -1) return false;
        data.achievements.push(id);
        return true;
    }

    function checkAchievements(data, sessionData) {
        var newUnlocks = [];

        // Interview count
        if (data.totalInterviews >= 1 && checkAndUnlock(data, 'first-interview')) {
            newUnlocks.push('first-interview');
        }
        if (data.totalInterviews >= 5 && checkAndUnlock(data, '5-interviews')) {
            newUnlocks.push('5-interviews');
        }
        if (data.totalInterviews >= 20 && checkAndUnlock(data, '20-interviews')) {
            newUnlocks.push('20-interviews');
        }

        // Perfect score
        if (sessionData && sessionData.ratings) {
            for (var i = 0; i < sessionData.ratings.length; i++) {
                if (sessionData.ratings[i] === 5 && checkAndUnlock(data, 'perfect-5')) {
                    newUnlocks.push('perfect-5');
                    break;
                }
            }
        }

        // Topics covered
        if (sessionData && sessionData.topics && sessionData.topics >= 5 && checkAndUnlock(data, 'all-topics')) {
            newUnlocks.push('all-topics');
        }

        // Speed
        if (sessionData && sessionData.avgTime && sessionData.avgTime < 30 && sessionData.avgTime > 0 && checkAndUnlock(data, 'speed-demon')) {
            newUnlocks.push('speed-demon');
        }

        // Streaks
        if (data.streak >= 3 && checkAndUnlock(data, 'streak-3')) {
            newUnlocks.push('streak-3');
        }
        if (data.streak >= 7 && checkAndUnlock(data, 'streak-7')) {
            newUnlocks.push('streak-7');
        }

        // Flashcards
        if (data.totalFlashcards >= 50 && checkAndUnlock(data, 'flashcard-50')) {
            newUnlocks.push('flashcard-50');
        }
        if (data.totalFlashcards >= 200 && checkAndUnlock(data, 'flashcard-200')) {
            newUnlocks.push('flashcard-200');
        }

        // Multi-platform
        if (data.platforms.length >= 3 && checkAndUnlock(data, 'multi-platform')) {
            newUnlocks.push('multi-platform');
        }

        // Time-based
        var hour = new Date().getHours();
        if (hour >= 22 && checkAndUnlock(data, 'night-owl')) {
            newUnlocks.push('night-owl');
        }
        if (hour < 7 && checkAndUnlock(data, 'early-bird')) {
            newUnlocks.push('early-bird');
        }

        // Level
        var level = getLevel(data.xp);
        if (level >= 5 && checkAndUnlock(data, 'level-5')) {
            newUnlocks.push('level-5');
        }
        if (level >= 10 && checkAndUnlock(data, 'level-10')) {
            newUnlocks.push('level-10');
        }

        return newUnlocks;
    }

    // ---- XP Toasts ----
    var xpToastTimeout = null;
    var achieveToastTimeout = null;

    function showXpToast(amount) {
        var toast = document.getElementById('xpToast');
        if (!toast) return;
        toast.innerHTML = '<span class="xp-toast__amount">+' + amount + ' XP</span>';
        if (xpToastTimeout) clearTimeout(xpToastTimeout);
        toast.classList.add('is-visible');
        xpToastTimeout = setTimeout(function () {
            toast.classList.remove('is-visible');
        }, 2500);
    }

    function showAchievementToast(achievementId) {
        var def = null;
        for (var i = 0; i < ACHIEVEMENTS.length; i++) {
            if (ACHIEVEMENTS[i].id === achievementId) { def = ACHIEVEMENTS[i]; break; }
        }
        if (!def) return;

        var toast = document.getElementById('achievementToast');
        if (!toast) return;
        toast.innerHTML =
            '<span class="achievement-toast__icon">' + def.icon + '</span>' +
            '<div class="achievement-toast__body">' +
                '<span class="achievement-toast__label">Achievement Unlocked</span>' +
                '<span class="achievement-toast__name">' + def.name + '</span>' +
            '</div>';
        if (achieveToastTimeout) clearTimeout(achieveToastTimeout);
        // Delay slightly so it doesn't overlap XP toast
        setTimeout(function () {
            toast.classList.add('is-visible');
            achieveToastTimeout = setTimeout(function () {
                toast.classList.remove('is-visible');
            }, 3500);
        }, 500);
    }

    // ---- XP Bar rendering ----
    function renderXpBar() {
        var container = document.getElementById('xpBarContainer');
        if (!container) return;
        if (!App.isFeatureEnabled('gamification')) { container.style.display = 'none'; return; }

        var data = loadData();
        var level = getLevel(data.xp);
        var xpInLevel = getXpInLevel(data.xp);
        var pct = Math.round((xpInLevel / XP_PER_LEVEL) * 100);
        var title = getLevelTitle(level);

        container.innerHTML =
            '<div class="xp-bar">' +
                '<div class="xp-bar__level">' + level + '</div>' +
                '<div class="xp-bar__info">' +
                    '<div class="xp-bar__label">' + title + ' &middot; Level ' + level + '</div>' +
                    '<div class="xp-bar__track"><div class="xp-bar__fill" style="width:' + pct + '%"></div></div>' +
                    '<div class="xp-bar__text">' + xpInLevel + ' / ' + XP_PER_LEVEL + ' XP to next level &middot; ' + data.xp + ' total</div>' +
                '</div>' +
                '<div class="xp-bar__streak">' +
                    '<span class="xp-bar__streak-value">' + data.streak + '</span>' +
                    '<span class="xp-bar__streak-label">Day Streak</span>' +
                '</div>' +
                '<button class="xp-bar__help" id="xpHelpBtn" aria-label="What is this?" title="What is this?">?</button>' +
            '</div>';
    }

    // ---- Achievements in analytics ----
    function renderAchievements() {
        var container = document.getElementById('achievementsGrid');
        if (!container) return;

        var data = loadData();
        var html = '';
        for (var i = 0; i < ACHIEVEMENTS.length; i++) {
            var a = ACHIEVEMENTS[i];
            var unlocked = data.achievements.indexOf(a.id) !== -1;
            html += '<div class="achievement achievement--' + (unlocked ? 'unlocked' : 'locked') + '">';
            html += '<span class="achievement__icon">' + a.icon + '</span>';
            html += '<span class="achievement__name">' + a.name + '</span>';
            html += '<span class="achievement__desc">' + a.desc + '</span>';
            html += '</div>';
        }
        container.innerHTML = html;
    }

    // ---- Public API ----

    App.renderAchievements = renderAchievements;

    // Called after interview results
    App.awardInterviewXP = function () {
        var s = App.state;
        var data = loadData();

        // Calculate XP
        var questionXP = s.ratings.length * 10;
        var avgRating = s.ratings.length > 0 ?
            s.ratings.reduce(function (a, b) { return a + b; }, 0) / s.ratings.length : 0;
        var qualityBonus = Math.round(avgRating * 5);
        var uniqueTopics = [];
        s.sessionQuestions.forEach(function (q) {
            if (uniqueTopics.indexOf(q.topic) === -1) uniqueTopics.push(q.topic);
        });
        var topicBonus = uniqueTopics.length * 5;

        // Time bonus — faster avg = more XP
        var times = [];
        s.sessionQuestions.forEach(function (q, i) {
            if (i < s.ratings.length && !q.skipped && q._timeSpent) {
                times.push(q._timeSpent);
            }
        });
        var avgTime = times.length > 0 ? times.reduce(function (a, b) { return a + b; }, 0) / times.length : 0;
        var timeBonus = avgTime > 0 && avgTime < 60 ? Math.round((60 - avgTime) / 2) : 0;

        var totalXP = questionXP + qualityBonus + topicBonus + timeBonus;

        var oldLevel = getLevel(data.xp);
        data.xp += totalXP;
        data.totalInterviews++;
        data.totalQuestions += s.ratings.length;

        // Track platform
        var platform = s.platform || 'ios';
        if (data.platforms.indexOf(platform) === -1) {
            data.platforms.push(platform);
        }

        updateStreak(data);

        var newUnlocks = checkAchievements(data, {
            ratings: s.ratings,
            topics: uniqueTopics.length,
            avgTime: avgTime,
        });

        saveData(data);

        // Show XP earned toast
        showXpToast(totalXP);

        // Show achievement toasts
        for (var i = 0; i < newUnlocks.length; i++) {
            (function (id, delay) {
                setTimeout(function () { showAchievementToast(id); }, delay);
            })(newUnlocks[i], i * 4000);
        }

        // Check level up
        var newLevel = getLevel(data.xp);
        if (newLevel > oldLevel) {
            setTimeout(function () {
                showXpToast('Level ' + newLevel + '!');
            }, newUnlocks.length > 0 ? 4000 : 3000);
        }

        // Show XP summary in results
        var summaryEl = document.getElementById('resultsXpSummary');
        if (summaryEl) {
            summaryEl.style.display = '';
            summaryEl.innerHTML =
                '<div class="results__xp-earned">+' + totalXP + ' XP</div>' +
                '<div class="results__xp-label">Level ' + newLevel + ' &middot; ' + getLevelTitle(newLevel) + '</div>' +
                '<div class="results__xp-breakdown">' +
                    '<span class="results__xp-item">' + s.ratings.length + 'q &times; 10 = ' + questionXP + '</span>' +
                    '<span class="results__xp-item">Quality +' + qualityBonus + '</span>' +
                    '<span class="results__xp-item">Topics +' + topicBonus + '</span>' +
                    (timeBonus > 0 ? '<span class="results__xp-item">Speed +' + timeBonus + '</span>' : '') +
                '</div>';
        }

        renderXpBar();
    };

    // Called from flashcard module
    App.awardFlashcardXP = function (count) {
        var data = loadData();
        var xp = count * 3;
        data.xp += xp;
        data.totalFlashcards += count;
        updateStreak(data);
        var newUnlocks = checkAchievements(data, null);
        saveData(data);
        showXpToast(xp);
        for (var i = 0; i < newUnlocks.length; i++) {
            (function (id, delay) {
                setTimeout(function () { showAchievementToast(id); }, delay);
            })(newUnlocks[i], i * 4000);
        }
        renderXpBar();
    };

    // ---- Gamification Guide Modal ----
    function openGuideModal() {
        var modal = document.getElementById('gmModal');
        if (!modal) return;

        // Populate achievements list with current unlock status
        var data = loadData();
        var listEl = document.getElementById('gmAchievementsList');
        if (listEl) {
            var html = '';
            for (var i = 0; i < ACHIEVEMENTS.length; i++) {
                var a = ACHIEVEMENTS[i];
                var unlocked = data.achievements.indexOf(a.id) !== -1;
                html += '<div class="gm-ach-row' + (unlocked ? ' gm-ach-row--unlocked' : '') + '">';
                html += '<span class="gm-ach-row__icon">' + a.icon + '</span>';
                html += '<span class="gm-ach-row__name">' + a.name + '</span>';
                html += '<span class="gm-ach-row__desc">' + a.desc + '</span>';
                if (unlocked) {
                    html += '<span class="gm-ach-row__check">&#10003;</span>';
                }
                html += '</div>';
            }
            listEl.innerHTML = html;
        }

        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function closeGuideModal() {
        var modal = document.getElementById('gmModal');
        if (!modal) return;
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    // Init
    function init() {
        renderXpBar();
        renderAchievements();

        // Modal close button
        var closeBtn = document.getElementById('gmModalClose');
        if (closeBtn) closeBtn.addEventListener('click', closeGuideModal);

        // Click overlay to close
        var overlay = document.getElementById('gmModal');
        if (overlay) {
            overlay.addEventListener('click', function (e) {
                if (e.target === overlay) closeGuideModal();
            });
        }

        // Escape to close
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && overlay && overlay.classList.contains('is-open')) {
                closeGuideModal();
            }
        });

        // Help button — delegated because XP bar re-renders
        document.addEventListener('click', function (e) {
            if (e.target.closest('#xpHelpBtn')) {
                openGuideModal();
            }
        });
    }

    // Re-render XP bar when returning to setup
    var origShowScreen = App.showScreen;
    App.showScreen = function (id) {
        origShowScreen(id);
        if (id === 'screen-setup') renderXpBar();
        if (id === 'screen-analytics') renderAchievements();
    };

    init();

})(InterviewApp);
