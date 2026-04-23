import { C, Reveal, SectionLabel, SectionHeading, PlainEnglishBox, CheckItem } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function WhyTypescriptSection() {
    return (
        <section id="s-why-ts" style={{ padding: "96px 48px", background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
            <div style={{ maxWidth: 1150, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.yellow}>THE OBVIOUS QUESTION</SectionLabel>
                    <SectionHeading sub="We&apos;re an iOS shop. Every component is SwiftUI. So why do our 116 mapping files end in .ts and not .swift?">
                        Why TypeScript, not Swift native?
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 28 }}>
                    <Reveal delay={0}>
                        <CompareBox
                            label="LEGACY · SWIFT-NATIVE"
                            accent={C.red}
                            rows={[
                                ["File",           "Button.figma.swift"],
                                ["Style",          "@FigmaProp wrappers on a struct"],
                                ["Publish",        "Xcode build → CLI"],
                                ["Iteration",      "Full Xcode rebuild per edit"],
                                ["Cross-platform", "Swift-only"],
                                ["Status",         "Frozen by Figma Q3 2025"],
                            ]}
                        />
                    </Reveal>
                    <Reveal delay={0.1}>
                        <CompareBox
                            label="TODAY · TYPESCRIPT"
                            accent={C.accent}
                            rows={[
                                ["File",           "Button.figma.ts"],
                                ["Style",          "figma.connect({ props, example })"],
                                ["Publish",        "figma connect publish (seconds)"],
                                ["Iteration",      "Save → reload Dev Mode"],
                                ["Cross-platform", "iOS · Android · Web · Flutter"],
                                ["Status",         "Figma's long-term direction"],
                            ]}
                        />
                    </Reveal>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
                    <Reveal delay={0.2}>
                        <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "18px 20px" }}>
                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, color: P, letterSpacing: "0.12em", marginBottom: 12 }}>WHAT TYPESCRIPT UNLOCKS</div>
                            <CheckItem active>Code generation — one spec registry writes all 116 .figma.ts files (not possible in Swift-native).</CheckItem>
                            <CheckItem active>Sub-second iteration — no Xcode build between edit and publish.</CheckItem>
                            <CheckItem active>Standard tooling — lint, test, diff mappings with JS ecosystem tools.</CheckItem>
                            <CheckItem active>Future multi-platform — Android &amp; Web can plug into the same generator.</CheckItem>
                        </div>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <PlainEnglishBox color={C.yellow}>
                            We didn&apos;t pick TypeScript because we like TypeScript. We picked it because <strong>Figma picked it</strong> as the canonical authoring language in late 2025. Swift-native files still compile, but they&apos;re frozen — no new features, no generator ecosystem. Meeting the platform where it&apos;s going beats defending where it used to be.
                        </PlainEnglishBox>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

function CompareBox({ label, accent, rows }: { label: string; accent: string; rows: [string, string][] }) {
    return (
        <div style={{
            background: C.bg,
            border: `1px solid ${C.border}`,
            borderTop: `3px solid ${accent}`,
            borderRadius: 10,
            padding: "16px 18px",
        }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: accent, letterSpacing: "0.12em", marginBottom: 12 }}>{label}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {rows.map(([k, v]) => (
                    <div key={k} style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: 12, alignItems: "baseline" }}>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>{k}</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: C.text, lineHeight: 1.45 }}>{v}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
