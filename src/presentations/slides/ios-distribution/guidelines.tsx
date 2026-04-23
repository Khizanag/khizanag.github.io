import { C, Reveal, SectionLabel, SectionHeading, InfoCard } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function GuidelinesSection() {
    return (
        <section id="s-guidelines" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>APP REVIEW GUIDELINES</SectionLabel>
                    <SectionHeading sub="~180 numbered rules, grouped into 5 pillars. You don’t have to memorize them. You have to know where to look.">
                        The five pillars
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginBottom: 48 }}>
                    <InfoCard color={C.red} tag="1.x" title="Safety" icon="🛡️">
                        <ul style={{ margin: 0, paddingLeft: 18, color: C.muted, fontSize: 12, lineHeight: 1.8 }}>
                            <li>Objectionable content</li>
                            <li>User-generated content moderation</li>
                            <li>Kids category rules</li>
                            <li>Physical harm</li>
                            <li>Developer info required</li>
                        </ul>
                    </InfoCard>
                    <InfoCard color={C.yellow} tag="2.x" title="Performance" icon="⚡">
                        <ul style={{ margin: 0, paddingLeft: 18, color: C.muted, fontSize: 12, lineHeight: 1.8 }}>
                            <li>App completeness</li>
                            <li>Beta testing via TestFlight only</li>
                            <li>Accurate metadata</li>
                            <li>Hardware compatibility</li>
                            <li>Software requirements</li>
                        </ul>
                    </InfoCard>
                    <InfoCard color={P} tag="3.x" title="Business" icon="💰">
                        <ul style={{ margin: 0, paddingLeft: 18, color: C.muted, fontSize: 12, lineHeight: 1.8 }}>
                            <li>In-App Purchase required for digital goods</li>
                            <li>Subscriptions rules</li>
                            <li>Reader apps</li>
                            <li>Anti-steering (weakened 2024)</li>
                            <li>External purchase links</li>
                        </ul>
                    </InfoCard>
                    <InfoCard color={C.purple} tag="4.x" title="Design" icon="🎨">
                        <ul style={{ margin: 0, paddingLeft: 18, color: C.muted, fontSize: 12, lineHeight: 1.8 }}>
                            <li>Copycats banned</li>
                            <li>Minimum functionality</li>
                            <li>Sign In With Apple required (if 3rd-party SSO)</li>
                            <li>Hardware-specific features</li>
                            <li>Extensions</li>
                        </ul>
                    </InfoCard>
                    <InfoCard color={C.accent} tag="5.x" title="Legal" icon="⚖️">
                        <ul style={{ margin: 0, paddingLeft: 18, color: C.muted, fontSize: 12, lineHeight: 1.8 }}>
                            <li>Privacy policy required</li>
                            <li>Data collection & storage</li>
                            <li>Intellectual property</li>
                            <li>Gambling & contests</li>
                            <li>VPN & CMS rules</li>
                        </ul>
                    </InfoCard>
                </div>

                <Reveal>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: C.text, marginBottom: 20 }}>
                        Three clauses you MUST know by name
                    </h3>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                    <InfoCard color={C.red} tag="2.1" title="App Completeness">
                        <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
                            “Apps should be <b>fully functional</b> with all URLs, logins, and non-obvious features explained.” The most common rejection reason. Always provide a <b>demo account</b>. Mark features requiring special hardware/conditions.
                        </p>
                    </InfoCard>
                    <InfoCard color={C.red} tag="3.1.1" title="In-App Purchase">
                        <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
                            “If you want to unlock features or functionality within your app, you must use <b>in-app purchase</b>.” Apple’s 30%/15% cut. The rule that triggered Epic vs Apple. Banking apps exempt — but financial UGC can still trip this.
                        </p>
                    </InfoCard>
                    <InfoCard color={C.red} tag="5.1.1" title="Data Collection & Storage">
                        <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
                            “Apps must secure user consent before collecting data, and provide information on what data is collected and how it’s used.” Privacy Manifest, Nutrition Labels, ATT prompt all enforce this. Misreporting data = instant rejection.
                        </p>
                    </InfoCard>
                </div>
            </div>
        </section>
    );
}
