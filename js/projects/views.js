(function () {
    'use strict';

    var PJ = window.PJ;
    var esc = PJ.esc;
    var charts = PJ.charts;

    var ICONS = {
        github: '<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>',
        lock: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>',
        laptop: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>',
        tag: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><circle cx="7" cy="7" r="1.5"/></svg>',
        star: '<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>',
        arrow: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>',
    };

    /* ============================================
       SHARED FRAGMENTS
       ============================================ */
    function statusPill(project) {
        return '<span class="pj-status" data-status="' + project.status + '">' +
            '<span class="pj-status__dot' + (project.isLive ? ' is-live' : '') + '" aria-hidden="true"></span>' +
            PJ.STATUSES[project.status].label + '</span>';
    }

    function progressBar(project) {
        if (!project.progress) return '';
        var value = Math.max(0, Math.min(1, project.progress.value || 0));
        return '<div class="pj-progress">' +
            '<div class="pj-progress__head"><span>' + esc(project.progress.label) + '</span><span>' + Math.round(value * 100) + '%</span></div>' +
            '<div class="pj-progress__track" role="progressbar" aria-label="' + esc(project.name + ' progress') + '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + Math.round(value * 100) + '"><span class="pj-progress__fill" data-css="--value:' + value.toFixed(3) + '"></span></div>' +
            '</div>';
    }

    function repoBadge(project) {
        if (project.publicRepos.length === 1) {
            var repo = project.publicRepos[0];
            return '<a class="pj-card__repo" href="' + esc(repo.url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(project.name + ' on GitHub') + '" data-tip="' + esc('github.com/Khizanag/' + repo.name) + '">' + ICONS.github + '</a>';
        }
        if (project.publicRepos.length > 1) {
            return '<span class="pj-card__repo is-static" data-tip="' + esc(project.publicRepos.length + ' public repositories') + '">' + ICONS.github + project.publicRepos.length + '</span>';
        }
        if (project.isLocalOnly) {
            return '<span class="pj-card__repo is-static" data-tip="Not on GitHub yet">' + ICONS.laptop + '<span class="pj-visually-hidden">Local only</span></span>';
        }
        return '<span class="pj-card__repo is-static" data-tip="Private repository">' + ICONS.lock + '<span class="pj-visually-hidden">Private</span></span>';
    }

    function metaLine(project, now) {
        var parts = [];
        if (project.latestTag) parts.push('<span class="pj-meta__item" data-tip="Latest release">' + ICONS.tag + esc(project.latestTag) + '</span>');
        if (project.stars) parts.push('<span class="pj-meta__item" data-tip="GitHub stars">' + ICONS.star + project.stars + '</span>');
        if (project.lastCommitAt) parts.push('<span class="pj-meta__item" data-tip="' + esc('Last commit ' + PJ.formatDate(project.lastCommitAt)) + '">' + esc(PJ.relativeTime(project.lastCommitAt, now)) + '</span>');
        return parts.join('');
    }

    /* ============================================
       CARD
       ============================================ */
    function card(project, now, options) {
        var opts = options || {};
        var classes = ['pj-card'];
        if (opts.featured) classes.push('pj-card--featured');
        if (opts.compact) classes.push('pj-card--compact');
        if (project.status === 'archived' || project.category === 'coursework') classes.push('is-dim');

        var activity = project.repos.length
            ? '<div class="pj-card__activity">' + charts.sparkline(project.weekly, { width: opts.featured ? 220 : 120, height: opts.featured ? 40 : 30, weeks: 52, label: project.name + ' weekly commits, last 12 months' }) +
              '<span class="pj-card__activity-count"><strong>' + PJ.formatNumber(project.commitsLastYear) + '</strong> commits / yr</span></div>'
            : '';

        var platforms = project.platforms.slice(0, opts.compact ? 2 : 4).map(function (p) {
            return '<span class="pj-chip-sm">' + esc(p) + '</span>';
        }).join('');

        return '<article class="' + classes.join(' ') + '" data-id="' + esc(project.id) + '" data-status="' + project.status + '">' +
            '<div class="pj-card__glow" aria-hidden="true"></div>' +
            '<div class="pj-card__top">' + statusPill(project) + '<span class="pj-card__kind">' + PJ.CATEGORIES[project.category].label + '</span>' + repoBadge(project) + '</div>' +
            '<h3 class="pj-card__title"><button type="button" class="pj-card__open" data-open="' + esc(project.id) + '">' + esc(project.name) + '</button></h3>' +
            '<p class="pj-card__tagline">' + esc(project.tagline) + '</p>' +
            (opts.featured && project.description ? '<p class="pj-card__desc">' + esc(project.description) + '</p>' : '') +
            (opts.compact ? '' : progressBar(project)) +
            (opts.compact ? '' : activity) +
            (project.languages.length && !opts.compact ? '<div class="pj-langbar" aria-hidden="true">' + charts.langBar(project.languages) + '</div>' : '') +
            '<div class="pj-card__foot"><div class="pj-card__platforms">' + platforms + '</div><div class="pj-meta">' + metaLine(project, now) + '</div></div>' +
            '</article>';
    }

    /* ============================================
       GRID — featured, everything else, archive
       ============================================ */
    function isShelved(project) {
        return project.status === 'archived' || project.category === 'coursework';
    }

    function grid(projects, now, grouped) {
        if (!grouped) {
            return '<div class="pj-grid">' + projects.map(function (p) { return card(p, now); }).join('') + '</div>';
        }
        var featured = projects.filter(function (p) { return p.featured && !isShelved(p); });
        var rest = projects.filter(function (p) { return !p.featured && !isShelved(p); });
        var shelved = projects.filter(isShelved);
        var html = '';
        if (featured.length) {
            html += '<h3 class="pj-group-title"><span>Featured</span><span class="pj-group-title__count">' + featured.length + '</span></h3>' +
                '<div class="pj-grid pj-grid--featured">' + featured.map(function (p) { return card(p, now, { featured: true }); }).join('') + '</div>';
        }
        if (rest.length) {
            html += '<h3 class="pj-group-title"><span>Everything else</span><span class="pj-group-title__count">' + rest.length + '</span></h3>' +
                '<div class="pj-grid">' + rest.map(function (p) { return card(p, now); }).join('') + '</div>';
        }
        if (shelved.length) {
            html += '<details class="pj-shelf"><summary class="pj-group-title pj-shelf__summary"><span>Early work &amp; archive</span><span class="pj-group-title__count">' + shelved.length + '</span>' +
                '<svg class="pj-shelf__chevron" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg></summary>' +
                '<p class="pj-shelf__note">Coursework, demos and prototypes from 2019 on — kept for the record.</p>' +
                '<div class="pj-grid pj-grid--compact">' + shelved.map(function (p) { return card(p, now, { compact: true }); }).join('') + '</div></details>';
        }
        return html;
    }

    /* ============================================
       BOARD — one column per status
       ============================================ */
    function board(projects, now) {
        var columns = Object.keys(PJ.STATUSES).map(function (status) {
            return { status: status, items: projects.filter(function (p) { return p.status === status; }) };
        }).filter(function (column) { return column.items.length; });
        return '<div class="pj-board">' + columns.map(function (column) {
            return '<section class="pj-board__col" data-status="' + column.status + '" aria-label="' + PJ.STATUSES[column.status].label + '">' +
                '<header class="pj-board__head"><span class="pj-status" data-status="' + column.status + '"><span class="pj-status__dot" aria-hidden="true"></span>' + PJ.STATUSES[column.status].label + '</span><span class="pj-board__count">' + column.items.length + '</span></header>' +
                '<div class="pj-board__items">' + column.items.map(function (p) { return boardCard(p, now); }).join('') + '</div>' +
                '</section>';
        }).join('') + '</div>';
    }

    function boardCard(project, now) {
        return '<article class="pj-bcard" data-id="' + esc(project.id) + '" data-status="' + project.status + '">' +
            '<div class="pj-bcard__head"><h3 class="pj-bcard__title"><button type="button" class="pj-card__open" data-open="' + esc(project.id) + '">' + esc(project.name) + '</button></h3>' + repoBadge(project) + '</div>' +
            '<p class="pj-bcard__tagline">' + esc(project.tagline) + '</p>' +
            (project.progress ? progressBar(project) : '') +
            (project.next && PJ.ACTIVE_STATUSES.indexOf(project.status) !== -1 ? '<p class="pj-bcard__next"><span>Next</span>' + esc(project.next) + '</p>' : '') +
            '<div class="pj-bcard__foot"><span class="pj-card__kind">' + PJ.CATEGORIES[project.category].label + '</span><span class="pj-meta">' + (project.lastCommitAt ? esc(PJ.relativeTime(project.lastCommitAt, now)) : '') + '</span></div>' +
            '</article>';
    }

    /* ============================================
       TIMELINE — first commit to latest commit
       ============================================ */
    function monthIndex(value) {
        var parts = value.slice(0, 7).split('-');
        return Number(parts[0]) * 12 + Number(parts[1]) - 1;
    }

    function timeline(projects, now) {
        var dated = projects.filter(function (p) { return p.started; });
        if (!dated.length) return '';
        var nowMonth = monthIndex(new Date(now).toISOString());
        var first = Math.min.apply(null, dated.map(function (p) { return monthIndex(p.started); }));
        var startYear = Math.floor(first / 12);
        var startMonth = startYear * 12;
        var span = nowMonth - startMonth + 1;
        var rows = dated.slice().sort(function (a, b) {
            return monthIndex(a.started) - monthIndex(b.started) || a.name.localeCompare(b.name);
        });

        var years = '';
        for (var y = startYear; y * 12 <= nowMonth; y++) {
            var left = ((y * 12 - startMonth) / span) * 100;
            years += '<span class="pj-timeline__year" data-css="left:' + left.toFixed(2) + '%">' + y + '</span>';
        }

        var html = '<div class="pj-timeline"><div class="pj-timeline__axis"><span class="pj-timeline__axis-label"></span><div class="pj-timeline__years">' + years + '</div></div>';
        rows.forEach(function (p) {
            var start = monthIndex(p.started) - startMonth;
            var ongoing = PJ.ACTIVE_STATUSES.concat(PJ.SHIPPED_STATUSES).indexOf(p.status) !== -1;
            var endMonth = ongoing ? nowMonth : monthIndex(p.ended || p.lastCommitAt || p.started);
            var end = Math.max(endMonth - startMonth + 1, start + 1);
            var left = (start / span) * 100;
            var width = ((end - start) / span) * 100;
            var tip = p.name + ' · ' + PJ.formatMonth(p.started) + ' → ' + (ongoing ? 'now' : PJ.formatMonth(p.ended || p.lastCommitAt || p.started));
            html += '<div class="pj-timeline__row" data-id="' + esc(p.id) + '">' +
                '<button type="button" class="pj-timeline__name" data-open="' + esc(p.id) + '">' + esc(p.name) + '</button>' +
                '<div class="pj-timeline__track"><span class="pj-timeline__bar' + (ongoing ? ' is-ongoing' : '') + '" data-status="' + p.status + '" data-open="' + esc(p.id) + '" data-tip="' + esc(tip) + '" data-css="left:' + left.toFixed(2) + '%;width:' + width.toFixed(2) + '%"></span></div>' +
                '</div>';
        });
        return html + '</div>';
    }

    /* ============================================
       NOW BUILDING
       ============================================ */
    function nowBuilding(projects, limit) {
        return projects
            .filter(function (p) { return p.commitsLastMonth > 0 && p.status !== 'archived'; })
            .sort(function (a, b) { return b.commitsLastMonth - a.commitsLastMonth; })
            .slice(0, limit)
            .map(function (p, index) {
                return '<li class="pj-now__item">' +
                    '<span class="pj-now__rank">' + String(index + 1).padStart(2, '0') + '</span>' +
                    '<div class="pj-now__main"><button type="button" class="pj-now__name" data-open="' + esc(p.id) + '">' + esc(p.name) + '</button>' +
                    '<span class="pj-now__sub">' + PJ.formatNumber(p.commitsLastMonth) + ' commits in 4 weeks</span></div>' +
                    charts.sparkline(p.weekly, { width: 84, height: 26, weeks: 12, label: p.name + ' last 12 weeks' }) +
                    '</li>';
            }).join('');
    }

    PJ.views = {
        ICONS: ICONS,
        statusPill: statusPill,
        progressBar: progressBar,
        grid: grid,
        board: board,
        timeline: timeline,
        nowBuilding: nowBuilding,
    };
})();
