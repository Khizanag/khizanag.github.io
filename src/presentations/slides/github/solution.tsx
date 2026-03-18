import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, CalloutBox } from "../../shared.jsx";
import { P, codeownersBasic, codeownersMultiTeam } from "./ui.jsx";

export function SolutionSection() {
  return (
    <section id="s-solution" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={P}>THE SOLUTION</SectionLabel>
        <SectionHeading sub="A CODEOWNERS file maps paths to responsible teams. Branch protection enforces those owners as required reviewers — independently of write access.">
          CODEOWNERS + Branch Protection
        </SectionHeading>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        <Reveal delay={0}>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 16 }}>Basic Setup</div>
            <CodeBlock filename="CODEOWNERS" highlights={[5, 6, 9]}>
              {codeownersBasic}
            </CodeBlock>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 16 }}>Cross-team PR — Multi-Owner</div>
            <CodeBlock filename="CODEOWNERS" highlights={[4, 5, 6]}>
              {codeownersMultiTeam}
            </CodeBlock>
            <div style={{ marginTop: 16 }}>
              <CalloutBox color={P} label="KEY INSIGHT">
                A PR touching Networking + PaymentsUI automatically requires approval from <strong style={{ color: C.text }}>both</strong> owning teams.
              </CalloutBox>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
