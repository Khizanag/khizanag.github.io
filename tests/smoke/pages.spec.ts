import { expect, test } from "../support/fixtures.ts";

const PAGES = ["/", "/jobs", "/roadmap", "/psd", "/presentations/", "/privacy/jocker"];

for (const path of PAGES) {
  test(`${path} loads with a title and a favicon`, async ({ page }) => {
    const response = await page.goto(path);

    expect(response?.status()).toBe(200);
    expect(await page.title()).not.toBe("");
    await expect(page.locator('link[rel="icon"]')).toHaveCount(1);
  });
}

test("an extensionless URL serves the same page as the .html file", async ({ page }) => {
  await page.goto("/jobs.html");
  const titleWithExtension = await page.title();

  await page.goto("/jobs");

  expect(new URL(page.url()).pathname).toBe("/jobs");
  expect(await page.title()).toBe(titleWithExtension);
});

test("the portrait on the home page loads", async ({ page }) => {
  await page.goto("/");
  const portrait = page.locator(".about__photo img");
  await portrait.scrollIntoViewIfNeeded();
  await expect.poll(() => portrait.evaluate((el) => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
});

for (const path of PAGES) {
  test(`${path} advertises a preview card that exists`, async ({ page }) => {
    await page.goto(path);
    const card = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(card).not.toBeNull();
    expect(new URL(card!).origin).toBe("https://khizanag.github.io");
    const response = await page.request.get(new URL(card!).pathname);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
  });
}
