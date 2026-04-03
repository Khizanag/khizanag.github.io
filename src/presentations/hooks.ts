import { useState, useEffect, useRef, type RefObject, type Dispatch, type SetStateAction } from "react";

export function useInView(threshold = 0.15): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export function useScrolled(threshold = 60): boolean {
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
export function useLocalTabNav(
  sectionId: string,
  count: number,
  indexRef: RefObject<number>,
  setIndex: Dispatch<SetStateAction<number>>,
): void {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const section = document.getElementById(sectionId);
      if (!section) return;
      const { top } = section.getBoundingClientRect();
      const isActive = top > -(window.innerHeight * 0.5) && top <= window.innerHeight * 0.5;
      if (!isActive) return;
      const idx = indexRef.current!;
      if (e.key === "ArrowRight" && idx < count - 1) {
        e.stopImmediatePropagation();
        setIndex(idx + 1);
      } else if (e.key === "ArrowLeft" && idx > 0) {
        e.stopImmediatePropagation();
        setIndex(idx - 1);
      }
    };
    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true });
  }, [sectionId, count]);
}

function resolveCurrentIndex(sections: HTMLElement[]): number {
  // Find the section closest to the top of the viewport.
  // Uses a small offset (15% of viewport) so that when a section's top
  // is near the viewport top it's considered "current", not the previous one.
  const ref = window.scrollY + window.innerHeight * 0.15;
  let best = 0;
  for (let i = 0; i < sections.length; i++) {
    const top = sections[i].getBoundingClientRect().top + window.scrollY;
    if (top <= ref) best = i;
  }
  return best;
}

export function useKeyboardNav(sectionIds: string[]): void {
  const indexRef    = useRef(0);
  const navLock     = useRef(false);
  const fallbackRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const syncIndex = () => {
      // Never update index while a keyboard-initiated scroll is in progress
      if (navLock.current) return;
      indexRef.current = resolveCurrentIndex(sections);
    };

    const onScrollEnd = () => {
      if (!navLock.current) return;
      if (fallbackRef.current) clearTimeout(fallbackRef.current);
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      if (navLock.current) return;

      const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

      // Re-resolve before computing next to avoid stale index
      indexRef.current = resolveCurrentIndex(sections);

      const next = e.key === "ArrowRight"
        ? Math.min(indexRef.current + 1, sections.length - 1)
        : Math.max(indexRef.current - 1, 0);

      if (next === indexRef.current) return;

      indexRef.current = next;
      navLock.current  = true;

      // Fallback unlock in case scrollend doesn't fire (Safari, rapid keys)
      if (fallbackRef.current) clearTimeout(fallbackRef.current);
      fallbackRef.current = setTimeout(() => {
        navLock.current = false;
        indexRef.current = resolveCurrentIndex(sections);
      }, 1200);

      sections[next]?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sectionIds]);
}
