import { useState } from "react";
import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, CalloutBox, TabButton, CheckItem } from "../../shared.tsx";
import { P } from "./ui.tsx";

const LINK = (href: string, text: string, color = C.blue) => (
    <a href={href} target="_blank" rel="noopener noreferrer"
        style={{ color, textDecoration: "none", borderBottom: `1px solid ${color}40` }}>
        {text}
    </a>
);

const OPTIONS = [
    {
        id: "remote",
        icon: "☁️",
        label: "Figma Dev Mode MCP",
        tag: "RECOMMENDED",
        tagColor: C.accent,
        description: "Figma's official remote MCP server. No installation — connects directly from your AI tool to Figma's API. Requires a Figma account with Dev Mode access.",
        pros: [
            "Zero setup — no local server to run",
            "Always up-to-date with latest Figma API",
            "Official Figma support and maintenance",
            "Handles authentication via OAuth flow",
            "Includes Dev Mode data (measurements, tokens)",
        ],
        cons: [
            "Requires Figma paid plan (Dev Mode access)",
            "Dependent on Figma's server availability",
            "Limited to what Figma exposes via their MCP",
        ],
        setup: `// Claude Code — settings.json
{
    "mcpServers": {
        "figma": {
            "type": "url",
            "url": "https://figma.com/mcp/v1",
            "headers": {
                "Authorization": "Bearer <FIGMA_ACCESS_TOKEN>"
            }
        }
    }
}

// Or via claude_desktop_config.json for Claude Desktop:
{
    "mcpServers": {
        "figma": {
            "url": "https://figma.com/mcp/v1",
            "headers": {
                "Authorization": "Bearer <FIGMA_ACCESS_TOKEN>"
            }
        }
    }
}`,
        setupFile: "settings.json (Claude Code)",
        docsUrl: "https://help.figma.com/hc/en-us/articles/32132817894935-Guide-to-the-Dev-Mode-MCP-Server",
    },
    {
        id: "local",
        icon: "💻",
        label: "Community MCP Server",
        tag: "SELF-HOSTED",
        tagColor: C.yellow,
        description: "Open-source community server that runs locally via npx. Wraps the Figma REST API. More flexible but requires Node.js and manual token management.",
        pros: [
            "Works with any Figma plan (even free)",
            "Full control over the server and data",
            "Can be extended with custom tools",
            "No dependency on Figma's MCP infrastructure",
            "Supports additional endpoints not in official MCP",
        ],
        cons: [
            "Must install and run locally (npx or global)",
            "Manual FIGMA_ACCESS_TOKEN management",
            "Community-maintained — may lag behind API changes",
            "Requires Node.js runtime on the machine",
        ],
        setup: `// Step 1: No install needed — runs via npx
// The server starts automatically when the AI tool connects

// Claude Code — settings.json
{
    "mcpServers": {
        "figma": {
            "command": "npx",
            "args": [
                "-y",
                "figma-developer-mcp",
                "--figma-api-key=<FIGMA_ACCESS_TOKEN>",
                "--stdio"
            ]
        }
    }
}

// For Claude Desktop — claude_desktop_config.json:
{
    "mcpServers": {
        "figma": {
            "command": "npx",
            "args": [
                "-y",
                "figma-developer-mcp",
                "--figma-api-key=<FIGMA_ACCESS_TOKEN>",
                "--stdio"
            ]
        }
    }
}`,
        setupFile: "settings.json (Claude Code)",
        docsUrl: "https://github.com/nicholascostadev/figma-mcp",
    },
];

const COMPARISON = [
    { feature: "Installation", remote: "None — URL-based", local: "npx (auto-downloads)" },
    { feature: "Authentication", remote: "OAuth / PAT via header", local: "PAT via CLI flag" },
    { feature: "Maintenance", remote: "Figma maintains", local: "Community maintains" },
    { feature: "Dev Mode data", remote: "Full (measurements, tokens)", local: "Partial (REST API)" },
    { feature: "Code Connect snippets", remote: "Yes — returns published snippets", local: "Yes — via REST API" },
    { feature: "Screenshots", remote: "Yes", local: "Yes" },
    { feature: "Offline support", remote: "No", local: "No (needs Figma API)" },
    { feature: "Custom extensions", remote: "No", local: "Yes — fork and extend" },
    { feature: "Figma plan required", remote: "Dev Mode (paid)", local: "Any plan" },
];

