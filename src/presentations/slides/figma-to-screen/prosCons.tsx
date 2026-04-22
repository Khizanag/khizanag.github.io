import { C, Reveal, SectionLabel, SectionHeading, InfoCard, CheckItem, CalloutBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function ProsConsSection() {
    return (
        <section id="s-pros-cons" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>HONEST TRADE-OFFS</SectionLabel>
                    <SectionHeading sub="There&apos;s no free lunch. The gains are real but so are the constraints — knowing the edges matters more than knowing the headlines.">
                        Where it wins · where it doesn&apos;t
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 28 }}>
                    <Reveal delay={0}>
                        <InfoCard icon="✨" title="Where it wins" color={C.accent} tag="WINS">
                            <CheckItem active>~12 boilerplate files per screen, gone</CheckItem>
                            <CheckItem active>Zero drift between modules — templates are the law</CheckItem>
                            <CheckItem active>Design tokens resolved automatically from Figma variables</CheckItem>
                            <CheckItem active>Mandatory @figma-review blocks self-audit escape</CheckItem>
                            <CheckItem active>Every run produces a reviewable session log</CheckItem>
                            <CheckItem active>Branch + commit + push included — no forgotten SHA</CheckItem>
                            <CheckItem active>7 gates catch lint, build, L10n, SwiftGen, DI issues</CheckItem>
                        </InfoCard>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <InfoCard icon="⚠️" title="Where it doesn't" color={C.red} tag="LIMITS">
                            <CheckItem active={false}>Requires Figma desktop + MCP running locally</CheckItem>
                            <CheckItem active={false}>Novel UI patterns still need hand-authoring</CheckItem>
                            <CheckItem active={false}>Business logic lands as TODOs — you fill them in</CheckItem>
                            <CheckItem active={false}>Dead mappings ⇒ guessed Swift ⇒ wrong code</CheckItem>
                            <CheckItem active={false}>First run on a new module warms the discovery cache — ~2x slower</CheckItem>
                            <CheckItem active={false}>Can&apos;t scaffold Snapshot / Contract test targets yet</CheckItem>
                            <CheckItem active={false}>No @screen-remover yet — deletions are manual</CheckItem>
                        </InfoCard>
                    </Reveal>
                </div>

                <Reveal delay={0.2}>
                    <div style={{ marginTop: 24 }}>
                        <CalloutBox color={P} icon="⚖️" label="WHEN NOT TO USE IT">
                            One-off prototypes. Showroom demo screens.
                            Screens whose Figma version is still in flux (regenerate every iteration).
                            Anything outside a clean-arch feature module (utility scripts, snapshot tests, analytics wiring).
                        </CalloutBox>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
