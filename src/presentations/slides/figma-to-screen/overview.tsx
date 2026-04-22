import { C, Reveal, SectionLabel, SectionHeading } from "../../shared.tsx";
import { P, PhasePill } from "./ui.tsx";

const PHASES: Array<{ number: string; title: string; color: string }> = [
    { number: "§0",   title: "Input validation + MCP preflight + 4-tool parallel batch",                color: C.red },
    { number: "§1",   title: "@module-discoverer · witness-based cache · discovery record v2",          color: P },
    { number: "§2",   title: "@figma-to-view (Core UI V2) · writes the one and only View.swift",        color: C.blue },
    { number: "§3",   title: "@view-intent-analyzer · extracts State / Intent / Navigation contract",    color: C.purple },
    { number: "§4",   title: "@layer-scaffolder · parallel, template-driven, 9 templates",               color: C.yellow },
    { number: "§4.5", title: "@localization-scaffolder + @destination-patcher · MARK anchors",           color: C.accent },
    { number: "§5",   title: "@figma-review · mandatory unless predicate says otherwise",                color: C.blue },
    { number: "§6",   title: "@screen-verifier · 7 gates, T1/T2 tiering",                                color: P },
    { number: "§7",   title: "Commit & push · branch safety, pipeline files only",                       color: C.yellow },
    { number: "§8",   title: "@session-logger · schema-validated, JSON-primary, markdown projection",    color: C.purple },
];

export function OverviewSection() {
    return (
        <section id="s-overview" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>PIPELINE OVERVIEW</SectionLabel>
                    <SectionHeading sub="Ten phases — every one of them delegates to a named sub-agent. The orchestrator is a router, not a worker.">
                        The eight-phase pipeline, at a glance
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {PHASES.map((phase, i) => (
                        <PhasePill
                            key={phase.number}
                            number={phase.number}
                            title={phase.title}
                            color={phase.color}
                            delay={i * 0.05}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
