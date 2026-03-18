import { C, Reveal, SectionLabel, SectionHeading, InfoCard, CalloutBox } from "../../shared.jsx";
import { P } from "./ui.jsx";

const CASES = [
  {
    icon: "😵",
    title: "Detached HEAD After Update",
    tag: "COMMON",
    color: C.red,
    content: "By default, git submodule update checks out the recorded commit — not a branch. This leaves HEAD detached. Any commits you make are orphaned when you update again. Fix: work on a branch inside the submodule, or use update = rebase/merge in .gitmodules.",
  },
  {
    icon: "🔀",
    title: "Branch Switching Chaos",
    tag: "COMMON",
    color: C.red,
    content: "Switching branches in the superproject changes the gitlink SHA but does NOT automatically update submodule working directories. You end up with the wrong submodule code checked out. Fix: always run git submodule update --recursive after checkout, or set submodule.recurse = true.",
  },
  {
    icon: "🪆",
    title: "Nested Submodules",
    tag: "COMPLEX",
    color: C.yellow,
    content: "Submodules can contain their own submodules. Every command needs --recursive to reach them all. Miss one level and you get partial checkouts. CI is especially vulnerable — always use --recurse-submodules on clone and --recursive on update.",
  },
  {
    icon: "💥",
    title: "Merge Conflicts in Gitlinks",
    tag: "PAINFUL",
    color: C.red,
    content: "When two branches modify the same submodule, you get a conflict on the gitlink SHA — but Git can't three-way merge commit hashes. You must manually decide which commit to keep, then git add the path. There's no automatic resolution.",
  },
  {
    icon: "🔗",
    title: "URL Changes Not Propagating",
    tag: "SUBTLE",
    color: C.yellow,
    content: "Updating a URL in .gitmodules doesn't update existing clones. Their .git/config still points to the old URL. Everyone must run git submodule sync after pulling the .gitmodules change — and this step is easily forgotten.",
  },
  {
    icon: "👻",
    title: "Uninitialized After Clone",
    tag: "GOTCHA",
    color: C.muted,
    content: "A plain git clone creates empty directories for submodules but doesn't fetch their content. The directories exist but contain nothing. New team members see build failures until they learn to run git submodule update --init --recursive.",
  },
];

export function EdgeCasesSection() {
  return (
    <section id="s-edge-cases" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel color={C.red}>PITFALLS & EDGE CASES</SectionLabel>
          <SectionHeading sub="The six scenarios where submodules silently break your workflow. Every iOS team using submodules has hit at least three of these.">
            Where Submodules Break
          </SectionHeading>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 24 }}>
          {CASES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <InfoCard icon={c.icon} title={c.title} tag={c.tag} color={c.color} delay={0}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: C.muted, lineHeight: 1.7 }}>
                  {c.content}
                </span>
              </InfoCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.5}>
          <CalloutBox color={C.accent} label="THE GOLDEN RULE" icon="🏆">
            After <strong style={{ color: C.text }}>every</strong> checkout, pull, merge, or rebase in the superproject, run: <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.accent }}>git submodule update --init --recursive</code>. Better yet, set <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.accent }}>submodule.recurse = true</code> in your global .gitconfig to make Git do it automatically. This single setting prevents the majority of submodule issues.
          </CalloutBox>
        </Reveal>
      </div>
    </section>
  );
}
