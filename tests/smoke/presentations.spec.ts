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

test("every deck linked from the home page opens a real deck", async ({ page }) => {
  await page.goto("/");
  // The home page curates a subset of the collection on purpose, so its own links —
  // not the registry — are what this checks, whichever decks it chooses to carry.
  const deckLinks = await page.locator("a[href]").evaluateAll((anchors) => [...new Set(
    anchors
      .map((anchor) => (anchor as HTMLAnchorElement).href)
      .filter((href) => {
        const url = new URL(href);
        return url.pathname.startsWith("/presentations") && url.hash !== "";
      }),
  )]);
  expect(deckLinks.length).toBeGreaterThan(0);

  await page.goto("/presentations/");
  const titleByHash = new Map(await page.locator('a[href^="#"]').evaluateAll((anchors) =>
    anchors.map((anchor): [string, string] => [
      new URL((anchor as HTMLAnchorElement).href).hash,
      anchor.querySelector("h2")?.textContent ?? "",
    ])));

  for (const link of deckLinks) {
    const hash = new URL(link).hash;
    const deckTitle = titleByHash.get(hash);
    await page.goto(link);

    expect(deckTitle, `the home page links ${hash}, which the collection no longer offers`).toBeTruthy();
    // Only a deck id the registry resolves puts its own title on the document.
    await expect(page).toHaveTitle(`${deckTitle} — Giga Khizanishvili`);
    await expect(page.getByRole("heading", { name: "No such presentation" })).toHaveCount(0);
  }
});

test("the presentations home moves between sections with the arrow keys", async ({ page }) => {
  await page.goto("/presentations/");
  // The web font arrives after load and grows the page under the sections, so a scroll
  // offset read before it lands names a place the decks no longer sit at.
  await page.evaluate(() => document.fonts.ready);

  // How far the decks are from the top of the viewport, measured live: the arrow keys
  // promise to bring the section there, whatever the page does to its own height.
  const decksOffset = () =>
    page.evaluate(() => {
      const decks = document.getElementById("home-decks");
      return decks ? Math.abs(decks.getBoundingClientRect().top) : Number.NaN;
    });
  expect(await decksOffset()).toBeGreaterThan(0);

  await page.keyboard.press("ArrowRight");
  await expect.poll(decksOffset, { timeout: SETTLE_TIMEOUT }).toBeLessThanOrEqual(TOLERANCE);

  await page.keyboard.press("ArrowLeft");
  const scrollY = () => page.evaluate(() => window.scrollY);
  await expect.poll(scrollY, { timeout: SETTLE_TIMEOUT }).toBeLessThanOrEqual(TOLERANCE);
});
