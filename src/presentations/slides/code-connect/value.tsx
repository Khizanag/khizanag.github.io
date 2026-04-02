import { C, Reveal, SectionLabel, SectionHeading, FeatureCard, CalloutBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function ValueSection() {
    return (
        <section id="s-value" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.accent}>THE VALUE</SectionLabel>
                    <SectionHeading sub="What does this mean for you as a feature developer working on Space-Feature-* modules?">
                        Why this matters
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 32 }}>
                    <Reveal delay={0}>
                        <FeatureCard icon="🎯" title="Figma → SwiftUI in seconds" color={P}
                            description="Open any screen in Figma Dev Mode and see the exact Swift code for every S.I.N.S. component — correct init, parameters, and variant." />
                    </Reveal>
                    <Reveal delay={0.08}>
                        <FeatureCard icon="🤖" title="AI-assisted generation" color={C.blue}
                            description="Copilot reads .github/instructions/ and Code Connect snippets to help generate all 5 screen files following our architecture." />
                    </Reveal>
                    <Reveal delay={0.16}>
                        <FeatureCard icon="📐" title="Consistent architecture" color={C.accent}
                            description="Every generated screen follows the same pattern: View, ViewModel, Factory, Router, DI — with instruction files that enforce conventions." />
                    </Reveal>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
                    <Reveal delay={0.24}>
                        <FeatureCard icon="⏱" title="Faster onboarding" color={C.yellow}
                            description="New developers don't need to reverse-engineer component APIs. The design file itself shows the Swift code."
                            note="Day 1 productivity" />
                    </Reveal>
                    <Reveal delay={0.32}>
                        <FeatureCard icon="🔄" title="Always up to date" color={P}
                            description="Code Connect is versioned alongside the component code. When an API changes, the Figma snippet updates too."
                            note="Single source of truth" />
                    </Reveal>
                </div>

                <Reveal delay={0.4}>
                    <CalloutBox color={C.accent} icon="💡" label="THE OUTCOME">
                        Designer drags a component in Figma → Developer opens Dev Mode → Sees the exact Swift code →
                        Pastes or lets AI generate the screen. No guessing, no Slack threads, no source code archaeology.
                    </CalloutBox>
                </Reveal>
            </div>
        </section>
    );
}
