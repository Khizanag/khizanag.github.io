import { useState, useRef } from "react";
import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, CalloutBox, TabButton, useLocalTabNav } from "../../src/shared.jsx";
import { P } from "./ui.jsx";

const CONTRIBUTING = `# Contributing to iOS-Payments SDK

## Prerequisites
- Xcode 15.2+  |  Swift 5.9+
- iOS Simulator: iPhone 15 Pro (iOS 17.2)
- SwiftLint: \`brew install swiftlint\`

## Getting Started
1. Clone the repo
2. Open \`iOSPayments.xcworkspace\`
3. Run \`swift package resolve\`
4. Build: ⌘B  |  Test: ⌘U

## Branch Naming
- \`feature/PAY-123-apple-pay-support\`
- \`bugfix/PAY-456-checkout-crash\`
- \`refactor/payment-service-cleanup\`

## Before Opening a PR
- [ ] \`swiftlint lint --strict\` → 0 violations
- [ ] All unit tests pass (⌘U)
- [ ] New code has test coverage
- [ ] UI changes include screenshots
- [ ] No force unwraps (\`!\`) introduced`;

const SECURITY = `# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 3.x     | ✅ Active          |
| 2.x     | ✅ Until Q3 2026   |
| 1.x     | ❌ End of life     |

## Reporting a Vulnerability

⚠️  Do NOT open a public GitHub issue.

Email: security@acmecorp.dev

Include in your report:
- Affected SDK version + iOS version
- Device model and Xcode version
- Steps to reproduce
- Potential impact assessment

Response time: 48 hours.
Critical patches ship within 7 days.`;

const SUPPORT = `# Getting Help

## Before Opening an Issue
1. 📚 Check the SDK docs → docs.acmecorp.dev/ios
2. 🔍 Search existing issues and discussions
3. 💬 Ask in GitHub Discussions

## Where to Ask What

| Question type             | Go here              |
|---------------------------|----------------------|
| How to integrate the SDK  | GitHub Discussions   |
| Found a bug / crash       | GitHub Issues        |
| Urgent (internal team)    | Slack: #ios-sdk      |
| General Swift questions   | Stack Overflow       |

Stack Overflow tag: \`acme-ios-sdk\`

## What NOT to Use Issues For
- General Swift / SwiftUI questions
- Xcode configuration help
- App Store submission questions
- Questions answered in the docs`;

const CONDUCT = `# Contributor Code of Conduct

## Our Pledge
We pledge to make participation in our project
a harassment-free experience for everyone,
regardless of age, experience level, or background.

## Expected Behavior ✅
- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Show empathy toward other contributors

## Not Acceptable ❌
- Sexualised language or unwanted advances
- Trolling, insults, or derogatory comments
- Publishing others' private information
- Any form of harassment

## Enforcement
Violations → ios-conduct@acmecorp.dev

Maintainers may remove, edit, or reject any
contribution not aligned with this Code.
Repeat violations result in a permanent ban.`;

