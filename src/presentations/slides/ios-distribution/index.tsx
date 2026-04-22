import {
    C, FONTS, KEYFRAMES,
    useScrolled, useKeyboardNav,
    AnimatedGrid, AmbientBlobs,
    PresentationNav, ThankYouSection, PresentationFooter,
} from "../../shared.tsx";
import { P, PDim } from "./ui.tsx";
import { HeroSection } from "./hero.tsx";
import { AgendaSection } from "./agenda.tsx";
import { JourneySection } from "./journey.tsx";
import { EcosystemSection } from "./ecosystem.tsx";
import { CodeSigningSection } from "./codeSigning.tsx";
import { ChannelsSection } from "./channels.tsx";
import { TestflightSection } from "./testflight.tsx";
import { ReviewProcessSection } from "./reviewProcess.tsx";
import { GuidelinesSection } from "./guidelines.tsx";
import { TopRejectionsSection } from "./topRejections.tsx";
import { WarStoryHeySection } from "./warStoryHey.tsx";
import { WarStoryEpicSection } from "./warStoryEpic.tsx";
import { WarStoryBeeperSection } from "./warStoryBeeper.tsx";
import { WarStoriesMoreSection } from "./warStoriesMore.tsx";
import { WarStorySpaceIntSection } from "./warStorySpaceInt.tsx";
import { ReviewGameSection } from "./reviewGame.tsx";
import { PrivacySection } from "./privacy.tsx";
import { PhasedReleaseSection } from "./phasedRelease.tsx";
import { ExpeditedReviewSection } from "./expeditedReview.tsx";
import { CICDSection } from "./cicd.tsx";
import { ComparisonSection } from "./comparison.tsx";
import { FutureSection } from "./future.tsx";
import { TakeawaysSection } from "./takeaways.tsx";

const SECTION_IDS = [
    "s-hero", "s-agenda", "s-journey", "s-ecosystem", "s-signing", "s-channels",
    "s-testflight", "s-review", "s-guidelines", "s-rejections",
    "s-war-hey", "s-war-epic", "s-war-beeper", "s-war-more", "s-war-us",
    "s-game", "s-privacy", "s-phased", "s-expedited", "s-cicd", "s-compare", "s-future", "s-takeaways",
    "s-thankyou",
];

const NAV_LOGO = (
    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 13, color: P }}></span>
);

const FOOTER_LOGO = (
    <div style={{
        width: 22, height: 22, borderRadius: 6, background: PDim, border: `1px solid ${P}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 11, color: P,
    }}>
        
    </div>
);

export default function IOSDistributionPresentation() {
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
                    title="iOS Distribution · 75 min"
                    links={[
                        { label: "Journey",      id: "s-journey" },
                        { label: "Channels",     id: "s-channels" },
                        { label: "Review",       id: "s-review" },
                        { label: "Rejections",   id: "s-rejections" },
                        { label: "War Stories",  id: "s-war-hey" },
                        { label: "Game",         id: "s-game" },
                        { label: "Privacy",      id: "s-privacy" },
                        { label: "CI/CD",        id: "s-cicd" },
                        { label: "Future",       id: "s-future" },
                    ]}
                    badge="iOS Chapter · Tech Talk"
                    color={P}
                    colorDim={PDim}
                />

                <div style={{ position: "relative", zIndex: 1 }}>
                    <HeroSection />

                    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
                        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.border}, transparent)` }} />
                    </div>

                    <AgendaSection />
                    <JourneySection />
                    <EcosystemSection />
                    <CodeSigningSection />
                    <ChannelsSection />
                    <TestflightSection />
                    <ReviewProcessSection />
                    <GuidelinesSection />
                    <TopRejectionsSection />
                    <WarStoryHeySection />
                    <WarStoryEpicSection />
                    <WarStoryBeeperSection />
                    <WarStoriesMoreSection />
                    <WarStorySpaceIntSection />
                    <ReviewGameSection />
                    <PrivacySection />
                    <PhasedReleaseSection />
                    <ExpeditedReviewSection />
                    <CICDSection />
                    <ComparisonSection />
                    <FutureSection />
                    <TakeawaysSection />

                    <ThankYouSection id="s-thankyou" label="iOS CHAPTER · APRIL 2026" color={P} colorDim={PDim} />

                    <PresentationFooter
                        logo={FOOTER_LOGO}
                        name="iOS Distribution · SpaceInt Tech Talk"
                        links={[
                            { label: "App Review Guidelines" },
                            { label: "Privacy Manifest Docs" },
                            { label: "ASC Connect" },
                        ]}
                        date="iOS Chapter · Apr 2026"
                    />
                </div>
            </div>
        </>
    );
}
