import { C, Reveal, SectionLabel, SectionHeading, CalloutBox } from "../../shared.tsx";
import { NATIVE, LimitationCard } from "./ui.tsx";

export function NativeLimitationsSection() {
    return (
        <section id="s-native-limits" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.red}>NATIVE LIMITATIONS</SectionLabel>
                    <SectionHeading sub="Fundamental constraints of the native Swift/Kotlin parser approach — these are architectural limits, not bugs to be fixed.">
                        What native can't do
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    <Reveal delay={0.05}>
                        <LimitationCard
                            icon="🔗"
                            title="No nested property mapping"
                            description="Issue #376: Cannot compose property mappings like icon.name + icon.size within a parent component. React's nested props have worked since day one — Swift/Kotlin never got this. Figma's response: 'Use template files.'"
                            color={C.red}
                        />
                    </Reveal>
                    <Reveal delay={0.1}>
                        <LimitationCard
                            icon="🔀"
                            title="figmaApply is boolean-only"
                            description="Issue #218 & #229: The .figmaApply() modifier only accepts boolean toggles. You cannot use enum values, string comparisons, or computed conditions. No ternaries in body — parser errors."
                            color={C.red}
                        />
                    </Reveal>
                    <Reveal delay={0.15}>
                        <LimitationCard
                            icon="📝"
                            title="No @State / @Binding annotations"
                            description="Issue #223: Cannot express SwiftUI state management patterns like @State, @Binding, or $binding syntax in code snippets. The parser doesn't support these annotations."
                            color={C.red}
                        />
                    </Reveal>
                    <Reveal delay={0.2}>
                        <LimitationCard
                            icon="📦"
                            title="One variant per struct"
                            description="Each variant combination requires a separate FigmaConnect struct. ChipV3 with 3 variants x 2 appearances = 6 structs minimum. Templates handle this with inline if/else in one file."
                            color={C.yellow}
                        />
                    </Reveal>
                    <Reveal delay={0.25}>
                        <LimitationCard
                            icon="⚙️"
                            title="Heavy build dependencies"
                            description="SwiftSyntax (510.0.3+), SwiftParser, SwiftFormat, swift-argument-parser — all compiled from source on first run. Takes 2-5 minutes. Breaks with every major Xcode update."
                            color={C.yellow}
                        />
                    </Reveal>
                    <Reveal delay={0.3}>
                        <LimitationCard
                            icon="🔒"
                            title="Platform-locked output"
                            description="Swift parser outputs Swift. Kotlin parser outputs Kotlin. If you need both, you maintain two completely separate codebases with different build systems."
                            color={C.yellow}
                        />
                    </Reveal>
                    <Reveal delay={0.35}>
                        <LimitationCard
                            icon="🐛"
                            title="hideDefault rendering bugs"
                            description="Issue #217: The hideDefault parameter on property wrappers causes rendering errors in Dev Mode. Some mapped properties show incorrectly when set to default values."
                            color={C.yellow}
                        />
                    </Reveal>
                    <Reveal delay={0.4}>
                        <LimitationCard
                            icon="💬"
                            title="No ViewModifier support"
                            description="Cannot map Figma components to SwiftUI ViewModifiers like .shimmering(true). Only View types are supported. Must use comment-only pattern as workaround."
                            color={C.yellow}
                        />
                    </Reveal>
                </div>

                <Reveal delay={0.45}>
                    <div style={{ marginTop: 24 }}>
                        <CalloutBox color={C.red} icon="⚠️" label="THE CORE ISSUE">
                            These aren't bugs — they're <strong>architectural constraints</strong> of the parser approach. The Swift/Kotlin parsers work by analyzing AST nodes, which fundamentally limits what can be expressed. When users request these features, Figma engineers consistently point them to template files as the solution.
                        </CalloutBox>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
