import { C, PresentationHero } from "../../src/shared.jsx";
import { P } from "./ui.jsx";

export function HeroSection() {
  return (
    <PresentationHero
      accentColor={P}
      titleMaxWidth={820}
      badge="CI AS CODE · FEB 2026"
      title="Should CI Config"
      gradientLine="Live in Git?"
      subtitle={<>Should we move{" "}<code style={{ fontFamily: "'JetBrains Mono', monospace", color: P, background: `${P}15`, padding: "2px 7px", borderRadius: 4 }}>bitrise.yml</code>{" "}from Bitrise.io managed storage into the Git repository? A full analysis of trade-offs, risks, and a concrete recommendation.</>}
      stats={[
        { value: "50+", label: "iOS Developers Affected",   color: P },
        { value: "7",   label: "Security Risks Identified", color: C.red },
        { value: "1",   label: "Critical Threat",           color: C.red },
        { value: "4",   label: "Implementation Steps",      color: C.blue },
      ]}
    />
  );
}
