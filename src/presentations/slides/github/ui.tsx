import { C, useInView } from "../../shared.jsx";

export const P = C.accent;
export const PDim = C.accentDim;

export const codeownersBasic = `# Everything in this repo → payments team
* @org/payments-ios-team

# Path-level granularity
/Sources/PaymentsUI/  @org/payments-ios-team
/Sources/Networking/  @org/platform-ios-team

# CODEOWNERS file itself → architects only
.github/CODEOWNERS    @org/ios-architects`;

export const codeownersMultiTeam = `# Cross-team PR touching both paths?
# BOTH teams become required reviewers.

/Sources/Networking/   @org/platform-ios-team
/Sources/PaymentsUI/   @org/payments-ios-team
/Sources/AnalyticsUI/  @org/analytics-ios-team`;

export function TierCard({ tier, title, members, role, color, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16,
        padding: 28, position: "relative", overflow: "hidden",
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color }} />
      <div style={{ marginBottom: 16 }}>
        <div style={{ background: `${color}20`, border: `1px solid ${color}40`, borderRadius: 10, padding: "6px 14px", display: "inline-block" }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, color, letterSpacing: "0.1em" }}>TIER {tier}</span>
        </div>
      </div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 8 }}>{title}</div>
      <div style={{ color: C.muted, fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>{role}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: `${color}0d`, borderRadius: 10, border: `1px solid ${color}20` }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, animation: "pulse-glow 2.5s ease infinite", flexShrink: 0 }} />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color }}>{members}</span>
      </div>
    </div>
  );
}
