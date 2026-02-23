import { C, Reveal, SectionLabel, SectionHeading, TagChip, InfoCard, CheckItem, CalloutBox } from "../../src/shared.jsx";
import { P } from "./ui.jsx";

export function WhyItMattersSection() {
  return (
    <section id="s-why" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={P}>WHY THIS MATTERS</SectionLabel>
        <SectionHeading sub="Our CI/CD configuration impacts every developer, every day.">
          The stakes
        </SectionHeading>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <Reveal delay={0}>
          <InfoCard color={P} title="50+ iOS Developers" delay={0}>
            <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7 }}>
              Every developer on the iOS team is affected by every change to the CI configuration. An invisible change today can break everyone's builds tomorrow — with no trace of who did it or why.
            </p>
          </InfoCard>
        </Reveal>

        <Reveal delay={0.12}>
          <InfoCard color={C.blue} title="Zero Audit Trail Today" delay={0}>
            <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7 }}>
              Workflow changes made in the Bitrise.io GUI leave no history. There's no way to review them before they go live, tie them to a ticket, or roll back a bad change without re-typing the old config.
            </p>
          </InfoCard>
        </Reveal>

        <Reveal delay={0.2}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "24px 22px" }}>
            <TagChip color={P} dot={false}>CURRENT PAIN POINTS</TagChip>
            <div style={{ marginTop: 16 }}>
              <CheckItem active={false}>No code review for CI modifications</CheckItem>
              <CheckItem active={false}>Cannot tie CI changes to a specific testable piece</CheckItem>
              <CheckItem active={false}>Cannot test locally before pushing</CheckItem>
              <CheckItem active={false}>No version history for build configurations</CheckItem>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.28}>
          <CalloutBox color={P} label="THE QUESTION" icon="💡">
            <strong style={{ color: C.text }}>Is there a better way?</strong>
            <br /><br />
            Git already manages our source code, dependency manifests, and documentation with full history, review, and rollback. Should our CI configuration be any different?
          </CalloutBox>
        </Reveal>
      </div>
    </section>
  );
}
