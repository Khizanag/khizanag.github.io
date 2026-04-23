import { C, Reveal, SectionLabel, SectionHeading } from "../../shared.tsx";
import { P, NATIVE, TEMPLATE } from "./ui.tsx";

const VERDICTS = [
    { dimension: "Developer Experience", winner: "native" as const, reason: "Write in your own language, compiler catches errors, IDE autocomplete works natively" },
    { dimension: "Capability & Flexibility", winner: "template" as const, reason: "Nested props, conditional logic, multiple variants per file, cross-platform output" },
    { dimension: "Setup & Maintenance", winner: "template" as const, reason: "3 steps vs 6, no SwiftSyntax/Gradle builds, no version chasing" },
    { dimension: "MCP & AI Workflow", winner: "template" as const, reason: "MCP is architecturally built around JS templates, native is indirect" },
    { dimension: "Community & Support", winner: "template" as const, reason: "All new features go to templates, native gets bug fixes only" },
    { dimension: "Future-Proofing", winner: "template" as const, reason: "Every signal from Figma points to templates as the long-term direction" },
    { dimension: "Migration Risk", winner: "native" as const, reason: "Existing 80 mappings work today, migration introduces temporary risk" },
    { dimension: "Output Safety", winner: "native" as const, reason: "Compiler validates code, template output is unchecked raw strings" },
];

export function SummarySection() {
    const templateWins = VERDICTS.filter((v) => v.winner === "template").length;
    const nativeWins = VERDICTS.filter((v) => v.winner === "native").length;

    return (
        <section id="s-summary" style={{ background: C.bg, borderTop: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>SCORECARD</SectionLabel>
                    <SectionHeading sub={`A synthesis of everything we've covered — ${VERDICTS.length} dimensions, scored honestly. Templates lead ${templateWins}-${nativeWins}, but the native wins matter.`}>
                        Where we landed
                    </SectionHeading>
                </Reveal>

                <Reveal delay={0.1}>
                    <div style={{
                        display: "flex", gap: 16, marginBottom: 32, justifyContent: "center",
                    }}>
                        {[
                            { label: "Templates", count: templateWins, color: TEMPLATE },
                            { label: "Native", count: nativeWins, color: NATIVE },
                        ].map((stat) => (
                            <div key={stat.label} style={{
                                display: "flex", alignItems: "center", gap: 10, padding: "12px 24px",
                                background: `${stat.color}10`, border: `1px solid ${stat.color}25`, borderRadius: 50,
                            }}>
                                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: stat.color }}>{stat.count}</span>
                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.text }}>{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </Reveal>

                <Reveal delay={0.15}>
                    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
                        {VERDICTS.map((v, i) => {
                            const color = v.winner === "native" ? NATIVE : TEMPLATE;
                            const label = v.winner === "native" ? "Native" : "Templates";
                            return (
                                <div
                                    key={v.dimension}
                                    style={{
                                        display: "grid", gridTemplateColumns: "180px 110px 1fr",
                                        padding: "14px 20px", alignItems: "center",
                                        borderBottom: i < VERDICTS.length - 1 ? `1px solid ${C.border}` : "none",
                                        background: i % 2 === 0 ? "transparent" : `${C.surfaceHi}40`,
                                    }}
                                >
                                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: C.text }}>
                                        {v.dimension}
                                    </span>
                                    <span style={{
                                        fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600,
                                        color, background: `${color}15`, border: `1px solid ${color}30`,
                                        padding: "3px 12px", borderRadius: 50, textAlign: "center", width: "fit-content",
                                    }}>
                                        {label}
                                    </span>
                                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.5 }}>
                                        {v.reason}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </Reveal>

                <Reveal delay={0.25}>
                    <div style={{
                        marginTop: 32, padding: "20px 24px", background: C.surface,
                        border: `1px solid ${P}30`, borderRadius: 12, textAlign: "center",
                    }}>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.7 }}>
                            Templates win on <strong style={{ color: TEMPLATE }}>capability, maintenance, and future direction</strong>.
                            Native wins on <strong style={{ color: NATIVE }}>developer ergonomics and compile-time safety</strong>.
                            The question is: which trade-offs can we mitigate, and which are permanent?
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
