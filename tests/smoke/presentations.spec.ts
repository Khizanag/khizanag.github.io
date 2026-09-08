import { expect, test } from "../support/fixtures.ts";

const DECK_COUNT = 5;
const SETTLE_TIMEOUT = 10_000;
const TOLERANCE = 2;

test("the presentations home lists every deck", async ({ page }) => {
  await page.goto("/presentations/");

  await expect(page.locator('a[href^="#"]')).toHaveCount(DECK_COUNT);
});

test("opening a deck renders it with a way back", async ({ page }) => {
  await page.goto("/presentations/");

  const firstDeck = page.locator('a[href^="#"]').first();
  const hash = await firstDeck.getAttribute("href");
  const deckTitle = await firstDeck.locator("h2").innerText();
  await firstDeck.click();

  await expect.poll(() => page.evaluate(() => window.location.hash)).toBe(hash);
  await expect(page.getByRole("button", { name: "All presentations" })).toBeVisible();
  // Only a deck id the registry resolves puts its own title on the document.
  await expect(page).toHaveTitle(`${deckTitle} — Giga Khizanishvili`);
});

test("an unknown deck id explains itself", async ({ page }) => {
  await page.goto("/presentations/#does-not-exist");

  await expect(page.getByRole("heading", { name: "No such presentation" })).toBeVisible();
  await expect(page.getByRole("button", { name: "All presentations" })).toBeVisible();
});

test("the presentations home moves between sections with the arrow keys", async ({ page }) => {
  await page.goto("/presentations/");

  const decksTop = await page.evaluate(() => {
    const decks = document.getElementById("home-decks");
    return decks ? Math.round(decks.getBoundingClientRect().top + window.scrollY) : -1;
  });
  expect(decksTop).toBeGreaterThan(0);

  const distanceTo = (top: number) => page.evaluate((y) => Math.abs(window.scrollY - y), top);

  await page.keyboard.press("ArrowRight");
  await expect.poll(() => distanceTo(decksTop), { timeout: SETTLE_TIMEOUT }).toBeLessThanOrEqual(TOLERANCE);

  await page.keyboard.press("ArrowLeft");
  await expect.poll(() => distanceTo(0), { timeout: SETTLE_TIMEOUT }).toBeLessThanOrEqual(TOLERANCE);
});
