import {
    C, FONTS, KEYFRAMES,
    useScrolled, useKeyboardNav,
    AnimatedGrid, AmbientBlobs,
    PresentationNav, ThankYouSection, PresentationFooter,
} from "../../shared.tsx";
import { P, PDim } from "./ui.tsx";
import { ChapterSection, type ChapterInfo } from "./chapter.tsx";
import { HeroSection } from "./hero.tsx";
import { ProblemSection } from "./problem.tsx";
import { WhatIsSection } from "./whatIs.tsx";
import { GlossarySection } from "./glossary.tsx";
import { CodeConnectTeaserSection } from "./codeConnectTeaser.tsx";
import { UserFlowSection } from "./userFlow.tsx";
import { PillarsSection } from "./pillars.tsx";
import { ArchitectureSection } from "./architecture.tsx";
import { McpSection } from "./mcp.tsx";
import { CodeConnectSection } from "./codeConnect.tsx";
import { WhyTypescriptSection } from "./whyTypescript.tsx";
import { PrimitivesSection } from "./primitives.tsx";
import { InstructionsSection } from "./instructions.tsx";
import { ConsumerSection } from "./consumer.tsx";
import { FlagshipSection } from "./flagship.tsx";
import { PhasesSection } from "./phases.tsx";
import { AgentsSection } from "./agents.tsx";
import { GovernanceSection } from "./governance.tsx";
import { CachingSection } from "./caching.tsx";
import { GatesSection } from "./gates.tsx";
import { FailuresSection } from "./failures.tsx";
import { ExampleSection } from "./example.tsx";
import { DayTwoSection } from "./dayTwo.tsx";
import { DoDontSection } from "./doDont.tsx";
import { ProsConsSection } from "./prosCons.tsx";
import { GettingStartedSection } from "./gettingStarted.tsx";
import { TelemetrySection } from "./telemetry.tsx";
import { WhatsNextSection } from "./whatsNext.tsx";

const CHAPTERS: ChapterInfo[] = [
    {
        n: 1, id: "s-ch-1", color: C.red,
        title: "The Problem",
        subtitle: "Why we built this in the first place — the cost of shipping a single new screen by hand.",
        slides: ["Screen scaffolding is expensive"],
    },
    {
        n: 2, id: "s-ch-2", color: P,
        title: "The Pitch",
        subtitle: "What this infrastructure is, the terms we'll use for the rest of the talk, and the 'aha' idea behind Code Connect.",
        slides: ["Elevator pitch", "Glossary", "Code Connect — the idea"],
    },
    {
        n: 3, id: "s-ch-3", color: C.blue,
        title: "The Experience",
        subtitle: "What using it feels like as a developer — one URL, one command — and the three pillars everything stands on.",
        slides: ["User flow", "The three pillars"],
    },
    {
        n: 4, id: "s-ch-4", color: C.purple,
        title: "Reading the Design",
        subtitle: "How the AI actually looks at Figma — the system architecture and our MCP tool batch.",
        slides: ["System architecture", "MCP — the protocol layer"],
    },
    {
        n: 5, id: "s-ch-5", color: C.yellow,
        title: "Mapping to Swift",
        subtitle: "Code Connect in depth — how Figma props resolve to exact SwiftUI init calls via 116 TypeScript mappings.",
        slides: ["Code Connect — end to end"],
    },
    {
        n: 6, id: "s-ch-6", color: C.accent,
        title: "The Orchestrator",
        subtitle: "Inside /figma-to-screen — agents, instructions, phases, caching, gates, and how failures recover.",
        slides: [
            "Primitives",
            "Instruction tiers",
            "Consumer side",
            "The flagship command",
            "8 phases",
            "17 agents",
            "Governance",
            "Caching",
            "Verification gates",
            "Failure modes",
        ],
    },
    {
        n: 7, id: "s-ch-7", color: C.blue,
        title: "In Practice",
        subtitle: "A real run end-to-end, plus what 'day two' looks like when the design or the code evolves.",
        slides: ["Example output", "Day two"],
    },
    {
        n: 8, id: "s-ch-8", color: C.purple,
        title: "Authoring & Trade-offs",
        subtitle: "For people adding mappings: why TypeScript beats Swift, do's and don'ts, and the honest costs.",
        slides: ["Why TypeScript", "Do / Don't", "Pros & cons"],
    },
    {
        n: 9, id: "s-ch-9", color: P,
        title: "Adopting It",
        subtitle: "How to get your first screen green, what telemetry we emit, and what ships next.",
        slides: ["Getting started", "Telemetry", "What's next"],
    },
];

