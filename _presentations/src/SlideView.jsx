import { SLIDES } from "./registry.js";
import { C } from "./tokens.js";

const FADE_STYLE = {
  position: "fixed", bottom: 0, left: 0, right: 0, height: 160, zIndex: 50,
  background: `linear-gradient(to bottom, transparent, ${C.bg})`,
  pointerEvents: "none",
};

export function SlideView({ slideId, onBack }) {
  const slide = SLIDES.find((s) => s.id === slideId);
  const Component = slide?.component;

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
      {Component && <Component />}
    </div>
  );
}
