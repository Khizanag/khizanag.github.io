# `/figma-to-screen` Presentation — Multi-Persona Review

**Reviewers:** Junior · Mid-level · Senior · Architect (parallel critique passes)
**Subject:** 27-section deck under `src/presentations/slides/figma-to-screen/`
**Date:** April 2026
**Verdict:** Ship it — but fix the 6 cross-persona issues below first.

---

## Executive summary

The deck is **strategically right** (Architect: "proceed with aggressive investment") and **architecturally credible** (Senior: "deep respect for build-system discipline"), but it **leaks trust at the working-engineer level** (Mid: "calling it a black box triggers my alarm"; Junior: "wouldn't know which of the 17 failed").

**The narrative arc works.** Context-before-mechanics restructure paid off — every persona understood the elevator pitch. The Code Connect deep-dive landing late let the audience absorb it instead of bouncing.

**The trust problem is concentrated in 4 missing slides.** Add them and the deck graduates from "impressive demo" to "operational playbook."

---

## Top issues — ranked by cross-persona consensus

### 1. No "what to do when it breaks" slide — flagged by Mid + Senior + Architect
- Mid: *"if `destination-patcher` fails to find a MARK anchor, does it corrupt my Destination.swift or abort the run?"*
- Senior: *"Code Review Erosion — if 90% of a screen is 'perfect,' reviewers may stop looking at the 10% that actually matters"*
- Architect: *"how do you 'unstick' the MCP server if local port 3845 is taken?"*
- **Add:** a single "When a phase fails" slide. Show the `.logs/<runId>/screen-context.json` failure example, the validate exit codes (1/2/3), and the recovery path. Explicit escape hatches (`@unstick`, manual rollback, `git restore`).

### 2. No "Day 2" / regeneration / refactor-friendliness slide — flagged by Mid + Senior
- Mid: *"If I update the Figma design, how do I 'refresh' just the View without overwriting my manual ViewModel logic?"*
- Senior: *"Visualise the 'Refactor Path' — show how easy it is to modify the generated scaffold without fighting the machine's choices"*
- **Add:** A "Day 2" slide between Example and Do/Don't. Show the same screen 6 weeks later with hand-edited business logic, and how `/figma-review` behaves vs. `@figma-to-view` regeneration.

### 3. No telemetry / evaluation slide — flagged by Senior + Architect
- Senior: *"How do we measure if agents are getting better or worse over time?"*
- Architect: *"We need an 'Evaluation & Testing' slide for the agents themselves... Real $/run metrics"*
- **Add:** Promote `Pipeline telemetry` from "What's Next" placeholder to a real slide showing today's instrumentation + the gold-standard regression suite roadmap.

### 4. No glossary / "first 5 minutes" pane — flagged by Junior (hard) + Mid (soft)
- Junior listed 6 undefined terms (MCP, Code Connect, scaffolding, orchestrator, SwiftGen, T1/T2 gates).
- Mid: *"high-concept marketing fluff that doesn't tell me how you solved it"* on the prose-vs-code slide.
- **Add:** A 6-row glossary card on the back of `whatIs.tsx`, OR a dedicated "10 terms before we go further" slide right after the elevator pitch.

