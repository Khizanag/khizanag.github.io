import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, CalloutBox, PlainEnglishBox, KeyValueDiff } from "../../shared.jsx";
import { P } from "./ui.jsx";

const INIT_DIFF = [
  {
    before: ".gitmodules: [submodule \"Home\"]  url = https://github.com/...",
    after: ".git/config:  [submodule \"Home\"]  url = https://github.com/...",
  },
  {
    before: ".gitmodules: [submodule \"Home\"]  active = (not set)",
    after: ".git/config:  [submodule \"Home\"]  active = true",
  },
  {
    before: ".gitmodules: [submodule \"Home\"]  update = checkout",
    after: ".git/config:  [submodule \"Home\"]  update = checkout",
  },
];

const URL_REWRITE = `# .gitmodules (committed, shared with everyone)
[submodule "iOS-Space-Feature-Home"]
    url = https://github.com/AcmeCorp/iOS-Space-Feature-Home.git

# ~/.gitconfig (personal, never committed)
[url "git@github.com:"]
    insteadOf = https://github.com/

# Result: Git silently rewrites the HTTPS URL to SSH
# .gitmodules says:  https://github.com/AcmeCorp/...
# Git actually uses: git@github.com:AcmeCorp/...

# CI uses HTTPS + token authentication (no SSH keys needed)
# Developers use SSH + personal key (no token management)`;

const PRECEDENCE_CODE = `# The 3-step URL resolution:

# 1. Git reads URL from .git/config [submodule "name"]
#    (set by 'git submodule init' or manual override)

# 2. If not in .git/config, falls back to .gitmodules

# 3. Applies [url "..."].insteadOf rewrites from
#    global/local .gitconfig to the resolved URL

# Override example — use a mirror for CI:
# git config submodule.Home.url https://mirror.internal/Home.git
# This overrides .gitmodules WITHOUT modifying the tracked file`;

const PRECEDENCE_STEPS = [
  { n: "1", label: ".git/config", note: "Local override (set by init or manually)", color: C.red },
  { n: "2", label: ".gitmodules", note: "Tracked default (shared with team)", color: C.purple },
  { n: "3", label: "[url].insteadOf", note: "Global rewriting (personal .gitconfig)", color: P },
];

export function BridgeSection() {
  return (
    <section id="s-bridge" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={P}>THE CONNECTION</SectionLabel>
        <SectionHeading sub="How git submodule init bridges the gap between the tracked .gitmodules and your local .git/config — and how URL rewriting lets teams share one config while authenticating differently.">
          How .gitconfig and .gitmodules Work Together
        </SectionHeading>
      </Reveal>

      <Reveal delay={0.1}>
        <div style={{
          background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14,
          padding: "24px 22px", marginBottom: 24,
        }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, color: C.muted, letterSpacing: "0.12em", marginBottom: 16 }}>
            WHAT <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: P }}>git submodule init</code> COPIES
          </div>
          <KeyValueDiff items={INIT_DIFF} />
        </div>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        <Reveal delay={0.2}>
          <div>
            <CodeBlock filename="URL Rewriting" highlights={[2, 3, 6, 7, 10, 11, 13, 14]}>
              {URL_REWRITE}
            </CodeBlock>
            <div style={{ marginTop: 16 }}>
              <PlainEnglishBox color={P}>
                URL rewriting is the secret weapon for multi-team repos. The committed .gitmodules uses HTTPS (works everywhere, including CI). Your personal .gitconfig rewrites all github.com HTTPS URLs to SSH. You get key-based auth; CI gets token-based auth. Same .gitmodules, different authentication — nobody needs to change anything.
              </PlainEnglishBox>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div>
            <div style={{
              background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14,
              padding: "24px 22px", marginBottom: 20,
            }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, color: C.muted, letterSpacing: "0.12em", marginBottom: 16 }}>
                URL RESOLUTION ORDER
              </div>
              {PRECEDENCE_STEPS.map((step) => (
                <div key={step.n} style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "12px 14px",
                  borderBottom: `1px solid ${C.border}`,
                }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 8, background: `${step.color}18`,
                    border: `1px solid ${step.color}40`, display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 14, color: step.color, flexShrink: 0,
                  }}>
                    {step.n}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: step.color }}>{step.label}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted }}>{step.note}</div>
                  </div>
                </div>
              ))}
            </div>

            <CodeBlock filename="Precedence in Action" highlights={[1, 4, 7, 8, 11, 12]}>
              {PRECEDENCE_CODE}
            </CodeBlock>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.4}>
        <CalloutBox color={C.accent} label="MULTI-TEAM TIP" icon="🤝">
          For cross-team repositories: always use <strong style={{ color: C.text }}>HTTPS URLs in .gitmodules</strong> (works with CI tokens and new developer setup) and let individual developers add <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.accent }}>[url].insteadOf</code> in their personal <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.accent }}>~/.gitconfig</code> to rewrite to SSH. This way, the committed config works out of the box for everyone, and power users can customize silently.
        </CalloutBox>
      </Reveal>
    </section>
  );
}
