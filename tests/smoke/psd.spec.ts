import { expect, test } from "../support/fixtures.ts";

test("the PSD hub lists categories and starts a quiz", async ({ page }) => {
  await page.goto("/psd");

  const cards = page.locator("#catGrid .psd-cat-card");
  await expect(cards.first()).toBeVisible();

  const counts = await cards.locator(".psd-cat-card__count").allInnerTexts();
  expect(counts.length).toBeGreaterThan(0);
  for (const count of counts) {
    expect(Number.parseInt(count, 10)).toBeGreaterThan(0);
  }

  await page.locator('.psd-mode-card[data-mode="quiz"]').click();
  await expect(page.locator("#screen-setup")).toHaveClass(/is-active/);

  await page.locator("#btnStartQuiz").click();
  await expect(page.locator("#screen-quiz")).toHaveClass(/is-active/);
  await expect(page.locator("#quizCounter")).toHaveText("1 / 20");
  await expect(page.locator("#quizQuestion")).not.toBeEmpty();
  await expect(page.locator("#quizOptions .psd-option")).not.toHaveCount(0);
});
