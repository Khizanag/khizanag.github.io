# Presentation Guide

Scroll-based tech-talk decks in React, TypeScript and Vite. Each deck is a directory
under `slides/`, lazy-loaded from the registry and rendered as one scrolling page.

## Running locally

```bash
npm ci
npm run dev
```

Open <http://localhost:5173/presentations/> — the Vite root is `src/presentations` and
`base` is `/presentations/`.

The home screen lists every registered deck as a card. Opening one sets the URL hash
(`#dotgithub-directory`) and renders it full-screen; the fixed **All presentations**
button clears the hash and returns home. An unknown hash renders a "No such
presentation" screen, and a deck that throws is caught by `ErrorBoundary`.

## File structure

```text
src/presentations/
├── index.html        ← Vite entry; loads Syne, DM Sans and JetBrains Mono
├── main.tsx          ← React entry point
├── App.tsx           ← hash routing, global <style>, ErrorBoundary
├── Home.tsx          ← card grid over SLIDES
├── SlideView.tsx     ← Suspense fallback, back button, not-found screen
├── registry.ts       ← Slide interface + SLIDES array of lazy imports
├── tokens.ts         ← C, FONTS, KEYFRAMES
├── hooks.ts          ← useInView, useScrolled, useLocalTabNav, useKeyboardNav
├── shared.tsx        ← the barrel every deck imports from
├── components/       ← reusable presentation components
└── slides/
    └── <deck-id>/
        ├── index.tsx ← default-exported deck component
        ├── ui.tsx    ← deck accent colour + deck-local components
        ├── hero.tsx
        └── …         ← one file per section
```

Build config sits at the repository root — `package.json` and `vite.config.js`, which
sets the Vite root to `src/presentations`, the base to `/presentations/` and the build
output to `dist/presentations` (not tracked in Git).

## Shared building blocks

Decks import from `shared.tsx`, never from the individual files behind it:

```tsx
import { C, Reveal, SectionHeading, useKeyboardNav } from "../../shared.tsx";
```

| Source file                         | Exports                                                    |
|-------------------------------------|------------------------------------------------------------|
| `tokens.ts`                         | `C`, `FONTS`, `KEYFRAMES`                                  |
| `hooks.ts`                          | `useInView`, `useScrolled`, `useKeyboardNav`, `useLocalTabNav` |
| `components/layout.tsx`             | `Reveal`, `AnimatedGrid`, `AmbientBlobs`                   |
| `components/typography.tsx`         | `SectionLabel`, `SectionHeading`, `TagChip`                |
| `components/cards.tsx`              | `InfoCard`, `CheckItem`, `CalloutBox`, `PlainEnglishBox`, `FeatureCard` |
| `components/content.tsx`            | `WorkflowStep`, `CodeBlock`, `KeyValueDiff`                |
| `components/interactive.tsx`        | `TabButton`                                                |
| `components/HeroSection.tsx`        | `PresentationHero`                                         |
| `components/PresentationNav.tsx`    | `PresentationNav`                                          |
| `components/ThankYouSection.tsx`    | `ThankYouSection`                                          |
| `components/PresentationFooter.tsx` | `PresentationFooter`                                       |
| `components/ErrorBoundary.tsx`      | `ErrorBoundary`                                            |

## Adding a new deck

### 1. Create the directory

`slides/<deck-id>/`, kebab-case. The URL comes from the registry `id`, not the folder.

### 2. Pin the accent colour in `ui.tsx`

```tsx
import { C } from "../../shared.tsx";

export const P = C.purple;
export const PDim = C.purpleDim;
```

Deck-local components — stat badges, comparison rows — belong in the same file.

### 3. Write one file per section

Each section file exports a named component whose root `<section>` carries the `id` used
for keyboard navigation:

```tsx
import { Reveal, SectionLabel, SectionHeading } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function WhatSection() {
  return (
    <section id="s-what" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 48px" }}>
      <Reveal>
        <SectionLabel color={P}>THE POINT</SectionLabel>
        <SectionHeading sub="A supporting sentence.">Main Section Title</SectionHeading>
      </Reveal>
    </section>
  );
}
```

### 4. Compose them in `index.tsx`

Both `PresentationNav` and `PresentationFooter` require a `logo` node.