export function McpSetupSection() {
    const [active, setActive] = useState("remote");
    const option = OPTIONS.find((o) => o.id === active)!;

    return (
        <section id="s-mcp-setup" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.blue}>MCP SETUP</SectionLabel>
                    <SectionHeading sub="Two ways to connect your AI assistant to Figma. Choose based on your team's plan and workflow.">
                        Local vs Remote — pick your server
                    </SectionHeading>
                </Reveal>

                <Reveal delay={0.1}>
                    <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
                        {OPTIONS.map((o) => (
                            <TabButton key={o.id} active={active === o.id} color={C.blue} icon={o.icon} label={o.label} onClick={() => setActive(o.id)} />
                        ))}
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 24, marginBottom: 32 }}>
                    <Reveal delay={0.15}>
                        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "28px 24px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                                <span style={{ fontSize: 28 }}>{option.icon}</span>
                                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: C.text }}>{option.label}</span>
                            </div>
                            <div style={{
                                display: "inline-block", padding: "3px 10px", borderRadius: 50, marginBottom: 14,
                                background: `${option.tagColor}15`, border: `1px solid ${option.tagColor}30`,
                                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: option.tagColor, letterSpacing: "0.08em",
                            }}>
                                {option.tag}
                            </div>
                            <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7, margin: "0 0 16px" }}>{option.description}</p>

                            <div style={{ marginBottom: 12 }}>
                                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 11, color: C.accent, letterSpacing: "0.08em", marginBottom: 4 }}>ADVANTAGES</div>
                                {option.pros.map((p) => <CheckItem key={p} active>{p}</CheckItem>)}
                            </div>
                            <div>
                                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 11, color: C.red, letterSpacing: "0.08em", marginBottom: 4 }}>TRADE-OFFS</div>
                                {option.cons.map((c) => <CheckItem key={c} active={false}>{c}</CheckItem>)}
                            </div>

                            <div style={{ marginTop: 16 }}>
                                {LINK(option.docsUrl, "View documentation →", C.blue)}
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <CodeBlock filename={option.setupFile} highlights={active === "remote" ? [5, 6, 7] : [7, 8, 9, 10]}>
                            {option.setup}
                        </CodeBlock>
                    </Reveal>
                </div>

                <Reveal delay={0.25}>
                    <div style={{ marginBottom: 28 }}>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: C.text, marginBottom: 16 }}>
                            Side-by-side comparison
                        </div>
                        <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
                            <div style={{
                                display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", background: C.surface,
                                borderBottom: `1px solid ${C.border}`, padding: "10px 20px",
                            }}>
                                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: C.muted, letterSpacing: "0.08em" }}>FEATURE</span>
                                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: C.accent, letterSpacing: "0.08em" }}>☁️ REMOTE (OFFICIAL)</span>
                                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: C.yellow, letterSpacing: "0.08em" }}>💻 LOCAL (COMMUNITY)</span>
                            </div>
                            {COMPARISON.map(({ feature, remote, local }, i) => (
                                <div key={feature} style={{
                                    display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr",
                                    borderBottom: i < COMPARISON.length - 1 ? `1px solid ${C.border}` : "none",
                                    padding: "10px 20px",
                                }}>
                                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 13, color: C.text }}>{feature}</span>
                                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.muted }}>{remote}</span>
                                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.muted }}>{local}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.3}>
                    <CalloutBox color={C.accent} icon="💡" label="OUR RECOMMENDATION">
                        Use the <strong>official Figma Dev Mode MCP</strong> if your team has Dev Mode access (most paid Figma plans include it).
                        It's zero-maintenance and always current. Fall back to the community server if you need a free plan or want to
                        extend the server with custom tools. Both return Code Connect snippets — the AI output quality is the same.
                    </CalloutBox>
                </Reveal>
            </div>
        </section>
    );
}
