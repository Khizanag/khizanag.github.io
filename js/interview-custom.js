(function (App) {
    'use strict';

    var STORAGE_KEY = 'interview-custom-questions';

    function loadCustom() {
        try { var raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; }
        catch (e) { return []; }
    }

    function saveCustom(arr) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); } catch (e) { /* */ }
    }

    function saveCustomToCloud(question) {
        if (window.FirebaseService) {
            window.FirebaseService.saveCustomQuestion(question);
        }
    }

    function deleteCustomFromCloud(questionId) {
        if (window.FirebaseService) {
            window.FirebaseService.deleteCustomQuestion(questionId);
        }
    }

    var escapeHtml = App.escapeHtml;

    // Inject custom questions into the active question bank
    function injectCustomQuestions() {
        var custom = loadCustom();
        if (custom.length === 0) return;

        var bank = App.getQuestionBank();
        // Remove previously injected custom questions
        for (var i = bank.length - 1; i >= 0; i--) {
            if (bank[i]._custom) bank.splice(i, 1);
        }
        // Add current custom questions for the active platform
        var platform = App.state.platform;
        for (var j = 0; j < custom.length; j++) {
            if (custom[j].platform === platform) {
                var q = {
                    topic: custom[j].topic,
                    level: custom[j].level,
                    question: custom[j].question,
                    hint: custom[j].hint || '',
                    answer: custom[j].answer || '',
                    _custom: true,
                };
                if (custom[j].code) q.code = custom[j].code;
                bank.push(q);
            }
        }
    }

    // Render the question list
    function renderList() {
        var custom = loadCustom();
        var platform = App.state.platform;
        var filtered = custom.filter(function (q) { return q.platform === platform; });

        var listEl = document.getElementById('customList');
        var emptyEl = document.getElementById('customEmpty');
        var countEl = document.getElementById('customCount');

        countEl.textContent = filtered.length + ' custom';

        if (filtered.length === 0) {
            listEl.style.display = 'none';
            emptyEl.style.display = '';
            return;
        }

        listEl.style.display = '';
        emptyEl.style.display = 'none';

        var html = '';
        for (var i = 0; i < filtered.length; i++) {
            var q = filtered[i];
            var topicLabel = App.TOPIC_LABELS[q.topic] || q.topic;
            var levelLabel = App.LEVEL_LABELS[q.level] || 'Intern';

            html += '<div class="custom__item" data-id="' + escapeHtml(q.id) + '">';
            html += '<div class="custom__item-body">';
            html += '<div class="custom__item-question">' + escapeHtml(q.question) + '</div>';
            html += '<div class="custom__item-meta">';
            html += '<span class="custom__item-tag">' + escapeHtml(topicLabel) + '</span>';
            html += '<span class="custom__item-tag">' + escapeHtml(levelLabel) + '</span>';
            html += '</div></div>';
            html += '<div class="custom__item-actions">';
            html += '<button class="custom__item-btn custom__item-btn--edit" data-id="' + escapeHtml(q.id) + '" title="Edit">';
            html += '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>';
            html += '</button>';
            html += '<button class="custom__item-btn custom__item-btn--delete" data-id="' + escapeHtml(q.id) + '" title="Delete">';
            html += '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>';
            html += '</button>';
            html += '</div></div>';
        }
        listEl.innerHTML = html;
    }

    function buildTopicOptions() {
        var topics = App.TOPIC_LABELS;
        var html = '';
        var keys = Object.keys(topics).sort(function (a, b) {
            return topics[a].localeCompare(topics[b]);
        });
        for (var i = 0; i < keys.length; i++) {
            html += '<option value="' + escapeHtml(keys[i]) + '">' + escapeHtml(topics[keys[i]]) + '</option>';
        }
        return html;
    }

    function openForm(existingId) {
        var modal = document.getElementById('customModal');
        var form = document.getElementById('customForm');
        var titleEl = document.getElementById('customModalTitle');
        var topicSelect = document.getElementById('cqTopic');
        var levelSelect = document.getElementById('cqLevel');

        topicSelect.innerHTML = buildTopicOptions();

        if (existingId) {
            titleEl.textContent = 'Edit Question';
            var custom = loadCustom();
            var item = custom.find(function (q) { return q.id === existingId; });
            if (item) {
                document.getElementById('cqQuestion').value = item.question;
                document.getElementById('cqHint').value = item.hint || '';
                document.getElementById('cqAnswer').value = item.answer || '';
                document.getElementById('cqCode').value = item.code || '';
                topicSelect.value = item.topic;
                levelSelect.value = item.level;
            }
            form.dataset.editId = existingId;
        } else {
            titleEl.textContent = 'Add Custom Question';
            document.getElementById('cqQuestion').value = '';
            document.getElementById('cqHint').value = '';
            document.getElementById('cqAnswer').value = '';
            document.getElementById('cqCode').value = '';
            levelSelect.value = '1';
            form.dataset.editId = '';
        }

        modal.style.display = '';
    }

    function closeForm() {
        document.getElementById('customModal').style.display = 'none';
    }

    function saveQuestion() {
        var question = document.getElementById('cqQuestion').value.trim();
        var hint = document.getElementById('cqHint').value.trim();
        var answer = document.getElementById('cqAnswer').value.trim();
        var code = document.getElementById('cqCode').value.trim();
        var topic = document.getElementById('cqTopic').value;
        var level = parseInt(document.getElementById('cqLevel').value, 10);

        if (!question) { alert('Question text is required.'); return; }
        if (!answer) { alert('Answer is required.'); return; }

        var custom = loadCustom();
        var editId = document.getElementById('customForm').dataset.editId;

        if (editId) {
            for (var i = 0; i < custom.length; i++) {
                if (custom[i].id === editId) {
                    custom[i].question = question;
                    custom[i].hint = hint;
                    custom[i].answer = answer;
                    custom[i].code = code;
                    custom[i].topic = topic;
                    custom[i].level = level;
                    saveCustomToCloud(custom[i]);
                    break;
                }
            }
        } else {
            var newQ = {
                id: 'cq-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6),
                platform: App.state.platform,
                topic: topic,
                level: level,
                question: question,
                hint: hint,
                answer: answer,
                code: code,
            };
            custom.push(newQ);
            saveCustomToCloud(newQ);
        }

        saveCustom(custom);
        injectCustomQuestions();
        renderList();
        closeForm();
    }

    function deleteQuestion(id) {
        if (!confirm('Delete this custom question?')) return;
        var custom = loadCustom();
        custom = custom.filter(function (q) { return q.id !== id; });
        saveCustom(custom);
        deleteCustomFromCloud(id);
        injectCustomQuestions();
        renderList();
    }

    function exportQuestions() {
        var custom = loadCustom();
        var platform = App.state.platform;
        var filtered = custom.filter(function (q) { return q.platform === platform; });
        var textarea = document.getElementById('customIOText');
        var ioArea = document.getElementById('customIOArea');
        textarea.value = JSON.stringify(filtered, null, 2);
        ioArea.classList.add('is-visible');
    }

    function importQuestions() {
        var textarea = document.getElementById('customIOText');
        var text = textarea.value.trim();
        if (!text) { alert('Paste JSON data to import.'); return; }

        try {
            var imported = JSON.parse(text);
            if (!Array.isArray(imported)) throw new Error('Expected array');

            var custom = loadCustom();
            var platform = App.state.platform;
            var added = 0;

            for (var i = 0; i < imported.length; i++) {
                var q = imported[i];
                if (!q.question || !q.topic) continue;
                custom.push({
                    id: 'cq-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6),
                    platform: q.platform || platform,
                    topic: q.topic,
                    level: q.level || 1,
                    question: q.question,
                    hint: q.hint || '',
                    answer: q.answer || '',
                    code: q.code || '',
                });
                added++;
            }

            saveCustom(custom);
            injectCustomQuestions();
            renderList();
            document.getElementById('customIOArea').classList.remove('is-visible');
            alert('Imported ' + added + ' question' + (added !== 1 ? 's' : '') + '.');
        } catch (e) {
            alert('Invalid JSON format. Please check the data.');
        }
    }

    function init() {
        // List interactions
        document.getElementById('customList').addEventListener('click', function (e) {
            var editBtn = e.target.closest('.custom__item-btn--edit');
            var deleteBtn = e.target.closest('.custom__item-btn--delete');
            if (editBtn) openForm(editBtn.dataset.id);
            if (deleteBtn) deleteQuestion(deleteBtn.dataset.id);
        });

        // Add new
        document.getElementById('customBtnAdd').addEventListener('click', function () { openForm(null); });
        document.getElementById('customEmptyAdd').addEventListener('click', function () { openForm(null); });

        // Form save/cancel
        document.getElementById('customBtnSave').addEventListener('click', saveQuestion);
        document.getElementById('customBtnCancel').addEventListener('click', closeForm);

        // Export/Import
        document.getElementById('customBtnExport').addEventListener('click', exportQuestions);
        document.getElementById('customBtnImport').addEventListener('click', importQuestions);
        document.getElementById('customBtnShowIO').addEventListener('click', function () {
            var ioArea = document.getElementById('customIOArea');
            ioArea.classList.toggle('is-visible');
            if (ioArea.classList.contains('is-visible')) {
                document.getElementById('customIOText').value = '';
                document.getElementById('customIOText').placeholder = 'Paste JSON here to import, or click Export to see current questions...';
            }
        });

        // Back
        document.getElementById('customBack').addEventListener('click', function () {
            App.showScreen('screen-setup');
        });

        // Open from setup
        document.getElementById('btnCustom').addEventListener('click', function () {
            injectCustomQuestions();
            renderList();
            App.showScreen('screen-custom');
        });

        // Escape
        document.addEventListener('keydown', function (e) {
            if (e.key !== 'Escape') return;
            var modal = document.getElementById('customModal');
            if (modal && modal.style.display !== 'none') { closeForm(); return; }
            var screen = document.getElementById('screen-custom');
            if (screen && screen.classList.contains('is-active')) App.showScreen('screen-setup');
        });

        // Inject custom questions on load
        injectCustomQuestions();
    }

    init();

})(InterviewApp);
