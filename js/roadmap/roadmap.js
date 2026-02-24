(function () {
    'use strict';

    // ================================================================
    // DOMAINS DATA — Single source of truth for all 18 domains
    // Each domain has a `requires` array of prerequisite domain IDs
    // ================================================================
    var DOMAINS = [
        // ── Tier 1: Foundations ──
        {
            id: 'swift-lang',
            title: 'Swift Language Mastery',
            icon: '\u{1F4A0}',
            tier: 1,
            requires: [],
            desc: 'Deep knowledge of the Swift type system, protocols, value semantics, memory management, and modern language features.',
            topics: [
                { id: 'swift-generics', name: 'Generics & Associated Types', sub: 'Generic constraints, where clauses, associated types in protocols' },
                { id: 'swift-opaque', name: 'Opaque & Existential Types', sub: 'some vs any, type erasure patterns, performance implications' },
                { id: 'swift-pop', name: 'Protocol-Oriented Programming', sub: 'Extensions, conditional conformance, default implementations' },
                { id: 'swift-value-ref', name: 'Value vs Reference Types', sub: 'Structs, classes, actors, copy-on-write semantics' },
                { id: 'swift-arc', name: 'Memory Management (ARC)', sub: 'Retain cycles, weak/unowned refs, capture lists in closures' },
                { id: 'swift-errors', name: 'Error Handling', sub: 'Result type, typed throws (Swift 6), do-catch patterns' },
                { id: 'swift-closures', name: 'Closures & Higher-Order Functions', sub: 'Escaping, non-escaping, autoclosures, map/filter/reduce/compactMap' },
                { id: 'swift-enums', name: 'Enums & Pattern Matching', sub: 'Associated values, raw values, switch exhaustiveness, if-case let' },
                { id: 'swift-propwrap', name: 'Property Wrappers', sub: '@Published, @AppStorage, @State internals, projected values' },
                { id: 'swift-resultbuilder', name: 'Result Builders', sub: '@resultBuilder, DSL construction, ViewBuilder internals' },
                { id: 'swift-keypaths', name: 'Key Paths & Subscripts', sub: 'KeyPath types, dynamic member lookup, custom subscripts' },
                { id: 'swift-macros', name: 'Macros (Swift 5.9+)', sub: 'Freestanding macros, attached macros, macro plugins, SwiftSyntax' },
                { id: 'swift-collections', name: 'Collections & Sequences', sub: 'Array, Set, Dictionary internals, Sequence/Collection protocols, lazy' },
                { id: 'swift-strings', name: 'Strings & Regex Builder', sub: 'Unicode handling, String.Index, RegexBuilder DSL, Regex type' },
                { id: 'swift-access', name: 'Access Control & Modules', sub: 'open, public, package, internal, fileprivate, private scoping' },
            ],
        },
        {
            id: 'concurrency',
            title: 'Swift Concurrency',
            icon: '\u{26A1}',
            tier: 1,
            requires: ['swift-lang'],
            desc: 'Structured concurrency, actors, and the path to data-race safety with Swift 6 strict concurrency.',
            topics: [
                { id: 'conc-async', name: 'async/await', sub: 'Async functions, continuations, bridging from callbacks' },
                { id: 'conc-structured', name: 'Structured Concurrency', sub: 'TaskGroup, async let, task hierarchy and cancellation' },
                { id: 'conc-actors', name: 'Actors & Isolation', sub: '@MainActor, global actors, Sendable protocol' },
                { id: 'conc-swift6', name: 'Swift 6 Strict Concurrency', sub: 'Complete data-race safety, migration strategies' },
                { id: 'conc-async-seq', name: 'AsyncSequence & AsyncStream', sub: 'Async iteration, custom async sequences, for-await-in' },
                { id: 'conc-cancel', name: 'Task Cancellation & Priorities', sub: 'Cooperative cancellation, task priority propagation' },
                { id: 'conc-continuations', name: 'Continuations', sub: 'withCheckedContinuation, withUnsafeContinuation, bridging patterns' },
                { id: 'conc-sendable', name: 'Sendable & Transferring', sub: '@Sendable closures, Sendable conformance strategies, transferring' },
                { id: 'conc-executors', name: 'Custom Executors', sub: 'SerialExecutor protocol, executor switching, custom scheduling' },
                { id: 'conc-tasklocal', name: 'Task-Local Values', sub: '@TaskLocal storage, propagation through task hierarchy' },
                { id: 'conc-clock', name: 'Clock, Instant & Duration', sub: 'ContinuousClock, SuspendingClock, Task.sleep(for:)' },
                { id: 'conc-migrate', name: 'Migrating from GCD/Combine', sub: 'Replacing DispatchQueue, adapting Combine publishers' },
            ],
        },
        {
            id: 'ui-frameworks',
            title: 'UI Frameworks',
            icon: '\u{1F3A8}',
            tier: 1,
            requires: ['swift-lang'],
            desc: 'SwiftUI and UIKit mastery, including state management, navigation, layouts, and framework interop.',
            topics: [
                { id: 'ui-swiftui-state', name: 'SwiftUI State Management', sub: '@State, @Binding, @Observable, @Environment, @Bindable' },
                { id: 'ui-swiftui-nav', name: 'SwiftUI Navigation', sub: 'NavigationStack, NavigationSplitView, deep linking, programmatic' },
                { id: 'ui-swiftui-anim', name: 'SwiftUI Animations & Transitions', sub: 'withAnimation, matchedGeometryEffect, phaseAnimator, keyframeAnimator' },
                { id: 'ui-swiftui-layout', name: 'SwiftUI Custom Layout Protocol', sub: 'Layout protocol, sizeThatFits, placeSubviews, ViewThatFits' },
                { id: 'ui-swiftui-mod', name: 'ViewModifier & PreferenceKey', sub: 'Custom modifiers, preference keys, environment keys' },
                { id: 'ui-swiftui-lists', name: 'SwiftUI Lists, Grids & LazyStacks', sub: 'LazyVStack/HStack, LazyVGrid, ForEach, id stability' },
                { id: 'ui-swiftui-forms', name: 'SwiftUI Forms, Pickers & Controls', sub: 'Form, Toggle, Slider, DatePicker, .searchable, .confirmationDialog' },
                { id: 'ui-swiftui-canvas', name: 'SwiftUI Canvas & Shape Drawing', sub: 'Canvas, Path, Shape protocol, GeometryReader, custom drawings' },
                { id: 'ui-swiftui-gestures', name: 'SwiftUI Gestures & Interactions', sub: 'TapGesture, DragGesture, simultaneousGesture, gesture composition' },
                { id: 'ui-swiftui-charts', name: 'SwiftUI Charts & MapKit', sub: 'Charts framework, BarMark, LineMark, Map with annotations' },
                { id: 'ui-uikit', name: 'UIKit Auto Layout', sub: 'NSLayoutConstraint, UIStackView, layout priorities, intrinsic size' },
                { id: 'ui-uikit-modern', name: 'UIKit Modern Collections', sub: 'Diffable data sources, compositional layout, cell registration' },
                { id: 'ui-lifecycle', name: 'View Controller Lifecycle', sub: 'viewDidLoad → viewIsAppearing → viewDidAppear, containment' },
                { id: 'ui-responder', name: 'UIKit Responder Chain & Events', sub: 'UIResponder, first responder, hit testing, gesture recognizers' },
                { id: 'ui-interop', name: 'SwiftUI \u2194 UIKit Interop', sub: 'UIViewRepresentable, UIHostingController, mixed navigation' },
                { id: 'ui-traits', name: 'Dark Mode, Traits & Size Classes', sub: 'UITraitCollection, traitCollectionDidChange, adaptive layouts' },
            ],
        },
        {
            id: 'architecture',
            title: 'Architecture & Patterns',
            icon: '\u{1F3D7}\u{FE0F}',
            tier: 1,
            requires: ['swift-lang'],
            desc: 'App architecture patterns, dependency injection, and design patterns for scalable iOS codebases.',
            topics: [
                { id: 'arch-mvvm', name: 'MVVM & MV Patterns', sub: 'ViewModel design, data binding, view-model ownership' },
                { id: 'arch-tca', name: 'TCA & Composable Architecture', sub: 'Reducers, effects, state management at scale' },
                { id: 'arch-clean', name: 'Clean Architecture & VIPER', sub: 'Use cases, interactors, entity boundaries, routers' },
                { id: 'arch-di', name: 'Dependency Injection', sub: 'Swinject, Factory, Environment injection patterns' },
                { id: 'arch-coord', name: 'Coordinator / Router Patterns', sub: 'Navigation abstraction, deep link handling, flow controllers' },
                { id: 'arch-patterns', name: 'Design Patterns (GoF)', sub: 'Observer, Strategy, Factory, Builder, Composite, Decorator' },
                { id: 'arch-repo', name: 'Repository & Service Layer', sub: 'Repository pattern, service abstraction, data source separation' },
                { id: 'arch-udf', name: 'Unidirectional Data Flow', sub: 'Redux-style patterns, single state store, action dispatching' },
                { id: 'arch-state', name: 'State Machines & Finite Automata', sub: 'Enum-based states, transition validation, state charts' },
                { id: 'arch-events', name: 'Event-Driven Architecture', sub: 'Event bus, NotificationCenter patterns, Combine publishers' },
                { id: 'arch-modcomm', name: 'Module Communication', sub: 'Protocols, delegates, closures, Combine, notification patterns' },
            ],
        },
        {
            id: 'data-networking',
            title: 'Data & Networking',
            icon: '\u{1F310}',
            tier: 1,
            requires: ['swift-lang'],
            desc: 'Networking layers, data persistence, and local storage strategies for iOS apps.',
            topics: [
                { id: 'data-urlsession', name: 'URLSession & Networking Layers', sub: 'async/await networking, interceptors, retry logic, adapters' },
                { id: 'data-rest', name: 'REST API Integration', sub: 'HTTP methods, status codes, pagination, authentication headers' },
                { id: 'data-graphql', name: 'GraphQL & WebSockets', sub: 'Apollo iOS, queries/mutations, subscriptions, real-time data' },
                { id: 'data-codable', name: 'Codable & JSON Handling', sub: 'Custom coding keys, nested decoding, date strategies, enums' },
                { id: 'data-coredata', name: 'Core Data', sub: 'Managed object contexts, migrations, CloudKit sync, NSFetchRequest' },
                { id: 'data-swiftdata', name: 'SwiftData', sub: '@Model macro, #Query, #Predicate, migration strategies' },
                { id: 'data-storage', name: 'Local Storage', sub: 'Keychain, UserDefaults, FileManager, App Groups' },
                { id: 'data-background', name: 'Background Transfers & Downloads', sub: 'URLSession background config, BGTaskScheduler, download tasks' },
                { id: 'data-caching', name: 'HTTP Caching & ETags', sub: 'URLCache, cache policies, ETag/If-None-Match, offline support' },
                { id: 'data-protobuf', name: 'Protobuf & gRPC', sub: 'Protocol Buffers, gRPC-Swift, binary serialization, streaming' },
                { id: 'data-network', name: 'Network Framework & Reachability', sub: 'NWPathMonitor, NWConnection, connectivity checks, Wi-Fi/cellular' },
                { id: 'data-sqlite', name: 'SQLite / GRDB', sub: 'Direct SQLite, GRDB.swift, WAL mode, FTS, raw queries' },
            ],
        },

        // ── Tier 2: Professional ──
        {
            id: 'testing',
            title: 'Testing & Quality',
            icon: '\u{1F9EA}',
            tier: 2,
            requires: ['swift-lang', 'architecture'],
            desc: 'Comprehensive testing strategies including unit, UI, snapshot testing, and Swift Testing framework.',
            topics: [
                { id: 'test-swift', name: 'Swift Testing Framework', sub: '@Test, #expect, parameterized tests, tags, suites' },
                { id: 'test-xctest', name: 'XCTest Patterns', sub: 'XCTestCase, setUp/tearDown, expectations, measures' },
                { id: 'test-unit', name: 'Unit Testing Patterns', sub: 'Arrange-Act-Assert, test doubles, protocol mocking' },
                { id: 'test-ui', name: 'UI Testing (XCUITest)', sub: 'Accessibility identifiers, page object pattern, launch arguments' },
                { id: 'test-snapshot', name: 'Snapshot Testing', sub: 'Point-Free snapshot testing, reference image management' },
                { id: 'test-tdd', name: 'TDD & Code Coverage', sub: 'Red-green-refactor cycle, coverage thresholds, quality gates' },
                { id: 'test-integration', name: 'Integration Testing', sub: 'API integration tests, database tests, end-to-end flows' },
                { id: 'test-mocks', name: 'Mock Servers & Network Stubs', sub: 'OHHTTPStubs, URLProtocol mocking, Mocker, fixture files' },
                { id: 'test-builders', name: 'Test Data Builders & Fixtures', sub: 'Builder pattern for test data, factory methods, shared fixtures' },
                { id: 'test-a11y', name: 'Accessibility Testing', sub: 'XCUI accessibility audit, A11y snapshots, VoiceOver testing' },
                { id: 'test-perf', name: 'Performance Testing (XCTMetric)', sub: 'XCTClockMetric, XCTMemoryMetric, baseline comparisons' },
                { id: 'test-ci', name: 'Continuous Testing in CI', sub: 'Parallel testing, xcodebuild test, result bundles, flaky test detection' },
            ],
        },
        {
            id: 'performance',
            title: 'Performance & Optimization',
            icon: '\u{1F680}',
            tier: 2,
            requires: ['ui-frameworks', 'data-networking'],
            desc: 'Profiling with Instruments, memory optimization, UI performance, and app launch time reduction.',
            topics: [
                { id: 'perf-instruments', name: 'Instruments Profiling', sub: 'Time Profiler, Allocations, Leaks, Energy diagnostics' },
                { id: 'perf-memory', name: 'Memory Optimization', sub: 'Lazy loading, image caching, autoreleasepool, memory graphs' },
                { id: 'perf-ui', name: 'UI Performance', sub: 'Main thread optimization, cell reuse, pre-rendering, CALayer tricks' },
                { id: 'perf-launch', name: 'App Launch Optimization', sub: 'Pre-main time, static vs dynamic linking, dyld improvements' },
                { id: 'perf-binary', name: 'Binary Size Reduction', sub: 'Dead code stripping, on-demand resources, asset catalogs' },
                { id: 'perf-metrics', name: 'Performance Metrics (MetricKit)', sub: 'MXMetricManager, hang diagnostics, CPU/memory reports' },
                { id: 'perf-swiftui', name: 'SwiftUI Performance', sub: 'View identity, structural identity, @Observable vs @Published diffing' },
                { id: 'perf-animation', name: 'Core Animation Performance', sub: 'Offscreen rendering, layer compositing, rasterization, shouldRasterize' },
                { id: 'perf-network', name: 'Network Performance', sub: 'HTTP/2 multiplexing, connection reuse, prefetching, compression' },
                { id: 'perf-disk', name: 'Disk I/O Optimization', sub: 'Background file I/O, batch writes, mmap, Data vs URL reads' },
                { id: 'perf-energy', name: 'Battery & Energy Optimization', sub: 'Energy gauges, background processing budgets, push vs pull' },
                { id: 'perf-concurrency', name: 'Concurrency Performance', sub: 'Thread explosion prevention, actor contention, priority inversion' },
            ],
        },
        {
            id: 'cicd',
            title: 'CI/CD & DevOps',
            icon: '\u{2699}\u{FE0F}',
            tier: 2,
            requires: ['testing'],
            desc: 'Continuous integration, code signing, build automation, and app distribution pipelines.',
            topics: [
                { id: 'cicd-platforms', name: 'CI Platforms', sub: 'Xcode Cloud, Fastlane, Bitrise, GitHub Actions, Jenkins' },
                { id: 'cicd-signing', name: 'Code Signing', sub: 'Manual vs automatic signing, match, provisioning profiles, entitlements' },
                { id: 'cicd-config', name: 'Build Configurations', sub: 'xcconfig files, debug/release schemes, preprocessor macros' },
                { id: 'cicd-dist', name: 'App Distribution', sub: 'TestFlight, enterprise distribution, ad-hoc builds, App Store Connect API' },
                { id: 'cicd-deps', name: 'Dependency Management (SPM)', sub: 'Package.swift, binary targets, XCFrameworks, version resolution' },
                { id: 'cicd-automation', name: 'Automated Testing in CI', sub: 'Parallel testing, test plans, result bundles, Xcode build scripts' },
                { id: 'cicd-release', name: 'Release Management & Versioning', sub: 'Semantic versioning, changelogs, automated bumps, tagging' },
                { id: 'cicd-artifacts', name: 'Build Artifact Management', sub: 'dSYMs, IPA archives, build caching, derived data management' },
                { id: 'cicd-monitoring', name: 'Monitoring & Alerting', sub: 'Build failure alerts, Slack notifications, build metrics dashboards' },
                { id: 'cicd-infra', name: 'Infrastructure as Code', sub: 'Self-hosted runners, macOS VM provisioning, Dockerized toolchains' },
            ],
        },
        {
            id: 'modularization',
            title: 'Modularization & Scale',
            icon: '\u{1F4E6}',
            tier: 2,
            requires: ['architecture', 'cicd'],
            desc: 'Multi-module architecture, build time optimization, and strategies for large-scale iOS codebases.',
            topics: [
                { id: 'mod-spm', name: 'SPM Local Packages', sub: 'Package.swift, binary targets, resource bundles, plugins' },
                { id: 'mod-arch', name: 'Multi-Module Architecture', sub: 'Feature, core, shared modules, dependency graphs' },
                { id: 'mod-micro', name: 'Micro-Features (Tuist)', sub: 'Manifest-based project generation, module templates' },
                { id: 'mod-build', name: 'Build Time Optimization', sub: 'Incremental builds, module stability, build caching' },
                { id: 'mod-repo', name: 'Monorepo vs Polyrepo', sub: 'Trade-offs, versioning strategies, CI implications' },
                { id: 'mod-interface', name: 'Module Interface Design', sub: 'Public API surface, @_exported, API stability annotations' },
                { id: 'mod-dynamic', name: 'Dynamic vs Static Frameworks', sub: 'Linking strategies, load time impact, framework embedding' },
                { id: 'mod-flags', name: 'Feature Toggles per Module', sub: 'Compile-time flags, runtime toggles, module-scoped configs' },
                { id: 'mod-depgraph', name: 'Dependency Graph Management', sub: 'Circular dependency prevention, layer enforcement, lint tools' },
                { id: 'mod-resources', name: 'Shared Resources & Assets', sub: 'Bundle access across modules, shared design tokens, localization' },
            ],
        },
        {
            id: 'security',
            title: 'Security',
            icon: '\u{1F512}',
            tier: 2,
            requires: ['data-networking'],
            desc: 'Certificate pinning, encryption, biometric auth, and mobile security best practices.',
            topics: [
                { id: 'sec-pinning', name: 'Certificate Pinning', sub: 'TrustKit, URLSession delegate, public key pinning' },
                { id: 'sec-crypto', name: 'CryptoKit', sub: 'AES encryption, RSA, SHA hashing, secure key generation' },
                { id: 'sec-keychain', name: 'Keychain Best Practices', sub: 'Access groups, biometric-protected items, kSecClass usage' },
                { id: 'sec-biometrics', name: 'Biometric Authentication', sub: 'Face ID, Touch ID, LAContext, fallback policies' },
                { id: 'sec-attest', name: 'App Attest & DeviceCheck', sub: 'Server-side verification, fraud prevention, attestation keys' },
                { id: 'sec-owasp', name: 'OWASP Mobile Top 10', sub: 'Common vulnerabilities, jailbreak detection, code obfuscation' },
                { id: 'sec-dataprotect', name: 'Data Protection API', sub: 'NSFileProtection levels, complete/until-first-unlock, encryption at rest' },
                { id: 'sec-ats', name: 'App Transport Security', sub: 'ATS configuration, exceptions, TLS requirements, certificate transparency' },
                { id: 'sec-coding', name: 'Secure Coding Practices', sub: 'Input validation, SQL injection prevention, secure logging' },
                { id: 'sec-runtime', name: 'Runtime Protection', sub: 'Anti-debugging, code signing validation, obfuscation, binary protection' },
                { id: 'sec-channels', name: 'Secure Communication', sub: 'End-to-end encryption, mTLS, WebSocket security, VPN integration' },
            ],
        },

        // ── Tier 3: Differentiators ──
        {
            id: 'apple-platform',
            title: 'Apple Platform Integration',
            icon: '\u{1F34E}',
            tier: 3,
            requires: ['ui-frameworks', 'data-networking'],
            desc: 'WidgetKit, App Intents, Live Activities, push notifications, StoreKit 2, and system framework mastery.',
            topics: [
                { id: 'plat-widgets', name: 'WidgetKit', sub: 'Timeline providers, interactive widgets, intent configuration' },
                { id: 'plat-intents', name: 'App Intents & Shortcuts', sub: 'Siri integration, Spotlight, Shortcuts app, App Shortcuts' },
                { id: 'plat-live', name: 'Live Activities & Dynamic Island', sub: 'ActivityKit, push-to-update, compact/expanded/lock screen views' },
                { id: 'plat-push', name: 'Push Notifications', sub: 'APNs, silent push, rich notifications, service extensions' },
                { id: 'plat-cloudkit', name: 'CloudKit', sub: 'Private, shared, and public databases, subscriptions, sync' },
                { id: 'plat-storekit', name: 'StoreKit 2', sub: 'In-app purchases, subscriptions, offer codes, transaction listener' },
                { id: 'plat-tipkit', name: 'TipKit & App Clips', sub: 'Feature discovery, lightweight App Clip experiences' },
                { id: 'plat-location', name: 'Core Location & MapKit', sub: 'CLLocationManager, geofencing, MapKit annotations, MKLookAroundScene' },
                { id: 'plat-health', name: 'HealthKit', sub: 'HKHealthStore, reading/writing samples, background delivery, workouts' },
                { id: 'plat-bluetooth', name: 'Core Bluetooth & NFC', sub: 'CBCentralManager, peripheral scanning, NDEF reading, tag writing' },
                { id: 'plat-extensions', name: 'Extensions (Share, Safari, Today)', sub: 'App extension lifecycle, share extension, Safari web extension' },
                { id: 'plat-links', name: 'Universal Links & Handoff', sub: 'apple-app-site-association, Handoff API, Continuity Camera' },
                { id: 'plat-bgtasks', name: 'BackgroundTasks Framework', sub: 'BGAppRefreshTask, BGProcessingTask, scheduling, system constraints' },
                { id: 'plat-spotlight', name: 'Core Spotlight & Indexed Search', sub: 'CSSearchableItem, NSUserActivity indexing, in-app search' },
            ],
        },
        {
            id: 'ai-ml',
            title: 'AI/ML & Vision',
            icon: '\u{1F916}',
            tier: 3,
            requires: ['swift-lang'],
            desc: 'On-device machine learning, computer vision, natural language processing, and Apple Intelligence.',
            topics: [
                { id: 'ml-coreml', name: 'Core ML Integration', sub: 'Model inference, model optimization, CoreML converters, coremltools' },
                { id: 'ml-createml', name: 'Create ML', sub: 'Custom model training, transfer learning, data augmentation' },
                { id: 'ml-vision', name: 'Vision Framework', sub: 'Image analysis, text recognition (OCR), barcode detection, face landmarks' },
                { id: 'ml-nlp', name: 'Natural Language', sub: 'Sentiment analysis, tokenization, language identification, NER' },
                { id: 'ml-translate', name: 'Translation & Apple Intelligence', sub: 'On-device translation, iOS 18+ AI features, summarization, writing tools' },
                { id: 'ml-sound', name: 'Sound Analysis & Speech', sub: 'SoundAnalysis, SFSpeechRecognizer, on-device speech-to-text' },
                { id: 'ml-object', name: 'Object Detection & Tracking', sub: 'VNDetectObjectRequest, VNTrackObjectRequest, real-time detection' },
                { id: 'ml-image', name: 'Image Processing & Core Image', sub: 'CIFilter, CIImage, custom kernels, Metal-backed processing' },
                { id: 'ml-training', name: 'On-Device Training', sub: 'MLUpdateTask, personalization, federated learning concepts' },
                { id: 'ml-optimization', name: 'Model Optimization', sub: 'Quantization, pruning, palettization, model compression techniques' },
            ],
        },
        {
            id: 'ar-spatial',
            title: 'AR/VR & Spatial',
            icon: '\u{1F97D}',
            tier: 3,
            requires: ['ui-frameworks'],
            desc: 'ARKit, RealityKit, visionOS spatial computing, and immersive experiences.',
            topics: [
                { id: 'ar-arkit', name: 'ARKit Fundamentals', sub: 'World tracking, plane detection, anchors, scene understanding' },
                { id: 'ar-reality', name: 'RealityKit', sub: '3D rendering, physics, animations, entity-component system' },
                { id: 'ar-visionos', name: 'visionOS & Spatial Computing', sub: 'Immersive spaces, volumes, ornaments, spatial layout' },
                { id: 'ar-shareplay', name: 'SharePlay & Group Activities', sub: 'Synchronized experiences, group sessions, spatial personas' },
                { id: 'ar-scene', name: 'Scene Reconstruction & Object Capture', sub: 'LiDAR scanning, mesh reconstruction, photogrammetry' },
                { id: 'ar-audio', name: 'Spatial Audio', sub: 'PHASESoundEvent, head tracking, audio environment, 3D audio' },
                { id: 'ar-tracking', name: 'Hand & Eye Tracking', sub: 'HandTrackingProvider, EyeTrackingProvider, gesture recognition' },
                { id: 'ar-metal', name: 'Metal for AR', sub: 'Custom rendering, shader programs, GPU compute, Metal Performance Shaders' },
            ],
        },
        {
            id: 'accessibility',
            title: 'Accessibility',
            icon: '\u{267F}',
            tier: 3,
            requires: ['ui-frameworks'],
            desc: 'VoiceOver, Dynamic Type, color contrast, and WCAG compliance for inclusive iOS apps.',
            topics: [
                { id: 'a11y-voiceover', name: 'VoiceOver Support', sub: 'Accessibility labels, hints, traits, rotor actions' },
                { id: 'a11y-dyntype', name: 'Dynamic Type', sub: 'Scaled fonts, UIFontMetrics, text style hierarchy, layout adaptation' },
                { id: 'a11y-color', name: 'Color & Motion', sub: 'Contrast ratios, reduced motion, reduced transparency preferences' },
                { id: 'a11y-audit', name: 'Auditing & WCAG', sub: 'Accessibility Inspector, XCUI audit, WCAG 2.1 AA compliance' },
                { id: 'a11y-switch', name: 'Switch Control & Assistive Tech', sub: 'Switch Control support, Full Keyboard Access, pointer alternatives' },
                { id: 'a11y-notifications', name: 'Accessibility Notifications', sub: 'UIAccessibility.post, screen changed, layout changed, announcements' },
                { id: 'a11y-actions', name: 'Custom Accessibility Actions', sub: 'UIAccessibilityCustomAction, magic tap, escape, increment/decrement' },
                { id: 'a11y-swiftui', name: 'Accessibility in SwiftUI', sub: '.accessibilityLabel, .accessibilityValue, .accessibilityElement, grouping' },
            ],
        },
        {
            id: 'cross-platform',
            title: 'Cross-Platform Awareness',
            icon: '\u{1F30D}',
            tier: 3,
            requires: ['architecture', 'data-networking'],
            desc: 'Understanding of KMP, React Native, Flutter trade-offs, server-side Swift, and shared code strategies.',
            topics: [
                { id: 'xplat-kmp', name: 'Kotlin Multiplatform (KMP)', sub: 'Shared business logic, Kotlin/Native, SKIE framework' },
                { id: 'xplat-rn-flutter', name: 'React Native / Flutter', sub: 'Architecture comparison, performance trade-offs, use cases' },
                { id: 'xplat-vapor', name: 'Server-Side Swift (Vapor)', sub: 'HTTP server, Fluent ORM, authentication, deployment' },
                { id: 'xplat-embedded', name: 'Swift on Embedded / WASM', sub: 'Embedded Swift, WebAssembly compilation, microcontrollers' },
                { id: 'xplat-abstraction', name: 'Platform Abstraction Layers', sub: 'Protocol-based platform interfaces, expect/actual patterns' },
                { id: 'xplat-shared', name: 'Shared Data & Networking Layers', sub: 'Shared Codable models, cross-platform API clients, serialization' },
                { id: 'xplat-build', name: 'Cross-Platform Build Systems', sub: 'Gradle/SPM integration, build pipeline coordination, CI setup' },
            ],
        },

        // ── Tier 4: Leadership ──
        {
            id: 'system-design',
            title: 'System Design',
            icon: '\u{1F4D0}',
            tier: 4,
            requires: ['architecture', 'data-networking', 'performance'],
            desc: 'Mobile system design interviews, API design, caching strategies, and offline-first architecture.',
            topics: [
                { id: 'sys-mobile', name: 'Mobile System Design', sub: 'Chat app, image feed, offline-first, sync engine interview designs' },
                { id: 'sys-api', name: 'API Design Principles', sub: 'RESTful conventions, pagination, versioning, error contracts' },
                { id: 'sys-cache', name: 'Caching Strategies', sub: 'Memory, disk, CDN caching, cache invalidation patterns' },
                { id: 'sys-realtime', name: 'Real-Time Systems', sub: 'WebSockets, Server-Sent Events, MQTT, polling strategies' },
                { id: 'sys-offline', name: 'Offline-First Architecture', sub: 'CRDT, last-write-wins, conflict resolution, sync queues' },
                { id: 'sys-observ', name: 'Observability', sub: 'Sentry, Firebase Crashlytics, custom analytics, structured logging' },
                { id: 'sys-scale', name: 'Scalability Patterns', sub: 'Horizontal scaling, load balancing concepts, rate limiting, throttling' },
                { id: 'sys-database', name: 'Database & Storage Design', sub: 'Schema design, indexing strategies, migration patterns, data modeling' },
                { id: 'sys-eventsrc', name: 'Event Sourcing & CQRS', sub: 'Event logs, read/write separation, event replay, audit trails' },
                { id: 'sys-flagarch', name: 'Feature Flag Architecture', sub: 'Flag evaluation engines, rollout strategies, kill switches, segments' },
                { id: 'sys-sdk', name: 'SDK & Framework Design', sub: 'Public API design, backward compatibility, semantic versioning, docs' },
                { id: 'sys-migration', name: 'Migration & Backward Compat', sub: 'API versioning, data migration, deprecation strategies, feature parity' },
            ],
        },
        {
            id: 'team-process',
            title: 'Team & Process',
            icon: '\u{1F465}',
            tier: 4,
            requires: ['testing', 'cicd'],
            desc: 'Code review, documentation, mentoring, sprint planning, and App Store guidelines.',
            topics: [
                { id: 'team-review', name: 'Code Review Best Practices', sub: 'PR size, review checklist, constructive feedback, async reviews' },
                { id: 'team-docs', name: 'Technical Documentation', sub: 'ADRs, RFCs, architecture diagrams, runbooks, DocC' },
                { id: 'team-mentor', name: 'Mentoring & Growth', sub: 'Technical mentoring, career ladders, knowledge sharing sessions' },
                { id: 'team-sprint', name: 'Sprint Planning & Estimation', sub: 'Story points, velocity, backlog grooming, retrospectives' },
                { id: 'team-flags', name: 'Feature Flags & A/B Testing', sub: 'LaunchDarkly, Firebase Remote Config, experimentation frameworks' },
                { id: 'team-appstore', name: 'App Store Guidelines & ASO', sub: 'Review guidelines, metadata optimization, rejection handling' },
                { id: 'team-governance', name: 'Architecture Governance', sub: 'Tech radar, ADR process, architectural fitness functions, standards' },
                { id: 'team-debt', name: 'Technical Debt Management', sub: 'Debt identification, prioritization frameworks, refactoring strategies' },
                { id: 'team-incident', name: 'Incident Management', sub: 'On-call rotation, postmortems, runbooks, escalation procedures' },
                { id: 'team-release', name: 'Release Train Management', sub: 'Release cadence, branch strategies, hotfix process, staged rollouts' },
            ],
        },
        {
            id: 'emerging',
            title: 'Emerging & Future',
            icon: '\u{1F52E}',
            tier: 4,
            requires: ['swift-lang', 'concurrency'],
            desc: 'Swift evolution, declarative UI future, AI-assisted development, and Swift beyond Apple.',
            topics: [
                { id: 'future-swift6', name: 'Swift 6+ Evolution', sub: 'Ownership, borrowing, consuming parameters, move semantics' },
                { id: 'future-decl', name: 'Declarative UI Beyond SwiftUI', sub: 'Cross-platform declarative patterns, Jetpack Compose comparison' },
                { id: 'future-ai', name: 'AI-Assisted Development', sub: 'Copilot, Claude Code, Xcode Predictive Code, AI testing tools' },
                { id: 'future-beyond', name: 'Swift Beyond Apple', sub: 'Server, embedded, WASM, cross-platform future, Swift everywhere' },
                { id: 'future-privacy', name: 'Privacy-First Development', sub: 'App Tracking Transparency, privacy manifests, privacy nutrition labels' },
                { id: 'future-plugins', name: 'Swift Package Plugins & Macro Authoring', sub: 'Build tool plugins, command plugins, custom macro implementation' },
                { id: 'future-docc', name: 'DocC & Documentation Tools', sub: 'Documentation catalogs, tutorials, articles, hosting on GitHub Pages' },
                { id: 'future-embedded', name: 'Embedded Swift & IoT', sub: 'Embedded Swift subset, microcontroller targets, firmware development' },
            ],
        },
    ];

    // ================================================================
    // TIER METADATA
    // ================================================================
    var TIER_META = {
        1: { name: 'Foundations', sub: 'Must-Know' },
        2: { name: 'Professional', sub: 'Expected at Senior' },
        3: { name: 'Differentiators', sub: 'Stand Out' },
        4: { name: 'Leadership', sub: 'Architect Level' },
    };

    // ================================================================
    // DOMAIN LOOKUP (for dependency resolution)
    // ================================================================
    var DOMAIN_MAP = {};
    DOMAINS.forEach(function (d) { DOMAIN_MAP[d.id] = d; });

    // ================================================================
    // LOCALSTORAGE HELPERS
    // ================================================================
    var STORAGE_KEY = 'rm-progress';

    function loadProgress() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        } catch (e) {
            return {};
        }
    }

    function saveProgress(prog) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(prog));
        } catch (e) {
            // storage full or disabled — silently fail
        }
    }

    var progress = loadProgress();

    // ================================================================
    // UTILITY
    // ================================================================
    function getTotalTopics() {
        var count = 0;
        DOMAINS.forEach(function (d) { count += d.topics.length; });
        return count;
    }

    function getCheckedCount() {
        var count = 0;
        DOMAINS.forEach(function (d) {
            d.topics.forEach(function (t) {
                if (progress[t.id]) count++;
            });
        });
        return count;
    }

    function getDomainProgress(domain) {
        var checked = 0;
        domain.topics.forEach(function (t) {
            if (progress[t.id]) checked++;
        });
        return { checked: checked, total: domain.topics.length };
    }

    function getDomainsByTier(tier) {
        return DOMAINS.filter(function (d) { return d.tier === tier; });
    }

    // Get domains that depend on a given domain
    function getDependents(domainId) {
        return DOMAINS.filter(function (d) {
            return d.requires.indexOf(domainId) !== -1;
        });
    }

    // SVG ring circumference (radius = 15, so C = 2 * PI * 15 ≈ 94.25)
    var RING_C = 2 * Math.PI * 15;

    function calcDashArray(checked, total) {
        var pct = total > 0 ? checked / total : 0;
        var filled = RING_C * pct;
        return filled + ' ' + (RING_C - filled);
    }

    // ================================================================
    // RENDER: Topic Checkbox
    // ================================================================
    function renderTopic(topic, context) {
        var isChecked = !!progress[topic.id];
        var label = document.createElement('label');
        label.className = 'rm-topic' + (isChecked ? ' is-checked' : '');
        label.innerHTML =
            '<span class="rm-topic__check">' +
                '<input type="checkbox" data-topic="' + topic.id + '" data-context="' + context + '"' + (isChecked ? ' checked' : '') + '>' +
                '<span class="rm-topic__box"></span>' +
            '</span>' +
            '<span class="rm-topic__text">' +
                '<span class="rm-topic__name">' + topic.name + '</span>' +
                (topic.sub ? '<span class="rm-topic__sub">' + topic.sub + '</span>' : '') +
            '</span>';
        return label;
    }

    // ================================================================
    // RENDER: Flowchart (Skill Tree)
    // ================================================================
    function renderFlowchart() {
        var container = document.getElementById('rmFlowchart');
        if (!container) return;
        container.innerHTML = '';

        // Create tree wrapper
        var tree = document.createElement('div');
        tree.className = 'rm-tree';

        // Render tiers
        var tiers = [1, 2, 3, 4];
        tiers.forEach(function (tier, idx) {
            if (idx > 0) {
                var conn = document.createElement('div');
                conn.className = 'rm-tree__connector';
                tree.appendChild(conn);
            }

            var tierEl = document.createElement('div');
            tierEl.className = 'rm-tree__tier';
            tierEl.dataset.tier = tier;

            var meta = TIER_META[tier];
            var labelEl = document.createElement('div');
            labelEl.className = 'rm-tree__tier-label';
            labelEl.innerHTML =
                '<span class="rm-tree__tier-num">Tier ' + tier + '</span>' +
                '<span class="rm-tree__tier-name">' + meta.name + '</span>';
            tierEl.appendChild(labelEl);

            var nodesWrap = document.createElement('div');
            nodesWrap.className = 'rm-tree__nodes';

            var domains = getDomainsByTier(tier);
            domains.forEach(function (domain) {
                var p = getDomainProgress(domain);
                var pct = p.total > 0 ? Math.round((p.checked / p.total) * 100) : 0;

                var nodeWrap = document.createElement('div');
                nodeWrap.className = 'rm-tree__node-wrap';

                var node = document.createElement('button');
                node.className = 'rm-node';
                node.type = 'button';
                node.dataset.domain = domain.id;
                node.dataset.tier = tier;
                node.setAttribute('aria-expanded', 'false');

                // Add tier color accent
                var tierColors = { 1: 'green', 2: 'purple', 3: 'orange', 4: 'pink' };
                node.dataset.accent = tierColors[tier];

                node.innerHTML =
                    '<div class="rm-node__ring">' +
                        '<svg viewBox="0 0 36 36">' +
                            '<circle class="rm-node__ring-bg" cx="18" cy="18" r="15"/>' +
                            '<circle class="rm-node__ring-fill" cx="18" cy="18" r="15" stroke-dasharray="' + calcDashArray(p.checked, p.total) + '"/>' +
                        '</svg>' +
                        '<span class="rm-node__ring-icon">' + domain.icon + '</span>' +
                    '</div>' +
                    '<div class="rm-node__info">' +
                        '<div class="rm-node__title">' + domain.title + '</div>' +
                        '<div class="rm-node__count">' + p.checked + '/' + p.total + ' topics</div>' +
                    '</div>' +
                    '<svg class="rm-node__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';

                nodeWrap.appendChild(node);

                // Detail panel (hidden by default)
                var detail = document.createElement('div');
                detail.className = 'rm-detail';
                detail.id = 'rm-detail-' + domain.id;

                // Build prerequisites info
                var prereqHtml = '';
                if (domain.requires.length > 0) {
                    var prereqNames = domain.requires.map(function (rid) {
                        var rd = DOMAIN_MAP[rid];
                        return rd ? rd.title : rid;
                    });
                    prereqHtml = '<div class="rm-detail__prereqs">' +
                        '<span class="rm-detail__prereqs-label">Prerequisites:</span> ' +
                        prereqNames.join(' \u2022 ') +
                    '</div>';
                }

                detail.innerHTML =
                    '<div class="rm-detail__inner">' +
                        '<div class="rm-detail__content">' +
                            prereqHtml +
                            '<div class="rm-detail__topics"></div>' +
                        '</div>' +
                    '</div>';
                var topicsGrid = detail.querySelector('.rm-detail__topics');
                domain.topics.forEach(function (t) {
                    topicsGrid.appendChild(renderTopic(t, 'flowchart'));
                });
                nodeWrap.appendChild(detail);
                nodesWrap.appendChild(nodeWrap);
            });

            tierEl.appendChild(nodesWrap);
            tree.appendChild(tierEl);
        });

        container.appendChild(tree);
    }

    // ================================================================
    // RENDER: Tier Detail Sections
    // ================================================================
    function renderTierSections() {
        [1, 2, 3, 4].forEach(function (tier) {
            var containerId = 'rmDomains' + tier;
            var container = document.getElementById(containerId);
            if (!container) return;
            container.innerHTML = '';

            var domains = getDomainsByTier(tier);
            domains.forEach(function (domain) {
                var p = getDomainProgress(domain);
                var pct = p.total > 0 ? Math.round((p.checked / p.total) * 100) : 0;

                var card = document.createElement('div');
                card.className = 'rm-domain';
                card.dataset.domain = domain.id;

                // Build prerequisites pill
                var prereqPill = '';
                if (domain.requires.length > 0) {
                    var prereqNames = domain.requires.map(function (rid) {
                        var rd = DOMAIN_MAP[rid];
                        return rd ? rd.title : rid;
                    });
                    prereqPill = '<div class="rm-domain__prereqs">Requires: ' + prereqNames.join(', ') + '</div>';
                }

                card.innerHTML =
                    '<button class="rm-domain__toggle" type="button" aria-expanded="false">' +
                        '<span class="rm-domain__icon">' + domain.icon + '</span>' +
                        '<div class="rm-domain__info">' +
                            '<div class="rm-domain__title">' + domain.title + '</div>' +
                            '<div class="rm-domain__meta">' + p.total + ' topics \u00B7 ' + pct + '%</div>' +
                        '</div>' +
                        '<svg class="rm-domain__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>' +
                    '</button>' +
                    '<div class="rm-domain__body">' +
                        '<div class="rm-domain__body-inner">' +
                            prereqPill +
                            '<p class="rm-domain__desc">' + domain.desc + '</p>' +
                            '<div class="rm-domain__topics"></div>' +
                        '</div>' +
                    '</div>';

                var topicsWrap = card.querySelector('.rm-domain__topics');
                domain.topics.forEach(function (t) {
                    topicsWrap.appendChild(renderTopic(t, 'section'));
                });
                container.appendChild(card);
            });
        });
    }

    // ================================================================
    // UPDATE: Progress Rings + Summary
    // ================================================================
    function updateProgressUI() {
        var total = getTotalTopics();
        var checked = getCheckedCount();

        // Summary bar
        var summaryText = document.getElementById('rmSummaryText');
        var summaryFill = document.getElementById('rmSummaryFill');
        if (summaryText) summaryText.textContent = checked + ' / ' + total;
        if (summaryFill) summaryFill.style.width = (total > 0 ? (checked / total) * 100 : 0) + '%';

        // Update each node ring and domain meta
        DOMAINS.forEach(function (domain) {
            var p = getDomainProgress(domain);
            var pct = p.total > 0 ? Math.round((p.checked / p.total) * 100) : 0;

            // Flowchart node
            var node = document.querySelector('.rm-node[data-domain="' + domain.id + '"]');
            if (node) {
                var ring = node.querySelector('.rm-node__ring-fill');
                var countEl = node.querySelector('.rm-node__count');
                if (ring) ring.setAttribute('stroke-dasharray', calcDashArray(p.checked, p.total));
                if (countEl) countEl.textContent = p.checked + '/' + p.total + ' topics';
            }

            // Tier section domain card meta
            var domainCard = document.querySelector('.rm-domain[data-domain="' + domain.id + '"]');
            if (domainCard) {
                var meta = domainCard.querySelector('.rm-domain__meta');
                if (meta) meta.textContent = p.total + ' topics \u00B7 ' + pct + '%';
            }
        });
    }

    // ================================================================
    // SYNC: Checkboxes across flowchart and tier sections
    // ================================================================
    function syncCheckboxes(topicId, isChecked) {
        var checkboxes = document.querySelectorAll('input[data-topic="' + topicId + '"]');
        checkboxes.forEach(function (cb) {
            cb.checked = isChecked;
            var label = cb.closest('.rm-topic');
            if (label) {
                if (isChecked) {
                    label.classList.add('is-checked');
                } else {
                    label.classList.remove('is-checked');
                }
            }
        });
    }

    // ================================================================
    // EVENT: Checkbox Change (Event Delegation)
    // ================================================================
    document.addEventListener('change', function (e) {
        var cb = e.target;
        if (!cb.matches || !cb.matches('input[data-topic]')) return;

        var topicId = cb.dataset.topic;
        var isChecked = cb.checked;

        if (isChecked) {
            progress[topicId] = true;
        } else {
            delete progress[topicId];
        }
        saveProgress(progress);
        syncCheckboxes(topicId, isChecked);
        updateProgressUI();
    });

    // ================================================================
    // EVENT: Flowchart Node Expand/Collapse
    // ================================================================
    document.addEventListener('click', function (e) {
        var node = e.target.closest('.rm-node');
        if (!node) return;

        var domainId = node.dataset.domain;
        var detail = document.getElementById('rm-detail-' + domainId);
        if (!detail) return;

        var wasActive = node.classList.contains('is-active');

        // Close all details in the same tier
        var tier = node.closest('.rm-tree__tier');
        if (tier) {
            tier.querySelectorAll('.rm-node').forEach(function (n) {
                n.classList.remove('is-active');
                n.setAttribute('aria-expanded', 'false');
            });
            tier.querySelectorAll('.rm-detail').forEach(function (d) {
                d.classList.remove('is-open');
            });
        }

        // Toggle the clicked one (if it wasn't already open)
        if (!wasActive) {
            node.classList.add('is-active');
            node.setAttribute('aria-expanded', 'true');
            detail.classList.add('is-open');
        }
    });

    // ================================================================
    // EVENT: Domain Card Expand/Collapse (Tier Sections)
    // ================================================================
    document.addEventListener('click', function (e) {
        var btn = e.target.closest('.rm-domain__toggle');
        if (!btn) return;

        var card = btn.closest('.rm-domain');
        if (!card) return;

        var isExpanded = card.classList.toggle('is-expanded');
        btn.setAttribute('aria-expanded', String(isExpanded));
    });

    // ================================================================
    // EVENT: Filter Buttons
    // ================================================================
    var currentFilter = 'all';

    document.addEventListener('click', function (e) {
        var btn = e.target.closest('.rm-filter__btn');
        if (!btn) return;

        var filter = btn.dataset.filter;
        if (filter === currentFilter) return;
        currentFilter = filter;

        // Update active state
        document.querySelectorAll('.rm-filter__btn').forEach(function (b) {
            b.classList.remove('is-active');
        });
        btn.classList.add('is-active');

        // Apply filter to flowchart nodes and domain cards
        DOMAINS.forEach(function (domain) {
            var p = getDomainProgress(domain);
            var isComplete = p.checked === p.total;

            var show = true;
            if (filter === 'tolearn') show = !isComplete;
            if (filter === 'mastered') show = isComplete;

            // Flowchart node
            var nodeWrap = document.querySelector('.rm-node[data-domain="' + domain.id + '"]');
            if (nodeWrap) {
                var wrap = nodeWrap.closest('.rm-tree__node-wrap');
                if (wrap) wrap.style.display = show ? '' : 'none';
            }

            // Tier section card
            var card = document.querySelector('.rm-domain[data-domain="' + domain.id + '"]');
            if (card) card.style.display = show ? '' : 'none';
        });
    });

    // ================================================================
    // SCROLL REVEAL (IntersectionObserver)
    // ================================================================
    var animEls = document.querySelectorAll('[data-anim]');
    if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                var delay = parseInt(el.dataset.delay, 10) || 0;
                if (delay > 0) {
                    setTimeout(function () { el.classList.add('is-visible'); }, delay);
                } else {
                    el.classList.add('is-visible');
                }
                revealObserver.unobserve(el);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        animEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
        animEls.forEach(function (el) { el.classList.add('is-visible'); });
    }

    // ================================================================
    // READING PROGRESS BAR
    // ================================================================
    var progressBar = document.getElementById('rmProgress');
    if (progressBar) {
        window.addEventListener('scroll', function () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = Math.min(pct, 100) + '%';
        });
    }

    // ================================================================
    // MOBILE NAV TOGGLE
    // ================================================================
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');

    if (toggle && links) {
        toggle.addEventListener('click', function () {
            var isOpen = links.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });

        links.addEventListener('click', function (e) {
            if (e.target.closest('.nav__link')) {
                links.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ================================================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ================================================================
    document.addEventListener('click', function (e) {
        var link = e.target.closest('a[href^="#"]');
        if (!link) return;
        var href = link.getAttribute('href');
        if (!href || href === '#') return;
        var target = document.getElementById(href.slice(1));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Footer "Back to Top" link
    var footerTop = document.getElementById('footerTop');
    if (footerTop) {
        footerTop.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ================================================================
    // INIT
    // ================================================================
    renderFlowchart();
    renderTierSections();
    updateProgressUI();

})();
