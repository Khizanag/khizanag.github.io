import { C, Reveal, SectionLabel, SectionHeading } from "../../shared.tsx";
import { P } from "./ui.tsx";
import { HeroTransform, OutcomeRibbon, IllusCard } from "./whatIsExtras.tsx";

export function WhatIsSection() {
    return (
        <section id="s-what-is" style={{ padding: "96px 48px", position: "relative", overflow: "hidden" }}>
            <AmbientOrbs />

            <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
                <Reveal>
                    <SectionLabel color={P}>THE ELEVATOR PITCH</SectionLabel>
                    <SectionHeading sub="Before we go under the hood, here is the whole thing — the transformation, the numbers that come out, and who it's for. We unpack the step-by-step one slide from now.">
                        What is this infrastructure?
                    </SectionHeading>
                </Reveal>

                {/* 1 — Hero transformation banner (before → after) */}
                <Reveal delay={0.08}>
                    <div style={{ marginTop: 32 }}>
                        <HeroTransform />
                    </div>
                </Reveal>

                {/* Divider label: NUMBERS */}
                <Reveal delay={0.2}>
                    <DividerLabel text="WHAT COMES OUT" color={C.accent} />
                </Reveal>

                {/* 2 — Outcome ribbon (5 animated stat cards) */}
                <Reveal delay={0.26}>
                    <div style={{ marginTop: 8 }}>
                        <OutcomeRibbon />
                    </div>
                </Reveal>

                {/* Divider label: CONTEXT */}
                <Reveal delay={0.36}>
                    <DividerLabel text="WHY · FOR WHOM · AGAINST WHAT" color={P} />
                </Reveal>

                {/* 4 — Illustrated 3-card context */}
                <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 8,
                }}>
                    <IllusCard
                        icon="🎯"
                        title="What problem it solves"
                        color={C.red}
                        description="Each new screen used to be 28 files hand-authored across Presentation, Domain, and Data — plus a manual Figma-to-SwiftUI translation riddled with guessed component APIs, guessed tokens, and drift from the design system."
                        illustration="problem"
                        delay={0.5}
                    />
                    <IllusCard
                        icon="⚡️"
                        title="What you get"
                        color={C.blue}
                        description="A committed feature branch with a pixel-perfect View, a wired ViewModel / Router / Factory, patched Destination + root Injection, localised strings, and a reviewable session log — from one /figma-to-screen invocation."
                        illustration="get"
                        delay={0.58}
                    />
                    <IllusCard
                        icon="🧭"
                        title="Who it is for"
                        color={P}
                        description="Every iOS engineer on the team — from the developer shipping their first screen to the architect enforcing module boundaries. Boring parts gone, architectural discipline preserved; designers get their tokens, variants, and components surviving the trip into code."
                        illustration="who"
                        delay={0.66}
                    />
                </div>
            </div>
        </section>
    );
}

function DividerLabel({ text, color }: { text: string; color: string }) {
    return (
        <div style={{
            display: "flex", alignItems: "center", gap: 14,
            marginTop: 44, marginBottom: 16,
        }}>
            <span style={{
                width: 8, height: 8, borderRadius: "50%",
                background: color, boxShadow: `0 0 12px ${color}`,
            }} />
            <span style={{
                fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 800,
                letterSpacing: "0.22em", color,
            }}>
                {text}
            </span>
            <span style={{
                flex: 1, height: 1,
                background: `linear-gradient(90deg, ${color}60, transparent)`,
            }} />
        </div>
    );
}

function AmbientOrbs() {
    return (
        <>
            <style>{`
                @keyframes orb-drift-a {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50%      { transform: translate(40px, -30px) scale(1.08); }
                }
                @keyframes orb-drift-b {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50%      { transform: translate(-30px, 40px) scale(1.1); }
                }
            `}</style>
            <div style={{
                position: "absolute", top: "10%", right: "-8%",
                width: 380, height: 380, borderRadius: "50%",
                background: `radial-gradient(circle, ${P}10, transparent 70%)`,
                filter: "blur(40px)", pointerEvents: "none",
                animation: "orb-drift-a 18s ease-in-out infinite",
            }} />
            <div style={{
                position: "absolute", bottom: "5%", left: "-6%",
                width: 320, height: 320, borderRadius: "50%",
                background: `radial-gradient(circle, ${C.blue}0e, transparent 70%)`,
                filter: "blur(40px)", pointerEvents: "none",
                animation: "orb-drift-b 22s ease-in-out infinite",
            }} />
        </>
    );
}
