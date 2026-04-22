import { C, Reveal, SectionLabel, SectionHeading, WorkflowStep, CodeBlock } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function SetupSection() {
    return (
        <section id="s-setup" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.yellow}>SETUP</SectionLabel>
                    <SectionHeading sub="~10 minutes, one-off. After this every slash command in this deck just works in every matching workspace.">
                        Five steps to productive
                    </SectionHeading>
                </Reveal>

                <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                    <div>
                        <Reveal delay={0}>
                            <WorkflowStep n={1} total={5} title="Install Figma desktop + enable MCP" color={C.yellow}>
                                Figma desktop starts an MCP HTTP server on <code>127.0.0.1:3845</code>. No Figma token juggling — the desktop app authenticates for you.
                            </WorkflowStep>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <WorkflowStep n={2} total={5} title="Register the server in your IDE" color={C.yellow}>
                                Drop one JSON block in <code>mcp.json</code>. VS Code Copilot and Claude Code both read it automatically.
                            </WorkflowStep>
                        </Reveal>
                        <Reveal delay={0.16}>
                            <WorkflowStep n={3} total={5} title="Open the multi-root workspace" color={C.yellow}>
                                <code>code ios-space.code-workspace</code>. This is what lets Copilot see prompts / agents / instructions from <strong>both</strong> the monorepo root and Core UI V2.
                            </WorkflowStep>
                        </Reveal>
                        <Reveal delay={0.24}>
                            <WorkflowStep n={4} total={5} title="Verify the MCP tools are visible" color={C.yellow}>
                                In Copilot Chat, run <code>/figma-review --help</code>. If it lists <code>mcp_figma_*</code> tools, you&apos;re good.
                            </WorkflowStep>
                        </Reveal>
                        <Reveal delay={0.32}>
                            <WorkflowStep n={5} total={5} title="Run a dry lookup to warm the cache" color={C.yellow}>
                                <code>/token-lookup #111827</code> — should return the <code>DesignSystem.Color.text.primary</code> accessor in under a second.
                            </WorkflowStep>
                        </Reveal>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <Reveal delay={0.1}>
                            <CodeBlock filename="~/Library/Application Support/Code/User/mcp.json">{`{
  "servers": {
    "figma": {
      "type": "http",
      "url": "http://127.0.0.1:3845/mcp"
    }
  }
}`}</CodeBlock>
                        </Reveal>
                        <Reveal delay={0.22}>
                            <CodeBlock filename="terminal">{`# Multi-root workspace (DO THIS)
code /path/to/iOS-Space/ios-space.code-workspace

# Single-folder open (won't see shared .github/)
code /path/to/iOS-Space            # ❌`}</CodeBlock>
                        </Reveal>
                        <Reveal delay={0.32}>
                            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.yellow}`, borderRadius: 8, padding: "14px 16px" }}>
                                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: C.yellow, letterSpacing: "0.12em", marginBottom: 6 }}>COMMON TRAP</div>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
                                    Opening a single sub-repo folder makes Copilot see only that repo&apos;s <code>.github/</code>. Always open the multi-root workspace when working across modules.
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
