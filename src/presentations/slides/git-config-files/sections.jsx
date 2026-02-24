import { useState, useRef } from "react";
import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, PlainEnglishBox, TabButton, useLocalTabNav } from "../../shared.jsx";
import { P } from "./ui.jsx";

const IDENTITY_CODE = `[user]
    name = Giga Khizanishvili
    email = giga@example.com
    signingkey = ssh-ed25519 AAAA...

[core]
    editor = nvim
    autocrlf = input
    whitespace = trailing-space,space-before-tab
    excludesFile = ~/.gitignore_global
    pager = delta --side-by-side
    fsmonitor = true                # Git 2.37+ watchman

[init]
    defaultBranch = main

[commit]
    gpgsign = true
    verbose = true                  # show diff in commit editor
    template = ~/.gitmessage

[tag]
    gpgSign = true
    sort = -version:refname         # newest first`;

const WORKFLOW_CODE = `[push]
    default = current               # push current branch only
    autoSetupRemote = true          # Git 2.37+ auto --set-upstream
    followTags = true               # push annotated tags too

[pull]
    rebase = true                   # rebase instead of merge
    ff = only                       # reject if not fast-forward

[fetch]
    prune = true                    # auto-delete stale remotes
    pruneTags = true
    parallel = 4                    # concurrent fetches

[rebase]
    autoSquash = true               # auto-squash fixup! commits
    autoStash = true                # stash before, apply after
    updateRefs = true               # Git 2.38+ update stacked refs

[branch]
    sort = -committerdate           # newest branches first
    autoSetupMerge = always`;

const MERGE_DIFF_CODE = `[merge]
    conflictStyle = zdiff3          # Git 2.35+ best conflict markers
    ff = false                      # always create merge commit
    tool = opendiff

[diff]
    algorithm = histogram           # better diff output
    colorMoved = default            # highlight moved lines
    renames = copies                # detect copied files too
    mnemonicPrefix = true           # a/ b/ → i/ w/ c/ o/
    tool = opendiff

[rerere]
    enabled = true                  # remember conflict resolutions
    autoUpdate = true               # auto-stage resolved files`;

const ALIAS_CODE = `[alias]
    # Simple shortcuts
    st = status --short --branch
    co = checkout
    br = branch --sort=-committerdate
    ci = commit

    # Log formatting
    lg = log --oneline --graph --decorate -20
    ll = log --pretty=format:'%C(yellow)%h%C(reset) %s %C(dim)— %an, %ar%C(reset)'

    # Shell commands (prefix with !)
    root = !pwd
    whoami = !git config user.name && git config user.email
    cleanup = !git branch --merged | grep -v main | xargs git branch -d

    # Function pattern (multi-line logic)
    fixup = "!f() { git commit --fixup=$1 && GIT_SEQUENCE_EDITOR=: git rebase -i --autosquash $1~1; }; f"
    pr-checkout = "!f() { git fetch origin pull/$1/head:pr-$1 && git checkout pr-$1; }; f"`;

const NETWORK_CODE = `[credential]
    helper = osxkeychain            # macOS
    # helper = store                # plaintext (NOT recommended)
    # helper = cache --timeout=3600 # in-memory for 1 hour

[http]
    sslVerify = true
    postBuffer = 524288000          # 500MB for large repos
    version = HTTP/2

[url "git@github.com:"]
    insteadOf = https://github.com/    # force SSH for all GitHub

[url "https://github.com/"]
    insteadOf = gh:                    # shorthand: gh:user/repo

[protocol]
    version = 2                     # Git protocol v2 (faster)

[protocol "file"]
    allow = user                    # restrict file:// protocol`;

const ADVANCED_CODE = `[filter "lfs"]
    clean = git-lfs clean -- %f
    smudge = git-lfs smudge -- %f
    process = git-lfs filter-process
    required = true

[maintenance]
    repo = /Users/giga/iOS-Space
    auto = true
    strategy = incremental          # Git 2.32+

[gc]
    auto = 256                      # pack after 256 loose objects
    pruneExpire = 2.weeks.ago

[submodule]
    recurse = true                  # auto-recurse in checkout/pull
    fetchJobs = 4                   # parallel submodule fetches

[transfer]
    fsckObjects = true              # verify objects on push/fetch

[receive]
    fsckObjects = true              # verify on server side too`;

