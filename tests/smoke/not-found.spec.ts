import { expect, test } from "../support/fixtures.ts";

// The page is served with a 404 status, and the browser logs that status itself.
test.use({ expectedConsoleErrors: [/the server responded with a status of 404/] });

test("an unknown path serves the custom 404 page", async ({ page }) => {
  const response = await page.goto("/no-such-page");

  expect(response?.status()).toBe(404);
  await expect(page).toHaveTitle(/^Page not found/);
  await expect(page.locator("#notFoundTitle")).toBeVisible();
});
