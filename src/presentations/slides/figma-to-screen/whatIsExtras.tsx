import { C, useInView } from "../../shared.tsx";
import { P } from "./ui.tsx";

const EXTRAS_KEYFRAMES = `
@keyframes rise-fade {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes pulse-soft {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50%      { opacity: 1;   transform: scale(1.04); }
}
@keyframes dash {
  to { stroke-dashoffset: -12; }
}
@keyframes glow-sweep {
  0%   { transform: translateX(-120%); }
  100% { transform: translateX(220%); }
}
@keyframes count-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes file-wobble {
  0%, 100% { transform: translate(var(--tx, 0), var(--ty, 0)) rotate(var(--r, 0deg)); }
  50%      { transform: translate(var(--tx, 0), calc(var(--ty, 0px) - 2px)) rotate(var(--r, 0deg)); }
}
@keyframes check-pop {
  0%   { opacity: 0; transform: scale(0); }
  60%  { opacity: 1; transform: scale(1.2); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes persona-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-4px); }
}
@keyframes caret {
  0%, 49%  { opacity: 1; }
  50%, 100%{ opacity: 0; }
}
`;

// ── 1) BEFORE → AFTER hero banner ───────────────────────────────────
export function HeroTransform() {
    const [ref, inView] = useInView();
    return (
        <div
            ref={ref}
            style={{
                position: "relative",
                background: C.surface, border: `1px solid ${C.border}`,
                borderRadius: 14, padding: "24px 28px",
                display: "grid", gridTemplateColumns: "1fr 72px 1fr",
                alignItems: "center", gap: 20,
                overflow: "hidden",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(14px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
        >
            <style>{EXTRAS_KEYFRAMES}</style>

            {/* glow sweep */}
            <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: `linear-gradient(100deg, transparent 40%, ${P}18 50%, transparent 60%)`,
                animation: inView ? "glow-sweep 4s ease-in-out 0.6s infinite" : "none",
            }} />

            {/* BEFORE — chaotic files */}
            <BeforeFileCloud active={inView} />

            {/* ARROW */}
            <ArrowWithCommand active={inView} />

            {/* AFTER — clean branch */}
            <AfterBranch active={inView} />
        </div>
    );
}

function BeforeFileCloud({ active }: { active: boolean }) {
    const files = [
        { t: "View",          x: -60, y: -14, r: -5,  d: 0.10 },
        { t: "ViewModel",     x:   0, y: -20, r:  3,  d: 0.18 },
        { t: "Router",        x:  60, y: -10, r:  6,  d: 0.26 },
        { t: "Factory",       x: -50, y:  10, r:  4,  d: 0.34 },
        { t: "Destination",   x:  20, y:  14, r: -6,  d: 0.42 },
        { t: "Injection",     x:  70, y:  18, r:  2,  d: 0.50 },
        { t: "Repository",    x: -20, y:  36, r: -3,  d: 0.58 },
        { t: "UseCase",       x:  50, y:  38, r:  5,  d: 0.66 },
    ];
    return (
        <div style={{
            position: "relative", height: 140,
            display: "flex", alignItems: "center", justifyContent: "center",
        }}>
            <div style={{
                position: "absolute", top: -6, left: 4,
                fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 800,
                letterSpacing: "0.18em", color: C.red,
            }}>
                BEFORE · 28 FILES
            </div>
            <div style={{ position: "relative", width: 220, height: 110 }}>
                {files.map((f) => (
                    <div
                        key={f.t}
                        style={{
                            position: "absolute", left: "50%", top: "50%",
                            "--tx": `${f.x}px`, "--ty": `${f.y}px`, "--r": `${f.r}deg`,
                            transform: `translate(${f.x}px, ${f.y}px) rotate(${f.r}deg)`,
                            padding: "3px 8px", borderRadius: 4,
                            background: C.bg, border: `1px solid ${C.red}40`,
                            fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5,
                            color: C.red, whiteSpace: "nowrap",
                            opacity: active ? 1 : 0,
                            animation: active
                                ? `rise-fade 0.4s ease ${f.d}s both, file-wobble 3s ease-in-out ${1.5 + f.d}s infinite`
                                : "none",
                        } as React.CSSProperties}
                    >
                        {f.t}.swift
                    </div>
                ))}
            </div>
        </div>
    );
}

function ArrowWithCommand({ active }: { active: boolean }) {
    return (
        <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        }}>
            <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                color: P, fontWeight: 700, whiteSpace: "nowrap",
                padding: "4px 8px", borderRadius: 50,
                background: `${P}15`, border: `1px solid ${P}50`,
                opacity: active ? 1 : 0,
                animation: active ? "rise-fade 0.5s ease 0.8s both" : "none",
            }}>
                /figma-to-screen
            </div>
            <svg width="48" height="28" viewBox="0 0 48 28" fill="none"
                style={{ opacity: active ? 1 : 0, transition: "opacity 0.4s ease 1s" }}>
                <path
                    d="M2 14 H42 M36 8 L42 14 L36 20"
                    stroke={P} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    strokeDasharray="4 4"
                    style={{ animation: active ? "dash 1s linear infinite" : "none" }}
                />
            </svg>
            <div style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 9,
                color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
                one command
            </div>
        </div>
    );
}

