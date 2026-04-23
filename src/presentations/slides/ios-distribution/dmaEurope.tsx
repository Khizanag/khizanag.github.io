import { C, Reveal, SectionLabel, SectionHeading, FeatureCard, CalloutBox, PlainEnglishBox, CodeBlock } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function DmaEuropeSection() {
    return (
        <section id="s-dma" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>EU DMA & ALTERNATIVE DISTRIBUTION</SectionLabel>
                    <SectionHeading sub="The single biggest distribution change since 2008. Live since iOS 17.4 in the EU (March 2024). Here&rsquo;s the senior-level summary — what it means today, what&rsquo;s still changing.">
                        The Digital Markets Act, in practice
                    </SectionHeading>
                </Reveal>

                <PlainEnglishBox color={P}>
                    The EU Digital Markets Act designated Apple a &lsquo;gatekeeper&rsquo; in 2023. Since iOS 17.4 (March 2024): <b>alternative marketplaces are legal in the EU</b>, apps can use <b>3rd-party browser engines</b>, and developers can use <b>3rd-party payment systems</b>. But Apple added a <b>Core Technology Fee</b> that makes economics complex.
                </PlainEnglishBox>

                {/* Three new things */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginTop: 40, marginBottom: 16 }}>
                    Three new distribution paths (EU only, so far)
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
                    <FeatureCard icon="🏪" title="Alternative Marketplaces" color={C.blue} delay={0}
                        description="AltStore PAL (launched Apr 2024), Setapp Mobile, Epic Games Store (arriving 2024). Users enable &lsquo;Install from this source&rsquo; in Settings. Marketplace signs + delivers the .ipa. Apple still notarizes (malware scan)." />
                    <FeatureCard icon="🌐" title="Web Distribution" color={C.purple} delay={0.08}
                        description="Since iOS 17.5 (May 2024): ship directly from YOUR website. No marketplace needed. User taps link → install dialog. Requires €1M/yr Apple trust threshold. Still Apple-notarized." />
                    <FeatureCard icon="💳" title="Alt Payment / Steering" color={C.accent} delay={0.16}
                        description="Use your own payment processor OR link to external webpage. Apple lowers commission to 17% + 3% (if via StoreKit External Purchase Link) OR 0% commission but 5 EUR CTF per install over 1M." />
                </div>

                {/* Core Tech Fee */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 16 }}>
                    The Core Technology Fee (CTF) — Apple&rsquo;s counter-move
                </div>
                <CodeBlock filename="CTF rules (as of April 2026)">{`# Per first install per year, for apps on the new EU business terms:
€0.50 per install over 1,000,000 / year / app

# Example: free-to-play game with 5M installs/year in EU
# Under old terms: 0 EUR (IAP-only revenue → 30%)
# Under DMA terms: 4,000,000 * €0.50 = €2,000,000 / year in CTF
# PLUS any commission on in-app purchases = PROHIBITIVE for free apps

# The strategic choice every EU dev makes:
1. Stay on "old" App Store terms: 30%/15% commission, no CTF, no alt marketplaces
2. Opt into "new" DMA terms: 17%/10% commission + CTF + access to alt paths

# Once you opt IN you CANNOT opt out. Spotify, Epic, AltStore opted in.
# Most mid-size devs stayed on old terms to avoid the CTF cliff.`}</CodeBlock>

                {/* Notarization stays */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginTop: 40, marginBottom: 16 }}>
                    What Apple still controls
                </div>
                <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", marginBottom: 32 }}>
                    <ul style={{ fontSize: 13, color: C.muted, lineHeight: 1.9, paddingLeft: 20, margin: 0 }}>
                        <li><b>Notarization.</b> Every non-App-Store app must still pass Apple&rsquo;s automated malware scan. Apple can still refuse binaries.</li>
                        <li><b>Entitlements + capabilities.</b> Still need Apple&rsquo;s sign-off for restricted entitlements even on alt marketplaces.</li>
                        <li><b>Revocation power.</b> Apple can revoke the developer account at any time, which kills apps everywhere (not just App Store).</li>
                        <li><b>Geographic restriction.</b> Alt marketplaces only work on EU-Apple-ID devices <i>located in EU</i>. Leave EU for 30 days → cannot install new alt-marketplace apps.</li>
                        <li><b>Minors.</b> Age-restricted content / gambling apps still barred under local laws; Apple enforces.</li>
                    </ul>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    <CalloutBox color={C.accent} icon="✓" label="WHO WENT FIRST">
                        <b>AltStore PAL</b> — launched April 2024 by Delta emulator maker. Free + paid tiers. <b>Epic Games Store</b> — iOS version launched summer 2024 with Fortnite return. <b>Setapp Mobile</b> — Mac subscription bundle extended to iOS. <b>Spotify</b> — uses External Purchase Link (stays on App Store). Most indie devs stayed put.
                    </CalloutBox>
                    <CalloutBox color={C.red} icon="⚠" label="WATCH THIS SPACE">
                        The EU Commission is <b>actively investigating</b> Apple&rsquo;s DMA compliance (opened March 2024). Core Technology Fee legality under challenge. Watch for: <b>extension to UK</b> (DMCC Act 2024), <b>US DOJ antitrust case</b> (filed March 2024) forcing similar rules. Rules of 2026 won&rsquo;t be rules of 2027.
                    </CalloutBox>
                </div>
            </div>
        </section>
    );
}
