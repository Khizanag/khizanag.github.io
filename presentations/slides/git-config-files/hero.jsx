import { C, PresentationHero } from "../../src/shared.jsx";
import { P } from "./ui.jsx";

export function HeroSection() {
  return (
    <PresentationHero
      accentColor={P}
      badge="GIT INTERNALS · 2026"
      title="Git's Hidden"
      gradientLine="Configuration Layer"
      subtitle="How .gitconfig cascades settings across system, user, and repository levels — and how .gitmodules tracks every submodule your project depends on. Both files, from first principles."
      stats={[
        { value: "4+", label: "Config Levels",        color: P },
        { value: "28",  label: "Config Section Groups", color: C.accent },
        { value: "7",   label: "Lifecycle Steps",       color: C.purple },
      ]}
    />
  );
}
