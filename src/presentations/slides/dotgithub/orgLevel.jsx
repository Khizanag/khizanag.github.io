import { C, Reveal, SectionLabel, SectionHeading, CalloutBox, CheckItem, useInView } from "../../shared.jsx";
import { P } from "./ui.jsx";

const SUPPORTED = [
  { file: "CODE_OF_CONDUCT.md", note: "Applied across all repos" },
  { file: "CONTRIBUTING.md",    note: "Applied across all repos" },
  { file: "FUNDING.yml",        note: "Applied across all repos" },
  { file: "SECURITY.md",        note: "Applied across all repos" },
  { file: "SUPPORT.md",         note: "Applied across all repos" },
  { file: "ISSUE_TEMPLATE/",    note: "Applied when repo has no templates" },
];

const NOT_SUPPORTED = [
  "LICENSE — must be in each repository",
  "CODEOWNERS — must be in each repository",
  "workflows/ — cannot be inherited (by design)",
  "dependabot.yml — must be in each repository",
  "PULL_REQUEST_TEMPLATE — must be in each repository",
];

function Step({ n, title, body, color }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ display: "flex", gap: 16, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)", transition: `opacity 0.5s ease ${n * 0.1}s, transform 0.5s ease ${n * 0.1}s` }}>
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${color}15`, border: `1.5px solid ${color}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 13, color }}>{n}</span>
      </div>
      <div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 4 }}>{title}</div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: C.muted, lineHeight: 1.7 }}>{body}</p>
      </div>
    </div>
  );
}

export function OrgLevelSection() {
  return (
    <section id="s-org" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={P}>ORGANIZATION DEFAULTS</SectionLabel>
        <SectionHeading sub="A special repository named .github at the organization level acts as a fallback — providing default community health files for every repo that hasn't defined its own.">
          The .github Organization Repository
        </SectionHeading>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        <Reveal delay={0.1}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderTop: `3px solid ${P}`, borderRadius: 14, padding: "26px 28px" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: P, letterSpacing: "0.1em", marginBottom: 18 }}>HOW IT WORKS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <Step n={1} color={P} title="Create a public .github repo"
                body="In your GitHub organization, create a public repository literally named .github. Private repos won't work — org defaults require the repo to be public." />
              <Step n={2} color={P} title="Add your default files"
                body="Place community health files in the root of this repo (not in a .github/ folder inside it — the root is the .github/ folder). GitHub watches for the supported file names directly." />
              <Step n={3} color={P} title="Automatic fallback kicks in"
                body="Any repository in the organization that lacks its own version of a supported file will automatically display the org default. No configuration required on individual repos." />
              <Step n={4} color={P} title="Repo-level files take full priority"
                body="If a repository defines any of its own templates or health files, the org defaults are completely ignored for that file type — there is no merging." />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "22px 24px" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: C.muted, letterSpacing: "0.12em", marginBottom: 14 }}>WHAT CAN BE CENTRALIZED</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {SUPPORTED.map(({ file, note }) => (
                  <div key={file} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: C.bg, borderRadius: 8, border: `1px solid ${C.border}` }}>
                    <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.accent }}>{file}</code>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted }}>{note}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "22px 24px" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: C.muted, letterSpacing: "0.12em", marginBottom: 14 }}>WHAT CANNOT BE CENTRALIZED</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {NOT_SUPPORTED.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: C.red, fontSize: 12, flexShrink: 0 }}>✕</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.45}>
        <CalloutBox color={P} label="TEMPLATE OVERRIDE RULE" icon="⚡">
          For <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: P }}>ISSUE_TEMPLATE/</code>, the override is all-or-nothing. If a repository has <strong style={{ color: C.text }}>any</strong> file inside its own <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: P }}>.github/ISSUE_TEMPLATE/</code>, the organization defaults are completely ignored for that repo — templates don't merge or combine. Plan your org defaults as truly universal templates.
        </CalloutBox>
      </Reveal>
    </section>
  );
}