### 5. Soft / unverifiable claims erode trust — flagged by Mid + Senior + Architect
- Mid: *"'roughly a day saved' is a stretch... makes me feel like I'm being sold"*
- Senior: *"Claims of 'pixel-perfect' rely heavily on Code Connect"* (caveat missing)
- Architect: *"The deck claims we save 'roughly a day,' but we lack the telemetry to prove this"*
- **Fix:** Replace `getStarted.tsx` "roughly a day" with a concrete metric (zero boilerplate files, # of MARK anchors patched, etc.). Replace `problem.tsx` "pixel-perfect" with "pixel-perfect for any Code-Connected component; raw frames fall back to manual layout."

### 6. Concurrency / Swift 6 invisible — flagged by Senior
- Senior: *"no mention of how the pipeline handles modern Swift 6 strict concurrency... beyond a single `@MainActor` in a code snippet"*
- **Fix:** Add a 3-line callout to `example.tsx` showing the `@MainActor`/actor stance baked into the layer-scaffolder template.

---

## Per-persona highlights

### Junior — *"I'd try it Monday morning, but I'd be afraid to debug it"*
**Wins:** elevator pitch landed, user-flow slide made it feel approachable, lookups (`/token-lookup`, `/icon-lookup`) felt usable solo.
**Loses:** "17 agents" was intimidating without a one-talks-to-many diagram. `screen-context.json` location and `.logs/` location both unspecified visually.
**Top ask:** *"Visual 'Where to look' list — show me where screen-context.json and .logs live in the file tree."*

### Mid-level — *"Yes for Presentation, no for Domain/Data until I trust it"*
**Wins:** SwiftLint as T1 block, validate-screen-context.mjs as a pre-reply gate, real file paths in `flagship.tsx`, the 24h MCP cache.
**Loses:** "black box" framing in `userFlow.tsx`, "perfect" claims, no conflict-resolution story for parallel git work on `Injection.swift`.
**Top ask:** *"Add a Conflict Resolution slide — what happens during a git merge if the agent touched central files?"*

### Senior — *"Architecturally credible, but business-logic gap and code-review erosion concern me"*
**Wins:** cache witnesses + mtime check, ownership table, MARK anchor strategy for future inverse-patcher, tiered instructions with byte-cap, branch-safe commit gate.
**Loses:** TODOs masking refactor-friendliness, no Swift 6 concurrency story, no deprecation path when S.I.N.S. components age out.
**Top ask:** *"Add a Concurrency section — how does layer-scaffolder handle Swift 6 strict concurrency for actors and ViewModels?"*

### Architect — *"Greenlight continued investment, but pre-conditions before scaling"*
**Wins:** schema-as-source-of-truth, T1/T2 gates, instructions-as-data, parallel I/O contract, explicit per-agent ownership.
**Loses:** template/agent governance silent, MCP vendor lock-in unmitigated, no economic ROI, no agent regression suite, multi-root workspace setup is a fragile UX point.
**Top ask:** *"Add a Governance & Ownership slide — explicitly state which team owns the 116 mappings and the 17 agents."*

---

## Recommended deck changes (in order)

| # | Change | Inserts at | Persona impact |
|---|---|---|---|
| 1 | New **"When a phase fails"** slide | after `gates` | Mid+Senior+Architect |
| 2 | New **"Day 2 — refactor & regenerate"** slide | after `example` | Mid+Senior |
| 3 | New **"Telemetry & evaluation"** slide | replace placeholder in `whatsNext` | Senior+Architect |
| 4 | New **"10 terms"** glossary card | after `whatIs` | Junior |
| 5 | Tighten `getStarted.tsx` + `problem.tsx` claims (replace soft language with metrics + caveats) | in-place | Mid+Senior+Architect |
| 6 | Add Swift 6 concurrency callout in `example.tsx` | in-place | Senior |
| 7 | Add **"Governance & Ownership"** slide naming template owners + agent owners | after `agents` | Architect |
| 8 | Add **"Cost per screen"** mini-block to `prosCons` | in-place | Architect |

---

## Final note

No persona said *"don't ship this."* The deck already does the hardest part — it **convinces a skeptical senior** that the architecture is sound and **excites a junior** to try it Monday. The delta to a top-tier internal tech talk is mostly **operational honesty** (failure modes, refactor stance, real metrics) rather than **content depth**.

Estimated work to address all 8 changes: 4 new sections + 3 in-place edits = roughly half the time of the original deck build, since the visual primitives (`PlainEnglishBox`, `CodeBlock`, `FeatureCard`, `LayerBox`) are already in `ui.tsx`.
