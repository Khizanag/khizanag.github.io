import { C, Reveal, SectionLabel, SectionHeading } from "../../src/shared.jsx";
import { P, CompareRow } from "./ui.jsx";

export function ComparisonSection() {
  return (
    <section id="s-comparison" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel color={C.blue}>COMPARISON</SectionLabel>
          <SectionHeading sub="Side-by-side analysis of both approaches across key dimensions.">
            Bitrise.io vs Git repository
          </SectionHeading>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
            <div style={{
              display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr",
              background: C.surface, borderBottom: `1px solid ${C.border}`,
            }}>
              {[
                { label: "FEATURE",           color: C.muted },
                { label: "BITRISE.IO MANAGED", color: C.muted },
                { label: "GIT REPOSITORY",     color: P },
              ].map(({ label, color }) => (
                <div key={label} style={{ padding: "16px 20px", borderLeft: label !== "FEATURE" ? `1px solid ${C.border}` : "none", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color, letterSpacing: "0.12em" }}>
                  {label}
                </div>
              ))}
            </div>
            <div style={{ padding: "0 20px" }}>
              <CompareRow feature="Version Control"   bitriseIo="No history"           git="Full git log"            highlight delay={0.05} />
              <CompareRow feature="Code Review"       bitriseIo="Not possible"         git="Via Pull Requests"       highlight delay={0.10} />
              <CompareRow feature="GUI Editing"       bitriseIo="Full Workflow Editor" git="Partially read-only"               delay={0.15} />
              <CompareRow feature="Trigger Map"       bitriseIo="Pre-clone evaluation" git="Post-clone only"                   delay={0.20} />
              <CompareRow feature="Local Testing"     bitriseIo="Not possible"         git="bitrise run <workflow>"  highlight delay={0.25} />
              <CompareRow feature="Secrets Security"  bitriseIo="Encrypted on .io"     git="Still on .io"                      delay={0.30} />
              <CompareRow feature="PPE Risk"          bitriseIo="Minimal"              git="Needs CODEOWNERS"                  delay={0.35} />
              <CompareRow feature="Modular YAML"      bitriseIo="Unavailable"          git="Enterprise plan"         highlight delay={0.40} />
              <CompareRow feature="Disaster Recovery" bitriseIo=".io-dependent"        git="Git is the backup"       highlight delay={0.45} />
              <CompareRow feature="Merge Conflicts"   bitriseIo="No conflicts"         git="Same as any shared file"           delay={0.50} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
