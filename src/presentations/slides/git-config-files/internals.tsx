import { C, Reveal, SectionLabel, SectionHeading, FeatureCard, PlainEnglishBox } from "../../shared.jsx";
import { P } from "./ui.jsx";

const COMPONENTS = [
  {
    icon: "🔗",
    title: "Gitlink Entry",
    description: "A special tree entry (mode 160000) that records the exact commit SHA the superproject expects. It's not a file or directory — it's a pointer. When you see a submodule in 'git diff', you're seeing this SHA change.",
    note: "Stored in the Git tree object, just like file entries. Type: commit (not blob or tree).",
    color: P,
  },
  {
    icon: "📁",
    title: "Absorbed Git Directory",
    description: "The submodule's full .git database, relocated from the working directory into .git/modules/<name>/. This 'absorption' (Git 2.12+) means the superproject owns all Git data — deleting the working directory doesn't destroy history.",
    note: "Before absorption, each submodule had its own .git/ folder. Now it's a file containing: gitdir: ../../.git/modules/<name>",
    color: C.purple,
  },
  {
    icon: "📂",
    title: "Working Directory",
    description: "The actual checked-out files at the path specified in .gitmodules. Contains a .git file (not directory) that redirects to the absorbed location. This is what your IDE sees and what you edit.",
    note: "The path here matches submodule.<name>.path from .gitmodules. Can be moved with git mv.",
    color: C.accent,
  },
];

const TREE_LINES = [
  { text: "iOS-Space/", color: C.text, indent: 0 },
  { text: "├── .git/", color: C.muted, indent: 1 },
  { text: "│   └── modules/", color: C.purple, indent: 2 },
  { text: "│       ├── iOS-Space-Feature-Home/", color: C.purple, indent: 3 },
  { text: "│       │   ├── HEAD", color: C.subtle, indent: 4 },
  { text: "│       │   ├── objects/", color: C.subtle, indent: 4 },
  { text: "│       │   └── refs/", color: C.subtle, indent: 4 },
  { text: "│       └── iOS-Space-Design-System/", color: C.purple, indent: 3 },
  { text: "├── .gitmodules", color: P, indent: 1 },
  { text: "├── Features/", color: C.text, indent: 1 },
  { text: "│   └── Home/", color: C.accent, indent: 2 },
  { text: "│       ├── .git", color: C.muted, indent: 3, note: "→ file: gitdir: ../../.git/modules/..." },
  { text: "│       ├── Sources/", color: C.accent, indent: 3 },
  { text: "│       └── Package.swift", color: C.accent, indent: 3 },
  { text: "└── Design/", color: C.text, indent: 1 },
  { text: "    └── System/", color: C.accent, indent: 2 },
  { text: "        └── .git", color: C.muted, indent: 2, note: "→ file: gitdir: ../../.git/modules/..." },
];

export function InternalsSection() {
  return (
    <section id="s-internals" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel color={C.purple}>SUBMODULE ANATOMY</SectionLabel>
          <SectionHeading sub="Every submodule exists as three distinct physical components. Understanding all three is the key to debugging submodule issues.">
            Three Physical Components
          </SectionHeading>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 32 }}>
          {COMPONENTS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <FeatureCard {...c} delay={0} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div style={{
            background: C.bg, border: `1px solid ${C.border}`, borderRadius: 14,
            padding: "24px 28px", marginBottom: 24,
          }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, color: C.muted, letterSpacing: "0.12em", marginBottom: 16 }}>
              PHYSICAL LAYOUT
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, lineHeight: 1.9 }}>
              {TREE_LINES.map((line, i) => (
                <div key={i} style={{ color: line.color }}>
                  {line.text}
                  {line.note && (
                    <span style={{ color: C.subtle, fontSize: 11, marginLeft: 8 }}>{line.note}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <PlainEnglishBox color={C.purple}>
            A submodule is three things working together: a SHA pointer in the superproject's tree (gitlink), a complete Git database stored inside .git/modules/, and the actual files checked out in your working directory. The gitlink says "what commit," the absorbed directory stores "all the history," and the working directory shows "the current files." If any of the three gets out of sync, you get the classic submodule headaches.
          </PlainEnglishBox>
        </Reveal>
      </div>
    </section>
  );
}
