# Giga Khizanishvili — Personal GitHub Pages Site

## Overview

Personal portfolio/resume website for Giga Khizanishvili, hosted via GitHub Pages.
Static HTML/CSS/JS pages + a React/Vite/TypeScript presentations app.
Build tooling at root level (`package.json`, `vite.config.js`, `tsconfig.json`, `eslint.config.js`).

## Workflow Rules

- **Always commit directly to `main`** — no feature branches
- **Always push to remote after every commit**
- **One commit per task** — finish a task, commit and push, then start the next one
- Never batch unrelated tasks into a single commit
- HTML files reference external CSS via `<link>` tags — do not use inline `<style>` blocks

## Structure

Root pages:

- `index.html` — portfolio: resume, experience, projects, skills
- `jobs.html` — iOS Career Hub: roadmap, platforms, resume tips, salary data
- `roadmap.html` — iOS Mastery Roadmap knowledge map
- `interview.html` — interview tool: session runner, bank, flashcards, analytics, sandbox
- `guide.html` — long-form interviewing guide, one section per chapter
- `practice.html` — self-study practice planner
- `host-interview.html` — host a live interview session
- `history.html` — past interview sessions
- `config.html` — interview tool configuration
- `psd.html` — Professional Scrum Developer study hub
- `404.html` — not-found page (absolute asset paths)

Root assets: `cv.pdf`, `favicon.svg`, `robots.txt`, `sitemap.xml`.

`css/` — stylesheets organized by concern:

- `core/` — `design-system.css` (tokens, light-theme overrides, animated background layers), `scroll-indicator.css`
- `themes/` — `pres.css` (dark navy + neon green site theme)
- `portfolio/` — `portfolio.css`
- `jobs/` — `jobs.css`
- `roadmap/` — `roadmap.css`
- `psd/` — `psd.css`
- `interview/` — `base.css`, `auth.css`, `setup.css`, `dashboard.css`, `question.css`, `scoring.css`, `results.css`, `bank.css`, `analytics.css`, `flashcard.css`, `templates.css`, `custom.css`, `sandbox.css`, `gamification.css`, `profile.css`, `live.css`, `host.css`, `guide.css`, `config-page.css`, `history-page.css`, `responsive.css`

`js/` — classic scripts (IIFE, globals, 4-space indent, single quotes):

- `shared/` — `keyboard-nav.js`, `fullscreen.js`, `scroll-top.js`, `theme-toggle.js`
- `portfolio/` — `portfolio.js`
- `jobs/` — `jobs.js`
- `roadmap/` — `roadmap.js`
- `psd/` — `questions.js`, `app.js`
- `interview/` — `utils.js`, `config.js`, `features.js`, `firebase.js`, `highlighter.js`, `session.js`, `timer.js`, `plan.js`, `scoring.js`, `results.js`, `history.js`, `app.js`, `live.js`, `flashcard.js`, `analytics.js`, `bank.js`, `templates.js`, `custom.js`, `sandbox.js`, `gamification.js`, `guide.js`, `host.js`, `config-page.js`, `history-page.js`
- `interview/questions/` — `loader.js` plus the banks `ios.json`, `android.json`, `frontend.json`, `backend.json`, `behavioral.json`
- `interview/live-coding/` — `index.js`, `easy-medium.js`, `hard-expert.js`
- `js/package.json` marks this tree CommonJS so `tests/` can `require()` the modules

Other trees:

- `tests/` — `node:test` suites, e.g. `tests/interview/scoring.test.cjs`
- `docs/` — `docs/interview/ARCHITECTURE.md`, `docs/interview/ROADMAP.md`, `docs/interview/SECURITY-REPORT.md`
- `src/presentations/` — React + Vite + TypeScript source for the tech-talk decks (2-space indent, double quotes)

## Component Reuse Rules

