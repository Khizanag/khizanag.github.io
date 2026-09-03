# Interview Tool — Module Architecture

> How the classic scripts under `js/interview/` fit together: what each page loads and in which order, which globals every module defines and consumes, the readiness signals that cross module boundaries, and the coupling that has to be untangled before an ES-module migration.

---

## Wiring model

There is no bundler. Every interview script except `js/interview/firebase.js` is a classic script that executes in document order and communicates through window globals.

- **`InterviewApp`** — the shared namespace, created as an object literal in `config.js` and extended in place by the feature modules. Each module is an IIFE that receives it as `App`: `(function (App) { ... })(InterviewApp);`.
- **`InterviewUtils`** — stateless helpers from `utils.js`: `escapeHtml`, `isSafeImageUrl`, `storageGet`, `storageSet`, `formatDate`, `formatDateLong`, `debounce`, `logError`, `ratingColor`.
- **`InterviewScoring`** — the adaptive scoring engine from `scoring.js`. It is assigned to `window` and also to `module.exports`, so `tests/interview/scoring.test.cjs` can require it under Node.
- **`window.FirebaseService`** — the auth and Firestore facade. `firebase.js` is the only ES module among the interview scripts (`type="module"`, therefore deferred, therefore evaluated after every classic script on the page).

Question banks are fetched at runtime: `questions/loader.js` assigns `QUESTION_BANK`, `QUESTION_BANK_ANDROID`, `QUESTION_BANK_FRONTEND`, `QUESTION_BANK_BACKEND` and `QUESTION_BANK_BEHAVIORAL` from JSON and exposes `window.QuestionsReady`. Live-coding problems are plain script globals: `LIVE_CODING_EASY_MEDIUM` and `LIVE_CODING_HARD_EXPERT`, concatenated into `LIVE_CODING_BANK` by `live-coding/index.js`.

The `js/shared/*.js` utilities (`fullscreen.js`, `theme-toggle.js`, `scroll-top.js`, `keyboard-nav.js`) are self-contained IIFEs and define no globals.

---

## Page script load order

Document order is execution order for classic scripts. Each page also runs a small inline theme bootstrap in `<head>`, omitted below.

### interview.html

```text
js/interview/firebase.js            (type="module" — runs last, after all of the below)
js/interview/questions/loader.js
js/interview/live-coding/easy-medium.js
js/interview/live-coding/hard-expert.js
js/interview/live-coding/index.js
js/shared/fullscreen.js
js/shared/theme-toggle.js
js/interview/utils.js
js/interview/config.js
js/interview/features.js
js/interview/highlighter.js
js/interview/session.js
js/interview/timer.js
js/interview/plan.js
js/interview/scoring.js
js/interview/results.js
js/interview/history.js
js/interview/app.js
js/interview/live.js
js/interview/flashcard.js
js/interview/analytics.js
js/interview/bank.js
js/interview/templates.js
js/interview/custom.js
js/interview/sandbox.js
js/interview/gamification.js
```

### host-interview.html

```text
js/interview/firebase.js            (type="module")
js/shared/fullscreen.js
js/shared/theme-toggle.js
js/shared/scroll-top.js
js/interview/utils.js
js/interview/config.js
js/interview/features.js
js/interview/plan.js
js/interview/templates.js
js/interview/host.js
```

### practice.html

```text
js/shared/fullscreen.js
js/shared/theme-toggle.js
js/shared/scroll-top.js
js/interview/utils.js
js/interview/config.js
js/interview/features.js
js/interview/plan.js
js/interview/templates.js
js/interview/host.js
```

Same set as `host-interview.html` minus `firebase.js`.

### history.html

```text
js/shared/fullscreen.js
js/shared/theme-toggle.js
js/shared/scroll-top.js
js/interview/firebase.js            (type="module")
js/interview/utils.js
js/interview/history-page.js
```

`config.js` is deliberately absent — `history-page.js` embeds its own level constants.

### config.html

```text
js/shared/fullscreen.js
js/shared/theme-toggle.js
js/shared/scroll-top.js
js/interview/utils.js
js/interview/config.js
js/interview/features.js
js/interview/config-page.js
```

### guide.html

