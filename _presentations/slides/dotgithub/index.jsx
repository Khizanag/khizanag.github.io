import {
  C, FONTS, KEYFRAMES,
  useScrolled, useKeyboardNav,
  AnimatedGrid, AmbientBlobs,
  PresentationNav, ThankYouSection, PresentationFooter,
} from "../../src/shared.jsx";
import { P, PDim } from "./ui.jsx";
import { HeroSection } from "./hero.jsx";
import { WhatSection } from "./what.jsx";
import { DirectoryMapSection } from "./directoryMap.jsx";
import { CommunityHealthSection } from "./communityHealth.jsx";
import { TemplatesSection } from "./templates.jsx";
import { AutomationSection } from "./automation.jsx";
import { ExtrasSection } from "./extras.jsx";
import { RealWorldSection } from "./realWorld.jsx";
import { OrgLevelSection } from "./orgLevel.jsx";
import { SummarySection } from "./summary.jsx";

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
  <div style={{
    width: 22, height: 22, borderRadius: 6, background: PDim, border: `1px solid ${P}30`,
    display: "flex", alignItems: "center", justifyContent: "center",
  }}>
    <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="1" width="12" height="12" rx="3" stroke={P} strokeWidth="1.4" />
      <path d="M4 5h6M4 7.5h4M4 10h5" stroke={P} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  </div>
);

export default function DotGithubPresentation() {
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
          title=".github Directory"
          links={[
            { label: "What Is It",   id: "s-what" },
            { label: "Directory Map",id: "s-map" },
            { label: "Community",    id: "s-community" },
            { label: "Templates",    id: "s-templates" },
            { label: "Automation",   id: "s-automation" },
            { label: "Real World",   id: "s-real" },
            { label: "Org Defaults", id: "s-org" },
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

          <WhatSection />
          <DirectoryMapSection />
          <CommunityHealthSection />
          <TemplatesSection />
          <AutomationSection />
          <ExtrasSection />
          <RealWorldSection />
          <OrgLevelSection />
          <SummarySection />

          <ThankYouSection id="s-thankyou" label="2026" color={P} colorDim={PDim} />

          <PresentationFooter
            logo={FOOTER_LOGO}
            name=".github Directory · Giga Khizanishvili"
            links={[
              { label: "Community Health Files", href: "https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file" },
              { label: "GitHub Actions Docs",    href: "https://docs.github.com/en/actions/using-workflows/about-workflows" },
              { label: "Dependabot Docs",        href: "https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuring-dependabot-version-updates" },
            ]}
            date="2026"
          />
        </div>
      </div>
    </>
  );
}
