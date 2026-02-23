import { C, PresentationHero } from "../../src/shared.jsx";
import { P } from "./ui.jsx";

export function HeroSection() {
  return (
    <PresentationHero
      accentColor={P}
      titleMaxWidth={820}
      badge="ARCHITECTURE PROPOSAL · 2026"
      title="GitHub Cross-Team"
      gradientLine="Access & Review"
      subtitle="Decoupling write access from review authority — so every team retains ownership without blocking cross-team collaboration."
      stats={[
        { value: "50+", label: "iOS Developers",     color: P },
        { value: "N+",  label: "Product Repos",      color: C.blue },
        { value: "0",   label: "Access Bottlenecks", color: C.accent },
      ]}
    />
  );
}
