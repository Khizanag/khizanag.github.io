import { useState, useRef } from "react";
import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, CalloutBox, TabButton, PlainEnglishBox, useLocalTabNav } from "../../src/shared.jsx";
import { P } from "./ui.jsx";

// ─── Workflow files ───────────────────────────────────────────────────────────

const CI_WORKFLOW = `name: Swift CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    name: Build & Test
    runs-on: macos-14        # Apple Silicon runner

    steps:
      - uses: actions/checkout@v4

      - name: Select Xcode 15.2
        run: sudo xcode-select -s /Applications/Xcode_15.2.app

      - name: Resolve SPM Dependencies
        run: swift package resolve

      - name: Build
        run: |
          xcodebuild build \\
            -scheme iOSPayments \\
            -destination 'platform=iOS Simulator,name=iPhone 15 Pro' \\
            CODE_SIGNING_ALLOWED=NO | xcpretty

      - name: Run Unit Tests
        run: |
          xcodebuild test \\
            -scheme iOSPayments \\
            -destination 'platform=iOS Simulator,name=iPhone 15 Pro' \\
            CODE_SIGNING_ALLOWED=NO | xcpretty`;

const SWIFTLINT_WORKFLOW = `name: SwiftLint

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  swiftlint:
    name: SwiftLint Check
    runs-on: ubuntu-latest   # No macOS needed for linting!

    steps:
      - uses: actions/checkout@v4

      - name: Run SwiftLint
        uses: norio-nomura/action-swiftlint@3.2.1
        with:
          args: --strict
        env:
          DIFF_BASE: \${{ github.base_ref }}

# Result: every PR gets a ✅ or ❌ SwiftLint status check.
# PRs with violations are blocked from merging if you
# configure branch protection to require this check.`;

const RELEASE_WORKFLOW = `name: Release

on:
  push:
    tags:
      - 'v[0-9]+.[0-9]+.[0-9]+'  # v3.2.1, v4.0.0, etc.

jobs:
  release:
    name: Build XCFramework & Publish
    runs-on: macos-14

    steps:
      - uses: actions/checkout@v4

      - name: Select Xcode 15.2
        run: sudo xcode-select -s /Applications/Xcode_15.2.app

      - name: Build XCFramework
        run: ./scripts/build-xcframework.sh

      - name: Archive XCFramework
        run: |
          zip -r iOSPayments.xcframework.zip \\
            iOSPayments.xcframework

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          files: iOSPayments.xcframework.zip
          generate_release_notes: true`;

const DEPENDABOT_CODE = `version: 2
updates:

  # Swift Package Manager dependencies
  - package-ecosystem: "swift"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
    reviewers:
      - "org/ios-architects"
    labels:
      - "dependencies"
      - "swift"

  # Keep GitHub Actions themselves up to date
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
    labels:
      - "dependencies"
      - "ci"`;

const WORKFLOWS = [
  {
    id: "ci",
    label: "swift-ci.yml",
    icon: "⚙️",
    color: C.yellow,
    title: "Build & Test on Every Push",
    trigger: "push to main/develop, all pull_requests",
    runner: "macos-14 (Apple Silicon)",
    idea: "Runs on every push and pull request. Builds the SDK for the iOS Simulator and runs all XCTest unit tests. If anything breaks, the commit gets a red ✕ and the PR is blocked — catching regressions before they reach main.",
    junior: "Think of it as an automatic 'does it build and do all tests pass?' check. Every time you push code, GitHub spins up a Mac in the cloud, runs ⌘U for you, and reports back green or red.",
    steps: ["Checkout code", "Select correct Xcode version", "Resolve SPM packages", "Build for iPhone 15 Pro simulator", "Run XCTest suite"],
    code: CI_WORKFLOW,
    filename: ".github/workflows/swift-ci.yml",
    highlights: [3, 4, 5, 6, 7, 11, 12],
  },
  {
    id: "lint",
    label: "swiftlint.yml",
    icon: "🧹",
    color: C.accent,
    title: "SwiftLint on Pull Requests",
    trigger: "pull_request opened / updated",
    runner: "ubuntu-latest (no macOS needed!)",
    idea: "Runs SwiftLint in strict mode on every PR diff. This keeps code style consistent across the team without requiring every reviewer to manually check for violations. Runs on Linux — no expensive macOS runner required just for linting.",
    junior: "SwiftLint checks your Swift code for style issues — like a spelling checker but for code. This workflow runs it automatically on every PR and adds a green ✓ or red ✗ to the PR status.",
    steps: ["Checkout PR branch", "Run SwiftLint --strict", "Report violations as PR annotations", "Fail the check if any violations found"],
    code: SWIFTLINT_WORKFLOW,
    filename: ".github/workflows/swiftlint.yml",
    highlights: [3, 4, 5, 13, 14, 15],
  },
  {
    id: "release",
    label: "release.yml",
    icon: "🚀",
    color: C.red,
    title: "Automated Release on Git Tag",
    trigger: "git tag matching v*.*.* (e.g. v3.2.1)",
    runner: "macos-14 (Apple Silicon)",
    idea: "Triggered by pushing a version tag. Builds the XCFramework, zips it, and creates a GitHub Release with the binary attached and auto-generated release notes from merged PR titles. One tag push = full release, no manual steps.",
    junior: "When you push a tag like 'v3.2.1', this workflow runs automatically. It builds the final binary (XCFramework), zips it, and creates a GitHub Release — like publishing to the App Store, but for your SDK.",
    steps: ["Triggered by version tag push", "Build universal XCFramework", "Zip the framework", "Create GitHub Release with binary", "Auto-generate release notes from PRs"],
    code: RELEASE_WORKFLOW,
    filename: ".github/workflows/release.yml",
    highlights: [4, 5, 6],
  },
];


