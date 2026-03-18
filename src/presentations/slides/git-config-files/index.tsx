import {
  C, FONTS, KEYFRAMES,
  useScrolled, useKeyboardNav,
  AnimatedGrid, AmbientBlobs,
  PresentationNav, ThankYouSection, PresentationFooter,
} from "../../shared.jsx";
import { P, PDim } from "./ui.jsx";
import { HeroSection } from "./hero.jsx";
import { OverviewSection } from "./overview.jsx";
import { CascadeSection } from "./cascade.jsx";
import { SectionsSection } from "./sections.jsx";
import { GitmodulesSection } from "./gitmodules.jsx";
import { InternalsSection } from "./internals.jsx";
import { LifecycleSection } from "./lifecycle.jsx";
import { EdgeCasesSection } from "./edgeCases.jsx";
import { BridgeSection } from "./bridge.jsx";
import { SecuritySection } from "./security.jsx";
import { SummarySection } from "./summary.jsx";

const SECTION_IDS = [
  "s-hero", "s-overview", "s-cascade", "s-sections", "s-gitmodules",
  "s-internals", "s-lifecycle", "s-edge-cases", "s-bridge",
  "s-security", "s-summary", "s-thankyou",
];

const NAV_LOGO = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="1" y="1" width="12" height="12" rx="2" stroke={P} strokeWidth="1.2" />
    <path d="M4.5 4.5L7 7l2.5-2.5M4.5 7L7 9.5 9.5 7" stroke={P} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FOOTER_LOGO = (
  <div style={{
    width: 22, height: 22, borderRadius: 6, background: PDim, border: `1px solid ${P}30`,
    display: "flex", alignItems: "center", justifyContent: "center",
  }}>
    <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="1" width="12" height="12" rx="2" stroke={P} strokeWidth="1.2" />
      <path d="M4.5 4.5L7 7l2.5-2.5M4.5 7L7 9.5 9.5 7" stroke={P} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

export default function GitConfigPresentation() {
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
          title=".gitconfig & .gitmodules"
          links={[
            { label: "Overview",    id: "s-overview" },
            { label: ".gitconfig",  id: "s-cascade" },
            { label: ".gitmodules", id: "s-gitmodules" },
            { label: "Internals",   id: "s-internals" },
            { label: "Security",    id: "s-security" },
            { label: "Summary",     id: "s-summary" },
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

          <OverviewSection />
          <CascadeSection />
          <SectionsSection />
          <GitmodulesSection />
          <InternalsSection />
          <LifecycleSection />
          <EdgeCasesSection />
          <BridgeSection />
          <SecuritySection />
          <SummarySection />

          <ThankYouSection id="s-thankyou" label="iOS CHAPTER · FEB 2026" color={P} colorDim={PDim} />

          <PresentationFooter
            logo={FOOTER_LOGO}
            name=".gitconfig & .gitmodules · Giga Khizanishvili"
            links={[
              { label: "git-config Docs",     href: "https://git-scm.com/docs/git-config" },
              { label: "gitmodules Docs",     href: "https://git-scm.com/docs/gitmodules" },
              { label: "git-submodule Docs",  href: "https://git-scm.com/docs/git-submodule" },
            ]}
            date="Feb 2026"
          />
        </div>
      </div>
    </>
  );
}
