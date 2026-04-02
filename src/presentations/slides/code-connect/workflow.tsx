import { C, Reveal, SectionLabel, SectionHeading, WorkflowStep, CodeBlock, CalloutBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function WorkflowSection() {
  return (
    <section id="s-workflow" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel color={C.accent}>DEVELOPER WORKFLOW</SectionLabel>
          <SectionHeading sub="Adding a new component connection takes under 5 minutes. Here's the step-by-step.">
            How to add a connection
          </SectionHeading>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <div>
            <WorkflowStep n={1} total={5} title="Create the .figma.swift file" color={P} delay={0}>
              Add a new file in <code style={{ fontFamily: "'JetBrains Mono', monospace", color: P, fontSize: 13 }}>Sources/SpaceCore_UI_V2_CodeConnect/</code>. Name it
              <code style={{ fontFamily: "'JetBrains Mono', monospace", color: P, fontSize: 13 }}> ComponentName.figma.swift</code>.
            </WorkflowStep>

            <WorkflowStep n={2} total={5} title="Write the FigmaConnect struct" color={P} delay={0.08}>
              Set <code style={{ fontFamily: "'JetBrains Mono', monospace", color: P, fontSize: 13 }}>component</code>,
              <code style={{ fontFamily: "'JetBrains Mono', monospace", color: P, fontSize: 13 }}> figmaNodeUrl</code>,
              any <code style={{ fontFamily: "'JetBrains Mono', monospace", color: P, fontSize: 13 }}>variant</code> dicts, and
              <code style={{ fontFamily: "'JetBrains Mono', monospace", color: P, fontSize: 13 }}> @FigmaProp</code> mappings. Write the body.
            </WorkflowStep>

            <WorkflowStep n={3} total={5} title="Parse to validate" color={C.blue} delay={0.16}>
              Run the parse command. It checks for missing node URLs, invalid prop names, and struct errors.
            </WorkflowStep>

            <WorkflowStep n={4} total={5} title="Publish to Figma" color={C.blue} delay={0.24}>
              Run the publish command. The snippet appears in Figma within seconds. Verify in Dev Mode.
            </WorkflowStep>

            <WorkflowStep n={5} total={5} title="Commit the .figma.swift file" color={C.accent} delay={0.32}>
              Push to the repository. The connection file lives alongside the component source code.
            </WorkflowStep>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Reveal delay={0.1}>
              <CodeBlock filename="terminal — validate" highlights={[1]}>
{`$ npx figma connect parse
Parsing 249 connections...
✓ All connections valid`}
              </CodeBlock>
            </Reveal>

            <Reveal delay={0.2}>
              <CodeBlock filename="terminal — publish" highlights={[1]}>
{`$ FIGMA_ACCESS_TOKEN=<token> npx figma connect publish
Publishing 249 connections to 0qdDkhMg8fcNeBGZ4jo4br...
✓ Published successfully`}
              </CodeBlock>
            </Reveal>

            <Reveal delay={0.3}>
              <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 22px" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 10 }}>
                  Updating an existing connection
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    "Edit the .figma.swift file with the new API",
                    "Run parse to validate the changes",
                    "Run publish to update Figma",
                    "Commit and push",
                  ].map((step, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                        background: `${C.accent}15`, border: `1px solid ${C.accent}30`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: C.accent,
                      }}>
                        {i + 1}
                      </div>
                      <span style={{ fontSize: 13, color: C.muted }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.4}>
          <div style={{ marginTop: 32 }}>
            <CalloutBox color={C.accent} icon="⚡" label="TIP">
              Use <code style={{ fontFamily: "'JetBrains Mono', monospace", color: C.accent }}>--dry-run</code> flag with publish to preview
              what will be sent to Figma without actually updating anything. Great for reviewing before going live.
            </CalloutBox>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
