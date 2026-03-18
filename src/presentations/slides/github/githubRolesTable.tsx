import { useState } from "react";
import { C, Reveal, SectionLabel, SectionHeading } from "../../shared.jsx";

const ROLES = [
  { name: "Read",     color: C.muted },
  { name: "Triage",   color: C.blue },
  { name: "Write",    color: "#00ff88" },
  { name: "Maintain", color: C.yellow },
  { name: "Admin",    color: C.red },
];

// p: [Read, Triage, Write, Maintain, Admin]  1 = yes, 0 = no
const TABLE = [
  { category: "Viewing & Forking", rows: [
    { label: "View code, issues, PRs, wiki",              p: [1,1,1,1,1] },
    { label: "Fork the repository",                       p: [1,1,1,1,1] },
    { label: "View GitHub Actions run logs",              p: [0,0,1,1,1] },
    { label: "View Dependabot alerts",                    p: [0,0,1,1,1] },
  ]},
  { category: "Issues & Discussions", rows: [
    { label: "Open issues",                               p: [1,1,1,1,1] },
    { label: "Comment on issues & PRs",                   p: [1,1,1,1,1] },
    { label: "Close / reopen own issues",                 p: [1,1,1,1,1] },
    { label: "Close / reopen others' issues",             p: [0,1,1,1,1] },
    { label: "Apply & remove labels",                     p: [0,1,1,1,1] },
    { label: "Assign issues to members",                  p: [0,1,1,1,1] },
    { label: "Set milestones",                            p: [0,1,1,1,1] },
    { label: "Mark issues as duplicates",                 p: [0,1,1,1,1] },
    { label: "Edit / delete others' comments",            p: [0,0,0,1,1] },
  ]},
  { category: "Pull Requests", rows: [
    { label: "Open pull requests",                        p: [1,1,1,1,1] },
    { label: "Request reviews on PRs",                    p: [0,1,1,1,1] },
    { label: "Approve pull requests",                     p: [0,0,1,1,1] },
    { label: "Merge PRs — unprotected branches",          p: [0,0,1,1,1] },
    { label: "Merge PRs — protected branches",            p: [0,0,0,1,1] },
    { label: "Dismiss stale PR review requests",          p: [0,0,0,1,1] },
    { label: "Close / reopen others' PRs",                p: [0,0,1,1,1] },
  ]},
  { category: "Code & Branches", rows: [
    { label: "Push to non-protected branches",            p: [0,0,1,1,1] },
    { label: "Create branches",                           p: [0,0,1,1,1] },
    { label: "Delete non-protected branches",             p: [0,0,1,1,1] },
    { label: "Push to protected branches",                p: [0,0,0,1,1] },
    { label: "Force push to non-protected branches",      p: [0,0,0,1,1] },
    { label: "Force push / delete protected branches",    p: [0,0,0,0,1] },
    { label: "Create & manage releases",                  p: [0,0,1,1,1] },
  ]},
  { category: "Repository Settings", rows: [
    { label: "Edit description & topics",                 p: [0,0,0,1,1] },
    { label: "Manage GitHub Pages",                       p: [0,0,0,1,1] },
    { label: "Manage webhooks & deploy keys",             p: [0,0,0,1,1] },
    { label: "Manage GitHub Actions settings",            p: [0,0,0,1,1] },
    { label: "Add / invite collaborators",                p: [0,0,0,1,1] },
    { label: "Manage branch protection rules",            p: [0,0,0,0,1] },
    { label: "Dismiss Dependabot alerts",                 p: [0,0,0,0,1] },
    { label: "View & manage security advisories",         p: [0,0,0,0,1] },
    { label: "Change repository visibility",              p: [0,0,0,0,1] },
    { label: "Delete or transfer repository",             p: [0,0,0,0,1] },
  ]},
];

const COLS = "2.2fr repeat(5, 1fr)";

