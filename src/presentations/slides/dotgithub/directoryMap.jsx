import { C, Reveal, SectionLabel, SectionHeading } from "../../shared.jsx";
import { P } from "./ui.jsx";

const CATEGORIES = [
  {
    label: "Community Health",
    color: C.accent,
    items: [
      { name: "CONTRIBUTING.md",    desc: "How to contribute" },
      { name: "CODE_OF_CONDUCT.md", desc: "Community standards" },
      { name: "SECURITY.md",        desc: "Vulnerability reporting" },
      { name: "SUPPORT.md",         desc: "Where to get help" },
    ],
  },
  {
    label: "Templates",
    color: C.blue,
    items: [
      { name: "ISSUE_TEMPLATE/",             desc: "Issue form templates" },
      { name: "  config.yml",                desc: "Template chooser config", sub: true },
      { name: "PULL_REQUEST_TEMPLATE.md",    desc: "Single PR template" },
      { name: "PULL_REQUEST_TEMPLATE/",      desc: "Multiple PR templates" },
      { name: "DISCUSSION_TEMPLATE/",        desc: "Discussion forms" },
    ],
  },
  {
    label: "Automation",
    color: C.yellow,
    items: [
      { name: "workflows/",      desc: "GitHub Actions definitions" },
      { name: "  ci.yml",        desc: "Example workflow file", sub: true },
      { name: "dependabot.yml",  desc: "Dependency update config" },
    ],
  },
  {
    label: "Ownership & Governance",
    color: P,
    items: [
      { name: "CODEOWNERS",    desc: "Code ownership rules" },
      { name: "FUNDING.yml",   desc: "Sponsor button config" },
      { name: "CITATION.cff",  desc: "Academic citation metadata" },
    ],
  },
];

function TreeLine({ name, desc, sub, color }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 10, padding: "6px 0", paddingLeft: sub ? 20 : 0 }}>
      <span style={{ color: C.subtle, fontSize: 11, flexShrink: 0, fontFamily: "'JetBrains Mono', monospace" }}>
        {sub ? "│  ├─" : "├─"}
      </span>
      <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: name.endsWith("/") ? color : C.text, flexShrink: 0 }}>
        {name.trim()}
      </code>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.subtle }}>— {desc}</span>
    </div>
  );
}

export function DirectoryMapSection() {
  return (
    <section id="s-map" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel color={P}>DIRECTORY STRUCTURE</SectionLabel>
          <SectionHeading sub="Every file and directory GitHub recognizes inside .github/, grouped by what they do.">
            Everything Inside .github
          </SectionHeading>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {CATEGORIES.map((cat, ci) => (
            <Reveal key={cat.label} delay={ci * 0.1}>
              <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderLeft: `3px solid ${cat.color}`, borderRadius: 12, padding: "22px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingBottom: 12, borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: cat.color, flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: cat.color, letterSpacing: "0.12em" }}>
                    {cat.label.toUpperCase()}
                  </span>
                </div>

                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.subtle, marginBottom: 8 }}>
                  .github/
                </div>

                {cat.items.map((item) => (
                  <TreeLine key={item.name} color={cat.color} {...item} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.45}>
          <div style={{ marginTop: 20, padding: "16px 24px", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[
              { symbol: "directory/", label: "Directory — contains sub-files", color: P },
              { symbol: "FILE.md", label: "Markdown file — rendered by GitHub UI", color: C.accent },
              { symbol: "config.yml", label: "YAML config — machine-readable settings", color: C.yellow },
            ].map(({ symbol, label, color }) => (
              <div key={symbol} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color }}>{symbol}</code>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted }}>{label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
