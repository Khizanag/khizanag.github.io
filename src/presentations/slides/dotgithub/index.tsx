import { DeckFooterLogo, DeckShell } from "../../shared.tsx";
import { P, PDim } from "./ui.tsx";
import { HeroSection } from "./hero.tsx";
import { WhatSection } from "./what.tsx";
import { DirectoryMapSection } from "./directoryMap.tsx";
import { CommunityHealthSection } from "./communityHealth.tsx";
import { TemplatesSection } from "./templates.tsx";
import { AutomationSection } from "./automation.tsx";
import { ExtrasSection } from "./extras.tsx";
import { RealWorldSection } from "./realWorld.tsx";
import { OrgLevelSection } from "./orgLevel.tsx";
import { SummarySection } from "./summary.tsx";

const SECTION_IDS = [
  "s-hero", "s-what", "s-map", "s-community", "s-templates",
  "s-automation", "s-extras", "s-real", "s-org", "s-summary", "s-thankyou",
];

const NAV_LOGO = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="1" y="1" width="12" height="12" rx="3" stroke={P} strokeWidth="1.4" />
    <path d="M4 5h6M4 7.5h4M4 10h5" stroke={P} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const FOOTER_LOGO = (
  <DeckFooterLogo color={P} colorDim={PDim}>
    <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="1" width="12" height="12" rx="3" stroke={P} strokeWidth="1.4" />
      <path d="M4 5h6M4 7.5h4M4 10h5" stroke={P} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  </DeckFooterLogo>
);

export default function DotGithubPresentation() {
  return (
    <DeckShell
      sectionIds={SECTION_IDS}
      color={P}
      colorDim={PDim}
      navLogo={NAV_LOGO}
      title=".github Directory"
      navLinks={[
        { label: "What Is It",   id: "s-what" },
        { label: "Directory Map",id: "s-map" },
        { label: "Community",    id: "s-community" },
        { label: "Templates",    id: "s-templates" },
        { label: "Automation",   id: "s-automation" },
        { label: "Real World",   id: "s-real" },
        { label: "Org Defaults", id: "s-org" },
      ]}
      hero={<HeroSection />}
      thankYouLabel="2026"
      footerLogo={FOOTER_LOGO}
      footerName=".github Directory · Giga Khizanishvili"
      footerLinks={[
        { label: "Community Health Files", href: "https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file" },
        { label: "GitHub Actions Docs",    href: "https://docs.github.com/en/actions/using-workflows/about-workflows" },
        { label: "Dependabot Docs",        href: "https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuring-dependabot-version-updates" },
      ]}
      footerDate="2026"
    >
      <WhatSection />
      <DirectoryMapSection />
      <CommunityHealthSection />
      <TemplatesSection />
      <AutomationSection />
      <ExtrasSection />
      <RealWorldSection />
      <OrgLevelSection />
      <SummarySection />
    </DeckShell>
  );
}
