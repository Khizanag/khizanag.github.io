import { C, Reveal, SectionLabel, SectionHeading, CalloutBox, PlainEnglishBox, FeatureCard } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function StrategySection() {
  return (
    <section id="s-strategy" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={P}>EXECUTION STRATEGY</SectionLabel>
        <SectionHeading sub="How to systematically build, launch, and compound revenue across the portfolio.">
          The Playbook
        </SectionHeading>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 32 }}>
        <Reveal delay={0}>
          <FeatureCard
            icon="🎯"
            title="Phase 1: Quick Wins"
            description="Start with Low-effort apps (HydroMind, ClipVault, LinguaFlash, ShortcutHub). Ship in 2-4 weeks each. Validate demand, learn App Store optimization. Target: $5-10K MRR."
            color={P}
            delay={0}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <FeatureCard
            icon="🚀"
            title="Phase 2: Core Revenue"
            description="Build Medium-effort apps that showed highest search demand. MeetingMind, ScreenFence, FocusForge, WidgetCraft. Target: $15-30K MRR combined."
            color={C.blue}
            delay={0}
          />
        </Reveal>
        <Reveal delay={0.2}>
          <FeatureCard
            icon="💎"
            title="Phase 3: Moat Apps"
            description="Invest in High-effort, high-moat apps: DermaLens, MealPrep Pro. These have the highest revenue ceiling and strongest competitive barriers. Target: $30-50K MRR."
            color={C.purple}
            delay={0}
          />
        </Reveal>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
        <Reveal delay={0.15}>
          <CalloutBox color={C.yellow} label="MONETIZATION FORMULA" icon="💰">
            <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.8 }}>
              <div><strong style={{ color: C.text }}>Tier 1 — Free:</strong> Core features, ads optional</div>
              <div><strong style={{ color: C.text }}>Tier 2 — $2.99-6.99/mo:</strong> Full features, no ads</div>
              <div><strong style={{ color: C.text }}>Tier 3 — Lifetime:</strong> 2-3x annual price, for fatigue-resistant users</div>
              <div style={{ marginTop: 8 }}><strong style={{ color: C.accent }}>Always offer weekly option</strong> — they convert 10% better</div>
            </div>
          </CalloutBox>
        </Reveal>
        <Reveal delay={0.22}>
          <CalloutBox color={C.accent} label="GROWTH LEVERS" icon="📈">
            <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.8 }}>
              <div><strong style={{ color: C.text }}>ASO:</strong> Keywords in title, subtitle, first 3 screenshots</div>
              <div><strong style={{ color: C.text }}>Widgets:</strong> Every app gets a widget — free Home Screen advertising</div>
              <div><strong style={{ color: C.text }}>Cross-Sell:</strong> Promote your other apps from settings screen</div>
              <div><strong style={{ color: C.text }}>Win-Back:</strong> StoreKit 2 offers for churned subscribers</div>
            </div>
          </CalloutBox>
        </Reveal>
      </div>

      <Reveal delay={0.28}>
        <PlainEnglishBox color={P}>
          <strong>The math:</strong> If just 5 of these 20 apps each get 1,000 subscribers at $4.99/month, that's $25K/month
          after Apple's 15% cut (Small Business Program). The portfolio de-risks you — no single app needs to be a hit.
          Ship fast, measure, double down on winners. Kill underperformers. Compound the portfolio.
        </PlainEnglishBox>
      </Reveal>
    </section>
  );
}
