import { C, Reveal, SectionLabel, SectionHeading } from "../../shared.tsx";
import { P, AppCard, CategoryHeader } from "./ui.tsx";

export function AppsHealthSection() {
  return (
    <section id="s-health" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={P}>APPS 01–04</SectionLabel>
        <SectionHeading sub="Highest ARPU category on the App Store. Health & Fitness apps convert trials at 18-40% and generate $2-5 per download.">
          Health & Fitness
        </SectionHeading>
      </Reveal>

      <CategoryHeader icon="💪" title="Body & Mind" subtitle="Apps that integrate deeply with HealthKit and Apple Watch" color={P} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <AppCard
          number={1}
          name="SleepLab"
          icon="🌙"
          tagline="AI-powered sleep quality analyzer. Reads Apple Watch sleep data, detects patterns (caffeine timing, screen time, exercise correlation), and generates personalized improvement plans. Weekly insight reports with trend graphs."
          category="Health"
          monetization="Freemium + Sub"
          effort="Medium"
          revenue="$5-15K/mo"
          features={["HealthKit Sleep", "On-Device AI", "Apple Watch", "Widgets", "Weekly Reports"]}
          techStack={["SwiftUI", "HealthKit", "Foundation Models", "Charts", "WidgetKit"]}
          color={P}
          delay={0}
        />
        <AppCard
          number={2}
          name="PostureGuard"
          icon="🧍"
          tagline="Uses AirPods motion sensors to detect slouching and send haptic nudges. Tracks posture score over time, shows improvement trends, and integrates with Apple Health. Inspired by Posture Pal's success but with AI coaching layer."
          category="Health"
          monetization="$4.99 + Pro Sub"
          effort="Medium"
          revenue="$3-8K/mo"
          features={["AirPods Motion", "Haptic Alerts", "Posture Score", "Live Activities", "Health Sync"]}
          techStack={["SwiftUI", "CoreMotion", "HealthKit", "ActivityKit", "CoreML"]}
          color={C.blue}
          delay={0.1}
        />
        <AppCard
          number={3}
          name="HydroMind"
          icon="💧"
          tagline="Smart hydration tracker that calculates optimal intake based on weight, activity, weather, and caffeine consumption. Apple Watch complications show real-time progress. Interactive widgets for quick logging. Streak system for retention."
          category="Health"
          monetization="Free + $2.99/mo"
          effort="Low"
          revenue="$2-6K/mo"
          features={["Weather API", "Watch Comps", "Widgets", "Streaks", "Shortcuts"]}
          techStack={["SwiftUI", "HealthKit", "WeatherKit", "WatchKit", "WidgetKit"]}
          color={C.purple}
          delay={0.2}
        />
        <AppCard
          number={4}
          name="DermaLens"
          icon="🔬"
          tagline="On-device skin condition tracker. Users photograph moles and skin spots over time, AI detects changes in size/color/shape using Core ML vision models. Generates time-lapse comparisons and flags concerning changes for doctor visits. Not a diagnosis tool — a monitoring companion."
          category="Health"
          monetization="$6.99/mo Sub"
          effort="High"
          revenue="$8-20K/mo"
          features={["Core ML Vision", "Photo Timeline", "Change Detection", "PDF Reports", "Reminders"]}
          techStack={["SwiftUI", "CoreML", "Vision", "PDFKit", "CloudKit"]}
          color={C.yellow}
          delay={0.3}
        />
      </div>
    </section>
  );
}