```text
js/shared/fullscreen.js
js/shared/theme-toggle.js
js/shared/scroll-top.js
js/shared/keyboard-nav.js           (data-sections="ch-science,…,ch-data")
js/interview/guide.js
```

### psd.html

```text
js/shared/fullscreen.js
js/shared/theme-toggle.js
js/psd/questions.js
js/interview/utils.js
js/psd/app.js
```

`utils.js` is the only interview module here; `js/psd/app.js` uses `InterviewUtils.escapeHtml`.

---

## Namespace map

Rows follow the `interview.html` load order, then the page-only modules. "Defines" lists what the module adds to a global; "Consumes" lists the globals it reads, plus the `App` functions and `App.dom` that come from another module — the constant tables and shared state defined in `config.js` (`App.state`, `App.LEVEL_*`, `App.TOPIC_LABELS`, `App.RATING_LABELS`, `App.PLATFORMS` and the storage keys) are read almost everywhere and are omitted.

| Module | Defines | Consumes |
|---|---|---|
| `questions/loader.js` | `window.QuestionsReady`, `window.QuestionsLoadError`, `QUESTION_BANK`, `QUESTION_BANK_ANDROID`, `QUESTION_BANK_FRONTEND`, `QUESTION_BANK_BACKEND`, `QUESTION_BANK_BEHAVIORAL`, event `questions:error` | — (fetches the JSON banks) |
| `live-coding/easy-medium.js` | `LIVE_CODING_EASY_MEDIUM` | — |
| `live-coding/hard-expert.js` | `LIVE_CODING_HARD_EXPERT` | — |
| `live-coding/index.js` | `LIVE_CODING_BANK` | `LIVE_CODING_EASY_MEDIUM`, `LIVE_CODING_HARD_EXPERT` |
| `utils.js` | `InterviewUtils` | — |
| `config.js` | `InterviewApp` — storage keys, level tables, `PLATFORMS`, `TOPIC_LABELS`, `state`, empty `dom`, `getLevelIndex`, `getQuestionBank`, `getPlatformConfig`, `switchPlatform`, `announce` | `QUESTION_BANK*` (read lazily inside `getQuestionBank`) |
| `features.js` | `App.FEATURES_STORAGE_KEY`, `App.FEATURE_DEFAULTS`, `App.features`, `App.isFeatureEnabled`, `App.applyFeatureFlags`, `App.initFeatureFlags` | `InterviewApp`, `window.FirebaseService`, event `firebase:ready` |
| `highlighter.js` | `App.highlightSwift` | `InterviewApp` |
| `session.js` | `App.saveSession`, `App.saveSessionNow`, `App.restoreSession`, `App.clearSession` | `InterviewApp`, `InterviewScoring`, `App.dom`, `App.displayQuestion`, `App.showScreen`, `App.resumeTimer`, `App.renderPlan`, `App.renderPhaseIndicator`, `App.updatePhaseIndicator`, `App.formatTime` |
| `timer.js` | `App.startTimer`, `App.stopTimer`, `App.pauseTimer`, `App.resumeTimer`, `App.continueTimer`, `App.togglePause`, `App.onTimerTick`, `App.formatTime` | `InterviewApp`, `App.dom`, `App.getCurrentPhaseId`, `App.getPhaseRemainingSeconds`, `App.updatePhaseIndicator`, `App.updatePhaseUI`, `App.showModal`, `App.showToast`, `App.saveSession`, `App.syncLiveState`, `App.announce`, `App._stopQuestionTimer` |
| `plan.js` | `App.initPlan`, `App.renderPlan`, `App.renderPhaseIndicator`, `App.updatePhaseIndicator`, `App.getCurrentPhaseId`, `App.getPhaseRemainingSeconds`, `App.isLastPhase`, `App.skipToNextPhase` | `InterviewApp`, `InterviewUtils`, `App.dom`, `App.formatTime`, `App.saveSession`, `App.showToast` |
| `scoring.js` | `InterviewScoring` (on `window`, plus `module.exports` for tests) | — |
| `results.js` | `App.showResults`, `App.downloadReport`, `App.downloadMarkdownReport`, `App.copyResultsSummary` | `InterviewApp`, `InterviewScoring`, `FirebaseService.setLiveResults`, `App.dom`, `App.getLevelIndex`, `App.saveToHistory`, `App.loadLocalHistory`, `App.awardInterviewXP`, `App.clearSession`, `App.stopTimer`, `App._stopQuestionTimer`, `App.escapeHtml`, `App.showScreen`, `App.live`, `App.isLiveHost`, `App.isLiveSession` |
| `history.js` | `App.saveToHistory`, `App.loadLocalHistory`, `App.renderHistory`, `App.showComparison` | `InterviewApp`, `InterviewUtils`, `InterviewScoring`, `FirebaseService`, `App.escapeHtml`, `App.getLevelIndex` |
| `app.js` | `App.showScreen`, `App.updateUI`, `App.updatePhaseUI`, `App.displayQuestion`, `App.goNextQuestion`, `App.setRating`, `App.openRatingPopup`, `App.syncPopup`, `App.showModal`, `App.hideModal`, `App.showToast`, `App.escapeHtml`, `App.renderTopicChips`, `App.animateCountUp`, `App._stopQuestionTimer`; populates `App.dom` | `InterviewUtils`, `InterviewScoring`, `FirebaseService`, `window.QuestionsReady`, `LIVE_CODING_BANK`, most `App` members from every other module; listens for `firebase:authchange` and `firebase:writeerror` |
| `live.js` | `App.live`, `App.createLiveSession`, `App.joinLiveSession`, `App.cancelLiveSession`, `App.cleanupLive`, `App.syncLiveState`, `App.isLiveSession`, `App.isLiveHost` | `InterviewApp`, `InterviewUtils`, `FirebaseService`, `App.dom`, `App.showScreen`, `App.highlightSwift`, `App.formatTime`, `App.getCurrentPhaseId`, `App.getLevelIndex`, `App.announce` |
| `flashcard.js` | — | `InterviewApp`, `InterviewUtils`, `FirebaseService`, `App.escapeHtml`, `App.getQuestionBank`, `App.highlightSwift`, `App.showScreen`, `App.awardFlashcardXP` |
| `analytics.js` | — | `InterviewApp`, `InterviewScoring`, `App.escapeHtml`, `App.getLevelIndex`, `App.loadLocalHistory`, `App.renderAchievements`, `App.showScreen` |
| `bank.js` | — | `InterviewApp`, `App.escapeHtml`, `App.getQuestionBank`, `App.highlightSwift`, `App.showScreen` |
| `templates.js` | — | `InterviewApp`, `InterviewUtils`, `App.escapeHtml` (falls back to `InterviewUtils.escapeHtml`), `App.dom`, `App.getPlatformConfig`, `App.switchPlatform`, `App.renderTopicChips`, `App.updateUI` |
| `custom.js` | — | `InterviewApp`, `InterviewUtils`, `FirebaseService`, `App.escapeHtml`, `App.getQuestionBank`, `App.showScreen` |
| `sandbox.js` | — | `InterviewApp`, `LIVE_CODING_BANK`, `App.escapeHtml`, `App.highlightSwift`, `App.showScreen` |
| `gamification.js` | `App.awardInterviewXP`, `App.awardFlashcardXP`, `App.renderAchievements`; **replaces** `App.showScreen` with a wrapper | `InterviewApp`, `InterviewUtils`, `FirebaseService`, the original `App.showScreen`, `App.isFeatureEnabled`, `App.loadLocalHistory` |
| `firebase.js` | `window.FirebaseService`; events `firebase:ready`, `firebase:authchange`, `firebase:writeerror` | Firebase SDK 11.4.0 modules from `gstatic.com` |
| `host.js` | `App.updateUI`, `App.renderTopicChips`, `App.escapeHtml` (only when `app.js` has not defined it); fills `App.dom.topicGrid`, `.planList`, `.planTotal`, `.btnToggleAll` | `InterviewApp`, `InterviewUtils`, `App.initPlan`, `App.renderPlan`, `App.applyFeatureFlags`, `App.getPlatformConfig`, `App.switchPlatform`; listens for `firebase:authchange` |
| `config-page.js` | — | `InterviewApp.FEATURES_STORAGE_KEY`, `InterviewApp.FEATURE_DEFAULTS`, `InterviewUtils` |
| `history-page.js` | — | `InterviewUtils`, `FirebaseService`; listens for `firebase:authchange` |
| `guide.js` | — | — (DOM only) |

