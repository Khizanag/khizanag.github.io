import { expect, test as base } from "@playwright/test";

interface SmokeOptions {
  expectedConsoleErrors: RegExp[];
}

interface SmokeFixtures {
  noConsoleErrors: void;
}

/**
 * Every smoke test also asserts the page stayed quiet: no console errors, no
 * uncaught exceptions, no same-origin request that never arrived. A page that
 * is meant to log something declares it with
 * `test.use({ expectedConsoleErrors: [...] })`.
 */
export const test = base.extend<SmokeOptions & SmokeFixtures>({
  expectedConsoleErrors: [[], { option: true }],

  noConsoleErrors: [async ({ page, baseURL, expectedConsoleErrors }, use) => {
    const problems: string[] = [];
    const isOurs = (url: string) => url.startsWith(baseURL ?? "");

    page.on("console", (message) => {
      if (message.type() !== "error") return;
      // Third-party assets (web fonts) report their own failures; only ours count.
      const source = message.location().url;
      if (source && !isOurs(source)) return;
      const text = message.text();
      // An allowance covers the navigated document only: Chromium words a failed
      // sub-resource exactly like the document itself, so matching on the text
      // alone would excuse every broken asset on that page too.
      const fromDocument = source === page.url();
      if (fromDocument && expectedConsoleErrors.some((pattern) => pattern.test(text))) return;
      problems.push(`console: ${text}`);
    });

    page.on("pageerror", (error) => {
      problems.push(`pageerror: ${error.message}`);
    });

    page.on("requestfailed", (request) => {
      if (!isOurs(request.url())) return;
      // A reload or hash navigation cancels in-flight requests; that is not a defect.
      if (request.failure()?.errorText === "net::ERR_ABORTED") return;
      problems.push(`requestfailed: ${request.url()}`);
    });

    await use();

    expect(problems, "the page reported errors").toEqual([]);
  }, { auto: true }],
});

export { expect } from "@playwright/test";
