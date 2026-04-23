import { C, Reveal, SectionLabel, SectionHeading, CalloutBox, InfoCard } from "../../shared.tsx";
import { P, TimingBadge } from "./ui.tsx";

export function PriceTiersSection() {
    return (
        <section id="s-price-tiers" style={{ padding: "96px 48px", background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>
                        PRICE TIERS · FX · LOCAL <TimingBadge minutes="1:30" color={P} />
                    </SectionLabel>
                    <SectionHeading sub="900 price points. Quarterly FX updates. Per-storefront pricing — including special rules for Georgia, Uzbekistan, and every country where local currency isn't fully convertible.">
                        Pricing — the 900-tier grid
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
                    <InfoCard icon="🎚" title="900 price points" color={P}>
                        Since 2022, Apple replaced the old Tier 1–87 system with <b>900 discrete price points</b> from $0.29 up to $10,000. You set a <b>base price + base storefront</b>; Apple fills the rest.
                    </InfoCard>
                    <InfoCard icon="💱" title="Automatic FX" color={C.accent}>
                        Apple updates per-region pricing <b>~quarterly</b> to track currency drift. You can opt out per-storefront if you want manual control — most apps don't. Apple always rounds to a local "clean" price point.
                    </InfoCard>
                    <InfoCard icon="🏳" title="Local pricing" color={C.yellow}>
                        Georgia (GEL), Uzbekistan (UZS), Kazakhstan (KZT) — all supported since 2022–2024. Payouts still go via USD/EUR wire but Apple converts at month-end.
                    </InfoCard>
                </div>

                <div style={{
                    background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12,
                    padding: "24px 28px", marginBottom: 24,
                }}>
                    <div style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                        color: C.muted, letterSpacing: "0.12em", marginBottom: 14,
                    }}>
                        BANKING-APP REALITY
                    </div>
                    <ul style={{ margin: 0, padding: "0 0 0 20px", color: C.text, fontSize: 13, lineHeight: 2 }}>
                        <li>Most banking features are <b>free to install + use</b> — no IAP tier selected.</li>
                        <li>Premium tiers (gold card perks, premium analytics) → <b>subscription + local-currency auto-renew</b>.</li>
                        <li>Third-party marketplace items (tickets, insurance) → handled outside StoreKit — Apple allows for "real-world goods/services" (Guideline 3.1.3(b)).</li>
                        <li>Price changes propagate <b>24–48 h</b> across regions. Don't change price + run a marketing push on the same day.</li>
                    </ul>
                </div>

                <CalloutBox color={P} icon="📊" label="PAYMENT PLATFORMS BY REGION">
                    <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.65 }}>
                        <b>USD / EUR / GBP / JPY</b> — Apple pays you directly. <b>GEL / UZS / RUB / KZT / TRY</b> — Apple collects in local currency, converts month-end, pays in <b>USD</b> to your bank. Watch for FX-spread costs on high-volume IAP apps.
                    </p>
                </CalloutBox>
            </div>
        </section>
    );
}
