import { useState } from "react";
import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, TabButton } from "../../shared.tsx";
import { P } from "./ui.tsx";

const PATTERNS = [
    {
        id: "props",
        icon: "📝",
        label: "Simple Props",
        description: "Map Figma text properties directly to Swift parameters with @FigmaProp. The rendered snippet updates live when designers change text in Figma's properties panel.",
        code: `@FigmaProp("✍️ Title")
var title: String = "Title"

@FigmaProp("✍️ Description")
var description: String = "Description"

var body: some View {
    InfoCard(
        parameters: .init(
            title: title,
            description: description
        )
    )
}`,
        filename: "InfoCard.figma.swift",
        highlights: [1, 4],
    },
    {
        id: "enums",
        icon: "🔀",
        label: "Enum Mapping",
        description: "The most common pattern. Map Figma variant strings to Swift enum cases. Works with any CaseIterable enum. Must use display names only — no #ID suffixes.",
        code: `@FigmaProp("Appearance", mapping: [
    "Default": .default,
    "Contrast": .contrast,
    "Contrast onLight": .contrastOnLight,
])
var appearance: BannerCardSmall.Appearance = .default

@FigmaProp("Size", mapping: [
    "Medium": .medium,
    "Large": .large,
])
var size: Chip.Size = .medium

// Boolean enums (string-based in Figma)
@FigmaProp("Active", mapping: ["True": true, "False": false])
var active: Bool = false`,
        filename: "BannerCardSmall.figma.swift",
        highlights: [1, 8, 15],
    },
    {
        id: "variants",
        icon: "🎛",
        label: "Variant Dicts",
        description: "When Figma and Swift model the same concept differently, split into multiple structs. Example: Figma has 'Inverse' as a Variant, but Swift has it as an Appearance.",
        code: `// Figma: Variant = "Primary" / "Outline" / "Dash"
struct ChipCodeConnect: FigmaConnect {
    let component = Chip.self
    // No variant dict → matches all non-Inverse
    @FigmaProp("Variant", mapping: [
        "Primary": .primary,
        "Outline": .outline,
        "Dash": .dash,
    ])
    var chipVariant: Chip.Variant = .primary
}

// Figma: Variant = "Inverse"
// Swift: appearance: .inverse (different axis!)
struct ChipInverseCodeConnect: FigmaConnect {
    let component = Chip.self
    let variant = ["Variant": "Inverse"]
    var body: some View {
        Chip(parameters: .init(
            variant: .primary,
            appearance: .inverse, // ← mapped here
            ...
        ))
    }
}`,
        filename: "Chip.figma.swift",
        highlights: [5, 17],
    },
    {
        id: "visibility",
        icon: "👀",
        label: "Visibility Toggles",
        description: "Figma can't pass nil. Designers use 👀 toggles to show/hide. Split by toggle — never use ternaries in body (parser errors).",
        code: `// 👀 Footer = true → show footer
struct P2PCardWithFooter: FigmaConnect {
    let variant = [
        "Collapsed": "False",
        "State": "Default",
        "👀 Footer": true,
    ]
    var body: some View {
        P2PCard(parameters: .init(
            variant: .expanded(.init(
                ...,
                footer: .init(
                    amounts: [10_000, 50_000] as [Decimal]
                )
            ))
        ))
    }
}

// 👀 Footer = false → pass nil
struct P2PCardNoFooter: FigmaConnect {
    let variant = [
        "Collapsed": "False",
        "State": "Default",
        "👀 Footer": false,
    ]
    var body: some View {
        P2PCard(parameters: .init(
            variant: .expanded(.init(
                ...,
                footer: nil
            ))
        ))
    }
}`,
        filename: "P2PCard.figma.swift",
        highlights: [6, 23],
    },
    {
        id: "disabled",
        icon: "🚫",
        label: "Disabled State",
        description: "Some components use .disabled() modifier, others use isEnabled: false in init. Check the Parameters file to know which pattern your component uses.",
        code: `// Pattern A: .disabled() modifier (BankCardButton)
struct BankCardButtonDisabled: FigmaConnect {
    let variant = ["Disabled": "True"]
    var body: some View {
        BankCardButton(parameters: .init(
            appearance: appearance,
            title: "Add card",
            action: { /* TODO */ }
        ))
        .disabled(true) // SwiftUI modifier
    }
}

// Pattern B: isEnabled parameter (NavigationButton)
struct ButtonNavDisabled: FigmaConnect {
    let variant = ["Disabled": "True"]
    var body: some View {
        NavigationButton(parameters: .init(
            appearance: appearance,
            step: step,
            isEnabled: false, // Parameter, not modifier
            action: { /* TODO */ }
        ))
    }
}`,
        filename: "BankCardButton.figma.swift",
        highlights: [10, 21],
    },
    {
        id: "comment",
        icon: "💬",
        label: "Comment-Only",
        description: "For ViewModifiers, generic APIs, and components with no direct mapping. The file shows usage as code comments — no FigmaConnect struct.",
        code: `// Shimmer.figma.swift — ViewModifier, not a View
// On iOS, Shimmer is a ViewModifier:
//
//     SomeView()
//         .shimmering(true)
//
//     SomeView()
//         .shimmering(
//             true,
//             parameters: .init(overlayColor: .black)
//         )
//
// Code Connect cannot map ViewModifiers.

// TabNavigation.figma.swift — Generic ViewBuilder
// TabNavigationView is generic:
//
// TabNavigationView(parameters: .init(
//     tabs: $tabs,
//     navigationPublisher: subject.eraseToAnyPublisher(),
//     content: { tab in ... }
// ))`,
        filename: "Shimmer.figma.swift",
        highlights: [],
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
                    <SectionHeading sub="Seven repeatable patterns cover every component in the S.I.N.S. design system — from simple text props to comment-only documentation.">
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