function AfterBranch({ active }: { active: boolean }) {
    const lines = [
        { icon: "✓", t: "feature/payment-confirmation", c: P,        d: 0.9 },
        { icon: "✓", t: "12 files scaffolded",          c: C.accent, d: 1.05 },
        { icon: "✓", t: "swiftlint --strict clean",     c: C.accent, d: 1.2 },
        { icon: "✓", t: "build green · gates passed",   c: C.accent, d: 1.35 },
        { icon: "→", t: "session log written",          c: C.blue,   d: 1.5 },
    ];
    return (
        <div style={{ position: "relative", height: 140 }}>
            <div style={{
                position: "absolute", top: -6, right: 4,
                fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 800,
                letterSpacing: "0.18em", color: P,
            }}>
                AFTER · 1 COMMIT
            </div>
            <div style={{
                position: "absolute", inset: "12px 0 0 0",
                padding: "10px 12px", borderRadius: 8,
                background: C.bg, border: `1px solid ${P}35`,
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5,
                display: "flex", flexDirection: "column", gap: 6,
            }}>
                {lines.map((l) => (
                    <div key={l.t} style={{
                        display: "flex", alignItems: "center", gap: 8,
                        opacity: active ? 1 : 0,
                        animation: active ? `rise-fade 0.4s ease ${l.d}s both` : "none",
                    }}>
                        <span style={{
                            color: l.c, fontSize: 11, fontWeight: 700,
                            animation: active ? `check-pop 0.4s ease ${l.d}s both` : "none",
                        }}>{l.icon}</span>
                        <span style={{ color: C.text }}>{l.t}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── 2) OUTCOME RIBBON ───────────────────────────────────────────────
export function OutcomeRibbon() {
    const [ref, inView] = useInView();
    const stats = [
        { label: "FILES WRITTEN",  value: "12",     sub: "per invocation",   color: C.accent },
        { label: "MEDIAN RUNTIME", value: "7m 18s", sub: "end-to-end",       color: C.blue },
        { label: "MAPPINGS",       value: "116",    sub: "Code Connect",     color: C.purple },
        { label: "AGENTS",         value: "17",     sub: "choreographed",    color: C.yellow },
        { label: "GATES",          value: "7",      sub: "before commit",    color: P },
    ];
    return (
        <div
            ref={ref}
            style={{
                display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10,
            }}
        >
            {stats.map((s, i) => (
                <div key={s.label} style={{
                    position: "relative", overflow: "hidden",
                    background: C.surface, border: `1px solid ${C.border}`,
                    borderLeft: `2px solid ${s.color}`,
                    borderRadius: 10, padding: "12px 14px",
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(10px)",
                    transition: `opacity 0.5s ease ${0.1 + i * 0.08}s, transform 0.5s ease ${0.1 + i * 0.08}s`,
                }}>
                    <div style={{
                        fontFamily: "'Syne', sans-serif", fontSize: 9, fontWeight: 700,
                        letterSpacing: "0.14em", color: C.muted, marginBottom: 4,
                    }}>{s.label}</div>
                    <div style={{
                        fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 24,
                        color: s.color, lineHeight: 1,
                        animation: inView ? `count-in 0.6s ease ${0.2 + i * 0.08}s both` : "none",
                    }}>{s.value}</div>
                    <div style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: 10.5,
                        color: C.muted, marginTop: 4,
                    }}>{s.sub}</div>
                    <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
                        background: `linear-gradient(90deg, ${s.color}, transparent)`,
                        opacity: 0.5,
                    }} />
                </div>
            ))}
        </div>
    );
}

// ── 3) ILLUSTRATED CARDS ────────────────────────────────────────────
interface IllusCardProps {
    icon: string;
    title: string;
    color: string;
    description: string;
    illustration: "problem" | "get" | "who";
    delay?: number;
}

