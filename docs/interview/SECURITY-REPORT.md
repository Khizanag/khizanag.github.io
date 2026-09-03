# Security Audit Report

**Application**: iOS Interview Tool
**Date**: 2026-02-23
**Last updated**: 2026-09-03
**Scope**: All HTML, CSS, JS files in the interview tool
**Deployment**: Static site on GitHub Pages (no backend server)

---

## Executive Summary

Overall security posture is **moderate** for a client-side practice tool. Major XSS vectors have been fixed. Remaining risks are inherent to the client-side architecture (localStorage tampering, no CSP headers on GitHub Pages). The most actionable item is deploying `firestore.rules`: the access model is versioned in this repo but is not enforced until `firebase deploy --only firestore:rules` runs.

---

## Findings

### Critical

| # | Issue | File | Status |
|---|-------|------|--------|
| 1 | **Firestore rules versioned** — API key is public (expected for web Firebase). Access is pinned by `firestore.rules` in this repo rather than by unreviewed console state, but the file governs live Firestore only after `firebase deploy --only firestore:rules`; until then the console state stands. | `firestore.rules`, `js/interview/firebase.js:35-43` | Fixed in repo — pending deploy |
| 2 | **Popup window uses `doc.write()` + `window.opener`** — deprecated API, fragile cross-window reference. Low real-world risk since popup is same-origin. | `js/interview/app.js:1315`, `js/interview/app.js:1341` | Open (low practical risk) |

The access model in `firestore.rules`:

- `/users/{uid}` and every subcollection under it (history, gamification, sr, customQuestions, streak): read and write only by that signed-in uid.
- `/config/{document}`: unauthenticated `get` (feature flags load on `firebase:ready`, before sign-in resolves); writes denied — flags are edited in the console.
- `/liveSessions/{code}`: `get` for signed-in users and no listing; create only by the host uid with the exact field set the client writes; update limited to the host's `live`/`status`/`results` or a writer's own `participants.<uid>` entry; delete only by the host.
- Every other path is denied.

### High

| # | Issue | File | Status |
|---|-------|------|--------|
| 3 | **Code sandbox uses `new Function()`** — user-written code executes with full window access. Intentional feature for practice, but not sandboxed. | `js/interview/sandbox.js:204`, `js/interview/sandbox.js:240` | Intentional (document limitation) |

### Medium

| # | Issue | File | Status |
|---|-------|------|--------|
| 4 | **No Content-Security-Policy** — GitHub Pages cannot set HTTP headers, but a `<meta>` CSP tag could be added. | `interview.html`, `history.html`, `host-interview.html`, `practice.html`, `config.html`, `guide.html` | Open |
| 5 | **No Subresource Integrity (SRI)** on Firebase CDN imports. | `js/interview/firebase.js:1-31` | Open |
| 6 | **localStorage data tamperable** — history, XP, flashcard progress can be modified via DevTools. Mitigated by Firebase as source of truth for authenticated users. | Multiple files | Accepted risk |
| 7 | **No X-Frame-Options / frame-busting** — page can be embedded in iframes. Limited risk since no sensitive form actions exist. | All HTML pages | Open |
| 8 | **photoURL not URL-validated** — Firebase user photo URLs are set as `img.src` directly. Mitigated by `referrerPolicy: 'no-referrer'`. | `js/interview/app.js:1818,1849` | Mitigated |
| 9 | **Anonymous auth** allows unlimited account creation. Security rules cannot express rate limits, so quotas need App Check or a server-side gate. | `js/interview/firebase.js:98` | Open (not expressible in rules) |

### Low / Info

| # | Issue | File | Status |
|---|-------|------|--------|
| 10 | **Theme preference in localStorage** uses strict equality check — safe. | `interview.html:34` | Mitigated |
| 11 | **displayName from Firebase** rendered via `textContent` — safe against XSS. | `js/interview/app.js:1813` | Fixed |
| 12 | **Custom question import** validated with schema checks (type, range, required fields). | `js/interview/custom.js` | Fixed |

---

## Previously Fixed Vulnerabilities

These were identified and addressed during this audit:

| Issue | Fix | Commit |
|-------|-----|--------|
| `escapeHtml` duplicated / missing in some files | Created shared `InterviewUtils.escapeHtml()` module | Extract shared utilities module |
| `phase.name` unescaped in innerHTML (`js/interview/plan.js`) | Wrapped with `InterviewUtils.escapeHtml()` | Fix XSS vulnerabilities |
| `qLabel` partially escaped (only `<` replaced) | Replaced with full `escapeHtml()` | Fix XSS vulnerabilities |
| Local `escapeHtml` in `js/interview/live.js` | Replaced with shared utility | Fix XSS vulnerabilities |
| Custom question import accepted any JSON structure | Added schema validation with type/range checks | Fix XSS vulnerabilities |
| 54 empty `catch` blocks silently swallowed errors | Routed the storage and Firebase paths through `InterviewUtils.logError()` / `notifyWriteError()`; 27 of the 63 catch blocks in `js/interview/` are still comment-only | Add error handling |
| Firebase write errors had no user notification | Added `firebase:writeerror` event listener with toast | Add error handling |

---

## Recommendations

### Must Do
1. **Deploy `firestore.rules`** — `firebase deploy --only firestore:rules`. The access model is versioned and emulator-verified; Firestore keeps enforcing the console state until it is deployed.
   - Anonymous users still have no write quotas — rules cannot express rate limits (finding 9); needs App Check or a server-side gate

### Should Do
2. **Add CSP meta tag** to all six interview-tool pages:
   ```html
   <meta http-equiv="Content-Security-Policy" content="
     default-src 'self';
     script-src 'self' 'unsafe-eval' https://www.gstatic.com https://apis.google.com;
     style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
     font-src https://fonts.gstatic.com;
     connect-src 'self' https://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com https://*.firebaseapp.com;
     img-src 'self' data: https:;
     object-src 'none';
     base-uri 'self';
   ">
   ```
   Note: `'unsafe-eval'` needed for code sandbox `new Function()`. `'unsafe-inline'` needed for existing inline styles.

3. **Add photoURL validation**:
   ```javascript
   function isValidPhotoURL(url) {
       try { var u = new URL(url); return u.protocol === 'https:'; }
       catch (e) { return false; }
   }
   ```

### Nice to Have
4. Add frame-busting script: `if (self !== top) top.location = self.location`
5. Document that the code sandbox is not secure for untrusted code
6. Consider migrating popup rating window to an in-page modal
7. Add SRI hashes to Firebase CDN imports (complex with ES modules)

---

## Threat Model

| Threat | Likelihood | Impact | Mitigation |
|--------|-----------|--------|------------|
| XSS via user input | Low (fixed) | High | escapeHtml on all dynamic content |
| localStorage tampering | Medium | Low | Firebase is source of truth; local data is convenience cache |
| Firebase data breach | Low | High | `firestore.rules` (deploy pending) |
| Clickjacking | Low | Low | No sensitive actions exposed |
| Code sandbox escape | Low | Medium | Intentional feature; local-only impact |
| CDN compromise | Very Low | Critical | Consider SRI hashes |

---

## Conclusion

For a **client-side practice/interview tool** hosted on GitHub Pages, the security posture is appropriate. All user-input XSS vectors have been patched. The primary actionable item is **deploying `firestore.rules`** — this is the only finding that could have real-world impact on user data, and the versioned access model does not take effect until it is deployed.
