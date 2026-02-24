import { C } from "../tokens.js";

export function SectionLabel({ children, color = C.accent }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
      <div style={{ width: 32, height: 1, background: color, flexShrink: 0 }} />
      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color, letterSpacing: "0.15em" }}>
        {children}
      </span>
    </div>
  );
}

export function SectionHeading({ children, sub, maxSubWidth = 560 }) {
  return (
    <>
      <h2 style={{
        fontFamily: "'Syne', sans-serif", fontWeight: 800,
        fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1,
        letterSpacing: "-0.02em", color: C.text,
        marginBottom: sub ? 16 : 0,
      }}>
        {children}
      </h2>
      {sub && (
        <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.7, fontWeight: 300, maxWidth: maxSubWidth, marginBottom: 56 }}>
          {sub}
        </p>
      )}
    </>
  );
}

export function TagChip({ children, color = C.accent, dot = true }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: dot ? 7 : 0,
      padding: "5px 12px", background: `${color}12`,
      border: `1px solid ${color}30`, borderRadius: 50, flexShrink: 0,
    }}>
      {dot && <div style={{ width: 5, height: 5, borderRadius: "50%", background: color, flexShrink: 0 }} />}
      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color, letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
        {children}
      </span>
    </div>
  );
}
