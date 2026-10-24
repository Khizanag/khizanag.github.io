// Refreshes js/projects/github.json — the live repo numbers behind projects.html — from GitHub.
// Run before pushing a projects change: node scripts/sync-projects.mjs
// Needs an authenticated gh CLI that can read the private repos; their URLs never reach the output.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OWNER = "Khizanag";
const WEEKS = 52;
const STATS_ATTEMPTS = 15;
const STATS_RETRY_MS = 2_000;
const GRAPHQL_BATCH = 8;
const GRAPHQL_ATTEMPTS = 4;

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const curatedPath = join(root, "js/projects/projects.json");
const outputPath = join(root, "js/projects/github.json");
// Repos deliberately left off the page; kept local so their names never get published.
const ignorePath = join(root, ".projects-ignore");

function gh(args) {
  return execFileSync("gh", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const REPO_FIELDS = `
  name
  url
  isPrivate
  isArchived
  stargazerCount
  forkCount
  pushedAt
  createdAt
  homepageUrl
  primaryLanguage { name color }
  languages(first: 6, orderBy: { field: SIZE, direction: DESC }) { totalSize edges { size node { name color } } }
  latestRelease { tagName publishedAt }
  refs(refPrefix: "refs/tags/", first: 1, orderBy: { field: TAG_COMMIT_DATE, direction: DESC }) { totalCount nodes { name } }
  issues(states: OPEN) { totalCount }
  pullRequests(states: OPEN) { totalCount }
  defaultBranchRef { target { ... on Commit { committedDate history { totalCount } } } }
`;

// Small batches: one query over every repo times out at GitHub's gateway with a 502.
async function fetchRepoBatch(names) {
  const aliases = names.map((name, index) => `r${index}: repository(owner: "${OWNER}", name: "${name}") { ${REPO_FIELDS} }`);
  for (let attempt = 1; ; attempt += 1) {
    try {
      const { data } = JSON.parse(gh(["api", "graphql", "-f", `query={ ${aliases.join("\n")} }`]));
      return names.map((name, index) => {
        const repo = data[`r${index}`];
        if (!repo) throw new Error(`GitHub has no repo ${OWNER}/${name} — fix projects.json`);
        return repo;
      });
    } catch (error) {
      if (attempt >= GRAPHQL_ATTEMPTS || error.message.includes("fix projects.json")) throw error;
      await sleep(STATS_RETRY_MS * attempt);
    }
  }
}

async function fetchRepos(names) {
  const repos = [];
  for (let start = 0; start < names.length; start += GRAPHQL_BATCH) {
    repos.push(...(await fetchRepoBatch(names.slice(start, start + GRAPHQL_BATCH))));
  }
  return repos;
}

// GitHub computes commit stats lazily and answers 202 until they are ready.
async function fetchCommitActivity(name) {
  for (let attempt = 0; attempt < STATS_ATTEMPTS; attempt += 1) {
    let raw;
    try {
      raw = gh(["api", "-i", `repos/${OWNER}/${name}/stats/commit_activity`]);
    } catch {
      // A transient gateway error, or an empty repo that has no stats at all — the commit-list fallback settles both.
      return null;
    }
    const status = Number(raw.match(/^HTTP\/[\d.]+ (\d+)/)?.[1]);
    const body = raw.slice(raw.indexOf("\r\n\r\n") + 4).trim();
    if (status === 200 && body.startsWith("[")) return JSON.parse(body);
    if (status === 204) return [];
    await sleep(STATS_RETRY_MS);
  }
  return null;
}

// Stats for a repo pushed minutes ago can stay at 202 for a long time, so rebuild the same
// shape from the commit list: Sunday-start UTC weeks, one count per weekday.
function activityFromCommits(name) {
  const now = new Date();
  const thisSunday = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - now.getUTCDay());
  const firstWeek = thisSunday - (WEEKS - 1) * 7 * 86400000;
  const weeks = Array.from({ length: WEEKS }, (_, index) => ({
    week: (firstWeek + index * 7 * 86400000) / 1000,
    days: [0, 0, 0, 0, 0, 0, 0],
    total: 0,
  }));
  const since = new Date(firstWeek).toISOString();
  const dates = gh(["api", "--paginate", `repos/${OWNER}/${name}/commits?since=${since}&per_page=100`, "--jq", ".[].commit.committer.date"])
    .split("\n")
    .filter(Boolean);
  for (const date of dates) {
    const time = Date.parse(date);
    const index = Math.floor((time - firstWeek) / (7 * 86400000));
    if (index < 0 || index >= WEEKS) continue;
    const week = weeks[index];
    week.days[new Date(time).getUTCDay()] += 1;
    week.total += 1;
  }
  return weeks;
}

function summarize(repo, activity) {
  const weeks = activity.slice(-WEEKS);
  const languages = repo.languages.edges.map(({ size, node }) => ({
    name: node.name,
    color: node.color,
    bytes: size,
  }));
  return {
    name: repo.name,
    url: repo.isPrivate ? null : repo.url,
    private: repo.isPrivate,
    archived: repo.isArchived,
    stars: repo.stargazerCount,
    forks: repo.forkCount,
    createdAt: repo.createdAt,
    pushedAt: repo.pushedAt,
    homepage: repo.isPrivate ? null : repo.homepageUrl || null,
    language: repo.primaryLanguage,
    languages,
    release: repo.latestRelease ? { tag: repo.latestRelease.tagName, publishedAt: repo.latestRelease.publishedAt } : null,
    latestTag: repo.refs.nodes[0]?.name ?? null,
    tags: repo.refs.totalCount,
    openIssues: repo.issues.totalCount,
    openPullRequests: repo.pullRequests.totalCount,
    lastCommitAt: repo.defaultBranchRef?.target?.committedDate ?? null,
    commits: repo.defaultBranchRef?.target?.history?.totalCount ?? 0,
    commitsLastYear: weeks.reduce((sum, week) => sum + week.total, 0),
    weekly: weeks.map((week) => week.total),
  };
}

// One calendar across every repo: day totals keyed by the Sunday-start weeks GitHub reports.
function aggregateCalendar(activities) {
  const byWeek = new Map();
  for (const activity of activities) {
    for (const week of activity.slice(-WEEKS)) {
      // Repos report the same week up to an hour apart across DST, so key on the nearest day.
      const key = Math.round(week.week / 86400) * 86400;
      const days = byWeek.get(key) ?? [0, 0, 0, 0, 0, 0, 0];
      week.days.forEach((count, index) => { days[index] += count; });
      byWeek.set(key, days);
    }
  }
  return [...byWeek.entries()]
    .sort(([a], [b]) => a - b)
    .slice(-WEEKS)
    .map(([week, days]) => ({ start: new Date(week * 1000).toISOString().slice(0, 10), days }));
}

function warnAboutUnlisted(listed) {
  const ignored = existsSync(ignorePath)
    ? readFileSync(ignorePath, "utf8").split("\n").map((line) => line.trim()).filter((line) => line && !line.startsWith("#"))
    : [];
  const all = JSON.parse(gh(["repo", "list", OWNER, "--limit", "500", "--json", "name"])).map((repo) => repo.name);
  const missing = all.filter((name) => !listed.has(name) && !ignored.includes(name));
  if (missing.length) {
    console.warn(`\nOn GitHub but not on the page (add to projects.json or .projects-ignore):\n  ${missing.join("\n  ")}`);
  }
}

const curated = JSON.parse(readFileSync(curatedPath, "utf8"));
const names = [...new Set(curated.projects.flatMap((project) => project.repos))];
console.log(`Fetching ${names.length} repos…`);

const repos = await fetchRepos(names);
const activities = [];
const summaries = {};
for (const repo of repos) {
  let activity = await fetchCommitActivity(repo.name);
  if (activity === null) {
    activity = activityFromCommits(repo.name);
    console.warn(`  ${repo.name}: commit stats still computing — counted from the commit list instead`);
  }
  activities.push(activity);
  summaries[repo.name] = summarize(repo, activity);
  console.log(`  ${repo.name}: ${summaries[repo.name].commitsLastYear} commits in the last year`);
}

const output = {
  generatedAt: new Date().toISOString(),
  owner: OWNER,
  calendar: aggregateCalendar(activities),
  repos: summaries,
};
// Number arrays on one line keep the file readable and the diffs small.
const pretty = JSON.stringify(output, null, 2).replace(/\[\s+([-\d.,\s]+?)\s+\]/g, (_, items) => `[${items.split(/,\s*/).join(", ")}]`);
writeFileSync(outputPath, `${pretty}\n`);
console.log(`\nWrote ${outputPath}`);

warnAboutUnlisted(new Set(names));
