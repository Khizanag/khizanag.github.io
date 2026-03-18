import { useState, useRef } from "react";
import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, CalloutBox, TabButton, PlainEnglishBox, useLocalTabNav } from "../../shared.jsx";
import { P } from "./ui.jsx";

// ─── Issue Template files ────────────────────────────────────────────────────

const BUG_REPORT = `---
name: 🐛 Bug Report
about: Report a crash, freeze, or unexpected SDK behavior
title: "[BUG] "
labels: ["bug", "needs-triage"]
assignees: ''
---

## Summary
<!-- One sentence: what goes wrong? -->

## Environment
| Field         | Value                         |
|---------------|-------------------------------|
| SDK Version   | e.g. 3.2.1                    |
| iOS Version   | e.g. 17.2                     |
| Device        | e.g. iPhone 15 Pro            |
| Xcode Version | e.g. 15.2                     |
| Integration   | SPM / CocoaPods / XCFramework |

## Steps to Reproduce
1.
2.
3.

## Expected vs Actual Behavior

## Crash Log / Stack Trace
\`\`\`
Paste here
\`\`\`

## Reproducible in Isolation?
- [ ] Yes — attaching minimal sample project
- [ ] No — only in my full app`;

const FEATURE_REQUEST = `---
name: ✨ Feature Request
about: Suggest a new API, capability, or SDK improvement
title: "[FEATURE] "
labels: ["enhancement"]
assignees: ''
---

## Problem Statement
<!-- What can't you do today that you need to do? -->

## Proposed Solution
<!-- How should it work? An API sketch helps. -->

## Swift API Sketch
\`\`\`swift
// Example: how you'd like to use the new feature
let session = try await PaymentsSDK.shared.beginCheckout(
    amount: .init(value: 9.99, currency: .usd),
    method: .applePay
)
\`\`\`

## Alternatives Considered
<!-- What else did you consider? Why not those? -->

## Platform Scope
- [ ] iOS only
- [ ] iOS 16+ minimum (current target)
- [ ] iOS 17+ (latest APIs)
- [ ] SwiftUI only / UIKit only / Both`;

const ISSUE_CONFIG = `blank_issues_enabled: false

contact_links:
  - name: 🔐 Security Vulnerability
    url: https://github.com/AcmeCorp/iOS-Payments/security/advisories/new
    about: Report vulnerabilities privately — never as a public issue

  - name: 💬 General Questions
    url: https://github.com/AcmeCorp/iOS-Payments/discussions
    about: Ask how-to questions in Discussions, not Issues

  - name: 📚 SDK Documentation
    url: https://docs.acmecorp.dev/ios-payments
    about: Check the docs first — your answer may already be there`;

// ─── PR Template ─────────────────────────────────────────────────────────────

const PR_TEMPLATE = `## Summary
<!-- What does this PR do? Why? Link to issue: Closes #NNN -->

## Type of Change
- [ ] 🐛 Bug fix (non-breaking, fixes an issue)
- [ ] ✨ New feature (non-breaking, adds functionality)
- [ ] 💥 Breaking change (existing code will break)
- [ ] 🔧 Refactor (no behavior change)
- [ ] 📝 Documentation / comments only

## Test Coverage
- [ ] Unit tests added / updated
- [ ] All existing tests pass (⌘U)
- [ ] SwiftLint passes (\`swiftlint lint --strict\`)
- [ ] Tested on physical device

## Device Testing Matrix
| Device              | iOS   | Result |
|---------------------|-------|--------|
| iPhone 15 Pro       | 17.2  |        |
| iPhone SE (3rd gen) | 16.7  |        |
| iPad Air M2         | 17.2  |        |

## Screenshots / Screen Recording
<!-- Required for any UI change. Drag and drop below. -->

## Public API Changes
<!-- List added, changed, or removed public symbols. -->
<!-- Breaking changes MUST be documented here. -->

## Notes for Reviewer
<!-- Anything to pay special attention to? -->`;

// ─── Discussion Template ──────────────────────────────────────────────────────

