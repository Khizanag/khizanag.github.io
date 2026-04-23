import {
    C, FONTS, KEYFRAMES,
    useScrolled, useKeyboardNav,
    AnimatedGrid, AmbientBlobs,
    PresentationNav, ThankYouSection, PresentationFooter,
} from "../../shared.tsx";
import { P, PDim, ActDivider } from "./ui.tsx";
import { HeroSection } from "./hero.tsx";
import { HookQuizSection } from "./hookQuiz.tsx";
import { HookQuizAnswersSection } from "./hookQuizAnswers.tsx";
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
import { PushOperationalSection } from "./pushOperational.tsx";
import { UniversalLinksSection } from "./universalLinks.tsx";
import { AppAttestSection } from "./appAttest.tsx";
import { AtsSection } from "./ats.tsx";
import { ChannelsSection } from "./channels.tsx";
import { EnterpriseMdmSection } from "./enterpriseMdm.tsx";
import { DmaEuropeSection } from "./dmaEurope.tsx";
import { TestflightSection } from "./testflight.tsx";
import { MetadataAndAsoSection } from "./metadataAndAso.tsx";
import { AscRolesSection } from "./ascRoles.tsx";
import { RegionRatingSection } from "./regionRating.tsx";
import { ReviewProcessSection } from "./reviewProcess.tsx";
import { InsideReviewRoomSection } from "./insideReviewRoom.tsx";
import { GuidelinesSection } from "./guidelines.tsx";
import { StoreKitPaymentsSection } from "./storeKitPayments.tsx";
import { PriceTiersSection } from "./priceTiers.tsx";
import { TopRejectionsSection } from "./topRejections.tsx";
import { ErrorDecoderSection } from "./errorDecoder.tsx";
import { WhenReviewGoesWrongSection } from "./whenReviewGoesWrong.tsx";
import { CrashMonitoringSection } from "./crashMonitoring.tsx";
import { WarStoryHeySection } from "./warStoryHey.tsx";
import { WarStoryEpicSection } from "./warStoryEpic.tsx";
import { WarStoryBeeperSection } from "./warStoryBeeper.tsx";
import { WarStoriesMoreSection } from "./warStoriesMore.tsx";
import { WarStorySpaceIntSection } from "./warStorySpaceInt.tsx";
import { ReviewGameSection } from "./reviewGame.tsx";
import { PrivacySection } from "./privacy.tsx";
import { PrivacyDeepSection } from "./privacyDeep.tsx";
import { PhasedReleaseSection } from "./phasedRelease.tsx";
import { ExpeditedReviewSection } from "./expeditedReview.tsx";
import { FeatureFlagsSection } from "./featureFlags.tsx";
import { CICDSection } from "./cicd.tsx";
import { SigningAutomationSection } from "./signingAutomation.tsx";
import { ModularizationSection } from "./modularization.tsx";
import { BuildOptimizationSection } from "./buildOptimization.tsx";
import { ComparisonSection } from "./comparison.tsx";
import { FutureSection } from "./future.tsx";
import { ShipDayChecklistSection } from "./shipDayChecklist.tsx";
import { TakeawaysSection } from "./takeaways.tsx";

