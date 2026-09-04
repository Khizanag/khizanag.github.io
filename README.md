# khizanag.github.io

Personal portfolio and resume site for Giga Khizanishvili, deployed to [khizanag.github.io](https://khizanag.github.io) via GitHub Pages. It pairs static HTML/CSS/JS pages with a React + Vite app for tech-talk presentations.

## Pages

- [Portfolio](index.html) — resume, experience, and project highlights
- [iOS Career Hub](jobs.html) — job search tracker and resources
- [iOS Mastery Roadmap](roadmap.html) — knowledge map for senior iOS developers
- [PSD Study Hub](psd.html) — Professional Scrum Developer certification study tool
- [Not found](404.html) — custom 404 page for unknown URLs
- [Presentations](https://khizanag.github.io/presentations/) — scroll-based tech-talk decks, built from `src/presentations/`

The mock interview tool moved to [Interview Lab](https://interview-lab-khizanag.web.app/), which lives in its own `Khizanag/interview-lab` repository.

## Development

```bash
git clone git@github.com:Khizanag/khizanag.github.io.git
cd khizanag.github.io
nvm use
npm ci
```

Run the presentations app locally:

```bash
npm run dev
```

Preview the static pages (portfolio, jobs, roadmap, psd) with any static file server, for example:

```bash
npx serve .
```

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): it typechecks, lints, and builds the presentations app, assembles the static pages plus the build output into `_site`, smoke-checks what would ship, and deploys the result to GitHub Pages.

## Docs

- [CLAUDE.md](CLAUDE.md) — repo conventions and structure
- [Presentation Guide](src/presentations/PRESENTATION_GUIDE.md) — presentations app internals
