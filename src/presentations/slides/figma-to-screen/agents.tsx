import { C, Reveal, SectionLabel, SectionHeading } from "../../shared.tsx";
import { P, AgentRow } from "./ui.tsx";

export function AgentsSection() {
    return (
        <section id="s-agents" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.purple}>AGENT CATALOG</SectionLabel>
                    <SectionHeading sub="Every agent has a single job and a tight tool grant. Orchestrators delegate, read-only agents can&apos;t mutate the repo, code-gen agents write one thing.">
                        The full agent roster
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 28 }}>
                    <div>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, color: P, letterSpacing: "0.12em", marginBottom: 10 }}>MONOREPO ROOT · SCAFFOLDING</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            <AgentRow name="figma-to-screen"         role="orchestrator" description="End-to-end screen scaffolder (the only user-facing entry)" delay={0} />
                            <AgentRow name="module-discoverer"       role="read"         description="Recon module taxonomy, Container namespace, conformances — cached" delay={0.04} />
                            <AgentRow name="view-intent-analyzer"    role="read"         description="Extracts state/intent/navigation contract from a generated View" delay={0.08} />
                            <AgentRow name="layer-scaffolder"        role="codegen"      description="Template-driven unified scaffolder for all Presentation/Domain/Data layers" delay={0.12} />
                            <AgentRow name="localization-scaffolder" role="codegen"      description="Appends keys to every Localizable.strings (real EN, TODO siblings)" delay={0.16} />
                            <AgentRow name="destination-patcher"     role="codegen"      description="Patches Destination.swift + root Injection.swift with MARK anchors" delay={0.2} />
                            <AgentRow name="screen-verifier"         role="gate"         description="7 gates, T1/T2 tiered — build, lint, imports, DI, L10n, SwiftGen, copyright" delay={0.24} />
                            <AgentRow name="session-logger"          role="codegen"      description="Writes the run log; gates the user-facing reply via schema validator" delay={0.28} />
                        </div>
                    </div>

                    <div>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, color: C.blue, letterSpacing: "0.12em", marginBottom: 10 }}>CORE UI V2 · CONSUMER</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            <AgentRow name="figma-to-view"            role="codegen" description="Generate a SwiftUI View from a Figma URL using Core UI V2" delay={0} />
                            <AgentRow name="figma-review"             role="read"    description="Audit an existing View against Figma, RED/YELLOW/GREEN report" delay={0.04} />
                            <AgentRow name="component-lookup"         role="read"    description="Figma layer / URL / Swift name → init signature + nested types" delay={0.08} />
                            <AgentRow name="icon-lookup"              role="read"    description="Figma icon name → DesignSystem.Icon Swift path" delay={0.12} />
                            <AgentRow name="token-lookup"             role="read"    description="Hex / px / font → DesignSystem.* accessor" delay={0.16} />
                            <AgentRow name="design-system-batch-lookup" role="read"  description="Batched variant of the three lookups for large inventories" delay={0.2} />
                            <AgentRow name="unstick"                  role="read"    description="Dev Mode broken / missing mapping recovery — triage + plan" delay={0.24} />
                        </div>
                    </div>

                    <div>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, color: C.yellow, letterSpacing: "0.12em", marginBottom: 10 }}>CORE UI V2 · AUTHOR</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            <AgentRow name="connect-component"        role="codegen" description="Add a new Figma ↔ Swift Code Connect mapping" delay={0} />
                            <AgentRow name="code-connect-review"      role="read"    description="Read-only pre-commit scan of Code Connect changes" delay={0.04} />
                            <AgentRow name="publish-code-connect"     role="codegen" description="Validate and publish mappings to Figma (write to shared system)" delay={0.08} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
