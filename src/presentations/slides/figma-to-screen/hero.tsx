import { C, PresentationHero } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function HeroSection() {
    return (
        <PresentationHero
            accentColor={P}
            titleMaxWidth={900}
            badge="AI INFRASTRUCTURE · APR 2026"
            title="/figma-to-screen"
            gradientLine="From Figma URL to clean-architecture SwiftUI"
            subtitle={<>A <strong style={{ color: P }}>3-pillar stack</strong> — Figma Code Connect, consumer slash commands, and a <strong style={{ color: P }}>17-agent orchestrator</strong> — that turns a design URL into a pixel-perfect View, a wired ViewModel, a patched Destination, and a committed SHA.</>}
            stats={[
                { value: "17",  label: "Specialized Agents",   color: P },
                { value: "116", label: "Code Connect Maps",    color: C.purple },
                { value: "8",   label: "Pipeline Phases",      color: C.blue },
                { value: "7",   label: "Verification Gates",   color: C.yellow },
            ]}
        />
    );
}
