import {
    C, FONTS, KEYFRAMES,
    useScrolled, useKeyboardNav,
    AnimatedGrid, AmbientBlobs,
    PresentationNav, ThankYouSection, PresentationFooter,
} from "../../shared.tsx";
import { P, PDim } from "./ui.tsx";
import { HeroSection } from "./hero.tsx";
import { ProblemSection } from "./problem.tsx";
import { WhatIsSection } from "./whatIs.tsx";
import { CodeConnectTeaserSection } from "./codeConnectTeaser.tsx";
import { UserFlowSection } from "./userFlow.tsx";
import { PillarsSection } from "./pillars.tsx";
import { ArchitectureSection } from "./architecture.tsx";
import { WhatIsMcpSection } from "./whatIsMcp.tsx";
import { McpSection } from "./mcp.tsx";
import { CodeConnectFlowSection } from "./codeConnectFlow.tsx";
import { CodeConnectSection } from "./codeConnect.tsx";
import { WhyTypescriptSection } from "./whyTypescript.tsx";
import { PrimitivesSection } from "./primitives.tsx";
import { InstructionsSection } from "./instructions.tsx";
import { SetupSection } from "./setup.tsx";
import { ConsumerSection } from "./consumer.tsx";
import { FlagshipSection } from "./flagship.tsx";
import { PhasesSection } from "./phases.tsx";
import { AgentsSection } from "./agents.tsx";
import { CachingSection } from "./caching.tsx";
import { GatesSection } from "./gates.tsx";
import { ExampleSection } from "./example.tsx";
import { DoDontSection } from "./doDont.tsx";
import { ProsConsSection } from "./prosCons.tsx";
import { GettingStartedSection } from "./gettingStarted.tsx";
import { WhatsNextSection } from "./whatsNext.tsx";

const SECTION_IDS = [
    "s-hero",
    "s-problem",
    "s-what-is",
    "s-cc-teaser",
    "s-user-flow",
    "s-pillars",
    "s-architecture",
    "s-what-is-mcp",
    "s-mcp",
    "s-cc-flow",
    "s-primitives",
    "s-instructions",
    "s-setup",
    "s-consumer",
    "s-flagship",
    "s-phases",
    "s-agents",
    "s-caching",
    "s-gates",
    "s-example",
    "s-code-connect",
    "s-why-ts",
    "s-do-dont",
    "s-pros-cons",
    "s-getting-started",
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
                        { label: "Why",         id: "s-problem" },
                        { label: "What",        id: "s-what-is" },
                        { label: "User Flow",   id: "s-user-flow" },
                        { label: "Pillars",     id: "s-pillars" },
                        { label: "MCP",         id: "s-what-is-mcp" },
                        { label: "Code Connect",id: "s-cc-flow" },
                        { label: "Flagship",    id: "s-flagship" },
                        { label: "Pipeline",    id: "s-phases" },
                        { label: "Do / Don't",  id: "s-do-dont" },
                        { label: "Start",       id: "s-getting-started" },
                    ]}
                    badge="iOS Chapter · Apr 2026"
                    color={P}
                    colorDim={PDim}
                />

                <HeroSection />
                <ProblemSection />
                <WhatIsSection />
                <CodeConnectTeaserSection />
                <UserFlowSection />
                <PillarsSection />
                <ArchitectureSection />
                <WhatIsMcpSection />
                <McpSection />
                <CodeConnectFlowSection />
                <PrimitivesSection />
                <InstructionsSection />
                <SetupSection />
                <ConsumerSection />
                <FlagshipSection />
                <PhasesSection />
                <AgentsSection />
                <CachingSection />
                <GatesSection />
                <ExampleSection />
                <CodeConnectSection />
                <WhyTypescriptSection />
                <DoDontSection />
                <ProsConsSection />
                <GettingStartedSection />
                <WhatsNextSection />

                <ThankYouSection id="s-thankyou" label="APRIL 2026" color={P} colorDim={PDim} />

                <PresentationFooter
                    logo={FOOTER_LOGO}
                    name="/figma-to-screen · iOS AI Infrastructure"
                    links={[
                        { label: "AGENTS.md" },
                        { label: "figma-to-screen.prompt.md" },
                        { label: "docs/ai-infra/" },
                    ]}
                    date="iOS Chapter · April 2026"
                />
            </div>
        </>
    );
}
