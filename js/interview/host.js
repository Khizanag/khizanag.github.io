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
    //  PAGE MODE (from body data attribute)
    // ===========================================================

    var pageMode = document.body.dataset.hostMode || 'interview';

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
        if (dom.setupTitle) dom.setupTitle.textContent = s.practiceMode
            ? config.name + ' Practice'
            : config.name + ' Interview';
        if (dom.setupSubtitle) dom.setupSubtitle.textContent = config.subtitle;
        if (dom.setupIcon) dom.setupIcon.textContent = config.icon;

        renderTopicChips();
        selectAllTopics();
    }

    // ===========================================================
    //  VALIDATION
    // ===========================================================

    function updateStartButton() {
        var hasTopics = s.selectedTopics.length > 0;
        var hasNames = s.practiceMode ? true : (dom.nameInput && dom.nameInput.value.trim().length > 0);
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

        if (dom.planSection) dom.planSection.style.display = s.practiceMode ? 'none' : '';
        if (dom.candidateSection) dom.candidateSection.style.display = s.practiceMode ? 'none' : '';
        if (dom.liveActionsSection) dom.liveActionsSection.style.display = s.practiceMode ? 'none' : '';

        // In interview mode, guest must sign in
        if (!s.practiceMode && isGuest) {
            dom.hostContent.classList.remove('is-active');
            if (dom.hostSignin) dom.hostSignin.classList.add('is-active');
            return;
        }

        dom.hostContent.classList.add('is-active');
        if (dom.hostSignin) dom.hostSignin.classList.remove('is-active');
        updateStartButton();
    }

    // ===========================================================
    //  AUTH
    // ===========================================================

    function updateNavProfile(user) {
        var navUser = document.getElementById('navUser');
        var avatarEl = document.getElementById('navUserAvatar');
        var nameEl = document.getElementById('navUserName');
        if (!navUser) return;

        if (!user) {
            navUser.classList.remove('is-visible');
            return;
        }

        navUser.classList.add('is-visible');

        if (user.isAnonymous) {
            if (nameEl) nameEl.textContent = 'Guest';
            if (avatarEl) { avatarEl.textContent = '?'; avatarEl.classList.add('nav__user-avatar--placeholder'); }
            return;
        }

        if (nameEl) nameEl.textContent = user.displayName || user.email || '';
        if (avatarEl) {
            avatarEl.textContent = '';
            if (user.photoURL) {
                avatarEl.classList.remove('nav__user-avatar--placeholder');
                var img = document.createElement('img');
                img.src = user.photoURL;
                img.alt = 'Avatar';
                img.referrerPolicy = 'no-referrer';
                avatarEl.appendChild(img);
            } else {
                avatarEl.classList.add('nav__user-avatar--placeholder');
                avatarEl.textContent = (user.displayName || user.email || '?').charAt(0).toUpperCase();
            }
        }
    }

    function handleAuth(user) {
        currentUser = user;
        isGuest = !user || user.isAnonymous;

        updateNavProfile(user);

        if (user && !user.isAnonymous) {
            if (dom.interviewerName) dom.interviewerName.textContent = user.displayName || user.email || 'You';
            if (dom.interviewerSection) dom.interviewerSection.style.display = '';
            s.interviewerName = user.displayName || user.email || '';
        } else {
            if (dom.interviewerSection) dom.interviewerSection.style.display = 'none';
            s.interviewerName = s.practiceMode ? 'Self-Study' : '';
        }

        // In interview mode, guest must sign in
        if (!s.practiceMode && isGuest) {
            dom.hostContent.classList.remove('is-active');
            if (dom.hostSignin) dom.hostSignin.classList.add('is-active');
        } else {
            dom.hostContent.classList.add('is-active');
            if (dom.hostSignin) dom.hostSignin.classList.remove('is-active');
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
        if (dom.nameInput) {
            dom.nameInput.addEventListener('input', function () {
                s.intervieweeName = dom.nameInput.value.trim();
                updateStartButton();
            });
        }

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

        // Apply mode from body data attribute
        setMode(pageMode);

        // Fallback: if no Firebase, handle gracefully
        setTimeout(function () {
            if (!window.FirebaseService) {
                isGuest = true;
                if (s.practiceMode) {
                    dom.hostContent.classList.add('is-active');
                    if (dom.hostSignin) dom.hostSignin.classList.remove('is-active');
                } else {
                    // No Firebase and interview mode — show sign-in prompt
                    dom.hostContent.classList.remove('is-active');
                    if (dom.hostSignin) dom.hostSignin.classList.add('is-active');
                }
            }
        }, 3000);
    }

    bindEvents();
    init();

})(InterviewApp);
