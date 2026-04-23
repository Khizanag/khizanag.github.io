import { C, Reveal, SectionLabel, SectionHeading, CalloutBox, InfoCard, CodeBlock } from "../../shared.tsx";
import { P, TimingBadge } from "./ui.tsx";

export function SigningAutomationSection() {
    return (
        <section id="s-signing-automation" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>
                        SIGNING · AT SCALE <TimingBadge minutes="2:00" color={P} />
                    </SectionLabel>
                    <SectionHeading sub="The signing cluster covered mechanics. This is how teams actually operate them: automatic signing, fastlane match, and the App Store Connect API key that replaces every password you'd rather not commit.">
                        Signing automation — how we actually do it on CI
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
                    <InfoCard icon="🤖" title="Xcode automatic signing" color={P}>
                        <code>-allowProvisioningUpdates</code> lets Xcode re-create certs & profiles on-the-fly. Works great locally; on CI it requires your Apple ID + 2FA — which doesn't survive a headless runner.
                    </InfoCard>
                    <InfoCard icon="🔑" title="App Store Connect API key" color={C.accent}>
                        Replaces the Apple-ID password on CI. Generate in ASC → Users → Keys. JSON Web Token auth. Single <code>.p8</code> file + Issuer ID + Key ID. <b>Store the .p8 in Bitrise secrets, never in git.</b>
                    </InfoCard>
                    <InfoCard icon="📦" title="fastlane match" color={C.yellow}>
                        Stores certs + profiles in a <b>private git repo, AES-encrypted</b> with a team passphrase. Every machine (laptop, CI runner, new hire) runs <code>match</code>, gets the same signed state. The canonical solution since 2017.
                    </InfoCard>
                    <InfoCard icon="☁" title="Cloud Signing (Xcode Cloud)" color={C.purple}>
                        Apple's own CI service: signing assets are <b>never downloaded</b> to your runner. Tightest security model. Trade-off: you lose flexibility (custom build steps, specific macOS versions, non-Apple tooling).
                    </InfoCard>
                </div>

                <CodeBlock filename="bitrise.yml — ASC API key-based signing (our pattern)">
{`steps:
- xcode-archive@5:
    inputs:
    - scheme: "$BITRISE_SCHEME"
    - export_method: "app-store"
    - automatic_code_signing: "api-key"         # ← no Apple-ID-password
    - api_key_path: "$BITRISEIO_API_KEY_URL"
    - api_key_id: "$APP_STORE_CONNECT_API_KEY_ID"
    - api_key_issuer_id: "$APP_STORE_CONNECT_API_ISSUER"

- deploy-to-itunesconnect-deliver@2:
    inputs:
    - api_key_path: "$BITRISEIO_API_KEY_URL"
    - api_key_id:   "$APP_STORE_CONNECT_API_KEY_ID"
    - skip_metadata: "true"                      # upload binary only
    - skip_screenshots: "true"`}
                </CodeBlock>

                <CalloutBox color={C.red} icon="🔐" label="SECURITY RULES WE ACTUALLY ENFORCE">
                    <ul style={{ margin: "6px 0 0 20px", padding: 0, fontSize: 13, color: C.muted, lineHeight: 1.9 }}>
                        <li><b>.p8 key</b> → Bitrise secret + encrypted at rest. Never in git. Never in Slack.</li>
                        <li><b>Key scope</b> → "Developer" role in ASC, not "Admin". Minimal surface.</li>
                        <li><b>Key rotation</b> → quarterly, tracked in shared password manager with expiry calendar.</li>
                        <li><b>Distribution cert</b> → one per team, revoke old ones on departure, never share personal dev cert across CI.</li>
                    </ul>
                </CalloutBox>
            </div>
        </section>
    );
}
