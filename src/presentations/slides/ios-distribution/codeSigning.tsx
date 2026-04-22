import { C, Reveal, SectionLabel, SectionHeading, FeatureCard, CalloutBox, CodeBlock } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function CodeSigningSection() {
    return (
        <section id="s-signing" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>CODE SIGNING</SectionLabel>
                    <SectionHeading sub="The topic every iOS developer pretends to understand. It&rsquo;s not that hard &mdash; just four entities in a chain of trust.">
                        The four horsemen of provisioning
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 48 }}>
                    <FeatureCard icon="🔑" title="Certificate" color={P} delay={0}
                        description="Cryptographic proof Apple trusts YOU. Signed by Apple Worldwide Developer Relations CA. Lives in Keychain. Expires yearly."
                    />
                    <FeatureCard icon="🆔" title="App Identifier" color={C.purple} delay={0.08}
                        description="Reverse-DNS bundle ID like uz.tbc.digital.prod. Registered in Apple Developer portal. Declares which capabilities (Push, Sign-in-with-Apple) the app uses."
                    />
                    <FeatureCard icon="📱" title="Devices" color={C.yellow} delay={0.16}
                        description="UDIDs registered in the team. Needed for Development and Ad-Hoc builds only. Limit: 100 iPhones + 100 iPads + 100 Macs + 100 Apple TVs / year."
                    />
                    <FeatureCard icon="📜" title="Provisioning Profile" color={C.accent} delay={0.24}
                        description="The glue. Binds a Certificate + App ID + Devices together. Gets embedded in the .ipa. Apple verifies it when installing."
                    />
                </div>

                <Reveal>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: C.text, marginBottom: 20 }}>
                        Four types of signing
                    </h3>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 48 }}>
                    <FeatureCard icon="🛠️" title="Development" color={P} delay={0} description="Xcode → Run on your iPhone. Devices must be in the profile. Capabilities: full." />
                    <FeatureCard icon="📦" title="Ad-Hoc" color={C.yellow} delay={0.08} description="For registered devices without TestFlight. Legacy. Rarely used now that TestFlight is free." />
                    <FeatureCard icon="🏢" title="Enterprise In-House" color={C.purple} delay={0.16} description="Requires Enterprise account. No device UDIDs needed. Apple can revoke at any time." />
                    <FeatureCard icon="🌍" title="App Store" color={C.accent} delay={0.24} description="The only way into TestFlight or App Store. Most restrictive — no custom URL schemes for arbitrary protocols, etc." />
                </div>

                <Reveal>
                    <div style={{ marginBottom: 20 }}>
                        <SectionLabel color={C.red}>WHAT A PROFILE ACTUALLY IS</SectionLabel>
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
                    <CodeBlock filename="profile.mobileprovision (excerpt)">{`<?xml version="1.0" encoding="UTF-8"?>
<plist version="1.0">
<dict>
  <key>AppIDName</key>
  <string>TBC UZ Production</string>
  <key>ApplicationIdentifierPrefix</key>
  <array><string>ABCD12345</string></array>
  <key>CreationDate</key>
  <date>2026-04-22T08:00:00Z</date>
  <key>DeveloperCertificates</key>
  <array><data>MIIFnzCCBIe...</data></array>
  <key>Entitlements</key>
  <dict>
    <key>aps-environment</key>
    <string>production</string>
    <key>com.apple.developer.applesignin</key>
    <array><string>Default</string></array>
  </dict>
  <key>ExpirationDate</key>
  <date>2027-04-22T08:00:00Z</date>
  <key>ProvisionedDevices</key>
  <array>...</array>
</dict>
</plist>`}</CodeBlock>

                    <div>
                        <CalloutBox color={P} icon="🔍" label="IN PLAIN ENGLISH">
                            It&rsquo;s literally just a signed XML file. You can open it with <code style={{ color: P, background: `${P}15`, padding: "1px 6px", borderRadius: 4 }}>security cms -D -i profile.mobileprovision</code> and read it.
                        </CalloutBox>

                        <div style={{ marginTop: 16 }}>
                            <CalloutBox color={C.red} icon="🔥" label="THE CLASSIC ERRORS">
                                <b>&ldquo;No signing certificate&rdquo;</b> — Keychain lost the private key. <br />
                                <b>&ldquo;Provisioning profile doesn&rsquo;t include this device&rdquo;</b> — Register UDID or use a wildcard dev profile. <br />
                                <b>&ldquo;Identity not trusted&rdquo;</b> — WWDR intermediate cert expired. Re-download from Apple. <br />
                                <b>&ldquo;Could not find Developer ID Application&rdquo;</b> — Wrong cert type for the target channel.
                            </CalloutBox>
                        </div>
                    </div>
                </div>

                <CalloutBox color={C.accent} icon="✅" label="HOW TBC UZ HANDLES THIS">
                    We use <b>manual signing</b> via fastlane <code style={{ color: C.accent }}>match</code> pattern &mdash; certs &amp; profiles encrypted in a private Git repo, pulled during CI. Xcode&rsquo;s automatic signing is disabled on CI to prevent surprises. One profile per target per environment.
                </CalloutBox>
            </div>
        </section>
    );
}
