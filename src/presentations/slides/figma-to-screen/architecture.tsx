import { C, Reveal, SectionLabel, SectionHeading, PlainEnglishBox } from "../../shared.tsx";
import { P, LayerBox, Arrow } from "./ui.tsx";

export function ArchitectureSection() {
    return (
        <section id="s-architecture" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.blue}>BIG PICTURE</SectionLabel>
                    <SectionHeading sub="Your IDE talks to Figma through the Model Context Protocol. An orchestrator reads the design, delegates to specialised agents, and writes Swift that ships in the app.">
                        Figma → MCP → IDE → Agents → Repo
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", marginTop: 32 }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <LayerBox label="DESIGN SOURCE" title="Figma · S.I.N.S." subtitle="Components, variables, variants. Dev Mode shows real Swift via Code Connect." color={C.purple} />
                        <Arrow label="MCP · localhost:3845" color={C.purple} />
                        <LayerBox label="IDE LAYER" title="VS Code + Copilot · Claude Code" subtitle="Loads prompts, instructions, and agents. Routes slash commands." color={C.blue} delay={0.08} />
                        <Arrow label="@agent / slash" color={C.blue} />
                        <LayerBox label="AI LAYER" title="Agents · Instructions · Prompts" subtitle="Orchestrator + 16 sub-agents. Instructions are auto-attached per file glob." color={P} delay={0.16} />
                        <Arrow label="read · edit · gate" color={P} />
                        <LayerBox label="REPO LAYER" title="Swift + TypeScript" subtitle="Clean-arch feature modules + Core UI V2 component library + Code Connect generator." color={C.yellow} delay={0.24} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <Reveal delay={0.3}>
                            <PlainEnglishBox color={P}>
                                Figma is the <strong style={{ color: P }}>source of truth for design</strong>.
                                The repo is the <strong style={{ color: P }}>source of truth for code</strong>.
                                The AI layer keeps them in sync — never the other way around.
                            </PlainEnglishBox>
                        </Reveal>
                        <Reveal delay={0.38}>
                            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "18px 20px" }}>
                                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: C.muted, letterSpacing: "0.12em", marginBottom: 10 }}>THE THREE INVARIANTS</div>
                                <ul style={{ margin: 0, paddingLeft: 18, color: C.muted, fontSize: 13, lineHeight: 1.75 }}>
                                    <li><strong style={{ color: C.text }}>The orchestrator never writes Swift itself</strong> — only sub-agents do.</li>
                                    <li><strong style={{ color: C.text }}>Shared contract, not shared state</strong> — every phase appends to <code style={{ color: P }}>screen-context.json</code>.</li>
                                    <li><strong style={{ color: C.text }}>Hard gates over prose rules</strong> — code-proved predicates replace &ldquo;please remember to…&rdquo;.</li>
                                </ul>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
