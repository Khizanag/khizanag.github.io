import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, CalloutBox } from "../../shared.tsx";
import { P, NATIVE, TEMPLATE, ComparisonColumn } from "./ui.tsx";

export function McpIntegrationSection() {
    return (
        <section id="s-mcp" style={{ background: C.bg, borderTop: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>MCP INTEGRATION</SectionLabel>
                    <SectionHeading sub="How Code Connect feeds into the Figma MCP server — and why template files have a native advantage in the AI-assisted workflow.">
                        Code Connect + Figma MCP
                    </SectionHeading>
                </Reveal>

                <Reveal delay={0.1}>
                    <CalloutBox color={P} icon="🤖" label="WHY THIS MATTERS">
                        The Figma MCP server uses Code Connect mappings to generate code from designs. When an AI agent calls <code style={{ color: P }}>get_design_context</code>, it receives Code Connect snippets as <code>&lt;CodeConnectSnippet&gt;</code> tags. The <code style={{ color: P }}>send_code_connect_mappings</code> tool accepts a <strong>template</strong> parameter — executable JS code. The MCP pipeline is architecturally built around templates.
                    </CalloutBox>
                </Reveal>

                <div style={{ display: "flex", gap: 24, marginTop: 32 }}>
                    <ComparisonColumn title="Native + MCP" icon="🍎" color={NATIVE} tag="Indirect" delay={0.15}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
                                Native Code Connect files are parsed into JS templates during <code>figma connect publish</code>. The MCP receives the <strong>compiled output</strong>, not the original Swift/Kotlin source.
                            </div>
                            <CodeBlock filename="MCP flow (native)">
{`// 1. Developer writes Swift
MyButton.figma.swift
  ↓ swift-syntax parser
// 2. Parsed into JS template
{ template: "figma.code\`...\`" }
  ↓ publish to Figma
// 3. MCP reads compiled template
get_design_context → <CodeConnectSnippet>
  ↓
// 4. AI generates Swift code`}
                            </CodeBlock>
                            <div style={{
                                padding: "10px 14px", background: `${C.red}08`,
                                border: `1px solid ${C.red}20`, borderRadius: 8,
                                fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, lineHeight: 1.6,
                            }}>
                                Issue #340: Custom parser templates are not always evaluated by the MCP. Non-React parsers may return generic code instead of configured snippets.
                            </div>
                        </div>
                    </ComparisonColumn>

                    <ComparisonColumn title="Templates + MCP" icon="📄" color={TEMPLATE} tag="Native fit" delay={0.2}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
                                Template files are already in the format the MCP expects. No intermediate parsing step. The <code>send_code_connect_mappings</code> MCP tool accepts <code>template</code> and <code>templateDataJson</code> with <code>isParserless: true</code>.
                            </div>
                            <CodeBlock filename="MCP flow (templates)">
{`// 1. Developer writes template
MyButton.figma.ts
  ↓ direct processing
// 2. Template IS the runtime format
{ template: "...", isParserless: true }
  ↓ publish to Figma
// 3. MCP evaluates directly
get_design_context → <CodeConnectSnippet>
  ↓
// 4. AI generates platform code`}
                            </CodeBlock>
                            <div style={{
                                padding: "10px 14px", background: `${TEMPLATE}08`,
                                border: `1px solid ${TEMPLATE}20`, borderRadius: 8,
                                fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, lineHeight: 1.6,
                            }}>
                                MCP labels support: React, SwiftUI, Compose, Flutter, Web Components, Vue, Svelte, and more. Templates can target any label.
                            </div>
                        </div>
                    </ComparisonColumn>
                </div>
            </div>
        </section>
    );
}
