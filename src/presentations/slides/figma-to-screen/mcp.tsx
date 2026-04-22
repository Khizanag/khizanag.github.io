import { C, Reveal, SectionLabel, SectionHeading, InfoCard, CheckItem, CodeBlock, PlainEnglishBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function McpSection() {
    return (
        <section id="s-mcp" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.blue}>BUILDING BLOCK 2</SectionLabel>
                    <SectionHeading sub="MCP is how your IDE asks Figma for structured data — metadata, variables, screenshots, Code Connect snippets. Four tools, one batched parallel call per screen.">
                        Model Context Protocol — the IDE&apos;s bridge to Figma
                    </SectionHeading>
                </Reveal>

                <Reveal delay={0.05}>
                    <div style={{ marginTop: 20, marginBottom: 20 }}>
                        <PlainEnglishBox color={C.blue}>
                            MCP is a small local HTTP server (the Figma desktop app starts one at <code style={{ color: C.blue }}>http://127.0.0.1:3845/mcp</code>).
                            Copilot / Claude connect to it once. From then on, they can call Figma like any other tool.
                        </PlainEnglishBox>
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 8 }}>
                    <Reveal delay={0.1}>
                        <InfoCard icon="📡" title="The 4-tool root batch" color={C.blue} tag="PARALLEL">
                            <CheckItem active><code>get_design_context</code> — full hierarchy + Code Connect snippets</CheckItem>
                            <CheckItem active><code>get_metadata</code> — lightweight tree, sibling scan for states</CheckItem>
                            <CheckItem active><code>get_variable_defs</code> — design tokens (colors, spacing, radius)</CheckItem>
                            <CheckItem active><code>get_screenshot</code> — visual reference for inventory</CheckItem>
                            <div style={{ color: C.muted, fontSize: 12, marginTop: 10, lineHeight: 1.55 }}>
                                All four calls fire in parallel, capped at 60s. Results feed straight into the Visual Element Inventory and the Design Tokens Sheet.
                            </div>
                        </InfoCard>
                    </Reveal>

                    <Reveal delay={0.18}>
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

                <Reveal delay={0.28}>
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
                            One file. Add to VS Code <code>~/Library/Application Support/Code/User/mcp.json</code> (macOS) and both Copilot + Claude pick it up.
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
