import { C, Reveal, SectionLabel, SectionHeading, FeatureCard, CalloutBox, CodeBlock, PlainEnglishBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function CrashMonitoringSection() {
    return (
        <section id="s-crashes" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>CRASH & METRIC MONITORING</SectionLabel>
                    <SectionHeading sub="Shipping the app is ~30% of distribution. The other 70% is knowing what happens in the 100k devices you can&rsquo;t reach. Here&rsquo;s the senior-level stack.">
                        What your build does after you lose sight of it
                    </SectionHeading>
                </Reveal>

                <PlainEnglishBox color={P}>
                    <b>Xcode Organizer</b> gives you aggregated Apple-privacy-preserving metrics — free, no SDK. <b>MetricKit</b> gives you daily diagnostics per device. <b>Sentry/Crashlytics/Bugsnag</b> give real-time rich crashes with network + user context. You want <b>all three</b>.
                </PlainEnglishBox>

                {/* 3 tools */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginTop: 40, marginBottom: 16 }}>
                    The three layers
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
                    <FeatureCard icon="🍎" title="Xcode Organizer" color={C.blue} delay={0}
                        description="Apple-provided. Aggregate crashes + hangs + disk/battery/launch-time. Delayed 24–72h. Privacy-preserving (no PII, no network context). Single source of TRUTH for what Apple&rsquo;s own systems see." />
                    <FeatureCard icon="📊" title="MetricKit" color={C.purple} delay={0.08}
                        description="Free on-device framework. Delivers daily MXMetricPayload + on-crash MXCrashDiagnosticPayload. Captures signpost intervals, hangs, CPU peaks. Perfect for custom dashboards (push to your own backend)." />
                    <FeatureCard icon="🚨" title="Sentry / Crashlytics / Bugsnag" color={C.accent} delay={0.16}
                        description="Real-time, rich context: breadcrumbs, network requests, custom keys, user ID. Symbolication via dSYM upload. Choose one (not two — double-attribution is a nightmare)." />
                </div>

                {/* Comparison */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 16 }}>
                    Sentry vs Crashlytics vs Bugsnag
                </div>
                <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", marginBottom: 40 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "130px 1fr 1fr 1fr", gap: 16, padding: "8px 0", borderBottom: `1px solid ${C.border}`, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.muted, letterSpacing: "0.1em" }}>
                        <div>DIMENSION</div><div>SENTRY</div><div>CRASHLYTICS</div><div>BUGSNAG</div>
                    </div>
                    {[
                        ["Pricing",   "Usage-based. ~$26/mo small, $$$ at scale",  "Free (Google subsidized)",   "Paid, $33/seat"],
                        ["Focus",     "Full APM: crashes + perf + replay",          "Crashes only",              "Crashes + errors"],
                        ["Backend",   "Self-hostable",                              "Firebase-locked",           "SaaS + on-prem"],
                        ["Symbolicate", "Auto via Fastlane plugin",                 "Auto via Fastlane plugin",  "Auto, robust"],
                        ["Privacy",   "GDPR-friendly, can self-host",               "Google data processor",      "EU region option"],
                        ["TBC pick",  "✓ In use",                                    "Rejected (Google lock-in)", "Evaluated 2023"],
                    ].map((row, i) => (
                        <div key={i} style={{
                            display: "grid", gridTemplateColumns: "130px 1fr 1fr 1fr", gap: 16,
                            padding: "10px 0", borderBottom: i < 5 ? `1px solid ${C.border}` : "none",
                            alignItems: "center",
                        }}>
                            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: C.muted }}>{row[0]}</div>
                            <div style={{ fontSize: 12, color: C.text }}>{row[1]}</div>
                            <div style={{ fontSize: 12, color: C.text }}>{row[2]}</div>
                            <div style={{ fontSize: 12, color: C.text }}>{row[3]}</div>
                        </div>
                    ))}
                </div>

                {/* MetricKit code */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 16 }}>
                    MetricKit — 20 lines to a custom dashboard
                </div>
                <CodeBlock filename="AppDelegate+MetricKit.swift">{`import MetricKit

final class MetricKitBridge: NSObject, MXMetricManagerSubscriber {
    override init() {
        super.init()
        MXMetricManager.shared.add(self)
    }

    // Delivered once per 24h per device
    func didReceive(_ payloads: [MXMetricPayload]) {
        payloads.forEach { payload in
            MetricsAPI.post(
                hangs: payload.applicationResponsivenessMetrics?.histogrammedApplicationHangTime,
                launchTime: payload.applicationLaunchMetrics?.histogrammedTimeToFirstDraw,
                cpuTime: payload.cpuMetrics?.cumulativeCPUTime,
                memoryPeak: payload.memoryMetrics?.peakMemoryUsage
            )
        }
    }

    // Delivered when the app crashes or hangs
    func didReceive(_ payloads: [MXDiagnosticPayload]) {
        payloads.forEach { payload in
            payload.crashDiagnostics?.forEach { crash in
                DiagnosticsAPI.post(signal: crash.signal?.intValue,
                                    exceptionType: crash.exceptionType,
                                    terminationReason: crash.terminationReason,
                                    callStackTree: crash.callStackTree)
            }
        }
    }
}`}</CodeBlock>

                <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    <CalloutBox color={C.yellow} icon="⚠" label="OOM — THE SILENT KILLER">
                        Out-of-memory terminations look like crashes but don&rsquo;t produce a crash log. <code>MXCrashDiagnostic.terminationReason</code> returns &lsquo;per-process-limit&rsquo; or &lsquo;FRONTBOARD&rsquo; — that&rsquo;s OOM. You&rsquo;ll never see these in Crashlytics. MetricKit is the only way. Budget: ~1.4 GB on iPhone 14 Pro, ~500 MB on iPhone SE3.
                    </CalloutBox>
                    <CalloutBox color={C.red} icon="🔐" label="dSYM UPLOAD IS NON-OPTIONAL">
                        Missing a dSYM = symbolication fails = every crash looks like &lsquo;0x1042a8b10 + 0x48&rsquo;. Automate upload in CI (Sentry + Crashlytics both ship Fastlane actions). Keep archived dSYMs <b>forever</b> — 3-year-old crashes from old OS versions still arrive.
                    </CalloutBox>
                </div>
            </div>
        </section>
    );
}
