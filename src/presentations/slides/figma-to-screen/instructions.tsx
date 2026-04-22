import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, PlainEnglishBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function InstructionsSection() {
    return (
        <section id="s-instructions" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1150, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.yellow}>INVISIBLE GUARDRAILS</SectionLabel>
                    <SectionHeading sub="Instructions auto-attach by file glob. You never ask for them — Copilot adds them to context silently whenever you touch a matching file.">
                        Instructions — tiered context injection
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 28, marginTop: 28 }}>
                    <Reveal delay={0}>
                        <CodeBlock filename="code-style.instructions.md (excerpt)">{`---
applyTo: "**/*.{swift,ts}"
audience: common
description: Property ordering, MARK conventions, naming.
---

# Swift + TypeScript style

- @Environment properties first
- Type alias for all view-model protocols
- // MARK: - for sections, never plain comments
- Trailing commas on multi-line arguments
- ...`}</CodeBlock>
                    </Reveal>

                    <div>
                        <Reveal delay={0.12}>
                            <PlainEnglishBox color={C.yellow}>
                                Opening <code>DishDetailsView.swift</code> silently loads <strong>component-architecture</strong>, <strong>accessibility-identifiers</strong>, <strong>assets-and-tokens</strong>, <strong>reading-figma</strong>, <strong>component-usage</strong>, and <strong>common-pitfalls</strong>. The model literally cannot forget the conventions.
                            </PlainEnglishBox>
                        </Reveal>

                        <Reveal delay={0.22}>
                            <div style={{ marginTop: 16, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 18px" }}>
                                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: C.yellow, letterSpacing: "0.12em", marginBottom: 10 }}>THE TIERS</div>
                                <div style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.7 }}>
                                    <div style={{ marginBottom: 6 }}>
                                        <code style={{ color: P }}>0-common/</code> — loaded almost everywhere. Style, git, accessibility, tokens. <strong>5 KB budget</strong>.
                                    </div>
                                    <div style={{ marginBottom: 6 }}>
                                        <code style={{ color: C.blue }}>1-consumer/</code> — Swift View authors. Reading Figma, component usage, pitfalls. <strong>7 KB</strong>.
                                    </div>
                                    <div>
                                        <code style={{ color: C.purple }}>2-author/</code> — Code Connect maintainers. Workflow, template style, 14 pitfalls. <strong>8 KB</strong>.
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <div style={{ marginTop: 16, background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${P}`, borderRadius: 8, padding: "14px 16px" }}>
                                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: P, letterSpacing: "0.12em", marginBottom: 6 }}>WHY TIERS</div>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
                                    LLM context is finite. Instructions that load on every edit must be short; specialised rules live in deeper tiers. Every file is shape-validated and byte-capped by <code>validate-instructions.sh</code>.
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
