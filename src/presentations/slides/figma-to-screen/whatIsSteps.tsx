import { type ReactNode } from "react";
import { C, useInView } from "../../shared.tsx";
import { P } from "./ui.tsx";

const STEP_KEYFRAMES = `
@keyframes step-rise {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes tick-pop {
  0%   { transform: scale(0); opacity: 0; }
  60%  { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes cursor-blink {
  0%, 49%  { opacity: 1; }
  50%, 100%{ opacity: 0; }
}
@keyframes scan-dot {
  0%   { transform: translateX(0);    opacity: 0; }
  20%  {                                opacity: 1; }
  80%  {                                opacity: 1; }
  100% { transform: translateX(60px); opacity: 0; }
}
@keyframes line-slide {
  from { opacity: 0; transform: translateX(-8px); }
  to   { opacity: 1; transform: translateX(0);    }
}
`;

type Step = {
    n: string;
    icon: string;
    title: ReactNode;
    detail: string;
    color: string;
    visual: ReactNode;
};

// ── Mini visuals per step ───────────────────────────────────────────
const FigmaTiles = () => (
    <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
        {["Button", "Card", "Modal"].map((name, i) => (
            <div key={name} style={{
                padding: "6px 10px", borderRadius: 6,
                background: `${C.purple}15`, border: `1px solid ${C.purple}60`,
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.purple,
                animation: `step-rise 0.5s ease ${0.2 + i * 0.1}s both`,
            }}>{name}</div>
        ))}
    </div>
);

const UrlPaste = () => (
    <div style={{
        padding: "8px 12px", borderRadius: 6,
        background: C.bg, border: `1px solid ${C.border}`,
        fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: C.text,
        display: "flex", alignItems: "center", gap: 4, overflow: "hidden",
    }}>
        <span style={{ color: C.muted }}>&gt;</span>
        <span style={{ color: C.blue }}>figma.com/</span>
        <span style={{ color: C.muted }}>...</span>
        <span style={{ color: C.text }}>?node-id=</span>
        <span style={{ color: P }}>42-1</span>
        <span style={{
            display: "inline-block", width: 2, height: 12, background: P, marginLeft: 2,
            animation: "cursor-blink 1s step-end infinite",
        }} />
    </div>
);

const McpScan = () => (
    <div style={{
        position: "relative", height: 28,
        display: "flex", alignItems: "center", justifyContent: "center",
    }}>
        <div style={{
            position: "relative", width: 140, height: 2,
            background: `${C.blue}30`, borderRadius: 2,
        }}>
            <div style={{
                position: "absolute", top: -3, left: 0, width: 8, height: 8,
                borderRadius: "50%", background: C.blue, boxShadow: `0 0 10px ${C.blue}`,
                animation: "scan-dot 2s ease-in-out infinite",
            }} />
        </div>
        <div style={{
            position: "absolute", left: 0, top: 8, fontSize: 14, color: C.purple,
        }}>🎨</div>
        <div style={{
            position: "absolute", right: 0, top: 8, fontSize: 14, color: C.blue,
        }}>{'{ }'}</div>
    </div>
);

const CodeConnectMap = () => (
    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5 }}>
        <div style={{ color: C.muted, marginBottom: 3, animation: "line-slide 0.5s ease 0.2s both" }}>
            <span style={{ color: C.purple }}>Button/Primary</span>
        </div>
        <div style={{ color: C.muted, marginBottom: 3, animation: "line-slide 0.5s ease 0.5s both" }}>↓</div>
        <div style={{ color: P, animation: "line-slide 0.5s ease 0.8s both" }}>
            <span style={{ color: C.yellow }}>SINButton</span>(.primary)
        </div>
    </div>
);

const FileScaffold = () => {
    const files = ["View", "ViewModel", "Router", "Factory", "DI", "Destination", "L10n"];
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, fontSize: 10 }}>
            {files.map((f, i) => (
                <div key={f} style={{
                    display: "flex", alignItems: "center", gap: 4, color: C.muted,
                    fontFamily: "'JetBrains Mono', monospace",
                    animation: `line-slide 0.4s ease ${0.15 * i}s both`,
                }}>
                    <span style={{
                        color: C.accent, fontSize: 10,
                        animation: `tick-pop 0.3s ease ${0.15 * i + 0.2}s both`,
                    }}>✓</span>
                    {f}.swift
                </div>
            ))}
        </div>
    );
};

