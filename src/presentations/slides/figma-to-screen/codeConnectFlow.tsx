import { C, Reveal, SectionLabel, SectionHeading, PlainEnglishBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function CodeConnectFlowSection() {
    return (
        <section id="s-cc-flow" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1250, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.purple}>HOW THE MAPPING FLOWS</SectionLabel>
                    <SectionHeading sub="A Figma component has properties (variants, booleans, text slots). A Code Connect mapping file reads those, picks the right Swift snippet, and hands it back to Dev Mode.">
                        Code Connect — flowchart
                    </SectionHeading>
                </Reveal>

                <Reveal delay={0.1}>
                    <div style={{ marginTop: 28, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "36px 28px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1.2fr auto 1.4fr auto 1.2fr", gap: 20, alignItems: "stretch" }}>
                            <FlowNode
                                title="FIGMA COMPONENT"
                                kind="design"
                                color={C.purple}
                                bullets={[
                                    "Button / Primary",
                                    "variant: Size = Large",
                                    "variant: Style = Filled",
                                    "bool: Has icon = true",
                                    "text: Label = \"Add\"",
                                ]}
                            />
                            <Connector color={C.purple} />
                            <FlowNode
                                title="MAPPING FILE — ButtonPrimary.figma.ts"
                                kind="mapping"
                                color={P}
                                bullets={[
                                    "figma.connect(ButtonPrimary, figmaUrl, {",
                                    "  props: {",
                                    "    size:  figma.enum(\"Size\",  {...}),",
                                    "    style: figma.enum(\"Style\", {...}),",
                                    "    icon:  figma.boolean(\"Has icon\"),",
                                    "    label: figma.string(\"Label\"),",
                                    "  },",
                                    "  example: (p) => `StandardButton(...)`",
                                    "})",
                                ]}
                                mono
                            />
                            <Connector color={P} />
                            <FlowNode
                                title="SWIFT SNIPPET (IN DEV MODE)"
                                kind="code"
                                color={C.accent}
                                bullets={[
                                    "StandardButton(",
                                    "  parameters: .init(",
                                    "    style: .primary(.filled),",
                                    "    size:  .large,",
                                    "    icon:  DesignSystem.Icon.plus,",
                                    "    title: \"Add\"",
                                    "  )",
                                    ") { /* action */ }",
                                ]}
                                mono
                            />
                        </div>

                        <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px dashed ${C.border}`, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
                            <StageLabel n={1} title="Designer changes variant" body="Pick a different Size or toggle the icon — Figma updates the props." color={C.purple} />
                            <StageLabel n={2} title="Mapping resolves props" body="figma.enum / figma.boolean / figma.string read each prop at render time." color={P} />
                            <StageLabel n={3} title="Dev Mode shows Swift" body="The example() callback returns the exact init call your codebase uses." color={C.accent} />
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.25}>
                    <div style={{ marginTop: 24 }}>
                        <PlainEnglishBox color={C.purple}>
                            <strong>Key insight:</strong> the mapping file is not a template of Swift text — it&apos;s executable TypeScript that reads live Figma props and picks the correct snippet. Variants that require different Swift APIs (filled vs outlined, large vs small) get separate branches. An LLM never has to reason about this — it just transcribes what Dev Mode returns.
                        </PlainEnglishBox>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

interface FlowNodeProps {
    title: string;
    kind: "design" | "mapping" | "code";
    color: string;
    bullets: string[];
    mono?: boolean;
}

function FlowNode({ title, color, bullets, mono }: FlowNodeProps) {
    return (
        <div style={{
            background: C.bg,
            border: `2px solid ${color}40`,
            borderTop: `3px solid ${color}`,
            borderRadius: 10,
            padding: "18px 18px",
            display: "flex",
            flexDirection: "column",
        }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10.5, color, letterSpacing: "0.12em", marginBottom: 12 }}>{title}</div>
            <div style={{
                fontFamily: mono ? "'JetBrains Mono', monospace" : "'DM Sans', sans-serif",
                fontSize: mono ? 11 : 12.5,
                color: C.muted,
                lineHeight: 1.65,
                whiteSpace: "pre-wrap",
            }}>
                {bullets.map((b, i) => <div key={i}>{b}</div>)}
            </div>
        </div>
    );
}

function Connector({ color }: { color: string }) {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color, fontFamily: "'JetBrains Mono', monospace", fontSize: 22 }}>
            →
        </div>
    );
}

function StageLabel({ n, title, body, color }: { n: number; title: string; body: string; color: string }) {
    return (
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{
                width: 28, height: 28, borderRadius: 8, background: `${color}18`, border: `1px solid ${color}50`, color, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13,
            }}>
                {n}
            </div>
            <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: C.text }}>{title}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, marginTop: 3, lineHeight: 1.5 }}>{body}</div>
            </div>
        </div>
    );
}
