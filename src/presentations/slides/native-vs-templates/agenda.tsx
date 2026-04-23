import { C, Reveal, SectionLabel, SectionHeading } from "../../shared.tsx";
import { P, NATIVE, TEMPLATE } from "./ui.tsx";

const PARTS = [
    {
        number: "01",
        title: "Context & Setup",
        color: P,
        items: ["What is Code Connect", "Our S.I.N.S. design system", "The two approaches at a glance"],
    },
    {
        number: "02",
        title: "Native Deep Dive",
        color: NATIVE,
        items: ["Swift implementation with real S.I.N.S. examples", "Kotlin/Compose implementation", "Property wrappers & annotations"],
    },
    {
        number: "03",
        title: "Templates Deep Dive",
        color: TEMPLATE,
        items: ["TypeScript template architecture", "Same components in template format", "Cross-platform: one file, two outputs"],
    },
    {
        number: "04",
        title: "Head-to-Head",
        color: C.yellow,
        items: ["Setup complexity", "Feature matrix comparison", "Native limitations", "Template limitations", "Community sentiment"],
    },
    {
        number: "05",
        title: "Strategy & Future",
        color: C.red,
        items: ["MCP integration differences", "Migration path & tooling", "Where Figma is heading", "Our recommendation"],
    },
];

export function AgendaSection() {
    return (
        <section id="s-agenda" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>AGENDA</SectionLabel>
                    <SectionHeading sub="A structured comparison to help the team make an informed decision on which Code Connect approach to adopt.">
                        What we'll cover
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
                                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: part.color, marginBottom: 14 }}>
                                    {part.title}
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    {part.items.map((item) => (
                                        <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                                            <div style={{ width: 5, height: 5, borderRadius: "50%", flexShrink: 0, marginTop: 6, background: `${part.color}60` }} />
                                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{item}</span>
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
