import questionBank from "../../js/psd/questions.json" with { type: "json" };
import { expect, test } from "../support/fixtures.ts";

const questions = questionBank as { category: string }[];

function countByCategory(items: { category: string }[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const item of items) counts[item.category] = (counts[item.category] ?? 0) + 1;
  return counts;
}

test("the PSD hub lists categories and starts a quiz", async ({ page }) => {
  const bank = page.waitForResponse((response) => response.url().endsWith("/js/psd/questions.json"));
  await page.goto("/psd");
  expect((await bank).ok(), "the question bank was served").toBe(true);

  const cards = page.locator("#catGrid .psd-cat-card");
  await expect(cards.first()).toBeVisible();

  const expected = countByCategory(questions);
  await expect(cards).toHaveCount(Object.keys(expected).length);
  const names = await cards.locator(".psd-cat-card__name").allInnerTexts();
  const counts = await cards.locator(".psd-cat-card__count").allInnerTexts();
  const rendered: Record<string, number> = {};
  names.forEach((name, index) => {
    rendered[name.trim()] = Number.parseInt(counts[index], 10);
  });
  expect(rendered).toEqual(expected);

  await page.locator('.psd-mode-card[data-mode="quiz"]').click();
  await expect(page.locator("#screen-setup")).toHaveClass(/is-active/);

  // 20 is the size the markup ships selected, so ask for a length only a real
  // quiz run can put on the counter.
  await page.locator('#sizeOptions .psd-size-btn[data-size="40"]').click();
  await page.locator("#btnStartQuiz").click();
  await expect(page.locator("#screen-quiz")).toHaveClass(/is-active/);
  await expect(page.locator("#quizCounter")).toHaveText("1 / 40");
  await expect(page.locator("#quizQuestion")).not.toBeEmpty();
  await expect(page.locator("#quizOptions .psd-option")).not.toHaveCount(0);
});
