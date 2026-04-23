import { C, Reveal, SectionLabel, SectionHeading, FeatureCard, CalloutBox, CodeBlock, PlainEnglishBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function StoreKitPaymentsSection() {
    return (
        <section id="s-storekit" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>STOREKIT & PAYMENTS</SectionLabel>
                    <SectionHeading sub="The most emotionally charged area of iOS. 30%. Epic. DMA. Reader rule. Here&rsquo;s what a senior engineer actually needs to know about the payment landscape in 2026.">
                        IAP mechanics + the 30% tax + post-DMA reality
                    </SectionHeading>
                </Reveal>

                {/* IAP types */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 40 }}>
                    <FeatureCard icon="🎫" title="Consumable" color={C.blue} delay={0}
                        description="Used once (coins, lives). Re-purchasable. Apple takes 30% (15% for small biz). NOT restorable." />
                    <FeatureCard icon="🔓" title="Non-Consumable" color={C.purple} delay={0.06}
                        description="Buy once, own forever (remove ads, unlock pro). Restorable. 30%/15%." />
                    <FeatureCard icon="🔁" title="Auto-Renewable Sub" color={C.accent} delay={0.12}
                        description="Recurring (Netflix, Spotify). 30% year 1, DROPS to 15% year 2+ per-subscriber." />
                    <FeatureCard icon="📅" title="Non-Renewing Sub" color={C.yellow} delay={0.18}
                        description="Fixed-duration (annual magazine). Rarely used post-2020. 30%/15%." />
                </div>

                {/* StoreKit 2 */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 16 }}>
                    StoreKit 2 — async/await rewrite (iOS 15+)
                </div>
                <CodeBlock filename="Purchase flow — StoreKit 2 vs legacy">{`// ── StoreKit 2 (2021+) — the new way ────────────────
let products = try await Product.products(for: ["premium_annual"])
let product = products.first!

let result = try await product.purchase()
switch result {
case .success(let verification):
    let transaction = try verification.payloadValue   // JWS-signed
    await handleUnlock(for: transaction.productID)
    await transaction.finish()
case .userCancelled, .pending: break
@unknown default: break
}

// Apple's servers sign the transaction JWS.
// You verify on-device with JWS key. NO more receipt validation
// endpoint dance with Apple's production server.

// ── Legacy StoreKit 1 (still works) ─────────────────
// SKPaymentQueue.default().add(observer)  ← global singleton nightmare
// Delegate callbacks. Receipt stored in main bundle.
// Validate by POSTing receipt to verifyReceipt endpoint.`}</CodeBlock>

                {/* The 30% rundown */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginTop: 40, marginBottom: 16 }}>
                    The real commission matrix
                </div>
                <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", marginBottom: 32 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1.5fr 110px 1fr", gap: 16, padding: "8px 0", borderBottom: `1px solid ${C.border}`, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.muted, letterSpacing: "0.1em" }}>
                        <div>WHO/WHAT</div><div>RATE</div><div>CONDITION</div>
                    </div>
                    {[
                        ["Standard IAP",                            "30%",  "Default. Applied to first $1M/yr and beyond for large devs."],
                        ["Small Business Program",                  "15%",  "Earning &lt; $1M/yr across all apps on account."],
                        ["Subscription, year 2+",                   "15%",  "Automatic drop after the subscriber&rsquo;s 1-year anniversary."],
                        ["News Partner Program",                    "15%",  "Qualifying news apps. Curated, manual onboarding."],
                        ["Video Partner Program",                   "15%",  "Qualifying video apps (Netflix-tier). Curated."],
                        ["EU DMA — payments via 3rd party",         "17% + 3%", "External purchase via alternative marketplace. Core Technology Fee on top."],
                        ["EU DMA — StoreKit External Purchase",     "12%",  "Within-app link to YOUR OWN payment page (post-2024)."],
                        ["Reader rule (Spotify, Netflix, Kindle)",  "0%",   "Only if app does NOT offer in-app purchase AT ALL. Steering link allowed since 2022."],
                    ].map((row, i) => (
                        <div key={i} style={{
                            display: "grid", gridTemplateColumns: "1.5fr 110px 1fr", gap: 16,
                            padding: "10px 0", borderBottom: i < 7 ? `1px solid ${C.border}` : "none",
                            alignItems: "center",
                        }}>
                            <div style={{ fontSize: 12.5, color: C.text }}>{row[0]}</div>
                            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: P, fontWeight: 700 }}>{row[1]}</div>
                            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}
                                 dangerouslySetInnerHTML={{ __html: row[2] as string }} />
                        </div>
                    ))}
                </div>

                {/* Must use IAP */}
                <PlainEnglishBox color={P}>
                    <b>Guideline 3.1.1:</b> If what you sell is consumed INSIDE the app (unlocked features, in-app currency, subscriptions to in-app content) → <b>MUST go through IAP</b>. Physical goods + services consumed outside (Uber ride, Airbnb booking, Amazon purchase) → Apple Pay / Stripe is fine. Grey zone: virtual goods used both in-app and outside (Spotify playlists) → Apple&rsquo;s historical position is &lsquo;IAP&rsquo;, DMA/court rulings complicate this.
                </PlainEnglishBox>

                <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    <CalloutBox color={C.red} icon="💣" label="THE CLASSIC 3.1.1 REJECTION">
                        App sells a digital feature (premium filter, remove ads) via Stripe web checkout. Reviewer opens the app, taps &lsquo;Upgrade&rsquo; → sees browser redirect → rejected under 3.1.1. Fix: add IAP alongside, or remove the in-app upgrade button entirely. Yoga apps, language apps, and meditation apps get hit with this weekly.
                    </CalloutBox>
                    <CalloutBox color={C.yellow} icon="🧾" label="RECEIPT VALIDATION — SERVER-SIDE ONLY">
                        Never validate receipts on-device alone — trivially bypassed with a jailbreak. Server receives the transaction, POSTs to Apple&rsquo;s <code>verifyReceipt</code> (or verifies JWS in StoreKit 2), then grants entitlement. Cache the latest receipt server-side — users DO get new devices and expect restores.
                    </CalloutBox>
                </div>
            </div>
        </section>
    );
}
