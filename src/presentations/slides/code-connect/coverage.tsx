import { C, Reveal, SectionLabel, SectionHeading, TagChip, CalloutBox } from "../../shared.tsx";
import { P } from "./ui.tsx";
import { CategoryBadge } from "./ui.tsx";

const CATEGORIES = [
    { label: "Buttons",              count: 13, color: P },
    { label: "Content & Layout",     count: 17, color: C.blue },
    { label: "Cards",                count: 14, color: C.accent },
    { label: "Feedback & Status",    count: 12, color: C.yellow },
    { label: "Navigation",           count: 8,  color: P },
    { label: "Input Fields",         count: 7,  color: C.blue },
    { label: "Selection Controls",   count: 4,  color: C.accent },
    { label: "Toggles",              count: 3,  color: C.yellow },
    { label: "Calendar",             count: 2,  color: P },
    { label: "Progress",             count: 2,  color: C.blue },
];

const NOT_COVERED = [
    { name: "Accordion", reason: "No Swift implementation yet" },
    { name: "Step Indicator", reason: "No Swift implementation yet" },
    { name: "Aspect Ratio", reason: "No Swift implementation yet" },
    { name: "Bank Card Stack", reason: "No Swift implementation" },
    { name: "List Actions", reason: "No Swift implementation" },
    { name: "Pass Cell", reason: "No Swift implementation" },
    { name: "Header", reason: "Lives in presentation layer, not Core UI" },
    { name: "Shimmer", reason: "ViewModifier (.shimmering()) — comment-only file" },
];

export function CoverageSection() {
    return (
        <section id="s-coverage" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.accent}>COVERAGE</SectionLabel>
                    <SectionHeading sub="70 approved components across 10 categories. Every component with a Parameters-based API is connected.">
                        What we cover
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 32 }}>
                    {CATEGORIES.map((cat, i) => (
                        <CategoryBadge key={cat.label} label={cat.label} count={cat.count} color={cat.color} delay={i * 0.04} />
                    ))}
                </div>

                <Reveal delay={0.3}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <div style={{
                            fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 38, color: P,
                            lineHeight: 1, letterSpacing: "-0.03em",
                        }}>
                            249
                        </div>
                        <div>
                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: C.text }}>Total connections published</div>
                            <div style={{ fontSize: 13, color: C.muted }}>Many components have multiple variant structs (one per Figma variant)</div>
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.35}>
                    <div style={{ marginBottom: 24 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                            <TagChip color={C.red} dot={false}>NOT COVERED</TagChip>
                            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 13, color: C.muted }}>
                                Components without Swift implementation or outside this package
                            </span>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                            {NOT_COVERED.map(({ name, reason }) => (
                                <div key={name} style={{ padding: "12px 16px", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10 }}>
                                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: C.text, marginBottom: 4 }}>{name}</div>
                                    <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{reason}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.4}>
                    <CalloutBox color={P} icon="📊" label="FIRST PASS STRATEGY">
                        We prioritized components with clean Parameters-based APIs. Components that require ViewBuilder generics or
                        lack a Swift implementation were documented with comment-only files or deferred to future iterations.
                    </CalloutBox>
                </Reveal>
            </div>
        </section>
    );
}
