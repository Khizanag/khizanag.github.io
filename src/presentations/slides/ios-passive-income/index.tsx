import {
  C, FONTS, KEYFRAMES,
  useScrolled, useKeyboardNav,
  AnimatedGrid, AmbientBlobs,
  PresentationNav, ThankYouSection, PresentationFooter,
} from "../../shared.tsx";
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
  <div style={{
    width: 22, height: 22, borderRadius: 6, background: PDim, border: `1px solid ${P}30`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 9, color: P,
  }}>
    ₿
  </div>
);

export default function iOSPassiveIncome() {
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
          title="iOS Passive Income"
          links={[
            { label: "Market",    id: "s-market" },
            { label: "Health",    id: "s-health" },
            { label: "AI Tools",  id: "s-ai" },
            { label: "Utilities", id: "s-utility" },
            { label: "Lifestyle", id: "s-lifestyle" },
            { label: "Platform",  id: "s-platform" },
            { label: "Strategy",  id: "s-strategy" },
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

          <MarketSection />
          <AppsHealthSection />
          <AppsAISection />
          <AppsUtilitySection />
          <AppsLifestyleSection />
          <AppsPlatformSection />
          <StrategySection />

          <ThankYouSection id="s-thankyou" label="MARCH 2026" color={P} colorDim={PDim} />

          <PresentationFooter
            logo={FOOTER_LOGO}
            name="iOS Passive Income · Giga Khizanishvili"
            links={[
              { label: "Market Research" },
              { label: "App Ideas" },
              { label: "Execution Plan" },
            ]}
            date="Mar 2026"
          />
        </div>
      </div>
    </>
  );
}
