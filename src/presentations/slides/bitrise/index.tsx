import {
  C, FONTS, KEYFRAMES,
  useScrolled, useKeyboardNav,
  AnimatedGrid, AmbientBlobs,
  PresentationNav, ThankYouSection, PresentationFooter,
} from "../../shared.tsx";
import { P, PDim } from "./ui.tsx";
import { HeroSection } from "./hero.tsx";
import { WhyItMattersSection } from "./whyItMatters.tsx";
import { CurrentStateSection } from "./currentState.tsx";
import { ProposalSection } from "./proposal.tsx";
import { AdvantagesSection } from "./advantages.tsx";
import { TradeOffsSection } from "./tradeOffs.tsx";
import { SecuritySection } from "./security.tsx";
import { CriticalThreatSection } from "./criticalThreat.tsx";
import { SafeguardsSection } from "./safeguards.tsx";
import { EnterpriseSection } from "./enterprise.tsx";
import { ComparisonSection } from "./comparison.tsx";
import { RecommendationSection } from "./recommendation.tsx";

const SECTION_IDS = [
  "s-hero", "s-why", "s-current", "s-proposal",
  "s-advantages", "s-tradeoffs", "s-security", "s-critical",
  "s-safeguards", "s-enterprise", "s-comparison", "s-recommendation", "s-thankyou",
];

const NAV_LOGO = (
  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 13, color: P }}>CI</span>
);

const FOOTER_LOGO = (
  <div style={{
    width: 22, height: 22, borderRadius: 6, background: PDim, border: `1px solid ${P}30`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 9, color: P,
  }}>
    CI
  </div>
);

export default function BitriseConfigAnalysis() {
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
          title="Bitrise · CI as Code"
          links={[
            { label: "Why It Matters",  id: "s-why" },
            { label: "Proposal",        id: "s-proposal" },
            { label: "Security",        id: "s-security" },
            { label: "Safeguards",      id: "s-safeguards" },
            { label: "Comparison",      id: "s-comparison" },
            { label: "Recommendation",  id: "s-recommendation" },
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

          <WhyItMattersSection />
          <CurrentStateSection />
          <ProposalSection />
          <AdvantagesSection />
          <TradeOffsSection />
          <SecuritySection />
          <CriticalThreatSection />
          <SafeguardsSection />
          <EnterpriseSection />
          <ComparisonSection />
          <RecommendationSection />

          <ThankYouSection id="s-thankyou" label="FEBRUARY 2026" color={P} colorDim={PDim} />

          <PresentationFooter
            logo={FOOTER_LOGO}
            name="CI as Code · Giga Khizanishvili"
            links={[
              { label: "Audit Report" },
              { label: "Recommendations v2" },
              { label: "Senior Audit" },
            ]}
            date="Feb 2026"
          />
        </div>
      </div>
    </>
  );
}
