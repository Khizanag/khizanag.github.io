import { C, Reveal, SectionLabel, SectionHeading, WorkflowStep, PlainEnglishBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function DeepDiveSection() {
    return (
        <section id="s-deep-dive" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>DEEP DIVE</SectionLabel>
                    <SectionHeading sub="The four phases that carry the most weight — validation, discovery, scaffolding, and verification.">
                        Four phases that matter most
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0 }}>
                    <Reveal delay={0}>
                        <WorkflowStep n={1} total={4} title="§0 · Fail-fast validation" color={C.red}>
                            One cheap metadata call confirms the Figma URL points at a real screen (FRAME/COMPONENT, ≥ 320×568, ≥2 children), not a leaf component.
                            Then all four Figma MCP tools fire in parallel — with a 24h disk cache in front. A cache hit is bit-for-bit identical to a live call.
                        </WorkflowStep>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <WorkflowStep n={2} total={4} title="§1 · Module discovery, cached" color={P}>
                            @module-discoverer scans for conformances, naming prefixes, DI composition root, target membership, and localization targets.
                            Output is schema-v2 and cached at .github/.cache/module-discovery/. On subsequent runs, witness-file comparison short-circuits
                            the full scan. The orchestrator never guesses module shape.
                        </WorkflowStep>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <WorkflowStep n={3} total={4} title="§4 · Template-driven parallel scaffolding" color={C.yellow}>
                            Before: 6 scaffolder agents, each carrying 150 lines of embedded Swift skeleton. Drift was inevitable.
                            After: one @layer-scaffolder + 9 templates under .github/templates/scaffolds/. Placeholder resolution reads the
                            shared contract artifact. Agent spec dropped from 830 → 180 lines.
                        </WorkflowStep>
                    </Reveal>

                    <Reveal delay={0.3}>
                        <WorkflowStep n={4} total={4} title="§6 · Tiered verification gates" color={C.purple}>
                            Seven gates. T1 (build, swiftlint, imports, DI chain) block the pipeline — they&apos;re correctness, not taste.
                            T2 (localization, SwiftGen freshness, copyright) warn without blocking — they&apos;re follow-up work the developer
                            finishes in the same PR. The verifier knows the difference.
                        </WorkflowStep>
                    </Reveal>
                </div>

                <div style={{ marginTop: 32 }}>
                    <Reveal delay={0.4}>
                        <PlainEnglishBox color={P}>
                            Every hand-off between phases is a file write. The screen-context.json artifact is the single source of truth —
                            if an agent needs a fact, it&apos;s in there, and there&apos;s exactly one agent that owns each section.
                        </PlainEnglishBox>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
