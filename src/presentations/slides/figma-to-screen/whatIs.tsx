import { C, Reveal, SectionLabel, SectionHeading, FeatureCard } from "../../shared.tsx";
import { P } from "./ui.tsx";
import { WhatIsSteps } from "./whatIsSteps.tsx";

export function WhatIsSection() {
    return (
        <section id="s-what-is" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>THE ELEVATOR PITCH</SectionLabel>
                    <SectionHeading sub="Before we go under the hood, here is the whole thing in six frames. If the rest of the deck were lost, this is what you should walk away with.">
                        What is this infrastructure?
                    </SectionHeading>
                </Reveal>

                <Reveal delay={0.1}>
                    <div style={{ marginTop: 32, marginBottom: 8 }}>
                        <WhatIsSteps />
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, marginTop: 28 }}>
                    <Reveal delay={0.26}>
                        <FeatureCard
                            icon="🎯"
                            title="What problem it solves"
                            color={C.red}
                            description="Each new screen used to be 28 files hand-authored across Presentation, Domain, and Data — plus a manual Figma-to-SwiftUI translation riddled with guessed component APIs, guessed tokens, and drift from the design system."
                        />
                    </Reveal>
                    <Reveal delay={0.34}>
                        <FeatureCard
                            icon="⚡️"
                            title="What you get"
                            color={C.blue}
                            description="A committed feature branch with a pixel-perfect View, a wired ViewModel / Router / Factory, patched Destination + root Injection, localised strings, and a reviewable session log — from one /figma-to-screen invocation."
                        />
                    </Reveal>
                    <Reveal delay={0.42}>
                        <FeatureCard
                            icon="🧭"
                            title="Who it is for"
                            color={P}
                            description="Every iOS engineer on the team — from the developer shipping their first screen to the architect enforcing module boundaries. The boring parts are gone, the architectural discipline is preserved, and designers get their Figma tokens, variants, and components surviving the trip into code without translation."
                        />
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