```tsx
import {
  C, useScrolled, useKeyboardNav, AnimatedGrid, AmbientBlobs,
  PresentationNav, ThankYouSection, PresentationFooter,
} from "../../shared.tsx";
import { P, PDim } from "./ui.tsx";
import { HeroSection } from "./hero.tsx";
import { WhatSection } from "./what.tsx";

const SECTION_IDS = ["s-hero", "s-what", "s-thankyou"];

const LOGO = <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: P }}>YD</span>;

export default function YourDeck() {
  const scrolled = useScrolled(60);
  useKeyboardNav(SECTION_IDS);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'DM Sans', sans-serif" }}>
      <AnimatedGrid />
      <AmbientBlobs />
      <PresentationNav
        logo={LOGO} scrolled={scrolled} title="Your Deck" badge="Giga Khizanishvili"
        links={[{ label: "The Point", id: "s-what" }]} color={P} colorDim={PDim}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
        <WhatSection />
        <ThankYouSection id="s-thankyou" label="2026" color={P} colorDim={PDim} />
        <PresentationFooter logo={LOGO} name="Your Deck · Giga Khizanishvili" links={[]} date="2026" />
      </div>
    </div>
  );
}
```

### 5. Register it in `registry.ts`

```ts
const YourDeck = lazy(() => import("./slides/your-deck/index.tsx"));

{
  id:            "your-deck",
  title:         "Short display title",
  subtitle:      "One or two sentences describing the content.",
  category:      "Architecture",
  categoryColor: C.accent,
  date:          "Mar 2026",
  component:     YourDeck,
},
```

`id` becomes the URL hash. `category` is a free-form string rendered upper-cased on the
card; these are the pairings currently in use:

| Category       | Colour     |
|----------------|------------|
| Architecture   | `C.accent` |
| CI/CD          | `C.blue`   |
| Git Internals  | `C.blue`   |
| GitHub         | `C.purple` |
| Indie Business | `C.accent` |

## Design tokens

### Colours

```ts
export const C = {
  bg:         "#05080f",
  surface:    "#0c1018",
  surfaceHi:  "#111820",
  border:     "#1a2235",
  borderHi:   "#2a3a55",
  accent:     "#00ff88",
  accentDim:  "rgba(0,255,136,0.10)",
  blue:       "#4d9fff",
  blueDim:    "rgba(77,159,255,0.10)",
  purple:     "#a78bfa",
  purpleDim:  "rgba(167,139,250,0.10)",
  yellow:     "#ffd60a",
  red:        "#ff4d6d",
  text:       "#e8edf5",
  muted:      "#5a6a82",
  subtle:     "#2a3548",
} as const satisfies Record<string, string>;
```

`FONTS` (reset, focus ring, print rules) and `KEYFRAMES` (`fadeUp`, `fadeIn`,
`gridMove`, `pulse-glow`) are injected once by `App.tsx` — never redeclare them in a deck.

### Typography

| Role       | Font                   | Usage                       |
|------------|------------------------|-----------------------------|
| Headlines  | Syne 700–800           | `h1`, `h2`, hero titles     |
| UI labels  | Syne 600–700           | buttons, tags, nav          |
| Body text  | DM Sans 300–500        | paragraphs, descriptions    |
| Code, meta | JetBrains Mono 300–600 | code blocks, metadata chips |

## Keyboard navigation

```ts
useKeyboardNav(sectionIds: string[]): void
```

Arrow keys move between the listed section ids, smooth-scrolling and briefly fading the
target in. Keystrokes inside an `input`, `textarea` or `contenteditable` are ignored.

```ts
useLocalTabNav(
  sectionId: string,
  count: number,
  indexRef: RefObject<number>,
  setIndex: Dispatch<SetStateAction<number>>,
): void
```

Arrow keys switch tabs inside one section while that section fills the viewport. It
listens in the capture phase, so at the first or last tab the event falls through to
`useKeyboardNav` and section navigation continues as normal:

```tsx
const [active, setActive] = useState(0);
const activeRef = useRef(active);
activeRef.current = active;
useLocalTabNav("s-community", FILES.length, activeRef, setActive);
```

`useInView(threshold = 0.15)` returns `[ref, inView]` for entrance animations, and
`useScrolled(threshold = 60)` returns the boolean the sticky nav blurs on.

## Verification

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

`.github/workflows/deploy.yml` runs the same four before assembling and deploying the site.
