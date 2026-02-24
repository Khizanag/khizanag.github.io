import { C, useInView } from "../../shared.jsx";

export const P = C.blue;
export const PDim = C.blueDim;

export function ConfigKeyRow({ name, type, def, desc, color = C.muted }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} style={{
      display: "grid", gridTemplateColumns: "1.8fr 0.8fr 0.8fr 3fr",
      padding: "10px 16px", borderTop: `1px solid ${C.border}`, alignItems: "center",
      opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(8px)",
      transition: "all 0.4s ease",
    }}>
      <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: color }}>{name}</code>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.subtle }}>{type}</span>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.subtle }}>{def}</span>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: C.muted, lineHeight: 1.5 }}>{desc}</span>
    </div>
  );
}