const DISCUSSION_TEMPLATE = `title: Share a Feature Idea
labels: ["feature-idea"]
body:
  - type: markdown
    attributes:
      value: |
        ## Propose a new SDK capability
        For bugs or crashes, open an Issue instead.

  - type: textarea
    id: problem
    attributes:
      label: What problem does this solve?
      description: Describe the current limitation or pain point.
      placeholder: "Right now I have to..."
    validations:
      required: true

  - type: textarea
    id: api_sketch
    attributes:
      label: Swift API sketch
      description: How would you call this if it existed?
      render: swift
    validations:
      required: false

  - type: dropdown
    id: platform
    attributes:
      label: Platform scope
      options:
        - iOS only
        - iOS + macOS Catalyst
        - All Apple platforms
    validations:
      required: true`;

// ─── Main types ───────────────────────────────────────────────────────────────

const MAIN_TABS = [
  {
    id: "issue",
    label: "ISSUE_TEMPLATE/",
    color: C.blue,
    icon: "🐛",
    tagline: "Guide every bug report and feature request",
    idea: "Without a template, issues arrive with almost no useful information — 'it crashes' with no iOS version, no device, no steps. With templates, contributors are walked through exactly what you need. The chooser appears when opening a new issue and can be configured to block blank issues entirely.",
    structure: [
      { name: "ISSUE_TEMPLATE/",        desc: "directory", color: C.blue },
      { name: "  bug_report.md",        desc: "→ shown as 'Bug Report' card" },
      { name: "  feature_request.md",   desc: "→ shown as 'Feature Request' card" },
      { name: "  config.yml",           desc: "→ controls chooser + contact links" },
    ],
    junior: "When someone clicks 'New Issue' on GitHub, they see a menu of template cards. Picking one fills in the issue body with a pre-written form — they just fill in the blanks.",
    subtabs: [
      { label: "bug_report.md",       code: BUG_REPORT,       filename: "ISSUE_TEMPLATE/bug_report.md",     highlights: [3,4,5,6,15,16,17,18,19,20] },
      { label: "feature_request.md",  code: FEATURE_REQUEST,  filename: "ISSUE_TEMPLATE/feature_request.md",highlights: [10,11,12,13,14,15,16] },
      { label: "config.yml",          code: ISSUE_CONFIG,     filename: "ISSUE_TEMPLATE/config.yml",        highlights: [1,3,4,5,6,8,9,10,12,13,14] },
    ],
  },
  {
    id: "pr",
    label: "PULL_REQUEST_TEMPLATE.md",
    color: C.accent,
    icon: "🔀",
    tagline: "Standardize every pull request body",
    idea: "Pre-fills the PR description body automatically whenever someone opens a new pull request. No more 'fix stuff' descriptions or missing test info. Every PR arrives with the same structure: what changed, why, what was tested, screenshots for UI work.",
    structure: [
      { name: "PULL_REQUEST_TEMPLATE.md", desc: "single template (most common)", color: C.accent },
      { name: "— or for multiple types —", desc: "" },
      { name: "PULL_REQUEST_TEMPLATE/",   desc: "directory for multiple templates" },
      { name: "  bug_fix.md",             desc: "selected via ?template=bug_fix.md URL" },
      { name: "  feature.md",             desc: "selected via ?template=feature.md URL" },
    ],
    junior: "When you open a Pull Request on GitHub, the description box is already filled in with a form. You don't have to remember what to write — the template tells you exactly what reviewers need to know.",
    subtabs: [
      { label: "PULL_REQUEST_TEMPLATE.md", code: PR_TEMPLATE, filename: ".github/PULL_REQUEST_TEMPLATE.md", highlights: [9,10,11,12,14,15,16,17,18] },
    ],
  },
  {
    id: "discussion",
    label: "DISCUSSION_TEMPLATE/",
    color: P,
    icon: "💬",
    tagline: "Structure community discussions by category",
    idea: "Each YAML file maps to a discussion category slug. When a user starts a discussion in that category, the form renders as structured input fields instead of a blank text box — turning freeform feedback into organized, searchable data.",
    structure: [
      { name: "DISCUSSION_TEMPLATE/", desc: "directory", color: P },
      { name: "  ideas.yml",          desc: "→ maps to 'Ideas' category slug" },
      { name: "  q_and_a.yml",        desc: "→ maps to 'Q&A' category slug" },
      { name: "  general.yml",        desc: "→ maps to 'General' category slug" },
    ],
    junior: "GitHub Discussions are like a forum. This template makes certain discussion categories into structured forms — instead of a blank box, you answer specific questions when starting a discussion.",
    subtabs: [
      { label: "ideas.yml", code: DISCUSSION_TEMPLATE, filename: "DISCUSSION_TEMPLATE/ideas.yml", highlights: [2,7,8,9,14,15,16,17,18] },
    ],
  },
];


