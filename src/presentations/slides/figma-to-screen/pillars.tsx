import { C, Reveal, SectionLabel, SectionHeading, InfoCard, CheckItem } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function PillarsSection() {
    return (
        <section id="s-pillars" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>WHAT IT IS</SectionLabel>
                    <SectionHeading sub="Three layers stacked on top of each other. Each one is useful on its own — together they remove the manual Figma-to-Swift handoff almost entirely.">
                        Three pillars, one pipeline
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 28 }}>
                    <Reveal delay={0}>
                        <InfoCard icon="🎨" title="Code Connect" color={C.purple} tag="BRIDGE">
                            <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.65, marginBottom: 10 }}>
                                A TypeScript generator maps every S.I.N.S. design-system component in Figma to its real SwiftUI initializer. Designers see the actual code in Dev Mode.
                            </div>
                            <CheckItem active>116 mapping files</CheckItem>
                            <CheckItem active>115 Figma nodes covered</CheckItem>
                            <CheckItem active>125 rendered Swift snippets</CheckItem>
                        </InfoCard>
                    </Reveal>

                    <Reveal delay={0.08}>
                        <InfoCard icon="🤖" title="Consumer Agents" color={C.blue} tag="LOOKUPS">
                            <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.65, marginBottom: 10 }}>
                                Seven slash commands that take a Figma URL or a Swift name and hand back pixel-perfect Views, audits, component APIs, icons, tokens, or recovery plans.
                            </div>
                            <CheckItem active>/figma-to-view · /figma-review</CheckItem>
                            <CheckItem active>/component-lookup · /icon-lookup · /token-lookup</CheckItem>
                            <CheckItem active>/unstick · /connect-component</CheckItem>
                        </InfoCard>
                    </Reveal>

                    <Reveal delay={0.16}>
                        <InfoCard icon="⚙️" title="Screen Orchestrator" color={P} tag="FLAGSHIP">
                            <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.65, marginBottom: 10 }}>
                                <code style={{ color: P, background: "#00ff8812", padding: "1px 6px", borderRadius: 4 }}>/figma-to-screen</code> coordinates ~17 specialised sub-agents: discovery, View gen, VM, Router, Factory, DI, Destination patch, verify, log.
                            </div>
                            <CheckItem active>8 phases · 7 gates</CheckItem>
                            <CheckItem active>Presentation by default</CheckItem>
                            <CheckItem active>--with-domain / --with-data opt-in</CheckItem>
                        </InfoCard>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
