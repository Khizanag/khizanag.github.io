import { type ReactNode } from "react";
import { C, useInView } from "../../shared.tsx";

export const P = C.accent;
export const PDim = C.accentDim;

// ── Phase pill ──────────────────────────────────────────────────────
interface PhasePillProps {
    number: string;
    title: string;
    color?: string;
    delay?: number;
}

export function PhasePill({ number, title, color = P, delay = 0 }: PhasePillProps) {
    const [ref, inView] = useInView();
    return (
        <div
            ref={ref}
            style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 16px", background: C.surface, border: `1px solid ${color}40`,
                borderLeft: `3px solid ${color}`, borderRadius: 10,
                opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-12px)",
                transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
            }}
        >
            <span style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 13, color,
                background: `${color}15`, borderRadius: 6, padding: "3px 8px", minWidth: 36, textAlign: "center",
            }}>{number}</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.text, fontWeight: 500 }}>{title}</span>
        </div>
    );
}

// ── Roadmap badge (for the review #1-#10 grid) ──────────────────────
interface RoadmapBadgeProps {
    number: string;
    title: string;
    description: string;
    color?: string;
    delay?: number;
}

export function RoadmapBadge({ number, title, description, color = P, delay = 0 }: RoadmapBadgeProps) {
    const [ref, inView] = useInView();
    return (
        <div
            ref={ref}
            style={{
                background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14,
                padding: "20px 22px", position: "relative", overflow: "hidden", height: "100%",
                opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
            }}
        >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color }} />
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
                <span style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 24,
                    color: `${color}40`, letterSpacing: "-0.03em",
                }}>#{number}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.text, fontWeight: 600 }}>{title}</span>
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.5 }}>
                {description}
            </div>
        </div>
    );
}

// ── Gate row (T1 / T2 tiered) ───────────────────────────────────────
interface GateRowProps {
    number: number;
    title: string;
    tier: "T1" | "T2";
    description: string;
    delay?: number;
}

export function GateRow({ number, title, tier, description, delay = 0 }: GateRowProps) {
    const [ref, inView] = useInView();
    const tierColor = tier === "T1" ? C.red : C.yellow;
    return (
        <div
            ref={ref}
            style={{
                display: "grid", gridTemplateColumns: "40px 1fr 64px", gap: 16, alignItems: "center",
                padding: "14px 18px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10,
                opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-12px)",
                transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
            }}
        >
            <span style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18,
                color: tierColor, textAlign: "center",
            }}>{number}</span>
            <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.text, fontWeight: 600, marginBottom: 2 }}>{title}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{description}</div>
            </div>
            <span style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: tierColor,
                background: `${tierColor}15`, border: `1px solid ${tierColor}40`,
                padding: "4px 10px", borderRadius: 50, textAlign: "center",
            }}>{tier}</span>
        </div>
    );
}

// ── Stat tile ────────────────────────────────────────────────────────
interface StatTileProps {
    value: string;
    label: string;
    subLabel?: string;
    color?: string;
    delay?: number;
}

export function StatTile({ value, label, subLabel, color = P, delay = 0 }: StatTileProps) {
    const [ref, inView] = useInView();
    return (
        <div
            ref={ref}
            style={{
                background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14,
                padding: "28px 22px", textAlign: "center",
                opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
            }}
        >
            <div style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 44,
                color, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 8,
            }}>{value}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.text, fontWeight: 500 }}>{label}</div>
            {subLabel ? (
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, marginTop: 4 }}>{subLabel}</div>
            ) : null}
        </div>
    );
}

// ── Icon placeholder helper ─────────────────────────────────────────
export function InlineIcon({ children, color = P }: { children: ReactNode; color?: string }) {
    return (
        <span style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 20, height: 20, borderRadius: 4,
            background: `${color}15`, border: `1px solid ${color}40`,
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color, fontWeight: 600,
        }}>{children}</span>
    );
}

// ── Do / Don't card ─────────────────────────────────────────────────
interface DoDontCardProps {
    kind: "do" | "dont";
    title: string;
    bullets: string[];
    delay?: number;
}

export function DoDontCard({ kind, title, bullets, delay = 0 }: DoDontCardProps) {
    const [ref, inView] = useInView();
    const color = kind === "do" ? C.accent : C.red;
    const label = kind === "do" ? "DO" : "DON'T";
    const symbol = kind === "do" ? "✓" : "✕";
    return (
        <div
            ref={ref}
            style={{
                background: C.surface, border: `1px solid ${color}30`, borderTop: `3px solid ${color}`,
                borderRadius: 14, padding: "22px 24px", height: "100%",
                opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(14px)",
                transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{
                    width: 26, height: 26, borderRadius: 6, background: `${color}20`, border: `1px solid ${color}60`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color, fontWeight: 800, fontSize: 14,
                }}>{symbol}</span>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color, letterSpacing: "0.12em" }}>{label}</span>
            </div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: C.text, marginBottom: 10, lineHeight: 1.3 }}>{title}</div>
            <ul style={{ margin: 0, paddingLeft: 18, color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
                {bullets.map((b, i) => <li key={i} style={{ marginBottom: 4 }}>{b}</li>)}
            </ul>
        </div>
    );
}

