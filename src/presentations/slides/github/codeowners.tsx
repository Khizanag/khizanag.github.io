import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, CalloutBox, CheckItem } from "../../shared.jsx";
import { P } from "./ui.jsx";

const SYNTAX_EXAMPLE = `# ── Location (checked in order, first wins) ──────
#    .github/CODEOWNERS   ← recommended
#    docs/CODEOWNERS
#    CODEOWNERS (repo root)

# ── Wildcards ─────────────────────────────────────
*                    @org/ios-developers      # every file
*.swift              @org/ios-developers      # only .swift files
/Sources/**          @org/platform-ios-team   # recursive subtree

# ── Path-level rules ──────────────────────────────
/Sources/Networking/ @org/platform-ios-team
/Sources/Payments/   @org/payments-ios-team
/Sources/Analytics/  @org/analytics-ios-team

# ── Multiple owners — ALL must approve ────────────
/Sources/SharedCore/ @org/platform-ios-team @org/ios-architects

# ── Negation — exclude a sub-path ─────────────────
/Sources/Payments/** @org/payments-ios-team
!/Sources/Payments/Tests/   # ← excluded from above

# ── Optional owners (non-blocking, informational) ─
^[Payments Leads][1]
/Docs/Payments/      @alice @bob   # 1 of the 2 is sufficient

# ── Protect the CODEOWNERS file itself ────────────
.github/CODEOWNERS   @org/ios-architects`;

export function CodeownersSection() {
  return (
    <section id="s-codeowners" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel color={P}>CODEOWNERS IN DEPTH</SectionLabel>
          <SectionHeading sub="The complete syntax reference — patterns, precedence, ownership groups, and self-governance.">
            Everything You Need to Know
          </SectionHeading>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 32, alignItems: "start" }}>
          <Reveal delay={0}>
            <CodeBlock filename=".github/CODEOWNERS" highlights={[18, 19, 21, 22, 25, 29]}>
              {SYNTAX_EXAMPLE}
            </CodeBlock>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <Reveal delay={0.1}>
              <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24 }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 4 }}>Key Rules</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.muted, marginBottom: 16 }}>How GitHub evaluates ownership</div>
                <CheckItem delay={0.00}>Last matching rule wins — most specific rule at the bottom overrides broader rules above</CheckItem>
                <CheckItem delay={0.05}>Owner must be a collaborator — unresolvable @mentions are silently ignored by GitHub</CheckItem>
                <CheckItem delay={0.10}>ALL listed owners must approve — unless optional ^ prefix or [N] count syntax</CheckItem>
                <CheckItem delay={0.15}>Path with no owners (empty RHS) — removes ownership, path becomes unowned</CheckItem>
                <CheckItem delay={0.20}>Only the first CODEOWNERS file found is used — .github/ wins over docs/ or root</CheckItem>
                <CheckItem delay={0.25}>CODEOWNERS is only enforced when "Require review from Code Owners" is on in branch protection</CheckItem>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <CalloutBox color={C.yellow} label="COMMON GOTCHA" icon="⚠️">
                <strong style={{ color: C.text }}>Last rule wins.</strong> A broad wildcard at the top is overridden by a specific path rule below it. Always put specific rules <em>after</em> generic ones.
              </CalloutBox>
            </Reveal>

            <Reveal delay={0.3}>
              <CalloutBox color={P} label="PATTERN REFERENCE" icon="📐">
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, lineHeight: 2, display: "block" }}>
                  <span style={{ color: P }}>*</span> &nbsp;&nbsp;— any file (no slashes)<br />
                  <span style={{ color: P }}>**</span>&nbsp;— any path (includes slashes)<br />
                  <span style={{ color: P }}>?</span> &nbsp;&nbsp;— any single character<br />
                  <span style={{ color: P }}>!</span> &nbsp;&nbsp;— negate (exclude from previous rule)<br />
                  <span style={{ color: P }}>/foo/</span>— matches directory exactly<br />
                  <span style={{ color: P }}>*.ext</span>— matches by file extension
                </span>
              </CalloutBox>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
