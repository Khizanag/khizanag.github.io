import { C, Reveal, SectionLabel, SectionHeading, CalloutBox, CheckItem } from "../../shared.jsx";
import { P } from "./ui.jsx";

const BEFORE = [
  { name: "CODEOWNERS",               tag: "governance" },
  { name: "CODE_OF_CONDUCT.md",       tag: "community" },
  { name: "CONTRIBUTING.md",          tag: "community" },
  { name: "PULL_REQUEST_TEMPLATE.md", tag: "template" },
  { name: "SECURITY.md",              tag: "community" },
  { name: "SUPPORT.md",               tag: "community" },
  { name: "Package.swift",            tag: "source" },
  { name: "Sources/",                 tag: "source" },
  { name: "Tests/",                   tag: "source" },
  { name: "README.md",                tag: "source" },
];

const AFTER_ROOT = [
  { name: ".github/",    tag: "github",  open: true },
  { name: "Package.swift", tag: "source" },
  { name: "Sources/",   tag: "source" },
  { name: "Tests/",     tag: "source" },
  { name: "README.md",  tag: "source" },
];

const AFTER_GITHUB = [
  { name: "CODEOWNERS",               tag: "governance" },
  { name: "CODE_OF_CONDUCT.md",       tag: "community" },
  { name: "CONTRIBUTING.md",          tag: "community" },
  { name: "SECURITY.md",              tag: "community" },
  { name: "SUPPORT.md",               tag: "community" },
  { name: "PULL_REQUEST_TEMPLATE.md", tag: "template" },
  { name: "ISSUE_TEMPLATE/",          tag: "template" },
  { name: "workflows/",               tag: "automation" },
  { name: "dependabot.yml",           tag: "automation" },
];

const TAG_COLORS = {
  github:     P,
  source:     C.text,
  community:  C.accent,
  template:   C.blue,
  governance: P,
  automation: C.yellow,
};

const PATHS = [
  { path: ".github/SECURITY.md",  note: "✓ wins — GitHub checks here first", highlight: true },
  { path: "SECURITY.md",          note: "↓ fallback if .github/ is absent",  highlight: false },
  { path: "docs/SECURITY.md",     note: "↓ last resort",                     highlight: false },
];

const ONLY_IN_GITHUB = ["FUNDING.yml", "dependabot.yml", "workflows/", "ISSUE_TEMPLATE/", "PULL_REQUEST_TEMPLATE/", "DISCUSSION_TEMPLATE/"];

function FileRow({ name, sub }) {
  const tag = sub ? "github-sub" : null;
  const color = TAG_COLORS[BEFORE.find(f => f.name === name)?.tag] ?? C.text;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", paddingLeft: sub ? 20 : 0 }}>
      {sub && <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.subtle }}>├─</span>}
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color }}>{name}</span>
    </div>
  );
}

