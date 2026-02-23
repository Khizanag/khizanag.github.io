import { C, PresentationHero } from "../../src/shared.jsx";
import { P } from "./ui.jsx";

export function HeroSection() {
  return (
    <PresentationHero
      accentColor={P}
      badge="GITHUB INTERNALS · 2026"
      title="GitHub's Hidden"
      gradientLine="Superpower"
      subtitle="One directory. Fourteen recognized files. Templates, automation, policies, ownership — everything GitHub needs to run your project exactly the way you intend."
      stats={[
        { value: "14+", label: "Recognized Files & Dirs", color: P },
        { value: "5",   label: "File Categories",         color: C.blue },
        { value: "3",   label: "Lookup Paths",            color: C.accent },
      ]}
    />
  );
}
