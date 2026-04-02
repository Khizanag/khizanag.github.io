import { C, Reveal, SectionLabel, SectionHeading, CodeBlock, CalloutBox, PlainEnglishBox, InfoCard, CheckItem } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function RealExampleSection() {
    return (
        <section id="s-example" style={{ padding: "96px 48px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={C.accent}>CASE STUDY</SectionLabel>
                    <SectionHeading sub="The LoansMain screen was built from a Figma design using Code Connect + AI. Here's what happened step by step.">
                        Real example: LoansMain screen
                    </SectionHeading>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
                    <Reveal delay={0}>
                        <InfoCard icon="🎨" title="Figma returned" color={P} tag="CODE CONNECT">
                            <CheckItem active>Headline (Compose only — no SwiftUI snippet)</CheckItem>
                            <CheckItem active>SectionTitle &times; 2 (SwiftUI)</CheckItem>
                            <CheckItem active>BannerCardSmall &times; 2 (SwiftUI)</CheckItem>
                            <CheckItem active>ListViewItem &times; 4 (SwiftUI)</CheckItem>
                            <CheckItem active>Footer with "Continue" button (SwiftUI)</CheckItem>
                            <CheckItem active>Header → EmptyView (SwiftUI)</CheckItem>
                        </InfoCard>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <InfoCard icon="🔍" title="Issues found" color={C.red} tag="VERIFICATION">
                            <CheckItem active={false}>Footer "Continue" — NOT visible in screenshot</CheckItem>
                            <CheckItem active={false}>Headline only in Compose — needed manual lookup</CheckItem>
                            <CheckItem active={false}>Used ProductHeadline instead of Headline</CheckItem>
                            <CheckItem active={false}>.spacing.s1200 doesn't exist (max is s1000)</CheckItem>
                            <CheckItem active={false}>.icons.addCircle doesn't exist (use .plus)</CheckItem>
                            <CheckItem active={false}>Toolbox passed as enum, not wrapped in view</CheckItem>
                        </InfoCard>
                    </Reveal>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
                    <Reveal delay={0.15}>
                        <CodeBlock filename="LoansMainView.swift — final result" highlights={[5, 6, 7, 8, 9, 11, 12, 13, 14]}>
{`struct LoansMainView<ViewModel: LoansMainViewModel>: View {
    @StateObject private var viewModel: ViewModel

    var body: some View {
        scrollContent
            .navigationBarTrailing(
                parameters: .close(
                    action: { viewModel.handleIntent(.onCloseTap) }
                )
            )
    }
}

// MARK: - Subviews
private extension LoansMainView {
    var scrollContent: some View {
        ScrollView {
            VStack(spacing: .assets.spacing.none) {
                headline
                loanProductsSection
                    .padding(.bottom, .assets.spacing.s600)
                faqSection
            }
        }
    }

    var headline: some View {
        Headline(
            parameters: .init(
                title: "Loans",
                subtitle: "Application and management"
            )
        )
    }
}`}
                        </CodeBlock>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <CodeBlock filename="LoansMainViewModel.swift — state & intents" highlights={[2, 3, 4, 8, 9, 10, 15, 16, 22, 23]}>
{`// MARK: - State
struct LoansMainViewModelState: AutoEquatable, AutoFixturable {
    let loanProducts: [LoanProduct] = LoanProduct.allProducts
    let faqItems: [FAQItem] = FAQItem.allItems
}

// MARK: - Intents
enum LoansMainViewIntent: AutoEquatable {
    case onCloseTap
    case onLoanProductTap(LoanProduct)
    case onFAQItemTap(FAQItem)
}

// MARK: - Intent
extension DefaultLoansMainViewModel {
    func handleIntent(_ intent: Intent) {
        switch intent {
        case .onCloseTap:
            router.close()
        case .onLoanProductTap(let product):
            router.navigateToLoanProduct(product)
        case .onFAQItemTap(let item):
            router.navigateToFAQDetail(item)
        }
    }
}`}
                        </CodeBlock>
                    </Reveal>
                </div>

                <Reveal delay={0.25}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 32 }}>
                        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "22px 20px", textAlign: "center" }}>
                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: P }}>5</div>
                            <div style={{ color: C.muted, fontSize: 13, marginTop: 4 }}>files generated</div>
                        </div>
                        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "22px 20px", textAlign: "center" }}>
                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: C.blue }}>7</div>
                            <div style={{ color: C.muted, fontSize: 13, marginTop: 4 }}>files modified (DI, Destination, etc.)</div>
                        </div>
                        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "22px 20px", textAlign: "center" }}>
                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: C.red }}>6</div>
                            <div style={{ color: C.muted, fontSize: 13, marginTop: 4 }}>Code Connect issues caught</div>
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.35}>
                    <PlainEnglishBox color={C.accent}>
                        Every issue was caught by cross-checking against the screenshot and verifying APIs in the actual Swift source.
                        The Code Connect snippets provided the starting structure. Human/AI verification made it production-ready.
                    </PlainEnglishBox>
                </Reveal>
            </div>
        </section>
    );
}
