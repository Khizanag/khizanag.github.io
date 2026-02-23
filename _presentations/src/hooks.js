import { useState, useEffect, useRef } from "react";

export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, [threshold]);
  return scrolled;
}

// Adds left/right arrow-key cycling for interactive tab components.
// Registers in the capture phase so it runs before useKeyboardNav.
// At the first/last tab boundary the event is not consumed, letting
// useKeyboardNav handle section navigation as normal.
//
// Usage:
//   const [active, setActive] = useState(0);
//   const activeRef = useRef(active);
//   activeRef.current = active;
//   useLocalTabNav("s-community", FILES.length, activeRef, setActive);
export function useLocalTabNav(sectionId, count, indexRef, setIndex) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const section = document.getElementById(sectionId);
      if (!section) return;
      const { top } = section.getBoundingClientRect();
      // Section is "active" when its top is within ±50% of viewport height
      // (covers it being fully in view or slightly scrolled behind the nav).
      const isActive = top > -(window.innerHeight * 0.5) && top <= window.innerHeight * 0.5;
      if (!isActive) return;
      const idx = indexRef.current;
      if (e.key === "ArrowRight" && idx < count - 1) {
        e.stopImmediatePropagation(); // consume — don't navigate to next section
        setIndex(idx + 1);
      } else if (e.key === "ArrowLeft" && idx > 0) {
        e.stopImmediatePropagation();
        setIndex(idx - 1);
      }
      // At boundary: don't consume — useKeyboardNav handles section navigation.
    };
    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true });
  }, [sectionId, count]); // indexRef and setIndex are stable refs — no re-register needed
}

// Returns the index of the section currently "at" the top of the viewport.
// Uses absolute offsets so it works regardless of scroll position or section height.
function resolveCurrentIndex(sections) {
  // The reference point is 40% down the viewport — a section is "current" when
  // its top has scrolled past this line (i.e. we're inside it).
  const ref = window.scrollY + window.innerHeight * 0.4;
  let best = 0;
  for (let i = 0; i < sections.length; i++) {
    const top = sections[i].getBoundingClientRect().top + window.scrollY;
    if (top <= ref) best = i;
  }
  return best;
}

export function useKeyboardNav(sectionIds) {
  const indexRef    = useRef(0);   // last known / intended section index
  const navLock     = useRef(false); // true while a programmatic scroll is in flight
  const fallbackRef = useRef(null);  // timeout id for the scrollend fallback

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    // Re-sync indexRef from actual scroll position.
    // Only runs when no programmatic scroll is in flight.
    const syncIndex = () => {
      if (!navLock.current) {
        indexRef.current = resolveCurrentIndex(sections);
      }
    };

    // scrollend fires when smooth scroll fully completes (Chrome 109+, FF 109+, Safari 17.4+).
    // We use it to clear the lock and sync — this is the precise, event-driven signal we need.
    const onScrollEnd = () => {
      if (!navLock.current) return;
      clearTimeout(fallbackRef.current);
      navLock.current = false;
      indexRef.current = resolveCurrentIndex(sections);
    };

    window.addEventListener("scroll",    syncIndex,    { passive: true });
    window.addEventListener("scrollend", onScrollEnd,  { passive: true });
    return () => {
      window.removeEventListener("scroll",    syncIndex);
      window.removeEventListener("scrollend", onScrollEnd);
    };
  }, [sectionIds]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;

      // Block key presses while a scroll is still animating.
      // This prevents stacking navigations that corrupt indexRef.
      if (navLock.current) return;

      const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
      const next = e.key === "ArrowRight"
        ? Math.min(indexRef.current + 1, sections.length - 1)
        : Math.max(indexRef.current - 1, 0);

      if (next === indexRef.current) return; // already at boundary

      // Commit the target index immediately — before scrolling starts —
      // so scroll events mid-animation can never overwrite it.
      indexRef.current = next;
      navLock.current  = true;

      // Fallback: forcefully clear the lock after 2 s in case scrollend
      // doesn't fire (e.g. reduced-motion OS setting skips animation entirely).
      fallbackRef.current = setTimeout(() => {
        navLock.current = false;
        indexRef.current = resolveCurrentIndex(sections);
      }, 2000);

      sections[next]?.scrollIntoView({ behavior: "smooth" });
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sectionIds]);
}
