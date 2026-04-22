import { C, Reveal, SectionLabel, SectionHeading, InfoCard, PlainEnglishBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function EcosystemSection() {
    return (
        <section id="s-ecosystem" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>THE ECOSYSTEM</SectionLabel>
                    <SectionHeading sub="Three types of Apple Developer accounts. Pick wrong and you block your own release.">
                        Developer Programs & Roles
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 48 }}>
                    <InfoCard color={P} tag="$99 / YEAR" title="Apple Developer Program">
                        <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.7, marginBottom: 14 }}>
                            Ships to the public App Store. TestFlight up to 10,000 external testers. Personal or company.
                        </p>
                        <PlainEnglishBox color={P}>
                            What 99% of apps use. What TBC UZ uses. What you’ll use for your side project.
                        </PlainEnglishBox>
                    </InfoCard>

                    <InfoCard color={C.purple} tag="$299 / YEAR" title="Apple Developer Enterprise">
                        <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.7, marginBottom: 14 }}>
                            In-house distribution only. No App Store. 100+ employee requirement. Revocable by Apple at any time.
                        </p>
                        <PlainEnglishBox color={C.purple}>
                            Internal tools only. Getting harder to qualify for — Apple cracked down after Facebook and Google abused it in 2019.
                        </PlainEnglishBox>
                    </InfoCard>

                    <InfoCard color={C.yellow} tag="FREE" title="Personal / Free Account">
                        <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.7, marginBottom: 14 }}>
                            Install on your own devices only. 7-day provisioning expiry. 3 apps max. No TestFlight, no App Store.
                        </p>
                        <PlainEnglishBox color={C.yellow}>
                            What you get with a free Apple ID. Rebuild the app every week. Good for learning.
                        </PlainEnglishBox>
                    </InfoCard>
                </div>

                <Reveal>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: C.text, marginBottom: 20 }}>
                        App Store Connect Roles
                    </h3>
                </Reveal>

                <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
                    {[
                        { role: "Account Holder",    scope: "One per team. Legal owner. Only one who can renew the $99, transfer apps, or close the account.", color: C.red },
                        { role: "Admin",             scope: "Invite/remove users, manage finance, submit builds for review, release to public.", color: C.yellow },
                        { role: "App Manager",       scope: "Submit builds, manage TestFlight, respond to reviews. Scoped per-app. Most developer-friendly default.", color: P },
                        { role: "Developer",         scope: "Upload builds via Xcode/CI. Can view but not edit most App Store metadata. Default for CI service accounts.", color: C.purple },
                        { role: "Marketing",         scope: "Edit App Store page (screenshots, description, keywords, promo text). Cannot submit or upload.", color: C.blue },
                        { role: "Sales / Finance",   scope: "Read-only access to reports. Tax, banking, revenue numbers.", color: C.accent },
                        { role: "Customer Support",  scope: "Respond to user reviews. Nothing else.", color: C.muted },
                    ].map((row, i, arr) => (
                        <div
                            key={row.role}
                            style={{
                                display: "grid", gridTemplateColumns: "220px 1fr", alignItems: "center",
                                padding: "14px 20px", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{ width: 6, height: 6, borderRadius: "50%", background: row.color }} />
                                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: C.text }}>
                                    {row.role}
                                </span>
                            </div>
                            <span style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{row.scope}</span>
                        </div>
                    ))}
                </div>

                <div style={{
                    marginTop: 24, padding: "16px 20px", background: `${C.red}08`,
                    border: `1px solid ${C.red}25`, borderLeft: `3px solid ${C.red}`,
                    borderRadius: 8, fontSize: 13, color: C.muted,
                }}>
                    <b style={{ color: C.red }}>⚠ Principle of Least Privilege:</b> Give CI service accounts the <b>Developer</b> role, not Admin. Compromised CI token shouldn’t be able to transfer your app to someone else.
                </div>
            </div>
        </section>
    );
}