---

## Readiness signals

| Signal | Kind | Produced by | Waited on by |
|---|---|---|---|
| `window.QuestionsReady` | Promise | `questions/loader.js` | `app.js` gates both `startSession()` entry points on it; rejection goes to `reportQuestionsLoadError`, which logs through `InterviewUtils.logError` and shows a toast |
| `window.QuestionsLoadError` | Value set on rejection | `questions/loader.js` | nothing reads it |
| `questions:error` | `CustomEvent` on `document`, `detail.error` | `questions/loader.js` | no listener exists; the rejection path above is the only handling |
| `firebase:ready` | `CustomEvent` on `document` | `firebase.js`, dispatched as its last statement | `features.js` in `initFeatureFlags`, registered `{ once: true }` only when `window.FirebaseService` is still absent |
| `firebase:authchange` | `CustomEvent` on `document`, `detail.user` | `firebase.js`, from the `onAuthStateChanged` handler | `app.js`, `host.js`, `history-page.js` |
| `firebase:writeerror` | `CustomEvent` on `document`, `detail.context` | `firebase.js`, from `notifyWriteError` on failed Firestore writes | `app.js` |

`App.initFeatureFlags` is called only from `app.js`, so the remote flag layer (and the `firebase:ready` listener) exists only on `interview.html`. Other pages keep the local defaults that `features.js` assigns to `App.features` at load time.

