# Presentation Guide

A minimal React + Vite setup for building scroll-based research presentations.
Each presentation is a single self-contained `.jsx` file.

---

## Running locally

```bash
cd Presentations
npm run dev
# → http://localhost:5173
```

The home screen lists all registered presentations as cards.
Click a card to open it full-screen. Use **← All presentations** to go back.

---

## Shared components

All reusable building blocks live in `src/shared.jsx`. Import what you need:

```jsx
import {
  C,               // color palette
  FONTS,           // Google Fonts import string
  KEYFRAMES,       // CSS keyframe animations string
  useInView,       // IntersectionObserver hook
  useScrolled,     // scroll position hook
  Reveal,          // scroll-entrance animation wrapper
  SectionLabel,    // "─── SECTION LABEL" row
  SectionHeading,  // large h2 + optional subtitle
  TagChip,         // small pill badge
  InfoCard,        // surface card with accent top line
  CheckItem,       // ✓ / ✕ checklist row
  WorkflowStep,    // numbered timeline step
  CodeBlock,       // Mac-style syntax code block
  KeyValueDiff,    // before/after struck-through comparison
  CalloutBox,      // highlighted insight / warning box
  AnimatedGrid,    // fixed background dot grid
  AmbientBlobs,    // fixed background gradient blobs
} from "../src/shared.jsx";
```

---

## Adding a new presentation

### 1. Create the file

```
slides/your-topic-name.jsx
```

Use kebab-case. The filename becomes the presentation's `id`.

### 2. Scaffold the component

Every presentation is a **single default-exported React component**.
Use shared tokens and components — no need to redefine them per slide.

```jsx
import { C, FONTS, KEYFRAMES, Reveal, SectionLabel, SectionHeading,
         AnimatedGrid, AmbientBlobs } from "../src/shared.jsx";

export default function YourTopicName() {
  return (
    <>
      <style>{FONTS}{KEYFRAMES}</style>
      <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'DM Sans', sans-serif" }}>

        <AnimatedGrid />
        <AmbientBlobs />

        <div style={{ position: "relative", zIndex: 1 }}>

          {/* Hero */}
          <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "120px 48px 80px" }}>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(44px, 6vw, 80px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
              Your Title
            </h1>
            <p style={{ fontSize: 18, color: C.muted, lineHeight: 1.7, maxWidth: 540, marginTop: 24 }}>
              One-paragraph summary of the topic.
            </p>
          </section>

          {/* Section example */}
          <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 48px" }}>
            <Reveal>
              <SectionLabel color={C.accent}>THE POINT</SectionLabel>
              <SectionHeading sub="A brief supporting sentence that adds context.">
                Main Section Title
              </SectionHeading>
            </Reveal>
            {/* content */}
          </section>

        </div>
      </div>
    </>
  );
}
```

### 3. Register it in `src/App.jsx`

Add an import and an entry to the `SLIDES` array:

```jsx
// 1. Import at the top of App.jsx
import YourTopicName from "../slides/your-topic-name.jsx";

// 2. Add to SLIDES array
{
  id:            "your-topic-name",
  title:         "Short display title",
  subtitle:      "One sentence describing the content.",
  category:      "Architecture",          // see categories below
  categoryColor: C.accent,               // pick a token from C
  date:          "Mar 2026",
  component:     YourTopicName,
},
```

**Available categories and suggested colors:**

| Category       | Color token  | Hex       |
|----------------|-------------|-----------|
| Architecture   | `C.accent`  | `#00ff88` |
| CI/CD          | `C.blue`    | `#4d9fff` |
| Process        | `C.purple`  | `#a78bfa` |
| Security       | `C.red`     | `#ff4d6d` |
| Tooling        | `C.yellow`  | `#ffd60a` |

---

## Design system

### Typography

| Role           | Font             | Usage                       |
|----------------|------------------|-----------------------------|
| Headlines      | Syne 800         | `h1`, `h2`, section labels  |
| UI labels      | Syne 600–700     | buttons, tags, nav          |
| Body text      | DM Sans 300–400  | paragraphs, descriptions    |
| Code / mono    | JetBrains Mono   | code blocks, metadata chips |

### Colors

```js
const C = {
  bg:        "#05080f",   // page background
  surface:   "#0c1018",   // cards, panels
  border:    "#1a2235",   // dividers, card borders
  accent:    "#00ff88",   // primary CTA, success
  blue:      "#4d9fff",   // info, links
  purple:    "#a78bfa",   // secondary accent
  yellow:    "#ffd60a",   // warnings, highlights
  red:       "#ff4d6d",   // errors, problems
  text:      "#e8edf5",   // primary text
  muted:     "#5a6a82",   // secondary text
};
```

### Spacing rhythm

Use multiples of **8px** for padding and gaps: `8 16 24 32 48 64 80 96 120`.

### Section anatomy

Every section follows the same pattern:

```
label row   →  short horizontal line + ALL-CAPS category tag
headline    →  Syne 800, large, tight tracking
subtext     →  DM Sans 300, muted, max-width ~560px
content     →  cards / code / diagram
```

---

## Common patterns

### Alternating surface sections

Alternate `background: C.bg` ↔ `background: C.surface` with `borderTop/Bottom: \`1px solid ${C.border}\`` to create visual rhythm as you scroll.

### Sticky nav with blur

```jsx
import { useScrolled } from "../src/shared.jsx";

const scrolled = useScrolled(); // inside your component

<nav style={{
  position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
  background: scrolled ? "rgba(5,8,15,0.88)" : "transparent",
  backdropFilter: scrolled ? "blur(24px)" : "none",
  borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`,
  transition: "all 0.4s ease",
  padding: "0 48px", height: 64,
  display: "flex", alignItems: "center",
}} />
```

---

## File structure

```
Presentations/
├── slides/                    ← one .jsx file per presentation
│   └── github-access-strategy.jsx
├── src/
│   ├── App.jsx                ← home page + slide registry (edit this)
│   └── main.jsx               ← React entry point (don't touch)
├── index.html
├── vite.config.js
├── package.json
└── PRESENTATION_GUIDE.md      ← you are here
```
