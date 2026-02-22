(function () {
    'use strict';

    var U = InterviewUtils;

    // ---- Constants (embedded to avoid loading full config) ----

    var HISTORY_KEY = 'ios-interview-history';

    var LEVEL_LABELS = ['Intern', 'Junior', 'Middle', 'Senior', 'Lead', 'Staff'];
    var LEVEL_EMOJIS = ['\u{1F331}', '\u{1F680}', '\u26A1', '\u{1F48E}', '\u{1F451}', '\u{1F3C6}'];
    var LEVEL_COLORS = ['#5ac8fa', '#30d158', '#ff9f0a', '#bf5af2', '#ff375f', '#ffd60a'];
    var LEVEL_DESCS = [
        'Starting the journey \u2014 strong foundations are being built.',
        'Growing fast \u2014 solid grasp of fundamentals, ready for more responsibility.',
        'Reliable contributor \u2014 handles complex tasks independently.',
        'Expert practitioner \u2014 drives technical decisions and mentors others.',
        'Technical leader \u2014 shapes architecture and enables teams at scale.',
        'Elite engineer \u2014 defines industry standards and solves the hardest problems.',
    ];

    var ALL_TOPIC_LABELS = {
        'swift': 'Swift Language', 'swiftui': 'SwiftUI', 'observation': 'Observation Framework',
        'uikit': 'UIKit', 'combine': 'Combine', 'concurrency': 'Concurrency',
        'architecture': 'Architecture & Patterns', 'di': 'Dependency Injection',
        'testing': 'Unit Testing', 'ui-testing': 'UI Testing', 'snapshot-testing': 'Snapshot Testing',
        'swiftdata': 'SwiftData', 'coredata': 'Core Data', 'persistence': 'Data Persistence',
        'memory': 'Memory Management', 'networking': 'Networking', 'performance': 'Performance',
        'lifecycle': 'App Lifecycle', 'security': 'Security', 'accessibility': 'Accessibility',
        'cicd': 'CI/CD & Tools', 'system-design': 'System Design',
        'code-challenge': 'Code Challenges', 'live-coding': 'Live Coding',
        'kotlin': 'Kotlin Language', 'jetpack-compose': 'Jetpack Compose',
        'android-lifecycle': 'Android Lifecycle', 'android-arch': 'Architecture Patterns',
        'coroutines': 'Kotlin Coroutines', 'android-storage': 'Data Storage',
        'android-networking': 'Networking', 'android-testing': 'Testing',
        'android-performance': 'Performance', 'android-security': 'Security',
        'javascript': 'JavaScript', 'typescript': 'TypeScript', 'react': 'React',
        'css': 'CSS & Styling', 'html-web': 'HTML & Web APIs',
        'fe-performance': 'Performance', 'fe-testing': 'Testing',
        'fe-architecture': 'Architecture', 'fe-security': 'Security',
        'fe-tooling': 'Build Tools & DevOps',
        'api-design': 'API Design', 'databases': 'Databases', 'be-auth': 'Auth & Authorization',
        'caching': 'Caching', 'messaging': 'Message Queues', 'be-system-design': 'System Design',
        'be-security': 'Security', 'be-testing': 'Testing', 'devops': 'DevOps & Infra',
        'be-performance': 'Performance',
        'leadership': 'Leadership & Influence', 'teamwork': 'Teamwork & Collaboration',
        'problem-solving': 'Problem Solving', 'communication': 'Communication',
        'growth': 'Growth & Learning', 'culture': 'Culture & Values',
    };

    // ---- Helpers ----

    var escapeHtml = U.escapeHtml;
    var ratingColor = U.ratingColor;

    function topicLabel(key) {
        return ALL_TOPIC_LABELS[key] || key;
    }

    // ---- Data loading ----

    var allEntries = [];

    function loadFromLocalStorage() {
        var arr = U.storageGet(HISTORY_KEY, []);
        return Array.isArray(arr) ? arr : [];
    }

    function saveToLocalStorage(entries) {
        U.storageSet(HISTORY_KEY, entries);
    }

    function mergeEntries(local, cloud) {
        var map = {};
        local.forEach(function (e) { map[e.id] = e; });
        cloud.forEach(function (e) { map[e.id || e._docId] = e; });
        return Object.keys(map).map(function (k) { return map[k]; });
    }

    function loadData() {
        allEntries = loadFromLocalStorage();
        applyFilters();

        if (window.FirebaseService && window.FirebaseService.currentUser) {
            loadFromCloud();
        }
    }

    function loadFromCloud() {
        if (!window.FirebaseService || !window.FirebaseService.isCloudAvailable()) return;
        window.FirebaseService.loadHistory().then(function (cloud) {
            if (cloud && cloud.length) {
                allEntries = mergeEntries(allEntries, cloud);
                saveToLocalStorage(allEntries);
                applyFilters();
            }
        }).catch(function (e) {
            U.logError('history-page:loadFromCloud', e);
        });
    }

    // ---- DOM references ----

    var dom = {};

    function cacheDom() {
        dom.grid = document.getElementById('hpGrid');
        dom.empty = document.getElementById('hpEmpty');
        dom.search = document.getElementById('hpSearch');
        dom.sort = document.getElementById('hpSort');
        dom.filterLevel = document.getElementById('hpFilterLevel');
        dom.statTotal = document.getElementById('statTotal');
        dom.statAvg = document.getElementById('statAvg');
        dom.statBestLevel = document.getElementById('statBestLevel');
        dom.statQuestions = document.getElementById('statQuestions');
        dom.modal = document.getElementById('hpModal');
        dom.modalTitle = document.getElementById('hpModalTitle');
        dom.modalDate = document.getElementById('hpModalDate');
        dom.modalBody = document.getElementById('hpModalBody');
        dom.modalClose = document.getElementById('hpModalClose');
        dom.modalDone = document.getElementById('hpModalDone');
        dom.modalDelete = document.getElementById('hpModalDelete');
    }

    // ---- Stats ----

    function renderStats(entries) {
        dom.statTotal.textContent = entries.length;

        if (entries.length === 0) {
            dom.statAvg.textContent = '\u2014';
            dom.statBestLevel.textContent = '\u2014';
            dom.statQuestions.textContent = '0';
            return;
        }

        var totalAvg = 0;
        var totalQ = 0;
        var bestLevel = 0;

        entries.forEach(function (e) {
            totalAvg += e.avg;
            totalQ += (e.ratedCount || 0) + (e.skippedCount || 0);
            if (e.levelIndex > bestLevel) bestLevel = e.levelIndex;
        });

        dom.statAvg.textContent = (totalAvg / entries.length).toFixed(1);
        dom.statBestLevel.textContent = LEVEL_EMOJIS[bestLevel] + ' ' + LEVEL_LABELS[bestLevel];
        dom.statQuestions.textContent = totalQ;
    }

    // ---- Rendering ----

    function renderCards(entries) {
        if (entries.length === 0) {
            dom.grid.innerHTML = '';
            dom.grid.style.display = 'none';
            dom.empty.style.display = '';
            return;
        }

        dom.empty.style.display = 'none';
        dom.grid.style.display = '';

        var html = '';
        entries.forEach(function (entry, idx) {
            var dateStr = U.formatDate(entry.date);

            var levelLabel = LEVEL_LABELS[entry.levelIndex] || 'N/A';
            var levelEmoji = LEVEL_EMOJIS[entry.levelIndex] || '';
            var levelColor = LEVEL_COLORS[entry.levelIndex] || '#86868b';
            var pct = Math.round((entry.avg / 5) * 100);
            var barColor = ratingColor(entry.avg);

            html += '<div class="hp-card" data-idx="' + idx + '">';
            html += '<div class="hp-card__header">';
            html += '<div class="hp-card__info">';
            html += '<span class="hp-card__name">' + escapeHtml(entry.intervieweeName || 'Unnamed') + '</span>';
            html += '<div class="hp-card__meta">';
            html += '<span>' + escapeHtml(dateStr) + '</span>';
            if (entry.interviewerName) {
                html += '<span class="hp-card__interviewer">';
                html += '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
                html += escapeHtml(entry.interviewerName);
                html += '</span>';
            }
            html += '<span>' + (entry.ratedCount || 0) + 'q';
            if (entry.skippedCount > 0) html += ' +' + entry.skippedCount + ' skipped';
            html += '</span>';
            html += '</div></div>';
            html += '<span class="hp-card__level" style="color:' + levelColor + ';background:' + levelColor + '15;border:1px solid ' + levelColor + '30">' + levelEmoji + ' ' + escapeHtml(levelLabel) + '</span>';
            html += '</div>';

            html += '<div class="hp-card__body">';
            html += '<div class="hp-card__rating">';
            html += '<div class="hp-card__rating-bar"><div class="hp-card__rating-fill" style="width:' + pct + '%;background:' + barColor + '"></div></div>';
            html += '<span class="hp-card__rating-text">' + entry.avg.toFixed(1) + '/5</span>';
            html += '</div>';
            html += '</div>';

            if (entry.topics && entry.topics.length > 0) {
                html += '<div class="hp-card__topics">';
                entry.topics.forEach(function (t) {
                    html += '<span class="hp-card__topic-chip">' + escapeHtml(topicLabel(t.topic)) + '</span>';
                });
                html += '</div>';
            }

            if ((entry.introNotes && entry.introNotes.trim()) || (entry.wrapupNotes && entry.wrapupNotes.trim())) {
                html += '<div class="hp-card__notes-indicator">';
                html += '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>';
                html += 'Has notes';
                html += '</div>';
            }

            html += '</div>';
        });

        dom.grid.innerHTML = html;
    }

    // ---- Filtering & Sorting ----

    var currentFiltered = [];

    function applyFilters() {
        var searchTerm = dom.search ? dom.search.value.toLowerCase().trim() : '';
        var sortBy = dom.sort ? dom.sort.value : 'date-desc';
        var levelFilter = dom.filterLevel ? dom.filterLevel.value : 'all';

        var filtered = allEntries.slice();

        if (searchTerm) {
            filtered = filtered.filter(function (e) {
                var name = (e.intervieweeName || '').toLowerCase();
                var interviewer = (e.interviewerName || '').toLowerCase();
                return name.indexOf(searchTerm) !== -1 || interviewer.indexOf(searchTerm) !== -1;
            });
        }

        if (levelFilter !== 'all') {
            var lvl = parseInt(levelFilter, 10);
            filtered = filtered.filter(function (e) { return e.levelIndex === lvl; });
        }

        var parts = sortBy.split('-');
        var field = parts[0];
        var dir = parts[1];

        filtered.sort(function (a, b) {
            var va, vb;
            if (field === 'date') {
                va = new Date(a.date).getTime();
                vb = new Date(b.date).getTime();
            } else if (field === 'rating') {
                va = a.avg;
                vb = b.avg;
            } else if (field === 'name') {
                va = (a.intervieweeName || '').toLowerCase();
                vb = (b.intervieweeName || '').toLowerCase();
                return dir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
            }
            return dir === 'asc' ? va - vb : vb - va;
        });

        currentFiltered = filtered;
        renderStats(filtered);
        renderCards(filtered);
    }

    // ---- Detail Modal ----

    var currentDetailEntry = null;

    function openDetail(entry) {
        currentDetailEntry = entry;

        dom.modalTitle.textContent = entry.intervieweeName || 'Unnamed';
        dom.modalDate.textContent = U.formatDateLong(entry.date);

        var levelLabel = LEVEL_LABELS[entry.levelIndex] || 'N/A';
        var levelEmoji = LEVEL_EMOJIS[entry.levelIndex] || '';
        var levelColor = LEVEL_COLORS[entry.levelIndex] || '#86868b';
        var levelDesc = LEVEL_DESCS[entry.levelIndex] || '';
        var pct = Math.round((entry.avg / 5) * 100);
        var barColor = ratingColor(entry.avg);

        var html = '';

        if (entry.interviewerName) {
            html += '<div class="hp-detail-row">';
            html += '<span class="hp-detail-label">Interviewer</span>';
            html += '<span class="hp-detail-value">' + escapeHtml(entry.interviewerName) + '</span>';
            html += '</div>';
        }

        html += '<div class="hp-detail-row" style="flex-direction:column;align-items:flex-start;gap:6px">';
        html += '<span class="hp-detail-label">Assessment Level</span>';
        html += '<span class="hp-detail-level" style="color:' + levelColor + ';background:' + levelColor + '15;border:1px solid ' + levelColor + '30">' + levelEmoji + ' ' + escapeHtml(levelLabel) + '</span>';
        html += '<span class="hp-detail-level-desc">' + escapeHtml(levelDesc) + '</span>';
        html += '</div>';

        html += '<div class="hp-detail-row">';
        html += '<span class="hp-detail-label">Average Rating</span>';
        html += '<div class="hp-detail-rating">';
        html += '<div class="hp-detail-rating-bar"><div class="hp-detail-rating-fill" style="width:' + pct + '%;background:' + barColor + '"></div></div>';
        html += '<span class="hp-detail-rating-text" style="color:' + barColor + '">' + entry.avg.toFixed(2) + '/5</span>';
        html += '</div>';
        html += '</div>';

        html += '<div class="hp-detail-row">';
        html += '<span class="hp-detail-label">Questions Rated</span>';
        html += '<span class="hp-detail-value">' + (entry.ratedCount || 0) + '</span>';
        html += '</div>';

        if (entry.skippedCount > 0) {
            html += '<div class="hp-detail-row">';
            html += '<span class="hp-detail-label">Questions Skipped</span>';
            html += '<span class="hp-detail-value" style="color:var(--color-orange)">' + entry.skippedCount + '</span>';
            html += '</div>';
        }

        if (entry.topics && entry.topics.length > 0) {
            html += '<div class="hp-detail-section-title">Topic Breakdown</div>';
            html += '<table class="hp-topic-table">';
            html += '<thead><tr><th>Topic</th><th>Avg</th><th>Questions</th></tr></thead>';
            html += '<tbody>';
            entry.topics.forEach(function (t) {
                var tPct = Math.round((t.avg / 5) * 100);
                var tColor = ratingColor(t.avg);
                html += '<tr>';
                html += '<td>' + escapeHtml(topicLabel(t.topic)) + '</td>';
                html += '<td><span class="hp-topic-bar-wrap"><span class="hp-topic-bar-fill" style="width:' + tPct + '%;background:' + tColor + '"></span></span>' + t.avg.toFixed(1) + '</td>';
                html += '<td>' + t.count + '</td>';
                html += '</tr>';
            });
            html += '</tbody></table>';
        }

        if (entry.introNotes && entry.introNotes.trim()) {
            html += '<div class="hp-detail-section-title">Intro Notes</div>';
            html += '<div class="hp-detail-notes">' + escapeHtml(entry.introNotes) + '</div>';
        }
        if (entry.wrapupNotes && entry.wrapupNotes.trim()) {
            html += '<div class="hp-detail-section-title">Wrap-up Notes</div>';
            html += '<div class="hp-detail-notes">' + escapeHtml(entry.wrapupNotes) + '</div>';
        }

        dom.modalBody.innerHTML = html;
        dom.modal.style.display = '';
        document.body.style.overflow = 'hidden';
    }

    function closeDetail() {
        dom.modal.style.display = 'none';
        document.body.style.overflow = '';
        currentDetailEntry = null;
    }

    function deleteEntry() {
        if (!currentDetailEntry) return;
        if (!confirm('Delete this interview record? This cannot be undone.')) return;

        var id = currentDetailEntry.id;

        allEntries = allEntries.filter(function (e) { return e.id !== id; });
        saveToLocalStorage(allEntries);

        if (window.FirebaseService) {
            window.FirebaseService.deleteHistoryEntry(id);
        }

        closeDetail();
        applyFilters();
    }

    // ---- Export ----

    function exportJSON() {
        var data = JSON.stringify(currentFiltered, null, 2);
        downloadFile(data, 'interview-history.json', 'application/json');
    }

    function exportCSV() {
        var rows = [['Date', 'Interviewee', 'Interviewer', 'Avg Rating', 'Level', 'Questions', 'Skipped', 'Topics']];
        currentFiltered.forEach(function (e) {
            var topics = (e.topics || []).map(function (t) { return topicLabel(t.topic); }).join('; ');
            rows.push([
                e.date,
                e.intervieweeName || '',
                e.interviewerName || '',
                e.avg.toFixed(2),
                LEVEL_LABELS[e.levelIndex] || '',
                String(e.ratedCount || 0),
                String(e.skippedCount || 0),
                topics,
            ]);
        });
        var csv = rows.map(function (row) {
            return row.map(function (cell) {
                return '"' + String(cell).replace(/"/g, '""') + '"';
            }).join(',');
        }).join('\n');
        downloadFile(csv, 'interview-history.csv', 'text/csv');
    }

    function downloadFile(content, filename, mimeType) {
        var blob = new Blob([content], { type: mimeType });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // ---- Event binding ----

    function bindEvents() {
        dom.search.addEventListener('input', U.debounce(applyFilters, 200));
        dom.sort.addEventListener('change', applyFilters);
        dom.filterLevel.addEventListener('change', applyFilters);

        dom.grid.addEventListener('click', function (e) {
            var card = e.target.closest('.hp-card');
            if (!card) return;
            var idx = parseInt(card.dataset.idx, 10);
            if (idx >= 0 && idx < currentFiltered.length) {
                openDetail(currentFiltered[idx]);
            }
        });

        dom.modalClose.addEventListener('click', closeDetail);
        dom.modalDone.addEventListener('click', closeDetail);
        dom.modalDelete.addEventListener('click', deleteEntry);

        dom.modal.addEventListener('click', function (e) {
            if (e.target === dom.modal) closeDetail();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && dom.modal.style.display !== 'none') {
                closeDetail();
            }
        });

        document.addEventListener('firebase:authchange', function () {
            loadFromCloud();
        });

        var btnExportJSON = document.getElementById('hpExportJSON');
        var btnExportCSV = document.getElementById('hpExportCSV');
        if (btnExportJSON) btnExportJSON.addEventListener('click', exportJSON);
        if (btnExportCSV) btnExportCSV.addEventListener('click', exportCSV);
    }

    // ---- Init ----

    function init() {
        cacheDom();
        U.initThemeToggle('btnTheme');
        bindEvents();
        loadData();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
