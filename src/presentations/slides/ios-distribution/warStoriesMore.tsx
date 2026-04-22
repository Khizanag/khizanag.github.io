import { C, Reveal, SectionLabel, SectionHeading, InfoCard } from "../../shared.tsx";
import { P, WarStoryHeader } from "./ui.tsx";

const STORIES = [
    {
        year: "SEP 2015",
        app: "XcodeGhost",
        verdict: "banned" as const,
        title: "The malware that got into 4000 App Store apps",
        body: "Chinese developers downloaded Xcode from a local mirror because Apple's CDN was slow. The mirror had a tampered Xcode that injected malware into every build. WeChat, Didi, Angry Birds 2 &mdash; all infected. First case of App Store-wide supply chain compromise. Response: Xcode now shows a warning when not code-signed by Apple, and ASC scans for known XcodeGhost signatures.",
        lesson: "Always download Xcode from developer.apple.com. Never from a mirror. This is why our CI pins Xcode version.",
    },
    {
        year: "APR 2017",
        app: "Uber",
        verdict: "resolved" as const,
        title: "Fingerprinting iPhones past Tim Cook's limit",
        body: "Uber tagged iPhones with a persistent device fingerprint that survived app deletion &mdash; to prevent fraudulent driver sign-ups. Tim Cook personally called CEO Travis Kalanick to his office. Uber had ~30 days to remove the code or face App Store ban. Code removed in v3.213.",
        lesson: "&ldquo;Works for fraud prevention&rdquo; is not an excuse for private API use. Guideline 2.5.1 applies to everyone.",
    },
    {
        year: "JAN 2022",
        app: "Wordle clones",
        verdict: "banned" as const,
        title: "The 'Wordle!' copycat massacre",
        body: "Days after Wordle went viral (Josh Wardle's free browser game, no iOS app), dozens of clones named &ldquo;Wordle - The App&rdquo; hit the App Store. Most were $0.99, many had in-app subscriptions. Apple pulled them under Guideline 4.3 (spam) and 5.2 (IP). One dev, Zach Shakked, kept his clone monetized with ads for 48 hours and earned $200K before removal.",
        lesson: "If a game goes viral on the web, do NOT race to put a clone on the App Store. Copycat rejections are fast and permanent.",
    },
    {
        year: "NOV 2019",
        app: "Clubhouse / Houseparty",
        verdict: "resolved" as const,
        title: "Guideline 4.2.7 — game-streaming apps",
        body: "Microsoft and NVIDIA tried to ship cloud game-streaming apps (xCloud, GeForce NOW). Apple rejected under a rule that said each streamed game had to be individually approved. Microsoft: &ldquo;We never imagined we'd need to ship Super Mario as a separate App Store app.&rdquo; Apple later loosened the rule in 2024 after EU pressure.",
        lesson: "Guidelines evolve. What&rsquo;s banned today may be allowed next year &mdash; but don&rsquo;t bet a release on it.",
    },
    {
        year: "APR 2021",
        app: "Fakespot",
        verdict: "resolved" as const,
        title: "Apple vs browser extensions (on iOS)",
        body: "Fakespot's iOS browser showed counterfeit-product warnings over Amazon pages. Amazon filed a trademark complaint. Apple removed Fakespot within hours. Fakespot restored 18 days later after Amazon and Apple's legal teams concluded the overlay was fair use. Illustrates how third-party IP complaints can disable an app between business days.",
        lesson: "A brand-name complaint can remove your app in under 4 hours, no review needed. Have a PR and legal response ready.",
    },
    {
        year: "MAR 2024",
        app: "PCalc / Flighty / Halide",
        verdict: "resolved" as const,
        title: "The Core Technology Fee crisis (EU)",
        body: "When the EU DMA forced Apple to allow alternative app stores, Apple introduced a &lsquo;Core Technology Fee&rsquo; (&euro;0.50 per first annual install above 1M). Indie apps with viral moments would owe Apple millions. After weeks of pushback from Marco Arment, James Thomson, others, Apple updated the terms: free apps, educational, nonprofits exempt. Commercial terms remain complex.",
        lesson: "New revenue terms can appear overnight. Always read the latest developer agreement before a major release.",
    },
];

export function WarStoriesMoreSection() {
    return (
        <section id="s-war-more" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.red}>RAPID-FIRE WAR STORIES</SectionLabel>
                    <SectionHeading sub="Six more real cases, each with a one-line takeaway. These are the stories that don&rsquo;t make it onto the main App Store review page &mdash; but changed the rules anyway.">
                        Six more cases worth knowing
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                    {STORIES.map((s) => (
                        <InfoCard
                            key={s.year + s.app}
                            color={s.verdict === "banned" ? C.red : s.verdict === "resolved" ? C.accent : C.yellow}
                            title={s.title}
                        >
                            <div style={{ marginBottom: 12 }}>
                                <WarStoryHeader year={s.year} app={s.app} verdict={s.verdict} color={s.verdict === "banned" ? C.red : C.accent} />
                            </div>
                            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 12 }}>
                                {s.body}
                            </p>
                            <div style={{
                                padding: "10px 14px", background: `${P}08`, border: `1px solid ${P}25`,
                                borderLeft: `3px solid ${P}`, borderRadius: 6,
                                fontSize: 12, color: C.text, lineHeight: 1.55,
                            }}>
                                <b style={{ color: P }}>Lesson:</b> {s.lesson}
                            </div>
                        </InfoCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
