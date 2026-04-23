import { useState, useRef } from "react";
import { C, Reveal, SectionLabel, SectionHeading, useLocalTabNav } from "../../shared.tsx";
import { P, TimingBadge } from "./ui.tsx";

const ERRORS: Array<{ code: string; label: string; cause: string; fix: string }> = [
    {
        code: "ITMS-90683",
        label: "Missing Purpose String",
        cause: "Your binary links a framework that uses NSCamera/Microphone/etc. but Info.plist lacks NSCameraUsageDescription (or sibling). Often caused by a transitive SDK (Firebase, Sentry, a video SDK) pulling AVFoundation.",
        fix: "Add the matching NSXxxUsageDescription key with a human sentence. YES, even if your own code doesn&rsquo;t call it — the framework link triggers it. Use `otool -L` to find which .framework pulled the API.",
    },
    {
        code: "ITMS-90078",
        label: "Missing Push Notification Entitlement",
        cause: "App links PushKit or UserNotifications BUT provisioning profile has no aps-environment entitlement.",
        fix: "Enable Push Notifications capability in Xcode → Signing & Capabilities. Regenerate the profile. Most common cause: capability enabled on Debug target, missed on Release.",
    },
    {
        code: "ITMS-91053",
        label: "Missing API declaration in Privacy Manifest",
        cause: "You use a Required Reason API (NSUserDefaults, File timestamps, System Boot Time, Disk Space) without declaring it in PrivacyInfo.xcprivacy. Mandatory since May 2024.",
        fix: "Add NSPrivacyAccessedAPITypes with the matching NSPrivacyAccessedAPIType key + NSPrivacyAccessedAPITypeReasons. Apple lists ~30 valid reason codes per API. Pick the specific one.",
    },
    {
        code: "ITMS-90685",
        label: "CFBundleIdentifier Collision",
        cause: "Two frameworks inside your .ipa have the same CFBundleIdentifier. Classic trigger: two transitive SDKs both vendor a fork of SwiftProtobuf with default bundle ID.",
        fix: "Set IBSC_MODULE / PRODUCT_BUNDLE_IDENTIFIER explicitly for the vendored framework. Or patch the Podspec. Long-term: avoid two SDKs that vendor the same lib.",
    },
    {
        code: "ITMS-90338",
        label: "Non-public API usage",
        cause: "Static binary scan found a symbol matching Apple&rsquo;s private-API blocklist. Often a false positive from obfuscated string concatenation or a 3rd-party SDK using runtime reflection.",
        fix: "Apple email names the exact symbol. Grep your .ipa via `nm | c++filt`. Contact SDK vendor — almost always their fault. Worst-case: patch + rebuild the SDK.",
    },
    {
        code: "ITMS-90809",
        label: "Deprecated API usage — UIWebView",
        cause: "You or a transitive SDK still links UIWebView. Blocked since iOS 12, enforced at submission since 2020.",
        fix: "Strip UIWebView from the offending SDK or upgrade the SDK. `grep -r UIWebView .` is your friend. Zendesk, OneSignal, Branch were major offenders — all fixed now.",
    },
    {
        code: "ITMS-90208",
        label: "Invalid Bundle Structure",
        cause: "Extra files inside Frameworks/ that shouldn&rsquo;t be there: .bcsymbolmap, .DS_Store, stripped symbols, source maps, debug-only resources.",
        fix: "Add a `Run Script` phase before signing: `find ${BUILT_PRODUCTS_DIR} -name '.DS_Store' -delete`. Ensure Strip Debug Symbols = YES for Release. Fix once, forget.",
    },
    {
        code: "ITMS-90206",
        label: "Invalid Frameworks Directory",
        cause: "Nested .framework inside another .framework. Apple doesn&rsquo;t allow recursive framework embedding. Often happens when an XCFramework vendor includes its own dependency.",
        fix: "Set Do Not Embed on the inner framework; embed it once at the app target level. Requires knowing the dependency graph of your SDK — ask the vendor for a `strip-frameworks.sh` script.",
    },
    {
        code: "ITMS-90334",
        label: "Invalid Code Signing Entitlements",
        cause: "Entitlements file asks for a capability (e.g. com.apple.developer.associated-domains) NOT enabled on the App ID.",
        fix: "ASC → Identifiers → your bundle ID → turn on the capability → regenerate profile. The entitlement XML and the App ID must agree 100%.",
    },
    {
        code: "90482",
        label: "Invalid Bundle: disallowed binary",
        cause: "Submitting an Intel-only binary to iOS / VisionOS, or including a simulator slice in the Release build. Common with XCFrameworks that ship both archs.",
        fix: "Add a Run Script to strip simulator slices before signing (Carthage&rsquo;s copy-frameworks.sh does this). For XCFrameworks, ensure you&rsquo;re linking the correct `.xcframework` variant.",
    },
];

export function ErrorDecoderSection() {
    const [active, setActive] = useState(0);
    const activeRef = useRef(active);
    activeRef.current = active;
    useLocalTabNav("s-errors", ERRORS.length, activeRef, setActive);
    const err = ERRORS[active];

    return (
        <section id="s-errors" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>ITMS ERROR DECODER <TimingBadge minutes="2:00" color={P} reference /></SectionLabel>
                    <SectionHeading sub="The ten ITMS-* codes every senior iOS engineer has seen at midnight before a release. What actually causes them, and the single-line fix.">
                        Decode what ASC is actually telling you
                    </SectionHeading>
                </Reveal>

                {/* Tabs */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                    {ERRORS.map((e, i) => (
                        <button
                            key={e.code}
                            onClick={() => setActive(i)}
                            style={{
                                background: i === active ? P : C.bg,
                                color: i === active ? C.bg : C.text,
                                border: `1px solid ${i === active ? P : C.border}`, borderRadius: 8,
                                padding: "8px 14px", fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 11, fontWeight: 700, cursor: "pointer",
                                letterSpacing: "0.03em", transition: "all 150ms",
                            }}
                        >
                            {e.code}
                        </button>
                    ))}
                </div>

                {/* Detail panel */}
                <div style={{
                    background: C.bg, border: `2px solid ${P}40`, borderRadius: 12,
                    padding: "32px 36px", minHeight: 280,
                }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 20 }}>
                        <code style={{
                            fontFamily: "'JetBrains Mono', monospace", fontSize: 16, color: P,
                            fontWeight: 700,
                        }}>{err.code}</code>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: C.text }}>
                            {err.label}
                        </div>
                    </div>
                    <div style={{ marginBottom: 20 }}>
                        <div style={{
                            fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.1em",
                            color: C.red, marginBottom: 8,
                        }}>WHAT&rsquo;S ACTUALLY HAPPENING</div>
                        <div style={{ fontSize: 13.5, color: C.text, lineHeight: 1.7 }}
                             dangerouslySetInnerHTML={{ __html: err.cause }} />
                    </div>
                    <div>
                        <div style={{
                            fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.1em",
                            color: C.accent, marginBottom: 8,
                        }}>FIX</div>
                        <div style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.7 }}
                             dangerouslySetInnerHTML={{ __html: err.fix }} />
                    </div>
                </div>

                <div style={{ marginTop: 20, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.muted, letterSpacing: "0.1em" }}>
                    ← / → ARROWS TO CYCLE · {active + 1} / {ERRORS.length}
                </div>
            </div>
        </section>
    );
}
