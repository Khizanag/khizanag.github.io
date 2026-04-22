import { C, Reveal, SectionLabel, SectionHeading, CalloutBox } from "../../shared.tsx";
import { P, WarStoryHeader, TimelineRow, QuoteBlock } from "./ui.tsx";

export function WarStoryEpicSection() {
    return (
        <section id="s-war-epic" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.red}>WAR STORY #2</SectionLabel>
                    <SectionHeading sub="The most expensive lawsuit in App Store history. Still reverberating today.">
                        Epic v. Apple: the Fortnite saga
                    </SectionHeading>
                </Reveal>

                <WarStoryHeader year="AUG 2020 &ndash; 2024" app="Fortnite / Epic Games Store" verdict="ongoing" color={C.red} />

                <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "32px 40px", marginBottom: 24 }}>
                    <TimelineRow when="Aug 13 2020" title="&lsquo;Fortnite Mega Drop&rsquo; update" detail="Epic hides a feature behind a server toggle: a direct-payment option for V-Bucks at 20% discount, bypassing Apple's IAP. They flip the switch without telling Apple." color={C.red} delay={0} />
                    <TimelineRow when="Same day, hours later" title="Apple removes Fortnite from the App Store" detail="Guideline 3.1.1 violation. Epic had pre-filmed a parody of Apple's 1984 ad (&lsquo;Nineteen Eighty-Fortnite&rsquo;), releases it within 2 hours, and simultaneously files a lawsuit." color={C.red} delay={0.1} />
                    <TimelineRow when="Aug 17 2020" title="Apple terminates Epic's developer account" detail="Not just Fortnite &mdash; all of Epic's apps, plus any future submissions. Epic files injunction. Judge rules Apple can remove Fortnite but CANNOT terminate Unreal Engine's account (third-party developers depend on it)." color={C.yellow} delay={0.2} />
                    <TimelineRow when="May 2021" title="3-week trial in Oakland" detail="Discovery reveals: Apple's App Store ran at a 75%+ operating margin. Internal emails showed Apple considered cutting the 30% fee in 2011 but chose not to. Reviewer 'Eric Friedman' testifies App Review is like &ldquo;the pretty lady who greets you... not the CSI.&rdquo;" color={P} delay={0.3} />
                    <TimelineRow when="Sep 2021" title="Ruling: mostly a loss for Epic" detail="Judge Gonzalez Rogers: Apple is NOT a monopolist. But the anti-steering rule (banning apps from mentioning other payment methods) violates California UCL. Apple ordered to allow external purchase links." color={C.yellow} delay={0.4} />
                    <TimelineRow when="Jan 2024" title="Supreme Court refuses to hear appeals" detail="Ruling stands. Apple rolls out external-link entitlement in US: apps can link to web checkout &mdash; but still owes Apple a commission on resulting purchases." color={C.purple} delay={0.5} />
                    <TimelineRow when="Mar 2024" title="Epic Games Store on iOS (EU)" detail="Under EU Digital Markets Act, Epic launches its own iOS store &mdash; Fortnite returns to iOS after 4 years. Only in EU. Rest of world still blocked." color={C.accent} delay={0.6} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
                    <QuoteBlock
                        color={C.red}
                        quote="Apple has become what it once railed against: the behemoth seeking to control markets, block competition, and stifle innovation."
                        author="Tim Sweeney"
                        role="CEO, Epic Games · 2020 lawsuit filing"
                    />
                    <QuoteBlock
                        color={P}
                        quote="Epic is not seeking a better deal for Epic. Epic is seeking a better deal for developers."
                        author="Apple counter-filing"
                        role="Aug 2020 &mdash; widely mocked"
                    />
                </div>

                <CalloutBox color={P} icon="🎓" label="WHAT THIS TEACHES US">
                    Epic engineered the conflict &mdash; parody ad, prepared press kit, lawsuit ready &mdash; because they wanted the precedent. Result: <b>external payment links</b> in the US (2024), <b>alternative App Stores</b> in the EU (2024), and every antitrust lawsuit since cites this ruling. But Fortnite&rsquo;s iOS userbase never came back, and Epic lost ~$1B in revenue during the ban.
                </CalloutBox>
            </div>
        </section>
    );
}
