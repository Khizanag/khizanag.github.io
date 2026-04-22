import { C, Reveal, SectionLabel, SectionHeading, CalloutBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

const PHASES = [
    { day: "Day 1", pct: 1, users: "18K" },
    { day: "Day 2", pct: 2, users: "36K" },
    { day: "Day 3", pct: 5, users: "90K" },
    { day: "Day 4", pct: 10, users: "180K" },
    { day: "Day 5", pct: 20, users: "360K" },
    { day: "Day 6", pct: 50, users: "900K" },
    { day: "Day 7", pct: 100, users: "1.8M" },
];

export function PhasedReleaseSection() {
    return (
        <section id="s-phased" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>PHASED RELEASE</SectionLabel>
                    <SectionHeading sub="The safety net between &lsquo;release&rsquo; and &lsquo;global reach&rsquo;. Built into App Store Connect, free, rarely used well.">
                        Rolling out over 7 days
                    </SectionHeading>
                </Reveal>

                <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "40px 48px", marginBottom: 32 }}>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 12, marginBottom: 32, height: 200 }}>
                        {PHASES.map((p, i) => (
                            <div key={p.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                                <div style={{
                                    fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: P,
                                }}>
                                    {p.pct}%
                                </div>
                                <div style={{
                                    width: "100%", height: `${Math.max(p.pct, 3) * 1.6}px`,
                                    background: `linear-gradient(180deg, ${P} 0%, ${P}60 100%)`,
                                    borderRadius: "6px 6px 0 0", position: "relative",
                                    animation: `fadeUp 0.6s ease ${i * 0.08}s both`,
                                }} />
                                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.muted, letterSpacing: "0.05em" }}>
                                    {p.day}
                                </div>
                                <div style={{ fontSize: 10, color: C.subtle }}>
                                    ~{p.users} users
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ fontSize: 12, color: C.muted, textAlign: "center", fontStyle: "italic" }}>
                        Example: an app with 1.8M total users. Only 18K see day-1 build. <b>Window to catch crashes before they hit everyone.</b>
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                    <CalloutBox color={C.accent} icon="✓" label="WHAT YOU CAN DO">
                        <b>Pause</b> phased release at any day (manual in ASC). <b>Resume</b> when fixed. <b>Re-submit</b> a new version to replace the paused one. Crash reports keep flowing the whole time.
                    </CalloutBox>
                    <CalloutBox color={C.red} icon="✕" label="WHAT YOU CAN'T DO">
                        <b>Roll back</b> to a previous version — Apple does not support this. The only &lsquo;rollback&rsquo; is submitting the old version as a new build with a higher build number, via expedited review.
                    </CalloutBox>
                    <CalloutBox color={C.yellow} icon="⚠" label="WHEN IT DOESN'T HELP">
                        Server-side bugs don't care about phased rollout. New entitlements (Push, Sign-in-with-Apple env) flip instantly for everyone. Only binary-level regressions are contained.
                    </CalloutBox>
                </div>
            </div>
        </section>
    );
}
