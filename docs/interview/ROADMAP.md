# Interview Tool — Roadmap & Next Steps

> A comprehensive plan to evolve the interview tool from a strong single-user tool into a polished, production-grade platform for technical hiring.

---

## Current State Summary

| Area | Status |
|------|--------|
| Platforms | 5 (iOS, Android, Frontend, Backend, Behavioral) |
| Questions | ~709 total (~479 iOS, ~40 each for others, ~50 live coding) |
| Screens | 12 (auth, setup, lobby, question, results, guide, flashcards, analytics, bank, custom, sandbox, profile) |
| Cloud Sync | Firebase Auth + Firestore (history, gamification, SR, custom Qs, streaks, live sessions) |
| Live Sessions | Real-time multiplayer via Firestore onSnapshot (host/candidate/spectator) |
| Gamification | XP system, 15+ achievements, streaks, level titles |

---

## Phase 1 — Content Expansion (High Impact, Low Risk)

### 1.1 Expand Question Banks

**Problem:** iOS has ~479 questions while other platforms have only ~40 each. This creates a significantly weaker experience for non-iOS users.

- [ ] Android/Kotlin: Expand from 40 to 200+ questions (Jetpack Compose, Coroutines, Room, Hilt, Lifecycle, Navigation, WorkManager)
- [ ] Frontend/Web: Expand from 40 to 200+ questions (React hooks, Next.js, state management, bundlers, Web APIs, TypeScript advanced, CSS Grid/Flex)
- [ ] Backend: Expand from 40 to 200+ questions (Node.js, Go, Python/Django, microservices, gRPC, GraphQL, event-driven, containers)
- [ ] Behavioral: Expand from 40 to 100+ questions (STAR format prompts, scenario-based, conflict resolution, career growth)
- [ ] Add code snippets to non-iOS questions (currently most lack `code` field)

### 1.2 Live Coding Problem Expansion

- [ ] Expand from ~50 problems to 100+ across all difficulty levels
- [ ] Add platform-specific coding problems (Swift, Kotlin, TypeScript, Python)
- [ ] Add system design live coding scenarios (whiteboard-style)
- [ ] Add SQL/database query problems

### 1.3 Multi-Language Syntax Highlighting

**Problem:** Only Swift highlighting exists. Code snippets for other platforms render as plain text.

- [ ] Add Kotlin syntax highlighter
- [ ] Add TypeScript/JavaScript highlighter
- [ ] Add Python highlighter
- [ ] Add Go highlighter
- [ ] Add SQL highlighter

---

## Phase 2 — Live Session Polish

### 2.1 Session Robustness

- [ ] Add reconnection logic — detect network loss, auto-resubscribe on recovery
- [ ] Add connection status indicator (green/yellow/red dot next to LIVE badge)
- [ ] Add session timeout — auto-cleanup orphaned sessions after 4 hours
- [ ] Add heartbeat mechanism — host writes timestamp every 30s, participants detect stale host
- [ ] Handle host crash gracefully — spectators get "Host disconnected" message with countdown

### 2.2 Session UX Improvements

- [ ] Share button on lobby — native share API / QR code for session code
- [ ] Sound notification when participant joins lobby
- [ ] Participant typing/activity indicators
- [ ] Chat sidebar for spectators to communicate with host
- [ ] Session history — save completed live sessions to history for all participants
- [ ] Allow candidate to request hint (host sees notification)

### 2.3 Firestore Security Rules

- [ ] Write Firestore security rules for `liveSessions/` collection:
  - Only host can write `live`, `results`, `status`
  - Any authenticated user can write their own participant entry
  - Only host can delete session
  - Read access for all participants
- [ ] Add rate limiting on writes to prevent abuse
- [ ] Add session code validation (prevent enumeration)

---

## Phase 3 — Analytics & Insights

### 3.1 Advanced Analytics Dashboard

- [ ] Topic heatmap — visual grid showing strength/weakness per topic over time
- [ ] Difficulty distribution chart — what level questions are being asked most
- [ ] Time-per-question analysis — scatter plot of time vs rating
- [ ] Progress over time — track improvement across sessions for same topics
- [ ] Percentile ranking — compare scores against anonymized aggregate data

### 3.2 Interview Report Enhancements

- [ ] PDF export with styled formatting (replace plain text download)
- [ ] Share results via link (generate temporary public URL)
- [ ] Email results directly to hiring manager
- [ ] Include time-per-question in report breakdown
- [ ] Add interviewer notes section to exported reports

### 3.3 Spaced Repetition Improvements

- [ ] Add SRS difficulty buttons (Easy/Good/Hard/Again) instead of binary
- [ ] Show review forecast — "12 cards due tomorrow, 8 in 3 days"
- [ ] Track mastery percentage per topic
- [ ] Daily review reminders via browser notifications
- [ ] Import/export flashcard decks

---

## Phase 4 — Code Sandbox Evolution

### 4.1 Execution Support

**Problem:** Only JavaScript can be executed. Swift/Kotlin/Python/TypeScript show "not available" for execution.

- [ ] Add Python execution via Pyodide (WASM)
- [ ] Add TypeScript execution via TypeScript compiler + JS eval
- [ ] Explore Swift execution via SwiftWasm or remote API
- [ ] Add test case runner — define input/output pairs, verify solutions

### 4.2 Editor Improvements

