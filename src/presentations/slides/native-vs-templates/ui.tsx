import { type ReactNode } from "react";
import { C, useInView } from "../../shared.tsx";

export const P = C.blue;
export const PDim = C.blueDim;
export const NATIVE = C.purple;
export const NATIVEDim = C.purpleDim;
export const TEMPLATE = C.accent;
export const TEMPLATEDim = C.accentDim;

interface ComparisonColumnProps {
    title: string;
    icon: string;
    color: string;
    tag: string;
    children: ReactNode;
    delay?: number;
}

export function ComparisonColumn({ title, icon, color, tag, children, delay = 0 }: ComparisonColumnProps) {
    const [ref, inView] = useInView();
    return (
        <div
            ref={ref}
            style={{
                background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14,
                padding: "28px 24px", position: "relative", overflow: "hidden", flex: 1,
                opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
            }}
        >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 22 }}>{icon}</span>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: C.text }}>{title}</span>
                </div>
                <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600,
                    color, background: `${color}15`, border: `1px solid ${color}30`,
                    padding: "3px 10px", borderRadius: 50, textTransform: "uppercase",
                }}>
                    {tag}
                </span>
            </div>
            {children}
        </div>
    );
}

interface VerdictBadgeProps {
    label: string;
    winner: "native" | "template" | "tie";
}

export function VerdictBadge({ label, winner }: VerdictBadgeProps) {
    const color = winner === "native" ? NATIVE : winner === "template" ? TEMPLATE : C.yellow;
    const text = winner === "native" ? "Native wins" : winner === "template" ? "Templates win" : "Tie";
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted }}>{label}</span>
            <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600,
                color, background: `${color}15`, border: `1px solid ${color}30`,
                padding: "3px 10px", borderRadius: 50,
            }}>
                {text}
            </span>
        </div>
    );
}

interface ProConItemProps {
    type: "pro" | "con";
    children: ReactNode;
}

interface LimitationCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    color?: string;
    delay?: number;
}

export function LimitationCard({ icon, title, description, color = C.yellow, delay = 0 }: LimitationCardProps) {
    const [ref, inView] = useInView();
    return (
        <div
            ref={ref}
            style={{
                background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14,
                padding: "24px 22px", position: "relative", overflow: "hidden",
                opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
            }}
        >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color }} />
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{
                    width: 34, height: 34, borderRadius: 10, background: `${color}15`, border: `1px solid ${color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17,
                }}>
                    {icon}
                </div>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: C.text }}>
                    {title}
                </span>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.65, margin: 0 }}>
                {description}
            </p>
        </div>
    );
}

export function ProConItem({ type, children }: ProConItemProps) {
    const color = type === "pro" ? C.accent : C.red;
    const icon = type === "pro" ? "+" : "-";
    return (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
            <div style={{
                width: 18, height: 18, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                background: `${color}15`, border: `1px solid ${color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color,
            }}>
                {icon}
            </div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
                {children}
            </span>
        </div>
    );
}
