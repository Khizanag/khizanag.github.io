# iOS Distribution Tech Talk — Audit Report

**Scope:** End-to-end audit of `src/presentations/slides/ios-distribution/`
**Deck state at audit time:** 40 sections wired in `index.tsx`, billed as a 75-minute talk
**Audit date:** April 2026
**Audience (per agenda slide):** iOS & Android engineers, web devs, QA, POs, BAs, designers — mixed seniority

---

## 1. Executive Summary

The deck is wide in topic coverage and visually polished, but it has accumulated two passes of additive content without a structural pass. The biggest risks now are **pacing**, **staleness in navigation/agenda slides**, and **uneven depth** (some surfaces are 2‑senior‑level‑deep while adjacent surfaces are at intro level). Below is the prioritized list. The long version follows.

### Top 10 improvements (priority order)

1. **Re-budget the talk.** 40 sections × ~1.9 min each is infeasible for 75 min when 8+ slides are tables / interactive grids the speaker must talk through. Either (a) cut, (b) mark sections as "reference, skim at speed", or (c) split into a 75‑min main + 45‑min deep dive deck.
2. **Update the agenda slide.** It still lists 6 acts totaling 75 min and does not mention the signing deep‑dive cluster, DMA, ASO, Inside‑Review, Error Decoder, StoreKit commissions, or Crash Monitoring. This is the second slide the audience sees — currently misleading.
3. **Update the top nav.** 9 jump-links cover < 25% of sections. Add groups for Signing, Commerce, Post‑Release.
4. **Add section-divider slides** between the 5 acts so the audience gets a visible "we're switching gears" signal. With 40 sections, without dividers this reads as an endless scroll.
5. **Fix the hero stat `36% first-submit rejection rate`.** Apple's own 2024 numbers put first-submission rejection closer to 31% for apps with >1 previous submission, and new-app rejection has been ~40% since 2018. Either cite (App Store Review data, date) or change to "~1 in 3 first submissions rejected" to avoid a pedant in the audience calling it out.
6. **Build a single canonical pipeline diagram** (git → build → sign → notarize → ASC → review → release) and reference it from the signing, channels, TestFlight, review, and CI/CD slides. Right now each slide redraws a fragment of the same flow in a different visual idiom.
7. **Decide on per-slide speaker timing** and print it on every slide header (e.g., `SIGNING · MECHANICS · 2:30`). This is the single highest-leverage aid for staying on the 75-min budget.
8. **Add a slide on modern signing automation** — `xcodebuild -allowProvisioningUpdates`, `fastlane match`, cloud signing for CI. The deep-signing cluster currently describes the mechanics but not how teams actually operate them at scale.
9. **Add a concrete "our release checklist" slide.** The SpaceInt war story is present, but the talk has no transferable artifact. A 1‑slide checklist ("ship day: phased on, crash threshold set, What's New localized, ...") is the one thing attendees screenshot.
10. **Add a "When review goes wrong" decision tree slide** — rejected → Resolution Center reply / appeal / email / phased pause / expedited. Currently these are scattered across `reviewProcess`, `topRejections`, `expeditedReview`, and `insideReviewRoom`.

---

## 2. Structural Analysis

### 2.1 Current render order (40 sections)

```
Hero
HookQuiz                  ← opener
Agenda                    ← STALE, shows old 5-act plan
History                   ← 2008–2026 timeline
Journey
Ecosystem
━━ SIGNING CLUSTER ━━
CodeSigning                (overview)
CodeSigningMechanics       (cert chain + slot hashes)
ProvisioningDeep           (profile types)
EntitlementsMatrix         (21-row table)
BinaryInternals            (.ipa / .xcarchive / dSYM)
━━ RUNTIME ENV ━━
MultiEnvironment
PushNotifications
━━ DISTRIBUTION CHANNELS ━━
Channels
EnterpriseMdm
DmaEurope
━━ GOING LIVE ━━
Testflight
MetadataAndAso
━━ REVIEW ━━
ReviewProcess
InsideReviewRoom
Guidelines
StoreKitPayments
TopRejections
ErrorDecoder               ← interactive, 10 tabs
━━ WAR STORIES ━━
WarStoryHey / Epic / Beeper / More / SpaceInt
ReviewGame                 ← interactive
━━ POST-RELEASE ━━
Privacy
PhasedRelease
ExpeditedReview
FeatureFlags
CICD
Modularization
BuildOptimization
CrashMonitoring
━━ WRAP ━━
Comparison
Future
Takeaways
ThankYou
```

