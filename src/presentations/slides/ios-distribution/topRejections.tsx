import { C, Reveal, SectionLabel, SectionHeading, CalloutBox } from "../../shared.tsx";
import { P, GuidelineChip } from "./ui.tsx";

const TOP_10 = [
    {
        id: "2.1",
        rank: 1,
        title: "Incomplete information",
        desc: "Reviewer hits a paywall, login, or empty state and can't proceed. Fix: always attach a demo account, walkthrough notes, or feature flag instructions in ASC.",
        pct: "34%",
    },
    {
        id: "2.3.3",
        rank: 2,
        title: "Marketing screenshots don't match the app",
        desc: "Screenshots show a feature that doesn't exist, or UI differs significantly. Fix: screenshots must come from the actual build, same locale as review device.",
        pct: "18%",
    },
    {
        id: "4.3",
        rank: 3,
        title: "Spam / duplicate content",
        desc: "Template apps, low-quality clones, repackaging free content. Fix: if you ship 5 “Radio for X” apps with the same codebase, consolidate to one.",
        pct: "11%",
    },
    {
        id: "5.1.1",
        rank: 4,
        title: "Missing privacy policy / data collection mismatch",
        desc: "Privacy policy URL 404, or Privacy Nutrition Label doesn't match what the app actually does. Fix: keep ASC disclosures in sync with code.",
        pct: "9%",
    },
    {
        id: "3.1.1",
        rank: 5,
        title: "Unlocking features outside IAP",
        desc: "Subscription sold on your website, unlocked in-app without IAP. Fix: use IAP; or qualify as a ‘reader’ app; or use the new external-link entitlement.",
        pct: "7%",
    },
    {
        id: "2.5.1",
        rank: 6,
        title: "Private / undocumented API usage",
        desc: "Using Objective-C runtime to call Apple's private methods. Detected by static analysis, often post-release. Fix: never import headers that aren't public.",
        pct: "5%",
    },
    {
        id: "4.0",
        rank: 7,
        title: "Design: confusing, buggy, inconsistent",
        desc: "Navigation gets stuck, buttons don't do what they say, text cut off. The catch-all “poor quality” clause. Fix: fix the bugs.",
        pct: "4%",
    },
    {
        id: "1.1.6",
        rank: 8,
        title: "Inaccurate or false claims",
        desc: "“World's best X” unprovable superlatives. Medical/financial claims without evidence. Fix: remove unsubstantiated superlatives.",
        pct: "3%",
    },
    {
        id: "5.2",
        rank: 9,
        title: "Intellectual property violation",
        desc: "Using logos, names, or content you don't own. Often triggered by third-party rights-holder complaint post-approval. Fix: only use IP you own or have licensed.",
        pct: "3%",
    },
    {
        id: "1.2",
        rank: 10,
        title: "User-Generated Content without moderation",
        desc: "Social features with no report/block/filter mechanism. Kids see adult content = instant pull from store. Fix: implement moderation day-one, not “later.”",
        pct: "2%",
    },
];

export function TopRejectionsSection() {
    return (
        <section id="s-rejections" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.red}>TOP 10 REJECTION REASONS</SectionLabel>
                    <SectionHeading sub="Distribution of first-submit rejections across the last 2 years of public App Store data. Memorize the top 3.">
                        Why apps actually get rejected
                    </SectionHeading>
                </Reveal>

                <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 8, marginBottom: 32 }}>
                    {TOP_10.map((r, i) => (
                        <div
                            key={r.id + r.rank}
                            style={{
                                display: "grid", gridTemplateColumns: "48px 1fr 80px",
                                gap: 20, alignItems: "center", padding: "18px 24px",
                                borderBottom: i < TOP_10.length - 1 ? `1px solid ${C.border}` : "none",
                            }}
                        >
                            <div style={{
                                width: 40, height: 40, borderRadius: 10,
                                background: `${C.red}12`, border: `1px solid ${C.red}30`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 14, color: C.red,
                            }}>
                                #{r.rank}
                            </div>
                            <div>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                                    <GuidelineChip id={r.id} label={r.title} color={C.red} />
                                </div>
                                <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
                                    {r.desc}
                                </div>
                            </div>
                            <div style={{
                                fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: C.red,
                                textAlign: "right",
                            }}>
                                {r.pct}
                            </div>
                        </div>
                    ))}
                </div>

                <CalloutBox color={P} icon="📊" label="THE DEMO-ACCOUNT RULE">
                    One-third of all rejections go away if you give reviewers a working demo account. In ASC › App Review Information › Sign-In Info. We check ours every release.
                </CalloutBox>
            </div>
        </section>
    );
}
