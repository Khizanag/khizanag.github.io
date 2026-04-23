import { C, Reveal, SectionLabel, SectionHeading, CalloutBox, FeatureCard } from "../../shared.tsx";
import { P, NATIVE, TEMPLATE } from "./ui.tsx";

export function ContextSection() {
    return (
        <section id="s-context" style={{ background: C.bg, borderTop: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>CONTEXT</SectionLabel>
                    <SectionHeading sub="Code Connect links Figma components to real code snippets, so designers and developers share a single source of truth in Dev Mode.">
                        What is Code Connect?
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 48 }}>
                    <Reveal delay={0.05}>
                        <FeatureCard icon="🔗" title="Bidirectional Link" description="Maps each Figma component to its real code implementation. When a designer selects a component, developers see the actual API." color={P} />
                    </Reveal>
                    <Reveal delay={0.1}>
                        <FeatureCard icon="👁" title="Dev Mode Integration" description="Code snippets appear directly in Figma Dev Mode. No switching context, no searching docs, no guessing parameter names." color={P} />
                    </Reveal>
                    <Reveal delay={0.15}>
                        <FeatureCard icon="🔄" title="Live Property Mapping" description="When a designer changes text, toggles, or variants in Figma, the code snippet updates in real time to reflect those exact values." color={P} />
                    </Reveal>
                    <Reveal delay={0.2}>
                        <FeatureCard icon="📦" title="CLI-Driven Publishing" description="The figma connect publish CLI pushes mappings to Figma's servers. No manual upload, no copy-paste. Integrates into CI/CD pipelines." color={P} />
                    </Reveal>
                </div>

                <Reveal delay={0.25}>
                    <CalloutBox color={P} icon="💠" label="OUR DESIGN SYSTEM">
                        <strong>S.I.N.S. Components v5.0</strong> — 59 V3 components across buttons, inputs, cards, selection controls, data display, and specialized widgets.
                        Currently <strong style={{ color: NATIVE }}>80 Code Connect mappings</strong> using the native Swift parser.
                        Compose (Android) side has partial coverage with <strong style={{ color: TEMPLATE }}>3 connected components</strong>.
                    </CalloutBox>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 32 }}>
                    {[
                        { label: "StandardButtonV3", count: "8 styles", color: NATIVE },
                        { label: "InputFieldV3", count: "6 types", color: NATIVE },
                        { label: "ChipV3", count: "18 combos", color: NATIVE },
                        { label: "AvatarV3", count: "4 variants", color: NATIVE },
                    ].map((comp, i) => (
                        <Reveal key={comp.label} delay={0.3 + i * 0.05}>
                            <div style={{
                                background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10,
                                padding: "16px 18px", textAlign: "center",
                            }}>
                                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600, color: comp.color, marginBottom: 6 }}>
                                    {comp.label}
                                </div>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted }}>
                                    {comp.count}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
