import { C, PresentationHero } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function HeroSection() {
  return (
    <PresentationHero
      accentColor={P}
      titleMaxWidth={820}
      badge="CODE CONNECT &middot; APR 2026"
      title="Figma Code Connect"
      gradientLine="Bridging Design & Code"
      subtitle={<>How we connected <strong style={{ color: P }}>70 S.I.N.S. components</strong> in Figma with real Swift code — so designers see the exact API in Dev Mode, not guesswork.</>}
      stats={[
        { value: "70",  label: "Components Connected", color: P },
        { value: "249", label: "Total Connections",    color: C.blue },
        { value: "5",   label: "Variant Patterns",     color: C.yellow },
        { value: "0",   label: "Deprecated APIs",      color: C.accent },
      ]}
    />
  );
}