export function WhatSection() {
  return (
    <section id="s-what" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={P}>THE CONCEPT</SectionLabel>
        <SectionHeading sub="A single directory that tells GitHub everything about how your project should be governed — without cluttering your source code.">
          What Is .github?
        </SectionHeading>
      </Reveal>

      {/* Before / After comparison */}
      <Reveal delay={0.1}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
          {/* Before */}
          <div style={{ background: C.surface, border: `1px solid ${C.red}30`, borderTop: `3px solid ${C.red}`, borderRadius: 14, padding: "22px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: C.red, letterSpacing: "0.12em" }}>BEFORE .github/</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted }}>— config files at root</span>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.subtle, marginBottom: 8 }}>iOS-Payments/</div>
            {BEFORE.map(({ name, tag }) => {
              const color = TAG_COLORS[tag] ?? C.text;
              const dim = tag === "source";
              return (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "3px 0" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.subtle }}>├─</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: dim ? C.subtle : color, opacity: dim ? 0.5 : 1 }}>{name}</span>
                  {!dim && <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 9, color, background: `${color}15`, border: `1px solid ${color}30`, borderRadius: 4, padding: "1px 6px", letterSpacing: "0.1em" }}>{tag.toUpperCase()}</span>}
                </div>
              );
            })}
            <div style={{ marginTop: 14, padding: "10px 12px", background: `${C.red}08`, borderRadius: 8, border: `1px solid ${C.red}20` }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted }}>6 GitHub config files mixed with source code — hard to navigate, easy to miss.</span>
            </div>
          </div>

          {/* After */}
          <div style={{ background: C.surface, border: `1px solid ${C.accent}30`, borderTop: `3px solid ${C.accent}`, borderRadius: 14, padding: "22px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: C.accent, letterSpacing: "0.12em" }}>AFTER .github/</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted }}>— all config in one place</span>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.subtle, marginBottom: 8 }}>iOS-Payments/</div>
            {AFTER_ROOT.map(({ name, tag, open }) => (
              <div key={name}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "3px 0" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.subtle }}>├─</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: tag === "github" ? P : C.subtle, fontWeight: tag === "github" ? 600 : 400 }}>{name}</span>
                </div>
                {open && AFTER_GITHUB.map(({ name: gname, tag: gtag }) => (
                  <div key={gname} style={{ display: "flex", alignItems: "center", gap: 8, padding: "2px 0", paddingLeft: 16 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.subtle }}>│ ├─</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TAG_COLORS[gtag] ?? C.muted }}>{gname}</span>
                  </div>
                ))}
              </div>
            ))}
            <div style={{ marginTop: 14, padding: "10px 12px", background: `${C.accent}08`, borderRadius: 8, border: `1px solid ${C.accent}20` }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted }}>All 9 GitHub files inside .github/ — root stays clean, intent is explicit.</span>
            </div>
          </div>
        </div>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Reveal delay={0.2}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "24px 28px" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: C.muted, letterSpacing: "0.12em", marginBottom: 14 }}>
              THE 3-LOCATION LOOKUP RULE
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: C.muted, lineHeight: 1.7, marginBottom: 16 }}>
              For community health files, GitHub searches three locations. The first match wins:
            </p>
            {PATHS.map(({ path, note, highlight }) => (
              <div key={path} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: highlight ? `${P}10` : "transparent", borderRadius: 8, marginBottom: 6, border: highlight ? `1px solid ${P}30` : "none" }}>
                <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: highlight ? P : C.subtle, flexShrink: 0 }}>{path}</code>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: highlight ? C.muted : C.subtle }}>{note}</span>
              </div>
            ))}

            <div style={{ marginTop: 16, borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: C.muted, letterSpacing: "0.12em", marginBottom: 10 }}>WHY .GITHUB/ WINS</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  "It's the first location GitHub checks",
                  "Keeps the repository root clean",
                  "Makes the intent unambiguous — 'this is a GitHub config'",
                  "Works alongside org-level defaults as a fallback",
                ].map((text) => (
                  <CheckItem key={text} active>{text}</CheckItem>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <CalloutBox color={P} label="EXCLUSIVELY IN .GITHUB/" icon="⚠️">
              Some files have <strong style={{ color: C.text }}>no root or docs/ fallback</strong> — they work only inside <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: P }}>.github/</code>:
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                {ONLY_IN_GITHUB.map((f) => (
                  <code key={f} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: P, background: `${P}15`, border: `1px solid ${P}30`, borderRadius: 6, padding: "3px 8px" }}>{f}</code>
                ))}
              </div>
            </CalloutBox>

            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 24px" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: C.muted, letterSpacing: "0.12em", marginBottom: 12 }}>COLOR LEGEND</div>
              {Object.entries(TAG_COLORS).filter(([t]) => t !== "github").map(([tag, color]) => (
                <div key={tag} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color, background: `${color}15`, border: `1px solid ${color}30`, borderRadius: 4, padding: "2px 7px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{tag}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted }}>
                    {tag === "source" ? "your actual code" : tag === "community" ? "CONTRIBUTING, SECURITY, SUPPORT, CoC" : tag === "template" ? "issue, PR, discussion templates" : tag === "governance" ? "CODEOWNERS" : "workflows, dependabot"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
