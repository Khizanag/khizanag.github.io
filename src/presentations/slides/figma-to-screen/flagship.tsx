import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, PlainEnglishBox, CheckItem } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function FlagshipSection() {
    return (
        <section id="s-flagship" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1150, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>THE FLAGSHIP</SectionLabel>
                    <SectionHeading sub="The orchestrator sits at the monorepo root. It calls the consumer View generator in Core UI V2, then ~16 feature-module sub-agents, then the verifier and logger.">
                        /figma-to-screen — invocation & inputs
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 28, marginTop: 28 }}>
                    <Reveal delay={0}>
                        <div>
                            <CodeBlock filename="Copilot / Claude chat">{`/figma-to-screen
  figmaUrl:   https://www.figma.com/design/.../Dishes?node-id=5294-65016
  screenName: DishDetails
  module:     Dishes
  flags:      --with-domain
  context:    Read-only screen, pulls /api/dishes/:id`}</CodeBlock>
                            <div style={{ marginTop: 16 }}>
                                <CodeBlock filename="what it writes (Presentation only — default)">{`NewArch-Dishes/NewArch-Dishes-Presentation/Common/Screen/DishDetails/
  View/DishDetailsView.swift
  ViewModel/DishDetailsViewModel.swift
  Router/DishDetailsRouter.swift
  Factory/DishDetailsViewFactory.swift
  DI/DishDetailsInjection.swift

# patched (existing files):
  Common/Navigator/Destination.swift
  Common/DI/Injection.swift
  Common/Localization/*.lproj/Localizable.strings`}</CodeBlock>
                            </div>
                        </div>
                    </Reveal>

                    <div>
                        <Reveal delay={0.1}>
                            <PlainEnglishBox color={P}>
                                Paste a URL, a screen name, and a module. Ten minutes later you have a <strong>pixel-perfect View</strong>, a <strong>wired ViewModel/Router/Factory</strong>, a <strong>Destination case</strong>, a <strong>DI registration</strong>, and <strong>localisation keys</strong> with English copy. Everything compiles, lints strict, and passes <code>@figma-review</code>.
                            </PlainEnglishBox>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <div style={{ marginTop: 16, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 18px" }}>
                                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: P, letterSpacing: "0.12em", marginBottom: 10 }}>OPT-IN FLAGS</div>
                                <CheckItem active><code>--with-domain</code> → adds Repository protocol + Domain DI stub</CheckItem>
                                <CheckItem active><code>--with-data</code> → adds Repository impl + DataSource + Data DI (implies <code>--with-domain</code>)</CheckItem>
                                <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.55, marginTop: 10 }}>
                                    Presentation-only default keeps the surface area small. Opt in only when the screen actually talks to the network.
                                </div>
                            </div>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <div style={{ marginTop: 16, background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.yellow}`, borderRadius: 8, padding: "14px 16px" }}>
                                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: C.yellow, letterSpacing: "0.12em", marginBottom: 6 }}>BRANCH SAFETY</div>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
                                    Phase 7.5 refuses to commit on <code>master</code> / <code>main</code>. You&apos;ll be asked for a feature branch before anything gets pushed.
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
