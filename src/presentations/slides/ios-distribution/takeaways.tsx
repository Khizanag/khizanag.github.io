import { C, Reveal, SectionLabel, SectionHeading, CheckItem, CalloutBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function TakeawaysSection() {
    return (
        <section id="s-takeaways" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>THE CHEAT SHEET</SectionLabel>
                    <SectionHeading sub="If you remember one thing from each section, let it be this. Print, pin to your monitor, save your next release.">
                        Takeaways
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
                    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "28px 32px" }}>
                        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: P, marginBottom: 20, letterSpacing: "0.02em" }}>
                            Before every submission
                        </h3>
                        <CheckItem>Check <b>demo account credentials</b> still work — log out & back in from a fresh device.</CheckItem>
                        <CheckItem>Update <b>release notes</b> — Apple reviews them as part of metadata (Guideline 2.3.7).</CheckItem>
                        <CheckItem>Verify <b>Privacy Manifest</b> matches nutrition labels in ASC.</CheckItem>
                        <CheckItem>Screenshots reflect the <b>actual build</b> — reviewers compare.</CheckItem>
                        <CheckItem>Enable <b>phased release</b> — safety net for production.</CheckItem>
                        <CheckItem>Enable <b>manual release</b> — ship only when you’re ready.</CheckItem>
                    </div>

                    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "28px 32px" }}>
                        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: C.red, marginBottom: 20, letterSpacing: "0.02em" }}>
                            Top 5 rejection avoidances
                        </h3>
                        <CheckItem active={false}><b>2.1</b> — broken demo account + missing login = #1 reason.</CheckItem>
                        <CheckItem active={false}><b>2.3.3</b> — screenshots must match actual UI, no fakes.</CheckItem>
                        <CheckItem active={false}><b>4.3</b> — no template clones, no copycat designs.</CheckItem>
                        <CheckItem active={false}><b>5.1.1</b> — Privacy Policy URL must work, ATT must be correct.</CheckItem>
                        <CheckItem active={false}><b>3.1.1</b> — digital goods = IAP only. No Stripe, no Apple Pay.</CheckItem>
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
                    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px 28px" }}>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.muted, letterSpacing: "0.1em", marginBottom: 10 }}>IF YOU’RE AN ENGINEER</div>
                        <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>
                            Your .ipa is a signed zip. Your provisioning profile dies. Your cert dies. Your entitlements must match. Read rejection emails carefully — the clause number tells you exactly where to look in the guidelines.
                        </p>
                    </div>
                    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px 28px" }}>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.muted, letterSpacing: "0.1em", marginBottom: 10 }}>IF YOU’RE PM / BA</div>
                        <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>
                            Budget 24–72h of review time per release. Budget double that for the first release of a new feature. Metadata (screenshots, promotional text, keywords) is reviewed too — treat it as code.
                        </p>
                    </div>
                    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px 28px" }}>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.muted, letterSpacing: "0.1em", marginBottom: 10 }}>IF YOU’RE QA</div>
                        <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>
                            TestFlight builds expire after 90 days. Run ‘first launch’ tests (no prior install, no cached data). Test in airplane mode — reviewers often do. Test demo account on a clean sim.
                        </p>
                    </div>
                </div>

                <CalloutBox color={P} icon="🔗" label="LINKS TO BOOKMARK">
                    <ul style={{ margin: "8px 0 0 20px", color: C.muted, fontSize: 13, lineHeight: 2 }}>
                        <li><b>App Review Guidelines:</b> developer.apple.com/app-store/review/guidelines</li>
                        <li><b>Rejection reasons dashboard:</b> developer.apple.com/app-store/review (top rejection reasons, updated quarterly)</li>
                        <li><b>Privacy Manifest reference:</b> developer.apple.com/documentation/bundleresources/privacy_manifest_files</li>
                        <li><b>App Store Connect API:</b> developer.apple.com/documentation/appstoreconnectapi (automate submissions)</li>
                        <li><b>HIG:</b> developer.apple.com/design/human-interface-guidelines</li>
                        <li><b>WWDC ‘What’s New in App Store Connect’:</b> watch every June</li>
                    </ul>
                </CalloutBox>
            </div>
        </section>
    );
}
