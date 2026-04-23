import { C, Reveal, SectionLabel, SectionHeading, CalloutBox, InfoCard } from "../../shared.tsx";
import { P, TimingBadge } from "./ui.tsx";

const RATINGS = [
    { rating: "4+", ceiling: "Minimal cartoon violence. Social networks without user-gen content risk a bump.", color: C.accent },
    { rating: "9+", ceiling: "Infrequent fantasy violence, mild crude humor.", color: C.blue },
    { rating: "12+", ceiling: "Infrequent realistic violence, suggestive themes, simulated gambling.", color: C.yellow },
    { rating: "17+", ceiling: "Frequent intense violence, mature themes, unrestricted web access, user-gen content.", color: C.red },
];

export function RegionRatingSection() {
    return (
        <section id="s-region-rating" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>
                        REGIONS · RATINGS · CONTENT <TimingBadge minutes="1:30" color={P} />
                    </SectionLabel>
                    <SectionHeading sub="The App Store is not one market — it's 175 storefronts with regional laws, ratings, and content rules. Getting the matrix wrong is a silent growth killer.">
                        175 storefronts, 175 sets of rules
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
                    <InfoCard icon="🌍" title="Storefronts" color={P}>
                        <b>175 countries/regions</b>, each with its own editorial team, featured slots, and localization requirements. You don't have to ship to all — select per-region in ASC → Pricing & Availability.
                    </InfoCard>
                    <InfoCard icon="🇯🇵" title="Japan / Korea game-gambling" color={C.red}>
                        Gacha mechanics, loot boxes, and skill-vs-chance payouts trigger <b>separate review + disclosure</b> in JP/KR storefronts. Common cause of region-specific rejection.
                    </InfoCard>
                    <InfoCard icon="🇨🇳" title="China mainland" color={C.yellow}>
                        Requires an <b>ICP filing</b> (mainland China internet content provider license) before distribution. Cloud gaming, VPN, and user-gen-content apps face stricter review.
                    </InfoCard>
                </div>

                <div style={{
                    background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12,
                    padding: "20px 24px", marginBottom: 24,
                }}>
                    <div style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                        color: C.muted, letterSpacing: "0.12em", marginBottom: 12,
                    }}>
                        AGE RATING CEILINGS (UK / US COMBINED)
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                        {RATINGS.map((r) => (
                            <div
                                key={r.rating}
                                style={{
                                    padding: "18px 20px", background: C.bg,
                                    border: `1px solid ${r.color}25`, borderLeft: `3px solid ${r.color}`,
                                    borderRadius: 8,
                                }}
                            >
                                <div style={{
                                    fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20,
                                    color: r.color, marginBottom: 6,
                                }}>
                                    {r.rating}
                                </div>
                                <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.55 }}>
                                    {r.ceiling}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <CalloutBox color={C.yellow} icon="💬" label="ASK QUESTIONNAIRE HONESTLY">
                    <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.65 }}>
                        ASC → Age Rating → 15-question questionnaire. If you say your app has "no user-gen content" and reviewers find user-submitted comments in a screenshot, auto-reject for 2.3.1 (dishonest metadata). For banking apps — "infrequent/mild simulated gambling" triggers if you show lottery-winner feeds or promo wheels.
                    </p>
                </CalloutBox>
            </div>
        </section>
    );
}
