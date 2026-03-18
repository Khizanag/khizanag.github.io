import { C, Reveal, SectionLabel, SectionHeading, useInView } from "../../shared.jsx";

const ROLES = [
  {
    name: "Read",
    tag: "THE OBSERVER",
    color: C.muted,
    idea: "GitHub's baseline trust level. It was introduced for everyone who needs to understand the work without influencing it — product managers, designers, external stakeholders, or documentation writers. The idea is radical transparency with zero risk: anyone can see everything, but nothing they do can affect the codebase.",
    power: "View code, issues, and PRs · Open issues · Leave comments",
    limit: "Cannot push any code or merge anything",
  },
  {
    name: "Triage",
    tag: "THE COORDINATOR",
    color: C.blue,
    idea: "Introduced because issue and PR management is a fundamentally different skill from writing code. A QA lead, scrum master, or community manager needs to label, close, assign, and prioritize — but has no reason to touch the source tree. Triage makes project coordination a first-class role rather than an afterthought bolted onto Write.",
    power: "Label, close, assign issues and PRs · Request reviews · Apply milestones",
    limit: "Cannot push code, cannot approve or merge PRs",
  },
  {
    name: "Write",
    tag: "THE CONTRIBUTOR",
    color: C.accent,
    idea: "The core developer role, and the most commonly misunderstood one. GitHub designed Write around a single idea: a contributor earns the right to submit work, not to control the project. Write lets you push branches and open PRs — but branch protection rules, not Write itself, determine whether anything actually lands. Write access is not merge authority.",
    power: "Push branches · Open and merge PRs on unprotected branches · Create releases",
    limit: "Cannot modify branch protection rules or repository settings",
  },
  {
    name: "Maintain",
    tag: "THE TEAM LEAD",
    color: C.yellow,
    idea: "Added to fill a gap that caused real pain: before Maintain existed, the only options were Write (not enough for a team lead) or Admin (far too much power to hand out casually). Maintain was designed for the person who runs the day-to-day of a repository — managing settings, merging into protected branches, handling team membership — without holding the ability to delete the project or expose it publicly.",
    power: "Manage repo settings · Push to protected branches · Add/remove team members",
    limit: "Cannot delete the repository or change its visibility",
  },
  {
    name: "Admin",
    tag: "THE OWNER",
    color: C.red,
    idea: "Not just 'more permissions' — Admin represents full accountability. GitHub deliberately made this role dangerous: you can delete the repo, override every branch protection rule, change visibility from private to public, and manage billing. The idea is that someone must be willing to own every consequence. Admin has no safety net by design, because that accountability is the point.",
    power: "Full control — settings, access, security, visibility, branch rule overrides",
    limit: "No restrictions whatsoever",
  },
];

function RoleCard({ role, delay }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        display: "grid", gridTemplateColumns: "160px 1fr",
        background: C.surface, borderRadius: 14,
        border: `1px solid ${C.border}`, borderLeft: `3px solid ${role.color}`,
        overflow: "hidden",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
      }}
    >
      <div style={{
        padding: "24px 20px", background: `${role.color}09`,
        borderRight: `1px solid ${C.border}`,
        display: "flex", flexDirection: "column", justifyContent: "center", gap: 6,
      }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, color: role.color, lineHeight: 1 }}>
          {role.name}
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: role.color, opacity: 0.65, letterSpacing: "0.14em" }}>
          {role.tag}
        </div>
      </div>

      <div style={{ padding: "20px 28px" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: C.muted, lineHeight: 1.75, marginBottom: 14 }}>
          {role.idea}
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.accent,
            background: `${C.accent}0e`, border: `1px solid ${C.accent}28`,
            borderRadius: 6, padding: "3px 10px",
          }}>
            ✓ {role.power}
          </span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.red,
            background: `${C.red}0e`, border: `1px solid ${C.red}28`,
            borderRadius: 6, padding: "3px 10px",
          }}>
            ✕ {role.limit}
          </span>
        </div>
      </div>
    </div>
  );
}

export function GitHubRolesSection() {
  return (
    <section id="s-roles" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={C.blue}>GITHUB ROLES</SectionLabel>
        <SectionHeading sub="GitHub ships 5 repository roles. Each was designed around a specific contributor relationship — not just a list of checkboxes, but a clear idea of who someone is and what trust they've earned.">
          5 Roles, One Principle
        </SectionHeading>
      </Reveal>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {ROLES.map((role, i) => (
          <RoleCard key={role.name} role={role} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}