### 2.2 Narrative issues

| # | Observation | Impact | Fix |
|---|---|---|---|
| S1 | **Signing cluster is 5 slides in a row** (signing, signing‑deep, provisioning, entitlements, binary). Zero relief between them. | Audience fatigue at ~minute 15. | Split. Move `BinaryInternals` after `CICD` where it belongs topically (how the artifact you ship is structured), and move `EntitlementsMatrix` into a callable "reference card" section near the end. |
| S2 | **`MultiEnvironment` and `PushNotifications` are orphans** — wedged between signing mechanics and distribution channels. | Breaks flow. Push in particular is odd after binary internals. | Either group them into an "Ecosystem, part 2" block with `Ecosystem`, or move `Push` to near the entitlements slide and `MultiEnvironment` to the CI/CD cluster. |
| S3 | **StoreKit appears inside the Review block** but is really a commerce topic. Also, `Guidelines` → `StoreKitPayments` → `TopRejections` mixes "what you must obey" and "what you must pay" without signaling. | Reviewer confusion — the ‘Review’ chapter spends 3 slides on money, not rejections. | Extract a proper **Commerce** chapter: `StoreKitPayments` + `DmaEurope`. Leave `DmaEurope` in the ‘channels’ area only if you explicitly frame it as "a new channel". |
| S4 | **War Stories precede Privacy and Release-Management** but both of those have their own war-story-worthy material. | You peak the narrative at "Epic vs Apple", then downshift into Privacy Manifest minutiae. | Move `Privacy` + `PhasedRelease` + `ExpeditedReview` + `FeatureFlags` *before* the war-stories section. End on war stories + game → wrap. |
| S5 | **`ReviewGame` fires after 5 war stories** — audience is already in receive-mode. | Game falls flat. | Move game to right after `TopRejections` where the audience has just learned the categories and is primed to predict outcomes. |
| S6 | **`Comparison` slide placement.** Unclear what it compares — Android vs iOS? Then it belongs next to `Ecosystem`, not at the end. | Weak call-to-action before `Future`. | Either move up or retitle to "Takeaways vs other platforms". |

### 2.3 Missing structural elements

- **No chapter/act divider slides.** A deck this long needs 4–5 full‑bleed "ACT II — GETTING IT OUT" style dividers. Cheap to build, high payoff for live delivery.
- **No visual progress indicator.** 40 sections is a lot; audience loses their place. A tiny `8 / 40` in the nav bar (or a chapter dot row) costs <20 lines.
- **No "park it" / reference slides are labeled.** Tables like `EntitlementsMatrix` and `ErrorDecoder` are reference material. Mark them visually (a corner badge "REFERENCE — SKIM LIVE, LINK IN DECK") so the speaker does not feel obliged to narrate each row.
- **No speaker timing markers.** Every section should carry "(2 min)" next to its label. The agenda lists per-act timing — individual slides don't.
- **No callback structure.** The hook-quiz slide sets up 8 questions but nothing in the body explicitly says "answering question 3 from the opener". The deck would feel 3× more cohesive if 4–5 body slides had a small badge "Q3 — answered" tied back to the opener.

---

## 3. Content Coverage Audit

### 3.1 Topics covered well
Code signing mechanics (trust chain + slot hashes) · Provisioning profile types · Entitlements gating matrix · Binary anatomy · Review process (external + inside-reviewer view) · Top rejections · StoreKit commission matrix · DMA carve-outs · ASO metadata fields · Phased release · War stories (HEY, Epic, Beeper, XcodeGhost etc.) · CI/CD outline.

### 3.2 Topics missing or under-covered

