import { expect, test } from "../support/fixtures.ts";

test("the theme toggle switches the theme and remembers it", async ({ page }) => {
  await page.goto("/");
  const root = page.locator("html");

  await expect(root).not.toHaveClass(/theme-light/);

  await page.locator("#btnTheme").click();
  await expect(root).toHaveClass(/theme-light/);
  expect(await page.evaluate(() => localStorage.getItem("site-theme"))).toBe("light");

  await page.reload();
  await expect(root).toHaveClass(/theme-light/);

  await page.locator("#btnTheme").click();
  await expect(root).not.toHaveClass(/theme-light/);
  expect(await page.evaluate(() => localStorage.getItem("site-theme"))).toBe("dark");
});
