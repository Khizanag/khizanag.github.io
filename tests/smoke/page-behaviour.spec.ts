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
    const twoFrames = () =>
      new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await twoFrames();
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await twoFrames();
  });
}

for (const { path, reveal, progressBar } of PAGES) {
  test(`${path} reveals its sections once they scroll into view`, async ({ page }) => {
    await page.goto(path);

    const total = await page.locator(reveal).count();
    expect(total).toBeGreaterThan(0);
    expect(await page.locator(`${reveal}.is-visible`).count()).toBeLessThan(total);

    await scrollToBottom(page);

    // Ask an observer configured exactly like the page's own which targets intersect at the
    // bottom; every one of those must be revealed. Clipped or offset targets never intersect.
    const unrevealedIntersectingTargets = () =>
      page.evaluate(
        (selector) =>
          new Promise<string[]>((resolve) => {
            const script = document.querySelector<HTMLScriptElement>('script[src$="reveal.js"]');
            const threshold = parseFloat(script?.dataset.threshold ?? "0.12");
            const rootMargin = script?.dataset.rootMargin ?? "0px 0px -40px 0px";
            const describe = (el: Element) =>
              `${el.tagName.toLowerCase()}.${Array.from(el.classList).join(".")}`;
            const observer = new IntersectionObserver(
              (entries) => {
                observer.disconnect();
                resolve(
                  entries
                    .filter((entry) => entry.isIntersecting && !entry.target.classList.contains("is-visible"))
                    .map((entry) => describe(entry.target)),
                );
              },
              { threshold, rootMargin },
            );
            document.querySelectorAll(selector).forEach((el) => observer.observe(el));
          }),
        reveal,
      );

    await expect.poll(unrevealedIntersectingTargets, { timeout: SETTLE_TIMEOUT }).toEqual([]);
    expect(await page.locator(`${reveal}.is-visible`).count()).toBeGreaterThan(0);
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
