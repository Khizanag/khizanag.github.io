import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, FeatureCard } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function TelemetrySection() {
    return (
        <section id="s-telemetry" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.blue}>TELEMETRY &amp; EVALUATION</SectionLabel>
                    <SectionHeading sub="Every run leaves a structured log. Aggregated, those logs are the evidence base for whether the pipeline is getting better or worse — per agent, per gate, per module.">
                        Closing the loop on agent quality
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, marginTop: 28 }}>
                    <Reveal delay={0}>
                        <FeatureCard
                            icon="📈"
                            title="What we collect today"
                            color={C.blue}
                            description="Per-run: phase durations, cache hit/miss, gate pass/fail, MCP call count + latency, retry count, branch + commit SHA. Persisted as .logs/<runId>/screen-context.json — schema-validated, queryable."
                        />
                    </Reveal>
                    <Reveal delay={0.08}>
                        <FeatureCard
                            icon="🎯"
                            title="What we report weekly"
                            color={C.accent}
                            description="Median end-to-end runtime, T1 gate failure rate per agent, % of runs requiring @unstick, mean TODOs left per ViewModel, top-10 missing Code Connect mappings. Posted to the iOS Chapter channel."
                        />
                    </Reveal>
                    <Reveal delay={0.16}>
                        <FeatureCard
                            icon="🧪"
                            title="Agent regression suite"
                            color={C.yellow}
                            description="A rotating set of ~12 gold-standard Figma URLs runs nightly through the full pipeline. Diff vs. last green baseline gates merges to any agent spec. Catches prompt drift before devs do."
                        />
                    </Reveal>
                </div>

                <div style={{ marginTop: 28 }}>
                    <Reveal delay={0.28}>
                        <CodeBlock filename="weekly-report.json (excerpt)">{`{
  "week": "2026-W17",
  "runs":            { "total": 47, "completed": 44, "abandoned": 3 },
  "median_runtime":  "7m 18s",
  "p95_runtime":     "12m 41s",
  "cache_hit_rate":  { "module_discovery": 0.87, "mcp_design_context": 0.72 },
  "gate_failures":   { "T1_swiftlint": 4, "T1_di_chain": 1, "T2_l10n_coverage": 9 },
  "agent_invocations":{
    "module-discoverer":   47,  "view-intent-analyzer": 47,
    "layer-scaffolder":   376,  "screen-verifier":      47,
    "unstick":              2
  },
  "todos_per_viewmodel":  { "median": 2, "max": 6 },
  "user_satisfaction":    { "thumbs_up": 41, "thumbs_down": 3 }
}`}</CodeBlock>
                    </Reveal>
                </div>

                <Reveal delay={0.45}>
                    <div style={{
                        marginTop: 24, padding: "16px 20px",
                        background: `${P}08`, border: `1px solid ${P}40`, borderLeft: `3px solid ${P}`,
                        borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: C.text, lineHeight: 1.6,
                    }}>
                        <strong style={{ color: P }}>If we can't measure it, we won't improve it.</strong>{" "}
                        Telemetry is the difference between "the pipeline feels faster this quarter" and "median runtime dropped 22% — here is the commit that did it."
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
