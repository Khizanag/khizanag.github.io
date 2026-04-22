import { C, Reveal, SectionLabel, SectionHeading, FeatureCard, CalloutBox, PlainEnglishBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function InsideReviewRoomSection() {
    return (
        <section id="s-inside-review" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>INSIDE THE REVIEW ROOM</SectionLabel>
                    <SectionHeading sub="What actually happens between ‘Waiting for Review’ and ‘Approved’. Pieced together from Apple&rsquo;s 2021 Epic trial testimony, former reviewer interviews (Bloomberg 2022, The Information 2023), and public WWDC Labs.">
                        Who reviews your app — and how
                    </SectionHeading>
                </Reveal>

                <PlainEnglishBox color={P}>
                    The App Review team is <b>~500 full-time humans</b> plus a growing ML triage layer. They reject ~36% of first submissions. Average reviewer handles <b>50–100 apps / day</b>. Do the math: each reviewer has <b>5–10 minutes</b> for your app.
                </PlainEnglishBox>

                {/* Tools */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginTop: 40, marginBottom: 16 }}>
                    What reviewers actually use
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
                    <FeatureCard icon="📱" title="iPad with dev build installed" color={C.blue} delay={0}
                        description="iPad Pro running internal-only iOS build. Special &lsquo;Reviewer Mode&rsquo; exposes entitlement diff, API usage dump, network flows. They see what your app TRIES to do, not just what it does visibly." />
                    <FeatureCard icon="🔍" title="Static + dynamic binary scanner" color={C.purple} delay={0.08}
                        description="Scans for private API symbol references, suspicious string constants (‘jailbreak’, ‘obf’, base64-encoded URLs), reflection patterns. Triggers automatic 2.5.1 / 2.5.2 flags BEFORE a human sees it." />
                    <FeatureCard icon="📊" title="Reviewer Portal" color={C.accent} delay={0.16}
                        description="Apple-internal version of ASC. Shows history of previous submissions, developer response time, past rejections, cross-app behavior of same team. Your account has a &lsquo;trust score&rsquo;." />
                </div>

                {/* Process */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginTop: 8, marginBottom: 16 }}>
                    Review flow — the 5 stages
                </div>
                <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px 28px", marginBottom: 32 }}>
                    {[
                        { n: "0", t: "Upload",              d: "Bitrise → ASC. Metadata freeze. Asset catalog checksums logged.", c: P },
                        { n: "1", t: "ML pre-triage",       d: "Autoscanner tags: suspicious APIs, obvious policy flags, metadata mismatches. ~30% auto-rejected here without human review.", c: C.blue },
                        { n: "2", t: "Human reviewer (~7 min)", d: "Reviewer pulls reviewer-notes, test credentials, video preview. Launches app on their iPad. Runs common flows. Checks screenshots match reality.", c: C.purple },
                        { n: "3", t: "Policy flags",        d: "If reviewer uncertain, escalate to senior reviewer or policy specialist. 10% of reviews bounce here.", c: C.yellow },
                        { n: "4", t: "Decision",            d: "Approve / Reject / Metadata Rejection (quickest — just copy change). Response fires webhook to your ASC.", c: C.accent },
                    ].map((s, i) => (
                        <div key={s.n} style={{
                            display: "grid", gridTemplateColumns: "40px 200px 1fr",
                            gap: 16, padding: "10px 0",
                            borderBottom: i < 4 ? `1px solid ${C.border}` : "none",
                            alignItems: "center",
                        }}>
                            <div style={{
                                fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                                color: s.c, background: `${s.c}14`, border: `1px solid ${s.c}40`,
                                borderRadius: 6, padding: "4px 8px", textAlign: "center", fontWeight: 700,
                            }}>{s.n}</div>
                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: C.text }}>{s.t}</div>
                            <div style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>{s.d}</div>
                        </div>
                    ))}
                </div>

                {/* Geography */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 16 }}>
                    Where reviewers sit
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
                    <FeatureCard icon="🇺🇸" title="Sunnyvale, CA" color={P} delay={0}
                        description="HQ team. English-language apps, US-market reviews, policy precedent decisions. App Review Board (appeals) sits here." />
                    <FeatureCard icon="🇮🇪" title="Cork, Ireland" color={C.blue} delay={0.08}
                        description="EU-market reviews, DMA compliance, GDPR-sensitive submissions. Localization for French/German/Spanish apps." />
                    <FeatureCard icon="🇨🇳" title="Shanghai + Shenzhen" color={C.yellow} delay={0.16}
                        description="Chinese + broader APAC apps. Separate team covering China-specific rules (ICP filings, content censorship, real-name verification)." />
                </div>

                {/* Appeals */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    <CalloutBox color={C.accent} icon="⚖" label="APP REVIEW BOARD (APPEALS)">
                        The formal appeal path: ASC → Resolution Center → &lsquo;Appeal&rsquo;. Goes to a 5-person senior panel in Sunnyvale. Takes 5–15 business days. Reversal rate: <b>~24%</b> (Apple internal, leaked 2021). &lsquo;My app is similar to X which is approved&rsquo; is <i>not</i> a winning argument; &lsquo;the guideline doesn&rsquo;t technically apply because Y&rsquo; is.
                    </CalloutBox>
                    <CalloutBox color={C.red} icon="🗣" label="WHEN TO EMAIL tim@apple.com">
                        Only for genuine policy injustice that&rsquo;s already been through Resolution Center + Appeal. DHH (Hey), Epic, Spotify, Meta have all done this publicly. &lsquo;Quiet tim@&rsquo; reaches an exec escalation team that can override App Review. Expect a 48h silence, then either a firm &lsquo;no&rsquo; or a sudden &lsquo;approved&rsquo; with no explanation.
                    </CalloutBox>
                </div>
            </div>
        </section>
    );
}
