import { C, Reveal, SectionLabel, SectionHeading, CalloutBox } from "../../shared.jsx";
import { P } from "./ui.jsx";

const STEPS = [
  {
    n: "01", title: "Prepare", color: C.red,
    items: ["Set up CODEOWNERS for bitrise.yml", "Enable branch protection rules", "Add .gitignore entry for secrets", "Install pre-commit secret scanning"],
  },
  {
    n: "02", title: "Export", color: C.yellow,
    items: ["Download current YAML from Bitrise.io", "Review and clean up the file", "Open a PR with the initial commit", "Team review and approval"],
  },
  {
    n: "03", title: "Switch", color: P,
    items: ["Point Bitrise.io to Git source", "Keep trigger_map on .io", "Run a test build on main branch", "Verify all workflows function"],
  },
  {
    n: "04", title: "Harden", color: C.blue,
    items: ["Protect all 17 secrets (is_protected=True)", "Monitor for drift in first 2 sprints", "Evaluate Modular YAML if needed", "Document the new workflow for team"],
  },
];

export function RecommendationSection() {
  return (
    <section id="s-recommendation" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={P}>RECOMMENDATION</SectionLabel>
        <SectionHeading sub="With mandatory safeguards in place first.">
          Move bitrise.yml to Git
        </SectionHeading>
      </Reveal>

      <Reveal delay={0.1}>
        <CalloutBox color={P} label="VERDICT" icon="✅">
          <strong style={{ color: C.text }}>The benefits outweigh the risks</strong> — provided the safeguards are in place before migration. Version control, code review, and local testing are capabilities the team needs. The risks (PPE, secret leaks) are well-understood and directly mitigable.
        </CalloutBox>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 40 }}>
        {STEPS.map(({ n, title, color, items }, i) => (
          <Reveal key={n} delay={i * 0.1}>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
              <div style={{
                padding: "16px 20px", borderBottom: `1px solid ${C.border}`, background: `${color}08`,
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8, background: `${color}20`, border: `1px solid ${color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 13, color,
                }}>
                  {n}
                </div>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color }}>{title}</span>
              </div>
              <div style={{ padding: "12px 0" }}>
                {items.map((item, j) => (
                  <div key={j} style={{
                    display: "flex", gap: 10, alignItems: "flex-start", padding: "9px 18px",
                    borderBottom: j < items.length - 1 ? `1px solid ${C.border}` : "none",
                  }}>
                    <span style={{ fontSize: 11, color, marginTop: 1, flexShrink: 0 }}>→</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.5}>
        <div style={{ marginTop: 32 }}>
          <CalloutBox color={C.blue} label="TIMELINE">
            Prepare safeguards and export in <strong style={{ color: C.text }}>Sprint 1</strong>. Switch and initial monitoring in <strong style={{ color: C.text }}>Sprint 2</strong>. Evaluate Modular YAML for Enterprise in the <strong style={{ color: C.text }}>next quarter</strong> if the team grows into it.
          </CalloutBox>
        </div>
      </Reveal>
    </section>
  );
}
