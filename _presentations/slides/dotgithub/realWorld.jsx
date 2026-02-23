import { useState, useRef } from "react";
import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, PlainEnglishBox, TabButton, useLocalTabNav } from "../../src/shared.jsx";
import { P } from "./ui.jsx";

// ─── Real content from public repos ──────────────────────────────────────────

const VSCODE_CODEOWNERS = `# .github/CODEOWNERS — microsoft/vscode
# Workflow files are security-critical: only a small committee
# can modify them to prevent supply-chain attacks.
/.github/workflows/            @lszomoru @joaomoreno @alexr00

# The public API vscode.d.ts breaks every extension that
# ships to the Marketplace — require sign-off from the API team.
/src/vs/vscode.d.ts            @jrieken @mjbvz @alexr00
/src/vs/vscode.proposed.d.ts   @jrieken @mjbvz @alexr00

# Brand assets — product icons require design review.
/resources/                    @TylerLeonhardt

# Release + build infrastructure
/build/azure-pipelines/        @lszomoru @joaomoreno`;

const VSCODE_ISSUE = `# .github/ISSUE_TEMPLATE/feature_request.yml
name: Feature Request
description: Propose a new VS Code feature or enhancement
labels: ["feature-request"]
body:
  - type: checkboxes
    attributes:
      label: Prerequisites
      options:
        - label: I searched existing issues for duplicates
          required: true
        - label: This is a request, not a question
          required: true

  - type: dropdown
    id: area
    attributes:
      label: VS Code Area
      options:
        - Editor Core
        - Extensions / Marketplace
        - Terminal
        - Debugger
        - Source Control
        - Remote Development
    validations:
      required: true

  - type: textarea
    id: problem
    attributes:
      label: Problem Statement
      placeholder: "I want to do X, but currently can't because..."
    validations:
      required: true`;

const REACT_PR = `## Summary

<!-- Explain the **motivation** for making this change.
     What existing problem does the pull request solve?
     Link to the issue: Fixes #NNN -->

## How did you test this change?

<!-- Demonstrate the code is solid. Examples:
     - The existing test suite passes locally: yarn test
     - I added tests that verify the change
     - I tested manually in a browser / React DevTools

     For UI changes, include a screenshot or screen recording. -->`;

const REACT_CONTRIBUTING = `# Contributing to React

## Bugs

Please open a GitHub Issue and include a **minimal reproducible example**.
A CodeSandbox or Stackblitz link is ideal. Without a reproduction,
we cannot investigate the bug.

## Development Workflow

  1. Fork the repository and create your branch from \`main\`
  2. Install dependencies: \`yarn install\`
  3. Run tests: \`yarn test\`
  4. Check types: \`yarn flow\`
  5. Run linter: \`yarn lint\`
  6. Open a pull request

## Semantic Versioning

React follows semver strictly:
  - Patch — bug fixes only
  - Minor — backwards-compatible new features
  - Major — breaking changes (announced early, rare)

## Contributor License Agreement

Your first PR will trigger the CLA bot.
Meta requires this for all external contributors.`;

const SWIFTLINT_CI = `# .github/workflows/build.yml — realm/SwiftLint
name: SwiftLint Build

on:
  push:
    branches: [main]
  pull_request:

concurrency:
  group: \${{ github.ref }}-\${{ github.workflow }}
  cancel-in-progress: true  # cancel stale PR runs on new push

jobs:
  bazel_linux:
    name: Build (Bazel · Ubuntu 24.04)
    runs-on: ubuntu-24.04
    steps:
      - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683  # v4
      - run: bazel build //...

  plugins_linux:
    name: SPM Plugins (Swift \${{ matrix.swift }})
    runs-on: ubuntu-latest
    strategy:
      matrix:
        swift: ["5.9", "5.10", "6.0", "6.1", "6.2"]  # full version matrix
    container: swift:\${{ matrix.swift }}
    steps:
      - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683  # v4
      - run: swift build --target SwiftLintPlugin`;

const ALAMOFIRE_CONTRIBUTING = `# Contributing to Alamofire

## Questions

Please use Stack Overflow (tag: \`alamofire\`) or the Swift Forums.
GitHub Issues are for bugs and feature requests — not questions.
Issues opened as questions will be closed without a response.

## Security Issues

Do NOT open a public GitHub Issue for security vulnerabilities.
Email security@alamofire.org instead.

## Bug Reports

  1. Search existing issues — it may already be filed.
  2. Use the GitHub Issue template and fill in every field.
  3. Provide a minimal reproducible example.

## Pull Requests

For large changes, open a GitHub Discussion or Swift Forums thread
first — agree on the approach before writing code.

The test suite requires the Firewalk local test server:
  brew install alamofire/alamofire/firewalk

All PRs must pass the full test suite on every platform:
iOS · macOS · tvOS · watchOS`;

