import type { Page } from "@playwright/test";
import { expect, test } from "../support/fixtures.ts";

const SETTLE_TIMEOUT = 10_000;
const TOLERANCE = 2;

for (const path of ["/jobs", "/roadmap", "/projects"]) {
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
    // The eased scroll spends its last frames within the tolerance; a key pressed before it ends is ignored
    await waitForScrollToStop(page);

    await page.keyboard.press("ArrowLeft");
    await expect.poll(() => distanceTo(tops[0]), { timeout: SETTLE_TIMEOUT }).toBeLessThanOrEqual(TOLERANCE);
  });
}

async function waitForScrollToStop(page: Page) {
  await page.waitForFunction(
    () =>
      new Promise<boolean>((resolve) => {
        const start = window.scrollY;
        requestAnimationFrame(() => requestAnimationFrame(() => resolve(window.scrollY === start)));
      }),
    undefined,
    { timeout: SETTLE_TIMEOUT },
  );
}
