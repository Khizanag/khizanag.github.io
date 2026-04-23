import { C, Reveal, SectionLabel, SectionHeading, CalloutBox } from "../../shared.tsx";

const PROBLEM_KEYFRAMES = `
@keyframes file-pop {
  0%   { opacity: 0; transform: translateY(6px) scale(0.92); }
  60%  { opacity: 1; transform: translateY(0)    scale(1.04); }
  100% { opacity: 1; transform: translateY(0)    scale(1);    }
}
@keyframes count-glow {
  0%, 100% { text-shadow: 0 0 12px rgba(255,77,109,0.25); }
  50%      { text-shadow: 0 0 28px rgba(255,77,109,0.55); }
}
`;

type FileEntry = { name: string; modified?: boolean };
type LayerFiles = { layer: string; color: string; files: FileEntry[] };

const LAYER_FILES: LayerFiles[] = [
    {
        layer: "PRESENTATION",
        color: C.blue,
        files: [
            { name: "ScreenView.swift" },
            { name: "ScreenViewModel.swift" },
            { name: "DefaultScreenViewModel.swift" },
            { name: "ScreenState.swift" },
            { name: "ScreenIntent.swift" },
            { name: "ScreenRouter.swift" },
            { name: "DefaultScreenRouter.swift" },
            { name: "ScreenViewFactory.swift" },
            { name: "DefaultScreenViewFactory.swift" },
            { name: "ScreenInjection.swift" },
            { name: "Destination.swift", modified: true },
            { name: "Injection.swift", modified: true },
            { name: "en.lproj/Localizable.strings", modified: true },
            { name: "ru.lproj/Localizable.strings", modified: true },
            { name: "uz.lproj/Localizable.strings", modified: true },
        ],
    },
    {
        layer: "DOMAIN",
        color: C.purple,
        files: [
            { name: "GetScreenDataUseCase.swift" },
            { name: "DefaultGetScreenDataUseCase.swift" },
            { name: "ScreenRepository.swift" },
            { name: "ScreenModel.swift" },
            { name: "ScreenInjection+Domain.swift" },
        ],
    },
    {
        layer: "DATA",
        color: C.yellow,
        files: [
            { name: "DefaultScreenRepository.swift" },
            { name: "ScreenRemoteDataSource.swift" },
            { name: "DefaultScreenRemoteDataSource.swift" },
            { name: "ScreenDTO.swift" },
            { name: "ScreenDTOToDomainMapper.swift" },
            { name: "DefaultScreenDTOToDomainMapper.swift" },
            { name: "GetScreenDataRequest.swift" },
            { name: "ScreenInjection+Data.swift" },
        ],
    },
];

const TOTAL_FILES = LAYER_FILES.reduce((sum, l) => sum + l.files.length, 0);
const MODIFIED_FILES = LAYER_FILES.reduce(
    (sum, l) => sum + l.files.filter((f) => f.modified).length,
    0,
);
const CREATED_FILES = TOTAL_FILES - MODIFIED_FILES;

const MODIFIED_COLOR = C.yellow;

