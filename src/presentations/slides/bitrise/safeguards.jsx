import { C, Reveal, SectionLabel, SectionHeading, TagChip, CodeBlock } from "../../shared.jsx";
import { P } from "./ui.jsx";

export function SafeguardsSection() {
  return (
    <section id="s-safeguards" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel color={C.yellow}>REQUIRED SAFEGUARDS</SectionLabel>
          <SectionHeading sub="Mandatory prerequisites before migration can begin.">
            Gates to clear first
          </SectionHeading>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <Reveal delay={0}>
            <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 14, padding: "24px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <TagChip color={C.red} dot={false}>REQUIRED</TagChip>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: C.text }}>CODEOWNERS for bitrise.yml</span>
              </div>
              <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.65, marginBottom: 16 }}>
                iOS Leads / Architecture team must approve any CI config change before it can be merged.
              </p>
              <CodeBlock filename="CODEOWNERS" highlights={[2]}>
                {`# CI configuration — requires iOS Lead review\n/bitrise.yml @space-int/ios-leads\n/ci/          @space-int/ios-leads`}
              </CodeBlock>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                {
                  tag: { color: C.red, label: "REQUIRED" },
                  title: "Branch Protection Rules",
                  description: "Required reviews, no force push, status checks on main branch. Prevents unauthorized direct edits.",
                },
                {
                  tag: { color: C.red, label: "REQUIRED" },
                  title: "Secrets Stay in Bitrise Only",
                  description: "Never store API keys, certificates, or tokens in YAML. Secrets remain on Bitrise.io, referenced by name only.",
                },
                {
                  tag: { color: C.yellow, label: "RECOMMENDED" },
                  title: "Pre-commit Secret Scanning",
                  description: "Git hooks catch potential credential leaks before they ever reach the remote. Prevent Git history exposure.",
                },
                {
                  tag: { color: C.yellow, label: "RECOMMENDED" },
                  title: "Keep Trigger Map on .io",
                  description: "Maintain pre-clone evaluation and credit saving. Only the workflow YAML moves to Git.",
                },
              ].map(({ tag, title, description }) => (
                <div key={title} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 22px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <TagChip color={tag.color} dot={false}>{tag.label}</TagChip>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: C.text }}>{title}</span>
                  </div>
                  <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.6, margin: 0 }}>{description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
