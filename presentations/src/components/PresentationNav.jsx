import { useState, useEffect } from "react";
import { C } from "../tokens.js";

function FullscreenIcon({ isFullscreen }) {
  return isFullscreen ? (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5 1H1v4M9 1h4v4M5 13H1V9M9 13h4V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 5V1h4M9 1h4v4M1 9v4h4M13 9v4H9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PresentationNav({ logo, title, links, badge, color, colorDim, scrolled }) {
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "f" || e.key === "F") toggleFullscreen();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isFullscreen]);

  const handleExportPDF = () => {
    const onAfterPrint = () => {
      setIsPrinting(false);
      window.removeEventListener("afterprint", onAfterPrint);
    };
    window.addEventListener("afterprint", onAfterPrint);
    setIsPrinting(true);
    setTimeout(() => window.print(), 80);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav data-noprint style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 48px", height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(5,8,15,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(24px)" : "none",
      borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`,
      transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `${color}18` }}>
        <div style={{
          height: "100%",
          width: `${progress * 100}%`,
          background: `linear-gradient(90deg, ${color}, ${color}aa)`,
          transition: "width 0.15s linear",
          boxShadow: `0 0 8px ${color}60`,
        }} />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: colorDim, border: `1px solid ${color}40`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {logo}
        </div>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: C.text, letterSpacing: "-0.01em" }}>
          {title}
        </span>
      </div>

      <div style={{ display: "flex", gap: 4 }}>
        {links.map(({ label, id }) => (
          <span
            key={label}
            onClick={() => scrollTo(id)}
            style={{ padding: "6px 12px", fontSize: 12, color: C.muted, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", borderRadius: 8 }}
          >
            {label}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button
          onClick={handleExportPDF}
          title="Save as PDF"
          disabled={isPrinting}
          style={{
            height: 32, borderRadius: 8, border: `1px solid ${C.border}`,
            background: "transparent", color: isPrinting ? color : C.muted, cursor: isPrinting ? "default" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            padding: "0 10px",
            transition: "border-color 0.2s, color 0.2s",
            opacity: isPrinting ? 0.7 : 1,
          }}
          onMouseEnter={(e) => { if (!isPrinting) { e.currentTarget.style.borderColor = `${color}60`; e.currentTarget.style.color = color; } }}
          onMouseLeave={(e) => { if (!isPrinting) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; } }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M6.5 1v7M3.5 5.5l3 3 3-3M1 9.5v1a1 1 0 001 1h9a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.05em" }}>
            {isPrinting ? "preparing…" : "PDF"}
          </span>
        </button>

        <button
          onClick={toggleFullscreen}
          title={isFullscreen ? "Exit fullscreen (F)" : "Fullscreen (F)"}
          style={{
            width: 32, height: 32, borderRadius: 8, border: `1px solid ${C.border}`,
            background: "transparent", color: C.muted, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${color}60`; e.currentTarget.style.color = color; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}
        >
          <FullscreenIcon isFullscreen={isFullscreen} />
        </button>

        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "6px 14px", background: colorDim, border: `1px solid ${color}30`, borderRadius: 50,
        }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: color, animation: "pulse-glow 2.5s ease infinite" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color, letterSpacing: "0.08em" }}>
            {badge}
          </span>
        </div>
      </div>
    </nav>
  );
}
