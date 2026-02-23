import { useState } from "react";
import { C, Reveal, SectionLabel, SectionHeading } from "../../src/shared.jsx";
import { P } from "./ui.jsx";

const SCENARIOS = [
  {
    label: "Single-team change",
    files: ["/Sources/Networking/URLSession.swift"],
    rules: [{ text: "/Sources/Networking/  @org/platform-ios-team", wins: true }],
    reviewers: ["@org/platform-ios-team"],
    outcome: "Only the platform team is auto-requested. The PR can merge once 2 of their members approve.",
    color: C.blue,
  },
  {
    label: "Cross-team PR",
    files: ["/Sources/Networking/URLSession.swift", "/Sources/Payments/Cart.swift"],
    rules: [
      { text: "/Sources/Networking/  @org/platform-ios-team", wins: true },
      { text: "/Sources/Payments/    @org/payments-ios-team", wins: true },
    ],
    reviewers: ["@org/platform-ios-team", "@org/payments-ios-team"],
    outcome: "Both teams are required independently. PR stays blocked until each team provides their own approval — one team's approval does not count for the other.",
    color: C.yellow,
  },
  {
    label: "Negation — Tests/ excluded",
    files: ["/Sources/Payments/Tests/CartSpec.swift"],
    rules: [
      { text: "/Sources/Payments/**  @org/payments-ios-team", wins: false },
      { text: "!/Sources/Payments/Tests/  ← negation overrides above", wins: true },
    ],
    reviewers: [],
    outcome: "No owner. The ! negation removes the Tests/ folder from ownership scope entirely. Anyone with write access can merge — no CODEOWNERS approval required.",
    color: C.accent,
  },
  {
    label: "Last rule wins",
    files: ["/Sources/Networking/Core.swift"],
    rules: [
      { text: "*  @org/ios-developers  ← matched, but overridden", wins: false },
      { text: "/Sources/Networking/  @org/platform-ios-team  ← wins", wins: true },
    ],
    reviewers: ["@org/platform-ios-team"],
    outcome: "The broad * rule is overridden by the more specific path rule below it. GitHub always applies the last matching rule — put specific rules after generic ones.",
    color: C.purple,
  },
  {
    label: "Multiple owners — all required",
    files: ["/Sources/SharedCore/Foundation.swift"],
    rules: [{ text: "/Sources/SharedCore/  @org/platform-ios-team @org/ios-architects", wins: true }],
    reviewers: ["@org/platform-ios-team", "@org/ios-architects"],
    outcome: "All listed owners are required. The PR remains blocked until both groups have independently approved — one group approving is not enough.",
    color: C.red,
  },
  {
    label: "CODEOWNERS itself edited",
    files: [".github/CODEOWNERS"],
    rules: [{ text: ".github/CODEOWNERS  @org/ios-architects", wins: true }],
    reviewers: ["@org/ios-architects"],
    outcome: "Nobody can change the ownership rules without architect sign-off. The CODEOWNERS file governs itself — ownership changes require the existing owners to approve.",
    color: C.yellow,
  },
  {
    label: "Unowned path — no rule matches",
    files: ["/fastlane/Fastfile"],
    rules: [{ text: "(no rule in CODEOWNERS matches this path)", wins: false }],
    reviewers: [],
    outcome: "Unowned paths are completely ungated. No reviewer is auto-requested. Anyone with write access can push and merge without any review enforcement. Unowned paths are a common security gap.",
    color: C.red,
  },
  {
    label: "Individual user as owner",
    files: ["/Infrastructure/CI/pipeline.yml"],
    rules: [{ text: "/Infrastructure/CI/  @alice", wins: true }],
    reviewers: ["@alice (specific user, not a team)"],
    outcome: "A specific individual — not a team — must approve. If @alice is unavailable, the PR is permanently blocked. Teams are strongly preferred over individuals for resilience.",
    color: C.muted,
  },
  {
    label: "PR opened as Draft",
    files: ["/Sources/Payments/NewFeature.swift"],
    rules: [{ text: "/Sources/Payments/  @org/payments-ios-team", wins: true }],
    reviewers: ["(none while draft — CODEOWNERS not yet applied)"],
    outcome: "GitHub does not auto-request reviewers for draft PRs. CODEOWNERS only takes effect when the PR is marked Ready for Review. Converting from draft triggers the review request immediately.",
    color: C.muted,
  },
  {
    label: "New commit voids approval",
    files: ["/Sources/Payments/Cart.swift"],
    rules: [{ text: "/Sources/Payments/  @org/payments-ios-team", wins: true }],
    reviewers: ["@org/payments-ios-team (approval reset by new commit)"],
    outcome: "With 'Dismiss stale reviews on new commits' enabled in branch protection, any new push to the branch invalidates all previous approvals. CODEOWNERS owners must re-approve after every new commit.",
    color: C.yellow,
  },
  {
    label: "Optional owners — non-blocking",
    files: ["/Docs/Payments/Overview.md"],
    rules: [
      { text: "^[Payments Docs][1]", wins: true },
      { text: "/Docs/Payments/  @alice @bob  ← 1 of 2 sufficient", wins: true },
    ],
    reviewers: ["@alice or @bob (optional — PR can merge without them)"],
    outcome: "Optional owner sections (^ prefix) are informational. GitHub requests their review, but the PR is not blocked if they don't respond. Useful for advisory reviewers who don't gate merges.",
    color: C.blue,
  },
  {
    label: "Admin bypasses CODEOWNERS",
    files: ["/Sources/Networking/Core.swift"],
    rules: [{ text: "/Sources/Networking/  @org/platform-ios-team", wins: true }],
    reviewers: ["@org/platform-ios-team (bypassed by admin)"],
    outcome: "If 'Allow specified actors to bypass required pull requests' is enabled, admins can merge without CODEOWNERS approval. This is intentional for emergencies — but every bypass is visible in the audit log.",
    color: C.red,
  },
];

