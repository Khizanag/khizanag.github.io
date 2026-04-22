import { useRef, useState } from "react";
import { C, Reveal, SectionLabel, SectionHeading, TabButton, useLocalTabNav } from "../../shared.tsx";
import { P } from "./ui.tsx";

interface Era {
    id: string;
    period: string;
    title: string;
    tagline: string;
    color: string;
    events: { date: string; title: string; detail: string; severity?: "big" | "huge" | "minor" }[];
}

const ERAS: Era[] = [
    {
        id: "era-1",
        period: "2008 – 2012",
        title: "The Gold Rush",
        tagline: "Anything goes, almost nothing is written down.",
        color: C.blue,
        events: [
            { date: "Jul 10, 2008", title: "App Store launches", detail: "500 apps. No formal review guidelines — just 'Steve's gut'. Famous early rejections included an iFart competitor: 'unacceptable'.", severity: "huge" },
            { date: "Mar 2009", title: "In-App Purchases introduced", detail: "Until now all apps were one-off sales. IAP would become the defining monetization engine of the next decade — and the source of most antitrust cases.", severity: "huge" },
            { date: "Feb 15, 2010", title: "First published Review Guidelines", detail: "Version 1.0 — ~30 numbered rules in ~3,000 words. Today: 180+ rules in ~45K words. This was a response to developer complaints of arbitrary rejections.", severity: "big" },
            { date: "Feb 2011", title: "Auto-renewing subscriptions", detail: "The birth of app-as-service. 30% cut forever. Spotify, Hulu, Pandora become early subscription apps." },
            { date: "Sep 2012", title: "iOS 6 – Maps launches, sherlocks all map apps", detail: "'Sherlocking' enters the dev lexicon: when Apple ships a built-in version of your app category." },
        ],
    },
    {
        id: "era-2",
        period: "2013 – 2017",
        title: "Professionalization",
        tagline: "Review gets formal. TestFlight gets free. XcodeGhost happens.",
        color: C.purple,
        events: [
            { date: "Apr 2014", title: "Apple acquires TestFlight (Burstly)", detail: "TestFlight was a 3rd-party beta platform. Apple bought it, shut down the Android version, and folded it into iOS 8.", severity: "big" },
            { date: "Mar 2015", title: "TestFlight for iOS 8 launches", detail: "Free. 90-day build expiry. 10,000 external testers. Changed beta testing economics overnight — HockeyApp declined, eventually acquired by Microsoft." },
            { date: "Sep 17, 2015", title: "XcodeGhost detected", detail: "Malicious Xcode variant infects ~4,000 apps in China. First major supply-chain attack on iOS. Proved code signing model works (detected within days, revoked).", severity: "huge" },
            { date: "Jun 2016", title: "Subscription split: 85/15 after Year 1", detail: "Apple drops cut from 30% → 15% for subscriptions after 12 months of retention. First major concession in the 30% story." },
            { date: "Nov 2017", title: "Uber caught fingerprinting", detail: "Uber's iOS app used private API to identify users even after uninstall. Tim Cook called CEO Travis Kalanick to Cupertino personally. App stays on Store after fix — exception to the 'permanent ban' rule.", severity: "huge" },
        ],
    },
    {
        id: "era-3",
        period: "2018 – 2021",
        title: "Privacy Pivot",
        tagline: "Apple positions against ad-tech. Sign-in-with-Apple, ATT, lawsuits.",
        color: C.accent,
        events: [
            { date: "Jun 2019", title: "Sign in with Apple required", detail: "Any app using 3rd-party social login (Facebook, Google) MUST also offer Sign-in-with-Apple. First privacy-by-policy enforcement." },
            { date: "Aug 13, 2020", title: "Epic v. Apple begins", detail: "Fortnite pushes direct payments. Apple removes it within hours. Epic was prepared — lawsuit filed the same day. #FreeFortnite begins.", severity: "huge" },
            { date: "Nov 18, 2020", title: "Small Business Program", detail: "15% cut (down from 30%) for devs with <$1M/yr revenue. Announced 5 months after HEY war. Affects ~98% of devs but <5% of revenue." },
            { date: "Apr 26, 2021", title: "ATT ships in iOS 14.5", detail: "The 'Ask App Not to Track' prompt. Opt-in rate: ~25%. Meta loses ~$10B in annual revenue. Most significant single policy change of the decade.", severity: "huge" },
            { date: "Sep 10, 2021", title: "Epic ruling — partial win", detail: "Judge Gonzalez Rogers rules: Apple is NOT a monopolist, but the anti-steering provisions violate California law. The one anti-steering change took 3 years to implement." },
        ],
    },
    {
        id: "era-4",
        period: "2022 – 2024",
        title: "Regulation Arrives",
        tagline: "Korea, EU, DOJ. The walled garden gets doors.",
        color: C.yellow,
        events: [
            { date: "Jun 30, 2022", title: "Account deletion in-app required", detail: "Guideline 5.1.1(v). No more 'email support to close your account'. Banking apps including ours had to build full closure flows." },
            { date: "May 1, 2023", title: "Privacy Manifest introduced", detail: "PrivacyInfo.xcprivacy becomes part of every app + every SDK. Required Reason APIs list expands to 20+ entries." },
            { date: "Dec 5, 2023", title: "Beeper Mini drama", detail: "Eric Migicovsky reverse-engineers iMessage. Apple blocks in 3 days. US Congress notices. DOJ case later cites this specifically." },
            { date: "Mar 7, 2024", title: "EU DMA takes effect", detail: "Alternative app stores (AltStore, Setapp). Third-party browser engines. Core Technology Fee: €0.50/install over 1M. Biggest structural change to iOS ever.", severity: "huge" },
            { date: "Mar 21, 2024", title: "US DOJ sues Apple", detail: "Largest US antitrust case since Microsoft 2001. Charges: super apps, streaming games, smartwatch lock-in, messaging, wallet tap-to-pay. Trial likely 2026–2027.", severity: "huge" },
            { date: "May 1, 2024", title: "Privacy Manifest becomes mandatory", detail: "Upload without it: hard reject. Apps must declare every data collection + tracking domain + Required Reason API use.", severity: "big" },
        ],
    },
    {
        id: "era-5",
        period: "2025 – 2026",
        title: "AI & Interoperability Era",
        tagline: "Everything Apple once refused starts becoming policy.",
        color: C.red,
        events: [
            { date: "Jun 2024", title: "App Intents + Apple Intelligence", detail: "Apps must expose App Intents to appear in Siri / Shortcuts / AI features. Apps without them get deprioritized in system-level search." },
            { date: "Feb 2025", title: "Epic Games Store on iOS (EU)", detail: "Fortnite returns to iOS in EU via Epic's own alternative store. First major non-Apple app store to ship on iPhone since 2008." },
            { date: "May 2025", title: "App Store Connect API v3", detail: "Full CI-friendly submissions. TestFlight group management. Allows fully automated fastlane flows." },
            { date: "Apr 2026", title: "AI guideline 4.7 enforced", detail: "Generative AI apps require content moderation, CSAM scanning, labeling of AI-generated media. Wordle-effect applied to GPT wrappers." },
        ],
    },
];

