var QUESTION_BANK_FRONTEND = [
  // === JavaScript (7 questions) ===
  {
    "topic": "javascript",
    "level": 0,
    "question": "What is a closure in JavaScript and why is it useful?",
    "hint": "Think about a function that remembers variables from its outer scope.",
    "answer": "A closure is a function that retains access to variables from its enclosing lexical scope even after that scope has finished executing.\nThey are useful for data privacy, creating factory functions, and maintaining state in callbacks or event handlers."
  },
  {
    "topic": "javascript",
    "level": 0,
    "question": "How does prototypal inheritance work in JavaScript?",
    "hint": "Every object has an internal link to another object called its prototype.",
    "answer": "Every JavaScript object has a hidden [[Prototype]] link to another object. When a property is accessed and not found on the object itself, the engine walks up the prototype chain until it finds the property or reaches null.\nConstructor functions set up this chain via their .prototype property, and Object.create() lets you specify the prototype directly."
  },
  {
    "topic": "javascript",
    "level": 1,
    "question": "Explain the JavaScript event loop and how it handles asynchronous operations.",
    "hint": "Think about the call stack, task queue, and microtask queue.",
    "answer": "The event loop continuously checks whether the call stack is empty. When it is, it first drains all microtasks (Promise callbacks, queueMicrotask) and then picks the next macrotask (setTimeout, I/O) from the task queue.\nThis single-threaded model lets JS handle concurrency without multiple threads by deferring work and processing results when the stack is clear."
  },
  {
    "topic": "javascript",
    "level": 1,
    "question": "What are Promises and how do they improve over plain callbacks?",
    "hint": "Consider callback hell and the ability to chain .then() calls.",
    "answer": "A Promise represents a value that may be available now, later, or never, with three states: pending, fulfilled, or rejected.\nPromises improve on callbacks by allowing chaining with .then(), centralized error handling with .catch(), and composition with Promise.all/race, avoiding deeply nested callback hell."
  },
  {
    "topic": "javascript",
    "level": 2,
    "question": "How do async/await work under the hood, and what are common pitfalls?",
    "hint": "They are syntactic sugar over Promises. Think about sequential vs parallel execution.",
    "answer": "async/await is syntactic sugar over Promises — an async function always returns a Promise and await pauses execution until the Promise settles, resuming via microtasks.\nCommon pitfalls: accidentally running awaits sequentially when they could be parallel (use Promise.all instead), forgetting try/catch for error handling, and using await inside loops causing waterfall requests."
  },
  {
    "topic": "javascript",
    "level": 3,
    "question": "Explain the different behaviors of 'this' in JavaScript across arrow functions, regular functions, and class methods.",
    "hint": "Arrow functions do not have their own 'this' binding.",
    "answer": "In regular functions, 'this' is determined at call time: the object before the dot, or globalThis/undefined in strict mode for standalone calls. Arrow functions capture 'this' lexically from the enclosing scope at creation time and cannot be rebound.\nClass methods behave like regular functions so they lose 'this' when extracted as callbacks — fix this with arrow functions in class fields or explicit bind in the constructor."
  },
  {
    "topic": "javascript",
    "level": 4,
    "question": "Compare ES Modules and CommonJS: loading semantics, tree-shaking, and circular dependency handling.",
    "hint": "ESM is static and asynchronous; CJS is dynamic and synchronous.",
    "answer": "ESM uses static import/export declarations parsed before execution, enabling tree-shaking because bundlers can determine unused exports at build time. CJS uses require() which is synchronous and dynamic, preventing reliable static analysis.\nFor circular dependencies, ESM provides live bindings (importing modules see updated values) while CJS provides a snapshot of the partially-executed module, often yielding undefined for not-yet-initialized exports."
  },

  // === TypeScript (4 questions) ===
  {
    "topic": "typescript",
    "level": 1,
    "question": "What are the benefits of TypeScript's type system over plain JavaScript?",
    "hint": "Think about catching errors at compile time rather than runtime.",
    "answer": "TypeScript's structural type system catches type errors at compile time, provides rich IDE autocompletion and refactoring support, and serves as living documentation for function signatures and data shapes.\nIt also enables safer large-scale refactors because the compiler verifies that changes are consistent across the codebase."
  },
  {
    "topic": "typescript",
    "level": 2,
    "question": "How do generics work in TypeScript and when should you use them?",
    "hint": "Generics let you create reusable components that work with multiple types.",
    "answer": "Generics are type parameters (e.g., <T>) that let you write functions, classes, and interfaces that work with any type while preserving type safety. The actual type is inferred or specified at the call site.\nUse them when a function operates on varying types but the relationship between input and output types matters, such as array utilities, API response wrappers, or data structure implementations."
  },
  {
    "topic": "typescript",
    "level": 3,
    "question": "Explain utility types like Partial, Pick, Omit, and Record. When would you use each?",
    "hint": "They transform existing types without redefining them.",
    "answer": "Partial<T> makes all properties optional — useful for update/patch functions. Pick<T, K> extracts a subset of properties — useful for component props that need only some fields. Omit<T, K> removes specific properties — useful for excluding sensitive fields.\nRecord<K, V> creates an object type with keys of type K and values of type V — useful for dictionaries and lookup maps."
  },
  {
    "topic": "typescript",
    "level": 4,
    "question": "What are type guards and discriminated unions, and how do they enable exhaustive pattern matching?",
    "hint": "Think about narrowing types at runtime using a shared literal field.",
    "answer": "Type guards are runtime checks (typeof, instanceof, or custom predicates with 'is') that narrow a variable's type within a branch. Discriminated unions use a shared literal property (discriminant) so TypeScript can narrow the union based on that field's value.\nExhaustive checking is achieved by assigning the narrowed value to a 'never' type in the default branch — if a new variant is added, the compiler flags the unhandled case."
  },

  // === React (7 questions) ===
  {
    "topic": "react",
    "level": 0,
    "question": "What are React hooks and why were they introduced?",
    "hint": "They let you use state and lifecycle features without writing a class.",
    "answer": "Hooks are functions (useState, useEffect, etc.) that let functional components use state, side effects, context, and other React features that previously required class components.\nThey were introduced to simplify code reuse through custom hooks, avoid the confusion of 'this' in classes, and make components easier to test and compose."
  },
  {
    "topic": "react",
    "level": 1,
    "question": "How does React's Virtual DOM work and what problem does it solve?",
    "hint": "Think about diffing a lightweight tree against the real DOM.",
    "answer": "The Virtual DOM is a lightweight in-memory representation of the actual DOM. On state changes, React creates a new virtual tree, diffs it against the previous one (reconciliation), and applies only the minimal set of real DOM mutations.\nThis solves the performance problem of directly manipulating the DOM for every change, and lets developers write declarative UI code without manually tracking what needs to update."
  },
  {
    "topic": "react",
    "level": 1,
    "question": "Explain useState and useEffect. What are the rules of hooks?",
    "hint": "Consider the dependency array in useEffect and why hooks cannot be called conditionally.",
    "answer": "useState returns a state variable and setter that triggers re-renders. useEffect runs side effects after render — its dependency array controls when it re-runs, and its return function handles cleanup.\nRules of hooks: only call hooks at the top level (never inside conditions, loops, or nested functions) and only call them from React function components or custom hooks — this ensures consistent hook ordering between renders."
  },
  {
    "topic": "react",
    "level": 2,
    "question": "When and how should you use React.memo, useMemo, and useCallback for performance?",
    "hint": "They all prevent unnecessary work, but each targets a different thing.",
    "answer": "React.memo wraps a component to skip re-rendering when props are shallowly equal. useMemo memoizes an expensive computed value so it only recalculates when dependencies change. useCallback memoizes a function reference to prevent child components wrapped in React.memo from re-rendering due to a new function identity.\nAvoid premature use — profile first, because memoization itself has a memory and comparison cost."
  },
  {
    "topic": "react",
    "level": 3,
    "question": "How does React Context work and what are its performance limitations?",
    "hint": "Any context value change re-renders all consumers.",
    "answer": "Context provides a way to pass data through the component tree without prop drilling. A Provider sets the value and all useContext consumers re-render whenever that value changes.\nThe main limitation is that any change to the context value re-renders every consumer, even if they only use a part of it. Mitigations include splitting contexts by concern, memoizing the value object, and using state management libraries for high-frequency updates."
  },
  {
    "topic": "react",
    "level": 4,
    "question": "What are Error Boundaries and how do you implement one?",
    "hint": "They catch JavaScript errors in the component tree and display a fallback UI.",
    "answer": "Error Boundaries are class components that implement getDerivedStateFromError (to render fallback UI) and/or componentDidCatch (to log errors). They catch errors during rendering, in lifecycle methods, and in constructors of the whole subtree below them.\nThey do not catch errors in event handlers, async code, or server-side rendering. There is no hook equivalent yet, so a class component is still required."
  },
  {
    "topic": "react",
    "level": 5,
    "question": "Explain React Server Components: how they differ from Client Components and what architectural benefits they provide.",
    "hint": "RSCs run only on the server and send serialized output, not JavaScript, to the client.",
    "answer": "React Server Components execute on the server and stream a serialized UI description (not JS bundle) to the client. They can directly access databases, file systems, and server-only APIs without exposing secrets, and their code is never shipped to the browser, reducing bundle size.\nClient Components are marked with 'use client' and handle interactivity, state, and browser APIs. The architectural benefit is a clear separation: data-fetching and rendering logic stays on the server while only interactive code is sent to the client."
  },

  // === CSS (5 questions) ===
  {
    "topic": "css",
    "level": 0,
    "question": "How does Flexbox work and what are its key properties?",
    "hint": "Think about a main axis and a cross axis.",
    "answer": "Flexbox is a one-dimensional layout model that distributes space along a main axis (row or column). The container uses display:flex with properties like flex-direction, justify-content (main axis alignment), and align-items (cross axis alignment).\nChildren use flex-grow, flex-shrink, and flex-basis to control how they share available space. It is ideal for navigation bars, centering content, and distributing items evenly."
  },
  {
    "topic": "css",
    "level": 1,
    "question": "What is CSS Grid and how does it differ from Flexbox?",
    "hint": "Grid is two-dimensional while Flexbox is one-dimensional.",
    "answer": "CSS Grid is a two-dimensional layout system that defines rows and columns simultaneously using grid-template-rows and grid-template-columns. Items can be placed in specific cells or span multiple rows/columns.\nFlexbox works along a single axis and is best for distributing items in a row or column, while Grid excels at full page layouts and complex two-dimensional arrangements. They complement each other well."
  },
  {
    "topic": "css",
    "level": 2,
    "question": "How does CSS specificity work and how do you resolve conflicts?",
    "hint": "Inline styles > IDs > classes > elements. Think of it as a scoring system.",
    "answer": "Specificity is a scoring system: inline styles (1,0,0,0), IDs (0,1,0,0), classes/attributes/pseudo-classes (0,0,1,0), and elements/pseudo-elements (0,0,0,1). When selectors conflict, the higher specificity wins; equal specificity uses source order.\nAvoid over-qualifying selectors or using !important. Prefer low-specificity approaches like BEM class naming to keep styles predictable and maintainable."
  },
  {
    "topic": "css",
    "level": 2,
    "question": "What is the BEM naming convention and why is it useful?",
    "hint": "Block, Element, Modifier — a naming pattern for CSS classes.",
    "answer": "BEM stands for Block-Element-Modifier: .block, .block__element, .block--modifier. A block is a standalone component, an element is a part of a block, and a modifier is a variation or state.\nIt keeps specificity flat (single class selectors), makes the relationship between HTML and CSS clear, prevents naming collisions in large codebases, and makes styles more predictable and maintainable."
  },
  {
    "topic": "css",
    "level": 3,
    "question": "Explain responsive design strategies: media queries, container queries, fluid typography, and mobile-first approach.",
    "hint": "Think about designing for the smallest screen first and scaling up.",
    "answer": "Mobile-first means writing base styles for small screens and using min-width media queries to add complexity for larger viewports. Container queries (@container) let components respond to their parent's size rather than the viewport, enabling truly reusable components.\nFluid typography uses clamp() (e.g., clamp(1rem, 2.5vw, 2rem)) to smoothly scale font size between breakpoints without abrupt jumps. Combining these strategies creates layouts that adapt gracefully across all screen sizes."
  },

  // === HTML & Web Platform (4 questions) ===
  {
    "topic": "html-web",
    "level": 0,
    "question": "What is semantic HTML and why does it matter?",
    "hint": "Think about using <article>, <nav>, <main> instead of only <div>.",
    "answer": "Semantic HTML uses elements that describe their meaning (header, nav, main, article, section, aside, footer) rather than generic divs and spans. This conveys document structure to browsers, search engines, and assistive technologies.\nIt improves accessibility for screen readers, boosts SEO by helping crawlers understand content hierarchy, and makes code more readable and maintainable for developers."
  },
  {
    "topic": "html-web",
    "level": 1,
    "question": "What are the key web accessibility (a11y) practices a frontend developer should follow?",
    "hint": "ARIA attributes, keyboard navigation, color contrast, alt text.",
    "answer": "Key practices: use semantic HTML as the foundation, provide alt text for images, ensure all interactive elements are keyboard-accessible with visible focus indicators, and maintain sufficient color contrast (WCAG AA: 4.5:1 for text).\nUse ARIA attributes only when native semantics are insufficient, label all form inputs, manage focus for modals and dynamic content, and test with screen readers and keyboard-only navigation."
  },
  {
    "topic": "html-web",
    "level": 2,
    "question": "What are Web Workers and when would you use them?",
    "hint": "They run JavaScript in a background thread separate from the main thread.",
    "answer": "Web Workers run scripts in a background thread, communicating with the main thread via postMessage. They cannot access the DOM but can perform CPU-intensive work without blocking the UI.\nUse them for heavy computations (image processing, data parsing, encryption), large data sorting/filtering, or any task that would cause jank on the main thread. SharedWorkers can be shared across multiple tabs."
  },
  {
    "topic": "html-web",
    "level": 3,
    "question": "How do Service Workers enable offline functionality and what is their lifecycle?",
    "hint": "They act as a network proxy between the browser and server.",
    "answer": "Service Workers are event-driven scripts that act as a programmable network proxy. Their lifecycle: install (cache assets), activate (clean old caches), then intercept fetch events to serve cached responses when offline.\nThey enable offline-first PWAs, background sync, and push notifications. Cache strategies include cache-first (speed), network-first (freshness), and stale-while-revalidate (balance). They run on a separate thread and require HTTPS."
  },

  // === Frontend Performance (4 questions) ===
  {
    "topic": "fe-performance",
    "level": 1,
    "question": "What are Core Web Vitals and why do they matter?",
    "hint": "LCP, INP, CLS — Google's user-centric performance metrics.",
    "answer": "Core Web Vitals are Google's key metrics: LCP (Largest Contentful Paint) measures loading speed, INP (Interaction to Next Paint) measures responsiveness, and CLS (Cumulative Layout Shift) measures visual stability.\nThey matter because they directly impact user experience and are used as a Google search ranking signal. Good thresholds: LCP under 2.5s, INP under 200ms, CLS under 0.1."
  },
  {
    "topic": "fe-performance",
    "level": 2,
    "question": "How does lazy loading work for images and components, and what techniques are used?",
    "hint": "Load resources only when they are needed or about to enter the viewport.",
    "answer": "Image lazy loading uses the native loading=\"lazy\" attribute or Intersection Observer API to defer loading until images approach the viewport. For components, React.lazy() with Suspense dynamically imports modules only when the component is rendered.\nRoute-based code splitting is the most impactful pattern — each route loads its own bundle on navigation. Always eagerly load above-the-fold content and lazy load everything below the fold."
  },
  {
    "topic": "fe-performance",
    "level": 3,
    "question": "Explain code splitting strategies and how dynamic imports work.",
    "hint": "Think about splitting by routes, features, or heavy libraries.",
    "answer": "Code splitting breaks the bundle into smaller chunks loaded on demand. Dynamic import() returns a Promise resolving to the module, and bundlers automatically create separate chunks for each dynamic import point.\nStrategies: route-based splitting (each page is a chunk), component-based splitting (heavy modals/charts loaded on interaction), and vendor splitting (separating third-party libraries). React.lazy() and Next.js automatic page splitting are common implementations."
  },
  {
    "topic": "fe-performance",
    "level": 4,
    "question": "What techniques would you use to optimize a frontend bundle for production?",
    "hint": "Tree-shaking, minification, compression, caching strategies.",
    "answer": "Key techniques: tree-shaking to eliminate dead code (requires ESM imports), minification and terser for JS/CSS, Brotli/gzip compression on the server, and content hashing in filenames for long-term caching with cache-busting on changes.\nAdditionally: analyze the bundle with tools like webpack-bundle-analyzer, replace heavy libraries with lighter alternatives, use dynamic imports for large dependencies, externalize rarely-changing vendors, and set up proper CDN caching with immutable headers."
  },

  // === Frontend Testing (3 questions) ===
  {
    "topic": "fe-testing",
    "level": 1,
    "question": "How does Jest work and what are its key features for frontend testing?",
    "hint": "Test runner, assertions, mocking, snapshots, coverage.",
    "answer": "Jest is a zero-config test framework that includes a test runner, assertion library (expect), built-in mocking (jest.fn, jest.mock), snapshot testing, and code coverage reporting.\nKey features: automatic module mocking, parallel test execution, watch mode for fast feedback, and jsdom environment for testing DOM interactions without a browser. It pairs with React Testing Library for component tests."
  },
  {
    "topic": "fe-testing",
    "level": 2,
    "question": "What is React Testing Library's philosophy and how does it differ from Enzyme?",
    "hint": "Test behavior, not implementation details.",
    "answer": "React Testing Library encourages testing components the way users interact with them — querying by role, label, and text rather than by component internals, class names, or state. Its guiding principle is: the more tests resemble real usage, the more confidence they provide.\nUnlike Enzyme, which exposed component instances, state, and shallow rendering, RTL renders the full DOM and discourages testing implementation details, making tests more resilient to refactors."
  },
  {
    "topic": "fe-testing",
    "level": 3,
    "question": "Describe the testing trophy pattern and how you would structure tests for a frontend application.",
    "hint": "Static analysis, unit, integration, and end-to-end — with most effort on integration.",
    "answer": "The testing trophy (by Kent C. Dodds) prioritizes: static analysis (TypeScript/ESLint) at the base, then unit tests for pure logic, integration tests as the largest layer (components with their children and API mocks), and a few E2E tests for critical user flows.\nIntegration tests give the best confidence-to-cost ratio. Use msw for API mocking, RTL for component integration tests, and Playwright/Cypress for E2E. Avoid excessive unit tests of implementation details."
  },

  // === Frontend Architecture (4 questions) ===
  {
    "topic": "fe-architecture",
    "level": 1,
    "question": "What are the differences between SPAs and MPAs, and when would you choose each?",
    "hint": "Client-side routing vs server-rendered pages. Consider SEO and interactivity.",
    "answer": "SPAs load a single HTML page and dynamically update content via client-side routing (React Router, etc.), providing fast transitions but requiring more JS upfront. MPAs serve separate HTML pages from the server for each route, giving better initial load and SEO.\nChoose SPAs for highly interactive apps (dashboards, editors) and MPAs for content-heavy sites needing strong SEO. Modern meta-frameworks like Next.js blur this line with hybrid approaches (SSR + client-side navigation)."
  },
  {
    "topic": "fe-architecture",
    "level": 2,
    "question": "Compare frontend state management approaches: local state, Context, Redux, and Zustand.",
    "hint": "Consider complexity, boilerplate, and when each is appropriate.",
    "answer": "Local useState/useReducer is best for component-scoped state. Context works for low-frequency global state (theme, auth) but re-renders all consumers on change. Redux provides a predictable single store with middleware and devtools but adds boilerplate.\nZustand offers a simpler API with minimal boilerplate, selective subscriptions to avoid unnecessary re-renders, and no Provider wrapper. Choose based on app complexity: local state first, then Context or Zustand, and Redux only for large apps needing strict architecture."
  },
  {
    "topic": "fe-architecture",
    "level": 3,
    "question": "What are micro-frontends and what problems do they solve?",
    "hint": "Independent teams deploying independent frontend applications composed into one.",
    "answer": "Micro-frontends split a monolithic frontend into independently developed, tested, and deployed applications that compose into a single user experience. Each team owns a vertical slice (feature) with its own tech stack and release cycle.\nImplementation approaches: Module Federation (Webpack 5), iframe composition, Web Components, or server-side composition. They solve scaling issues for large organizations but add complexity in shared state, consistent UX, and bundle size. Best suited for large teams with clear domain boundaries."
  },
  {
    "topic": "fe-architecture",
    "level": 5,
    "question": "How would you set up and manage a frontend monorepo with shared libraries, and what are the trade-offs?",
    "hint": "Think about Nx, Turborepo, shared packages, versioning, and CI impact.",
    "answer": "A monorepo uses tools like Nx or Turborepo to manage multiple apps and shared libraries in one repository. Shared packages (UI components, utilities, configs) are linked locally, ensuring consistent versions and enabling atomic cross-project refactors.\nBenefits: code sharing without publish cycles, unified CI/CD, and atomic changes across packages. Trade-offs: longer CI times (mitigated by affected-only builds and remote caching), complex dependency graphs, and tooling overhead. Use Nx's dependency graph and Turborepo's task caching to keep builds fast."
  },

  // === Frontend Security (1 question) ===
  {
    "topic": "fe-security",
    "level": 2,
    "question": "What is XSS (Cross-Site Scripting) and how do you prevent it in frontend applications?",
    "hint": "Malicious scripts injected into trusted websites. Think about sanitization and CSP.",
    "answer": "XSS occurs when an attacker injects malicious scripts into a web page viewed by other users. Types: Stored (persisted on server), Reflected (in URL parameters), and DOM-based (client-side manipulation).\nPrevention: always escape/sanitize user input before rendering, use frameworks that auto-escape (React's JSX escapes by default), avoid innerHTML/dangerouslySetInnerHTML, implement Content Security Policy (CSP) headers, and use HttpOnly cookies to protect tokens from script access."
  },

  // === Frontend Tooling (1 question) ===
  {
    "topic": "fe-tooling",
    "level": 2,
    "question": "Compare Webpack and Vite: architecture, dev experience, and build performance.",
    "hint": "Vite uses native ES modules in dev; Webpack bundles everything.",
    "answer": "Webpack bundles all modules into a dependency graph at build time, using loaders and plugins for transformation. It is highly configurable but has slower dev startup because it bundles everything before serving.\nVite serves source files as native ES modules in development (instant server start) and uses esbuild for pre-bundling dependencies. For production, Vite uses Rollup for optimized bundles. Vite offers dramatically faster HMR and dev startup, while Webpack has a more mature plugin ecosystem and handles complex legacy setups better."
  },
];
