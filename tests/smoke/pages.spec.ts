import { expect, test } from "../support/fixtures.ts";

const PAGES = ["/", "/jobs", "/roadmap", "/psd", "/presentations/"];

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
