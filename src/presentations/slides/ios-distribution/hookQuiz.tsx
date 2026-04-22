import { useRef, useState } from "react";
import { C, Reveal, SectionLabel, SectionHeading, TabButton, useLocalTabNav } from "../../shared.tsx";
import { P } from "./ui.tsx";

interface Question {
    prompt: string;
    options: { label: string; correct?: boolean }[];
    answer: string;
    reveal: string;
    source: string;
}

const QUESTIONS: Question[] = [
    {
        prompt: "How many apps are submitted to the App Store — every single day?",
        options: [
            { label: "~1,000" },
            { label: "~10,000" },
            { label: "~40,000", correct: true },
            { label: "~100,000" },
        ],
        answer: "~40,000 submissions/day",
        reveal: "That’s one app every <b>2.16 seconds</b>, 24/7. Of those, ~36% are rejected on first pass. Apple’s review team handles roughly 100K reviews per week across ~500 human reviewers plus automated scanners.",
        source: "Apple ‘App Store by the Numbers’ quarterly update",
    },
    {
        prompt: "What is the #1 reason for App Store rejection?",
        options: [
            { label: "IAP violations" },
            { label: "Privacy issues" },
            { label: "Broken / incomplete app (2.1)", correct: true },
            { label: "Copycat design" },
        ],
        answer: "Guideline 2.1 — ~34% of rejections",
        reveal: "A single broken demo account, a crash on first launch, or a missing core feature — all fall under 2.1. For banking apps, the most common specific failure is <b>expired demo credentials</b>. This one line has killed more releases than any bug.",
        source: "Apple Top Rejection Reasons dashboard, Q4 2025",
    },
    {
        prompt: "The App Review Guidelines document — how many numbered sections?",
        options: [
            { label: "~40" },
            { label: "~80" },
            { label: "~180", correct: true },
            { label: "~400" },
        ],
        answer: "~180 numbered rules, ~45K words",
        reveal: "Up from <b>~30 rules in 2010</b>. A 6x growth in 15 years. Every WWDC adds 5–20 new clauses. The doc has its own changelog. Apple provides a legal-style PDF export; some lawyers specialize in reading it.",
        source: "developer.apple.com/app-store/review/guidelines (word count April 2026)",
    },
    {
        prompt: "Longest publicly-known App Review wait on a single build?",
        options: [
            { label: "2 weeks" },
            { label: "6 weeks" },
            { label: "12 weeks (Cash App, 2019)", correct: true },
            { label: "1 year" },
        ],
        answer: "Cash App — 12 weeks in 2019",
        reveal: "Jack Dorsey tweeted about it. The cause was unclear entitlements around financial compliance. Stories of 4–8 week reviews for crypto apps in 2021–2022 are common. <b>Median review time today: <24h for ~50% of apps, <48h for ~90%.</b>",
        source: "Public CEO statements, dev community forums",
    },
    {
        prompt: "How much does a single rejection cost a top-500 app, on average?",
        options: [
            { label: "$0 — just resubmit" },
            { label: "~$10,000 in engineering time" },
            { label: "~$100,000 in delayed revenue", correct: true },
            { label: ">$1M in lost market share" },
        ],
        answer: "~$100K in delayed revenue for top-500 apps",
        reveal: "Estimates from Sensor Tower & data.ai put average daily revenue for top-500 apps at ~$50–150K. A typical rejection adds 2–5 days. The <b>real</b> cost is reputation: missed marketing launches, press cycles, App Store feature slots.",
        source: "Sensor Tower State of Mobile 2025",
    },
];

export function HookQuizSection() {
    const [activeQ, setActiveQ] = useState(0);
    const [picked, setPicked] = useState<Record<number, number>>({});

    const activeRef = useRef(activeQ);
    activeRef.current = activeQ;
    useLocalTabNav("s-hook", QUESTIONS.length, activeRef, setActiveQ);

    const q = QUESTIONS[activeQ];
    const userPick = picked[activeQ];
    const revealed = userPick !== undefined;

    return (
        <section id="s-hook" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.yellow}>BEFORE WE START · INTERACTIVE</SectionLabel>
                    <SectionHeading sub="Five questions. No points, no shame. Vote with your gut — then we’ll see how far off you were. These numbers will frame everything in the next 70 minutes.">
                        Guess the App Store
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                    {QUESTIONS.map((_, i) => (
                        <TabButton
                            key={i}
                            active={activeQ === i}
                            color={picked[i] !== undefined ? C.accent : C.yellow}
                            icon={picked[i] !== undefined ? "✓" : undefined}
                            label={`Q${i + 1}`}
                            onClick={() => setActiveQ(i)}
                        />
                    ))}
                </div>

                <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 16, padding: "32px 40px", minHeight: 420 }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.muted, letterSpacing: "0.1em", marginBottom: 16 }}>
                        QUESTION {activeQ + 1} OF {QUESTIONS.length}
                    </div>
                    <p
                        dangerouslySetInnerHTML={{ __html: q.prompt }}
                        style={{
                            fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 24,
                            color: C.text, lineHeight: 1.4, marginBottom: 28,
                        }}
                    />

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 24 }}>
                        {q.options.map((opt, i) => {
                            const isPicked = userPick === i;
                            const showCorrect = revealed && opt.correct;
                            const showWrong = revealed && isPicked && !opt.correct;
                            const bg = showCorrect ? `${C.accent}15` : showWrong ? `${C.red}15` : C.surface;
                            const bd = showCorrect ? C.accent : showWrong ? C.red : C.border;
                            const fg = showCorrect ? C.accent : showWrong ? C.red : C.text;
                            return (
                                <button
                                    key={i}
                                    disabled={revealed}
                                    onClick={() => setPicked({ ...picked, [activeQ]: i })}
                                    style={{
                                        textAlign: "left", padding: "16px 20px", background: bg,
                                        border: `1px solid ${bd}`, borderRadius: 10, color: fg,
                                        fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 14,
                                        cursor: revealed ? "default" : "pointer",
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.muted, marginRight: 10 }}>
                                        {String.fromCharCode(65 + i)}.
                                    </span>
                                    <span dangerouslySetInnerHTML={{ __html: opt.label }} />
                                    {showCorrect && <span style={{ marginLeft: 8 }}>✓</span>}
                                    {showWrong && <span style={{ marginLeft: 8 }}>✕</span>}
                                </button>
                            );
                        })}
                    </div>

                    {revealed && (
                        <div style={{
                            padding: "20px 24px", background: `${C.accent}08`,
                            border: `1px solid ${C.accent}30`, borderRadius: 10,
                        }}>
                            <div style={{
                                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16,
                                color: C.accent, marginBottom: 10,
                            }}>
                                ANSWER · {q.answer}
                            </div>
                            <p
                                dangerouslySetInnerHTML={{ __html: q.reveal }}
                                style={{ fontSize: 13, color: C.text, lineHeight: 1.7, marginBottom: 10 }}
                            />
                            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.muted, letterSpacing: "0.05em" }}>
                                SOURCE: {q.source}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
