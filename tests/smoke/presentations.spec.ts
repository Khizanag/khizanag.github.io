import { expect, test } from "../support/fixtures.ts";

const DECK_COUNT = 5;

test("the presentations home lists every deck", async ({ page }) => {
  await page.goto("/presentations/");

  await expect(page.locator('a[href^="#"]')).toHaveCount(DECK_COUNT);
});

test("opening a deck renders it with a way back", async ({ page }) => {
  await page.goto("/presentations/");

  const firstDeck = page.locator('a[href^="#"]').first();
  const hash = await firstDeck.getAttribute("href");
  await firstDeck.click();

  await expect.poll(() => page.evaluate(() => window.location.hash)).toBe(hash);
  await expect(page.getByRole("button", { name: "All presentations" })).toBeVisible();
  await expect(page.getByRole("heading").first()).toBeVisible();
});

test("an unknown deck id explains itself", async ({ page }) => {
  await page.goto("/presentations/#does-not-exist");

  await expect(page.getByRole("heading", { name: "No such presentation" })).toBeVisible();
  await expect(page.getByRole("button", { name: "All presentations" })).toBeVisible();
});
