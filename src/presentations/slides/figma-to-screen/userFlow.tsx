import { C, Reveal, SectionLabel, SectionHeading, PlainEnglishBox } from "../../shared.tsx";
import { P, PDim } from "./ui.tsx";

export function UserFlowSection() {
    return (
        <section id="s-user-flow" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.blue}>FROM YOUR CHAIR</SectionLabel>
                    <SectionHeading sub="No internals yet. Just what you do, and what comes out. Everything in between is the rest of the deck.">
                        What the developer actually experiences
                    </SectionHeading>
                </Reveal>

                <Reveal delay={0.1}>
                    <div style={{ marginTop: 28, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "32px 28px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr) auto repeat(2, 1fr)", gap: 12, alignItems: "stretch" }}>
                            <UserStep icon="🎨" title="Open Figma" body="Screen frame you want to ship" color={C.muted} />
                            <UserStep icon="🔗" title="Copy URL" body="?node-id=1234-5678" color={C.muted} />
                            <UserStep icon="⌨️" title="Paste in chat" body="/figma-to-screen" color={P} highlight />
                            <UserStep icon="📝" title="Answer 4 prompts" body="Name · module · flags" color={C.muted} />
                            <UserStep icon="☕️" title="Wait ~8 min" body="Agents do the rest" color={C.muted} />
                            <div style={{ alignSelf: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: 28, color: P }}>→</div>
                            <UserStep icon="🤖" title="The black box" body="17 agents · 8 phases · 7 gates" color={P} boxed />
                            <UserStep icon="✅" title="Read the log" body="Review · fix TODOs · merge" color={C.accent} />
                        </div>
                        <div style={{ marginTop: 28, paddingTop: 24, borderTop: `1px dashed ${C.border}`, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16 }}>
                            <OutcomeChip label="View + ViewModel + Router + Factory + DI" color={P} />
                            <OutcomeChip label="Destination case + root Injection entry" color={C.blue} />
                            <OutcomeChip label="Localised strings (real EN · sibling TODO)" color={C.purple} />
                            <OutcomeChip label="Feature branch · commit · session log" color={C.yellow} />
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.25}>
                    <div style={{ marginTop: 24 }}>
                        <PlainEnglishBox color={C.blue}>
                            That&apos;s the whole job from the user&apos;s perspective. You never run an agent directly. You never edit a template. You never configure MCP per-run. You paste a URL, you answer four questions, you get a reviewable pull-request-ready screen. The rest of the deck is <strong>why and how</strong> the black box works — so that when it misbehaves, you know where to look.
                        </PlainEnglishBox>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

interface StepProps {
    icon: string;
    title: string;
    body: string;
    color: string;
    highlight?: boolean;
    boxed?: boolean;
}

function UserStep({ icon, title, body, color, highlight, boxed }: StepProps) {
    return (
        <div style={{
            background: highlight ? PDim : boxed ? `${C.bg}` : "transparent",
            border: boxed ? `2px solid ${color}50` : highlight ? `1px solid ${color}40` : `1px solid ${C.border}`,
            borderRadius: 10,
            padding: "16px 12px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: 6,
        }}>
            <div style={{ fontSize: 24 }}>{icon}</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, color: color === C.muted ? C.text : color, letterSpacing: "0.04em" }}>{title}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, lineHeight: 1.4 }}>{body}</div>
        </div>
    );
}

function OutcomeChip({ label, color }: { label: string; color: string }) {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: C.bg,
            border: `1px solid ${color}30`,
            borderLeft: `3px solid ${color}`,
            borderRadius: 6,
            padding: "10px 12px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11.5,
            color: C.text,
            lineHeight: 1.4,
        }}>
            <span style={{ color, fontWeight: 700 }}>✓</span>
            {label}
        </div>
    );
}