export function HistorySection() {
    const [activeEra, setActiveEra] = useState(0);
    const activeRef = useRef(activeEra);
    activeRef.current = activeEra;
    useLocalTabNav("s-history", ERAS.length, activeRef, setActiveEra);

    const era = ERAS[activeEra];

    return (
        <section id="s-history" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>18 YEARS OF APP STORE</SectionLabel>
                    <SectionHeading sub="Every rule exists because someone broke something. This is the timeline of who broke what. Click an era to dive in. Use ← → to jump between eras.">
                        How we got here
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
                    {ERAS.map((e, i) => (
                        <TabButton
                            key={e.id}
                            active={activeEra === i}
                            color={e.color}
                            label={e.period}
                            onClick={() => setActiveEra(i)}
                        />
                    ))}
                </div>

                <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "40px 48px" }}>
                    <div style={{ marginBottom: 28, paddingBottom: 20, borderBottom: `1px solid ${C.border}` }}>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: era.color, letterSpacing: "0.1em", marginBottom: 8 }}>
                            {era.period}
                        </div>
                        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 30, color: C.text, marginBottom: 8 }}>
                            {era.title}
                        </h3>
                        <p style={{ fontSize: 14, color: C.muted, fontStyle: "italic" }}
                           dangerouslySetInnerHTML={{ __html: era.tagline }} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                        {era.events.map((ev, i) => {
                            const accent = ev.severity === "huge" ? C.red
                                : ev.severity === "big" ? era.color
                                : C.border;
                            return (
                                <div
                                    key={i}
                                    style={{
                                        display: "grid", gridTemplateColumns: "140px 1fr",
                                        gap: 24, alignItems: "flex-start",
                                        paddingLeft: 20, borderLeft: `2px solid ${accent}`,
                                        animation: `fadeUp 0.4s ease ${i * 0.06}s both`,
                                    }}
                                >
                                    <div style={{
                                        fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                                        color: accent, letterSpacing: "0.05em", paddingTop: 2,
                                    }}
                                    dangerouslySetInnerHTML={{ __html: ev.date }} />
                                    <div>
                                        <div style={{
                                            fontFamily: "'Syne', sans-serif", fontWeight: 700,
                                            fontSize: 15, color: C.text, marginBottom: 4,
                                            display: "flex", alignItems: "center", gap: 10,
                                        }}>
                                            <span dangerouslySetInnerHTML={{ __html: ev.title }} />
                                            {ev.severity === "huge" && (
                                                <span style={{
                                                    fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                                                    color: C.red, background: `${C.red}15`, border: `1px solid ${C.red}40`,
                                                    padding: "2px 7px", borderRadius: 20, letterSpacing: "0.1em",
                                                }}>
                                                    MAJOR
                                                </span>
                                            )}
                                        </div>
                                        <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.65 }}
                                           dangerouslySetInnerHTML={{ __html: ev.detail }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div style={{
                    marginTop: 24, padding: "20px 24px", background: `${P}08`,
                    border: `1px solid ${P}30`, borderRadius: 12, textAlign: "center",
                    fontSize: 13, color: C.muted, lineHeight: 1.7,
                }}>
                    <b style={{ color: P }}>Key insight:</b> the App Store was built by a company that deeply dislikes public mistakes.
                    Every major rule you’ll see today came from a scandal Apple wanted to prevent from happening twice.
                </div>
            </div>
        </section>
    );
}
