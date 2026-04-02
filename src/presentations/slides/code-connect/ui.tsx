import { type ReactNode } from "react";
import { C, useInView } from "../../shared.tsx";

export const P = C.purple;
export const PDim = C.purpleDim;

interface CategoryBadgeProps {
    label: string;
    count: number;
    color?: string;
    delay?: number;
}

export function CategoryBadge({ label, count, color = P, delay = 0 }: CategoryBadgeProps) {
    const [ref, inView] = useInView();
    return (
        <div
            ref={ref}
            style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px 16px", background: C.surface, border: `1px solid ${C.border}`,
                borderRadius: 10, gap: 12,
                opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-12px)",
                transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
            }}
        >
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.text }}>{label}</span>
            <span style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, color,
                background: `${color}15`, border: `1px solid ${color}30`,
                padding: "3px 10px", borderRadius: 50, minWidth: 28, textAlign: "center",
            }}>
                {count}
            </span>
        </div>
    );
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
