import { C, Reveal, SectionLabel, SectionHeading, FeatureCard, CalloutBox, PlainEnglishBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function MetadataAndAsoSection() {
    return (
        <section id="s-metadata" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>METADATA & ASO</SectionLabel>
                    <SectionHeading sub="The work that happens in ASC — not in Xcode. 50% of an app&rsquo;s first-week install conversion is decided by screenshots, title, and subtitle. Here&rsquo;s what most devs get wrong.">
                        App Store Optimization, without the SEO snake oil
                    </SectionHeading>
                </Reveal>

                <PlainEnglishBox color={P}>
                    App Store search is a <b>classical lexical + behavioral-ranking engine</b>. Apple indexes title, subtitle, keywords field, IAP names, and (to a lesser degree) developer name. Click-through rate and conversion on the listing feed ranking back. <b>Screenshots drive conversion; the keyword field drives impressions.</b>
                </PlainEnglishBox>

                {/* 4 fields */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginTop: 40, marginBottom: 16 }}>
                    The four text fields that actually matter
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 40 }}>
                    <FeatureCard icon="T" title="App Name (30 chars)" color={P} delay={0}
                        description="Indexed HEAVIEST. Localizable per App Store region. Apple is strict: NO keyword stuffing, NO &lsquo;Best 2026 Free&rsquo; suffixes. &lsquo;TBC&rsquo; passes, &lsquo;TBC — Best Banking Uzbekistan Online Payment&rsquo; rejects under 2.3.7." />
                    <FeatureCard icon="S" title="Subtitle (30 chars)" color={C.blue} delay={0.08}
                        description="Indexed strongly. Allowed to describe the app&rsquo;s function. Change per release up to once/week. This is the single biggest growth lever nobody uses. Localizable." />
                    <FeatureCard icon="K" title="Keywords field (100 chars)" color={C.purple} delay={0.16}
                        description="Invisible to users, indexed by App Store. Comma-separated, no spaces. DO NOT include the title (auto-indexed), competitor names (rejects), or plurals (indexed automatically). Localizable." />
                    <FeatureCard icon="D" title="Description (4000 chars)" color={C.accent} delay={0.24}
                        description="NOT indexed for search. Purely conversion copy. First 3 lines matter — rest is cut off on mobile. Changes require new version submission. DO include social proof, awards, press quotes." />
                </div>

                {/* Screenshots */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 16 }}>
                    Screenshot spec (2026)
                </div>
                <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", marginBottom: 32 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "200px 180px 1fr", gap: 16, padding: "8px 0", borderBottom: `1px solid ${C.border}`, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.muted, letterSpacing: "0.1em" }}>
                        <div>DEVICE</div><div>SIZE (PX)</div><div>NOTES</div>
                    </div>
                    {[
                        ["iPhone 6.9&Prime; (15/16 Pro Max)",  "1290 × 2796",  "Primary set. 3 screenshots mandatory, 10 max."],
                        ["iPhone 6.5&Prime; (X/XS/11 Pro/13 Pro Max)", "1242 × 2688",  "Can use the same 6.9&Prime; with black bars."],
                        ["iPhone 5.5&Prime; (6 Plus–8 Plus)",   "1242 × 2208",  "Still technically required for some older devices. Generate from 6.9&Prime;."],
                        ["iPad 13&Prime; (M2 Pro)",             "2064 × 2752",  "Required if you ship for iPad. Separate set."],
                        ["Apple Vision Pro",                    "3840 × 2160",  "If you ship visionOS. Required."],
                    ].map((row, i) => (
                        <div key={i} style={{
                            display: "grid", gridTemplateColumns: "200px 180px 1fr", gap: 16,
                            padding: "10px 0", borderBottom: i < 4 ? `1px solid ${C.border}` : "none",
                            alignItems: "center",
                        }}>
                            <div style={{ fontSize: 12, color: C.text }} dangerouslySetInnerHTML={{ __html: row[0] }} />
                            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: P }}>{row[1]}</div>
                            <div style={{ fontSize: 12, color: C.muted }} dangerouslySetInnerHTML={{ __html: row[2] }} />
                        </div>
                    ))}
                </div>

                {/* App Preview Video */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 16 }}>
                    App Preview Video — the single biggest conversion lever
                </div>
                <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", marginBottom: 32 }}>
                    <ul style={{ fontSize: 13, color: C.muted, lineHeight: 1.9, paddingLeft: 20, margin: 0 }}>
                        <li><b>Autoplays muted</b> on listing — first 3 seconds decide conversion.</li>
                        <li><b>15–30 seconds</b>, portrait, H.264 or HEVC.</li>
                        <li><b>Must be captured inside the app</b> (Apple scans for screen recordings vs motion graphics — fully animated ad-style intros often reject).</li>
                        <li><b>Three localized videos</b> per region allowed. Change per release.</li>
                        <li><b>Conversion uplift in TBC data: ~18%</b> for apps that add a preview video vs those with only screenshots.</li>
                    </ul>
                </div>

                {/* What&rsquo;s New */}
                <div style={{ marginBottom: 32 }}>
                    <CalloutBox color={C.yellow} icon="📝" label="‘WHAT&rsquo;S NEW’ — THE NEGLECTED FIELD">
                        4000 chars, new every release. <b>Most dev teams paste &lsquo;Bug fixes and improvements&rsquo;.</b> This is insane — users read this field to decide whether to update. Write in the user&rsquo;s voice: &lsquo;We fixed the login crash. Dark mode now works in card details. We listened to your feedback about X.&rsquo;
                    </CalloutBox>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    <CalloutBox color={C.accent} icon="🌍" label="LOCALIZATION IS ASO">
                        Each App Store locale is a separate search index. Russian + Uzbek metadata for TBC UZ doubled organic install volume in Q2 2024. DO localize: title, subtitle, keywords, description, screenshots, app preview. DO NOT just auto-translate — hire a native ASO writer per market.
                    </CalloutBox>
                    <CalloutBox color={C.red} icon="✕" label="COMMON REJECTIONS">
                        <b>2.3.7 Name/icon mismatch:</b> showing &lsquo;Beta&rsquo;, &lsquo;New!&rsquo;, keyword-stuffed titles. <b>2.3.3 Screenshot inaccurate:</b> screenshots show features not in-app. <b>5.2.4 Prominent 3rd-party brands:</b> &lsquo;Works with Google Pay&rsquo; in screenshots without Google permission.
                    </CalloutBox>
                </div>
            </div>
        </section>
    );
}
