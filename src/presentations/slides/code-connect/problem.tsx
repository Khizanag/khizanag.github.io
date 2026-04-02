import { C, Reveal, SectionLabel, SectionHeading, InfoCard, CheckItem, CalloutBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function ProblemSection() {
  return (
    <section id="s-problem" style={{ padding: "96px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel color={C.red}>THE PROBLEM</SectionLabel>
          <SectionHeading sub="Designers build components in Figma. Developers reverse-engineer the Swift API from source code. There's no bridge.">
            Design-code disconnect
          </SectionHeading>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
          <Reveal delay={0}>
            <InfoCard icon="🎨" title="Designer's world" color={P} tag="FIGMA">
              <CheckItem active>Creates components with variants and properties</CheckItem>
              <CheckItem active>Documents spacing, colors, typography in Figma</CheckItem>
              <CheckItem active>Hands off specs via Dev Mode</CheckItem>
              <CheckItem active={false}>Has no visibility into Swift API naming</CheckItem>
              <CheckItem active={false}>Cannot verify if implementation matches design</CheckItem>
            </InfoCard>
          </Reveal>

          <Reveal delay={0.1}>
            <InfoCard icon="💻" title="Developer's world" color={C.blue} tag="XCODE">
              <CheckItem active>Reads Figma specs for visual requirements</CheckItem>
              <CheckItem active>Searches source code for the right component</CheckItem>
              <CheckItem active={false}>Guesses parameter names and init signatures</CheckItem>
              <CheckItem active={false}>Discovers variants by trial and error</CheckItem>
              <CheckItem active={false}>No single source of truth for component API</CheckItem>
            </InfoCard>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <CalloutBox color={C.red} icon="🔄" label="THE GAP">
            Every time a designer drags a component onto a frame, a developer has to separately figure out which Swift struct to use,
            what parameters to pass, and which variant enum case to pick. This slows onboarding, increases errors, and creates
            a constant back-and-forth between design and engineering.
          </CalloutBox>
        </Reveal>
      </div>
    </section>
  );
}
