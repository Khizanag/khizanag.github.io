import type { ComponentType } from "react";
import { C } from "./tokens.ts";
import BitriseConfigAnalysis from "./slides/bitrise/index.tsx";
import GithubAccessStrategy from "./slides/github/index.tsx";
import DotGithubPresentation from "./slides/dotgithub/index.tsx";
import GitConfigPresentation from "./slides/git-config-files/index.tsx";
import iOSPassiveIncome from "./slides/ios-passive-income/index.tsx";
import CodeConnectPresentation from "./slides/code-connect/index.tsx";

export interface Slide {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categoryColor: string;
  date: string;
  component: ComponentType;
}

export const SLIDES: Slide[] = [
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
