import { C, Reveal, SectionLabel, SectionHeading, FeatureCard, CalloutBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function WhatIsCodeConnectSection() {
  return (
    <section id="s-what" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel color={P}>WHAT IS CODE CONNECT?</SectionLabel>
          <SectionHeading sub="Figma's official tool that displays real code snippets directly in Dev Mode — right next to the design specs.">
            From design to code, automatically
          </SectionHeading>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
          <FeatureCard icon="🔗" title="Official Figma Tool" color={P} delay={0}
            description="Built and maintained by Figma. Supports React, SwiftUI, Jetpack Compose, and more. Swift parser added in 2024."
          />
          <FeatureCard icon="👁" title="Dev Mode Integration" color={C.blue} delay={0.08}
            description="When a designer selects a component in Figma, developers see the exact Swift code needed to instantiate it — parameters, variants, and all."
          />
          <FeatureCard icon="🔄" title="Always In Sync" color={C.accent} delay={0.16}
            description="Code snippets are published from the codebase. When the API changes, we republish. The Figma panel always reflects the latest code."
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
          <FeatureCard icon="📦" title="NPM CLI" color={C.yellow} delay={0.24}
            description="The CLI tool (@figma/code-connect) parses .figma.swift files and publishes the code snippets to the Figma file via API."
            note="v1.4.2 — latest as of April 2026"
          />
          <FeatureCard icon="📐" title="SPM Dependency" color={P} delay={0.32}
            description="The figma/code-connect Swift package provides FigmaConnect protocol and @FigmaProp property wrapper for type-safe mappings."
            note="v1.4.1 — added as a dependency in Package.swift"
          />
        </div>

        <Reveal delay={0.4}>
          <CalloutBox color={P} icon="💡" label="KEY INSIGHT">
            Code Connect doesn't generate code or enforce patterns. It's a documentation bridge — you write the snippet
            once, and every designer on the team sees it every time they inspect that component. Zero maintenance overhead
            after initial setup.
          </CalloutBox>
        </Reveal>
      </div>
    </section>
  );
}
