import { C, Reveal, SectionLabel, SectionHeading, FeatureCard, CalloutBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function DayTwoSection() {
    return (
        <section id="s-day-two" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1150, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.blue}>DAY 2 — REFACTOR &amp; REGENERATE</SectionLabel>
                    <SectionHeading sub="Six weeks later the design changes, the business logic exists, and a junior wants to add a section. The pipeline is built to be friendly here — not just on day one.">
                        What happens after you have shipped
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, marginTop: 28 }}>
                    <Reveal delay={0}>
                        <FeatureCard
                            icon="🎨"
                            title="Designer changes the layout"
                            color={C.blue}
                            description="Run /figma-review on the screen — RED/YELLOW/GREEN report against the current Figma. Apply diffs by hand or re-invoke @figma-to-view scoped to the View only. ViewModel / Router / DI untouched."
                        />
                    </Reveal>
                    <Reveal delay={0.08}>
                        <FeatureCard
                            icon="🧠"
                            title="Business logic landed"
                            color={C.accent}
                            description="The TODOs in the ViewModel got replaced with real fetch + error handling. Regeneration is opt-in per file — the pipeline never overwrites a file whose mtime is newer than the last session log."
                        />
                    </Reveal>
                    <Reveal delay={0.16}>
                        <FeatureCard
                            icon="➕"
                            title="Add a sub-section"
                            color={C.purple}
                            description="@figma-to-view + the existing scaffolds. New child views drop into the same View file; new state slices append to the existing State struct. Destination + Injection don't move."
                        />
                    </Reveal>
                </div>

                <Reveal delay={0.28}>
                    <div style={{ marginTop: 28 }}>
                        <CalloutBox color={P} icon="🔁" label="REGENERATION POLICY">
                            <strong>The pipeline is additive by default.</strong> Re-running /figma-to-screen on an existing screen detects the prior session log,
                            asks before overwriting any file, and only ever appends to Destination / Injection / Localizable.strings.
                            Hand-edited files are <em>never</em> silently replaced — the gate is the file mtime vs. the last logged write.
                        </CalloutBox>
                    </div>
                </Reveal>

                <Reveal delay={0.4}>
                    <div style={{ marginTop: 16 }}>
                        <CalloutBox color={C.yellow} icon="⚠️" label="CONFLICT WITH PARALLEL WORK">
                            Two devs scaffolding into the same module on the same day → both touch <code>Destination.swift</code> and root <code>Injection.swift</code>.
                            Git merge resolves cleanly because each scaffold lands under its own MARK anchor. Conflicts only happen when two scaffolds choose the
                            same screen name — the pipeline rejects this at Phase 1 with a clear error.
                        </CalloutBox>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