function SubTab({ label, active, color, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "5px 12px", borderRadius: 8, border: `1px solid ${active ? color : C.border}`,
        background: active ? `${color}15` : "transparent", color: active ? color : C.muted,
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11, cursor: "pointer",
        transition: "all 0.15s", outline: "none",
      }}
    >
      {label}
    </button>
  );
}

export function TemplatesSection() {
  const [mainIdx, setMainIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const tab = MAIN_TABS[mainIdx];
  const sub = tab.subtabs[subIdx];

  const handleMain = (i) => { setMainIdx(i); setSubIdx(0); };
  const mainIdxRef = useRef(mainIdx);
  mainIdxRef.current = mainIdx;
  useLocalTabNav("s-templates", MAIN_TABS.length, mainIdxRef, handleMain);

  return (
    <section id="s-templates" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel color={P}>TEMPLATES</SectionLabel>
          <SectionHeading sub="Three template systems that turn unstructured, often incomplete user input into consistent, actionable information. iOS-specific examples throughout.">
            Structured Collaboration
          </SectionHeading>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
            {MAIN_TABS.map((t, i) => (
              <TabButton key={t.id} active={i === mainIdx} color={t.color} icon={t.icon} label={t.label} onClick={() => handleMain(i)} />
            ))}
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.subtle, marginLeft: "auto" }}>
              ← → to cycle
            </span>
          </div>
        </Reveal>

        <div
          key={mainIdx}
          style={{
            background: C.bg, border: `1px solid ${tab.color}35`,
            borderTop: `3px solid ${tab.color}`, borderRadius: 14, overflow: "hidden",
            animation: "fadeIn 0.2s ease both",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr" }}>
            {/* Left panel */}
            <div style={{ padding: "26px 28px", borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 6 }}>
                  <span style={{ fontSize: 20 }}>{tab.icon}</span>
                  <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: tab.color }}>{tab.label}</code>
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: C.muted }}>{tab.tagline}</div>
              </div>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: C.muted, lineHeight: 1.8, margin: 0 }}>
                {tab.idea}
              </p>

              {/* Junior explanation */}
              <PlainEnglishBox color={tab.color}>{tab.junior}</PlainEnglishBox>

              {/* File structure */}
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: C.muted, letterSpacing: "0.12em", marginBottom: 10 }}>FILE STRUCTURE</div>
                <div style={{ background: C.surface, borderRadius: 8, padding: "12px 14px" }}>
                  {tab.structure.map((line, i) => (
                    <div key={i} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: line.color ? line.color : line.name.startsWith("—") ? C.subtle : line.name.startsWith("  ") ? C.muted : C.text, lineHeight: 1.9 }}>
                      {line.name}
                      {line.desc && <span style={{ color: C.subtle }}> {line.desc}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right panel: code with sub-tabs */}
            <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
              {tab.subtabs.length > 1 && (
                <div style={{ display: "flex", gap: 8 }}>
                  {tab.subtabs.map((s, i) => (
                    <SubTab key={s.label} label={s.label} active={i === subIdx} color={tab.color} onClick={() => setSubIdx(i)} />
                  ))}
                </div>
              )}
              <div key={subIdx} style={{ animation: "fadeIn 0.15s ease both" }}>
                <CodeBlock filename={sub.filename} highlights={sub.highlights}>{sub.code}</CodeBlock>
              </div>
            </div>
          </div>
        </div>

        <Reveal delay={0.4}>
          <div style={{ marginTop: 20 }}>
            <CalloutBox color={C.blue} label="FORCE TEMPLATES" icon="🚫">
              Set <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.blue }}>blank_issues_enabled: false</code> in <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.blue }}>config.yml</code> to make templates mandatory. Without it, contributors can skip every template with one click. For a maintained SDK, always disable blank issues.
            </CalloutBox>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