const TABS = [
  {
    id: "identity", label: "Identity & Core", icon: "🪪", color: P,
    desc: "Your identity, editor, line endings, and commit signing. These sections define who you are to Git and how it handles your basic interactions.",
    plain: "This is where Git learns your name. Every commit you make is stamped with [user] info. [core] controls the editor that opens for commit messages, how line endings work, and what files to globally ignore.",
    code: IDENTITY_CODE,
    highlights: [2, 3, 4, 7, 8, 15, 21, 22, 26],
  },
  {
    id: "workflow", label: "Workflow", icon: "🔄", color: C.accent,
    desc: "Push, pull, fetch, rebase, and branch behavior. These sections control how code flows between your local repo and remotes — the day-to-day operations.",
    plain: "These settings automate the tedious parts. Instead of remembering --rebase on every pull, or --set-upstream on every push, you configure it once and Git does it automatically.",
    code: WORKFLOW_CODE,
    highlights: [2, 3, 4, 7, 10, 11, 15, 16, 17, 20],
  },
  {
    id: "merge", label: "Merge & Diff", icon: "🔀", color: C.purple,
    desc: "How Git shows differences and resolves conflicts. zdiff3 gives the best conflict markers, histogram produces cleaner diffs, and rerere remembers how you resolved conflicts so you never solve the same one twice.",
    plain: "These make merge conflicts less painful. zdiff3 shows what the code looked like BEFORE either side changed it. rerere memorizes your conflict resolutions — if the same conflict appears again (like during a rebase), Git resolves it automatically.",
    code: MERGE_DIFF_CODE,
    highlights: [2, 6, 7, 8, 13],
  },
  {
    id: "aliases", label: "Aliases", icon: "⚡", color: C.yellow,
    desc: "Custom shortcuts for common commands. Three patterns: simple (direct expansion), shell commands (! prefix for bash), and function pattern for multi-step logic with arguments.",
    plain: "Aliases let you type 'git st' instead of 'git status --short --branch'. The ! prefix runs actual shell commands, and the function pattern lets you write mini scripts that take arguments — like auto-fixup that commits and rebases in one step.",
    code: ALIAS_CODE,
    highlights: [3, 4, 5, 6, 9, 10, 13, 14, 15, 18, 19],
  },
  {
    id: "network", label: "Network & Auth", icon: "🌐", color: C.red,
    desc: "Credential storage, HTTP settings, URL rewriting, and protocol control. These sections determine how Git authenticates, which protocol it uses, and how URLs map to actual endpoints.",
    plain: "The most powerful trick here is URL rewriting. Your team's .gitmodules can use HTTPS URLs (accessible to CI), while your personal .gitconfig silently rewrites them to SSH (using your key). Everyone shares the same repo config, but authenticates differently.",
    code: NETWORK_CODE,
    highlights: [2, 7, 8, 11, 14, 17],
  },
  {
    id: "advanced", label: "Advanced", icon: "🧰", color: C.muted,
    desc: "LFS filters, background maintenance, garbage collection, submodule recursion, and transfer integrity checks. These sections handle the infrastructure layer that keeps repositories performant and secure.",
    plain: "These are the 'set once, forget' settings. LFS handles large files automatically. Maintenance runs background optimization. transfer.fsckObjects verifies every object Git receives — catching corruption and tampered data before it enters your repo.",
    code: ADVANCED_CODE,
    highlights: [2, 3, 4, 10, 11, 16, 17, 20],
  },
];

export function SectionsSection() {
  const [active, setActive] = useState(0);
  const activeRef = useRef(active);
  activeRef.current = active;
  useLocalTabNav("s-sections", TABS.length, activeRef, setActive);

  const tab = TABS[active];

  return (
    <section id="s-sections" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <div>
        <Reveal>
          <SectionLabel color={P}>CONFIGURATION SECTIONS</SectionLabel>
          <SectionHeading sub="Every major section group in .gitconfig — what it controls, the most important keys, and why they matter.">
            Every Section in .gitconfig
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
            background: C.surface, border: `1px solid ${tab.color}35`,
            borderTop: `3px solid ${tab.color}`, borderRadius: 14, overflow: "hidden",
            animation: "fadeIn 0.2s ease both",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr" }}>
            <div style={{ padding: "26px 28px", borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 6 }}>
                  <span style={{ fontSize: 20 }}>{tab.icon}</span>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: C.text }}>{tab.label}</span>
                </div>
              </div>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: C.muted, lineHeight: 1.8, margin: 0 }}>
                {tab.desc}
              </p>

              <PlainEnglishBox color={tab.color}>{tab.plain}</PlainEnglishBox>
            </div>

            <div style={{ padding: "22px 24px" }}>
              <CodeBlock filename={`.gitconfig [${tab.label}]`} highlights={tab.highlights}>{tab.code}</CodeBlock>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
