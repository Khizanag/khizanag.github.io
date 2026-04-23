import { C, Reveal, SectionLabel, SectionHeading } from "../../shared.tsx";
import { P, NATIVE, TEMPLATE } from "./ui.tsx";

const FEATURES = [
    { feature: "Write in platform language", native: true, template: false, note: "Swift/Kotlin vs TypeScript" },
    { feature: "Type checking", native: true, template: true, note: "Swift compiler vs TS types (v1.4.2+)" },
    { feature: "IDE autocomplete", native: true, template: true, note: "Xcode/AS vs VS Code" },
    { feature: "No compilation step", native: false, template: true, note: "SwiftSyntax build takes 2-5 min" },
    { feature: "Conditional modifiers", native: false, template: true, note: "figmaApply is boolean-only" },
    { feature: "Nested property mapping", native: false, template: true, note: "Issue #376 — fundamental limitation" },
    { feature: "Associated-value enums", native: false, template: true, note: "Cannot construct .icon(Image(...))" },
    { feature: "Multiple variants per file", native: false, template: true, note: "Native needs separate structs" },
    { feature: "Cross-platform output", native: false, template: true, note: "One file for Swift + Kotlin" },
    { feature: "MCP-native integration", native: false, template: true, note: "MCP tools accept JS templates" },
    { feature: "Figma wizard support", native: true, template: false, note: "figma connect create wizard" },
    { feature: "Established in codebase", native: true, template: false, note: "80 existing mappings" },
    { feature: "No new language required", native: true, template: false, note: "Team knows Swift/Kotlin" },
    { feature: "Compile-time safety", native: true, template: false, note: "Swift/Kotlin compiler validates code" },
    { feature: "Active feature development", native: false, template: true, note: "Templates get all new features" },
    { feature: "Migration tooling", native: false, template: true, note: "figma connect migrate command" },
];

function Check({ yes }: { yes: boolean }) {
    return (
        <div style={{
            width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            background: yes ? `${C.accent}15` : `${C.red}15`, border: `1px solid ${yes ? C.accent : C.red}30`,
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: yes ? C.accent : C.red,
        }}>
            {yes ? "\u2713" : "\u2717"}
        </div>
    );
}

export function FeatureMatrixSection() {
    const nativeWins = FEATURES.filter((f) => f.native && !f.template).length;
    const templateWins = FEATURES.filter((f) => f.template && !f.native).length;
    const ties = FEATURES.filter((f) => f.native === f.template).length;

    return (
        <section id="s-features" style={{ background: C.bg, borderTop: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>FEATURE MATRIX</SectionLabel>
                    <SectionHeading sub={`A head-to-head comparison across ${FEATURES.length} dimensions. Templates lead ${templateWins}-${nativeWins} with ${ties} ties.`}>
                        Capability comparison
                    </SectionHeading>
                </Reveal>

                <Reveal delay={0.1}>
                    <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                        {[
                            { label: "Native wins", count: nativeWins, color: NATIVE },
                            { label: "Template wins", count: templateWins, color: TEMPLATE },
                            { label: "Tied", count: ties, color: C.yellow },
                        ].map((stat) => (
                            <div key={stat.label} style={{
                                display: "flex", alignItems: "center", gap: 8, padding: "8px 16px",
                                background: `${stat.color}10`, border: `1px solid ${stat.color}25`, borderRadius: 50,
                            }}>
                                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: stat.color }}>{stat.count}</span>
                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted }}>{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </Reveal>

                <Reveal delay={0.15}>
                    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
                        <div style={{
                            display: "grid", gridTemplateColumns: "2fr 80px 80px 2fr",
                            padding: "14px 20px", background: C.surfaceHi, borderBottom: `1px solid ${C.border}`,
                        }}>
                            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, color: C.muted, textTransform: "uppercase" }}>Feature</span>
                            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, color: NATIVE, textAlign: "center" }}>Native</span>
                            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, color: TEMPLATE, textAlign: "center" }}>Template</span>
                            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, color: C.muted, textTransform: "uppercase" }}>Notes</span>
                        </div>
                        {FEATURES.map((f, i) => (
                            <div
                                key={f.feature}
                                style={{
                                    display: "grid", gridTemplateColumns: "2fr 80px 80px 2fr",
                                    padding: "12px 20px", alignItems: "center",
                                    borderBottom: i < FEATURES.length - 1 ? `1px solid ${C.border}` : "none",
                                    background: i % 2 === 0 ? "transparent" : `${C.surfaceHi}40`,
                                }}
                            >
                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.text }}>{f.feature}</span>
                                <div style={{ display: "flex", justifyContent: "center" }}><Check yes={f.native} /></div>
                                <div style={{ display: "flex", justifyContent: "center" }}><Check yes={f.template} /></div>
                                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.muted }}>{f.note}</span>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
