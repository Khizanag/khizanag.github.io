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
  // Pick the section with the largest visible intersection with the
  // viewport. If two overlap the viewport by the same amount (common at
  // section boundaries), prefer the one whose top is closer to the
  // viewport top — that's the one the user is "reading".
  //
  // Why not a scrollY + Nvh threshold? Because section heights vary
  // (hero ~100vh, short callouts ~40vh, tall ones ~160vh). Any fixed
  // threshold picks the wrong section at boundaries for one of those
  // cases, which manifests as an arrow-key press that either skips a
  // slide or appears to do nothing.
  const vh = window.innerHeight;
  let bestIdx = 0;
  let bestVisible = -1;
  let bestTopDist = Infinity;

  for (let i = 0; i < sections.length; i++) {
    const rect    = sections[i].getBoundingClientRect();
    const visible = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
    const topDist = Math.abs(rect.top);

    if (visible > bestVisible + 0.5) {
      bestVisible = visible;
      bestTopDist = topDist;
      bestIdx     = i;
    } else if (Math.abs(visible - bestVisible) <= 0.5 && topDist < bestTopDist) {
      bestTopDist = topDist;
      bestIdx     = i;
    }
  }

  return bestIdx;
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
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;

      const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

      // Re-resolve before computing next to avoid stale index
      indexRef.current = resolveCurrentIndex(sections);

      const next = e.key === "ArrowRight"
        ? Math.min(indexRef.current + 1, sections.length - 1)
        : Math.max(indexRef.current - 1, 0);

      if (next === indexRef.current) return;

      indexRef.current = next;
      navLock.current  = true;

      // Briefly dim the target as it arrives so every slide has a
      // visible transition, even when Reveal animations fired during
      // the scroll (IntersectionObserver threshold 0.15 triggers on
      // partial overlap, so by the time the scroll settles there's
      // nothing left to animate — feels abrupt otherwise).
      const targetSection = sections[next];
      if (targetSection) {
        targetSection.style.transition = "opacity 0.45s ease, transform 0.45s ease";
        targetSection.style.opacity    = "0";
        targetSection.style.transform  = "translateY(14px)";
        requestAnimationFrame(() => {
          setTimeout(() => {
            targetSection.style.opacity   = "1";
            targetSection.style.transform = "translateY(0)";
            setTimeout(() => {
              targetSection.style.transition = "";
              targetSection.style.transform  = "";
              targetSection.style.opacity    = "";
            }, 500);
          }, 120);
        });
      }

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
