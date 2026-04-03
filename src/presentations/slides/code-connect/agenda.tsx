import { C, Reveal, SectionLabel, SectionHeading } from "../../shared.tsx";
import { P } from "./ui.tsx";

const PARTS = [
    {
        number: "01",
        title: "The Problem & Why",
        color: C.red,
        items: ["Design-code disconnect", "Business value of bridging the gap"],
    },
    {
        number: "02",
        title: "Figma MCP & Code Connect",
        color: P,
        items: ["What is MCP (Model Context Protocol)", "Local vs Remote server setup", "What is Code Connect", "How it publishes code to Figma"],
    },
    {
        number: "03",
        title: "Our S.I.N.S. Integration",
        color: C.blue,
        items: ["Setup & configuration", "7 mapping patterns", "70 components / 249 connections", "Limitations & workarounds", "Developer workflow"],
    },
    {
        number: "04",
        title: "The Developer Toolkit",
        color: C.yellow,
        items: ["Design tokens & assets API", "Component API patterns", "Navigation system", "Instruction files"],
    },
    {
        number: "05",
        title: "AI-Assisted Development",
        color: C.accent,
        items: ["Figma → working screen in minutes", "Trust rules & verification", "Screen architecture (5-file pattern)", "Real case study: LoansMain", "Common pitfalls", "Getting started checklist"],
    },
];

export function AgendaSection() {
    return (
        <section id="s-agenda" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>AGENDA</SectionLabel>
                    <SectionHeading sub="What we'll cover today — from the problem we solved to how you can use it starting tomorrow.">
                        Presentation overview
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
                    {PARTS.map((part, i) => (
                        <Reveal key={part.number} delay={i * 0.08}>
                            <div style={{
                                background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14,
                                padding: "24px 20px", height: "100%", position: "relative", overflow: "hidden",
                            }}>
                                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: part.color }} />
                                <div style={{
                                    fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 32,
                                    color: `${part.color}25`, letterSpacing: "-0.03em", marginBottom: 8,
                                }}>
                                    {part.number}
                                </div>
                                <div style={{
                                    fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14,
                                    color: part.color, marginBottom: 14,
                                }}>
                                    {part.title}
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    {part.items.map((item) => (
                                        <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                                            <div style={{
                                                width: 5, height: 5, borderRadius: "50%", flexShrink: 0, marginTop: 6,
                                                background: `${part.color}60`,
                                            }} />
                                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.5 }}>
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
