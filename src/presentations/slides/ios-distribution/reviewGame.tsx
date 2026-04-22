import { useRef, useState } from "react";
import { C, Reveal, SectionLabel, SectionHeading, TabButton, useLocalTabNav } from "../../shared.tsx";
import { P, GuidelineChip } from "./ui.tsx";

interface Case {
    scenario: string;
    app: string;
    verdict: "pass" | "reject";
    guideline?: string;
    explanation: string;
}

const CASES: Case[] = [
    {
        scenario: "A kids' education app shows a banner ad for a dating app every 3 minutes.",
        app: "ABCMouse clone",
        verdict: "reject",
        guideline: "1.3",
        explanation: "Guideline 1.3 &mdash; Kids Category apps can only show contextually appropriate ads. Dating ads are explicitly banned. Real case: Duolingo ABC had a similar bug in 2021 and pulled their own build to fix.",
    },
    {
        scenario: "A banking app hides a prominent &lsquo;Delete Account&rsquo; flow behind 7 taps in Settings &rarr; Support &rarr; Other &rarr; ...",
        app: "Typical bank",
        verdict: "reject",
        guideline: "5.1.1(v)",
        explanation: "Since 2022, account deletion must be as easy as account creation, and available in-app (not just via support email). This is why we added the direct Close Account screen in our Settings.",
    },
    {
        scenario: "A fitness app uses HealthKit. It writes step count &amp; heart rate to HealthKit to show users' progress. Privacy Manifest declares 'no data collection'.",
        app: "Running tracker",
        verdict: "pass",
        explanation: "HealthKit data written to the user's own HealthKit store does NOT count as 'collected' &mdash; it never leaves the device to your server. This is one of the subtle Privacy Manifest carve-outs. If you DID upload heart rate to your backend, it would reject.",
    },
    {
        scenario: "A video app asks to track the user's activity across apps &amp; websites. User taps &lsquo;Ask App Not to Track&rsquo;. App still tracks using IP address fingerprinting.",
        app: "Social video app",
        verdict: "reject",
        guideline: "5.1.2",
        explanation: "Real case: X/Twitter and Facebook were both cited for this in 2022. ATT applies to ANY cross-app tracking mechanism, not just IDFA. Fingerprinting is explicitly banned.",
    },
    {
        scenario: "A crypto wallet app lets users buy NFTs using Apple Pay via a Stripe integration.",
        app: "Crypto wallet",
        verdict: "reject",
        guideline: "3.1.1",
        explanation: "NFTs purchased in-app must use IAP. Apple Pay is not IAP. Real case: OpenSea's iOS app had to remove all purchase capabilities in 2022, became browse-only.",
    },
    {
        scenario: "A dating app has a &lsquo;Report User&rsquo; button, end-user moderation queue with 24h SLA, and a Block function.",
        app: "Dating app",
        verdict: "pass",
        explanation: "Meets Guideline 1.2 (UGC moderation) requirements: report mechanism, timely action on reports, ability to block abusive users, published community guidelines. These 4 ingredients are the minimum bar.",
    },
    {
        scenario: "A password manager app uses Keychain Sharing with an Action Extension, but declares the extension's bundle ID is &lsquo;com.example.app.helper.v2.final.temp&rsquo;.",
        app: "1Password clone",
        verdict: "reject",
        guideline: "2.3.1",
        explanation: "Guideline 2.3.1 &mdash; accurate metadata includes bundle identifiers. Reviewer will push back on suspicious-looking internal identifiers. Also triggers paranoia about hidden functionality.",
    },
    {
        scenario: "A music streaming app shows a small link: &lsquo;Upgrade on our website &rarr;&rsquo; that opens Safari to a pricing page.",
        app: "Spotify-like",
        verdict: "pass",
        explanation: "As of 2024, after the Epic ruling, 'reader apps' can link to external purchase pages in the US, EU, Netherlands, South Korea, and Japan. Still must apply for the External Link Account Entitlement. Would have been a rejection pre-2024.",
    },
];

export function ReviewGameSection() {
    const [activeCase, setActiveCase] = useState(0);
    const [revealed, setRevealed] = useState<Record<number, boolean>>({});

    const activeRef = useRef(activeCase);
    activeRef.current = activeCase;
    useLocalTabNav("s-game", CASES.length, activeRef, setActiveCase);

    const current = CASES[activeCase];
    const isRevealed = revealed[activeCase];

    return (
        <section id="s-game" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.yellow}>INTERACTIVE &middot; AUDIENCE GAME</SectionLabel>
                    <SectionHeading sub="Eight real scenarios. Audience votes PASS or REJECT. We reveal the answer &amp; guideline. Use &larr; &rarr; to cycle.">
                        Will it pass review?
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                    {CASES.map((_, i) => (
                        <TabButton
                            key={i}
                            active={activeCase === i}
                            color={revealed[i] ? (CASES[i].verdict === "pass" ? C.accent : C.red) : C.yellow}
                            icon={revealed[i] ? (CASES[i].verdict === "pass" ? "✓" : "✕") : undefined}
                            label={`Case ${i + 1}`}
                            onClick={() => setActiveCase(i)}
                        />
                    ))}
                </div>

                <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "32px 40px", minHeight: 380 }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.muted, letterSpacing: "0.1em", marginBottom: 12 }}>
                        CASE {activeCase + 1} · APP: {current.app.toUpperCase()}
                    </div>
                    <p style={{
                        fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22,
                        color: C.text, lineHeight: 1.4, marginBottom: 32,
                    }}>
                        {current.scenario}
                    </p>

                    {!isRevealed && (
                        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
                            <button
                                onClick={() => setRevealed({ ...revealed, [activeCase]: true })}
                                style={{
                                    padding: "14px 28px", background: `${C.accent}15`,
                                    border: `1px solid ${C.accent}`, borderRadius: 10, color: C.accent,
                                    fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14,
                                    cursor: "pointer", letterSpacing: "0.05em",
                                }}
                            >
                                ✓ VOTE: WILL PASS
                            </button>
                            <button
                                onClick={() => setRevealed({ ...revealed, [activeCase]: true })}
                                style={{
                                    padding: "14px 28px", background: `${C.red}15`,
                                    border: `1px solid ${C.red}`, borderRadius: 10, color: C.red,
                                    fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14,
                                    cursor: "pointer", letterSpacing: "0.05em",
                                }}
                            >
                                ✕ VOTE: WILL REJECT
                            </button>
                        </div>
                    )}

                    {isRevealed && (
                        <div style={{
                            padding: "24px 28px",
                            background: current.verdict === "pass" ? `${C.accent}08` : `${C.red}08`,
                            border: `1px solid ${current.verdict === "pass" ? C.accent : C.red}30`,
                            borderRadius: 12,
                        }}>
                            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
                                <div style={{
                                    fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20,
                                    color: current.verdict === "pass" ? C.accent : C.red, letterSpacing: "0.08em",
                                }}>
                                    {current.verdict === "pass" ? "✓ PASSES" : "✕ REJECTS"}
                                </div>
                                {current.guideline && <GuidelineChip id={current.guideline} label="cited" color={C.red} />}
                            </div>
                            <p style={{ fontSize: 14, color: C.text, lineHeight: 1.7 }}>
                                {current.explanation}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
