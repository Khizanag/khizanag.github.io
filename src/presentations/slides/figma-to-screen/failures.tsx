import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, CalloutBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

const FAILURES: Array<{ symptom: string; cause: string; recovery: string; color: string }> = [
    {
        symptom: "destination-patcher: MARK anchor missing",
        cause:   "Destination.swift was hand-edited, anchor renamed/removed.",
        recovery:"Pipeline aborts before write. `git status` is clean. Re-add the `// MARK: - <Feature>` line, re-run.",
        color:   C.red,
    },
    {
        symptom: "screen-verifier: T1 SwiftLint failure",
        cause:   "Generated file missed a project-specific rule (often trailing comma in 4+ arg init).",
        recovery:"Open the named file, fix the violation, re-run `screen-verifier` only — no full pipeline restart.",
        color:   C.red,
    },
    {
        symptom: "validate-screen-context.mjs: schema-incomplete",
        cause:   "An agent appended an unknown key, or skipped a required one (visualInventory, ownership, etc.).",
        recovery:"Pipeline refuses to write the user reply. Open `.logs/<runId>/screen-context.json`, missing keys listed inline.",
        color:   C.yellow,
    },
    {
        symptom: "MCP: ECONNREFUSED 127.0.0.1:3845",
        cause:   "Figma desktop closed, or another tool grabbed the port.",
        recovery:"`@unstick` triages: restarts Figma, falls back to file-export read, or surfaces a `lsof -i :3845` hint.",
        color:   C.yellow,
    },
    {
        symptom: "module-discoverer: cache witness mtime drift",
        cause:   "Container.swift or Injection.swift changed since last run.",
        recovery:"Discovery cache invalidates automatically. Re-runs Phase 1 (~15s) and writes a fresh `<Module>.json`.",
        color:   P,
    },
    {
        symptom: "Pipeline halted on `master` / `main`",
        cause:   "Phase 7.5 branch-safety gate.",
        recovery:"`git checkout -b feature/NO-TICKET_<slug>` and re-run. Nothing was committed.",
        color:   P,
    },
];

export function FailuresSection() {
    return (
        <section id="s-failures" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.red}>WHEN A PHASE FAILS</SectionLabel>
                    <SectionHeading sub="Every failure mode is named, surfaced in the session log, and recoverable. The pipeline is fail-loud, not fail-silent.">
                        Six recoveries you might actually hit
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 28 }}>
                    {FAILURES.map((row, i) => (
                        <Reveal key={row.symptom} delay={i * 0.04}>
                            <div style={{
                                background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${row.color}`,
                                borderRadius: 10, padding: "16px 18px", height: "100%",
                            }}>
                                <div style={{
                                    fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700,
                                    color: row.color, marginBottom: 8,
                                }}>⚠ {row.symptom}</div>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: C.muted, lineHeight: 1.55, marginBottom: 6 }}>
                                    <strong style={{ color: C.text }}>Cause: </strong>{row.cause}
                                </div>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: C.muted, lineHeight: 1.55 }}>
                                    <strong style={{ color: C.text }}>Recovery: </strong>{row.recovery}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <div style={{ marginTop: 24 }}>
                    <Reveal delay={0.3}>
                        <CodeBlock filename="validate-screen-context.mjs · exit codes">{`0  ✓ schema valid          → Phase 8 writes the user reply
1  ✗ schema invalid        → missing/unknown keys, run aborts
2  ✗ ownership mismatch    → an agent wrote outside its lane
3  ✗ verification skipped  → screen-verifier did not record gate results

# Always recoverable with: git restore . && re-run /figma-to-screen`}</CodeBlock>
                    </Reveal>
                </div>

                <Reveal delay={0.45}>
                    <div style={{ marginTop: 20 }}>
                        <CalloutBox color={P} icon="🛟" label="ESCAPE HATCHES">
                            <code>@unstick</code> for MCP/Code Connect dead ends. <code>git restore .</code> to roll back any partial write — the pipeline is transactional per phase.
                            Every failure leaves a complete <code>.logs/&lt;runId&gt;/screen-context.json</code> for triage.
                        </CalloutBox>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
