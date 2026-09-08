import { DeckFooterLogo, DeckShell } from "../../shared.tsx";
import { P, PDim } from "./ui.tsx";
import { HeroSection } from "./hero.tsx";
import { MarketSection } from "./market.tsx";
import { AppsHealthSection } from "./appsHealth.tsx";
import { AppsAISection } from "./appsAI.tsx";
import { AppsUtilitySection } from "./appsUtility.tsx";
import { AppsLifestyleSection } from "./appsLifestyle.tsx";
import { AppsPlatformSection } from "./appsPlatform.tsx";
import { StrategySection } from "./strategy.tsx";

const SECTION_IDS = [
  "s-hero", "s-market",
  "s-health", "s-ai", "s-utility", "s-lifestyle", "s-platform",
  "s-strategy", "s-thankyou",
];

const NAV_LOGO = (
  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 13, color: P }}>₿</span>
);

const FOOTER_LOGO = (
  <DeckFooterLogo
    color={P}
    colorDim={PDim}
    style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 9, color: P }}
  >
    ₿
  </DeckFooterLogo>
);

export default function IOSPassiveIncome() {
  return (
    <DeckShell
      sectionIds={SECTION_IDS}
      color={P}
      colorDim={PDim}
      navLogo={NAV_LOGO}
      title="iOS Passive Income"
      navLinks={[
        { label: "Market",    id: "s-market" },
        { label: "Health",    id: "s-health" },
        { label: "AI Tools",  id: "s-ai" },
        { label: "Utilities", id: "s-utility" },
        { label: "Lifestyle", id: "s-lifestyle" },
        { label: "Platform",  id: "s-platform" },
        { label: "Strategy",  id: "s-strategy" },
      ]}
      hero={<HeroSection />}
      thankYouLabel="MARCH 2026"
      footerLogo={FOOTER_LOGO}
      footerName="iOS Passive Income · Giga Khizanishvili"
      footerLinks={[
        { label: "Market Research" },
        { label: "App Ideas" },
        { label: "Execution Plan" },
      ]}
      footerDate="Mar 2026"
    >
      <MarketSection />
      <AppsHealthSection />
      <AppsAISection />
      <AppsUtilitySection />
      <AppsLifestyleSection />
      <AppsPlatformSection />
      <StrategySection />
    </DeckShell>
  );
}