const GateBadges = () => (
    <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center" }}>
        {[
            { label: "BUILD",  color: C.accent },
            { label: "LINT",   color: C.blue },
            { label: "DI",     color: C.purple },
            { label: "REVIEW", color: C.yellow },
        ].map((g, i) => (
            <div key={g.label} style={{
                padding: "3px 8px", borderRadius: 50,
                background: `${g.color}15`, border: `1px solid ${g.color}`,
                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 9.5,
                color: g.color, letterSpacing: "0.08em",
                animation: `tick-pop 0.4s ease ${0.15 * i}s both`,
            }}>✓ {g.label}</div>
        ))}
    </div>
);

// ── Steps data ──────────────────────────────────────────────────────
const STEPS: Step[] = [
    {
        n: "01", icon: "🎨", color: C.purple,
        title: <>Designers ship components to <strong>Figma</strong></>,
        detail: "One design system, versioned variants, tokens as variables.",
        visual: <FigmaTiles />,
    },
    {
        n: "02", icon: "📋", color: C.blue,
        title: <>You paste a <strong>Figma URL</strong> into your editor</>,
        detail: "That's the whole developer-facing input — one URL, one command.",
        visual: <UrlPaste />,
    },
    {
        n: "03", icon: "🔌", color: C.blue,
        title: <>An AI agent reads the design via Figma's <strong>MCP server</strong></>,
        detail: "Live design, real selection — not a screenshot, not an export.",
        visual: <McpScan />,
    },
    {
        n: "04", icon: "🔗", color: C.yellow,
        title: <>Our <strong>Code Connect</strong> mappings translate each component</>,
        detail: "Figma layer names resolve to the exact SwiftUI init calls we use.",
        visual: <CodeConnectMap />,
    },
    {
        n: "05", icon: "🤖", color: C.purple,
        title: <>An <strong>orchestrator</strong> scaffolds every Clean-Arch file</>,
        detail: "View, ViewModel, Router, Factory, DI, Destination, localisation.",
        visual: <FileScaffold />,
    },
    {
        n: "06", icon: "✅", color: P,
        title: <>All <strong>compiling</strong>, <strong>linting</strong>, and <strong>reviewed</strong></>,
        detail: "Verification gates run before the reply — no green means no ship.",
        visual: <GateBadges />,
    },
];

export function WhatIsSteps() {
    return (
        <>
            <style>{STEP_KEYFRAMES}</style>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                {STEPS.map((step, i) => (
                    <StepCard key={step.n} step={step} delay={i * 0.12} />
                ))}
            </div>
        </>
    );
}

function StepCard({ step, delay }: { step: Step; delay: number }) {
    const [ref, inView] = useInView();
    return (
        <div
            ref={ref}
            style={{
                position: "relative",
                background: C.surface, border: `1px solid ${C.border}`,
                borderTop: `2px solid ${step.color}`, borderRadius: 12,
                padding: "20px 20px 18px",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(18px)",
                transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
                overflow: "hidden",
            }}
        >
            {/* faded step number */}
            <div style={{
                position: "absolute", top: 10, right: 14,
                fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 32,
                color: `${step.color}20`, letterSpacing: "-0.04em", lineHeight: 1,
            }}>{step.n}</div>

            {/* icon */}
            <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: `${step.color}15`, border: `1px solid ${step.color}40`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, marginBottom: 12,
            }}>{step.icon}</div>

            {/* title + detail */}
            <div style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.text,
                lineHeight: 1.45, marginBottom: 6,
            }}>{step.title}</div>
            <div style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted,
                lineHeight: 1.5, marginBottom: 14,
            }}>{step.detail}</div>

            {/* mini visual */}
            <div style={{
                padding: "10px 10px", borderRadius: 8,
                background: C.bg, border: `1px solid ${C.border}`,
                minHeight: 48, display: "flex", alignItems: "center", justifyContent: "center",
            }}>{step.visual}</div>
        </div>
    );
}
