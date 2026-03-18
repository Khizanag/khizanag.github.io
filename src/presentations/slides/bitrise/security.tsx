import { C, Reveal, SectionLabel, SectionHeading } from "../../shared.jsx";
import { StatBadge, RiskRow } from "./ui.jsx";

export function SecuritySection() {
  return (
    <section id="s-security" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel color={C.red}>SECURITY ANALYSIS</SectionLabel>
          <SectionHeading sub="7 risks identified based on OWASP CI/CD Top 10. 1 critical — fully mitigable.">
            What we must protect against
          </SectionHeading>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 48 }}>
          <StatBadge value="1" label="CRITICAL" color={C.red}    delay={0}    />
          <StatBadge value="2" label="HIGH"     color="#ff8c42"  delay={0.08} />
          <StatBadge value="2" label="MEDIUM"   color={C.yellow} delay={0.16} />
          <StatBadge value="2" label="LOW"      color={C.muted}  delay={0.24} />
        </div>

        <Reveal delay={0.2}>
          <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 100px 2fr", gap: 16,
              padding: "12px 0", borderBottom: `1px solid ${C.border}`,
            }}>
              {["THREAT", "SEVERITY", "DESCRIPTION"].map((h) => (
                <div key={h} style={{ padding: "0 20px", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: C.muted, letterSpacing: "0.12em" }}>
                  {h}
                </div>
              ))}
            </div>
            <div style={{ padding: "0 20px" }}>
              <RiskRow threat="Poisoned Pipeline Execution" severity="CRITICAL" description="Malicious PR modifies bitrise.yml to exfiltrate secrets or inject code during build" delay={0.05} />
              <RiskRow threat="Credential Leak via YAML"    severity="HIGH"     description="Developer accidentally hardcodes an API key or token in a commit" delay={0.1} />
              <RiskRow threat="Unauthorized Workflow Change" severity="HIGH"    description="Attacker bypasses review and pushes a config change directly to main branch" delay={0.15} />
              <RiskRow threat="Supply Chain Injection"      severity="MEDIUM"   description="Compromised Bitrise step introduces a malicious dependency into the build" delay={0.2} />
              <RiskRow threat="Drift / Inconsistency"       severity="MEDIUM"   description="Branches diverge in CI config, causing unpredictable and unreproducible builds" delay={0.25} />
              <RiskRow threat="CI Denial of Service"        severity="LOW"      description="Broken YAML syntax blocks all builds until the bad commit is reverted" delay={0.3} />
              <RiskRow threat="Git History Exposure"        severity="LOW"      description="Deleted secrets may still be recoverable from old commits via git log" delay={0.35} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
