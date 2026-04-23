import { useRef, useState } from "react";
import { C, Reveal, SectionLabel, SectionHeading, FeatureCard, CodeBlock, CalloutBox, TabButton, useLocalTabNav } from "../../shared.tsx";
import { P } from "./ui.tsx";

interface PushError {
    code: string;
    msg: string;
    cause: string;
    fix: string;
}

const ERRORS: PushError[] = [
    {
        code: "BadDeviceToken",
        msg: "APNs returns 400 BadDeviceToken",
        cause: "You sent a sandbox token to production APNs (api.push.apple.com) or vice versa. Classic on TestFlight builds where the token looks identical but is sandbox-scoped.",
        fix: "Token environment is decided at BUILD time by aps-environment entitlement (development or production). App Store + TestFlight = production. Dev builds = development. Route tokens to the right APNs host.",
    },
    {
        code: "DeviceTokenNotForTopic",
        msg: "APNs returns 400 DeviceTokenNotForTopic",
        cause: "apns-topic header doesn't match the app's bundle ID (or the VoIP, complication, location topic variants). Most common after refactoring bundle IDs per env.",
        fix: "apns-topic MUST equal bundle ID for normal push, bundle.voip for PushKit, bundle.complication for WatchKit. Backend needs per-env topic config.",
    },
    {
        code: "TopicDisallowed",
        msg: "APNs returns 400 TopicDisallowed",
        cause: "The p8 key or certificate you used does not belong to the Team that owns that bundle ID. Happens when a shared key is reused across Team IDs.",
        fix: "One p8 key per Team. Store Team ID alongside key. Check key in Apple Dev Portal > Keys. Revoke + regenerate if in doubt — unlimited p8 keys per Team.",
    },
    {
        code: "Unregistered",
        msg: "APNs returns 410 Unregistered",
        cause: "User uninstalled the app or disabled notifications. The token is now invalid and APNs will reject every further attempt. Keep sending: you will be rate-limited.",
        fix: "Every 410 MUST be propagated to your backend to mark the token dead. Batch-dedupe before every send. Target: <1% dead token rate.",
    },
    {
        code: "PayloadTooLarge",
        msg: "APNs returns 413 PayloadTooLarge",
        cause: "Payload exceeds 4KB (normal) or 5KB (VoIP). Rich media + custom data + long localized strings add up fast.",
        fix: "Don't ship full content in the payload — ship an ID + use Notification Service Extension to download the rich body. Compress images to <100KB.",
    },
    {
        code: "Silent not arriving",
        msg: "content-available: 1 push never wakes the app",
        cause: "iOS throttles silent pushes aggressively (max ~2–3/hour baseline, Low Power Mode kills all). Not an APNs error — apns-priority 5 + no alert = lowest delivery priority.",
        fix: "Don't rely on silent push for anything time-critical. Use BGAppRefreshTask scheduler for polling. For truly time-critical silent delivery: PushKit VoIP (but only for real VoIP — abuse = app rejection).",
    },
];

export function PushNotificationsSection() {
    const [activeErr, setActiveErr] = useState(0);
    const activeRef = useRef(activeErr);
    activeRef.current = activeErr;
    useLocalTabNav("s-push", ERRORS.length, activeRef, setActiveErr);
    const err = ERRORS[activeErr];

    return (
        <section id="s-push" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>PUSH NOTIFICATIONS</SectionLabel>
                    <SectionHeading sub="The delivery channel every product manager wants, and the #1 source of “works in dev, silent in prod” war stories. Two secrets + six errors.">
                        APNs — the other code-signing story
                    </SectionHeading>
                </Reveal>

                {/* .p12 vs .p8 */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 40 }}>
                    <FeatureCard icon="📜" title=".p12 — legacy cert (avoid)" color={C.red} delay={0}
                        description="Tied to ONE bundle ID. Expires yearly. Two flavors (sandbox + prod). Requires renewal choreography across Dev Portal + backend. Pre-2016 standard, still supported but Apple deprecated issuance paths for APNs-only p12s." />
                    <FeatureCard icon="🔑" title=".p8 — auth key (use this)" color={C.accent} delay={0.1}
                        description="Introduced 2016. One key covers ALL bundle IDs for your Team. Never expires. Same key hits sandbox AND production (env chosen by backend per-request via apns-topic). Stored once in backend secret manager." />
                </div>

                {/* JWT flow */}
                <div style={{ marginBottom: 40 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 16 }}>
                        How a push actually reaches the device
                    </div>
                    <CodeBlock filename="Backend → APNs (HTTP/2, JWT signed with .p8)">{`POST /3/device/{deviceToken} HTTP/2
Host: api.push.apple.com                       # production
      api.sandbox.push.apple.com               # development

authorization: bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IktFWV9JRCJ9.
                     eyJpc3MiOiJURUFNX0lEIiwiaWF0IjoxNzAwMDAwMDAwfQ.
                     <ES256 signature>
apns-topic: uz.tbc.digital                     # bundle ID, exact match
apns-push-type: alert                          # alert|background|voip|complication
apns-priority: 10                              # 10 = immediate, 5 = power-friendly
apns-expiration: 1713800000                    # unix ts, 0 = best-effort once

{ "aps": { "alert": "Hello", "badge": 1, "sound": "default" } }`}</CodeBlock>
                </div>

                {/* Error decoder */}
                <div style={{ marginBottom: 32 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 8 }}>
                        Six errors you will hit — <span style={{ color: C.red }}>interactive</span>
                    </div>
                    <p style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>Click to expand. ← → to cycle.</p>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                        {ERRORS.map((e, i) => (
                            <TabButton key={e.code} active={activeErr === i} color={P}
                                label={e.code} onClick={() => setActiveErr(i)} />
                        ))}
                    </div>

                    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "28px 32px" }}>
                        <div style={{
                            fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
                            color: C.red, background: `${C.red}08`, border: `1px solid ${C.red}30`,
                            padding: "12px 16px", borderRadius: 8, marginBottom: 20,
                        }}>{err.msg}</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                            <div>
                                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.muted, letterSpacing: "0.1em", marginBottom: 8 }}>ROOT CAUSE</div>
                                <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>{err.cause}</p>
                            </div>
                            <div>
                                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.accent, letterSpacing: "0.1em", marginBottom: 8 }}>FIX</div>
                                <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>{err.fix}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <CalloutBox color={C.yellow} icon="⚠" label="THE ENVIRONMENT TRAP">
                    <b>aps-environment</b> in the app&rsquo;s entitlements is set at <i>build time</i>. TestFlight + App Store = production. Dev builds + Xcode run = development. Result: a token generated from TestFlight will silently fail if your backend sends to sandbox APNs. <b>Always log the aps-environment on app launch</b> — single most useful push debug line we ever added.
                </CalloutBox>
            </div>
        </section>
    );
}
