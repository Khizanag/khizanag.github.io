# Giga Khizanishvili — Personal GitHub Pages Site

## Overview
Personal portfolio/resume website for Giga Khizanishvili, hosted via GitHub Pages.
Static HTML/CSS/JS — no build tools or frameworks required.

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
- `index.html` — the main portfolio page (HTML + JS, styles in `css/portfolio.css`)
- `jobs.html` — iOS Career Hub page (HTML + JS, styles in `css/jobs.css`)
- `roadmap.html` — iOS Mastery Roadmap (knowledge map for Senior iOS Developers)
- `interview.html` — iOS Interview tool
- `css/` — all stylesheets:
  - `portfolio.css` — portfolio page styles (design tokens, layout, components, responsive, animations)
  - `jobs.css` — Career Hub page styles (design tokens, layout, components, responsive, animations)
  - `roadmap.css` — roadmap page styles (flowchart, domain cards, topic checklists, progress tracking)
  - `theme-pres.css` — presentations theme override (dark navy, neon green, animated grid/blobs)
  - `theme-default.css` — default theme placeholder (inline styles are the default)
  - `interview-*.css` — interview tool styles, split by screen/concern
- `js/` — modular JS files (config, session, timer, plan, results, app, keyboard-nav, roadmap, etc.)
- `js/roadmap.js` — roadmap interactivity (data-driven rendering, progress tracking, expand/collapse, filtering)
- `_presentations/` — React + Vite source for tech talk presentations
- `presentations/` — built output served at `/presentations/` (do not edit directly — rebuild from `_presentations/`)

## Component Reuse Rules
- **Before creating any UI pattern, check existing pages first** (`index.html`, `interview.html`, `guide.html`, etc.)
- If a component already exists (scroll indicator, hero stats, nav bar, progress bar, card styles, section headers, etc.), **reuse its exact HTML structure and CSS** — do not reinvent it
- Match class names, markup hierarchy, animations, and responsive behavior from the original
- If no existing component supports the needed behavior, **create it as a reusable component** with a clear, generic class name — then use it across pages
- Never create a one-off variant of something that already exists elsewhere in the site

## Keyboard Section Navigation
- **Every multi-section page must support ArrowLeft/ArrowRight keyboard navigation** between sections
- Use the shared `js/keyboard-nav.js` utility — do NOT duplicate the logic inline
- Add the script with a `data-sections` attribute listing section IDs in order:
  ```html
  <script src="js/keyboard-nav.js" data-sections="hero,about,experience,contact"></script>
  ```
- Each `<section>` must have an `id` attribute for this to work
- Reference: `_presentations/src/hooks.js` (`useKeyboardNav`) for the React equivalent

## CSS Rules
- Each page has its own CSS file: `portfolio.css`, `jobs.css`, `interview-*.css`
- Theme overrides live in `css/theme-pres.css` — loaded after the page CSS via cascade
- Keep CSS files split by screen/concern — never create a single monolithic CSS file
- Interview tool split: `interview-base.css`, `interview-setup.css`, `interview-question.css`, `interview-results.css`, `interview-responsive.css`
- When adding new styles, place them in the appropriate page CSS file

## Question Bank Rules
- Answers in `js/questions.js` should use `\n` line breaks to separate distinct concepts
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
- Source lives in `_presentations/` (React + Vite)
- Built output goes to `presentations/` (committed to git for GitHub Pages)
- To rebuild: `cd _presentations && npm ci && npm run build`, then copy `dist/` to `presentations/`
- The `_presentations/` and `presentations/` names differ due to macOS case-insensitive filesystem
- Vite `base` is set to `/presentations/` — do not change without updating the output directory

## Theme System
- Two themes: `css/theme-default.css` (Apple-style) and `css/theme-pres.css` (presentations dark navy)
- Both `index.html` and `jobs.html` include `<link id="themeCSS" href="css/theme-pres.css">`
- To switch themes: change the `href` attribute on the `#themeCSS` link
- Theme CSS overrides `:root` custom properties + adds structural CSS via cascade
- The presentations theme adds animated grid (body::before) and ambient blobs (body::after)
- All sections must have `position: relative; z-index: 1` to sit above fixed backgrounds

## Deployment
- GitHub Pages serves from the `master` branch root
- Any push to `master` triggers automatic deployment
