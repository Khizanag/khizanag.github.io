(function () {
    'use strict';

    var PJ = window.PJ;
    var esc = PJ.esc;
    var charts = PJ.charts;
    var views = PJ.views;
    var ICONS = views.ICONS;

    var drawer = document.getElementById('pjDrawer');
    var panel = drawer.querySelector('.pj-drawer__panel');
    var body = document.getElementById('pjDrawerBody');
    var position = document.getElementById('pjDrawerPosition');
    var btnPrev = document.getElementById('pjDrawerPrev');
    var btnNext = document.getElementById('pjDrawerNext');

    var state = { order: [], current: null, returnFocus: null, onClose: null, onNavigate: null, context: null };

    /* ============================================
       CONTENT
       ============================================ */
    function linkButton(href, label, icon) {
        return '<a class="pj-link" href="' + esc(href) + '" target="_blank" rel="noopener noreferrer">' + (icon || '') + '<span>' + esc(label) + '</span>' + ICONS.arrow + '</a>';
    }

    function links(project) {
        var out = [];
        if (project.links.appStore) out.push(linkButton(project.links.appStore, 'App Store'));
        if (project.links.site) out.push(linkButton(project.links.site, 'Visit site'));
        if (project.links.docs) out.push(linkButton(project.links.docs, 'Documentation'));
        project.publicRepos.forEach(function (repo) {
            out.push(linkButton(repo.url, project.publicRepos.length > 1 ? repo.name : 'Source on GitHub', ICONS.github));
        });
        if (project.isPrivate) out.push('<span class="pj-link is-static">' + ICONS.lock + '<span>Private repository</span></span>');
        if (project.isLocalOnly) out.push('<span class="pj-link is-static">' + ICONS.laptop + '<span>Local only — not on GitHub yet</span></span>');
        return out.length ? '<div class="pj-detail__links">' + out.join('') + '</div>' : '';
    }

    function plan(project) {
        if (!project.progress && !project.milestones.length && !project.next) return '';
        var html = '<section class="pj-detail__block"><h3 class="pj-detail__heading">Plan</h3>';
        if (project.progress) {
            var value = Math.max(0, Math.min(1, project.progress.value || 0));
            html += '<div class="pj-detail__progress">' + charts.ring(value, 64) +
                '<div><p class="pj-detail__progress-value">' + Math.round(value * 100) + '%</p><p class="pj-detail__progress-label">' + esc(project.progress.label) + '</p></div></div>';
        }
        if (project.milestones.length) {
            html += '<ol class="pj-milestones">' + project.milestones.map(function (m) {
                return '<li class="pj-milestones__item' + (m.done ? ' is-done' : '') + '">' +
                    '<span class="pj-milestones__mark" aria-hidden="true"></span>' +
                    '<span>' + esc(m.title) + '</span><span class="pj-visually-hidden">' + (m.done ? ' (done)' : ' (to do)') + '</span></li>';
            }).join('') + '</ol>';
        }
        if (project.next) {
            html += '<p class="pj-next"><span class="pj-next__label">Next up</span>' + esc(project.next) + '</p>';
        }
        return html + '</section>';
    }

    function stat(label, value, hint) {
        return '<div class="pj-stat"' + (hint ? ' data-tip="' + esc(hint) + '"' : '') + '><dt>' + esc(label) + '</dt><dd>' + value + '</dd></div>';
    }

    function numbers(project, now) {
        if (!project.repos.length) return '';
        var items = [
            stat('Commits', PJ.formatNumber(project.commits), 'On the default branch, all time'),
            stat('Last 12 months', PJ.formatNumber(project.commitsLastYear)),
            stat('Started', esc(PJ.formatMonth(project.started))),
            project.ended ? stat('Active until', esc(PJ.formatMonth(project.ended)), 'Later commits were maintenance only') : null,
            stat('Last commit', esc(PJ.relativeTime(project.lastCommitAt, now)), PJ.formatDate(project.lastCommitAt)),
        ];
        if (project.latestTag) items.push(stat('Latest release', esc(project.latestTag), project.release ? 'Published ' + PJ.formatDate(project.release.publishedAt) : null));
        if (project.stars) items.push(stat('Stars', PJ.formatNumber(project.stars)));
        if (project.openIssues) items.push(stat('Open issues', PJ.formatNumber(project.openIssues)));
        return '<section class="pj-detail__block"><h3 class="pj-detail__heading">Numbers</h3><dl class="pj-stats">' + items.filter(Boolean).join('') + '</dl></section>';
    }

    function activity(project) {
        if (!project.repos.length) return '';
        var calendar = state.context.github.calendar;
        var firstWeek = calendar.length >= project.weekly.length ? calendar[calendar.length - project.weekly.length].start : null;
        return '<section class="pj-detail__block"><h3 class="pj-detail__heading">Activity <span class="pj-detail__heading-sub">commits per week, last 12 months</span></h3>' +
            '<div class="pj-detail__chart">' + charts.weeklyBars(project.weekly, firstWeek) + '</div></section>';
    }

    function languages(project) {
        if (!project.languages.length) return '';
        var shown = project.languages.filter(function (l) { return l.share >= 0.01; }).slice(0, 6);
        return '<section class="pj-detail__block"><h3 class="pj-detail__heading">Languages</h3>' +
            '<div class="pj-langbar pj-langbar--md">' + charts.langBar(project.languages, 6) + '</div>' +
            '<ul class="pj-langlist pj-langlist--inline">' + shown.map(function (l) {
                return '<li><span class="pj-langlist__dot" data-css="background:' + esc(l.color || '#8b949e') + '"></span>' + esc(l.name) + '<span class="pj-langlist__pct">' + (l.share * 100).toFixed(1) + '%</span></li>';
            }).join('') + '</ul></section>';
    }

    function repos(project, now) {
        if (project.repos.length < 2) return '';
        return '<section class="pj-detail__block"><h3 class="pj-detail__heading">Repositories</h3><ul class="pj-repos">' +
            project.repos.map(function (repo) {
                var name = repo.url
                    ? '<a href="' + esc(repo.url) + '" target="_blank" rel="noopener noreferrer">' + ICONS.github + esc(repo.name) + '</a>'
                    : '<span>' + ICONS.lock + esc(repo.name) + '</span>';
                return '<li class="pj-repos__item"><span class="pj-repos__name">' + name + '</span>' +
                    '<span class="pj-repos__meta">' + (repo.language ? esc(repo.language.name) + ' · ' : '') + PJ.formatNumber(repo.commits) + ' commits · ' + esc(PJ.relativeTime(repo.lastCommitAt, now)) + '</span></li>';
            }).join('') + '</ul></section>';
    }

    function tech(project) {
        if (!project.tech.length) return '';
        return '<section class="pj-detail__block"><h3 class="pj-detail__heading">Built with</h3><div class="pj-techcloud pj-techcloud--sm">' +
            project.tech.map(function (t) {
                return '<button type="button" class="pj-tech" data-tech="' + esc(t) + '">' + esc(t) + '</button>';
            }).join('') + '</div></section>';
    }

    function render(project) {
        var now = state.context.now;
        var platforms = project.platforms.map(function (p) { return '<span class="pj-chip-sm">' + esc(p) + '</span>'; }).join('');
        body.innerHTML =
            '<header class="pj-detail__header" data-status="' + project.status + '">' +
                '<div class="pj-detail__eyebrow">' + views.statusPill(project) + '<span class="pj-card__kind">' + PJ.CATEGORIES[project.category].label + '</span>' + platforms + '</div>' +
                '<h2 class="pj-detail__title" id="pjDrawerTitle">' + esc(project.name) + '</h2>' +
                '<p class="pj-detail__tagline">' + esc(project.tagline) + '</p>' +
                links(project) +
            '</header>' +
            (project.description ? '<p class="pj-detail__desc">' + esc(project.description) + '</p>' : '') +
            plan(project) +
            numbers(project, now) +
            activity(project) +
            languages(project) +
            repos(project, now) +
            tech(project);
        body.setAttribute('data-status', project.status);
        PJ.applyCss(body);
        body.scrollTop = 0;

        var index = state.order.indexOf(project.id);
        position.textContent = index === -1 ? '' : (index + 1) + ' / ' + state.order.length;
        btnPrev.disabled = index <= 0;
        btnNext.disabled = index === -1 || index >= state.order.length - 1;
    }

    /* ============================================
       OPEN / CLOSE / STEP
       ============================================ */
    function find(id) {
        return state.context.projects.filter(function (p) { return p.id === id; })[0] || null;
    }

    function open(id, order) {
        var project = find(id);
        if (!project) return false;
        if (order) state.order = order;
        if (drawer.hidden) {
            state.returnFocus = document.activeElement;
            drawer.hidden = false;
            document.documentElement.classList.add('pj-no-scroll');
            requestAnimationFrame(function () { drawer.classList.add('is-open'); });
        }
        state.current = id;
        render(project);
        panel.focus({ preventScroll: true });
        return true;
    }

    function close() {
        if (drawer.hidden) return;
        drawer.classList.remove('is-open');
        document.documentElement.classList.remove('pj-no-scroll');
        var finish = function () { drawer.hidden = true; };
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) finish();
        else setTimeout(finish, 280);
        state.current = null;
        if (state.returnFocus && document.contains(state.returnFocus)) state.returnFocus.focus({ preventScroll: true });
        if (state.onClose) state.onClose();
    }

    function step(delta) {
        var index = state.order.indexOf(state.current);
        var next = state.order[index + delta];
        if (!next) return;
        open(next);
        if (state.onNavigate) state.onNavigate(next);
    }

    function trapFocus(e) {
        var focusable = panel.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }

    drawer.addEventListener('click', function (e) {
        if (e.target.closest('[data-close]')) close();
    });
    btnPrev.addEventListener('click', function () { step(-1); });
    btnNext.addEventListener('click', function () { step(1); });

    document.addEventListener('keydown', function (e) {
        if (drawer.hidden) return;
        if (e.key === 'Escape') { e.preventDefault(); close(); return; }
        if (e.key === 'Tab') { trapFocus(e); return; }
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        if (e.key === 'j' || e.key === 'ArrowDown' && e.target === panel) { e.preventDefault(); step(1); }
        if (e.key === 'k' || e.key === 'ArrowUp' && e.target === panel) { e.preventDefault(); step(-1); }
    });

    PJ.detail = {
        open: open,
        close: close,
        isOpen: function () { return !drawer.hidden; },
        current: function () { return state.current; },
        configure: function (options) {
            state.context = options.context;
            state.onClose = options.onClose;
            state.onNavigate = options.onNavigate;
        },
        setOrder: function (order) { state.order = order; },
    };
})();