const SWIFT_CONTRIBUTING = `# Contributing to Swift

Full guidelines: swift.org/contributing/

## Bug Reports

  - Compiler bugs → GitHub Issues (github.com/swiftlang/swift)
  - Xcode or NDA bugs → bugreport.apple.com

## Good First Issues

Browse curated starter issues:
  github.com/swiftlang/swift/contribute

## Language Changes

Proposing a change to Swift syntax or stdlib APIs requires the
Swift Evolution process — a PR alone is not enough:

  1. Discuss the idea on the Swift Forums (forums.swift.org)
  2. Write a formal proposal using the Swift Evolution template
  3. The core team reviews, pitches, and accepts or rejects it

Do NOT open a PR for a language change without an accepted proposal.

## Code Review Philosophy

The project strongly prefers small, incremental PRs.
Long-lived branches diverge and create merge pain.
Aim to keep CI green on main at every commit.`;

// ─── Repo definitions ─────────────────────────────────────────────────────────

const REPOS = [
  {
    id: "vscode",
    name: "microsoft/vscode",
    branch: "main",
    desc: "The code editor. Individual committer ownership for security-critical paths.",
    lang: "TypeScript",
    stars: "162k",
    color: C.blue,
    icon: "⚡",
    note: "Workflow files are owned by a named 3-person committee — not a team. This makes it auditable: you can see exactly who approved any CI change.",
    files: [
      { label: "CODEOWNERS",           path: ".github/CODEOWNERS",                         code: VSCODE_CODEOWNERS, highlights: [4, 8, 9, 11, 14] },
      { label: "feature_request.yml",  path: ".github/ISSUE_TEMPLATE/feature_request.yml", code: VSCODE_ISSUE,     highlights: [3, 14, 15, 16, 17, 18, 19, 20] },
    ],
  },
  {
    id: "react",
    name: "facebook/react",
    branch: "main",
    desc: "The UI library. One of the most minimal PR templates in open source.",
    lang: "JavaScript",
    stars: "224k",
    color: C.accent,
    icon: "⚛️",
    note: "React's PR template has exactly two sections. The philosophy: only ask for what reviewers actually read. No checkbox clutter — just motivation and proof it works.",
    files: [
      { label: "PULL_REQUEST_TEMPLATE.md", path: ".github/PULL_REQUEST_TEMPLATE.md", code: REACT_PR,           highlights: [1, 7] },
      { label: "CONTRIBUTING.md",          path: ".github/CONTRIBUTING.md",          code: REACT_CONTRIBUTING, highlights: [11, 12, 13, 14, 15, 16, 18, 19, 20, 21] },
    ],
  },
  {
    id: "swiftlint",
    name: "realm/SwiftLint",
    branch: "main",
    desc: "The Swift linter your team already uses. Multi-version Swift matrix + SHA-pinned actions.",
    lang: "Swift",
    stars: "18k",
    color: C.red,
    icon: "🧹",
    note: "Actions are pinned to full commit SHAs (not @v4 tags) to prevent supply-chain attacks — exactly the practice recommended in the SHA Pinning callout elsewhere in this presentation.",
    files: [
      { label: "build.yml", path: ".github/workflows/build.yml", code: SWIFTLINT_CI, highlights: [14, 15, 19, 20, 21, 25] },
    ],
  },
  {
    id: "alamofire",
    name: "Alamofire/Alamofire",
    branch: "master",
    desc: "The iOS networking library. CONTRIBUTING.md lives at root — a valid fallback location.",
    lang: "Swift",
    stars: "41k",
    color: C.yellow,
    icon: "🔗",
    note: "Alamofire's CONTRIBUTING.md is at the repository root, not .github/ — GitHub finds it via the 3-location lookup rule. This is intentional: it keeps contributor guidance visible without burying it.",
    files: [
      { label: "CONTRIBUTING.md", path: "CONTRIBUTING.md", code: ALAMOFIRE_CONTRIBUTING, highlights: [3, 4, 5, 7, 8, 9, 17, 18, 19, 22, 23] },
    ],
  },
  {
    id: "swift",
    name: "apple/swift",
    branch: "main",
    desc: "The Swift language itself. Governance spans GitHub, Swift Forums, and the Evolution process.",
    lang: "Swift",
    stars: "67k",
    color: P,
    icon: "🔶",
    note: "Language changes can't be submitted as a PR — they require a formal Swift Evolution proposal reviewed by the core team on the Swift Forums. The .github files here are just the front door to a much larger governance framework.",
    files: [
      { label: "CONTRIBUTING.md", path: "CONTRIBUTING.md", code: SWIFT_CONTRIBUTING, highlights: [13, 14, 15, 16, 17, 18, 20] },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

function LangBadge({ lang, color }) {
  return (
    <span style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color,
      background: `${color}15`, border: `1px solid ${color}30`,
      borderRadius: 6, padding: "2px 8px", letterSpacing: "0.06em",
    }}>
      {lang}
    </span>
  );
}

export function RealWorldSection() {
  const [openIdx, setOpenIdx]   = useState(0);
  const [fileIdxMap, setFileIdxMap] = useState({});
  const openIdxRef = useRef(openIdx);
  // Use -1 when nothing is open so arrow-right from closed state opens index 0.
  openIdxRef.current = openIdx ?? -1;
  useLocalTabNav("s-real", REPOS.length, openIdxRef, setOpenIdx);

  const getFileIdx = (repoId) => fileIdxMap[repoId] ?? 0;
  const setFileIdx = (repoId, idx) => setFileIdxMap(prev => ({ ...prev, [repoId]: idx }));

  return (
    <section id="s-real" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel color={P}>IN THE WILD</SectionLabel>
          <SectionHeading sub="How five famous open-source projects actually use .github/ — real files, real patterns, real decisions. Click any row to expand. Use ← → to cycle.">
            Real-World Examples
          </SectionHeading>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {REPOS.map((repo, i) => {
            const isOpen   = openIdx === i;
            const fileIdx  = getFileIdx(repo.id);
            const file     = repo.files[fileIdx];

            return (
              <Reveal key={repo.id} delay={i * 0.07}>
                <div style={{
                  borderRadius: 14, overflow: "hidden",
                  border: `1px solid ${isOpen ? `${repo.color}45` : C.border}`,
                  borderLeft: `3px solid ${isOpen ? repo.color : C.border}`,
                  transition: "border-color 0.2s",
                }}>
                  {/* ── Header (always visible) ─────────────────────── */}
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 14,
                      padding: "16px 22px", background: isOpen ? `${repo.color}08` : C.bg,
                      border: "none", cursor: "pointer", textAlign: "left",
                      transition: "background 0.2s", outline: "none",
                    }}
                  >
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{repo.icon}</span>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
                        <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: isOpen ? repo.color : C.text, fontWeight: 600 }}>
                          {repo.name}
                        </code>
                        <LangBadge lang={repo.lang} color={repo.color} />
                        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: C.subtle }}>
                          ★ {repo.stars}
                        </span>
                      </div>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: C.muted }}>
                        {repo.desc}
                      </span>
                    </div>

                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                      color: isOpen ? repo.color : C.subtle,
                      transform: isOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s, color 0.2s",
                      flexShrink: 0,
                    }}>
                      ▾
                    </span>
                  </button>

                  {/* ── Expanded body ────────────────────────────────── */}
                  {isOpen && (
                    <div style={{ borderTop: `1px solid ${repo.color}25`, background: C.bg }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr" }}>
                        {/* Left: note + file info */}
                        <div style={{ padding: "22px 24px", borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 16 }}>
                          <div>
                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: C.muted, letterSpacing: "0.12em", marginBottom: 8 }}>
                              FILES IN THIS REPO
                            </div>
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                              {repo.files.map((f, fi) => (
                                <TabButton
                                  key={f.label}
                                  active={fi === fileIdx}
                                  color={repo.color}
                                  label={f.label}
                                  onClick={() => setFileIdx(repo.id, fi)}
                                />
                              ))}
                            </div>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: repo.color }}>📁</span>
                            <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: repo.color }}>
                              {file.path}
                            </code>
                          </div>

                          <PlainEnglishBox color={repo.color}>{repo.note}</PlainEnglishBox>

                          <a
                            href={`https://github.com/${repo.name}/blob/${repo.branch}/${file.path}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
                              padding: "10px 14px", background: C.surface, borderRadius: 8,
                              border: `1px solid ${repo.color}30`, textDecoration: "none",
                              transition: "background 0.15s",
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = `${repo.color}08`}
                            onMouseLeave={e => e.currentTarget.style.background = C.surface}
                          >
                            <div>
                              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: repo.color, letterSpacing: "0.1em", marginBottom: 4 }}>
                                VIEW ON GITHUB ↗
                              </div>
                              <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.muted, wordBreak: "break-all" }}>
                                github.com/{repo.name}/blob/{repo.branch}/{file.path}
                              </code>
                            </div>
                          </a>
                        </div>

                        {/* Right: code */}
                        <div style={{ padding: "20px 22px" }}>
                          <CodeBlock filename={file.path} highlights={file.highlights}>
                            {file.code}
                          </CodeBlock>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
