import { type CSSProperties } from "react";
import { useScrolled, useInView, useKeyboardNav } from "./hooks.ts";
import { C } from "./tokens.ts";
import { SLIDES, type Slide } from "./registry.ts";

const SECTION_IDS = ["home-hero", "home-decks"];

interface PresentationCardProps {
  slide: Slide;
  index: number;
}

function PresentationCard({ slide, index }: PresentationCardProps) {
  const [ref, inView] = useInView<HTMLAnchorElement>(0.1);
  const delay = (index * 0.08).toFixed(2);

  return (
    <a
      ref={ref}
      href={`#${slide.id}`}
      className={inView ? "deck-card deck-card--in-view" : "deck-card"}
      style={{
        "--card-accent": slide.categoryColor,
        "--card-accent-10": `${slide.categoryColor}10`,
        "--card-accent-20": `${slide.categoryColor}20`,
        "--card-accent-60": `${slide.categoryColor}60`,
        borderRadius: 20, padding: 36, cursor: "pointer",
        font: "inherit", color: "inherit", textDecoration: "none", textAlign: "left", width: "100%",
        position: "relative", overflow: "hidden",
        transition: `opacity 0.6s ease ${delay}s, transform 0.4s ease, background 0.2s, border-color 0.2s`,
        display: "flex", flexDirection: "column", alignItems: "stretch", gap: 0,
      } as CSSProperties}
    >
      <div className="deck-card__bar" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${slide.categoryColor}, transparent)` }} />
      <div className="deck-card__glow" style={{ position: "absolute", bottom: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${slide.categoryColor}08 0%, transparent 70%)`, pointerEvents: "none" }} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px", background: `${slide.categoryColor}12`, border: `1px solid ${slide.categoryColor}30`, borderRadius: 50 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: slide.categoryColor }} />
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: slide.categoryColor, letterSpacing: "0.1em" }}>
            {slide.category.toUpperCase()}
          </span>
        </div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.muted }}>{slide.date}</span>
      </div>

      <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, lineHeight: 1.2, color: C.text, letterSpacing: "-0.02em", marginBottom: 14, flex: 1 }}>
        {slide.title}
      </h2>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.65, fontWeight: 300, marginBottom: 32, flex: 1 }}>
        {slide.subtitle}
      </p>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="deck-card__cta" style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.02em" }}>
          Open presentation
          <svg className="deck-card__arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="deck-card__badge" style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2 11L11 2M11 2H5M11 2v6" stroke={C.muted} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </a>
  );
}

interface StatPillProps {
  value: string | number;
  label: string;
  delay: number;
}

function StatPill({ value, label, delay }: StatPillProps) {
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)", transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s` }}>
      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 36, color: C.accent, lineHeight: 1, letterSpacing: "-0.03em" }}>{value}</span>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.muted, letterSpacing: "0.08em" }}>{label}</span>
    </div>
  );
}

export function Home() {
  const scrolled = useScrolled(40);
  useKeyboardNav(SECTION_IDS);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`, backgroundSize: "40px 40px", animation: "gridMove 10s linear infinite", opacity: 0.3 }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,136,0.05) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(77,159,255,0.04) 0%, transparent 65%)" }} />
      </div>

      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 48px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(5,8,15,0.85)" : "transparent", backdropFilter: scrolled ? "blur(24px) saturate(160%)" : "none", borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`, transition: "background 0.4s, backdrop-filter 0.4s, border-color 0.4s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a href="../" className="home-back-link" style={{ display: "flex", alignItems: "center", gap: 7, textDecoration: "none", fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.01em" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11 7H3M3 7l4-4M3 7l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Portfolio
          </a>
          <div style={{ width: 1, height: 20, background: C.border }} />
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: C.accentDim, border: `1px solid ${C.accent}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: C.accent }} />
            </div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: C.text, letterSpacing: "-0.01em" }}>
              Giga<span style={{ color: C.accent }}>K</span>
            </span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", background: C.accentDim, border: `1px solid ${C.accent}30`, borderRadius: 50 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.accent, animation: "pulse-glow 2.5s ease infinite" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.accent, letterSpacing: "0.08em" }}>TECH TALKS</span>
        </div>
      </nav>

      <div style={{ position: "relative", zIndex: 1 }}>
        <section id="home-hero" style={{ minHeight: "100vh", position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "120px 48px 80px" }}>
          <div style={{ animation: "fadeUp 0.7s ease 0.1s both" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "7px 20px", background: C.accentDim, border: `1px solid ${C.accent}25`, borderRadius: 50, marginBottom: 48 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.accent, letterSpacing: "0.1em" }}>RESEARCH · PROPOSALS · ARCHITECTURE</span>
            </div>
          </div>
          <div style={{ animation: "fadeUp 0.7s ease 0.22s both", maxWidth: 760 }}>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(48px, 7vw, 88px)", lineHeight: 0.95, letterSpacing: "-0.03em", marginBottom: 32, color: C.text }}>
              Ideas worth<br />
              <span style={{ background: "linear-gradient(135deg, #00ff88 0%, #4d9fff 60%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>sharing.</span>
            </h1>
          </div>
          <div style={{ animation: "fadeUp 0.7s ease 0.36s both", maxWidth: 500 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: C.muted, lineHeight: 1.7, fontWeight: 300, marginBottom: 64 }}>
              A collection of research, technical proposals, and architectural decisions.
            </p>
          </div>
          <div style={{ animation: "fadeUp 0.7s ease 0.5s both", display: "flex", gap: 56, flexWrap: "wrap", justifyContent: "center" }}>
            <StatPill value={SLIDES.length} label="PRESENTATIONS" delay={0} />
            <div style={{ width: 1, background: C.border, alignSelf: "stretch" }} />
            <StatPill value="iOS" label="FOCUS" delay={0.08} />
            <div style={{ width: 1, background: C.border, alignSelf: "stretch" }} />
            <StatPill value="2026" label="SEASON" delay={0.16} />
          </div>
          <div style={{ animation: "fadeIn 1s ease 1.2s both", position: "absolute", bottom: 48, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.subtle, letterSpacing: "0.12em" }}>SCROLL</span>
            <div style={{ width: 1, height: 40, background: `linear-gradient(${C.accent}, transparent)` }} />
          </div>
        </section>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.border}, transparent)` }} />
        </div>

        <section id="home-decks" style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 48px 120px" }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <div style={{ width: 32, height: 1, background: C.accent }} />
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: C.accent, letterSpacing: "0.15em" }}>ALL PRESENTATIONS</span>
            </div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 44px)", color: C.text, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Browse the collection
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
            {SLIDES.map((slide, i) => (
              <PresentationCard key={slide.id} slide={slide} index={i} />
            ))}
          </div>
        </section>

        <footer style={{ borderTop: `1px solid ${C.border}`, padding: "32px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: C.accentDim, border: `1px solid ${C.accent}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 6, height: 6, borderRadius: 1.5, background: C.accent }} />
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.muted }}>Giga Khizanishvili</span>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.subtle }}>
            {SLIDES.length} presentation{SLIDES.length !== 1 ? "s" : ""}
          </span>
        </footer>
      </div>
    </div>
  );
}
