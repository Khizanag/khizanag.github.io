import { C } from "./tokens.js";
import BitriseConfigAnalysis from "./slides/bitrise/index.jsx";
import GithubAccessStrategy from "./slides/github/index.jsx";
import DotGithubPresentation from "./slides/dotgithub/index.jsx";
import GitConfigPresentation from "./slides/git-config-files/index.jsx";

export const SLIDES = [
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
