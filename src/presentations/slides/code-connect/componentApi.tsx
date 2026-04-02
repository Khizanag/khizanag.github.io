import { useState, useRef } from "react";
import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, CalloutBox, TabButton, useLocalTabNav } from "../../shared.tsx";
import { P } from "./ui.tsx";

const COMPONENTS = [
    {
        icon: "📦",
        label: "Parameters Pattern",
        code: `// Every S.I.N.S. component uses Parameters struct
Headline(
    parameters: .init(
        title: "Loans",
        subtitle: "Application and management"
    )
)

SectionTitle(
    parameters: .init(
        title: "Apply for a loan",
        hasHorizontalPadding: true
    )
)

Footer(
    parameters: .init(
        state: .default(
            parameters: .init(
                primaryButtonParameters: .init(
                    style: .primaryBrand,
                    content: .text("Continue"),
                    action: { /* action */ }
                )
            )
        )
    )
)`,
        filename: "Parameters — the universal init pattern",
        highlights: [2, 3, 9, 10, 16, 17],
    },
    {
        icon: "🧰",
        label: "Toolbox",
        code: `// Toolbox is a VIEW, not an enum
// ListViewItem expects Toolbox? (the view)

// ✅ CORRECT — wrap in Toolbox view:
ListViewItem(
    parameters: .init(
        title: .init(text: "FAQ item"),
        size: .medium,
        trailingToolbox: Toolbox(parameters: .chevronRight),
        action: { /* tap */ }
    )
)

// ❌ WRONG — bare enum:
// trailingToolbox: .chevronRight  ← won't compile

// Available Toolbox.Parameters:
// .icon(Image)         .chevronRight
// .switch(...)         .checkmark(...)
// .checkbox(...)       .radioButton(...)
// .avatar(...)         .loader
// .slot(() -> AnyView)`,
        filename: "Toolbox — wrapping is required",
        highlights: [4, 9, 15],
    },
    {
        icon: "🃏",
        label: "BannerCardSmall",
        code: `BannerCardSmall(
    parameters: .init(
        size: .medium,  // .small, .medium, .large, .extraLarge
        variant: .default(
            .init(
                appearance: .default,  // .contrast, .contrastOnLight
                backgroundColor: .clear,
                cardContent: .init(
                    top: .init(
                        description: "Top text"
                    ),
                    down: .init(
                        label: "Title",
                        description: "Description text"
                    )
                )
            )
        )
    )
)

// Other variant:
// .notLoaded(.init(title: "Title", description: "Desc"))`,
        filename: "BannerCardSmall — card with content sections",
        highlights: [3, 6, 7, 9, 12, 13],
    },
    {
        icon: "📋",
        label: "ListViewItem",
        code: `// Basic list item with chevron
ListViewItem(
    parameters: .init(
        title: .init(text: "Item title"),
        size: .medium,
        trailingToolbox: Toolbox(parameters: .chevronRight),
        action: { /* tap handler */ }
    )
)

// With leading icon
ListViewItem(
    parameters: .init(
        title: .init(text: "Settings"),
        size: .medium,
        leadingToolbox: Toolbox(
            parameters: .icon(Image.assets.icons.settings.regular.ic24)
        ),
        trailingToolbox: Toolbox(parameters: .chevronRight)
    )
)

// Title text colors: .primary, .secondary, .destructive
// Sizes: .small (caption), .medium (body)`,
        filename: "ListViewItem — configurable list rows",
        highlights: [4, 5, 6, 14, 16, 17, 19],
    },
    {
        icon: "🔘",
        label: "Buttons",
        code: `// StandardButton — primary actions
StandardButton(
    configuration: .init(
        style: .primaryBrand,  // .primaryNeutral, .secondaryOutlined, .tertiary
        content: .text("Continue"),
        action: { /* tap */ }
    )
)

// IconButton — icon-only actions
IconButton(
    configuration: .init(
        style: .plainNeutral,  // .primary(.medium), .secondaryDefault(.small)
        icon: .assets.icons.close.regular.ic24,
        action: { /* tap */ }
    )
)

// Styles: .primaryBrand, .primaryNeutral, .primarySuccess,
//         .primaryError, .secondaryOutlined, .secondaryElevated,
//         .tertiary, .plainBrand, .plainNeutral`,
        filename: "StandardButton & IconButton",
        highlights: [4, 5, 14, 15],
    },
];

export function ComponentApiSection() {
    const [active, setActive] = useState(0);
    const indexRef = useRef(active);
    indexRef.current = active;
    useLocalTabNav("s-components", COMPONENTS.length, indexRef, setActive);

    const comp = COMPONENTS[active];

    return (
        <section id="s-components" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>COMPONENT APIs</SectionLabel>
                    <SectionHeading sub="The S.I.N.S. component library uses consistent patterns. Learn these once, use them everywhere.">
                        How S.I.N.S. components work
                    </SectionHeading>
                </Reveal>

                <Reveal delay={0.1}>
                    <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
                        {COMPONENTS.map((c, i) => (
                            <TabButton key={i} active={active === i} color={P} icon={c.icon} label={c.label} onClick={() => setActive(i)} />
                        ))}
                    </div>
                </Reveal>

                <Reveal delay={0.15}>
                    <CodeBlock filename={comp.filename} highlights={comp.highlights}>
                        {comp.code}
                    </CodeBlock>
                </Reveal>

                <Reveal delay={0.3}>
                    <div style={{ marginTop: 32 }}>
                        <CalloutBox color={P} icon="🔎" label="DISCOVERY">
                            Component source lives in <code style={{ fontFamily: "'JetBrains Mono', monospace", color: P }}>Sources/SpaceCore_UI_V2/Component/</code>.
                            Each component has <code style={{ fontFamily: "'JetBrains Mono', monospace", color: P }}>+Parameters.swift</code> — read it to see
                            all available inits, enums, and default values. The Showroom app lets you preview every variant.
                        </CalloutBox>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
