export const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
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
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-8px); }
}
@keyframes scanline {
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}
`;

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
  yellowDim:  "rgba(255,214,10,0.10)",
  red:        "#ff4d6d",
  redDim:     "rgba(255,77,109,0.10)",
  text:       "#e8edf5",
  muted:      "#5a6a82",
  subtle:     "#2a3548",
};
