import { C, Reveal, SectionLabel, SectionHeading, PlainEnglishBox, FeatureCard } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function WhatIsSection() {
    return (
        <section id="s-what-is" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>THE ELEVATOR PITCH</SectionLabel>
                    <SectionHeading sub="Before we go under the hood, here is the whole thing in one paragraph. If the rest of the deck were lost, this is what you should walk away with.">
                        What is this infrastructure?
                    </SectionHeading>
                </Reveal>

                <Reveal delay={0.1}>
                    <PlainEnglishBox color={P}>
                        We built a <strong>design-aware AI layer</strong> on top of our iOS codebase. Designers ship components to Figma. Developers paste a Figma URL into their editor. An AI agent reads the design through Figma&apos;s <strong>MCP server</strong>, looks up our <strong>Code Connect</strong> mappings to translate Figma components into the exact SwiftUI init calls we use, and then an <strong>orchestrator</strong> scaffolds every Clean-Architecture file: View, ViewModel, Router, Factory, DI, Destination, localisation keys — all compiling, all linting, all reviewed against the design automatically.
                    </PlainEnglishBox>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, marginTop: 28 }}>
                    <Reveal delay={0.2}>
                        <FeatureCard
                            icon="🎯"
                            title="What problem it solves"
                            color={C.red}
                            description="Each new screen used to be ~12 boilerplate files hand-copied from a neighbouring module, plus a manual Figma-to-SwiftUI translation riddled with guessed component APIs, guessed tokens, and drift from the design system."
                        />
                    </Reveal>
                    <Reveal delay={0.3}>
                        <FeatureCard
                            icon="⚡️"
                            title="What you get"
                            color={C.blue}
                            description="A committed feature branch with a pixel-perfect View, a wired ViewModel/Router/Factory, patched Destination + root Injection, localised strings, and a reviewable session log — from one /figma-to-screen invocation."
                        />
                    </Reveal>
                    <Reveal delay={0.4}>
                        <FeatureCard
                            icon="🧭"
                            title="Who it is for"
                            color={P}
                            description="Senior engineers who want the boring parts gone but the architectural discipline preserved — and senior designers who want their Figma tokens, variants, and components to survive the trip into code without translation."
                        />
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
