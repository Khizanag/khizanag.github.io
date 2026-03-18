import { C, Reveal, SectionLabel, SectionHeading } from "../../shared.tsx";
import { P, AppCard, CategoryHeader } from "./ui.tsx";

export function AppsUtilitySection() {
  return (
    <section id="s-utility" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={C.blue}>APPS 09–12</SectionLabel>
        <SectionHeading sub="Utility apps generate the highest trial LTV at $68.90 over 12 months. Users who pay are deeply committed.">
          Premium Utilities
        </SectionHeading>
      </Reveal>

      <CategoryHeader icon="⚡" title="Daily Drivers" subtitle="Tools people open every day — high LTV despite lower initial retention" color={C.blue} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <AppCard
          number={9}
          name="ClipVault"
          icon="📋"
          tagline="Intelligent clipboard manager for iOS. Saves clipboard history, auto-detects types (links, emails, phone numbers, addresses, code snippets), and organizes them into smart categories. Pin frequently used items. Keyboard extension for quick paste."
          category="Utility"
          monetization="$2.99 Once"
          effort="Low"
          revenue="$2-5K/mo"
          features={["Clipboard History", "Smart Categories", "Keyboard Extension", "Pinned Items", "iCloud Sync"]}
          techStack={["SwiftUI", "UIPasteboard", "KeyboardExtension", "CloudKit", "SwiftData"]}
          color={C.blue}
          delay={0}
        />
        <AppCard
          number={10}
          name="ScreenFence"
          icon="🛡️"
          tagline="Advanced screen time manager that goes beyond Apple's built-in tool. Set app-specific daily budgets, block categories during focus hours, track usage trends with weekly AI-generated insights. 'Commitment mode' locks settings for accountability."
          category="Wellness"
          monetization="$4.99/mo Sub"
          effort="Medium"
          revenue="$6-15K/mo"
          features={["App Budgets", "Focus Schedules", "Usage Analytics", "Commitment Lock", "Family Sharing"]}
          techStack={["SwiftUI", "DeviceActivity", "FamilyControls", "ManagedSettings", "Charts"]}
          color={C.red}
          delay={0.1}
        />
        <AppCard
          number={11}
          name="InvoicePilot"
          icon="📄"
          tagline="One-tap invoice generator for freelancers. Create professional invoices with your logo, itemized services, tax calculations, and payment terms. Track paid/unpaid status, send reminders, and export monthly revenue reports. Integrates with Apple Pay."
          category="Business"
          monetization="Free + $6.99/mo"
          effort="Medium"
          revenue="$5-12K/mo"
          features={["Invoice Templates", "Payment Tracking", "Auto-Reminders", "Tax Reports", "Apple Pay"]}
          techStack={["SwiftUI", "PDFKit", "CloudKit", "StoreKit 2", "MessageUI"]}
          color={C.yellow}
          delay={0.2}
        />
        <AppCard
          number={12}
          name="LinkBrain"
          icon="🔗"
          tagline="Smart bookmark manager. Save links from any app via Share Sheet, AI auto-generates title, summary, tags, and category. Full-text search across saved content. Weekly digest of unread saves. 'Read later' queue with estimated reading times."
          category="Productivity"
          monetization="$3.99/mo Sub"
          effort="Low"
          revenue="$3-8K/mo"
          features={["Share Extension", "AI Tagging", "Full-Text Search", "Reading Queue", "Weekly Digest"]}
          techStack={["SwiftUI", "Foundation Models", "ShareExtension", "SwiftData", "CloudKit"]}
          color={C.purple}
          delay={0.3}
        />
      </div>
    </section>
  );
}
