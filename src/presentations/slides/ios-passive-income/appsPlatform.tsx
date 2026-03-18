import { C, Reveal, SectionLabel, SectionHeading } from "../../shared.tsx";
import { P, AppCard, CategoryHeader } from "./ui.tsx";

export function AppsPlatformSection() {
  return (
    <section id="s-platform" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={C.red}>APPS 17–20</SectionLabel>
        <SectionHeading sub="Leverage underexploited Apple platform features: Widgets, Live Activities, Watch complications, and system integrations.">
          Platform-Native
        </SectionHeading>
      </Reveal>

      <CategoryHeader icon="🍎" title="Apple Ecosystem Deep" subtitle="Apps that exploit platform features most developers ignore" color={C.red} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <AppCard
          number={17}
          name="WidgetCraft"
          icon="🎨"
          tagline="Custom widget designer — the Canva of iOS widgets. Users design their own Home Screen widgets with photos, text, countdown timers, quotes, progress bars, and live data. Template marketplace where creators sell designs. Interactive widgets with buttons and toggles."
          category="Customization"
          monetization="Free + $3.99/mo"
          effort="Medium"
          revenue="$10-25K/mo"
          features={["Widget Builder", "Template Store", "Interactive Widgets", "Live Data", "Icon Packs"]}
          techStack={["SwiftUI", "WidgetKit", "AppIntents", "CloudKit", "StoreKit 2"]}
          color={C.red}
          delay={0}
        />
        <AppCard
          number={18}
          name="CommutePulse"
          icon="🚇"
          tagline="Real-time commute dashboard as a Lock Screen Live Activity and Dynamic Island widget. Shows next bus/train arrival, walking time to stop, delays, and alternative routes. Set multiple commute profiles (work, gym, school). Glanceable — never open the app."
          category="Navigation"
          monetization="$1.99/mo Sub"
          effort="Medium"
          revenue="$4-10K/mo"
          features={["Live Activities", "Dynamic Island", "Transit API", "Multi-Routes", "Delay Alerts"]}
          techStack={["SwiftUI", "ActivityKit", "MapKit", "CoreLocation", "WidgetKit"]}
          color={C.blue}
          delay={0.1}
        />
        <AppCard
          number={19}
          name="GymLog Watch"
          icon="🏋️"
          tagline="Apple Watch-first workout logger. Log sets, reps, and weight directly from your wrist with the Digital Crown. Auto-detects rest periods, calculates volume and progressive overload, syncs to HealthKit. Complications show today's workout plan. No phone needed."
          category="Fitness"
          monetization="$5.99 Once + Pro"
          effort="Medium"
          revenue="$5-12K/mo"
          features={["Watch-First UI", "Digital Crown", "Auto Rest Timer", "Progressive Overload", "HealthKit Sync"]}
          techStack={["SwiftUI", "WatchKit", "HealthKit", "SwiftData", "Charts"]}
          color={C.accent}
          delay={0.2}
        />
        <AppCard
          number={20}
          name="ShortcutHub"
          icon="⚙️"
          tagline="Pre-built Shortcuts library with one-tap install. Categories: productivity, social media, health, smart home, developer tools. Each shortcut has a demo video, rating, and usage guide. Users can submit and monetize their own shortcuts. The 'App Store for Shortcuts'."
          category="Utility"
          monetization="Free + $2.99/mo"
          effort="Low"
          revenue="$3-8K/mo"
          features={["Shortcut Library", "One-Tap Install", "Creator Market", "Demo Videos", "Categories"]}
          techStack={["SwiftUI", "ShortcutsLink", "CloudKit", "AVKit", "StoreKit 2"]}
          color={C.purple}
          delay={0.3}
        />
      </div>
    </section>
  );
}
