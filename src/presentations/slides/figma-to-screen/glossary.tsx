import { C, Reveal, SectionLabel, SectionHeading } from "../../shared.tsx";
import { P } from "./ui.tsx";

const TERMS: Array<{ term: string; def: string; color: string }> = [
    { term: "MCP",                def: "Model Context Protocol — the local server (port 3845) Figma exposes for AI editors to read live design data.", color: P },
    { term: "Code Connect",        def: "TypeScript bridge files that map a Figma component to its exact SwiftUI init signature in our codebase.",        color: C.blue },
    { term: "Orchestrator",        def: "The single user-facing agent (figma-to-screen) that delegates to specialised sub-agents and gates the final reply.", color: C.purple },
    { term: "Scaffolder",         def: "A code-gen agent that writes one specific file (View, ViewModel, Router, etc.) from the shared context record.",     color: C.purple },
    { term: "screen-context.json", def: "The shared schema-validated record every agent appends to. Single source of truth across phases — not memory, a file.", color: C.yellow },
    { term: "T1 / T2 gate",        def: "Our two severity levels of checks. T1 = must pass before the agent replies — a build error, lint failure, missing import, or unregistered DI stops the run. T2 = nice to have — L10n drift, stale SwiftGen, missing copyright — surfaced as a warning but the run still ships.",          color: C.red },
    { term: "MARK anchor",         def: "A fixed // MARK: comment we place in shared files like Destination.swift and Injection.swift so the patcher knows exactly where to insert the new screen's case. No regex guessing, no re-parsing — just find the marker, append below it.",     color: P },
    { term: "SwiftGen",            def: "Code generator that turns Localizable.strings + Assets into typed Swift accessors. Stale = compile error.",          color: C.blue },
    { term: "Discovery cache",     def: "~/.github/.cache/module-discovery/<Module>.json — module taxonomy snapshot reused across runs (~15s → ~1s).",          color: C.yellow },
    { term: "Visual Inventory",    def: "The element-by-element map view-intent-analyzer builds from the View — the contract scaffolders read, not the Figma.", color: C.accent },
];

export function GlossarySection() {
    return (
        <section id="s-glossary" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>10 TERMS BEFORE WE GO FURTHER</SectionLabel>
                    <SectionHeading sub="The rest of the deck assumes these. Skim once now — you will see every word again, in context, with code.">
                        Glossary
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 28 }}>
                    {TERMS.map((row, i) => (
                        <Reveal key={row.term} delay={i * 0.03}>
                            <div style={{
                                background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${row.color}`,
                                borderRadius: 10, padding: "14px 18px", height: "100%",
                            }}>
                                <div style={{
                                    fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700,
                                    color: row.color, marginBottom: 4,
                                }}>{row.term}</div>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.5 }}>
                                    {row.def}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
