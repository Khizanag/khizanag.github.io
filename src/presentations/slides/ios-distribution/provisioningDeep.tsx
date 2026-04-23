import { C, Reveal, SectionLabel, SectionHeading, FeatureCard, CalloutBox, CodeBlock } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function ProvisioningDeepSection() {
    return (
        <section id="s-provisioning" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>PROVISIONING PROFILES DEEP-DIVE</SectionLabel>
                    <SectionHeading sub="A provisioning profile is not a file you sign — it&rsquo;s a file you SHIP. It travels inside the bundle as embedded.mobileprovision and is re-validated at every launch.">
                        The four profile types + their traps
                    </SectionHeading>
                </Reveal>

                {/* 4 types */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 40 }}>
                    <FeatureCard icon="🧑‍💻" title="Development" color={C.blue} delay={0}
                        description="Signed with Apple Development cert. Lists ≤100 device UDIDs. aps-environment=development. get-task-allow=true (so lldb can attach). Expires: 1 year." />
                    <FeatureCard icon="📦" title="Ad Hoc" color={C.purple} delay={0.06}
                        description="Signed with Apple Distribution cert. Lists ≤100 device UDIDs. aps-environment=production. Used for &lsquo;internal beta&rsquo; installs pre-TestFlight. Expires: 1 year." />
                    <FeatureCard icon="🚀" title="App Store" color={C.accent} delay={0.12}
                        description="Signed with Apple Distribution cert. No device list — any device. aps-environment=production. ONLY installs via App Store / TestFlight channel (kernel enforces). Expires: 1 year from sign, but re-signed on every release." />
                    <FeatureCard icon="🏢" title="In-House (Enterprise)" color={C.red} delay={0.18}
                        description="Signed with Apple Enterprise Distribution cert. No device list. aps-environment=production. Installable on ANY iPhone via MDM/direct link. Expires: 1 year. Revocable by Apple instantly." />
                </div>

                {/* Mechanics */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 16 }}>
                    What&rsquo;s inside a .mobileprovision
                </div>
                <CodeBlock filename="security cms -D -i embedded.mobileprovision">{`&lt;plist version="1.0"&gt;
&lt;dict&gt;
    &lt;key&gt;AppIDName&lt;/key&gt;              &lt;string&gt;TBC UZ Prod&lt;/string&gt;
    &lt;key&gt;ApplicationIdentifierPrefix&lt;/key&gt;  &lt;array&gt;&lt;string&gt;ABCD1234EF&lt;/string&gt;&lt;/array&gt;
    &lt;key&gt;CreationDate&lt;/key&gt;           &lt;date&gt;2026-04-01T08:00:00Z&lt;/date&gt;
    &lt;key&gt;ExpirationDate&lt;/key&gt;         &lt;date&gt;2027-04-01T08:00:00Z&lt;/date&gt;
    &lt;key&gt;Platform&lt;/key&gt;               &lt;array&gt;&lt;string&gt;iOS&lt;/string&gt;&lt;/array&gt;
    &lt;key&gt;DeveloperCertificates&lt;/key&gt;  &lt;array&gt; [DER-encoded cert] &lt;/array&gt;
    &lt;key&gt;Entitlements&lt;/key&gt;
    &lt;dict&gt;
        &lt;key&gt;application-identifier&lt;/key&gt;       &lt;string&gt;ABCD1234EF.uz.tbc.digital&lt;/string&gt;
        &lt;key&gt;aps-environment&lt;/key&gt;              &lt;string&gt;production&lt;/string&gt;
        &lt;key&gt;com.apple.developer.team-identifier&lt;/key&gt;  &lt;string&gt;ABCD1234EF&lt;/string&gt;
        &lt;key&gt;get-task-allow&lt;/key&gt;               &lt;false/&gt;     ← distribution: NO debugger
        &lt;key&gt;keychain-access-groups&lt;/key&gt;       &lt;array&gt;&lt;string&gt;ABCD1234EF.*&lt;/string&gt;&lt;/array&gt;
    &lt;/dict&gt;
    &lt;key&gt;ProvisionedDevices&lt;/key&gt;     &lt;!-- absent for App Store profile --&gt;
    &lt;key&gt;TeamIdentifier&lt;/key&gt;         &lt;array&gt;&lt;string&gt;ABCD1234EF&lt;/string&gt;&lt;/array&gt;
    &lt;key&gt;TeamName&lt;/key&gt;               &lt;string&gt;JSCB TBC Bank&lt;/string&gt;
    &lt;key&gt;UUID&lt;/key&gt;                   &lt;string&gt;8F3B...&lt;/string&gt;
&lt;/dict&gt;
&lt;/plist&gt;`}</CodeBlock>

                {/* Wildcard vs explicit */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginTop: 40, marginBottom: 16 }}>
                    Wildcard vs explicit App ID
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
                    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px" }}>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: C.accent, marginBottom: 8 }}>Wildcard: <code>uz.tbc.*</code></div>
                        <ul style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.8, paddingLeft: 18, margin: 0 }}>
                            <li>Convenient for early dev — one profile covers many bundle IDs</li>
                            <li>Cannot use: Push Notifications, App Groups, In-App Purchase, Apple Pay, iCloud, HealthKit, HomeKit, Associated Domains, Sign in with Apple</li>
                            <li>In practice: useless past week 1 of a real app</li>
                        </ul>
                    </div>
                    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px" }}>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: P, marginBottom: 8 }}>Explicit: <code>uz.tbc.digital</code></div>
                        <ul style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.8, paddingLeft: 18, margin: 0 }}>
                            <li>Required for all capability entitlements</li>
                            <li>One-to-one with a CFBundleIdentifier — rename the app, re-register the ID</li>
                            <li>Keychain access groups are scoped to the exact team+bundle — changing either breaks Face ID / stored credentials after reinstall</li>
                        </ul>
                    </div>
                </div>

                {/* Expiry & renewal */}
                <div style={{ marginBottom: 32 }}>
                    <CalloutBox color={C.yellow} icon="⏰" label="PROFILE EXPIRY — THE 1-YEAR TRAP">
                        Profiles expire on the anniversary of creation, <b>not the cert expiration</b>. Apple re-signs the embedded profile on every App Store download — so shipped builds don&rsquo;t break. But: <b>locally-signed Ad Hoc builds</b> (TestFlight alternatives, Bitrise internal distribution) stop installing exactly 365 days from profile creation. Automate profile regeneration into CI, or wake up to Slack fire-drill.
                    </CalloutBox>
                </div>

                <CalloutBox color={C.red} icon="🚨" label="THE TWO 'PROFILE DOESN&rsquo;T MATCH' BUGS EVERY SENIOR HITS">
                    <b>(1)</b> Team ID changed (acquisition, reorg). All old profiles invalid overnight — re-enroll. <b>(2)</b> Keychain access group mismatch between app + extension: Share Extension can&rsquo;t read tokens the main app stored. Solution: explicit <code>$(AppIdentifierPrefix)uz.tbc.shared</code> in both targets&rsquo; entitlements.
                </CalloutBox>
            </div>
        </section>
    );
}
