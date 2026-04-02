import { useState } from "react";
import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, TabButton } from "../../shared.tsx";
import { P } from "./ui.tsx";

const PATTERNS = [
    {
        id: "props",
        icon: "📝",
        label: "Simple Props",
        description: "Map Figma text properties directly to Swift parameters with @FigmaProp.",
        code: `@FigmaProp("✍️ Title")
var title: String = "Title"

@FigmaProp("✍️ Description")
var description: String = "Description"

var body: some View {
    InfoCard(parameters: .init(
        title: title,
        description: description
    ))
}`,
        filename: "InfoCard.figma.swift",
        highlights: [1, 4],
    },
    {
        id: "variants",
        icon: "🎛",
        label: "Variant Dicts",
        description: "Split structs by Figma variant to show clean, resolved code per variant — no conditionals.",
        code: `// One struct per variant value
struct PrimaryButtonCodeConnect: FigmaConnect {
    let variant = ["Type": "Primary"]
    var body: some View {
        StandardButton(configuration: .primary(...))
    }
}

struct SecondaryButtonCodeConnect: FigmaConnect {
    let variant = ["Type": "Secondary"]
    var body: some View {
        StandardButton(configuration: .secondary(...))
    }
}`,
        filename: "StandardButton.figma.swift",
        highlights: [3, 10],
    },
    {
        id: "visibility",
        icon: "👀",
        label: "Visibility Toggles",
        description: "Designers use 👀 toggles to show/hide optional fields. Split by toggle state to avoid ternaries.",
        code: `// 👀 Description = true → show the text
struct WithDescCodeConnect: FigmaConnect {
    let variant = ["👀 Description": "true"]
    @FigmaProp("✍️ Description")
    var description: String = "Description"
    var body: some View {
        ToggleCard(parameters: .init(
            description: description
        ))
    }
}

// 👀 Description = false → pass nil
struct NoDescCodeConnect: FigmaConnect {
    let variant = ["👀 Description": "false"]
    var body: some View {
        ToggleCard(parameters: .init(
            description: nil
        ))
    }
}`,
        filename: "ToggleCard.figma.swift",
        highlights: [3, 15],
    },
    {
        id: "text",
        icon: "✍️",
        label: "Text Props",
        description: "Dynamic text content from Figma's component properties panel flows into the rendered snippet.",
        code: `@FigmaProp("✍️ Label")
var label: String = "Label"

@FigmaProp("✍️ Error Message")
var errorMessage: String = "Error"

var body: some View {
    InputField(parameters: .init(
        label: label,
        errorMessage: errorMessage
    ))
}`,
        filename: "InputField.figma.swift",
        highlights: [1, 4],
    },
    {
        id: "disabled",
        icon: "🚫",
        label: "Disabled State",
        description: "Figma's Disabled boolean maps to the .disabled() view modifier — clean SwiftUI pattern.",
        code: `@FigmaProp("Disabled")
var isDisabled: Bool = false

var body: some View {
    StandardButton(configuration: .primary(
        title: label,
        action: { /* TODO: - Add action */ }
    ))
    .disabled(isDisabled)
}`,
        filename: "StandardButton.figma.swift",
        highlights: [1, 10],
    },
];

export function PatternsSection() {
    const [active, setActive] = useState("props");
    const pattern = PATTERNS.find((p) => p.id === active)!;

    return (
        <section id="s-patterns" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>KEY PATTERNS</SectionLabel>
                    <SectionHeading sub="Five repeatable patterns cover every component in the S.I.N.S. design system.">
                        Mapping patterns
                    </SectionHeading>
                </Reveal>

                <Reveal delay={0.1}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
                        {PATTERNS.map((p) => (
                            <TabButton key={p.id} active={active === p.id} color={P} icon={p.icon} label={p.label} onClick={() => setActive(p.id)} />
                        ))}
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 24 }}>
                    <Reveal delay={0.15}>
                        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "28px 24px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                                <span style={{ fontSize: 28 }}>{pattern.icon}</span>
                                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: C.text }}>{pattern.label}</span>
                            </div>
                            <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                                {pattern.description}
                            </p>
                        </div>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <CodeBlock filename={pattern.filename} highlights={pattern.highlights}>
                            {pattern.code}
                        </CodeBlock>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