---

## Coupling hazards

- **Load order is the dependency graph.** `utils.js` must precede everything that touches `InterviewUtils`, and `config.js` must precede every `(function (App) { ... })(InterviewApp)` module. `questions/loader.js` is parsed before `utils.js` on `interview.html`, which its own comment gives as the reason its `.catch` logs with `console.error` instead of `InterviewUtils.logError` — the rejection itself lands long after `utils.js` has run.
- **Load-time member captures.** `analytics.js`, `bank.js`, `custom.js`, `flashcard.js` and `sandbox.js` copy `App.escapeHtml` into a local at module evaluation, so they must load after `app.js`. `app.js`, `live.js`, `plan.js`, `session.js`, `timer.js`, `results.js` and `host.js` capture `App.state` (and `app.js` and `live.js` also `App.dom`) the same way, which is why `config.js` cannot be reordered after them.
- **`showScreen` monkey-patch.** `gamification.js` stores the existing `App.showScreen` and replaces it with a wrapper that re-renders the XP bar and achievements. It must stay last in the `interview.html` list: a module that captured `App.showScreen` at load time before it would keep the unwrapped function.
- **`app.js` is optional.** `host-interview.html` and `practice.html` load `templates.js` and `host.js` without `app.js`, so `templates.js` falls back to `InterviewUtils.escapeHtml` and `host.js` supplies its own `App.escapeHtml`, `App.updateUI` and `App.renderTopicChips`.
- **`utils.js` outside the interview tool.** `psd.html` loads `js/interview/utils.js` for `InterviewUtils.escapeHtml` alone, so `utils.js` cannot assume any other interview module is present.
- **Firebase is optional and always late.** Being a deferred module, `firebase.js` evaluates after the classic scripts, so `window.FirebaseService` is undefined while they initialise — hence the `if (window.FirebaseService)` guards and the `firebase:ready` fallback. `practice.html` never loads it at all, so its `firebase:authchange` listener in `host.js` never fires.

---

## Before an ES-module migration

- Move the leaf modules first — `analytics.js`, `bank.js`, `custom.js`, `flashcard.js`, `sandbox.js`, `templates.js`, `config-page.js`, `history-page.js`, `guide.js` define nothing on `InterviewApp` and only need imports.
- Replace the load-time captures of `App.escapeHtml`, `App.state` and `App.dom` with call-time lookups, so import order stops changing behaviour.
- Replace the `gamification.js` wrapper around `App.showScreen` with an explicit hook that `app.js` calls, so screen changes have one owner.
- Give each page one entry module that imports in the order the current `<script>` list encodes, instead of relying on the HTML.
- Keep the `module.exports` branch in `scoring.js` until `tests/interview/scoring.test.cjs` moves off CommonJS.

---

*Last updated: 2026-09-03*
