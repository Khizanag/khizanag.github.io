import { C, Reveal, SectionLabel, SectionHeading, InfoCard, CalloutBox } from "../../src/shared.jsx";

export function ProblemSection() {
  return (
    <section id="s-problem" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={C.red}>THE PROBLEM</SectionLabel>
        <SectionHeading sub="GitHub's access model forces a dead end — granting write access weakens review quality, denying it creates friction.">
          One Policy, Two Conflicting Goals
        </SectionHeading>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        <InfoCard color={C.red} tag="FRICTION" icon="🔒" title="Deny Write Access" delay={0}>
          <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7 }}>
            Cross-team changes get blocked. Developer has to request access, wait for approval, raise a Slack message — just to push a branch.
          </p>
        </InfoCard>
        <InfoCard color={C.yellow} tag="RISK" icon="🔓" title="Grant Write Access" delay={0.15}>
          <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7 }}>
            "Required 2 reviews from write-access users" is diluted. External developer approves a PR for a product they don't own or understand.
          </p>
        </InfoCard>
      </div>

      <Reveal delay={0.3}>
        <CalloutBox color={C.red} label="ROOT CAUSE" icon="⚠️">
          The policy treats <strong style={{ color: C.text }}>write access</strong> and <strong style={{ color: C.text }}>review authority</strong> as the same thing. They are fundamentally different concepts — and GitHub gives us native tools to separate them.
        </CalloutBox>
      </Reveal>
    </section>
  );
}
