import { C, Reveal, SectionLabel, SectionHeading } from "../../shared.tsx";
import { P, AppCard, CategoryHeader } from "./ui.tsx";

export function AppsLifestyleSection() {
  return (
    <section id="s-lifestyle" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={C.yellow}>APPS 13–16</SectionLabel>
        <SectionHeading sub="Niche lifestyle apps with strong retention. Daily habit formation drives long-term subscription revenue.">
          Lifestyle & Niche
        </SectionHeading>
      </Reveal>

      <CategoryHeader icon="🌿" title="Daily Habits & Niches" subtitle="Underserved markets where big players don't compete" color={C.yellow} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <AppCard
          number={13}
          name="PlantPulse"
          icon="🪴"
          tagline="Smart plant care companion. Photograph your plant for AI species identification, get personalized watering schedules based on species + local weather, track growth with photo timeline, and receive seasonal care tips. Push notifications for watering day."
          category="Lifestyle"
          monetization="Free + $2.99/mo"
          effort="Low"
          revenue="$3-8K/mo"
          features={["Plant ID (AI)", "Weather Watering", "Photo Timeline", "Care Calendar", "Push Reminders"]}
          techStack={["SwiftUI", "CoreML", "WeatherKit", "CloudKit", "UserNotifications"]}
          color={C.accent}
          delay={0}
        />
        <AppCard
          number={14}
          name="PetTravel"
          icon="🐾"
          tagline="Travel planner for pet owners. Find pet-friendly hotels, restaurants, parks, and vets near any destination. Store vaccination records, vet contacts, and pet profiles. Checklist generator for trips (food, meds, crate, docs). Community-sourced reviews."
          category="Travel"
          monetization="$4.99/mo Sub"
          effort="Medium"
          revenue="$4-10K/mo"
          features={["Pet-Friendly POIs", "Vaccination Records", "Trip Checklists", "Vet Finder", "Community Reviews"]}
          techStack={["SwiftUI", "MapKit", "CloudKit", "SwiftData", "StoreKit 2"]}
          color={C.blue}
          delay={0.1}
        />
        <AppCard
          number={15}
          name="FocusForge"
          icon="🔥"
          tagline="Neurodivergent-friendly task manager. Visual time blocks instead of text lists, body-doubling timer with ambient sounds, task decomposition AI that breaks overwhelming projects into tiny steps, and 'energy level' scheduling (high/medium/low energy tasks)."
          category="Productivity"
          monetization="$5.99/mo Sub"
          effort="Medium"
          revenue="$8-20K/mo"
          features={["Visual Time Blocks", "Body Doubling", "Task Decomposition", "Energy Scheduling", "Live Activities"]}
          techStack={["SwiftUI", "Foundation Models", "ActivityKit", "AVFoundation", "SwiftData"]}
          color={C.purple}
          delay={0.2}
        />
        <AppCard
          number={16}
          name="MealPrep Pro"
          icon="🥗"
          tagline="Weekly meal planning with auto-generated grocery lists. Select dietary preferences, budget, and cooking skill level — AI generates a full week of meals with portions scaled to household size. Nutritional breakdown per meal. Save favorite weeks as templates."
          category="Food"
          monetization="Free + $4.99/mo"
          effort="Medium"
          revenue="$5-15K/mo"
          features={["AI Meal Plans", "Grocery Lists", "Diet Filters", "Nutrition Info", "Portion Scaling"]}
          techStack={["SwiftUI", "Foundation Models", "HealthKit", "CloudKit", "WidgetKit"]}
          color={C.yellow}
          delay={0.3}
        />
      </div>
    </section>
  );
}
