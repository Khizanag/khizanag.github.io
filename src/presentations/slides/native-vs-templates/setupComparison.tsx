import { C, Reveal, SectionLabel, SectionHeading, WorkflowStep, CodeBlock } from "../../shared.tsx";
import { P, NATIVE, TEMPLATE, ComparisonColumn } from "./ui.tsx";

export function SetupComparisonSection() {
    return (
        <section id="s-setup" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>SETUP</SectionLabel>
                    <SectionHeading sub="How much work does each approach require before you can write your first Code Connect mapping?">
                        Setup complexity compared
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "flex", gap: 24 }}>
                    <ComparisonColumn title="Native Swift Setup" icon="🍎" color={NATIVE} tag="6 steps" delay={0.1}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            <WorkflowStep n={1} total={6} title="Add SPM dependency" color={NATIVE}>
                                Add <code>figma/code-connect</code> as Swift Package to Xcode project
                            </WorkflowStep>
                            <WorkflowStep n={2} total={6} title="Install npm CLI" color={NATIVE}>
                                <code>npm install -g @figma/code-connect</code>
                            </WorkflowStep>
                            <WorkflowStep n={3} total={6} title="Create figma.config.json" color={NATIVE}>
                                Set parser: &quot;swift&quot;, swiftPackagePath, include/exclude paths
                            </WorkflowStep>
                            <WorkflowStep n={4} total={6} title="First build (slow)" color={NATIVE}>
                                CLI builds SwiftSyntax parser binary — <strong style={{ color: C.red }}>2-5 minutes</strong> on first run
                            </WorkflowStep>
                            <WorkflowStep n={5} total={6} title="Write .figma.swift files" color={NATIVE}>
                                Create FigmaConnect structs with property wrappers
                            </WorkflowStep>
                            <WorkflowStep n={6} total={6} title="Publish" color={NATIVE}>
                                <code>figma connect publish</code> — parses Swift, generates JS, uploads
                            </WorkflowStep>
                        </div>

                        <div style={{ marginTop: 16 }}>
                            <CodeBlock filename="figma.config.json (native)">
{`{
  "codeConnect": {
    "parser": "swift",
    "swiftPackagePath": "Package.swift",
    "include": [
      "Sources/**/CodeConnect/**"
    ]
  }
}`}
                            </CodeBlock>
                        </div>
                    </ComparisonColumn>

                    <ComparisonColumn title="Templates Setup" icon="📄" color={TEMPLATE} tag="3 steps" delay={0.2}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            <WorkflowStep n={1} total={3} title="Install npm CLI" color={TEMPLATE}>
                                <code>npm install @figma/code-connect</code> — that&apos;s it. No SPM, no Gradle.
                            </WorkflowStep>
                            <WorkflowStep n={2} total={3} title="Write .figma.ts files" color={TEMPLATE}>
                                Create template files with comment headers and figma.* API
                            </WorkflowStep>
                            <WorkflowStep n={3} total={3} title="Publish" color={TEMPLATE}>
                                <code>figma connect publish</code> — instant processing, no compilation
                            </WorkflowStep>
                        </div>

                        <div style={{ marginTop: 16, marginBottom: 16, padding: "16px 20px", background: `${TEMPLATE}08`, border: `1px solid ${TEMPLATE}20`, borderRadius: 10 }}>
                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: TEMPLATE, marginBottom: 8 }}>
                                Optional: TypeScript support
                            </div>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.6 }}>
                                Add <code>&quot;types&quot;: [&quot;@figma/code-connect/figma-types&quot;]</code> to tsconfig.json for full autocomplete and type checking in .figma.ts files.
                            </div>
                        </div>

                        <CodeBlock filename="figma.config.json (templates)">
{`{
  "codeConnect": {
    "include": [
      "code-connect/**/*.figma.ts"
    ]
  }
}`}
                        </CodeBlock>
                    </ComparisonColumn>
                </div>
            </div>
        </section>
    );
}
