import { C, PresentationHero } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function HeroSection() {
    return (
        <PresentationHero
            accentColor={P}
            titleMaxWidth={900}
            badge="iOS CHAPTER · TECH TALK · APRIL 2026"
            title="From git push"
            gradientLine="to App Store"
            subtitle="A 75-minute deep dive into how an iOS app actually reaches users — code signing, TestFlight, App Store Review, Apple's guidelines, real rejection war stories, and what it all means for engineers, QA, PM, and BA."
            stats={[
                { value: "1.8M", label: "Apps on the App Store", color: P },
                { value: "<24h", label: "Median Review (~50% of apps)", color: C.accent },
                { value: "~1 in 3", label: "First Submissions Rejected", color: C.red },
                { value: "$99 / $299", label: "Individual / Enterprise Tier", color: C.yellow },
            ]}
        />
    );
}
