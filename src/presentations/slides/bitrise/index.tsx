import { DeckFooterLogo, DeckShell } from "../../shared.tsx";
import { P, PDim } from "./tokens.ts";
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
  <DeckFooterLogo
    color={P}
    colorDim={PDim}
    style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 9, color: P }}
  >
    CI
  </DeckFooterLogo>
);

export default function BitriseConfigAnalysis() {
  return (
    <DeckShell
      sectionIds={SECTION_IDS}
      color={P}
      colorDim={PDim}
      navLogo={NAV_LOGO}
      title="Bitrise · CI as Code"
      navLinks={[
        { label: "Why It Matters",  id: "s-why" },
        { label: "Proposal",        id: "s-proposal" },
        { label: "Security",        id: "s-security" },
        { label: "Safeguards",      id: "s-safeguards" },
        { label: "Comparison",      id: "s-comparison" },
        { label: "Recommendation",  id: "s-recommendation" },
      ]}
      hero={<HeroSection />}
      thankYouLabel="FEBRUARY 2026"
      footerLogo={FOOTER_LOGO}
      footerName="CI as Code · Giga Khizanishvili"
      footerLinks={[
        { label: "Audit Report" },
        { label: "Recommendations v2" },
        { label: "Senior Audit" },
      ]}
      footerDate="Feb 2026"
    >
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
    </DeckShell>
  );
}
