import questionBank from "../../js/psd/questions.json" with { type: "json" };
import { expect, test } from "../support/fixtures.ts";

const questions = questionBank as { category: string; difficulty: string }[];

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

test("the PSD review screen hides the difficulty badge until it is asked for", async ({ page }) => {
  await page.goto("/psd");
  await expect(page.locator("#catGrid .psd-cat-card").first()).toBeVisible();

  await page.locator('.psd-mode-card[data-mode="review"]').click();
  await expect(page.locator("#screen-review")).toHaveClass(/is-active/);
  await expect(page.locator("#reviewList .psd-review__item")).toHaveCount(25);
  await expect(page.locator("#reviewInfoRange")).toHaveText(`Showing 1–25 of ${questions.length}`);

  const difficulty = page.locator("#reviewList .psd-review__diff-badge").first();
  const category = page.locator("#reviewList .psd-review__cat-badge").first();
  await expect(difficulty).toBeHidden();
  await expect(category).toBeVisible();

  await page.locator("#screen-review label.psd-toggle-label", { hasText: "Hide difficulty" }).click();
  await expect(difficulty).toBeVisible();
  await page.locator("#screen-review label.psd-toggle-label", { hasText: "Hide categories" }).click();
  await expect(category).toBeHidden();
});

test("a finished quiz colours every bar on the results breakdown", async ({ page }) => {
  await page.goto("/psd");
  await expect(page.locator("#catGrid .psd-cat-card").first()).toBeVisible();

  // The smallest pool that still spans two categories, so the run stays short
  // and the breakdown keeps more than one bar.
  await page.locator('#categoryChips .psd-chip[data-category="Scrum Master"]').click();
  await page.locator('#categoryChips .psd-chip[data-category="Agile Principles"]').click();
  await page.locator('#difficultyChips .psd-chip[data-difficulty="Medium"]').click();
  await page.locator('#difficultyChips .psd-chip[data-difficulty="Hard"]').click();

  const pool = questions.filter(
    (item) =>
      item.difficulty === "Easy" && ["Scrum Master", "Agile Principles"].includes(item.category),
  ).length;
  await expect(page.locator("#filteredCount")).toHaveText(`${pool} questions`);

  await page.locator('.psd-mode-card[data-mode="quiz"]').click();
  await page.locator("#btnStartQuiz").click();
  await expect(page.locator("#quizCounter")).toHaveText(`1 / ${pool}`);

  for (let answered = 0; answered < pool; answered += 1) {
    await page.locator("#quizOptions .psd-option").first().click();
    const confirm = page.locator("#quizConfirmWrap:not(.is-hidden) #btnConfirm");
    if (await confirm.count()) await confirm.click();
    await page.locator("#btnQuizNext").click();
  }

  await expect(page.locator("#screen-results")).toHaveClass(/is-active/);
  const bars = page.locator("#resultBreakdown .psd-breakdown__fill");
  await expect(bars).toHaveCount(2);

  const painted = await bars.evaluateAll((nodes) => {
    const probe = document.createElement("div");
    document.body.appendChild(probe);
    const asRgb = (value: string) => {
      probe.style.backgroundColor = value;
      return getComputedStyle(probe).backgroundColor;
    };
    const tokens = getComputedStyle(document.documentElement);
    const report = nodes.map((node) => {
      const tone = [...node.classList].find((name) => name.startsWith("psd-breakdown__fill--"));
      const token = tone?.replace("psd-breakdown__fill--", "--color-") ?? "";
      return {
        tone: tone ?? null,
        background: getComputedStyle(node).backgroundColor,
        expected: token ? asRgb(tokens.getPropertyValue(token).trim()) : null,
      };
    });
    probe.remove();
    return report;
  });

  for (const bar of painted) {
    expect(bar.tone, "the bar carries a score tone").not.toBeNull();
    expect(bar.background).toBe(bar.expected);
  }
});
