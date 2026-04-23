import { C, Reveal, SectionLabel, SectionHeading, CodeBlock } from "../../shared.tsx";
import { P, NATIVE, TEMPLATE, ComparisonColumn } from "./ui.tsx";

export function TwoPathsSection() {
    return (
        <section id="s-two-paths" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>THE FORK</SectionLabel>
                    <SectionHeading sub="Two fundamentally different architectures for achieving the same goal: showing real code in Figma Dev Mode.">
                        Two approaches, one goal
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "flex", gap: 24 }}>
                    <ComparisonColumn title="Native Parser" icon="🍎" color={NATIVE} tag="Swift / Kotlin" delay={0.1}>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.7, margin: "0 0 16px" }}>
                            Write Code Connect files <strong style={{ color: NATIVE }}>in your own language</strong>. The CLI builds a parser binary (SwiftSyntax / Gradle plugin), extracts component metadata, and generates JS templates internally.
                        </p>
                        <CodeBlock filename="StandardButtonV3.figma.swift">
{`struct ButtonDoc: FigmaConnect {
    let component = StandardButtonV3.self
    let figmaNodeUrl = "https://figma.com/..."

    @FigmaString("✍️ Label")
    var label = "Submit"

    @FigmaBoolean("Loading")
    var loading = false

    var body: some View {
        StandardButtonV3(
            style: .primaryBrand,
            label: label,
            isLoading: loading,
            action: { /* action */ }
        )
    }
}`}
                        </CodeBlock>
                    </ComparisonColumn>

                    <ComparisonColumn title="TypeScript Templates" icon="📄" color={TEMPLATE} tag="Any Language Output" delay={0.2}>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.7, margin: "0 0 16px" }}>
                            Write template files <strong style={{ color: TEMPLATE }}>in JavaScript/TypeScript</strong>. The CLI processes them directly — no parser, no compilation. Output any language: Swift, Kotlin, Dart, or anything else.
                        </p>
                        <CodeBlock filename="StandardButtonV3.figma.ts">
{`// url=https://figma.com/...
// component=StandardButtonV3
import figma from "figma"

const i = figma.selectedInstance
const label = i.getString("✍️ Label")
const loading = i.getBoolean("Loading")
const style = i.getEnum("Style", {
    "Primary Brand": ".primaryBrand",
    "Secondary":     ".secondaryDefault",
})

export default {
    example: figma.code\`StandardButtonV3(
    style: \${style},
    label: "\${label}",
    isLoading: \${loading},
    action: { /* action */ }
)\`,
}`}
                        </CodeBlock>
                    </ComparisonColumn>
                </div>
            </div>
        </section>
    );
}
