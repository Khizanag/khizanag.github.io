import { useState } from "react";
import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, TabButton } from "../../shared.tsx";
import { NATIVE } from "./ui.tsx";

const EXAMPLES = [
    {
        id: "button",
        icon: "🔘",
        label: "Icon Button",
        description: "UiIconButton for Compose uses @FigmaConnect class annotation with @FigmaProperty on each field. The Gradle plugin parses Kotlin AST and generates JS templates.",
        code: `@FigmaConnect(
    url = "https://figma.com/design/
        0qdDkhMg8fcNeBGZ4jo4br/SINS?node-id=76-100"
)
@FigmaVariant("Style", "Plain Neutral")
class IconButtonPlainDoc {

    @FigmaProperty(FigmaType.Text, "Label")
    val label = "Action"

    @FigmaProperty(FigmaType.Boolean, "Loading")
    val isLoading = false

    @FigmaProperty(FigmaType.Boolean, "Enabled")
    val isEnabled = true

    @Composable
    fun Example() {
        UiIconButton(
            data = UiIconButtonData(
                style = UiIconButtonStyle.PlainNeutral,
                content = UiButtonContent.Icon(
                    iconRes = R.drawable.ic_search
                ),
                isEnabled = isEnabled,
                isLoading = isLoading,
            ),
            click = EmptyClick,
        )
    }
}`,
        filename: "UiIconButton.figma.kt",
        highlights: [1, 5, 8, 11, 14],
    },
    {
        id: "calendar",
        icon: "📅",
        label: "Calendar Day",
        description: "UiCalendarDay maps day selection states via FigmaType.Enum with Figma.mapping(). Uses repeatable @FigmaVariant for variant restrictions.",
        code: `@FigmaConnect(
    url = "https://figma.com/design/
        0qdDkhMg8fcNeBGZ4jo4br/SINS?node-id=14-1289"
)
class CalendarDayDoc {

    @FigmaProperty(FigmaType.Text, "Day")
    val day = "14"

    @FigmaProperty(FigmaType.Enum, "Status")
    val status = Figma.mapping(
        "NoSelected" to UiSelectedDayStatus.NoSelected,
        "NonSelectable"
            to UiSelectedDayStatus.NonSelectable,
        "FirstLastDay"
            to UiSelectedDayStatus.FirstLastDay,
        "Today" to UiSelectedDayStatus.Today,
    )

    @Composable
    fun Example() {
        UiCalendarDay(
            day = UiCalendarDayData(
                day, status
            ),
            status = status,
            onDaySelected = { /* handle */ },
        )
    }
}`,
        filename: "UiCalendarDay.figma.kt",
        highlights: [7, 10, 11],
    },
    {
        id: "month",
        icon: "🗓",
        label: "Calendar Month",
        description: "UiCalendarMonthItem composes multiple UiCalendarDay instances. The @FigmaChildren annotation maps child layers to nested Code Connect.",
        code: `@FigmaConnect(
    url = "https://figma.com/design/
        0qdDkhMg8fcNeBGZ4jo4br/SINS?node-id=14012-10436"
)
class CalendarMonthDoc {

    @FigmaProperty(FigmaType.Boolean, "Show Header")
    val showHeader = true

    @FigmaChildren("Day 1", "Day 2", "Day 3")
    val children: @Composable () -> Unit = {}

    @Composable
    fun Example() {
        val today = Calendar.getInstance()

        UiCalendarMonthItem(
            month = UiCalendarMonth(
                year = today.get(Calendar.YEAR),
                monthIndex =
                    today.get(Calendar.MONTH),
                nonSelectableDate = listOf(),
            ),
            selectionState =
                UiCalendarRangeSelectionState(
                    initialFrom =
                        UiSelectedDay.emptyDaySelected,
                    initialTo =
                        UiSelectedDay.emptyDaySelected,
                ),
            showHeader = showHeader,
            onDaySelected = { day, month -> },
            onMonthSelected = { month -> },
        )
    }
}`,
        filename: "UiCalendarMonth.figma.kt",
        highlights: [7, 10, 11],
    },
];

export function NativeKotlinSection() {
    const [active, setActive] = useState("button");
    const example = EXAMPLES.find((e) => e.id === active)!;

    return (
        <section id="s-native-kotlin" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={NATIVE}>OPTION A &mdash; KOTLIN</SectionLabel>
                    <SectionHeading sub="Real examples from S.I.N.S. Compose components using @FigmaConnect, @FigmaVariant, and @FigmaProperty annotations with Figma.mapping() helper.">
                        Native Kotlin implementation
                    </SectionHeading>
                </Reveal>

                <Reveal delay={0.1}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
                        {EXAMPLES.map((e) => (
                            <TabButton key={e.id} active={active === e.id} color={NATIVE} icon={e.icon} label={e.label} onClick={() => setActive(e.id)} />
                        ))}
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 24 }}>
                    <Reveal delay={0.15}>
                        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "28px 24px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                                <span style={{ fontSize: 28 }}>{example.icon}</span>
                                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: C.text }}>{example.label}</span>
                            </div>
                            <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7, margin: 0 }}>{example.description}</p>
                        </div>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <CodeBlock filename={example.filename} highlights={example.highlights}>{example.code}</CodeBlock>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
