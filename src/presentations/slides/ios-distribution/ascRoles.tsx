import { C, Reveal, SectionLabel, SectionHeading, CalloutBox } from "../../shared.tsx";
import { P, TimingBadge } from "./ui.tsx";

const ROLES = [
    { role: "Account Holder", count: "1", scope: "Legal owner of the ASC account. Only one. Transfer requires Apple support.", access: "everything", color: C.red },
    { role: "Admin", count: "few", scope: "Full ASC access except billing & legal agreements. Can invite users, manage apps, submit.", access: "everything except legal", color: C.red },
    { role: "App Manager", count: "per app", scope: "Scoped to specific apps. Can upload builds, edit metadata, submit for review. Can't manage users.", access: "assigned apps", color: C.yellow },
    { role: "Developer", count: "many", scope: "Upload builds only. Can't submit, can't edit metadata.", access: "builds only", color: C.blue },
    { role: "Marketing", count: "few", scope: "Edit App Store metadata + screenshots. Cannot upload builds or submit.", access: "store listing", color: C.purple },
    { role: "Sales", count: "1–3", scope: "Read-only access to Sales & Trends + Payments reports.", access: "reports", color: C.accent },
    { role: "Finance", count: "1–2", scope: "Banking info, tax forms, payouts. Usually finance team outside engineering.", access: "banking & tax", color: C.accent },
    { role: "Customer Support", count: "few", scope: "Resolution Center only — reply to reviewer messages without metadata access.", access: "review replies", color: P },
];

export function AscRolesSection() {
    return (
        <section id="s-asc-roles" style={{ padding: "96px 48px", background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>
                        APP STORE CONNECT ROLES <TimingBadge minutes="1:30" color={P} reference />
                    </SectionLabel>
                    <SectionHeading sub="Eight built-in roles. Most teams over-assign Admin and regret it the first time a marketing hire accidentally submits a staged build. The principle of least privilege pays rent here.">
                        ASC roles — the access matrix nobody reads
                    </SectionHeading>
                </Reveal>

                <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 20px", marginBottom: 24 }}>
                    <div style={{
                        display: "grid", gridTemplateColumns: "180px 80px 1fr 180px", gap: 14,
                        padding: "8px 0", borderBottom: `1px solid ${C.border}`,
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                        color: C.muted, letterSpacing: "0.1em",
                    }}>
                        <div>ROLE</div><div>TYPICAL</div><div>SCOPE</div><div>ACCESS</div>
                    </div>
                    {ROLES.map((r) => (
                        <div key={r.role} style={{
                            display: "grid", gridTemplateColumns: "180px 80px 1fr 180px", gap: 14,
                            padding: "12px 0", borderBottom: `1px solid ${C.border}`, alignItems: "flex-start",
                        }}>
                            <div style={{
                                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13,
                                color: r.color,
                            }}>
                                {r.role}
                            </div>
                            <div style={{
                                fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.muted,
                            }}>
                                {r.count}
                            </div>
                            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.55 }}>{r.scope}</div>
                            <div style={{
                                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                                color: r.color, letterSpacing: "0.08em",
                            }}>
                                {r.access}
                            </div>
                        </div>
                    ))}
                </div>

                <CalloutBox color={C.red} icon="🔐" label="OUR RECOMMENDED DEFAULT">
                    <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.65 }}>
                        CI service account → <b>Developer</b> (upload only). Release captains → <b>App Manager</b> on their apps. Marketing → <b>Marketing</b>. Finance → <b>Finance</b>. <b>Two humans</b> with Admin, one Account Holder. Never leave the Account Holder email tied to a single departed engineer.
                    </p>
                </CalloutBox>
            </div>
        </section>
    );
}
