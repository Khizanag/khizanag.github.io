import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, PlainEnglishBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function ContextSection() {
    return (
        <section id="s-context" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1150, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.yellow}>SHARED CONTRACT</SectionLabel>
                    <SectionHeading sub="One JSON file, one writer per phase, every downstream phase reads it. No phase goes back to Figma or re-probes the filesystem for information an earlier phase already proved.">
                        screen-context.json — the single source of truth
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 28, marginTop: 28 }}>
                    <Reveal delay={0}>
                        <CodeBlock filename=".logs/<runId>/screen-context.json (schema v1)">{`{
  "runId":   "20260422T1045_dish_details",
  "inputs":  { "screenName": "DishDetails", "module": "Dishes", ... },
  "figma":   { "nodeId": "5294:65016", "cacheHits": 3, ... },
  "discovery": {
    "schemaVersion": 2,
    "Mod":            "NewArch_Dishes",
    "ContainerNS":    "Container.NewArch_Dishes",
    "LocalizationTargets": ["en", "ru", "uz"],
    "NavigatorStyle":      "Destination",
    ...
  },
  "contract":   { "stateFields": [...], "intents": [...] },
  "writes":     [{ "path": "...", "layer": "viewmodel" }, ...],
  "verifyGates": { "build": "pass", "swiftlint": "pass", ... },
  "commit":     { "sha": "a1b2c3d", "branch": "feature/..." }
}`}</CodeBlock>
                    </Reveal>

                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <Reveal delay={0.15}>
                            <PlainEnglishBox color={C.yellow}>
                                Every sub-agent writes its own slice. No agent reads another&apos;s source files to re-derive facts. That single rule eliminates an entire class of bugs — scaffolders can&apos;t disagree with the discoverer, because they both reference the same JSON node.
                            </PlainEnglishBox>
                        </Reveal>
                        <Reveal delay={0.25}>
                            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 18px" }}>
                                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: C.yellow, letterSpacing: "0.12em", marginBottom: 10 }}>WHO WRITES WHAT</div>
                                <ul style={{ margin: 0, paddingLeft: 18, color: C.muted, fontSize: 12.5, lineHeight: 1.75 }}>
                                    <li><code>inputs</code> — orchestrator (Phase 0)</li>
                                    <li><code>figma</code> — MCP batch + cache (Phase 0b)</li>
                                    <li><code>discovery</code> — @module-discoverer (Phase 1)</li>
                                    <li><code>contract</code> — @view-intent-analyzer (Phase 3)</li>
                                    <li><code>writes</code> — each scaffolder (Phase 4, 5)</li>
                                    <li><code>verifyGates</code> — @screen-verifier (Phase 7)</li>
                                    <li><code>commit</code> — Phase 7.5</li>
                                </ul>
                            </div>
                        </Reveal>
                        <Reveal delay={0.35}>
                            <div style={{ background: C.surface, border: `1px solid ${C.red}30`, borderLeft: `3px solid ${C.red}`, borderRadius: 8, padding: "14px 16px" }}>
                                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: C.red, letterSpacing: "0.12em", marginBottom: 6 }}>HARD GATE · ROADMAP #2</div>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
                                    <code>validate-screen-context.mjs --phase=pre-reply</code> runs before Phase 8 writes the log. If any required slice is missing or malformed, the whole run aborts — user never sees a partial reply.
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
