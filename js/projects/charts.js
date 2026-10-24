(function () {
    'use strict';

    var PJ = window.PJ;
    var esc = PJ.esc;
    var DAY_MS = PJ.DAY_MS;
    var MONTHS = PJ.MONTHS;
    var WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    var gradientSeq = 0;

    /* ============================================
       SPARKLINE — weekly commits as a soft area
       ============================================ */
    function sparkline(weekly, options) {
        var opts = options || {};
        var width = opts.width || 120;
        var height = opts.height || 32;
        var points = weekly.slice(-(opts.weeks || 26));
        var label = opts.label || 'Weekly commits';
        if (!points.length || PJ.sum(points) === 0) {
            return '<svg class="pj-spark pj-spark--flat" viewBox="0 0 ' + width + ' ' + height + '" width="' + width + '" height="' + height + '" role="img" aria-label="' + esc(label) + ': none"><line x1="0" y1="' + (height - 1.5) + '" x2="' + width + '" y2="' + (height - 1.5) + '"/></svg>';
        }
        var max = Math.max.apply(null, points);
        var step = width / Math.max(points.length - 1, 1);
        var coords = points.map(function (value, index) {
            var x = index * step;
            var y = height - 2 - (value / max) * (height - 5);
            return [Number(x.toFixed(1)), Number(y.toFixed(1))];
        });
        var line = coords.map(function (c, i) { return (i ? 'L' : 'M') + c[0] + ' ' + c[1]; }).join(' ');
        var area = line + ' L' + width + ' ' + height + ' L0 ' + height + ' Z';
        var id = 'pjSpark' + (gradientSeq += 1);
        var last = coords[coords.length - 1];
        return '<svg class="pj-spark" viewBox="0 0 ' + width + ' ' + height + '" width="' + width + '" height="' + height + '" preserveAspectRatio="none" role="img" aria-label="' + esc(label) + ', peak ' + max + ' a week">' +
            '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="pj-spark__stop-top"/><stop offset="1" class="pj-spark__stop-bottom"/></linearGradient></defs>' +
            '<path class="pj-spark__area" d="' + area + '" fill="url(#' + id + ')"/>' +
            '<path class="pj-spark__line" d="' + line + '"/>' +
            '<circle class="pj-spark__dot" cx="' + last[0] + '" cy="' + last[1] + '" r="2.2"/>' +
            '</svg>';
    }

    /* ============================================
       LANGUAGE BAR
       ============================================ */
    function langBar(languages, limit) {
        var shown = languages.slice(0, limit || 5).filter(function (l) { return l.share >= 0.01; });
        return shown.map(function (l) {
            var pct = (l.share * 100).toFixed(1);
            return '<span class="pj-langbar__seg" data-tip="' + esc(l.name + ' · ' + pct + '%') + '" data-css="flex-grow:' + l.share.toFixed(4) + ';background:' + esc(l.color || '#8b949e') + '"></span>';
        }).join('');
    }

    /* ============================================
       CALENDAR — 52 weeks × 7 days
       ============================================ */
    function addDays(isoDate, days) {
        return new Date(Date.parse(isoDate + 'T00:00:00Z') + days * DAY_MS);
    }

    function dayKey(date) {
        return date.toISOString().slice(0, 10);
    }

    function flattenCalendar(calendar, now) {
        var days = [];
        calendar.forEach(function (week) {
            week.days.forEach(function (count, index) {
                var date = addDays(week.start, index);
                if (date.getTime() > now) return;
                days.push({ date: date, count: count });
            });
        });
        return days;
    }

    // Levels split the non-zero days into quartiles, so one huge day cannot flatten the rest of the year.
    function levelThresholds(days) {
        var counts = days.map(function (d) { return d.count; }).filter(Boolean).sort(function (a, b) { return a - b; });
        if (!counts.length) return [1, 1, 1];
        function at(q) { return counts[Math.min(counts.length - 1, Math.floor(q * counts.length))]; }
        return [at(0.25), at(0.5), at(0.75)];
    }

    function levelFor(count, thresholds) {
        if (!count) return 0;
        if (count <= thresholds[0]) return 1;
        if (count <= thresholds[1]) return 2;
        if (count <= thresholds[2]) return 3;
        return 4;
    }

    function describeDay(day) {
        var d = day.date;
        var when = WEEKDAYS[d.getUTCDay()] + ', ' + MONTHS[d.getUTCMonth()] + ' ' + d.getUTCDate();
        return (day.count ? PJ.formatNumber(day.count) + (day.count === 1 ? ' commit' : ' commits') : 'No commits') + ' · ' + when;
    }

    function calendar(container, cal, now) {
        var days = flattenCalendar(cal, now);
        var thresholds = levelThresholds(days);
        var html = '<div class="pj-calendar__months" aria-hidden="true">';
        var lastMonth = -1;
        cal.forEach(function (week, index) {
            var month = addDays(week.start, 0).getUTCMonth();
            if (month !== lastMonth && index < cal.length - 2) {
                html += '<span data-css="grid-column:' + (index + 1) + '">' + MONTHS[month] + '</span>';
                lastMonth = month;
            }
        });
        html += '</div><div class="pj-calendar__body"><div class="pj-calendar__weekdays" aria-hidden="true"><span></span><span>Mon</span><span></span><span>Wed</span><span></span><span>Fri</span><span></span></div><div class="pj-calendar__grid">';
        var byKey = {};
        days.forEach(function (d) { byKey[dayKey(d.date)] = d; });
        cal.forEach(function (week) {
            for (var i = 0; i < 7; i++) {
                var key = dayKey(addDays(week.start, i));
                var day = byKey[key];
                if (!day) {
                    html += '<span class="pj-calendar__cell is-future" aria-hidden="true"></span>';
                } else {
                    html += '<span class="pj-calendar__cell" data-level="' + levelFor(day.count, thresholds) + '" data-tip="' + esc(describeDay(day)) + '"></span>';
                }
            }
        });
        html += '</div></div>';
        container.innerHTML = html;
        PJ.applyCss(container);
        return days;
    }

    function calendarFacts(days) {
        var total = 0;
        var active = 0;
        var longest = 0;
        var run = 0;
        var busiest = null;
        var byWeekday = [0, 0, 0, 0, 0, 0, 0];
        days.forEach(function (day) {
            total += day.count;
            byWeekday[day.date.getUTCDay()] += day.count;
            if (day.count) {
                active += 1;
                run += 1;
                longest = Math.max(longest, run);
                if (!busiest || day.count > busiest.count) busiest = day;
            } else {
                run = 0;
            }
        });
        // The current streak may still be open today, so an empty today does not break it.
        var current = 0;
        for (var i = days.length - 1; i >= 0; i--) {
            if (days[i].count) current += 1;
            else if (i !== days.length - 1) break;
        }
        var topWeekday = byWeekday.indexOf(Math.max.apply(null, byWeekday));
        return {
            total: total,
            active: active,
            longest: longest,
            current: current,
            busiest: busiest,
            weekday: ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'][topWeekday],
        };
    }

    /* ============================================
       WEEKLY BARS — detail drawer activity chart
       ============================================ */
    function weeklyBars(weekly, firstWeekStart) {
        var width = 520;
        var height = 120;
        var gap = 2;
        var count = weekly.length;
        if (!count) return '';
        var barWidth = (width - gap * (count - 1)) / count;
        var max = Math.max.apply(null, weekly.concat([1]));
        var html = '<svg class="pj-bars" viewBox="0 0 ' + width + ' ' + (height + 18) + '" role="img" aria-label="Commits per week over the last year, peak ' + max + '">';
        weekly.forEach(function (value, index) {
            var h = value ? Math.max(3, (value / max) * height) : 1.5;
            var x = index * (barWidth + gap);
            var start = firstWeekStart ? addDays(firstWeekStart, index * 7) : null;
            var tip = PJ.formatNumber(value) + (value === 1 ? ' commit' : ' commits') + (start ? ' · week of ' + MONTHS[start.getUTCMonth()] + ' ' + start.getUTCDate() : '');
            html += '<rect class="pj-bars__bar' + (value ? '' : ' is-empty') + '" x="' + x.toFixed(1) + '" y="' + (height - h).toFixed(1) + '" width="' + barWidth.toFixed(1) + '" height="' + h.toFixed(1) + '" rx="1.5" data-tip="' + esc(tip) + '"/>';
            if (start && start.getUTCDate() <= 7 && index < count - 2) {
                html += '<text class="pj-bars__label" x="' + x.toFixed(1) + '" y="' + (height + 14) + '">' + MONTHS[start.getUTCMonth()] + '</text>';
            }
        });
        return html + '</svg>';
    }

    /* ============================================
       PROGRESS RING
       ============================================ */
    function ring(value, size) {
        var r = (size - 6) / 2;
        var c = 2 * Math.PI * r;
        var dash = (Math.max(0, Math.min(1, value)) * c).toFixed(2);
        return '<svg class="pj-ring" viewBox="0 0 ' + size + ' ' + size + '" width="' + size + '" height="' + size + '" aria-hidden="true">' +
            '<circle class="pj-ring__track" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '"/>' +
            '<circle class="pj-ring__value" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" stroke-dasharray="' + dash + ' ' + c.toFixed(2) + '" transform="rotate(-90 ' + size / 2 + ' ' + size / 2 + ')"/>' +
            '</svg>';
    }

    PJ.charts = {
        sparkline: sparkline,
        langBar: langBar,
        calendar: calendar,
        calendarFacts: calendarFacts,
        weeklyBars: weeklyBars,
        ring: ring,
    };
})();
