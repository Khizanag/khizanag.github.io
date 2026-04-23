import { useState } from "react";
import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, TabButton } from "../../shared.tsx";
import { NATIVE } from "./ui.tsx";

const EXAMPLES = [
    {
        id: "button",
        icon: "🔘",
        label: "Button",
        description: "StandardButtonV3 with style enum, label, loading, and inverted disabled mapping. The most common pattern in our codebase — 9 button Code Connect files.",
        code: `struct StandardButtonV3PrimaryDoc: FigmaConnect {
    let component = StandardButtonV3.self
    let figmaNodeUrl = "https://figma.com/design/
        0qdDkhMg8fcNeBGZ4jo4br/SINS?node-id=7-38"
    let variant = ["Style": "Primary Brand"]

    @FigmaString("✍️ Label")
    var label = "Submit"

    @FigmaBoolean("Loading")
    var loading = false

    @FigmaBoolean("Disabled",
        mapping: [true: false, false: true])
    var isEnabled = true

    var body: some View {
        StandardButtonV3(
            style: .primaryBrand,
            label: label,
            isLoading: loading,
            action: { /* action */ }
        )
        .disabled(!isEnabled)
    }
}`,
        filename: "StandardButtonV3Primary.figma.swift",
        highlights: [5, 7, 10, 13],
    },
    {
        id: "chip",
        icon: "🏷",
        label: "Chip",
        description: "ChipV3 has 3 variant axes (Variant, Appearance, Size) — but Figma models 'Inverse' as a Variant while Swift uses appearance: .inverse. Requires separate structs.",
        code: `// Standard chip — maps Variant to chipVariant
struct ChipDoc: FigmaConnect {
    let component = ChipV3.self

    @FigmaEnum("Variant", mapping: [
        "Primary": .primary,
        "Outline": .outline,
        "Dash":    .dash,
    ])
    var chipVariant: ChipV3.Variant = .primary

    @FigmaEnum("Size", mapping: [
        "Medium": .medium,
        "Large":  .large,
    ])
    var size: ChipV3.Size = .medium

    var body: some View {
        ChipV3(variant: chipVariant,
            appearance: .default,
            size: size, label: "Filter",
            isActive: false, action: {})
    }
}

// Inverse — needs separate struct!
struct ChipInverseDoc: FigmaConnect {
    let component = ChipV3.self
    let variant = ["Variant": "Inverse"]

    var body: some View {
        ChipV3(variant: .primary,
            appearance: .inverse,
            size: .medium, label: "Filter",
            isActive: false, action: {})
    }
}`,
        filename: "ChipV3.figma.swift",
        highlights: [5, 12, 29],
    },
    {
        id: "input",
        icon: "📝",
        label: "Input Field",
        description: "InputFieldV3 uses generic ViewBuilder slots for adornments. The FigmaInstance wrapper handles instance swaps for start/end icons.",
        code: `struct InputFieldDoc: FigmaConnect {
    let component = InputFieldV3.self
    let figmaNodeUrl = "https://figma.com/design/
        0qdDkhMg8fcNeBGZ4jo4br/SINS?node-id=62-112"

    @FigmaString("✍️ Placeholder")
    var placeholder = "Enter value"

    @FigmaString("✍️ Label")
    var label = "Label"

    @FigmaBoolean("Error")
    var isError = false

    @FigmaString("✍️ Hint")
    var hint = ""

    var body: some View {
        InputFieldV3(
            text: .constant(""),
            placeholder: placeholder,
            isError: isError,
            hint: hint.isEmpty ? nil : hint,
            label: label.isEmpty ? nil : label
        )
    }
}`,
        filename: "InputFieldV3.figma.swift",
        highlights: [6, 9, 12, 15],
    },
    {
        id: "avatar",
        icon: "👤",
        label: "Avatar",
        description: "AvatarV3 has associated-value enums (icon(Image), text(String), profile(Image?)). Native Swift can express enum case but cannot map instance swaps into associated values.",
        code: `struct AvatarTextDoc: FigmaConnect {
    let component = AvatarV3.self
    let variant = ["Variant": "Text"]

    @FigmaEnum("Size", mapping: [
        "Extra Small": .extraSmall,
        "Small":       .small,
        "Medium":      .medium,
        "Large":       .large,
    ])
    var size: AvatarV3.Size = .medium

    @FigmaEnum("On Background", mapping: [
        "Primary":   .primary,
        "Secondary": .secondary,
        "Tertiary":  .tertiary,
    ])
    var onBackground: AvatarV3.OnBackground
        = .primary

    var body: some View {
        AvatarV3(
            size: size,
            variant: .text("GK"),
            onBackground: onBackground,
            hasShadow: false,
            isRounded: true
        )
    }
}`,
        filename: "AvatarV3Text.figma.swift",
        highlights: [3, 5, 13],
    },
];

export function NativeSwiftSection() {
    const [active, setActive] = useState("button");
    const example = EXAMPLES.find((e) => e.id === active)!;

    return (
        <section id="s-native-swift" style={{ background: C.bg, borderTop: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={NATIVE}>OPTION A &mdash; SWIFT</SectionLabel>
                    <SectionHeading sub="Real examples from our S.I.N.S. design system using @FigmaString, @FigmaEnum, @FigmaBoolean property wrappers and FigmaConnect protocol.">
                        Native Swift implementation
                    </SectionHeading>
                </Reveal>

                <Reveal delay={0.1}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
                        {EXAMPLES.map((e) => (
                            <TabButton key={e.id} active={active === e.id} color={NATIVE} icon={e.icon} label={e.label} onClick={() => setActive(e.id)} />
                        ))}
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 24 }}>
                    <Reveal delay={0.15}>
                        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "28px 24px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                                <span style={{ fontSize: 28 }}>{example.icon}</span>
                                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: C.text }}>{example.label}</span>
                            </div>
                            <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7, margin: 0 }}>{example.description}</p>
                        </div>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <CodeBlock filename={example.filename} highlights={example.highlights}>{example.code}</CodeBlock>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
