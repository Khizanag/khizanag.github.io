import { useState, useRef } from "react";
import { C, Reveal, SectionLabel, SectionHeading, useLocalTabNav } from "../../shared.tsx";
import { P, NATIVE, TEMPLATE } from "./ui.tsx";

interface IssueCardProps {
    number: number;
    title: string;
    status: "open" | "closed";
    platform: "swift" | "kotlin" | "template" | "mcp";
    quote?: string;
    color: string;
    delay?: number;
}

function IssueCard({ number, title, status, platform, quote, color, delay = 0 }: IssueCardProps) {
    const platformColors = { swift: NATIVE, kotlin: NATIVE, template: TEMPLATE, mcp: P };
    return (
        <Reveal delay={delay}>
            <div style={{
                background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12,
                padding: "18px 20px", position: "relative", overflow: "hidden",
            }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{
                            fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600,
                            color: status === "open" ? C.accent : C.muted,
                            background: status === "open" ? `${C.accent}15` : `${C.muted}15`,
                            padding: "2px 8px", borderRadius: 50,
                        }}>
                            #{number}
                        </span>
                        <span style={{
                            fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 600,
                            color: platformColors[platform], background: `${platformColors[platform]}15`,
                            padding: "2px 8px", borderRadius: 50, textTransform: "uppercase",
                        }}>
                            {platform}
                        </span>
                    </div>
                    <span style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                        color: status === "open" ? C.red : C.accent,
                    }}>
                        {status}
                    </span>
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.text, marginBottom: quote ? 10 : 0, lineHeight: 1.5 }}>
                    {title}
                </div>
                {quote && (
                    <div style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, fontStyle: "italic",
                        padding: "10px 14px", background: `${color}08`, borderLeft: `2px solid ${color}40`,
                        borderRadius: "0 6px 6px 0", lineHeight: 1.6,
                    }}>
                        &ldquo;{quote}&rdquo;
                    </div>
                )}
            </div>
        </Reveal>
    );
}

const TABS = [
    { id: "swift", label: "Swift Issues", icon: "🍎", color: NATIVE },
    { id: "kotlin", label: "Kotlin Issues", icon: "🤖", color: NATIVE },
    { id: "template", label: "Template Issues", icon: "📄", color: TEMPLATE },
    { id: "signal", label: "Direction Signals", icon: "🔮", color: P },
];

export function CommunitySection() {
    const [active, setActive] = useState(0);
    const activeRef = useRef(active);
    activeRef.current = active;
    useLocalTabNav("s-community", TABS.length, activeRef, setActive);
    const tab = TABS[active];

    return (
        <section id="s-community" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>COMMUNITY</SectionLabel>
                    <SectionHeading sub="207 open issues on figma/code-connect. Here are the most relevant ones for our decision, with direct quotes from Figma engineers.">
                        What developers are saying
                    </SectionHeading>
                </Reveal>

                <Reveal delay={0.1}>
                    <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
                        {TABS.map((t, i) => (
                            <button
                                key={t.id}
                                onClick={() => setActive(i)}
                                style={{
                                    background: active === i ? `${t.color}15` : "transparent",
                                    border: `1px solid ${active === i ? t.color : C.border}`,
                                    borderRadius: 50, padding: "8px 16px", cursor: "pointer",
                                    display: "flex", alignItems: "center", gap: 6,
                                    fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 12,
                                    color: active === i ? t.color : C.muted,
                                    transition: "all 0.2s ease",
                                }}
                            >
                                <span>{t.icon}</span> {t.label}
                            </button>
                        ))}
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    {tab.id === "swift" && <>
                        <IssueCard number={376} title="Nested property mapping not supported for Swift" status="open" platform="swift" color={C.red} delay={0.15}
                            quote="We're working on a framework-agnostic setup for Code Connect, which while not written in Swift, allows much greater flexibility to represent any code." />
                        <IssueCard number={229} title="figmaApply cannot use property values in conditional blocks" status="open" platform="swift" color={C.red} delay={0.2} />
                        <IssueCard number={223} title="Cannot express @State or @Binding annotations" status="open" platform="swift" color={C.yellow} delay={0.25} />
                        <IssueCard number={218} title="figmaApply too limited for real-world component APIs" status="open" platform="swift" color={C.yellow} delay={0.3} />
                        <IssueCard number={217} title="hideDefault causes rendering errors in Dev Mode" status="open" platform="swift" color={C.yellow} delay={0.35} />
                        <IssueCard number={257} title="CLI setup script fails with SwiftUI project" status="open" platform="swift" color={C.red} delay={0.4} />
                    </>}
                    {tab.id === "kotlin" && <>
                        <IssueCard number={335} title="Nested properties not supported for Jetpack Compose" status="open" platform="kotlin" color={C.red} delay={0.15} />
                        <IssueCard number={334} title="Cannot map multiple Figma properties to a single Compose parameter" status="open" platform="kotlin" color={C.red} delay={0.2} />
                        <IssueCard number={219} title="No hideDefault parameter for Compose annotations" status="open" platform="kotlin" color={C.yellow} delay={0.25} />
                        <IssueCard number={266} title="Gradle plugin depends on kotlin-compiler-embeddable (heavy)" status="open" platform="kotlin" color={C.yellow} delay={0.3} />
                        <IssueCard number={346} title="Compose parser exits with code 1 — build errors" status="closed" platform="kotlin" color={C.yellow} delay={0.35}
                            quote="Needs to support latest Kotlin versions — constant chasing." />
                        <IssueCard number={287} title="Must keep up with every new Kotlin version" status="closed" platform="kotlin" color={C.yellow} delay={0.4} />
                    </>}
                    {tab.id === "template" && <>
                        <IssueCard number={340} title="MCP server not using Code Connect mappings for non-React parsers" status="open" platform="mcp" color={C.red} delay={0.15}
                            quote="Custom parser / no-parser templates are not evaluated by the MCP." />
                        <IssueCard number={321} title="ESM imports not supported in template files" status="closed" platform="template" color={C.accent} delay={0.2}
                            quote="Fixed in v1.4.2 — ESM imports now work." />
                        <IssueCard number={262} title="Raw templates need variant and links support" status="open" platform="template" color={C.yellow} delay={0.25} />
                        <IssueCard number={373} title="Imports array not returned from Figma MCP" status="closed" platform="template" color={C.accent} delay={0.3} />
                    </>}
                    {tab.id === "signal" && <>
                        <IssueCard number={384} title="User refers to native files as 'legacy code connect patterns'" status="open" platform="template" color={TEMPLATE} delay={0.15}
                            quote="I'm trying to use the new Template API rather than the legacy code connect patterns." />
                        <IssueCard number={360} title="Asked if templates are 'the path forward'" status="open" platform="template" color={TEMPLATE} delay={0.2}
                            quote="Still experimenting, so keep us posted if you have any feedback. — @slees-figma" />
                        <IssueCard number={376} title="Figma engineers directing Swift users to templates" status="open" platform="swift" color={TEMPLATE} delay={0.25}
                            quote="We're working on a framework-agnostic setup... which while not written in Swift, allows much greater flexibility." />
                        <IssueCard number={375} title="Request for MCP instructions to include Code Connect data via CLI" status="open" platform="mcp" color={P} delay={0.3}
                            quote="README now leads with template files as 'the easiest way to get started'. All v1.4.x releases are template-focused." />
                    </>}
                </div>
            </div>
        </section>
    );
}
