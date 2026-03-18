import { C, Reveal, SectionLabel, SectionHeading, CheckItem } from "../../shared.jsx";

export function BranchProtectionSection() {
  return (
    <section id="s-branch-protection" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
        <div>
          <Reveal>
            <SectionLabel color={C.yellow}>BRANCH PROTECTION</SectionLabel>
            <SectionHeading sub="With this configuration: anyone can open a PR into any repo — but it will never merge without 2 CODEOWNERS approvals.">
              Configure Every Repo's Main Branch
            </SectionHeading>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 4 }}>Branch Protection Rules</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.muted, marginBottom: 20 }}>main / production</div>
            <CheckItem delay={0.00}>Require a pull request before merging</CheckItem>
            <CheckItem delay={0.05}>Required approvals: 2</CheckItem>
            <CheckItem delay={0.10}>Dismiss stale reviews on new commits</CheckItem>
            <CheckItem delay={0.15}>Require review from Code Owners ← critical</CheckItem>
            <CheckItem delay={0.20}>Restrict dismissal → Admins only</CheckItem>
            <CheckItem delay={0.25}>Require status checks (CI) to pass</CheckItem>
            <CheckItem delay={0.30}>Require branches to be up to date</CheckItem>
            <CheckItem active={false} delay={0.35}>Allow bypassing the above settings</CheckItem>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
