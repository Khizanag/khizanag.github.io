import { C, Reveal, SectionLabel, SectionHeading, WorkflowStep, CodeBlock, CalloutBox, PlainEnglishBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function GettingStartedSection() {
    return (
        <section id="s-start" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.accent}>GETTING STARTED</SectionLabel>
                    <SectionHeading sub="You work on a Space-Feature-* module. Here's how to use this infrastructure in your daily work.">
                        Your workflow
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                    <div>
                        <WorkflowStep n={1} total={5} title="Open Figma Dev Mode" color={P} delay={0}>
                            Navigate to the screen you're implementing. Switch to Dev Mode. Click any S.I.N.S. component — the Swift code appears in the right panel.
                        </WorkflowStep>

                        <WorkflowStep n={2} total={5} title="Use the skill or copy manually" color={P} delay={0.08}>
                            <strong style={{ color: C.text }}>Option A:</strong> Run
                            <code style={{ fontFamily: "'JetBrains Mono', monospace", color: P, fontSize: 13 }}> /figma-to-screen</code> in Claude Code with the Figma URL.
                            <br />
                            <strong style={{ color: C.text }}>Option B:</strong> Copy Code Connect snippets from Dev Mode and assemble the screen manually.
                        </WorkflowStep>

                        <WorkflowStep n={3} total={5} title="Review against the screenshot" color={C.blue} delay={0.16}>
                            Check every component: Is it visible in the design? Are the values real or placeholders?
                            Does the spacing match the Figma layout structure?
                        </WorkflowStep>

                        <WorkflowStep n={4} total={5} title="Build and lint" color={C.blue} delay={0.24}>
                            Run <code style={{ fontFamily: "'JetBrains Mono', monospace", color: C.blue, fontSize: 13 }}>xcodebuild</code> with your Showroom scheme.
                            Run <code style={{ fontFamily: "'JetBrains Mono', monospace", color: C.blue, fontSize: 13 }}> swiftlint --strict</code>.
                            Fix any issues before committing.
                        </WorkflowStep>

                        <WorkflowStep n={5} total={5} title="Create PR" color={C.accent} delay={0.32}>
                            Push your branch and create a PR. The screen follows the same architecture as every other screen in every other module.
                            Reviewers know exactly where to look.
                        </WorkflowStep>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        <Reveal delay={0.1}>
                            <CodeBlock filename="Option A — AI generates everything" highlights={[1, 2, 3]}>
{`/figma-to-screen \\
  --url "figma.com/design/abc/Loans?node-id=123-456" \\
  --screen_name TransferConfirmation \\
  --module_name Space-Feature-Transfers`}
                            </CodeBlock>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <CodeBlock filename="Option B — Figma Dev Mode → manual copy" highlights={[1, 2, 3, 4, 5]}>
{`// In Figma Dev Mode, click any component:
Headline(
    parameters: .init(
        title: "Transfer",
        subtitle: "Confirmation"
    )
)
// Copy → paste into your View file
// Repeat for each component on the screen`}
                            </CodeBlock>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 22px" }}>
                                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 12 }}>
                                    What you DON'T need to do
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    {[
                                        "Search source code for component APIs",
                                        "Guess parameter names or enum cases",
                                        "Ask designers about spacing values",
                                        "Reverse-engineer variant mappings",
                                        "Look up init signatures in documentation",
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <span style={{ color: C.red, fontSize: 14, fontWeight: 700 }}>✕</span>
                                            <span style={{ fontSize: 13, color: C.muted }}>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>

                <Reveal delay={0.4}>
                    <div style={{ marginTop: 32 }}>
                        <PlainEnglishBox color={C.accent}>
                            The reference implementation lives in <code style={{ fontFamily: "'JetBrains Mono', monospace", color: C.accent }}>NewArch-Dishes</code>.
                            The instruction files in <code style={{ fontFamily: "'JetBrains Mono', monospace", color: C.accent }}>.github/instructions/</code> apply to ALL Space-Feature-* modules.
                            Copy them into your module to get the same AI-assisted workflow.
                        </PlainEnglishBox>
                    </div>
                </Reveal>

                <Reveal delay={0.5}>
                    <div style={{ marginTop: 20 }}>
                        <CalloutBox color={P} icon="📋" label="CHECKLIST BEFORE PR">
                            All 5 files created &middot; Screen registered in Destination + Injection &middot;
                            Navigation bar uses framework modifiers &middot; No placeholder values &middot;
                            Build passes &middot; SwiftLint passes &middot; Screenshot matches implementation
                        </CalloutBox>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
