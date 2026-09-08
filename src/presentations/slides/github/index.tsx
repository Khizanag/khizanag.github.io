import { DeckFooterLogo, DeckShell } from "../../shared.tsx";
import { P, PDim } from "./ui.tsx";
import { HeroSection } from "./hero.tsx";
import { GitHubRolesSection } from "./githubRoles.tsx";
import { GitHubRolesTableSection } from "./githubRolesTable.tsx";
import { ProblemSection } from "./problem.tsx";
import { CoreInsightSection } from "./coreInsight.tsx";
import { SolutionSection } from "./solution.tsx";
import { CodeownersSection } from "./codeowners.tsx";
import { CodeownersScenariosSection } from "./codeownersScenarios.tsx";
import { AccessModelSection } from "./accessModel.tsx";
import { BranchProtectionSection } from "./branchProtection.tsx";
import { WorkflowSection } from "./workflow.tsx";
import { RoleDistributionSection } from "./roleDistribution.tsx";
import { SummarySection } from "./summary.tsx";

const SECTION_IDS = [
  "s-hero", "s-roles", "s-roles-table", "s-problem", "s-insight", "s-solution",
  "s-codeowners", "s-codeowners-scenarios", "s-access-model", "s-branch-protection", "s-workflow", "s-distribution", "s-summary", "s-thankyou",
];

const GITHUB_SVG = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill={P} />
  </svg>
);

const FOOTER_LOGO = (
  <DeckFooterLogo color={P} colorDim={PDim}>
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill={P} />
    </svg>
  </DeckFooterLogo>
);

export default function GithubAccessStrategy() {
  return (
    <DeckShell
      sectionIds={SECTION_IDS}
      color={P}
      colorDim={PDim}
      navLogo={GITHUB_SVG}
      title="GitHub Access Strategy"
      navLinks={[
        { label: "Roles",        id: "s-roles" },
        { label: "Problem",      id: "s-problem" },
        { label: "Solution",     id: "s-solution" },
        { label: "CODEOWNERS",   id: "s-codeowners" },
        { label: "Access Model", id: "s-access-model" },
        { label: "Our Setup",    id: "s-distribution" },
      ]}
      hero={<HeroSection />}
      thankYouLabel="2026"
      footerLogo={FOOTER_LOGO}
      footerName="GitHub Access Strategy · Giga Khizanishvili"
      footerLinks={[
        { label: "CODEOWNERS Docs",   href: "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners" },
        { label: "Branch Protection", href: "https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches" },
        { label: "GitHub Teams",      href: "https://docs.github.com/en/organizations/organizing-members-into-teams/about-teams" },
      ]}
      footerDate="2026"
    >
      <GitHubRolesSection />
      <GitHubRolesTableSection />
      <ProblemSection />
      <CoreInsightSection />
      <SolutionSection />
      <CodeownersSection />
      <CodeownersScenariosSection />
      <AccessModelSection />
      <BranchProtectionSection />
      <WorkflowSection />
      <RoleDistributionSection />
      <SummarySection />
    </DeckShell>
  );
}
