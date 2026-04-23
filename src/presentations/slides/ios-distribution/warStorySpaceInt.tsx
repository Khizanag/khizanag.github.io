import { C, Reveal, SectionLabel, SectionHeading, CalloutBox, InfoCard } from "../../shared.tsx";
import { P } from "./ui.tsx";

/**
 * The ONE intentional placeholder slide in this deck.
 * Fill in real SpaceInt / TBC UZ rejection stories here before the talk.
 * Recommended structure per story:
 *   - Date
 *   - Guideline cited
 *   - What we submitted / what reviewer said
 *   - How we resolved it
 *   - Lesson learned
 */
export function WarStorySpaceIntSection() {
    return (
        <section id="s-war-us" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>OUR OWN WAR STORIES</SectionLabel>
                    <SectionHeading sub="Our turn. Real submissions, real rejections, real resolutions from the TBC UZ team.">
                        Stories from our release history
                    </SectionHeading>
                </Reveal>

                <div style={{
                    padding: "24px 28px", background: C.bg, border: `2px dashed ${P}40`,
                    borderRadius: 14, marginBottom: 32, display: "flex", gap: 16, alignItems: "center",
                }}>
                    <span style={{ fontSize: 28 }}>✏️</span>
                    <div>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: P, letterSpacing: "0.1em", marginBottom: 6 }}>
                            PRESENTER NOTE
                        </div>
                        <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.65 }}>
                            Fill these three cards with real TBC UZ rejection stories before the talk. Check ASC › Resolution Center for raw text of each rejection. Keep customer data anonymized. Three concrete cases › one vague recap.
                        </div>
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
                    <InfoCard color={C.red} tag="CASE #1" title="[Short title of the rejection]">
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.muted, marginBottom: 12, lineHeight: 1.6 }}>
                            <div>Date: ________________</div>
                            <div>Guideline: ________________</div>
                            <div>Version: ________________</div>
                        </div>
                        <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 12 }}>
                            <b style={{ color: C.text }}>What happened:</b> ____________________________________________________________________________________________
                        </p>
                        <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 12 }}>
                            <b style={{ color: C.text }}>How we fixed it:</b> ____________________________________________________________________________________________
                        </p>
                        <div style={{
                            padding: "10px 14px", background: `${P}08`, border: `1px solid ${P}25`,
                            borderLeft: `3px solid ${P}`, borderRadius: 6, fontSize: 12, color: C.text,
                        }}>
                            <b style={{ color: P }}>Lesson:</b> ________________________________________________
                        </div>
                    </InfoCard>

                    <InfoCard color={C.yellow} tag="CASE #2" title="[Short title of the rejection]">
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.muted, marginBottom: 12, lineHeight: 1.6 }}>
                            <div>Date: ________________</div>
                            <div>Guideline: ________________</div>
                            <div>Version: ________________</div>
                        </div>
                        <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 12 }}>
                            <b style={{ color: C.text }}>What happened:</b> ____________________________________________________________________________________________
                        </p>
                        <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 12 }}>
                            <b style={{ color: C.text }}>How we fixed it:</b> ____________________________________________________________________________________________
                        </p>
                        <div style={{
                            padding: "10px 14px", background: `${P}08`, border: `1px solid ${P}25`,
                            borderLeft: `3px solid ${P}`, borderRadius: 6, fontSize: 12, color: C.text,
                        }}>
                            <b style={{ color: P }}>Lesson:</b> ________________________________________________
                        </div>
                    </InfoCard>

                    <InfoCard color={C.accent} tag="CASE #3" title="[Short title of the rejection]">
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.muted, marginBottom: 12, lineHeight: 1.6 }}>
                            <div>Date: ________________</div>
                            <div>Guideline: ________________</div>
                            <div>Version: ________________</div>
                        </div>
                        <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 12 }}>
                            <b style={{ color: C.text }}>What happened:</b> ____________________________________________________________________________________________
                        </p>
                        <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 12 }}>
                            <b style={{ color: C.text }}>How we fixed it:</b> ____________________________________________________________________________________________
                        </p>
                        <div style={{
                            padding: "10px 14px", background: `${P}08`, border: `1px solid ${P}25`,
                            borderLeft: `3px solid ${P}`, borderRadius: 6, fontSize: 12, color: C.text,
                        }}>
                            <b style={{ color: P }}>Lesson:</b> ________________________________________________
                        </div>
                    </InfoCard>
                </div>

                <CalloutBox color={C.accent} icon="📝" label="WHERE TO FIND THE RAW MATERIAL">
                    <b>App Store Connect</b> → Your App → App Store tab → filter by ‘Rejected’. Each has a Resolution Center thread with the exact guideline quote and reviewer comments. We’ve had 50+ submissions; aim for 3 stories with the widest range of lessons.
                </CalloutBox>
            </div>
        </section>
    );
}
