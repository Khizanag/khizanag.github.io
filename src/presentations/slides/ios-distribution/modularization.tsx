import { C, Reveal, SectionLabel, SectionHeading, FeatureCard, CalloutBox, CodeBlock, PlainEnglishBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

const TBC_MODULES = [
    { name: "Feature-Cards",     type: "Feature",  ver: "4.2.1" },
    { name: "Feature-Loan",      type: "Feature",  ver: "2.8.0" },
    { name: "Feature-PFM",       type: "Feature",  ver: "1.3.4" },
    { name: "Core-UI-V2",        type: "Design",   ver: "3.0.1" },
    { name: "Core-Auth",         type: "Core",     ver: "5.1.0" },
    { name: "Core-Analytics-V2", type: "Core",     ver: "2.4.2" },
    { name: "Toolkit-Map",       type: "Toolkit",  ver: "1.9.3" },
    { name: "Toolkit-Media",     type: "Toolkit",  ver: "1.6.0" },
];

export function ModularizationSection() {
    return (
        <section id="s-modular" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>MODULAR APPS & DISTRIBUTION</SectionLabel>
                    <SectionHeading sub="One binary ships to App Store, but ~100 repos produce it. Modularization is the only answer to ‘our app takes 14 minutes to build’.">
                        Breaking the monolith
                    </SectionHeading>
                </Reveal>

                {/* Three formats */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 16 }}>
                    Three ways to share iOS code
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
                    <FeatureCard icon="📦" title="Swift Package (SPM)" color={C.accent} delay={0}
                        description="Source-based. Resolves at build time. Native Xcode + Apple tooling. Best for internal modules you own. Downside: every consumer compiles from scratch." />
                    <FeatureCard icon="🧊" title="XCFramework" color={C.blue} delay={0.08}
                        description="Pre-compiled binary. Multi-slice (arm64 device + arm64-sim + x86_64-sim). Ships as a zipped artifact. Best for closed-source SDKs or very large third-party modules." />
                    <FeatureCard icon="⚙️" title="CocoaPods (legacy)" color={C.yellow} delay={0.16}
                        description="Ruby-based dependency manager. Still dominant for third-party. Pod lib lint + Podfile.lock. Xcode 15+ supports SPM for most pods. Actively being migrated away from." />
                </div>

                {/* SpaceInt module map */}
                <div style={{ marginBottom: 40 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 16 }}>
                        How TBC UZ is structured (selection)
                    </div>
                    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px" }}>
                        <div style={{
                            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10,
                        }}>
                            {TBC_MODULES.map((m) => (
                                <div key={m.name} style={{
                                    display: "flex", alignItems: "center", justifyContent: "space-between",
                                    padding: "10px 14px", background: C.bg,
                                    border: `1px solid ${C.border}`, borderRadius: 8,
                                }}>
                                    <div>
                                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.text, fontWeight: 700 }}>
                                            {m.name}
                                        </div>
                                        <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{m.type}</div>
                                    </div>
                                    <div style={{
                                        fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                                        color: P, background: `${P}12`,
                                        padding: "3px 8px", borderRadius: 4,
                                    }}>
                                        v{m.ver}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p style={{ fontSize: 11, color: C.muted, fontStyle: "italic", marginTop: 14 }}>
                            Each module is its own git repo. <b>Module-Config/dev.config</b> pins every module to a branch during CI.
                        </p>
                    </div>
                </div>

                {/* SemVer */}
                <div style={{ marginBottom: 40 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 16 }}>
                        Semantic versioning — the only part that matters
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
                        <div style={{ background: C.surface, border: `1px solid ${C.red}30`, borderRadius: 12, padding: "20px 24px" }}>
                            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: C.red, marginBottom: 6 }}>MAJOR</div>
                            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}>
                                Breaking API change. Removed a public func. Renamed a protocol. Changed a model layout. Consumers MUST migrate.
                            </div>
                        </div>
                        <div style={{ background: C.surface, border: `1px solid ${C.yellow}30`, borderRadius: 12, padding: "20px 24px" }}>
                            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: C.yellow, marginBottom: 6 }}>MINOR</div>
                            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}>
                                New public API. Additive only. Old call-sites keep compiling untouched. Safe to upgrade.
                            </div>
                        </div>
                        <div style={{ background: C.surface, border: `1px solid ${C.accent}30`, borderRadius: 12, padding: "20px 24px" }}>
                            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: C.accent, marginBottom: 6 }}>PATCH</div>
                            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}>
                                Bug fix, perf improvement, internal refactor. Zero API delta. Can auto-bump in CI.
                            </div>
                        </div>
                    </div>
                    <CodeBlock filename="Package.swift — typical TBC UZ feature package">{`.package(
    url: "https://github.com/SpaceBank/iOS-Space-Core-UI-V2.git",
    from: "3.0.0"              // ← SPM's 'from:' = next breaking major
                               //    Resolves to latest 3.x, refuses 4.0
),
.package(
    url: "https://github.com/SpaceBank/iOS-Space-Core-Models.git",
    exact: "5.1.0"             // ← 'exact:' for load-bearing contracts
                               //    (DTOs, cross-module enums)
),
.package(
    url: "https://github.com/SpaceBank/iOS-Space-Feature-Cards.git",
    branch: "feature/new-chip" // ← 'branch:' only during active dev
                               //    Never merge a branch pin to master
),`}</CodeBlock>
                </div>

                <PlainEnglishBox color={P}>
                    <b>Version drift is the #1 modularization disaster.</b> Two modules depending on <i>different versions</i> of Core-Models produces <code style={{ color: P }}>type A.Foo is not compatible with A.Foo</code>. The fix is boring: one pin, one place (<code style={{ color: P }}>Module-Config/dev.config</code>), checked on every PR.
                </PlainEnglishBox>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 32 }}>
                    <CalloutBox color={C.accent} icon="✓" label="GOOD MODULAR HYGIENE">
                        Every shared type has ONE home. Changelog per module. Bump version in SAME PR as the code change. Public API is <code style={{ color: C.accent }}>public</code>, everything else <code style={{ color: C.accent }}>internal</code>. Module &lt; 200 source files.
                    </CalloutBox>
                    <CalloutBox color={C.red} icon="✕" label="ANTI-PATTERNS">
                        <b>God modules</b> (Core-Everything). <b>Circular deps</b> (A imports B imports A). <b>&lsquo;main&rsquo; branch pinning</b> (no reproducible builds). <b>Public-everything</b> (every internal refactor = breaking major).
                    </CalloutBox>
                </div>
            </div>
        </section>
    );
}
