import { C, Reveal, SectionLabel, SectionHeading, CalloutBox } from "../../src/shared.jsx";
import { P } from "./ui.jsx";

const ROWS = [
  { aspect: "Purpose",       gitconfig: "Controls Git's behavior",           gitmodules: "Declares submodule dependencies" },
  { aspect: "Format",        gitconfig: "INI: [section] key = value",        gitmodules: "INI: [submodule \"name\"] key = value" },
  { aspect: "Tracked by Git",gitconfig: "Never — local to each machine",     gitmodules: "Always — committed and shared" },
  { aspect: "Location",      gitconfig: "/etc/, ~/,  .git/config",           gitmodules: "Repository root" },
  { aspect: "Levels",        gitconfig: "System → Global → Local → Worktree",gitmodules: "Single file (one level)" },
  { aspect: "Created by",    gitconfig: "git config, manual edit",           gitmodules: "git submodule add" },
  { aspect: "Cascade",       gitconfig: "Last writer wins across 4+ levels", gitmodules: "No cascade — one source of truth" },
  { aspect: "Key sections",  gitconfig: "user, core, push, pull, alias, url",gitmodules: "submodule (path, url, branch, update)" },
  { aspect: "Connection",    gitconfig: "Receives URLs from init",           gitmodules: "Provides URLs for init to copy" },
  { aspect: "Env overrides", gitconfig: "GIT_CONFIG_*, GIT_AUTHOR_*",       gitmodules: "None — always reads the file" },
];

export function SummarySection() {
  return (
    <section id="s-summary" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={P}>REFERENCE</SectionLabel>
        <SectionHeading sub="A side-by-side comparison of .gitconfig and .gitmodules across every dimension that matters.">
          Complete Quick Reference
        </SectionHeading>
      </Reveal>

      <Reveal delay={0.1}>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 2fr 2fr", padding: "12px 20px", borderBottom: `2px solid ${C.border}` }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: C.muted, letterSpacing: "0.12em" }}>ASPECT</span>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: P, letterSpacing: "0.12em" }}>⚙️ .GITCONFIG</span>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: C.purple, letterSpacing: "0.12em" }}>📦 .GITMODULES</span>
          </div>
          {ROWS.map((row, i) => (
            <div key={row.aspect} style={{
              display: "grid", gridTemplateColumns: "1.2fr 2fr 2fr",
              padding: "12px 20px", borderTop: i > 0 ? `1px solid ${C.border}` : "none",
              background: i % 2 ? `${C.border}15` : "transparent", alignItems: "center",
            }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, color: C.text }}>
                {row.aspect}
              </span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.muted, lineHeight: 1.6 }}>
                {row.gitconfig}
              </span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.muted, lineHeight: 1.6 }}>
                {row.gitmodules}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.3}>
        <CalloutBox color={P} label="THE KEY INSIGHT" icon="🔑">
          <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: P }}>.gitconfig</code> and <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.purple }}>.gitmodules</code> are a <strong style={{ color: C.text }}>symbiotic pair</strong>. The .gitmodules file declares what submodules exist and where they come from (shared with the team). The .git/config file stores each developer's active submodule state (local only). <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.accent }}>git submodule init</code> is the bridge that copies from one to the other — and <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.accent }}>[url].insteadOf</code> is the escape hatch that lets everyone authenticate differently while sharing the same configuration.
        </CalloutBox>
      </Reveal>
    </section>
  );
}