const TOTAL_CHAPTERS = CHAPTERS.length;

const SECTION_IDS = [
    "s-hero",
    // Chapter 1
    "s-ch-1",
    "s-problem",
    // Chapter 2
    "s-ch-2",
    "s-what-is",
    "s-glossary",
    "s-cc-teaser",
    // Chapter 3
    "s-ch-3",
    "s-user-flow",
    "s-pillars",
    // Chapter 4
    "s-ch-4",
    "s-architecture",
    "s-mcp",
    // Chapter 5
    "s-ch-5",
    "s-code-connect",
    // Chapter 6
    "s-ch-6",
    "s-primitives",
    "s-instructions",
    "s-consumer",
    "s-flagship",
    "s-phases",
    "s-agents",
    "s-governance",
    "s-caching",
    "s-gates",
    "s-failures",
    // Chapter 7
    "s-ch-7",
    "s-example",
    "s-day-two",
    // Chapter 8
    "s-ch-8",
    "s-why-ts",
    "s-do-dont",
    "s-pros-cons",
    // Chapter 9
    "s-ch-9",
    "s-getting-started",
    "s-telemetry",
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
                        { label: "1 · Problem",      id: "s-ch-1" },
                        { label: "2 · Pitch",        id: "s-ch-2" },
                        { label: "3 · Experience",   id: "s-ch-3" },
                        { label: "4 · Figma",        id: "s-ch-4" },
                        { label: "5 · Swift",        id: "s-ch-5" },
                        { label: "6 · Orchestrator", id: "s-ch-6" },
                        { label: "7 · In Practice",  id: "s-ch-7" },
                        { label: "8 · Trade-offs",   id: "s-ch-8" },
                        { label: "9 · Adopt",        id: "s-ch-9" },
                    ]}
                    badge="iOS Chapter · Apr 2026"
                    color={P}
                    colorDim={PDim}
                />

                <HeroSection />

                <ChapterSection chapter={CHAPTERS[0]} total={TOTAL_CHAPTERS} />
                <ProblemSection />

                <ChapterSection chapter={CHAPTERS[1]} total={TOTAL_CHAPTERS} />
                <WhatIsSection />
                <GlossarySection />
                <CodeConnectTeaserSection />

                <ChapterSection chapter={CHAPTERS[2]} total={TOTAL_CHAPTERS} />
                <UserFlowSection />
                <PillarsSection />

                <ChapterSection chapter={CHAPTERS[3]} total={TOTAL_CHAPTERS} />
                <ArchitectureSection />
                <McpSection />

                <ChapterSection chapter={CHAPTERS[4]} total={TOTAL_CHAPTERS} />
                <CodeConnectSection />

                <ChapterSection chapter={CHAPTERS[5]} total={TOTAL_CHAPTERS} />
                <PrimitivesSection />
                <InstructionsSection />
                <ConsumerSection />
                <FlagshipSection />
                <PhasesSection />
                <AgentsSection />
                <GovernanceSection />
                <CachingSection />
                <GatesSection />
                <FailuresSection />

                <ChapterSection chapter={CHAPTERS[6]} total={TOTAL_CHAPTERS} />
                <ExampleSection />
                <DayTwoSection />

                <ChapterSection chapter={CHAPTERS[7]} total={TOTAL_CHAPTERS} />
                <WhyTypescriptSection />
                <DoDontSection />
                <ProsConsSection />

                <ChapterSection chapter={CHAPTERS[8]} total={TOTAL_CHAPTERS} />
                <GettingStartedSection />
                <TelemetrySection />
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
