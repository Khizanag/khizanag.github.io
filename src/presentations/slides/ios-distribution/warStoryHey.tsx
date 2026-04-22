import { C, Reveal, SectionLabel, SectionHeading, CalloutBox } from "../../shared.tsx";
import { P, WarStoryHeader, TimelineRow, QuoteBlock } from "./ui.tsx";

export function WarStoryHeySection() {
    return (
        <section id="s-war-hey" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.red}>WAR STORY #1</SectionLabel>
                    <SectionHeading sub="The week in June 2020 when one email app shook Apple's entire App Store business model.">
                        HEY Email vs. Apple
                    </SectionHeading>
                </Reveal>

                <WarStoryHeader year="JUN 2020" app="HEY by Basecamp · $99/year email" verdict="resolved" color={C.red} />

                <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 16, padding: "32px 40px", marginBottom: 24 }}>
                    <TimelineRow when="Jun 15" title="v1.0 approved, released to App Store" detail="HEY ships. You pay $99/yr on hey.com; you sign in on iOS. Standard SaaS pattern — the same as Netflix, Dropbox, Basecamp's own flagship." color={P} delay={0} />
                    <TimelineRow when="Jun 16" title="v1.0.1 bug-fix submitted" detail="Apple rejects under Guideline 3.1.1 — &lsquo;app must use IAP to unlock features.&rsquo; Basecamp points out that they've been following this exact pattern for 8 years with Basecamp." color={C.yellow} delay={0.1} />
                    <TimelineRow when="Jun 18" title="DHH goes public on Twitter" detail="&ldquo;Apple just doubled down on their rejection of HEY's ability to provide bug fixes and new features.&rdquo; Thread goes viral. DHH coins &lsquo;Apple's highway robbery.&rsquo;" color={C.red} delay={0.2} />
                    <TimelineRow when="Jun 19" title="Apple doubles down" detail="Phil Schiller gives an interview: &ldquo;We're proud of the review process.&rdquo; Reviewer calls Basecamp: &lsquo;You can stay if you add IAP.&rsquo;" color={C.red} delay={0.3} />
                    <TimelineRow when="Jun 22" title="WWDC 2020 keynote" detail="Apple announces App Review changes: can't block bug fixes over guideline disputes. Appeals process formalized. Clearly a direct response." color={C.yellow} delay={0.4} />
                    <TimelineRow when="Jun 26" title="Resolution: &lsquo;free trial&rsquo; version" detail="Basecamp adds a 14-day free trial inside the app. No IAP, but enough in-app functionality to clear Guideline 2.1. Apple approves. HEY ships." color={C.accent} delay={0.5} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
                    <QuoteBlock
                        color={C.red}
                        quote="Apple is squatting at an online tollbooth and charging $0.30 on every dollar of online commerce."
                        author="David Heinemeier Hansson"
                        role="Co-founder, Basecamp"
                    />
                    <QuoteBlock
                        color={P}
                        quote="We do not consider email apps or any other productivity apps to fall under this umbrella [of requiring IAP]."
                        author="Apple spokesperson"
                        role="Post-resolution statement, 2020"
                    />
                </div>

                <CalloutBox color={P} icon="🎓" label="WHAT THIS TEACHES US">
                    <b>Apple reversed a guideline interpretation under public pressure.</b> Consequences: (1) bug-fix rejections restricted, (2) &lsquo;Reader app&rsquo; rules formalized in 2021 &mdash; now covers Netflix, Spotify, and yes, banking apps like ours, (3) direct trigger for every &lsquo;30% tax&rsquo; conversation that followed, including Epic and EU DMA.
                </CalloutBox>
            </div>
        </section>
    );
}
