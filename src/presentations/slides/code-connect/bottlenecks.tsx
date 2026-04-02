import { C, Reveal, SectionLabel, SectionHeading, CalloutBox } from "../../shared.tsx";
import { P } from "./ui.tsx";
import { LimitationCard } from "./ui.tsx";

export function BottlenecksSection() {
    return (
        <section id="s-bottlenecks" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.yellow}>LIMITATIONS</SectionLabel>
                    <SectionHeading sub="Code Connect is powerful but not perfect. These are the edges we've hit during the S.I.N.S. integration.">
                        Bottlenecks & limitations
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 24 }}>
                    <LimitationCard
                        icon="🔗"
                        title='"Open in GitHub" disabled'
                        description='The Swift parser (v1.4.1) returns an empty source field. The CLI auto-converts file paths to GitHub URLs, but the Swift parser does not emit them. "let component = X.self" is required but still produces no link.'
                        color={C.red}
                        delay={0}
                    />
                    <LimitationCard
                        icon="🧩"
                        title="Nested instance props"
                        description="Properties on nested child components cannot be mapped from the parent FigmaConnect struct. Only top-level componentPropertyDefinitions are accessible."
                        color={C.yellow}
                        delay={0.08}
                    />
                    <LimitationCard
                        icon="🔄"
                        title="INSTANCE_SWAP not mappable"
                        description="Figma's INSTANCE_SWAP property type (used for slot/icon swapping) has no @FigmaProp equivalent in Swift. Icons must be hardcoded or documented via comments."
                        color={C.yellow}
                        delay={0.16}
                    />
                    <LimitationCard
                        icon="✨"
                        title="ViewModifiers not connectable"
                        description="Shimmer (.shimmering()) is a ViewModifier, not a View. FigmaConnect requires a View body. Documented via a comment-only file instead."
                        color={C.yellow}
                        delay={0.24}
                    />
                    <LimitationCard
                        icon="📦"
                        title="Generic ViewBuilder APIs"
                        description="Components with generic ViewBuilder parameters (e.g., custom content slots) can't express the full API. Comment-only patterns explain usage instead."
                        color={C.blue}
                        delay={0.32}
                    />
                    <LimitationCard
                        icon="⚠️"
                        title="Manual mappings block CLI"
                        description="If someone manually maps Code Connect via the Figma Dev Mode UI, the CLI publish silently fails for that node. Must disconnect the manual mapping first."
                        color={C.red}
                        delay={0.4}
                    />
                </div>

                <Reveal delay={0.45}>
                    <CalloutBox color={C.yellow} icon="💡" label="WORKAROUND STRATEGY">
                        For limitations we can't fix, we use comment-only <code style={{ fontFamily: "'JetBrains Mono', monospace", color: C.yellow }}>*.figma.swift</code> files
                        that display usage instructions directly in the Figma code panel. Not ideal, but it ensures every component has
                        <em> some</em> developer guidance — even the ones that can't be fully mapped.
                    </CalloutBox>
                </Reveal>
            </div>
        </section>
    );
}
