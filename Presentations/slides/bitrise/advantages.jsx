import { C, Reveal, SectionLabel, SectionHeading, FeatureCard } from "../../src/shared.jsx";
import { P } from "./ui.jsx";

export function AdvantagesSection() {
  return (
    <section id="s-advantages" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel color={P}>ADVANTAGES</SectionLabel>
          <SectionHeading sub="Git as the source of truth unlocks capabilities we don't have today.">
            What we gain
          </SectionHeading>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <FeatureCard icon="📜" title="Full Version Control" color={P} delay={0}
            description="Every change is a Git commit — author, timestamp, diff, rollback. No more invisible edits. Full history forever."
          />
          <FeatureCard icon="👀" title="Request Review" color={C.blue} delay={0.08}
            description="CI changes go through the same review process as code. A PR, a discussion, an approval — before anything goes live."
          />
          <FeatureCard icon="🔗" title="Config-Code Coupling" color={C.purple} delay={0.16}
            description="A PR bundles the exact build configuration with the code it builds. Releases are deterministic and traceable."
          />
          <FeatureCard icon="💻" title="Local Testing" color={C.yellow} delay={0.24}
            description="Run 'bitrise run workflow-name' locally before pushing. Faster iteration cycles and fewer wasted build credits."
          />
          <FeatureCard icon="🌿" title="Branch-Specific Workflows" color={P} delay={0.32}
            description="Feature branches can temporarily modify the CI pipeline. Experiment, test, and merge — without affecting the main flow."
          />
          <FeatureCard icon="🔄" title="Git is the Backup" color={C.accent} delay={0.4}
            description="If Bitrise.io has an incident, the config is still in your repository. Zero dependency on a single platform for recovery."
          />
        </div>
      </div>
    </section>
  );
}