- **Before creating any UI pattern, check existing pages first** (`index.html`, `interview.html`, `guide.html`, etc.)
- If a component already exists (scroll indicator, hero stats, nav bar, progress bar, card styles, section headers, etc.), **reuse its exact HTML structure and CSS** — do not reinvent it
- Match class names, markup hierarchy, animations, and responsive behavior from the original
- If no existing component supports the needed behavior, **create it as a reusable component** with a clear, generic class name — then use it across pages
- Never create a one-off variant of something that already exists elsewhere in the site

## Keyboard Section Navigation

- **Every multi-section page must support ArrowLeft/ArrowRight keyboard navigation** between sections
- Use the shared `js/shared/keyboard-nav.js` utility — do NOT duplicate the logic inline
- Add the script with a `data-sections` attribute listing section IDs in order:

  ```html
  <script src="js/shared/keyboard-nav.js" data-sections="hero,about,experience,contact"></script>
  ```

- Each `<section>` must have an `id` attribute for this to work
- Wired up on `index.html`, `jobs.html`, `roadmap.html`, and `guide.html`
- Reference: `src/presentations/hooks.ts` (`useKeyboardNav`) for the React equivalent

## CSS Rules

- Each page has its own CSS subdirectory: `css/portfolio/`, `css/jobs/`, `css/roadmap/`, `css/psd/`, `css/interview/`
- Keep CSS files split by screen/concern — never create a single monolithic CSS file
- When adding new styles, place them in the appropriate subdirectory
- `css/core/design-system.css` owns the `:root` tokens, the `.theme-light` overrides that `js/shared/theme-toggle.js` switches on, and the fixed background layers (`body::before` grid, `body::after` blobs)
- `css/themes/pres.css` is the site theme — it overrides the `:root` tokens and adds structural CSS via the cascade, and is pulled in through the `<link id="themeCSS">` tag
- `index.html`, `jobs.html`, `roadmap.html`, and `404.html` load it **after** the page CSS; `psd.html` loads it before `css/interview/base.css` and `css/psd/psd.css`; the interview pages use `css/interview/base.css` and no theme link
- All sections must have `position: relative; z-index: 1` to sit above the fixed backgrounds

## Question Bank Rules

- Banks are plain JSON arrays under `js/interview/questions/`; `loader.js` fetches all five and exposes `window.QuestionsReady`
- Answers should use `\n` line breaks to separate distinct concepts
- Lists of items should use `\n- ` prefix for each item
- Short answers (1-2 sentences) stay as single lines
- Comparisons should separate each item with `\n`
- CSS uses `white-space: pre-line` to render the line breaks

## Checks

Run on the Node version pinned in `.nvmrc` (`nvm use`), after `npm ci`:

```bash
npm run typecheck
npm test
npm run lint
npm run build
```

## Presentations

- Source lives in `src/presentations/` (React + Vite + TypeScript)
- Build config at root: `package.json`, `vite.config.js` (Vite root `src/presentations`)
- Decks are registered in `src/presentations/registry.ts` and lazy-loaded per deck
- Built output goes to `dist/presentations/` — NOT tracked in git
- Vite `base` is set to `/presentations/` — do not change without updating the deploy workflow
- Internals and authoring conventions: `src/presentations/PRESENTATION_GUIDE.md`

## Deployment

- GitHub Pages deploys via GitHub Actions (`.github/workflows/deploy.yml`)
- Push to `main` runs: typecheck → lint → test → build → assemble → smoke-check → deploy
- Assembly uses `rsync` to copy the static pages, excluding `src/`, `tests/`, `docs/`, Markdown, and the tooling config; the built presentations are then copied in explicitly
- The smoke check fails the run if a required file is missing or if source, tests, Markdown, or manifests would ship
- Pull requests against `main` run the same checks but do not deploy
- No built output is committed to git

## Docs

- `README.md` — public overview, local development, and links
- `src/presentations/PRESENTATION_GUIDE.md` — presentations app internals
- `docs/interview/ARCHITECTURE.md` — interview tool module architecture and load order
- `docs/interview/ROADMAP.md` — interview tool roadmap
- `docs/interview/SECURITY-REPORT.md` — interview tool security audit
