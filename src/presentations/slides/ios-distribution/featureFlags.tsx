import { C, Reveal, SectionLabel, SectionHeading, FeatureCard, CalloutBox, PlainEnglishBox, CodeBlock } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function FeatureFlagsSection() {
    return (
        <section id="s-flags" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>FEATURE FLAGS & REMOTE CONFIG</SectionLabel>
                    <SectionHeading sub="Your last-line defence between ‘approved by App Review’ and ‘catastrophe in production’. Shipping without flags on iOS is shipping without brakes.">
                        Ship dark, roll out live
                    </SectionHeading>
                </Reveal>

                {/* Why */}
                <PlainEnglishBox color={P}>
                    iOS ships in <b>binary drops</b>. Once a build is live, the fastest way to change behavior is an expedited re-submit (~24h). <b>Feature flags let you change behavior at runtime, no submit</b> — they replace that 24h loop with seconds. On a regulated banking app, this is how you sleep at night.
                </PlainEnglishBox>

                {/* 3 providers */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginTop: 40, marginBottom: 16 }}>
                    Three providers worth knowing
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
                    <FeatureCard icon="🔥" title="Firebase Remote Config" color={C.yellow} delay={0}
                        description="Free up to ~100M req/month. JSON payload cached locally. Targeting: country, version, user property, random %. The default pick for mobile-first teams. Weaker auditing than LaunchDarkly." />
                    <FeatureCard icon="🚀" title="LaunchDarkly" color={C.blue} delay={0.08}
                        description="Enterprise-grade. Strong audit trail, SOC 2, flag history, scheduled rollouts. $$$. Chosen where compliance or progressive delivery really matters. Banks, healthcare, large SaaS." />
                    <FeatureCard icon="🏗" title="In-house JSON endpoint" color={C.accent} delay={0.16}
                        description="Your backend serves config JSON. Max control + zero vendor lock. Requires you to build: caching, rollout gating, A/B infra, audit log. Good for mature platforms." />
                </div>

                {/* Flag taxonomy */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 16 }}>
                    The four types of flags — each has a shelf life
                </div>
                <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px 28px", marginBottom: 40 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 120px", gap: 20, padding: "8px 0", borderBottom: `1px solid ${C.border}`, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.muted, letterSpacing: "0.1em" }}>
                        <div>TYPE</div><div>PURPOSE</div><div>LIFESPAN</div>
                    </div>
                    {[
                        { t: "Release", purpose: "Hide in-progress work shipped in the binary until it's ready. 'Ship dark'.", life: "days – weeks" },
                        { t: "Rollout",  purpose: "Gradually expose a new feature by %: 5% → 25% → 50% → 100%. Halt if metrics dip.", life: "weeks" },
                        { t: "Kill switch", purpose: "Emergency off button. Block a feature globally in seconds when something breaks.", life: "LIFE of the feature" },
                        { t: "Experiment", purpose: "A/B/n test — control vs variants, measured against a conversion metric.", life: "2 – 8 weeks" },
                    ].map((row, i) => (
                        <div key={i} style={{
                            display: "grid", gridTemplateColumns: "140px 1fr 120px", gap: 20,
                            padding: "14px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none",
                            alignItems: "center",
                        }}>
                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: P }}>{row.t}</div>
                            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>{row.purpose}</div>
                            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.muted }}>{row.life}</div>
                        </div>
                    ))}
                </div>

                {/* Code */}
                <div style={{ marginBottom: 40 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 16 }}>
                        Safe consumption pattern
                    </div>
                    <CodeBlock filename="FeatureFlags.swift — typed, defaults-first, cached">{`public enum FeatureFlag: String {
    case newCardScannerEnabled       // release flag
    case aprCalculatorV2Rollout      // rollout flag
    case paymentRailKillSwitch       // kill switch
    case checkoutExperiment2025Q2    // experiment
}

public protocol FeatureFlagProvider {
    func bool(_ flag: FeatureFlag, default defaultValue: Bool) -> Bool
    func string(_ flag: FeatureFlag, default defaultValue: String) -> String
    func refresh() async
}

// ── Call site — ALWAYS passes a safe default ─────
let scanner = flags.bool(.newCardScannerEnabled, default: false)
let apr     = flags.bool(.aprCalculatorV2Rollout, default: false)

// ── The anti-pattern to AVOID ────────────────────
if flags.bool(.newCardScannerEnabled) {         // ← no default
    // crashes / shows empty UI if Firebase is offline
}`}</CodeBlock>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                    <CalloutBox color={C.accent} icon="✓" label="FLAGS + PHASED RELEASE = BELT & BRACES">
                        Phased release caps <i>who</i> gets the build over 7 days (1% → 100%). Feature flags control <i>what</i> each person sees. Together: a new feature can reach 100% of downloads on day 7 but remain off for 95% of users — flip gradually over weeks.
                    </CalloutBox>
                    <CalloutBox color={C.red} icon="✕" label="FLAG DEBT">
                        Every flag NOT removed after rollout = tech debt. Rule: every release flag gets a <b>removal ticket</b> filed the same day it ships. Audit every quarter. Our target: &lt;20 live flags at any time. We were at 80 in 2023 — pure pain.
                    </CalloutBox>
                </div>

                <CalloutBox color={C.yellow} icon="⚠" label="APP REVIEW & FEATURE FLAGS — THE LINE">
                    Apple&rsquo;s policy (Guideline 2.5.2): <b>&ldquo;Apps should be self-contained... they may not download, install, or execute code that changes features or functionality.&rdquo;</b> Feature flags are legal — they enable/disable code that already shipped. Downloading new UI or new logic is NOT. If a reviewer can unlock hidden flows by flipping a local toggle, expect rejection under 2.3.1 (hidden features).
                </CalloutBox>
            </div>
        </section>
    );
}
