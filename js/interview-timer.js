(function (App) {
    'use strict';

    var s = App.state;

    App.formatTime = function (seconds) {
        var m = Math.floor(seconds / 60);
        var sec = seconds % 60;
        return m + ':' + (sec < 10 ? '0' : '') + sec;
    };

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
            dom.btnNext.textContent = 'See Results';
            App.saveSession();
            return;
        }

        dom.timerText.textContent = App.formatTime(s.remainingSeconds);

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

        App.saveSession();
    };

    App.startTimer = function () {
        var dom = App.dom;
        s.remainingSeconds = s.timeLimitMin * 60;
        s.timerExpired = false;
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

})(InterviewApp);
