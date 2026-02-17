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
- Keep the site as a single `index.html` unless complexity requires splitting

## Structure
- `index.html` — the main portfolio site (HTML + inline CSS + JS)
- `interview.html` — iOS Interview tool
- `js/` — modular JS files (config, session, timer, plan, results, app, etc.)
- `css/` — modular CSS files, split by screen/concern

## CSS Rules
- Keep CSS files split by screen/concern — never create a single monolithic CSS file
- Current split: `interview-base.css`, `interview-setup.css`, `interview-question.css`, `interview-results.css`, `interview-responsive.css`
- When adding new styles, place them in the appropriate file by screen

## Question Bank Rules
- Answers in `js/questions.js` should use `\n` line breaks to separate distinct concepts
- Lists of items should use `\n- ` prefix for each item
- Short answers (1-2 sentences) stay as single lines
- Comparisons should separate each item with `\n`
- CSS uses `white-space: pre-line` to render the line breaks

## Workflow
- After completing each task, commit and push immediately before starting the next task
- Keep commits focused — one feature/fix per commit

## Deployment
- GitHub Pages serves from the `master` branch root
- Any push to `master` triggers automatic deployment
