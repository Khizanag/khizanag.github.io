import { C, useInView } from "../../shared.tsx";

const CHAPTER_KEYFRAMES = `
@keyframes ch-rise {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0);    }
}
@keyframes ch-line-grow {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
@keyframes ch-number-glow {
  0%, 100% { opacity: 0.85; }
  50%      { opacity: 1;    }
}
`;

export interface ChapterInfo {
    n: number;
    id: string;
    title: string;
    subtitle: string;
    slides: string[];
    color: string;
}

interface ChapterSectionProps {
    chapter: ChapterInfo;
    total: number;
}

export function ChapterSection({ chapter, total }: ChapterSectionProps) {
    const [ref, inView] = useInView();
    const { n, id, title, subtitle, slides, color } = chapter;
    const pad = String(n).padStart(2, "0");
    const totalPad = String(total).padStart(2, "0");

    return (
        <section
            id={id}
            ref={ref}
            style={{
                padding: "120px 48px",
                borderTop: `1px solid ${C.border}`,
                borderBottom: `1px solid ${C.border}`,
                background: `linear-gradient(180deg, ${C.bg}, ${color}04, ${C.bg})`,
            }}
        >
            <style>{CHAPTER_KEYFRAMES}</style>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                {/* Chapter number + progress */}
                <div style={{
                    display: "flex", alignItems: "center", gap: 16,
                    marginBottom: 18,
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(12px)",
                    transition: "opacity 0.6s ease, transform 0.6s ease",
                }}>
                    <div style={{
                        fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 11,
                        letterSpacing: "0.2em", color, padding: "6px 12px",
                        background: `${color}10`, border: `1px solid ${color}40`, borderRadius: 50,
                    }}>
                        CHAPTER {pad} / {totalPad}
                    </div>

                    {/* Progress bar */}
                    <div style={{ flex: 1, height: 2, background: C.border, borderRadius: 2, position: "relative", overflow: "hidden" }}>
                        <div style={{
                            position: "absolute", inset: 0,
                            background: `linear-gradient(90deg, ${color}, ${color}60)`,
                            transformOrigin: "left center",
                            transform: `scaleX(${n / total})`,
                            transition: "transform 0.8s ease 0.3s",
                        }} />
                    </div>

                    <div style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                        color: C.muted, letterSpacing: "0.08em",
                    }}>
                        {slides.length} slide{slides.length === 1 ? "" : "s"}
                    </div>
                </div>

                {/* Big chapter number */}
                <div style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 800,
                    fontSize: "clamp(80px, 14vw, 200px)", lineHeight: 0.9,
                    color: `${color}18`, letterSpacing: "-0.06em",
                    marginBottom: -24,
                    userSelect: "none",
                    animation: inView ? `ch-number-glow 3s ease-in-out infinite` : "none",
                }}>
                    {pad}
                </div>

                {/* Title */}
                <h2 style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 800,
                    fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.05,
                    color: C.text, letterSpacing: "-0.02em",
                    margin: 0, marginBottom: 20,
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(14px)",
                    transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
                }}>
                    {title}
                </h2>

                {/* Coloured rule */}
                <div style={{
                    width: 80, height: 3, background: color,
                    marginBottom: 24, borderRadius: 2,
                    transformOrigin: "left center",
                    animation: inView ? "ch-line-grow 0.8s ease 0.35s both" : "none",
                }} />

                {/* Subtitle */}
                <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 18, lineHeight: 1.55,
                    color: C.muted, maxWidth: 760,
                    margin: 0, marginBottom: 36,
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(14px)",
                    transition: "opacity 0.6s ease 0.35s, transform 0.6s ease 0.35s",
                }}>
                    {subtitle}
                </p>

                {/* Slide list */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(auto-fit, minmax(${slides.length > 4 ? "220px" : "240px"}, 1fr))`,
                    gap: 12,
                }}>
                    {slides.map((slide, i) => (
                        <div
                            key={slide}
                            style={{
                                display: "flex", alignItems: "center", gap: 10,
                                padding: "12px 14px",
                                background: C.surface, border: `1px solid ${C.border}`,
                                borderLeft: `2px solid ${color}`,
                                borderRadius: 8,
                                opacity: inView ? 1 : 0,
                                transform: inView ? "translateX(0)" : "translateX(-8px)",
                                transition: `opacity 0.5s ease ${0.5 + i * 0.06}s, transform 0.5s ease ${0.5 + i * 0.06}s`,
                            }}
                        >
                            <span style={{
                                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                                color: `${color}aa`, fontWeight: 700, minWidth: 22,
                            }}>
                                {pad}.{String(i + 1).padStart(2, "0")}
                            </span>
                            <span style={{
                                fontFamily: "'DM Sans', sans-serif", fontSize: 13.5,
                                color: C.text, fontWeight: 500,
                            }}>
                                {slide}
                            </span>
                        </div>
                    ))}
                </div>

                {/* All chapters mini-map */}
                <ChapterMiniMap currentN={n} total={total} color={color} />
            </div>
        </section>
    );
}

function ChapterMiniMap({ currentN, total, color }: { currentN: number; total: number; color: string }) {
    return (
        <div style={{
            marginTop: 44, paddingTop: 20, borderTop: `1px dashed ${C.border}`,
            display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap",
        }}>
            <span style={{
                fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 700,
                letterSpacing: "0.14em", color: C.muted, marginRight: 8,
            }}>
                FULL DECK
            </span>
            {Array.from({ length: total }, (_, i) => {
                const n = i + 1;
                const isCurrent = n === currentN;
                const isPast = n < currentN;
                return (
                    <div
                        key={n}
                        style={{
                            width: isCurrent ? 28 : 22, height: 6,
                            borderRadius: 3,
                            background: isCurrent ? color : isPast ? `${color}50` : C.border,
                            transition: "background 0.3s ease, width 0.3s ease",
                        }}
                    />
                );
            })}
        </div>
    );
}
