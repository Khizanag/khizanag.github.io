import { C, Reveal, SectionLabel, SectionHeading, FeatureCard } from "../../shared.tsx";
import { Fragment } from "react";
import { P } from "./ui.tsx";
import { WhatIsSteps } from "./whatIsSteps.tsx";

const FLOW_KEYFRAMES = `
@keyframes flow-packet {
  0%   { left: 0%;    opacity: 0; }
  6%   {                opacity: 1; }
  94%  {                opacity: 1; }
  100% { left: 100%;  opacity: 0; }
}
@keyframes stage-pulse {
  0%, 100% { transform: scale(1);    box-shadow: 0 0 0 0 currentColor; }
  50%      { transform: scale(1.06); box-shadow: 0 0 24px 4px currentColor; }
}
@keyframes draw-line {
  from { stroke-dashoffset: 120; }
  to   { stroke-dashoffset: 0;   }
}
@keyframes rise-in {
  from { opacity: 0; transform: translateY(14px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0)    scale(1);    }
}
`;

type Stage = { icon: string; label: string; sub: string; color: string; delay: number };

const STAGES: Stage[] = [
    { icon: "🎨", label: "Figma",         sub: "Design + tokens", color: C.purple, delay: 0.0 },
    { icon: "🔌", label: "MCP · CC",     sub: "Live read + map",  color: C.blue,   delay: 0.6 },
    { icon: "🤖", label: "Orchestrator",  sub: "17 sub-agents",    color: C.yellow, delay: 1.2 },
    { icon: "📱", label: "Swift",          sub: "Clean-Arch files", color: P,        delay: 1.8 },
];

export function WhatIsSection() {
    return (
        <section id="s-what-is" style={{ padding: "96px 48px" }}>
            <style>{FLOW_KEYFRAMES}</style>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>THE ELEVATOR PITCH</SectionLabel>
                    <SectionHeading sub="Before we go under the hood, here is the whole thing in one paragraph. If the rest of the deck were lost, this is what you should walk away with.">
                        What is this infrastructure?
                    </SectionHeading>
                </Reveal>

                {/* Animated pipeline diagram */}
                <Reveal delay={0.08}>
                    <div style={{
                        position: "relative", marginTop: 36, marginBottom: 12,
                        padding: "28px 20px",
                        background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16,
                        overflow: "hidden",
                    }}>
                        {/* Scanline sheen */}
                        <div style={{
                            position: "absolute", inset: 0, pointerEvents: "none",
                            background: `linear-gradient(90deg, transparent, ${P}08, transparent)`,
                            backgroundSize: "200% 100%",
                            animation: "flow-packet 6s linear infinite",
                        }} />

                        <div style={{
                            position: "relative",
                            display: "grid", gridTemplateColumns: "1fr 40px 1fr 40px 1fr 40px 1fr",
                            alignItems: "center", gap: 0,
                        }}>
                            {STAGES.map((stage, i) => (
                                <Fragment key={stage.label}>
                                    <Stage stage={stage} />
                                    {i < STAGES.length - 1 && (
                                        <Connector
                                            delay={stage.delay + 0.3}
                                            color={STAGES[i + 1].color}
                                        />
                                    )}
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.18}>
                    <div style={{ marginTop: 28, marginBottom: 8 }}>
                        <div style={{
                            fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11,
                            letterSpacing: "0.14em", color: C.muted, marginBottom: 14, textAlign: "center",
                        }}>THE STORY IN SIX FRAMES</div>
                        <WhatIsSteps />
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, marginTop: 28 }}>
                    <Reveal delay={0.26}>
                        <FeatureCard
                            icon="🎯"
                            title="What problem it solves"
                            color={C.red}
                            description="Each new screen used to be ~12 boilerplate files hand-copied from a neighbouring module, plus a manual Figma-to-SwiftUI translation riddled with guessed component APIs, guessed tokens, and drift from the design system."
                        />
                    </Reveal>
                    <Reveal delay={0.34}>
                        <FeatureCard
                            icon="⚡️"
                            title="What you get"
                            color={C.blue}
                            description="A committed feature branch with a pixel-perfect View, a wired ViewModel/Router/Factory, patched Destination + root Injection, localised strings, and a reviewable session log — from one /figma-to-screen invocation."
                        />
                    </Reveal>
                    <Reveal delay={0.42}>
                        <FeatureCard
                            icon="🧭"
                            title="Who it is for"
                            color={P}
                            description="Senior engineers who want the boring parts gone but the architectural discipline preserved — and senior designers who want their Figma tokens, variants, and components to survive the trip into code without translation."
                        />
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

function Stage({ stage }: { stage: Stage }) {
    return (
        <div style={{
            textAlign: "center",
            animation: `rise-in 0.6s ease ${stage.delay}s both`,
        }}>
            <div style={{
                width: 72, height: 72, margin: "0 auto", borderRadius: 18,
                background: `${stage.color}15`, border: `1.5px solid ${stage.color}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 30, color: stage.color,
                animation: `stage-pulse 2.8s ease-in-out ${stage.delay + 0.4}s infinite`,
            }}>
                <span style={{ animation: `float 3s ease-in-out ${stage.delay}s infinite` }}>{stage.icon}</span>
            </div>
            <div style={{
                marginTop: 10, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13,
                color: stage.color, letterSpacing: "0.04em",
            }}>{stage.label}</div>
            <div style={{
                marginTop: 2, fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5,
                color: C.muted, letterSpacing: "0.02em",
            }}>{stage.sub}</div>
        </div>
    );
}

function Connector({ color, delay }: { color: string; delay: number }) {
    return (
        <div style={{ position: "relative", height: 40, overflow: "visible" }}>
            <svg width="100%" height="40" viewBox="0 0 40 40" preserveAspectRatio="none" style={{ display: "block" }}>
                <line x1="0" y1="20" x2="40" y2="20"
                    stroke={color} strokeWidth="1.5"
                    strokeDasharray="4 4"
                    style={{ animation: `draw-line 1.2s ease ${delay}s both`, strokeDasharray: "120", strokeDashoffset: "120" }}
                />
                <polygon points="36,16 40,20 36,24" fill={color}
                    style={{ opacity: 0, animation: `fadeIn 0.4s ease ${delay + 1}s forwards` }}
                />
            </svg>
            {/* traveling packet */}
            <div style={{
                position: "absolute", top: 13, left: 0, width: 14, height: 14, borderRadius: "50%",
                background: color, boxShadow: `0 0 12px ${color}`,
                animation: `flow-packet 2.4s ease-in-out ${delay + 1.4}s infinite`,
            }} />
        </div>
    );
}
