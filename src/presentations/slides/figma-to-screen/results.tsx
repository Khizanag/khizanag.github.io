import { C, Reveal, SectionLabel, SectionHeading } from "../../shared.tsx";
import { P, StatTile } from "./ui.tsx";

export function ResultsSection() {
    return (
        <section id="s-results" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>RESULTS</SectionLabel>
                    <SectionHeading sub="Numbers from today's roadmap sweep — not projections, measured outcomes.">
                        What actually changed
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 16 }}>
                    <StatTile value="830 → 180"  label="Scaffolder LOC"            subLabel="78% reduction"                 color={P}        delay={0} />
                    <StatTile value="6 → 1"       label="Scaffolder agents"         subLabel="collapsed into template-driven" color={C.blue}  delay={0.08} />
                    <StatTile value="4"           label="Parallel MCP tools"         subLabel="with 24h disk cache"            color={C.yellow} delay={0.16} />
                    <StatTile value="2"           label="Gate tiers"                 subLabel="T1 blocks · T2 warns"           color={C.purple} delay={0.24} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                    <StatTile value="17"  label="Specialized agents"    subLabel="orchestrator + 16 workers"   color={C.red}      delay={0.32} />
                    <StatTile value="9"   label="Code templates"        subLabel="under .github/templates/"    color={C.accent}   delay={0.40} />
                    <StatTile value="3"   label="Validation scripts"     subLabel="context · skip · cache"      color={C.blue}     delay={0.48} />
                    <StatTile value="100%" label="Gate coverage"         subLabel="every generated file"        color={C.yellow}   delay={0.56} />
                </div>
            </div>
        </section>
    );
}
