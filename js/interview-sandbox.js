(function (App) {
    'use strict';

    var currentProblem = null;
    var hintsRevealed = 0;
    var solutionVisible = false;
    var timerInterval = null;
    var timerStart = null;
    var selectedLanguage = 'javascript';

    var LANGUAGES = {
        javascript: { name: 'JavaScript', executable: true, template: '// Write your JavaScript solution here\n\nfunction solve() {\n    \n}\n' },
        typescript: { name: 'TypeScript', executable: false, template: '// Write your TypeScript solution here\n// (execution not available — compare with reference solution)\n\nfunction solve(): void {\n    \n}\n' },
        swift:      { name: 'Swift', executable: false, template: '// Write your Swift solution here\n// (execution not available — compare with reference solution)\n\nfunc solve() {\n    \n}\n' },
        kotlin:     { name: 'Kotlin', executable: false, template: '// Write your Kotlin solution here\n// (execution not available — compare with reference solution)\n\nfun solve() {\n    \n}\n' },
        python:     { name: 'Python', executable: false, template: '# Write your Python solution here\n# (execution not available — compare with reference solution)\n\ndef solve():\n    pass\n' },
    };

    function escapeHtml(text) {
        return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function getBank() {
        return typeof LIVE_CODING_BANK !== 'undefined' ? LIVE_CODING_BANK : [];
    }

    function updateLanguageStatus() {
        var lang = LANGUAGES[selectedLanguage];
        var statusEl = document.getElementById('sbLangStatus');
        var runBtn = document.getElementById('sbRunBtn');
        if (lang.executable) {
            statusEl.textContent = 'Execution available';
            statusEl.className = 'sandbox__lang-status sandbox__lang-status--available';
            runBtn.disabled = false;
            runBtn.title = '';
        } else {
            statusEl.textContent = 'Execution not available — compare with solution';
            statusEl.className = 'sandbox__lang-status sandbox__lang-status--unavailable';
            runBtn.disabled = false;
            runBtn.title = 'Will show a note about execution availability';
        }
    }

    function populateSelector() {
        var bank = getBank();
        var select = document.getElementById('sbProblemSelect');
        select.innerHTML = '<option value="">Choose a problem...</option>';

        // Group by difficulty
        var groups = { easy: [], medium: [], hard: [], expert: [] };
        for (var i = 0; i < bank.length; i++) {
            var d = bank[i].difficulty || 'medium';
            if (!groups[d]) groups[d] = [];
            groups[d].push({ index: i, title: bank[i].title, topic: bank[i].topic });
        }

        var order = ['easy', 'medium', 'hard', 'expert'];
        var labels = { easy: 'Easy', medium: 'Medium', hard: 'Hard', expert: 'Expert' };
        for (var g = 0; g < order.length; g++) {
            var key = order[g];
            if (!groups[key] || groups[key].length === 0) continue;
            var optgroup = document.createElement('optgroup');
            optgroup.label = labels[key] + ' (' + groups[key].length + ')';
            for (var j = 0; j < groups[key].length; j++) {
                var opt = document.createElement('option');
                opt.value = groups[key][j].index;
                opt.textContent = groups[key][j].title;
                optgroup.appendChild(opt);
            }
            select.appendChild(optgroup);
        }
    }

    function loadProblem(index) {
        var bank = getBank();
        if (index < 0 || index >= bank.length) return;

        currentProblem = bank[index];
        hintsRevealed = 0;
        solutionVisible = false;

        // Title & difficulty
        document.getElementById('sbProblemTitle').textContent = currentProblem.title;
        var badge = document.getElementById('sbDiffBadge');
        badge.textContent = currentProblem.difficulty;
        badge.className = 'sandbox__problem-badge sandbox__problem-badge--' + currentProblem.difficulty;

        var topicBadge = document.getElementById('sbTopicBadge');
        topicBadge.textContent = currentProblem.topic.replace(/-/g, ' ');

        // Description
        document.getElementById('sbProblemDesc').textContent = currentProblem.question;

        // Hints — each hint gets its own button + card pair
        var hintsArea = document.getElementById('sbHints');
        hintsArea.innerHTML = '';
        for (var i = 0; i < currentProblem.hints.length; i++) {
            var hintGroup = document.createElement('div');
            hintGroup.className = 'sandbox__hint-group';
            hintGroup.dataset.index = i;

            var btn = document.createElement('button');
            btn.className = 'sandbox__hint-btn';
            btn.textContent = 'Hint ' + (i + 1);
            btn.dataset.index = i;
            hintGroup.appendChild(btn);

            var card = document.createElement('div');
            card.className = 'sandbox__hint-card';
            card.textContent = currentProblem.hints[i];
            hintGroup.appendChild(card);

            hintsArea.appendChild(hintGroup);
        }

        // Editor — provide starter template based on selected language
        var editor = document.getElementById('sbEditor');
        var lang = LANGUAGES[selectedLanguage];
        editor.value = lang ? lang.template : LANGUAGES.javascript.template;

        // Clear output
        var output = document.getElementById('sbOutput');
        output.textContent = 'Output will appear here...';
        output.className = 'sandbox__output';

        // Hide solution
        document.getElementById('sbSolution').classList.remove('is-visible');

        // Show problem area
        document.getElementById('sbProblemArea').classList.add('is-active');

        // Start timer
        startTimer();

        // Sync dropdown
        document.getElementById('sbProblemSelect').value = index;
    }

    function randomProblem() {
        var bank = getBank();
        if (bank.length === 0) return;
        var idx = Math.floor(Math.random() * bank.length);
        loadProblem(idx);
    }

    function revealHint(index) {
        if (!currentProblem) return;
        hintsRevealed = Math.max(hintsRevealed, index + 1);

        // Show each hint group up to the revealed count
        var groups = document.querySelectorAll('#sbHints .sandbox__hint-group');
        for (var i = 0; i < groups.length; i++) {
            var btn = groups[i].querySelector('.sandbox__hint-btn');
            var card = groups[i].querySelector('.sandbox__hint-card');
            if (i < hintsRevealed) {
                btn.classList.add('is-revealed');
                card.classList.add('is-visible');
            } else {
                btn.classList.remove('is-revealed');
                card.classList.remove('is-visible');
            }
        }
    }

    function runCode() {
        if (!currentProblem) return;

        var code = document.getElementById('sbEditor').value;
        var output = document.getElementById('sbOutput');
        var lang = LANGUAGES[selectedLanguage];

        if (lang && lang.executable) {
            // Actually execute JavaScript
            var originalLog = console.log;
            try {
                var logs = [];
                console.log = function () {
                    var args = Array.prototype.slice.call(arguments);
                    logs.push(args.map(function (a) {
                        if (typeof a === 'object') return JSON.stringify(a, null, 2);
                        return String(a);
                    }).join(' '));
                    originalLog.apply(console, arguments);
                };

                var result = new Function(code + '\nif(typeof solve === "function") return solve();')();
                console.log = originalLog;

                var out = '';
                if (logs.length > 0) out += logs.join('\n');
                if (result !== undefined) {
                    if (out) out += '\n';
                    out += '=> ' + (typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result));
                }
                if (!out) out = '(no output)';

                output.textContent = out;
                output.className = 'sandbox__output';
            } catch (e) {
                console.log = originalLog;
                output.textContent = 'Error: ' + e.message;
                output.className = 'sandbox__output sandbox__output--error';
            }
        } else {
            var langName = lang ? lang.name : selectedLanguage;
            output.textContent = langName + ' execution is not available in the browser.\n\n' +
                'You can still write your solution here, then toggle the reference solution below to compare your approach.\n\n' +
                'Tip: Only JavaScript can be executed directly. For other languages, use this as a scratchpad.';
            output.className = 'sandbox__output sandbox__output--error';
        }
    }

    function resetEditor() {
        if (currentProblem) {
            loadProblem(getBank().indexOf(currentProblem));
        }
    }

    function showSolution() {
        if (!currentProblem) return;
        solutionVisible = !solutionVisible;
        var section = document.getElementById('sbSolution');
        section.classList.toggle('is-visible', solutionVisible);

        if (solutionVisible) {
            // Complexity
            document.getElementById('sbComplexity').innerHTML =
                '<span class="lc-complexity-pill lc-complexity-pill--time">' +
                    '<span class="lc-complexity-pill__label">Time</span> ' + escapeHtml(currentProblem.timeComplexity) +
                '</span>' +
                '<span class="lc-complexity-pill lc-complexity-pill--space">' +
                    '<span class="lc-complexity-pill__label">Space</span> ' + escapeHtml(currentProblem.spaceComplexity) +
                '</span>';

            // Code
            document.getElementById('sbSolutionCode').innerHTML = App.highlightSwift(currentProblem.solution);

            // Explanation
            document.getElementById('sbExplanation').textContent = currentProblem.explanation;
        }
    }

    // Timer
    function startTimer() {
        stopTimer();
        timerStart = Date.now();
        var el = document.getElementById('sbTimer');
        el.textContent = '0:00';
        timerInterval = setInterval(function () {
            if (!timerStart) return;
            var sec = Math.floor((Date.now() - timerStart) / 1000);
            var m = Math.floor(sec / 60);
            var ss = sec % 60;
            el.textContent = m + ':' + (ss < 10 ? '0' : '') + ss;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    function init() {
        // Back button
        document.getElementById('sbBack').addEventListener('click', function () {
            stopTimer();
            App.showScreen('screen-setup');
        });

        // Open from setup
        document.getElementById('btnSandbox').addEventListener('click', function () {
            populateSelector();
            document.getElementById('sbProblemArea').classList.remove('is-active');
            // Default language based on platform
            var platformLangMap = { ios: 'swift', android: 'kotlin', frontend: 'javascript', backend: 'javascript', behavioral: 'javascript' };
            selectedLanguage = platformLangMap[App.state.platform] || 'javascript';
            document.getElementById('sbLangSelect').value = selectedLanguage;
            updateLanguageStatus();
            App.showScreen('screen-sandbox');
        });

        // Language selector
        document.getElementById('sbLangSelect').addEventListener('change', function () {
            selectedLanguage = this.value;
            updateLanguageStatus();
            // Update editor template if problem is loaded
            if (currentProblem) {
                var editor = document.getElementById('sbEditor');
                var lang = LANGUAGES[selectedLanguage];
                editor.value = lang ? lang.template : LANGUAGES.javascript.template;
                var output = document.getElementById('sbOutput');
                output.textContent = 'Output will appear here...';
                output.className = 'sandbox__output';
            }
        });

        // Problem selector
        document.getElementById('sbProblemSelect').addEventListener('change', function () {
            var idx = parseInt(this.value, 10);
            if (!isNaN(idx)) loadProblem(idx);
        });

        // Random problem
        document.getElementById('sbRandomBtn').addEventListener('click', randomProblem);

        // Hints (delegated)
        document.getElementById('sbHints').addEventListener('click', function (e) {
            var btn = e.target.closest('.sandbox__hint-btn');
            if (!btn) return;
            revealHint(parseInt(btn.dataset.index, 10));
        });

        // Run code
        document.getElementById('sbRunBtn').addEventListener('click', runCode);

        // Reset
        document.getElementById('sbResetBtn').addEventListener('click', resetEditor);

        // Show solution
        document.getElementById('sbSolutionBtn').addEventListener('click', showSolution);

        // Tab key inserts spaces in editor
        document.getElementById('sbEditor').addEventListener('keydown', function (e) {
            if (e.key === 'Tab') {
                e.preventDefault();
                var start = this.selectionStart;
                var end = this.selectionEnd;
                this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + 4;
            }
            // Ctrl/Cmd + Enter to run
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                runCode();
            }
        });

        // Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key !== 'Escape') return;
            var screen = document.getElementById('screen-sandbox');
            if (screen && screen.classList.contains('is-active')) {
                stopTimer();
                App.showScreen('screen-setup');
            }
        });
    }

    init();

})(InterviewApp);
