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
