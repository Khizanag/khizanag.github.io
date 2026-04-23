import { C, Reveal, SectionLabel, SectionHeading, WorkflowStep, CalloutBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function GettingStartedSection() {
    return (
        <section id="s-getting-started" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.accent}>TOMORROW MORNING</SectionLabel>
                    <SectionHeading sub="Everything above is live today. Here&apos;s the five-minute path from never-used to first-screen-scaffolded.">
                        Getting started — the 20-minute path
                    </SectionHeading>
                </Reveal>

                <div style={{ marginTop: 32 }}>
                    <Reveal delay={0}>
                        <WorkflowStep n={1} total={6} title="Confirm setup" color={C.accent}>
                            Figma desktop is running. <code>~/Library/Application Support/Code/User/mcp.json</code> points at <code>127.0.0.1:3845/mcp</code>. You opened the workspace via <code>ios-space.code-workspace</code>.
                        </WorkflowStep>
                    </Reveal>
                    <Reveal delay={0.06}>
                        <WorkflowStep n={2} total={6} title="Pick a Figma screen" color={C.accent}>
                            Must be a screen-sized frame or component (<strong>≥ 320×568</strong>, <strong>≥ 2 children</strong>). Copy the URL with <code>?node-id=X-Y</code>.
                        </WorkflowStep>
                    </Reveal>
                    <Reveal delay={0.12}>
                        <WorkflowStep n={3} total={6} title="Warm up with a lookup" color={C.accent}>
                            Run <code>/token-lookup #111827</code> and <code>/component-lookup &quot;Bank Card&quot;</code>. Under a second each means your MCP cache is live.
                        </WorkflowStep>
                    </Reveal>
                    <Reveal delay={0.18}>
                        <WorkflowStep n={4} total={6} title="Create a feature branch" color={C.accent}>
                            <code>git checkout -b feature/NO-TICKET_try-figma-to-screen</code>. The pipeline refuses to commit on <code>master</code>.
                        </WorkflowStep>
                    </Reveal>
                    <Reveal delay={0.24}>
                        <WorkflowStep n={5} total={6} title="Run the orchestrator" color={C.accent}>
                            <code>/figma-to-screen</code>, answer the four prompts (URL, screen name, module, flags). Leave flags blank for Presentation-only — safest first run.
                        </WorkflowStep>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <WorkflowStep n={6} total={6} title="Review the log" color={C.accent}>
                            Open <code>.logs/&lt;runId&gt;_slug.md</code>. It lists every touched file, the @figma-review findings, and the TODOs for business logic. <strong>Read before you merge.</strong>
                        </WorkflowStep>
                    </Reveal>
                </div>

                <Reveal delay={0.42}>
                    <div style={{ marginTop: 28 }}>
                        <CalloutBox color={P} icon="🚀" label="FIRST WIN — MEASURED">
                            Your first run replaces <strong>~12 hand-copied files</strong> and <strong>2 central-file patches</strong> with a single command. Median end-to-end runtime is <strong>7m 18s</strong>; by the third run on the same module, discovery cache is warm and the path drops to <strong>~3 minutes</strong> of attended time.
                        </CalloutBox>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
