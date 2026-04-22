import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, PlainEnglishBox } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function ExampleSection() {
    return (
        <section id="s-example" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1150, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.blue}>END-TO-END EXAMPLE</SectionLabel>
                    <SectionHeading sub="A Dish Details screen from NewArch-Dishes. Top: what the developer types. Bottom: what the pipeline writes. Nothing here was hand-authored.">
                        One invocation → ten committed files
                    </SectionHeading>
                </Reveal>

                <div style={{ marginTop: 28 }}>
                    <Reveal delay={0}>
                        <PlainEnglishBox color={C.blue}>
                            The developer pastes a URL and a screen name. ~8 minutes later they review a session log, fix two TODOs in the ViewModel (fetch + error handling), and push. That&apos;s a completed Clean-Arch feature screen.
                        </PlainEnglishBox>
                    </Reveal>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 24 }}>
                    <Reveal delay={0.1}>
                        <CodeBlock filename="DishDetailsView.swift · 118 lines">{`// Figma: .../Dishes?node-id=5294-65016
import SpaceCore_UI_V2
import SwiftUI

struct DishDetailsView: View {
    @ObservedObject var viewModel: AnyDishDetailsViewModel

    var body: some View {
        Screen(...)
            .navigationBarTrailing {
                IconButton.Parameters(
                    style: .plain,
                    icon: DesignSystem.Icon.close
                )
            }
    }

    @ViewBuilder
    private var content: some View {
        switch viewModel.state.loadState {
        case .loading: ProgressView()
        case .loaded:  loadedBody
        case .error:   ErrorView(retry: ...)
        }
    }
}`}</CodeBlock>
                    </Reveal>

                    <Reveal delay={0.18}>
                        <CodeBlock filename="DishDetailsViewModel.swift · 94 lines">{`protocol DishDetailsViewModel: ObservableObject {
    var state: DishDetailsState { get }
    func handle(_ intent: DishDetailsIntent)
}

@MainActor
final class DefaultDishDetailsViewModel: DishDetailsViewModel {
    @Published private(set) var state = DishDetailsState()
    private let router: DishDetailsRouter
    private let repository: DishDetailsRepository

    func handle(_ intent: DishDetailsIntent) {
        switch intent {
        case .didAppear:
            // TODO: repository.fetch(...)
        case .didTapClose:
            router.dismiss()
        }
    }
}`}</CodeBlock>
                    </Reveal>

                    <Reveal delay={0.26}>
                        <CodeBlock filename="Destination.swift · patched">{`enum Destination: Hashable {
    case dishList
    case dishDetails(DishDetailsParameters)     // ← NEW

    @ViewBuilder
    func view() -> some View {
        switch self {
        case .dishList:                dishListView()
        case .dishDetails(let params): dishDetailsView(params)   // ← NEW
        }
    }
}

// MARK: - DishDetails                           // ← MARK anchor
private extension Destination {
    func dishDetailsView(_ params: DishDetailsParameters) -> some View {
        Container.NewArch_Dishes.dishDetailsViewFactory.make(params)
    }
}`}</CodeBlock>
                    </Reveal>

                    <Reveal delay={0.34}>
                        <CodeBlock filename="Localizable.strings · patched">{`// en.lproj
"DishDetails.title"    = "Dish details";
"DishDetails.cta.add"  = "Add to cart";

// ru.lproj — sibling placeholders
"DishDetails.title"    = "Dish details";   // TODO: localize
"DishDetails.cta.add"  = "Add to cart";    // TODO: localize

// uz.lproj
"DishDetails.title"    = "Dish details";   // TODO: localize
"DishDetails.cta.add"  = "Add to cart";    // TODO: localize`}</CodeBlock>
                    </Reveal>
                </div>

                <Reveal delay={0.46}>
                    <div style={{ marginTop: 20, textAlign: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.muted }}>
                        + <span style={{ color: P }}>Router</span>, <span style={{ color: P }}>Factory</span>, <span style={{ color: P }}>Injection</span>, <span style={{ color: P }}>root Injection registration</span>, <span style={{ color: P }}>session log</span> — all written in the same run.
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
