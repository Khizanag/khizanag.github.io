import { C, Reveal, SectionLabel, SectionHeading, WorkflowStep, CalloutBox } from "../../shared.tsx";
import { P, StatBlock } from "./ui.tsx";

export function ReviewProcessSection() {
    return (
        <section id="s-review" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>APP STORE REVIEW</SectionLabel>
                    <SectionHeading sub="The black box that decides whether your work reaches users. Here’s what actually happens inside it.">
                        How the review actually works
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 48 }}>
                    <StatBlock value="~500" label="Reviewers worldwide" color={P} delay={0} />
                    <StatBlock value="~100K" label="Submissions per week" color={C.purple} delay={0.05} />
                    <StatBlock value="50%" label="Reviewed < 24h" color={C.accent} delay={0.1} />
                    <StatBlock value="90%" label="Reviewed < 48h" color={C.yellow} delay={0.15} />
                </div>

                <Reveal>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: C.text, marginBottom: 20 }}>
                        The five phases of review
                    </h3>
                </Reveal>

                <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "40px 48px", marginBottom: 32 }}>
                    <WorkflowStep n={1} total={5} title="Automated validation (minutes)" color={P} delay={0}>
                        Static analysis of the .ipa. Bundle ID, signing, entitlements, minimum OS version, app size, required device capabilities, Privacy Manifest completeness. If any of this fails, you’re rejected before a human sees it.
                    </WorkflowStep>
                    <WorkflowStep n={2} total={5} title="Metadata review (minutes)" color={C.purple} delay={0.1}>
                        Screenshots, app name, description, keywords, age rating, privacy disclosures. Automated + human. Misleading screenshots is the #1 metadata rejection.
                    </WorkflowStep>
                    <WorkflowStep n={3} total={5} title="Functional review (hours)" color={C.yellow} delay={0.2}>
                        A human reviewer installs the app on a physical iPhone/iPad. Logs in with any credentials you provide, tries core flows, taps around. They follow a checklist but also use judgement. This is where most rejections happen.
                    </WorkflowStep>
                    <WorkflowStep n={4} total={5} title="Guideline check (during functional)" color={C.red} delay={0.3}>
                        Reviewer matches what they see to App Review Guidelines 1.0–5.6. If a flag is raised, they attach the specific guideline number to the rejection.
                    </WorkflowStep>
                    <WorkflowStep n={5} total={5} title="Decision & release" color={C.accent} delay={0.4}>
                        Approved → you get to release (manual, scheduled, or phased). Rejected → Resolution Center message with guideline citation. You can fix & resubmit, or appeal to the App Review Board.
                    </WorkflowStep>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
                    <CalloutBox color={C.yellow} icon="⚡" label="EXPEDITED REVIEW">
                        Apple grants ~1–2 expedited reviews per year per team for genuine emergencies — critical bug affecting many users, time-sensitive event. Abuse it and they stop granting. Request via the Contact Us form in ASC; expect a human response within ~4h.
                    </CalloutBox>

                    <CalloutBox color={C.red} icon="⚖" label="APP REVIEW BOARD">
                        If you disagree with a rejection, you can appeal to the App Review Board. In practice: respond politely in Resolution Center first. Appeals work best for guideline interpretation disputes, not “I forgot to implement it.”
                    </CalloutBox>
                </div>

                <CalloutBox color={P} icon="🎯" label="WHAT REVIEWERS ACTUALLY DO">
                    Public interviews with former App Reviewers describe a <b>queue-based system</b> where each reviewer gets ~50–100 apps per day, uses a standardized test device, has a scripted checklist, and can escalate edge cases to specialists (e.g., financial apps, health apps, kids apps). The “automated” pieces are pre-checks; humans do the actual judgement.
                </CalloutBox>
            </div>
        </section>
    );
}
