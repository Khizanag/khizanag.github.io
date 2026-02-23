import { C } from "../tokens.js";

export function TabButton({ active, color, icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 8, padding: "9px 18px",
        borderRadius: 10, background: active ? `${color}18` : C.surface,
        border: `1px solid ${active ? color : C.border}`,
        color: active ? color : C.muted,
        cursor: "pointer", transition: "all 0.18s",
        fontFamily: "'JetBrains Mono', monospace", fontSize: 12, outline: "none",
      }}
    >
      {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
      {label}
    </button>
  );
}
