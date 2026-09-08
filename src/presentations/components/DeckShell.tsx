import { type ComponentProps, type CSSProperties, type ReactNode } from "react";

import { useKeyboardNav, useScrolled } from "../hooks.ts";
import { C } from "../tokens.ts";
import { AmbientBlobs, AnimatedGrid } from "./layout.tsx";
import { PresentationFooter } from "./PresentationFooter.tsx";
import { PresentationNav } from "./PresentationNav.tsx";
import { ThankYouSection } from "./ThankYouSection.tsx";

const PRESENTER = "Giga Khizanishvili";
const THANK_YOU_ID = "s-thankyou";

interface DeckFooterLogoProps {
  color: string;
  colorDim: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function DeckFooterLogo({ color, colorDim, style, children }: DeckFooterLogoProps) {
  return (
    <div style={{
      width: 22, height: 22, borderRadius: 6, background: colorDim, border: `1px solid ${color}30`,
      display: "flex", alignItems: "center", justifyContent: "center",
      ...style,
    }}>
      {children}
    </div>
  );
}

interface DeckShellProps {
  sectionIds: string[];
  color: string;
  colorDim: string;
  navLogo: ReactNode;
  title: string;
  navLinks: ComponentProps<typeof PresentationNav>["links"];
  hero: ReactNode;
  children: ReactNode;
  thankYouLabel: string;
  footerLogo: ReactNode;
  footerName: string;
  footerLinks: ComponentProps<typeof PresentationFooter>["links"];
  footerDate: string;
}

export function DeckShell({
  sectionIds,
  color,
  colorDim,
  navLogo,
  title,
  navLinks,
  hero,
  children,
  thankYouLabel,
  footerLogo,
  footerName,
  footerLinks,
  footerDate,
}: DeckShellProps) {
  const scrolled = useScrolled(60);
  useKeyboardNav(sectionIds);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'DM Sans', sans-serif" }}>

      <AnimatedGrid />
      <AmbientBlobs />

      <PresentationNav
        scrolled={scrolled}
        logo={navLogo}
        title={title}
        links={navLinks}
        badge={PRESENTER}
        color={color}
        colorDim={colorDim}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {hero}

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.border}, transparent)` }} />
        </div>

        {children}

        <ThankYouSection id={THANK_YOU_ID} label={thankYouLabel} color={color} colorDim={colorDim} />

        <PresentationFooter
          logo={footerLogo}
          name={footerName}
          links={footerLinks}
          date={footerDate}
        />
      </div>
    </div>
  );
}
