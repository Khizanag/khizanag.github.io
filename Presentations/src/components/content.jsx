import { useInView } from "../hooks.js";
import { C } from "../tokens.js";

export function WorkflowStep({ n, total, title, children, color = C.accent, delay = 0 }) {
  const [ref, inView] = useInView();
  const isLast = n >= total;
  return (
    <div
      ref={ref}
      style={{
        display: "flex", gap: 20, alignItems: "flex-start",
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          background: `${color}15`, border: `2px solid ${color}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, color,
        }}>
          {n}
        </div>
        {!isLast && <div style={{ width: 1, height: 40, background: `linear-gradient(${color}, ${C.border})`, marginTop: 4 }} />}
      </div>
      <div style={{ paddingTop: 10, paddingBottom: isLast ? 0 : 32 }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: C.text, marginBottom: 6 }}>
          {title}
        </div>
        <div style={{ color: C.muted, fontSize: 14, lineHeight: 1.7 }}>{children}</div>
      </div>
    </div>
  );
}

export function CodeBlock({ children, filename = "code", highlights = [] }) {
  const lines = (typeof children === "string" ? children : "").trim().split("\n");
  return (
    <div style={{ background: "#080d15", border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", fontFamily: "'JetBrains Mono', monospace" }}>
      <div style={{ background: C.surface, padding: "10px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", gap: 8, alignItems: "center" }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
          <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
        ))}
        <span style={{ marginLeft: 8, color: C.muted, fontSize: 12 }}>{filename}</span>
      </div>
      <div style={{ padding: "20px 24px" }}>
        {lines.map((line, i) => {
          const highlighted = highlights.includes(i + 1);
          return (
            <div key={i} style={{
              display: "flex", gap: 20, padding: "3px 0",
              background: highlighted ? "rgba(0,255,136,0.07)" : "transparent",
              borderLeft: highlighted ? `2px solid ${C.accent}` : "2px solid transparent",
              paddingLeft: highlighted ? 10 : 0,
            }}>
              <span style={{ color: C.subtle, fontSize: 13, minWidth: 20, textAlign: "right", userSelect: "none" }}>{i + 1}</span>
              <span style={{ fontSize: 13, lineHeight: 1.7, color: C.text }}>
                {line.startsWith("#")
                  ? <span style={{ color: C.muted }}>{line}</span>
                  : line.includes("@org/")
                    ? line.split(/(@org\/[\w-]+)/g).map((part, j) =>
                        part.startsWith("@org/")
                          ? <span key={j} style={{ color: C.accent }}>{part}</span>
                          : <span key={j}>{part}</span>
                      )
                    : line
                }
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function KeyValueDiff({ items }) {
  return (
    <div style={{
      padding: 28, background: C.bg, border: `1px solid ${C.border}`,
      borderRadius: 16, display: "flex", gap: 48, flexWrap: "wrap",
    }}>
      {items.map(({ before, after }) => (
        <div key={before} style={{ flex: "1 1 180px" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.red, marginBottom: 4, textDecoration: "line-through", opacity: 0.7 }}>
            {before}
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.accent }}>
            {after}
          </div>
        </div>
      ))}
    </div>
  );
}
