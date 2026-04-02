import { useState, useRef } from "react";
import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, CalloutBox, TabButton, useLocalTabNav } from "../../shared.tsx";
import { P } from "./ui.tsx";

const TOKENS = [
    {
        icon: "🎨",
        label: "Colors",
        code: `// Theme-aware colors (auto dark/light mode)
Color.assets.theme.text.primary
Color.assets.theme.text.secondary
Color.assets.theme.bg.primary
Color.assets.theme.bg.secondary
Color.assets.theme.bg.tertiary
Color.assets.theme.icon.brand
Color.assets.theme.icon.primary
Color.assets.theme.icon.status.success
Color.assets.theme.icon.status.error
Color.assets.theme.border.primary

// Never hardcode hex values — always use tokens`,
        filename: "Colors — Color.assets.theme.*",
        highlights: [2, 5, 7, 12],
    },
    {
        icon: "📐",
        label: "Spacing",
        code: `// All available spacing tokens:
.assets.spacing.none    // 0pt
.assets.spacing.s025    // 2pt
.assets.spacing.s050    // 4pt
.assets.spacing.s100    // 8pt
.assets.spacing.s150    // 12pt
.assets.spacing.s200    // 16pt
.assets.spacing.s250    // 20pt
.assets.spacing.s300    // 24pt
.assets.spacing.s400    // 32pt
.assets.spacing.s500    // 40pt
.assets.spacing.s600    // 48pt
.assets.spacing.s800    // 64pt
.assets.spacing.s1000   // largest available

// ⚠️ No s1200 or higher exists!`,
        filename: "Spacing — .assets.spacing.*",
        highlights: [5, 9, 12, 14, 16],
    },
    {
        icon: "🔤",
        label: "Typography",
        code: `// Applied as a view modifier:
.typography(.assets.typo.heading.medium)
.typography(.assets.typo.body.medium)
.typography(.assets.typo.body.regular)
.typography(.assets.typo.caption.medium)

// Usage in a View:
Text("Hello")
    .typography(.assets.typo.heading.medium)
    .foregroundStyle(Color.assets.theme.text.primary)`,
        filename: "Typography — .typography() modifier",
        highlights: [2, 3, 4, 5, 9, 10],
    },
    {
        icon: "🖼",
        label: "Icons",
        code: `// Pattern: Image.assets.icons.<name>.<style>.ic<size>
Image.assets.icons.close.regular.ic24
Image.assets.icons.plus.regular.ic24
Image.assets.icons.chevronRight.regular.ic24
Image.assets.icons.alertCircle.filled.ic24
Image.assets.icons.crossMinimal.regular.ic24

// Sizes: ic16, ic24 (most common)
// Styles: regular, filled

// ⚠️ Always verify icon names exist in codebase
// .icons.addCircle does NOT exist — use .icons.plus`,
        filename: "Icons — Image.assets.icons.*",
        highlights: [2, 3, 4, 12],
    },
    {
        icon: "📏",
        label: "Sizes & Radius",
        code: `// Frame sizes
.frame(width: .assets.size.s300)   // 24pt
.frame(width: .assets.size.s400)   // 32pt
.frame(width: .assets.size.s500)   // 40pt
.frame(width: .assets.size.s600)   // 48pt
.frame(width: .assets.size.s1000)  // 80pt

// Corner radius
.clipShape(
    RoundedRectangle(
        cornerRadius: .assets.cornerRadius.xl2
    )
)

// Opacity
.opacity(.assets.opacity.o100)      // full
.opacity(.assets.opacity.disabled)   // dimmed`,
        filename: "Sizes, Radius, Opacity",
        highlights: [2, 6, 11, 16, 17],
    },
];

export function DesignTokensSection() {
    const [active, setActive] = useState(0);
    const indexRef = useRef(active);
    indexRef.current = active;
    useLocalTabNav("s-tokens", TOKENS.length, indexRef, setActive);

    const token = TOKENS[active];

    return (
        <section id="s-tokens" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.blue}>DESIGN TOKENS</SectionLabel>
                    <SectionHeading sub="Every color, spacing value, icon, and typography style comes from the design token system. Never hardcode values.">
                        The .assets token system
                    </SectionHeading>
                </Reveal>

                <Reveal delay={0.1}>
                    <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
                        {TOKENS.map((t, i) => (
                            <TabButton key={i} active={active === i} color={C.blue} icon={t.icon} label={t.label} onClick={() => setActive(i)} />
                        ))}
                    </div>
                </Reveal>

                <Reveal delay={0.15}>
                    <CodeBlock filename={token.filename} highlights={token.highlights}>
                        {token.code}
                    </CodeBlock>
                </Reveal>

                <Reveal delay={0.3}>
                    <div style={{ marginTop: 32 }}>
                        <CalloutBox color={C.blue} icon="🔗" label="AUTOCOMPLETE">
                            Type <code style={{ fontFamily: "'JetBrains Mono', monospace", color: C.blue }}>.assets.</code> in Xcode and Copilot/autocomplete
                            will show all available tokens. The token names match the Figma design token names in the S.I.N.S. system.
                        </CalloutBox>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
