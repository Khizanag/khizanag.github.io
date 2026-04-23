import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, WorkflowStep, PlainEnglishBox } from "../../shared.tsx";
import { P, NATIVE, TEMPLATE } from "./ui.tsx";

export function MigrationSection() {
    return (
        <section id="s-migration" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>MIGRATION</SectionLabel>
                    <SectionHeading sub="Figma provides automated migration tooling to convert native parser files to template format. Here's how it works with our S.I.N.S. codebase.">
                        The migration path
                    </SectionHeading>
                </Reveal>

                <Reveal delay={0.1}>
                    <PlainEnglishBox color={P}>
                        The <code style={{ color: P }}>figma connect migrate</code> command (beta since v1.4.0) automatically converts existing <code>.figma.swift</code> and <code>.figma.kt</code> files into <code>.figma.ts</code> template files. It handles variant restrictions, property mappings, and API renames. Since v1.4.3, TypeScript is the default output format.
                    </PlainEnglishBox>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 32 }}>
                    <div>
                        <Reveal delay={0.15}>
                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: C.text, marginBottom: 20 }}>
                                Migration steps
                            </div>
                        </Reveal>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            <Reveal delay={0.2}>
                                <WorkflowStep n={1} total={5} title="Run migrate command" color={P}>
                                    <code>figma connect migrate</code> — generates <code>.figma.ts</code> files (default since v1.4.3)
                                </WorkflowStep>
                            </Reveal>
                            <Reveal delay={0.25}>
                                <WorkflowStep n={2} total={5} title="Review generated templates" color={P}>
                                    Check property names, enum mappings, and conditional logic. Fix any edge cases the migration script missed.
                                </WorkflowStep>
                            </Reveal>
                            <Reveal delay={0.3}>
                                <WorkflowStep n={3} total={5} title="Test with dry-run" color={P}>
                                    <code>figma connect publish --dry-run</code> — validate templates parse correctly without actually uploading.
                                </WorkflowStep>
                            </Reveal>
                            <Reveal delay={0.35}>
                                <WorkflowStep n={4} total={5} title="Publish & verify" color={P}>
                                    <code>figma connect publish</code> — check snippets appear correctly in Figma Dev Mode.
                                </WorkflowStep>
                            </Reveal>
                            <Reveal delay={0.4}>
                                <WorkflowStep n={5} total={5} title="Remove native files" color={P}>
                                    Delete old <code>.figma.swift</code> / <code>.figma.kt</code> files and remove SPM/Gradle Code Connect dependencies.
                                </WorkflowStep>
                            </Reveal>
                        </div>
                    </div>

                    <div>
                        <Reveal delay={0.2}>
                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: C.text, marginBottom: 20 }}>
                                What the migration converts
                            </div>
                        </Reveal>
                        <Reveal delay={0.25}>
                            <CodeBlock filename="Before: ButtonDoc.figma.swift" highlights={[1, 3, 5]}>
{`struct ButtonDoc: FigmaConnect {
    let figmaNodeUrl = "https://..."
    @FigmaString("✍️ Label")
    var label = "Submit"
    @FigmaBoolean("Loading")
    var loading = false

    var body: some View {
        StandardButtonV3(
            style: .primaryBrand,
            label: label,
            isLoading: loading,
            action: { /* action */ }
        )
    }
}`}
                            </CodeBlock>
                        </Reveal>
                        <div style={{ textAlign: "center", padding: "12px 0", fontSize: 20, color: C.muted }}>
                            <Reveal delay={0.3}>&darr;</Reveal>
                        </div>
                        <Reveal delay={0.35}>
                            <CodeBlock filename="After: ButtonDoc.figma.ts" highlights={[1, 5, 6, 7]}>
{`// url=https://...
// component=StandardButtonV3
import figma from "figma"

const label = figma.selectedInstance
    .getString("✍️ Label")
const loading = figma.selectedInstance
    .getBoolean("Loading")

export default {
    example: figma.code\`StandardButtonV3(
    style: .primaryBrand,
    label: "\${label}",
    isLoading: \${loading},
    action: { /* action */ }
)\`,
}`}
                            </CodeBlock>
                        </Reveal>
                    </div>
                </div>

                <Reveal delay={0.45}>
                    <div style={{
                        marginTop: 32, padding: "16px 20px", background: C.surface,
                        border: `1px solid ${C.border}`, borderRadius: 10,
                        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, textAlign: "center",
                    }}>
                        {[
                            { label: "Files to migrate", value: "80", color: NATIVE },
                            { label: "Estimated effort", value: "1-2 days", color: P },
                            { label: "Risk level", value: "Low", color: TEMPLATE },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: stat.color }}>{stat.value}</div>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, marginTop: 4 }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
