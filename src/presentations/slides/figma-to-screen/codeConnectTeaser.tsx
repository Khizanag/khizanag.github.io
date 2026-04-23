import { C, Reveal, SectionLabel, SectionHeading, PlainEnglishBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function CodeConnectTeaserSection() {
    return (
        <section id="s-cc-teaser" style={{ padding: "96px 48px", background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.purple}>THE FOUNDATIONAL IDEA</SectionLabel>
                    <SectionHeading sub="Before we talk agents, MCP, templates, or gates — one concept powers the entire stack. If Figma doesn&apos;t know what your Swift code looks like, nothing else matters.">
                        Figma should know your code
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 28, marginTop: 28, alignItems: "center" }}>
                    <Reveal delay={0.1}>
                        <PlainEnglishBox color={C.purple}>
                            <strong>Code Connect</strong> is the bridge. For every component in our design system we publish a tiny <code>.figma.ts</code> mapping file that says: &quot;when this Figma component is on the canvas, render <em>this</em> Swift snippet in Dev Mode&quot;. Designers get to see the real SwiftUI code next to their designs. Humans copy-paste it. AI agents transcribe it. No more guessing init signatures from screenshots.
                        </PlainEnglishBox>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <div style={{ background: C.bg, border: `2px solid ${C.purple}40`, borderRadius: 14, padding: "28px 24px", textAlign: "center" }}>
                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: C.purple, letterSpacing: "0.12em", marginBottom: 18 }}>THE SUPERPOWER</div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 16, alignItems: "center" }}>
                                <div>
                                    <div style={{ fontSize: 32 }}>🎨</div>
                                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.muted, marginTop: 6 }}>Figma</div>
                                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, color: C.text, fontWeight: 600 }}>Button / Primary</div>
                                </div>
                                <div style={{ fontFamily: "'JetBrains Mono', monospace", color: C.purple, fontSize: 20 }}>⇄</div>
                                <div>
                                    <div style={{ fontSize: 32 }}>💻</div>
                                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.muted, marginTop: 6 }}>Swift</div>
                                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, color: C.text, fontWeight: 600 }}>StandardButton.Parameters</div>
                                </div>
                            </div>
                            <div style={{ marginTop: 20, fontSize: 12, color: C.muted, fontStyle: "italic" }}>
                                One mapping file per component · 116 of them live today
                            </div>
                        </div>
                    </Reveal>
                </div>

                <Reveal delay={0.32}>
                    <div style={{ marginTop: 24, textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, fontStyle: "italic", maxWidth: 720, margin: "24px auto 0" }}>
                        Keep this picture in mind. We&apos;ll zoom into the mapping files, the generator, and the deep-dive — but everything built on top depends on <strong style={{ color: C.purple }}>&quot;Figma knows your Swift&quot;</strong> being true.
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
