import { DeckFooterLogo, DeckShell } from "../../shared.tsx";
import { P, PDim } from "./ui.tsx";
import { HeroSection } from "./hero.tsx";
import { OverviewSection } from "./overview.tsx";
import { CascadeSection } from "./cascade.tsx";
import { SectionsSection } from "./sections.tsx";
import { GitmodulesSection } from "./gitmodules.tsx";
import { InternalsSection } from "./internals.tsx";
import { LifecycleSection } from "./lifecycle.tsx";
import { EdgeCasesSection } from "./edgeCases.tsx";
import { BridgeSection } from "./bridge.tsx";
import { SecuritySection } from "./security.tsx";
import { SummarySection } from "./summary.tsx";

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
  <DeckFooterLogo color={P} colorDim={PDim}>
    <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="1" width="12" height="12" rx="2" stroke={P} strokeWidth="1.2" />
      <path d="M4.5 4.5L7 7l2.5-2.5M4.5 7L7 9.5 9.5 7" stroke={P} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </DeckFooterLogo>
);

export default function GitConfigPresentation() {
  return (
    <DeckShell
      sectionIds={SECTION_IDS}
      color={P}
      colorDim={PDim}
      navLogo={NAV_LOGO}
      title=".gitconfig & .gitmodules"
      navLinks={[
        { label: "Overview",    id: "s-overview" },
        { label: ".gitconfig",  id: "s-cascade" },
        { label: ".gitmodules", id: "s-gitmodules" },
        { label: "Internals",   id: "s-internals" },
        { label: "Security",    id: "s-security" },
        { label: "Summary",     id: "s-summary" },
      ]}
      hero={<HeroSection />}
      thankYouLabel="iOS CHAPTER · FEB 2026"
      footerLogo={FOOTER_LOGO}
      footerName=".gitconfig & .gitmodules · Giga Khizanishvili"
      footerLinks={[
        { label: "git-config Docs",     href: "https://git-scm.com/docs/git-config" },
        { label: "gitmodules Docs",     href: "https://git-scm.com/docs/gitmodules" },
        { label: "git-submodule Docs",  href: "https://git-scm.com/docs/git-submodule" },
      ]}
      footerDate="Feb 2026"
    >
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
    </DeckShell>
  );
}
