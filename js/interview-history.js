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
        } catch (e) { return []; }
    }

    function saveHistory(entries) {
        try {
            localStorage.setItem(HISTORY_KEY, JSON.stringify(entries.slice(0, MAX_ENTRIES)));
        } catch (e) { /* */ }
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
            introNotes: s.introNotes || '',
            wrapupNotes: s.wrapupNotes || '',
        };

        var history = loadHistory();
        history.unshift(entry);
        saveHistory(history);

        // Dual-write to Firestore
        if (window.FirebaseService && !window.FirebaseService.isGuest && window.FirebaseService.currentUser) {
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

        history.forEach(function (entry) {
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
                '<div class="history__card-header">' +
                    '<div class="history__card-info">' +
                        '<span class="history__card-name">' + esc(entry.intervieweeName) + '</span>' +
                        '<span class="history__card-date">' + esc(dateStr) + '</span>' +
                    '</div>' +
                    '<div class="history__card-actions">' +
                        '<label class="history__compare-label">' +
                            '<input type="checkbox" class="history__compare-cb" data-id="' + esc(entry.id) + '">' +
                            '<span>Compare</span>' +
                        '</label>' +
                        '<button class="history__delete-btn" data-id="' + esc(entry.id) + '" aria-label="Delete">' +
                            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>' +
                        '</button>' +
                    '</div>' +
                '</div>' +
                '<div class="history__card-stats">' +
                    '<span class="history__card-level" style="color:' + levelColor + '">' + levelEmoji + ' ' + esc(levelLabel) + '</span>' +
                    '<span class="history__card-avg">' + entry.avg.toFixed(1) + '/5</span>' +
                    '<span class="history__card-count">' + entry.ratedCount + 'q' +
                        (entry.skippedCount > 0 ? ' <span class="history__card-skipped">+' + entry.skippedCount + ' skipped</span>' : '') +
                    '</span>' +
                '</div>';

            container.appendChild(card);
        });

        // Delete handlers
        container.addEventListener('click', function (e) {
            var delBtn = e.target.closest('.history__delete-btn');
            if (!delBtn) return;
            var id = delBtn.dataset.id;
            if (!confirm('Delete this interview record?')) return;
            var h = loadHistory().filter(function (entry) { return entry.id !== id; });
            saveHistory(h);
            // Dual-delete from Firestore
            if (window.FirebaseService && !window.FirebaseService.isGuest && window.FirebaseService.currentUser) {
                window.FirebaseService.deleteHistoryEntry(id);
            }
            App.renderHistory();
        });

        // Compare checkbox handlers
        container.addEventListener('change', function (e) {
            if (!e.target.classList.contains('history__compare-cb')) return;
            var checked = container.querySelectorAll('.history__compare-cb:checked');
            if (checked.length > 2) {
                e.target.checked = false;
                return;
            }
            var compareBtn = document.getElementById('btnCompare');
            if (compareBtn) {
                compareBtn.style.display = checked.length === 2 ? '' : 'none';
            }
        });
    };

    App.showComparison = function () {
        var container = document.getElementById('historyList');
        var checked = container.querySelectorAll('.history__compare-cb:checked');
        if (checked.length !== 2) return;

        var history = loadHistory();
        var ids = [checked[0].dataset.id, checked[1].dataset.id];
        var entries = ids.map(function (id) {
            return history.find(function (e) { return e.id === id; });
        }).filter(Boolean);

        if (entries.length !== 2) return;

        var modal = document.getElementById('modalCompare');
        var body = document.getElementById('compareBody');
        if (!modal || !body) return;

        var esc = App.escapeHtml;
        var html = '<table class="compare__table">';
        html += '<thead><tr><th></th>';
        entries.forEach(function (e) {
            html += '<th>' + esc(e.intervieweeName) + '</th>';
        });
        html += '</tr></thead><tbody>';

        // Date
        html += '<tr><td>Date</td>';
        entries.forEach(function (e) {
            html += '<td>' + new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + '</td>';
        });
        html += '</tr>';

        // Level
        html += '<tr><td>Assessment</td>';
        entries.forEach(function (e) {
            html += '<td style="color:' + App.LEVEL_COLORS[e.levelIndex] + '">' + App.LEVEL_EMOJIS[e.levelIndex] + ' ' + esc(App.LEVEL_LABELS[e.levelIndex]) + '</td>';
        });
        html += '</tr>';

        // Average
        html += '<tr><td>Avg Rating</td>';
        entries.forEach(function (e) {
            html += '<td>' + e.avg.toFixed(1) + '/5</td>';
        });
        html += '</tr>';

        // Questions
        html += '<tr><td>Questions</td>';
        entries.forEach(function (e) {
            html += '<td>' + e.ratedCount + '</td>';
        });
        html += '</tr>';

        // Topic comparison
        var allTopics = {};
        entries.forEach(function (e) {
            e.topics.forEach(function (t) { allTopics[t.topic] = true; });
        });

        Object.keys(allTopics).forEach(function (topic) {
            var label = App.TOPIC_LABELS[topic] || topic;
            html += '<tr><td>' + esc(label) + '</td>';
            entries.forEach(function (e) {
                var t = e.topics.find(function (x) { return x.topic === topic; });
                if (t) {
                    html += '<td>' + t.avg.toFixed(1) + '/5 (' + t.count + 'q)</td>';
                } else {
                    html += '<td class="compare__na">-</td>';
                }
            });
            html += '</tr>';
        });

        html += '</tbody></table>';
        body.innerHTML = html;
        modal.style.display = '';
    };

})(InterviewApp);
