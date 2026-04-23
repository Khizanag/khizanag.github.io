import { C, Reveal, SectionLabel, SectionHeading, CalloutBox } from "../../shared.tsx";
import { P } from "./ui.tsx";
import { TimingBadge } from "./ui.tsx";

interface Branch {
    trigger: string;
    action: string;
    time: string;
    color: string;
    note: string;
}

const BRANCHES: Branch[] = [
    {
        trigger: "Metadata-only reject (screenshots, description, copy)",
        action: "Fix in ASC → resubmit metadata only — no new build needed",
        time: "<2 h re-review",
        color: C.accent,
        note: "Fastest path. Keep copy changes surgical; changing the binary forces a full re-review.",
    },
    {
        trigger: "Guideline 2.1 — demo account broken / flow incomplete",
        action: "Reply in Resolution Center with exact steps + fresh credentials + screen recording",
        time: "typically same day",
        color: C.blue,
        note: "Don't resubmit the build. Reply first — reviewers often re-test within hours.",
    },
    {
        trigger: "Reviewer cited a guideline you believe doesn't apply",
        action: "Resolution Center clarification → if denied, file App Review Board appeal",
        time: "Appeal: 1–4 weeks",
        color: C.yellow,
        note: "State your case technically. Cite specific guideline sub-points. Appeals reverse ~20–25% of cases.",
    },
    {
        trigger: "Binary bug found post-approval, pre-release",
        action: "Reject own binary → upload fix → new review",
        time: "fresh 24–48 h",
        color: C.yellow,
        note: "You can withdraw an approved build before release. Cheaper than a crash-rate pause later.",
    },
    {
        trigger: "Crash/regression discovered AFTER release",
        action: "Pause phased release (ASC → Pricing & Availability)",
        time: "immediate",
        color: C.red,
        note: "Buys you days. Auto-pauses if crash rate exceeds Apple's threshold. Override requires manager.",
    },
    {
        trigger: "Critical security/regulatory issue, every hour matters",
        action: "Expedited Review Request — explain cause + user impact",
        time: "8–24 h approval",
        color: C.red,
        note: "Burn quota carefully. Public-holiday launches + security patches are accepted. 'Marketing campaign' is not.",
    },
    {
        trigger: "Account suspended / in review hold for multiple weeks",
        action: "Email tim@apple.com + phil@apple.com with full context",
        time: "1–7 days response",
        color: C.purple,
        note: "Last-resort escalation. Exec email works for legitimate cases — sparingly.",
    },
];

export function WhenReviewGoesWrongSection() {
    return (
        <section id="s-review-wrong" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.red}>
                        ACT 03 · DECISION TREE <TimingBadge minutes="2:30" color={C.red} />
                    </SectionLabel>
                    <SectionHeading sub="Rejection isn't the end of a flow — it's a fork. The right next move depends on what Apple said, when, and how much production impact you have.">
                        When review goes wrong — what to do next
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {BRANCHES.map((b, i) => (
                        <div
                            key={i}
                            style={{
                                display: "grid",
                                gridTemplateColumns: "40px 1fr 220px",
                                gap: 18, alignItems: "stretch",
                                background: C.surface, border: `1px solid ${b.color}25`,
                                borderLeft: `3px solid ${b.color}`, borderRadius: 10,
                                padding: "18px 20px",
                            }}
                        >
                            <div style={{
                                fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                                color: b.color, letterSpacing: "0.15em", fontWeight: 700,
                                display: "flex", alignItems: "center",
                            }}>
                                {String(i + 1).padStart(2, "0")}
                            </div>
                            <div>
                                <div style={{ fontSize: 13, color: C.text, fontWeight: 700, marginBottom: 6 }}>
                                    {b.trigger}
                                </div>
                                <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.55, marginBottom: 6 }}>
                                    → {b.action}
                                </div>
                                <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.55, fontStyle: "italic" }}>
                                    {b.note}
                                </div>
                            </div>
                            <div style={{
                                display: "flex", alignItems: "center", justifyContent: "flex-end",
                                fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                                color: b.color, letterSpacing: "0.1em", fontWeight: 700,
                            }}>
                                ⏱ {b.time}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: 28 }}>
                    <CalloutBox color={P} icon="💡" label="THE META-RULE">
                        <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.65 }}>
                            <b>Reply before you resubmit.</b> The Resolution Center is a real 2-way channel with a human reviewer. A respectful, specific, evidence-backed reply resolves ~60% of rejections without a new build — and preserves your metadata state.
                        </p>
                    </CalloutBox>
                </div>
            </div>
        </section>
    );
}
