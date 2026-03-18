import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, CalloutBox } from "../../shared.jsx";
import { P } from "./ui.jsx";

const GITCONFIG_POINTS = [
  "Controls Git's behavior for every command you run",
  "Cascades through 4+ levels: system → global → local → worktree",
  "Never tracked by Git — each clone is a blank slate",
  "Stores aliases, signing keys, merge strategies, credential helpers",
];

const GITMODULES_POINTS = [
  "Declares every submodule dependency in the repository",
  "Tracked by Git — committed and shared across all clones",
  "Maps logical names to URLs and filesystem paths",
  "Controls update strategy, branch tracking, and shallow clones",
];

const INI_SYNTAX = `# Comments start with # or ;
[section]
    key = value

[section "subsection"]
    key = value

# Real examples:
[user]
    name = Giga Khizanishvili
    email = giga@example.com

[submodule "iOS-Space-Feature-Home"]
    path = Features/Home
    url = git@github.com:AcmeCorp/iOS-Space-Feature-Home.git`;

export function OverviewSection() {
  return (
    <section id="s-overview" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={P}>THE FUNDAMENTALS</SectionLabel>
        <SectionHeading sub="Both files use the same INI-style format. One is personal and never committed. The other is shared and always committed.">
          Two Files, One System
        </SectionHeading>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
        <Reveal delay={0.1}>
          <div style={{
            background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14,
            borderTop: `3px solid ${P}`, padding: "28px 24px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 20 }}>⚙️</span>
              <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, color: P, fontWeight: 600 }}>.gitconfig</code>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: C.muted, marginBottom: 16, lineHeight: 1.6 }}>
              Your personal Git settings — how Git behaves on your machine
            </p>
            {GITCONFIG_POINTS.map((pt, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
                <span style={{ color: P, fontSize: 11, marginTop: 2, flexShrink: 0 }}>→</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{pt}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div style={{
            background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14,
            borderTop: `3px solid ${C.purple}`, padding: "28px 24px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 20 }}>📦</span>
              <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, color: C.purple, fontWeight: 600 }}>.gitmodules</code>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: C.muted, marginBottom: 16, lineHeight: 1.6 }}>
              The repo's submodule registry — what external code this project needs
            </p>
            {GITMODULES_POINTS.map((pt, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
                <span style={{ color: C.purple, fontSize: 11, marginTop: 2, flexShrink: 0 }}>→</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{pt}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.3}>
        <CodeBlock filename="Shared INI Syntax" highlights={[1, 2, 3, 5, 6, 9, 10, 11, 13, 14, 15]}>
          {INI_SYNTAX}
        </CodeBlock>
      </Reveal>

      <Reveal delay={0.4}>
        <div style={{ marginTop: 20 }}>
          <CalloutBox color={P} label="SAME FORMAT, DIFFERENT SCOPE" icon="🔗">
            Both files use Git's INI format: <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: P }}>[section "subsection"]</code> headers followed by <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: P }}>key = value</code> pairs. The critical difference is visibility — <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: P }}>.gitconfig</code> stays on your machine while <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.purple }}>.gitmodules</code> travels with the repository.
          </CalloutBox>
        </div>
      </Reveal>
    </section>
  );
}
