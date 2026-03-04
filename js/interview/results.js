(function (App) {
    'use strict';

    var s = App.state;

    function formatDuration(seconds) {
        if (!seconds || seconds <= 0) return '\u2014';
        var m = Math.floor(seconds / 60);
        var ss = seconds % 60;
        if (m > 0) return m + ':' + (ss < 10 ? '0' : '') + ss;
        return ss + 's';
    }

    function getTimeStats() {
        var times = [];
        s.sessionQuestions.forEach(function (q, i) {
            if (i >= s.ratings.length || q.skipped) return;
            if (q._timeSpent && q._timeSpent > 0) times.push(q._timeSpent);
        });
        if (times.length === 0) return { avgTime: 0, totalTime: 0, fastest: 0, slowest: 0 };
        var total = times.reduce(function (a, b) { return a + b; }, 0);
        return {
            avgTime: Math.round(total / times.length),
            totalTime: total,
            fastest: Math.min.apply(null, times),
            slowest: Math.max.apply(null, times),
        };
    }

    function getRecommendation(avg, ratedCount) {
        var label, color;
        if (avg >= 4.5) { label = 'Strong Hire'; color = '#30d158'; }
        else if (avg >= 3.5) { label = 'Hire'; color = '#5ac8fa'; }
        else if (avg >= 2.5) { label = 'Lean Hire'; color = '#ff9f0a'; }
        else { label = 'No Hire'; color = '#ff375f'; }

        var confidence;
        if (ratedCount < 5) confidence = 'Low confidence';
        else if (ratedCount <= 10) confidence = 'Moderate confidence';
        else confidence = 'High confidence';

        return { label: label, color: color, confidence: confidence };
    }

    function getStrengthsWeaknesses(topicStats) {
        var keys = Object.keys(topicStats);
        var sorted = keys.map(function (k) {
            var t = topicStats[k];
            return { key: k, avg: t.total / t.count, count: t.count };
        }).sort(function (a, b) { return b.avg - a.avg; });

        var strengths = sorted.slice(0, 3).filter(function (t) { return t.avg >= 3.0; });
        var weaknesses = sorted.slice().reverse().slice(0, 3).filter(function (t) { return t.avg < 3.5; });

        return { strengths: strengths, weaknesses: weaknesses };
    }

    function getPreviousInterview(name) {
        if (!name) return null;
        var history = App.loadLocalHistory();
        var lower = name.toLowerCase();
        for (var i = 0; i < history.length; i++) {
            if (history[i].intervieweeName && history[i].intervieweeName.toLowerCase() === lower) {
                return history[i];
            }
        }
        return null;
    }

    function deltaHtml(current, previous) {
        if (previous === null || previous === undefined) return '';
        var diff = current - previous;
        if (Math.abs(diff) < 0.05) return '<span class="results__delta results__delta--same">\u2014</span>';
        if (diff > 0) return '<span class="results__delta results__delta--up">\u25B2 ' + diff.toFixed(1) + '</span>';
        return '<span class="results__delta results__delta--down">\u25BC ' + Math.abs(diff).toFixed(1) + '</span>';
    }

    App.showResults = function () {
        var dom = App.dom;
        App.stopTimer();
        if (App._stopQuestionTimer) App._stopQuestionTimer();
        App.clearSession();

        // Reset XP summary
        var xpSummary = document.getElementById('resultsXpSummary');
        if (xpSummary) xpSummary.style.display = 'none';

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
            // Notes even with no rated questions
            var introNE = document.getElementById('resultsIntroNotes');
            var wrapupNE = document.getElementById('resultsWrapupNotes');
            introNE.style.display = s.introNotes ? '' : 'none';
            if (s.introNotes) document.getElementById('resultsIntroText').textContent = s.introNotes;
            wrapupNE.style.display = s.wrapupNotes ? '' : 'none';
            if (s.wrapupNotes) document.getElementById('resultsWrapupText').textContent = s.wrapupNotes;
            App.showScreen('screen-results');
            return;
        }

        // Calculate averages excluding skipped questions
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

        var uniqueTopics = [];
        s.sessionQuestions.forEach(function (q) {
            if (uniqueTopics.indexOf(q.topic) === -1) uniqueTopics.push(q.topic);
        });

        document.getElementById('levelEmoji').textContent = App.LEVEL_EMOJIS[levelIndex];
        document.getElementById('levelName').textContent = App.LEVEL_LABELS[levelIndex];
        document.getElementById('levelName').style.color = App.LEVEL_COLORS[levelIndex];
        document.getElementById('resultsSubtitle').textContent = App.LEVEL_DESCS[levelIndex];
        dom.resultsInterviewee.textContent = s.intervieweeName + ' \u2014 interviewed by ' + s.interviewerName;
        document.getElementById('statAvg').textContent = ratedCount > 0 ? avg.toFixed(1) : '\u2014';
        document.getElementById('statTotal').textContent = ratedCount + (skippedCount > 0 ? ' (' + skippedCount + ' skipped)' : '');
        document.getElementById('statTopics').textContent = uniqueTopics.length;

        // Performance delta vs previous interview
        var prevInterview = getPreviousInterview(s.intervieweeName);
        if (prevInterview && prevInterview.avg !== undefined) {
            var statAvgEl = document.getElementById('statAvg');
            if (statAvgEl) statAvgEl.insertAdjacentHTML('afterend', deltaHtml(avg, prevInterview.avg));
        }

        // Time stats
        var timeStats = getTimeStats();
        var statTimeEl = document.getElementById('statAvgTime');
        if (statTimeEl) {
            statTimeEl.textContent = timeStats.avgTime > 0 ? formatDuration(timeStats.avgTime) : '\u2014';
        }

        var ring = document.getElementById('levelRing');
        var pct = Math.round((avg / 5) * 100);
        ring.style.setProperty('--ring-color', App.LEVEL_COLORS[levelIndex]);
        ring.style.setProperty('--ring-pct', pct);

        // Hiring recommendation
        var rec = getRecommendation(avg, ratedCount);
        var recEl = document.getElementById('resultsRecommendation');
        var recBadge = document.getElementById('recBadge');
        var recConf = document.getElementById('recConfidence');
        if (recEl && recBadge) {
            recEl.style.display = '';
            recBadge.textContent = rec.label;
            recBadge.style.background = rec.color;
            recConf.textContent = rec.confidence + ' (' + ratedCount + ' rated)';
        }

        // Strengths / Weaknesses
        var topicStatsForSW = getTopicStats();
        var sw = getStrengthsWeaknesses(topicStatsForSW);
        var swEl = document.getElementById('resultsStrengths');
        var strList = document.getElementById('strengthsList');
        var weakList = document.getElementById('weaknessesList');
        if (swEl && (sw.strengths.length > 0 || sw.weaknesses.length > 0)) {
            swEl.style.display = '';
            strList.innerHTML = '';
            weakList.innerHTML = '';
            sw.strengths.forEach(function (t) {
                var li = document.createElement('li');
                li.textContent = (App.TOPIC_LABELS[t.key] || t.key) + ' (' + t.avg.toFixed(1) + ')';
                strList.appendChild(li);
            });
            if (sw.strengths.length === 0) strList.innerHTML = '<li class="results__strengths-empty">No clear strengths yet</li>';
            sw.weaknesses.forEach(function (t) {
                var li = document.createElement('li');
                li.textContent = (App.TOPIC_LABELS[t.key] || t.key) + ' (' + t.avg.toFixed(1) + ')';
                weakList.appendChild(li);
            });
            if (sw.weaknesses.length === 0) weakList.innerHTML = '<li class="results__strengths-empty">No weak areas identified</li>';
        } else if (swEl) {
            swEl.style.display = 'none';
        }

        // Question breakdown
        var list = document.getElementById('breakdownList');
        list.innerHTML = '';
        s.sessionQuestions.forEach(function (q, i) {
            if (i >= s.ratings.length) return;
            var row = document.createElement('div');
            row.className = 'results__row' + (q.skipped ? ' results__row--skipped' : '');

            var esc = App.escapeHtml;
            var timeHtml = q._timeSpent ? '<span class="results__row-time">' + formatDuration(q._timeSpent) + '</span>' : '';

            if (q.skipped) {
                row.innerHTML =
                    '<span class="results__row-num">' + (i + 1) + '</span>' +
                    '<span class="results__row-q">' + esc(q.question) + '</span>' +
                    timeHtml +
                    '<span class="results__row-badge">Skipped</span>';
            } else {
                var starsHtml = '';
                for (var star = 1; star <= 5; star++) {
                    var cls = star <= s.ratings[i] ? 'results__row-star--filled' : 'results__row-star--empty';
                    starsHtml += '<svg class="results__row-star ' + cls + '" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
                }
                row.innerHTML =
                    '<span class="results__row-num">' + (i + 1) + '</span>' +
                    '<span class="results__row-q">' + esc(q.question) + '</span>' +
                    timeHtml +
                    '<span class="results__row-stars">' + starsHtml + '</span>';
            }

            if (q.notes && q.notes.trim()) {
                var noteEl = document.createElement('p');
                noteEl.className = 'results__row-notes';
                noteEl.textContent = q.notes;
                row.appendChild(noteEl);
            }

            list.appendChild(row);
        });

        // Display notes if present
        var introNotesEl = document.getElementById('resultsIntroNotes');
        var wrapupNotesEl = document.getElementById('resultsWrapupNotes');
        if (s.introNotes) {
            introNotesEl.style.display = '';
            document.getElementById('resultsIntroText').textContent = s.introNotes;
        } else {
            introNotesEl.style.display = 'none';
        }
        if (s.wrapupNotes) {
            wrapupNotesEl.style.display = '';
            document.getElementById('resultsWrapupText').textContent = s.wrapupNotes;
        } else {
            wrapupNotesEl.style.display = 'none';
        }

        // Topic knowledge breakdown
        renderTopicBreakdown();

        // Save to history
        App.saveToHistory();

        // Award XP (gamification)
        if (App.awardInterviewXP) App.awardInterviewXP();

        // Push results to live session participants
        if (App.isLiveSession && App.isLiveSession() && App.isLiveHost && App.isLiveHost()) {
            var liveQuestions = s.sessionQuestions.map(function (q, i) {
                return {
                    question: q.question,
                    topic: q.topic,
                    level: q.level,
                    skipped: q.skipped || false,
                    rating: i < s.ratings.length ? s.ratings[i] : 0,
                    notes: q.notes || '',
                    _timeSpent: q._timeSpent || 0,
                };
            });
            var topicStats = getTopicStats();
            FirebaseService.setLiveResults(App.live.code, {
                avg: avg,
                levelIndex: levelIndex,
                ratedCount: ratedCount,
                skippedCount: skippedCount,
                questions: liveQuestions,
                topicStats: topicStats,
                notes: {
                    intro: s.introNotes || '',
                    wrapup: s.wrapupNotes || '',
                },
            });
        }

        App.showScreen('screen-results');
    };

    // ---- Topic knowledge breakdown ----

    function getTopicStats() {
        var topics = {};
        s.sessionQuestions.forEach(function (q, i) {
            if (i >= s.ratings.length || q.skipped) return;
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

        // Build previous topic map for delta
        var prevTopicMap = {};
        var prev = getPreviousInterview(s.intervieweeName);
        if (prev && prev.topics) {
            // Reconstruct topic stats from previous history if available
            var prevHistory = App.loadLocalHistory();
            var lower = s.intervieweeName.toLowerCase();
            for (var hi = 0; hi < prevHistory.length; hi++) {
                if (prevHistory[hi].intervieweeName && prevHistory[hi].intervieweeName.toLowerCase() === lower && prevHistory[hi].topicStats) {
                    var pts = prevHistory[hi].topicStats;
                    Object.keys(pts).forEach(function (k) {
                        prevTopicMap[k] = pts[k].total / pts[k].count;
                    });
                    break;
                }
            }
        }

        var esc = App.escapeHtml;
        keys.forEach(function (key) {
            var t = topics[key];
            var avg = t.total / t.count;
            var label = App.TOPIC_LABELS[key] || key;
            var levelIdx = App.getLevelIndex(avg);
            var pct = Math.round((avg / 5) * 100);
            var topicDelta = prevTopicMap[key] !== undefined ? deltaHtml(avg, prevTopicMap[key]) : '';

            var row = document.createElement('div');
            row.className = 'results__topic-row';
            row.innerHTML =
                '<div class="results__topic-info">' +
                    '<span class="results__topic-name">' + esc(label) + '</span>' +
                    '<span class="results__topic-meta">' + t.count + 'q \u00B7 ' + avg.toFixed(1) + ' avg \u00B7 ' + esc(App.LEVEL_LABELS[levelIdx]) + topicDelta + '</span>' +
                '</div>' +
                '<div class="results__topic-bar">' +
                    '<div class="results__topic-fill" style="width:' + pct + '%;background:' + App.LEVEL_COLORS[levelIdx] + '"></div>' +
                '</div>';
            container.appendChild(row);
        });
    }

    // ---- Copy summary to clipboard ----

    App.copyResultsSummary = function () {
        if (!s.ratings.length) return;

        var ratedSum = 0, ratedCount = 0, skippedCount = 0;
        s.sessionQuestions.forEach(function (q, i) {
            if (i >= s.ratings.length) return;
            if (q.skipped) { skippedCount++; return; }
            ratedSum += s.ratings[i];
            ratedCount++;
        });
        var avg = ratedCount > 0 ? ratedSum / ratedCount : 0;
        var levelIndex = App.getLevelIndex(avg);
        var rec = getRecommendation(avg, ratedCount);
        var topicStats = getTopicStats();
        var sw = getStrengthsWeaknesses(topicStats);

        var lines = [];
        lines.push('**' + s.intervieweeName + '** \u2014 ' + App.LEVEL_LABELS[levelIndex] + ' ' + App.LEVEL_EMOJIS[levelIndex]);
        lines.push('Rating: ' + avg.toFixed(1) + '/5 | ' + ratedCount + ' questions | ' + rec.label + ' (' + rec.confidence + ')');
        if (sw.strengths.length > 0) {
            lines.push('Strengths: ' + sw.strengths.map(function (t) { return (App.TOPIC_LABELS[t.key] || t.key) + ' (' + t.avg.toFixed(1) + ')'; }).join(', '));
        }
        if (sw.weaknesses.length > 0) {
            lines.push('Weak areas: ' + sw.weaknesses.map(function (t) { return (App.TOPIC_LABELS[t.key] || t.key) + ' (' + t.avg.toFixed(1) + ')'; }).join(', '));
        }

        var text = lines.join('\n');
        var btn = document.getElementById('btnCopySummary');
        navigator.clipboard.writeText(text).then(function () {
            btn.classList.add('is-copied');
            var origHTML = btn.innerHTML;
            btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
            setTimeout(function () {
                btn.classList.remove('is-copied');
                btn.innerHTML = origHTML;
            }, 2000);
        });
    };

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

        var ratedCount = 0;
        s.sessionQuestions.forEach(function (q, i) {
            if (i < s.ratings.length && !q.skipped) ratedCount++;
        });
        var dlRec = getRecommendation(avg, ratedCount);
        lines.push(pad('Recommendation:', 18) + dlRec.label + ' (' + dlRec.confidence + ')');
        lines.push(pad('Questions:', 18) + s.ratings.length);

        var uniqueTopics = [];
        s.sessionQuestions.forEach(function (q) {
            if (uniqueTopics.indexOf(q.topic) === -1) uniqueTopics.push(q.topic);
        });
        lines.push(pad('Topics Covered:', 18) + uniqueTopics.length);
        lines.push('');

        // Introduction notes
        if (s.introNotes) {
            lines.push('================================================');
            lines.push('INTRODUCTION NOTES');
            lines.push('================================================');
            lines.push('');
            s.introNotes.split('\n').forEach(function (line) {
                lines.push('  ' + line);
            });
            lines.push('');
        }

        // Wrap-up notes
        if (s.wrapupNotes) {
            lines.push('================================================');
            lines.push('WRAP-UP NOTES');
            lines.push('================================================');
            lines.push('');
            s.wrapupNotes.split('\n').forEach(function (line) {
                lines.push('  ' + line);
            });
            lines.push('');
        }

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
            var ratingStr = q.skipped ? 'SKIPPED' : stars(s.ratings[i]);
            var timeStr = q._timeSpent ? ' | ' + formatDuration(q._timeSpent) : '';
            lines.push('#' + (i + 1) + '  ' + topicLabel + ' | ' + levelLabel + ' | ' + ratingStr + timeStr);
            lines.push('    ' + q.question);
            if (q.code) {
                lines.push('');
                lines.push('    Code:');
                q.code.split('\n').forEach(function (line) {
                    lines.push('        ' + line);
                });
            }
            if (q.notes && q.notes.trim()) {
                lines.push('    Notes: ' + q.notes.trim());
            }
            lines.push('');
        });

        lines.push('================================================');
        lines.push('Generated by Interview Tool');
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
