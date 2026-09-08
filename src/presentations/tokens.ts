export const C = {
  bg:         "#05080f",
  surface:    "#0c1018",
  surfaceHi:  "#111820",
  border:     "#1a2235",
  borderHi:   "#2a3a55",
  accent:     "#00ff88",
  accentDim:  "rgba(0,255,136,0.10)",
  blue:       "#4d9fff",
  blueDim:    "rgba(77,159,255,0.10)",
  purple:     "#a78bfa",
  purpleDim:  "rgba(167,139,250,0.10)",
  yellow:     "#ffd60a",
  red:        "#ff4d6d",
  text:       "#e8edf5",
  muted:      "#5a6a82",
  subtle:     "#2a3548",
} as const satisfies Record<string, string>;

export const FONTS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
button:focus-visible, a:focus-visible { outline: 2px solid ${C.accent}; outline-offset: 3px; }
@media print {
  @page { margin: 0; }
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  [data-noprint] { display: none !important; }
}
`;

export const KEYFRAMES = `
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes gridMove {
  0%   { background-position: 0 0; }
  100% { background-position: 40px 40px; }
}
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(0,255,136,0.3); }
  50%       { box-shadow: 0 0 40px rgba(0,255,136,0.6); }
}
`;

export const HOVERS = `
.deck-card {
  background: ${C.surface};
  border: 1px solid ${C.border};
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  opacity: 0;
  transform: translateY(28px);
}
.deck-card--in-view { opacity: 1; transform: translateY(0); }
.deck-card:hover {
  background: ${C.surfaceHi};
  border-color: ${C.borderHi};
  box-shadow: 0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px var(--card-accent-20);
}
.deck-card--in-view:hover { transform: translateY(-4px); }
.deck-card__bar { opacity: 0.4; transition: opacity 0.3s; }
.deck-card:hover .deck-card__bar { opacity: 1; }
.deck-card__glow { opacity: 0; transition: opacity 0.4s; }
.deck-card:hover .deck-card__glow { opacity: 1; }
.deck-card__cta { color: ${C.muted}; transition: color 0.2s; }
.deck-card:hover .deck-card__cta { color: var(--card-accent); }
.deck-card__arrow { transform: translateX(0); transition: transform 0.2s; }
.deck-card:hover .deck-card__arrow { transform: translateX(4px); }
.deck-card__badge {
  background: transparent;
  border: 1px solid ${C.border};
  transition: border-color 0.2s, background 0.2s;
}
.deck-card:hover .deck-card__badge { background: var(--card-accent-10); border-color: var(--card-accent-60); }
.deck-card:hover .deck-card__badge path { stroke: var(--card-accent); }

.home-back-link { color: ${C.muted}; transition: color 0.2s; }
.home-back-link:hover { color: ${C.accent}; }

.deck-nav-button {
  border: 1px solid ${C.border};
  color: ${C.muted};
  transition: border-color 0.2s, color 0.2s;
}
.deck-nav-button:disabled { border-color: var(--nav-accent-60); color: var(--nav-accent); }
.deck-nav-button:hover:not(:disabled) { border-color: var(--nav-accent-60); color: var(--nav-accent); }

.deck-back-button {
  background: rgba(5,8,15,0.80);
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.deck-back-button:hover {
  background: rgba(12,16,24,0.95);
  border-color: rgba(0,255,136,0.35);
  box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,255,136,0.15);
}

.repo-source-link { background: ${C.surface}; transition: background 0.15s; }
.repo-source-link:hover { background: var(--repo-tint); }
`;