#### High priority (senior audience will notice the gap)
- **App Transport Security (ATS)** — NSAllowsArbitraryLoads, per-domain exceptions, the 2017 deadline, and how banking apps navigate it. Not mentioned anywhere.
- **Universal Links & Associated Domains** — apple-app-site-association, `applinks:` entitlement, how review tests deep links. Entitlements matrix mentions it in one row; needs its own mini-slide.
- **App Attest / DeviceCheck** — anti-fraud tech every banking app uses. Privacy slide doesn't cover it.
- **On-demand Resources (ODR) & App Thinning in practice** — `BinaryInternals` touches ODR but only in passing; a "how we shrunk the app by 40%" callout would land.
- **Xcode Cloud vs self-hosted CI trade-offs** — CI slide assumes Bitrise; no comparison.
- **Widget/App Intents/ShareExtension distribution quirks** — they ship inside the same `.ipa` but each has its own entitlements, provisioning, and review paths (and separate rejection reasons).
- **Background modes** — audio, location, fetch, BGTask — each is a review hot-button. Currently absent.
- **WatchOS / tvOS / visionOS distribution** — talk claims "iOS" but attendees will ask. A single slide clarifying "scope is iOS; here's the one-line difference for each sibling platform".
- **App Store Connect roles & permissions** — `journey.tsx` covers the Developer Program roles; ASC has its own matrix (Admin, App Manager, Developer, Marketing, Sales, Customer Support, Finance). Not covered.
- **Phased release interactions with crashes** — how ASC auto-pauses phased rollout when crash rate exceeds a threshold, and how to override it. Phased slide doesn't mention.
- **Region restrictions & content ratings** — 175 storefronts, per-country pricing, age rating questionnaire (is 4+ → 17+), Japan game-gambling rules. Absent.
- **Price tiers + Apple's automated FX updates** — 900 price points, quarterly FX adjustments, Georgia/UZ local currency specifics (relevant to SpaceInt audience).
- **App sandbox & data container** — where user data actually lives, how backups interact, what "delete my account" actually means from an iOS filesystem perspective.

#### Medium priority
- **Apple developer account suspension flow** — what triggers it, what the email looks like, how to respond. (Pair with war stories.)
- **Export compliance (encryption)** — `ITSAppUsesNonExemptEncryption`, the CCATS flow for banking apps. One callout in `topRejections`? Not clear.
- **Localization pipeline** — `.xcstrings`, export/import, Lokalise, ICU message formats. `metadataAndAso` covers *store* localization; the *binary* localization story is absent.
- **Sandbox testing tools** — `StoreKit Testing in Xcode`, Configuration files, sandbox Apple ID quirks. StoreKit slide introduces SK2 code but doesn't mention how you actually test it.
- **TestFlight feedback channels** — screenshots, crash capture, per-build tester invite caps, the 90-day expiry. `testflight.tsx` — need to confirm depth (see Per-Slide section).
- **Deep Links for review** — "Review notes" field and demo account conventions. Deep link demos in Review Notes.
- **`privacy-manifest.xcprivacy`** — `privacy` slide covers at high level; a junior won't know that third‑party SDK privacy manifests need validation too. A table of "big SDKs and whether they ship a manifest" would be gold.

#### Low priority / nice-to-have
- Game Center / GameKit distribution specifics
- CarPlay & ExternalAccessory special reviews (entitlementsMatrix hints at this)
- HealthKit / HomeKit / ResearchKit extra review gates
- Family Sharing + subscription inheritance
- Offer codes / promo codes / subscription offers

### 3.3 Topics that are covered but at the wrong depth

| Slide | Current depth | Mismatch |
|---|---|---|
| `Privacy` | Likely intro-level (needs read) | Should be deeper given audience has banking-app exposure — ATT, App Tracking Transparency, SKAdNetwork/AdAttributionKit, DataKit, Privacy Manifest + API required reasons. Expand to 2 slides. |
| `PushNotifications` | One slide | Should be two: (1) entitlements + APNs topology; (2) operational reality — token rotation, throttling, silent pushes rejected in review, critical alerts entitlement. |
| `CICD` | One slide | Given a 75‑min talk to SpaceInt, who run Bitrise, one concrete pipeline slide should be expanded with a screenshot/timeline of their actual pipeline. |
| `Comparison` | Unclear | Needs content review — see Per-Slide section. |

