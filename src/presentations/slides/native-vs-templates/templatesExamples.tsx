import { useState } from "react";
import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, TabButton } from "../../shared.tsx";
import { TEMPLATE } from "./ui.tsx";

const EXAMPLES = [
    {
        id: "button",
        icon: "🔘",
        label: "Button (Swift)",
        description: "The same StandardButtonV3 — but written as a TypeScript template outputting Swift code. Full conditional logic, computed modifiers, and optional sections.",
        code: `// url=https://figma.com/design/.../SINS?node-id=7-38
// component=StandardButtonV3
// source=Sources/.../StandardButtonV3.swift
import figma from "figma"

const i = figma.selectedInstance
const label = i.getString("✍️ Label")
const loading = i.getBoolean("Loading")
const disabled = i.getBoolean("Disabled")
const style = i.getEnum("Style", {
    "Primary Brand":     ".primaryBrand",
    "Primary Neutral":   ".primaryNeutral",
    "Primary Success":   ".primarySuccess",
    "Primary Error":     ".primaryError",
    "Secondary Default": ".secondaryDefault",
    "Tertiary Default":  ".tertiaryDefault",
    "Plain Neutral":     ".plainNeutral",
    "Plain Brand":       ".plainBrand",
})

// Conditional modifiers — impossible in native!
const mods: string[] = []
if (disabled) mods.push("    .disabled(true)")
if (loading)  mods.push("    .isLoading(true)")
const modStr = mods.length
    ? "\\n" + mods.join("\\n") : ""

export default {
    example: figma.code\`StandardButtonV3(
    style: \${style},
    label: "\${label}",
    isLoading: \${loading},
    action: { /* action */ }
)\${modStr}\`,
    metadata: { nestable: true },
}`,
        filename: "StandardButtonV3.figma.ts",
        highlights: [10, 22, 23, 24],
    },
    {
        id: "chip",
        icon: "🏷",
        label: "Chip (Swift)",
        description: "ChipV3 with all 18 variant combinations in a single file. No need for separate structs per variant — inline if/else handles the Inverse case cleanly.",
        code: `// url=https://figma.com/design/.../SINS?node-id=...
// component=ChipV3
import figma from "figma"

const i = figma.selectedInstance
const label = i.getString("✍️ Label")
const rawVariant = i.getPropertyValue("Variant")
const isInverse = rawVariant === "Inverse"

// Single file handles ALL variants!
const appearance = isInverse ? ".inverse" : ".default"
const variant = isInverse
    ? ".primary"
    : i.getEnum("Variant", {
        "Primary": ".primary",
        "Outline": ".outline",
        "Dash":    ".dash",
    })
const size = i.getEnum("Size", {
    "Medium": ".medium",
    "Large":  ".large",
})

export default {
    example: figma.code\`ChipV3(
    variant: \${variant},
    appearance: \${appearance},
    size: \${size},
    label: "\${label}",
    isActive: false,
    action: {}
)\`,
    metadata: { nestable: true },
}`,
        filename: "ChipV3.figma.ts",
        highlights: [7, 8, 10, 11, 12],
    },
    {
        id: "avatar",
        icon: "👤",
        label: "Avatar (Swift)",
        description: "AvatarV3 with associated-value enum handling. Templates can construct .text(\"GK\"), .icon(Image(...)), .profile(nil) dynamically based on the selected variant.",
        code: `// url=https://figma.com/design/.../SINS?node-id=...
// component=AvatarV3
import figma from "figma"

const i = figma.selectedInstance
const rawVariant = i.getPropertyValue("Variant")
const size = i.getEnum("Size", {
    "Extra Small": ".extraSmall",
    "Small": ".small", "Medium": ".medium",
    "Large": ".large",
})
const bg = i.getEnum("On Background", {
    "Primary":   ".primary",
    "Secondary": ".secondary",
    "Tertiary":  ".tertiary",
})

// Dynamic associated-value construction!
let variantCode: string
switch (rawVariant) {
    case "Text":
        variantCode = \`.text("GK")\`; break
    case "Icon":
        variantCode = \`.icon(Image(...))\`; break
    case "Profile":
        variantCode = \`.profile(nil)\`; break
    default:
        variantCode = \`.logo(Image(...))\`
}

export default {
    example: figma.code\`AvatarV3(
    size: \${size},
    variant: \${variantCode},
    onBackground: \${bg}
)\`,
}`,
        filename: "AvatarV3.figma.ts",
        highlights: [6, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
    },
    {
        id: "compose",
        icon: "📅",
        label: "Calendar (Kotlin)",
        description: "The same template file can output Kotlin/Compose code. Switch the output language by changing the string content — no separate parser needed.",
        code: `// url=https://figma.com/design/.../SINS?node-id=...
// component=UiCalendarDay
import figma from "figma"

const i = figma.selectedInstance
const day = i.getString("Day")
const status = i.getEnum("Status", {
    "NoSelected":    "UiSelectedDayStatus.NoSelected",
    "NonSelectable": "UiSelectedDayStatus.NonSelectable",
    "FirstLastDay":  "UiSelectedDayStatus.FirstLastDay",
    "Today":         "UiSelectedDayStatus.Today",
})

export default {
    example: figma.code\`UiCalendarDay(
    day = UiCalendarDayData(
        "\${day}",
        \${status}
    ),
    status = \${status},
    onDaySelected = { day ->
        /* Handle selection */
    }
)\`,
    metadata: { nestable: true },
}`,
        filename: "UiCalendarDay.figma.ts",
        highlights: [7, 8, 9, 10, 11],
    },
];

export function TemplatesExamplesSection() {
    const [active, setActive] = useState("button");
    const example = EXAMPLES.find((e) => e.id === active)!;

    return (
        <section id="s-templates-examples" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={TEMPLATE}>OPTION B &mdash; EXAMPLES</SectionLabel>
                    <SectionHeading sub="The exact same S.I.N.S. components — StandardButtonV3, ChipV3, AvatarV3, UiCalendarDay — written as TypeScript templates instead of native code.">
                        Same components, template syntax
                    </SectionHeading>
                </Reveal>

                <Reveal delay={0.1}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
                        {EXAMPLES.map((e) => (
                            <TabButton key={e.id} active={active === e.id} color={TEMPLATE} icon={e.icon} label={e.label} onClick={() => setActive(e.id)} />
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
