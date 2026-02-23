import { C, Reveal, SectionLabel, SectionHeading, CalloutBox } from "../../src/shared.jsx";
import { P } from "./ui.jsx";

const ROWS = [
  { file: "CONTRIBUTING.md",         cat: "Community",   color: C.accent,  loc: ".github/ · root · docs/",  idea: "Contributor onboarding guide — linked on new issue & PR pages" },
  { file: "CODE_OF_CONDUCT.md",      cat: "Community",   color: C.accent,  loc: ".github/ · root · docs/",  idea: "Community behavior standards — shown in community profile" },
  { file: "SECURITY.md",             cat: "Community",   color: C.red,     loc: ".github/ · root · docs/",  idea: "Vulnerability reporting policy — banner in Security tab" },
  { file: "SUPPORT.md",              cat: "Community",   color: C.accent,  loc: ".github/ · root · docs/",  idea: "Help & support channels — linked before users open issues" },
  { file: "ISSUE_TEMPLATE/",         cat: "Templates",   color: C.blue,    loc: ".github/ only",            idea: "Multiple issue forms — shown as template chooser on new issue" },
  { file: "  config.yml",            cat: "Templates",   color: C.blue,    loc: ".github/ISSUE_TEMPLATE/",  idea: "Chooser config — disable blank issues, add contact links" },
  { file: "PULL_REQUEST_TEMPLATE.md",cat: "Templates",   color: C.blue,    loc: ".github/ · root · docs/",  idea: "Single PR template — pre-fills PR body on every new PR" },
  { file: "PULL_REQUEST_TEMPLATE/",  cat: "Templates",   color: C.blue,    loc: ".github/ only",            idea: "Multiple PR templates — selected via URL parameter" },
  { file: "DISCUSSION_TEMPLATE/",    cat: "Templates",   color: C.blue,    loc: ".github/ only",            idea: "Discussion forms per category — YAML mapped to category slug" },
  { file: "workflows/",              cat: "Automation",  color: C.yellow,  loc: ".github/ only",            idea: "GitHub Actions — each .yml file is an independent CI/CD workflow" },
  { file: "dependabot.yml",          cat: "Automation",  color: C.yellow,  loc: ".github/ only",            idea: "Dependency update automation — opens PRs for outdated packages" },
  { file: "CODEOWNERS",              cat: "Governance",  color: P,         loc: ".github/ · root · docs/",  idea: "Code ownership rules — auto-assigns reviewers on matching PRs" },
  { file: "FUNDING.yml",             cat: "Governance",  color: C.yellow,  loc: ".github/ only",            idea: "Sponsor button config — shows funding platforms in sidebar" },
  { file: "CITATION.cff",            cat: "Governance",  color: C.blue,    loc: ".github/ · root",          idea: "Academic citation metadata — 'Cite this repository' sidebar button" },
];

const CAT_COLORS = { Community: C.accent, Templates: C.blue, Automation: C.yellow, Governance: P };

export function SummarySection() {
  return (
    <section id="s-summary" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel color={P}>REFERENCE</SectionLabel>
          <SectionHeading sub="Every file GitHub recognizes inside .github/ — where it lives, what category it belongs to, and what it actually does.">
            Complete .github Reference
          </SectionHeading>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "2.4fr 1fr 1.4fr 2.8fr", padding: "10px 20px", borderBottom: `2px solid ${C.border}` }}>
              {["FILE / DIRECTORY", "CATEGORY", "LOCATION", "PURPOSE"].map((h) => (
                <span key={h} style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: C.muted, letterSpacing: "0.12em" }}>{h}</span>
              ))}
            </div>
            {ROWS.map((row, i) => {
              const catColor = CAT_COLORS[row.cat];
              const isSub = row.file.startsWith("  ");
              return (
                <div key={row.file + i} style={{ display: "grid", gridTemplateColumns: "2.4fr 1fr 1.4fr 2.8fr", padding: "11px 20px", borderTop: i > 0 ? `1px solid ${C.border}` : "none", background: i % 2 ? `${C.border}15` : "transparent", alignItems: "center" }}>
                  <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: isSub ? C.muted : row.color, paddingLeft: isSub ? 16 : 0 }}>
                    {row.file.trim()}
                  </code>
                  {!isSub ? (
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: catColor, background: `${catColor}12`, border: `1px solid ${catColor}30`, borderRadius: 6, padding: "3px 8px", display: "inline-block" }}>
                      {row.cat.toUpperCase()}
                    </span>
                  ) : <span />}
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: C.subtle }}>{row.loc}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: C.muted }}>{row.idea}</span>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
            {Object.entries(CAT_COLORS).map(([cat, color]) => (
              <div key={cat} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: color }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted }}>{cat}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.45}>
          <CalloutBox color={P} label="THE KEY PRINCIPLE" icon="🔑">
            <strong style={{ color: C.text }}>Consistency beats cleverness.</strong> The real power of <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: P }}>.github/</code> isn't any single file — it's that every collaborator, every CI system, and GitHub itself knows exactly where to look. When you centralize configuration in one predictable place, there's no ambiguity, no hunting through the repo, no drift. One directory, one source of truth.
          </CalloutBox>
        </Reveal>
      </div>
    </section>
  );
}
