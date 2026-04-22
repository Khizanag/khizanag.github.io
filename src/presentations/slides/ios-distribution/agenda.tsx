import { C, Reveal, SectionLabel, SectionHeading, FeatureCard } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function AgendaSection() {
    return (
        <section id="s-agenda" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>AGENDA · 75 MIN</SectionLabel>
                    <SectionHeading sub="Five acts — from the plumbing nobody explained you, to the cases that almost killed real products.">
                        What we&rsquo;ll cover today
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                    <FeatureCard
                        icon="01"
                        title="The Plumbing"
                        color={P}
                        delay={0}
                        description="Apple Developer Program, roles, code signing, the 4 horsemen of provisioning. What happens between git push and App Store. (15 min)"
                    />
                    <FeatureCard
                        icon="02"
                        title="Getting it Out"
                        color={C.purple}
                        delay={0.08}
                        description="Distribution channels compared. TestFlight deep dive. Phased release. Our Bitrise pipeline. (12 min)"
                    />
                    <FeatureCard
                        icon="03"
                        title="The Gauntlet"
                        color={C.yellow}
                        delay={0.16}
                        description="App Store Review — how it actually works. The top 10 rejection reasons with real guideline numbers. (10 min)"
                    />
                    <FeatureCard
                        icon="04"
                        title="War Stories"
                        color={C.red}
                        delay={0.24}
                        description="HEY vs Apple. Epic vs Fortnite. Beeper Mini. XcodeGhost. Wordle clones. What we can learn from each. Plus our own cases. (20 min)"
                    />
                    <FeatureCard
                        icon="05"
                        title="Privacy & Future"
                        color={C.accent}
                        delay={0.32}
                        description="Privacy Manifest. ATT. Banking compliance. EU DMA & sideloading. Where Apple is heading. (10 min)"
                    />
                    <FeatureCard
                        icon="Q&A"
                        title="Interactive"
                        color={C.blue}
                        delay={0.4}
                        description="&ldquo;Will it pass review?&rdquo; game. Live poll. Your rejection stories. Q&A at the end. (8 min)"
                    />
                </div>

                <div style={{
                    marginTop: 48, padding: "20px 24px", background: C.surface,
                    border: `1px solid ${P}25`, borderLeft: `3px solid ${P}`, borderRadius: 10,
                    display: "flex", alignItems: "center", gap: 14,
                }}>
                    <span style={{ fontSize: 22 }}>🎯</span>
                    <div>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: P, letterSpacing: "0.08em", marginBottom: 4 }}>
                            WHO THIS IS FOR
                        </div>
                        <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
                            iOS & Android engineers, web devs, QA, POs, BAs, designers. No Xcode knowledge required. Every acronym spelled out on first use.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
