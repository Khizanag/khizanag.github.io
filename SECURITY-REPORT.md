# Security Audit Report

**Application**: iOS Interview Tool
**Date**: 2026-02-23
**Scope**: All HTML, CSS, JS files in the interview tool
**Deployment**: Static site on GitHub Pages (no backend server)

---

## Executive Summary

Overall security posture is **moderate** for a client-side practice tool. Major XSS vectors have been fixed. Remaining risks are inherent to the client-side architecture (localStorage tampering, no CSP headers on GitHub Pages). The most actionable item is verifying Firebase Firestore security rules.

---

## Findings

### Critical

| # | Issue | File | Status |
|---|-------|------|--------|
| 1 | **Firestore rules unknown** — API key is public (expected for web Firebase). If Firestore rules are permissive, anyone can read/write all user data. | `js/interview-firebase.js:35-42` | **Verify in Firebase Console** |
| 2 | **Popup window uses `doc.write()` + `window.opener`** — deprecated API, fragile cross-window reference. Low real-world risk since popup is same-origin. | `js/interview-app.js:1201` | Open (low practical risk) |

### High

| # | Issue | File | Status |
|---|-------|------|--------|
| 3 | **Code sandbox uses `new Function()`** — user-written code executes with full window access. Intentional feature for practice, but not sandboxed. | `js/interview-sandbox.js:195` | Intentional (document limitation) |

### Medium

| # | Issue | File | Status |
|---|-------|------|--------|
| 4 | **No Content-Security-Policy** — GitHub Pages cannot set HTTP headers, but a `<meta>` CSP tag could be added. | `interview.html`, `history.html` | Open |
| 5 | **No Subresource Integrity (SRI)** on Firebase CDN imports. | `js/interview-firebase.js:7-12` | Open |
| 6 | **localStorage data tamperable** — history, XP, flashcard progress can be modified via DevTools. Mitigated by Firebase as source of truth for authenticated users. | Multiple files | Accepted risk |
| 7 | **No X-Frame-Options / frame-busting** — page can be embedded in iframes. Limited risk since no sensitive form actions exist. | All HTML pages | Open |
| 8 | **photoURL not URL-validated** — Firebase user photo URLs are set as `img.src` directly. Mitigated by `referrerPolicy: 'no-referrer'`. | `js/interview-app.js:1687,1717` | Mitigated |
| 9 | **Anonymous auth** allows unlimited account creation. Should have Firestore write quotas. | `js/interview-firebase.js:97` | Depends on rules |

### Low / Info

| # | Issue | File | Status |
|---|-------|------|--------|
| 10 | **Theme preference in localStorage** uses strict equality check — safe. | `interview.html:16` | Mitigated |
| 11 | **displayName from Firebase** rendered via `textContent` — safe against XSS. | `js/interview-app.js:1684` | Fixed |
| 12 | **Custom question import** validated with schema checks (type, range, required fields). | `js/interview-custom.js` | Fixed |

---

## Previously Fixed Vulnerabilities

These were identified and fixed during this audit:

| Issue | Fix | Commit |
|-------|-----|--------|
| `escapeHtml` duplicated / missing in some files | Created shared `InterviewUtils.escapeHtml()` module | Extract shared utilities module |
| `phase.name` unescaped in innerHTML (interview-plan.js) | Wrapped with `InterviewUtils.escapeHtml()` | Fix XSS vulnerabilities |
| `qLabel` partially escaped (only `<` replaced) | Replaced with full `escapeHtml()` | Fix XSS vulnerabilities |
| Local `escapeHtml` in interview-live.js | Replaced with shared utility | Fix XSS vulnerabilities |
| Custom question import accepted any JSON structure | Added schema validation with type/range checks | Fix XSS vulnerabilities |
| 54 empty `catch` blocks silently swallowed errors | Added `InterviewUtils.logError()` to all catch blocks | Add error handling |
| Firebase write errors had no user notification | Added `firebase:writeerror` event listener with toast | Add error handling |

---

## Recommendations

### Must Do
1. **Verify Firestore security rules** in Firebase Console:
   - Users can only read/write their own data: `request.auth.uid == uid`
   - Feature flags are read-only: `allow write: if false`
   - Live sessions validate participant membership
   - Anonymous users have write quotas

### Should Do
2. **Add CSP meta tag** to both HTML pages:
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
| Firebase data breach | Low | High | Firestore rules (verify!) |
| Clickjacking | Low | Low | No sensitive actions exposed |
| Code sandbox escape | Low | Medium | Intentional feature; local-only impact |
| CDN compromise | Very Low | Critical | Consider SRI hashes |

---

## Conclusion

For a **client-side practice/interview tool** hosted on GitHub Pages, the security posture is appropriate. All user-input XSS vectors have been patched. The primary actionable item is **verifying Firestore security rules** — this is the only finding that could have real-world impact on user data.
