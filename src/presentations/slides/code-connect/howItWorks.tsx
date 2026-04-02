import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, PlainEnglishBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function HowItWorksSection() {
  return (
    <section id="s-how" style={{ padding: "96px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel color={C.blue}>HOW IT WORKS</SectionLabel>
          <SectionHeading sub="A FigmaConnect struct maps a Figma component to a Swift code snippet. The CLI parses it and publishes to Figma.">
            The connection flow
          </SectionHeading>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
          <Reveal delay={0}>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: C.text, marginBottom: 16 }}>
                1. Write a <code style={{ fontFamily: "'JetBrains Mono', monospace", color: P, background: `${P}15`, padding: "2px 7px", borderRadius: 4 }}>.figma.swift</code> file
              </div>
              <CodeBlock filename="StandardButton.figma.swift" highlights={[2, 3, 5, 6, 9]}>
{`struct StandardButtonCodeConnect: FigmaConnect {
    let component = StandardButton.self
    let figmaNodeUrl = "https://figma.com/...?node-id=1-2"

    @FigmaProp("✍️ Label")
    var label: String = "Label"

    var body: some View {
        StandardButton(configuration: .primary(
            title: label,
            action: { /* TODO: - Add action */ }
        ))
    }
}`}
              </CodeBlock>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: C.text, marginBottom: 16 }}>
                2. Parse &rarr; Publish &rarr; See in Figma
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { step: "Parse", icon: "🔍", desc: "The CLI reads .figma.swift files, resolves @FigmaProp mappings, and validates the structure.", cmd: "npx figma connect parse" },
                  { step: "Publish", icon: "🚀", desc: "Sends the parsed snippets to the Figma API. Each struct becomes a code snippet attached to a node.", cmd: "npx figma connect publish" },
                  { step: "Dev Mode", icon: "👁", desc: "Designers select the component in Figma. The code panel shows the Swift snippet with live property values.", cmd: null },
                ].map(({ step, icon, desc, cmd }) => (
                  <div key={step} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <span style={{ fontSize: 18 }}>{icon}</span>
                      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: C.text }}>{step}</span>
                    </div>
                    <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.6, margin: 0 }}>{desc}</p>
                    {cmd && (
                      <div style={{
                        marginTop: 10, padding: "8px 14px", background: C.bg, border: `1px solid ${C.border}`,
                        borderRadius: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: P,
                      }}>
                        $ {cmd}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <PlainEnglishBox color={P}>
            You write a Swift struct that says "this Figma component maps to this Swift code." The CLI reads it, sends it to Figma,
            and from that point on, anyone inspecting the component in Figma sees the real Swift API — not auto-generated CSS or SwiftUI guesses.
          </PlainEnglishBox>
        </Reveal>
      </div>
    </section>
  );
}
