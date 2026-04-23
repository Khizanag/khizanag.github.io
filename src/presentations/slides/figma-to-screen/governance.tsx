import { C, Reveal, SectionLabel, SectionHeading } from "../../shared.tsx";
import { P } from "./ui.tsx";

const ROWS: Array<{ asset: string; count: string; owner: string; cadence: string; color: string }> = [
    { asset: "17 agent specs (.agent.md)",                count: "17", owner: "iOS AI Infra (1 lead, 2 contributors)", cadence: "Reviewed monthly", color: P },
    { asset: "8 layer scaffold templates",                count: "8",  owner: "iOS Architecture Guild",                cadence: "Updated on Clean-Arch RFC merge", color: C.purple },
    { asset: "116 Code Connect mappings (.figma.ts)",    count: "116",owner: "Core UI V2 maintainers",                  cadence: "Updated per S.I.N.S. release",    color: C.blue },
    { asset: "screen-context.json schema",                count: "v1", owner: "iOS AI Infra",                            cadence: "SemVer; migrations gated by validate-screen-context.mjs", color: C.yellow },
    { asset: "Instruction tier files (0/1/2/3-common)",  count: "~40",owner: "Module owners + Architecture Guild",       cadence: "Glob-scoped; per-module PR review", color: C.accent },
    { asset: "Discovery cache (.github/.cache/)",         count: "n",  owner: "Local to each developer",                  cadence: "Auto-invalidated by mtime witnesses", color: P },
    { asset: "MCP server config (mcp.json)",              count: "1",  owner: "iOS AI Infra (versioned in dotfiles)",     cadence: "Bumped on Figma desktop releases", color: C.blue },
];

export function GovernanceSection() {
    return (
        <section id="s-governance" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.purple}>GOVERNANCE &amp; OWNERSHIP</SectionLabel>
                    <SectionHeading sub="Every artefact has a named owner and a refresh cadence. No template, mapping, or schema is unowned — that is the pre-condition for scaling beyond the founding team.">
                        Who owns what — and how often it changes
                    </SectionHeading>
                </Reveal>

                <div style={{ marginTop: 28, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
                    <div style={{
                        display: "grid", gridTemplateColumns: "2fr 0.5fr 1.6fr 1.4fr", gap: 14,
                        padding: "12px 18px", background: `${P}10`, borderBottom: `1px solid ${C.border}`,
                        fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: C.muted, letterSpacing: "0.1em",
                    }}>
                        <div>ASSET</div>
                        <div>COUNT</div>
                        <div>OWNER</div>
                        <div>CADENCE</div>
                    </div>
                    {ROWS.map((row, i) => (
                        <Reveal key={row.asset} delay={i * 0.04}>
                            <div style={{
                                display: "grid", gridTemplateColumns: "2fr 0.5fr 1.6fr 1.4fr", gap: 14,
                                padding: "14px 18px", borderBottom: i === ROWS.length - 1 ? "none" : `1px solid ${C.border}`,
                                alignItems: "center",
                            }}>
                                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: C.text }}>
                                    <span style={{ color: row.color, marginRight: 8 }}>■</span>{row.asset}
                                </div>
                                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: row.color }}>
                                    {row.count}
                                </div>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: C.text }}>
                                    {row.owner}
                                </div>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: C.muted }}>
                                    {row.cadence}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.4}>
                    <div style={{
                        marginTop: 24, padding: "16px 20px",
                        background: `${C.purple}08`, border: `1px solid ${C.purple}40`, borderLeft: `3px solid ${C.purple}`,
                        borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: C.text, lineHeight: 1.6,
                    }}>
                        <strong style={{ color: C.purple }}>Bus factor &gt; 1 by construction.</strong>{" "}
                        Every artefact is a file in the monorepo, reviewed via the standard PR flow. There is no oral knowledge — if it
                        is not in <code>.github/agents/</code>, <code>.github/templates/scaffolds/</code>, or a layer instruction file, it is not enforced.
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
