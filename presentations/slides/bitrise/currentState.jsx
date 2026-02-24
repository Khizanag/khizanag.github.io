import { C, Reveal, SectionLabel, SectionHeading, TagChip, CheckItem } from "../../src/shared.jsx";

export function CurrentStateSection() {
  return (
    <section id="s-current" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel color={C.blue}>CURRENT STATE</SectionLabel>
          <SectionHeading sub="The Bitrise.io GUI stores and manages our workflow configuration in the cloud.">
            Bitrise.io managed
          </SectionHeading>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <Reveal delay={0}>
            <div>
              <div style={{ marginBottom: 16 }}>
                <TagChip color={C.blue} dot={false}>HOW IT WORKS</TagChip>
              </div>
              <CheckItem active>Configuration stored on Bitrise.io cloud server</CheckItem>
              <CheckItem active>Workflow Editor GUI for visual editing</CheckItem>
              <CheckItem active>Secrets encrypted and managed on platform</CheckItem>
              <CheckItem active>Trigger map evaluated before repository clone</CheckItem>
              <CheckItem active>Credit saving — skips build before even cloning</CheckItem>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <div style={{ marginBottom: 16 }}>
                <TagChip color={C.red} dot={false}>PAIN POINTS</TagChip>
              </div>
              <CheckItem active={false}>No audit trail — changes are invisible</CheckItem>
              <CheckItem active={false}>No code review for CI modifications</CheckItem>
              <CheckItem active={false}>Cannot tie changes to specific testable pieces</CheckItem>
              <CheckItem active={false}>Cannot test locally before pushing changes</CheckItem>
              <CheckItem active={false}>Workflow editor partially read-only — step discovery harder</CheckItem>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
