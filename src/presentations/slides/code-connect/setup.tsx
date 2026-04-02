import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, TagChip } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function SetupSection() {
  return (
    <section id="s-setup" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel color={C.yellow}>SETUP</SectionLabel>
          <SectionHeading sub="Two dependencies, one config file, and a personal access token. That's everything needed.">
            Setup & configuration
          </SectionHeading>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
          <Reveal delay={0}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <TagChip color={C.blue} dot={false}>NPM</TagChip>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: C.text }}>CLI Tool</span>
              </div>
              <CodeBlock filename="terminal" highlights={[1]}>
{`npm install @figma/code-connect@1.4.2
# Provides: npx figma connect <parse|publish>`}
              </CodeBlock>
              <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.6, marginTop: 12 }}>
                The CLI parses <code style={{ fontFamily: "'JetBrains Mono', monospace", color: P }}>*.figma.swift</code> files and publishes
                them to the Figma API. Runs on Node.js.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <TagChip color={P} dot={false}>SPM</TagChip>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: C.text }}>Swift Dependency</span>
              </div>
              <CodeBlock filename="Package.swift" highlights={[2, 5]}>
{`dependencies: [
    .package(url: "https://github.com/figma/code-connect", from: "1.4.1"),
],
// Target dependency:
.product(name: "CodeConnect", package: "code-connect")`}
              </CodeBlock>
              <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.6, marginTop: 12 }}>
                Provides the <code style={{ fontFamily: "'JetBrains Mono', monospace", color: P }}>FigmaConnect</code> protocol and
                <code style={{ fontFamily: "'JetBrains Mono', monospace", color: P }}> @FigmaProp</code> property wrapper.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <TagChip color={C.accent} dot={false}>CONFIG</TagChip>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: C.text }}>figma.config.json</span>
            </div>
            <CodeBlock filename="figma.config.json" highlights={[3, 4, 5]}>
{`{
    "codeConnect": {
        "parser": "swift",
        "include": [
            "Sources/SpaceCore_UI_V2_CodeConnect/**",
            "Sources/SpaceCore_UI_V2/**"
        ]
    }
}`}
            </CodeBlock>
            <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.6, marginTop: 12 }}>
              Both paths are required. The second path lets the parser find component source files for "Open in GitHub" links.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div style={{
            padding: 20, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 14,
            display: "flex", alignItems: "center", gap: 16,
          }}>
            <span style={{ fontSize: 24 }}>🔑</span>
            <div>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: C.text }}>FIGMA_ACCESS_TOKEN</span>
              <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.6, margin: "4px 0 0" }}>
                A personal access token from Figma with file read/write permissions. Set as an environment variable before publishing.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
