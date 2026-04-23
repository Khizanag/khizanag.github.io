import { C, Reveal, SectionLabel, SectionHeading, CheckItem, CalloutBox } from "../../shared.tsx";
import { P } from "./ui.tsx";
import { TimingBadge } from "./ui.tsx";

interface ChecklistColumn {
    label: string;
    icon: string;
    color: string;
    items: { text: string; critical?: boolean }[];
}

const COLUMNS: ChecklistColumn[] = [
    {
        label: "T-1 DAY · BUILD & METADATA",
        icon: "🔧",
        color: P,
        items: [
            { text: "Version + build number bumped in project.pbxproj (and both widget / extension targets)", critical: true },
            { text: "Release notes written in every locale your app supports (not auto-translated)" },
            { text: "Screenshots re-verified on current build — no stale copy, no fake data" },
            { text: "Demo account credentials tested from a fresh device + airplane-mode flow works" },
            { text: "Privacy Manifest covers every third-party SDK you added this sprint" },
            { text: "Review Notes include: demo account, deep-link samples, region caveats" },
        ],
    },
    {
        label: "T-0 · SUBMIT",
        icon: "🚀",
        color: C.yellow,
        items: [
            { text: "Phased Release toggled ON (7-day default curve)", critical: true },
            { text: "Manual Release toggled ON — ship only when the team says go" },
            { text: "'Auto-release' disabled to avoid Friday 6 PM surprises" },
            { text: "Crash-rate pause threshold configured in ASC (default: 0.5%)" },
            { text: "Feature flags for new work default OFF on the shipped build" },
            { text: "Slack/JIRA hook: 'App Status Changed' webhook is live in #releases" },
        ],
    },
    {
        label: "T+0–7 DAYS · MONITOR",
        icon: "📈",
        color: C.accent,
        items: [
            { text: "Day 1: crash-rate dashboard open. Sentry + Firebase baselines noted", critical: true },
            { text: "Day 1: App Store Connect analytics — installs & conversion tracked hourly" },
            { text: "Day 2: review reply triaged if Apple flagged anything post-approval" },
            { text: "Day 3: phased rollout auto-advances → confirm no spike, override if needed" },
            { text: "Day 7: 100% rollout → retrospective, capture lessons, update this checklist" },
            { text: "Always: What's New reply-inbox monitored — user bug reports first line of defense" },
        ],
    },
];

const RED_FLAGS = [
    "Demo credentials not tested in last 48h → Guideline 2.1 risk",
    "Privacy Manifest missing for SDK added this sprint → Guideline 5.1.2 risk",
    "Screenshots haven't been refreshed since 3 builds ago → Guideline 2.3.3 risk",
    "Version number still matches previous submission → ITMS-90478 (duplicate build)",
    "'Uses Non-Exempt Encryption' not set → automated reject",
    "Feature flag default for untested feature is ON in build → worst-case production surprise",
];

export function ShipDayChecklistSection() {
    return (
        <section id="s-shipday" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.accent}>
                        ACT 08 · THE ARTIFACT <TimingBadge minutes="2:00" color={C.accent} />
                    </SectionLabel>
                    <SectionHeading sub="If you screenshot one slide from this talk, let it be this one. The 18-item checklist we actually run at SpaceInt before, during, and after every release.">
                        Ship-day checklist
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
                    {COLUMNS.map((col) => (
                        <div
                            key={col.label}
                            style={{
                                background: C.surface, border: `1px solid ${col.color}25`,
                                borderRadius: 14, padding: "22px 24px",
                                display: "flex", flexDirection: "column",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                                <span style={{ fontSize: 18 }}>{col.icon}</span>
                                <span style={{
                                    fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                                    color: col.color, letterSpacing: "0.12em", fontWeight: 700,
                                }}>
                                    {col.label}
                                </span>
                            </div>
                            {col.items.map((item, i) => (
                                <CheckItem key={i} active={false}>
                                    <span style={{ color: item.critical ? col.color : C.text, fontWeight: item.critical ? 700 : 500 }}>
                                        {item.text}
                                    </span>
                                    {item.critical && (
                                        <span style={{
                                            display: "inline-block", marginLeft: 6, padding: "1px 6px",
                                            background: `${col.color}20`, border: `1px solid ${col.color}40`,
                                            borderRadius: 4, fontFamily: "'JetBrains Mono', monospace",
                                            fontSize: 9, color: col.color, letterSpacing: "0.1em", fontWeight: 700,
                                            verticalAlign: "middle",
                                        }}>
                                            CRITICAL
                                        </span>
                                    )}
                                </CheckItem>
                            ))}
                        </div>
                    ))}
                </div>

                <CalloutBox color={C.red} icon="🚩" label="BEFORE YOU HIT SUBMIT — RED FLAG SWEEP">
                    <ul style={{ margin: "6px 0 0 20px", padding: 0, fontSize: 12, color: C.muted, lineHeight: 2 }}>
                        {RED_FLAGS.map((flag, i) => (
                            <li key={i}>{flag}</li>
                        ))}
                    </ul>
                </CalloutBox>
            </div>
        </section>
    );
}
