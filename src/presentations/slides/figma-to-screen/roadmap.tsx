import { C, Reveal, SectionLabel, SectionHeading } from "../../shared.tsx";
import { RoadmapBadge } from "./ui.tsx";

const ROADMAP: Array<{ number: string; title: string; description: string; color: string }> = [
    { number: "1",  title: "Scaffolder consolidation",       description: "6 per-layer agents (830 lines) → 1 template-driven layer-scaffolder (180 lines) + 9 templates.", color: C.accent },
    { number: "2",  title: "Shared context artifact",         description: ".logs/<runId>/screen-context.json · JSON schema v1 · single source of truth across phases.",   color: C.blue },
    { number: "3",  title: "Phase-0 fail-fast",               description: "Cheap metadata check catches leaf-component URLs before the expensive 4-tool parallel batch.",  color: C.yellow },
    { number: "4",  title: "Figma cache CLI",                 description: ".github/scripts/figma-cache.mjs · 24h disk cache · stats, prune, invalidate subcommands.",       color: C.purple },
    { number: "5",  title: "Module discovery v2 + cache",     description: "Schema v2 · witness-file invalidation · caches under .github/.cache/module-discovery/.",         color: C.red },
    { number: "6",  title: "Design-system batch lookup",      description: "Agent resolves N components / icons / tokens in ONE call. No more N sequential lookups.",       color: C.accent },
    { number: "7",  title: "Localization + Destination agents", description: "@localization-scaffolder + @destination-patcher · MARK-anchored edits over regex matching.", color: C.blue },
    { number: "8",  title: "Figma-review skip predicate",     description: "check-figma-review-skip.mjs · skips audit only when View is byte-identical to prior audited.",   color: C.yellow },
    { number: "9",  title: "Tiered verifier (T1/T2)",         description: "7 gates split into blocking correctness vs non-blocking follow-up work.",                         color: C.purple },
    { number: "10", title: "Log schema + JSON primary",       description: "Sessions logged as schema-validated JSON. Markdown is a projection, not the source of truth.",    color: C.red },
];

export function RoadmapSection() {
    return (
        <section id="s-roadmap" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.accent}>SHIPPED TODAY</SectionLabel>
                    <SectionHeading sub="Ten improvements landed in a single day — each with its own commit, each addressing a specific class of failure we observed.">
                        The ten roadmap items
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                    {ROADMAP.map((item, i) => (
                        <RoadmapBadge
                            key={item.number}
                            number={item.number}
                            title={item.title}
                            description={item.description}
                            color={item.color}
                            delay={i * 0.04}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
