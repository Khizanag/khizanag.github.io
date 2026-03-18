import type { ReactNode } from "react";
import { C, useInView } from "../../shared.tsx";

export const P = C.accent;
export const PDim = C.accentDim;

interface AppCardProps {
  number: number;
  name: string;
  icon: ReactNode;
  tagline: string;
  category: string;
  monetization: string;
  effort: string;
  revenue: string;
  features: string[];
  techStack: string[];
  color?: string;
  delay?: number;
}

export function AppCard({ number, name, icon, tagline, category, monetization, effort, revenue, features, techStack, color = P, delay = 0 }: AppCardProps) {
  const [ref, inView] = useInView();
  const effortColors: Record<string, string> = { Low: C.accent, Medium: C.yellow, High: C.red };
  const effortColor = effortColors[effort] ?? C.muted;
  return (
    <div
      ref={ref}
      style={{
        background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20,
        padding: 0, position: "relative", overflow: "hidden",
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${color}, ${color}00)` }} />

      <div style={{ padding: "28px 28px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14, background: `${color}15`, border: `1px solid ${color}30`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
          }}>
            {icon}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 11, color,
                background: `${color}12`, padding: "2px 8px", borderRadius: 50, letterSpacing: "0.05em",
              }}>
                #{String(number).padStart(2, "0")}
              </span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 10, color: C.muted,
                background: `${C.muted}12`, padding: "2px 8px", borderRadius: 50,
              }}>
                {category}
              </span>
            </div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: C.text, marginTop: 4 }}>
              {name}
            </div>
          </div>
        </div>

        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 16 }}>
          {tagline}
        </p>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {features.map((f, i) => (
            <span key={i} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.text,
              background: C.surfaceHi, border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 10px",
            }}>
              {f}
            </span>
          ))}
        </div>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: `1px solid ${C.border}`,
        background: `${C.surfaceHi}80`,
      }}>
        <MetricCell label="MONETIZATION" value={monetization} color={C.blue} />
        <MetricCell label="EFFORT" value={effort} color={effortColor} border />
        <MetricCell label="REVENUE" value={revenue} color={C.accent} border />
      </div>

      <div style={{
        padding: "10px 28px", borderTop: `1px solid ${C.border}`, background: `${C.bg}60`,
        display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center",
      }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.muted, marginRight: 4 }}>STACK:</span>
        {techStack.map((t, i) => (
          <span key={i} style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.muted,
            background: `${C.muted}08`, padding: "2px 6px", borderRadius: 4,
          }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

interface MetricCellProps {
  label: string;
  value: string;
  color: string;
  border?: boolean;
}

function MetricCell({ label, value, color, border = false }: MetricCellProps) {
  return (
    <div style={{
      padding: "12px 16px", textAlign: "center",
      borderLeft: border ? `1px solid ${C.border}` : "none",
    }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.muted, letterSpacing: "0.08em", marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color }}>
        {value}
      </div>
    </div>
  );
}

interface CategoryHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  color?: string;
  delay?: number;
}

export function CategoryHeader({ icon, title, subtitle, color = P, delay = 0 }: CategoryHeaderProps) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        display: "flex", alignItems: "center", gap: 16, marginBottom: 32,
        opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-16px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: 12, background: `${color}15`, border: `1px solid ${color}30`,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: C.text }}>{title}</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted }}>{subtitle}</div>
      </div>
    </div>
  );
}

interface StatCardProps {
  value: string;
  label: string;
  sub?: string;
  color?: string;
  delay?: number;
}

export function StatCard({ value, label, sub, color = P, delay = 0 }: StatCardProps) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16,
        padding: "24px 20px", textAlign: "center", position: "relative", overflow: "hidden",
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${color}, transparent)` }} />
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 32, color, lineHeight: 1, marginBottom: 6 }}>{value}</div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 12, color: C.text, marginBottom: 4 }}>{label}</div>
      {sub && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted }}>{sub}</div>}
    </div>
  );
}
