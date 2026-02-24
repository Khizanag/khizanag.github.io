import { C, Reveal, SectionLabel, SectionHeading, WorkflowStep, CalloutBox } from "../../shared.jsx";
import { P } from "./ui.jsx";

const STEPS = [
  {
    title: "git submodule add <url> <path>",
    content: "Clones the repo, adds the path to .gitmodules, stages both .gitmodules and the gitlink entry. You must commit these changes — Git only stages them.",
  },
  {
    title: "git submodule init",
    content: "Copies URL and other settings from .gitmodules into .git/config. This is where the bridge happens — .gitmodules (tracked) becomes .git/config (local). You can override the URL in .git/config before the next step.",
  },
  {
    title: "git submodule update",
    content: "Clones the submodule (if needed) and checks out the commit recorded in the superproject's gitlink. By default, this detaches HEAD. Add --remote to fetch the latest from the tracked branch instead.",
  },
  {
    title: "git submodule sync",
    content: "Re-copies URLs from .gitmodules to .git/config and updates the submodule's remote. Use this after someone changes a submodule URL in .gitmodules — your local .git/config won't update automatically.",
  },
  {
    title: "git submodule absorbgitdirs",
    content: "Moves .git/ directories from inside submodule working directories into .git/modules/. Replaces them with .git files pointing to the new location. Git 2.12+ does this automatically on add.",
  },
  {
    title: "git submodule deinit <path>",
    content: "Removes the submodule entry from .git/config and clears the working directory. Does NOT remove it from .gitmodules or the Git tree — the submodule is 'deactivated' but still declared.",
  },
  {
    title: "git rm <path> + manual cleanup",
    content: "Removes the gitlink from the index, deletes the path from .gitmodules, and stages both changes. For a full removal, also delete .git/modules/<name>/ manually — Git doesn't clean that up.",
  },
];

export function LifecycleSection() {
  return (
    <section id="s-lifecycle" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={P}>SUBMODULE LIFECYCLE</SectionLabel>
        <SectionHeading sub="The seven commands that take a submodule from first addition to complete removal. Each step modifies different parts of the three-component system.">
          From Add to Remove
        </SectionHeading>
      </Reveal>

      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {STEPS.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.08}>
            <WorkflowStep n={i + 1} total={STEPS.length} title={step.title} color={P} delay={0}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
                {step.content}
              </span>
            </WorkflowStep>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.6}>
        <div style={{ maxWidth: 680, margin: "24px auto 0" }}>
          <CalloutBox color={C.accent} label="THE CLONE SHORTCUT" icon="⚡">
            <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.accent }}>git clone --recurse-submodules</code> combines clone + init + update in one step. It's equivalent to cloning, then running <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.accent }}>git submodule update --init --recursive</code>. For CI pipelines, always use this flag — or your build will fail with empty submodule directories.
          </CalloutBox>
        </div>
      </Reveal>
    </section>
  );
}
