(function (App) {
    'use strict';

    var s = App.state;
    var MIN_TIME = 1;
    var MAX_TIME = 60;

    var DEFAULT_PHASES = [
        { id: 'intro', name: 'Introduction', time: 5, locked: true },
        { id: 'theory', name: 'Theory', time: 15, locked: false },
        { id: 'code', name: 'Code Questions', time: 10, locked: false },
        { id: 'live', name: 'Live Coding', time: 15, locked: false },
        { id: 'wrapup', name: 'Wrap-up', time: 5, locked: true },
    ];

    if (!s.phases || !s.phases.length) {
        s.phases = DEFAULT_PHASES.map(function (p) {
            return { id: p.id, name: p.name, time: p.time, locked: p.locked };
        });
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
    }

    var LOCK_SVG = '<svg class="plan__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>';
    var GRIP_SVG = '<svg class="plan__icon plan__icon--grip" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>';
    var UP_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
    var DOWN_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';

    App.renderPlan = function () {
        var dom = App.dom;
        var container = dom.planList;
        if (!container) return;
        container.innerHTML = '';

        s.phases.forEach(function (phase, i) {
            var el = document.createElement('div');
            el.className = 'plan__phase' + (phase.locked ? ' plan__phase--locked' : '');
            el.dataset.index = i;

            var leftIcon = phase.locked ? LOCK_SVG : GRIP_SVG;

            var moveHtml = '';
            if (!phase.locked) {
                var isFirst = (i === 1);
                var isLast = (i === s.phases.length - 2);
                moveHtml =
                    '<div class="plan__arrows">' +
                        '<button class="plan__arrow" data-dir="down"' + (isLast ? ' disabled' : '') + ' aria-label="Move down">' + DOWN_SVG + '</button>' +
                        '<button class="plan__arrow" data-dir="up"' + (isFirst ? ' disabled' : '') + ' aria-label="Move up">' + UP_SVG + '</button>' +
                    '</div>';
            }

            el.innerHTML =
                '<div class="plan__left">' +
                    leftIcon +
                    '<span class="plan__name">' + phase.name + '</span>' +
                '</div>' +
                '<div class="plan__right">' +
                    moveHtml +
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

    function bindPlanEvents() {
        var container = App.dom.planList;
        if (!container) return;

        container.addEventListener('click', function (e) {
            var arrow = e.target.closest('.plan__arrow');
            if (arrow && !arrow.disabled) {
                var idx = parseInt(arrow.closest('.plan__phase').dataset.index, 10);
                var dir = arrow.dataset.dir;
                if (dir === 'up' && idx > 1) {
                    var tmp = s.phases[idx];
                    s.phases[idx] = s.phases[idx - 1];
                    s.phases[idx - 1] = tmp;
                } else if (dir === 'down' && idx < s.phases.length - 2) {
                    var tmp = s.phases[idx];
                    s.phases[idx] = s.phases[idx + 1];
                    s.phases[idx + 1] = tmp;
                }
                App.renderPlan();
                return;
            }

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
            container.appendChild(el);
        });
    };

    App.updatePhaseIndicator = function () {
        var container = App.dom.qPhases;
        if (!container || s.interviewMode !== 'time') return;

        var totalSeconds = s.timeLimitMin * 60;
        var elapsed = totalSeconds - s.remainingSeconds;
        var cumulative = 0;
        var currentId = s.phases[s.phases.length - 1].id;

        for (var i = 0; i < s.phases.length; i++) {
            cumulative += s.phases[i].time * 60;
            if (elapsed < cumulative) {
                currentId = s.phases[i].id;
                break;
            }
        }

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

    App.initPlan = function () {
        App.renderPlan();
        bindPlanEvents();
    };

})(InterviewApp);
