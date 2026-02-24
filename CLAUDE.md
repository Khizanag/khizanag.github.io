# Giga Khizanishvili — Personal GitHub Pages Site

## Overview
Personal portfolio/resume website for Giga Khizanishvili, hosted via GitHub Pages.
Static HTML/CSS/JS pages + React/Vite presentations. Build tools at root level (`package.json`, `vite.config.js`).

## Git Identity
- **Always use this identity for commits in this repo:**
  - Name: `Giga Khizanishvili`
  - Email: `khizanag@gmail.com`
- This is configured via local git config (`user.name` and `user.email`)
- **Never** use the work email (`giga.khizanishvili@space.ge`) for this repository

## Workflow Rules
- **Always commit directly to `master`** — no feature branches
- **Always push to remote after every commit**
- HTML files reference external CSS via `<link>` tags — do not use inline `<style>` blocks

## Structure
- `index.html` — the main portfolio page (HTML + JS, styles in `css/portfolio/portfolio.css`)
- `jobs.html` — iOS Career Hub page (HTML + JS, styles in `css/jobs/jobs.css`)
- `roadmap.html` — iOS Mastery Roadmap (knowledge map for Senior iOS Developers)
- `interview.html` — iOS Interview tool
- `css/` — stylesheets organized by concern:
  - `core/` — `design-system.css` (tokens, variables), `scroll-indicator.css` (shared scroll component)
  - `themes/` — `default.css` (placeholder), `pres.css` (dark navy + neon green)
  - `portfolio/` — `portfolio.css` (portfolio page styles)
  - `jobs/` — `jobs.css` (Career Hub page styles)
  - `roadmap/` — `roadmap.css` (flowchart, domain cards, topic checklists, progress tracking)
  - `interview/` — `base.css`, `auth.css`, `setup.css`, `dashboard.css`, `question.css`, `results.css`, `bank.css`, `analytics.css`, `flashcard.css`, `templates.css`, `custom.css`, `sandbox.css`, `gamification.css`, `profile.css`, `live.css`, `host.css`, `guide.css`, `config-page.css`, `history-page.css`, `responsive.css`
  - `psd/` — `psd.css` (PSD study tool styles)
- `js/` — scripts organized by concern:
  - `shared/` — `keyboard-nav.js` (ArrowLeft/ArrowRight section navigation)
  - `jobs/` — `jobs.js` (Career Hub interactivity)
  - `roadmap/` — `roadmap.js` (data-driven rendering, progress tracking, expand/collapse, filtering)
  - `interview/` — app modules (`app.js`, `config.js`, `session.js`, `timer.js`, `plan.js`, `results.js`, `history.js`, `utils.js`, `features.js`, `highlighter.js`, `firebase.js`, `live.js`, `flashcard.js`, `analytics.js`, `bank.js`, `templates.js`, `custom.js`, `sandbox.js`, `gamification.js`, `guide.js`, `host.js`, `config-page.js`, `history-page.js`)
  - `interview/questions/` — `ios.js`, `android.js`, `frontend.js`, `backend.js`, `behavioral.js`
  - `interview/live-coding/` — `index.js`, `easy-medium.js`, `hard-expert.js`
  - `psd/` — `questions.js`, `app.js` (PSD study tool)
- `src/presentations/` — React + Vite source for tech talk presentations (built via root-level Vite config)

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
- Reference: `src/presentations/hooks.js` (`useKeyboardNav`) for the React equivalent

## CSS Rules
- Each page has its own CSS subdirectory: `css/portfolio/`, `css/jobs/`, `css/interview/`
- Theme overrides live in `css/themes/pres.css` — loaded after the page CSS via cascade
- Keep CSS files split by screen/concern — never create a single monolithic CSS file
- Interview tool CSS lives in `css/interview/`: `base.css`, `setup.css`, `question.css`, `results.css`, `responsive.css`, etc.
- When adding new styles, place them in the appropriate subdirectory

## Question Bank Rules
- Answers in `js/interview/questions/ios.js` should use `\n` line breaks to separate distinct concepts
- Lists of items should use `\n- ` prefix for each item
- Short answers (1-2 sentences) stay as single lines
- Comparisons should separate each item with `\n`
- CSS uses `white-space: pre-line` to render the line breaks

## Workflow
- **One commit per task** — when you finish a task, immediately create a separate commit and push before starting the next task
- Never batch multiple unrelated tasks into a single commit
- Keep commits focused — one feature/fix per commit
- If a user request contains multiple tasks, complete each one with its own commit+push cycle

## Presentations
- Source lives in `src/presentations/` (React + Vite)
- Build config at root: `package.json`, `vite.config.js` (root `src/presentations`)
- Built output goes to `dist/presentations/` — NOT tracked in git
- GitHub Actions builds and deploys automatically on push to `master`
- To build locally: `npm ci && npm run build`
- Vite `base` is set to `/presentations/` — do not change without updating the deploy workflow

## Theme System
- Two themes: `css/themes/default.css` (Apple-style) and `css/themes/pres.css` (presentations dark navy)
- Both `index.html` and `jobs.html` include `<link id="themeCSS" href="css/themes/pres.css">`
- To switch themes: change the `href` attribute on the `#themeCSS` link
- Theme CSS overrides `:root` custom properties + adds structural CSS via cascade
- The presentations theme adds animated grid (body::before) and ambient blobs (body::after)
- All sections must have `position: relative; z-index: 1` to sit above fixed backgrounds

## Deployment
- GitHub Pages deploys via GitHub Actions (`.github/workflows/deploy.yml`)
- Push to `master` triggers: build presentations → assemble full site → deploy to Pages
- Static files (HTML, CSS, JS, PDF) are copied directly; `src/presentations/` is built via Vite to `dist/presentations/`
- No built output is committed to git
