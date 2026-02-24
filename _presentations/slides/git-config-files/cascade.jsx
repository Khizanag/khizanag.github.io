import { useState, useRef } from "react";
import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, CalloutBox, PlainEnglishBox, TabButton, useLocalTabNav } from "../../src/shared.jsx";
import { P } from "./ui.jsx";

const SYSTEM_CODE = `# /etc/gitconfig  (or Git installation dir)
# Set by IT / sysadmin — applies to EVERY user on this machine

[core]
    autocrlf = input         # normalize line endings
    longpaths = true         # Windows: allow >260 char paths

[init]
    defaultBranch = main     # company standard

[safe]
    directory = *            # trust all repos (corporate image)

[http]
    sslBackend = openssl     # force TLS backend`;

const GLOBAL_CODE = `# ~/.gitconfig  (or ~/.config/git/config)
# Your personal identity & preferences

[user]
    name = Giga Khizanishvili
    email = giga@example.com
    signingkey = ABC123DEF456

[commit]
    gpgsign = true

[alias]
    st = status --short --branch
    lg = log --oneline --graph --decorate -20
    fixup = commit --fixup

[core]
    editor = nvim
    pager = delta

[pull]
    rebase = true

[rerere]
    enabled = true`;

const LOCAL_CODE = `# .git/config  (inside each repository)
# Per-repo remotes, branches, submodule state

[core]
    repositoryformatversion = 0
    bare = false
    logallrefupdates = true

[remote "origin"]
    url = git@github.com:AcmeCorp/iOS-Space.git
    fetch = +refs/heads/*:refs/remotes/origin/*

[branch "master"]
    remote = origin
    merge = refs/heads/master

[submodule "iOS-Space-Feature-Home"]
    active = true
    url = git@github.com:AcmeCorp/iOS-Space-Feature-Home.git`;

const WORKTREE_CODE = `# .git/config.worktree  (Git 2.20+)
# Per-worktree overrides — different settings per checkout

[core]
    sparseCheckout = true
    sparseCheckoutCone = true

[user]
    email = giga.personal@example.com

# Requires: git config extensions.worktreeConfig true

# Use case: main worktree uses work email,
# separate worktree for OSS uses personal email`;

const INCLUDE_CODE = `# Conditional includes — load extra config based on context
[includeIf "gitdir:~/Work/"]
    path = ~/.gitconfig-work

[includeIf "gitdir:~/Personal/"]
    path = ~/.gitconfig-personal

[includeIf "onbranch:release/"]
    path = ~/.gitconfig-release

[includeIf "hasconfig:remote.*.url:git@github.com:AcmeCorp/**"]
    path = ~/.gitconfig-acme`;

const TABS = [
  {
    id: "system", label: "System", icon: "🖥️", color: C.muted,
    path: "/etc/gitconfig",
    desc: "Machine-wide defaults applied to every user and every repository on this computer. Typically set by IT or sysadmins on corporate machines. Lowest priority — overridden by everything else.",
    plain: "Think of system config as the factory settings on your computer. IT sets baseline rules (like line endings or default branch name) that apply unless you or your repo say otherwise.",
    code: SYSTEM_CODE,
    highlights: [5, 6, 9, 12, 15],
  },
  {
    id: "global", label: "Global", icon: "👤", color: C.accent,
    path: "~/.gitconfig",
    desc: "Your personal preferences that follow you across all repositories. Identity, editor, aliases, signing — everything that makes Git feel like yours. This is where most developers spend their time configuring.",
    plain: "Your global config is like your personal toolbox. Whatever you set here applies to every repo you touch, unless that specific repo overrides it. It's where your name, email, favorite aliases, and editor preference live.",
    code: GLOBAL_CODE,
    highlights: [4, 5, 6, 10, 13, 14, 15, 20, 23],
  },
  {
    id: "local", label: "Local", icon: "📂", color: P,
    path: ".git/config",
    desc: "Per-repository settings. Automatically created when you clone or init. Contains remote URLs, branch tracking, and submodule active state. This is what git remote and git branch commands modify under the hood.",
    plain: "Local config is what makes each repo unique. When you add a remote or track a branch, Git writes it here. It also stores submodule state after you run git submodule init — copying URLs from .gitmodules into this file.",
    code: LOCAL_CODE,
    highlights: [9, 10, 13, 14, 17, 18],
  },
  {
    id: "worktree", label: "Worktree", icon: "🌿", color: C.yellow,
    path: ".git/config.worktree",
    desc: "Per-worktree overrides introduced in Git 2.20. Allows different settings for each linked worktree — useful for sparse checkout, different user emails, or different build configurations in parallel checkouts.",
    plain: "If you use git worktree to have multiple checkouts of the same repo, worktree config lets each checkout have its own settings. Like having two desks in the same office, each set up differently.",
    code: WORKTREE_CODE,
    highlights: [4, 5, 8],
  },
];