// Chapter structure (v3 — TOP TECH TALK narrative pass):
//   00 Opening · 01 Plumbing · 02 Declarations · 03 Distribution
//   04 Gauntlet · 05 War Stories · 06 Release · 07 Eng-Ops · 08 Close
//
// v3 moves from v2:
//   · BinaryInternals:  Eng-Ops  → Plumbing (binary anatomy is pre-upload)
//   · Privacy cluster:  Release  → Declarations (build-time declarations)
//   · ATS/UL/AppAttest: Plumbing → Declarations
//   · PushOperational:  Plumbing → Eng-Ops (token rotation is ops, not entitlement)
//   · StoreKit/PriceTiers: Commerce → Gauntlet (3.1.1 IS the top rejection)
//   · AscRoles/RegionRating: Distribution → Eng-Ops (admin, not channels)
//   · WarStories:       pos 6    → pos 5 (stories while audience fresh)
const SECTION_IDS = [
    // 00 Opening
    "s-hero", "s-hook", "s-agenda", "s-history",
    // 01 Plumbing
    "s-div-01",
    "s-journey", "s-ecosystem",
    "s-signing", "s-signing-deep", "s-provisioning", "s-entitlements",
    "s-push", "s-binary",
    // 02 Declarations
    "s-div-02",
    "s-privacy", "s-privacy-deep", "s-ats",
    "s-universal-links", "s-app-attest",
    // 03 Distribution
    "s-div-03",
    "s-channels", "s-enterprise", "s-dma",
    "s-testflight", "s-metadata",
    // 04 Gauntlet
    "s-div-04",
    "s-review", "s-inside-review", "s-guidelines",
    "s-rejections", "s-game", "s-review-wrong", "s-errors",
    "s-storekit", "s-price-tiers",
    // 05 War Stories
    "s-div-05",
    "s-war-hey", "s-war-epic", "s-war-beeper", "s-war-more", "s-war-us",
    // 06 Release
    "s-div-06",
    "s-phased", "s-expedited", "s-flags",
    // 07 Engineering Ops
    "s-div-07",
    "s-cicd", "s-signing-automation", "s-modular", "s-buildopt",
    "s-multienv", "s-push-ops", "s-crashes",
    "s-asc-roles", "s-region-rating",
    // 08 Close
    "s-div-08",
    "s-hook-answers", "s-compare", "s-future", "s-shipday", "s-takeaways",
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
                        { label: "Plumbing",   id: "s-div-01" },
                        { label: "Declare",    id: "s-div-02" },
                        { label: "Distribute", id: "s-div-03" },
                        { label: "Review",     id: "s-div-04" },
                        { label: "Stories",    id: "s-div-05" },
                        { label: "Release",    id: "s-div-06" },
                        { label: "Ops",        id: "s-div-07" },
                        { label: "Close",      id: "s-div-08" },
                    ]}
                    badge="iOS Chapter · Tech Talk"
                    color={P}
                    colorDim={PDim}
                />

                <div style={{ position: "relative", zIndex: 1 }}>
                    {/* ─── 00 OPENING ───────────────────────────────────── */}
                    <HeroSection />
                    <HookQuizSection />

                    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
                        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.border}, transparent)` }} />
                    </div>

                    <AgendaSection />
                    <HistorySection />

                    {/* ─── 01 PLUMBING ──────────────────────────────────── */}
                    <ActDivider
                        id="s-div-01"
                        act="ACT 01"
                        title="THE PLUMBING"
                        subtitle="What Apple validates before your build is even accepted — identity, provisioning, entitlements, binary anatomy. The machinery nobody draws for you."
                        timing="12 min · 8 slides"
                        color={C.purple}
                    />
                    <JourneySection />
                    <EcosystemSection />
                    <CodeSigningSection />
                    <CodeSigningMechanicsSection />
                    <ProvisioningDeepSection />
                    <EntitlementsMatrixSection />
                    <PushNotificationsSection />
                    <BinaryInternalsSection />

                    {/* ─── 02 DECLARATIONS ──────────────────────────────── */}
                    <ActDivider
                        id="s-div-02"
                        act="ACT 02"
                        title="WHAT YOU DECLARE"
                        subtitle="Build-time declarations. Each one is a file Apple reads at submission and the wrong value = rejection. Privacy manifests, network policy, domain claims, device attestation."
                        timing="7 min · 5 slides"
                        color={C.blue}
                    />
                    <PrivacySection />
                    <PrivacyDeepSection />
                    <AtsSection />
                    <UniversalLinksSection />
                    <AppAttestSection />

                    {/* ─── 03 DISTRIBUTION ──────────────────────────────── */}
                    <ActDivider
                        id="s-div-03"
                        act="ACT 03"
                        title="GETTING IT OUT"
                        subtitle="Every path from CI to user: App Store, TestFlight, Ad Hoc, Enterprise, Unlisted, Marketplace — plus how the DMA redrew the EU map in 2024."
                        timing="7 min · 5 slides"
                        color={C.yellow}
                    />
                    <ChannelsSection />
                    <EnterpriseMdmSection />
                    <DmaEuropeSection />
                    <TestflightSection />
                    <MetadataAndAsoSection />

                    {/* ─── 04 GAUNTLET ──────────────────────────────────── */}
                    <ActDivider
                        id="s-div-04"
                        act="ACT 04"
                        title="THE GAUNTLET"
                        subtitle="App Store Review from both sides of the glass — and the commerce rules that produce the #1 rejection reason. 9 slides of what Apple actually says no to."
                        timing="13 min · 9 slides"
                        color={C.red}
                    />
                    <ReviewProcessSection />
                    <InsideReviewRoomSection />
                    <GuidelinesSection />
                    <TopRejectionsSection />
                    <ReviewGameSection />
                    <WhenReviewGoesWrongSection />
                    <ErrorDecoderSection />
                    <StoreKitPaymentsSection />
                    <PriceTiersSection />

                    {/* ─── 05 WAR STORIES ──────────────────────────────── */}
                    <ActDivider
                        id="s-div-05"
                        act="ACT 05"
                        title="WAR STORIES"
                        subtitle="HEY. Epic. Beeper. XcodeGhost. SpaceInt's own near-misses. Five case studies where the system bit back — and what we learned."
                        timing="10 min · 5 slides"
                        color={C.purple}
                    />
                    <WarStoryHeySection />
                    <WarStoryEpicSection />
                    <WarStoryBeeperSection />
                    <WarStoriesMoreSection />
                    <WarStorySpaceIntSection />

                    {/* ─── 06 RELEASE ──────────────────────────────────── */}
                    <ActDivider
                        id="s-div-06"
                        act="ACT 06"
                        title="RELEASE LEVERS"
                        subtitle="Approved — now what? Phased rollout, expedited review, feature flags. The three knobs between 'submitted' and 'un-breaking production without a resubmit'."
                        timing="5 min · 3 slides"
                        color={C.accent}
                    />
                    <PhasedReleaseSection />
                    <ExpeditedReviewSection />
                    <FeatureFlagsSection />

                    {/* ─── 07 ENGINEERING OPS ──────────────────────────── */}
                    <ActDivider
                        id="s-div-07"
                        act="ACT 07"
                        title="SHIPPING AT SCALE"
                        subtitle="The SpaceInt Bitrise pipeline in practice: CI/CD, signing, modularization, build caching, push ops, crash monitoring — plus the ASC team + regions admin."
                        timing="9 min · 9 slides"
                        color={C.yellow}
                    />
                    <CICDSection />
                    <SigningAutomationSection />
                    <ModularizationSection />
                    <BuildOptimizationSection />
                    <MultiEnvironmentSection />
                    <PushOperationalSection />
                    <CrashMonitoringSection />
                    <AscRolesSection />
                    <RegionRatingSection />

                    {/* ─── 08 CLOSE ────────────────────────────────────── */}
                    <ActDivider
                        id="s-div-08"
                        act="ACT 08"
                        title="WRAPPING UP"
                        subtitle="Callback to the opening quiz. Cross-platform comparison. Where Apple is heading. The ship-day checklist you screenshot. Q&A."
                        timing="6 min · 5 slides + Q&A"
                        color={C.accent}
                    />
                    <HookQuizAnswersSection />
                    <ComparisonSection />
                    <FutureSection />
                    <ShipDayChecklistSection />
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
