import { C, Reveal, SectionLabel, SectionHeading, CalloutBox } from "../../shared.tsx";
import { P, ComparisonRow } from "./ui.tsx";

export function ChannelsSection() {
    return (
        <section id="s-channels" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>DISTRIBUTION CHANNELS</SectionLabel>
                    <SectionHeading sub="Five ways to put an iOS app on a device. Each has a different audience, review bar, and install limit.">
                        Five channels, compared
                    </SectionHeading>
                </Reveal>

                <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden", marginBottom: 32 }}>
                    <div style={{
                        display: "grid", gridTemplateColumns: "200px repeat(5, 1fr)",
                        background: C.bg, borderBottom: `1px solid ${C.border}`,
                    }}>
                        <div style={{ padding: "14px 16px", borderRight: `1px solid ${C.border}` }} />
                        {[
                            { label: "Local Run",         color: C.muted },
                            { label: "Ad Hoc",            color: C.yellow },
                            { label: "TF Internal",       color: P },
                            { label: "TF External",       color: C.purple },
                            { label: "App Store",         color: C.accent },
                        ].map((h, i, arr) => (
                            <div
                                key={h.label}
                                style={{
                                    padding: "14px 16px", borderRight: i < arr.length - 1 ? `1px solid ${C.border}` : "none",
                                    fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, color: h.color,
                                    letterSpacing: "0.08em",
                                }}
                            >
                                {h.label}
                            </div>
                        ))}
                    </div>

                    <ComparisonRow label="AUDIENCE" cells={[
                        "1 dev, own device",
                        "Up to 100 devices by UDID",
                        "100 testers on your team",
                        "10,000 external testers",
                        "Everyone, globally",
                    ]} />
                    <ComparisonRow label="APPLE REVIEW?" cells={[
                        "No",
                        "No",
                        "No",
                        "Light review (~24h)",
                        <b style={{ color: C.red }}>Full review</b>,
                    ]} />
                    <ComparisonRow label="TYPICAL WAIT" cells={[
                        "Instant (USB/Wi-Fi)",
                        "Instant",
                        "~15 min after upload",
                        "24h first build, instant after",
                        "24h median, 7d worst",
                    ]} />
                    <ComparisonRow label="BUILD EXPIRY" cells={[
                        "7 days (free acct)",
                        "1 year",
                        "90 days",
                        "90 days",
                        "No expiry",
                    ]} />
                    <ComparisonRow label="SIGNING" cells={[
                        "Development",
                        "Ad-Hoc",
                        "App Store",
                        "App Store",
                        "App Store",
                    ]} />
                    <ComparisonRow label="CRASH REPORTS" cells={[
                        "Xcode only",
                        "None",
                        "Automatic to ASC",
                        "Automatic to ASC",
                        "Automatic to ASC",
                    ]} />
                    <ComparisonRow label="FEEDBACK CAPTURE" cells={[
                        "—",
                        "—",
                        <b style={{ color: C.accent }}>Screenshots + text</b>,
                        <b style={{ color: C.accent }}>Screenshots + text</b>,
                        "App reviews (public)",
                    ]} />
                    <ComparisonRow label="USE CASE" cells={[
                        "Daily dev",
                        "Legacy; rarely used today",
                        "Devs, QA, PMs",
                        "Beta testers, stakeholders",
                        "Public release",
                    ]} />
                </div>

                <CalloutBox color={P} icon="💡" label="A USEFUL MENTAL MODEL">
                    Walk up the ladder: <b>Local &rarr; Ad Hoc &rarr; TF Internal &rarr; TF External &rarr; App Store</b>. Each step reaches more people and adds more review. We ship to TF Internal on every master commit, promote to TF External weekly, submit to App Store every 2&ndash;3 weeks.
                </CalloutBox>
            </div>
        </section>
    );
}
