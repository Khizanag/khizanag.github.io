import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, CalloutBox, FeatureCard } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function ScreenArchitectureSection() {
    return (
        <section id="s-arch" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>SCREEN ARCHITECTURE</SectionLabel>
                    <SectionHeading sub="Every screen in every Space-Feature-* module follows the same 5-file pattern. AI and humans produce identical structure.">
                        The 5-file screen pattern
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 32 }}>
                    <div>
                        <Reveal delay={0}>
                            <CodeBlock filename="Screen folder structure" highlights={[2, 4, 6, 8, 10]}>
{`<ScreenName>/
├── View/
│   └── <ScreenName>View.swift
├── ViewModel/
│   └── <ScreenName>ViewModel.swift
├── Factory/
│   └── <ScreenName>ViewFactory.swift
├── Router/
│   └── <ScreenName>Router.swift
└── DI/
    └── <ScreenName>Injection.swift`}
                            </CodeBlock>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <div style={{ marginTop: 20 }}>
                                <CodeBlock filename="+ Register in 2 shared files" highlights={[1, 2]}>
{`Destination.swift   → add case + view() builder
Injection.swift     → register factory`}
                                </CodeBlock>
                            </div>
                        </Reveal>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <Reveal delay={0}>
                            <FeatureCard icon="👁" title="View" color={C.blue}
                                description="Generic over ViewModel protocol. @StateObject, explicit init. Renders state, forwards intents. No business logic." />
                        </Reveal>
                        <Reveal delay={0.06}>
                            <FeatureCard icon="🧠" title="ViewModel" color={P}
                                description="Parameters (Hashable), State (AutoEquatable), Intent (AutoEquatable), SideEffect. Protocol + Default class. handleIntent in separate extension." />
                        </Reveal>
                        <Reveal delay={0.12}>
                            <FeatureCard icon="🏭" title="Factory" color={C.accent}
                                description="ViewFactory protocol. Creates ViewModel + View. Calls screen DI registration. Single entry point for screen assembly." />
                        </Reveal>
                        <Reveal delay={0.18}>
                            <FeatureCard icon="🧭" title="Router" color={C.yellow}
                                description="@MainActor protocol + AutoMockable. @Inject navigator. push → navigateTo, present → present, sheet → show. No business logic." />
                        </Reveal>
                        <Reveal delay={0.24}>
                            <FeatureCard icon="💉" title="DI" color={C.red}
                                description="Container extension. Registers screen routers. Calls Domain/Data DI if needed. Screen-scoped — not cross-screen." />
                        </Reveal>
                    </div>
                </div>

                <Reveal delay={0.3}>
                    <CalloutBox color={P} icon="📁" label="INSTRUCTION FILES">
                        Every pattern is documented in <code style={{ fontFamily: "'JetBrains Mono', monospace", color: P }}>.github/instructions/</code> —
                        one file per concern (view, view-model, factory, router, di, destination).
                        Both AI and developers follow the same instructions. The patterns are enforced, not suggested.
                    </CalloutBox>
                </Reveal>
            </div>
        </section>
    );
}
