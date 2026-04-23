import { C, Reveal, SectionLabel, SectionHeading, CalloutBox, InfoCard } from "../../shared.tsx";
import { P, TimingBadge } from "./ui.tsx";

const API_REASONS = [
    { key: "NSPrivacyAccessedAPICategoryFileTimestamp", reasons: "C617.1 · 3B52.1 · 0A2A.1", use: "Checking file modification dates, download-freshness comparisons" },
    { key: "NSPrivacyAccessedAPICategorySystemBootTime", reasons: "35F9.1 · 8FFB.1", use: "Measuring time since device boot (perf timers, Sentry)" },
    { key: "NSPrivacyAccessedAPICategoryDiskSpace", reasons: "E174.1 · 85F4.1", use: "Pre-flight storage checks before downloads" },
    { key: "NSPrivacyAccessedAPICategoryActiveKeyboards", reasons: "3EC4.1 · 54BD.1", use: "Third-party keyboard detection (anti-fraud)" },
    { key: "NSPrivacyAccessedAPICategoryUserDefaults", reasons: "CA92.1 · 1C8F.1", use: "UserDefaults reads/writes — required since May 2024" },
];

const TRACKING_MATRIX = [
    { label: "App Tracking Transparency (ATT)", when: "iOS 14.5+", what: "Prompt BEFORE any cross-app tracking. Missing prompt = 5.1.2 rejection. Deny rate: ~75%." },
    { label: "SKAdNetwork / AdAttributionKit", when: "Since 2021", what: "Privacy-preserving ad attribution. AdAttributionKit (iOS 17.4+) is the DMA-compatible successor." },
    { label: "App Privacy labels (Nutrition)", when: "Dec 2020", what: "What data you collect + how. Shown on your App Store page. MUST match your Privacy Manifest + actual behavior." },
    { label: "Privacy Manifest + API reasons", when: "May 2024", what: "Per-framework XML declaring tracking, data types, required-reason APIs. Also required from your SDK vendors." },
];

export function PrivacyDeepSection() {
    return (
        <section id="s-privacy-deep" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>
                        PRIVACY · API REQUIRED REASONS <TimingBadge minutes="2:30" color={P} reference />
                    </SectionLabel>
                    <SectionHeading sub="The previous slide explained the privacy manifest. This one is the hit-list that killed most 2024/25 submissions: ATT, SKAdNetwork, the Required-Reasons API table, and how App Privacy labels differ from the manifest.">
                        Privacy — the four layers (and where they collide)
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
                    {TRACKING_MATRIX.map((t) => (
                        <InfoCard key={t.label} icon="🔒" title={t.label} color={P}>
                            <div style={{
                                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                                color: C.muted, letterSpacing: "0.1em", marginBottom: 6,
                            }}>
                                {t.when}
                            </div>
                            {t.what}
                        </InfoCard>
                    ))}
                </div>

                <div style={{
                    background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12,
                    padding: "16px 20px", marginBottom: 20,
                }}>
                    <div style={{
                        display: "grid", gridTemplateColumns: "360px 180px 1fr", gap: 14,
                        padding: "8px 0", borderBottom: `1px solid ${C.border}`,
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                        color: C.muted, letterSpacing: "0.1em",
                    }}>
                        <div>API CATEGORY</div><div>VALID REASON CODES</div><div>TYPICAL USE</div>
                    </div>
                    {API_REASONS.map((r) => (
                        <div key={r.key} style={{
                            display: "grid", gridTemplateColumns: "360px 180px 1fr", gap: 14,
                            padding: "10px 0", borderBottom: `1px solid ${C.border}`,
                            alignItems: "flex-start",
                        }}>
                            <div style={{
                                fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                                color: P, wordBreak: "break-all",
                            }}>
                                {r.key}
                            </div>
                            <div style={{
                                fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.yellow,
                            }}>
                                {r.reasons}
                            </div>
                            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.55 }}>{r.use}</div>
                        </div>
                    ))}
                </div>

                <CalloutBox color={C.yellow} icon="⚠" label="COMMONLY CONFUSED">
                    <p style={{ margin: "0 0 8px 0", fontSize: 13, color: C.muted, lineHeight: 1.65 }}>
                        <b>App Privacy labels</b> (ASC nutrition UI) = marketing-facing, per-data-type, editable anytime.
                    </p>
                    <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.65 }}>
                        <b>Privacy Manifest</b> (<code>PrivacyInfo.xcprivacy</code>) = build-baked XML, per-framework, validated by Apple statically.
                    </p>
                    <p style={{ margin: "8px 0 0 0", fontSize: 12, color: C.muted, lineHeight: 1.55, fontStyle: "italic" }}>
                        If they disagree, Apple believes the manifest and rejects for 5.1.2. Keep them in sync via CI — script comparison is trivial.
                    </p>
                </CalloutBox>
            </div>
        </section>
    );
}