export function AutomationSection() {
  const [activeW, setActiveW] = useState(0);
  const activeWRef = useRef(activeW);
  activeWRef.current = activeW;
  useLocalTabNav("s-automation", WORKFLOWS.length, activeWRef, setActiveW);
  const w = WORKFLOWS[activeW];

  return (
    <section id="s-automation" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={P}>AUTOMATION</SectionLabel>
        <SectionHeading sub="GitHub Actions workflows and Dependabot — fully iOS-specific examples showing CI, SwiftLint enforcement, automated releases, and SPM dependency updates.">
          Workflows & Dependabot
        </SectionHeading>
      </Reveal>

      {/* Workflows block */}
      <Reveal delay={0.1}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: C.muted, letterSpacing: "0.12em", marginBottom: 12 }}>
            .github/workflows/ — each file is an independent CI/CD workflow
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            {WORKFLOWS.map((wf, i) => (
              <TabButton key={wf.id} active={i === activeW} color={wf.color} icon={wf.icon} label={wf.label} onClick={() => setActiveW(i)} />
            ))}
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.subtle, marginLeft: "auto" }}>
              ← → to cycle
            </span>
          </div>

          <div
            key={activeW}
            style={{
              background: C.surface, border: `1px solid ${w.color}35`,
              borderTop: `3px solid ${w.color}`, borderRadius: 14, overflow: "hidden",
              animation: "fadeIn 0.2s ease both",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr" }}>
              <div style={{ padding: "26px 28px", borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 6 }}>
                    <span style={{ fontSize: 20 }}>{w.icon}</span>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: C.text }}>{w.title}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {[
                      { label: "TRIGGERS ON", value: w.trigger },
                      { label: "RUNS ON",     value: w.runner },
                    ].map(({ label, value }) => (
                      <div key={label} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: w.color, letterSpacing: "0.1em", flexShrink: 0, marginTop: 2 }}>{label}</span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.muted }}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: C.muted, lineHeight: 1.8, margin: 0 }}>{w.idea}</p>

                <PlainEnglishBox color={w.color}>{w.junior}</PlainEnglishBox>

                <div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: C.muted, letterSpacing: "0.12em", marginBottom: 8 }}>STEPS</div>
                  {w.steps.map((s, i) => (
                    <div key={s} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: `${w.color}15`, border: `1px solid ${w.color}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 10, color: w.color }}>{i + 1}</span>
                      </div>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ padding: "22px 24px" }}>
                <CodeBlock filename={w.filename} highlights={w.highlights}>{w.code}</CodeBlock>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Dependabot block */}
      <Reveal delay={0.2}>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderTop: `3px solid ${C.accent}`, borderRadius: 14, overflow: "hidden", marginBottom: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr" }}>
            <div style={{ padding: "26px 28px", borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 6 }}>
                  <span style={{ fontSize: 20 }}>🤖</span>
                  <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: C.accent }}>dependabot.yml</code>
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: C.muted }}>Automatic dependency update pull requests</div>
              </div>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: C.muted, lineHeight: 1.8, margin: 0 }}>
                Scans your Swift Package Manager dependencies and GitHub Actions on a schedule. When a newer version is available, Dependabot opens a PR automatically — keeping your SPM packages current without any manual checking.
              </p>

              <PlainEnglishBox color={C.accent}>
                Every Monday, a bot checks if any of your Swift packages have new versions. If they do, it opens a PR for you — you just review and merge. No more manually checking for library updates.
              </PlainEnglishBox>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["swift (SPM)", "github-actions", "npm", "pip", "cargo", "docker", "maven", "gradle", "composer", "bundler"].map((eco) => (
                  <span key={eco} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: eco === "swift (SPM)" || eco === "github-actions" ? C.accent : C.subtle, background: eco === "swift (SPM)" || eco === "github-actions" ? `${C.accent}12` : "transparent", border: `1px solid ${eco === "swift (SPM)" || eco === "github-actions" ? `${C.accent}30` : C.border}`, borderRadius: 6, padding: "3px 8px" }}>{eco}</span>
                ))}
              </div>
            </div>

            <div style={{ padding: "22px 24px" }}>
              <CodeBlock filename=".github/dependabot.yml" highlights={[5, 6, 7, 8, 17, 18]}>{DEPENDABOT_CODE}</CodeBlock>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.4}>
        <CalloutBox color={C.yellow} label="SHA PINNING" icon="🛡️">
          Always pin GitHub Actions to a full commit SHA: <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.yellow }}>actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683</code> — not just a tag like <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.yellow }}>@v4</code>. Tags are mutable. A compromised publisher can move a tag to malicious code. A SHA is immutable — it cannot be changed retroactively. Use Dependabot with <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.yellow }}>package-ecosystem: "github-actions"</code> to keep pinned SHAs current automatically.
        </CalloutBox>
      </Reveal>
    </section>
  );
}
