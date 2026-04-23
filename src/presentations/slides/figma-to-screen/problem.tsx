import { C, Reveal, SectionLabel, SectionHeading, InfoCard, CheckItem, CalloutBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

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

type LayerFiles = { layer: string; color: string; files: string[] };

const LAYER_FILES: LayerFiles[] = [
    {
        layer: "PRESENTATION",
        color: C.blue,
        files: [
            "DishDetailsView.swift",
            "DishDetailsViewModel.swift",
            "DefaultDishDetailsViewModel.swift",
            "DishDetailsState.swift",
            "DishDetailsIntent.swift",
            "DishDetailsRouter.swift",
            "DefaultDishDetailsRouter.swift",
            "DishDetailsViewFactory.swift",
            "DefaultDishDetailsViewFactory.swift",
            "DishDetailsInjection.swift",
            "Destination.swift  ⚠ patch",
            "Injection.swift  ⚠ patch",
            "en.lproj/Localizable.strings",
            "ru.lproj/Localizable.strings",
            "uz.lproj/Localizable.strings",
        ],
    },
    {
        layer: "DOMAIN",
        color: C.purple,
        files: [
            "GetDishDetailsUseCase.swift",
            "DefaultGetDishDetailsUseCase.swift",
            "DishDetailsRepository.swift",
            "Dish.swift  (model)",
            "DishDetailsInjection+Domain.swift",
        ],
    },
    {
        layer: "DATA",
        color: C.yellow,
        files: [
            "DefaultDishDetailsRepository.swift",
            "DishDetailsRemoteDataSource.swift",
            "DefaultDishDetailsRemoteDataSource.swift",
            "DishDTO.swift",
            "DishDTOToDomainMapper.swift",
            "DefaultDishDTOToDomainMapper.swift",
            "GetDishDetailsRequest.swift",
            "DishDetailsInjection+Data.swift",
        ],
    },
];

const TOTAL_FILES = LAYER_FILES.reduce((sum, l) => sum + l.files.length, 0);

export function ProblemSection() {
    return (
        <section id="s-problem" style={{ padding: "96px 48px" }}>
            <style>{PROBLEM_KEYFRAMES}</style>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.red}>THE PROBLEM</SectionLabel>
                    <SectionHeading sub={`A new screen used to mean ${TOTAL_FILES} hand-authored files across Presentation, Domain, and Data — plus patches to two central files. Easy to miss a step, and the first miss usually shows up in Dev Mode after QA.`}>
                        Screen scaffolding is mechanical, but expensive
                    </SectionHeading>
                </Reveal>

                {/* The full inventory — 3 layers, organized by colour */}
                <Reveal delay={0.08}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, marginTop: 28 }}>
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
                                    {layer.files.map((file, fi) => (
                                        <div key={file} style={{
                                            display: "flex", alignItems: "center", gap: 8,
                                            padding: "5px 10px", borderRadius: 6,
                                            background: C.bg, border: `1px solid ${C.border}`,
                                            fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5,
                                            color: file.includes("⚠") ? C.yellow : C.muted,
                                            animation: `file-pop 0.4s ease ${0.15 + li * 0.08 + fi * 0.03}s both`,
                                        }}>
                                            <span style={{
                                                width: 6, height: 6, borderRadius: 2,
                                                background: file.includes("⚠") ? C.yellow : layer.color,
                                                flexShrink: 0,
                                            }} />
                                            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                {file}
                                            </span>
                                        </div>
                                    ))}
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
                                For <strong style={{ color: C.text }}>one</strong> new screen. Copied from a neighbour, renamed by hand, registered by hand, localised by hand — and <strong style={{ color: C.red }}>one missing line anywhere</strong> surfaces as a silent runtime bug.
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

                {/* What kept going wrong */}
                <div style={{ marginTop: 24 }}>
                    <Reveal delay={0.38}>
                        <InfoCard icon="🚨" title="What kept going wrong" color={C.red} tag="OBSERVED">
                            <CheckItem active={false}>Placeholder shapes leaked into committed Views</CheckItem>
                            <CheckItem active={false}>The same invariant re-implemented 3 different ways</CheckItem>
                            <CheckItem active={false}>Scaffolders re-reading the View to extract state</CheckItem>
                            <CheckItem active={false}>Self-audits missing what the first pass missed</CheckItem>
                            <CheckItem active={false}>L10n accessors compiling against stale SwiftGen</CheckItem>
                            <CheckItem active={false}>Logs written before work was actually verified</CheckItem>
                        </InfoCard>
                    </Reveal>
                </div>

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
