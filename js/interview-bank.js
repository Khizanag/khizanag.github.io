(function (App) {
    'use strict';

    var FAVORITES_KEY = 'ios-interview-favorites';
    var BLACKLIST_KEY = 'ios-interview-blacklist';
    var PAGE_SIZE = 30;

    var bankState = {
        query: '',
        topics: [],
        levels: [],
        status: 'all',
        sort: 'topic-asc',
        filtered: [],
        displayed: 0,
    };

    function loadSet(key) {
        try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : []; }
        catch (e) { return []; }
    }

    function questionId(q) {
        return q.topic + '::' + q.question.substring(0, 80);
    }

    function escapeHtml(text) {
        return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function getAllTopics() {
        var topics = {};
        for (var i = 0; i < QUESTION_BANK.length; i++) {
            topics[QUESTION_BANK[i].topic] = true;
        }
        var keys = Object.keys(topics);
        keys.sort(function (a, b) {
            var la = App.TOPIC_LABELS[a] || a;
            var lb = App.TOPIC_LABELS[b] || b;
            return la.localeCompare(lb);
        });
        return keys;
    }

    function filterQuestions() {
        var favorites = loadSet(FAVORITES_KEY);
        var blacklist = loadSet(BLACKLIST_KEY);
        var query = bankState.query.toLowerCase();
        var topics = bankState.topics;
        var levels = bankState.levels;
        var status = bankState.status;

        var results = [];
        for (var i = 0; i < QUESTION_BANK.length; i++) {
            var q = QUESTION_BANK[i];
            var qid = questionId(q);

            if (topics.length > 0 && topics.indexOf(q.topic) === -1) continue;
            if (levels.length > 0 && levels.indexOf(q.level) === -1) continue;

            if (status === 'favorites' && favorites.indexOf(qid) === -1) continue;
            if (status === 'blacklisted' && blacklist.indexOf(qid) === -1) continue;

            if (query) {
                var qText = q.question.toLowerCase();
                var hText = (q.hint || '').toLowerCase();
                var aText = (q.answer || '').toLowerCase();
                var tLabel = (App.TOPIC_LABELS[q.topic] || q.topic).toLowerCase();
                if (qText.indexOf(query) === -1 &&
                    hText.indexOf(query) === -1 &&
                    aText.indexOf(query) === -1 &&
                    tLabel.indexOf(query) === -1) continue;
            }

            results.push(q);
        }

        var sort = bankState.sort;
        results.sort(function (a, b) {
            if (sort === 'topic-asc') {
                var ta = App.TOPIC_LABELS[a.topic] || a.topic;
                var tb = App.TOPIC_LABELS[b.topic] || b.topic;
                var cmp = ta.localeCompare(tb);
                return cmp !== 0 ? cmp : a.level - b.level;
            }
            if (sort === 'level-asc') return a.level - b.level || (App.TOPIC_LABELS[a.topic] || '').localeCompare(App.TOPIC_LABELS[b.topic] || '');
            if (sort === 'level-desc') return b.level - a.level || (App.TOPIC_LABELS[a.topic] || '').localeCompare(App.TOPIC_LABELS[b.topic] || '');
            return 0;
        });

        bankState.filtered = results;
        bankState.displayed = 0;
    }

    function renderBankItem(q) {
        var qid = questionId(q);
        var favorites = loadSet(FAVORITES_KEY);
        var blacklist = loadSet(BLACKLIST_KEY);
        var isFav = favorites.indexOf(qid) !== -1;
        var isBlocked = blacklist.indexOf(qid) !== -1;
        var levelName = App.LEVEL_NAMES[q.level] || 'intern';
        var levelLabel = App.LEVEL_LABELS[q.level] || 'Intern';
        var topicLabel = App.TOPIC_LABELS[q.topic] || q.topic;
        var isCodeChallenge = q.topic === 'code-challenge';

        var html = '<div class="bank__item" data-qid="' + escapeHtml(qid) + '">';
        html += '<div class="bank__item-header">';
        html += '<div class="bank__item-body">';
        html += '<div class="bank__item-meta">';
        html += '<span class="bank__item-topic">' + escapeHtml(isCodeChallenge ? 'Code Challenge' : topicLabel) + '</span>';
        html += '<span class="bank__item-level bank__item-level--' + levelName + '">' + escapeHtml(levelLabel) + '</span>';
        if (isFav) html += '<span class="bank__item-topic" style="background:var(--color-pink-a12);color:var(--color-pink);">\u2665</span>';
        if (isBlocked) html += '<span class="bank__item-topic" style="background:var(--color-red-a8);color:var(--color-red);">\u2298</span>';
        html += '</div>';
        html += '<div class="bank__item-question">' + escapeHtml(q.question) + '</div>';
        html += '</div>';
        html += '<svg class="bank__item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
        html += '</div>';

        html += '<div class="bank__item-detail"><div class="bank__item-detail-inner"><div class="bank__item-detail-content">';

        if (q.hint) {
            html += '<div class="bank__detail-section">';
            html += '<div class="bank__detail-label">Hint</div>';
            html += '<div class="bank__detail-text bank__detail-text--hint">' + escapeHtml(q.hint) + '</div>';
            html += '</div>';
        }

        html += '<div class="bank__detail-section">';
        html += '<div class="bank__detail-label">Answer</div>';
        html += '<div class="bank__detail-text bank__detail-text--answer">' + escapeHtml(q.answer) + '</div>';
        html += '</div>';

        if (q.code) {
            html += '<div class="bank__detail-section">';
            html += '<div class="bank__detail-label">Code</div>';
            html += '<div class="bank__detail-code"><pre class="q-card__pre"><code>' + App.highlightSwift(q.code) + '</code></pre></div>';
            html += '</div>';
        }

        html += '</div></div></div>';
        html += '</div>';

        return html;
    }

    function renderPage() {
        var list = document.getElementById('bankList');
        var end = Math.min(bankState.displayed + PAGE_SIZE, bankState.filtered.length);
        var fragment = '';

        for (var i = bankState.displayed; i < end; i++) {
            fragment += renderBankItem(bankState.filtered[i]);
        }

        if (bankState.displayed === 0) {
            list.innerHTML = fragment;
        } else {
            list.insertAdjacentHTML('beforeend', fragment);
        }

        bankState.displayed = end;

        var loadMore = document.getElementById('bankLoadMore');
        if (bankState.displayed >= bankState.filtered.length) {
            loadMore.style.display = 'none';
        } else {
            loadMore.style.display = '';
            var remaining = bankState.filtered.length - bankState.displayed;
            document.getElementById('bankLoadBtn').textContent = 'Show More (' + remaining + ' remaining)';
        }

        updateCount();
        updateEmptyState();
    }

    function renderFresh() {
        filterQuestions();
        renderPage();
    }

    function updateCount() {
        var el = document.getElementById('bankCount');
        el.innerHTML = '<strong>' + bankState.filtered.length + '</strong> of ' + QUESTION_BANK.length + ' questions';
    }

    function updateEmptyState() {
        var list = document.getElementById('bankList');
        var empty = document.getElementById('bankEmpty');
        if (bankState.filtered.length === 0) {
            list.style.display = 'none';
            empty.style.display = '';
        } else {
            list.style.display = '';
            empty.style.display = 'none';
        }
    }

    function buildTopicFilters() {
        var container = document.getElementById('bankTopicPills');
        var topics = getAllTopics();
        var html = '';
        for (var i = 0; i < topics.length; i++) {
            var t = topics[i];
            var label = App.TOPIC_LABELS[t] || t;
            html += '<button class="bank__pill" data-topic="' + escapeHtml(t) + '">' + escapeHtml(label) + '</button>';
        }
        container.innerHTML = html;
    }

    var debounceTimer = null;

    function init() {
        buildTopicFilters();

        var searchInput = document.getElementById('bankSearch');
        var clearBtn = document.getElementById('bankSearchClear');

        searchInput.addEventListener('input', function () {
            bankState.query = searchInput.value.trim();
            clearBtn.classList.toggle('is-visible', bankState.query.length > 0);
            if (debounceTimer) clearTimeout(debounceTimer);
            debounceTimer = setTimeout(renderFresh, 200);
        });

        clearBtn.addEventListener('click', function () {
            searchInput.value = '';
            bankState.query = '';
            clearBtn.classList.remove('is-visible');
            renderFresh();
            searchInput.focus();
        });

        // Topic filter
        document.getElementById('bankTopicPills').addEventListener('click', function (e) {
            var pill = e.target.closest('.bank__pill');
            if (!pill) return;
            var topic = pill.dataset.topic;
            pill.classList.toggle('is-active');
            var idx = bankState.topics.indexOf(topic);
            if (idx === -1) bankState.topics.push(topic);
            else bankState.topics.splice(idx, 1);
            renderFresh();
        });

        // Level filter
        document.getElementById('bankLevelPills').addEventListener('click', function (e) {
            var pill = e.target.closest('.bank__pill');
            if (!pill) return;
            var level = parseInt(pill.dataset.level, 10);
            pill.classList.toggle('is-active');
            var idx = bankState.levels.indexOf(level);
            if (idx === -1) bankState.levels.push(level);
            else bankState.levels.splice(idx, 1);
            renderFresh();
        });

        // Status filter
        document.getElementById('bankStatusPills').addEventListener('click', function (e) {
            var pill = e.target.closest('.bank__pill');
            if (!pill) return;
            var status = pill.dataset.status;
            var pills = document.getElementById('bankStatusPills').querySelectorAll('.bank__pill');
            for (var i = 0; i < pills.length; i++) pills[i].classList.remove('is-active');
            if (bankState.status === status) {
                bankState.status = 'all';
            } else {
                bankState.status = status;
                pill.classList.add('is-active');
            }
            renderFresh();
        });

        // Sort
        document.getElementById('bankSort').addEventListener('change', function () {
            bankState.sort = this.value;
            renderFresh();
        });

        // Expand/collapse items
        document.getElementById('bankList').addEventListener('click', function (e) {
            var header = e.target.closest('.bank__item-header');
            if (!header) return;
            var item = header.closest('.bank__item');
            item.classList.toggle('is-open');
        });

        // Load more
        document.getElementById('bankLoadBtn').addEventListener('click', function () {
            renderPage();
        });

        // Back button
        document.getElementById('bankBack').addEventListener('click', function () {
            App.showScreen('screen-setup');
        });

        // Browse button from setup
        document.getElementById('btnBrowse').addEventListener('click', function () {
            bankState.query = '';
            bankState.topics = [];
            bankState.levels = [];
            bankState.status = 'all';
            bankState.sort = 'topic-asc';

            searchInput.value = '';
            clearBtn.classList.remove('is-visible');
            document.getElementById('bankSort').value = 'topic-asc';
            var allPills = document.querySelectorAll('#screen-bank .bank__pill');
            for (var i = 0; i < allPills.length; i++) allPills[i].classList.remove('is-active');

            renderFresh();
            App.showScreen('screen-bank');
        });

        // Keyboard shortcut: Escape goes back
        document.addEventListener('keydown', function (e) {
            if (e.key !== 'Escape') return;
            var screen = document.getElementById('screen-bank');
            if (screen && screen.classList.contains('is-active')) {
                if (e.target === searchInput) {
                    searchInput.blur();
                } else {
                    App.showScreen('screen-setup');
                }
            }
        });
    }

    init();
    renderFresh();

})(InterviewApp);
