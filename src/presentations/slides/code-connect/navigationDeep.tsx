import { useState, useRef } from "react";
import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, CalloutBox, TabButton, PlainEnglishBox, useLocalTabNav } from "../../shared.tsx";
import { P } from "./ui.tsx";

const TABS = [
    {
        icon: "🧭",
        label: "Navigator",
        code: `// Navigator is a singleton — all routers share one instance
@Inject private var navigator: DefaultNavigator<Destination>

// Stack navigation
navigator.push(.screenName(parameters))  // push
navigator.pop()                          // back one
navigator.popToRoot()                    // back to root

// Modal presentation
navigator.present(.screenName(parameters))  // fullscreen
navigator.dismiss()                         // close modal

// Sheet
navigator.sheet(.screenName(parameters))    // bottom sheet
navigator.dismissSheet()                    // close sheet

// Flow control
navigator.dismissFlow()    // dismiss everything
navigator.toast(params)    // show toast notification`,
        filename: "DefaultNavigator<Destination> — methods",
        highlights: [5, 6, 7, 10, 11, 14, 15, 18, 19],
    },
    {
        icon: "🔙",
        label: "Nav Bar Leading",
        code: `// Back button + title (auto-injects navigator)
.navigationBarLeading(title: "Screen Title")

// Custom back action
.navigationBarLeading(
    title: "Title",
    onBackButtonTap: {
        viewModel.handleIntent(.onBack)
    }
)

// Back button auto-shows when stack has items
// Hidden on root screens (automatic behavior)

// Swipe back gesture: enabled by default
// Disable: NavigationSwipeBackBehavior.disabled`,
        filename: "Leading — .navigationBarLeading()",
        highlights: [2, 5, 6, 7, 8, 9],
    },
    {
        icon: "✖️",
        label: "Nav Bar Trailing",
        code: `// Close button (renders crossMinimal icon)
.navigationBarTrailing(
    parameters: .close(
        action: { viewModel.handleIntent(.onClose) }
    )
)

// Text action button
.navigationBarTrailing(
    parameters: .action(
        title: "Done",
        action: { viewModel.handleIntent(.onDone) }
    )
)

// Custom image button
.navigationBarTrailing(
    parameters: .button(
        image: Image.assets.icons.settings.regular.ic24,
        action: { viewModel.handleIntent(.onSettings) }
    )
)`,
        filename: "Trailing — .navigationBarTrailing()",
        highlights: [2, 3, 4, 9, 10, 11, 18, 19, 20],
    },
    {
        icon: "🏷",
        label: "Router Naming",
        code: `// Function naming follows navigation type:
//   .push()    → navigateToScreenName
//   .present() → presentScreenName
//   .sheet()   → showScreenNameSheet
//   .toast()   → showToastTypeToast

protocol TransferRouter: AutoMockable {
    func navigateToConfirmation(_ params: ConfirmationParams)
    func presentDocumentViewer(_ url: URL)
    func showCurrencyPickerSheet()
    func showSuccessToast()
}

final class DefaultTransferRouter: TransferRouter {
    @Inject private var navigator: DefaultNavigator<Destination>

    func navigateToConfirmation(_ params: ConfirmationParams) {
        navigator.push(.confirmation(params))
    }

    func presentDocumentViewer(_ url: URL) {
        navigator.present(.documentViewer(url))
    }

    func showCurrencyPickerSheet() {
        navigator.sheet(.currencyPicker)
    }

    func showSuccessToast() {
        navigator.toast(.init(type: .success, message: "Done"))
    }
}`,
        filename: "Router naming convention",
        highlights: [2, 3, 4, 5, 8, 9, 10, 11],
    },
    {
        icon: "📍",
        label: "Destination",
        code: `enum Destination: NavigatorDestination {
    case loansMain(LoansMainViewModelParameters)
    case transferDetail(TransferDetailViewModelParameters)
    case success(SuccessViewModelParameters)

    @MainActor @ViewBuilder
    func view() -> some View {
        switch self {
        case .loansMain(let parameters):
            @Inject var factory: any LoansMainViewFactory
            factory.make(parameters: parameters)

        case .transferDetail(let parameters):
            @Inject var factory: any TransferDetailViewFactory
            factory.make(parameters: parameters)

        case .success(let parameters):
            @Inject var factory: any SuccessViewFactory
            factory.make(parameters: parameters)
        }
    }
}`,
        filename: "Destination.swift — screen registry",
        highlights: [2, 3, 4, 9, 10, 11],
    },
];

export function NavigationDeepSection() {
    const [active, setActive] = useState(0);
    const indexRef = useRef(active);
    indexRef.current = active;
    useLocalTabNav("s-nav", TABS.length, indexRef, setActive);

    const tab = TABS[active];

    return (
        <section id="s-nav" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.yellow}>NAVIGATION</SectionLabel>
                    <SectionHeading sub="SpaceCore_Navigation provides the navigator, modifiers, and routing primitives. Never use raw SwiftUI .toolbar or NavigationLink.">
                        SpaceCore_Navigation deep dive
                    </SectionHeading>
                </Reveal>

                <Reveal delay={0.1}>
                    <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
                        {TABS.map((t, i) => (
                            <TabButton key={i} active={active === i} color={C.yellow} icon={t.icon} label={t.label} onClick={() => setActive(i)} />
                        ))}
                    </div>
                </Reveal>

                <Reveal delay={0.15}>
                    <CodeBlock filename={tab.filename} highlights={tab.highlights}>
                        {tab.code}
                    </CodeBlock>
                </Reveal>

                <Reveal delay={0.3}>
                    <div style={{ marginTop: 32 }}>
                        <PlainEnglishBox color={C.yellow}>
                            The navigation flow is always: View → handleIntent → Router → Navigator → Destination → Factory → New View.
                            Views never touch the navigator directly. Routers never contain business logic. One direction, always traceable.
                        </PlainEnglishBox>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
