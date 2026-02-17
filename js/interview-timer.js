(function (App) {
    'use strict';

    var s = App.state;

    App.formatTime = function (seconds) {
        var m = Math.floor(seconds / 60);
        var sec = seconds % 60;
        return m + ':' + (sec < 10 ? '0' : '') + sec;
    };

    // Announce to screen readers at key timer milestones
    var announcedMilestones = {};

    function announceTimer(seconds) {
        var milestones = [300, 120, 60, 30];
        var labels = { 300: '5 minutes remaining', 120: '2 minutes remaining', 60: '1 minute remaining', 30: '30 seconds remaining' };
        for (var i = 0; i < milestones.length; i++) {
            var m = milestones[i];
            if (seconds === m && !announcedMilestones[m]) {
                announcedMilestones[m] = true;
                App.announce(labels[m]);
                break;
            }
        }
    }

    App.onTimerTick = function () {
        var dom = App.dom;
        s.remainingSeconds--;

        if (s.remainingSeconds <= 0) {
            s.remainingSeconds = 0;
            s.timerExpired = true;
            clearInterval(s.timerInterval);
            s.timerInterval = null;
            dom.timerText.textContent = '0:00';
            dom.progressFill.style.width = '100%';
            dom.qTimer.classList.remove('is-warning');
            dom.qTimer.classList.add('is-danger');
            App.announce('Time is up.');
            App.saveSession();

            // Show expiry modal
            var modal = document.getElementById('modalTimeUp');
            var text = document.getElementById('timeUpText');
            if (s.currentRating > 0) {
                text.textContent = 'The interview timer has expired. Include the current rating (' + s.currentRating + '/5) in results?';
            } else {
                text.textContent = 'The interview timer has expired. The current question has no rating and will be discarded.';
                document.getElementById('btnTimeUpInclude').style.display = 'none';
            }
            modal.style.display = '';
            return;
        }

        dom.timerText.textContent = App.formatTime(s.remainingSeconds);
        announceTimer(s.remainingSeconds);

        var totalSeconds = s.timeLimitMin * 60;
        var elapsed = totalSeconds - s.remainingSeconds;
        dom.progressFill.style.width = Math.min((elapsed / totalSeconds) * 100, 100) + '%';

        if (s.remainingSeconds <= totalSeconds * 0.2 && s.remainingSeconds > 60) {
            dom.qTimer.classList.add('is-warning');
            dom.qTimer.classList.remove('is-danger');
        } else if (s.remainingSeconds <= 60) {
            dom.qTimer.classList.remove('is-warning');
            dom.qTimer.classList.add('is-danger');
        }

        App.updatePhaseIndicator();
        if (App.updatePhaseUI) App.updatePhaseUI();
        App.saveSession();
    };

    App.startTimer = function () {
        var dom = App.dom;
        s.remainingSeconds = s.timeLimitMin * 60;
        s.timerExpired = false;
        announcedMilestones = {};
        dom.qTimer.style.display = '';
        dom.qTimer.classList.remove('is-warning', 'is-danger');
        dom.timerText.textContent = App.formatTime(s.remainingSeconds);
        s.timerInterval = setInterval(App.onTimerTick, 1000);
    };

    App.resumeTimer = function () {
        var dom = App.dom;
        s.timerExpired = s.remainingSeconds <= 0;
        dom.qTimer.style.display = '';
        dom.qTimer.classList.remove('is-warning', 'is-danger');
        dom.timerText.textContent = App.formatTime(s.remainingSeconds);

        if (s.timerExpired) {
            dom.qTimer.classList.add('is-danger');
            dom.timerText.textContent = '0:00';
            dom.progressFill.style.width = '100%';
            dom.btnNext.textContent = 'See Results';
            return;
        }

        var totalSeconds = s.timeLimitMin * 60;
        if (s.remainingSeconds <= 60) {
            dom.qTimer.classList.add('is-danger');
        } else if (s.remainingSeconds <= totalSeconds * 0.2) {
            dom.qTimer.classList.add('is-warning');
        }

        s.timerInterval = setInterval(App.onTimerTick, 1000);
    };

    App.stopTimer = function () {
        if (s.timerInterval) {
            clearInterval(s.timerInterval);
            s.timerInterval = null;
        }
    };

    App.pauseTimer = function () {
        if (s.timerPaused || s.timerExpired) return;
        s.timerPaused = true;
        App.stopTimer();
        App.dom.qTimer.classList.add('is-paused');
        App.saveSession();
    };

    App.continueTimer = function () {
        if (!s.timerPaused || s.timerExpired) return;
        s.timerPaused = false;
        App.dom.qTimer.classList.remove('is-paused');
        s.timerInterval = setInterval(App.onTimerTick, 1000);
        App.saveSession();
    };

    App.togglePause = function () {
        if (s.timerPaused) {
            App.continueTimer();
        } else {
            App.pauseTimer();
        }
    };

})(InterviewApp);
