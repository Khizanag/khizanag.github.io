import { C, Reveal, SectionLabel, SectionHeading, CalloutBox } from "../../shared.tsx";
import { P, PhaseCard } from "./ui.tsx";

export function PhasesSection() {
    return (
        <section id="s-phases" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1300, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>THE 8 PHASES</SectionLabel>
                    <SectionHeading sub="Each phase either reads or writes to the shared screen-context.json. The orchestrator itself only delegates — it never emits Swift.">
                        Anatomy of a single run
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 28 }}>
                    <Reveal delay={0}>
                        <PhaseCard
                            phase="PHASE 0"
                            title="Validate & batch MCP"
                            color={C.blue}
                            bullets={[
                                "PascalCase check, module resolution, URL shape",
                                "1 pre-flight metadata call (FRAME, ≥320×568, ≥2 children)",
                                "4-tool parallel MCP batch with 24h disk cache",
                            ]}
                        />
                    </Reveal>
                    <Reveal delay={0.05}>
                        <PhaseCard
                            phase="PHASE 1"
                            title="Discover module"
                            color={C.blue}
                            bullets={[
                                "@module-discoverer reads container, paths, conformances",
                                "Cached under .github/.cache/module-discovery/",
                                "Discovery record v2 — schemaVersion 2 required",
                            ]}
                        />
                    </Reveal>
                    <Reveal delay={0.1}>
                        <PhaseCard
                            phase="PHASE 2"
                            title="Generate View"
                            color={C.purple}
                            bullets={[
                                "@figma-to-view writes <Screen>View.swift",
                                "Mandatory Design Tokens Sheet + State Variants table",
                                "Post-check: SpaceCore_UI_V2 imported, no placeholders",
                            ]}
                            delay={0.1}
                        />
                    </Reveal>
                    <Reveal delay={0.15}>
                        <PhaseCard
                            phase="PHASE 3"
                            title="Extract contract"
                            color={C.purple}
                            bullets={[
                                "@view-intent-analyzer parses the written View",
                                "Emits state fields, intents, nav triggers, L10n keys",
                                "Pre-renders template blocks for parallel scaffold",
                            ]}
                        />
                    </Reveal>
                    <Reveal delay={0.2}>
                        <PhaseCard
                            phase="PHASE 4"
                            title="Scaffold (parallel)"
                            color={P}
                            bullets={[
                                "@layer-scaffolder emits VM, Router, Factory, DI",
                                "Templates under .github/templates/scaffolds/",
                                "Domain / Data opt-in via flags — 4.5 appends L10n",
                            ]}
                        />
                    </Reveal>
                    <Reveal delay={0.25}>
                        <PhaseCard
                            phase="PHASE 5"
                            title="Patch existing"
                            color={P}
                            bullets={[
                                "@destination-patcher edits Destination.swift",
                                "Adds case + view() branch + Injection.swift entry",
                                "MARK anchors for a future @screen-remover",
                            ]}
                        />
                    </Reveal>
                    <Reveal delay={0.3}>
                        <PhaseCard
                            phase="PHASE 6"
                            title="Review vs Figma"
                            color={C.yellow}
                            bullets={[
                                "No self-audit — hands off to @figma-review",
                                "check-figma-review-skip.mjs gates the skip",
                                "Fail → back to Phase 2; pass → forward",
                            ]}
                        />
                    </Reveal>
                    <Reveal delay={0.35}>
                        <PhaseCard
                            phase="PHASE 7"
                            title="Verify + commit + log"
                            color={C.yellow}
                            bullets={[
                                "@screen-verifier runs 7 gates (T1 / T2 tiered)",
                                "7.5 commits + pushes on a feature branch",
                                "8 @session-logger writes .logs/<runId>_slug.md",
                            ]}
                        />
                    </Reveal>
                </div>

                <Reveal delay={0.5}>
                    <div style={{ marginTop: 22 }}>
                        <CalloutBox color={P} icon="🧭" label="THE ORCHESTRATION RULE">
                            Every phase appends to <code>.logs/&lt;runId&gt;/screen-context.json</code>.
                            Phase 8 won&apos;t even write the user-facing reply until <code>validate-screen-context.mjs</code> says the context is schema-complete. No reply = no run.
                        </CalloutBox>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
