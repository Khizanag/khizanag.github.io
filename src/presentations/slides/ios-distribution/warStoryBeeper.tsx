import { C, Reveal, SectionLabel, SectionHeading, CalloutBox } from "../../shared.tsx";
import { P, WarStoryHeader, TimelineRow, QuoteBlock } from "./ui.tsx";

export function WarStoryBeeperSection() {
    return (
        <section id="s-war-beeper" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.red}>WAR STORY #3</SectionLabel>
                    <SectionHeading sub="A 16-year-old reverse-engineered iMessage. What happened next became a US Senate hearing.">
                        Beeper Mini: 9 days in December 2023
                    </SectionHeading>
                </Reveal>

                <WarStoryHeader year="DEC 2023" app="Beeper Mini (Android iMessage client)" verdict="banned" color={C.red} />

                <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 16, padding: "32px 40px", marginBottom: 24 }}>
                    <TimelineRow when="Dec 5" title="Beeper Mini launches on Play Store" detail="A teenager (‘JJTech’) reverse-engineered Apple's APNs (push) protocol. Beeper packages it: Android users get real blue bubbles, end-to-end encryption, native iMessage. $2/month. 100K downloads in 48h." color={C.accent} delay={0} />
                    <TimelineRow when="Dec 8" title="Apple retaliates" detail="Apple pushes a server-side change to identify ‘unauthorized’ Apple ID usage. All Beeper Mini users simultaneously lose connection. Beeper posts a status page — ‘We know. We're working on it.’" color={C.red} delay={0.1} />
                    <TimelineRow when="Dec 11" title="Apple makes a public statement" detail="“We took steps to protect our users by blocking techniques that exploit fake credentials in order to gain access to iMessage.” Security framing, not competition framing." color={C.red} delay={0.2} />
                    <TimelineRow when="Dec 12" title="Beeper ships a workaround" detail="Switch from Mac serial-number registration to per-device Apple ID. Partially restored. Within 24h, Apple blocks that too." color={C.yellow} delay={0.3} />
                    <TimelineRow when="Dec 14" title="US Senators get involved" detail="Senator Elizabeth Warren, others, write to the DOJ: “Apple's actions appear to be anti-competitive.” Part of broader DOJ antitrust investigation already underway." color={P} delay={0.4} />
                    <TimelineRow when="Dec 19" title="Beeper gives up" detail="CEO Eric Migicovsky: “We have made the decision to stop pushing for interoperability.” Refunds issued. App maintained in zombie state until shutdown 3 months later." color={C.red} delay={0.5} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
                    <QuoteBlock
                        color={P}
                        quote="Apple crushed the best new iPhone app of 2023, built by a teenager, to protect a monopoly on blue bubbles."
                        author="Eric Migicovsky"
                        role="CEO, Beeper · Dec 19 shutdown post"
                    />
                    <QuoteBlock
                        color={C.red}
                        quote="These fake iMessages posed significant risks to user security and privacy, including the potential for metadata exposure and enabling unwanted messages, spam, and phishing attacks."
                        author="Apple statement"
                        role="Dec 11, 2023"
                    />
                </div>

                <CalloutBox color={P} icon="🎓" label="WHAT THIS TEACHES US">
                    Beeper Mini never broke a guideline — it was on Play Store, not App Store. The battle was <b>server-side</b>, not in App Review. Apple can and does use server infrastructure to enforce platform boundaries outside the guidelines. Lesson for us: if your app depends on reverse-engineered Apple services, assume a 9-day lifespan. This case is also cited in the 2024 US DOJ v. Apple monopoly lawsuit.
                </CalloutBox>
            </div>
        </section>
    );
}
