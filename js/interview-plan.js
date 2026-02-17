(function (App) {
    'use strict';

    var s = App.state;
    var MIN_TIME = 1;
    var MAX_TIME = 60;
    var PLAN_KEY = 'ios-interview-plan';

    var PHASE_DESCRIPTIONS = {
        intro: 'Warm up the conversation. Learn about the candidate\u2019s background, current role, career goals, and motivation for the position.',
        theory: 'Assess conceptual knowledge across selected topics. Questions adapt in difficulty based on previous answers.',
        code: 'Present code snippets and challenge the candidate to analyse, debug, or predict output. Tests practical reading skills.',
        live: 'Ask the candidate to write code on a shared screen or whiteboard. Evaluate problem-solving approach, not just the final answer.',
        wrapup: 'Summarise your impressions, answer the candidate\u2019s questions, and outline next steps in the hiring process.',
    };

    var DEFAULT_PHASES = [
        { id: 'intro', name: 'Introduction', time: 5, locked: true },
        { id: 'theory', name: 'Theory', time: 25, locked: false },
        { id: 'code', name: 'Code Questions', time: 10, locked: false },
        { id: 'live', name: 'Live Coding', time: 15, locked: false },
        { id: 'wrapup', name: 'Wrap-up', time: 5, locked: true },
    ];

    function loadCachedPlan() {
        try {
            var raw = localStorage.getItem(PLAN_KEY);
            if (!raw) return null;
            var data = JSON.parse(raw);
            if (!Array.isArray(data) || data.length === 0) return null;
            var valid = data.every(function (p) {
                return p && p.id && p.name && typeof p.time === 'number' && typeof p.locked === 'boolean';
            });
            return valid ? data : null;
        } catch (e) { return null; }
    }

    function savePlan() {
        try {
            localStorage.setItem(PLAN_KEY, JSON.stringify(s.phases));
        } catch (e) { /* localStorage unavailable */ }
    }

    if (!s.phases || !s.phases.length) {
        var cached = loadCachedPlan();
        if (cached) {
            s.phases = cached;
        } else {
            s.phases = DEFAULT_PHASES.map(function (p) {
                return { id: p.id, name: p.name, time: p.time, locked: p.locked };
            });
        }
    }

    function getPlanTotal() {
        return s.phases.reduce(function (sum, p) { return sum + p.time; }, 0);
    }

    function syncDuration() {
        s.timeLimitMin = getPlanTotal();
        var dom = App.dom;
        if (dom.planTotal) dom.planTotal.textContent = s.timeLimitMin + ' min';
        if (dom.timeSlider) dom.timeSlider.value = Math.min(s.timeLimitMin, 120);
        if (dom.timeDisplay) dom.timeDisplay.textContent = s.timeLimitMin + ' min';
        savePlan();
    }

    var LOCK_SVG = '<svg class="plan__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>';
    var GRIP_SVG = '<svg class="plan__icon plan__icon--grip" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>';

    App.renderPlan = function () {
        var dom = App.dom;
        var container = dom.planList;
        if (!container) return;
        container.innerHTML = '';

        s.phases.forEach(function (phase, i) {
            var el = document.createElement('div');
            el.className = 'plan__phase' + (phase.locked ? ' plan__phase--locked' : ' plan__phase--draggable');
            el.dataset.index = i;
            if (PHASE_DESCRIPTIONS[phase.id]) el.title = PHASE_DESCRIPTIONS[phase.id];

            var leftIcon = phase.locked ? LOCK_SVG : '<div class="plan__grip">' + GRIP_SVG + '</div>';

            el.innerHTML =
                '<div class="plan__left">' +
                    leftIcon +
                    '<span class="plan__name">' + phase.name + '</span>' +
                '</div>' +
                '<div class="plan__right">' +
                    '<div class="plan__time">' +
                        '<button class="plan__time-btn" data-action="minus" aria-label="Decrease time">\u2212</button>' +
                        '<span class="plan__time-value">' + phase.time + '</span>' +
                        '<button class="plan__time-btn" data-action="plus" aria-label="Increase time">+</button>' +
                        '<span class="plan__time-unit">min</span>' +
                    '</div>' +
                '</div>';

            container.appendChild(el);
        });

        syncDuration();
    };

    // ---- Drag and drop ----

    var dragState = null;

    function getPhaseElements() {
        return Array.prototype.slice.call(App.dom.planList.querySelectorAll('.plan__phase'));
    }

    function getClientY(e) {
        if (e.touches && e.touches.length) return e.touches[0].clientY;
        return e.clientY;
    }

    function onDragStart(e) {
        var grip = e.target.closest('.plan__grip');
        if (!grip) return;

        var phaseEl = grip.closest('.plan__phase');
        if (!phaseEl || phaseEl.classList.contains('plan__phase--locked')) return;

        e.preventDefault();

        var container = App.dom.planList;
        var rect = phaseEl.getBoundingClientRect();
        var containerRect = container.getBoundingClientRect();

        dragState = {
            index: parseInt(phaseEl.dataset.index, 10),
            startY: getClientY(e),
            offsetY: getClientY(e) - rect.top,
            phaseEl: phaseEl,
            placeholder: null,
            clone: null,
            containerTop: containerRect.top,
        };

        // Create a floating clone
        var clone = phaseEl.cloneNode(true);
        clone.className = 'plan__phase plan__phase--ghost';
        clone.style.position = 'fixed';
        clone.style.left = rect.left + 'px';
        clone.style.top = rect.top + 'px';
        clone.style.width = rect.width + 'px';
        clone.style.zIndex = '1000';
        clone.style.pointerEvents = 'none';
        document.body.appendChild(clone);
        dragState.clone = clone;

        // Mark the original as placeholder
        phaseEl.classList.add('plan__phase--placeholder');
        dragState.placeholder = phaseEl;

        document.addEventListener('mousemove', onDragMove);
        document.addEventListener('mouseup', onDragEnd);
        document.addEventListener('touchmove', onDragMove, { passive: false });
        document.addEventListener('touchend', onDragEnd);
    }

    function onDragMove(e) {
        if (!dragState) return;
        e.preventDefault();

        var clientY = getClientY(e);
        dragState.clone.style.top = (clientY - dragState.offsetY) + 'px';

        // Determine which phase we're hovering over
        var phases = getPhaseElements();
        var targetIndex = dragState.index;

        for (var i = 0; i < phases.length; i++) {
            var phase = phases[i];
            if (phase.classList.contains('plan__phase--locked')) continue;
            var rect = phase.getBoundingClientRect();
            var midY = rect.top + rect.height / 2;
            if (clientY < midY) {
                targetIndex = parseInt(phase.dataset.index, 10);
                break;
            }
            targetIndex = parseInt(phase.dataset.index, 10) + 1;
        }

        // Clamp: can't go before index 1 or after last movable
        var minIdx = 1;
        var maxIdx = s.phases.length - 1;
        if (targetIndex < minIdx) targetIndex = minIdx;
        if (targetIndex > maxIdx) targetIndex = maxIdx;

        if (targetIndex !== dragState.index) {
            // Move in data
            var item = s.phases.splice(dragState.index, 1)[0];
            s.phases.splice(targetIndex, 0, item);
            dragState.index = targetIndex;

            // Re-render the list (but keep our ghost)
            renderDuringDrag(targetIndex);
        }
    }

    function renderDuringDrag(activeIndex) {
        var container = App.dom.planList;
        container.innerHTML = '';

        s.phases.forEach(function (phase, i) {
            var el = document.createElement('div');
            el.className = 'plan__phase' + (phase.locked ? ' plan__phase--locked' : ' plan__phase--draggable');
            if (i === activeIndex) el.classList.add('plan__phase--placeholder');
            el.dataset.index = i;
            if (PHASE_DESCRIPTIONS[phase.id]) el.title = PHASE_DESCRIPTIONS[phase.id];

            var leftIcon = phase.locked ? LOCK_SVG : '<div class="plan__grip">' + GRIP_SVG + '</div>';

            el.innerHTML =
                '<div class="plan__left">' +
                    leftIcon +
                    '<span class="plan__name">' + phase.name + '</span>' +
                '</div>' +
                '<div class="plan__right">' +
                    '<div class="plan__time">' +
                        '<button class="plan__time-btn" data-action="minus" aria-label="Decrease time">\u2212</button>' +
                        '<span class="plan__time-value">' + phase.time + '</span>' +
                        '<button class="plan__time-btn" data-action="plus" aria-label="Increase time">+</button>' +
                        '<span class="plan__time-unit">min</span>' +
                    '</div>' +
                '</div>';

            container.appendChild(el);
        });

        syncDuration();
    }

    function onDragEnd(e) {
        if (!dragState) return;

        document.removeEventListener('mousemove', onDragMove);
        document.removeEventListener('mouseup', onDragEnd);
        document.removeEventListener('touchmove', onDragMove);
        document.removeEventListener('touchend', onDragEnd);

        if (dragState.clone && dragState.clone.parentNode) {
            dragState.clone.parentNode.removeChild(dragState.clone);
        }

        dragState = null;
        App.renderPlan();
    }

    // ---- Event binding ----

    function bindPlanEvents() {
        var container = App.dom.planList;
        if (!container) return;

        // Time +/- buttons
        container.addEventListener('click', function (e) {
            var timeBtn = e.target.closest('.plan__time-btn');
            if (timeBtn) {
                var idx = parseInt(timeBtn.closest('.plan__phase').dataset.index, 10);
                var phase = s.phases[idx];
                if (timeBtn.dataset.action === 'minus' && phase.time > MIN_TIME) {
                    phase.time--;
                } else if (timeBtn.dataset.action === 'plus' && phase.time < MAX_TIME) {
                    phase.time++;
                }
                App.renderPlan();
            }
        });

        // Drag start (mouse + touch)
        container.addEventListener('mousedown', onDragStart);
        container.addEventListener('touchstart', onDragStart, { passive: false });
    }

    // ---- Phase indicator for question screen ----

    App.renderPhaseIndicator = function () {
        var container = App.dom.qPhases;
        if (!container) return;
        container.innerHTML = '';

        if (s.interviewMode !== 'time') {
            container.style.display = 'none';
            return;
        }
        container.style.display = '';

        s.phases.forEach(function (phase) {
            var el = document.createElement('div');
            el.className = 'q-phases__item';
            el.dataset.phaseId = phase.id;
            el.textContent = phase.name;
            if (PHASE_DESCRIPTIONS[phase.id]) el.title = PHASE_DESCRIPTIONS[phase.id];
            container.appendChild(el);
        });
    };

    App.getCurrentPhaseId = function () {
        if (s.interviewMode !== 'time' || !s.phases) return null;
        var totalSeconds = s.timeLimitMin * 60;
        var elapsed = totalSeconds - s.remainingSeconds;
        var cumulative = 0;

        for (var i = 0; i < s.phases.length; i++) {
            cumulative += s.phases[i].time * 60;
            if (elapsed < cumulative) return s.phases[i].id;
        }
        return s.phases[s.phases.length - 1].id;
    };

    App.updatePhaseIndicator = function () {
        var container = App.dom.qPhases;
        if (!container || s.interviewMode !== 'time') return;

        var currentId = App.getCurrentPhaseId();

        var items = container.querySelectorAll('.q-phases__item');
        var found = false;
        for (var j = 0; j < items.length; j++) {
            if (items[j].dataset.phaseId === currentId) {
                items[j].className = 'q-phases__item is-active';
                found = true;
            } else if (!found) {
                items[j].className = 'q-phases__item is-done';
            } else {
                items[j].className = 'q-phases__item';
            }
        }
    };

    App.skipToNextPhase = function () {
        if (s.interviewMode !== 'time' || !s.phases) return;
        var totalSeconds = s.timeLimitMin * 60;
        var elapsed = totalSeconds - s.remainingSeconds;
        var cumulative = 0;

        for (var i = 0; i < s.phases.length; i++) {
            cumulative += s.phases[i].time * 60;
            if (elapsed < cumulative) {
                // Skip to the start of the next phase
                if (i < s.phases.length - 1) {
                    s.remainingSeconds = totalSeconds - cumulative;
                    App.dom.timerText.textContent = App.formatTime(s.remainingSeconds);
                    App.updatePhaseIndicator();
                    App.saveSession();
                }
                return;
            }
        }
    };

    App.isLastPhase = function () {
        var currentId = App.getCurrentPhaseId();
        return currentId === s.phases[s.phases.length - 1].id;
    };

    App.initPlan = function () {
        App.renderPlan();
        bindPlanEvents();
    };

})(InterviewApp);
