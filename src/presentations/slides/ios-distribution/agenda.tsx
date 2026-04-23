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
        slides: "hero · quiz · agenda · history",
        timing: "6 min",
        color: C.blue,
    },
    {
        n: "01",
        title: "Plumbing",
        oneLiner: "What Apple validates at upload — identity, provisioning, entitlements, binary anatomy.",
        slides: "journey · ecosystem · signing ×3 · entitlements · push · binary",
        timing: "12 min",
        color: C.purple,
    },
    {
        n: "02",
        title: "Declarations",
        oneLiner: "Build-time files Apple reads at submission. Wrong value = rejection — every time.",
        slides: "privacy ×2 · ATS · universal links · app attest",
        timing: "7 min",
        color: C.blue,
    },
    {
        n: "03",
        title: "Distribution",
        oneLiner: "Every channel: App Store, TestFlight, Ad Hoc, Enterprise, Unlisted + post-DMA EU.",
        slides: "channels · enterprise · DMA · TestFlight · metadata",
        timing: "7 min",
        color: C.yellow,
    },
    {
        n: "04",
        title: "The Gauntlet",
        oneLiner: "App Review from both sides, plus StoreKit — the #1 rejection reason is commerce.",
        slides: "review ×3 · top-10 · game · when-wrong · ITMS · StoreKit · prices",
        timing: "13 min",
        color: C.red,
    },
    {
        n: "05",
        title: "War Stories",
        oneLiner: "HEY. Epic. Beeper. XcodeGhost. SpaceInt. Five case studies where the system bit back.",
        slides: "HEY · Epic · Beeper · more · SpaceInt",
        timing: "10 min",
        color: C.purple,
    },
    {
        n: "06",
        title: "Release Levers",
        oneLiner: "Post-approval controls — phased rollout, expedited review, feature flags.",
        slides: "phased · expedited · flags",
        timing: "5 min",
        color: C.accent,
    },
    {
        n: "07",
        title: "Shipping at Scale",
        oneLiner: "CI/CD, signing automation, modularization, build optimization, crash monitoring, ASC admin.",
        slides: "CI/CD · signing · modular · build · multi-env · push-ops · crashes · roles · regions",
        timing: "9 min",
        color: C.yellow,
    },
    {
        n: "08",
        title: "Close",
        oneLiner: "Callback to opening quiz. Cross-platform comparison. Future. Ship-day checklist. Q&A.",
        slides: "answers · compare · future · ship-day · takeaways · Q&A",
        timing: "6 min",
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
                        TOTAL · 53 SLIDES · 75 MIN CONTENT + Q&amp;A
                    </span>
                </div>
            </div>
        </section>
    );
}
