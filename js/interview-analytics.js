(function (App) {
    'use strict';

    var escapeHtml = App.escapeHtml;
    var currentRange = 'all';

    function loadHistory() {
        return App.loadLocalHistory();
    }

    function filterByRange(history, range) {
        if (range === 'all') return history;
        var days = parseInt(range, 10);
        var cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        var cutoffISO = cutoff.toISOString().slice(0, 10);
        return history.filter(function (h) {
            return h.date >= cutoffISO;
        });
    }

    function renderSummary(history) {
        var totalInterviews = history.length;
        var totalQuestions = 0;
        var sumAvg = 0;
        var allTopics = {};

        history.forEach(function (h) {
            totalQuestions += h.ratedCount || 0;
            sumAvg += h.avg || 0;
            (h.topics || []).forEach(function (t) {
                allTopics[t.topic] = true;
            });
        });

        var overallAvg = totalInterviews > 0 ? (sumAvg / totalInterviews).toFixed(1) : '—';
        var topicCount = Object.keys(allTopics).length;

        document.getElementById('anSumInterviews').textContent = totalInterviews;
        document.getElementById('anSumQuestions').textContent = totalQuestions;
        document.getElementById('anSumAvg').textContent = overallAvg;
        document.getElementById('anSumTopics').textContent = topicCount;
    }

    function renderTrendChart(history) {
        var container = document.getElementById('anTrend');
        if (history.length < 2) {
            container.innerHTML = '<div style="text-align:center;padding:40px 0;color:var(--color-gray-500);font-size:13px;">Need at least 2 interviews to show trends</div>';
            return;
        }

        var entries = history.slice().reverse().slice(-20);
        var n = entries.length;

        var padL = 36, padR = 16, padT = 16, padB = 40;
        var w = 680, h = 200;
        var chartW = w - padL - padR;
        var chartH = h - padT - padB;

        function x(i) { return padL + (i / (n - 1)) * chartW; }
        function y(val) { return padT + chartH - ((val - 1) / 4) * chartH; }

        var svgParts = [];
        svgParts.push('<svg class="analytics__trend-svg" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none">');

        for (var g = 1; g <= 5; g++) {
            var gy = y(g);
            svgParts.push('<line x1="' + padL + '" y1="' + gy + '" x2="' + (w - padR) + '" y2="' + gy + '" class="analytics__trend-grid-line"/>');
            svgParts.push('<text x="' + (padL - 8) + '" y="' + (gy + 4) + '" class="analytics__trend-y-label" text-anchor="end">' + g + '</text>');
        }

        var points = [];
        var areaPoints = [];
        for (var i = 0; i < n; i++) {
            var px = x(i);
            var py = y(entries[i].avg);
            points.push(px + ',' + py);
            areaPoints.push(px + ',' + py);
        }
        areaPoints.push(x(n - 1) + ',' + y(1));
        areaPoints.push(x(0) + ',' + y(1));

        svgParts.push('<polygon points="' + areaPoints.join(' ') + '" class="analytics__trend-area"/>');
        svgParts.push('<polyline points="' + points.join(' ') + '" class="analytics__trend-line"/>');

        for (var j = 0; j < n; j++) {
            var dx = x(j);
            var dy = y(entries[j].avg);
            var levelColor = App.LEVEL_COLORS[entries[j].levelIndex] || App.LEVEL_COLORS[0];
            svgParts.push('<circle cx="' + dx + '" cy="' + dy + '" r="4" class="analytics__trend-dot" style="fill:' + levelColor + '" data-idx="' + j + '"/>');

            if (n <= 12 || j % Math.ceil(n / 10) === 0 || j === n - 1) {
                var dateLabel = new Date(entries[j].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                svgParts.push('<text x="' + dx + '" y="' + (h - 8) + '" class="analytics__trend-label" text-anchor="middle">' + escapeHtml(dateLabel) + '</text>');
            }
        }

        svgParts.push('</svg>');

        var tooltip = '<div class="analytics__trend-tooltip" id="anTrendTooltip">' +
            '<div class="analytics__trend-tooltip-name" id="anTooltipName"></div>' +
            '<div class="analytics__trend-tooltip-detail" id="anTooltipDetail"></div></div>';

        container.innerHTML = svgParts.join('') + tooltip;

        var tooltipEl = document.getElementById('anTrendTooltip');
        container.addEventListener('mouseover', function (e) {
            var dot = e.target.closest('.analytics__trend-dot');
            if (!dot) { tooltipEl.classList.remove('is-visible'); return; }
            var idx = parseInt(dot.dataset.idx, 10);
            var entry = entries[idx];
            document.getElementById('anTooltipName').textContent = entry.intervieweeName;
            document.getElementById('anTooltipDetail').textContent =
                entry.avg.toFixed(1) + '/5 · ' + (entry.ratedCount || 0) + 'q · ' +
                App.LEVEL_LABELS[entry.levelIndex];

            var rect = container.getBoundingClientRect();
            var dotRect = dot.getBoundingClientRect();
            var tipX = dotRect.left - rect.left + dotRect.width / 2;
            var tipY = dotRect.top - rect.top - 8;
            tooltipEl.style.left = tipX + 'px';
            tooltipEl.style.top = tipY + 'px';
            tooltipEl.style.transform = 'translate(-50%, -100%)';
            tooltipEl.classList.add('is-visible');
        });

        container.addEventListener('mouseleave', function () {
            tooltipEl.classList.remove('is-visible');
        });
    }

    function renderTopicHeatmap(history) {
        var container = document.getElementById('anHeatmap');
        var topicAgg = {};

        history.forEach(function (h) {
            (h.topics || []).forEach(function (t) {
                if (!topicAgg[t.topic]) topicAgg[t.topic] = { total: 0, count: 0, sessions: 0 };
                topicAgg[t.topic].total += t.avg * t.count;
                topicAgg[t.topic].count += t.count;
                topicAgg[t.topic].sessions++;
            });
        });

        var keys = Object.keys(topicAgg);
        if (keys.length === 0) {
            container.innerHTML = '<div style="text-align:center;padding:32px 0;color:var(--color-gray-500);font-size:13px;">No topic data available</div>';
            return;
        }

        keys.sort(function (a, b) {
            var avgA = topicAgg[a].total / topicAgg[a].count;
            var avgB = topicAgg[b].total / topicAgg[b].count;
            return avgB - avgA;
        });

        var html = '';
        keys.forEach(function (key) {
            var t = topicAgg[key];
            var avg = t.total / t.count;
            var pct = Math.round((avg / 5) * 100);
            var levelIdx = App.getLevelIndex(avg);
            var color = App.LEVEL_COLORS[levelIdx];
            var label = App.TOPIC_LABELS[key] || key;

            html += '<div class="analytics__heat-row">';
            html += '<span class="analytics__heat-label">' + escapeHtml(label) + '</span>';
            html += '<div class="analytics__heat-bar-track">';
            html += '<div class="analytics__heat-bar-fill" style="width:' + pct + '%;background:' + color + '"></div>';
            html += '<span class="analytics__heat-bar-value">' + avg.toFixed(1) + '</span>';
            html += '</div>';
            html += '<span class="analytics__heat-count">' + t.count + 'q</span>';
            html += '</div>';
        });

        container.innerHTML = html;
    }

    function renderLevelDistribution(history) {
        var container = document.getElementById('anLevels');
        var counts = [0, 0, 0, 0, 0, 0];

        history.forEach(function (h) {
            if (h.levelIndex >= 0 && h.levelIndex < 6) {
                counts[h.levelIndex]++;
            }
        });

        var max = Math.max.apply(null, counts) || 1;
        var html = '';

        for (var i = 0; i < 6; i++) {
            var pct = Math.round((counts[i] / max) * 100);
            var color = App.LEVEL_COLORS[i];
            var label = App.LEVEL_LABELS[i];

            html += '<div class="analytics__level-col">';
            html += '<div class="analytics__level-bar-wrap">';
            html += '<div class="analytics__level-bar" style="height:' + pct + '%;background:' + color + '">';
            html += '<span class="analytics__level-bar-count">' + counts[i] + '</span>';
            html += '</div>';
            html += '</div>';
            html += '<span class="analytics__level-label">' + escapeHtml(label) + '</span>';
            html += '</div>';
        }

        container.innerHTML = html;
    }

    function renderInterviewerStats(history) {
        var container = document.getElementById('anInterviewers');
        var interviewers = {};

        history.forEach(function (h) {
            var name = h.interviewerName || 'Unknown';
            if (!interviewers[name]) interviewers[name] = { total: 0, count: 0, questions: 0 };
            interviewers[name].total += h.avg;
            interviewers[name].count++;
            interviewers[name].questions += h.ratedCount || 0;
        });

        var keys = Object.keys(interviewers);
        if (keys.length === 0) {
            container.innerHTML = '<div style="text-align:center;padding:32px 0;color:var(--color-gray-500);font-size:13px;">No interviewer data</div>';
            return;
        }

        keys.sort(function (a, b) {
            return interviewers[b].count - interviewers[a].count;
        });

        var html = '';
        keys.forEach(function (name) {
            var stats = interviewers[name];
            var avg = (stats.total / stats.count).toFixed(1);
            var levelIdx = App.getLevelIndex(stats.total / stats.count);
            var color = App.LEVEL_COLORS[levelIdx];

            html += '<div class="analytics__interviewer-row">';
            html += '<span class="analytics__interviewer-name">' + escapeHtml(name) + '</span>';
            html += '<div class="analytics__interviewer-stats">';
            html += '<div class="analytics__interviewer-stat">';
            html += '<div class="analytics__interviewer-stat-val">' + stats.count + '</div>';
            html += '<div class="analytics__interviewer-stat-label">Interviews</div></div>';
            html += '<div class="analytics__interviewer-stat">';
            html += '<div class="analytics__interviewer-stat-val" style="color:' + color + '">' + avg + '</div>';
            html += '<div class="analytics__interviewer-stat-label">Avg Score</div></div>';
            html += '<div class="analytics__interviewer-stat">';
            html += '<div class="analytics__interviewer-stat-val">' + stats.questions + '</div>';
            html += '<div class="analytics__interviewer-stat-label">Questions</div></div>';
            html += '<div class="analytics__interviewer-stat">';
            html += '<div class="analytics__interviewer-stat-val">' + Math.round(stats.questions / stats.count) + '</div>';
            html += '<div class="analytics__interviewer-stat-label">Q/Interview</div></div>';
            html += '</div></div>';
        });

        container.innerHTML = html;
    }

    function renderDashboard(range) {
        if (range !== undefined) currentRange = range;
        var allHistory = loadHistory();
        var history = filterByRange(allHistory, currentRange);
        var content = document.getElementById('anContent');
        var empty = document.getElementById('anEmpty');
        var filters = document.getElementById('anFilters');

        if (allHistory.length === 0) {
            content.style.display = 'none';
            filters.style.display = 'none';
            empty.style.display = '';
            return;
        }

        filters.style.display = '';
        content.style.display = '';
        empty.style.display = 'none';

        if (history.length === 0) {
            content.innerHTML = '<div style="text-align:center;padding:60px 0;color:var(--color-gray-500);font-size:14px;">No interviews in this time period.</div>';
            return;
        }

        // Restore content sections if they were replaced by "no data" message
        restoreContentSections(content);

        renderSummary(history);
        renderTrendChart(history);
        renderTopicHeatmap(history);
        renderLevelDistribution(history);
        renderInterviewerStats(history);
    }

    function restoreContentSections(content) {
        // If content was replaced with a "no data" message, restore the original sections
        if (!document.getElementById('anSumInterviews')) {
            content.innerHTML =
                '<div class="analytics__summary">' +
                    '<div class="analytics__stat"><div class="analytics__stat-value" id="anSumInterviews">0</div><div class="analytics__stat-label">Interviews</div></div>' +
                    '<div class="analytics__stat"><div class="analytics__stat-value" id="anSumQuestions">0</div><div class="analytics__stat-label">Questions Asked</div></div>' +
                    '<div class="analytics__stat"><div class="analytics__stat-value" id="anSumAvg">\u2014</div><div class="analytics__stat-label">Avg Score</div></div>' +
                    '<div class="analytics__stat"><div class="analytics__stat-value" id="anSumTopics">0</div><div class="analytics__stat-label">Topics Covered</div></div>' +
                '</div>' +
                '<div class="analytics__card"><div class="analytics__card-title"><span class="analytics__card-icon">\ud83d\udcc8</span> Score Trend</div><div class="analytics__trend" id="anTrend"></div></div>' +
                '<div class="analytics__card"><div class="analytics__card-title"><span class="analytics__card-icon">\ud83c\udfaf</span> Topic Performance</div><div class="analytics__heatmap" id="anHeatmap"></div></div>' +
                '<div class="analytics__card"><div class="analytics__card-title"><span class="analytics__card-icon">\ud83d\udcca</span> Assessment Distribution</div><div class="analytics__levels" id="anLevels"></div></div>' +
                '<div class="analytics__card"><div class="analytics__card-title"><span class="analytics__card-icon">\ud83d\udc64</span> Interviewer Stats</div><div class="analytics__interviewers" id="anInterviewers"></div></div>' +
                '<div class="analytics__card"><div class="analytics__card-title"><span class="analytics__card-icon">\ud83c\udfc6</span> Achievements</div><div class="achievements__grid" id="achievementsGrid"></div></div>';
        }
    }

    // Back
    document.getElementById('anBack').addEventListener('click', function () {
        App.showScreen('screen-setup');
    });

    // Open analytics from setup
    document.getElementById('btnAnalytics').addEventListener('click', function () {
        renderDashboard();
        App.showScreen('screen-analytics');
    });

    // Time filter pills
    document.getElementById('anFilters').addEventListener('click', function (e) {
        var pill = e.target.closest('.analytics__filter-pill');
        if (!pill) return;
        var range = pill.dataset.range;
        var pills = document.querySelectorAll('.analytics__filter-pill');
        pills.forEach(function (p) { p.classList.remove('is-active'); });
        pill.classList.add('is-active');
        renderDashboard(range);
    });

    // Escape goes back
    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        var screen = document.getElementById('screen-analytics');
        if (screen && screen.classList.contains('is-active')) {
            App.showScreen('screen-setup');
        }
    });

})(InterviewApp);
