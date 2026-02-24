import { C, Reveal, SectionLabel, SectionHeading, FeatureCard } from "../../shared.jsx";

export function TradeOffsSection() {
  return (
    <section id="s-tradeoffs" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={C.yellow}>TRADE-OFFS</SectionLabel>
        <SectionHeading sub="Known limitations and challenges when moving to Git-managed config.">
          What we give up
        </SectionHeading>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <FeatureCard
          icon="⚡" title="Trigger Map Limitations" color={C.yellow} delay={0}
          description="If moved to Git, the trigger map can't evaluate before the clone step — builds can't be skipped early, wasting credits on excluded branches."
          note="Mitigated by keeping the trigger map on Bitrise.io. Only workflow YAML moves to Git; pre-clone evaluation still works."
        />
        <FeatureCard
          icon="🖥️" title="Limited GUI Editing" color={C.yellow} delay={0.08}
          description="The Bitrise.io Workflow Editor becomes partially read-only. Step discovery is harder without the visual interface."
        />
        <FeatureCard
          icon="⚠️" title="PR Config Tampering" color={C.red} delay={0.16}
          description="Anyone with PR access could propose changes to the CI pipeline. Requires CODEOWNERS to guard bitrise.yml."
        />
        <FeatureCard
          icon="🔒" title="Immutable Commits" color={C.yellow} delay={0.24}
          description="A hotfix CI change must go through a commit. Requires a new merge — cannot edit the pipeline out-of-band."
        />
        <FeatureCard
          icon="📚" title="Team Learning Curve" color={C.yellow} delay={0.32}
          description="50+ developers must handle YAML syntax directly. Mistakes can break CI for everyone until the bad commit is reverted."
        />
        <FeatureCard
          icon="🔀" title="Merge Conflicts" color={C.muted} delay={0.4}
          description="Simultaneous changes to bitrise.yml cause merge conflicts that must be resolved manually — just like any other shared file."
        />
      </div>
    </section>
  );
}
