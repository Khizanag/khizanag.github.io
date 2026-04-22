import { C, Reveal, SectionLabel, SectionHeading, CalloutBox, CodeBlock, PlainEnglishBox, FeatureCard } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function CodeSigningMechanicsSection() {
    return (
        <section id="s-signing-deep" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>CODE SIGNING — UNDER THE HOOD</SectionLabel>
                    <SectionHeading sub="Most engineers know ‘Automatically manage signing’ works. Few know what&rsquo;s actually inside the .ipa. Here&rsquo;s the layer nobody shows you.">
                        How the kernel decides to let your app run
                    </SectionHeading>
                </Reveal>

                <PlainEnglishBox color={P}>
                    Code signing is <b>not</b> encryption. It&rsquo;s a chain of cryptographic signatures glued to your binary that the iOS kernel checks at every launch. If any link breaks, <code>codesign</code> aborts the process before <code>main()</code> runs. No error UI. App just won&rsquo;t open.
                </PlainEnglishBox>

                {/* The chain */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginTop: 40, marginBottom: 16 }}>
                    The trust chain — 4 certs deep
                </div>
                <CodeBlock filename="the chain every signed binary carries">{`Apple Root CA (built into iOS ROM)
        └── Apple Worldwide Developer Relations CA
                └── Your Developer ID / Distribution Certificate
                        └── The signature over your binary &amp; resources

Break ANY link and the kernel refuses:
  • Root CA compromised  → Apple ships an iOS update
  • WWDR CA expired      → happened Jan 14 2016. Every app signed that day
                            refused to launch worldwide until Xcode was patched
  • Your cert revoked    → Apple killed Facebook Research in 2019 this way
  • Signature tampered   → single byte change in binary = kernel refuses`}</CodeBlock>

                {/* What's actually inside the bundle */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginTop: 40, marginBottom: 16 }}>
                    What&rsquo;s actually inside a signed <code>.app</code>
                </div>
                <CodeBlock filename="MyApp.app/_CodeSignature/CodeResources">{`&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;plist version="1.0"&gt;
&lt;dict&gt;
    &lt;key&gt;files2&lt;/key&gt;
    &lt;dict&gt;
        &lt;key&gt;Assets.car&lt;/key&gt;
        &lt;dict&gt;
            &lt;key&gt;hash2&lt;/key&gt;      ← SHA-256 of Assets.car
            &lt;data&gt;Wc5j2MA...=&lt;/data&gt;
        &lt;/dict&gt;
        &lt;key&gt;Info.plist&lt;/key&gt;
        &lt;dict&gt;&lt;key&gt;hash2&lt;/key&gt;&lt;data&gt;Kd8=...&lt;/data&gt;&lt;/dict&gt;
        ...
    &lt;/dict&gt;
&lt;/dict&gt;
&lt;/plist&gt;

# Every single resource file hashed + signed. Change an asset,
# signature breaks. This is why post-build resource replacement
# (re-signing with a different IDE) must re-hash every file.`}</CodeBlock>

                {/* Slot hashes */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginTop: 40, marginBottom: 16 }}>
                    CodeDirectory slot hashes — what <code>codesign -dvvv</code> shows you
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
                    <FeatureCard icon="-7" title="Entitlements slot" color={P} delay={0}
                        description="Hash of your entitlements plist. Kernel cross-checks against embedded.mobileprovision at launch — mismatch = refused." />
                    <FeatureCard icon="-5" title="Resource dir slot" color={C.blue} delay={0.06}
                        description="Hash of _CodeSignature/CodeResources (which itself hashes every resource). Single pixel change in a PNG = broken." />
                    <FeatureCard icon="-4" title="App-specific slot" color={C.purple} delay={0.12}
                        description="Hash of Info.plist. Changing CFBundleVersion post-sign = invalid signature." />
                    <FeatureCard icon="-3" title="Requirements slot" color={C.yellow} delay={0.18}
                        description="Signing requirements expression (team ID, cert validity period). Runtime re-evaluated — expired cert mid-launch = terminated." />
                </div>

                {/* Notarization vs signing */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginTop: 8, marginBottom: 16 }}>
                    Signing ≠ notarization (iOS post-DMA, macOS always)
                </div>
                <CodeBlock filename="the two steps, as of iOS 17.4+ in EU">{`# 1. SIGN (you, locally, with your cert)
$ codesign --force --sign "Apple Distribution: TBC" \\
    --entitlements TBC.entitlements \\
    --timestamp MyApp.app
→ attaches YOUR signature

# 2. NOTARIZE (Apple, remotely)
$ xcrun notarytool submit MyApp.ipa --apple-id x --team-id Y --wait
→ Apple scans binary for known malware signatures
→ Returns stapled ticket, attached to the .ipa
→ Only then iOS will install it outside App Store (EU marketplaces)

# Notarization is AUTOMATIC inside App Store submission.
# It's EXPLICIT when shipping via alternative marketplaces.`}</CodeBlock>

                <div style={{ marginTop: 32 }}>
                    <CalloutBox color={C.red} icon="💣" label="WWDR CERT EXPIRY — 14 JAN 2016">
                        The <b>Apple Worldwide Developer Relations CA</b> expired on a Thursday at 02:00 UTC. Every App Store app signed with it, worldwide, refused to launch. Apple pushed a WWDR-G2 cert inside an iOS hotfix <i>and</i> a Keychain Access update within 6 hours. Lesson: <b>cert chain validity is a ticking clock; you don&rsquo;t own the clock.</b>
                    </CalloutBox>
                </div>
            </div>
        </section>
    );
}
