import { useInView } from "../hooks.js";
import { C } from "../tokens.js";

export function InfoCard({ children, color = C.accent, title, tag, icon, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16,
        padding: 32, position: "relative", overflow: "hidden", height: "100%",
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color }} />
      {(icon || tag) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          {icon && <span style={{ fontSize: 32 }}>{icon}</span>}
          {tag && (
            <span style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color,
              background: `${color}15`, border: `1px solid ${color}30`,
              padding: "4px 10px", borderRadius: 6, letterSpacing: "0.1em",
            }}>
              {tag}
            </span>
          )}
        </div>
      )}
      {title && (
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 12 }}>
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

export function CheckItem({ children, active = true, delay = 0 }) {
  const [ref, inView] = useInView();
  const color = active ? C.accent : C.red;
  return (
    <div
      ref={ref}
      style={{
        display: "flex", alignItems: "flex-start", gap: 14,
        padding: "14px 0", borderBottom: `1px solid ${C.border}`,
        opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-16px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      <div style={{
        width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1,
        background: `${color}18`, border: `1px solid ${color}40`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: 13, color }}>{active ? "✓" : "✕"}</span>
      </div>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.text, lineHeight: 1.6 }}>
        {children}
      </span>
    </div>
  );
}

export function PlainEnglishBox({ children, color }) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${color}30`, borderLeft: `3px solid ${color}`, borderRadius: 8, padding: "12px 14px" }}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color, letterSpacing: "0.1em", marginBottom: 6 }}>IN PLAIN ENGLISH</div>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{children}</span>
    </div>
  );
}

export function FeatureCard({ icon, title, description, note, color = C.accent, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14,
        padding: "24px 22px", display: "flex", flexDirection: "column",
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10, background: `${color}15`, border: `1px solid ${color}30`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17,
        }}>
          {icon}
        </div>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: C.text }}>
          {title}
        </span>
      </div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.65, margin: 0, flex: 1 }}>
        {description}
      </p>
      {note && (
        <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${C.border}`, display: "flex", gap: 8, alignItems: "flex-start" }}>
          <div style={{
            width: 16, height: 16, borderRadius: "50%", flexShrink: 0, marginTop: 1,
            background: `${C.blue}15`, border: `1px solid ${C.blue}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 9, color: C.blue,
          }}>
            i
          </div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.subtle, lineHeight: 1.55 }}>
            {note}
          </span>
        </div>
      )}
    </div>
  );
}

export function CalloutBox({ children, color = C.accent, label, icon }) {
  return (
    <div style={{
      padding: 28, background: `${color}0a`, border: `1px solid ${color}30`,
      borderRadius: 16, display: "flex", gap: 20, alignItems: "flex-start",
    }}>
      {icon && <div style={{ fontSize: 24, flexShrink: 0 }}>{icon}</div>}
      <div>
        {label && (
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, color, marginBottom: 6, letterSpacing: "0.08em" }}>
            {label}
          </div>
        )}
        <div style={{ color: C.muted, fontSize: 14, lineHeight: 1.7 }}>{children}</div>
      </div>
    </div>
  );
}
