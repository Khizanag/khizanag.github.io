import {
    C, FONTS, KEYFRAMES,
    useScrolled, useKeyboardNav,
    AnimatedGrid, AmbientBlobs,
    PresentationNav, ThankYouSection, PresentationFooter,
} from "../../shared.tsx";
import { P, PDim } from "./ui.tsx";
import { HeroSection } from "./hero.tsx";
import { HookQuizSection } from "./hookQuiz.tsx";
import { AgendaSection } from "./agenda.tsx";
import { HistorySection } from "./history.tsx";
import { JourneySection } from "./journey.tsx";
import { EcosystemSection } from "./ecosystem.tsx";
import { CodeSigningSection } from "./codeSigning.tsx";
import { CodeSigningMechanicsSection } from "./codeSigningMechanics.tsx";
import { ProvisioningDeepSection } from "./provisioningDeep.tsx";
import { EntitlementsMatrixSection } from "./entitlementsMatrix.tsx";
import { BinaryInternalsSection } from "./binaryInternals.tsx";
import { MultiEnvironmentSection } from "./multiEnvironment.tsx";
import { PushNotificationsSection } from "./pushNotifications.tsx";
import { ChannelsSection } from "./channels.tsx";
import { EnterpriseMdmSection } from "./enterpriseMdm.tsx";
import { DmaEuropeSection } from "./dmaEurope.tsx";
import { TestflightSection } from "./testflight.tsx";
import { MetadataAndAsoSection } from "./metadataAndAso.tsx";
import { ReviewProcessSection } from "./reviewProcess.tsx";
import { InsideReviewRoomSection } from "./insideReviewRoom.tsx";
import { GuidelinesSection } from "./guidelines.tsx";
import { StoreKitPaymentsSection } from "./storeKitPayments.tsx";
import { TopRejectionsSection } from "./topRejections.tsx";
import { ErrorDecoderSection } from "./errorDecoder.tsx";
import { CrashMonitoringSection } from "./crashMonitoring.tsx";
import { WarStoryHeySection } from "./warStoryHey.tsx";
import { WarStoryEpicSection } from "./warStoryEpic.tsx";
import { WarStoryBeeperSection } from "./warStoryBeeper.tsx";
import { WarStoriesMoreSection } from "./warStoriesMore.tsx";
import { WarStorySpaceIntSection } from "./warStorySpaceInt.tsx";
import { ReviewGameSection } from "./reviewGame.tsx";
import { PrivacySection } from "./privacy.tsx";
import { PhasedReleaseSection } from "./phasedRelease.tsx";
import { ExpeditedReviewSection } from "./expeditedReview.tsx";
import { FeatureFlagsSection } from "./featureFlags.tsx";
import { CICDSection } from "./cicd.tsx";
import { ModularizationSection } from "./modularization.tsx";
import { BuildOptimizationSection } from "./buildOptimization.tsx";
import { ComparisonSection } from "./comparison.tsx";
import { FutureSection } from "./future.tsx";
import { TakeawaysSection } from "./takeaways.tsx";

const SECTION_IDS = [
    "s-hero", "s-hook", "s-agenda", "s-history", "s-journey", "s-ecosystem",
    "s-signing", "s-signing-deep", "s-provisioning", "s-entitlements", "s-binary",
    "s-multienv", "s-push",
    "s-channels", "s-enterprise", "s-dma",
    "s-testflight", "s-metadata",
    "s-review", "s-inside-review",
    "s-guidelines", "s-storekit",
    "s-rejections", "s-errors",
    "s-war-hey", "s-war-epic", "s-war-beeper", "s-war-more", "s-war-us",
    "s-game", "s-privacy",
    "s-phased", "s-expedited", "s-flags",
    "s-cicd", "s-modular", "s-buildopt", "s-crashes",
    "s-compare", "s-future", "s-takeaways",
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
                    <HookQuizSection />

                    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
                        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.border}, transparent)` }} />
                    </div>

                    <AgendaSection />
                    <HistorySection />
                    <JourneySection />
                    <EcosystemSection />
                    <CodeSigningSection />
                    <CodeSigningMechanicsSection />
                    <ProvisioningDeepSection />
                    <EntitlementsMatrixSection />
                    <BinaryInternalsSection />
                    <MultiEnvironmentSection />
                    <PushNotificationsSection />
                    <ChannelsSection />
                    <EnterpriseMdmSection />
                    <DmaEuropeSection />
                    <TestflightSection />
                    <MetadataAndAsoSection />
                    <ReviewProcessSection />
                    <InsideReviewRoomSection />
                    <GuidelinesSection />
                    <StoreKitPaymentsSection />
                    <TopRejectionsSection />
                    <ErrorDecoderSection />
                    <WarStoryHeySection />
                    <WarStoryEpicSection />
                    <WarStoryBeeperSection />
                    <WarStoriesMoreSection />
                    <WarStorySpaceIntSection />
                    <ReviewGameSection />
                    <PrivacySection />
                    <PhasedReleaseSection />
                    <ExpeditedReviewSection />
                    <FeatureFlagsSection />
                    <CICDSection />
                    <ModularizationSection />
                    <BuildOptimizationSection />
                    <CrashMonitoringSection />
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
