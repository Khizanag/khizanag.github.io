import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, CalloutBox, PlainEnglishBox } from "../../shared.jsx";
import { P, ConfigKeyRow } from "./ui.jsx";

const KEYS = [
  { name: "path",     type: "string", def: "—",      desc: "Filesystem path relative to repo root where the submodule is checked out" },
  { name: "url",      type: "string", def: "—",      desc: "Remote URL to clone from. Can be absolute or relative (../sibling.git)" },
  { name: "branch",   type: "string", def: "HEAD",   desc: "Remote branch to track. Use '.' for same-name-as-superproject branch" },
  { name: "update",   type: "enum",   def: "checkout",desc: "Strategy for git submodule update: checkout, rebase, merge, or none" },
  { name: "ignore",   type: "enum",   def: "none",   desc: "What to ignore in status/diff: none, dirty, untracked, or all" },
  { name: "shallow",  type: "bool",   def: "false",  desc: "Clone with --depth 1. Saves disk/time but limits history operations" },
  { name: "fetchRecurseSubmodules", type: "bool", def: "true", desc: "Whether git fetch recurses into this submodule automatically" },
];

const IOS_EXAMPLE = `# .gitmodules — iOS-Space monorepo
[submodule "iOS-Space-Feature-Home"]
    path = Features/Home
    url = git@github.com:AcmeCorp/iOS-Space-Feature-Home.git
    branch = .
    update = checkout

[submodule "iOS-Space-Feature-Auth"]
    path = Features/Auth
    url = git@github.com:AcmeCorp/iOS-Space-Feature-Auth.git
    branch = master
    update = checkout
    ignore = dirty

[submodule "iOS-Space-Design-System"]
    path = Design/System
    url = git@github.com:AcmeCorp/iOS-Space-Design-System.git
    branch = master
    shallow = true`;

const UPDATE_COMPARE = `# update = checkout  (default)
# Detaches HEAD to the exact commit recorded in the superproject
git checkout <recorded-sha>

# update = rebase
# Rebases submodule's current branch onto the recorded commit
git rebase <recorded-sha>

# update = merge
# Merges the recorded commit into the submodule's current branch
git merge <recorded-sha>

# update = none
# Does nothing — you manage the submodule manually
# Useful for submodules with local-only changes

# update = !command
# Runs a custom shell command instead of any built-in strategy`;

export function GitmodulesSection() {
  return (
    <section id="s-gitmodules" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={C.purple}>.GITMODULES</SectionLabel>
        <SectionHeading sub="The committed manifest that declares every submodule — its URL, path, branch, and update strategy. Shared across all clones.">
          The Submodule Registry
        </SectionHeading>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 24, marginBottom: 24 }}>
        <div>
          <Reveal delay={0.1}>
            <div style={{
              background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14,
              borderTop: `3px solid ${C.purple}`, padding: "24px 22px", marginBottom: 20,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 20 }}>📋</span>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: C.text }}>What It Is</span>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: C.muted, lineHeight: 1.8, margin: 0 }}>
                A tracked file at the repository root that maps each submodule's logical name to its remote URL and local path. When someone clones your repo, this file tells Git exactly where to fetch each submodule from and where to place it.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 20 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.8fr 0.8fr 0.8fr 3fr", padding: "10px 16px", borderBottom: `2px solid ${C.border}` }}>
                {["KEY", "TYPE", "DEFAULT", "DESCRIPTION"].map((h) => (
                  <span key={h} style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: C.muted, letterSpacing: "0.12em" }}>{h}</span>
                ))}
              </div>
              {KEYS.map((k) => (
                <ConfigKeyRow key={k.name} {...k} color={C.purple} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <PlainEnglishBox color={C.purple}>
              Think of .gitmodules as a package manifest — like Package.swift or package.json — but for Git repositories instead of libraries. It declares "this project depends on these other repos, at these paths." The actual commit each submodule points to is stored separately in the Git tree (as a gitlink entry).
            </PlainEnglishBox>
          </Reveal>
        </div>

        <div>
          <Reveal delay={0.15}>
            <div style={{ marginBottom: 20 }}>
              <CodeBlock filename=".gitmodules" highlights={[2, 3, 4, 5, 6, 9, 10, 11, 14, 17, 18, 20]}>
                {IOS_EXAMPLE}
              </CodeBlock>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <CodeBlock filename="Update Strategies Compared" highlights={[1, 2, 5, 6, 9, 10, 13, 14, 17, 18]}>
              {UPDATE_COMPARE}
            </CodeBlock>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.3}>
        <CalloutBox color={C.purple} label="PATH VS NAME" icon="⚠️">
          The submodule <strong style={{ color: C.text }}>name</strong> (in brackets) and the <strong style={{ color: C.text }}>path</strong> (where it's checked out) can differ. The name is the permanent identifier stored in <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.purple }}>.git/config</code> and <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.purple }}>.git/modules/</code>. The path can be moved with <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.purple }}>git mv</code>, but the name stays forever — even after removal, the name is reserved.
        </CalloutBox>
      </Reveal>
    </section>
  );
}
