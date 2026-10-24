(function () {
    'use strict';

    var PJ = window.PJ;
    var esc = PJ.esc;
    var views = PJ.views;
    var charts = PJ.charts;
    var detail = PJ.detail;

    var STATUS_FILTERS = [
        { key: 'all',      label: 'All',         match: null },
        { key: 'active',   label: 'In progress', match: ['building', 'beta'] },
        { key: 'shipped',  label: 'Shipped',     match: ['shipped', 'maintained'] },
        { key: 'paused',   label: 'Paused',      match: ['paused'] },
        { key: 'idea',     label: 'Ideas',       match: ['idea'] },
        { key: 'archived', label: 'Archived',    match: ['archived'] },
    ];
    var VIEWS = ['grid', 'board', 'timeline'];
    var SORTS = ['activity', 'commits', 'progress', 'started', 'name'];
    var NOW_BUILDING_LIMIT = 5;

    var $ = function (id) { return document.getElementById(id); };
    var els = {
        view: $('pjView'),
        empty: $('pjEmpty'),
        search: $('pjSearch'),
        sort: $('pjSort'),
        statusFilters: $('pjStatusFilters'),
        facetFilters: $('pjFacetFilters'),
        results: $('pjResults'),
        reset: $('pjReset'),
        tooltip: $('pjTooltip'),
        toast: $('pjToast'),
    };

    var data = null;
    var filters = { q: '', status: 'all', kind: '', platform: '', tech: '', view: 'grid', sort: 'activity' };
    var closingFromHistory = false;

    /* ============================================
       URL STATE — filters and the open project are shareable
       ============================================ */
    function readUrl() {
        var params = new URLSearchParams(window.location.search);
        filters.q = params.get('q') || '';
        filters.status = STATUS_FILTERS.some(function (f) { return f.key === params.get('status'); }) ? params.get('status') : 'all';
        filters.kind = PJ.CATEGORIES[params.get('kind')] ? params.get('kind') : '';
        filters.platform = params.get('platform') || '';
        filters.tech = params.get('tech') || '';
        filters.view = VIEWS.indexOf(params.get('view')) !== -1 ? params.get('view') : 'grid';
        filters.sort = SORTS.indexOf(params.get('sort')) !== -1 ? params.get('sort') : 'activity';
        return params.get('p');
    }

    function buildUrl(projectId) {
        var params = new URLSearchParams();
        if (filters.q) params.set('q', filters.q);
        if (filters.status !== 'all') params.set('status', filters.status);
        if (filters.kind) params.set('kind', filters.kind);
        if (filters.platform) params.set('platform', filters.platform);
        if (filters.tech) params.set('tech', filters.tech);
        if (filters.view !== 'grid') params.set('view', filters.view);
        if (filters.sort !== 'activity') params.set('sort', filters.sort);
        if (projectId) params.set('p', projectId);
        var query = params.toString();
        return window.location.pathname + (query ? '?' + query : '') + window.location.hash;
    }

    function replaceUrl() {
        history.replaceState(history.state, '', buildUrl(detail.current()));
    }

    /* ============================================
       FILTER + SORT
       ============================================ */
    function statusMatch(project, key) {
        var filter = STATUS_FILTERS.filter(function (f) { return f.key === key; })[0];
        return !filter || !filter.match || filter.match.indexOf(project.status) !== -1;
    }

    function matches(project, except) {
        if (except !== 'status' && !statusMatch(project, filters.status)) return false;
        if (except !== 'kind' && filters.kind && project.category !== filters.kind) return false;
        if (filters.platform && project.platforms.indexOf(filters.platform) === -1) return false;
        if (filters.tech && project.tech.indexOf(filters.tech) === -1) return false;
        if (filters.q) {
            var terms = filters.q.toLowerCase().split(/\s+/).filter(Boolean);
            for (var i = 0; i < terms.length; i++) {
                if (project.searchText.indexOf(terms[i]) === -1) return false;
            }
        }
        return true;
    }

    var SORTERS = {
        activity: function (a, b) { return (b.activeAt || '').localeCompare(a.activeAt || ''); },
        commits: function (a, b) { return b.commitsLastYear - a.commitsLastYear; },
        progress: function (a, b) {
            var av = a.progress ? a.progress.value : -1;
            var bv = b.progress ? b.progress.value : -1;
            return bv - av || PJ.STATUSES[a.status].order - PJ.STATUSES[b.status].order;
        },
        started: function (a, b) { return (b.started || '').localeCompare(a.started || ''); },
        name: function (a, b) { return a.name.localeCompare(b.name); },
    };

    function sorted(list) {
        var sorter = SORTERS[filters.sort];
        return list.slice().sort(function (a, b) { return sorter(a, b) || a.name.localeCompare(b.name); });
    }

    function isFiltered() {
        return Boolean(filters.q || filters.status !== 'all' || filters.kind || filters.platform || filters.tech);
    }

    /* ============================================
       TOOLBAR
       ============================================ */
    function chip(attrs, label, count, pressed) {
        return '<button type="button" class="pj-chip" ' + attrs + ' aria-pressed="' + pressed + '">' + label +
            (count == null ? '' : '<span class="pj-chip__count">' + count + '</span>') + '</button>';
    }

    function renderToolbar() {
        var projects = data.projects;
        els.statusFilters.innerHTML = STATUS_FILTERS.map(function (f) {
            var count = projects.filter(function (p) { return statusMatch(p, f.key) && matches(p, 'status'); }).length;
            if (!count && f.key !== 'all' && filters.status !== f.key) return '';
            var dot = f.match ? '<span class="pj-status__dot" data-status="' + f.match[0] + '" aria-hidden="true"></span>' : '';
            return chip('data-status-filter="' + f.key + '"', dot + esc(f.label), count, filters.status === f.key);
        }).join('');

        var kinds = Object.keys(PJ.CATEGORIES).map(function (key) {
            var count = projects.filter(function (p) { return p.category === key && matches(p, 'kind'); }).length;
            if (!count && filters.kind !== key) return '';
            return chip('data-kind="' + key + '"', esc(PJ.CATEGORIES[key].plural), count, filters.kind === key);
        }).join('');

        var platforms = {};
        projects.forEach(function (p) { p.platforms.forEach(function (name) { platforms[name] = (platforms[name] || 0) + 1; }); });
        var platformOptions = Object.keys(platforms).sort(function (a, b) { return platforms[b] - platforms[a]; }).map(function (name) {
            return '<option value="' + esc(name) + '"' + (filters.platform === name ? ' selected' : '') + '>' + esc(name) + ' (' + platforms[name] + ')</option>';
        }).join('');

        els.facetFilters.innerHTML = kinds +
            '<label class="pj-select pj-select--sm"><span class="pj-visually-hidden">Platform</span><select id="pjPlatform"><option value="">All platforms</option>' + platformOptions + '</select></label>' +
            (filters.tech ? '<button type="button" class="pj-chip is-removable" data-clear-tech aria-label="' + esc('Remove filter: ' + filters.tech) + '">' + esc(filters.tech) +
                '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>' : '');

        document.querySelectorAll('.pj-segmented__btn').forEach(function (btn) {
            btn.setAttribute('aria-pressed', String(btn.getAttribute('data-view') === filters.view));
        });
        els.sort.value = filters.sort;
        if (els.search.value !== filters.q) els.search.value = filters.q;
        els.reset.hidden = !isFiltered();
    }

    /* ============================================
       RENDER
       ============================================ */
    function render() {
        var list = sorted(data.projects.filter(function (p) { return matches(p); }));
        renderToolbar();

        var total = data.projects.length;
        els.results.textContent = list.length === total
            ? total + ' projects'
            : list.length + ' of ' + total + ' projects';

        els.view.setAttribute('aria-busy', 'false');
        els.view.setAttribute('data-view', filters.view);
        els.empty.hidden = list.length > 0;
        if (!list.length) {
            els.view.innerHTML = '';
            detail.setOrder([]);
            return;
        }
        if (filters.view === 'board') els.view.innerHTML = views.board(list, data.now);
        else if (filters.view === 'timeline') els.view.innerHTML = views.timeline(list, data.now);
        else els.view.innerHTML = views.grid(list, data.now, !isFiltered());
        PJ.applyCss(els.view);
        detail.setOrder(visibleOrder());
    }

    function visibleOrder() {
        var seen = {};
        var order = [];
        els.view.querySelectorAll('[data-open]').forEach(function (el) {
            var id = el.getAttribute('data-open');
            if (!seen[id]) { seen[id] = true; order.push(id); }
        });
        return order;
    }

    function update(changes) {
        Object.keys(changes).forEach(function (key) { filters[key] = changes[key]; });
        render();
        replaceUrl();
    }

    /* ============================================
       HERO, PULSE, STACK
       ============================================ */
    function countUp(el, target) {
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce || target < 10) { el.textContent = PJ.formatNumber(target); return; }
        var start = null;
        var duration = 1400;
        function frame(ts) {
            if (!start) start = ts;
            var t = Math.min((ts - start) / duration, 1);
            var eased = 1 - Math.pow(1 - t, 4);
            el.textContent = PJ.formatNumber(Math.round(target * eased));
            if (t < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }

    function renderHero() {
        var totals = PJ.totals(data.projects, data.github);
        document.querySelectorAll('[data-stat]').forEach(function (el) {
            countUp(el, totals[el.getAttribute('data-stat')] || 0);
        });
        var synced = 'synced ' + PJ.formatDate(data.github.generatedAt);
        $('pjSynced').textContent = synced;
        $('pjFooterSynced').textContent = 'numbers ' + synced + ' from GitHub';
    }

    function renderPulse() {
        var days = charts.calendar($('pjCalendar'), data.github.calendar, data.now);
        var facts = charts.calendarFacts(days);
        $('pjCalendar').setAttribute('aria-label', PJ.formatNumber(facts.total) + ' commits on ' + facts.active + ' days in the last 52 weeks');
        var items = [
            ['Commits', PJ.formatNumber(facts.total)],
            ['Active days', facts.active + ' / ' + days.length],
            ['Longest streak', facts.longest + (facts.longest === 1 ? ' day' : ' days')],
            ['Current streak', facts.current + (facts.current === 1 ? ' day' : ' days')],
            ['Busiest day', facts.busiest ? PJ.formatNumber(facts.busiest.count) + ' · ' + PJ.MONTHS[facts.busiest.date.getUTCMonth()] + ' ' + facts.busiest.date.getUTCDate() : '—'],
            ['Favourite day', facts.weekday],
        ];
        $('pjPulseFacts').innerHTML = items.map(function (item) {
            return '<div class="pj-fact"><dt>' + esc(item[0]) + '</dt><dd>' + esc(item[1]) + '</dd></div>';
        }).join('');
        $('pjNow').innerHTML = views.nowBuilding(data.projects, NOW_BUILDING_LIMIT);
        var scroller = document.querySelector('.pj-pulse__calendar-scroll');
        scroller.scrollLeft = scroller.scrollWidth;
    }

    function renderStack() {
        var mix = PJ.languageMix(data.projects).filter(function (l) { return l.share >= 0.005; });
        var top = mix.slice(0, 10);
        $('pjLangBar').innerHTML = charts.langBar(top, 10);
        $('pjLangList').innerHTML = top.map(function (l) {
            return '<li><span class="pj-langlist__dot" data-css="background:' + esc(l.color || '#8b949e') + '"></span>' + esc(l.name) + '<span class="pj-langlist__pct">' + (l.share * 100).toFixed(1) + '%</span></li>';
        }).join('');
        var tech = PJ.techCounts(data.projects);
        var max = tech.length ? tech[0].count : 1;
        $('pjTechCloud').innerHTML = tech.filter(function (t) { return t.count > 1 || tech.length < 40; }).map(function (t) {
            var weight = Math.ceil((t.count / max) * 4);
            return '<button type="button" class="pj-tech" data-tech="' + esc(t.name) + '" data-weight="' + weight + '">' + esc(t.name) + '<span class="pj-tech__count">' + t.count + '</span></button>';
        }).join('');
        PJ.applyCss($('pjLangBar'));
        PJ.applyCss($('pjLangList'));
        renderStatusMix();
    }

    function renderStatusMix() {
        var groups = STATUS_FILTERS.filter(function (f) { return f.match; }).map(function (f) {
            return {
                filter: f,
                count: data.projects.filter(function (p) { return f.match.indexOf(p.status) !== -1; }).length,
            };
        }).filter(function (g) { return g.count; });
        $('pjStatusMix').innerHTML =
            '<div class="pj-statusmix__bar" role="img" aria-label="' + esc(groups.map(function (g) { return g.count + ' ' + g.filter.label.toLowerCase(); }).join(', ')) + '">' +
            groups.map(function (g) {
                return '<span class="pj-statusmix__seg" data-status="' + g.filter.match[0] + '" data-tip="' + esc(g.filter.label + ' · ' + g.count) + '" data-css="flex-grow:' + g.count + '"></span>';
            }).join('') + '</div>' +
            '<ul class="pj-statusmix__legend">' + groups.map(function (g) {
                return '<li><button type="button" data-status="' + g.filter.match[0] + '" data-status-jump="' + g.filter.key + '"><span class="pj-status__dot" aria-hidden="true"></span>' + esc(g.filter.label) + '<span class="pj-chip__count">' + g.count + '</span></button></li>';
            }).join('') + '</ul>';
        PJ.applyCss($('pjStatusMix'));
    }

    /* ============================================
       TOOLTIP + TOAST
       ============================================ */
    function showTip(target) {
        var text = target.getAttribute('data-tip');
        if (!text) return;
        els.tooltip.textContent = text;
        els.tooltip.hidden = false;
        var rect = target.getBoundingClientRect();
        var tip = els.tooltip.getBoundingClientRect();
        var left = Math.max(8, Math.min(window.innerWidth - tip.width - 8, rect.left + rect.width / 2 - tip.width / 2));
        var top = rect.top - tip.height - 8;
        if (top < 8) top = rect.bottom + 8;
        els.tooltip.style.left = left + 'px';
        els.tooltip.style.top = top + 'px';
    }

    function hideTip() { els.tooltip.hidden = true; }

    var toastTimer = null;
    function toast(message) {
        els.toast.textContent = message;
        els.toast.hidden = false;
        els.toast.classList.add('is-visible');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () {
            els.toast.classList.remove('is-visible');
            setTimeout(function () { els.toast.hidden = true; }, 300);
        }, 1800);
    }

    /* ============================================
       DRAWER ↔ HISTORY
       ============================================ */
    function openProject(id) {
        if (!detail.open(id, visibleOrder())) return;
        history.pushState({ pjDrawer: true }, '', buildUrl(id));
    }

    function onDrawerClose() {
        if (closingFromHistory) return;
        if (history.state && history.state.pjDrawer) history.back();
        else replaceUrl();
    }

    window.addEventListener('popstate', function () {
        var id = readUrl();
        render();
        if (id) {
            detail.open(id, visibleOrder());
        } else if (detail.isOpen()) {
            closingFromHistory = true;
            detail.close();
            closingFromHistory = false;
        }
    });

    // Closes without history.back(): its async popstate would land after this update and undo it.
    function focusTech(name) {
        if (detail.isOpen()) {
            closingFromHistory = true;
            detail.close();
            closingFromHistory = false;
            history.replaceState(null, '', window.location.href);
        }
        update({ tech: name, status: 'all', kind: '', platform: '', q: '' });
        $('pj-projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /* ============================================
       EVENTS
       ============================================ */
    function bind() {
        var searchTimer = null;
        els.search.addEventListener('input', function () {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(function () { update({ q: els.search.value.trim() }); }, 120);
        });
        els.search.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && els.search.value) {
                e.stopPropagation();
                els.search.value = '';
                update({ q: '' });
            }
        });
        els.sort.addEventListener('change', function () { update({ sort: els.sort.value }); });
        els.reset.addEventListener('click', function () { update({ q: '', status: 'all', kind: '', platform: '', tech: '' }); });

        document.querySelector('.pj-segmented').addEventListener('click', function (e) {
            var btn = e.target.closest('[data-view]');
            if (btn) update({ view: btn.getAttribute('data-view') });
        });
        els.statusFilters.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-status-filter]');
            if (btn) update({ status: btn.getAttribute('data-status-filter') });
        });
        els.facetFilters.addEventListener('click', function (e) {
            var kind = e.target.closest('[data-kind]');
            if (kind) update({ kind: filters.kind === kind.getAttribute('data-kind') ? '' : kind.getAttribute('data-kind') });
            if (e.target.closest('[data-clear-tech]')) update({ tech: '' });
        });
        els.facetFilters.addEventListener('change', function (e) {
            if (e.target.id === 'pjPlatform') update({ platform: e.target.value });
        });

        document.addEventListener('click', function (e) {
            var jump = e.target.closest('[data-status-jump]');
            if (jump) {
                update({ status: jump.getAttribute('data-status-jump'), kind: '', platform: '', tech: '', q: '' });
                $('pj-projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }
            var tech = e.target.closest('[data-tech]');
            if (tech) { focusTech(tech.getAttribute('data-tech')); return; }
            var opener = e.target.closest('[data-open]');
            if (opener && !e.target.closest('a')) { openProject(opener.getAttribute('data-open')); return; }
            var cardEl = e.target.closest('.pj-card, .pj-bcard');
            if (cardEl && !e.target.closest('a, button') && !window.getSelection().toString()) openProject(cardEl.getAttribute('data-id'));
        });

        $('pjDrawerCopy').addEventListener('click', function () {
            var url = window.location.origin + buildUrl(detail.current()).replace(/[?&]?(view|sort|q|status|kind|platform|tech)=[^&]*/g, '');
            var finish = function () { toast('Link copied'); };
            if (navigator.clipboard) navigator.clipboard.writeText(url).then(finish, function () { toast(url); });
            else toast(url);
        });

        document.addEventListener('mouseover', function (e) {
            var target = e.target.closest('[data-tip]');
            if (target) showTip(target);
            else hideTip();
        });
        document.addEventListener('focusin', function (e) {
            var target = e.target.closest('[data-tip]');
            if (target) showTip(target);
            else hideTip();
        });
        window.addEventListener('scroll', hideTip, { passive: true });

        document.addEventListener('keydown', function (e) {
            if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey || detail.isOpen()) return;
            var tag = (e.target.tagName || '').toLowerCase();
            if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
            e.preventDefault();
            els.search.focus({ preventScroll: true });
            $('pjToolbar').scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    /* ============================================
       BOOT
       ============================================ */
    function showError(error) {
        els.view.setAttribute('aria-busy', 'false');
        els.view.innerHTML = '<p class="pj-error">Projects could not load — ' + esc(error.message) + '. Reload to try again.</p>';
    }

    PJ.load().then(function (loaded) {
        data = loaded;
        var initial = readUrl();
        detail.configure({
            context: data,
            onClose: onDrawerClose,
            onNavigate: function () { replaceUrl(); },
        });
        bind();
        renderHero();
        renderPulse();
        renderStack();
        render();
        if (initial && detail.open(initial, visibleOrder())) replaceUrl();
    }).catch(showError);
})();
