import { defineConfig, devices, type ReporterDescription } from "@playwright/test";

const PORT = process.env.SITE_PORT ?? "4173";
const BASE_URL = `http://127.0.0.1:${PORT}`;

const reporter: ReporterDescription[] = process.env.CI
  ? [["list"]]
  : [["list"], ["html", { open: "never" }]];

export default defineConfig({
  testDir: "tests/smoke",
  fullyParallel: true,
  retries: 0,
  reporter,
  use: {
    baseURL: BASE_URL,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "node tests/support/serve.mjs",
    url: BASE_URL,
    reuseExistingServer: true,
  },
});
