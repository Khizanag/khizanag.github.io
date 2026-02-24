import { C } from "../tokens.js";

export function PresentationFooter({ logo, name, links, date }) {
  const linkStyle = {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.muted,
    borderBottom: `1px solid ${C.muted}30`, paddingBottom: 2, textDecoration: "none",
  };

  return (
    <footer style={{
      borderTop: `1px solid ${C.border}`, padding: "32px 48px",
      display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {logo}
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.muted }}>
          {name}
        </span>
      </div>
      <div style={{ display: "flex", gap: 24 }}>
        {links.map(({ label, href }) =>
          href
            ? <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, cursor: "pointer" }}>{label}</a>
            : <span key={label} style={linkStyle}>{label}</span>
        )}
      </div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.muted }}>
        {date}
      </div>
    </footer>
  );
}
