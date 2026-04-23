import { C, Reveal, SectionLabel, SectionHeading, CalloutBox, InfoCard, CodeBlock } from "../../shared.tsx";
import { P, TimingBadge } from "./ui.tsx";

export function PushOperationalSection() {
    return (
        <section id="s-push-ops" style={{ padding: "96px 48px", background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>
                        PUSH · OPERATIONAL REALITY <TimingBadge minutes="2:00" color={P} />
                    </SectionLabel>
                    <SectionHeading sub="The previous slide covered entitlements + APNs topology. This one is what breaks in production — token rotation, silent-push rejections, critical alerts, and why review keeps failing your notifications flow.">
                        Push — the operational half nobody warns you about
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
                    <InfoCard icon="🔄" title="Token rotation" color={P}>
                        APNs device tokens <b>are not stable</b>. They rotate on restore-from-backup, OS upgrade, re-install, and sometimes for no reason. Your backend must upsert on every <code>didRegisterForRemoteNotificationsWithDeviceToken</code> — never dedupe by user ID alone.
                    </InfoCard>
                    <InfoCard icon="🤫" title="Silent pushes (content-available: 1)" color={C.yellow}>
                        Throttled by iOS to <b>2–3 per hour</b> per app, ignored entirely in Low Power Mode, and <b>reviewers reject apps that use them for marketing</b> (Guideline 4.5.4). Use <code>background-fetch</code> or BGTaskScheduler for non-urgent updates.
                    </InfoCard>
                    <InfoCard icon="🚨" title="Critical Alerts" color={C.red}>
                        Bypass Do Not Disturb + ringer silent. Requires a <b>separate Apple request form</b> + justification (medical, life-safety, home-security). Turnaround 4–12 weeks. Misuse → entitlement revoked mid-release.
                    </InfoCard>
                    <InfoCard icon="⚡" title="Time-sensitive + Live Activities" color={C.accent}>
                        iOS 15+ interruption levels (<code>passive · active · time-sensitive · critical</code>). Live Activities use the <b>push-type: liveactivity</b> topic and have a separate APNs token. Both need <code>UNTimeSensitive</code> entitlement declared in Info.plist.
                    </InfoCard>
                </div>

                <div style={{ marginBottom: 24 }}>
                    <CodeBlock filename="SendPush.swift — modern APNs topic routing">
{`// Different push types = different topics on the SAME cert
// topic = bundleID + suffix — getting this wrong = silent drop

"apns-topic": "com.spaceint.app"                  // standard alert
"apns-topic": "com.spaceint.app.voip"              // PushKit VoIP (separate cert)
"apns-topic": "com.spaceint.app.complication"      // watchOS complication
"apns-topic": "com.spaceint.app.push-type.liveactivity"  // Live Activity

// Priority: 10 = immediate delivery, 5 = power-efficient, 1 = background
// Expiration: 0 = do-not-store-if-offline, N seconds = TTL
// Collapse-id: replaces prior unread push with same id`}
                    </CodeBlock>
                </div>

                <CalloutBox color={C.red} icon="🚫" label="TOP 3 REVIEW REJECTIONS FOR PUSH">
                    <ol style={{ margin: "6px 0 0 20px", padding: 0, fontSize: 13, color: C.muted, lineHeight: 1.9 }}>
                        <li><b>4.5.4</b> — silent push used to fetch marketing payloads. Use the scheduler API.</li>
                        <li><b>5.1.1</b> — asking for notification permission before showing why. Use a pre-prompt screen.</li>
                        <li><b>Mismatched aps-environment</b> — dev profile + prod APNs (or vice versa). <code>BadDeviceToken</code> in logs is the tell.</li>
                    </ol>
                </CalloutBox>
            </div>
        </section>
    );
}
