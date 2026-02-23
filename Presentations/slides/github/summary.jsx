import { C, Reveal, SectionLabel, SectionHeading, InfoCard, CalloutBox } from "../../src/shared.jsx";
import { P } from "./ui.jsx";

export function SummarySection() {
  return (
    <section id="s-summary" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={P}>SUMMARY</SectionLabel>
        <SectionHeading sub="Two concepts, two tools — each doing its intended job.">
          The Conceptual Shift
        </SectionHeading>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 32 }}>
        <InfoCard color={C.blue} icon="🔐" title="Write Access" tag="PRODUCTIVITY TOOL" delay={0}>
          <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7 }}>
            Grant it broadly to all iOS developers. Its only job is to let people push branches. It should not be a gatekeeping mechanism.
          </p>
        </InfoCard>
        <InfoCard color={P} icon="👁" title="Review Authority" tag="GOVERNANCE LAYER" delay={0.2}>
          <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7 }}>
            Enforce it precisely via CODEOWNERS. It maps file paths to responsible teams. No write access needed — GitHub enforces it natively.
          </p>
        </InfoCard>
      </div>

      <Reveal delay={0.4}>
        <CalloutBox color={P} label="OUTCOME" icon="✅">
          <strong style={{ color: C.text }}>Both tools do their intended job — instead of one trying to do both.</strong>
          <br /><br />
          Write access becomes frictionless. CODEOWNERS becomes the single source of truth for ownership. No ad-hoc requests. No compromised reviews.
        </CalloutBox>
      </Reveal>
    </section>
  );
}
