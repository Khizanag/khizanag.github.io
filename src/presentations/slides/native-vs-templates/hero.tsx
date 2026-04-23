import { C, PresentationHero } from "../../shared.tsx";
import { P, NATIVE, TEMPLATE } from "./ui.tsx";

export function HeroSection() {
    return (
        <PresentationHero
            accentColor={P}
            titleMaxWidth={900}
            badge="CODE CONNECT STRATEGY &middot; APR 2026"
            title="Native vs Templates"
            gradientLine="Which Path Forward?"
            subtitle={<>Should our iOS &amp; Android teams write Code Connect in <strong style={{ color: NATIVE }}>Swift &amp; Kotlin</strong> or use <strong style={{ color: TEMPLATE }}>TypeScript templates</strong>? A deep analysis of both approaches for the S.I.N.S. design system.</>}
            stats={[
                { value: "2",   label: "Approaches Compared", color: P },
                { value: "80",  label: "Existing Mappings",   color: NATIVE },
                { value: "207", label: "Open GitHub Issues",  color: C.red },
                { value: "1",   label: "Recommendation",      color: P },
            ]}
        />
    );
}
