import { C, Reveal, SectionLabel, SectionHeading, InfoCard, CheckItem, CalloutBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function ProblemSection() {
    return (
        <section id="s-problem" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.red}>THE PROBLEM</SectionLabel>
                    <SectionHeading sub="A new screen means ~12 hand-authored files across Presentation, Domain, and Data — plus edits to two central files. Easy to miss a step, and the first miss usually shows up in Dev Mode after QA.">
                        Screen scaffolding is mechanical, but expensive
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
                    <Reveal delay={0}>
                        <InfoCard icon="📐" title="What a new screen needs" color={P} tag="HAND-AUTHORED">
                            <CheckItem active>View.swift that matches Figma pixel-for-pixel</CheckItem>
                            <CheckItem active>ViewModel with State, Intent, and SideEffect</CheckItem>
                            <CheckItem active>Router protocol + Default implementation</CheckItem>
                            <CheckItem active>ViewFactory protocol + Default implementation</CheckItem>
                            <CheckItem active>Screen-level DI registration</CheckItem>
                            <CheckItem active>Enum case in Destination.swift + view() branch</CheckItem>
                            <CheckItem active>ViewFactory registration in root Injection.swift</CheckItem>
                            <CheckItem active>L10n keys across en/ru/uz Localizable.strings</CheckItem>
                        </InfoCard>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <InfoCard icon="🚨" title="What kept going wrong" color={C.red} tag="OBSERVED">
                            <CheckItem active={false}>Placeholder shapes leaked into committed Views</CheckItem>
                            <CheckItem active={false}>The same invariant re-implemented 3 different ways</CheckItem>
                            <CheckItem active={false}>Scaffolders re-reading the View to extract state</CheckItem>
                            <CheckItem active={false}>Self-audits missing what the first pass missed</CheckItem>
                            <CheckItem active={false}>L10n accessors compiling against stale SwiftGen</CheckItem>
                            <CheckItem active={false}>Logs written before work was actually verified</CheckItem>
                        </InfoCard>
                    </Reveal>
                </div>

                <Reveal delay={0.2}>
                    <CalloutBox color={C.red} icon="⚠️" label="CORE INSIGHT">
                        LLMs follow prose invariants until token pressure hits. The fix isn&apos;t more prose — it&apos;s fewer invariants encoded in code.
                        That insight drove every single one of the 10 roadmap items shipped today.
                    </CalloutBox>
                </Reveal>
            </div>
        </section>
    );
}