export function IllusCard({ icon, title, color, description, illustration, delay = 0 }: IllusCardProps) {
    const [ref, inView] = useInView();
    return (
        <div
            ref={ref}
            style={{
                position: "relative",
                background: C.surface, border: `1px solid ${C.border}`,
                borderTop: `2px solid ${color}`,
                borderRadius: 12, padding: "20px 22px",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(14px)",
                transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
                overflow: "hidden",
                display: "flex", flexDirection: "column",
            }}
        >
            <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: `${color}15`, border: `1px solid ${color}40`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, marginBottom: 14,
            }}>{icon}</div>

            <div style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16,
                color: C.text, marginBottom: 8,
            }}>{title}</div>

            <div style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 12.5,
                color: C.muted, lineHeight: 1.55, marginBottom: 16,
            }}>{description}</div>

            {/* Illustration well */}
            <div style={{
                marginTop: "auto",
                padding: "12px", borderRadius: 8,
                background: C.bg, border: `1px solid ${C.border}`,
                minHeight: 100,
                display: "flex", alignItems: "center", justifyContent: "center",
            }}>
                {illustration === "problem" && <ProblemIllus active={inView} color={color} />}
                {illustration === "get"     && <GetIllus     active={inView} color={color} />}
                {illustration === "who"     && <WhoIllus     active={inView} color={color} />}
            </div>
        </div>
    );
}

function ProblemIllus({ active, color }: { active: boolean; color: string }) {
    // A stack of 28 little file bars shedding
    const bars = Array.from({ length: 28 }, (_, i) => i);
    return (
        <div style={{ width: "100%" }}>
            <div style={{
                display: "grid", gridTemplateColumns: "repeat(14, 1fr)", gap: 3,
                marginBottom: 10,
            }}>
                {bars.map((i) => (
                    <div key={i} style={{
                        height: 14, borderRadius: 2,
                        background: `${color}${i % 3 === 0 ? "80" : "40"}`,
                        opacity: active ? 1 : 0,
                        transform: active ? "scaleY(1)" : "scaleY(0)",
                        transformOrigin: "bottom",
                        transition: `opacity 0.3s ease ${0.2 + i * 0.015}s, transform 0.3s ease ${0.2 + i * 0.015}s`,
                    }} />
                ))}
            </div>
            <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                color, textAlign: "center", letterSpacing: "0.06em",
                animation: active ? "pulse-soft 2.4s ease-in-out 0.8s infinite" : "none",
            }}>
                28 files · hand-authored
            </div>
        </div>
    );
}

function GetIllus({ active, color }: { active: boolean; color: string }) {
    const items = [
        "pixel-perfect View",
        "wired ViewModel",
        "Router + Factory",
        "Destination + DI patched",
        "Localised strings",
        "Session log",
    ];
    return (
        <div style={{
            width: "100%", display: "flex", flexDirection: "column", gap: 5,
        }}>
            {items.map((t, i) => (
                <div key={t} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5,
                    color: C.text,
                    opacity: active ? 1 : 0,
                    transform: active ? "translateX(0)" : "translateX(-6px)",
                    transition: `opacity 0.3s ease ${0.15 + i * 0.1}s, transform 0.3s ease ${0.15 + i * 0.1}s`,
                }}>
                    <span style={{
                        width: 14, height: 14, borderRadius: "50%",
                        background: `${color}20`, border: `1px solid ${color}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 9, color, fontWeight: 700,
                        animation: active ? `check-pop 0.3s ease ${0.25 + i * 0.1}s both` : "none",
                    }}>✓</span>
                    {t}
                </div>
            ))}
        </div>
    );
}

function WhoIllus({ active, color }: { active: boolean; color: string }) {
    const personas = [
        { emoji: "👩‍💻", label: "iOS Dev",    sub: "ship faster" },
        { emoji: "🏗️", label: "Architect",  sub: "enforce arch"  },
        { emoji: "🎨", label: "Designer",   sub: "tokens survive" },
        { emoji: "👀", label: "Reviewer",   sub: "less noise"    },
    ];
    return (
        <div style={{
            width: "100%",
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8,
        }}>
            {personas.map((p, i) => (
                <div key={p.label} style={{
                    textAlign: "center",
                    opacity: active ? 1 : 0,
                    transition: `opacity 0.4s ease ${0.2 + i * 0.12}s`,
                }}>
                    <div style={{
                        fontSize: 22, marginBottom: 4,
                        animation: active ? `persona-float 3s ease-in-out ${0.3 + i * 0.15}s infinite` : "none",
                    }}>{p.emoji}</div>
                    <div style={{
                        fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 700,
                        color, letterSpacing: "0.06em",
                    }}>{p.label}</div>
                    <div style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: 9,
                        color: C.muted, marginTop: 2,
                    }}>{p.sub}</div>
                </div>
            ))}
        </div>
    );
}
