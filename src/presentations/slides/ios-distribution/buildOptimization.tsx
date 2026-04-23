import { C, Reveal, SectionLabel, SectionHeading, FeatureCard, CalloutBox, CodeBlock } from "../../shared.tsx";
import { P } from "./ui.tsx";

const STAGES = [
    { stage: "Clean build", tbc: "14m 20s", color: C.red },
    { stage: "After cache hits (Bitrise)", tbc: "4m 10s", color: C.yellow },
    { stage: "Incremental local (1 file changed)", tbc: "28s", color: C.accent },
    { stage: "Target build (single feature)", tbc: "45s", color: C.accent },
];

export function BuildOptimizationSection() {
    return (
        <section id="s-buildopt" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>BUILD OPTIMIZATION</SectionLabel>
                    <SectionHeading sub="A fast build loop is the single biggest multiplier on team velocity. We moved TBC UZ from 14min → 28s for the common case. Here’s the sequence that actually moved the needle.">
                        Every minute saved × every engineer × every day
                    </SectionHeading>
                </Reveal>

                {/* Current numbers */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 40 }}>
                    {STAGES.map((s) => (
                        <div key={s.stage} style={{
                            background: C.bg, border: `1px solid ${s.color}30`, borderRadius: 12,
                            padding: "20px 22px",
                        }}>
                            <div style={{
                                fontFamily: "'Syne', sans-serif", fontWeight: 800,
                                fontSize: 28, color: s.color, marginBottom: 6,
                            }}>{s.tbc}</div>
                            <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>{s.stage}</div>
                        </div>
                    ))}
                </div>

                {/* The levers */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 16 }}>
                    Six levers, in order of ROI
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
                    <FeatureCard icon="1" title="Modularize (biggest win)" color={P} delay={0}
                        description="Break the monolith into SPM packages. Xcode rebuilds ONLY modules that changed. 600-file feature split into 8 packages → cold build drops ~40%." />
                    <FeatureCard icon="2" title="Bitrise cache-pull / cache-push" color={C.purple} delay={0.06}
                        description="Cache ~/Library/Caches/org.swift.swiftpm and DerivedData keyed on Package.resolved + Podfile.lock. 14m → 4m on cache hit. Invalidate on any lockfile diff." />
                    <FeatureCard icon="3" title="Stable cache key hashing" color={C.accent} delay={0.12}
                        description="Hash only files that affect the build output: Package.resolved, Podfile.lock, Gemfile.lock, xcconfig. Excluding README / CHANGELOG gives you ~98% cache hit rate." />
                    <FeatureCard icon="4" title="Turn off WMO in Debug" color={C.yellow} delay={0.18}
                        description="Whole-Module Optimization makes Release fast to run but Debug slow to COMPILE (one unit per module). SWIFT_COMPILATION_MODE = singlefile in Debug → 2–3× faster incremental." />
                    <FeatureCard icon="5" title="Parallelize in Xcode + Bitrise" color={C.blue} delay={0.24}
                        description="Xcode: Preferences > Build System > parallelize. Bitrise: use M2 Pro stack + 8-core. xcodebuild -jobs $(sysctl -n hw.ncpu). Most builds use 1–2 cores out of the box." />
                    <FeatureCard icon="6" title="Asset catalogs over PNGs" color={C.red} delay={0.3}
                        description="Xcassets compile once into a single Assets.car. Loose PNGs re-copy every build. Moving 400 loose PNGs into a catalog saved us 35s per clean build." />
                </div>

                {/* Stop-doing list */}
                <div style={{ marginBottom: 40 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 16 }}>
                        Stop-doing list — common footguns
                    </div>
                    <CodeBlock filename="build times — what hurts, what to do instead">{`❌  Type-check heavy closures
    .filter { item in item.tags.map(\\.name).contains("foo") && ... }
    → Xcode: "unable to type-check in reasonable time"
    ✅  Extract to a concrete func with explicit types

❌  Too many computed properties in @ViewBuilder
    → SwiftUI type inference explodes
    ✅  @ViewBuilder func thing() -> some View { ... }

❌  Optimizing Debug builds (Optimize Level = -O)
    → you lose every lldb breakpoint + 3× build time
    ✅  Debug = -Onone always. Optimize Release only.

❌  Including Swift files inside an asset catalog
    ❌  Huge PNG assets in app target (ship via on-demand resources)
    ❌  Running swiftlint in the build phase on every target
    ✅  Run swiftlint on changed files via pre-commit hook + CI only`}</CodeBlock>
                </div>

                {/* Measure */}
                <div style={{ marginBottom: 32 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 16 }}>
                        Measuring: xcodebuild -showBuildTimingSummary
                    </div>
                    <CodeBlock filename="terminal">{`$ xcodebuild -project TBC.xcodeproj -scheme TBC-Prod \\
    -configuration Debug build \\
    -showBuildTimingSummary

==== BUILD TIMING SUMMARY ====
Ld                       28.4s  (189 invocations)        ← linker
CompileSwift           1412.8s  (3,210 invocations)      ← the culprit
CompileAssetCatalog      42.1s  (23 invocations)
ProcessInfoPlistFile      1.2s  (23 invocations)
Total                  1602.7s

# Swift-only breakdown:
$ defaults write com.apple.dt.Xcode ShowBuildOperationDuration YES

# Per-function compile times (find slowest closures):
$ xcodebuild OTHER_SWIFT_FLAGS="-Xfrontend -debug-time-function-bodies" \\
    build 2>&1 | grep -E '^[0-9]+\\.[0-9]+ms'`}</CodeBlock>
                </div>

                <CalloutBox color={C.accent} icon="📈" label="TBC UZ JOURNEY — 18 MONTHS">
                    <b>Q1 2024:</b> cold build 14m 20s, incremental 4m 30s. <b>After modularization</b> (ongoing — ~40 modules now): cold 9m 40s, incremental 58s. <b>After cache hashing fix:</b> cold 4m 10s on CI (cache hit). <b>After WMO + catalog cleanup:</b> incremental 28s. Single biggest lever: modularization. Single quickest win: stable cache keys.
                </CalloutBox>
            </div>
        </section>
    );
}
