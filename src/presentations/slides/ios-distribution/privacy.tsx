import { C, Reveal, SectionLabel, SectionHeading, InfoCard, CodeBlock, CalloutBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function PrivacySection() {
    return (
        <section id="s-privacy" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>PRIVACY & COMPLIANCE</SectionLabel>
                    <SectionHeading sub="Four overlapping privacy surfaces. Get one wrong and you fail review for Guideline 5.1.1. Critical for banking apps.">
                        The privacy stack
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 40 }}>
                    <InfoCard color={P} tag="2024+" title="Privacy Manifest" icon="📋">
                        <p style={{ color: C.muted, fontSize: 12, lineHeight: 1.7 }}>
                            <b>PrivacyInfo.xcprivacy</b> in your app & every SDK. Declares collected data, tracking domains, Required Reason API usage. Blocks submission if missing since May 2024.
                        </p>
                    </InfoCard>
                    <InfoCard color={C.purple} tag="iOS 14.5+" title="App Tracking Transparency" icon="🚫">
                        <p style={{ color: C.muted, fontSize: 12, lineHeight: 1.7 }}>
                            ATT prompt required before tracking across apps/websites. Even IP fingerprinting counts. Facebook lost ~$10B/yr when this shipped.
                        </p>
                    </InfoCard>
                    <InfoCard color={C.yellow} tag="ASC" title="Privacy Nutrition Labels" icon="🏷️">
                        <p style={{ color: C.muted, fontSize: 12, lineHeight: 1.7 }}>
                            Data you collect, linked to user, used to track. Displayed on App Store page. Must match Privacy Manifest exactly.
                        </p>
                    </InfoCard>
                    <InfoCard color={C.accent} tag="LEGAL" title="Privacy Policy URL" icon="📄">
                        <p style={{ color: C.muted, fontSize: 12, lineHeight: 1.7 }}>
                            Required URL. Must work (404 = rejection). GDPR-compliant, localized, versioned. Also referenced from in-app Settings.
                        </p>
                    </InfoCard>
                </div>

                <Reveal>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 20 }}>
                        PrivacyInfo.xcprivacy — what it looks like
                    </h3>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
                    <CodeBlock filename="PrivacyInfo.xcprivacy">{`<?xml version="1.0" encoding="UTF-8"?>
<plist version="1.0">
<dict>
  <key>NSPrivacyCollectedDataTypes</key>
  <array>
    <dict>
      <key>NSPrivacyCollectedDataType</key>
      <string>NSPrivacyCollectedDataTypePhoneNumber</string>
      <key>NSPrivacyCollectedDataTypeLinked</key>
      <true/>
      <key>NSPrivacyCollectedDataTypeTracking</key>
      <false/>
      <key>NSPrivacyCollectedDataTypePurposes</key>
      <array>
        <string>NSPrivacyCollectedDataTypePurposeAppFunctionality</string>
      </array>
    </dict>
  </array>
  <key>NSPrivacyAccessedAPITypes</key>
  <array>
    <dict>
      <key>NSPrivacyAccessedAPIType</key>
      <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
      <key>NSPrivacyAccessedAPITypeReasons</key>
      <array><string>CA92.1</string></array>
    </dict>
  </array>
  <key>NSPrivacyTracking</key>
  <false/>
</dict>
</plist>`}</CodeBlock>

                    <div>
                        <CalloutBox color={C.red} icon="⚠" label="REQUIRED REASON APIS">
                            Since May 2024, using any of these needs a declared reason:
                            <ul style={{ margin: "12px 0 0 20px", color: C.muted, fontSize: 12, lineHeight: 1.8 }}>
                                <li><b>UserDefaults</b> — accessing user preferences</li>
                                <li><b>File timestamps</b> (creationDate, modificationDate)</li>
                                <li><b>System boot time</b></li>
                                <li><b>Disk space</b></li>
                                <li><b>Active keyboard list</b></li>
                            </ul>
                            Reasons are 4-character codes. ‘CA92.1’ = 'Access info from same app only.' Wrong reason = rejection.
                        </CalloutBox>

                        <div style={{ marginTop: 16 }}>
                            <CalloutBox color={C.accent} icon="✅" label="BANKING EXTRAS">
                                Banking apps (including ours) have additional requirements:
                                <ul style={{ margin: "12px 0 0 20px", color: C.muted, fontSize: 12, lineHeight: 1.8 }}>
                                    <li><b>PSD2 / SCA</b> — Strong Customer Authentication</li>
                                    <li><b>Sign in with Apple</b> required if we offer 3rd-party SSO</li>
                                    <li><b>ScreenShield / anti-screenshot</b> for sensitive views</li>
                                    <li><b>Jailbreak detection</b> allowed (unlike most apps)</li>
                                    <li><b>Biometric (Face/Touch ID)</b> for high-value ops</li>
                                </ul>
                            </CalloutBox>
                        </div>
                    </div>
                </div>

                <CalloutBox color={P} icon="🎯" label="WHY THIS IS A TICKING BOMB">
                    We don’t own the Privacy Manifests of our SDKs. Every analytics, crash reporting, map, or payments SDK ships its own <code style={{ color: P, background: `${P}15`, padding: "1px 6px", borderRadius: 4 }}>PrivacyInfo.xcprivacy</code>. When a vendor updates, our declarations can silently diverge. The May 2024 deadline caused mass SDK upgrades across the iOS ecosystem.
                </CalloutBox>
            </div>
        </section>
    );
}
