import type { ComponentType } from "react";
import { C } from "./tokens.ts";
import BitriseConfigAnalysis from "./slides/bitrise/index.tsx";
import GithubAccessStrategy from "./slides/github/index.tsx";
import DotGithubPresentation from "./slides/dotgithub/index.tsx";
import GitConfigPresentation from "./slides/git-config-files/index.tsx";
import iOSPassiveIncome from "./slides/ios-passive-income/index.tsx";
import CodeConnectPresentation from "./slides/code-connect/index.tsx";
import NativeVsTemplatesPresentation from "./slides/native-vs-templates/index.tsx";
import FigmaToScreenPresentation from "./slides/figma-to-screen/index.tsx";
import IOSDistributionPresentation from "./slides/ios-distribution/index.tsx";

export interface Slide {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categoryColor: string;
  date: string;
  /** React component for in-app presentations. Omit for externally-hosted decks (e.g. Slidev). */
  component?: ComponentType;
  /** External URL for decks hosted outside the React app (e.g. Slidev under /presentations/<deck>/). */
  externalUrl?: string;
}

export const SLIDES: Slide[] = [
  {
    id:            "anatomy-source-to-binary",
    title:         "From Source to Binary",
    subtitle:      "Visual demo deck for the \"Anatomy of an App Release\" talk — Swift compilation pipeline traced through eight stages, from `func greet` to ARM64 machine code, with live syntax-coloured token transitions and Mach-O assembly excerpts.",
    category:      "Compiler Internals",
    categoryColor: C.purple,
    date:          "May 2026",
    externalUrl:   "/presentations/anatomy-source-to-binary/",
  },
  {
    id:            "ios-distribution",
    title:         "From git push to App Store",
    subtitle:      "A 75-minute deep dive into iOS distribution, App Store Connect, App Review Guidelines, and real-world war stories — HEY, Epic, Beeper, XcodeGhost, and more — plus our own CI/CD pipeline and a live review game.",
    category:      "iOS Distribution",
    categoryColor: C.blue,
    date:          "Apr 2026",
    component:     IOSDistributionPresentation,
  },
  {
    id:            "figma-to-screen",
    title:         "/figma-to-screen Pipeline",
    subtitle:      "How an AI-orchestrated pipeline turns a Figma URL into a clean-architecture SwiftUI screen — 17 agents, 8 phases, 7 verification gates, and a shared JSON context as the single source of truth.",
    category:      "AI Infrastructure",
    categoryColor: C.accent,
    date:          "Apr 2026",
    component:     FigmaToScreenPresentation,
  },
  {
    id:            "native-vs-templates",
    title:         "Native vs Templates",
    subtitle:      "Figma Code Connect: Should iOS & Android teams write Swift/Kotlin or TypeScript? A deep comparison of both approaches — setup, features, limitations, community, MCP, and future direction.",
    category:      "Design System",
    categoryColor: C.blue,
    date:          "Apr 2026",
    component:     NativeVsTemplatesPresentation,
  },
  {
    id:            "code-connect",
    title:         "Figma Code Connect",
    subtitle:      "How we bridged S.I.N.S. design system components in Figma with real Swift code — setup, patterns, coverage, and developer workflow.",
    category:      "Design System",
    categoryColor: C.purple,
    date:          "Apr 2026",
    component:     CodeConnectPresentation,
  },
  {
    id:            "ios-passive-income",
    title:         "20 iOS Apps That Print Money",
    subtitle:      "Research-backed passive income app ideas for indie iOS developers — each analyzed for market gap, monetization, tech stack, and realistic revenue.",
    category:      "Indie Business",
    categoryColor: C.accent,
    date:          "Mar 2026",
    component:     iOSPassiveIncome,
  },
  {
    id:            "bitrise-config-analysis",
    title:         "Bitrise — CI as Code",
    subtitle:      "Should bitrise.yml move from Bitrise.io managed storage into the Git repository? Trade-offs, security risks, safeguards, and a concrete recommendation.",
    category:      "CI/CD",
    categoryColor: C.blue,
    date:          "Feb 2026",
    component:     BitriseConfigAnalysis,
  },
  {
    id:            "github-access-strategy",
    title:         "GitHub Cross-Team Access & Review Strategy",
    subtitle:      "Decoupling write access from review authority so teams retain ownership without blocking cross-team collaboration.",
    category:      "Architecture",
    categoryColor: C.accent,
    date:          "Feb 2026",
    component:     GithubAccessStrategy,
  },
  {
    id:            "dotgithub-directory",
    title:         "The .github Directory",
    subtitle:      "Every file GitHub recognizes inside .github/ — templates, automation, community health, ownership, and org-level defaults — explained from first principles.",
    category:      "GitHub",
    categoryColor: C.purple,
    date:          "Feb 2026",
    component:     DotGithubPresentation,
  },
  {
    id:            "git-config-files",
    title:         ".gitconfig & .gitmodules",
    subtitle:      "How Git cascades configuration across system, user, and repository levels — and how submodule metadata flows between these two connected INI files.",
    category:      "Git Internals",
    categoryColor: C.blue,
    date:          "Feb 2026",
    component:     GitConfigPresentation,
  },
];