- [ ] Add line numbers to code editor
- [ ] Add basic autocomplete for keywords
- [ ] Add bracket matching
- [ ] Add undo/redo support (Cmd+Z / Cmd+Shift+Z)
- [ ] Add dark/light theme toggle for editor
- [ ] Add font size adjustment

### 4.3 Problem Quality

- [ ] Add complexity analysis display (time/space) for all problems
- [ ] Add multiple solution approaches per problem (brute force vs optimal)
- [ ] Add problem tags (arrays, strings, trees, graphs, DP, etc.)
- [ ] Add "Similar Problems" recommendations after solving

---

## Phase 5 — Collaboration & Team Features

### 5.1 Team Rubrics & Calibration

- [ ] Allow teams to create shared rubrics (standardize what 1-5 means)
- [ ] Calibration mode — multiple interviewers rate same candidate independently, then compare
- [ ] Shared question pools — team-curated favorites
- [ ] Interview templates per team/role

### 5.2 Candidate Experience

- [ ] Candidate self-assessment mode — candidate sees questions and rates their own confidence
- [ ] Pre-interview preparation link — send candidate a topic list to review
- [ ] Post-interview feedback form — candidate rates the interview experience

### 5.3 Notes & Annotation

- [ ] Rich text notes (bold, bullets, headers) instead of plain text
- [ ] Timestamped notes — auto-tag notes with interview timer position
- [ ] Photo/screenshot attachment to notes
- [ ] Voice memo recording per question

---

## Phase 6 — Platform & Infrastructure

### 6.1 PWA (Progressive Web App)

- [ ] Add service worker for full offline support
- [ ] Add manifest.json for installability
- [ ] Cache question banks for offline access
- [ ] Add push notifications for daily practice reminders
- [ ] Add app install prompt

### 6.2 Performance Optimization

- [ ] Lazy-load question banks (only load active platform)
- [ ] Code-split CSS (only load styles for current screen)
- [ ] Add loading skeleton screens
- [ ] Minify and bundle JS/CSS for production
- [ ] Add image/asset CDN caching headers

### 6.3 Testing

- [ ] Add end-to-end tests (Playwright/Cypress) for critical flows:
  - Auth flow (login, signup, guest)
  - Interview flow (start, rate, next, skip, end, results)
  - Live session flow (create, join, sync, end)
  - Flashcard flow (review, streak tracking)
- [ ] Add unit tests for question picker algorithm
- [ ] Add accessibility audit automation (axe-core)

### 6.4 Monitoring & Error Tracking

- [ ] Add error boundary / global error handler
- [ ] Integrate Sentry or similar for production error tracking
- [ ] Add analytics events for feature usage (which features are used most)
- [ ] Monitor Firebase quota usage

---

## Phase 7 — Question Quality & AI

### 7.1 Community Contributions

- [ ] Add "Suggest a Question" form (submitted via email or GitHub issue)
- [ ] Add question difficulty voting (users can flag if difficulty is wrong)
- [ ] Add question quality rating (separate from answer rating)
- [ ] Build review pipeline for community-submitted questions

### 7.2 AI-Powered Features

- [ ] AI-generated follow-up questions based on candidate's answer
- [ ] AI scoring assistant — suggest a rating based on answer keywords
- [ ] AI interview summary — auto-generate written evaluation from ratings + notes
- [ ] Smart question selection — use ML to pick questions that maximize signal

---

## Phase 8 — UX Polish & Accessibility

### 8.1 Keyboard Navigation

- [ ] Full keyboard navigation for all screens (Tab, Enter, Escape)
- [ ] Keyboard shortcuts reference sheet (accessible via `?` key)
- [ ] Focus management on screen transitions
- [ ] Skip-to-content links for all major sections

### 8.2 Accessibility Audit

- [ ] WCAG 2.1 AA compliance audit
- [ ] Screen reader testing (VoiceOver, NVDA)
- [ ] Color contrast verification (especially in light theme)
- [ ] Reduced motion support (`prefers-reduced-motion`)
- [ ] High contrast mode support

### 8.3 Visual Polish

- [ ] Add transition animations between screens
- [ ] Add micro-interactions (star rating hover, button press feedback)
- [ ] Add loading states for all async operations
- [ ] Add empty states with illustrations (no history, no flashcards)
- [ ] Add onboarding tour for first-time users

---

## Priority Matrix

| Phase | Impact | Effort | Priority |
|-------|--------|--------|----------|
| 1. Content Expansion | Very High | Medium | P0 |
| 2. Live Session Polish | High | Medium | P0 |
| 3. Analytics & Insights | Medium | Medium | P1 |
| 4. Sandbox Evolution | Medium | High | P1 |
| 5. Team Features | High | High | P2 |
| 6. Platform & Infra | Medium | High | P2 |
| 7. AI Features | High | Very High | P3 |
| 8. UX Polish | Medium | Low-Medium | P1 |

---

## Known Technical Debt

1. **Single HTML file** — interview.html is ~3000+ lines. Consider splitting into web components or a lightweight framework
2. **No build pipeline** — raw JS/CSS without minification, bundling, or tree-shaking
3. **No tests** — zero automated test coverage
4. **String-based HTML** — innerHTML concatenation in several places (XSS risk pattern, harder to maintain)
5. **Magic numbers** — some timeouts and thresholds lack named constants
6. **Inconsistent error handling** — some Firebase calls have `.catch()`, others don't
7. **No Firestore security rules** — live sessions collection needs proper authorization
8. **Question bank size disparity** — iOS has 10x more questions than other platforms

---

*Last updated: 2026-02-21*
