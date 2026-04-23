import { C, Reveal, SectionLabel, SectionHeading, CalloutBox } from "../../shared.tsx";
import { TEMPLATE, LimitationCard } from "./ui.tsx";

export function TemplateLimitationsSection() {
    return (
        <section id="s-template-limits" style={{ background: C.bg, borderTop: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.yellow}>TEMPLATE LIMITATIONS</SectionLabel>
                    <SectionHeading sub="Templates aren't perfect either. Here are the real downsides the team should consider before switching.">
                        What templates can't do (yet)
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    <Reveal delay={0.05}>
                        <LimitationCard
                            icon="🔤"
                            title="TypeScript is required"
                            description="iOS and Android developers must learn JavaScript/TypeScript syntax for template files. Not the full language — just template literals, object destructuring, and basic conditionals — but it's still a new language."
                            color={C.red}
                        />
                    </Reveal>
                    <Reveal delay={0.1}>
                        <LimitationCard
                            icon="🚫"
                            title="No compiler validation"
                            description="Template output is raw strings. There's no Swift compiler checking that 'StandardButtonV3(style: .primaryBrand, ...)' is valid Swift. Typos in output code won't be caught until a developer copies it."
                            color={C.red}
                        />
                    </Reveal>
                    <Reveal delay={0.15}>
                        <LimitationCard
                            icon="🧙"
                            title="No create wizard yet"
                            description="The 'figma connect create' wizard only generates native parser files. Template files must be created manually. You have to know the comment header format and figma.* API from docs."
                            color={C.yellow}
                        />
                    </Reveal>
                    <Reveal delay={0.2}>
                        <LimitationCard
                            icon="🔄"
                            title="No IDE integration with source"
                            description="Native files live alongside component source code in Xcode/Android Studio. Template files live in a separate directory, with no automatic navigation from component to its Code Connect mapping."
                            color={C.yellow}
                        />
                    </Reveal>
                    <Reveal delay={0.25}>
                        <LimitationCard
                            icon="📊"
                            title="MCP evaluation gaps"
                            description="Issue #340: 'Custom parser / no-parser templates are not evaluated by the MCP' — MCP may not fully render template-based snippets for non-React parsers. Active development area."
                            color={C.yellow}
                        />
                    </Reveal>
                    <Reveal delay={0.3}>
                        <LimitationCard
                            icon="📚"
                            title="String-based API knowledge"
                            description="You must know the exact Figma property names (e.g., '✍️ Label', 'Style') as strings. No autocomplete for Figma property names — you need to check the Figma file or use get_context_for_code_connect."
                            color={C.yellow}
                        />
                    </Reveal>
                </div>

                <Reveal delay={0.35}>
                    <div style={{ marginTop: 24 }}>
                        <CalloutBox color={C.red} icon="⚠️" label="KEY TRADE-OFF">
                            The biggest risk is <strong>no compile-time validation</strong>. Template output is raw strings — if a component API changes (parameter renamed, type removed), the template silently produces invalid code. Native files at least fail to compile. Teams must establish <strong>snapshot tests or CI checks</strong> to catch drift between templates and actual component APIs.
                        </CalloutBox>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