---

## 4. Per-Slide Review

> Slides marked ⚠ need structural changes. Slides marked ⚡ are strong but have small improvement notes. Slides marked 🔴 have factual or clarity issues to fix.

### Act 1 — Opening

| Slide | Assessment |
|---|---|
| `hero` | 🔴 First-submit rejection stat needs a source or softening. Add a "based on ~X sample" footnote to 1.8M/24h/36%/$99. The $99 stat ignores the enterprise tier ($299), Apple Developer Enterprise Program eligibility changes, and Ask‑Apple/Safari tech‑talk free track. |
| `hookQuiz` | ⚡ Strong opener but must pay off. Add a closing slide at the end that re-lists the 8 questions with short answers. Without the payoff, the quiz feels like filler. |
| `agenda` | ⚠ **STALE.** Shows 5 acts + Q&A totaling 75 min. Deck now has 40 sections. Rewrite to reflect current narrative, or keep a "high-level acts" view and add a secondary "detailed chapters" index slide. |
| `history` | ⚡ 2008–2026 timeline. Verify: was Mac App Store 2011? TestFlight acquisition Feb 2014. App Store Connect rename Jun 2018. SwiftUI Jun 2019. DMA enforcement Mar 2024. Every date a senior knows will get fact-checked live. |
| `journey` | Verify content — roles, Dev Program flow. |
| `ecosystem` | Good placement. Verify content. |

### Act 2 — Signing

| Slide | Assessment |
|---|---|
| `codeSigning` | Overview slide — good as primer. |
| `codeSigningMechanics` | ⚡ Deep + correct. Add one callout about **ad hoc signing** (`-`) for local dev and why CI must never use it for real distribution. |
| `provisioningDeep` | ⚡ Add `xcode-select --install` / `xcrun simctl` caveat: simulator binaries are not signed. Often bites new devs. Also add the modern advice: **use automatic signing + App Store Connect API key for CI**. |
| `entitlementsMatrix` | 🔴 Table likely has rows only. Needs a "how to request" link column or callout ("Which entitlements require a Request Form, which require Apple Account Manager approval"). |
| `binaryInternals` | ⚡ Strong. Add `xcrun altool` / `xcrun notarytool` commands — they are the actual upload path, and nobody's seen them before. |

### Act 3 — Runtime environment

| Slide | Assessment |
|---|---|
| `multiEnvironment` | ⚠ Placement issue (see §2.2, S2). Content likely about Debug/Staging/Prod schemes & configurations. Confirm it covers **`.xcconfig`**, **fastlane environments**, **scheme sharing**, **Info.plist variable substitution**. |
| `pushNotifications` | ⚠ Under‑covered (see §3.3). |

### Act 4 — Distribution channels

| Slide | Assessment |
|---|---|
| `channels` | Primer. Confirm covers: App Store, TestFlight, Ad‑Hoc (100 devices), Enterprise, Custom B2B, Unlisted, Marketplace (DMA), Web Distribution (DMA). |
| `enterpriseMdm` | Should specifically mention **program tightening** after the Facebook/Google/Uber abuses of 2019 — enrolment now rare + heavily vetted. |
| `dmaEurope` | ⚡ Add **developer‑consequences table**: if I take the new terms, can I switch back? (Yes with limits — document it). And the **1M‑install threshold calculation** example. |

### Act 5 — Going live

| Slide | Assessment |
|---|---|
| `testflight` | Needs check for: tester count caps (100 internal, 10 000 external), 90‑day build expiry, groups vs individual, external review time (first build ~24h, subsequent minutes), beta app description + test info required fields. |
| `metadataAndAso` | ⚡ Strong. Add: **App Store optimization tools** list (Appfigures, Sensor Tower, App Annie / data.ai, AppTweak) — audience will ask. Add **App Privacy labels** distinction vs Privacy Manifest (commonly confused). |

### Act 6 — Review

