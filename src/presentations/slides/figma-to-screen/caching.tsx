import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, PlainEnglishBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function CachingSection() {
    return (
        <section id="s-caching" style={{ padding: "96px 48px", background: C.surface }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.yellow}>CACHING · STATE</SectionLabel>
                    <SectionHeading sub="Two caches. One per module (long-lived, re-used across runs). One per run (accumulates as phases complete). Together they let the pipeline skip work instead of re-deriving it.">
                        Where the pipeline remembers things
                    </SectionHeading>
                </Reveal>

                {/* ── LAYER 1: PER-MODULE DISCOVERY CACHE ───────────────────── */}
                <Reveal delay={0.05}>
                    <div style={{
                        display: "flex", alignItems: "center", gap: 10,
                        marginTop: 36, marginBottom: 14,
                    }}>
                        <span style={{
                            fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 13,
                            color: C.blue, background: `${C.blue}18`, borderRadius: 6,
                            padding: "4px 10px", letterSpacing: "0.08em",
                        }}>LAYER 1</span>
                        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: C.text }}>
                            Per-module discovery cache <span style={{ color: C.muted, fontWeight: 400, fontSize: 14 }}>— long-lived, shared across runs</span>
                        </span>
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 24, marginBottom: 48 }}>
                    <Reveal delay={0.1}>
                        <CodeBlock filename=".github/.cache/module-discovery/Loan.json">{`{
  "version": 2,
  "moduleName": "Loan",
  "writtenAt": "2026-04-01T14:22:11Z",
  "discoveryRecord": {
    "schemaVersion": 2,
    "Mod":           "Space_Feature_Loan",
    "ContainerNS":   "Container.Feature.Loan",
    "NavigatorStyle":      "Destination",
    "LocalizationTargets": ["en", "ru", "uz"],
    "RootDIPath":    "…/Common/DI/Injection.swift",
    "DestinationPath": "…/Navigator/LoanDestination.swift",
    "CopyrightHeader": "// © 2026 SpaceInt. All rights reserved.",
    "ObservedConformances": ["ViewFactory", "ViewModel", "Router"]
  },
  "witnesses": {
    "ApiRoot/**/Container*.swift":         { "mtime": "2026-04-01T…" },
    "Common/DI/Injection.swift":           { "mtime": "…" },
    "Common/Navigator/Destination.swift":  { "mtime": "…" },
    "Common/Localization":                 { "mtime": "…" },
    "architecture-structure.instructions": { "mtime": "…" },
    "view-model.instructions":             { "mtime": "…" }
  }
}`}</CodeBlock>
                    </Reveal>

                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        <Reveal delay={0.15}>
                            <PlainEnglishBox color={C.blue}>
                                Module shape rarely changes. The second time you run <code>/figma-to-screen</code> for a Loan screen, <code>@module-discoverer</code> reads one cache file, checks 7 file mtimes, and returns in under a second instead of re-probing the whole module.
                            </PlainEnglishBox>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px" }}>
                                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: C.blue, letterSpacing: "0.12em", marginBottom: 8 }}>CACHE HIT RULES · ALL MUST PASS</div>
                                <ul style={{ margin: 0, paddingLeft: 18, color: C.muted, fontSize: 12.5, lineHeight: 1.7 }}>
                                    <li>Top-level <code>version</code> ≥ 2 AND <code>discoveryRecord.schemaVersion</code> ≥ 2</li>
                                    <li>Every <code>witnesses[*].path</code> still exists on disk</li>
                                    <li>Every witness <code>mtime</code> unchanged since cache was written</li>
                                    <li><code>writtenAt</code> within the last 30 days</li>
                                </ul>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, marginTop: 10, lineHeight: 1.6 }}>
                                    Any rule fails → <span style={{ color: C.red }}>cache miss</span>, full re-discovery, cache overwritten on success.
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={0.25}>
                            <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px" }}>
                                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: C.accent, letterSpacing: "0.12em", marginBottom: 8 }}>ON HIT</div>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
                                    Emit the cached <code>discoveryRecord</code> verbatim, stamp it with <code>cacheHit: true</code>, log the hit on the run record. <b>Phase 1 is now ~1s instead of ~15s.</b>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* ── LAYER 2: PER-RUN SCREEN CONTEXT ────────────────────────── */}
                <Reveal delay={0.1}>
                    <div style={{
                        display: "flex", alignItems: "center", gap: 10,
                        marginBottom: 14,
                    }}>
                        <span style={{
                            fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 13,
                            color: C.yellow, background: `${C.yellow}18`, borderRadius: 6,
                            padding: "4px 10px", letterSpacing: "0.08em",
                        }}>LAYER 2</span>
                        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: C.text }}>
                            Per-run <code>screen-context.json</code> <span style={{ color: C.muted, fontWeight: 400, fontSize: 14 }}>— accumulates across phases, one source of truth per run</span>
                        </span>
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 24 }}>
                    <Reveal delay={0.15}>
                        <CodeBlock filename=".logs/<runId>/screen-context.json (schema v1)">{`{
  "version":   1,
  "runId":     "2026-04-22_OrderDetails",
  "createdAt": "2026-04-22T10:00:00Z",
  "inputs":    { "figmaUrl": "…", "screenName": "OrderDetails", "moduleName": "Dishes" },
  "discovery": {
    "cacheHit": true,
    "record":   { /* full record from Layer 1 */ }
  },
  "figmaContext": {
    "fileKey": "…",  "nodeId": "123:456",
    "screenshotPath": "/abs/path/to/root.png",
    "mcpCalls": [
      { "tool": "get_design_context", "status": "ok", "bytes": 14920 },
      { "tool": "get_metadata",       "status": "ok", "bytes":  8421 },
      { "tool": "get_variable_defs",  "status": "ok", "bytes":  2104 },
      { "tool": "get_screenshot",     "status": "ok", "bytes": 112000 }
    ]
  },
  "visualInventory":  [ { "layer": "…", "component": "…", "props": {…} }, … ],
  "designSystem":     { "components": {…}, "icons": {…}, "tokens": {…} },
  "contract":         { "state": […], "intents": […], "navigationTriggers": […] },
  "layerAnalysis":    { "needsDomain": false, "needsData": false, "rationale": "…" },
  "instructionManifest": [ "…swift-conventions.instructions.md", … ],
  "writes": [
    { "agent": "layer-scaffolder",  "path": "…/OrderDetailsView.swift",      "bytes": 2814 },
    { "agent": "destination-patcher", "path": "…/DishesDestination.swift",   "bytes":  142 }
  ]
}`}</CodeBlock>
                    </Reveal>

                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        <Reveal delay={0.2}>
                            <PlainEnglishBox color={C.yellow}>
                                Every sub-agent writes its own slice and reads everyone else&apos;s. No scaffolder re-parses the View to re-derive state. No agent goes back to Figma. The JSON is the single source of truth for the run.
                            </PlainEnglishBox>
                        </Reveal>

                        <Reveal delay={0.25}>
                            <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px" }}>
                                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: C.yellow, letterSpacing: "0.12em", marginBottom: 10 }}>OWNERSHIP · WHO WRITES WHAT</div>
                                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: C.muted }}>
                                    <tbody>
                                        {[
                                            ["inputs, runId, createdAt",     "orchestrator §0",              "run start"],
                                            ["discovery",                     "@module-discoverer",           "§1"],
                                            ["figmaContext",                  "orchestrator §0b",             "after MCP batch"],
                                            ["visualInventory",               "@figma-to-view",               "§2"],
                                            ["designSystem",                  "@design-system-batch-lookup",  "§2"],
                                            ["contract",                      "@view-intent-analyzer",        "§3"],
                                            ["layerAnalysis, instructionManifest", "orchestrator",           "§4 prelude"],
                                            ["writes[]",                      "every scaffolder",             "on each write"],
                                        ].map(([section, owner, when], i) => (
                                            <tr key={i} style={{ borderBottom: i < 7 ? `1px solid ${C.border}40` : "none" }}>
                                                <td style={{ padding: "5px 0", color: C.text }}><code>{section}</code></td>
                                                <td style={{ padding: "5px 8px" }}>{owner}</td>
                                                <td style={{ padding: "5px 0", color: C.muted, opacity: 0.7, textAlign: "right" }}>{when}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <div style={{ background: C.bg, border: `1px solid ${C.red}30`, borderLeft: `3px solid ${C.red}`, borderRadius: 8, padding: "14px 16px" }}>
                                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: C.red, letterSpacing: "0.12em", marginBottom: 6 }}>HARD GATE · VALIDATION SCRIPT</div>
                                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: C.text, marginBottom: 6 }}>
                                    node validate-screen-context.mjs --phase=pre-reply
                                </div>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
                                    Runs before <code>@session-logger</code> writes the final log. Schema violation → exit 1. Missing required section for this phase → exit 2. Any non-zero → <b>run aborts, user never sees a partial reply.</b>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* ── CLOSING ─────────────────────────────────────────────────── */}
                <Reveal delay={0.35}>
                    <div style={{
                        marginTop: 32, padding: "18px 22px",
                        background: C.bg, border: `1px solid ${P}40`, borderLeft: `3px solid ${P}`, borderRadius: 10,
                        fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.text, lineHeight: 1.6,
                    }}>
                        <span style={{ color: P, fontWeight: 700 }}>Net effect —</span> the same facts are derived <b>once per module</b> (Layer 1, across dozens of runs) and <b>once per run</b> (Layer 2, across all phases). Prior pipeline versions re-derived state 3–4 times per run and re-scanned module shape on every invocation.
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
