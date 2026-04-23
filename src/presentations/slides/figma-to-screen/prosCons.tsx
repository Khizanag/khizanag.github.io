import { C, Reveal, SectionLabel, SectionHeading, InfoCard, CheckItem, CalloutBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function ProsConsSection() {
    return (
        <section id="s-pros-cons" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>HONEST TRADE-OFFS</SectionLabel>
                    <SectionHeading sub="There&apos;s no free lunch. The gains are real but so are the constraints — knowing the edges matters more than knowing the headlines.">
                        Where it wins · where it doesn&apos;t
                    </SectionHeading>
                </Reveal>

                <Reveal delay={0.04}>
                    <div style={{ marginTop: 20, marginBottom: 20 }}>
                        <CalloutBox color={C.blue} icon="🎯" label="SCOPE OF THIS TALK">
                            Today we cover the <strong>Presentation layer</strong> end-to-end — View, ViewModel, Router, Factory, DI, Destination, localisation.
                            The Domain and Data layers are <strong>not</strong> auto-scaffolded yet — but the pre-architecture is already in place:
                            Repository protocols, UseCase seams, DataSource stubs, and a layer-scaffolder template that makes adding them a small, low-risk follow-up.
                        </CalloutBox>
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 12 }}>
                    <Reveal delay={0.08}>
                        <InfoCard icon="✨" title="Where it wins" color={C.accent} tag="WINS">
                            <CheckItem active>12 boilerplate files per screen, gone</CheckItem>
                            <CheckItem active>Zero drift between modules — templates are the law</CheckItem>
                            <CheckItem active>Design tokens resolved automatically from Figma variables</CheckItem>
                            <CheckItem active>Mandatory @figma-review blocks self-audit escape</CheckItem>
                            <CheckItem active>Every run produces a reviewable session log</CheckItem>
                            <CheckItem active>Branch + commit + push included — no forgotten SHA</CheckItem>
                            <CheckItem active>7 gates catch lint, build, L10n, SwiftGen, DI issues</CheckItem>
                        </InfoCard>
                    </Reveal>

                    <Reveal delay={0.16}>
                        <InfoCard icon="⚠️" title="Where it doesn't" color={C.red} tag="LIMITS">
                            <CheckItem active={false}>Requires Figma desktop + MCP running locally</CheckItem>
                            <CheckItem active={false}>Novel UI patterns still need hand-authoring</CheckItem>
                            <CheckItem active={false}>Domain / Data layers not yet auto-scaffolded</CheckItem>
                            <CheckItem active={false}>Dead mappings ⇒ guessed Swift ⇒ wrong code</CheckItem>
                            <CheckItem active={false}>First run on a new module warms the discovery cache — 2× slower</CheckItem>
                            <CheckItem active={false}>Can&apos;t scaffold Snapshot / Contract test targets yet</CheckItem>
                            <CheckItem active={false}>No @screen-remover yet — deletions are manual</CheckItem>
                        </InfoCard>
                    </Reveal>
                </div>

                <Reveal delay={0.22}>
                    <div style={{
                        marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14,
                    }}>
                        {[
                            { label: "MEDIAN RUNTIME",     value: "7m 18s",  sub: "end-to-end, attended",   color: C.blue },
                            { label: "FILES WRITTEN",      value: "12",      sub: "per /figma-to-screen run", color: C.purple },
                            { label: "HAND-FIX RATE",      value: "2 TODOs", sub: "median per ViewModel",   color: C.yellow },
                        ].map(stat => (
                            <div key={stat.label} style={{
                                background: C.surface, border: `1px solid ${C.border}`, borderTop: `2px solid ${stat.color}`,
                                borderRadius: 10, padding: "14px 16px",
                            }}>
                                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: C.muted, marginBottom: 6 }}>{stat.label}</div>
                                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: stat.color, marginBottom: 2 }}>{stat.value}</div>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11.5, color: C.muted }}>{stat.sub}</div>
                            </div>
                        ))}
                    </div>
                </Reveal>

                <Reveal delay={0.26}>
                    <div style={{ marginTop: 20 }}>
                        <CalloutBox color={P} icon="⚖️" label="WHEN NOT TO USE IT">
                            One-off prototypes. Showroom demo screens.
                            Screens whose Figma version is still in flux (regenerate every iteration).
                            Anything outside a clean-arch feature module (utility scripts, snapshot tests, analytics wiring).
                        </CalloutBox>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
