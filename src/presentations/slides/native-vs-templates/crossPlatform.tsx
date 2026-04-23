import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, CalloutBox } from "../../shared.tsx";
import { TEMPLATE, NATIVE } from "./ui.tsx";

export function CrossPlatformSection() {
    return (
        <section id="s-cross-platform" style={{ background: C.bg, borderTop: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={TEMPLATE}>CROSS-PLATFORM</SectionLabel>
                    <SectionHeading sub="A single template file can output both Swift and Kotlin code. The same Figma component, two platform outputs, zero duplication.">
                        One template, two platforms
                    </SectionHeading>
                </Reveal>

                <Reveal delay={0.1}>
                    <CalloutBox color={TEMPLATE} icon="🌐" label="KEY ADVANTAGE">
                        With <strong style={{ color: NATIVE }}>native parsers</strong>, you write <code>ButtonDoc.figma.swift</code> AND <code>ButtonDoc.figma.kt</code> — separate files, separate parsers, separate build systems.
                        With <strong style={{ color: TEMPLATE }}>templates</strong>, a single <code>.figma.ts</code> file reads Figma properties once and outputs code for both platforms.
                    </CalloutBox>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 32 }}>
                    <Reveal delay={0.15}>
                        <CodeBlock filename="StandardButton.figma.ts (Swift output)" highlights={[7, 16, 17, 18, 19, 20, 21, 22, 23]}>
{`// url=https://figma.com/.../SINS?node-id=7-38
// component=StandardButtonV3
import figma from "figma"

const i = figma.selectedInstance
const label = i.getString("✍️ Label")
const loading = i.getBoolean("Loading")

// --- SwiftUI output ---
const style = i.getEnum("Style", {
    "Primary Brand": ".primaryBrand",
    "Secondary":     ".secondaryDefault",
    "Tertiary":      ".tertiaryDefault",
})

export default {
    example: figma.code\`StandardButtonV3(
    style: \${style},
    label: "\${label}",
    isLoading: \${loading},
    action: { /* action */ }
)\`,
}`}
                        </CodeBlock>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <CodeBlock filename="StandardButton.figma.ts (Compose output)" highlights={[7, 16, 17, 18, 19, 20, 21, 22, 23, 24]}>
{`// url=https://figma.com/.../SINS?node-id=7-38
// component=UiStandardButton
import figma from "figma"

const i = figma.selectedInstance
const label = i.getString("✍️ Label")
const loading = i.getBoolean("Loading")

// --- Compose output ---
const style = i.getEnum("Style", {
    "Primary Brand": "UiButtonStyle.PrimaryBrand",
    "Secondary":     "UiButtonStyle.Secondary",
    "Tertiary":      "UiButtonStyle.Tertiary",
})

export default {
    example: figma.code\`UiStandardButton(
    data = UiStandardButtonData(
        style = \${style},
        content = UiButtonContent.Text("\${label}"),
        isLoading = \${loading},
    ),
    click = EmptyClick,
)\`,
}`}
                        </CodeBlock>
                    </Reveal>
                </div>

                <Reveal delay={0.25}>
                    <div style={{
                        marginTop: 32, padding: "20px 24px", background: C.surface,
                        border: `1px solid ${C.border}`, borderRadius: 12,
                        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24,
                    }}>
                        {[
                            { label: "Files (projected)", native: "160 (80 + 80)", template: "80 (shared)", winner: "template" as const },
                            { label: "Build systems", native: "SPM + Gradle + npm", template: "npm only", winner: "template" as const },
                            { label: "Property logic", native: "Duplicated per platform", template: "Written once", winner: "template" as const },
                        ].map((row) => (
                            <div key={row.label}>
                                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: C.text, marginBottom: 10 }}>
                                    {row.label}
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: NATIVE }} />
                                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.muted }}>{row.native}</span>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: TEMPLATE }} />
                                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TEMPLATE }}>{row.template}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
