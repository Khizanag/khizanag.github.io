import { C, Reveal, SectionLabel, SectionHeading, PlainEnglishBox, CodeBlock } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function WhatIsMcpSection() {
    return (
        <section id="s-what-is-mcp" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1150, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.blue}>THE PROTOCOL LAYER</SectionLabel>
                    <SectionHeading sub="Before we show the cache, the 4-tool batch, and the mcp.json config — the protocol itself. If you&apos;ve never heard of MCP, this is your one-slide primer.">
                        What is MCP, and why Figma ships one
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginTop: 28 }}>
                    <Reveal delay={0}>
                        <PlainEnglishBox color={C.blue}>
                            <strong>MCP — Model Context Protocol</strong> — is an open spec (Anthropic, late 2024) that lets tools <em>expose their data</em> to any AI editor in a uniform way. Instead of every IDE writing a custom Figma plugin, or every vendor writing a custom Copilot extension, you run a <strong>local MCP server</strong> that speaks one protocol, and every MCP-aware editor (Copilot, Claude, Cursor) can talk to it.
                        </PlainEnglishBox>
                    </Reveal>

                    <div>
                        <Reveal delay={0.1}>
                            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "18px 20px" }}>
                                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, color: C.blue, letterSpacing: "0.12em", marginBottom: 12 }}>HOW FIGMA EXPOSES IT</div>
                                <ol style={{ margin: 0, paddingLeft: 18, color: C.muted, fontSize: 13, lineHeight: 1.75 }}>
                                    <li>Figma desktop ships a local MCP server out of the box.</li>
                                    <li>It binds to <code>127.0.0.1:3845/mcp</code> when Dev Mode is on.</li>
                                    <li>Your IDE connects via a single JSON config line.</li>
                                    <li>The server publishes a handful of <strong>tools</strong> — callable functions that return design context, metadata, variables, and screenshots.</li>
                                    <li>Every tool call is authenticated locally; no design ever leaves your machine.</li>
                                </ol>
                            </div>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <div style={{ marginTop: 14 }}>
                                <CodeBlock filename="what a tool call looks like (conceptually)">{`// The agent asks:
call "get_design_context" with { nodeId: "5294-65016" }

// The Figma server answers with:
{
  "code":        "<SwiftUI snippet using Code Connect mappings>",
  "metadata":    "<layer tree, sizes, auto-layout>",
  "variables":   { "color/text/default": "#111827", ... },
  "screenshot":  "<base64 PNG>"
}`}</CodeBlock>
                            </div>
                        </Reveal>
                    </div>
                </div>

                <Reveal delay={0.32}>
                    <div style={{ marginTop: 24, background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.blue}`, borderRadius: 8, padding: "14px 18px" }}>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: C.blue, letterSpacing: "0.12em", marginBottom: 6 }}>WHY THIS IS A BIG DEAL</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
                            Before MCP, &quot;AI reads Figma&quot; meant shipping a custom plugin per editor. Now: install Figma once, add 4 lines to <code>mcp.json</code>, and every AI tool you use — today and tomorrow — can query your designs with zero additional integration. <strong>The protocol is the point.</strong>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
