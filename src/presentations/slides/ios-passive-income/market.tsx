import { C, Reveal, SectionLabel, SectionHeading, CalloutBox } from "../../shared.tsx";
import { P, StatCard } from "./ui.tsx";

export function MarketSection() {
  return (
    <section id="s-market" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={P}>MARKET ANALYSIS</SectionLabel>
        <SectionHeading sub="Why 2026 is the best time for indie iOS developers to build passive income apps.">
          The Opportunity Window
        </SectionHeading>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, marginBottom: 40 }}>
        <StatCard value="$89B" label="App Store Spend" sub="2025, +2.8% YoY" color={P} delay={0} />
        <StatCard value="$138" label="iOS User ARPU" sub="vs $72 Android — 2x premium" color={C.blue} delay={0.08} />
        <StatCard value="15%" label="Apple Commission" sub="Small Business Program" color={C.purple} delay={0.16} />
        <StatCard value="$516M" label="AI Apps Revenue" sub="+47% YoY growth" color={C.yellow} delay={0.24} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
        <Reveal delay={0.1}>
          <CalloutBox color={C.accent} label="SUBSCRIPTION POWER" icon="💰">
            <span style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
              Only <strong style={{ color: C.text }}>4% of apps</strong> use subscriptions, yet they generate{" "}
              <strong style={{ color: C.text }}>45% of all revenue</strong>. Subscription apps see 3-5x higher LTV
              and 30% better retention. Sweet spot pricing: $4.99–$12.99/month.
            </span>
          </CalloutBox>
        </Reveal>
        <Reveal delay={0.18}>
          <CalloutBox color={C.blue} label="ON-DEVICE AI" icon="🧠">
            <span style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
              Apple's Foundation Models framework gives <strong style={{ color: C.text }}>free AI inference</strong> on-device.
              ~3B parameter LLM, works offline, zero API cost. Most indie devs haven't adopted this yet —{" "}
              <strong style={{ color: C.text }}>massive first-mover advantage</strong>.
            </span>
          </CalloutBox>
        </Reveal>
      </div>

      <Reveal delay={0.24}>
        <CalloutBox color={C.purple} label="THE PORTFOLIO STRATEGY" icon="📱">
          <span style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            One developer built a <strong style={{ color: C.text }}>30-app micro-portfolio earning $22K/month</strong>.
            5,000 subscribers at $4.99/month = $25K/month. The strategy: launch focused apps, let winners compound,
            iterate on what works. <strong style={{ color: C.text }}>You don't need one hit — you need a portfolio.</strong>
          </span>
        </CalloutBox>
      </Reveal>
    </section>
  );
}
