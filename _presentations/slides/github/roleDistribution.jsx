import { C, Reveal, SectionLabel, SectionHeading, CalloutBox, TagChip, useInView } from "../../src/shared.jsx";
import { P, PDim } from "./ui.jsx";

const ROLE_COLOR = { Admin: C.red, Maintain: C.yellow, Write: C.accent };

function AssignmentRow({ scope, role, note }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 10, padding: "9px 14px", background: C.bg, borderRadius: 8, border: `1px solid ${C.border}` }}>
      <TagChip color={ROLE_COLOR[role]}>{role.toUpperCase()}</TagChip>
      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, color: C.text, flexShrink: 0 }}>{scope}</span>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted }}>— {note}</span>
    </div>
  );
}

const TIERS = [
  {
    title: "iOS Architects",
    handle: "@org/ios-architects",
    color: C.red,
    description: "Architects are the trust anchor of the entire system. They define the rules — branch protection settings and CODEOWNERS files — and must be able to enforce or override them in any repo. Admin is the only role that allows this. The power is intentional: someone must be accountable.",
    assignments: [
      { scope: "All repos", role: "Admin", note: "Own branch protection rules, manage CODEOWNERS, escalate when needed" },
    ],
  },
  {
    title: "Team Leads",
    handle: "@org/[product]-lead  (one per product)",
    color: C.yellow,
    description: "Each product team has one lead who owns their repo day-to-day. Maintain gives them everything they need — settings, protected-branch merges, team membership — without the ability to delete or expose the repository. On every other team's repo they get Write via the org-wide team, enabling cross-team contribution with no friction.",
    assignments: [
      { scope: "Own product repo", role: "Maintain", note: "Settings, protected-branch merges, team membership management" },
      { scope: "All other repos",  role: "Write",    note: "Via org-wide team — cross-team contribution, no access requests" },
    ],
  },
  {
    title: "Product Team Developers",
    handle: "@org/ios-developers  (everyone)",
    color: C.accent,
    description: "All 50+ developers get Write on every repository through a single org-wide team. This removes cross-team access friction entirely — any developer can push a branch to any repo without asking anyone. CODEOWNERS is what controls who reviews and approves the work. Access and governance are deliberately separated.",
    assignments: [
      { scope: "All repos", role: "Write", note: "Via @org/ios-developers — one team, universal base access" },
    ],
  },
];

function TierCard({ tier, index }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        display: "grid", gridTemplateColumns: "220px 1fr",
        background: C.surface, borderRadius: 14,
        border: `1px solid ${C.border}`, borderLeft: `3px solid ${tier.color}`,
        overflow: "hidden",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.55s ease ${index * 0.1}s, transform 0.55s ease ${index * 0.1}s`,
      }}
    >
      <div style={{
        padding: "28px 20px", background: `${tier.color}08`,
        borderRight: `1px solid ${C.border}`,
        display: "flex", flexDirection: "column", justifyContent: "center", gap: 10,
      }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15, color: tier.color, lineHeight: 1.2 }}>
          {tier.title}
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: tier.color, opacity: 0.6, letterSpacing: "0.1em", lineHeight: 1.6 }}>
          {tier.handle}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {[...new Set(tier.assignments.map(a => a.role))].map(r => <TagChip key={r} color={ROLE_COLOR[r]}>{r.toUpperCase()}</TagChip>)}
        </div>
      </div>

      <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: C.muted, lineHeight: 1.75, margin: 0 }}>
          {tier.description}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {tier.assignments.map(a => <AssignmentRow key={a.scope} {...a} />)}
        </div>
      </div>
    </div>
  );
}

const TEAMS = [
  { handle: "@org/ios-architects",    role: "Admin",    repos: "All repos",      purpose: "Owns rules & governance" },
  { handle: "@org/ios-developers",    role: "Write",    repos: "All repos",      purpose: "Every developer — universal base" },
  { handle: "@org/[product]-ios-team",role: "—",        repos: "CODEOWNERS only", purpose: "Review authority, no extra repo access needed" },
  { handle: "[product] Team Lead",    role: "Maintain", repos: "Own repo only",  purpose: "Day-to-day ownership" },
];

export function RoleDistributionSection() {
  return (
    <section id="s-distribution" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel color={P}>OUR SETUP</SectionLabel>
          <SectionHeading sub="Three tiers, clear lines of authority. Architects set the rules, leads own their repos, developers contribute everywhere.">
            Recommended Role Distribution
          </SectionHeading>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
          {TIERS.map((tier, i) => <TierCard key={tier.title} tier={tier} index={i} />)}
        </div>

        <Reveal delay={0.35}>
          <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 28 }}>
            <div style={{ padding: "10px 20px", borderBottom: `1px solid ${C.border}`, display: "grid", gridTemplateColumns: "2fr 1fr 1.2fr 2fr" }}>
              {["GITHUB TEAM", "REPO ROLE", "SCOPE", "PURPOSE"].map(h => (
                <span key={h} style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: C.muted, letterSpacing: "0.12em" }}>{h}</span>
              ))}
            </div>
            {TEAMS.map((t, i) => (
              <div key={t.handle} style={{ padding: "12px 20px", borderTop: i > 0 ? `1px solid ${C.border}` : "none", display: "grid", gridTemplateColumns: "2fr 1fr 1.2fr 2fr", alignItems: "center", background: i % 2 ? `${C.border}15` : "transparent" }}>
                <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: P }}>{t.handle}</code>
                {t.role === "—"
                  ? <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.subtle }}>—</span>
                  : <TagChip color={ROLE_COLOR[t.role]}>{t.role.toUpperCase()}</TagChip>
                }
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted }}>{t.repos}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted }}>{t.purpose}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.45}>
          <CalloutBox color={P} label="KEY INSIGHT" icon="🔑">
            <strong style={{ color: C.text }}>Product teams listed in CODEOWNERS don't need extra repo access.</strong> Their members already have Write via <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: P }}>@org/ios-developers</code>. CODEOWNERS references them purely for review authority — completely decoupled from how access is granted.
          </CalloutBox>
        </Reveal>
      </div>
    </section>
  );
}
