import { C, Reveal, SectionLabel, SectionHeading, FeatureCard, CodeBlock, CalloutBox, PlainEnglishBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

const ENVS = [
    { name: "Dev",   bundle: "uz.tbc.digital.dev",   color: C.blue,    tier: "1", audience: "Engineers, local iPhone + Simulator" },
    { name: "QA",    bundle: "uz.tbc.digital.qa",    color: C.purple,  tier: "2", audience: "QA team — matches staging backend" },
    { name: "Stage", bundle: "uz.tbc.digital.stage", color: C.yellow,  tier: "3", audience: "Product + business stakeholders, real-ish data" },
    { name: "Prod",  bundle: "uz.tbc.digital",       color: C.accent,  tier: "4", audience: "End users — App Store build" },
];

export function MultiEnvironmentSection() {
    return (
        <section id="s-multienv" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>MULTI-ENVIRONMENT DISTRIBUTION</SectionLabel>
                    <SectionHeading sub="One codebase. Four installable apps side-by-side on the same phone. The only way to sanely test before prod.">
                        Dev → QA → Stage → Prod
                    </SectionHeading>
                </Reveal>

                {/* Four-environment matrix */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 40 }}>
                    {ENVS.map((e, i) => (
                        <FeatureCard key={e.name} icon={`T${e.tier}`} title={e.name} color={e.color} delay={i * 0.08}
                            description={`Bundle ID: ${e.bundle}\n\n${e.audience}\n\nInstalls alongside prod — different icon, different display name.`} />
                    ))}
                </div>

                {/* The three levers */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 16 }}>
                    The three levers that make this work
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 40 }}>
                    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px 28px" }}>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: P, letterSpacing: "0.1em", marginBottom: 10 }}>1 · XCCONFIG FILES</div>
                        <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>
                            Plain-text build settings per environment. One file per env: <b>Dev.xcconfig</b>, <b>QA.xcconfig</b>, <b>Prod.xcconfig</b>. Overrides bundle ID, display name, API host, signing identity, Sentry DSN.
                        </p>
                    </div>
                    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px 28px" }}>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: P, letterSpacing: "0.1em", marginBottom: 10 }}>2 · SCHEMES</div>
                        <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>
                            One Xcode scheme per environment. <b>Schemes &gt; Targets</b> for env isolation — targets multiply resources + build time; schemes just swap xcconfig. TBC UZ: 4 schemes, 1 target.
                        </p>
                    </div>
                    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px 28px" }}>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: P, letterSpacing: "0.1em", marginBottom: 10 }}>3 · INFO.PLIST SUBSTITUTION</div>
                        <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>
                            Info.plist references build settings via <code style={{ color: P }}>$(VAR_NAME)</code>. Bundle display name, URL schemes, universal link domains all flow from xcconfig. No per-env plists to diverge.
                        </p>
                    </div>
                </div>

                {/* Example xcconfig */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 40 }}>
                    <CodeBlock filename="Config/Dev.xcconfig">{`// ── Identity
PRODUCT_BUNDLE_IDENTIFIER   = uz.tbc.digital.dev
PRODUCT_DISPLAY_NAME        = TBC Dev
APP_ICON_NAME               = AppIcon-Dev

// ── Signing (matches profile name)
PROVISIONING_PROFILE_SPECIFIER = match Development uz.tbc.digital.dev
CODE_SIGN_IDENTITY          = iPhone Developer
DEVELOPMENT_TEAM            = ABCD12345

// ── Backend
API_BASE_URL                = https:/$()/api-dev.tbc.uz
SENTRY_ENVIRONMENT          = dev

// ── Debug toggles
ENABLE_REACTOTRON           = 1
ALLOW_INSECURE_CERTS        = 1`}</CodeBlock>
                    <CodeBlock filename="Config/Prod.xcconfig">{`// ── Identity
PRODUCT_BUNDLE_IDENTIFIER   = uz.tbc.digital
PRODUCT_DISPLAY_NAME        = TBC
APP_ICON_NAME               = AppIcon

// ── Signing
PROVISIONING_PROFILE_SPECIFIER = match AppStore uz.tbc.digital
CODE_SIGN_IDENTITY          = iPhone Distribution
DEVELOPMENT_TEAM            = ABCD12345

// ── Backend
API_BASE_URL                = https:/$()/api.tbc.uz
SENTRY_ENVIRONMENT          = production

// ── Debug toggles OFF
ENABLE_REACTOTRON           = 0
ALLOW_INSECURE_CERTS        = 0`}</CodeBlock>
                </div>

                <PlainEnglishBox color={P}>
                    Bundle ID is the <b>single unique key</b> that pins every Apple resource — provisioning profile, App ID entry in dev portal, push certificate, Universal Links domain, Associated Domains entitlement, App Groups, Keychain Access Group. Change it → everything re-issues. That&rsquo;s why Dev / QA / Stage / Prod each own a distinct bundle from day one.
                </PlainEnglishBox>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 32 }}>
                    <CalloutBox color={C.accent} icon="✓" label="DO">
                        Reverse-DNS hierarchy: <code style={{ color: C.accent }}>com.company.app</code> for prod, <code style={{ color: C.accent }}>com.company.app.{'{env}'}</code> for non-prod. Keeps App ID wildcards clean: <code style={{ color: C.accent }}>com.company.app.*</code> covers all non-prod.
                    </CalloutBox>
                    <CalloutBox color={C.red} icon="✕" label="DON'T">
                        Never ship prod by flipping a <code style={{ color: C.red }}>DEBUG</code> flag in a dev bundle. Apple&rsquo;s anti-abuse scanners reject builds where Bundle ID doesn&rsquo;t match the App ID in the profile. Also: push tokens are env-scoped — dev tokens don&rsquo;t work against prod APNs.
                    </CalloutBox>
                </div>
            </div>
        </section>
    );
}
