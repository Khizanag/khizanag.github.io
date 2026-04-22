import { C, Reveal, SectionLabel, SectionHeading, CalloutBox } from "../../shared.tsx";
import { P, TimelineRow } from "./ui.tsx";

export function JourneySection() {
    return (
        <section id="s-journey" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>THE JOURNEY</SectionLabel>
                    <SectionHeading sub="A real release timeline for a typical TBC UZ build. Numbers are medians from our last 30 production builds.">
                        git push &rarr; tapping Install
                    </SectionHeading>
                </Reveal>

                <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 16, padding: "32px 40px", marginBottom: 32 }}>
                    <TimelineRow when="T + 0s" title="Developer pushes to feature branch" detail="Pre-commit hook runs SwiftLint. PR opened. CI triggers on push." color={P} delay={0} />
                    <TimelineRow when="T + 8 min" title="Bitrise build starts" detail="Matches certificate, resolves SPM packages, compiles, runs unit tests (~47s), contract tests, snapshot tests." color={P} delay={0.05} />
                    <TimelineRow when="T + 14 min" title="Archive signed with Distribution cert" detail="Xcode archive phase. .ipa produced and signed with our In-House or App Store Distribution profile." color={C.purple} delay={0.1} />
                    <TimelineRow when="T + 17 min" title="Upload to App Store Connect" detail="altool/Transporter pushes the .ipa. Apple begins automatic validation, dSYM processing, bitcode recompilation." color={C.purple} delay={0.15} />
                    <TimelineRow when="T + 45 min" title="Build appears in TestFlight" detail="Processing finishes. Build becomes available to Internal Testing group (no Apple review needed)." color={C.yellow} delay={0.2} />
                    <TimelineRow when="T + 2h" title="Submitted for External TestFlight review" detail="For new versions only. Apple does a lighter review (~24h median). Subsequent builds on the same version skip this." color={C.yellow} delay={0.25} />
                    <TimelineRow when="T + 24h" title="Submitted for App Store review" detail="Manual + automated checks. Median 24h, but can be 1h or 7 days. Expedited review possible for emergencies." color={C.red} delay={0.3} />
                    <TimelineRow when="T + 48h" title="Release to App Store" detail="Manual release or automatic. Phased release rollout starts: 1% &rarr; 2% &rarr; 5% &rarr; 10% &rarr; 20% &rarr; 50% &rarr; 100% over 7 days." color={C.accent} delay={0.35} />
                </div>

                <CalloutBox color={P} icon="⏱️" label="THE UNCOMFORTABLE TRUTH">
                    From &ldquo;code is done&rdquo; to &ldquo;user has it installed&rdquo; is typically <b>2&ndash;3 days</b> on iOS. On Android with staged rollout it&rsquo;s ~4 hours. This shapes how we think about hotfixes, rollbacks, and release planning.
                </CalloutBox>
            </div>
        </section>
    );
}
