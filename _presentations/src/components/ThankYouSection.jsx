import { C } from "../tokens.js";
import { Reveal } from "./layout.jsx";

export function ThankYouSection({ id, label, color = C.accent, colorDim = C.accentDim }) {
  return (
    <section id={id} style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
      textAlign: "center", padding: "80px 48px",
      background: C.surface, borderTop: `1px solid ${C.border}`,
    }}>
      <Reveal>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          padding: "7px 20px", background: colorDim, border: `1px solid ${color}25`, borderRadius: 50,
          marginBottom: 40,
        }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color, letterSpacing: "0.1em" }}>
            {label}
          </span>
        </div>

        <h2 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(40px, 5vw, 72px)",
          lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 24, color: C.text,
        }}>
          Thank You
        </h2>

        <p style={{ fontSize: 20, color: C.muted, fontWeight: 300, marginBottom: 40 }}>
          Questions & Discussion
        </p>

        <div style={{ padding: "24px 40px", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 16 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: C.text, marginBottom: 6 }}>
            Giga Khizanishvili
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.muted }}>
            iOS Architect
          </div>
        </div>
      </Reveal>
    </section>
  );
}
