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
                { value: "24h", label: "Median Review Time", color: C.accent },
                { value: "36%", label: "First-Submit Rejection Rate", color: C.red },
                { value: "$99", label: "Per Year to Play", color: C.yellow },
            ]}
        />
    );
}
