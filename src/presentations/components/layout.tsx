import { useInView } from "../hooks.js";
import { C } from "../tokens.js";

export function Reveal({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function AnimatedGrid({ opacity = 0.3 }) {
  return (
    <div style={{
      position:        "fixed",
      inset:           0,
      zIndex:          0,
      pointerEvents:   "none",
      backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`,
      backgroundSize:  "40px 40px",
      animation:       "gridMove 10s linear infinite",
      opacity,
    }} />
  );
}

export function AmbientBlobs() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,136,0.05) 0%, transparent 65%)" }} />
      <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(77,159,255,0.04) 0%, transparent 65%)" }} />
    </div>
  );
}