| Slide | Assessment |
|---|---|
| `reviewProcess` | Verify covers: response-time expectations, how to respond in Resolution Center, the "demo account" requirement, build-vs-metadata-only rejection distinction. |
| `insideReviewRoom` | 🔴 **Fact-check the 24% appeal reversal rate and "Sunnyvale/Cork/Shanghai".** These were accurate ~2019; Apple restructured review more than once. Add a date to any operational claim. |
| `guidelines` | Verify it lists the 5 sections (Safety, Performance, Business, Design, Legal) with example rules. |
| `storeKitPayments` | ⚡ Strong. Add a **server-to-server notifications** (v2) callout — that's the senior thing people miss. |
| `topRejections` | Needs check for 2024/2025-era top rejection reasons (privacy manifest API reasons #1 since May 2024). |
| `errorDecoder` | ⚡ Strong. Interactive. Add a **"not all errors are real — some are Apple infrastructure flakes"** note and 2–3 examples (transient "Unable to Process" errors). |

### Act 7 — War stories

| Slide | Assessment |
|---|---|
| `warStoryHey` | Verify Gruber's original timeline and DHH tweets, and the resolution (HEY shipped a separate iPad/Mac free tier). |
| `warStoryEpic` | Confirm updated post Gonzalez‑Rogers final ruling (Jan 2024) and Apple's anti‑steering response (Apr 2024). |
| `warStoryBeeper` | Confirm Dec 2023 timeline — Beeper Mini launch, Apple block, Beeper's open protocol response. |
| `warStoriesMore` | XcodeGhost, Wordle clones, Fortnite, Phoenix (SpaceX livestream)? Confirm coverage. |
| `warStorySpaceInt` | ⚡ **This is the unique value of the talk.** Triple-check names/stats with internal stakeholders before presenting. Screenshots of Resolution Center messages (redacted) would be gold. |
| `reviewGame` | ⚡ Move earlier (see §2.2, S5). |

### Act 8 — Post-release

| Slide | Assessment |
|---|---|
| `privacy` | ⚠ Expand. See §3.3. |
| `phasedRelease` | Add: auto‑pause on crash-rate spike; interaction with expedited; who can override. |
| `expeditedReview` | Add: justified reasons Apple accepts (security fix, public‑event tie‑in). Misuse burns future expedited quota. |
| `featureFlags` | Verify covers: Firebase Remote Config, LaunchDarkly, Apple's own feature flagging, and the **Review policy** — shipping a binary that behaves differently on review vs prod is guideline 2.3 territory (Mistrack, 2019). |
| `cicd` | ⚠ Expand. See §3.3. |
| `modularization` | Confirm this is the iOS Space monorepo story (SPM + submodules). |
| `buildOptimization` | Confirm content — build-time parallelism, module split, incremental builds, deterministic signing. |
| `crashMonitoring` | ⚡ Strong. Add a **cost comparison** column to the 6-row tool matrix — senior audiences budget for this. |

### Act 9 — Wrap

| Slide | Assessment |
|---|---|
| `comparison` | ⚠ Unclear — fact-check that content fits the "wrap" slot or move. |
| `future` | Verify covers: DMA expansion, USB-C App Store, AI/App Intents, Vision Pro app distribution, potential DOJ outcomes. |
| `takeaways` | **Add a concrete checklist** (see §1 item 9). |
| `ThankYou` / Footer | Add speaker contact (if public). Add a link to a GitHub gist of the deck's checklist. |

---

## 5. Cross-Cutting Concerns

### 5.1 Timing & pacing
- **Budget:** 75 min, realistic speaking rate 1.5–2 min per content slide, 30 sec per reference slide, 3–5 min per interactive (hook quiz + review game).
- **Rough fit:** 28 content slides × 1.8 = 50 min, 8 reference × 0.5 = 4 min, 2 interactive × 4 = 8 min, Q&A 8 min = **70 min**. This leaves 5 min for dividers / breath. Workable, but tight.
- **Recommendation:** label every section with a speaker-timing badge. Any slide marked "reference" gets a ≤30s budget and visually signals "skim".

### 5.2 Delivery mechanics
- **Dark mode only.** Venue projectors may wash out. Add a screenshot test on a mid-brightness projector.
- **Keyboard nav exists** (`useKeyboardNav`) — perfect. Test that `useLocalTabNav` on `errorDecoder` (10 tabs) and `reviewGame` intercepts arrows while active and releases them when not.
- **No speaker-notes view.** React/Vite presentations can add an `s` key to toggle a side panel with notes. Worth building if this deck is re‑used.
- **No timer.** Embed a tiny clock (top-right) that starts when the hero leaves viewport. The speaker will thank you.

### 5.3 Accessibility
- **Color contrast on `C.muted` text** needs spot‑checking; `#999` on `#0a0a0a` is ~8:1 which passes, but any bluer muted variant may fail.
- **`Reveal` animations respect `prefers-reduced-motion`?** Verify — otherwise attendees with vestibular issues have a bad time for 75 min.
- **Font sizes in tables.** `entitlementsMatrix` (21 rows) and `storeKitPayments` (8 rows) are dense — verify they scale to a 4K projector at the back of a 50-seat room.

### 5.4 Consistency
- **Section padding `96px 48px` enforced.** Good.
- **Alternating bg / surface enforced?** Confirm new slides follow the rhythm (per commit messages they do — worth a final eye pass).
- **Callout colors:** mix of `C.red`, `C.yellow`, `C.accent`, `P`. Document the semantics (red = blocker, yellow = gotcha, accent = insight, blue = example) so the audience reads them as signal rather than noise.
- **Code-block language labels** present? Ensure `swift`, `ts`, `json`, `shell`, `plist` all appear (helps the audience parse each quickly).

### 5.5 Factual correctness — items to verify before delivery

1. Hero stat: **36% first-submit rejection rate** — cite or remove.
2. `insideReviewRoom`: **24% appeal reversal**, **Sunnyvale/Cork/Shanghai** — date-stamp.
3. `storeKitPayments`: **commission matrix rows** — verify Reader rule, News Publisher program, Video Partner program numbers against current ASC docs.
4. `dmaEurope`: **€0.50 CTF**, **1 M threshold**, **Apple can revoke notarization** — confirm current as of April 2026 (DMA rules changed mid‑2025).
5. `history`: every date.
6. `warStoryHey`/`Epic`/`Beeper`: every outcome claim.
7. `crashMonitoring`: tool feature claims.
8. `entitlementsMatrix`: gating level per row (Auto vs Request Form vs Apple Account Manager approval vs EU-only).
9. `errorDecoder`: each ITMS code description — Apple has rewritten some in 2024/2025.
10. `metadataAndAso`: **App Preview Video +18% conversion** — cite source (internal TBC? public study?) or remove.

---

## 6. Missing Deliverables

These are *outside* the deck but make the talk 10× more useful:

- **Speaker notes document** (`SPEAKER_NOTES.md`) — for each slide, 3–5 bullet points the speaker wants to hit.
- **Printable cheat sheet** (`CHEATSHEET.md`) — the "what to do on ship day" + top-10 rejection codes + signing one-liner. Handed out after the talk.
- **Links appendix** (`LINKS.md`) — every Apple doc, every news article for war stories, every tool mentioned. Audience will request.
- **Q&A prep** (internal) — anticipated questions + prepared answers for the hardest 10. Senior engineers will probe.
- **Before/after screenshot** of SpaceInt app TestFlight → App Store flow, redacted. Proof we live this.

---

## 7. Improvement Backlog (prioritized)

### P0 — must fix before delivery
- [ ] Rewrite `agenda` slide to match current 40-section reality (or consolidate acts)
- [ ] Update `PresentationNav` jump-links to cover all acts
- [ ] Fact-check factual claims in §5.5 items 1–10
- [ ] Add speaker-timing badge to every section header
- [ ] Add 4–5 act-divider slides
- [ ] Move `reviewGame` to after `TopRejections`; move `Privacy` cluster before war stories
- [ ] Add a "takeaway checklist" to `takeaways` slide

### P1 — strong improvements
- [ ] Split `pushNotifications` into two slides (entitlements vs operational)
- [ ] Expand `privacy` to two slides (ATT + Privacy Manifest + API reasons + App Privacy labels)
- [ ] Expand `cicd` with the actual SpaceInt Bitrise pipeline
- [ ] Add missing topics: ATS, Universal Links, App Attest, ASC roles, Phased×Crash, Region/Rating, Price tiers
- [ ] Build one canonical pipeline diagram and reference from 5 slides
- [ ] Decide: `comparison` slot — fix or move
- [ ] Add reference-card corner badge to `entitlementsMatrix` + `errorDecoder` + `storeKitPayments` matrix
- [ ] Add a "when review goes wrong" decision tree slide
- [ ] Build speaker-notes panel (toggle with `s` key)

### P2 — polish
- [ ] Add progress indicator (`n / 40`) in the nav
- [ ] Add a callback badge ("Q3 — answered") on 4–5 body slides tied to `hookQuiz`
- [ ] Add cost column to `crashMonitoring` tool matrix
- [ ] Add server-to-server notifications v2 callout to `storeKitPayments`
- [ ] Add `xcrun notarytool` / `altool` commands to `binaryInternals`
- [ ] Add modern signing automation slide (`-allowProvisioningUpdates`, `fastlane match`, App Store Connect API key)
- [ ] Verify `prefers-reduced-motion` on all `Reveal` + `animation` usages
- [ ] Contrast-check `C.muted` at projector brightness
- [ ] Document callout color semantics (`ui.tsx` comment)

### P3 — stretch
- [ ] Ship companion `SPEAKER_NOTES.md`, `CHEATSHEET.md`, `LINKS.md`
- [ ] Record a 5-min condensed version for Loom / async consumption
- [ ] Build a "short version" index.tsx variant (30 min, 20 sections) for future reuse
- [ ] Add watchOS/tvOS/visionOS scope-clarifier slide
- [ ] Add widgets / extensions / App Intents distribution quirks slide
- [ ] Add export-compliance / encryption slide
- [ ] Add Xcode Cloud vs self-hosted comparison slide
- [ ] Add "how to test StoreKit without shipping" slide

---

## 8. Structural Refactor Proposal (optional, for a v2)

If the talk is delivered more than once, restructure the 40 sections into **9 clearly labeled chapters** with dividers:

```
0  Opening         — hero, hookQuiz, agenda, history
1  Plumbing        — journey, ecosystem, codeSigning, codeSigningMechanics,
                     provisioningDeep, entitlementsMatrix, pushNotifications
2  Environments    — multiEnvironment, cicd, modularization, buildOptimization,
                     binaryInternals
3  Distribution    — channels, testflight, phasedRelease, expeditedReview,
                     enterpriseMdm, dmaEurope
4  Selling         — metadataAndAso, storeKitPayments
5  Review          — reviewProcess, insideReviewRoom, guidelines, topRejections,
                     errorDecoder, reviewGame
6  Post-release    — crashMonitoring, featureFlags, privacy
7  War Stories     — hey, epic, beeper, more, spaceInt
8  Wrap            — future, comparison, takeaways
```

Each chapter gets a full-bleed divider slide. Count shrinks from 40 to 41 (40 + 1 re-homed) but reads as 9 chapters + 1 intro + 1 outro.

---

## 9. Definition of "Done" for the next iteration

Before calling the deck v2-ready, all of the following should be true:

1. Every section has a speaker-timing badge and the total fits in 67 minutes (leaving 8 for Q&A).
2. Every fact-checkable claim (§5.5) is either cited on-slide or verified internally.
3. `agenda` slide matches actual render order and act structure.
4. Top nav links cover every act.
5. At least 4 chapter-divider slides exist.
6. `takeaways` slide ends with a concrete, transferable checklist.
7. `hookQuiz` has a closing answers slide.
8. `SPEAKER_NOTES.md`, `CHEATSHEET.md`, `LINKS.md` exist in the `ios-distribution/` folder.
9. Speaker has done one full dry-run with a timer and the total lands within 72–77 minutes.
10. An iOS staff+ engineer not involved in building the deck has reviewed and signed off.

---

*End of audit.*
