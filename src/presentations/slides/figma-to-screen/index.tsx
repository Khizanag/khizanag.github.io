import {
    C, FONTS, KEYFRAMES,
    useScrolled, useKeyboardNav,
    AnimatedGrid, AmbientBlobs,
    PresentationNav, ThankYouSection, PresentationFooter,
} from "../../shared.tsx";
import { P, PDim } from "./ui.tsx";
import { HeroSection } from "./hero.tsx";
import { ProblemSection } from "./problem.tsx";
import { MentalModelsSection } from "./mentalModels.tsx";
import { OverviewSection } from "./overview.tsx";
import { DeepDiveSection } from "./deepDive.tsx";
import { RoadmapSection } from "./roadmap.tsx";
import { GatesSection } from "./gates.tsx";
import { ResultsSection } from "./results.tsx";
import { WhatsNextSection } from "./whatsNext.tsx";

const SECTION_IDS = [
    "s-hero",
    "s-problem",
    "s-mental-models",
    "s-overview",
    "s-deep-dive",
    "s-roadmap",
    "s-gates",
    "s-results",
    "s-whats-next",
    "s-thankyou",
];

const NAV_LOGO = (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1L12.5 4V10L7 13L1.5 10V4L7 1Z" stroke={P} strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M7 7L7 13" stroke={P} strokeWidth="1.3" strokeLinecap="round" />
        <path d="M1.5 4L7 7L12.5 4" stroke={P} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const FOOTER_LOGO = (
    <div style={{
        width: 22, height: 22, borderRadius: 6, background: PDim, border: `1px solid ${P}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
    }}>
        <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
            <path d="M7 1L12.5 4V10L7 13L1.5 10V4L7 1Z" stroke={P} strokeWidth="1.3" strokeLinejoin="round" />
            <path d="M7 7L7 13" stroke={P} strokeWidth="1.3" strokeLinecap="round" />
            <path d="M1.5 4L7 7L12.5 4" stroke={P} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
);

export default function FigmaToScreenPresentation() {
    const scrolled = useScrolled(60);
    useKeyboardNav(SECTION_IDS);

    return (
        <>
            <style>{FONTS}{KEYFRAMES}</style>
            <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'DM Sans', sans-serif" }}>

                <AnimatedGrid />
                <AmbientBlobs />

                <PresentationNav
                    scrolled={scrolled}
                    logo={NAV_LOGO}
                    title="/figma-to-screen"
                    links={[
                        { label: "Problem",       id: "s-problem" },
                        { label: "Mental Models", id: "s-mental-models" },
                        { label: "Overview",      id: "s-overview" },
                        { label: "Deep Dive",     id: "s-deep-dive" },
                        { label: "Roadmap",       id: "s-roadmap" },
                        { label: "Gates",         id: "s-gates" },
                        { label: "Results",       id: "s-results" },
                        { label: "What's Next",   id: "s-whats-next" },
                    ]}
                    badge="iOS Chapter"
                    color={P}
                    colorDim={PDim}
                />

                <div style={{ position: "relative", zIndex: 1 }}>
                    <HeroSection />

                    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
                        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.border}, transparent)` }} />
                    </div>

                    <ProblemSection />
                    <MentalModelsSection />
                    <OverviewSection />
                    <DeepDiveSection />
                    <RoadmapSection />
                    <GatesSection />
                    <ResultsSection />
                    <WhatsNextSection />

                    <ThankYouSection id="s-thankyou" label="APRIL 2026" color={P} colorDim={PDim} />

                    <PresentationFooter
                        logo={FOOTER_LOGO}
                        name="/figma-to-screen &middot; AI-orchestrated screen scaffolding"
                        links={[
                            { label: "Phases" },
                            { label: "Roadmap" },
                            { label: "Gates" },
                        ]}
                        date="iOS Chapter &middot; 2026"
                    />
                </div>
            </div>
        </>
    );
}
