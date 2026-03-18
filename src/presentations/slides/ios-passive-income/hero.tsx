import { C, PresentationHero } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function HeroSection() {
  return (
    <PresentationHero
      accentColor={P}
      titleMaxWidth={880}
      badge="INDIE iOS · PASSIVE INCOME · 2026"
      title="20 iOS Apps"
      gradientLine="That Print Money"
      subtitle="Research-backed app ideas ranked by passive income potential. Each one analyzed for market gap, monetization strategy, tech stack, and realistic revenue — ready to build one by one."
      stats={[
        { value: "20",    label: "App Ideas",         color: P },
        { value: "$89B",  label: "App Store Revenue", color: C.blue },
        { value: "+47%",  label: "AI Apps Growth",    color: C.purple },
        { value: "$25K",  label: "Target MRR",        color: C.yellow },
      ]}
    />
  );
}
