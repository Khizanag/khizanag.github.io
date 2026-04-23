import { C, Reveal, SectionLabel, SectionHeading, CalloutBox, CodeBlock, InfoCard } from "../../shared.tsx";
import { P, TimingBadge } from "./ui.tsx";

export function UniversalLinksSection() {
    return (
        <section id="s-universal-links" style={{ padding: "96px 48px", background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>
                        UNIVERSAL LINKS · AASA <TimingBadge minutes="1:30" color={P} />
                    </SectionLabel>
                    <SectionHeading sub="The modern way to deep-link into your app. Unlike URL schemes, a Universal Link falls back to Safari if the app isn't installed — and it survives Messages/Mail/WhatsApp link-stripping.">
                        Universal Links — the entitlement that quietly runs on every launch
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
                    <InfoCard icon="🔗" title="Entitlement + domain" color={P}>
                        <code>com.apple.developer.associated-domains</code> lists <code>applinks:yourdomain.com</code>. The app claims the domain; iOS verifies ownership before routing.
                    </InfoCard>
                    <InfoCard icon="📋" title="AASA file" color={C.accent}>
                        Host <code>apple-app-site-association</code> at <code>https://yourdomain.com/.well-known/</code> — JSON, <b>no .json extension</b>, served as <code>application/json</code>, no redirects, HTTPS only.
                    </InfoCard>
                    <InfoCard icon="🔄" title="CDN cache is your enemy" color={C.yellow}>
                        Apple fetches AASA <b>at app install</b>, then caches it via the Apple CDN for up to a week. Changing AASA propagates slowly. Use <code>?mode=developer</code> via <b>swcutil diagnose</b> to force-refresh in dev.
                    </InfoCard>
                    <InfoCard icon="🧪" title="Review notes" color={C.red}>
                        Reviewers <b>do</b> test deep links. Include sample URLs in Review Notes (signup flow, password-reset link, campaign URL). Missing = 2.1 incomplete-functionality rejection.
                    </InfoCard>
                </div>

                <div style={{ marginBottom: 24 }}>
                    <CodeBlock filename="/.well-known/apple-app-site-association (served at https://...)">
{`{
  "applinks": {
    "details": [
      {
        "appIDs": ["ABC1234567.com.spaceint.app"],
        "components": [
          { "/": "/pay/*",     "comment": "P2P transfers" },
          { "/": "/loan/*",    "comment": "Loan applications" },
          { "/": "/card/*",    "?": { "action": "block" }, "comment": "Card block action" },
          { "/": "/*",         "exclude": true }
        ]
      }
    ]
  },
  "webcredentials": {
    "apps": ["ABC1234567.com.spaceint.app"]
  }
}`}
                    </CodeBlock>
                </div>

                <CalloutBox color={P} icon="💡" label="CALLBACK TO THE ENTITLEMENTS MATRIX">
                    <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.65 }}>
                        <code>com.apple.developer.associated-domains</code> was row 2 in the matrix — marked <b>Auto</b>. That's misleading: no human approval, but the <b>AASA handshake</b> itself is the gatekeeper. Failed handshake = no universal links, and reviewers will notice during password-reset testing.
                    </p>
                </CalloutBox>
            </div>
        </section>
    );
}
