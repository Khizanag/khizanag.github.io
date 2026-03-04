(function (App) {
    'use strict';

    var HISTORY_KEY = 'ios-interview-history';
    var MAX_ENTRIES = 50;

    function loadHistory() {
        try {
            var raw = localStorage.getItem(HISTORY_KEY);
            if (!raw) return [];
            var arr = JSON.parse(raw);
            return Array.isArray(arr) ? arr : [];
        } catch (e) {
            InterviewUtils.logError('history:load', e);
            return [];
        }
    }

    App.loadLocalHistory = loadHistory;

    function saveHistory(entries) {
        try {
            localStorage.setItem(HISTORY_KEY, JSON.stringify(entries.slice(0, MAX_ENTRIES)));
        } catch (e) {
            InterviewUtils.logError('history:save', e);
        }
    }

    App.saveToHistory = function () {
        var s = App.state;
        if (!s.ratings.length) return;

        var ratedSum = 0;
        var ratedCount = 0;
        var skippedCount = 0;
        s.sessionQuestions.forEach(function (q, i) {
            if (i >= s.ratings.length) return;
            if (q.skipped) { skippedCount++; return; }
            ratedSum += s.ratings[i];
            ratedCount++;
        });

        var avg = ratedCount > 0 ? ratedSum / ratedCount : 0;
        var levelIndex = App.getLevelIndex(avg);

        var topicStats = {};
        s.sessionQuestions.forEach(function (q, i) {
            if (i >= s.ratings.length || q.skipped) return;
            if (!topicStats[q.topic]) topicStats[q.topic] = { count: 0, total: 0 };
            topicStats[q.topic].count++;
            topicStats[q.topic].total += s.ratings[i];
        });

        var entry = {
            id: Date.now() + '-' + Math.random().toString(36).substr(2, 6),
            date: new Date().toISOString(),
            interviewerName: s.interviewerName,
            intervieweeName: s.intervieweeName,
            avg: Math.round(avg * 100) / 100,
            levelIndex: levelIndex,
            ratedCount: ratedCount,
            skippedCount: skippedCount,
            topics: Object.keys(topicStats).map(function (key) {
                var t = topicStats[key];
                return { topic: key, avg: Math.round((t.total / t.count) * 100) / 100, count: t.count };
            }),
            candidateLevel: s.candidateLevel !== undefined ? s.candidateLevel : null,
            introNotes: s.introNotes || '',
            wrapupNotes: s.wrapupNotes || '',
            topicStats: topicStats,
        };

        var history = loadHistory();
        history.unshift(entry);
        saveHistory(history);

        if (window.FirebaseService) {
            window.FirebaseService.saveHistoryEntry(entry);
        }
    };

    App.renderHistory = function () {
        var container = document.getElementById('historyList');
        var section = document.getElementById('historySection');
        if (!container || !section) return;

        var history = loadHistory();
        if (history.length === 0) {
            section.style.display = 'none';
            return;
        }

        section.style.display = '';
        container.innerHTML = '';
        var esc = App.escapeHtml;
        var MAX_PREVIEW = 5;
        var visible = history.slice(0, MAX_PREVIEW);

        visible.forEach(function (entry) {
            var card = document.createElement('div');
            card.className = 'history__card';
            card.dataset.id = entry.id;

            var dateStr = new Date(entry.date).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric',
            });

            var levelLabel = App.LEVEL_LABELS[entry.levelIndex] || 'N/A';
            var levelEmoji = App.LEVEL_EMOJIS[entry.levelIndex] || '';
            var levelColor = App.LEVEL_COLORS[entry.levelIndex] || '#86868b';

            card.innerHTML =
                '<input type="checkbox" class="history__compare-cb" data-id="' + esc(entry.id) + '">' +
                '<div class="history__card-check">' +
                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg>' +
                '</div>' +
                '<div class="history__card-content">' +
                    '<div class="history__card-header">' +
                        '<div class="history__card-info">' +
                            '<span class="history__card-name">' + esc(entry.intervieweeName) + '</span>' +
                            '<span class="history__card-date">' + esc(dateStr) + '</span>' +
                        '</div>' +
                        '<button class="history__delete-btn" data-id="' + esc(entry.id) + '" aria-label="Delete">' +
                            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>' +
                        '</button>' +
                    '</div>' +
                    '<div class="history__card-stats">' +
                        '<span class="history__card-level" style="color:' + levelColor + '">' + levelEmoji + ' ' + esc(levelLabel) + '</span>' +
                        '<span class="history__card-avg">' + entry.avg.toFixed(1) + '/5</span>' +
                        '<span class="history__card-count">' + entry.ratedCount + 'q' +
                            (entry.skippedCount > 0 ? ' <span class="history__card-skipped">+' + entry.skippedCount + ' skipped</span>' : '') +
                        '</span>' +
                    '</div>' +
                '</div>';

            container.appendChild(card);
        });

        function updateCompareBtn() {
            var count = container.querySelectorAll('.history__compare-cb:checked').length;
            var compareBtn = document.getElementById('btnCompare');
            if (compareBtn) {
                compareBtn.style.display = count >= 2 ? '' : 'none';
                compareBtn.textContent = 'Compare ' + count + ' Selected';
            }
        }

        // Card click toggles selection (unless clicking delete)
        container.addEventListener('click', function (e) {
            var delBtn = e.target.closest('.history__delete-btn');
            if (delBtn) {
                var id = delBtn.dataset.id;
                if (!confirm('Delete this interview record?')) return;
                var h = loadHistory().filter(function (entry) { return entry.id !== id; });
                saveHistory(h);
                if (window.FirebaseService) {
                    window.FirebaseService.deleteHistoryEntry(id);
                }
                App.renderHistory();
                return;
            }

            var card = e.target.closest('.history__card');
            if (!card) return;
            var cb = card.querySelector('.history__compare-cb');
            if (!cb) return;
            cb.checked = !cb.checked;
            card.classList.toggle('is-selected', cb.checked);
            updateCompareBtn();
        });
    };

    // ---- Comparison view ----

    function ratingColor(avg) {
        if (avg >= 4.0) return '#30d158';
        if (avg >= 3.0) return '#ff9f0a';
        if (avg >= 2.0) return '#ff375f';
        return '#86868b';
    }

    function buildRatingBar(avg, color) {
        var pct = Math.round((avg / 5) * 100);
        return '<div class="cmp-rating">' +
            '<div class="cmp-rating__bar"><div class="cmp-rating__fill" style="width:' + pct + '%;background:' + color + '"></div></div>' +
            '<span class="cmp-rating__text" style="color:' + color + '">' + avg.toFixed(1) + '</span>' +
        '</div>';
    }

    function bestIndex(entries, valueFn) {
        var best = -Infinity;
        var idx = -1;
        entries.forEach(function (e, i) {
            var v = valueFn(e);
            if (v > best) { best = v; idx = i; }
        });
        return idx;
    }

    App.showComparison = function () {
        var container = document.getElementById('historyList');
        var checked = container.querySelectorAll('.history__compare-cb:checked');
        if (checked.length < 2) return;

        var history = loadHistory();
        var ids = Array.prototype.map.call(checked, function (cb) { return cb.dataset.id; });
        var entries = ids.map(function (id) {
            return history.find(function (e) { return e.id === id; });
        }).filter(Boolean);

        if (entries.length < 2) return;

        var modal = document.getElementById('modalCompare');
        var body = document.getElementById('compareBody');
        if (!modal || !body) return;

        var esc = App.escapeHtml;
        var bestAvgIdx = bestIndex(entries, function (e) { return e.avg; });
        var bestQIdx = bestIndex(entries, function (e) { return e.ratedCount; });

        // Build candidate cards
        var html = '<div class="cmp-cards">';
        entries.forEach(function (entry, idx) {
            var levelLabel = App.LEVEL_LABELS[entry.levelIndex] || 'N/A';
            var levelEmoji = App.LEVEL_EMOJIS[entry.levelIndex] || '';
            var levelColor = App.LEVEL_COLORS[entry.levelIndex] || '#86868b';
            var dateStr = new Date(entry.date).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric',
            });
            var avgColor = ratingColor(entry.avg);

            html += '<div class="cmp-card">';

            // Header: name + date
            html += '<div class="cmp-card__header">' +
                '<span class="cmp-card__name">' + esc(entry.intervieweeName) + '</span>' +
                '<span class="cmp-card__date">' + esc(dateStr) + '</span>' +
            '</div>';

            // Level badge
            html += '<div class="cmp-card__level" style="color:' + levelColor + ';background:' + levelColor + '15;border-color:' + levelColor + '30">' +
                '<span>' + levelEmoji + '</span> ' + esc(levelLabel) +
            '</div>';

            // Overall rating
            html += '<div class="cmp-card__section">' +
                '<span class="cmp-card__label">Overall Rating' + (idx === bestAvgIdx ? ' <span class="cmp-best">Best</span>' : '') + '</span>' +
                buildRatingBar(entry.avg, avgColor) +
            '</div>';

            // Questions count
            html += '<div class="cmp-card__section">' +
                '<span class="cmp-card__label">Questions' + (idx === bestQIdx ? ' <span class="cmp-best">Most</span>' : '') + '</span>' +
                '<div class="cmp-stat-row">' +
                    '<span class="cmp-stat-value">' + entry.ratedCount + ' rated</span>' +
                    (entry.skippedCount > 0 ? '<span class="cmp-stat-dim">' + entry.skippedCount + ' skipped</span>' : '') +
                '</div>' +
            '</div>';

            // Topic breakdown
            if (entry.topics.length > 0) {
                html += '<div class="cmp-card__section cmp-card__section--topics">' +
                    '<span class="cmp-card__label">Topics</span>';
                entry.topics.forEach(function (t) {
                    var topicLabel = App.TOPIC_LABELS[t.topic] || t.topic;
                    var tColor = ratingColor(t.avg);
                    html += '<div class="cmp-topic">' +
                        '<div class="cmp-topic__header">' +
                            '<span class="cmp-topic__name">' + esc(topicLabel) + '</span>' +
                            '<span class="cmp-topic__count">' + t.count + 'q</span>' +
                        '</div>' +
                        buildRatingBar(t.avg, tColor) +
                    '</div>';
                });
                html += '</div>';
            }

            html += '</div>'; // .cmp-card
        });
        html += '</div>'; // .cmp-cards

        // Topic-by-topic cross-comparison table
        var allTopics = {};
        entries.forEach(function (e) {
            e.topics.forEach(function (t) { allTopics[t.topic] = true; });
        });
        var topicKeys = Object.keys(allTopics);
        if (topicKeys.length > 0) {
            html += '<div class="cmp-cross">' +
                '<span class="cmp-cross__title">Topic Comparison</span>' +
                '<div class="cmp-cross__grid">';
            topicKeys.forEach(function (topic) {
                var topicLabel = App.TOPIC_LABELS[topic] || topic;
                html += '<div class="cmp-cross__row">' +
                    '<span class="cmp-cross__topic">' + esc(topicLabel) + '</span>' +
                    '<div class="cmp-cross__bars">';
                var topicBestIdx = bestIndex(entries, function (e) {
                    var t = e.topics.find(function (x) { return x.topic === topic; });
                    return t ? t.avg : -1;
                });
                entries.forEach(function (e, idx) {
                    var t = e.topics.find(function (x) { return x.topic === topic; });
                    if (t) {
                        var tColor = ratingColor(t.avg);
                        var isBest = idx === topicBestIdx && entries.length > 1;
                        html += '<div class="cmp-cross__entry' + (isBest ? ' cmp-cross__entry--best' : '') + '">' +
                            '<span class="cmp-cross__name">' + esc(e.intervieweeName) + '</span>' +
                            buildRatingBar(t.avg, tColor) +
                        '</div>';
                    } else {
                        html += '<div class="cmp-cross__entry cmp-cross__entry--na">' +
                            '<span class="cmp-cross__name">' + esc(e.intervieweeName) + '</span>' +
                            '<span class="cmp-cross__na">Not covered</span>' +
                        '</div>';
                    }
                });
                html += '</div></div>';
            });
            html += '</div></div>';
        }

        body.innerHTML = html;
        modal.style.display = '';
    };

})(InterviewApp);