export function ProblemSection() {
    return (
        <section id="s-problem" style={{ padding: "96px 48px" }}>
            <style>{PROBLEM_KEYFRAMES}</style>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.red}>THE PROBLEM</SectionLabel>
                    <SectionHeading sub={`A new screen used to mean ${CREATED_FILES} new files created and ${MODIFIED_FILES} central files modified by hand. Easy to miss a step, and the first miss usually shows up in Dev Mode after QA.`}>
                        Screen scaffolding is mechanical, but expensive
                    </SectionHeading>
                </Reveal>

                {/* Legend */}
                <Reveal delay={0.04}>
                    <div style={{
                        display: "flex", gap: 20, justifyContent: "center", marginTop: 18, marginBottom: 10,
                    }}>
                        <LegendDot color={C.blue}      label="CREATED" />
                        <LegendDot color={MODIFIED_COLOR} label="MODIFIED (central file)" dashed />
                    </div>
                </Reveal>

                {/* The full inventory — 3 layers, organized by colour */}
                <Reveal delay={0.08}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, marginTop: 14 }}>
                        {LAYER_FILES.map((layer, li) => (
                            <div key={layer.layer} style={{
                                background: C.surface, border: `1px solid ${C.border}`,
                                borderTop: `2px solid ${layer.color}`, borderRadius: 12,
                                padding: "18px 18px 16px",
                            }}>
                                <div style={{
                                    display: "flex", alignItems: "baseline", justifyContent: "space-between",
                                    marginBottom: 14,
                                }}>
                                    <div style={{
                                        fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 11,
                                        letterSpacing: "0.14em", color: layer.color,
                                    }}>{layer.layer}</div>
                                    <div style={{
                                        fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20,
                                        color: `${layer.color}80`, letterSpacing: "-0.02em",
                                    }}>{layer.files.length}</div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                    {layer.files.map((file, fi) => {
                                        const color = file.modified ? MODIFIED_COLOR : layer.color;
                                        return (
                                            <div key={file.name} style={{
                                                display: "flex", alignItems: "center", gap: 8,
                                                padding: "5px 10px", borderRadius: 6,
                                                background: C.bg,
                                                border: file.modified
                                                    ? `1px dashed ${MODIFIED_COLOR}60`
                                                    : `1px solid ${C.border}`,
                                                fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5,
                                                color: file.modified ? MODIFIED_COLOR : C.muted,
                                                animation: `file-pop 0.4s ease ${0.15 + li * 0.08 + fi * 0.03}s both`,
                                            }}>
                                                <span style={{
                                                    width: 10, textAlign: "center",
                                                    color, fontWeight: 700, fontSize: 11,
                                                    flexShrink: 0,
                                                }}>{file.modified ? "~" : "+"}</span>
                                                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                    {file.name}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </Reveal>

                {/* The absurd total */}
                <Reveal delay={0.3}>
                    <div style={{
                        marginTop: 28, padding: "22px 28px",
                        background: `${C.red}08`, border: `1px solid ${C.red}40`, borderLeft: `3px solid ${C.red}`,
                        borderRadius: 12,
                        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
                    }}>
                        <div>
                            <div style={{
                                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11,
                                letterSpacing: "0.14em", color: C.muted, marginBottom: 6,
                            }}>TOTAL HAND-AUTHORED ARTEFACTS, PER SCREEN</div>
                            <div style={{
                                fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.text, lineHeight: 1.55,
                            }}>
                                <strong style={{ color: C.blue }}>{CREATED_FILES} created</strong>
                                {" · "}
                                <strong style={{ color: MODIFIED_COLOR }}>{MODIFIED_FILES} modified</strong>
                                {" "}for <strong style={{ color: C.text }}>one</strong> new screen. Copied from a neighbour, renamed by hand, registered by hand, localised by hand — and <strong style={{ color: C.red }}>one missing line anywhere</strong> surfaces as a silent runtime bug.
                            </div>
                        </div>
                        <div style={{
                            fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 72, lineHeight: 1,
                            color: C.red, letterSpacing: "-0.04em",
                            animation: "count-glow 2.4s ease-in-out infinite",
                            flexShrink: 0,
                        }}>
                            {TOTAL_FILES}
                            <span style={{ fontSize: 24, color: `${C.red}80`, marginLeft: 4 }}>files</span>
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.46}>
                    <div style={{ marginTop: 20 }}>
                        <CalloutBox color={C.red} icon="⚠️" label="CORE INSIGHT">
                            LLMs follow prose invariants until token pressure hits. The fix isn&apos;t more prose — it&apos;s fewer invariants encoded in code.
                            That insight drove every single one of the 10 roadmap items shipped today.
                        </CalloutBox>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

function LegendDot({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 22, height: 18, borderRadius: 4,
                background: C.bg,
                border: dashed ? `1px dashed ${color}80` : `1px solid ${color}80`,
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700,
                color,
            }}>{dashed ? "~" : "+"}</span>
            <span style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10.5,
                letterSpacing: "0.12em", color: C.muted,
            }}>{label}</span>
        </div>
    );
}
