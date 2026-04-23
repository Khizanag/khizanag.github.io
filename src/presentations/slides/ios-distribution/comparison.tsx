import { C, Reveal, SectionLabel, SectionHeading, CalloutBox } from "../../shared.tsx";
import { P, ComparisonRow } from "./ui.tsx";

export function ComparisonSection() {
    return (
        <section id="s-compare" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>iOS vs ANDROID vs WEB</SectionLabel>
                    <SectionHeading sub="The same feature ships differently on each platform. This matters for Android engineers, PMs, and anyone planning cross-platform.">
                        Same feature, three platforms
                    </SectionHeading>
                </Reveal>

                <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
                    <div style={{
                        display: "grid", gridTemplateColumns: "200px repeat(3, 1fr)",
                        background: C.bg, borderBottom: `1px solid ${C.border}`,
                    }}>
                        <div style={{ padding: "14px 16px", borderRight: `1px solid ${C.border}` }} />
                        {[
                            { label: "iOS (App Store)",    color: P },
                            { label: "Android (Play)",     color: C.accent },
                            { label: "Web / PWA",          color: C.purple },
                        ].map((h, i, arr) => (
                            <div
                                key={h.label}
                                style={{
                                    padding: "14px 16px",
                                    borderRight: i < arr.length - 1 ? `1px solid ${C.border}` : "none",
                                    fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: h.color,
                                }}
                            >
                                {h.label}
                            </div>
                        ))}
                    </div>

                    <ComparisonRow label="ANNUAL COST" cells={["$99", "$25 one-time", "$0 (domain only)"]} />
                    <ComparisonRow label="STORE REVIEW" cells={[
                        <span style={{ color: C.red }}>Human review, 24–48h</span>,
                        "Automated + review for new apps, ~2h",
                        "None — you own the server",
                    ]} />
                    <ComparisonRow label="FIRST RELEASE" cells={["1–7 days to approval", "Same day", "Minutes (deploy = release)"]} />
                    <ComparisonRow label="UPDATES" cells={["1–7 days", "Hours, staged rollout", "Instant"]} />
                    <ComparisonRow label="ROLLBACK" cells={[
                        <span style={{ color: C.red }}>Not supported</span>,
                        <span style={{ color: C.accent }}>Native staged rollout halt</span>,
                        <span style={{ color: C.accent }}>Redeploy previous build</span>,
                    ]} />
                    <ComparisonRow label="REVENUE SHARE" cells={[
                        "30% standard / 15% Small Biz / 15% subs after Y1",
                        "30% / 15% subs after Y1 / 15% Small Biz",
                        "Your processor (e.g. Stripe 2.9%)",
                    ]} />
                    <ComparisonRow label="REFUND POLICY" cells={[
                        "Apple decides, user-friendly",
                        "48h no-questions / longer via support",
                        "You set your own",
                    ]} />
                    <ComparisonRow label="ALTERNATIVE STORES" cells={[
                        <span style={{ color: C.yellow }}>Only in EU (since 2024)</span>,
                        <span style={{ color: C.accent }}>Yes — Amazon, Samsung, F-Droid, sideload</span>,
                        "—",
                    ]} />
                    <ComparisonRow label="GUIDELINES LENGTH" cells={["~180 numbered rules", "~80 policies", "Your TOS"]} />
                    <ComparisonRow label="PUSH NOTIFICATIONS" cells={[
                        "APNs, entitlement required",
                        "FCM, no entitlement",
                        <span style={{ color: C.yellow }}>Web Push — limited on iOS</span>,
                    ]} />
                    <ComparisonRow label="DEEP LINKS" cells={[
                        "Universal Links (ASAA JSON) + custom URL scheme",
                        "App Links (assetlinks.json) + intent filters",
                        "Just URLs",
                    ]} />
                    <ComparisonRow label="BIOMETRIC AUTH" cells={[
                        "LAContext (Face ID / Touch ID / Optic ID)",
                        "BiometricPrompt",
                        "WebAuthn (modern browsers only)",
                    ]} />
                </div>

                <div style={{ marginTop: 32 }}>
                    <CalloutBox color={P} icon="💡" label="WHY THIS MATTERS TO EVERYONE IN THE ROOM">
                        Android folks: your Play Console equivalent to App Store Connect is <b>Play Console</b>. Your .ipa is an <b>.aab</b>. Your TestFlight is <b>Internal Testing Track</b>. Most concepts map 1:1. Web folks: the closest analog is <b>progressive deployment</b> behind a feature flag. Every platform has the same problems; the vocabulary differs.
                    </CalloutBox>
                </div>
            </div>
        </section>
    );
}
