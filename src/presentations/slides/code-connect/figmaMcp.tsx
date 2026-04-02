import { useState } from "react";
import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, FeatureCard, CalloutBox, TabButton, PlainEnglishBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

const LINK = (href: string, text: string, color = P) => (
    <a href={href} target="_blank" rel="noopener noreferrer"
        style={{ color, textDecoration: "none", borderBottom: `1px solid ${color}40` }}>
        {text}
    </a>
);

const CAPABILITIES = [
    {
        id: "context",
        icon: "📋",
        label: "get_design_context",
        desc: "The primary tool. Given a Figma URL, returns everything about a frame: component names, Code Connect snippets, layout structure, variant states, and a screenshot of the actual design.",
        code: `// What the AI receives from get_design_context:
{
    "screenshot": "<base64 image of the frame>",
    "components": [
        {
            "name": "BannerCardSmall",
            "codeSnippet": "BannerCardSmall(\\n    parameters: .init(...)\\n)",
            "variant": { "Appearance": "Contrast", "👀 End image": true },
            "properties": { "✍️ Label": "My Loans" }
        },
        {
            "name": "ListViewItem",
            "codeSnippet": "ListViewItem(\\n    parameters: .init(...)\\n)",
            "variant": { "Size": "Medium" }
        }
    ],
    "layout": { "type": "FRAME", "children": [...] }
}`,
        filename: "Figma MCP response (simplified)",
    },
    {
        id: "file",
        icon: "📁",
        label: "get_file_context",
        desc: "Returns file-level metadata: all pages, all component sets, and their node IDs. Useful for discovering which components exist in the design system before writing Code Connect files.",
        code: `// Returns component inventory:
{
    "pages": ["Components", "Templates", "Playground"],
    "componentSets": [
        { "name": "💠 BannerCardSmall", "nodeId": "18767:1565" },
        { "name": "💠 Chip",            "nodeId": "7745:18142" },
        { "name": "💠 P2P Card",        "nodeId": "19676:12161" },
        // ... 80+ component sets
    ]
}`,
        filename: "Figma MCP — file context",
    },
    {
        id: "node",
        icon: "🔍",
        label: "get_node_details",
        desc: "Deep-dives into a specific node. Returns componentPropertyDefinitions (all Figma props), variant children, nested structure, and text content. Essential for creating accurate Code Connect mappings.",
        code: `// Inspect a component set's properties:
{
    "name": "💠 P2P Card",
    "componentPropertyDefinitions": {
        "Collapsed": { "type": "VARIANT", "options": ["True", "False"] },
        "State":     { "type": "VARIANT", "options": ["Default", "Read Only"] },
        "👀 Footer": { "type": "BOOLEAN", "default": true }
    },
    "variants": [
        "State=Default, Collapsed=False",
        "State=Read Only, Collapsed=False",
        "State=Default, Collapsed=True"
    ]
}`,
        filename: "Figma MCP — node details",
    },
    {
        id: "code",
        icon: "⚡",
        label: "get_code_connect",
        desc: "Returns published Code Connect snippets for a specific component. The AI uses this to see exactly what code is shown in Figma Dev Mode — and whether it needs updating.",
        code: `// Published Code Connect for a component:
{
    "nodeId": "7745-18142",
    "component": "Chip",
    "connections": [
        {
            "variant": {},
            "code": "Chip(\\n    parameters: .init(\\n        variant: chipVariant,\\n        appearance: appearance,\\n        size: size,\\n        ...\\n    )\\n)"
        },
        {
            "variant": { "Variant": "Inverse" },
            "code": "Chip(\\n    parameters: .init(\\n        variant: .primary,\\n        appearance: .inverse,\\n        ...\\n    )\\n)"
        }
    ]
}`,
        filename: "Figma MCP — code connect snippets",
    },
];

export function FigmaMcpSection() {
    const [active, setActive] = useState("context");
    const cap = CAPABILITIES.find((c) => c.id === active)!;

    return (
        <section id="s-mcp" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.blue}>FIGMA MCP</SectionLabel>
                    <SectionHeading sub={<>The {LINK("https://modelcontextprotocol.io", "Model Context Protocol")} server that lets AI assistants read Figma designs programmatically — the bridge between your AI tool and the design file.</>}>
                        Figma MCP — AI reads design
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
                    <FeatureCard icon="🤖" title="What is MCP?" color={P} delay={0}
                        description={<>An open protocol (by {LINK("https://anthropic.com", "Anthropic", C.blue)}) that gives AI assistants access to external tools. Figma's MCP server exposes design data — components, properties, screenshots — as structured API calls the AI can invoke.</>}
                    />
                    <FeatureCard icon="🔗" title="How it connects" color={C.blue} delay={0.08}
                        description={<>The {LINK("https://github.com/nicholascostadev/figma-mcp", "Figma MCP server")} runs locally or in CI. Your AI assistant (Claude Code, Copilot, Cursor) calls it via tool_use. It reads the Figma REST API and returns structured data + screenshots.</>}
                    />
                    <FeatureCard icon="🎯" title="Why it matters" color={C.accent} delay={0.16}
                        description="Without MCP, AI only sees code. With MCP, AI sees the design — component hierarchy, variant states, text content, layout structure, AND the Code Connect snippets you published."
                    />
                </div>

                <Reveal delay={0.2}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                        {CAPABILITIES.map((c) => (
                            <TabButton key={c.id} active={active === c.id} color={C.blue} icon={c.icon} label={c.label} onClick={() => setActive(c.id)} />
                        ))}
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 24, marginBottom: 32 }}>
                    <Reveal delay={0.25}>
                        <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 14, padding: "28px 24px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                                <span style={{ fontSize: 28 }}>{cap.icon}</span>
                                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: C.text }}>{cap.label}</span>
                            </div>
                            <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7, margin: 0 }}>{cap.desc}</p>
                        </div>
                    </Reveal>

                    <Reveal delay={0.3}>
                        <CodeBlock filename={cap.filename} highlights={[]}>{cap.code}</CodeBlock>
                    </Reveal>
                </div>

                <Reveal delay={0.35}>
                    <CalloutBox color={C.blue} icon="🔄" label="THE LOOP: CODE CONNECT + MCP">
                        <strong>You publish</strong> Code Connect snippets from the codebase → <strong>Figma stores</strong> them on component nodes →
                        <strong> MCP reads</strong> them back when an AI requests design context → <strong>AI generates</strong> correct Swift code
                        using the real API. This is the virtuous cycle: better Code Connect → better AI output → faster development.
                    </CalloutBox>
                </Reveal>

                <Reveal delay={0.4}>
                    <PlainEnglishBox color={C.blue}>
                        Figma MCP is the reason Code Connect matters beyond Figma Dev Mode. It's not just for designers reading code —
                        it's the data source that AI uses to generate screens. Every Code Connect file you write directly improves AI accuracy.
                    </PlainEnglishBox>
                </Reveal>
            </div>
        </section>
    );
}
