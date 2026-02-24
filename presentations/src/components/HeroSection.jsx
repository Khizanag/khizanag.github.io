import { C } from "../tokens.js";

export function PresentationHero({
  id = "s-hero",
  badge,
  title,
  gradientLine,
  subtitle,
  stats,
  accentColor,
  titleMaxWidth = 860,
}) {
  return (
    <section id={id} style={{
      minHeight: "100vh", position: "relative",
      display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
      textAlign: "center", padding: "120px 48px 80px",
    }}>
      <div style={{ animation: "fadeUp 0.7s ease 0.1s both" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          padding: "7px 20px", background: `${accentColor}15`, border: `1px solid ${accentColor}25`,
          borderRadius: 50, marginBottom: 48,
        }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: accentColor, letterSpacing: "0.1em" }}>
            {badge}
          </span>
        </div>
      </div>

      <div style={{ animation: "fadeUp 0.7s ease 0.22s both", maxWidth: titleMaxWidth }}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(44px, 6.5vw, 84px)",
          lineHeight: 0.96, letterSpacing: "-0.03em", marginBottom: 32, color: C.text,
        }}>
          {title}<br />
          <span style={{
            background: `linear-gradient(135deg, ${accentColor} 0%, #4d9fff 100%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            {gradientLine}
          </span>
        </h1>
      </div>

      <div style={{ animation: "fadeUp 0.7s ease 0.36s both", maxWidth: 580 }}>
        <p style={{ fontSize: 18, color: C.muted, lineHeight: 1.7, fontWeight: 300, marginBottom: 64 }}>
          {subtitle}
        </p>
      </div>

      <div style={{ animation: "fadeUp 0.7s ease 0.5s both", display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        {stats.map(({ value, label, color }, i) => (
          <div key={label} style={{
            padding: "20px 32px", background: C.surface,
            border: `1px solid ${C.border}`, borderRadius: 16, textAlign: "center",
            animation: `fadeUp 0.6s ease ${0.5 + i * 0.08}s both`,
          }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 34, color, lineHeight: 1, letterSpacing: "-0.03em" }}>{value}</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 6, fontWeight: 300 }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ animation: "fadeIn 1s ease 1.2s both", position: "absolute", bottom: 48, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.subtle, letterSpacing: "0.12em" }}>SCROLL</span>
        <div style={{ width: 1, height: 40, background: `linear-gradient(${accentColor}, transparent)` }} />
      </div>
    </section>
  );
}
