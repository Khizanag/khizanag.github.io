import { C, Reveal, SectionLabel, SectionHeading, CalloutBox, CodeBlock, PlainEnglishBox } from "../../shared.tsx";
import { P, TimingBadge } from "./ui.tsx";

export function AtsSection() {
    return (
        <section id="s-ats" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>
                        APP TRANSPORT SECURITY <TimingBadge minutes="1:30" color={P} />
                    </SectionLabel>
                    <SectionHeading sub="Since iOS 9 (2015), every URLSession call must go over HTTPS with TLS 1.2+ and a modern cipher suite. Banking apps especially see this daily — and the wrong exception is a 5.1.1 rejection.">
                        ATS — Apple's on-by-default TLS firewall
                    </SectionHeading>
                </Reveal>

                <PlainEnglishBox color={P}>
                    ATS is Apple's answer to "some developer shipped an app that pings <code>http://api.example.com</code>". It's a policy layer <b>above URLSession</b> that refuses weak TLS at build time. You can add exceptions — but every exception must be justified to review.
                </PlainEnglishBox>

                <div style={{ margin: "32px 0" }}>
                    <CodeBlock filename="Info.plist — per-domain exceptions (do not use NSAllowsArbitraryLoads in prod)">
{`<key>NSAppTransportSecurity</key>
<dict>
  <!-- ❌ REJECTED on submission: blanket exception -->
  <!-- <key>NSAllowsArbitraryLoads</key><true/> -->

  <!-- ✅ ACCEPTED: narrow, justified per-domain exception -->
  <key>NSExceptionDomains</key>
  <dict>
    <key>legacy-partner.example.com</key>
    <dict>
      <key>NSExceptionMinimumTLSVersion</key><string>TLSv1.1</string>
      <key>NSIncludesSubdomains</key><true/>
    </dict>
  </dict>
</dict>`}
                    </CodeBlock>
                </div>

                <CalloutBox color={C.red} icon="🚫" label="REVIEW NOTES REQUIREMENT">
                    <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.65 }}>
                        Any <code>NSExceptionDomains</code> entry needs a written justification in Review Notes ("TLS 1.0 legacy partner, upgrade planned Q3"). <code>NSAllowsArbitraryLoads=true</code> is rejected unless you've been explicitly granted — in practice, only WebView-heavy browsers.
                    </p>
                </CalloutBox>

                <CalloutBox color={C.yellow} icon="🏦" label="BANKING CONTEXT">
                    <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.65 }}>
                        Typical TBC pattern: zero exceptions in production, all backend endpoints on TLS 1.3 + public-key pinning via <code>URLSession</code> delegates. Certificate pinning is <b>not</b> a review issue — it's an auth concern handled at the app layer.
                    </p>
                </CalloutBox>
            </div>
        </section>
    );
}
