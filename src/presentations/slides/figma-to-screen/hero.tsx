import { C, PresentationHero } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function HeroSection() {
    return (
        <PresentationHero
            accentColor={P}
            titleMaxWidth={880}
            badge="AI INFRASTRUCTURE &middot; APR 2026"
            title="/figma-to-screen"
            gradientLine="From Figma URL to clean-architecture SwiftUI"
            subtitle={<>A <strong style={{ color: P }}>17-agent pipeline</strong> that reads a Figma design and writes a pixel-perfect View, ViewModel, Router, Factory, DI, and navigator patch — with 7 tiered verification gates and a shared context artifact as the only source of truth.</>}
            stats={[
                { value: "8",   label: "Pipeline Phases",      color: P },
                { value: "17",  label: "Specialized Agents",    color: C.blue },
                { value: "7",   label: "Verification Gates",    color: C.yellow },
                { value: "10",  label: "Roadmap Items Shipped", color: C.purple },
            ]}
        />
    );
}
