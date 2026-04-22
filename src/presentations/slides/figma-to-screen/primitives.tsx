import { C, Reveal, SectionLabel, SectionHeading, InfoCard, CheckItem } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function PrimitivesSection() {
    return (
        <section id="s-primitives" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>BUILDING BLOCK 3</SectionLabel>
                    <SectionHeading sub="The AI layer is made of three kinds of files committed to the repo. Every file is plain Markdown. No binary, no database, no vendor lock-in.">
                        Agents · Instructions · Prompts
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 28 }}>
                    <Reveal delay={0}>
                        <InfoCard icon="🤖" title="Agents" color={C.blue} tag=".github/agents/">
                            <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.65, marginBottom: 12 }}>
                                Where the actual workflow lives. Each file declares its <strong>tool grants</strong>, <strong>description</strong>, and <strong>numbered steps</strong>.
                            </div>
                            <CheckItem active>Invoke via <code>@name</code> or <code>/name</code></CheckItem>
                            <CheckItem active>Orchestrator delegates to sub-agents</CheckItem>
                            <CheckItem active>Read-only agents can&apos;t mutate the repo</CheckItem>
                            <div style={{ color: C.muted, fontSize: 11, marginTop: 10, fontFamily: "'JetBrains Mono', monospace" }}>
                                15 at root · 10 in Core UI V2
                            </div>
                        </InfoCard>
                    </Reveal>

                    <Reveal delay={0.08}>
                        <InfoCard icon="📜" title="Instructions" color={C.yellow} tag=".github/instructions/">
                            <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.65, marginBottom: 12 }}>
                                <strong>Auto-attached</strong> by a <code>applyTo:</code> glob. When Copilot touches a matching file, the instructions silently ride along.
                            </div>
                            <CheckItem active>Tier 0-common — loaded everywhere</CheckItem>
                            <CheckItem active>Tier 1-consumer — SwiftUI authoring</CheckItem>
                            <CheckItem active>Tier 2-author — Code Connect only</CheckItem>
                            <div style={{ color: C.muted, fontSize: 11, marginTop: 10, fontFamily: "'JetBrains Mono', monospace" }}>
                                Byte budgets enforced per tier
                            </div>
                        </InfoCard>
                    </Reveal>

                    <Reveal delay={0.16}>
                        <InfoCard icon="⌨️" title="Prompts" color={P} tag=".github/prompts/">
                            <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.65, marginBottom: 12 }}>
                                The <strong>thin entry points</strong> — just frontmatter and one line of <code>${"{input:…}"}</code>. They delegate straight to an agent.
                            </div>
                            <CheckItem active>Typed as <code>/slash</code> in the chat bar</CheckItem>
                            <CheckItem active>Argument hints guide the user</CheckItem>
                            <CheckItem active>Shape-validated by <code>validate-instructions.sh</code></CheckItem>
                            <div style={{ color: C.muted, fontSize: 11, marginTop: 10, fontFamily: "'JetBrains Mono', monospace" }}>
                                8 commands today
                            </div>
                        </InfoCard>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
