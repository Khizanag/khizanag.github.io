import { useRef, useState } from "react";
import {
    C, Reveal, SectionLabel, SectionHeading, CalloutBox, FeatureCard,
    PlainEnglishBox, TabButton, useLocalTabNav, CheckItem,
} from "../../shared.tsx";
import { P } from "./ui.tsx";

interface Scenario {
    title: string;
    verdict: "likely" | "maybe" | "denied";
    context: string;
    outcome: string;
}

const SCENARIOS: Scenario[] = [
    {
        title: "Critical crash on launch after iOS 18 release",
        verdict: "likely",
        context: "Your app crashes 100% on iOS 18.0 because of a deprecated API. 200K DAU affected, support tickets piling up.",
        outcome: "Classic grant case. Mention the crash rate, affected user count, and that a fix is in review. Apple's team routinely approves within 2–4h. Phil Schiller famously mentioned this exact scenario on TWiT in 2020.",
    },
    {
        title: "Typo in the price / currency symbol",
        verdict: "denied",
        context: "You shipped $9.99 but meant ₸9.99. Losing money per install.",
        outcome: "Denied. Apple's stance: pricing errors are your problem. Fix it, submit normally, live with 24–48h of standard review. You CAN suspend the app in ASC to stop the bleeding while waiting.",
    },
    {
        title: "Partnership launch tomorrow morning",
        verdict: "maybe",
        context: "You have a co-marketing deal with a bank / airline / Apple Card partner launching at 9am. Build needs the activation code flow live.",
        outcome: "Apple will grant this for partnerships with KNOWN brands (Apple Pay, Apple Card, major carriers). For unknown co-marketing: they will ask to see the press release. Give yourself 72h buffer — don't bet a keynote on expedited.",
    },
    {
        title: "Security / privacy vulnerability",
        verdict: "likely",
        context: "Your app leaks auth tokens in analytics logs. CVE filed by a white-hat researcher.",
        outcome: "Always granted. Say the words 'security vulnerability' and 'user data at risk' in the request. Apple has an internal security-escalation channel that bypasses normal queue. Response time can be <2h.",
    },
    {
        title: "Broken in-app purchase flow",
        verdict: "likely",
        context: "After a StoreKit 2 migration, 100% of purchase attempts fail. Revenue at $0.",
        outcome: "Granted — Apple doesn't love broken IAP because they lose 30%/15% too. Include the error code and a StoreKit log. 2–6h review typical.",
    },
    {
        title: "Regulatory deadline (GDPR / DMA / local law)",
        verdict: "likely",
        context: "Your country's regulator mandated a change by a specific date and you submitted late.",
        outcome: "Granted with evidence — attach the regulator's notice or a link to the law. Apple cannot risk being blamed for a developer missing a government deadline.",
    },
    {
        title: "Influencer marketing campaign starts Monday",
        verdict: "denied",
        context: "You're paying a mid-tier influencer $50K to post about the app Monday 9am.",
        outcome: "Denied. 'Marketing campaigns' are explicitly on Apple's non-reasons list since 2019. The policy wording: 'Marketing plans do not qualify'.",
    },
    {
        title: "App Store feature slot awarded",
        verdict: "likely",
        context: "Editorial team emailed you saying your app will be featured this Thursday; they asked for a polished build by Tuesday.",
        outcome: "Absolutely granted. Forward the editorial email in the request — Apple's review team can see it's from their own editorial group. This is the single cleanest 'yes'.",
    },
];

