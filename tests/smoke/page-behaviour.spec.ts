import type { Page } from "@playwright/test";

import { expect, test } from "../support/fixtures.ts";

const SETTLE_TIMEOUT = 10_000;
const MOBILE_VIEWPORT = { width: 400, height: 800 };

interface PageBehaviour {
  path: string;
  reveal: string;
  progressBar: string | null;
}

const PAGES: PageBehaviour[] = [
  { path: "/", reveal: ".rv", progressBar: null },
  { path: "/jobs", reveal: "[data-anim]", progressBar: "#jProgress" },
  { path: "/roadmap", reveal: "[data-anim]", progressBar: "#rmProgress" },
];

/** Walks the page down in viewport-sized steps so every reveal target passes through view. */
async function scrollToBottom(page: Page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.5);
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
  });
}

for (const { path, reveal, progressBar } of PAGES) {
  test(`${path} reveals its sections once they scroll into view`, async ({ page }) => {
    await page.goto(path);

    const total = await page.locator(reveal).count();
    expect(total).toBeGreaterThan(0);
    expect(await page.locator(`${reveal}.is-visible`).count()).toBeLessThan(total);

    await scrollToBottom(page);

    await expect
      .poll(() => page.locator(`${reveal}.is-visible`).count(), { timeout: SETTLE_TIMEOUT })
      .toBe(total);
  });

  test(`${path} grows the reading progress bar on the way down`, async ({ page }) => {
    if (progressBar === null) {
      test.skip(true, "the portfolio page has no reading progress bar");
      return;
    }

    await page.goto(path);

    const bar = page.locator(progressBar);
    const width = () => bar.evaluate((el) => el.getBoundingClientRect().width);
    expect(await width()).toBeLessThan(1);

    await scrollToBottom(page);

    const pageWidth = await page.evaluate(() => document.documentElement.clientWidth);
    await expect.poll(width, { timeout: SETTLE_TIMEOUT }).toBeGreaterThan(pageWidth * 0.9);
  });

  test(`${path} opens the mobile nav on its toggle and closes it on Escape`, async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto(path);

    const toggle = page.locator("#navToggle");
    const links = page.locator("#navLinks");
    await expect(links).not.toHaveClass(/is-open/);

    await toggle.click();
    await expect(links).toHaveClass(/is-open/);
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Escape");
    await expect(links).not.toHaveClass(/is-open/);
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
}
