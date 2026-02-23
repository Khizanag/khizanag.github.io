import { C, Reveal, SectionLabel } from "../../src/shared.jsx";
import { P, PDim } from "./ui.jsx";

export function CoreInsightSection() {
  return (
    <section id="s-insight" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <SectionLabel color={C.blue}>CORE PRINCIPLE</SectionLabel>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0, flexWrap: "wrap", margin: "48px 0" }}>
            <div style={{ padding: "20px 36px", background: C.blueDim, border: `1px solid ${C.blue}40`, borderRadius: "12px 0 0 12px" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: C.blue }}>Write Access</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Productivity tool</div>
            </div>
            <div style={{ padding: "20px 24px", background: C.surface, border: `1px solid ${C.border}` }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: C.muted }}>≠</span>
            </div>
            <div style={{ padding: "20px 36px", background: PDim, border: `1px solid ${P}40`, borderRadius: "0 12px 12px 0" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: P }}>Review Authority</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Governance layer</div>
            </div>
          </div>

          <p style={{ fontSize: 17, color: C.muted, lineHeight: 1.7, maxWidth: 640, margin: "0 auto", fontWeight: 300 }}>
            Right now your policy ties both together, which forces a dead end. The fix is <strong style={{ color: C.text }}>decoupling them entirely</strong> using two GitHub-native features working in concert.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
