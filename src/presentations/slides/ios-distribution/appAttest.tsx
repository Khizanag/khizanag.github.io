import { C, Reveal, SectionLabel, SectionHeading, CalloutBox, InfoCard, CodeBlock, PlainEnglishBox } from "../../shared.tsx";
import { P, TimingBadge } from "./ui.tsx";

export function AppAttestSection() {
    return (
        <section id="s-app-attest" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>
                        APP ATTEST · DEVICECHECK <TimingBadge minutes="2:00" color={P} />
                    </SectionLabel>
                    <SectionHeading sub="Two Apple-provided APIs that let your backend prove a request came from an uncompromised, genuine copy of your app — without identifying the user. Every banking app on iOS uses one or both.">
                        Proving the client is your client
                    </SectionHeading>
                </Reveal>

                <PlainEnglishBox color={P}>
                    The problem: a clever attacker builds a re-signed / modified copy of your <code>.ipa</code> and points it at your API. How does your backend tell the difference? <b>App Attest</b> answers it with a cryptographic assertion signed inside the Secure Enclave.
                </PlainEnglishBox>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, margin: "32px 0" }}>
                    <InfoCard icon="🧬" title="App Attest (iOS 14+)" color={P}>
                        <b>Per-install keypair</b> generated in the Secure Enclave. Apple attests the public key came from a genuine build of your app. You sign every backend request with the private key; backend verifies with Apple's public certificate chain.
                    </InfoCard>
                    <InfoCard icon="🏷" title="DeviceCheck (iOS 11+)" color={C.yellow}>
                        <b>2 bits of device-persisted state</b>, written by you, readable by Apple. Used for fraud signals ("has this device abused our trial before?"). Survives re-install; resets on full device reset.
                    </InfoCard>
                    <InfoCard icon="🏦" title="Banking use cases" color={C.accent}>
                        Block rooted-device KYC flows, gate high-value transfers on attestation success, detect emulator + re-packaged clones, throttle suspected fraud devices without user-identifiable telemetry.
                    </InfoCard>
                    <InfoCard icon="⚠" title="Gotchas" color={C.red}>
                        Attest <b>rate-limited</b> by Apple (few hundred per day per install). Keys are <b>bound to the install</b> — restore-from-backup keeps them, but re-install starts fresh. Plan for bootstrap latency.
                    </InfoCard>
                </div>

                <CodeBlock filename="Attestation.swift — generating an assertion">
{`import DeviceCheck

let service = DCAppAttestService.shared
guard service.isSupported else { return }  // iOS < 14 or Mac Catalyst

service.generateKey { keyId, error in
    guard let keyId else { return }
    // 1. Send keyId + challenge to your backend → receive nonce
    service.attestKey(keyId, clientDataHash: nonceHash) { attestation, _ in
        // 2. Send attestation blob to backend → backend verifies with Apple CA
    }
    // 3. For every subsequent API call:
    service.generateAssertion(keyId, clientDataHash: requestHash) { assertion, _ in
        // assertion is a signed blob the backend verifies
    }
}`}
                </CodeBlock>

                <CalloutBox color={P} icon="💡" label="DISTRIBUTION IMPACT">
                    <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.65 }}>
                        App Attest is not gated in App Review — no special form. But it does depend on the exact bundle ID + team ID your build was signed with. <b>TestFlight and App Store builds generate different attestations than Ad-Hoc / Enterprise</b>. Your backend must accept all production-signed build variants or block legit testers.
                    </p>
                </CalloutBox>
            </div>
        </section>
    );
}
