import { C, Reveal, SectionLabel, SectionHeading, WorkflowStep, CodeBlock, CalloutBox, PlainEnglishBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function AiWorkflowSection() {
    return (
        <section id="s-ai" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.blue}>AI-ASSISTED GENERATION</SectionLabel>
                    <SectionHeading sub="Your AI assistant (Copilot / Claude Code) reads Figma, uses Code Connect snippets, and generates the full screen implementation.">
                        From Figma to working screen
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                    <div>
                        <WorkflowStep n={1} total={6} title="Share the Figma URL" color={P} delay={0}>
                            Copy the screen URL from Figma. The AI extracts the file key and node ID automatically.
                        </WorkflowStep>

                        <WorkflowStep n={2} total={6} title="AI reads the design" color={P} delay={0.08}>
                            Calls Figma MCP <code style={{ fontFamily: "'JetBrains Mono', monospace", color: P, fontSize: 13 }}>get_design_context</code> —
                            receives Code Connect snippets, a screenshot, and component metadata.
                        </WorkflowStep>

                        <WorkflowStep n={3} total={6} title="Validates Code Connect" color={C.blue} delay={0.16}>
                            Cross-checks every snippet against the screenshot. Removes phantom components,
                            replaces placeholder values, verifies APIs compile.
                        </WorkflowStep>

                        <WorkflowStep n={4} total={6} title="Generates 5 screen files" color={C.blue} delay={0.24}>
                            Creates View, ViewModel, Factory, Router, DI — following
                            <code style={{ fontFamily: "'JetBrains Mono', monospace", color: C.blue, fontSize: 13 }}> .github/instructions/</code> patterns exactly.
                        </WorkflowStep>

                        <WorkflowStep n={5} total={6} title="Registers the screen" color={C.accent} delay={0.32}>
                            Updates <code style={{ fontFamily: "'JetBrains Mono', monospace", color: C.accent, fontSize: 13 }}>Destination.swift</code> and
                            <code style={{ fontFamily: "'JetBrains Mono', monospace", color: C.accent, fontSize: 13 }}> Injection.swift</code> with the new screen.
                        </WorkflowStep>

                        <WorkflowStep n={6} total={6} title="Builds & lints" color={C.accent} delay={0.4}>
                            Runs <code style={{ fontFamily: "'JetBrains Mono', monospace", color: C.accent, fontSize: 13 }}>xcodebuild</code> and
                            <code style={{ fontFamily: "'JetBrains Mono', monospace", color: C.accent, fontSize: 13 }}> swiftlint --strict</code>.
                            Fixes any errors. Commits when green.
                        </WorkflowStep>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        <Reveal delay={0.1}>
                            <CodeBlock filename="AI assistant — invoke skill" highlights={[1]}>
{`/figma-to-screen \\
  --url "figma.com/design/abc/Loans?node-id=30045-159897" \\
  --screen_name LoansMain`}
                            </CodeBlock>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <CodeBlock filename="Generated files" highlights={[2, 3, 4, 5, 6]}>
{`Space-Feature-Loans-Presentation/Common/Screen/LoansMain/
├── View/LoansMainView.swift
├── ViewModel/LoansMainViewModel.swift
├── Factory/LoansMainViewFactory.swift
├── Router/LoansMainRouter.swift
└── DI/LoansMainInjection.swift`}
                            </CodeBlock>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <CodeBlock filename="LoansMainView.swift — generated" highlights={[6, 7, 8, 12, 13, 14]}>
{`struct LoansMainView<ViewModel: LoansMainViewModel>: View {
    @StateObject private var viewModel: ViewModel

    var body: some View {
        ScrollView {
            VStack(spacing: .assets.spacing.none) {
                headline          // from Figma Headline
                loanProducts      // from Figma BannerCardSmall
                faqSection        // from Figma ListViewItem
            }
        }
        .navigationBarTrailing(
            parameters: .close(
                action: { viewModel.handleIntent(.onCloseTap) }
            )
        )
    }
}`}
                            </CodeBlock>
                        </Reveal>
                    </div>
                </div>

                <Reveal delay={0.5}>
                    <div style={{ marginTop: 32 }}>
                        <PlainEnglishBox color={P}>
                            You give the AI a Figma URL and a screen name. It does the rest — reads the design, maps components,
                            generates architecture-compliant code, builds, lints, and commits. You review the PR.
                        </PlainEnglishBox>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