export function ExpeditedReviewSection() {
    const [activeScenario, setActiveScenario] = useState(0);
    const activeRef = useRef(activeScenario);
    activeRef.current = activeScenario;
    useLocalTabNav("s-expedited", SCENARIOS.length, activeRef, setActiveScenario);

    const scenario = SCENARIOS[activeScenario];
    const verdictColor = scenario.verdict === "likely" ? C.accent
        : scenario.verdict === "maybe" ? C.yellow
        : C.red;
    const verdictLabel = scenario.verdict === "likely" ? "LIKELY GRANTED"
        : scenario.verdict === "maybe" ? "MAYBE"
        : "DENIED";

    return (
        <section id="s-expedited" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>EXPEDITED REVIEW</SectionLabel>
                    <SectionHeading sub="The ‘break glass in case of emergency’ button in App Store Connect. Free, rate-limited, and the one favor Apple actively keeps score of.">
                        The one emergency lever you have
                    </SectionHeading>
                </Reveal>

                {/* ── TL;DR STATS ──────────────────────────────────── */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 48 }}>
                    <FeatureCard icon="📅" title="~1–2 / year" color={P} delay={0}
                        description="Approximate quota per developer team per calendar year. Not officially published — derived from community reports + WWDC Q&A sessions." />
                    <FeatureCard icon="⏱" title="~2–4h response" color={C.accent} delay={0.08}
                        description="Median time from submitting the request to a human reply (approval or denial). Security issues: often <2h. Business cases: up to 12h." />
                    <FeatureCard icon="🎯" title="~24h review" color={C.yellow} delay={0.16}
                        description="Once approved, your build still goes through full App Review — just at the top of the queue. Typical: 6–24h from approval to ready-for-release." />
                    <FeatureCard icon="💰" title="$0" color={C.purple} delay={0.24}
                        description="Always free. Apple has never monetized expedited review. Abuse (requesting without cause) is the only cost — future requests get denied." />
                </div>

                {/* ── HOW TO REQUEST ───────────────────────────────── */}
                <div style={{ marginBottom: 48 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 16 }}>
                        How to actually request it
                    </div>
                    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "28px 32px" }}>
                        <ol style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: C.text, lineHeight: 2 }}>
                            <li>Go to <b>developer.apple.com › Contact Us › App Review › Request an Expedited App Review</b>.</li>
                            <li>Select the app + the specific build already in the review queue (you can't request for a build not yet submitted).</li>
                            <li>Write <b>ONE short paragraph</b>. Include: the specific problem, user impact (numbers), why it can't wait, and your proof (CVE, editorial email, regulator notice).</li>
                            <li>Submit. The form disappears from the UI — expect a human reply via Resolution Center in ASC, not email.</li>
                            <li>If approved, your build is moved to the front of the queue. If denied, you cannot re-request for the same build — fix &amp; resubmit through normal review.</li>
                        </ol>
                    </div>
                    <PlainEnglishBox color={P}>
                        <b>The single most important rule:</b> be specific and honest. Apple reviewers have seen every vague excuse. &ldquo;Users are complaining&rdquo; gets denied; &ldquo;iOS 18.0 introduced a deprecated AVPlayer API, 100% of video playback crashes, affects 200K DAU, fix is build 2.4.1 already in review&rdquo; gets approved.
                    </PlainEnglishBox>
                </div>

                {/* ── SCENARIO DECODER ─────────────────────────────── */}
                <div style={{ marginBottom: 48 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 8 }}>
                        Will Apple grant it? — <span style={{ color: C.red }}>interactive</span>
                    </div>
                    <p style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>
                        Eight real scenarios from SpaceInt + community. Click a case. Use ← → to cycle.
                    </p>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                        {SCENARIOS.map((s, i) => (
                            <TabButton
                                key={i}
                                active={activeScenario === i}
                                color={s.verdict === "likely" ? C.accent : s.verdict === "maybe" ? C.yellow : C.red}
                                label={`Case ${i + 1}`}
                                onClick={() => setActiveScenario(i)}
                            />
                        ))}
                    </div>

                    <div style={{
                        background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12,
                        padding: "28px 32px",
                    }}>
                        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
                            <span style={{
                                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                                color: verdictColor, background: `${verdictColor}15`,
                                border: `1px solid ${verdictColor}40`,
                                padding: "3px 10px", borderRadius: 20, letterSpacing: "0.1em",
                            }}>
                                {verdictLabel}
                            </span>
                        </div>

                        <h4 style={{
                            fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18,
                            color: C.text, marginBottom: 12,
                        }}>
                            {scenario.title}
                        </h4>

                        <div style={{
                            fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 16,
                            paddingLeft: 12, borderLeft: `2px solid ${C.border}`,
                        }}>
                            {scenario.context}
                        </div>

                        <div style={{
                            background: `${verdictColor}08`, border: `1px solid ${verdictColor}30`,
                            borderRadius: 8, padding: "14px 18px",
                        }}>
                            <div style={{
                                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                                color: verdictColor, letterSpacing: "0.1em", marginBottom: 6,
                            }}>
                                OUTCOME
                            </div>
                            <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>
                                {scenario.outcome}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── DO / DON'T ───────────────────────────────────── */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
                    <div style={{
                        background: C.bg, border: `1px solid ${C.accent}30`, borderRadius: 12,
                        padding: "24px 28px",
                    }}>
                        <div style={{
                            fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                            color: C.accent, letterSpacing: "0.1em", marginBottom: 14,
                        }}>
                            ✓ VALID REASONS
                        </div>
                        <CheckItem>Critical bug affecting a large % of users (launch crash, auth break, IAP fail)</CheckItem>
                        <CheckItem>Security / privacy vulnerability with data at risk</CheckItem>
                        <CheckItem>Time-sensitive event tied to a KNOWN brand (Apple Pay / Apple Card / carrier)</CheckItem>
                        <CheckItem>App Store editorial feature awarded</CheckItem>
                        <CheckItem>Regulatory / legal deadline imposed externally</CheckItem>
                        <CheckItem>Compatibility break with brand-new iOS release</CheckItem>
                    </div>

                    <div style={{
                        background: C.bg, border: `1px solid ${C.red}30`, borderRadius: 12,
                        padding: "24px 28px",
                    }}>
                        <div style={{
                            fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                            color: C.red, letterSpacing: "0.1em", marginBottom: 14,
                        }}>
                            ✕ AUTO-DENIED REASONS
                        </div>
                        <CheckItem active={false}>Marketing plans / PR launch date</CheckItem>
                        <CheckItem active={false}>Influencer campaign schedule</CheckItem>
                        <CheckItem active={false}>Investor demo / board meeting</CheckItem>
                        <CheckItem active={false}>Internal KPIs / quarterly targets</CheckItem>
                        <CheckItem active={false}>Typo / copy mistakes you want to fix faster</CheckItem>
                        <CheckItem active={false}>&ldquo;Our CEO wants it out&rdquo;</CheckItem>
                    </div>
                </div>

                <CalloutBox color={C.yellow} icon="⚠" label="THE REPUTATION LEDGER">
                    Apple keeps an internal score per team. Burning your quota on a typo means the next <i>real</i> emergency gets denied. The community rule of thumb: <b>save expedited review for something that will end up on Hacker News if you don&rsquo;t fix it fast</b>. If in doubt, submit normally and suspend the app in ASC to stop the damage while waiting.
                </CalloutBox>

                <CalloutBox color={C.accent} icon="🏦" label="SPACEINT PLAYBOOK">
                    We have triggered expedited review <b>3 times in 5 years</b>: once for a login-break on iOS 17.0 day-one, once for a Push Notification outage tied to a critical banking transaction alert, once for a StoreKit break post-iOS 18 beta. All approved within 4h. Stored template (problem / users affected / fix build / proof) lives in our on-call runbook — copy-paste, don&rsquo;t write from scratch at 2am.
                </CalloutBox>
            </div>
        </section>
    );
}
