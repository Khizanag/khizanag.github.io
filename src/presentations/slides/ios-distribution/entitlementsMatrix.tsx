import { C, Reveal, SectionLabel, SectionHeading, CalloutBox, PlainEnglishBox } from "../../shared.tsx";
import { P, TimingBadge } from "./ui.tsx";

const ENTITLEMENTS = [
    { key: "com.apple.developer.applesignin",             lvl: "Auto",     note: "SIWA. Flip a capability switch. Required if you offer any 3rd-party social login." },
    { key: "com.apple.developer.associated-domains",      lvl: "Auto",     note: "Universal Links. Needs apple-app-site-association on your domain at https://yourdomain.com/.well-known/." },
    { key: "aps-environment",                             lvl: "Auto",     note: "Push notifications. Values: development | production. Embedded profile MUST match — wrong env = BadDeviceToken." },
    { key: "com.apple.developer.in-app-payments",         lvl: "Auto",     note: "Apple Pay merchant entitlement. Tied to a merchant ID in ASC." },
    { key: "com.apple.developer.healthkit",               lvl: "REVIEW",   note: "Every HealthKit key type disclosed in Info.plist needs matching justification in review notes. Frequent rejection source." },
    { key: "com.apple.developer.homekit",                 lvl: "REVIEW",   note: "HomeKit. Apple wants to see accessory demo or simulator config in review notes." },
    { key: "com.apple.developer.networking.wifi-info",    lvl: "REVIEW",   note: "Access SSID/BSSID. Since iOS 13, requires explicit Apple approval via a form. Used for hotspot apps + enterprise config." },
    { key: "com.apple.developer.networking.multipath",    lvl: "REVIEW",   note: "Multipath TCP. Rarely granted outside of iCloud/FaceTime-tier apps." },
    { key: "com.apple.developer.networking.vpn.api",      lvl: "REVIEW",   note: "Personal VPN. Apple requires proof of legitimate commercial VPN ops." },
    { key: "com.apple.developer.networking.networkextension", lvl: "REVIEW", note: "System-level network extensions. Custom DNS, content filter, packet tunnel. Extremely restricted." },
    { key: "com.apple.developer.carplay-*",               lvl: "REVIEW",   note: "CarPlay apps need a separate Apple form + safety questionnaire + category approval (audio, navigation, etc.)." },
    { key: "com.apple.developer.driverkit",               lvl: "REVIEW",   note: "macOS-style drivers on iPad. Custom form, engineering review by Apple." },
    { key: "com.apple.developer.kernel.increased-memory-limit", lvl: "REVIEW", note: "Extended memory limit — only a handful of pro apps granted (video editors). Custom request form." },
    { key: "com.apple.developer.contacts.notes",          lvl: "REVIEW",   note: "Write to Contacts notes field. Enterprise-oriented, rarely approved." },
    { key: "com.apple.developer.default-data-protection", lvl: "Auto",     note: "Default data protection class (Complete / CompleteUnlessOpen / Until-First-User-Auth)." },
    { key: "com.apple.developer.icloud-container-identifiers", lvl: "Auto", note: "iCloud containers. Configure in ASC → Certificates → Identifiers → iCloud Container." },
    { key: "com.apple.developer.location.push",           lvl: "REVIEW",   note: "Receive location via push. Logistics / fleet apps. Apple form required." },
    { key: "com.apple.developer.siri",                    lvl: "Auto",     note: "Intents + Siri integration. SiriKit donations." },
    { key: "com.apple.developer.ClassKit-environment",    lvl: "Auto",     note: "Education apps — ClassKit reporting. Separate prod vs dev env." },
    { key: "com.apple.developer.web-browser",             lvl: "EU-only",  note: "Post-DMA: default browser engine on iOS in EU. Apple must opt you in." },
    { key: "com.apple.developer.passkit-pass-library",    lvl: "Auto",     note: "Wallet pass types. Separate pass-type ID registration." },
];

const COLORS: Record<string, string> = {
    "Auto":      C.accent,
    "REVIEW":    C.yellow,
    "EU-only":   C.blue,
};

export function EntitlementsMatrixSection() {
    return (
        <section id="s-entitlements" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>ENTITLEMENTS MATRIX <TimingBadge minutes="2:30" color={P} reference /></SectionLabel>
                    <SectionHeading sub="Entitlements are how your binary asks the kernel for capabilities. Some are auto-granted. A surprisingly long list needs explicit Apple review — and the approval path is very different per entitlement.">
                        Capabilities that cost you a rejection — and which don&rsquo;t
                    </SectionHeading>
                </Reveal>

                <PlainEnglishBox color={P}>
                    Think of it like <b>Android runtime permissions, but at install time + with a human gatekeeper</b> for the spicy ones. &lsquo;REVIEW&rsquo; means you file a form with Apple; turnaround is 1–6 weeks. Do NOT wait for submission day to find out you need one.
                </PlainEnglishBox>

                <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 20px", marginTop: 32 }}>
                    <div style={{
                        display: "grid", gridTemplateColumns: "340px 90px 1fr",
                        gap: 16, padding: "8px 0", borderBottom: `1px solid ${C.border}`,
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                        color: C.muted, letterSpacing: "0.1em",
                    }}>
                        <div>ENTITLEMENT KEY</div><div>GATE</div><div>NOTES</div>
                    </div>
                    {ENTITLEMENTS.map((e, i) => (
                        <div key={e.key} style={{
                            display: "grid", gridTemplateColumns: "340px 90px 1fr",
                            gap: 16, padding: "10px 0",
                            borderBottom: i < ENTITLEMENTS.length - 1 ? `1px solid ${C.border}` : "none",
                            alignItems: "center",
                        }}>
                            <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: C.text, wordBreak: "break-all" }}>
                                {e.key}
                            </code>
                            <span style={{
                                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                                color: COLORS[e.lvl], fontWeight: 700, letterSpacing: "0.05em",
                                background: `${COLORS[e.lvl]}14`, border: `1px solid ${COLORS[e.lvl]}40`,
                                borderRadius: 4, padding: "3px 8px", width: "fit-content",
                            }}>
                                {e.lvl}
                            </span>
                            <span style={{ fontSize: 11.5, color: C.muted, lineHeight: 1.6 }}>{e.note}</span>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    <CalloutBox color={C.red} icon="⚠" label="COMMON SENIOR-LEVEL MISTAKE">
                        Enabling <code>aps-environment</code>=<b>development</b> in Release build. Profile says prod, entitlement says dev → push tokens don&rsquo;t match any topic. APNs returns <code>BadDeviceToken</code>. App looks broken only in production, not TestFlight (because TestFlight uses development env too).
                    </CalloutBox>
                    <CalloutBox color={C.yellow} icon="⏳" label="THE 6-WEEK ENTITLEMENT">
                        CarPlay apps + WiFi-info + NetworkExtension requests take <b>3–6 weeks</b> and usually get bounced once for vague justification. Apply the moment your PRD is signed, not the sprint before release.
                    </CalloutBox>
                </div>
            </div>
        </section>
    );
}
