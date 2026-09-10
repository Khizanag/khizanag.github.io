// Renders the 1200x630 social preview card from the portrait in img/ using the site's tokens.
// Run after changing the title, the name or the portrait: node scripts/build-og-card.mjs
import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const portrait = `data:image/webp;base64,${readFileSync(join(root, "img/giga.webp")).toString("base64")}`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #05080f; color: #e8edf5; font-family: "DM Sans", sans-serif; overflow: hidden; position: relative; }
  .grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(0,255,136,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.05) 1px, transparent 1px); background-size: 40px 40px; }
  .glow { position: absolute; width: 700px; height: 700px; border-radius: 50%; background: radial-gradient(circle, rgba(0,255,136,0.12) 0%, transparent 65%); right: -180px; top: -220px; }
  .card { position: absolute; inset: 0; display: flex; align-items: center; gap: 72px; padding: 0 96px; }
  .photo { width: 300px; height: 400px; border-radius: 28px; object-fit: cover; box-shadow: 0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.10); flex: none; }
  .text { display: flex; flex-direction: column; gap: 22px; }
  .eyebrow { display: flex; align-items: center; gap: 14px; font-family: "JetBrains Mono", monospace; font-size: 20px; letter-spacing: 0.18em; color: #00ff88; text-transform: uppercase; }
  .eyebrow::before { content: ""; width: 40px; height: 2px; background: #00ff88; }
  .name { font-family: "Syne", sans-serif; font-weight: 800; font-size: 76px; line-height: 1.02; letter-spacing: -0.03em; }
  .role { font-size: 32px; color: #9aa6ba; line-height: 1.3; }
  .url { font-family: "JetBrains Mono", monospace; font-size: 22px; color: #5a6a82; margin-top: 10px; }
</style>
</head>
<body>
  <div class="grid"></div>
  <div class="glow"></div>
  <div class="card">
    <img class="photo" src="${portrait}" alt="">
    <div class="text">
      <div class="eyebrow">iOS Architect</div>
      <div class="name">Giga<br>Khizanishvili</div>
      <div class="role">Senior iOS Engineer &amp; Mobile Architect</div>
      <div class="url">khizanag.github.io</div>
    </div>
  </div>
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
const png = await page.screenshot({ type: "png" });
await browser.close();

const target = join(root, "img/og-card.png");
writeFileSync(target, png);
console.log(`img/og-card.png: ${png.length} bytes`);
