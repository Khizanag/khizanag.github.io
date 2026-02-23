import {
  C, FONTS, KEYFRAMES,
  useScrolled, useKeyboardNav,
  AnimatedGrid, AmbientBlobs,
  PresentationNav, ThankYouSection, PresentationFooter,
} from "../../src/shared.jsx";
import { P, PDim } from "./ui.jsx";
import { HeroSection } from "./hero.jsx";
import { GitHubRolesSection } from "./githubRoles.jsx";
import { GitHubRolesTableSection } from "./githubRolesTable.jsx";
import { ProblemSection } from "./problem.jsx";
import { CoreInsightSection } from "./coreInsight.jsx";
import { SolutionSection } from "./solution.jsx";
import { CodeownersSection } from "./codeowners.jsx";
import { CodeownersScenariosSection } from "./codeownersScenarios.jsx";
import { AccessModelSection } from "./accessModel.jsx";
import { BranchProtectionSection } from "./branchProtection.jsx";
import { WorkflowSection } from "./workflow.jsx";
import { RoleDistributionSection } from "./roleDistribution.jsx";
import { SummarySection } from "./summary.jsx";

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
  <div style={{
    width: 22, height: 22, borderRadius: 6, background: PDim, border: `1px solid ${P}30`,
    display: "flex", alignItems: "center", justifyContent: "center",
  }}>
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill={P} />
    </svg>
  </div>
);

export default function GithubAccessStrategy() {
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
          logo={GITHUB_SVG}
          title="GitHub Access Strategy"
          links={[
            { label: "Roles",        id: "s-roles" },
            { label: "Problem",      id: "s-problem" },
            { label: "Solution",     id: "s-solution" },
            { label: "CODEOWNERS",   id: "s-codeowners" },
            { label: "Access Model", id: "s-access-model" },
            { label: "Our Setup",    id: "s-distribution" },
          ]}
          badge="Giga Khizanishvili"
          color={P}
          colorDim={PDim}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <HeroSection />

          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
            <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.border}, transparent)` }} />
          </div>

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

          <ThankYouSection id="s-thankyou" label="2026" color={P} colorDim={PDim} />

          <PresentationFooter
            logo={FOOTER_LOGO}
            name="GitHub Access Strategy · Giga Khizanishvili"
            links={[
              { label: "CODEOWNERS Docs",   href: "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners" },
              { label: "Branch Protection", href: "https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches" },
              { label: "GitHub Teams",      href: "https://docs.github.com/en/organizations/organizing-members-into-teams/about-teams" },
            ]}
            date="2026"
          />
        </div>
      </div>
    </>
  );
}
