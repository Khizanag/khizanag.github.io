import { C, Reveal, SectionLabel, SectionHeading, CalloutBox, WorkflowStep } from "../../shared.tsx";
import { P, NATIVE, TEMPLATE, ProConItem, ComparisonColumn } from "./ui.tsx";

export function RecommendationSection() {
    return (
        <section id="s-recommendation" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={TEMPLATE}>RECOMMENDATION</SectionLabel>
                    <SectionHeading sub="Based on the evidence — features, limitations, community, MCP, and Figma's direction — here's the recommended strategy for S.I.N.S. Code Connect.">
                        Our path forward
                    </SectionHeading>
                </Reveal>

                <Reveal delay={0.1}>
                    <CalloutBox color={TEMPLATE} icon="🎯" label="VERDICT">
                        <strong style={{ color: TEMPLATE }}>Adopt TypeScript templates</strong> as the primary Code Connect strategy. Migrate existing 80 Swift mappings using <code>figma connect migrate</code>. Write all new Compose mappings as templates from the start. Maintain a single template codebase for both platforms.
                    </CalloutBox>
                </Reveal>

                <div style={{ display: "flex", gap: 24, marginTop: 32 }}>
                    <ComparisonColumn title="Why Templates Win" icon="✅" color={TEMPLATE} tag="Pros" delay={0.15}>
                        <ProConItem type="pro">Cross-platform: one file covers both Swift and Kotlin output</ProConItem>
                        <ProConItem type="pro">Full conditional logic — no more separate structs per variant</ProConItem>
                        <ProConItem type="pro">Nested property mapping — Issue #376 solved natively</ProConItem>
                        <ProConItem type="pro">Zero build dependencies — no SwiftSyntax, no Gradle plugin</ProConItem>
                        <ProConItem type="pro">MCP-native: built for the AI-assisted workflow</ProConItem>
                        <ProConItem type="pro">Active development with new features every release</ProConItem>
                        <ProConItem type="pro">Automated migration from existing 80 Swift files</ProConItem>
                        <ProConItem type="pro">TypeScript types provide autocomplete and safety</ProConItem>
                    </ComparisonColumn>

                    <ComparisonColumn title="What We Accept" icon="⚠️" color={C.yellow} tag="Trade-offs" delay={0.2}>
                        <ProConItem type="con">Team learns basic TypeScript (not full language — just templates)</ProConItem>
                        <ProConItem type="con">No Swift/Kotlin compiler validation of output strings</ProConItem>
                        <ProConItem type="con">Template files live outside Xcode/Android Studio projects</ProConItem>
                        <ProConItem type="con">No create wizard yet (manual template creation)</ProConItem>
                        <div style={{ marginTop: 16, padding: "12px 16px", background: `${C.accent}08`, border: `1px solid ${C.accent}20`, borderRadius: 8 }}>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.6 }}>
                                These are <strong style={{ color: C.accent }}>tooling gaps</strong>, not architectural limits. They will improve with better CLI commands and IDE plugins. The native parser's limits are permanent.
                            </div>
                        </div>
                    </ComparisonColumn>
                </div>

                <Reveal delay={0.3}>
                    <div style={{
                        marginTop: 32, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16,
                        color: C.text, marginBottom: 16,
                    }}>
                        Recommended rollout plan
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                    <Reveal delay={0.35}>
                        <div style={{
                            background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12,
                            padding: "20px 18px", position: "relative", overflow: "hidden",
                        }}>
                            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: TEMPLATE }} />
                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: `${TEMPLATE}25` }}>W1</div>
                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: TEMPLATE, marginBottom: 8 }}>Pilot migration</div>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
                                Run <code>figma connect migrate</code> on 10 button components. Validate output in Dev Mode. Fix edge cases.
                            </div>
                        </div>
                    </Reveal>
                    <Reveal delay={0.4}>
                        <div style={{
                            background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12,
                            padding: "20px 18px", position: "relative", overflow: "hidden",
                        }}>
                            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: TEMPLATE }} />
                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: `${TEMPLATE}25` }}>W2</div>
                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: TEMPLATE, marginBottom: 8 }}>Full Swift migration</div>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
                                Migrate remaining 70 Swift files. Remove SPM Code Connect dependency. Update figma.config.json.
                            </div>
                        </div>
                    </Reveal>
                    <Reveal delay={0.45}>
                        <div style={{
                            background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12,
                            padding: "20px 18px", position: "relative", overflow: "hidden",
                        }}>
                            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: P }} />
                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: `${P}25` }}>W3</div>
                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: P, marginBottom: 8 }}>Compose templates</div>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
                                Write Compose output templates using the same files. Add Kotlin enum mappings alongside Swift ones.
                            </div>
                        </div>
                    </Reveal>
                    <Reveal delay={0.5}>
                        <div style={{
                            background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12,
                            padding: "20px 18px", position: "relative", overflow: "hidden",
                        }}>
                            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: C.accent }} />
                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: `${C.accent}25` }}>W4</div>
                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: C.accent, marginBottom: 8 }}>CI + MCP</div>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
                                Add <code>figma connect publish</code> to CI pipeline. Configure Figma MCP with template-based mappings.
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
