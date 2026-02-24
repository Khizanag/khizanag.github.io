(function (App) {
    'use strict';

    var s = App.state;
    var saveTimer = null;

    App.saveSession = function () {
        if (saveTimer) clearTimeout(saveTimer);
        saveTimer = setTimeout(function () { App.saveSessionNow(); }, 500);
    };

    App.saveSessionNow = function () {
        if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; }
        var dom = App.dom;
        try {
            localStorage.setItem(App.SESSION_KEY, JSON.stringify({
                version: 1,
                interviewerName: s.interviewerName,
                intervieweeName: s.intervieweeName,
                selectedTopics: s.selectedTopics,
                timeLimitMin: s.timeLimitMin,
                currentQ: s.currentQ,
                currentRating: s.currentRating,
                ratings: s.ratings,
                sessionQuestions: s.sessionQuestions,
                remainingSeconds: s.remainingSeconds,
                timerExpired: s.timerExpired,
                timerPaused: s.timerPaused,
                phases: s.phases,
                introNotes: s.introNotes,
                wrapupNotes: s.wrapupNotes,
                presenterMode: s.presenterMode || false,
                lcHintsRevealed: s.lcHintsRevealed || 0,
                lcSolutionRevealed: dom.lcSolutionContent ? dom.lcSolutionContent.classList.contains('is-open') : false,
                hintRevealed: dom.hintReveal.classList.contains('is-open'),
                answerRevealed: dom.answerReveal.classList.contains('is-open'),
                timestamp: Date.now(),
            }));
        } catch (e) { /* localStorage unavailable */ }
    };

    App.clearSession = function () {
        try { localStorage.removeItem(App.SESSION_KEY); } catch (e) { /* */ }
    };

    App.restoreSession = function () {
        var dom = App.dom;
        var raw;
        try { raw = localStorage.getItem(App.SESSION_KEY); } catch (e) { return false; }
        if (!raw) return false;

        var data;
        try { data = JSON.parse(raw); } catch (e) { App.clearSession(); return false; }

        if (!data.version
            || !Array.isArray(data.selectedTopics) || !data.selectedTopics.length
            || !Array.isArray(data.ratings)
            || !Array.isArray(data.sessionQuestions) || !data.sessionQuestions.length
            || typeof data.currentQ !== 'number'
            || !data.intervieweeName
        ) {
            App.clearSession();
            return false;
        }

        // Discard stale sessions (24h)
        if (Date.now() - data.timestamp > 24 * 60 * 60 * 1000) {
            App.clearSession();
            return false;
        }

        var valid = data.sessionQuestions.every(function (q) {
            return q && q.topic && typeof q.level === 'number' && q.question;
        });
        if (!valid) { App.clearSession(); return false; }

        // Restore state
        s.interviewerName = data.interviewerName || '';
        s.intervieweeName = data.intervieweeName;
        s.selectedTopics = data.selectedTopics.filter(function (t) { return t !== 'code-challenge' && t !== 'live-coding'; });
        s.interviewMode = 'time';
        s.timeLimitMin = data.timeLimitMin || 15;
        s.currentQ = data.currentQ;
        s.currentRating = data.currentRating || 0;
        s.ratings = data.ratings;
        s.sessionQuestions = data.sessionQuestions;
        s.remainingSeconds = data.remainingSeconds || 0;
        s.timerExpired = data.timerExpired || false;
        if (Array.isArray(data.phases) && data.phases.length > 0) {
            s.phases = data.phases;
        }
        s.introNotes = data.introNotes || '';
        s.wrapupNotes = data.wrapupNotes || '';

        // Restore setup screen UI
        dom.interviewerInput.value = s.interviewerName;
        dom.nameInput.value = s.intervieweeName;
        dom.allChips.forEach(function (c) {
            c.classList.toggle('is-selected', s.selectedTopics.indexOf(c.dataset.topic) !== -1);
        });

        dom.qInterviewee.textContent = s.intervieweeName;

        // Timer & End button
        dom.btnEnd.style.display = '';
        dom.qTimer.style.display = '';
        if (data.timerPaused) {
            s.timerPaused = true;
            dom.btnPause.classList.add('is-paused');
            dom.qTimer.classList.add('is-paused');
            dom.timerText.textContent = App.formatTime(s.remainingSeconds);
        } else {
            App.resumeTimer();
        }

        App.renderPlan();
        App.showScreen('screen-question');
        App.renderPhaseIndicator();
        App.updatePhaseIndicator();
        App.displayQuestion(s.currentQ);

        // Restore in-progress rating
        if (s.currentRating > 0) {
            dom.allStars.forEach(function (star, i) {
                star.classList.toggle('is-active', i < s.currentRating);
            });
            dom.ratingDesc.textContent = App.RATING_LABELS[s.currentRating];
            dom.btnNext.disabled = false;
        }

        // Restore reveal states
        if (data.hintRevealed) {
            dom.hintReveal.classList.add('is-open');
            dom.btnHint.textContent = 'Hide Hint';
        }
        if (data.answerRevealed) {
            dom.answerReveal.classList.add('is-open');
            dom.btnAnswer.textContent = 'Hide Answer';
        }

        // Restore notes
        dom.introNotes.value = s.introNotes;
        dom.wrapupNotes.value = s.wrapupNotes;

        // Restore live coding state
        if (data.lcHintsRevealed && s.sessionQuestions[s.currentQ] && s.sessionQuestions[s.currentQ]._liveCoding) {
            s.lcHintsRevealed = data.lcHintsRevealed;
            var lc = s.sessionQuestions[s.currentQ]._lcData;
            if (lc && dom.lcHintButtons) {
                for (var hi = 0; hi < s.lcHintsRevealed && hi < lc.hints.length; hi++) {
                    var btns = dom.lcHintButtons.querySelectorAll('.lc-hints__btn');
                    if (btns[hi]) btns[hi].classList.add('is-active');
                    var hDiv = document.createElement('div');
                    hDiv.className = 'lc-hint-item';
                    hDiv.textContent = lc.hints[hi];
                    dom.lcHintContent.appendChild(hDiv);
                }
            }
            if (data.lcSolutionRevealed && dom.lcSolutionContent) {
                dom.lcSolutionContent.classList.add('is-open');
                dom.btnLcSolution.innerHTML =
                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Hide Solution';
            }
        }

        // Restore presenter mode
        if (data.presenterMode) {
            s.presenterMode = true;
            document.documentElement.classList.add('is-presenter');
            dom.btnPresenter.classList.add('is-active');
            dom.btnPopout.style.display = '';
        }

        return true;
    };

    window.addEventListener('beforeunload', function () {
        if (document.getElementById('screen-question').classList.contains('is-active')) {
            App.saveSessionNow();
        }
    });

})(InterviewApp);
