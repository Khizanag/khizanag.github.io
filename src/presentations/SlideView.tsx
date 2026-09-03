import { Suspense, useEffect, type CSSProperties } from "react";
import { SLIDES } from "./registry.ts";
import { CalloutBox, SectionHeading, SectionLabel } from "./shared.tsx";
import { C } from "./tokens.ts";

interface SlideViewProps {
  slideId: string;
  onBack: () => void;
}

// Read at module load so a deck title can never end up as the fallback.
const BASE_TITLE = document.title;

const FADE_STYLE: CSSProperties = {
  position: "fixed", bottom: 0, left: 0, right: 0, height: 160, zIndex: 50,
  background: `linear-gradient(to bottom, transparent, ${C.bg})`,
  pointerEvents: "none",
};

const LOADING_STYLE: CSSProperties = {
  background: C.bg, minHeight: "100vh", color: C.muted,
  display: "flex", alignItems: "center", justifyContent: "center",
  fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.18em",
};

interface NotFoundProps {
  slideId: string;
}

function NotFound({ slideId }: NotFoundProps) {
  return (
    <div style={{
      background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'DM Sans', sans-serif",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "96px 32px",
    }}>
      <div style={{ maxWidth: 520 }}>
        <SectionLabel color={C.red}>NOT FOUND</SectionLabel>
        <SectionHeading sub="This presentation is not in the collection — it may have been renamed or retired.">
          No such presentation
        </SectionHeading>
        <CalloutBox color={C.red} label="REQUESTED">
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.text }}>#{slideId}</span>
        </CalloutBox>
      </div>
    </div>
  );
}

export function SlideView({ slideId, onBack }: SlideViewProps) {
  const slide = SLIDES.find((s) => s.id === slideId);

  useEffect(() => {
    if (!slide) return;
    document.title = `${slide.title} — Giga Khizanishvili`;
    return () => { document.title = BASE_TITLE; };
  }, [slide]);

  return (
    <div>
      <div data-noprint style={FADE_STYLE} />
      <button
        data-noprint
        onClick={onBack}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(12,16,24,0.95)";
          e.currentTarget.style.borderColor = "rgba(0,255,136,0.35)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,255,136,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(5,8,15,0.80)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.4)";
        }}
        style={{
          position: "fixed", bottom: 28, left: 28, zIndex: 9999,
          display: "flex", alignItems: "center", gap: 7,
          padding: "10px 20px",
          background: "rgba(5,8,15,0.80)",
          backdropFilter: "blur(20px) saturate(160%)",
          color: "#e8edf5",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 50, cursor: "pointer",
          fontSize: 13, fontFamily: "'Syne', sans-serif", fontWeight: 600, letterSpacing: "0.01em",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M11 7H3M3 7l4-4M3 7l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        All presentations
      </button>
      {slide
        ? (
          <Suspense fallback={<div style={LOADING_STYLE}>LOADING</div>}>
            <slide.component />
          </Suspense>
        )
        : <NotFound slideId={slideId} />
      }
    </div>
  );
}
