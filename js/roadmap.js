(function () {
    'use strict';

    // ================================================================
    // DOMAINS DATA — Single source of truth for all 18 domains
    // ================================================================
    var DOMAINS = [
        // ── Tier 1: Foundations ──
        {
            id: 'swift-lang',
            title: 'Swift Language Mastery',
            icon: '\u{1F4A0}',
            tier: 1,
            desc: 'Deep knowledge of the Swift type system, protocols, value semantics, memory management, and modern language features.',
            topics: [
                { id: 'swift-generics', name: 'Generics & Associated Types', sub: 'Generic constraints, where clauses, associated types in protocols' },
                { id: 'swift-opaque', name: 'Opaque & Existential Types', sub: 'some vs any, type erasure patterns, performance implications' },
                { id: 'swift-pop', name: 'Protocol-Oriented Programming', sub: 'Extensions, conditional conformance, default implementations' },
                { id: 'swift-value-ref', name: 'Value vs Reference Types', sub: 'Structs, classes, actors, copy-on-write semantics' },
                { id: 'swift-arc', name: 'Memory Management (ARC)', sub: 'Retain cycles, weak/unowned refs, capture lists in closures' },
                { id: 'swift-errors', name: 'Error Handling', sub: 'Result type, typed throws (Swift 6), do-catch patterns' },
                { id: 'swift-macros', name: 'Modern Swift Features', sub: 'Macros, parameter packs, noncopyable types, regex builder' },
            ],
        },
        {
            id: 'concurrency',
            title: 'Swift Concurrency',
            icon: '\u{26A1}',
            tier: 1,
            desc: 'Structured concurrency, actors, and the path to data-race safety with Swift 6 strict concurrency.',
            topics: [
                { id: 'conc-async', name: 'async/await', sub: 'Async functions, continuations, bridging from callbacks' },
                { id: 'conc-structured', name: 'Structured Concurrency', sub: 'TaskGroup, async let, task hierarchy and cancellation' },
                { id: 'conc-actors', name: 'Actors & Isolation', sub: '@MainActor, global actors, Sendable protocol' },
                { id: 'conc-swift6', name: 'Swift 6 Strict Concurrency', sub: 'Complete data-race safety, migration strategies' },
                { id: 'conc-async-seq', name: 'AsyncSequence & AsyncStream', sub: 'Async iteration, custom async sequences' },
                { id: 'conc-cancel', name: 'Task Cancellation & Priorities', sub: 'Cooperative cancellation, task priority propagation' },
                { id: 'conc-migrate', name: 'Migrating from GCD/Combine', sub: 'Replacing DispatchQueue, adapting Combine publishers' },
            ],
        },
        {
            id: 'ui-frameworks',
            title: 'UI Frameworks',
            icon: '\u{1F3A8}',
            tier: 1,
            desc: 'SwiftUI and UIKit mastery, including state management, navigation, layouts, and framework interop.',
            topics: [
                { id: 'ui-swiftui-state', name: 'SwiftUI State Management', sub: '@State, @Binding, @Observable, @Environment' },
                { id: 'ui-swiftui-nav', name: 'SwiftUI Navigation', sub: 'NavigationStack, NavigationSplitView, deep linking' },
                { id: 'ui-swiftui-anim', name: 'SwiftUI Animations & Layout', sub: 'Custom Layout protocol, matchedGeometryEffect, transitions' },
                { id: 'ui-swiftui-mod', name: 'ViewModifier & PreferenceKey', sub: 'Custom modifiers, preference keys, geometry reader' },
                { id: 'ui-uikit', name: 'UIKit Essentials', sub: 'Auto Layout, diffable data sources, compositional layout' },
                { id: 'ui-lifecycle', name: 'View Controller Lifecycle', sub: 'viewDidLoad, viewWillAppear, memory warnings, trait collections' },
                { id: 'ui-interop', name: 'SwiftUI ↔ UIKit Interop', sub: 'UIViewRepresentable, UIHostingController, mixed navigation' },
            ],
        },
        {
            id: 'architecture',
            title: 'Architecture & Patterns',
            icon: '\u{1F3D7}\u{FE0F}',
            tier: 1,
            desc: 'App architecture patterns, dependency injection, and design patterns for scalable iOS codebases.',
            topics: [
                { id: 'arch-mvvm', name: 'MVVM & MV Patterns', sub: 'ViewModel design, data binding, view-model ownership' },
                { id: 'arch-tca', name: 'TCA & Composable Architecture', sub: 'Reducers, effects, state management at scale' },
                { id: 'arch-clean', name: 'Clean Architecture & VIPER', sub: 'Use cases, interactors, entity boundaries, routers' },
                { id: 'arch-di', name: 'Dependency Injection', sub: 'Swinject, Factory, Environment injection patterns' },
                { id: 'arch-coord', name: 'Coordinator / Router Patterns', sub: 'Navigation abstraction, deep link handling' },
                { id: 'arch-patterns', name: 'Design Patterns', sub: 'Observer, Strategy, Factory, Builder, Composite, Decorator' },
            ],
        },
        {
            id: 'data-networking',
            title: 'Data & Networking',
            icon: '\u{1F310}',
            tier: 1,
            desc: 'Networking layers, data persistence, and local storage strategies for iOS apps.',
            topics: [
                { id: 'data-urlsession', name: 'URLSession & Networking Layers', sub: 'async/await networking, interceptors, retry logic' },
                { id: 'data-api', name: 'REST, GraphQL & WebSockets', sub: 'API design patterns, real-time communication' },
                { id: 'data-codable', name: 'Codable & JSON Handling', sub: 'Custom coding keys, nested decoding, date strategies' },
                { id: 'data-coredata', name: 'Core Data', sub: 'Managed object contexts, migrations, CloudKit sync' },
                { id: 'data-swiftdata', name: 'SwiftData', sub: '@Model macro, #Query, migration strategies' },
                { id: 'data-storage', name: 'Local Storage', sub: 'Keychain, UserDefaults, FileManager, App Groups' },
            ],
        },

        // ── Tier 2: Professional ──
        {
            id: 'testing',
            title: 'Testing & Quality',
            icon: '\u{1F9EA}',
            tier: 2,
            desc: 'Comprehensive testing strategies including unit, UI, snapshot testing, and Swift Testing framework.',
            topics: [
                { id: 'test-swift', name: 'Swift Testing Framework', sub: '@Test, #expect, parameterized tests, tags, suites' },
                { id: 'test-xctest', name: 'XCTest Patterns', sub: 'XCTestCase, setUp/tearDown, expectations, measures' },
                { id: 'test-unit', name: 'Unit Testing Patterns', sub: 'Arrange-Act-Assert, test doubles, protocol mocking' },
                { id: 'test-ui', name: 'UI Testing (XCUITest)', sub: 'Accessibility identifiers, page object pattern, launch arguments' },
                { id: 'test-snapshot', name: 'Snapshot Testing', sub: 'Point-Free snapshot testing, reference image management' },
                { id: 'test-tdd', name: 'TDD & Code Coverage', sub: 'Red-green-refactor cycle, coverage thresholds, quality gates' },
            ],
        },
        {
            id: 'performance',
            title: 'Performance & Optimization',
            icon: '\u{1F680}',
            tier: 2,
            desc: 'Profiling with Instruments, memory optimization, UI performance, and app launch time reduction.',
            topics: [
                { id: 'perf-instruments', name: 'Instruments Profiling', sub: 'Time Profiler, Allocations, Leaks, Energy diagnostics' },
                { id: 'perf-memory', name: 'Memory Optimization', sub: 'Lazy loading, image caching, autoreleasepool, memory graphs' },
                { id: 'perf-ui', name: 'UI Performance', sub: 'Main thread optimization, cell reuse, pre-rendering, CALayer' },
                { id: 'perf-launch', name: 'App Launch Optimization', sub: 'Pre-main time, static vs dynamic linking, dyld improvements' },
                { id: 'perf-binary', name: 'Binary Size Reduction', sub: 'Dead code stripping, on-demand resources, asset catalogs' },
                { id: 'perf-metrics', name: 'Performance Metrics', sub: 'XCTMetric, MetricKit, hang detection, scroll hitches' },
            ],
        },
        {
            id: 'cicd',
            title: 'CI/CD & DevOps',
            icon: '\u{2699}\u{FE0F}',
            tier: 2,
            desc: 'Continuous integration, code signing, build automation, and app distribution pipelines.',
            topics: [
                { id: 'cicd-platforms', name: 'CI Platforms', sub: 'Xcode Cloud, Fastlane, Bitrise, GitHub Actions' },
                { id: 'cicd-signing', name: 'Code Signing', sub: 'Manual vs automatic signing, match, provisioning profiles' },
                { id: 'cicd-config', name: 'Build Configurations', sub: 'xcconfig files, debug/release schemes, feature flags' },
                { id: 'cicd-dist', name: 'App Distribution', sub: 'TestFlight, enterprise distribution, ad-hoc builds' },
                { id: 'cicd-deps', name: 'Dependency Management', sub: 'SPM, CocoaPods (legacy), binary frameworks, XCFrameworks' },
            ],
        },
        {
            id: 'modularization',
            title: 'Modularization & Scale',
            icon: '\u{1F4E6}',
            tier: 2,
            desc: 'Multi-module architecture, build time optimization, and strategies for large-scale iOS codebases.',
            topics: [
                { id: 'mod-spm', name: 'SPM Local Packages', sub: 'Package.swift, binary targets, resource bundles' },
                { id: 'mod-arch', name: 'Multi-Module Architecture', sub: 'Feature, core, shared modules, dependency graphs' },
                { id: 'mod-micro', name: 'Micro-Features (Tuist)', sub: 'Manifest-based project generation, module templates' },
                { id: 'mod-build', name: 'Build Time Optimization', sub: 'Incremental builds, module stability, caching' },
                { id: 'mod-repo', name: 'Monorepo vs Polyrepo', sub: 'Trade-offs, versioning strategies, CI implications' },
            ],
        },
        {
            id: 'security',
            title: 'Security',
            icon: '\u{1F512}',
            tier: 2,
            desc: 'Certificate pinning, encryption, biometric auth, and mobile security best practices.',
            topics: [
                { id: 'sec-pinning', name: 'Certificate Pinning', sub: 'TrustKit, URLSession delegate, HPKP alternatives' },
                { id: 'sec-crypto', name: 'CryptoKit', sub: 'AES encryption, RSA, SHA hashing, secure key storage' },
                { id: 'sec-keychain', name: 'Keychain Best Practices', sub: 'Access groups, biometric-protected items, kSecClass' },
                { id: 'sec-biometrics', name: 'Biometric Authentication', sub: 'Face ID, Touch ID, LAContext, fallback policies' },
                { id: 'sec-attest', name: 'App Attest & DeviceCheck', sub: 'Server-side verification, fraud prevention' },
                { id: 'sec-owasp', name: 'OWASP Mobile Top 10', sub: 'Common vulnerabilities, jailbreak detection, code obfuscation' },
            ],
        },

        // ── Tier 3: Differentiators ──
        {
            id: 'apple-platform',
            title: 'Apple Platform Integration',
            icon: '\u{1F34E}',
            tier: 3,
            desc: 'WidgetKit, App Intents, Live Activities, push notifications, StoreKit 2, and more.',
            topics: [
                { id: 'plat-widgets', name: 'WidgetKit', sub: 'Timeline providers, interactive widgets, intent configuration' },
                { id: 'plat-intents', name: 'App Intents & Shortcuts', sub: 'Siri integration, Spotlight, Shortcuts app, App Shortcuts' },
                { id: 'plat-live', name: 'Live Activities & Dynamic Island', sub: 'ActivityKit, push-to-update, compact/expanded views' },
                { id: 'plat-push', name: 'Push Notifications', sub: 'APNs, silent push, rich notifications, service extensions' },
                { id: 'plat-cloudkit', name: 'CloudKit', sub: 'Private, shared, and public databases, subscriptions, sync' },
                { id: 'plat-storekit', name: 'StoreKit 2', sub: 'In-app purchases, subscriptions, offer codes, transaction listener' },
                { id: 'plat-tipkit', name: 'TipKit & App Clips', sub: 'Feature discovery, lightweight App Clip experiences' },
            ],
        },
        {
            id: 'ai-ml',
            title: 'AI/ML & Vision',
            icon: '\u{1F916}',
            tier: 3,
            desc: 'On-device machine learning, computer vision, natural language processing, and Apple Intelligence.',
            topics: [
                { id: 'ml-coreml', name: 'Core ML Integration', sub: 'Model inference, model optimization, CoreML converters' },
                { id: 'ml-createml', name: 'Create ML', sub: 'Custom model training, transfer learning, data augmentation' },
                { id: 'ml-vision', name: 'Vision Framework', sub: 'Image analysis, text recognition (OCR), barcode detection' },
                { id: 'ml-nlp', name: 'Natural Language', sub: 'Sentiment analysis, tokenization, language identification' },
                { id: 'ml-translate', name: 'Translation & Apple Intelligence', sub: 'On-device translation, iOS 18+ AI features, summarization' },
            ],
        },
        {
            id: 'ar-spatial',
            title: 'AR/VR & Spatial',
            icon: '\u{1F97D}',
            tier: 3,
            desc: 'ARKit, RealityKit, visionOS spatial computing, and immersive experiences.',
            topics: [
                { id: 'ar-arkit', name: 'ARKit Fundamentals', sub: 'World tracking, plane detection, anchors, scene understanding' },
                { id: 'ar-reality', name: 'RealityKit', sub: '3D rendering, physics, animations, entity-component system' },
                { id: 'ar-visionos', name: 'visionOS & Spatial Computing', sub: 'Immersive spaces, volumes, ornaments, hand tracking' },
                { id: 'ar-shareplay', name: 'SharePlay & Group Activities', sub: 'Synchronized experiences, group sessions, spatial personas' },
            ],
        },
        {
            id: 'accessibility',
            title: 'Accessibility',
            icon: '\u{267F}',
            tier: 3,
            desc: 'VoiceOver, Dynamic Type, color contrast, and WCAG compliance for inclusive iOS apps.',
            topics: [
                { id: 'a11y-voiceover', name: 'VoiceOver Support', sub: 'Accessibility labels, hints, traits, rotor actions' },
                { id: 'a11y-dyntype', name: 'Dynamic Type', sub: 'Scaled fonts, text style hierarchy, layout adaptation' },
                { id: 'a11y-color', name: 'Color & Motion', sub: 'Contrast ratios, reduced motion, reduced transparency' },
                { id: 'a11y-audit', name: 'Auditing & WCAG', sub: 'Accessibility Inspector, XCUI audit, WCAG 2.1 AA compliance' },
            ],
        },
        {
            id: 'cross-platform',
            title: 'Cross-Platform Awareness',
            icon: '\u{1F30D}',
            tier: 3,
            desc: 'Understanding of KMP, React Native, Flutter trade-offs, and server-side Swift.',
            topics: [
                { id: 'xplat-kmp', name: 'Kotlin Multiplatform (KMP)', sub: 'Shared business logic, Kotlin/Native, SKIE framework' },
                { id: 'xplat-rn-flutter', name: 'React Native / Flutter', sub: 'Architecture comparison, performance trade-offs, use cases' },
                { id: 'xplat-vapor', name: 'Server-Side Swift (Vapor)', sub: 'HTTP server, Fluent ORM, authentication, deployment' },
                { id: 'xplat-embedded', name: 'Swift on Embedded / WASM', sub: 'Embedded Swift, WebAssembly compilation, microcontrollers' },
            ],
        },

        // ── Tier 4: Leadership ──
        {
            id: 'system-design',
            title: 'System Design',
            icon: '\u{1F4D0}',
            tier: 4,
            desc: 'Mobile system design interviews, API design, caching strategies, and offline-first architecture.',
            topics: [
                { id: 'sys-mobile', name: 'Mobile System Design', sub: 'Chat app, image feed, offline-first, sync engine designs' },
                { id: 'sys-api', name: 'API Design Principles', sub: 'RESTful conventions, pagination, versioning, error contracts' },
                { id: 'sys-cache', name: 'Caching Strategies', sub: 'Memory, disk, CDN caching, cache invalidation patterns' },
                { id: 'sys-realtime', name: 'Real-Time Systems', sub: 'WebSockets, Server-Sent Events, MQTT, polling strategies' },
                { id: 'sys-offline', name: 'Offline-First Architecture', sub: 'CRDT, last-write-wins, conflict resolution, sync queues' },
                { id: 'sys-observ', name: 'Observability', sub: 'Sentry, Firebase Crashlytics, custom analytics, logging' },
            ],
        },
        {
            id: 'team-process',
            title: 'Team & Process',
            icon: '\u{1F465}',
            tier: 4,
            desc: 'Code review, documentation, mentoring, sprint planning, and App Store guidelines.',
            topics: [
                { id: 'team-review', name: 'Code Review Best Practices', sub: 'PR size, review checklist, constructive feedback' },
                { id: 'team-docs', name: 'Technical Documentation', sub: 'ADRs, RFCs, architecture diagrams, runbooks' },
                { id: 'team-mentor', name: 'Mentoring & Growth', sub: 'Technical mentoring, career ladders, knowledge sharing' },
                { id: 'team-sprint', name: 'Sprint Planning & Estimation', sub: 'Story points, velocity, backlog grooming, retrospectives' },
                { id: 'team-flags', name: 'Feature Flags & A/B Testing', sub: 'LaunchDarkly, Firebase Remote Config, experimentation' },
                { id: 'team-appstore', name: 'App Store Guidelines & ASO', sub: 'Review guidelines, metadata optimization, rejection handling' },
            ],
        },
        {
            id: 'emerging',
            title: 'Emerging & Future',
            icon: '\u{1F52E}',
            tier: 4,
            desc: 'Swift evolution, declarative UI future, AI-assisted development, and Swift beyond Apple.',
            topics: [
                { id: 'future-swift6', name: 'Swift 6+ Evolution', sub: 'Ownership, borrowing, consuming parameters, move semantics' },
                { id: 'future-decl', name: 'Declarative UI Beyond SwiftUI', sub: 'Cross-platform declarative patterns, Jetpack Compose comparison' },
                { id: 'future-ai', name: 'AI-Assisted Development', sub: 'Copilot, Claude, Xcode Predictive Code, AI testing tools' },
                { id: 'future-beyond', name: 'Swift Beyond Apple', sub: 'Server, embedded, WASM, cross-platform future, Swift everywhere' },
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

    function saveProgress(progress) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
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
    // RENDER: Flowchart
    // ================================================================
    function renderFlowchart() {
        var container = document.getElementById('rmFlowchart');
        if (!container) return;
        container.innerHTML = '';

        var tiers = [1, 2, 3, 4];
        tiers.forEach(function (tier, idx) {
            if (idx > 0) {
                var conn = document.createElement('div');
                conn.className = 'rm-connector';
                container.appendChild(conn);
            }

            var tierEl = document.createElement('div');
            tierEl.className = 'rm-tier';
            tierEl.dataset.tier = tier;

            var meta = TIER_META[tier];
            tierEl.innerHTML =
                '<div class="rm-tier__label">' +
                    '<span class="rm-tier__label-num">Tier ' + tier + '</span>' +
                    '<span class="rm-tier__label-name">' + meta.name + '</span>' +
                '</div>';

            var nodesWrap = document.createElement('div');
            nodesWrap.className = 'rm-tier__nodes';

            var domains = getDomainsByTier(tier);
            domains.forEach(function (domain) {
                var p = getDomainProgress(domain);
                var pct = p.total > 0 ? Math.round((p.checked / p.total) * 100) : 0;

                var node = document.createElement('button');
                node.className = 'rm-node';
                node.type = 'button';
                node.dataset.domain = domain.id;
                node.setAttribute('aria-expanded', 'false');
                node.innerHTML =
                    '<div class="rm-node__ring">' +
                        '<svg viewBox="0 0 36 36">' +
                            '<circle class="rm-node__ring-bg" cx="18" cy="18" r="15"/>' +
                            '<circle class="rm-node__ring-fill" cx="18" cy="18" r="15" stroke-dasharray="' + calcDashArray(p.checked, p.total) + '"/>' +
                        '</svg>' +
                        '<span class="rm-node__ring-pct">' + pct + '%</span>' +
                    '</div>' +
                    '<div class="rm-node__info">' +
                        '<div class="rm-node__title">' + domain.title + '</div>' +
                        '<div class="rm-node__count">' + p.total + ' topics</div>' +
                    '</div>' +
                    '<svg class="rm-node__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';

                nodesWrap.appendChild(node);

                // Detail panel (hidden by default)
                var detail = document.createElement('div');
                detail.className = 'rm-detail';
                detail.id = 'rm-detail-' + domain.id;
                detail.innerHTML =
                    '<div class="rm-detail__inner">' +
                        '<div class="rm-detail__content">' +
                            '<div class="rm-detail__topics"></div>' +
                        '</div>' +
                    '</div>';
                var topicsGrid = detail.querySelector('.rm-detail__topics');
                domain.topics.forEach(function (t) {
                    topicsGrid.appendChild(renderTopic(t, 'flowchart'));
                });
                nodesWrap.appendChild(detail);
            });

            tierEl.appendChild(nodesWrap);
            container.appendChild(tierEl);
        });
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
                var pctEl = node.querySelector('.rm-node__ring-pct');
                if (ring) ring.setAttribute('stroke-dasharray', calcDashArray(p.checked, p.total));
                if (pctEl) pctEl.textContent = pct + '%';
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
        var tier = node.closest('.rm-tier');
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
            var node = document.querySelector('.rm-node[data-domain="' + domain.id + '"]');
            if (node) node.style.display = show ? '' : 'none';

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

    // ================================================================
    // BACK TO TOP BUTTON
    // ================================================================
    var btt = document.getElementById('gBtt');
    if (btt) {
        window.addEventListener('scroll', function () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            btt.classList.toggle('is-visible', scrollTop > 400);
        });

        btt.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

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
