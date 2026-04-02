import { C, Reveal, SectionLabel, SectionHeading, CalloutBox } from "../../shared.tsx";
import { P, LimitationCard } from "./ui.tsx";

export function PitfallsSection() {
    return (
        <section id="s-pitfalls" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.red}>LESSONS LEARNED</SectionLabel>
                    <SectionHeading sub="Real mistakes from the first round of AI-assisted screen generation. Each one cost debugging time.">
                        Common pitfalls
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 32 }}>
                    <LimitationCard
                        icon="📦" title="Toolbox wrapping" delay={0}
                        description="ListViewItem.trailingToolbox expects Toolbox? (the view), not Toolbox.Parameters. Must wrap: Toolbox(parameters: .chevronRight), not bare .chevronRight."
                        color={C.red}
                    />
                    <LimitationCard
                        icon="📏" title="Spacing tokens" delay={0.08}
                        description="Max available spacing is .s1000. There is no s1200 or higher. Code Connect won't warn you — the build will fail."
                        color={C.yellow}
                    />
                    <LimitationCard
                        icon="🖼" title="Icon names" delay={0.16}
                        description="Always verify icon paths. .icons.plus.regular.ic24 exists, .icons.addCircle.filled.ic24 does not. Search the codebase before using."
                        color={C.yellow}
                    />
                    <LimitationCard
                        icon="🔧" title="Raw .toolbar" delay={0.24}
                        description="Never use SwiftUI's raw .toolbar {} for nav bar items. Always use .navigationBarLeading(title:) and .navigationBarTrailing(parameters:) from SpaceCore_Navigation."
                        color={C.red}
                    />
                    <LimitationCard
                        icon="👻" title="Phantom components" delay={0.32}
                        description="Code Connect returned a Footer with a 'Continue' button that wasn't in the screenshot. Always verify components exist in the design before implementing."
                        color={C.red}
                    />
                    <LimitationCard
                        icon="🎨" title="Placeholder colors" delay={0.4}
                        description="backgroundColor: .blue in Code Connect is a placeholder, not an actual design token. Use .clear or the appropriate theme color from the screenshot."
                        color={C.yellow}
                    />
                </div>

                <Reveal delay={0.5}>
                    <CalloutBox color={C.accent} icon="🛡" label="DEFENSE STRATEGY">
                        Build after every change. Run <code style={{ fontFamily: "'JetBrains Mono', monospace", color: C.accent }}>xcodebuild</code> and
                        <code style={{ fontFamily: "'JetBrains Mono', monospace", color: C.accent }}> swiftlint --strict</code> before committing.
                        Most pitfalls surface as compile errors — the compiler is your best friend here.
                    </CalloutBox>
                </Reveal>
            </div>
        </section>
    );
}
