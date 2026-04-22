import { C, Reveal, SectionLabel, SectionHeading, CalloutBox } from "../../shared.tsx";
import { P, SlashCommandCard } from "./ui.tsx";

export function ConsumerSection() {
    return (
        <section id="s-consumer" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.blue}>CONSUMER TOOLKIT</SectionLabel>
                    <SectionHeading sub="These live in Core UI V2. Use them whenever you&apos;re authoring feature Views — they resolve the 90% of questions that used to need a Slack thread with the design team.">
                        Seven slash commands for feature developers
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 24 }}>
                    <Reveal delay={0}>
                        <SlashCommandCard
                            command="/figma-to-view"
                            invokedAs="@figma-to-view"
                            color={C.blue}
                            purpose="Paste a Figma URL — get a pixel-perfect SwiftUI View using Core UI V2 components. Builds a Visual Inventory, a Design Tokens Sheet, and a State Variants table before writing any Swift."
                        />
                    </Reveal>
                    <Reveal delay={0.05}>
                        <SlashCommandCard
                            command="/figma-review"
                            invokedAs="@figma-review"
                            color={C.blue}
                            purpose="Audit an existing View against its Figma design. Reports RED/YELLOW/GREEN discrepancies and suggests fixes — used by the screen orchestrator as its no-self-audit gate."
                        />
                    </Reveal>
                    <Reveal delay={0.1}>
                        <SlashCommandCard
                            command="/component-lookup"
                            invokedAs="@component-lookup"
                            color={C.blue}
                            purpose="Given a Figma layer, URL, or Swift name, returns the init signature, enum cases, and nested types. Handles emoji-prefixed layer names (💠, 🔷, ↳🔹)."
                        />
                    </Reveal>
                    <Reveal delay={0.15}>
                        <SlashCommandCard
                            command="/icon-lookup"
                            invokedAs="@icon-lookup"
                            color={C.blue}
                            purpose="Figma icon name → Swift path under DesignSystem.Icon. Warns if the icon doesn&apos;t exist in the asset catalog so you don&apos;t ship a compile error."
                        />
                    </Reveal>
                    <Reveal delay={0.2}>
                        <SlashCommandCard
                            command="/token-lookup"
                            invokedAs="@token-lookup"
                            color={C.blue}
                            purpose="Hex / px / pt / font size → DesignSystem.* accessor. If no accessor exists, flags it as MISSING so design knows what to add before you hardcode."
                        />
                    </Reveal>
                    <Reveal delay={0.25}>
                        <SlashCommandCard
                            command="/unstick"
                            invokedAs="@unstick"
                            color={C.blue}
                            purpose="When Dev Mode is empty or Code Connect is broken, diagnoses why and proposes a recovery path — either a quick mapping patch or a fallback compose-only implementation."
                        />
                    </Reveal>
                    <Reveal delay={0.3}>
                        <SlashCommandCard
                            command="/connect-component"
                            invokedAs="@connect-component"
                            color={C.purple}
                            purpose="Author path. Add a new Figma ↔ Swift mapping: fetches Figma props, reads Swift Parameters, writes the generator entry, runs the gates."
                        />
                    </Reveal>
                </div>

                <Reveal delay={0.4}>
                    <div style={{ marginTop: 24 }}>
                        <CalloutBox color={C.blue} icon="🎯" label="REACH-FOR-FIRST RULES">
                            Before writing a Swift init by hand — <code>/component-lookup</code>.
                            Before hardcoding a hex — <code>/token-lookup</code>.
                            Before an <code>Image("icon-foo")</code> — <code>/icon-lookup</code>.
                            Three habits remove most avoidable back-and-forth with the design team.
                        </CalloutBox>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
