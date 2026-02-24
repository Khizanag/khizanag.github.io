(function (App) {
    'use strict';

    var s = App.state;
    var currentUser = null;
    var isGuest = true;

    // Ensure escapeHtml is available for templates module
    if (!App.escapeHtml && InterviewUtils.escapeHtml) {
        App.escapeHtml = InterviewUtils.escapeHtml;
    }

    // DOM refs
    var dom = {
        hostContent: document.getElementById('host-content'),
        hostSignin: document.getElementById('host-signin'),
        setupTitle: document.getElementById('setupTitle'),
        setupSubtitle: document.getElementById('setupSubtitle'),
        setupIcon: document.getElementById('setupIcon'),
        interviewerSection: document.getElementById('interviewerSection'),
        interviewerName: document.getElementById('interviewerDisplayName'),
        candidateSection: document.getElementById('candidateSection'),
        nameInput: document.getElementById('nameInput'),
        topicGrid: document.getElementById('topicGrid'),
        topicFoldBody: document.getElementById('topicFoldBody'),
        topicSummary: document.getElementById('topicSummary'),
        btnFoldTopics: document.getElementById('btnFoldTopics'),
        btnToggleAll: document.getElementById('btnToggleAll'),
        btnModeInterview: document.getElementById('btnModeInterview'),
        btnModePractice: document.getElementById('btnModePractice'),
        planSection: document.getElementById('planSection'),
        planList: document.getElementById('planList'),
        planTotal: document.getElementById('planTotal'),
        btnStart: document.getElementById('btnStart'),
        validationHint: document.getElementById('validationHint'),
        liveActionsSection: document.getElementById('liveActionsSection'),
        hostNavTitle: document.getElementById('hostNavTitle'),
    };

    // Sync App.dom refs needed by plan and templates modules
    App.dom.topicGrid = dom.topicGrid;
    App.dom.planList = dom.planList;
    App.dom.planTotal = dom.planTotal;
    App.dom.btnToggleAll = dom.btnToggleAll;

    var allChips = [];

    // ===========================================================
    //  URL PARAMS
    // ===========================================================

    var params = new URLSearchParams(window.location.search);
    var presetMode = params.get('mode');

    // ===========================================================
    //  PLATFORM / TOPICS
    // ===========================================================

    function renderTopicChips() {
        var topics = App.TOPIC_LABELS;
        var html = '';
        var keys = Object.keys(topics).sort(function (a, b) {
            return topics[a].localeCompare(topics[b]);
        });
        for (var i = 0; i < keys.length; i++) {
            html += '<button class="topic-chip" data-topic="' + keys[i] + '">' + topics[keys[i]] + '</button>';
        }
        dom.topicGrid.innerHTML = html;
        allChips = Array.prototype.slice.call(dom.topicGrid.querySelectorAll('.topic-chip'));
    }

    // Expose for templates module
    App.renderTopicChips = renderTopicChips;

    function selectAllTopics() {
        s.selectedTopics = [];
        allChips.forEach(function (c) {
            c.classList.add('is-selected');
            s.selectedTopics.push(c.dataset.topic);
        });
        updateStartButton();
    }

    function updateTopicSummary() {
        var total = allChips.length;
        var count = s.selectedTopics.length;
        if (count === total) {
            dom.topicSummary.textContent = 'All ' + total + ' topics';
        } else if (count === 0) {
            dom.topicSummary.textContent = 'None selected';
        } else {
            dom.topicSummary.textContent = count + ' of ' + total + ' topics';
        }
    }

    function switchPlatform(platformId) {
        App.switchPlatform(platformId);
        s.platform = platformId;

        var btns = document.querySelectorAll('.platform-selector__btn');
        for (var i = 0; i < btns.length; i++) {
            var isActive = btns[i].dataset.platform === platformId;
            btns[i].classList.toggle('is-active', isActive);
            btns[i].setAttribute('aria-checked', isActive ? 'true' : 'false');
        }

        var config = App.getPlatformConfig();
        if (dom.setupTitle) dom.setupTitle.textContent = config.name + ' Interview';
        if (dom.setupSubtitle) dom.setupSubtitle.textContent = config.subtitle;
        if (dom.setupIcon) dom.setupIcon.textContent = config.icon;

        if (dom.hostNavTitle) {
            dom.hostNavTitle.textContent = s.practiceMode ? 'Self-Study Practice' : 'Host Interview';
        }

        renderTopicChips();
        selectAllTopics();
    }

    // ===========================================================
    //  VALIDATION
    // ===========================================================

    function updateStartButton() {
        var hasTopics = s.selectedTopics.length > 0;
        var hasNames = s.practiceMode ? true : (dom.nameInput.value.trim().length > 0);
        var allSelected = allChips.length > 0 && s.selectedTopics.length === allChips.length;

        dom.btnStart.disabled = !(hasTopics && hasNames);
        var btnCreateLive = document.getElementById('btnCreateLive');
        if (btnCreateLive) btnCreateLive.disabled = !(hasTopics && hasNames);
        if (dom.btnToggleAll) dom.btnToggleAll.textContent = allSelected ? 'Clear All' : 'Select All';
        updateTopicSummary();

        if (!hasNames && !s.practiceMode) {
            dom.validationHint.textContent = 'Enter candidate name to begin';
        } else if (!hasTopics) {
            dom.validationHint.textContent = 'Select at least one topic to begin';
        } else {
            dom.validationHint.textContent = s.selectedTopics.length + ' topic' + (s.selectedTopics.length > 1 ? 's' : '') + ' selected';
        }
    }

    // Expose for templates module
    App.updateUI = updateStartButton;

    // ===========================================================
    //  MODE TOGGLE
    // ===========================================================

    function setMode(mode) {
        s.practiceMode = mode === 'practice';
        dom.btnModeInterview.classList.toggle('is-active', !s.practiceMode);
        dom.btnModePractice.classList.toggle('is-active', s.practiceMode);
        dom.btnModeInterview.setAttribute('aria-checked', !s.practiceMode ? 'true' : 'false');
        dom.btnModePractice.setAttribute('aria-checked', s.practiceMode ? 'true' : 'false');

        dom.planSection.style.display = s.practiceMode ? 'none' : '';
        dom.candidateSection.style.display = s.practiceMode ? 'none' : '';
        if (dom.liveActionsSection) dom.liveActionsSection.style.display = s.practiceMode ? 'none' : '';

        if (dom.hostNavTitle) {
            dom.hostNavTitle.textContent = s.practiceMode ? 'Self-Study Practice' : 'Host Interview';
        }

        // In interview mode, guest must sign in
        if (!s.practiceMode && isGuest) {
            dom.hostContent.classList.remove('is-active');
            dom.hostSignin.classList.add('is-active');
            return;
        }

        dom.hostContent.classList.add('is-active');
        dom.hostSignin.classList.remove('is-active');
        updateStartButton();
    }

    // ===========================================================
    //  AUTH
    // ===========================================================

    function handleAuth(user) {
        currentUser = user;
        isGuest = !user || user.isAnonymous;

        if (user && !user.isAnonymous) {
            dom.interviewerName.textContent = user.displayName || user.email || 'You';
            dom.interviewerSection.style.display = '';
            s.interviewerName = user.displayName || user.email || '';
        } else {
            dom.interviewerSection.style.display = 'none';
            s.interviewerName = isGuest ? 'Self-Study' : '';
        }

        // If guest tries interview mode, show sign-in prompt
        if (!s.practiceMode && isGuest) {
            dom.hostContent.classList.remove('is-active');
            dom.hostSignin.classList.add('is-active');
        } else {
            dom.hostContent.classList.add('is-active');
            dom.hostSignin.classList.remove('is-active');
        }
    }

    document.addEventListener('firebase:authchange', function (e) {
        var user = e.detail.user;
        handleAuth(user);
        App.applyFeatureFlags();
    });

    // ===========================================================
    //  EVENT BINDINGS
    // ===========================================================

    function bindEvents() {
        // Mode toggle
        dom.btnModeInterview.addEventListener('click', function () { setMode('interview'); });
        dom.btnModePractice.addEventListener('click', function () { setMode('practice'); });

        // Platform selector
        var platformSelector = document.getElementById('platformSelector');
        if (platformSelector) {
            platformSelector.addEventListener('click', function (e) {
                var btn = e.target.closest('.platform-selector__btn');
                if (!btn || !btn.dataset.platform) return;
                switchPlatform(btn.dataset.platform);
            });
        }

        // Candidate name
        dom.nameInput.addEventListener('input', function () {
            s.intervieweeName = dom.nameInput.value.trim();
            updateStartButton();
        });

        // Topic fold
        dom.btnFoldTopics.addEventListener('click', function () {
            dom.btnFoldTopics.classList.toggle('is-open');
            dom.topicFoldBody.classList.toggle('is-open');
        });

        // Topic selection
        dom.topicGrid.addEventListener('click', function (e) {
            var chip = e.target.closest('.topic-chip');
            if (!chip) return;
            chip.classList.toggle('is-selected');
            if (chip.classList.contains('is-selected')) {
                s.selectedTopics.push(chip.dataset.topic);
            } else {
                s.selectedTopics = s.selectedTopics.filter(function (t) { return t !== chip.dataset.topic; });
            }
            updateStartButton();
        });

        // Select All / Clear All
        dom.btnToggleAll.addEventListener('click', function () {
            var allSelected = s.selectedTopics.length === allChips.length;
            if (allSelected) {
                s.selectedTopics = [];
                allChips.forEach(function (c) { c.classList.remove('is-selected'); });
            } else {
                selectAllTopics();
            }
            updateStartButton();
        });

        // Start button — save to sessionStorage and redirect
        dom.btnStart.addEventListener('click', function () {
            if (dom.btnStart.disabled) return;

            var config = {
                platform: s.platform,
                selectedTopics: s.selectedTopics,
                candidateName: s.practiceMode ? '' : dom.nameInput.value.trim(),
                interviewerName: s.practiceMode ? 'Self-Study' : s.interviewerName,
                practiceMode: s.practiceMode,
                phases: s.phases,
                timeLimitMin: s.timeLimitMin || 60,
            };

            try {
                sessionStorage.setItem('ios-interview-pending-session', JSON.stringify(config));
            } catch (e) { /* */ }

            window.location.href = 'interview.html?session=pending';
        });
    }

    // ===========================================================
    //  INIT
    // ===========================================================

    function init() {
        // Restore saved platform
        var savedPlatform;
        try { savedPlatform = localStorage.getItem(App.PLATFORM_KEY); } catch (e) { /* */ }
        switchPlatform(savedPlatform && App.PLATFORMS[savedPlatform] ? savedPlatform : 'ios');

        selectAllTopics();

        // Init plan module
        App.initPlan();

        // Apply feature flags
        App.applyFeatureFlags();

        // Apply preset mode from URL
        if (presetMode === 'practice') {
            setMode('practice');
        }

        // Fallback: if no Firebase, allow self-study mode
        setTimeout(function () {
            if (!window.FirebaseService) {
                isGuest = true;
                if (s.practiceMode) {
                    dom.hostContent.classList.add('is-active');
                    dom.hostSignin.classList.remove('is-active');
                } else {
                    // No Firebase and interview mode — switch to practice
                    setMode('practice');
                }
            }
        }, 3000);
    }

    bindEvents();
    init();

})(InterviewApp);
