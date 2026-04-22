import { C, Reveal, SectionLabel, SectionHeading, FeatureCard, CalloutBox } from "../../shared.tsx";
import { P, StatBlock } from "./ui.tsx";

export function TestflightSection() {
    return (
        <section id="s-testflight" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>TESTFLIGHT</SectionLabel>
                    <SectionHeading sub="Apple&rsquo;s built-in beta distribution. Free since 2015. Underused outside engineering teams.">
                        The best kept secret at Apple
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 40 }}>
                    <StatBlock value="25" label="Apps per tester account" color={P} delay={0} />
                    <StatBlock value="100" label="Internal testers" color={C.purple} delay={0.05} />
                    <StatBlock value="10,000" label="External testers" color={C.yellow} delay={0.1} />
                    <StatBlock value="90 days" label="Build expiry" color={C.red} delay={0.15} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
                    <FeatureCard icon="👨‍💻" title="Internal Testing" color={P} delay={0}
                        description="Anyone with a role in your App Store Connect team. Access is instant — no Apple review. Gets every build automatically if configured. iOS, iPadOS, macOS, tvOS, watchOS, visionOS all supported."
                        note="Use for: devs, QA, PMs, designers. Our primary CI target on every green build."
                    />
                    <FeatureCard icon="🌐" title="External Testing" color={C.purple} delay={0.08}
                        description="Public testers via email or public link. First build on a version needs Apple beta review (~24h, lighter than App Store). Subsequent builds of the same version skip review."
                        note="Use for: closed/open betas, customer pilots, partner integrations, regional testers."
                    />
                </div>

                <Reveal>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 20 }}>
                        What testers actually see
                    </h3>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 32 }}>
                    <FeatureCard icon="📲" title="Install via TestFlight app" color={P} delay={0}
                        description="Single tap from invite email. Future builds auto-update if enabled. Tester can launch by tapping the app or jumping back to TestFlight."
                    />
                    <FeatureCard icon="📸" title="Screenshot &rarr; feedback" color={C.yellow} delay={0.08}
                        description="Tester takes a screenshot of the bug. TestFlight intercepts with a &lsquo;Send to developer&rsquo; sheet. Screenshot + comment lands in App Store Connect instantly."
                    />
                    <FeatureCard icon="💥" title="Automatic crash reports" color={C.red} delay={0.16}
                        description="Every crash is captured with symbolication, device, iOS version, memory state. Shows up in ASC within minutes. No SDK needed."
                    />
                </div>

                <CalloutBox color={C.accent} icon="🎯" label="UNDERUSED FEATURE — BUILD GROUPS">
                    You can split external testers into groups and send different builds to each. Example: &ldquo;Uzbekistan pilot&rdquo; gets a feature flag enabled, &ldquo;VIP customers&rdquo; gets the stable build. Each group has its own feedback stream.
                </CalloutBox>

                <div style={{ marginTop: 24 }}>
                    <CalloutBox color={C.red} icon="⚠" label="WHAT STILL CATCHES TEAMS OUT">
                        <b>Build expiry.</b> After 90 days, testers can no longer launch. Nothing in the app changes; Apple just refuses to let it run. For long-running pilots, build a &ldquo;refresh&rdquo; cycle. <br />
                        <b>Review for first build only.</b> If you&rsquo;ve bumped the version number, you&rsquo;re back in review, not a cached pass. <br />
                        <b>Public link is public.</b> Competitors can and do sign up.
                    </CalloutBox>
                </div>
            </div>
        </section>
    );
}
