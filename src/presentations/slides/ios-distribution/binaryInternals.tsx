import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, CalloutBox, PlainEnglishBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function BinaryInternalsSection() {
    return (
        <section id="s-binary" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>WHAT&rsquo;S IN AN .IPA</SectionLabel>
                    <SectionHeading sub="An .ipa is a .zip. The moment you know what&rsquo;s inside it, 80% of distribution bugs get easier — and App Review stops feeling like a black box.">
                        Binary anatomy + how Apple thins it
                    </SectionHeading>
                </Reveal>

                <PlainEnglishBox color={P}>
                    <b>Rename any .ipa to .zip and unzip it.</b> What you see is exactly what the App Store stores, what iOS installs, and what reviewers analyze. Every debug-before-release session starts here.
                </PlainEnglishBox>

                <CodeBlock filename="unzip -l TBC-Prod.ipa | structure">{`$ mv TBC-Prod.ipa TBC-Prod.zip &amp;&amp; unzip -l TBC-Prod.zip

Payload/
└── TBC.app/
    ├── TBC                              ← Mach-O binary (fat or single-arch)
    ├── Info.plist                       ← your CFBundleIdentifier, version, etc.
    ├── embedded.mobileprovision         ← the profile you ship
    ├── _CodeSignature/CodeResources     ← hash of every resource
    ├── PkgInfo                          ← legacy 8-byte file (APPL????)
    ├── Assets.car                       ← compiled asset catalog
    ├── en.lproj/                        ← localizations
    │   └── Localizable.strings
    ├── ru.lproj/ uz.lproj/ ...
    ├── Frameworks/                      ← embedded dynamic frameworks
    │   ├── Firebase.framework/
    │   │   ├── Firebase
    │   │   ├── Info.plist
    │   │   └── _CodeSignature/
    │   ├── Sentry.framework/
    │   └── libswiftCore.dylib ← (if not linked against system swift)
    ├── PlugIns/                         ← extensions (share ext, widgets, intents)
    │   └── TBCShareExtension.appex/
    ├── Watch/                           ← companion watchOS app if any
    └── GoogleService-Info.plist         ← (if using Firebase)

iTunesMetadata.plist                     ← ASC metadata, added at upload`}</CodeBlock>

                {/* Size */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginTop: 40, marginBottom: 16 }}>
                    App Thinning — what the user actually downloads
                </div>
                <CodeBlock filename="the journey: your .ipa → App Store → iPhone install">{`# What you upload to ASC:
TBC-Prod.ipa                                   198 MB  (fat binary)
  ├── arm64 slice                                78 MB
  ├── arm64e slice (A12+)                        82 MB
  ├── assets for @1x/@2x/@3x                     28 MB
  └── universal .nib, .car for all devices       10 MB

# App Store re-slices it into variants:
TBC-iPhone14Pro.app     arm64e + @3x assets    112 MB  ← what user downloads
TBC-iPhoneSE3.app       arm64 + @2x assets      96 MB
TBC-iPadPro11.app       arm64 + @2x + iPad     124 MB

# On-Demand Resources pulled later:
TBC-odr-tutorial-pack                            18 MB  ← on first tutorial open
TBC-odr-contactless-pack                         12 MB  ← when user enables Apple Pay

# The 4GB App Store cellular limit applies to INITIAL variant only.
# ODR + in-app content don't count.`}</CodeBlock>

                {/* dSYM */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginTop: 40, marginBottom: 16 }}>
                    dSYM + BCSymbolMap — the parallel archive
                </div>
                <CodeBlock filename="TBC.xcarchive/ structure">{`TBC-2026-04-21.xcarchive/
├── Info.plist
├── Products/Applications/TBC.app/      ← the .app (unsigned copy)
├── dSYMs/                              ← the debug-symbol files
│   ├── TBC.app.dSYM/
│   ├── Firebase.framework.dSYM/
│   └── Sentry.framework.dSYM/
├── BCSymbolMaps/                       ← bitcode symbol maps (legacy)
│   └── 4F0E7B...bcsymbolmap
└── SCMBlueprint/                       ← repo/commit of each linked framework
    └── project.xcscmblueprint

# Why this matters:
# 1. Crashlytics/Sentry need the dSYM UUIDs to symbolicate crashes
# 2. Lose the .xcarchive, lose the ability to read prod crashes
# 3. ALWAYS archive to ~/Library/Developer/Xcode/Archives; back up to
#    Bitrise artifacts + team S3`}</CodeBlock>

                <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    <CalloutBox color={C.yellow} icon="🗑" label="BITCODE — DEAD AS OF iOS 14">
                        Bitcode was Apple&rsquo;s intermediate-LLVM upload format, supposed to let Apple re-optimize your binary server-side. Deprecated in Xcode 14 (2022). If an older project still has <code>ENABLE_BITCODE = YES</code>, <b>set it to NO</b>. Submission will reject otherwise.
                    </CalloutBox>
                    <CalloutBox color={C.accent} icon="🔍" label="INSPECTING PROD BINARIES">
                        <code>otool -L</code> shows linked dylibs. <code>nm</code> shows symbols. <code>strings</code> shows embedded URLs/keys. <code>codesign -dvvv --entitlements :-</code> shows entitlements. <b>Review your own binary before submission</b> — find the secrets you forgot to strip.
                    </CalloutBox>
                </div>

                <div style={{ marginTop: 20 }}>
                    <CodeBlock filename="uploading — altool (legacy) → notarytool (current)">
{`# Upload to App Store Connect (current, 2026)
$ xcrun altool --upload-app \\
    --type ios \\
    --file TBC-Prod.ipa \\
    --apiKey "$APP_STORE_CONNECT_API_KEY_ID" \\
    --apiIssuer "$APP_STORE_CONNECT_API_ISSUER"

# Notarize a macOS build (Catalyst / Mac app — not needed for pure iOS)
$ xcrun notarytool submit TBC-Mac.pkg \\
    --key AuthKey.p8 \\
    --key-id "$APP_STORE_CONNECT_API_KEY_ID" \\
    --issuer "$APP_STORE_CONNECT_API_ISSUER" \\
    --wait

# Fetch the notarization log for a rejected submission
$ xcrun notarytool log <submission-id> --key AuthKey.p8 \\
    --key-id KEY --issuer ISSUER notary-log.json`}
                    </CodeBlock>
                </div>
            </div>
        </section>
    );
}
