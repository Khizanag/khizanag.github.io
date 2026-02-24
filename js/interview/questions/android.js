var QUESTION_BANK_ANDROID = [
    // ==================== KOTLIN (6) ====================
    {
        "topic": "kotlin",
        "level": 0,
        "question": "What is Kotlin's null safety system and how does it prevent NullPointerException?",
        "hint": "Think about nullable vs non-nullable types and the ? operator.",
        "answer": "Kotlin distinguishes nullable types (String?) from non-nullable types (String) at compile time. The compiler forces you to handle nullability explicitly using safe calls (?.), the Elvis operator (?:), or non-null assertions (!!).\nThis eliminates most NullPointerExceptions by catching potential null dereferences at compile time rather than runtime."
    },
    {
        "topic": "kotlin",
        "level": 0,
        "question": "What are data classes in Kotlin and what do they auto-generate?",
        "hint": "Think about boilerplate code for model/POJO classes.",
        "answer": "Data classes are declared with the data keyword and automatically generate equals(), hashCode(), toString(), copy(), and componentN() functions based on properties declared in the primary constructor.\nThey are ideal for holding data and eliminate the boilerplate required in Java POJOs."
    },
    {
        "topic": "kotlin",
        "level": 1,
        "question": "What are sealed classes and how do they differ from enums?",
        "hint": "Think about restricted class hierarchies and when expressions.",
        "answer": "Sealed classes restrict which classes can inherit from them — all subclasses must be defined in the same module. Unlike enums, each subclass can hold different data and have multiple instances.\nThe compiler can verify exhaustive when expressions, ensuring all cases are handled without a default branch."
    },
    {
        "topic": "kotlin",
        "level": 2,
        "question": "How do extension functions work internally and what are their limitations?",
        "hint": "Think about static dispatch vs dynamic dispatch.",
        "answer": "Extension functions are compiled to static methods where the receiver object is passed as the first argument. They are resolved statically at compile time, not dynamically at runtime.\nThis means they cannot be overridden in subclasses, cannot access private or protected members, and if a member function has the same signature, the member always wins."
    },
    {
        "topic": "kotlin",
        "level": 3,
        "question": "Explain Kotlin's scope functions (let, run, with, apply, also) and when to use each.",
        "hint": "Think about the context object (this vs it) and return value (context vs lambda result).",
        "answer": "Scope functions differ in how they reference the context object and what they return:\n- let: refers to object as 'it', returns lambda result — use for null checks and transformations\n- run: refers as 'this', returns lambda result — use for object configuration + computing a result\n- with: refers as 'this', returns lambda result — use for calling multiple methods on an object\n- apply: refers as 'this', returns the object — use for object configuration\n- also: refers as 'it', returns the object — use for side effects like logging"
    },
    {
        "topic": "kotlin",
        "level": 4,
        "question": "How does Kotlin's delegation pattern work with 'by' keyword, and what are delegated properties?",
        "hint": "Think about class delegation and property delegates like lazy, observable, and map.",
        "answer": "The 'by' keyword enables two forms of delegation. Class delegation forwards interface methods to a backing object, avoiding inheritance. Property delegation offloads getter/setter logic to a delegate object implementing getValue/setValue operators.\nBuilt-in delegates include lazy (thread-safe initialization), observable (change callbacks), vetoable (change validation), and map (storing properties in a map)."
    },

    // ==================== JETPACK COMPOSE (6) ====================
    {
        "topic": "jetpack-compose",
        "level": 0,
        "question": "What is a Composable function and how does it differ from traditional Android Views?",
        "hint": "Think about declarative vs imperative UI.",
        "answer": "A Composable function is annotated with @Composable and describes UI declaratively — you state what the UI should look like for a given state, and Compose handles rendering and updates.\nUnlike traditional Views which are objects you mutate imperatively (setText, setVisibility), Composables are functions that re-execute when state changes, producing a new UI description each time."
    },
    {
        "topic": "jetpack-compose",
        "level": 1,
        "question": "How does state management work in Jetpack Compose?",
        "hint": "Think about remember, mutableStateOf, and state hoisting.",
        "answer": "Compose uses mutableStateOf() to create observable state that triggers recomposition when changed. The remember function preserves state across recompositions.\nState hoisting moves state up to a parent composable, making children stateless and reusable. The pattern is: state flows down as parameters, events flow up as callbacks. For state surviving configuration changes, use rememberSaveable."
    },
    {
        "topic": "jetpack-compose",
        "level": 1,
        "question": "What is recomposition and how can you optimize it?",
        "hint": "Think about when Compose re-executes composable functions and how to skip unnecessary work.",
        "answer": "Recomposition is the process of re-executing composable functions when their inputs (state) change. Compose skips recomposition for composables whose inputs haven't changed.\nTo optimize: use stable/immutable types so Compose can detect unchanged inputs, pass lambda parameters as method references, avoid creating objects during composition, and use derivedStateOf to reduce unnecessary state reads."
    },
    {
        "topic": "jetpack-compose",
        "level": 2,
        "question": "How do Modifiers work in Compose and why does their order matter?",
        "hint": "Think about how modifiers chain and wrap each composable.",
        "answer": "Modifiers are an ordered, immutable chain applied outside-in. Each modifier wraps the previous one, so order matters significantly.\nFor example, Modifier.padding(16.dp).background(Color.Red) adds padding first then draws background (fills padded area), while Modifier.background(Color.Red).padding(16.dp) draws background first then adds padding (background only behind content)."
    },
    {
        "topic": "jetpack-compose",
        "level": 3,
        "question": "What are side effects in Compose and how do LaunchedEffect, DisposableEffect, and SideEffect differ?",
        "hint": "Think about running non-composable code tied to composition lifecycle.",
        "answer": "Side effects run code that escapes the composable scope:\n- LaunchedEffect(key): launches a coroutine scoped to composition; cancels and relaunches when key changes\n- DisposableEffect(key): sets up resources and provides onDispose for cleanup (e.g., listeners)\n- SideEffect: runs on every successful recomposition, used to publish Compose state to non-Compose code\n- rememberCoroutineScope: provides a scope for event-triggered coroutines"
    },
    {
        "topic": "jetpack-compose",
        "level": 4,
        "question": "How does Compose Navigation work and how do you handle deep links and nested navigation graphs?",
        "hint": "Think about NavHost, NavController, and route-based navigation.",
        "answer": "Compose Navigation uses a NavHost with a NavController and string-based routes. You define destinations as composable blocks within NavHost and navigate using navController.navigate(route).\nArguments are passed via route patterns (e.g., \"detail/{id}\"). Nested graphs group related destinations with navigation() blocks. Deep links are declared per destination using deepLinks parameter and matched by URI pattern."
    },

    // ==================== ANDROID LIFECYCLE (5) ====================
    {
        "topic": "android-lifecycle",
        "level": 0,
        "question": "What are the main Activity lifecycle callbacks and their order?",
        "hint": "Think about what happens when an Activity is created, becomes visible, and goes to background.",
        "answer": "The lifecycle callbacks in order are: onCreate (initialize), onStart (becoming visible), onResume (interactive/foreground), onPause (losing focus), onStop (no longer visible), onDestroy (being destroyed).\nWhen navigating away, onPause and onStop are called. Returning calls onRestart, onStart, onResume. onCreate and onDestroy are called once per instance."
    },
    {
        "topic": "android-lifecycle",
        "level": 1,
        "question": "How does the Fragment lifecycle differ from the Activity lifecycle?",
        "hint": "Think about the additional callbacks related to view creation and the host Activity.",
        "answer": "Fragments have additional callbacks: onAttach (bound to Activity), onCreateView (inflate layout), onViewCreated (view ready), onDestroyView (view destroyed but fragment alive).\nA Fragment can have its view destroyed and recreated without the Fragment itself being destroyed (e.g., in a back stack). The view lifecycle is a subset of the Fragment lifecycle."
    },
    {
        "topic": "android-lifecycle",
        "level": 2,
        "question": "What is ViewModel and how does it survive configuration changes?",
        "hint": "Think about the ViewModelStore and its association with the lifecycle owner.",
        "answer": "ViewModel is a lifecycle-aware component that survives configuration changes like screen rotation. It's stored in a ViewModelStore owned by the Activity or Fragment.\nDuring configuration change, the old Activity is destroyed but the ViewModelStore is retained, so the new Activity receives the same ViewModel instance. ViewModel is cleared only when the Activity finishes permanently."
    },
    {
        "topic": "android-lifecycle",
        "level": 3,
        "question": "What is process death and how do you handle it to preserve user state?",
        "hint": "Think about SavedStateHandle, onSaveInstanceState, and what data survives.",
        "answer": "Process death occurs when the OS kills a backgrounded app to reclaim memory. All in-memory state including ViewModels is lost, but the system saves the Activity's state via onSaveInstanceState.\nUse SavedStateHandle in ViewModel for critical UI state, rememberSaveable in Compose, and persist important data to disk. Only small, serializable state should go in saved state (under 1MB total)."
    },
    {
        "topic": "android-lifecycle",
        "level": 4,
        "question": "How do configuration changes work internally and what strategies exist beyond the default recreate behavior?",
        "hint": "Think about configChanges manifest attribute, the recreation flow, and Compose's approach.",
        "answer": "By default, Android destroys and recreates the Activity on configuration changes (rotation, locale, dark mode). The system saves view state via onSaveInstanceState and retains ViewModels.\nYou can suppress recreation by declaring android:configChanges in the manifest, then handling changes in onConfigurationChanged — but this is discouraged as it's error-prone. In Compose, recomposition naturally adapts to new configurations."
    },

    // ==================== ANDROID ARCHITECTURE (5) ====================
    {
        "topic": "android-arch",
        "level": 1,
        "question": "How does MVVM pattern work in Android and what role does each layer play?",
        "hint": "Think about View, ViewModel, and Model responsibilities and data flow direction.",
        "answer": "In MVVM, the View (Activity/Fragment/Composable) observes UI state from the ViewModel and sends user events to it. The ViewModel holds UI state, handles business logic, and communicates with the Model layer (repositories/use cases).\nData flows unidirectionally: user action -> ViewModel processes -> state updates -> View re-renders. The ViewModel has no reference to the View."
    },
    {
        "topic": "android-arch",
        "level": 2,
        "question": "What is MVI architecture and how does it differ from MVVM?",
        "hint": "Think about unidirectional data flow with intents, state, and side effects.",
        "answer": "MVI (Model-View-Intent) enforces strict unidirectional data flow. The View emits Intents (user actions), the ViewModel processes them through a reducer to produce a single immutable UI State, and the View renders that state.\nUnlike MVVM which may expose multiple observable fields, MVI uses a single state object, making state changes predictable and debuggable. Side effects (navigation, toasts) are handled separately as one-time events."
    },
    {
        "topic": "android-arch",
        "level": 2,
        "question": "What is Clean Architecture in Android and how are its layers structured?",
        "hint": "Think about dependency rules and the three main layers.",
        "answer": "Clean Architecture divides the app into three layers: Domain (innermost — use cases, entities, repository interfaces, pure Kotlin), Data (implements repository interfaces, manages API/database/cache), and Presentation (UI + ViewModels).\nDependencies point inward: Presentation depends on Domain, Data depends on Domain, but Domain depends on nothing. This enables testability and swappable data sources."
    },
    {
        "topic": "android-arch",
        "level": 3,
        "question": "What is the Repository pattern and how does it manage multiple data sources?",
        "hint": "Think about abstracting data origins and caching strategies.",
        "answer": "The Repository pattern provides a clean API for data access, hiding whether data comes from network, database, or cache. It typically implements a single-source-of-truth strategy: fetch from network, save to local database, and expose database as the source via Flow.\nThe repository interface lives in the domain layer while the implementation lives in the data layer, allowing easy testing with fakes."
    },
    {
        "topic": "android-arch",
        "level": 4,
        "question": "How does Hilt work for dependency injection in Android and what are its main annotations?",
        "hint": "Think about component hierarchy, scoping, and module bindings.",
        "answer": "Hilt is built on Dagger and provides a standard component hierarchy tied to Android lifecycles. Key annotations: @HiltAndroidApp (Application), @AndroidEntryPoint (Activity/Fragment), @HiltViewModel (ViewModel), @Inject (constructor injection), @Module/@InstallIn (provide bindings), @Provides (factory methods), @Binds (interface-to-impl mapping).\nComponents are scoped: @Singleton (app), @ActivityScoped, @ViewModelScoped. Hilt auto-generates Dagger components with compile-time safety."
    },

    // ==================== COROUTINES (6) ====================
    {
        "topic": "coroutines",
        "level": 0,
        "question": "What is a suspending function and how does it differ from a regular function?",
        "hint": "Think about the suspend keyword and non-blocking behavior.",
        "answer": "A suspending function is marked with the suspend keyword and can pause execution without blocking the thread. When suspended, the thread is free to do other work.\nIt can only be called from another suspending function or a coroutine. Under the hood, the compiler transforms it into a state machine with Continuation-passing style (CPS)."
    },
    {
        "topic": "coroutines",
        "level": 1,
        "question": "What are coroutine Dispatchers and when would you use each?",
        "hint": "Think about which thread pool each dispatcher uses.",
        "answer": "Dispatchers determine which thread a coroutine runs on:\n- Dispatchers.Main: Android main/UI thread — for UI updates\n- Dispatchers.IO: optimized for blocking I/O (network, disk) — large thread pool\n- Dispatchers.Default: optimized for CPU-intensive work (sorting, parsing) — cores-sized thread pool\n- Dispatchers.Unconfined: starts in caller thread, resumes in whatever thread — rarely used in production"
    },
    {
        "topic": "coroutines",
        "level": 2,
        "question": "What is structured concurrency and why is it important?",
        "hint": "Think about parent-child coroutine relationships and cancellation.",
        "answer": "Structured concurrency means every coroutine has a parent scope and follows its lifecycle. When a parent scope is cancelled, all child coroutines are cancelled too. If a child fails, it cancels the parent and siblings by default.\nThis prevents coroutine leaks, ensures proper cleanup, and makes error handling predictable. In Android, viewModelScope and lifecycleScope provide structured concurrency tied to component lifetimes."
    },
    {
        "topic": "coroutines",
        "level": 2,
        "question": "What is Kotlin Flow and how does it differ from LiveData?",
        "hint": "Think about cold streams, operators, and coroutine integration.",
        "answer": "Flow is a cold asynchronous stream built on coroutines. Unlike LiveData, Flow supports transformation operators (map, filter, combine), runs on configurable dispatchers via flowOn, and doesn't require Android dependencies.\nFlow is cold — it only emits when collected. In modern Android, the pattern is to use Flow in data/domain layers and convert to StateFlow in the ViewModel for UI consumption."
    },
    {
        "topic": "coroutines",
        "level": 3,
        "question": "What is StateFlow and how does it compare to SharedFlow?",
        "hint": "Think about hot streams, replay behavior, and state vs events.",
        "answer": "StateFlow is a hot stream that always holds a current value, emits to new collectors immediately, and skips duplicate values (conflated). It's ideal for UI state.\nSharedFlow is configurable: you control replay count, buffer size, and overflow strategy. It doesn't skip duplicates and doesn't require an initial value. Use StateFlow for state and SharedFlow for events where you might need replay=0."
    },
    {
        "topic": "coroutines",
        "level": 4,
        "question": "How does coroutine exception handling work with SupervisorJob and CoroutineExceptionHandler?",
        "hint": "Think about how exceptions propagate in parent-child hierarchies.",
        "answer": "By default, an exception in a child coroutine cancels the parent and all siblings. SupervisorJob changes this: a failing child doesn't affect siblings or the parent.\nCoroutineExceptionHandler is a last-resort handler for uncaught exceptions. For launch, exceptions propagate up; for async, exceptions are deferred until await(). In Android, viewModelScope uses SupervisorJob so one failing coroutine doesn't cancel others."
    },

    // ==================== ANDROID STORAGE (4) ====================
    {
        "topic": "android-storage",
        "level": 0,
        "question": "What is Room and what are its main components?",
        "hint": "Think about the abstraction over SQLite.",
        "answer": "Room is an ORM over SQLite with compile-time query verification. Its three main components are: @Entity (defines a table), @Dao (interface with @Query, @Insert, @Update, @Delete methods), and @Database (abstract class extending RoomDatabase that lists entities and provides DAOs).\nRoom supports Flow return types for reactive queries that automatically emit new data when tables change."
    },
    {
        "topic": "android-storage",
        "level": 1,
        "question": "What is DataStore and why is it preferred over SharedPreferences?",
        "hint": "Think about async operations and data consistency.",
        "answer": "DataStore is a modern data storage solution that uses coroutines and Flow for asynchronous, non-blocking reads and writes. Unlike SharedPreferences, it doesn't block the UI thread, provides transactional updates with atomicity guarantees, and reports errors via exceptions instead of silent failures.\nPreferences DataStore stores key-value pairs, while Proto DataStore uses Protocol Buffers for typed, schema-defined data."
    },
    {
        "topic": "android-storage",
        "level": 2,
        "question": "What are the limitations of SharedPreferences and when is it still acceptable to use?",
        "hint": "Think about threading issues and data size.",
        "answer": "SharedPreferences has several limitations: apply() is async but can block the UI thread during Activity stop, commit() blocks the calling thread, it loads the entire file into memory on first access, and it lacks type safety.\nIt's still acceptable for very simple cases in legacy code. For new code, DataStore is preferred. SharedPreferences should never store large datasets — use Room for structured data."
    },
    {
        "topic": "android-storage",
        "level": 3,
        "question": "What are Content Providers and when would you implement one?",
        "hint": "Think about sharing data between applications.",
        "answer": "Content Providers expose structured data to other applications via a standard URI-based interface (content:// scheme). They abstract the underlying storage (SQLite, files, network).\nImplement one when sharing data across apps or integrating with system components like contacts or media store. They support CRUD operations, permission-based access control, and are also used internally by libraries like WorkManager."
    },

    // ==================== ANDROID NETWORKING (3) ====================
    {
        "topic": "android-networking",
        "level": 1,
        "question": "How does Retrofit work and what are its key features?",
        "hint": "Think about interface-based API definitions and converters.",
        "answer": "Retrofit turns HTTP API definitions into Kotlin interfaces using annotations like @GET, @POST, @Path, @Query, and @Body. It uses converter factories (Gson, Moshi, Kotlinx Serialization) for JSON parsing and call adapter factories for coroutine support.\nOkHttp handles the actual networking underneath, and interceptors can add headers, logging, or authentication to every request."
    },
    {
        "topic": "android-networking",
        "level": 2,
        "question": "How does Kotlinx Serialization compare to Gson and Moshi for JSON parsing?",
        "hint": "Think about compile-time processing vs reflection.",
        "answer": "Kotlinx Serialization uses a compiler plugin to generate serializers at compile time, making it reflection-free and fast. It natively understands Kotlin features like default values, nullability, and sealed classes.\nGson uses runtime reflection (slower, ignores Kotlin defaults). Moshi with codegen is also compile-time but is third-party. Kotlinx Serialization is recommended for Kotlin-first projects and works across Kotlin Multiplatform."
    },
    {
        "topic": "android-networking",
        "level": 3,
        "question": "How do you implement an offline-first architecture in Android?",
        "hint": "Think about the single source of truth pattern and network synchronization.",
        "answer": "Offline-first uses the local database (Room) as the single source of truth. The pattern: UI observes Room via Flow, the repository fetches from network and writes to Room, and Room emissions automatically update the UI.\nFor sync: track pending changes with a sync status column, use WorkManager for reliable background sync, and handle conflict resolution with timestamps or server-wins strategy."
    },

    // ==================== ANDROID TESTING (3) ====================
    {
        "topic": "android-testing",
        "level": 1,
        "question": "How do you write unit tests for a ViewModel using JUnit and coroutine test utilities?",
        "hint": "Think about TestDispatcher, runTest, and testing StateFlow.",
        "answer": "Use kotlinx-coroutines-test with runTest to test suspending functions. Replace Dispatchers.Main with StandardTestDispatcher via Dispatchers.setMain() in @Before. Create the ViewModel with fake repositories, trigger actions, then assert StateFlow values.\nUse Turbine library for easier Flow testing with awaitItem(). Always call Dispatchers.resetMain() in @After to clean up."
    },
    {
        "topic": "android-testing",
        "level": 2,
        "question": "What is Espresso and how do you write UI tests with it?",
        "hint": "Think about view matchers, actions, and assertions.",
        "answer": "Espresso is Android's UI testing framework that synchronizes with the main thread and idle resources. Tests follow the pattern: onView(withId(R.id.button)).perform(click()).check(matches(isDisplayed())).\nViewMatchers find views, ViewActions interact with them, and ViewAssertions verify state. Use IdlingResource for async operations. Espresso auto-waits for UI thread to be idle, making tests reliable."
    },
    {
        "topic": "android-testing",
        "level": 3,
        "question": "How do you test Jetpack Compose UI with the Compose testing library?",
        "hint": "Think about ComposeTestRule, semantic nodes, and test tags.",
        "answer": "Compose testing uses ComposeTestRule (createComposeRule()) to render composables in isolation. Find nodes with onNodeWithText, onNodeWithTag, or onNodeWithContentDescription. Perform actions with performClick(), performTextInput(). Assert with assertIsDisplayed(), assertTextEquals().\nUse Modifier.testTag(\"tag\") for reliable node identification. Unlike Espresso, Compose testing works on the semantic tree, making tests more stable."
    },

    // ==================== ANDROID PERFORMANCE (1) ====================
    {
        "topic": "android-performance",
        "level": 2,
        "question": "What causes ANR (Application Not Responding) and how do you prevent it?",
        "hint": "Think about the main thread and time limits.",
        "answer": "ANR occurs when the main thread is blocked for 5+ seconds (input event) or a BroadcastReceiver doesn't finish in 10 seconds.\nPrevention: move network, database, and file operations to background threads using coroutines (Dispatchers.IO), use WorkManager for long-running tasks, keep RecyclerView adapters efficient with DiffUtil, and profile with StrictMode to detect main thread violations."
    },

    // ==================== ANDROID SECURITY (1) ====================
    {
        "topic": "android-security",
        "level": 3,
        "question": "How do you securely store sensitive data on Android using EncryptedSharedPreferences and the Keystore system?",
        "hint": "Think about the AndroidX Security library and key management.",
        "answer": "EncryptedSharedPreferences (from androidx.security.crypto) wraps SharedPreferences with AES-256 encryption for both keys and values. It uses the Android Keystore system to generate and store encryption keys in hardware-backed secure storage.\nCreate a master key with MasterKey.Builder using AES256_GCM_SPEC, then pass it to EncryptedSharedPreferences.create(). For more sensitive data, use the Keystore directly to ensure keys never leave secure hardware."
    },
];
