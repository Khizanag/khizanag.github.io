import { C, Reveal, SectionLabel, SectionHeading, FeatureCard } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function MentalModelsSection() {
    return (
        <section id="s-mental-models" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>THREE MENTAL MODELS</SectionLabel>
                    <SectionHeading sub="Internalize these three and the pipeline explains itself. Every design decision traces back to one of them.">
                        How to reason about the pipeline
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
                    <Reveal delay={0}>
                        <FeatureCard
                            icon="🎭"
                            title="Orchestrator writes nothing"
                            color={P}
                            description="The orchestrator never touches a file. Every write goes through a specialized sub-agent. That means we can reason about each phase in isolation, swap implementations, and test paths independently."
                        />
                    </Reveal>
                    <Reveal delay={0.1}>
                        <FeatureCard
                            icon="📋"
                            title="Shared contract, not shared state"
                            color={C.blue}
                            description="One artifact — screen-context.json — accumulates across phases. Each agent owns exactly one section. Downstream agents READ instead of re-deriving. No agent runs the same scan twice."
                        />
                    </Reveal>
                    <Reveal delay={0.2}>
                        <FeatureCard
                            icon="🚦"
                            title="Hard gates over prose rules"
                            color={C.yellow}
                            description="'Please remember to…' loses to 'script exits 1'. Code-proved predicates, schema validators, and exit codes replace polite instructions. Skippable only by deterministic outcome."
                        />
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