const PRECEDENCE = [
  { level: "Environment vars", note: "GIT_CONFIG_*", color: C.red, priority: "Highest" },
  { level: "Command-line", note: "git -c key=val", color: C.red, priority: "" },
  { level: "Worktree", note: ".git/config.worktree", color: C.yellow, priority: "" },
  { level: "Local", note: ".git/config", color: P, priority: "" },
  { level: "Global", note: "~/.gitconfig", color: C.accent, priority: "" },
  { level: "System", note: "/etc/gitconfig", color: C.muted, priority: "Lowest" },
];

export function CascadeSection() {
  const [active, setActive] = useState(0);
  const activeRef = useRef(active);
  activeRef.current = active;
  useLocalTabNav("s-cascade", TABS.length, activeRef, setActive);

  const tab = TABS[active];

  return (
    <section id="s-cascade" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel color={P}>.GITCONFIG LEVELS</SectionLabel>
          <SectionHeading sub="Git reads configuration from four levels, each overriding the one before. Last writer wins.">
            The Configuration Cascade
          </SectionHeading>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
            {TABS.map((t, i) => (
              <TabButton key={t.id} active={i === active} color={t.color} icon={t.icon} label={t.label} onClick={() => setActive(i)} />
            ))}
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.subtle, marginLeft: "auto" }}>
              ← → to cycle
            </span>
          </div>
        </Reveal>

        <div
          key={active}
          style={{
            background: C.bg, border: `1px solid ${tab.color}35`,
            borderTop: `3px solid ${tab.color}`, borderRadius: 14, overflow: "hidden",
            animation: "fadeIn 0.2s ease both", marginBottom: 32,
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr" }}>
            <div style={{ padding: "26px 28px", borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 6 }}>
                  <span style={{ fontSize: 20 }}>{tab.icon}</span>
                  <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: tab.color }}>{tab.path}</code>
                </div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: C.text }}>{tab.label} Level</div>
              </div>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: C.muted, lineHeight: 1.8, margin: 0 }}>
                {tab.desc}
              </p>

              <PlainEnglishBox color={tab.color}>{tab.plain}</PlainEnglishBox>
            </div>

            <div style={{ padding: "22px 24px" }}>
              <CodeBlock filename={tab.path} highlights={tab.highlights}>{tab.code}</CodeBlock>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <Reveal delay={0.3}>
            <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 14, padding: "24px 22px" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, color: C.muted, letterSpacing: "0.12em", marginBottom: 16 }}>
                PRECEDENCE STACK
              </div>
              {PRECEDENCE.map((p, i) => (
                <div key={p.level} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
                  background: i === 0 ? `${p.color}12` : "transparent",
                  borderRadius: 8, marginBottom: 4,
                }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%", background: p.color, flexShrink: 0,
                    boxShadow: i === 0 ? `0 0 8px ${p.color}60` : "none",
                  }} />
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: p.color, minWidth: 110 }}>
                    {p.level}
                  </span>
                  <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.subtle, flex: 1 }}>
                    {p.note}
                  </code>
                  {p.priority && (
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: p.color, opacity: 0.7 }}>
                      {p.priority}
                    </span>
                  )}
                </div>
              ))}
              <div style={{
                marginTop: 12, padding: "10px 14px", background: `${C.border}30`, borderRadius: 8,
                fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.6,
              }}>
                Each level reads bottom-to-top. Values set at higher levels override lower ones. The last value Git encounters wins.
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div>
              <CalloutBox color={C.yellow} label="CONDITIONAL INCLUDES" icon="🎯">
                Git 2.13+ supports <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.yellow }}>[includeIf]</code> — load different config files based on directory, branch, or even remote URL. Perfect for separating work and personal identities.
              </CalloutBox>
              <div style={{ marginTop: 16 }}>
                <CodeBlock filename="~/.gitconfig (conditional)" highlights={[2, 3, 5, 6, 8, 9, 11, 12]}>
                  {INCLUDE_CODE}
                </CodeBlock>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
