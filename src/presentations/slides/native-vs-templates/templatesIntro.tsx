import { C, Reveal, SectionLabel, SectionHeading, FeatureCard, PlainEnglishBox, CodeBlock } from "../../shared.tsx";
import { TEMPLATE } from "./ui.tsx";

export function TemplatesIntroSection() {
    return (
        <section id="s-templates-intro" style={{ background: C.bg, borderTop: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={TEMPLATE}>OPTION B &mdash; ARCHITECTURE</SectionLabel>
                    <SectionHeading sub="Template files are .figma.ts files that use the figma.* API to access component properties and output code in any language. No parser, no build step.">
                        How TypeScript templates work
                    </SectionHeading>
                </Reveal>

                <Reveal delay={0.05}>
                    <PlainEnglishBox color={TEMPLATE}>
                        Template files skip the native parser entirely. You write JavaScript/TypeScript that reads Figma properties via <code style={{ color: TEMPLATE }}>figma.selectedInstance</code> and outputs a code string. The CLI processes them directly &mdash; no SwiftSyntax, no Gradle plugin, no compilation. Since v1.4.2, full TypeScript type checking is supported.
                    </PlainEnglishBox>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 36, marginBottom: 36 }}>
                    <Reveal delay={0.1}>
                        <FeatureCard icon="📖" title="getString()" description="Read text properties: labels, titles, descriptions. Returns the exact string the designer typed." color={TEMPLATE} />
                    </Reveal>
                    <Reveal delay={0.15}>
                        <FeatureCard icon="🔀" title="getEnum()" description="Map variant values to code strings. 'Primary Brand' becomes '.primaryBrand' — or any string you want." color={TEMPLATE} />
                    </Reveal>
                    <Reveal delay={0.2}>
                        <FeatureCard icon="✅" title="getBoolean()" description="Read toggles. Supports value mapping: { true: 'enabled', false: 'disabled' } for any output format." color={TEMPLATE} />
                    </Reveal>
                    <Reveal delay={0.25}>
                        <FeatureCard icon="🔄" title="getInstanceSwap()" description="Get a handle to an instance swap slot. Call .executeTemplate() to recursively render nested Code Connect." color={TEMPLATE} />
                    </Reveal>
                    <Reveal delay={0.3}>
                        <FeatureCard icon="🔍" title="findInstance()" description="Find child instances by layer name. Enables composing snippets from deeply nested component trees." color={TEMPLATE} />
                    </Reveal>
                    <Reveal delay={0.35}>
                        <FeatureCard icon="💻" title="figma.code``" description="Tagged template literal that produces the final code string. Language-agnostic — outputs whatever you write." color={TEMPLATE} />
                    </Reveal>
                </div>

                <Reveal delay={0.4}>
                    <CodeBlock filename="template-anatomy.figma.ts" highlights={[1, 2, 3, 5, 7, 8, 14]}>
{`// url=https://figma.com/design/FILE/...?node-id=X-Y
// component=ComponentName
// source=path/to/Component.swift
import figma from "figma"

const instance = figma.selectedInstance
// Read properties
const label = instance.getString("✍️ Label")
const style = instance.getEnum("Style", {
    "Primary Brand":    ".primaryBrand",
    "Secondary Default": ".secondaryDefault",
})

export default {
    example: figma.code\`ComponentName(
    style: \${style},
    label: "\${label}"
)\`,
    metadata: { nestable: true },
}`}
                    </CodeBlock>
                </Reveal>
            </div>
        </section>
    );
}
