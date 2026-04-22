import { C, Reveal, SectionLabel, SectionHeading, FeatureCard, CalloutBox, PlainEnglishBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

const MDM_VENDORS = [
    { name: "Jamf Pro",         share: "~40%", note: "Enterprise standard. Mac + iOS. Strong Apple relationship. Expensive per-device." },
    { name: "Microsoft Intune", share: "~25%", note: "Bundled with M365 E3/E5. Default in Microsoft shops. Weaker iOS features than Jamf." },
    { name: "Kandji",           share: "~10%", note: "Modern, Apple-only, strong on DDM + declarative config. Popular with smaller tech cos." },
    { name: "Mosyle",           share: "~10%", note: "Education + SMB. Aggressive pricing. Growing in MDM-for-apps niche." },
    { name: "VMware Workspace ONE", share: "~8%", note: "Legacy AirWatch. Large banks / government. Heavy on-prem." },
];

export function EnterpriseMdmSection() {
    return (
        <section id="s-enterprise" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>ENTERPRISE & INTERNAL DISTRIBUTION</SectionLabel>
                    <SectionHeading sub="The channel that lets you skip App Review entirely — and the one Apple most aggressively polices. How to stay on the right side of it.">
                        Apple Developer Enterprise & MDM
                    </SectionHeading>
                </Reveal>

                {/* Enterprise program */}
                <div style={{ marginBottom: 40 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 16 }}>
                        Apple Developer Enterprise Program (ADEP)
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 20 }}>
                        <FeatureCard icon="💰" title="$299/yr" color={P} delay={0}
                            description="10× the standard Developer Program ($99). Requires a D-U-N-S number, 100+ employees, and intent verified by Apple. Approval typically takes 3–6 weeks." />
                        <FeatureCard icon="🏢" title="Internal-only" color={C.yellow} delay={0.08}
                            description="Apps built with an Enterprise cert may be distributed ONLY to YOUR EMPLOYEES. Never to customers, never to partners, never in any public channel." />
                        <FeatureCard icon="💣" title="One revocation = instant death" color={C.red} delay={0.16}
                            description="If Apple finds your Enterprise cert used for public apps, they revoke the cert. Every app signed by it stops launching on every device globally within hours." />
                    </div>
                    <PlainEnglishBox color={P}>
                        Think of it as &ldquo;an App Store for your own company.&rdquo; The moment you distribute to anyone outside payroll, Apple can (and has) killed entire companies overnight. Famously: Facebook Research (Jan 2019), Google&rsquo;s own data-collection apps (same week), multiple gambling rings in 2015 + 2023.
                    </PlainEnglishBox>
                </div>

                {/* MDM */}
                <div style={{ marginBottom: 40 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 16 }}>
                        Mobile Device Management (MDM) — the delivery vehicle
                    </div>
                    <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 20 }}>
                        MDM is the standard iOS enrollment framework Apple ships. Every company-owned iPhone ever handed out is enrolled in some MDM. The MDM server is what actually installs your Enterprise-signed (or App Store / VPP) app silently, without the user tapping &ldquo;Install&rdquo;.
                    </p>
                    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px" }}>
                        <div style={{
                            display: "grid", gridTemplateColumns: "160px 80px 1fr",
                            gap: 20, padding: "8px 0", borderBottom: `1px solid ${C.border}`,
                            fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                            color: C.muted, letterSpacing: "0.1em",
                        }}>
                            <div>VENDOR</div>
                            <div>SHARE</div>
                            <div>CHARACTER</div>
                        </div>
                        {MDM_VENDORS.map((v) => (
                            <div key={v.name} style={{
                                display: "grid", gridTemplateColumns: "160px 80px 1fr",
                                gap: 20, padding: "12px 0", borderBottom: `1px solid ${C.border}`,
                                alignItems: "center",
                            }}>
                                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: C.text }}>
                                    {v.name}
                                </div>
                                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: P }}>
                                    {v.share}
                                </div>
                                <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>
                                    {v.note}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3 ways */}
                <div style={{ marginBottom: 40 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 16 }}>
                        Three legitimate ways to ship an internal app
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                        <FeatureCard icon="🅰️" title="ADEP + MDM" color={C.red} delay={0}
                            description="Classic Enterprise cert, .ipa pushed via MDM. No App Review. Fastest iteration. Hardest to defend — any leak of the .ipa to an external device triggers revocation." />
                        <FeatureCard icon="🅱️" title="Apple Business Manager + Custom Apps" color={C.accent} delay={0.08}
                            description="App IS reviewed by Apple but with an audience = your org only. No public listing. Can be free or paid. <b>This is the modern recommended path</b>. SpaceInt uses this for 2 internal tools." />
                        <FeatureCard icon="🅲" title="Unlisted App Store" color={C.yellow} delay={0.16}
                            description="Normal App Store review, but NOT searchable. Shareable only via a direct link. No MDM required. Since 2022. Good fit for closed-beta or partner-only apps." />
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    <CalloutBox color={C.red} icon="💣" label="REVOCATION HISTORIC LIST">
                        <b>Feb 2015:</b> Chinese gambling ring killed. <b>Jan 2019:</b> Facebook Research + Google internal apps both revoked same week for off-payroll distribution. <b>Oct 2019:</b> Multiple porn apps distributing via fake enterprise certs. <b>2022:</b> Tencent-adjacent enterprise cert used for unauthorized WeChat mods — revoked.
                    </CalloutBox>
                    <CalloutBox color={C.accent} icon="🏦" label="TBC UZ PRACTICE">
                        We do NOT use ADEP. Internal apps ship via <b>Apple Business Manager + Custom Apps</b> (reviewed, but org-only distribution). This costs us ~1 week of review on first submission but gives zero revocation risk. MDM stack: <b>Jamf Pro</b> for corporate iPads used in branches. TestFlight covers the &lsquo;employee early access&rsquo; use case — no Enterprise needed.
                    </CalloutBox>
                </div>
            </div>
        </section>
    );
}
