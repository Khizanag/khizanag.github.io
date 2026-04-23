import { C, Reveal, SectionLabel, SectionHeading, InfoCard, CheckItem, CalloutBox } from "../../shared.tsx";
import { P, NATIVE, TEMPLATE } from "./ui.tsx";

export function FutureSignalsSection() {
    return (
        <section id="s-future" style={{ background: C.bg, borderTop: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>FUTURE DIRECTION</SectionLabel>
                    <SectionHeading sub="Analyzing Figma's commit history, release notes, engineer responses, and architecture decisions to understand where Code Connect is heading.">
                        Where Figma is going
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                    <Reveal delay={0.1}>
                        <InfoCard icon="📈" title="What Figma IS building" color={TEMPLATE} tag="TEMPLATES">
                            <CheckItem active delay={0}>TypeScript-first templates (default .figma.ts output since v1.4.3)</CheckItem>
                            <CheckItem active delay={0.05}>Migration automation getting more robust each release</CheckItem>
                            <CheckItem active delay={0.1}>Template API V2 — renamed APIs, normalized tags</CheckItem>
                            <CheckItem active delay={0.15}>MCP-native template evaluation</CheckItem>
                            <CheckItem active delay={0.2}>Full type definitions for autocomplete (v1.4.2+)</CheckItem>
                            <CheckItem active delay={0.25}>Framework expansion via templates (Dart, Flutter, etc.)</CheckItem>
                        </InfoCard>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <InfoCard icon="🚫" title="What Figma is NOT building" color={C.red} tag="SIGNALS">
                            <CheckItem active={false} delay={0}>No new native parsers for any language</CheckItem>
                            <CheckItem active={false} delay={0.05}>No nested property support for Swift</CheckItem>
                            <CheckItem active={false} delay={0.1}>No nested property support for Kotlin</CheckItem>
                            <CheckItem active={false} delay={0.15}>No feature parity push for native parsers</CheckItem>
                            <CheckItem active={false} delay={0.2}>No new @FigmaXxx property wrappers</CheckItem>
                            <CheckItem active={false} delay={0.25}>No new Kotlin annotations</CheckItem>
                        </InfoCard>
                    </Reveal>
                </div>

                <Reveal delay={0.25}>
                    <div style={{
                        marginTop: 32, background: C.surface, border: `1px solid ${C.border}`,
                        borderRadius: 14, overflow: "hidden",
                    }}>
                        <div style={{
                            padding: "16px 20px", background: C.surfaceHi,
                            borderBottom: `1px solid ${C.border}`,
                            fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: C.text,
                        }}>
                            Release timeline — all template-focused
                        </div>
                        {[
                            { version: "v1.4.0", date: "Feb 2026", changes: "Migration script, .figma.js default, template files always included", color: TEMPLATE },
                            { version: "v1.4.1", date: "Feb 2026", changes: "Template file publishing fixes", color: TEMPLATE },
                            { version: "v1.4.2", date: "Mar 2026", changes: "TypeScript template support, variant handling in migration", color: TEMPLATE },
                            { version: "v1.4.3", date: "Apr 2026", changes: "TypeScript as default output, Storybook migration, --file flag", color: TEMPLATE },
                        ].map((release, i) => (
                            <div key={release.version} style={{
                                display: "grid", gridTemplateColumns: "100px 100px 1fr",
                                padding: "12px 20px", alignItems: "center",
                                borderBottom: i < 3 ? `1px solid ${C.border}` : "none",
                            }}>
                                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600, color: release.color }}>{release.version}</span>
                                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.muted }}>{release.date}</span>
                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.text }}>{release.changes}</span>
                            </div>
                        ))}
                    </div>
                </Reveal>

                <Reveal delay={0.35}>
                    <div style={{ marginTop: 24 }}>
                        <CalloutBox color={TEMPLATE} icon="🔮" label="THE PATTERN IS CLEAR">
                            Every release since v1.4.0 is template-focused. Native parsers receive only bug fixes. Figma engineers redirect feature requests to templates. The README now leads with templates. The migration tool exists specifically to move <strong style={{ color: NATIVE }}>away from</strong> native parsers. This is not ambiguous.
                        </CalloutBox>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
