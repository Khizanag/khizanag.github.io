import {
    C, FONTS, KEYFRAMES,
    useScrolled, useKeyboardNav,
    AnimatedGrid, AmbientBlobs,
    PresentationNav, ThankYouSection, PresentationFooter,
} from "../../shared.tsx";
import { P, PDim } from "./ui.tsx";
import { HeroSection } from "./hero.tsx";
import { AgendaSection } from "./agenda.tsx";
import { ProblemSection } from "./problem.tsx";
import { ValueSection } from "./value.tsx";
import { WhatIsCodeConnectSection } from "./whatIsCodeConnect.tsx";
import { FigmaMcpSection } from "./figmaMcp.tsx";
import { McpSetupSection } from "./mcpSetup.tsx";
import { HowItWorksSection } from "./howItWorks.tsx";
import { SetupSection } from "./setup.tsx";
import { PatternsSection } from "./patterns.tsx";
import { CoverageSection } from "./coverage.tsx";
import { BottlenecksSection } from "./bottlenecks.tsx";
import { WorkflowSection } from "./workflow.tsx";
import { DesignTokensSection } from "./designTokens.tsx";
import { ComponentApiSection } from "./componentApi.tsx";
import { NavigationDeepSection } from "./navigationDeep.tsx";
import { InstructionFilesSection } from "./instructionFiles.tsx";
import { AiWorkflowSection } from "./aiWorkflow.tsx";
import { TrustRulesSection } from "./trustRules.tsx";
import { ScreenArchitectureSection } from "./screenArchitecture.tsx";
import { RealExampleSection } from "./realExample.tsx";
import { PitfallsSection } from "./pitfalls.tsx";
import { GettingStartedSection } from "./gettingStarted.tsx";

const SECTION_IDS = [
    // Intro
    "s-hero", "s-agenda",
    // Part 1: Problem & Why
    "s-problem", "s-value",
    // Part 2: Figma MCP & Code Connect
    "s-what", "s-mcp", "s-mcp-setup",
    // Part 3: Our Integration
    "s-how", "s-setup", "s-patterns", "s-coverage", "s-bottlenecks", "s-workflow",
    // Part 4: Developer Toolkit
    "s-tokens", "s-components", "s-nav", "s-instructions",
    // Part 5: AI-Assisted Development
    "s-ai", "s-trust", "s-arch", "s-example", "s-pitfalls", "s-start",
    // Closing
    "s-thankyou",
];

const NAV_LOGO = (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="1" width="12" height="12" rx="2.5" stroke={P} strokeWidth="1.3" />
        <path d="M4.5 5L7 7.5L9.5 5" stroke={P} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 7.5V10.5" stroke={P} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
);

const FOOTER_LOGO = (
    <div style={{
        width: 22, height: 22, borderRadius: 6, background: PDim, border: `1px solid ${P}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
    }}>
        <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="1" width="12" height="12" rx="2.5" stroke={P} strokeWidth="1.3" />
            <path d="M4.5 5L7 7.5L9.5 5" stroke={P} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 7.5V10.5" stroke={P} strokeWidth="1.3" strokeLinecap="round" />
        </svg>
    </div>
);

export default function CodeConnectPresentation() {
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
                    title="Code Connect"
                    links={[
                        { label: "Agenda",        id: "s-agenda" },
                        { label: "Problem",       id: "s-problem" },
                        { label: "Code Connect",  id: "s-what" },
                        { label: "Figma MCP",     id: "s-mcp" },
                        { label: "How It Works",  id: "s-how" },
                        { label: "Patterns",      id: "s-patterns" },
                        { label: "Coverage",      id: "s-coverage" },
                        { label: "Tokens",        id: "s-tokens" },
                        { label: "Components",    id: "s-components" },
                        { label: "AI Flow",       id: "s-ai" },
                        { label: "Case Study",    id: "s-example" },
                        { label: "Get Started",   id: "s-start" },
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

                    {/* Part 1: The Problem & Why */}
                    <ProblemSection />
                    <ValueSection />

                    {/* Part 2: Figma MCP & Code Connect */}
                    <WhatIsCodeConnectSection />
                    <FigmaMcpSection />
                    <McpSetupSection />

                    {/* Part 3: Our S.I.N.S. Integration */}
                    <HowItWorksSection />
                    <SetupSection />
                    <PatternsSection />
                    <CoverageSection />
                    <BottlenecksSection />
                    <WorkflowSection />

                    {/* Part 4: The Developer Toolkit */}
                    <DesignTokensSection />
                    <ComponentApiSection />
                    <NavigationDeepSection />
                    <InstructionFilesSection />

                    {/* Part 5: AI-Assisted Development */}
                    <AiWorkflowSection />
                    <TrustRulesSection />
                    <ScreenArchitectureSection />
                    <RealExampleSection />
                    <PitfallsSection />
                    <GettingStartedSection />

                    <ThankYouSection id="s-thankyou" label="APRIL 2026" color={P} colorDim={PDim} />

                    <PresentationFooter
                        logo={FOOTER_LOGO}
                        name="Figma Code Connect &middot; S.I.N.S. Design System"
                        links={[
                            { label: "Code Connect GitHub", href: "https://github.com/figma/code-connect" },
                            { label: "NPM Package", href: "https://www.npmjs.com/package/@figma/code-connect" },
                            { label: "Figma Dev Mode Docs", href: "https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode" },
                            { label: "MCP Protocol", href: "https://modelcontextprotocol.io" },
                        ]}
                        date="Apr 2026"
                    />
                </div>
            </div>
        </>
    );
}
