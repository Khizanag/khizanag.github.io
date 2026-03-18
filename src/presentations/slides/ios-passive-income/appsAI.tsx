import { C, Reveal, SectionLabel, SectionHeading } from "../../shared.tsx";
import { P, AppCard, CategoryHeader } from "./ui.tsx";

export function AppsAISection() {
  return (
    <section id="s-ai" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={C.purple}>APPS 05–08</SectionLabel>
        <SectionHeading sub="AI apps grew 47% YoY reaching $516M on iOS. On-device Foundation Models make this zero-cost for inference.">
          AI-Powered Tools
        </SectionHeading>
      </Reveal>

      <CategoryHeader icon="🤖" title="Intelligence Layer" subtitle="Leverage Apple's on-device AI and cloud APIs for smart utilities" color={C.purple} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <AppCard
          number={5}
          name="MeetingMind"
          icon="🎙️"
          tagline="On-device meeting transcription and summarization. Records meetings, generates action items, decision logs, and follow-up tasks using Foundation Models. Exports to Notion/Reminders. Zero cloud cost — all processing happens on-device."
          category="Productivity"
          monetization="$9.99/mo Sub"
          effort="Medium"
          revenue="$10-30K/mo"
          features={["On-Device AI", "Transcription", "Action Items", "Export", "Calendar Sync"]}
          techStack={["SwiftUI", "Speech", "Foundation Models", "EventKit", "ShareSheet"]}
          color={C.purple}
          delay={0}
        />
        <AppCard
          number={6}
          name="ReceiptBrain"
          icon="🧾"
          tagline="Photograph any receipt — AI extracts merchant, items, prices, tax, and categorizes the expense automatically. Monthly spending reports by category. Export to CSV/PDF for tax season. Uses on-device Vision + Foundation Models for zero API costs."
          category="Finance"
          monetization="Free + $4.99/mo"
          effort="Medium"
          revenue="$5-12K/mo"
          features={["OCR Scanning", "Auto-Categorize", "Monthly Reports", "CSV Export", "Tax Categories"]}
          techStack={["SwiftUI", "VisionKit", "Foundation Models", "PDFKit", "CloudKit"]}
          color={C.blue}
          delay={0.1}
        />
        <AppCard
          number={7}
          name="LinguaFlash"
          icon="🗣️"
          tagline="AI-powered vocabulary builder. Users paste any text (article, email, book excerpt) and the app extracts difficult words, generates contextual definitions, example sentences, and spaced-repetition flashcards — all on-device. Supports 12+ languages."
          category="Education"
          monetization="$3.99/mo Sub"
          effort="Low"
          revenue="$4-10K/mo"
          features={["Text Analysis", "Spaced Repetition", "12+ Languages", "Offline Mode", "Widgets"]}
          techStack={["SwiftUI", "Foundation Models", "NaturalLanguage", "SwiftData", "WidgetKit"]}
          color={C.yellow}
          delay={0.2}
        />
        <AppCard
          number={8}
          name="CodeSnap"
          icon="📸"
          tagline="Photograph whiteboard code, handwritten algorithms, or textbook snippets — AI converts them to runnable, syntax-highlighted code. Supports Swift, Python, JS, and 10+ languages. Save to snippets library, share as Gists. On-device processing for privacy."
          category="Developer Tool"
          monetization="$5.99 Once + Tips"
          effort="Medium"
          revenue="$3-8K/mo"
          features={["Photo → Code", "15+ Languages", "Syntax Highlight", "Gist Export", "Snippet Library"]}
          techStack={["SwiftUI", "VisionKit", "Foundation Models", "Highlightr", "GitHub API"]}
          color={P}
          delay={0.3}
        />
      </div>
    </section>
  );
}
