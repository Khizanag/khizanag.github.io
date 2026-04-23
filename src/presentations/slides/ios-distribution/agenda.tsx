import { C, Reveal, SectionLabel, SectionHeading, CalloutBox } from "../../shared.tsx";
import { P, PDim } from "./ui.tsx";

interface Chapter {
    n: string;
    title: string;
    oneLiner: string;
    slides: string;
    timing: string;
    color: string;
}

const CHAPTERS: Chapter[] = [
    {
        n: "00",
        title: "Opening",
        oneLiner: "Hook quiz + history — frame the 1.8M-app universe we're about to navigate.",
        slides: "hero · quiz · history",
        timing: "6 min",
        color: C.blue,
    },
    {
        n: "01",
        title: "Plumbing",
        oneLiner: "What Apple actually validates — code signing, 4 profile types, entitlements gating.",
        slides: "journey · ecosystem · signing ×3 · binary internals · push · multi-env",
        timing: "15 min",
        color: C.purple,
    },
    {
        n: "02",
        title: "Distribution",
        oneLiner: "Every channel: App Store, TestFlight, Ad Hoc, Enterprise, Unlisted, and post-DMA EU paths.",
        slides: "channels · enterprise · DMA · TestFlight · ASO",
        timing: "10 min",
        color: C.yellow,
    },
    {
        n: "03",
        title: "The Gauntlet",
        oneLiner: "Review process from both sides of the glass: what reviewers see, and how they reject.",
        slides: "review · inside-review · guidelines · top-10 · ITMS decoder",
        timing: "12 min",
        color: C.red,
    },
    {
        n: "04",
        title: "Commerce",
        oneLiner: "StoreKit commissions, DMA carve-outs, Reader rule — what Apple actually charges in 2026.",
        slides: "StoreKit · commissions matrix",
        timing: "5 min",
        color: C.accent,
    },
    {
        n: "05",
        title: "Release Management",
        oneLiner: "Phased rollout, expedited review, feature flags — how to un-break production without a resubmit.",
        slides: "phased · expedited · flags · privacy",
        timing: "6 min",
        color: C.blue,
    },
    {
        n: "06",
        title: "War Stories",
        oneLiner: "HEY. Epic. Beeper. XcodeGhost. SpaceInt's own near-misses. What we learned.",
        slides: "HEY · Epic · Beeper · more · SpaceInt",
        timing: "12 min",
        color: C.purple,
    },
    {
        n: "07",
        title: "Engineering Ops",
        oneLiner: "CI/CD, modularization, build optimization, crash monitoring — shipping at scale.",
        slides: "CI/CD · modular · build · crashes",
        timing: "6 min",
        color: C.yellow,
    },
    {
        n: "08",
        title: "Close",
        oneLiner: "Where Apple is heading, the cross-platform comparison, ship-day checklist, Q&A.",
        slides: "compare · future · takeaways · Q&A",
        timing: "8 min",
        color: C.accent,
    },
];

export function AgendaSection() {
    return (
        <section id="s-agenda" style={{ padding: "96px 48px", background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>AGENDA · 9 CHAPTERS · 75 MIN</SectionLabel>
                    <SectionHeading sub="Nine tight blocks, not one long scroll. Each chapter opens with a divider slide. Reference tables (marked with ⏱ REFERENCE) are skimmed live, linked for later.">
                        The map of the next 75 minutes
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 32 }}>
                    {CHAPTERS.map((ch, i) => (
                        <div
                            key={i}
                            style={{
                                padding: "22px 24px",
                                background: C.bg,
                                border: `1px solid ${ch.color}25`,
                                borderLeft: `3px solid ${ch.color}`,
                                borderRadius: 12,
                                display: "flex", flexDirection: "column", gap: 10,
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                <span style={{
                                    fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                                    color: ch.color, letterSpacing: "0.18em", fontWeight: 700,
                                }}>
                                    {ch.n}
                                </span>
                                <span style={{
                                    fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                                    color: C.muted, letterSpacing: "0.1em",
                                }}>
                                    ⏱ {ch.timing}
                                </span>
                            </div>
                            <div style={{
                                fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 19,
                                color: C.text, letterSpacing: "-0.01em",
                            }}>
                                {ch.title}
                            </div>
                            <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.55, margin: 0 }}>
                                {ch.oneLiner}
                            </p>
                            <div style={{
                                fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                                color: `${ch.color}cc`, letterSpacing: "0.08em", marginTop: "auto",
                            }}>
                                {ch.slides}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <CalloutBox color={P} icon="🎯" label="WHO THIS IS FOR">
                        <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.65 }}>
                            iOS & Android engineers, web devs, QA, POs, BAs, designers. No Xcode knowledge required. Every acronym spelled out on first use — and flagged in the hook quiz first.
                        </p>
                    </CalloutBox>
                    <CalloutBox color={C.yellow} icon="⌨" label="NAVIGATION">
                        <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.65 }}>
                            <b>← →</b> jumps between sections. Interactive slides (quiz, ITMS decoder, review-game) cycle <b>within</b> the slide. Top nav has per-chapter jump-links.
                        </p>
                    </CalloutBox>
                </div>

                <div style={{
                    marginTop: 20, padding: "14px 18px", background: PDim,
                    border: `1px solid ${P}25`, borderRadius: 8,
                    display: "flex", alignItems: "center", gap: 12, justifyContent: "center",
                }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: P, letterSpacing: "0.15em", fontWeight: 700 }}>
                        TOTAL · 40 SLIDES · 67 MIN CONTENT · 8 MIN Q&amp;A
                    </span>
                </div>
            </div>
        </section>
    );
}