const FILES = [
  {
    name: "CONTRIBUTING.md",
    icon: "🤝",
    color: C.accent,
    tagline: "The onboarding guide for new contributors",
    idea: "Without this file, every new contributor has to ask someone: 'How do I set this up? What's the branch naming convention? Do I need to run SwiftLint?' With it, those answers are always one click away — and GitHub links to it automatically on every new issue and pull request page.",
    surfaced: [
      "New Issue page — 'Please read our contributing guide' link",
      "New Pull Request page — contributing guidelines link",
      "Repository Insights → Community tab health check",
    ],
    contains: ["Xcode + Swift version requirements", "How to run and test locally", "Branch naming & commit conventions", "PR checklist before submitting"],
    code: CONTRIBUTING,
    filename: ".github/CONTRIBUTING.md",
    highlights: [17, 18, 19, 20, 21],
  },
  {
    name: "SECURITY.md",
    icon: "🔐",
    color: C.red,
    tagline: "The responsible disclosure channel",
    idea: "Without this file, a security researcher who finds a vulnerability in your SDK will likely open a public GitHub issue — exposing the flaw before a patch exists. This file gives them a safe, documented, private path. GitHub pins a banner in the Security tab and surfaces a link whenever someone tries to open a new issue.",
    surfaced: [
      "Security tab → 'View security policy' banner (always visible)",
      "New Issue page → security policy link before the form",
      "GitHub's Dependabot alerts view",
    ],
    contains: ["Supported version matrix (which versions get patches)", "How to report — email, not public issues", "Expected response and patch timeline", "Scope of the security policy"],
    code: SECURITY,
    filename: ".github/SECURITY.md",
    highlights: [14, 15],
  },
  {
    name: "SUPPORT.md",
    icon: "💬",
    color: C.yellow,
    tagline: "The help-desk redirect",
    idea: "Many developers open GitHub issues for things that aren't bugs — 'how do I configure Apple Pay?', 'what iOS version do you support?'. These clog the issue tracker and waste maintainers' time. SUPPORT.md tells people where to go before they file a ticket. GitHub surfaces a link just before the new-issue form appears.",
    surfaced: [
      "New Issue page → 'Get support' link shown before the form opens",
    ],
    contains: ["Docs URL to check first", "GitHub Discussions for how-to questions", "Internal Slack channel for the team", "Stack Overflow tag to follow"],
    code: SUPPORT,
    filename: ".github/SUPPORT.md",
    highlights: [9, 10, 11, 12, 13],
  },
  {
    name: "CODE_OF_CONDUCT.md",
    icon: "📋",
    color: C.blue,
    tagline: "The social contract of your community",
    idea: "Sets explicit behavioral standards before a problem ever arises. For internal teams this is often overlooked — but it matters. It signals that the project has clear expectations, gives maintainers a documented basis to enforce them, and makes the space psychologically safe for everyone to contribute.",
    surfaced: [
      "Community Profile → 'Code of conduct' health check",
      "Repository Insights → Community Standards tab",
      "GitHub's recommended community standards checklist",
    ],
    contains: ["Expected positive behaviors", "Unacceptable behavior examples", "Enforcement and reporting process", "Contact email for violations"],
    code: CONDUCT,
    filename: ".github/CODE_OF_CONDUCT.md",
    highlights: [10, 11, 12, 13],
  },
];


export function CommunityHealthSection() {
  const [active, setActive] = useState(0);
  const activeRef = useRef(active);
  activeRef.current = active;
  useLocalTabNav("s-community", FILES.length, activeRef, setActive);
  const file = FILES[active];

  return (
    <section id="s-community" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={P}>COMMUNITY HEALTH FILES</SectionLabel>
        <SectionHeading sub="Four Markdown files that form the social contract of your repository. Click each one to see a real iOS SDK example and learn exactly where GitHub surfaces it.">
          The Social Contract Files
        </SectionHeading>
      </Reveal>

      <Reveal delay={0.1}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
          {FILES.map((f, i) => (
            <TabButton key={f.name} active={i === active} color={f.color} icon={f.icon} label={f.name} onClick={() => setActive(i)} />
          ))}
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.subtle, marginLeft: "auto" }}>
            ← → to cycle
          </span>
        </div>
      </Reveal>

      <div
        key={active}
        style={{
          display: "grid", gridTemplateColumns: "1fr 1.1fr",
          background: C.surface, border: `1px solid ${file.color}35`,
          borderTop: `3px solid ${file.color}`, borderRadius: 14, overflow: "hidden",
          animation: "fadeIn 0.2s ease both",
        }}
      >
        <div style={{ padding: "28px 30px", borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 22 }}>{file.icon}</span>
              <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: file.color }}>{file.name}</code>
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted }}>{file.tagline}</div>
          </div>

          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: C.muted, lineHeight: 1.8, margin: 0 }}>
            {file.idea}
          </p>

          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: file.color, letterSpacing: "0.12em", marginBottom: 10 }}>
              WHERE GITHUB SHOWS THIS FILE
            </div>
            {file.surfaced.map((s) => (
              <div key={s} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                <span style={{ color: file.color, fontSize: 12, marginTop: 1, flexShrink: 0 }}>→</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{s}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: C.muted, letterSpacing: "0.12em", marginBottom: 10 }}>
              TYPICALLY CONTAINS
            </div>
            {file.contains.map((c) => (
              <div key={c} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: file.color, flexShrink: 0 }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted }}>{c}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: "24px 26px" }}>
          <CodeBlock filename={file.filename} highlights={file.highlights}>{file.code}</CodeBlock>
        </div>
      </div>

      <Reveal delay={0.3}>
        <div style={{ marginTop: 16 }}>
          <CalloutBox color={P} label="LOCATION RULE" icon="📍">
            All four files are checked in order: <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: P }}>.github/</code> first, then the repo root, then <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: P }}>docs/</code>. Placing them in <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: P }}>.github/</code> is the recommended choice — it's explicit, it's the first lookup, and it keeps your root clean.
          </CalloutBox>
        </div>
      </Reveal>
    </section>
  );
}
