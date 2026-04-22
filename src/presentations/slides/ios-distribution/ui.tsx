import { type ReactNode } from "react";
import { C, useInView } from "../../shared.tsx";

export const P = C.blue;
export const PDim = C.blueDim;

interface GuidelineChipProps {
    id: string;
    label: string;
    color?: string;
}

export function GuidelineChip({ id, label, color = C.red }: GuidelineChipProps) {
    return (
        <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "8px 14px", background: `${color}10`,
            border: `1px solid ${color}30`, borderRadius: 8,
            fontFamily: "'JetBrains Mono', monospace",
        }}>
            <span style={{ fontSize: 12, fontWeight: 700, color }}>{id}</span>
            <span style={{ width: 1, height: 12, background: `${color}40` }} />
            <span style={{ fontSize: 12, color: C.text }}>{label}</span>
        </div>
    );
}

interface WarStoryHeaderProps {
    year: string;
    app: string;
    verdict: "rejected" | "resolved" | "ongoing" | "banned";
    color: string;
}

export function WarStoryHeader({ year, app, verdict, color }: WarStoryHeaderProps) {
    const verdictColor = verdict === "rejected" || verdict === "banned" ? C.red
        : verdict === "resolved" ? C.accent
            : C.yellow;
    return (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 20 }}>
            <div style={{
                padding: "6px 14px", background: `${color}15`, border: `1px solid ${color}30`,
                borderRadius: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color,
                letterSpacing: "0.1em", fontWeight: 700,
            }}>
                {year}
            </div>
            <div style={{
                padding: "6px 14px", background: C.surface, border: `1px solid ${C.border}`,
                borderRadius: 6, fontFamily: "'Syne', sans-serif", fontSize: 13, color: C.text, fontWeight: 700,
            }}>
                {app}
            </div>
            <div style={{
                padding: "6px 14px", background: `${verdictColor}12`, border: `1px solid ${verdictColor}30`,
                borderRadius: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                color: verdictColor, letterSpacing: "0.15em", fontWeight: 700, textTransform: "uppercase",
            }}>
                {verdict}
            </div>
        </div>
    );
}

interface TimelineRowProps {
    when: string;
    title: string;
    detail: ReactNode;
    color?: string;
    delay?: number;
}

export function TimelineRow({ when, title, detail, color = P, delay = 0 }: TimelineRowProps) {
    const [ref, inView] = useInView();
    return (
        <div
            ref={ref}
            style={{
                display: "grid", gridTemplateColumns: "120px 1fr", gap: 24, alignItems: "flex-start",
                padding: "16px 0", borderBottom: `1px solid ${C.border}`,
                opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-16px)",
                transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
            }}
        >
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color, letterSpacing: "0.1em", fontWeight: 700, paddingTop: 2 }}>
                {when}
            </div>
            <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 4 }}>
                    {title}
                </div>
                <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{detail}</div>
            </div>
        </div>
    );
}

interface StatBlockProps {
    value: string;
    label: string;
    color?: string;
    delay?: number;
}

export function StatBlock({ value, label, color = P, delay = 0 }: StatBlockProps) {
    const [ref, inView] = useInView();
    return (
        <div
            ref={ref}
            style={{
                padding: "20px 24px", background: C.surface, border: `1px solid ${C.border}`,
                borderRadius: 12, textAlign: "center",
                opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
            }}
        >
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 6, letterSpacing: "0.05em" }}>{label}</div>
        </div>
    );
}

interface ComparisonRowProps {
    label: string;
    cells: ReactNode[];
    highlight?: number;
}

export function ComparisonRow({ label, cells, highlight }: ComparisonRowProps) {
    return (
        <div style={{
            display: "grid", gridTemplateColumns: `200px repeat(${cells.length}, 1fr)`,
            borderBottom: `1px solid ${C.border}`, alignItems: "center",
        }}>
            <div style={{
                padding: "14px 16px", fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12, color: C.muted, borderRight: `1px solid ${C.border}`,
            }}>
                {label}
            </div>
            {cells.map((cell, i) => (
                <div
                    key={i}
                    style={{
                        padding: "14px 16px", fontSize: 12, color: C.text,
                        background: highlight === i ? `${P}08` : "transparent",
                        borderRight: i < cells.length - 1 ? `1px solid ${C.border}` : "none",
                    }}
                >
                    {cell}
                </div>
            ))}
        </div>
    );
}

interface QuoteBlockProps {
    quote: string;
    author: string;
    role: string;
    color?: string;
}

export function QuoteBlock({ quote, author, role, color = P }: QuoteBlockProps) {
    return (
        <div style={{
            padding: "28px 32px", background: C.surface, border: `1px solid ${color}30`,
            borderLeft: `3px solid ${color}`, borderRadius: 12,
        }}>
            <p style={{
                fontFamily: "'DM Sans', sans-serif", fontStyle: "italic", fontSize: 16,
                color: C.text, lineHeight: 1.7, marginBottom: 16,
            }}>
                &ldquo;{quote}&rdquo;
            </p>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ width: 28, height: 1, background: color }} />
                <div>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, color: C.text }}>{author}</span>
                    <span style={{ fontSize: 11, color: C.muted, marginLeft: 8 }}>{role}</span>
                </div>
            </div>
        </div>
    );
}