// ── Slash command card ──────────────────────────────────────────────
interface SlashCommandCardProps {
    command: string;
    purpose: string;
    invokedAs: string;
    delay?: number;
    color?: string;
}

export function SlashCommandCard({ command, purpose, invokedAs, delay = 0, color = P }: SlashCommandCardProps) {
    const [ref, inView] = useInView();
    return (
        <div
            ref={ref}
            style={{
                background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${color}`,
                borderRadius: 10, padding: "16px 18px",
                opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-10px)",
                transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
            }}
        >
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                <code style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 600,
                    color, background: `${color}12`, padding: "3px 8px", borderRadius: 6,
                }}>{command}</code>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.muted }}>or <code style={{ color: C.text }}>{invokedAs}</code></span>
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.text, lineHeight: 1.55 }}>{purpose}</div>
        </div>
    );
}

// ── Agent catalog row ───────────────────────────────────────────────
interface AgentRowProps {
    name: string;
    role: "orchestrator" | "codegen" | "read" | "gate";
    description: string;
    delay?: number;
}

const ROLE_META: Record<AgentRowProps["role"], { color: string; label: string }> = {
    orchestrator: { color: C.accent,  label: "ORCHESTRATOR" },
    codegen:      { color: C.blue,    label: "CODE-GEN" },
    read:         { color: C.purple,  label: "READ-ONLY" },
    gate:         { color: C.red,     label: "GATE" },
};

export function AgentRow({ name, role, description, delay = 0 }: AgentRowProps) {
    const [ref, inView] = useInView();
    const meta = ROLE_META[role];
    return (
        <div
            ref={ref}
            style={{
                display: "flex", flexDirection: "column", gap: 6,
                padding: "10px 14px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8,
                opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-8px)",
                transition: `opacity 0.4s ease ${delay}s, transform 0.4s ease ${delay}s`,
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.text, fontWeight: 600 }}>@{name}</code>
                <span style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 9, color: meta.color, letterSpacing: "0.1em",
                    background: `${meta.color}15`, border: `1px solid ${meta.color}40`, padding: "2px 6px",
                    borderRadius: 4,
                }}>{meta.label}</span>
            </div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11.5, color: C.muted, lineHeight: 1.5 }}>{description}</span>
        </div>
    );
}

// ── Architecture diagram block (layered column) ─────────────────────
interface LayerBoxProps {
    label: string;
    title: string;
    subtitle?: string;
    color?: string;
    delay?: number;
}

export function LayerBox({ label, title, subtitle, color = P, delay = 0 }: LayerBoxProps) {
    const [ref, inView] = useInView();
    return (
        <div
            ref={ref}
            style={{
                background: C.surface, border: `1px solid ${color}40`, borderRadius: 12,
                padding: "18px 20px", position: "relative",
                opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(10px)",
                transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
            }}
        >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color, letterSpacing: "0.14em",
                }}>{label}</span>
            </div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: C.text, marginBottom: 4 }}>{title}</div>
            {subtitle ? <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{subtitle}</div> : null}
        </div>
    );
}

// ── Arrow connector ─────────────────────────────────────────────────
export function Arrow({ label, color = P }: { label?: string; color?: string }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "6px 0" }}>
            <div style={{ width: 1, height: 18, background: `${color}60` }} />
            {label ? (
                <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color, padding: "2px 8px",
                    background: `${color}12`, border: `1px solid ${color}30`, borderRadius: 4,
                }}>{label}</span>
            ) : null}
            <div style={{ width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: `6px solid ${color}80` }} />
        </div>
    );
}

// ── Phase card (for the 8 phases deep dive) ─────────────────────────
interface PhaseCardProps {
    phase: string;
    title: string;
    bullets: string[];
    color?: string;
    delay?: number;
}

export function PhaseCard({ phase, title, bullets, color = P, delay = 0 }: PhaseCardProps) {
    const [ref, inView] = useInView();
    return (
        <div
            ref={ref}
            style={{
                background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14,
                padding: "20px 22px", height: "100%", position: "relative", overflow: "hidden",
                opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(14px)",
                transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
            }}
        >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color }} />
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
                <span style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 13, color,
                    background: `${color}18`, border: `1px solid ${color}40`, padding: "3px 10px", borderRadius: 6,
                }}>{phase}</span>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: C.text }}>{title}</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, color: C.muted, fontSize: 12.5, lineHeight: 1.65 }}>
                {bullets.map((b, i) => <li key={i} style={{ marginBottom: 4 }}>{b}</li>)}
            </ul>
        </div>
    );
}
