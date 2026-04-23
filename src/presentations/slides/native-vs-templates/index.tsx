import {
    C, FONTS, KEYFRAMES,
    useScrolled, useKeyboardNav,
    AnimatedGrid, AmbientBlobs,
    PresentationNav, ThankYouSection, PresentationFooter,
} from "../../shared.tsx";
import { P, PDim } from "./ui.tsx";
import { HeroSection } from "./hero.tsx";
import { AgendaSection } from "./agenda.tsx";
import { ContextSection } from "./context.tsx";
import { TwoPathsSection } from "./twoPaths.tsx";
import { NativeSwiftSection } from "./nativeSwift.tsx";
import { NativeKotlinSection } from "./nativeKotlin.tsx";
import { TemplatesIntroSection } from "./templatesIntro.tsx";
import { TemplatesExamplesSection } from "./templatesExamples.tsx";
import { CrossPlatformSection } from "./crossPlatform.tsx";
import { SetupComparisonSection } from "./setupComparison.tsx";
import { FeatureMatrixSection } from "./featureMatrix.tsx";
import { NativeLimitationsSection } from "./nativeLimitations.tsx";
import { TemplateLimitationsSection } from "./templateLimitations.tsx";
import { CommunitySection } from "./community.tsx";
import { McpIntegrationSection } from "./mcpIntegration.tsx";
import { MigrationSection } from "./migration.tsx";
import { FutureSignalsSection } from "./futureSignals.tsx";
import { SummarySection } from "./summary.tsx";
import { RecommendationSection } from "./recommendation.tsx";

const SECTION_IDS = [
    "s-hero", "s-agenda",
    "s-context", "s-two-paths",
    "s-native-swift", "s-native-kotlin",
    "s-templates-intro", "s-templates-examples", "s-cross-platform",
    "s-setup", "s-features",
    "s-native-limits", "s-template-limits", "s-community",
    "s-mcp", "s-migration", "s-future",
    "s-summary", "s-recommendation",
    "s-thankyou",
];

const NAV_LOGO = (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 7h4l2-3.5L10 10.5l2-3.5" stroke={P} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const FOOTER_LOGO = (
    <div style={{
        width: 22, height: 22, borderRadius: 6, background: PDim, border: `1px solid ${P}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
    }}>
        <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h4l2-3.5L10 10.5l2-3.5" stroke={P} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
);

export default function NativeVsTemplatesPresentation() {
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
                    title="Native vs Templates"
                    links={[
                        { label: "Agenda",       id: "s-agenda" },
                        { label: "Two Paths",    id: "s-two-paths" },
                        { label: "Native Swift",  id: "s-native-swift" },
                        { label: "Native Kotlin", id: "s-native-kotlin" },
                        { label: "Templates",    id: "s-templates-intro" },
                        { label: "Cross-Platform", id: "s-cross-platform" },
                        { label: "Setup",        id: "s-setup" },
                        { label: "Features",     id: "s-features" },
                        { label: "Community",    id: "s-community" },
                        { label: "MCP",          id: "s-mcp" },
                        { label: "Future",       id: "s-future" },
                        { label: "Verdict",      id: "s-recommendation" },
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

                    <AgendaSection />

                    {/* Part 1: Context */}
                    <ContextSection />
                    <TwoPathsSection />

                    {/* Part 2: Native Deep Dive */}
                    <NativeSwiftSection />
                    <NativeKotlinSection />

                    {/* Part 3: Templates Deep Dive */}
                    <TemplatesIntroSection />
                    <TemplatesExamplesSection />
                    <CrossPlatformSection />

                    {/* Part 4: Head-to-Head */}
                    <SetupComparisonSection />
                    <FeatureMatrixSection />
                    <NativeLimitationsSection />
                    <TemplateLimitationsSection />
                    <CommunitySection />

                    {/* Part 5: Strategy & Future */}
                    <McpIntegrationSection />
                    <MigrationSection />
                    <FutureSignalsSection />
                    <SummarySection />
                    <RecommendationSection />

                    <ThankYouSection id="s-thankyou" label="APRIL 2026" color={P} colorDim={PDim} />

                    <PresentationFooter
                        logo={FOOTER_LOGO}
                        name="Code Connect: Native vs Templates &middot; S.I.N.S. Design System"
                        links={[
                            { label: "Code Connect GitHub", href: "https://github.com/figma/code-connect" },
                            { label: "NPM Package", href: "https://www.npmjs.com/package/@figma/code-connect" },
                            { label: "Figma Dev Mode", href: "https://help.figma.com/hc/en-us/articles/15023124644247" },
                        ]}
                        date="Apr 2026"
                    />
                </div>
            </div>
        </>
    );
}
