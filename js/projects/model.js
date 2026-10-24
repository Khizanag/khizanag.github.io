(function () {
    'use strict';

    /* ============================================
       VOCABULARY
       ============================================ */
    var STATUSES = {
        building:   { label: 'Building',   order: 1 },
        beta:       { label: 'Beta',       order: 2 },
        maintained: { label: 'Maintained', order: 3 },
        shipped:    { label: 'Shipped',    order: 4 },
        paused:     { label: 'Paused',     order: 5 },
        idea:       { label: 'Idea',       order: 6 },
        archived:   { label: 'Archived',   order: 7 },
    };

    var CATEGORIES = {
        app:        { label: 'App',       plural: 'Apps' },
        game:       { label: 'Game',      plural: 'Games' },
        library:    { label: 'Library',   plural: 'Libraries' },
        tooling:    { label: 'Tooling',   plural: 'Tooling' },
        web:        { label: 'Web',       plural: 'Web' },
        lab:        { label: 'Lab',       plural: 'Labs' },
        coursework: { label: 'Coursework', plural: 'Coursework' },
    };

    var ACTIVE_STATUSES = ['building', 'beta'];
    var SHIPPED_STATUSES = ['shipped', 'maintained'];
    var LIVE_WINDOW_DAYS = 14;
    var DAY_MS = 86400000;

    /* ============================================
       HELPERS
       ============================================ */
    function esc(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function maxDate(values) {
        var best = null;
        values.forEach(function (value) {
            if (value && (!best || value > best)) best = value;
        });
        return best;
    }

    function minDate(values) {
        var best = null;
        values.forEach(function (value) {
            if (value && (!best || value < best)) best = value;
        });
        return best;
    }

    function sum(values) {
        return values.reduce(function (total, value) { return total + (value || 0); }, 0);
    }

    function sumSeries(series) {
        var length = series.reduce(function (longest, s) { return Math.max(longest, s.length); }, 0);
        var out = [];
        for (var i = 0; i < length; i++) {
            out.push(sum(series.map(function (s) { return s[i - (length - s.length)]; })));
        }
        return out;
    }

    function daysSince(iso, now) {
        if (!iso) return Infinity;
        return (now - new Date(iso).getTime()) / DAY_MS;
    }

    function relativeTime(iso, now) {
        if (!iso) return 'never';
        var days = Math.floor(daysSince(iso, now));
        if (days < 1) return 'today';
        if (days < 2) return 'yesterday';
        if (days < 14) return days + ' days ago';
        if (days < 60) return Math.round(days / 7) + ' weeks ago';
        if (days < 365) return Math.round(days / 30) + ' months ago';
        var years = Math.round(days / 365);
        return years + (years === 1 ? ' year ago' : ' years ago');
    }

    var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    function formatMonth(value) {
        if (!value) return '—';
        var parts = value.slice(0, 7).split('-');
        return MONTHS[Number(parts[1]) - 1] + ' ' + parts[0];
    }

    function formatDate(iso) {
        if (!iso) return '—';
        var d = new Date(iso);
        return MONTHS[d.getUTCMonth()] + ' ' + d.getUTCDate() + ', ' + d.getUTCFullYear();
    }

    function formatNumber(n) {
        return Number(n || 0).toLocaleString('en-US');
    }

    // CSP forbids inline style attributes, so markup carries data-css and this applies it through the CSSOM
    function applyCss(root) {
        root.querySelectorAll('[data-css]').forEach(function (el) {
            el.getAttribute('data-css').split(';').forEach(function (rule) {
                var at = rule.indexOf(':');
                if (at < 1) return;
                el.style.setProperty(rule.slice(0, at).trim(), rule.slice(at + 1).trim());
            });
            el.removeAttribute('data-css');
        });
    }

    /* ============================================
       MERGE — curated projects + GitHub numbers
       ============================================ */
    // Each repo's languages are normalised first and weighted by its commits, so a repo of
    // generated or source data cannot drown out the code of the project it belongs to.
    function mergeLanguages(repos) {
        var totals = {};
        var colors = {};
        var weightSum = 0;
        repos.forEach(function (repo) {
            var bytes = sum(repo.languages.map(function (l) { return l.bytes; }));
            if (!bytes) return;
            var weight = Math.max(repo.commits, 1);
            weightSum += weight;
            repo.languages.forEach(function (l) {
                totals[l.name] = (totals[l.name] || 0) + (l.bytes / bytes) * weight;
                colors[l.name] = l.color;
            });
        });
        return Object.keys(totals)
            .map(function (name) {
                return { name: name, color: colors[name] || '#8b949e', share: totals[name] / weightSum };
            })
            .sort(function (a, b) { return b.share - a.share; });
    }

    function buildProject(raw, github, now) {
        var repos = (raw.repos || [])
            .map(function (name) { return github.repos[name]; })
            .filter(Boolean);
        var releases = repos
            .filter(function (repo) { return repo.release; })
            .sort(function (a, b) { return a.release.publishedAt < b.release.publishedAt ? 1 : -1; });
        var lastCommitAt = maxDate(repos.map(function (r) { return r.lastCommitAt; }));
        var status = STATUSES[raw.status] ? raw.status : 'idea';
        var links = raw.links || {};

        return {
            id: raw.id,
            name: raw.name,
            tagline: raw.tagline || '',
            description: raw.description || '',
            category: CATEGORIES[raw.category] ? raw.category : 'app',
            platforms: raw.platforms || [],
            status: status,
            progress: raw.progress || null,
            milestones: raw.milestones || [],
            next: raw.next || null,
            tech: raw.tech || [],
            featured: Boolean(raw.featured),
            links: {
                appStore: links.appStore || null,
                site: links.site || null,
                docs: links.docs || null,
            },
            started: raw.started || (minDate(repos.map(function (r) { return r.createdAt; })) || '').slice(0, 7),
            ended: raw.ended || null,
            activeAt: raw.ended ? raw.ended + '-15T00:00:00Z' : lastCommitAt,
            repos: repos,
            publicRepos: repos.filter(function (r) { return !r.private && r.url; }),
            isPrivate: repos.length > 0 && repos.every(function (r) { return r.private; }),
            isLocalOnly: repos.length === 0,
            lastCommitAt: lastCommitAt,
            isLive: ACTIVE_STATUSES.concat(SHIPPED_STATUSES).indexOf(status) !== -1 && daysSince(lastCommitAt, now) <= LIVE_WINDOW_DAYS,
            commits: sum(repos.map(function (r) { return r.commits; })),
            commitsLastYear: sum(repos.map(function (r) { return r.commitsLastYear; })),
            commitsLastMonth: sum(repos.map(function (r) { return sum(r.weekly.slice(-4)); })),
            weekly: sumSeries(repos.map(function (r) { return r.weekly; })),
            stars: sum(repos.map(function (r) { return r.stars; })),
            openIssues: sum(repos.map(function (r) { return r.openIssues; })),
            release: releases.length ? releases[0].release : null,
            latestTag: releases.length ? releases[0].release.tag : (repos.map(function (r) { return r.latestTag; }).filter(Boolean)[0] || null),
            languages: mergeLanguages(repos),
        };
    }

    function buildSearchText(project) {
        return [
            project.name,
            project.tagline,
            project.description,
            STATUSES[project.status].label,
            CATEGORIES[project.category].label,
            project.platforms.join(' '),
            project.tech.join(' '),
            project.repos.map(function (r) { return r.name; }).join(' '),
        ].join(' ').toLowerCase();
    }

    function load() {
        function getJson(url) {
            return fetch(url, { cache: 'no-cache' }).then(function (response) {
                if (!response.ok) throw new Error(url + ' answered ' + response.status);
                return response.json();
            });
        }
        return Promise.all([getJson('js/projects/projects.json'), getJson('js/projects/github.json')])
            .then(function (results) {
                var curated = results[0];
                var github = results[1];
                var now = Date.now();
                var projects = curated.projects.map(function (raw) {
                    var project = buildProject(raw, github, now);
                    project.searchText = buildSearchText(project);
                    return project;
                });
                return { projects: projects, github: github, now: now };
            });
    }

    /* ============================================
       AGGREGATES
       ============================================ */
    function totals(projects, github) {
        var languages = {};
        projects.forEach(function (p) {
            p.languages.forEach(function (l) { languages[l.name] = true; });
        });
        return {
            projects: projects.length,
            active: projects.filter(function (p) { return ACTIVE_STATUSES.indexOf(p.status) !== -1; }).length,
            shipped: projects.filter(function (p) { return SHIPPED_STATUSES.indexOf(p.status) !== -1; }).length,
            commits: sum(github.calendar.map(function (w) { return sum(w.days); })),
            languages: Object.keys(languages).length,
        };
    }

    // Every project counts once, split by its own language mix.
    function languageMix(projects) {
        var totalsByName = {};
        var colors = {};
        var counted = 0;
        projects.forEach(function (p) {
            if (!p.languages.length) return;
            counted += 1;
            p.languages.forEach(function (l) {
                totalsByName[l.name] = (totalsByName[l.name] || 0) + l.share;
                colors[l.name] = l.color;
            });
        });
        return Object.keys(totalsByName)
            .map(function (name) {
                return { name: name, color: colors[name], share: totalsByName[name] / counted };
            })
            .sort(function (a, b) { return b.share - a.share; });
    }

    function techCounts(projects) {
        var counts = {};
        projects.forEach(function (p) {
            p.tech.forEach(function (t) { counts[t] = (counts[t] || 0) + 1; });
        });
        return Object.keys(counts)
            .map(function (name) { return { name: name, count: counts[name] }; })
            .sort(function (a, b) { return b.count - a.count || a.name.localeCompare(b.name); });
    }

    window.PJ = {
        STATUSES: STATUSES,
        CATEGORIES: CATEGORIES,
        ACTIVE_STATUSES: ACTIVE_STATUSES,
        SHIPPED_STATUSES: SHIPPED_STATUSES,
        DAY_MS: DAY_MS,
        MONTHS: MONTHS,
        esc: esc,
        sum: sum,
        applyCss: applyCss,
        relativeTime: relativeTime,
        formatMonth: formatMonth,
        formatDate: formatDate,
        formatNumber: formatNumber,
        load: load,
        totals: totals,
        languageMix: languageMix,
        techCounts: techCounts,
    };
})();