function Arrow({ color }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "2px 0" }}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2v14M3 12l6 6 6-6" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function Panel({ label, bg, border, labelColor, children }) {
  return (
    <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 12, padding: "16px 20px" }}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10.5, letterSpacing: "0.12em", color: labelColor || C.muted, marginBottom: 10 }}>{label}</div>
      {children}
    </div>
  );
}

function Dot({ color, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 0" }}>
      <div style={{ width: 5, height: 5, borderRadius: "50%", background: color, flexShrink: 0 }} />
      {children}
    </div>
  );
}

export function CodeownersScenariosSection() {
  const [active, setActive] = useState(0);
  const s = SCENARIOS[active];

  return (
    <section id="s-codeowners-scenarios" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={P}>SCENARIOS</SectionLabel>
        <SectionHeading sub="Pick a scenario to trace exactly which rules GitHub evaluates and which reviewers get auto-requested — including edge cases.">
          What Happens When…
        </SectionHeading>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 24, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {SCENARIOS.map((sc, i) => (
            <button
              key={sc.label}
              onClick={() => setActive(i)}
              style={{
                textAlign: "left", padding: "10px 14px 10px 15px",
                background: active === i ? `${sc.color}12` : "transparent",
                border: `1px solid ${active === i ? sc.color + "45" : C.border}`,
                borderLeft: `3px solid ${active === i ? sc.color : "transparent"}`,
                borderRadius: 9, cursor: "pointer",
                color: active === i ? sc.color : C.muted,
                fontFamily: "'DM Sans', sans-serif", fontSize: 12.5,
                fontWeight: active === i ? 600 : 400,
                transition: "all 0.18s",
              }}
            >
              {sc.label}
            </button>
          ))}
        </div>

        <div key={active} style={{ display: "flex", flexDirection: "column", gap: 8, animation: "fadeIn 0.22s ease" }}>
          <Panel label="CHANGED FILES" bg={C.surface} border={C.border}>
            {s.files.map((f) => (
              <Dot key={f} color={s.color}>
                <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.text }}>{f}</code>
              </Dot>
            ))}
          </Panel>

          <Arrow color={s.color} />

          <Panel label="CODEOWNERS RULES EVALUATED" bg="#080d15" border={C.border}>
            {s.rules.map((r, i) => (
              <div key={i} style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, lineHeight: 1.85,
                color: r.wins ? C.text : C.subtle,
                textDecoration: r.wins ? "none" : "line-through",
              }}>
                {r.text}
              </div>
            ))}
          </Panel>

          <Arrow color={s.color} />

          <Panel
            label="REQUIRED REVIEWERS"
            bg={s.reviewers.length ? `${s.color}0c` : C.surface}
            border={s.reviewers.length ? `${s.color}35` : C.border}
            labelColor={s.reviewers.length ? s.color : C.muted}
          >
            {s.reviewers.length === 0
              ? <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.muted }}>None — unowned path, anyone can merge</span>
              : s.reviewers.map((r) => (
                <Dot key={r} color={s.color}>
                  <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: s.color }}>{r}</code>
                </Dot>
              ))
            }
          </Panel>

          <div style={{ padding: "14px 18px", background: `${s.color}07`, border: `1px solid ${s.color}20`, borderRadius: 10 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.65 }}>{s.outcome}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
