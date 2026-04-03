import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, CalloutBox, FeatureCard } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function InstructionFilesSection() {
    return (
        <section id="s-instructions" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.accent}>INSTRUCTION FILES</SectionLabel>
                    <SectionHeading sub="Copilot reads .github/instructions/ to understand our patterns. These files are the bridge between human conventions and AI output.">
                        Teaching Copilot our architecture
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
                    <Reveal delay={0}>
                        <CodeBlock filename=".github/instructions/ — file tree" highlights={[2, 5, 6, 7, 8, 9, 10]}>
{`.github/instructions/0-common/
├── 0-general/
│   ├── architecture-structure.instructions.md
│   └── swift-conventions.instructions.md
├── 2-presentation/
│   ├── layer.instructions.md
│   └── common/screen/
│       ├── view/view.instructions.md
│       ├── view/figma-to-code.instructions.md
│       ├── view-model/view-model.instructions.md
│       ├── factory/factory.instructions.md
│       ├── router/router.instructions.md
│       └── di/di.instructions.md
├── 3-domain/   ...layer + model, use-case, repository
├── 4-data/     ...layer + dto, mapper, data-source
├── 5-unit-tests/  ...test patterns per layer
└── 1-review/   ...PR review guidelines`}
                        </CodeBlock>
                    </Reveal>

                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <Reveal delay={0.08}>
                            <FeatureCard icon="🎯" title="applyTo globs" color={C.accent}
                                description='Each file has an applyTo header like "**/*-Presentation/Common/Screen/**/View/**/*.swift" — Copilot only loads the instruction when editing matching files.' />
                        </Reveal>
                        <Reveal delay={0.16}>
                            <FeatureCard icon="📝" title="Patterns & examples" color={P}
                                description="Each file contains: Purpose, Protocol pattern, Example snippet, Responsibilities, Non-responsibilities, Guidelines, and a Verification checklist." />
                        </Reveal>
                        <Reveal delay={0.24}>
                            <FeatureCard icon="🔄" title="Shared across modules" color={C.blue}
                                description="Copy the .github/instructions/ folder into any Space-Feature-* module. Same patterns, same AI behavior, consistent output everywhere." />
                        </Reveal>
                        <Reveal delay={0.32}>
                            <FeatureCard icon="🤖" title="AI + human same rules" color={C.yellow}
                                description="Copilot follows the same instructions that code reviewers check. No divergence between what AI generates and what passes PR review." />
                        </Reveal>
                    </div>
                </div>

                <Reveal delay={0.1}>
                    <CodeBlock filename="view-model.instructions.md — example header" highlights={[1, 2, 3]}>
{`---
applyTo: "**/*-Presentation/Common/Screen/**/ViewModel/**/*.swift"
---

## Purpose
ViewModel files coordinate presentation state transitions.

## Protocol & Conformance Pattern
- Parameters: Sendable, Hashable, AutoFixturable
- State: AutoEquatable, AutoFixturable
- Intent: AutoEquatable
- Protocol: ViewModel, AutoMockable
- Implementation: Default... concrete class

## Verification Checklist
- Are state changes explicit and easy to reason about?
- Is handleIntent in a separate extension?
- Are domain contracts used, not concrete implementations?`}
                    </CodeBlock>
                </Reveal>

                <Reveal delay={0.4}>
                    <div style={{ marginTop: 32 }}>
                        <CalloutBox color={C.accent} icon="🚀" label="HOW TO ADOPT">
                            Copy <code style={{ fontFamily: "'JetBrains Mono', monospace", color: C.accent }}>.github/instructions/</code> from NewArch-Dishes
                            into your Space-Feature-* module.
                            Copilot immediately starts following the patterns. No configuration needed — just the files.
                        </CalloutBox>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
