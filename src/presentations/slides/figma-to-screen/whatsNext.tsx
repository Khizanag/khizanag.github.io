import { C, Reveal, SectionLabel, SectionHeading, FeatureCard } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function WhatsNextSection() {
    return (
        <section id="s-whats-next" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>WHAT&apos;S NEXT</SectionLabel>
                    <SectionHeading sub="Three follow-ups on the near-term backlog — each one extends the pipeline without changing its shape.">
                        Where we go from here
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
                    <Reveal delay={0}>
                        <FeatureCard
                            icon="🧹"
                            title="/screen-remover"
                            color={C.red}
                            description="The inverse operation. Delete a screen cleanly — View, ViewModel, Router, Factory, DI, Destination case, view() branch, L10n keys — and fail loudly if any dangling reference remains."
                        />
                    </Reveal>
                    <Reveal delay={0.1}>
                        <FeatureCard
                            icon="📊"
                            title="Telemetry → KPIs"
                            color={C.blue}
                            description="Today's per-run logs become weekly KPIs (covered in the Telemetry section): adoption, cost, gate-failure trend, top missing mappings. Feed back into the next sweep of agent prompts."
                        />
                    </Reveal>
                    <Reveal delay={0.2}>
                        <FeatureCard
                            icon="🧪"
                            title="Unit test generation"
                            color={C.yellow}
                            description="Chain @UnitTest agents onto §7 so every scaffolded screen lands with ViewModel + Router tests already written. The existing agent tree covers all three layers — the hook-up is the work."
                        />
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
