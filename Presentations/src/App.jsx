import { useState, useEffect } from "react";
import { FONTS, KEYFRAMES } from "./tokens.js";
import { Home } from "./Home.jsx";
import { SlideView } from "./SlideView.jsx";

function getHashId() {
  const hash = window.location.hash.slice(1);
  return hash || null;
}

export default function App() {
  const [activeId, setActiveId] = useState(getHashId);

  useEffect(() => {
    const onHashChange = () => setActiveId(getHashId());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [activeId]);

  const openSlide = (id) => {
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
