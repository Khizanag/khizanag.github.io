import { C, Reveal, SectionLabel, SectionHeading, FeatureCard, CalloutBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function FutureSection() {
    return (
        <section id="s-future" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>WHAT&rsquo;S COMING</SectionLabel>
                    <SectionHeading sub="Four forces currently rewriting the App Store rulebook. All will hit our release flow within 2 years.">
                        The next 24 months
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 32 }}>
                    <FeatureCard
                        icon="🇪🇺"
                        title="EU Digital Markets Act (DMA)"
                        color={P}
                        delay={0}
                        description="Since March 2024: alternative app stores in EU. Alternative payment processors. Browser engine choice (WebKit is no longer mandatory). Apple charges a Core Technology Fee (&euro;0.50/install over 1M). Pressure is building on Apple to extend these rights globally &mdash; UK CMA and US DOJ have similar cases pending."
                        note="Our TBC UZ app is not currently listed in EU, but DMA precedent will bleed into global policy."
                    />
                    <FeatureCard
                        icon="🏛"
                        title="US DOJ v. Apple (March 2024)"
                        color={C.red}
                        delay={0.08}
                        description="The largest US antitrust case against Apple. Charges: super apps, streaming game bans, smartwatch lock-in, messaging lock-in (Beeper cited), digital wallet tap-to-pay. Trial likely 2026&ndash;2027. If Apple loses &mdash; sideloading in the US, interoperability requirements, possible break-up of App Store from hardware. Multi-year shift."
                        note="Even if Apple settles, the remedies will change what's possible on iOS."
                    />
                    <FeatureCard
                        icon="🤖"
                        title="AI apps &amp; new guidelines"
                        color={C.purple}
                        delay={0.16}
                        description="Guideline 4.7 now explicitly covers generative AI. Apps must surface content moderation, prevent CSAM, label AI-generated content, give users the ability to report. New Guideline 4.3 also targets 'AI app template' spam &mdash; the Wordle effect applied to GPT wrappers."
                        note="We'll see this first in support-chat features. Expect guideline evolution every 6 months."
                    />
                    <FeatureCard
                        icon="👓"
                        title="visionOS, App Intents, Apple Intelligence"
                        color={C.accent}
                        delay={0.24}
                        description="New platform review bar for Vision Pro (currently ~95% rejection for iPad-compat apps that don't adapt). App Intents now REQUIRED to be discoverable by Siri &amp; Apple Intelligence &mdash; apps without them deprioritized in Spotlight, Shortcuts, and AI-driven flows. Major refactor in 2025&ndash;2026."
                        note="This is why we're prioritizing App Intents in the Loan and PFM modules."
                    />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    <CalloutBox color={P} icon="📈" label="WHAT TO WATCH FOR">
                        <b>Q3 2026:</b> US DOJ case first ruling. <br />
                        <b>Q4 2026:</b> EU DMA anniversary &mdash; Apple may face fines if compliance is deemed insufficient. <br />
                        <b>Ongoing:</b> WWDC each June introduces 5&ndash;20 new guidelines. <br />
                        <b>2027+:</b> Possible US sideloading mandate.
                    </CalloutBox>
                    <CalloutBox color={C.yellow} icon="🧭" label="HOW WE STAY AHEAD">
                        <b>1.</b> Subscribe to <code style={{ color: C.yellow, background: `${C.yellow}15`, padding: "1px 6px", borderRadius: 4, fontSize: 12 }}>developer.apple.com/news</code> RSS. <br />
                        <b>2.</b> Read WWDC &lsquo;What&rsquo;s new in App Store Connect&rsquo; every year. <br />
                        <b>3.</b> Keep Privacy Manifest / entitlements up to date per release. <br />
                        <b>4.</b> Follow antitrust cases via The Verge, 9to5Mac, AppleInsider.
                    </CalloutBox>
                </div>
            </div>
        </section>
    );
}
