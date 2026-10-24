import curatedData from "../../js/projects/projects.json" with { type: "json" };
import githubData from "../../js/projects/github.json" with { type: "json" };
import { expect, test } from "../support/fixtures.ts";

interface CuratedProject {
  id: string;
  name: string;
  status: string;
  category: string;
  repos: string[];
  tech: string[];
}

interface RepoSummary {
  private: boolean;
  url: string | null;
}

const projects = (curatedData as { projects: CuratedProject[] }).projects;
const repos = (githubData as { repos: Record<string, RepoSummary> }).repos;

const STATUSES = ["building", "beta", "maintained", "shipped", "paused", "idea", "archived"];
const CATEGORIES = ["app", "game", "library", "tooling", "web", "lab", "coursework"];

test("every curated project is well formed and its repos are synced", () => {
  const ids = new Set<string>();
  for (const project of projects) {
    expect(ids.has(project.id), `duplicate id ${project.id}`).toBe(false);
    ids.add(project.id);
    expect(STATUSES, project.id).toContain(project.status);
    expect(CATEGORIES, project.id).toContain(project.category);
    for (const repo of project.repos) {
      expect(repos[repo], `${repo} is missing from github.json — run node scripts/sync-projects.mjs`).toBeDefined();
    }
  }
});

test("no private repo URL is published", () => {
  for (const [name, repo] of Object.entries(repos)) {
    if (repo.private) expect(repo.url, name).toBeNull();
  }
});

test("the projects page renders every project once the archive is opened", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.locator("#pjView")).toHaveAttribute("aria-busy", "false");
  await expect(page.locator("#pjResults")).toHaveText(`${projects.length} projects`);

  await page.locator(".pj-shelf__summary").click();
  await expect(page.locator("#pjView .pj-card")).toHaveCount(projects.length);
  await expect(page.locator('[data-stat="projects"]')).toHaveText(String(projects.length));
  await expect(page.locator("#pjCalendar .pj-calendar__cell").first()).toBeVisible();
});

test("private projects carry no GitHub link and public ones do", async ({ page }) => {
  await page.goto("/projects?view=board");
  await expect(page.locator("#pjView .pj-bcard")).toHaveCount(projects.length);

  const privateProject = projects.find((p) => p.repos.length && p.repos.every((r) => repos[r].private));
  const publicProject = projects.find((p) => p.repos.length === 1 && !repos[p.repos[0]].private);
  expect(privateProject && publicProject).toBeTruthy();

  await expect(page.locator(`.pj-bcard[data-id="${privateProject!.id}"] a[href*="github.com"]`)).toHaveCount(0);
  await expect(page.locator(`.pj-bcard[data-id="${publicProject!.id}"] a[href*="github.com"]`)).toHaveCount(1);
});

test("filters narrow the shelf and survive a reload through the URL", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.locator("#pjView")).toHaveAttribute("aria-busy", "false");

  const games = projects.filter((p) => p.category === "game");
  await page.locator('#pjFacetFilters [data-kind="game"]').click();
  await expect(page.locator("#pjView .pj-card")).toHaveCount(games.length);
  await expect(page).toHaveURL(/kind=game/);

  await page.reload();
  await expect(page.locator("#pjView .pj-card")).toHaveCount(games.length);

  await page.locator("#pjReset").click();
  await expect(page.locator("#pjResults")).toHaveText(`${projects.length} projects`);
});

test("search matches names and technologies, and arrow keys stay in the field", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.locator("#pjView")).toHaveAttribute("aria-busy", "false");

  await page.keyboard.press("/");
  await expect(page.locator("#pjSearch")).toBeFocused();
  await page.keyboard.type("swiftdata");
  const expected = projects.filter((p) => p.tech.some((t) => t.toLowerCase().includes("swiftdata"))).length;
  expect(expected).toBeGreaterThan(0);
  await expect(page.locator("#pjResults")).toHaveText(new RegExp(`^${expected} of ${projects.length} projects$`));

  // "/" scrolls the toolbar into view smoothly; measure only once that has settled.
  const settledScroll = () =>
    page.evaluate(
      () =>
        new Promise<number>((resolve) => {
          let last = -1;
          const check = () => {
            if (window.scrollY === last) resolve(last);
            else {
              last = window.scrollY;
              setTimeout(check, 150);
            }
          };
          check();
        }),
    );
  const before = await settledScroll();
  await page.keyboard.press("ArrowLeft");
  expect(await settledScroll()).toBe(before);
});

test("a project opens in the drawer from its card and from a shared link", async ({ page }) => {
  const project = projects[0];
  await page.goto("/projects");
  await page.locator(`.pj-card__open[data-open="${project.id}"]`).click();

  const drawer = page.locator("#pjDrawer");
  await expect(drawer).toBeVisible();
  await expect(page.locator("#pjDrawerTitle")).toHaveText(project.name);
  await expect(page).toHaveURL(new RegExp(`[?&]p=${project.id}`));

  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
  await expect(page).not.toHaveURL(/[?&]p=/);

  await page.goto(`/projects?p=${project.id}`);
  await expect(page.locator("#pjDrawerTitle")).toHaveText(project.name);
  await page.keyboard.press("j");
  await expect(page.locator("#pjDrawerTitle")).not.toHaveText(project.name);
});

test("the timeline draws one bar per project", async ({ page }) => {
  await page.goto("/projects?view=timeline");
  await expect(page.locator("#pjView .pj-timeline__bar")).toHaveCount(projects.length);
});
