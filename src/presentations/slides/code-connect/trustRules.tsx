import { useState } from "react";
import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, CalloutBox, TabButton, useLocalTabNav } from "../../shared.tsx";
import { P } from "./ui.tsx";
import { useRef } from "react";

const RULES = [
    {
        icon: "📸",
        label: "Screenshot First",
        description: "The screenshot is the source of truth. If a Code Connect snippet includes a component not visible in the screenshot, do NOT include it.",
        example: {
            filename: "Footer in Code Connect — but NOT in screenshot",
            code: `// Code Connect returned this:
Footer(
    parameters: .init(
        state: .default(
            parameters: .init(
                primaryButtonParameters: .init(
                    style: .primaryBrand,
                    content: .text("Continue"),
                    action: { }
                )
            )
        )
    )
)
// ⚠️ Screenshot shows NO footer → skip entirely`,
            highlights: [2, 8, 14],
        },
    },
    {
        icon: "🔍",
        label: "Verify Names",
        description: "Code Connect may reference wrong components. Compose-only snippets need manual lookup. Always search for the exact Figma layer name in the codebase.",
        example: {
            filename: "Figma says 'Headline' — not 'ProductHeadline'",
            code: `// Code Connect (Compose only):
<UiHeadline title="Loans" />

// WRONG — guessed by name similarity:
ProductHeadline(parameters: .init(...))

// CORRECT — searched Component/ for "Headline":
Headline(
    parameters: .init(
        title: "Loans",
        subtitle: "Application and management"
    )
)`,
            highlights: [5, 8, 9, 10],
        },
    },
    {
        icon: "🧹",
        label: "Replace Placeholders",
        description: 'Values like "Value", "Subvalue", "Label", "Description", backgroundColor: .blue are Code Connect defaults. Replace with real data from the screenshot or ViewModel.',
        example: {
            filename: "Placeholder values in Code Connect",
            code: `// Code Connect returned:
ListViewItem(
    parameters: .init(
        title: .init(text: "Title"),
        values: .init(
            value: "Value",      // ← placeholder
            subValue: "Subvalue" // ← placeholder
        )
    )
)

// Screenshot shows: text + chevron, NO values
// CORRECT:
ListViewItem(
    parameters: .init(
        title: .init(text: item.title),
        size: .medium,
        trailingToolbox: Toolbox(parameters: .chevronRight),
        action: { viewModel.handleIntent(.onFAQItemTap(item)) }
    )
)`,
            highlights: [5, 6, 13, 14, 15],
        },
    },
    {
        icon: "🔧",
        label: "Verify API",
        description: "Code Connect inits may be deprecated or incorrect. Always read the actual +Parameters.swift file to confirm init signatures and enum cases.",
        example: {
            filename: "Deprecated init in Code Connect",
            code: `// Code Connect used deprecated init:
CardContentTopWrapper(
    description: "Some text"     // ← deprecated
)

// Actual API requires:
CardContentTopWrapper(
    descriptionGroup: .init(
        description: .one("Some text"),
        standardTextStyle: .secondary
    )
)`,
            highlights: [3, 8, 9, 10],
        },
    },
    {
        icon: "📐",
        label: "Check Layout",
        description: "Read the Figma HTML structure for spacing. gap-[48px] between groups ≠ gap between all children. Don't apply uniform spacing where Figma shows different gaps.",
        example: {
            filename: "Figma HTML structure → spacing",
            code: `<!-- Figma response shows: -->
<div gap-[0px]>       <!-- no gap -->
    <Headline />
    <Widgets gap-[2px]>  <!-- 2px between cards -->
        <SectionTitle />
        <BannerCard />
        <BannerCard />
    </Widgets>
</div>
<div gap-[48px]>      <!-- 48px only here -->
    <FAQ />
</div>

// Map to SwiftUI:
VStack(spacing: .assets.spacing.none) {  // no gap
    headline
    loanProducts    // internal s025 gap
        .padding(.bottom, .assets.spacing.s600) // 48px
    faqSection
}`,
            highlights: [2, 4, 10, 15, 17],
        },
    },
];

export function TrustRulesSection() {
    const [active, setActive] = useState(0);
    const indexRef = useRef(active);
    indexRef.current = active;
    useLocalTabNav("s-trust", RULES.length, indexRef, setActive);

    const rule = RULES[active];

    return (
        <section id="s-trust" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.yellow}>CODE CONNECT TRUST</SectionLabel>
                    <SectionHeading sub="Code Connect is a work in progress. Treat snippets as hints, not gospel. Here's how to verify.">
                        Verification rules
                    </SectionHeading>
                </Reveal>

                <Reveal delay={0.1}>
                    <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
                        {RULES.map((r, i) => (
                            <TabButton key={i} active={active === i} color={P} icon={r.icon} label={r.label} onClick={() => setActive(i)} />
                        ))}
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 24 }}>
                    <Reveal delay={0.15}>
                        <div style={{
                            background: C.bg, border: `1px solid ${C.border}`, borderRadius: 14,
                            padding: "28px 24px", minHeight: 180,
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                                <div style={{
                                    width: 38, height: 38, borderRadius: 10,
                                    background: `${P}15`, border: `1px solid ${P}30`,
                                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19,
                                }}>
                                    {rule.icon}
                                </div>
                                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: C.text }}>
                                    {rule.label}
                                </span>
                            </div>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.7, margin: 0 }}>
                                {rule.description}
                            </p>
                        </div>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <CodeBlock filename={rule.example.filename} highlights={rule.example.highlights}>
                            {rule.example.code}
                        </CodeBlock>
                    </Reveal>
                </div>

                <Reveal delay={0.3}>
                    <div style={{ marginTop: 32 }}>
                        <CalloutBox color={C.yellow} icon="⚖️" label="PRIORITY ORDER">
                            When Code Connect and the screenshot disagree: <strong style={{ color: C.text }}>Screenshot {'>'} Swift source code {'>'} Code Connect snippet</strong>.
                            The screenshot shows designer intent. The Swift source shows the real API. Code Connect is a bridge that may have gaps.
                        </CalloutBox>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