function Cell({ has, roleColor, isFirst }) {
  if (!has) return <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><span style={{ color: C.subtle, fontSize: 15 }}>—</span></div>;
  if (isFirst) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 24, height: 24, borderRadius: 6, background: `${roleColor}20`, border: `1.5px solid ${roleColor}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke={roleColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    </div>
  );
  return <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><span style={{ color: `${C.accent}45`, fontSize: 14 }}>✓</span></div>;
}

function CategorySection({ category, rows, isOpen, onToggle, isFirst }) {
  return (
    <div style={{ borderTop: isFirst ? "none" : `1px solid ${C.border}` }}>
      <div
        onClick={onToggle}
        style={{
          padding: "9px 20px", background: isOpen ? `${C.border}30` : `${C.border}50`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer", userSelect: "none",
          transition: "background 0.2s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 9.5, color: C.muted, letterSpacing: "0.15em" }}>
            {category.toUpperCase()}
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.subtle }}>
            {rows.length} permission{rows.length !== 1 ? "s" : ""}
          </span>
        </div>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform 0.22s ease", flexShrink: 0 }}>
          <path d="M2 4l4 4 4-4" stroke={C.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div style={{ maxHeight: isOpen ? `${rows.length * 52}px` : 0, overflow: "hidden", transition: "max-height 0.28s ease" }}>
        {rows.map(({ label, p }, ri) => (
          <div key={label} style={{ display: "grid", gridTemplateColumns: COLS, borderTop: `1px solid ${C.border}`, background: ri % 2 === 0 ? "transparent" : `${C.border}15` }}>
            <div style={{ padding: "11px 20px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, display: "flex", alignItems: "center" }}>{label}</div>
            {p.map((has, i) => (
              <div key={i} style={{ padding: "8px", borderLeft: `1px solid ${C.border}` }}>
                <Cell has={!!has} roleColor={ROLES[i].color} isFirst={!!has && (i === 0 || !p[i - 1])} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function GitHubRolesTableSection() {
  const allIndices = TABLE.map((_, i) => i);
  const [openSet, setOpenSet] = useState(new Set(allIndices));

  const toggle = (i) => setOpenSet((prev) => {
    const next = new Set(prev);
    next.has(i) ? next.delete(i) : next.add(i);
    return next;
  });

  const allOpen = openSet.size === TABLE.length;

  return (
    <section id="s-roles-table" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={C.blue}>PERMISSIONS MATRIX</SectionLabel>
        <SectionHeading sub="Every permission across all 5 roles. A colored badge marks where it first unlocks — inherited permissions show a plain checkmark.">
          Who Can Do What
        </SectionHeading>
      </Reveal>

      <div style={{ marginBottom: 12, display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={() => setOpenSet(allOpen ? new Set() : new Set(allIndices))}
          style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.muted,
            background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8,
            padding: "5px 14px", cursor: "pointer",
          }}
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>

      {/* Sticky column header — outside overflow:hidden so sticky works */}
      <div style={{ position: "sticky", top: 64, zIndex: 10, display: "grid", gridTemplateColumns: COLS, background: C.bg, borderRadius: "14px 14px 0 0", border: `1px solid ${C.border}`, borderBottom: `2px solid ${C.border}` }}>
        <div style={{ padding: "14px 20px", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: C.muted, letterSpacing: "0.12em", display: "flex", alignItems: "center" }}>
          PERMISSION
        </div>
        {ROLES.map((r) => (
          <div key={r.name} style={{ padding: "14px 8px", textAlign: "center", borderLeft: `1px solid ${C.border}` }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 11, color: r.color, letterSpacing: "0.08em" }}>{r.name.toUpperCase()}</span>
          </div>
        ))}
      </div>

      {/* Body — separate div so overflow:hidden doesn't block sticky */}
      <div style={{ border: `1px solid ${C.border}`, borderTop: "none", borderRadius: "0 0 14px 14px", overflow: "hidden" }}>
        {TABLE.map(({ category, rows }, ci) => (
          <CategorySection
            key={category}
            category={category}
            rows={rows}
            isOpen={openSet.has(ci)}
            onToggle={() => toggle(ci)}
            isFirst={ci === 0}
          />
        ))}
      </div>

      <div style={{ marginTop: 16, display: "flex", gap: 28, justifyContent: "flex-end", flexWrap: "wrap" }}>
        {[
          { icon: <div style={{ width: 16, height: 16, borderRadius: 4, background: `${C.accent}20`, border: `1.5px solid ${C.accent}` }} />, label: "First unlocks at this role" },
          { icon: <span style={{ color: `${C.accent}45`, fontSize: 14 }}>✓</span>, label: "Inherited from lower role" },
          { icon: <span style={{ color: C.subtle, fontSize: 14 }}>—</span>, label: "Not available" },
        ].map(({ icon, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {icon}
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.muted }}>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
