import { C, Reveal, SectionLabel, SectionHeading, CalloutBox } from "../../shared.tsx";
import { P } from "./ui.tsx";
import { TimingBadge } from "./ui.tsx";

interface QA {
    n: number;
    q: string;
    a: string;
    punch: string;
    color: string;
}

const ANSWERS: QA[] = [
    {
        n: 1,
        q: "Apps submitted per day?",
        a: "~40,000",
        punch: "One every 2.16 seconds, 24/7",
        color: P,
    },
    {
        n: 2,
        q: "#1 rejection reason?",
        a: "Guideline 2.1 — broken demo / incomplete flow",
        punch: "~34% of all rejections. Mostly: expired demo creds.",
        color: C.red,
    },
    {
        n: 3,
        q: "Numbered sections in App Review Guidelines?",
        a: "~180 rules, ~45,000 words",
        punch: "Up 6× from 2010. Every WWDC adds 5–20 more.",
        color: C.yellow,
    },
    {
        n: 4,
        q: "Longest known review wait?",
        a: "12 weeks — Cash App, 2019",
        punch: "Median today: <24h for ~50% of apps. You're rarely unlucky.",
        color: C.purple,
    },
    {
        n: 5,
        q: "Cost of a single rejection for a top-500 app?",
        a: "~$100K in delayed revenue",
        punch: "Reputation cost — missed marketing, feature slots — is bigger.",
        color: C.accent,
    },
];

export function HookQuizAnswersSection() {
    return (
        <section id="s-hook-answers" style={{ padding: "96px 48px", background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.accent}>
                        CALLBACK · THE 5 NUMBERS <TimingBadge minutes="1:30" color={C.accent} />
                    </SectionLabel>
                    <SectionHeading sub="Five questions from 75 minutes ago. If you scored 3/5 — good. 5/5 — you've been reading Apple developer forums at 1 AM. 0/5 — welcome, the next slide has you.">
                        The quiz, revisited
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
                    {ANSWERS.map((a) => (
                        <div
                            key={a.n}
                            style={{
                                padding: "20px 24px",
                                background: C.bg,
                                border: `1px solid ${a.color}25`,
                                borderLeft: `3px solid ${a.color}`,
                                borderRadius: 10,
                            }}
                        >
                            <div style={{
                                display: "flex", gap: 10, alignItems: "baseline", marginBottom: 8,
                            }}>
                                <span style={{
                                    fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                                    color: a.color, letterSpacing: "0.15em", fontWeight: 700,
                                }}>
                                    Q{a.n}
                                </span>
                                <span style={{ fontSize: 12, color: C.muted, lineHeight: 1.4 }}>
                                    {a.q}
                                </span>
                            </div>
                            <div style={{
                                fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22,
                                color: C.text, lineHeight: 1.2, marginBottom: 6,
                            }}>
                                {a.a}
                            </div>
                            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.55 }}>
                                {a.punch}
                            </div>
                        </div>
                    ))}
                </div>

                <CalloutBox color={P} icon="🎯" label="THE COMMON THREAD">
                    <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.65 }}>
                        All five numbers exist because the App Store is <b>operated, not just hosted</b>. 500+ human reviewers, 180+ rules, cases measured in weeks and hundreds of thousands of dollars. Ship like the system you're shipping into actually exists.
                    </p>
                </CalloutBox>
            </div>
        </section>
    );
}
