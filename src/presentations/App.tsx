import { useState, useEffect } from "react";
import { FONTS, KEYFRAMES } from "./tokens.ts";
import { Home } from "./Home.tsx";
import { SlideView } from "./SlideView.tsx";

function getHashId(): string | null {
  const hash = window.location.hash.slice(1);
  return hash || null;
}

export default function App() {
  const [activeId, setActiveId] = useState<string | null>(getHashId);

  useEffect(() => {
    const onHashChange = () => setActiveId(getHashId());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [activeId]);

  const openSlide = (id: string) => {
    window.location.hash = id;
  };

  const goHome = () => {
    history.pushState(null, "", window.location.pathname);
    setActiveId(null);
  };

  return (
    <>
      <style>{FONTS}{KEYFRAMES}</style>
      {activeId
        ? <SlideView slideId={activeId} onBack={goHome} />
        : <Home onOpen={openSlide} />
      }
    </>
  );
}
