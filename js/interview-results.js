(function (App) {
    'use strict';

    var s = App.state;

    App.showResults = function () {
        var dom = App.dom;
        App.stopTimer();
        App.clearSession();

        // Guard: no rated questions
        if (s.ratings.length === 0) {
            document.getElementById('levelEmoji').textContent = '\u{1F937}';
            document.getElementById('levelName').textContent = 'N/A';
            document.getElementById('levelName').style.color = App.LEVEL_COLORS[0];
            document.getElementById('resultsSubtitle').textContent = 'No questions were rated during this interview.';
            dom.resultsInterviewee.textContent = s.intervieweeName + ' \u2014 interviewed by ' + s.interviewerName;
            document.getElementById('statAvg').textContent = '\u2014';
            document.getElementById('statTotal').textContent = '0';
            document.getElementById('statTopics').textContent = '0';
            document.getElementById('breakdownList').innerHTML = '';
            document.getElementById('topicBreakdown').innerHTML = '';
            var ring = document.getElementById('levelRing');
            ring.style.setProperty('--ring-color', App.LEVEL_COLORS[0]);
            ring.style.setProperty('--ring-pct', 0);
            App.showScreen('screen-results');
            return;
        }

        var avg = s.ratings.reduce(function (a, b) { return a + b; }, 0) / s.ratings.length;
        var levelIndex = App.getLevelIndex(avg);

        var uniqueTopics = [];
        s.sessionQuestions.forEach(function (q) {
            if (uniqueTopics.indexOf(q.topic) === -1) uniqueTopics.push(q.topic);
        });

        document.getElementById('levelEmoji').textContent = App.LEVEL_EMOJIS[levelIndex];
        document.getElementById('levelName').textContent = App.LEVEL_LABELS[levelIndex];
        document.getElementById('levelName').style.color = App.LEVEL_COLORS[levelIndex];
        document.getElementById('resultsSubtitle').textContent = App.LEVEL_DESCS[levelIndex];
        dom.resultsInterviewee.textContent = s.intervieweeName + ' \u2014 interviewed by ' + s.interviewerName;
        document.getElementById('statAvg').textContent = avg.toFixed(1);
        document.getElementById('statTotal').textContent = s.ratings.length;
        document.getElementById('statTopics').textContent = uniqueTopics.length;

        var ring = document.getElementById('levelRing');
        var pct = Math.round((avg / 5) * 100);
        ring.style.setProperty('--ring-color', App.LEVEL_COLORS[levelIndex]);
        ring.style.setProperty('--ring-pct', pct);

        // Question breakdown
        var list = document.getElementById('breakdownList');
        list.innerHTML = '';
        s.sessionQuestions.forEach(function (q, i) {
            if (i >= s.ratings.length) return;
            var row = document.createElement('div');
            row.className = 'results__row';

            var starsHtml = '';
            for (var star = 1; star <= 5; star++) {
                var cls = star <= s.ratings[i] ? 'results__row-star--filled' : 'results__row-star--empty';
                starsHtml += '<svg class="results__row-star ' + cls + '" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
            }

            row.innerHTML =
                '<span class="results__row-num">' + (i + 1) + '</span>' +
                '<span class="results__row-q">' + q.question + '</span>' +
                '<span class="results__row-stars">' + starsHtml + '</span>';

            list.appendChild(row);
        });

        // Topic knowledge breakdown
        renderTopicBreakdown();

        App.showScreen('screen-results');
    };

    // ---- Topic knowledge breakdown ----

    function getTopicStats() {
        var topics = {};
        s.sessionQuestions.forEach(function (q, i) {
            if (i >= s.ratings.length) return;
            var key = q.topic;
            if (!topics[key]) topics[key] = { count: 0, total: 0 };
            topics[key].count++;
            topics[key].total += s.ratings[i];
        });
        return topics;
    }

    function renderTopicBreakdown() {
        var container = document.getElementById('topicBreakdown');
        container.innerHTML = '';
        var topics = getTopicStats();
        var keys = Object.keys(topics).sort(function (a, b) {
            return (topics[b].total / topics[b].count) - (topics[a].total / topics[a].count);
        });

        keys.forEach(function (key) {
            var t = topics[key];
            var avg = t.total / t.count;
            var label = App.TOPIC_LABELS[key] || key;
            var levelIdx = App.getLevelIndex(avg);
            var pct = Math.round((avg / 5) * 100);

            var row = document.createElement('div');
            row.className = 'results__topic-row';
            row.innerHTML =
                '<div class="results__topic-info">' +
                    '<span class="results__topic-name">' + label + '</span>' +
                    '<span class="results__topic-meta">' + t.count + 'q \u00B7 ' + avg.toFixed(1) + ' avg \u00B7 ' + App.LEVEL_LABELS[levelIdx] + '</span>' +
                '</div>' +
                '<div class="results__topic-bar">' +
                    '<div class="results__topic-fill" style="width:' + pct + '%;background:' + App.LEVEL_COLORS[levelIdx] + '"></div>' +
                '</div>';
            container.appendChild(row);
        });
    }

    // ---- Download report ----

    App.downloadReport = function () {
        if (!s.ratings.length) return;

        var avg = s.ratings.reduce(function (a, b) { return a + b; }, 0) / s.ratings.length;
        var levelIndex = App.getLevelIndex(avg);
        var date = new Date().toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        });

        function stars(rating) {
            var out = '';
            for (var i = 0; i < 5; i++) out += i < rating ? '\u2605' : '\u2606';
            return out + ' (' + rating + '/5)';
        }

        function pad(str, len) {
            while (str.length < len) str += ' ';
            return str;
        }

        var lines = [];
        lines.push('iOS INTERVIEW REPORT');
        lines.push('================================================');
        lines.push('');
        lines.push(pad('Date:', 18) + date);
        lines.push(pad('Interviewer:', 18) + s.interviewerName);
        lines.push(pad('Candidate:', 18) + s.intervieweeName);
        lines.push('');
        lines.push(pad('Assessment:', 18) + App.LEVEL_LABELS[levelIndex] + ' ' + App.LEVEL_EMOJIS[levelIndex]);
        lines.push(pad('Average Rating:', 18) + avg.toFixed(1) + ' / 5.0');
        lines.push(pad('Questions:', 18) + s.ratings.length);

        var uniqueTopics = [];
        s.sessionQuestions.forEach(function (q) {
            if (uniqueTopics.indexOf(q.topic) === -1) uniqueTopics.push(q.topic);
        });
        lines.push(pad('Topics Covered:', 18) + uniqueTopics.length);
        lines.push('');

        // Topic knowledge summary
        lines.push('================================================');
        lines.push('TOPIC KNOWLEDGE');
        lines.push('================================================');
        lines.push('');

        var topicStats = getTopicStats();
        var sortedKeys = Object.keys(topicStats).sort(function (a, b) {
            return (topicStats[b].total / topicStats[b].count) - (topicStats[a].total / topicStats[a].count);
        });

        sortedKeys.forEach(function (key) {
            var t = topicStats[key];
            var tAvg = t.total / t.count;
            var label = App.TOPIC_LABELS[key] || key;
            var lvl = App.LEVEL_LABELS[App.getLevelIndex(tAvg)];
            lines.push('  ' + pad(label + ':', 26) + pad(lvl, 10) + tAvg.toFixed(1) + '/5  (' + t.count + ' question' + (t.count > 1 ? 's' : '') + ')');
        });
        lines.push('');

        // Question breakdown
        lines.push('================================================');
        lines.push('QUESTION BREAKDOWN');
        lines.push('================================================');
        lines.push('');

        s.sessionQuestions.forEach(function (q, i) {
            if (i >= s.ratings.length) return;
            var topicLabel = App.TOPIC_LABELS[q.topic] || q.topic;
            var levelLabel = App.LEVEL_LABELS[q.level];
            lines.push('#' + (i + 1) + '  ' + topicLabel + ' | ' + levelLabel + ' | ' + stars(s.ratings[i]));
            lines.push('    ' + q.question);
            if (q.code) {
                lines.push('');
                lines.push('    Code:');
                q.code.split('\n').forEach(function (line) {
                    lines.push('        ' + line);
                });
            }
            lines.push('');
        });

        lines.push('================================================');
        lines.push('Generated by iOS Interview Practice');
        lines.push('https://khizanag.github.io/interview');

        var text = lines.join('\n');
        var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        var safeName = s.intervieweeName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
        var dateStr = new Date().toISOString().slice(0, 10);
        a.download = 'interview-' + safeName + '-' + dateStr + '.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

})(InterviewApp);
