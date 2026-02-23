import { C, Reveal, SectionLabel, SectionHeading, KeyValueDiff } from "../../src/shared.jsx";
import { TierCard } from "./ui.jsx";

export function AccessModelSection() {
  return (
    <section id="s-access-model" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel color={C.blue}>ACCESS MODEL</SectionLabel>
          <SectionHeading sub="Replace the current single-tier write access model with a structured GitHub Teams hierarchy. Each tier has a clear, distinct role.">
            A 3-Tier Team Structure
          </SectionHeading>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          <TierCard
            tier={1} delay={0} color={C.blue}
            title="Org-wide Developer Team"
            members="@org/ios-developers · All 50+"
            role="Write access to ALL repos. Solves the 'I need to push a branch to another repo' problem. No access requests. No friction."
          />
          <TierCard
            tier={2} delay={0.15} color={C.accent}
            title="Product Teams (CODEOWNERS)"
            members="@org/payments-ios-team, etc."
            role="Merge authority via CODEOWNERS. Defined per-repo and per-path. This is where actual governance lives — not in write access."
          />
          <TierCard
            tier={3} delay={0.3} color={C.yellow}
            title="Architects"
            members="@org/ios-architects · Admin"
            role="Admin across all repos. Own CODEOWNERS files themselves. Can override or escalate in exceptional cases."
          />
        </div>

        <Reveal delay={0.45}>
          <div style={{ marginTop: 32 }}>
            <KeyValueDiff items={[
              { before: "Ad-hoc access requests",         after: "Org-wide developer write" },
              { before: "Write access = review authority", after: "CODEOWNERS = review authority" },
              { before: "Slack messages to architects",    after: "Self-service branch push" },
              { before: "Diluted review quality",          after: "Guaranteed domain expert review" },
            ]} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
