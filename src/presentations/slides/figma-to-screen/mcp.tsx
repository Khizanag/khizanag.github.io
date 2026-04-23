import { C, Reveal, SectionLabel, SectionHeading, InfoCard, CheckItem, CodeBlock, PlainEnglishBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function McpSection() {
    return (
        <section id="s-mcp" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.blue}>THE PROTOCOL LAYER</SectionLabel>
                    <SectionHeading sub="Model Context Protocol — an open spec (Anthropic, late 2024) that lets any tool expose its data to any AI editor in a uniform way. Figma ships one. Our agents call it.">
                        MCP — what it is, and how we use it
                    </SectionHeading>
                </Reveal>

                {/* Primer: what MCP is + how Figma exposes it */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 28 }}>
                    <Reveal delay={0}>
                        <PlainEnglishBox color={C.blue}>
                            Instead of every IDE writing a custom Figma plugin, or every vendor writing a custom Copilot extension,
                            Figma desktop runs a <strong>local HTTP server</strong> at <code style={{ color: C.blue }}>127.0.0.1:3845/mcp</code> when Dev Mode is on.
                            Copilot, Claude, and Cursor all speak the same protocol — <strong>one spec, every editor</strong>. No design ever leaves your machine.
                        </PlainEnglishBox>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 18px" }}>
                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: C.blue, letterSpacing: "0.12em", marginBottom: 10 }}>HOW FIGMA EXPOSES IT</div>
                            <ol style={{ margin: 0, paddingLeft: 18, color: C.muted, fontSize: 12.5, lineHeight: 1.65 }}>
                                <li>Figma desktop ships a local MCP server out of the box.</li>
                                <li>It binds to <code>127.0.0.1:3845/mcp</code> when Dev Mode is on.</li>
                                <li>Your IDE connects via a single JSON config line.</li>
                                <li>The server publishes <strong>tools</strong> — callable functions that return design context, metadata, variables, and screenshots.</li>
                            </ol>
                        </div>
                    </Reveal>
                </div>

                {/* Our usage: the 4-tool batch + 24h cache */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 24 }}>
                    <Reveal delay={0.14}>
                        <InfoCard icon="📡" title="The 4-tool root batch" color={C.blue} tag="PARALLEL">
                            <CheckItem active><code>get_design_context</code> — full hierarchy + Code Connect snippets</CheckItem>
                            <CheckItem active><code>get_metadata</code> — lightweight tree, sibling scan for states</CheckItem>
                            <CheckItem active><code>get_variable_defs</code> — design tokens (colors, spacing, radius)</CheckItem>
                            <CheckItem active><code>get_screenshot</code> — visual reference for inventory</CheckItem>
                            <div style={{ color: C.muted, fontSize: 12, marginTop: 10, lineHeight: 1.55 }}>
                                All four calls fire in parallel, capped at 60s. Results feed the Visual Element Inventory and the Design Tokens sheet.
                            </div>
                        </InfoCard>
                    </Reveal>

                    <Reveal delay={0.22}>
                        <InfoCard icon="💾" title="24-hour disk cache" color={C.accent} tag="ROADMAP #3">
                            <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.6, marginBottom: 8 }}>
                                Every MCP response is written to <code>.github/.cache/figma/</code>. On re-run the same node returns <strong>in milliseconds, free</strong>.
                            </div>
                            <CheckItem active>Cache hit: replay from disk, log source</CheckItem>
                            <CheckItem active>Cache miss: call MCP, store, return</CheckItem>
                            <CheckItem active>TTL 24h — invalidates on designer updates</CheckItem>
                        </InfoCard>
                    </Reveal>
                </div>

                <Reveal delay={0.3}>
                    <div style={{ marginTop: 24 }}>
                        <CodeBlock filename="mcp.json">{`{
  "servers": {
    "figma": {
      "type": "http",
      "url": "http://127.0.0.1:3845/mcp"
    }
  }
}`}</CodeBlock>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, marginTop: 8, textAlign: "center" }}>
                            One file, four lines. Add to VS Code <code>~/Library/Application Support/Code/User/mcp.json</code> (macOS) and every MCP-aware editor picks it up — today and tomorrow.
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
