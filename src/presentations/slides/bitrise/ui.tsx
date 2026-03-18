import { C, useInView } from "../../shared.jsx";

export const P = C.accent;
export const PDim = C.accentDim;

export function StatBadge({ value, label, color = P, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16,
        padding: "24px 28px", textAlign: "center", position: "relative", overflow: "hidden",
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${color}, transparent)` }} />
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 38, color, lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 8 }}>
        {value}
      </div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 12, color: C.muted }}>
        {label}
      </div>
    </div>
  );
}

export function RiskRow({ threat, severity, description, delay = 0 }) {
  const [ref, inView] = useInView();
  const severityColor = { CRITICAL: C.red, HIGH: "#ff8c42", MEDIUM: C.yellow, LOW: C.muted }[severity] ?? C.muted;
  return (
    <div
      ref={ref}
      style={{
        display: "grid", gridTemplateColumns: "1fr 100px 2fr", gap: 16, alignItems: "center",
        padding: "14px 0", borderBottom: `1px solid ${C.border}`,
        opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-16px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, color: C.text }}>{threat}</span>
      <div style={{
        padding: "4px 10px", background: `${severityColor}12`, border: `1px solid ${severityColor}30`, borderRadius: 50,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: severityColor, letterSpacing: "0.08em" }}>
          {severity}
        </span>
      </div>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{description}</span>
    </div>
  );
}

export function CompareRow({ feature, bitriseIo, git, highlight = false, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 0,
        borderBottom: `1px solid ${C.border}`, background: highlight ? `${P}05` : "transparent",
        opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-12px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      <div style={{ padding: "13px 20px", fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 13, color: C.text }}>{feature}</div>
      <div style={{ padding: "13px 20px", borderLeft: `1px solid ${C.border}`, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.muted }}>{bitriseIo}</div>
      <div style={{ padding: "13px 20px", borderLeft: `1px solid ${C.border}`, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: highlight ? P : C.accent }}>{git}</div>
    </div>
  );
}
