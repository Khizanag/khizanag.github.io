import { expect, test } from "../support/fixtures.ts";

const SETTLE_TIMEOUT = 10_000;
const TOLERANCE = 2;

for (const path of ["/jobs", "/roadmap"]) {
  test(`${path} moves between sections with the arrow keys`, async ({ page }) => {
    await page.goto(path);

    const tops = await page.evaluate(() => {
      const ids = document.querySelector("script[data-sections]")?.getAttribute("data-sections") ?? "";
      return ids.split(",").slice(0, 2).map((id) => {
        const section = document.getElementById(id.trim());
        return section ? Math.round(section.getBoundingClientRect().top + window.scrollY) : -1;
      });
    });
    expect(tops).toHaveLength(2);
    expect(tops[1]).toBeGreaterThan(tops[0]);

    const distanceTo = (top: number) => page.evaluate((y) => Math.abs(window.scrollY - y), top);

    await page.keyboard.press("ArrowRight");
    await expect.poll(() => distanceTo(tops[1]), { timeout: SETTLE_TIMEOUT }).toBeLessThanOrEqual(TOLERANCE);

    await page.keyboard.press("ArrowLeft");
    await expect.poll(() => distanceTo(tops[0]), { timeout: SETTLE_TIMEOUT }).toBeLessThanOrEqual(TOLERANCE);
  });
}
