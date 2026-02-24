var PSD_QUESTIONS = [
  {
    "id": 1,
    "category": "Backlog Management",
    "difficulty": "Easy",
    "question": "When can Product Backlog Refinement occur?",
    "options": [
      "Only during Sprint Planning",
      "Anytime during the Sprint",
      "Only during Refinement meetings planned by the Product Owner",
      "Before Sprint Planning"
    ],
    "correct": 1,
    "explanation": "Product Backlog refinement is an ongoing activity. It can happen at any time during the Sprint. It is not a formal Scrum event — the Scrum Guide says it is an ongoing activity to add details, order, and size to items.",
    "source": "Scrum Guide 2020 — Product Backlog section",
    "tip": "Refinement is an ACTIVITY, not an EVENT. It can happen anytime."
  },
  {
    "id": 2,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What would NOT be considered Refactoring?",
    "options": [
      "Reordering method parameters to improve readability",
      "Extracting interfaces",
      "Renaming things to be more logical",
      "Changing external interfaces or APIs"
    ],
    "correct": 3,
    "explanation": "Refactoring is changing the internal structure of code without changing its external behavior. Changing external interfaces or APIs changes the external behavior and contracts, so it is NOT refactoring.",
    "source": "Martin Fowler — Refactoring (PSD curriculum)",
    "tip": "If external behavior changes, it's NOT refactoring. Refactoring = internal restructuring only."
  },
  {
    "id": 3,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "Your Scrum Team is one of seven teams working on a Software Product. All teams use the same Version Control System. Which is the best approach to deliver a high-quality Increment?",
    "options": [
      "Developers should perform a combination of local and private builds",
      "Each team's automated build is integrated toward the end of the Sprint",
      "There is one automated and integrated build for all seven teams",
      "Each team should have its own automated build"
    ],
    "correct": 2,
    "explanation": "When multiple teams work on the same product, there should be one integrated build for all teams. This ensures that integration issues are detected immediately and the combined Increment meets quality standards.",
    "source": "Scrum.org PSD Course — Continuous Integration at Scale",
    "tip": "One product = one integrated build. Separate builds hide integration issues until too late."
  },
  {
    "id": 4,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "Who creates documentation included with an Increment?",
    "options": [
      "The Developers",
      "Increments do not need documentation",
      "The Product Owner",
      "Technical Writers"
    ],
    "correct": 0,
    "explanation": "The Developers are responsible for all aspects of the Increment, including any documentation that is part of the Definition of Done. There is no separate documentation team in Scrum.",
    "source": "Scrum Guide 2020 — Developers section",
    "tip": "If documentation is in the DoD, the Developers create it. No handoffs."
  },
  {
    "id": 5,
    "category": "DevOps & Engineering",
    "difficulty": "Easy",
    "question": "What is a merge in a Version Control System?",
    "options": [
      "Copying a portion of code to isolate it from the original codebase",
      "Identifying a codebase as ready for distribution",
      "Triggering a deployment into Production",
      "Combining two or more versions of code into a single codebase"
    ],
    "correct": 3,
    "explanation": "A merge combines two or more versions of code into a single codebase. This is fundamental to collaborative development and Continuous Integration.",
    "source": "PSD Course — Version Control Systems",
    "tip": "Merge = combine code. Branch = isolate code. Tag = mark a version."
  },
  {
    "id": 6,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "Which three of the following are feedback loops in Scrum?",
    "options": [
      "Daily Scrum",
      "Release Planning",
      "Sprint Review",
      "Refinement Meeting",
      "Sprint Retrospective"
    ],
    "correct": [
      0,
      2,
      4
    ],
    "explanation": "The Daily Scrum, Sprint Review, and Sprint Retrospective are all Scrum events that serve as formal feedback loops. Release Planning and Refinement Meeting are not Scrum events.",
    "source": "Scrum Guide 2020 — Events section",
    "tip": "All Scrum events are inspect-and-adapt opportunities (feedback loops)."
  },
  {
    "id": 7,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "Which four types of tests can be included in an automated test harness?",
    "options": [
      "Performance",
      "Exploratory",
      "Unit",
      "Functional",
      "Manual regression",
      "Integration"
    ],
    "correct": [
      0,
      2,
      3,
      5
    ],
    "explanation": "Performance, Unit, Functional, and Integration tests can all be automated. Exploratory testing is by definition manual and creative. Manual regression is manual by name.",
    "source": "PSD Course — Automated Testing",
    "tip": "Exploratory testing CANNOT be automated — it relies on human creativity and intuition."
  },
  {
    "id": 8,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "Which concept is described by the Last Responsible Moment?",
    "options": [
      "Making decisions as soon as possible to close feedback loops",
      "Discover decisions to be made as soon as possible but postpone deciding to the latest reasonable moment",
      "The last moment in a Sprint when code changes are allowed",
      "Opening a learning window to validate hypotheses",
      "The last moment a Developer is responsible for quality"
    ],
    "correct": 1,
    "explanation": "The Last Responsible Moment means identifying decisions early but deferring the actual decision until the last point where not deciding would eliminate an important alternative. This maximizes the information available when the decision is made.",
    "source": "Lean Software Development — Mary & Tom Poppendieck",
    "tip": "Decide at the last RESPONSIBLE moment, not the last POSSIBLE moment. It's about maximizing information."
  },
  {
    "id": 9,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "Choose four desirable characteristics of a Unit Test.",
    "options": [
      "Includes exercising the persistence layer",
      "Makes assertions about only one logical concept",
      "Independent of others",
      "Test code is as small as possible",
      "Execution is fast"
    ],
    "correct": [
      1,
      2,
      3,
      4
    ],
    "explanation": "Good unit tests are fast, independent, make assertions about one concept, and have minimal code. They should NOT exercise the persistence layer — that would be an integration test.",
    "source": "PSD Course — Unit Testing Best Practices",
    "tip": "FIRST: Fast, Independent, Repeatable, Self-validating, Timely."
  },
  {
    "id": 10,
    "category": "DevOps & Engineering",
    "difficulty": "Easy",
    "question": "Why does a test written using TDD initially fail?",
    "options": [
      "Because the test has not been refactored",
      "Because it needs to be put into an automated test harness",
      "Because the tests are checked in before the Product code exists",
      "Because the Product code to satisfy the test does not yet exist"
    ],
    "correct": 3,
    "explanation": "In TDD, the test is written BEFORE the production code. The test initially fails (Red phase) because the code it tests doesn't exist yet. Then you write the minimum code to pass (Green), then refactor.",
    "source": "PSD Course — Test Driven Development",
    "tip": "Red → Green → Refactor. The test fails first because there's nothing to test yet."
  },
  {
    "id": 11,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "When do the Developers show their work to the Product Owner?",
    "options": [
      "Whenever the Product Owner asks",
      "During the Sprint Review",
      "Anytime the Developers need feedback from the Product Owner",
      "All of the above"
    ],
    "correct": 3,
    "explanation": "Developers can show their work to the Product Owner at any time — whenever the PO asks, during Sprint Review, or anytime they need feedback. There is no restriction on when collaboration can happen.",
    "source": "Scrum Guide 2020 — Scrum Team section",
    "tip": "Don't wait for Sprint Review to get feedback. Continuous collaboration is key."
  },
  {
    "id": 12,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What are possible benefits from practicing Test Driven Development (TDD)?",
    "options": [
      "It is a great way for Testers to contribute early",
      "It makes Integration Tests obsolete",
      "It helps break down complex problems into smaller ones",
      "It increases collaboration as it requires Pair Programming",
      "It might lead to better code as Refactoring is part of the TDD cycle",
      "It helps identify gaps in understanding the desired behavior"
    ],
    "correct": [
      2,
      4,
      5
    ],
    "explanation": "TDD helps decompose complex problems, leads to better code through refactoring, and reveals gaps in understanding. It does NOT make integration tests obsolete, doesn't require pair programming, and is not primarily a tester activity.",
    "source": "PSD Course — TDD Benefits",
    "tip": "TDD benefits: better design, gap identification, simpler code, automatic regression tests."
  },
  {
    "id": 13,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "Who decides the System Architecture of a Product developed using Scrum?",
    "options": [
      "The Architect chosen by the Scrum Team",
      "The Software Architect assigned to the Scrum Team",
      "The Developers with input from the Scrum Team and others",
      "The Chief Architect"
    ],
    "correct": 2,
    "explanation": "In Scrum, architecture decisions emerge from the Developers. They may get input from others, but the Developers make the technical decisions. There is no mandated architect role.",
    "source": "Scrum Guide 2020 — Developers section + Agile Principle 11",
    "tip": "Architecture emerges from self-managing teams. No separate architect role in Scrum."
  },
  {
    "id": 14,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "When using Continuous Integration, how often should the build be executed?",
    "options": [
      "Once per hour",
      "Whenever new or changed code is checked into version control",
      "Once per day",
      "Before the end of the Sprint",
      "Whenever new tests are created or uncertainty arises"
    ],
    "correct": 1,
    "explanation": "In CI, the build should be executed every time new or changed code is checked into version control. This provides immediate feedback on whether the integration was successful.",
    "source": "PSD Course — Continuous Integration",
    "tip": "CI = build on EVERY commit. If you build less frequently, you're not doing CI."
  },
  {
    "id": 15,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "Which of the following are advantages of Continuous Integration?",
    "options": [
      "Readability of code is improved",
      "Know immediately how a change affected the Product",
      "The feature-branch is generally kept in a buildable state",
      "Reduce effort and risk when integrating changes"
    ],
    "correct": [
      1,
      3
    ],
    "explanation": "CI advantages include immediate feedback on how changes affect the product and reduced integration effort/risk. Code readability is about coding standards, not CI. CI discourages long-lived feature branches.",
    "source": "PSD Course — CI Benefits",
    "tip": "CI = fast feedback + reduced integration risk. It encourages trunk-based development."
  },
  {
    "id": 16,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "Who determines how work is performed during the Sprint?",
    "options": [
      "The Scrum Master",
      "The Scrum Team",
      "Team Manager",
      "Subject matter experts",
      "The Developers"
    ],
    "correct": 4,
    "explanation": "The Developers are self-managing and determine how to turn Product Backlog items into Increments of value. No one outside the Scrum Team tells the Developers how to do their work.",
    "source": "Scrum Guide 2020 — Developers section",
    "tip": "PO decides WHAT, Developers decide HOW. Self-management is fundamental."
  },
  {
    "id": 17,
    "category": "Testing & Quality",
    "difficulty": "Easy",
    "question": "Who creates tests on a Scrum Team?",
    "options": [
      "The Product Owner",
      "The Developers",
      "Quality Assurance Specialists",
      "The Scrum Master"
    ],
    "correct": 1,
    "explanation": "The Developers create all tests. There is no separate QA role in Scrum. Everyone in the Developers is responsible for quality, including creating and running tests.",
    "source": "Scrum Guide 2020 — Developers section",
    "tip": "No separate QA in Scrum. Developers own ALL aspects of quality."
  },
  {
    "id": 18,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What is Test First Development (TFD)?",
    "options": [
      "Creating tests before satisfying them",
      "Testing existing code before adding more code to it",
      "Having the Tester write test plans before coding",
      "The continuous restructuring of Software to retain flexibility"
    ],
    "correct": 0,
    "explanation": "Test First Development means creating tests before writing the production code that will make them pass. It's the foundation of TDD.",
    "source": "PSD Course — Test First Development",
    "tip": "TFD = write test first, then code. TDD = TFD + Refactoring."
  },
  {
    "id": 19,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "Which is the most reliable form of technical documentation?",
    "options": [
      "A spreadsheet of passing manual tests",
      "The Developer's whiteboard",
      "UML model",
      "Release notes",
      "A help file",
      "A passing test harness with clear naming and vocabulary"
    ],
    "correct": 5,
    "explanation": "A passing test harness with clear naming is the most reliable documentation because it's executable, always up-to-date (tests fail if code changes), and self-verifying. Other forms of documentation can become stale.",
    "source": "PSD Course — Living Documentation",
    "tip": "Tests are 'living documentation' — they can't lie because they're verified automatically."
  },
  {
    "id": 20,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "While developing new functionality, you find a bug that has already been delivered to the customer. What do you do?",
    "options": [
      "Revise the tests so the bug no longer appears on the report",
      "Fix the bug",
      "Talk to the Product Owner",
      "Stub out the code that caused the bug"
    ],
    "correct": 2,
    "explanation": "When you find a bug in delivered functionality, you should talk to the Product Owner. The PO decides the priority of fixing it relative to other Product Backlog items. The PO manages what gets worked on.",
    "source": "Scrum Guide 2020 — Product Owner section",
    "tip": "Found a bug in production? Don't just fix it — inform the PO so they can prioritize it appropriately."
  },
  {
    "id": 21,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "Who has the final decision about the order of items in the Product Backlog?",
    "options": [
      "The Scrum Master",
      "The Stakeholders",
      "The Scrum Team",
      "The Developers",
      "The Product Owner"
    ],
    "correct": 4,
    "explanation": "The Product Owner is the sole person responsible for ordering the Product Backlog. Others can influence, but the final decision belongs to the PO.",
    "source": "Scrum Guide 2020 — Product Owner section",
    "tip": "ONE person orders the backlog — the Product Owner. Not a committee."
  },
  {
    "id": 22,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What are two differences between Unit Tests and Integration Tests?",
    "options": [
      "A Unit Test isolates a specific system behavior",
      "An Integration Test usually focuses on the integration of two or more units",
      "A Unit Test is automated",
      "An Integration Test runs overnight",
      "A Unit Test only runs on a Developer's workstation"
    ],
    "correct": [
      0,
      1
    ],
    "explanation": "Unit Tests isolate specific system behaviors (single units), while Integration Tests focus on how two or more units work together. Both can be automated, and both can run anywhere.",
    "source": "PSD Course — Testing Types",
    "tip": "Unit = isolated single thing. Integration = multiple things working together."
  },
  {
    "id": 23,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "How much time must a Product Owner spend with the Developers?",
    "options": [
      "100%",
      "Enough so that the PO is not surprised by the value delivered by the Increment",
      "40%, or more if the Stakeholders agree",
      "Any amount of time the Developers ask the PO to be present"
    ],
    "correct": 1,
    "explanation": "The Product Owner should spend enough time with the Developers so they are not surprised by the Increment's value. The Scrum Guide doesn't specify an exact percentage.",
    "source": "Scrum Guide 2020 — Product Owner section",
    "tip": "No magic percentage — enough to avoid surprises and ensure alignment."
  },
  {
    "id": 24,
    "category": "DevOps & Engineering",
    "difficulty": "Easy",
    "question": "What are the typical roles when practicing Pair Programming?",
    "options": [
      "Product Owner and Developer",
      "Business Analyst and Developer",
      "Tester and Developer",
      "Driver and Navigator",
      "Frontend and Backend"
    ],
    "correct": 3,
    "explanation": "In Pair Programming, the two roles are Driver (writes the code) and Navigator (reviews, thinks ahead, guides). They switch roles frequently.",
    "source": "PSD Course — Pair Programming",
    "tip": "Driver writes code, Navigator reviews and strategizes. Switch often!"
  },
  {
    "id": 25,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "True or False: When multiple teams work together on the same Product, each team should maintain a separate Product Backlog.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. When multiple teams work on the same product, they share ONE Product Backlog. This ensures alignment and a single source of truth for the product.",
    "source": "Scrum Guide 2020 — Product Backlog section",
    "tip": "One product = one Product Backlog, regardless of how many teams work on it."
  },
  {
    "id": 26,
    "category": "Backlog Management",
    "difficulty": "Hard",
    "question": "What are three of the best ways to address non-functional requirements?",
    "options": [
      "Scrum is for functional, front-end development only",
      "Important recurring non-functional requirements can be added to the Definition of Done",
      "Discuss them during a risk mitigation phase before development",
      "Include them in the Product Backlog",
      "Specific expectations can be used as Acceptance Criteria to specific PBIs",
      "Before the release, they should be tested in a hardening Sprint"
    ],
    "correct": [
      1,
      3,
      4
    ],
    "explanation": "Non-functional requirements are best addressed by: adding recurring ones to the DoD, including specific ones in the Product Backlog, and using them as acceptance criteria for PBIs. Hardening Sprints and separate risk phases are anti-patterns.",
    "source": "PSD Course — Non-functional Requirements",
    "tip": "NFRs go in DoD (recurring) or Product Backlog (specific). Never defer to hardening Sprints."
  },
  {
    "id": 27,
    "category": "DevOps & Engineering",
    "difficulty": "Easy",
    "question": "What is the primary purpose of Refactoring?",
    "options": [
      "Ensuring that all factors are constantly aligned",
      "Removing all bugs found during Regression Tests",
      "Making sure that the code is readable and maintainable",
      "Creating better technical documentation"
    ],
    "correct": 2,
    "explanation": "The primary purpose of refactoring is to improve the internal structure of code — making it more readable, maintainable, and easier to change — without altering its external behavior.",
    "source": "Martin Fowler — Refactoring",
    "tip": "Refactoring = clean up code, keep behavior. It's about maintainability."
  },
  {
    "id": 28,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "Which four are attributes of a good bug report?",
    "options": [
      "Expected results and observed results",
      "Includes build/version number where bug was found",
      "Includes code for a proposed fix",
      "Provides simple and repeatable reproduction steps",
      "Screenshots or pictures of the bug in action",
      "Explains some new system functionality desired"
    ],
    "correct": [
      0,
      1,
      3,
      4
    ],
    "explanation": "Good bug reports include: expected vs observed results, build/version number, reproducible steps, and screenshots. Proposed fixes and new feature requests don't belong in bug reports.",
    "source": "PSD Course — Quality Practices",
    "tip": "Good bug report = reproduce it + show what happened vs. what should happen."
  },
  {
    "id": 29,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "The practice of decomposing a requirement into failing tests is called:",
    "options": [
      "Regression Testing",
      "Object oriented requirements definition",
      "Acceptance Test Driven Development",
      "Behavior Driven Development"
    ],
    "correct": 2,
    "explanation": "Acceptance Test Driven Development (ATDD) is the practice of decomposing requirements into failing acceptance tests. Tests are written before code, expressing the desired behavior as testable criteria.",
    "source": "PSD Course — ATDD",
    "tip": "ATDD = requirements as failing tests. BDD = requirements in Given-When-Then language."
  },
  {
    "id": 30,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What is a mock object?",
    "options": [
      "A test object that mimics the behavior of a dependency in the system under test",
      "A mock helps you create a build script",
      "Mocks, stubs, dummies, fakes, and shims are all the same",
      "A mock is a way to initialize the database for testing"
    ],
    "correct": 0,
    "explanation": "A mock object simulates the behavior of real objects in controlled ways. It's used to isolate the system under test from its dependencies, enabling focused unit testing.",
    "source": "PSD Course — Test Doubles",
    "tip": "Mock = simulates behavior + can verify interactions. Stub = just returns predefined data."
  },
  {
    "id": 31,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "Which four are benefits of Test Driven Development?",
    "options": [
      "It improves quality and reduces bugs",
      "It reduces the cost of maintenance over time",
      "It promotes good design and separation of concerns",
      "It ensures no defects are present in the code",
      "It causes you to construct a test harness that can be automated"
    ],
    "correct": [
      0,
      1,
      2,
      4
    ],
    "explanation": "TDD improves quality, reduces maintenance costs, promotes good design, and creates an automated test harness. However, it does NOT guarantee zero defects.",
    "source": "PSD Course — TDD Benefits",
    "tip": "TDD doesn't guarantee zero bugs — it significantly reduces them and improves design."
  },
  {
    "id": 32,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "Which are three attributes of a bad bug report?",
    "options": [
      "Vague statements or untested assumptions",
      "Generic titles",
      "Simple and repeatable reproduction steps",
      "Assigning blame",
      "One bug per report"
    ],
    "correct": [
      0,
      1,
      3
    ],
    "explanation": "Bad bug reports have vague statements, generic titles, and assign blame. Good reports have reproducible steps and focus on one bug per report.",
    "source": "PSD Course — Quality Practices",
    "tip": "Bad report = vague + blaming + no steps. Good report = specific + neutral + reproducible."
  },
  {
    "id": 33,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "When using Scrum, can a Scrum Team use Continuous Delivery?",
    "options": [
      "Yes, there is nothing in Scrum that conflicts with Continuous Delivery",
      "No, because the PO may not be available each time a PBI is done",
      "No, because the Increment must be approved at Sprint Review first",
      "No, because Stakeholders may have already seen features",
      "No, because the Increment must fulfill the DoD first"
    ],
    "correct": 0,
    "explanation": "Yes! There is nothing in Scrum that conflicts with Continuous Delivery. Scrum requires a Done Increment each Sprint at minimum, but delivering more frequently is perfectly fine and encouraged.",
    "source": "Scrum Guide 2020 + PSD Course — Continuous Delivery",
    "tip": "Scrum sets a MINIMUM (Done Increment per Sprint). Delivering more often is great!"
  },
  {
    "id": 34,
    "category": "Testing & Quality",
    "difficulty": "Hard",
    "question": "You refactored part of the codebase for Application X. All Unit Tests pass with 50% Code Coverage. What can you infer?",
    "options": [
      "At least 50% of Application X functions correctly",
      "At most 50% of Application X functions correctly",
      "There are no bugs present in Application X",
      "You did not break any existing Unit Tests"
    ],
    "correct": 3,
    "explanation": "If all unit tests pass after refactoring, you can infer that you didn't break any existing tests. 50% coverage doesn't tell you about the other 50%, and passing tests don't guarantee zero bugs.",
    "source": "PSD Course — Code Coverage",
    "tip": "Passing tests = existing behavior preserved. Coverage % ≠ quality guarantee."
  },
  {
    "id": 35,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "What are two ways that regulatory compliance issues are dealt with in Scrum?",
    "options": [
      "They are addressed by a separate compliance team",
      "They are addressed along with functional development",
      "They are discussed and documented before feature development Sprints",
      "They are added to the Product Backlog and addressed in early Sprints, always requiring some business functionality"
    ],
    "correct": [
      1,
      3
    ],
    "explanation": "Regulatory compliance is addressed alongside functional development and included in the Product Backlog. There's no separate compliance phase or team in Scrum.",
    "source": "PSD Course — Compliance in Scrum",
    "tip": "Compliance = part of regular development, not a separate phase."
  },
  {
    "id": 36,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "True or False: User Stories are required in the Product Backlog.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. The Scrum Guide does not require User Stories. Product Backlog items can be in any format — User Stories, use cases, requirements, bugs, etc. The format is up to the team.",
    "source": "Scrum Guide 2020 — Product Backlog section",
    "tip": "User Stories are popular but NOT required by Scrum. Any format works."
  },
  {
    "id": 37,
    "category": "DevOps & Engineering",
    "difficulty": "Easy",
    "question": "In Software Development, DRY refers to:",
    "options": [
      "Code with low Cyclomatic Complexity",
      "Code with minimal duplication",
      "Code that has not been peer reviewed",
      "Code that has been peer reviewed"
    ],
    "correct": 1,
    "explanation": "DRY stands for 'Don't Repeat Yourself.' It means every piece of knowledge should have a single, authoritative representation in the system. Avoid code duplication.",
    "source": "Andy Hunt & Dave Thomas — The Pragmatic Programmer",
    "tip": "DRY = Don't Repeat Yourself. Every piece of logic should exist in exactly one place."
  },
  {
    "id": 38,
    "category": "Scrum Framework",
    "difficulty": "Hard",
    "question": "Which statements are true when multiple Scrum Teams work on a Software Product at the same time?",
    "options": [
      "All teams work in their own version control branch",
      "Code is merged at the Scrum of Scrums",
      "Teams must integrate their work before the end of the Sprint",
      "Teams coordinate their work to deliver a single Increment",
      "Each team should have a different Product Owner"
    ],
    "correct": [
      2,
      3
    ],
    "explanation": "Multiple teams working on the same product must integrate before the Sprint ends and coordinate to deliver a single, unified Increment. They share one PO and should not use isolated branches.",
    "source": "Scrum Guide 2020 — Increment section",
    "tip": "Multiple teams = one integrated Increment per Sprint. Integrate continuously, not at the end."
  },
  {
    "id": 39,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "Which answer best describes Behavior Driven Development (BDD)?",
    "options": [
      "A style of TDD focusing on user and system interactions",
      "A development style that accounts for leadership style among team members",
      "A way to organize Unit Tests based on class and method structures",
      "A technique for maintaining Regression Test harnesses"
    ],
    "correct": 0,
    "explanation": "BDD is a style of Test Driven Development that focuses on user and system interactions. It uses a shared language (Given-When-Then) to bridge the gap between business and technical teams.",
    "source": "Dan North — Introducing BDD",
    "tip": "BDD = TDD focused on behavior and user interactions, using Given-When-Then language."
  },
  {
    "id": 40,
    "category": "Backlog Management",
    "difficulty": "Medium",
    "question": "In what ways do Developers contribute to refining the Product Backlog?",
    "options": [
      "They ask questions to clarify the intent of PBIs",
      "They do not — Developers are only responsible for technical work",
      "They do not — the SM and PO are responsible for refinement",
      "They give input on technical dependencies",
      "They may update estimates for PBIs"
    ],
    "correct": [
      0,
      3,
      4
    ],
    "explanation": "Developers actively contribute to refinement by asking clarifying questions, providing input on technical dependencies, and updating estimates. Refinement is a collaborative activity.",
    "source": "Scrum Guide 2020 — Product Backlog section",
    "tip": "Developers are ACTIVE participants in refinement, not passive recipients."
  },
  {
    "id": 41,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "When should the Developers create their first automated build?",
    "options": [
      "Just before the Product is released",
      "Before writing the first line of code",
      "When the Product Owner asks for a build",
      "Just before the end of the Sprint",
      "As soon as there is code in the Version Control System"
    ],
    "correct": 4,
    "explanation": "The first automated build should be created as soon as there is code in version control. This establishes the CI pipeline early and provides immediate feedback.",
    "source": "PSD Course — CI Setup",
    "tip": "Set up CI immediately when code exists. Don't wait — early feedback is crucial."
  },
  {
    "id": 42,
    "category": "Testing & Quality",
    "difficulty": "Easy",
    "question": "Which types of tests can be automated?",
    "options": [
      "Exploratory",
      "Performance",
      "Unit",
      "Smoke",
      "Functional",
      "Integration"
    ],
    "correct": [
      1,
      2,
      3,
      4,
      5
    ],
    "explanation": "Performance, Unit, Smoke, Functional, and Integration tests can all be automated. Exploratory testing cannot be automated as it relies on human creativity, intuition, and real-time learning.",
    "source": "PSD Course — Test Automation",
    "tip": "Almost everything can be automated EXCEPT exploratory testing."
  },
  {
    "id": 43,
    "category": "Done & Quality",
    "difficulty": "Medium",
    "question": "How much work is required of the Developers to complete a Product Backlog Item selected during Sprint Planning?",
    "options": [
      "A proportional amount of time on analysis, design, development, and testing",
      "All development work and at least some testing",
      "As much as they can fit into the Sprint with remaining work deferred",
      "As much as is required to meet the Scrum Team's Definition of Done"
    ],
    "correct": 3,
    "explanation": "The Developers must do whatever work is necessary to meet the Definition of Done. The DoD defines the completeness standard — all work required by the DoD must be finished.",
    "source": "Scrum Guide 2020 — Definition of Done section",
    "tip": "Done means ALL the DoD criteria are met. No shortcuts, no partial credit."
  },
  {
    "id": 44,
    "category": "DevOps & Engineering",
    "difficulty": "Easy",
    "question": "Why might Developers choose to do Pair Programming?",
    "options": [
      "Information sharing and learning",
      "Improving Code Quality",
      "Efficiency",
      "It can be a fun way to work",
      "All of the above"
    ],
    "correct": 4,
    "explanation": "All of these are valid reasons for pair programming: knowledge sharing, improved quality, efficiency (fewer defects = less rework), and team enjoyment.",
    "source": "PSD Course — Pair Programming",
    "tip": "Pair programming benefits: quality + learning + fun + fewer bugs."
  },
  {
    "id": 45,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What is the role of Modeling in Scrum Teams?",
    "options": [
      "Models are not used by agile teams",
      "Models are maintained along with the Software as it emerges",
      "Models are assembly instructions for the Developers",
      "Modeling may be useful to increase shared understanding"
    ],
    "correct": 3,
    "explanation": "Modeling (UML, diagrams, etc.) can be useful in Scrum to increase shared understanding. It's a tool, not a mandate. Models should be lightweight and just enough.",
    "source": "PSD Course — Agile Modeling",
    "tip": "Model just enough to communicate. Don't over-model — it's a tool, not a deliverable."
  },
  {
    "id": 46,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "Which of the following are DevOps Practices?",
    "options": [
      "CI/CD",
      "Blue-Green Deployment",
      "Hypothesis Driven Development",
      "Vertical Teams",
      "Blameless Postmortem",
      "All of the above"
    ],
    "correct": 5,
    "explanation": "All of these are DevOps practices: CI/CD for automation, Blue-Green Deployment for zero-downtime releases, Hypothesis Driven Development for experimentation, Vertical Teams for end-to-end ownership, and Blameless Postmortems for learning.",
    "source": "PSD Course — DevOps Practices",
    "tip": "DevOps is about culture, automation, measurement, and sharing (CAMS)."
  },
  {
    "id": 47,
    "category": "DevOps & Engineering",
    "difficulty": "Easy",
    "question": "While practicing TDD, what is done after the test fails?",
    "options": [
      "Write the minimum amount of Product code to satisfy the test",
      "Refactor the test so the code passes",
      "Run it again to make sure it really fails",
      "Implement the required functionality",
      "Meet with the Business Analyst to ensure the test is correct"
    ],
    "correct": 0,
    "explanation": "After a test fails (Red), you write the MINIMUM amount of production code to make it pass (Green). Then you refactor. Writing minimal code keeps the design simple.",
    "source": "PSD Course — TDD Cycle",
    "tip": "Red → write MINIMUM code → Green → Refactor. Minimum is key!"
  },
  {
    "id": 48,
    "category": "Cross-functional Teams",
    "difficulty": "Medium",
    "question": "What tactic should a Scrum Master use to divide a group of 100 people into multiple Scrum Teams?",
    "options": [
      "Create teams based on their skills across multiple layers (database, UI, etc.)",
      "Ask the people to divide themselves into teams",
      "Ask the Product Owner to assign the people to teams"
    ],
    "correct": 1,
    "explanation": "Self-management starts from team formation. The Scrum Master should let the people self-organize into teams. This promotes ownership and ensures team members are committed to their team.",
    "source": "Scrum Guide 2020 — Self-management principles",
    "tip": "Self-management starts at team formation. Let people choose their own teams."
  },
  {
    "id": 49,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "Developers are blocked by an impediment in the middle of the Sprint. The impediment is outside their control. What should they do?",
    "options": [
      "Stop using Scrum until the impediment is resolved",
      "Complete what can be done and complete the rest during the hardening Sprint",
      "Immediately raise the issue to the Scrum Master",
      "Cancel the Sprint",
      "Drop the affected PBIs from the Sprint Plan"
    ],
    "correct": 2,
    "explanation": "When Developers face an impediment outside their control, they should raise it to the Scrum Master immediately. The SM is accountable for causing the removal of impediments.",
    "source": "Scrum Guide 2020 — Scrum Master section",
    "tip": "Can't solve it yourself? Raise it to the SM immediately. Don't wait for the Daily Scrum."
  },
  {
    "id": 50,
    "category": "Testing & Quality",
    "difficulty": "Easy",
    "question": "What is an Integration Test?",
    "options": [
      "A test of the user interface",
      "A test that runs during a CI build",
      "A test of a single unit of functionality",
      "A test of multiple units of functionality"
    ],
    "correct": 3,
    "explanation": "An Integration Test verifies that multiple units of functionality work correctly together. It tests the interaction between components, not individual units in isolation.",
    "source": "PSD Course — Testing Types",
    "tip": "Unit = one thing isolated. Integration = multiple things working together."
  },
  {
    "id": 51,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "Which of the following describes the focus of the first way of DevOps?",
    "options": [
      "The first set of practices a team should apply",
      "Using automated build and release pipelines",
      "To deliver value earlier and more frequently",
      "A tool-focused way of introducing DevOps",
      "A culture of continuous experimentation and learning"
    ],
    "correct": 2,
    "explanation": "The First Way of DevOps focuses on the performance of the entire system — delivering value to the customer earlier and more frequently. It's about optimizing left-to-right flow.",
    "source": "Gene Kim — The Phoenix Project / Three Ways of DevOps",
    "tip": "First Way = fast flow (left to right). Second Way = fast feedback. Third Way = experimentation."
  },
  {
    "id": 52,
    "category": "Done & Quality",
    "difficulty": "Medium",
    "question": "Which of the following is true about the Definition of Done?",
    "options": [
      "It might be a subject of discussion during Sprint Retrospective",
      "It is the sole responsibility of the Developers to define it",
      "It is synonymous with Acceptance Criteria",
      "It can only be extended; nothing can be removed",
      "It defines a state when the entire Increment is releasable"
    ],
    "correct": [
      0,
      4
    ],
    "explanation": "The DoD may be discussed in the Retrospective (to improve it) and it defines when the Increment is releasable. It's created by the Scrum Team (not just Developers), is NOT the same as acceptance criteria, and can be modified.",
    "source": "Scrum Guide 2020 — Definition of Done section",
    "tip": "DoD = applies to ALL PBIs equally. Acceptance Criteria = specific to ONE PBI."
  },
  {
    "id": 53,
    "category": "Done & Quality",
    "difficulty": "Medium",
    "question": "At Sprint Planning, the Scrum Team has NO clear standard to meet for releasable Software. What should they do?",
    "options": [
      "Ask the Product Owner to specify a Definition of Done",
      "Create a unique completion checklist for each item in the Sprint",
      "Specify a shared Definition of Done",
      "Ask the Scrum Master what they should do"
    ],
    "correct": 2,
    "explanation": "If there's no organizational standard, the Scrum Team must create a shared Definition of Done. It should be a common standard, not per-item checklists.",
    "source": "Scrum Guide 2020 — Definition of Done section",
    "tip": "No DoD = first order of business. Create one together as a Scrum Team."
  },
  {
    "id": 54,
    "category": "Scrum Framework",
    "difficulty": "Hard",
    "question": "True or False: Database design must be complete before coding starts to ensure a solid foundation.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. In Scrum and agile development, architecture (including database design) emerges incrementally. Big Design Up Front (BDUF) is an anti-pattern. Design evolves as you learn.",
    "source": "Agile Manifesto Principle 11 — Emergent Design",
    "tip": "No BDUF in Scrum. Design emerges incrementally through working software."
  },
  {
    "id": 55,
    "category": "Sprint Events",
    "difficulty": "Medium",
    "question": "The Daily Scrum happens every day. What would be three concerns if frequency were lowered to every two-three days?",
    "options": [
      "Opportunities to inspect and adapt the Sprint Backlog are lost",
      "The SM loses the ability to update the Gantt Chart properly",
      "Too much work is spent updating the Scrum Board before meeting",
      "Sprint Plan may become inaccurate",
      "Impediments are raised and resolved more slowly",
      "The PO cannot accurately report to the Stakeholders"
    ],
    "correct": [
      0,
      3,
      4
    ],
    "explanation": "Less frequent Daily Scrums would reduce opportunities to inspect/adapt, cause the Sprint Plan to drift, and slow impediment resolution. Gantt Charts and PO reporting are not related.",
    "source": "Scrum Guide 2020 — Daily Scrum section",
    "tip": "Daily = daily for a reason. Less frequent = slower feedback and more drift."
  },
  {
    "id": 56,
    "category": "Scrum Framework",
    "difficulty": "Hard",
    "question": "Which of the following are required by Scrum?",
    "options": [
      "Release Burnup Chart",
      "Burndown Chart",
      "Unit Tests",
      "Critical Path Analysis",
      "Refactoring",
      "Build automation",
      "None of the above"
    ],
    "correct": 6,
    "explanation": "None of these are required by Scrum! The Scrum Guide does not prescribe specific engineering practices or charts. Scrum is a framework, not a methodology. Teams choose their own practices.",
    "source": "Scrum Guide 2020 — entire document",
    "tip": "Scrum prescribes roles, events, artifacts, and rules. NOT specific practices or tools."
  },
  {
    "id": 57,
    "category": "Done & Quality",
    "difficulty": "Easy",
    "question": "Who is responsible for creation of the Definition of Done?",
    "options": [
      "The Scrum Master",
      "The Scrum Team",
      "The Developers",
      "The Product Owner"
    ],
    "correct": 1,
    "explanation": "If the DoD is not an organizational standard, the Scrum Team creates it. Note: the 2020 Scrum Guide says 'Scrum Team' not just 'Developers.'",
    "source": "Scrum Guide 2020 — Definition of Done section",
    "tip": "Scrum Team creates DoD. If org has a standard, that's the minimum."
  },
  {
    "id": 58,
    "category": "DevOps & Engineering",
    "difficulty": "Easy",
    "question": "Pair Programming is implemented by:",
    "options": [
      "Frontend and Backend Developers",
      "Tester and Developer",
      "Developer and Scrum Master",
      "Two persons working on the same PBI"
    ],
    "correct": 3,
    "explanation": "Pair Programming is two people working together at one workstation on the same task/PBI. It's not about specific role pairings.",
    "source": "PSD Course — Pair Programming",
    "tip": "Pair programming = any two people, one keyboard, same work item."
  },
  {
    "id": 59,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "Which of the following best describes Emergent Architecture?",
    "options": [
      "Starting development requires a clear understanding of architecture and Emergent Architecture describes creating this initial architecture",
      "The Software Architecture emerges solely from decisions the Developers make from a technical perspective",
      "In Scrum there is no Architecture role therefore architecture emerges naturally",
      "The desire to make decisions easier to change in the future and find the best possible point in time to make decisions",
      "Enterprise Architects must be involved to create the foundation"
    ],
    "correct": 3,
    "explanation": "Emergent Architecture is about making decisions at the right time (Last Responsible Moment) and keeping the architecture flexible so decisions are easy to change as you learn more.",
    "source": "PSD Course — Emergent Architecture",
    "tip": "Emergent ≠ no architecture. It means evolving architecture based on real needs, not speculation."
  },
  {
    "id": 60,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "Which are two benefits of establishing naming conventions for code?",
    "options": [
      "To make it easy to distinguish between different Software Products",
      "To make the code more readable",
      "To communicate the identity of the Developer who worked on the code",
      "To reduce friction in a shared codebase",
      "To ensure that abandoned functions are not created"
    ],
    "correct": [
      1,
      3
    ],
    "explanation": "Naming conventions make code more readable and reduce friction when multiple developers work on the same codebase. They're about code quality, not tracking developers.",
    "source": "PSD Course — Code Quality Standards",
    "tip": "Good naming = readable code + smooth collaboration. It's about the code, not the coder."
  },
  {
    "id": 61,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "Does delivering changes frequently and directly into Production help to reduce risk?",
    "options": [
      "Yes, because the changes are much smaller and easier to fix",
      "No, because each release means a risk, releasing more frequently increases it",
      "Yes, because frequent releases encourage automating the release process",
      "Yes, because you get earlier feedback and can learn faster",
      "No, the only way to tackle risks is by extensive risk management",
      "No, because releasing needs extensive testing which cannot be done frequently"
    ],
    "correct": [
      0,
      2,
      3
    ],
    "explanation": "Frequent delivery reduces risk because: changes are smaller (easier to fix), it encourages automation, and you get faster feedback. Small batches = less risk per batch.",
    "source": "PSD Course — Continuous Delivery & Risk",
    "tip": "Smaller, more frequent releases = LESS risk, not more. Small batches are safer."
  },
  {
    "id": 62,
    "category": "Agile Principles",
    "difficulty": "Easy",
    "question": "True or False: Best Practices are recommended to solve complex problems.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. In the Cynefin framework, best practices work for simple/obvious problems. Complex problems require emergent practices through experimentation. Scrum is for complex problems.",
    "source": "Dave Snowden — Cynefin Framework (PSD curriculum)",
    "tip": "Complex ≠ best practices. Complex = probe-sense-respond (experiment and learn)."
  },
  {
    "id": 63,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "When is Performance Testing most effectively performed?",
    "options": [
      "Often, throughout development of the Software",
      "Just before deploying to Production",
      "After coding is complete",
      "In Production"
    ],
    "correct": 0,
    "explanation": "Performance testing should be done often, throughout development. Waiting until the end makes performance issues expensive to fix. Early and continuous testing catches issues when they're cheap to address.",
    "source": "PSD Course — Performance Testing",
    "tip": "Test performance continuously, not just before release. Late discovery = expensive fix."
  },
  {
    "id": 64,
    "category": "Done & Quality",
    "difficulty": "Hard",
    "question": "Which three criteria are most helpful as part of a Scrum Team's Definition of Done?",
    "options": [
      "The Product is released at the end of every Sprint",
      "Acceptance Tests pass",
      "Code Review is done",
      "Regression Tests pass",
      "No impediments exist"
    ],
    "correct": [
      1,
      2,
      3
    ],
    "explanation": "Acceptance Tests passing, Code Review, and Regression Tests passing are concrete, verifiable quality criteria for the DoD. Releasing every Sprint is a business decision, and impediments are not a DoD item.",
    "source": "PSD Course — Definition of Done Best Practices",
    "tip": "Good DoD items are specific, verifiable, and quality-focused."
  },
  {
    "id": 65,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "A team has expressed requirements as a set of failing Acceptance Tests. What are two benefits?",
    "options": [
      "Improves quality in the requirement itself",
      "Clear Acceptance Criteria for each feature",
      "Using a code generation tool, the solution can be generated",
      "Promotes the use of DRY principle",
      "Tracking of competencies"
    ],
    "correct": [
      0,
      1
    ],
    "explanation": "Expressing requirements as acceptance tests improves requirement quality (forces precision) and provides clear acceptance criteria. This is the basis of ATDD.",
    "source": "PSD Course — ATDD Benefits",
    "tip": "Requirements as tests = precise requirements + built-in verification."
  },
  {
    "id": 66,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "Which is LEAST useful when measuring Code Maintainability?",
    "options": [
      "Function Points",
      "Cyclomatic Complexity",
      "Depth of Inheritance"
    ],
    "correct": 0,
    "explanation": "Function Points measure the functional size of software from a user perspective, not code maintainability. Cyclomatic Complexity and Depth of Inheritance directly relate to code complexity and maintainability.",
    "source": "PSD Course — Code Metrics",
    "tip": "Function Points = size/effort metric. Not about code structure or maintainability."
  },
  {
    "id": 67,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "Which two criteria are useful in deciding if something should be documented every Sprint?",
    "options": [
      "The Scrum Master requires it",
      "It is required by the Definition of Done",
      "The documentation is used to enhance and maintain the Software",
      "The Software tool being used requires it",
      "It has always been documented in the past"
    ],
    "correct": [
      1,
      2
    ],
    "explanation": "Documentation should be created if it's in the DoD or if it genuinely enhances/maintains the Software. Not because of tradition or tool requirements.",
    "source": "Scrum Guide 2020 — Empiricism + PSD Course",
    "tip": "Document if it adds value (DoD or maintenance). Not because 'we always have.'"
  },
  {
    "id": 68,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "What factor should be considered when establishing the Sprint length?",
    "options": [
      "The need of the team to learn on doing work and measuring results",
      "The frequency at which team formation can be changed",
      "The organization release schedule",
      "The organization has mandated similar length Sprints"
    ],
    "correct": 0,
    "explanation": "Sprint length should consider the team's learning needs and ability to measure results. Shorter Sprints = more learning cycles. It's not about org schedules or mandates.",
    "source": "Scrum Guide 2020 — The Sprint section",
    "tip": "Sprint length = balance between learning speed and delivering meaningful work."
  },
  {
    "id": 69,
    "category": "Testing & Quality",
    "difficulty": "Hard",
    "question": "What are some disadvantages of Code Coverage as a measurement for how well a system is tested?",
    "options": [
      "It only provides insights for programmers",
      "It does not ensure the most important/highest risk areas are being tested",
      "It could create incentives to write tests that simply increase coverage rather than find bugs",
      "It is too complicated to explain to Management",
      "Developers could stop adding more valuable tests once target coverage is achieved"
    ],
    "correct": [
      1,
      2,
      4
    ],
    "explanation": "Code Coverage has limitations: it doesn't guarantee important areas are tested, can incentivize gaming the metric, and may cause developers to stop at a target number rather than writing valuable tests.",
    "source": "PSD Course — Testing Metrics",
    "tip": "High coverage ≠ well tested. Coverage is a guide, not a goal."
  },
  {
    "id": 70,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "Which of the following are quality goals in Application Architecture?",
    "options": [
      "Build",
      "Security",
      "Design Pattern selection",
      "Scalability"
    ],
    "correct": [
      1,
      3
    ],
    "explanation": "Security and Scalability are quality attributes (non-functional requirements) that architecture must address. Build process and pattern selection are means, not quality goals.",
    "source": "PSD Course — Architecture Quality Attributes",
    "tip": "Architecture quality goals = -ilities: scalability, security, reliability, maintainability, etc."
  },
  {
    "id": 71,
    "category": "Backlog Management",
    "difficulty": "Easy",
    "question": "True or False: Stakeholders can be included in Product Backlog Refinement?",
    "options": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "True. Stakeholders CAN be included in Product Backlog refinement. The Scrum Guide says refinement involves the Developers and Product Owner, but doesn't prohibit others.",
    "source": "Scrum Guide 2020 — Product Backlog section",
    "tip": "Stakeholders can join refinement when their input adds value."
  },
  {
    "id": 72,
    "category": "Backlog Management",
    "difficulty": "Medium",
    "question": "What are two good ways for the Developers to make non-functional requirements visible?",
    "options": [
      "Put them on a separate list on the Scrum board",
      "Add them to the Product Backlog and keep the PO posted on expected effort",
      "Run Integration and Regression Tests before the Sprint end and capture open work",
      "Add them to the Definition of Done so the work is taken care of every Sprint"
    ],
    "correct": [
      1,
      3
    ],
    "explanation": "Non-functional requirements can be made visible by adding them to the Product Backlog (for specific items) or the Definition of Done (for recurring standards). Both keep them transparent.",
    "source": "PSD Course — Non-functional Requirements",
    "tip": "Specific NFR → Product Backlog. Recurring NFR → Definition of Done."
  },
  {
    "id": 73,
    "category": "Sprint Events",
    "difficulty": "Easy",
    "question": "What activities would a Product Owner typically undertake between the end of the current Sprint and the start of the next Sprint?",
    "options": [
      "There are no such activities — the next Sprint starts immediately",
      "Work with QA departments on the Increment",
      "Refine the Product Backlog",
      "Update the project plan with Stakeholders"
    ],
    "correct": 0,
    "explanation": "There is no gap between Sprints. A new Sprint starts immediately after the conclusion of the previous Sprint. There is no time 'between' Sprints.",
    "source": "Scrum Guide 2020 — The Sprint section",
    "tip": "Zero gap between Sprints. The new Sprint begins IMMEDIATELY after the old one ends."
  },
  {
    "id": 74,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "You are the Scrum Master on a newly formed Scrum Team. Which two activities would probably help the team in starting up?",
    "options": [
      "Ensure the team members have compatible personalities",
      "Introduce a bonus system for top performers",
      "Ensure the team understands they need a Definition of Done",
      "Have development managers introduce their direct reports and responsibilities",
      "Ask the PO to discuss the Product vision, history, goals, and context"
    ],
    "correct": [
      2,
      4
    ],
    "explanation": "For a new team, it's important to establish a Definition of Done and understand the product context. Personality matching, individual bonuses, and management introductions are anti-patterns.",
    "source": "PSD Course — Team Formation",
    "tip": "New team? Start with: understand the Product (PO) + define Done (DoD)."
  },
  {
    "id": 75,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "Which best describes the Product Backlog?",
    "options": [
      "It contains all foreseeable tasks and requirements for a complete project plan",
      "It is allowed to grow and change as more is learned about the Product and its customers",
      "It is baselined to follow change management processes",
      "It provides just enough information to start the design phase"
    ],
    "correct": 1,
    "explanation": "The Product Backlog is a living artifact that grows and changes as more is learned. It is never complete or baselined — it evolves with the product and market.",
    "source": "Scrum Guide 2020 — Product Backlog section",
    "tip": "The Product Backlog is NEVER complete. It continuously evolves."
  },
  {
    "id": 76,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What are two responsibilities of Testers in the Developers?",
    "options": [
      "Verifying the work of programmers",
      "Scrum has no 'Tester' role",
      "Finding bugs",
      "Everyone in the Developers is responsible for quality",
      "Tracking quality metrics"
    ],
    "correct": [
      1,
      3
    ],
    "explanation": "Scrum has no separate 'Tester' role. Everyone in the Developers is responsible for quality. Testing is part of development, not a separate function.",
    "source": "Scrum Guide 2020 — Developers section",
    "tip": "No Tester role in Scrum. Quality is everyone's job."
  },
  {
    "id": 77,
    "category": "Cross-functional Teams",
    "difficulty": "Easy",
    "question": "How do you know that the Developers are cross-functional?",
    "options": [
      "A few of the Developers pair program and do TDD",
      "The Developers have all the skills to create a potentially releasable Increment by the end of every Sprint",
      "Every member of the Developers is able to perform every task",
      "There are no conflicts within the Developers"
    ],
    "correct": 1,
    "explanation": "Cross-functional means the team collectively has all skills needed to create a releasable Increment. It does NOT mean every individual can do everything.",
    "source": "Scrum Guide 2020 — Scrum Team section",
    "tip": "Cross-functional = TEAM has all skills. Not = each person has all skills."
  },
  {
    "id": 78,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "For the purpose of transparency, when does Scrum say a new Increment of working Software must be available?",
    "options": [
      "When the Product Owner asks to create one",
      "At the end of every Sprint",
      "Before the release Sprint",
      "Every 3 Sprints",
      "After the Acceptance Testing phase"
    ],
    "correct": 1,
    "explanation": "At the end of every Sprint, a Done, usable, and potentially releasable Increment must be available. This is non-negotiable in Scrum.",
    "source": "Scrum Guide 2020 — Increment section",
    "tip": "Every Sprint = a Done Increment. No exceptions."
  },
  {
    "id": 79,
    "category": "Cross-functional Teams",
    "difficulty": "Medium",
    "question": "Which three behaviors demonstrate that a team is self-managing?",
    "options": [
      "The Developers inviting external people to Sprint Planning to ask how to build",
      "The Developers working within functional descriptions and handing off work",
      "The PO doesn't need to be at Sprint Retrospectives",
      "Stakeholders walking in at Daily Scrum to check progress",
      "The Developers collaboratively selecting their own work during the Sprint",
      "The Scrum Master is no longer needed",
      "The Developers have all the skills needed to create a releasable Increment",
      "The Developers creating their own Sprint Backlog reflecting all DoD work"
    ],
    "correct": [
      4,
      6,
      7
    ],
    "explanation": "Self-managing teams: select their own work, have all needed skills, and create their own Sprint Backlog. Relying on external help, handoffs, or external oversight are NOT self-managing behaviors.",
    "source": "Scrum Guide 2020 — Self-management",
    "tip": "Self-managing = choose work + own all skills + create own plans."
  },
  {
    "id": 80,
    "category": "Sprint Events",
    "difficulty": "Easy",
    "question": "What is the purpose of a Sprint Review?",
    "options": [
      "To take time to judge the validity of the project",
      "To inspect the Product Increment with the Stakeholders and collect feedback on next steps",
      "To review the Scrum Team's activities and processes during the Sprint",
      "To build team spirit"
    ],
    "correct": 1,
    "explanation": "The Sprint Review inspects the Increment with stakeholders and collects feedback. It's a working session, not a demo or presentation.",
    "source": "Scrum Guide 2020 — Sprint Review section",
    "tip": "Sprint Review = inspect Increment + get stakeholder feedback. NOT a demo!"
  },
  {
    "id": 81,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "True or False: The Product Owner makes sure the team selects enough from the Product Backlog for a Sprint to satisfy the Stakeholders.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. The Developers decide how much to select for a Sprint. The PO doesn't dictate how much work the team takes on. The Developers forecast what they can accomplish.",
    "source": "Scrum Guide 2020 — Sprint Planning section",
    "tip": "Developers FORECAST how much they can do. PO doesn't dictate volume."
  },
  {
    "id": 82,
    "category": "Sprint Events",
    "difficulty": "Medium",
    "question": "Which statement best describes the Sprint Backlog as outcome of Sprint Planning?",
    "options": [
      "It is a complete list of all work to be done during the Sprint",
      "It is the Developers' plan for delivering the Sprint Goal, including at least the selected PBIs and plan for delivering them",
      "Every item has a designated owner",
      "Every item has been estimated in hours"
    ],
    "correct": 1,
    "explanation": "The Sprint Backlog is the Developers' plan for achieving the Sprint Goal. It includes selected PBIs plus a plan for delivering them. It doesn't need designated owners or hour estimates.",
    "source": "Scrum Guide 2020 — Sprint Backlog section",
    "tip": "Sprint Backlog = selected PBIs + plan + Sprint Goal. It evolves during the Sprint."
  },
  {
    "id": 83,
    "category": "Done & Quality",
    "difficulty": "Medium",
    "question": "Which three phrases best describe the purpose of a Definition of Done?",
    "options": [
      "It provides a shared understanding of when work is complete",
      "It defines the accepted level of quality for the Increment",
      "It controls whether the Developers have done enough work to move to the next Sprint",
      "It creates transparency about what has been done",
      "It is a checklist to check on Scrum compliance"
    ],
    "correct": [
      0,
      1,
      3
    ],
    "explanation": "The DoD provides shared understanding, defines quality levels, and creates transparency. It's not about controlling Developers or checking Scrum compliance.",
    "source": "Scrum Guide 2020 — Definition of Done section",
    "tip": "DoD = shared understanding + quality standard + transparency."
  },
  {
    "id": 84,
    "category": "Sprint Events",
    "difficulty": "Easy",
    "question": "Which output from Sprint Planning provides the Developers with a target and overarching direction for the Sprint?",
    "options": [
      "The Sprint Backlog",
      "The Sprint Goal",
      "The selected Product Backlog Items",
      "The Sprint Burndown Chart"
    ],
    "correct": 1,
    "explanation": "The Sprint Goal provides the target and overarching direction. It gives the team flexibility in the exact work done while maintaining focus and coherence.",
    "source": "Scrum Guide 2020 — Sprint Goal section",
    "tip": "Sprint Goal = the WHY of the Sprint. It provides coherence and focus."
  },
  {
    "id": 85,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "The Product Owner determines how many Product Backlog Items the Developers selects for a Sprint.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. Only the Developers can assess how much they can accomplish in the upcoming Sprint. The PO can influence through priority but not dictate volume.",
    "source": "Scrum Guide 2020 — Sprint Planning section",
    "tip": "Developers decide HOW MUCH. PO decides WHAT (priority)."
  },
  {
    "id": 86,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "Who owns the Sprint Backlog?",
    "options": [
      "The Scrum Team",
      "The Product Owner",
      "The Scrum Master",
      "The Developers"
    ],
    "correct": 3,
    "explanation": "The Sprint Backlog belongs to the Developers. It's their plan for the Sprint. Only the Developers can update it during the Sprint.",
    "source": "Scrum Guide 2020 — Sprint Backlog section",
    "tip": "Sprint Backlog = Developers' plan. They own it and manage it."
  },
  {
    "id": 87,
    "category": "Done & Quality",
    "difficulty": "Easy",
    "question": "When is implementation of a Product Backlog Item considered complete?",
    "options": [
      "When all work in the Sprint Backlog related to the item is done",
      "When the item has no remaining work and meets the Definition of Done",
      "When QA reports it has passed all acceptance tests",
      "When the item is delivered to the end user"
    ],
    "correct": 1,
    "explanation": "A PBI is complete when it meets the Definition of Done. The DoD is the shared standard that determines completeness — not QA approval or delivery.",
    "source": "Scrum Guide 2020 — Increment section",
    "tip": "Complete = meets DoD. Period."
  },
  {
    "id": 88,
    "category": "Scrum Master",
    "difficulty": "Medium",
    "question": "Which two of the following are true about the Scrum Master role?",
    "options": [
      "The SM assigns tasks to the Developers",
      "The SM is a true leader who serves the Scrum Team and the organization",
      "The SM ensures the Developers work at a sustainable pace",
      "The SM is accountable for the Scrum framework being adopted and understood",
      "The SM manages the progress of the Sprint"
    ],
    "correct": [
      1,
      3
    ],
    "explanation": "The SM is a true leader who serves and is accountable for establishing Scrum. They don't assign tasks, manage Sprint progress, or enforce pace — those are self-management responsibilities.",
    "source": "Scrum Guide 2020 — Scrum Master section",
    "tip": "SM = serves + establishes Scrum. Does NOT manage or assign."
  },
  {
    "id": 89,
    "category": "Sprint Events",
    "difficulty": "Medium",
    "question": "Which two of the following are appropriate topics for discussion during a Sprint Retrospective?",
    "options": [
      "How the team handles its Definition of Done",
      "Sprint scope decided by the Product Owner",
      "Tools and techniques that worked well during the Sprint",
      "How to enhance product functionality",
      "The budget for the next Sprint"
    ],
    "correct": [
      0,
      2
    ],
    "explanation": "The Sprint Retrospective discusses how the team worked — processes, tools, DoD, and interactions. Product functionality and budget are not Retrospective topics.",
    "source": "Scrum Guide 2020 — Sprint Retrospective section",
    "tip": "Retro = HOW we worked. Not WHAT we built or HOW MUCH we spend."
  },
  {
    "id": 90,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "True or False: Multiple Scrum Teams working on the same project must have the same Sprint start date.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. The Scrum Guide does not require synchronized Sprints across teams. Each team can choose their own Sprint cadence and start date.",
    "source": "Scrum Guide 2020",
    "tip": "Teams can have different Sprint schedules. Synchronization is optional."
  },
  {
    "id": 91,
    "category": "Done & Quality",
    "difficulty": "Medium",
    "question": "When is it most appropriate for a Scrum Team to change the Definition of Done?",
    "options": [
      "During Sprint Planning when the team decides they can handle more",
      "During the Sprint Retrospective as the team continuously improves",
      "Whenever a new technology is adopted",
      "When the Product Owner requests higher quality"
    ],
    "correct": 1,
    "explanation": "The Sprint Retrospective is the appropriate time to discuss and improve the Definition of Done. It's part of the team's continuous improvement process.",
    "source": "Scrum Guide 2020 — Sprint Retrospective section",
    "tip": "Improve DoD during Retrospective. It's about continuous improvement."
  },
  {
    "id": 92,
    "category": "Scrum Master",
    "difficulty": "Medium",
    "question": "The Product Owner is not collaborating with the Developers during the Sprint. What are two valuable actions for a Scrum Master to take?",
    "options": [
      "Nominate a proxy PO to be available for the Developers",
      "Coach the PO on the value of collaborating with the Developers",
      "Stop the Sprint and instruct the PO to be more engaged",
      "Schedule interactions between the Developers and the PO",
      "Send the PO to a certification class"
    ],
    "correct": [
      1,
      3
    ],
    "explanation": "The SM should coach the PO and facilitate interactions. Not assign proxies, stop Sprints, or send people to classes.",
    "source": "Scrum Guide 2020 — Scrum Master serves the PO section",
    "tip": "SM coaches and facilitates. Doesn't dictate, assign proxies, or stop work."
  },
  {
    "id": 93,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "A Scrum Master is working with Developers in different physical locations. Much logistical setup is needed before the Daily Scrum. What should the SM do?",
    "options": [
      "Set up a meeting room and equipment before the Daily Scrum starts",
      "Allow the Developers to self-manage and decide for themselves how to conduct the Daily Scrum",
      "Inform management and request that all members be relocated",
      "Ask the Developers to alternate hosting the Daily Scrum"
    ],
    "correct": 1,
    "explanation": "The Developers are self-managing. The SM should allow them to figure out the best way to conduct their own Daily Scrum, including dealing with logistics.",
    "source": "Scrum Guide 2020 — Self-management",
    "tip": "Don't solve problems FOR the team. Let them self-manage."
  },
  {
    "id": 94,
    "category": "Cross-functional Teams",
    "difficulty": "Medium",
    "question": "Five new Scrum Teams have been created to build one Product. Developers ask the SM how to coordinate their work with other teams. What should the SM do?",
    "options": [
      "Teach the Product Owner to work with the lead Developers on ordering Product Backlog",
      "Collect requirements and assign them to the appropriate team",
      "Teach them that it is their responsibility to coordinate and help them learn from each other",
      "Have a coordinator act as go-between for the teams"
    ],
    "correct": 2,
    "explanation": "The SM should teach the teams that cross-team coordination is their responsibility. Self-management extends to inter-team coordination.",
    "source": "Scrum Guide 2020 — Self-management",
    "tip": "Teams coordinate with each other directly. SM teaches, doesn't become a coordinator."
  },
  {
    "id": 95,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "True or False: Scrum is a methodology that tells in detail how to build Software incrementally.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. Scrum is a lightweight FRAMEWORK, not a detailed methodology. It intentionally leaves implementation details to the teams. It provides structure, not prescriptive processes.",
    "source": "Scrum Guide 2020 — Definition of Scrum",
    "tip": "Scrum = framework (incomplete by design). NOT a methodology or process."
  },
  {
    "id": 96,
    "category": "Sprint Events",
    "difficulty": "Hard",
    "question": "In Sprint Planning, the PO and Developers couldn't clearly understand the highest order PBIs. They agreed on a Sprint Goal but couldn't determine how many PBIs to forecast. What two actions should the SM support?",
    "options": [
      "Postpone the Sprint until the Developers can make a reliable forecast",
      "The Developers forecast the most likely PBIs to meet the Sprint Goal and create a Sprint Backlog based on initial understanding",
      "Cancel the Sprint and allow the PO to refine the Product Backlog",
      "Have the Developers start the Sprint and continue refining during the Sprint",
      "Forecast the PBIs with the highest value first"
    ],
    "correct": [
      1,
      3
    ],
    "explanation": "The team should start with their best forecast and continue refining during the Sprint. Don't postpone or cancel — start working and learn as you go.",
    "source": "Scrum Guide 2020 — Sprint Planning + Refinement",
    "tip": "Start with best knowledge, refine as you go. Don't wait for perfect understanding."
  },
  {
    "id": 97,
    "category": "Scrum Master",
    "difficulty": "Medium",
    "question": "A Developer takes the Scrum Master aside to express concerns about data security issues. What should the SM do?",
    "options": [
      "Ask the Developer to share the concerns at the Sprint Retrospective",
      "Add a Product Backlog item for security and notify the PO",
      "Tell the Developer to address it with the security department",
      "Ask the Developer to share the issue with the team as soon as possible"
    ],
    "correct": 3,
    "explanation": "Security concerns should be shared with the team as soon as possible. The team collectively decides how to handle it. Don't defer to Retro or offload to another department.",
    "source": "Scrum Guide 2020 — Transparency + Self-management",
    "tip": "Share concerns with the team immediately. Transparency enables good decisions."
  },
  {
    "id": 98,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What are two ways that architecture and infrastructure are handled in Scrum?",
    "options": [
      "They are discussed, set and approved during the Sprint 0",
      "They are built alongside functional development within each Sprint",
      "There is a separate Architecture team that reviews all architecture changes",
      "They evolve as the Developers learn more about the Product and its environment"
    ],
    "correct": [
      1,
      3
    ],
    "explanation": "In Scrum, architecture evolves incrementally. It's built alongside functional development and evolves as the team learns. No separate Sprint 0 or architecture team.",
    "source": "Scrum Guide 2020 — Emergent Architecture + Agile Principle 11",
    "tip": "Architecture = emergent, incremental, alongside features. No BDUF."
  },
  {
    "id": 99,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "What are three ways Scrum promotes self-management?",
    "options": [
      "By providing a framework with just enough structure",
      "By removing titles for Developers",
      "By being a lightweight framework",
      "By not providing answers to complex problems but empowering the team to find them",
      "By mandating specific engineering practices"
    ],
    "correct": [
      0,
      2,
      3
    ],
    "explanation": "Scrum promotes self-management by providing just enough structure (lightweight framework) and empowering teams to find their own solutions. It doesn't mandate practices or remove titles.",
    "source": "Scrum Guide 2020 — Scrum Theory section",
    "tip": "Scrum provides boundaries, not prescriptions. Teams self-manage within the framework."
  },
  {
    "id": 100,
    "category": "Cross-functional Teams",
    "difficulty": "Easy",
    "question": "True or False: Cross-functional teams are optimized to work on one technical layer of a system only (e.g. GUI, database, middle tier).",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. Cross-functional teams work across ALL technical layers. Component teams (one layer) are NOT cross-functional. Cross-functional = can deliver end-to-end.",
    "source": "Scrum Guide 2020 — Scrum Team section",
    "tip": "Cross-functional = end-to-end delivery. Component teams = anti-pattern."
  },
  {
    "id": 101,
    "category": "Cross-functional Teams",
    "difficulty": "Easy",
    "question": "What are three benefits of self-management?",
    "options": [
      "Increased creativity",
      "Increased self-accountability",
      "Increased commitment",
      "Increased accuracy of estimates",
      "Increased rule compliance"
    ],
    "correct": [
      0,
      1,
      2
    ],
    "explanation": "Self-management increases creativity (freedom to innovate), self-accountability (ownership), and commitment (intrinsic motivation). It's not about compliance or estimate accuracy.",
    "source": "Scrum Guide 2020 — Self-management",
    "tip": "Self-management = creativity + accountability + commitment."
  },
  {
    "id": 102,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "Why does a Scrum Team need a Sprint Goal?",
    "options": [
      "To provide focus and coherence, encouraging the team to work together",
      "To allow the Product Owner to measure Sprint performance",
      "To give the Scrum Master a metric to report to management",
      "To ensure every PBI is completed"
    ],
    "correct": 0,
    "explanation": "The Sprint Goal gives coherence and focus, encouraging the Developers to work together rather than on separate initiatives. It creates flexibility in what work is done.",
    "source": "Scrum Guide 2020 — Sprint Goal section",
    "tip": "Sprint Goal = focus + coherence + flexibility. The team's north star for the Sprint."
  },
  {
    "id": 103,
    "category": "Backlog Management",
    "difficulty": "Medium",
    "question": "How should Product Backlog Items be chosen when multiple Scrum Teams work from the same Product Backlog?",
    "options": [
      "Each team pulls items independently from the top of the backlog",
      "The Product Owner assigns items to each team",
      "The teams discuss and negotiate which items each will work on",
      "A project manager divides the work among teams"
    ],
    "correct": 2,
    "explanation": "Teams should discuss and negotiate which items to take. This promotes collaboration, avoids conflicts, and ensures good coordination.",
    "source": "PSD Course — Scaled Scrum",
    "tip": "Multiple teams = collaborate on item selection. Don't just grab independently."
  },
  {
    "id": 104,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "Which of the following describe Test Driven Development?",
    "options": [
      "A software development technique where tests are written before code",
      "A predictable way to develop working, well-organized code",
      "A technique for creating code coverage reports",
      "A way to test microservices independently"
    ],
    "correct": [
      0,
      1
    ],
    "explanation": "TDD is writing tests before code and results in predictable, well-organized code. It's a development practice, not a testing or reporting technique.",
    "source": "PSD Course — TDD",
    "tip": "TDD = write test first + predictable well-organized code."
  },
  {
    "id": 105,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "When a Continuous Integration build fails, who ideally ensures the build is repaired?",
    "options": [
      "The person or pair who broke the build",
      "The next person who needs to check in code",
      "The Scrum Master",
      "The designated CI engineer"
    ],
    "correct": 0,
    "explanation": "The person or pair who broke the build should fix it immediately. This ensures accountability and keeps the build green for the entire team.",
    "source": "PSD Course — CI Practices",
    "tip": "You break it, you fix it. Immediately. The broken build is top priority."
  },
  {
    "id": 106,
    "category": "Scrum Framework",
    "difficulty": "Hard",
    "question": "What happens during Sprint 0?",
    "options": [
      "The team sets up architecture and infrastructure",
      "A detailed project plan is created",
      "The team gets to know each other",
      "There is no such thing as Sprint 0 in Scrum"
    ],
    "correct": 3,
    "explanation": "There is no Sprint 0 in Scrum. Every Sprint must deliver a potentially releasable Increment. Setup, architecture, and planning happen within regular Sprints.",
    "source": "Scrum Guide 2020 — The Sprint section",
    "tip": "No Sprint 0! Every Sprint delivers value. Architecture evolves within Sprints."
  },
  {
    "id": 107,
    "category": "Backlog Management",
    "difficulty": "Easy",
    "question": "Product Backlog Items are refined by:",
    "options": [
      "The Product Owner",
      "The Developers",
      "The Scrum Team",
      "The Business Analyst"
    ],
    "correct": 2,
    "explanation": "Product Backlog refinement is a collaborative activity. The Scrum Team (PO + Developers + SM) refines items together.",
    "source": "Scrum Guide 2020 — Product Backlog section",
    "tip": "Refinement = whole Scrum Team collaborating. Not just PO or Developers alone."
  },
  {
    "id": 108,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "Who is responsible for the System Architecture of a Product being developed using Scrum?",
    "options": [
      "The Software Architect",
      "The Developers",
      "The System Engineer",
      "The Scrum Master"
    ],
    "correct": 1,
    "explanation": "The Developers are responsible for architecture. In Scrum, architecture emerges from the Developers' decisions. There is no separate architect role.",
    "source": "Scrum Guide 2020 — Developers section",
    "tip": "Developers own architecture. It's a development responsibility."
  },
  {
    "id": 109,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "Which of the following are attributes of a bad bug report?",
    "options": [
      "Vague statements or untested assumptions",
      "A bug report with screenshots",
      "Generic titles",
      "Assigning blame",
      "Clear reproduction steps"
    ],
    "correct": [
      0,
      2,
      3
    ],
    "explanation": "Bad bug reports have vague statements, generic titles, and assign blame. Screenshots and clear steps are attributes of GOOD reports.",
    "source": "PSD Course — Quality Practices",
    "tip": "Bad = vague + generic + blaming. Good = specific + detailed + neutral."
  },
  {
    "id": 110,
    "category": "Testing & Quality",
    "difficulty": "Easy",
    "question": "Who writes tests in a Scrum Team?",
    "options": [
      "The QA team",
      "The Developers",
      "The Tester",
      "The Scrum Master"
    ],
    "correct": 1,
    "explanation": "The Developers write all tests. There are no separate QA or Tester roles in Scrum. Quality is everyone's responsibility.",
    "source": "Scrum Guide 2020 — Developers section",
    "tip": "Developers write tests. No separate testing role in Scrum."
  },
  {
    "id": 111,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "When Developers are having trouble delivering an Increment because they do not understand a functional requirement, what should they do?",
    "options": [
      "Add it to the Product Backlog and work on something else",
      "Collaborate with the Product Owner to determine what is possible and acceptable",
      "Do the best they can and present the result at Sprint Review",
      "Ask the Scrum Master to find the answer"
    ],
    "correct": 1,
    "explanation": "When confused about requirements, Developers should collaborate with the Product Owner for clarification. The PO is the go-to person for requirement understanding.",
    "source": "Scrum Guide 2020 — Product Owner section",
    "tip": "Don't guess — talk to the PO. That's what they're there for."
  },
  {
    "id": 112,
    "category": "Backlog Management",
    "difficulty": "Easy",
    "question": "Who should be present during Product Backlog Refinement?",
    "options": [
      "Only the Product Owner",
      "The entire Scrum Team",
      "The Product Owner and Developers at minimum",
      "Only the Developers"
    ],
    "correct": 2,
    "explanation": "At minimum, the Product Owner and Developers should be present during refinement. The Scrum Master may also participate. Stakeholders can be invited when needed.",
    "source": "Scrum Guide 2020 — Product Backlog section",
    "tip": "PO + Developers = minimum for refinement. Others can be invited."
  },
  {
    "id": 113,
    "category": "Backlog Management",
    "difficulty": "Easy",
    "question": "True or False: Programmers and Testers should not be included in refining Product Backlog Items.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. Developers (which includes programmers and testers) are essential participants in refinement. They provide technical insight and estimates.",
    "source": "Scrum Guide 2020 — Product Backlog section",
    "tip": "Developers MUST participate in refinement. They provide critical technical input."
  },
  {
    "id": 114,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "Why are automated builds important?",
    "options": [
      "They enable fast feedback about the state of the codebase after integration",
      "They eliminate the need for testing",
      "They replace the need for code review",
      "They allow the PO to track developer productivity"
    ],
    "correct": 0,
    "explanation": "Automated builds provide fast feedback on whether code integrates correctly. They don't replace testing or code reviews, and they're not productivity trackers.",
    "source": "PSD Course — Continuous Integration",
    "tip": "Automated builds = fast feedback on integration health."
  },
  {
    "id": 115,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "Upon what type of process control is Scrum based?",
    "options": [
      "Defined process control",
      "Statistical process control",
      "Empirical process control",
      "Complex process control"
    ],
    "correct": 2,
    "explanation": "Scrum is based on empirical process control (empiricism). This means knowledge comes from experience and making decisions based on what is observed — transparency, inspection, adaptation.",
    "source": "Scrum Guide 2020 — Scrum Theory section",
    "tip": "Scrum = empiricism. Learn by doing, inspect, adapt. Not predictive."
  },
  {
    "id": 116,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "When might a Sprint be abnormally cancelled?",
    "options": [
      "When the team can't complete all PBIs",
      "When the Sprint Goal becomes obsolete",
      "When the budget runs out",
      "When a key team member is sick"
    ],
    "correct": 1,
    "explanation": "A Sprint can be cancelled only when the Sprint Goal becomes obsolete. Only the Product Owner has the authority to cancel a Sprint. It's extremely rare.",
    "source": "Scrum Guide 2020 — The Sprint section",
    "tip": "Cancel ONLY when Sprint Goal is obsolete. Only PO can cancel. Very rare."
  },
  {
    "id": 117,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "Who should know the most about the progress toward a business objective or a release?",
    "options": [
      "The Scrum Master",
      "The Developers",
      "The Product Owner",
      "The Project Manager"
    ],
    "correct": 2,
    "explanation": "The Product Owner tracks progress toward business objectives. They are responsible for maximizing value and understanding where the product stands relative to goals.",
    "source": "Scrum Guide 2020 — Product Owner section",
    "tip": "PO knows product progress best. They're accountable for value."
  },
  {
    "id": 118,
    "category": "Done & Quality",
    "difficulty": "Hard",
    "question": "When many Scrum Teams are working on a single Product, what best describes the Definition of Done?",
    "options": [
      "Each team has its own Definition of Done",
      "The Definition of Done must be the same for all teams and mutually agreed upon",
      "The team with the most experience defines the DoD for all",
      "Management defines the DoD"
    ],
    "correct": 1,
    "explanation": "When multiple teams work on one product, they must share the same Definition of Done. This ensures a single, integrated, consistent Increment.",
    "source": "Scrum Guide 2020 — Definition of Done section",
    "tip": "Multiple teams + one product = one shared DoD. Consistency is essential."
  },
  {
    "id": 119,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "During a Sprint, a Developer determines that the team will not be able to complete the items in their forecast. Who should be present to review and adjust the selected PBIs?",
    "options": [
      "The Product Owner and the Developers",
      "The Scrum Master only",
      "The whole Scrum Team and stakeholders",
      "Only the Developers"
    ],
    "correct": 0,
    "explanation": "When the forecast can't be met, the Product Owner and Developers should collaborate to renegotiate scope while protecting the Sprint Goal.",
    "source": "Scrum Guide 2020 — The Sprint section",
    "tip": "Can't finish everything? PO + Developers negotiate scope. Protect the Sprint Goal."
  },
  {
    "id": 120,
    "category": "Cross-functional Teams",
    "difficulty": "Hard",
    "question": "When should the Developers on a Scrum Team be replaced?",
    "options": [
      "Every Sprint to promote shared knowledge",
      "As needed while taking into account a short-term reduction in productivity",
      "When the SM determines they are not productive enough",
      "Never, Scrum Teams should not be changed"
    ],
    "correct": 1,
    "explanation": "Team changes should happen as needed, understanding there will be a short-term productivity dip. Don't rotate every Sprint, but also don't avoid changes when necessary.",
    "source": "PSD Course — Team Dynamics",
    "tip": "Change teams when needed, but expect and plan for a temporary productivity dip."
  },
  {
    "id": 121,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "When is a Sprint over?",
    "options": [
      "When all PBIs meet their DoD",
      "When all tasks are completed",
      "When the time-box expires",
      "When the PO says it's done"
    ],
    "correct": 2,
    "explanation": "A Sprint is over when the time-box expires. Sprints are fixed-length events. They don't extend to finish work.",
    "source": "Scrum Guide 2020 — The Sprint section",
    "tip": "Sprint ends when the clock runs out. Period. No extensions."
  },
  {
    "id": 122,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "When does the next Sprint begin?",
    "options": [
      "When the PO is ready",
      "Immediately after the conclusion of the previous Sprint",
      "The Monday after the Sprint Review",
      "When the team is ready"
    ],
    "correct": 1,
    "explanation": "A new Sprint starts immediately after the conclusion of the previous Sprint. There is no gap between Sprints.",
    "source": "Scrum Guide 2020 — The Sprint section",
    "tip": "Zero gap. New Sprint starts immediately after the old one ends."
  },
  {
    "id": 123,
    "category": "Sprint Events",
    "difficulty": "Easy",
    "question": "What does it mean to say that an event has a time-box?",
    "options": [
      "The event can take as long as it needs",
      "The event has a maximum duration it may not exceed",
      "The event must take exactly the specified time",
      "The event can be skipped if the time isn't needed"
    ],
    "correct": 1,
    "explanation": "A time-box is a maximum duration. Events can finish early but cannot exceed the time-box. They cannot be skipped.",
    "source": "Scrum Guide 2020 — Events section",
    "tip": "Time-box = maximum duration. Can finish early, cannot go over."
  },
  {
    "id": 124,
    "category": "Sprint Events",
    "difficulty": "Easy",
    "question": "Who is required to attend the Daily Scrum?",
    "options": [
      "The Scrum Master and the Developers",
      "The Developers",
      "The entire Scrum Team",
      "The Developers and the Product Owner"
    ],
    "correct": 1,
    "explanation": "The Daily Scrum is for the Developers. The PO and SM are not required to attend unless they are actively working on Sprint Backlog items.",
    "source": "Scrum Guide 2020 — Daily Scrum section",
    "tip": "Daily Scrum = Developers' event. Others may attend but don't participate."
  },
  {
    "id": 125,
    "category": "Scrum Framework",
    "difficulty": "Hard",
    "question": "When does a Developer become accountable for the value of a Product Backlog Item selected for the Sprint?",
    "options": [
      "During Sprint Planning when the item is selected",
      "At the Sprint Review",
      "Never, the Product Owner is accountable for value",
      "When the item is assigned to them"
    ],
    "correct": 2,
    "explanation": "The Product Owner is accountable for maximizing value. Developers are accountable for creating a quality Increment that meets the DoD, but VALUE is the PO's accountability.",
    "source": "Scrum Guide 2020 — Product Owner section",
    "tip": "Value = PO's accountability. Quality of Increment = Developers' accountability."
  },
  {
    "id": 126,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "Who is on the Scrum Team?",
    "options": [
      "Product Owner",
      "Scrum Master",
      "Developers",
      "All of the above"
    ],
    "correct": 3,
    "explanation": "The Scrum Team consists of one Scrum Master, one Product Owner, and Developers. No sub-teams or hierarchies.",
    "source": "Scrum Guide 2020 — Scrum Team section",
    "tip": "Scrum Team = PO + SM + Developers. That's it. No sub-teams."
  },
  {
    "id": 127,
    "category": "Done & Quality",
    "difficulty": "Easy",
    "question": "True or False: The Definition of Done is a mandatory part of Scrum.",
    "options": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "True. The DoD is a formal description of the state of the Increment when it meets the quality measures required for the product. It's a commitment that creates transparency.",
    "source": "Scrum Guide 2020 — Definition of Done section",
    "tip": "DoD is mandatory. It's how Scrum ensures transparency about completeness."
  },
  {
    "id": 128,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "Continuous Integration (CI) provides the following advantages:",
    "options": [
      "Early feedback on integration issues",
      "Reduced risk when integrating code changes",
      "Knowing the state of the codebase at all times",
      "All of the above"
    ],
    "correct": 3,
    "explanation": "CI provides all of these: early feedback, reduced integration risk, and constant knowledge of codebase state. These are the core benefits of CI.",
    "source": "PSD Course — Continuous Integration",
    "tip": "CI = early feedback + reduced risk + always know your code state."
  },
  {
    "id": 129,
    "category": "Backlog Management",
    "difficulty": "Medium",
    "question": "Sizing is best when:",
    "options": [
      "Estimated by the Product Owner who knows the business value",
      "Done by the Developers who will do the work",
      "Assigned by management based on experience",
      "Done by external estimators for objectivity"
    ],
    "correct": 1,
    "explanation": "Sizing is best done by the Developers who will actually do the work. They have the technical knowledge to provide the most accurate estimates.",
    "source": "Scrum Guide 2020 — Product Backlog section",
    "tip": "Those who do the work estimate the work. Always."
  },
  {
    "id": 130,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "True or False: Planning Poker must be used by Scrum Teams.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. Planning Poker is a popular estimation technique but is NOT required by Scrum. Teams can use any estimation method they find effective.",
    "source": "Scrum Guide 2020",
    "tip": "Scrum doesn't prescribe estimation techniques. Planning Poker is optional."
  },
  {
    "id": 131,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What is Test Driven Development?",
    "options": [
      "Writing tests after code to verify correctness",
      "A technique where tests are written before the code, driving the design",
      "Using tests to document the system",
      "A QA-driven development approach"
    ],
    "correct": 1,
    "explanation": "TDD is a technique where tests are written before production code, and the tests drive the design of the code. The cycle is Red-Green-Refactor.",
    "source": "PSD Course — TDD",
    "tip": "TDD = tests FIRST, then code. Tests DRIVE the design."
  },
  {
    "id": 132,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "True or False: Tasks in a Sprint Backlog must be estimated in days/hours.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. The Scrum Guide does not prescribe any specific estimation technique for Sprint Backlog items. Teams may use hours, story points, or no estimates at all.",
    "source": "Scrum Guide 2020 — Sprint Backlog section",
    "tip": "No mandated estimation method. Use whatever works for the team."
  },
  {
    "id": 133,
    "category": "Testing & Quality",
    "difficulty": "Easy",
    "question": "Who is responsible for testing in Scrum?",
    "options": [
      "The QA team",
      "The Testers",
      "The Developers",
      "The Scrum Master"
    ],
    "correct": 2,
    "explanation": "The Developers are responsible for all testing. There are no separate QA or Tester roles in Scrum. Quality is built in, not tested in.",
    "source": "Scrum Guide 2020 — Developers section",
    "tip": "Developers test. No separate QA. Build quality in."
  },
  {
    "id": 134,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "Bugs discovered in Sprint should be:",
    "options": [
      "Deferred to the next Sprint",
      "Fixed immediately as they are found",
      "Added to the Product Backlog for prioritization",
      "Documented and assigned to QA"
    ],
    "correct": 1,
    "explanation": "Bugs found during the Sprint should ideally be fixed immediately to maintain quality and avoid accumulating technical debt. This supports the DoD and continuous quality.",
    "source": "PSD Course — Quality in Sprint",
    "tip": "Fix bugs NOW. Don't let them accumulate. Quality doesn't decrease during a Sprint."
  },
  {
    "id": 135,
    "category": "Agile Principles",
    "difficulty": "Medium",
    "question": "True or False: YAGNI states that most systems work best if they are kept simple rather than made complicated.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. That describes KISS (Keep It Simple, Stupid). YAGNI (You Aren't Gonna Need It) states you should not build functionality until it is actually needed.",
    "source": "XP Principles — YAGNI vs KISS",
    "tip": "YAGNI = don't build what you don't need yet. KISS = keep it simple. Different principles!"
  },
  {
    "id": 136,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "Which one is a Scrum Value?",
    "options": [
      "Commitment",
      "Courage",
      "Focus",
      "Openness",
      "Respect",
      "All of the above"
    ],
    "correct": 5,
    "explanation": "All five are Scrum Values: Commitment, Courage, Focus, Openness, and Respect.",
    "source": "Scrum Guide 2020 — Scrum Values section",
    "tip": "CFORC: Commitment, Focus, Openness, Respect, Courage."
  },
  {
    "id": 137,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "What is NOT the name of the original program in source control from which branches are taken?",
    "options": [
      "Mainline",
      "Master",
      "Branch",
      "Trunk"
    ],
    "correct": 2,
    "explanation": "'Branch' is NOT the name for the original/main line of code. The original line is called Mainline, Master (or Main), or Trunk. A branch is a COPY of the mainline.",
    "source": "PSD Course — Version Control",
    "tip": "Main code = Mainline/Master/Trunk. Branch = copy for isolated work."
  },
  {
    "id": 138,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What is Static Analysis?",
    "options": [
      "Analysis of running software behavior",
      "Analysis of code without executing it",
      "Analysis of database performance",
      "Analysis of network traffic"
    ],
    "correct": 1,
    "explanation": "Static Analysis examines code without executing it. It checks for potential bugs, code smells, security vulnerabilities, and coding standard violations at the source code level.",
    "source": "PSD Course — Code Quality",
    "tip": "Static = analyze code WITHOUT running it. Dynamic = analyze WHILE running."
  },
  {
    "id": 139,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "Which is true about Black-box testing?",
    "options": [
      "It tests internal code structure",
      "It tests functionality without knowledge of internal implementation",
      "It requires access to source code",
      "It is only done by developers"
    ],
    "correct": 1,
    "explanation": "Black-box testing tests the functionality of software without any knowledge of its internal structure or code. Tests are based on requirements and specifications.",
    "source": "PSD Course — Testing Types",
    "tip": "Black-box = test from outside, no code knowledge. White-box = test with code knowledge."
  },
  {
    "id": 140,
    "category": "Agile Principles",
    "difficulty": "Easy",
    "question": "Which expression is NOT used for KISS principle?",
    "options": [
      "Keep it simple, stupid",
      "Keep it short and simple",
      "Keep it small and simple",
      "Keep it safe and secure"
    ],
    "correct": 3,
    "explanation": "'Keep it safe and secure' is NOT a KISS expression. KISS variants include 'Keep it simple, stupid,' 'Keep it short and simple,' and 'Keep it small and simple.'",
    "source": "Agile/XP Principles",
    "tip": "KISS = simplicity. Not safety/security."
  },
  {
    "id": 141,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "What shapes can an Architecture Spike take?",
    "options": [
      "A prototype",
      "A proof of concept",
      "An experiment",
      "A throwaway piece of code",
      "All of the above"
    ],
    "correct": 4,
    "explanation": "An Architecture Spike can be a prototype, proof of concept, experiment, or throwaway code. It's a time-boxed investigation to reduce technical uncertainty.",
    "source": "PSD Course — Architecture Spikes",
    "tip": "Spike = time-boxed research. Can be any form that answers the technical question."
  },
  {
    "id": 142,
    "category": "Cross-functional Teams",
    "difficulty": "Easy",
    "question": "What does cross-functionality mean in a Scrum Team?",
    "options": [
      "Each member can do every type of work",
      "The team has all skills needed to create the Increment without external dependencies",
      "Members work on multiple projects simultaneously",
      "The team is organized by technical layers"
    ],
    "correct": 1,
    "explanation": "Cross-functional means the TEAM collectively has all skills needed to create a Done Increment without external dependencies. Not every individual needs every skill.",
    "source": "Scrum Guide 2020 — Scrum Team section",
    "tip": "Team has ALL skills collectively. No external dependencies to deliver."
  },
  {
    "id": 143,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "What is the proper reaction of the Developers in the middle of the Sprint when they find they have over-committed?",
    "options": [
      "Remove low-value PBIs from the Sprint and inform the PO",
      "Work overtime to complete everything",
      "Cancel the Sprint",
      "Ask the SM to extend the Sprint"
    ],
    "correct": 0,
    "explanation": "When over-committed, Developers should collaborate with the PO to remove or renegotiate PBIs while keeping the Sprint Goal intact. Quality never decreases.",
    "source": "Scrum Guide 2020 — The Sprint section",
    "tip": "Over-committed? Negotiate scope with PO. Protect Sprint Goal. Never sacrifice quality."
  },
  {
    "id": 144,
    "category": "Sprint Events",
    "difficulty": "Easy",
    "question": "What is the Sprint Planning time-box for two-week Sprints?",
    "options": [
      "2 hours",
      "4 hours",
      "8 hours",
      "1 day"
    ],
    "correct": 1,
    "explanation": "Sprint Planning for a 1-month Sprint is maximum 8 hours. For a 2-week Sprint, it would be proportionally shorter — up to 4 hours.",
    "source": "Scrum Guide 2020 — Sprint Planning section",
    "tip": "4-week = 8 hours max. 2-week = 4 hours max. Scale proportionally."
  },
  {
    "id": 145,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "True or False: Through Depth of Inheritance metric, a low number for depth implies less complexity but also the possibility of less code reuse through inheritance.",
    "options": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "True. Low depth of inheritance means simpler code but potentially less reuse through inheritance. High depth means more reuse but more complexity and tighter coupling.",
    "source": "PSD Course — Code Metrics",
    "tip": "Low DOI = simple but less reuse. High DOI = complex but more reuse. Balance needed."
  },
  {
    "id": 146,
    "category": "Testing & Quality",
    "difficulty": "Easy",
    "question": "Who is responsible for writing tests in a Scrum Team?",
    "options": [
      "The QA team",
      "The Developers",
      "The Tester",
      "The SM ensures tests are written"
    ],
    "correct": 1,
    "explanation": "Developers are responsible for all testing activities, including writing tests. There is no separate QA or Tester role in Scrum.",
    "source": "Scrum Guide 2020 — Developers section",
    "tip": "Developers write ALL tests. Testing is part of 'Done.'"
  },
  {
    "id": 147,
    "category": "Sprint Events",
    "difficulty": "Easy",
    "question": "Who are the participants of the Daily Scrum?",
    "options": [
      "The Developers",
      "The Scrum Team",
      "The Developers and Scrum Master",
      "The PO and Developers"
    ],
    "correct": 0,
    "explanation": "The Daily Scrum is for the Developers. The PO and SM may attend but do not participate unless they are actively working on Sprint Backlog items.",
    "source": "Scrum Guide 2020 — Daily Scrum section",
    "tip": "Daily Scrum = Developers' event. Period."
  },
  {
    "id": 148,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "Who is responsible for the documentation?",
    "options": [
      "The Technical Writer",
      "The Developers",
      "The Scrum Master",
      "The Product Owner"
    ],
    "correct": 1,
    "explanation": "If documentation is required (part of DoD or PBI), the Developers are responsible for creating it. There is no separate documentation role in Scrum.",
    "source": "Scrum Guide 2020 — Developers section",
    "tip": "Developers handle ALL aspects of the Increment, including documentation."
  },
  {
    "id": 149,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "True or False: Afferent Coupling measures the number of classes on which a given class depends.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. Afferent Coupling (Ca) measures the number of classes that DEPEND ON a given class (incoming dependencies). Efferent Coupling (Ce) measures outgoing dependencies.",
    "source": "PSD Course — Code Metrics",
    "tip": "Afferent = incoming (who depends on ME). Efferent = outgoing (who do I depend ON)."
  },
  {
    "id": 150,
    "category": "Cross-functional Teams",
    "difficulty": "Medium",
    "question": "Which concerns are most important in scaled Scrum?",
    "options": [
      "Having a shared Definition of Done across all teams",
      "Managing feature branches for each team",
      "Consistent integration of work across teams",
      "Individual team velocity tracking"
    ],
    "correct": [
      0,
      2
    ],
    "explanation": "In scaled Scrum, shared DoD and consistent integration across teams are critical. These ensure a single, unified, quality Increment.",
    "source": "Scrum Guide 2020 — Scaled Scrum + Nexus Guide",
    "tip": "Scaled Scrum = shared DoD + integrated Increment. Everything serves the one product."
  },
  {
    "id": 151,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "Who makes the decision for the architecture in a Scrum Team?",
    "options": [
      "The Architect",
      "The Developers",
      "The Scrum Master",
      "The Tech Lead"
    ],
    "correct": 1,
    "explanation": "Architecture decisions are made by the Developers. In Scrum, there is no separate architect or tech lead role.",
    "source": "Scrum Guide 2020 — Developers section",
    "tip": "Developers own architecture. Self-managing teams make technical decisions."
  },
  {
    "id": 152,
    "category": "Testing & Quality",
    "difficulty": "Hard",
    "question": "Which one is NOT a Test Double?",
    "options": [
      "Stub",
      "Mock",
      "Spy",
      "Proxy"
    ],
    "correct": 3,
    "explanation": "The five types of Test Doubles (per Gerard Meszaros) are: Dummy, Fake, Stub, Spy, and Mock. Proxy is not a Test Double — it's a design pattern.",
    "source": "Gerard Meszaros — xUnit Test Patterns (PSD curriculum)",
    "tip": "Test Doubles: Dummy, Fake, Stub, Spy, Mock. Proxy is a design pattern, not a test double."
  },
  {
    "id": 153,
    "category": "DevOps & Engineering",
    "difficulty": "Easy",
    "question": "Which is true about Refactoring?",
    "options": [
      "It changes external behavior",
      "It improves internal structure without changing external behavior",
      "It requires adding new features",
      "It is done only at the end of a Sprint"
    ],
    "correct": 1,
    "explanation": "Refactoring improves the internal structure of code without changing its external behavior. It's done continuously, not just at Sprint end.",
    "source": "Martin Fowler — Refactoring",
    "tip": "Refactoring = change structure, keep behavior. Continuous, not periodic."
  },
  {
    "id": 154,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "When can the Product Owner see the Developers' work?",
    "options": [
      "Only at the Sprint Review",
      "Anytime",
      "Only during Sprint Planning",
      "Only when invited by the Developers"
    ],
    "correct": 1,
    "explanation": "The Product Owner can see the Developers' work at any time. Collaboration between PO and Developers should be continuous throughout the Sprint.",
    "source": "Scrum Guide 2020 — Scrum Team section",
    "tip": "PO access = anytime. Don't wait for Sprint Review to get feedback."
  },
  {
    "id": 155,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "What are the most important things for increasing transparency?",
    "options": [
      "Common language and shared Definition of Done",
      "Status reports and dashboards",
      "Detailed documentation",
      "Management reviews"
    ],
    "correct": 0,
    "explanation": "Common language and a shared DoD increase transparency by ensuring everyone has the same understanding of terms, processes, and what 'Done' means.",
    "source": "Scrum Guide 2020 — Transparency section",
    "tip": "Transparency = shared language + shared understanding + shared DoD."
  },
  {
    "id": 156,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What is ATDD?",
    "options": [
      "Agile Test Driven Development",
      "Acceptance Test Driven Development",
      "Automated Test Driven Development",
      "Application Test Driven Development"
    ],
    "correct": 1,
    "explanation": "ATDD stands for Acceptance Test Driven Development. It's the practice of writing acceptance tests before development, expressing requirements as executable tests.",
    "source": "PSD Course — ATDD",
    "tip": "ATDD = Acceptance Test Driven Development. Requirements become tests."
  },
  {
    "id": 157,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "What is the goal of Continuous Integration?",
    "options": [
      "To deploy to production continuously",
      "To merge code from different developers frequently and detect integration errors quickly",
      "To continuously integrate customer feedback",
      "To integrate different tools into the development pipeline"
    ],
    "correct": 1,
    "explanation": "The goal of CI is to have developers integrate code frequently into a shared mainline, with automated verification to detect integration errors as quickly as possible.",
    "source": "PSD Course — Continuous Integration",
    "tip": "CI goal = integrate frequently + detect errors quickly. Not about deployment."
  },
  {
    "id": 158,
    "category": "Backlog Management",
    "difficulty": "Easy",
    "question": "What kind of activity can be done in Product Backlog Refinement?",
    "options": [
      "Only estimation",
      "Adding details, estimates, and order to PBIs",
      "Only breaking down large items",
      "Only the Product Owner can refine"
    ],
    "correct": 1,
    "explanation": "Refinement includes adding details, estimates, and ordering to Product Backlog items. It's a comprehensive activity, not limited to just one aspect.",
    "source": "Scrum Guide 2020 — Product Backlog section",
    "tip": "Refinement = detail + estimate + order. A collaborative, ongoing activity."
  },
  {
    "id": 159,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "What is the recommended size of the Scrum Team?",
    "options": [
      "5-9 people",
      "10 or fewer people",
      "3-5 people",
      "15 people"
    ],
    "correct": 1,
    "explanation": "The Scrum Guide 2020 recommends 10 or fewer people on a Scrum Team. This includes the PO, SM, and all Developers.",
    "source": "Scrum Guide 2020 — Scrum Team section",
    "tip": "10 or fewer total (PO + SM + Developers). Small enough to be nimble."
  },
  {
    "id": 160,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "What are the duties of the Developers in a Scrum Team?",
    "options": [
      "Creating a plan for the Sprint (Sprint Backlog)",
      "Instilling quality by adhering to the DoD",
      "Adapting their plan each day toward the Sprint Goal",
      "Holding each other accountable as professionals",
      "All of the above"
    ],
    "correct": 4,
    "explanation": "All of these are Developers' responsibilities: creating the Sprint Backlog, adhering to DoD, adapting daily, and holding each other accountable.",
    "source": "Scrum Guide 2020 — Developers section",
    "tip": "Developers: plan, build, adapt, and hold each other accountable."
  },
  {
    "id": 161,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "True or False: One of the outcomes of using TDD is creating an automated Regression Test suite.",
    "options": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "True. A natural outcome of TDD is an automated regression test suite. Since every piece of code has tests written first, you accumulate a comprehensive suite of automated tests.",
    "source": "PSD Course — TDD Benefits",
    "tip": "TDD automatically creates a regression test suite as a beneficial side effect."
  },
  {
    "id": 162,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "Which work can be done between two Sprints?",
    "options": [
      "Bug fixing and preparation for the next Sprint",
      "Testing and deployment activities",
      "Backlog refinement",
      "There is no time between two Sprints — the next Sprint starts immediately"
    ],
    "correct": 3,
    "explanation": "There is no gap between Sprints. A new Sprint starts immediately after the previous one ends. All work happens within Sprints.",
    "source": "Scrum Guide 2020 — The Sprint section",
    "tip": "No gap between Sprints. All work occurs within a Sprint."
  },
  {
    "id": 163,
    "category": "Sprint Events",
    "difficulty": "Easy",
    "question": "How often should Sprint Planning be conducted?",
    "options": [
      "Once per Sprint",
      "Once per month",
      "Every two weeks",
      "Whenever the Product Owner decides"
    ],
    "correct": 0,
    "explanation": "Sprint Planning occurs once per Sprint, at the beginning. It initiates the Sprint by laying out the work to be performed.",
    "source": "Scrum Guide 2020 — Sprint Planning section",
    "tip": "One Sprint Planning per Sprint. It kicks off every Sprint."
  },
  {
    "id": 164,
    "category": "Done & Quality",
    "difficulty": "Easy",
    "question": "True or False: Creating a Done and potentially releasable Increment is the purpose of each Sprint.",
    "options": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "True. The purpose of a Sprint is to produce a valuable, useful Increment of working product that meets the Definition of Done.",
    "source": "Scrum Guide 2020 — The Sprint section",
    "tip": "Every Sprint must produce a Done Increment. Non-negotiable."
  },
  {
    "id": 165,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "What does Code Coverage mean?",
    "options": [
      "The percentage of requirements covered by the code",
      "The percentage of code executed when tests run",
      "The amount of documentation covering the code",
      "The percentage of bugs found by testing"
    ],
    "correct": 1,
    "explanation": "Code Coverage measures the percentage of code that is executed when the automated test suite runs. It's a metric of how much code is touched by tests.",
    "source": "PSD Course — Testing Metrics",
    "tip": "Code Coverage = % of code executed by tests. NOT % of bugs found."
  },
  {
    "id": 166,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "Who are responsible for monitoring the progress over the Project and Sprint?",
    "options": [
      "The Product Owner monitors progress over the project; the Developers monitor progress within the Sprint",
      "The Scrum Master monitors everything",
      "The Project Manager monitors progress",
      "Management monitors through weekly status reports"
    ],
    "correct": 0,
    "explanation": "The Product Owner monitors product-level progress (toward the Product Goal). The Developers monitor Sprint-level progress (toward the Sprint Goal).",
    "source": "Scrum Guide 2020 — Product Owner + Developers sections",
    "tip": "PO = product progress. Developers = Sprint progress. Each monitors their domain."
  },
  {
    "id": 167,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "Which is true about Strategic Debt in Technical Debt context?",
    "options": [
      "It is unintentional and should be avoided entirely",
      "It is a deliberate, conscious decision to take on tech debt for a strategic reason like faster time-to-market",
      "It is only caused by junior developers",
      "It is the same as negligent tech debt"
    ],
    "correct": 1,
    "explanation": "Strategic Debt is intentional technical debt taken on deliberately for business reasons (e.g., faster time-to-market). Unlike negligent debt, it's a conscious trade-off decision.",
    "source": "PSD Course — Technical Debt Management",
    "tip": "Strategic debt = intentional trade-off. Negligent debt = carelessness. Big difference."
  },
  {
    "id": 168,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What are the outputs of Sprint Planning?",
    "options": [
      "Sprint Backlog and Sprint Goal",
      "A detailed project plan",
      "A release plan",
      "Story points for each item"
    ],
    "correct": 0,
    "explanation": "Sprint Planning produces the Sprint Goal (why), the selected PBIs (what), and the plan for delivering them (Sprint Backlog). Together these form the Sprint Backlog.",
    "source": "Scrum Guide 2020 — Sprint Planning section",
    "tip": "Sprint Planning outputs: Sprint Goal + Sprint Backlog (selected PBIs + plan)."
  },
  {
    "id": 169,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "True or False: Dependency Inversion principle implies that entities must depend on abstractions not on concretions.",
    "options": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "True. The Dependency Inversion Principle (the 'D' in SOLID) states that high-level modules should not depend on low-level modules — both should depend on abstractions.",
    "source": "Robert C. Martin — SOLID Principles",
    "tip": "DIP = depend on abstractions, not concrete implementations."
  },
  {
    "id": 170,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "What will happen for the undone Sprint Backlog Items at the end of the Sprint?",
    "options": [
      "They are automatically moved to the next Sprint",
      "They go back to the Product Backlog for re-prioritization by the PO",
      "They are marked as partially done",
      "The Sprint is extended to finish them"
    ],
    "correct": 1,
    "explanation": "Undone items go back to the Product Backlog for the PO to re-prioritize. They are NOT automatically added to the next Sprint, marked partial, or cause Sprint extension.",
    "source": "Scrum Guide 2020 — Sprint Backlog + Increment sections",
    "tip": "Undone → back to Product Backlog → PO re-prioritizes. No extensions."
  },
  {
    "id": 171,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "What should the Developers do when the CEO assigns them unplanned work in the middle of the Sprint?",
    "options": [
      "Do the CEO's work immediately",
      "Inform the Product Owner and let the PO manage the Sprint scope",
      "Cancel the Sprint",
      "Work overtime to fit it all in"
    ],
    "correct": 1,
    "explanation": "External work requests go through the Product Owner. The Developers should inform the PO, who can then negotiate scope. Nobody outside the Scrum Team can change Sprint work.",
    "source": "Scrum Guide 2020 — The Sprint section",
    "tip": "All work goes through the PO. Developers direct the CEO to the PO."
  },
  {
    "id": 172,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "When can the Developers change their practices, tools, or techniques?",
    "options": [
      "Only during the Sprint Retrospective",
      "Only with management approval",
      "Whenever the team decides to improve",
      "Only at the start of a new Sprint"
    ],
    "correct": 2,
    "explanation": "Developers can change their practices, tools, and techniques at any time. Self-managing teams continuously improve how they work.",
    "source": "Scrum Guide 2020 — Self-management",
    "tip": "Self-managing teams improve continuously, not just during Retrospectives."
  },
  {
    "id": 173,
    "category": "Done & Quality",
    "difficulty": "Hard",
    "question": "How many Definitions of Done should be used in scaled Scrum?",
    "options": [
      "One per team",
      "One per product, shared by all teams",
      "One per Sprint",
      "One per release"
    ],
    "correct": 1,
    "explanation": "In scaled Scrum, all teams working on the same product share ONE Definition of Done. This ensures a consistent, integrated Increment.",
    "source": "Scrum Guide 2020 — Definition of Done section",
    "tip": "One product = one DoD. All teams must meet the same quality standard."
  },
  {
    "id": 174,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "Which two of the following are synonyms of TDD?",
    "options": [
      "Red-Green-Refactor",
      "Test First Development",
      "Test After Development",
      "Behavior Driven Design"
    ],
    "correct": [
      0,
      1
    ],
    "explanation": "Red-Green-Refactor and Test First Development are synonymous with TDD. Red = failing test, Green = passing code, Refactor = clean up.",
    "source": "PSD Course — TDD",
    "tip": "TDD = Red-Green-Refactor = Test First Development."
  },
  {
    "id": 175,
    "category": "Testing & Quality",
    "difficulty": "Easy",
    "question": "When should tests be added in the development process?",
    "options": [
      "After all code is written",
      "Before and during development",
      "Only during the testing phase",
      "Only before release"
    ],
    "correct": 1,
    "explanation": "Tests should be added before and during development. This aligns with TDD, ATDD, and the Scrum principle that testing is part of development, not a separate phase.",
    "source": "PSD Course — Testing in Scrum",
    "tip": "Test before and during development. Testing is NOT a separate phase."
  },
  {
    "id": 176,
    "category": "DevOps & Engineering",
    "difficulty": "Easy",
    "question": "Which language is usually used in BDD?",
    "options": [
      "Java",
      "Python",
      "Gherkin (Given-When-Then)",
      "SQL"
    ],
    "correct": 2,
    "explanation": "BDD typically uses Gherkin language with the Given-When-Then format. This creates a shared language between business and technical teams.",
    "source": "PSD Course — BDD",
    "tip": "BDD = Gherkin = Given-When-Then. Understood by all stakeholders."
  },
  {
    "id": 177,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "Which of the following are characteristics of a good bug report?",
    "options": [
      "Expected vs observed results",
      "Reproducible steps",
      "Build/version number",
      "Screenshots",
      "All of the above"
    ],
    "correct": 4,
    "explanation": "All of these are characteristics of good bug reports: expected vs observed results, reproducible steps, build number, and screenshots.",
    "source": "PSD Course — Quality Practices",
    "tip": "Good bug report = all the info needed to reproduce and understand the issue."
  },
  {
    "id": 178,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "Who creates the Sprint Backlog?",
    "options": [
      "The Product Owner",
      "The Scrum Master",
      "The Developers",
      "The Scrum Team"
    ],
    "correct": 2,
    "explanation": "The Developers create the Sprint Backlog. It's their plan for the Sprint. The PO helps clarify what items to work on, but the Developers create the plan for how.",
    "source": "Scrum Guide 2020 — Sprint Backlog section",
    "tip": "Sprint Backlog = Developers' plan. They create it, they own it."
  },
  {
    "id": 179,
    "category": "Done & Quality",
    "difficulty": "Easy",
    "question": "When is a feature done?",
    "options": [
      "When all code is written",
      "When it meets the Definition of Done",
      "When the PO accepts it",
      "When it's deployed to production"
    ],
    "correct": 1,
    "explanation": "A feature is done when it meets the Definition of Done. The DoD is the shared standard for completeness.",
    "source": "Scrum Guide 2020 — Definition of Done section",
    "tip": "Done = meets DoD. Not coding, not PO approval, not deployment."
  },
  {
    "id": 180,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "Why are mock objects used in Unit Tests?",
    "options": [
      "To simulate dependencies that are expensive or slow",
      "To isolate the unit being tested from its dependencies",
      "To verify interactions between the unit and its dependencies",
      "All of the above"
    ],
    "correct": 3,
    "explanation": "Mock objects serve all these purposes: simulating expensive dependencies, isolating the unit under test, and verifying interactions.",
    "source": "PSD Course — Test Doubles",
    "tip": "Mocks = isolate + simulate + verify. Essential for proper unit testing."
  },
  {
    "id": 181,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "Which is NOT true about Efferent Coupling?",
    "options": [
      "It measures the number of classes a given class depends on",
      "A high Ce value indicates the class is highly dependent on others",
      "A low Ce value means the class has few outgoing dependencies",
      "Efferent Coupling measures incoming dependencies"
    ],
    "correct": 3,
    "explanation": "Efferent Coupling (Ce) measures OUTGOING dependencies (what a class depends ON), not incoming. Afferent Coupling (Ca) measures incoming dependencies.",
    "source": "PSD Course — Code Metrics",
    "tip": "Efferent = outgoing (Exit). Afferent = incoming (Arrive). E = Exit, A = Arrive."
  },
  {
    "id": 182,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "What is the instability index metric calculation formula?",
    "options": [
      "I = Ce / (Ca + Ce)",
      "I = Ca / (Ca + Ce)",
      "I = Ca × Ce",
      "I = (Ca + Ce) / 2"
    ],
    "correct": 0,
    "explanation": "The Instability Index I = Ce / (Ca + Ce), where Ca is Afferent Coupling and Ce is Efferent Coupling. I ranges from 0 (stable) to 1 (unstable).",
    "source": "Robert Martin — Package Coupling Metrics",
    "tip": "I = Ce / (Ca + Ce). 0 = maximally stable, 1 = maximally unstable."
  },
  {
    "id": 183,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "Which is true about the Sprint Backlog?",
    "options": [
      "It is fixed once Sprint Planning ends",
      "It is updated by the Developers throughout the Sprint as they learn more",
      "It is managed by the Scrum Master",
      "It must contain all tasks before the Sprint begins"
    ],
    "correct": 1,
    "explanation": "The Sprint Backlog is a living plan that the Developers update throughout the Sprint. It evolves as they learn more during the Sprint.",
    "source": "Scrum Guide 2020 — Sprint Backlog section",
    "tip": "Sprint Backlog is LIVING. It evolves throughout the Sprint."
  },
  {
    "id": 184,
    "category": "Done & Quality",
    "difficulty": "Medium",
    "question": "Which is true about Definition of Done and Acceptance Criteria?",
    "options": [
      "They are the same thing",
      "DoD applies to all PBIs; Acceptance Criteria are specific to individual PBIs",
      "Acceptance Criteria replace the DoD",
      "DoD is optional if Acceptance Criteria exist"
    ],
    "correct": 1,
    "explanation": "The DoD is a shared standard that applies to ALL Product Backlog items. Acceptance Criteria are specific conditions for individual PBIs. Both are needed.",
    "source": "Scrum Guide 2020 — DoD section + PSD Course",
    "tip": "DoD = universal standard for ALL items. AC = specific to ONE item. Both are needed."
  },
  {
    "id": 185,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "Which principle is included in SOLID?",
    "options": [
      "Single Responsibility Principle",
      "Open/Closed Principle",
      "Liskov Substitution Principle",
      "Interface Segregation Principle",
      "Dependency Inversion Principle",
      "All of the above"
    ],
    "correct": 5,
    "explanation": "All five are SOLID principles: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion.",
    "source": "Robert C. Martin — SOLID Principles",
    "tip": "S-O-L-I-D: Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion."
  },
  {
    "id": 186,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "True or False: 100% Code Coverage of tests guarantees bug-free Software.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. 100% code coverage means all code is executed by tests, but it doesn't guarantee all edge cases, logic errors, or integration issues are caught. Coverage ≠ quality.",
    "source": "PSD Course — Testing Metrics",
    "tip": "100% coverage ≠ bug-free. Coverage measures code execution, not correctness."
  },
  {
    "id": 187,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "Who is responsible for monitoring the progress of work during a Sprint?",
    "options": [
      "The Scrum Master",
      "The Product Owner",
      "The Developers",
      "The Project Manager"
    ],
    "correct": 2,
    "explanation": "The Developers monitor their own progress during the Sprint. They track progress toward the Sprint Goal in the Daily Scrum.",
    "source": "Scrum Guide 2020 — Developers section",
    "tip": "Developers self-manage and track their own Sprint progress."
  },
  {
    "id": 188,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "Who can tell the Developers what to work on?",
    "options": [
      "The Scrum Master",
      "The Product Owner through the Product Backlog",
      "Management",
      "The Tech Lead"
    ],
    "correct": 1,
    "explanation": "The Product Owner influences what Developers work on through the ordered Product Backlog. No one directly tells the Developers what to do.",
    "source": "Scrum Guide 2020 — Product Owner section",
    "tip": "PO influences through backlog ordering. No one commands the Developers."
  },
  {
    "id": 189,
    "category": "Backlog Management",
    "difficulty": "Medium",
    "question": "Who can do the work to ensure the Product Backlog is refined to a state that it is useful?",
    "options": [
      "The Product Owner",
      "The Developers",
      "The Product Owner and the Developers",
      "The Scrum Master"
    ],
    "correct": 2,
    "explanation": "Both the Product Owner and the Developers collaborate on refinement. The PO provides business context, and the Developers provide technical insights.",
    "source": "Scrum Guide 2020 — Product Backlog section",
    "tip": "Refinement = PO + Developers collaborating. A team effort."
  },
  {
    "id": 190,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "Who manages the Sprint Backlog?",
    "options": [
      "The Scrum Master",
      "The Product Owner",
      "The Developers",
      "The Project Manager"
    ],
    "correct": 2,
    "explanation": "The Developers manage the Sprint Backlog. It's their plan, and they update it throughout the Sprint.",
    "source": "Scrum Guide 2020 — Sprint Backlog section",
    "tip": "Sprint Backlog = Developers manage it. Their plan, their updates."
  },
  {
    "id": 191,
    "category": "Cross-functional Teams",
    "difficulty": "Easy",
    "question": "Which statement best describes a cross-functional team?",
    "options": [
      "A team where each member has cross-functional skills",
      "A team with all skills needed to deliver a complete Increment without external help",
      "A team that works across multiple departments",
      "A team with specialists from every discipline"
    ],
    "correct": 1,
    "explanation": "A cross-functional team has all the skills needed to deliver a complete, Done Increment without depending on anyone outside the team.",
    "source": "Scrum Guide 2020 — Scrum Team section",
    "tip": "Cross-functional = self-sufficient. Can deliver end-to-end independently."
  },
  {
    "id": 192,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "Bugs discovered out of Sprint should be:",
    "options": [
      "Fixed immediately",
      "Added to the Product Backlog for prioritization",
      "Ignored until the next Sprint",
      "Assigned to the original developer"
    ],
    "correct": 1,
    "explanation": "Bugs found outside the Sprint should be added to the Product Backlog. The Product Owner prioritizes them alongside other work.",
    "source": "PSD Course — Bug Management",
    "tip": "Out-of-Sprint bugs → Product Backlog → PO prioritizes."
  },
  {
    "id": 193,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "When could a release to Production occur if a Scrum Team produced a Done Increment multiple times each day?",
    "options": [
      "Only at the Sprint Review",
      "Only at the end of the Sprint",
      "Every Sprint",
      "Multiple times per day, whenever the PO decides"
    ],
    "correct": 3,
    "explanation": "If the team produces Done Increments multiple times daily, release can happen anytime the PO decides. The Scrum Guide allows releasing at any time.",
    "source": "Scrum Guide 2020 — Increment section",
    "tip": "Release whenever it makes business sense. Done Increment can be released anytime."
  },
  {
    "id": 194,
    "category": "Cross-functional Teams",
    "difficulty": "Medium",
    "question": "Who may be best positioned to decide who will be the Scrum Master for a new Scrum Team?",
    "options": [
      "The team members themselves",
      "Management",
      "The Product Owner",
      "The HR department"
    ],
    "correct": 0,
    "explanation": "The team members themselves are best positioned to choose their Scrum Master. This supports self-management from the very start.",
    "source": "Scrum Guide 2020 — Self-management principles",
    "tip": "Self-management starts with choosing your own SM."
  },
  {
    "id": 195,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "True or False: A Scrum Team must be 10 or fewer people.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. The Scrum Guide says teams are 'typically 10 or fewer people.' It's a recommendation, not a hard rule. However, larger teams face communication challenges.",
    "source": "Scrum Guide 2020 — Scrum Team section",
    "tip": "10 or fewer is a RECOMMENDATION, not a strict limit. But bigger = harder."
  },
  {
    "id": 196,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "True or False: It is mandatory that the product Increment be released to production at the end of each Sprint.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. The Increment must be Done and potentially releasable, but the decision to actually release is a business decision made by the Product Owner.",
    "source": "Scrum Guide 2020 — Increment section",
    "tip": "Must be RELEASABLE. Doesn't have to be RELEASED. Release = business decision."
  },
  {
    "id": 197,
    "category": "Cross-functional Teams",
    "difficulty": "Medium",
    "question": "When should a Developer on a Scrum Team be replaced?",
    "options": [
      "Every Sprint to promote knowledge sharing",
      "As needed while taking into account a short-term reduction in productivity",
      "When the Scrum Master determines they're not productive",
      "Never — teams should not change composition"
    ],
    "correct": 1,
    "explanation": "Replace team members as needed, understanding there will be a temporary productivity drop. Don't rotate for the sake of it, but don't avoid necessary changes.",
    "source": "PSD Course — Team Dynamics",
    "tip": "Change when needed, expect short-term dip. Don't rotate just for fun."
  },
  {
    "id": 198,
    "category": "DevOps & Engineering",
    "difficulty": "Easy",
    "question": "Refactoring is:",
    "options": [
      "Rewriting the application from scratch",
      "Changing code structure without changing behavior",
      "Adding new features to existing code",
      "Debugging production issues"
    ],
    "correct": 1,
    "explanation": "Refactoring is changing the internal structure of code without changing its external behavior. It improves readability, maintainability, and design.",
    "source": "Martin Fowler — Refactoring",
    "tip": "Refactoring = internal change, same external behavior."
  },
  {
    "id": 199,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "Developers include which role(s)?",
    "options": [
      "Frontend Developer",
      "Backend Developer",
      "Tester",
      "All people who create the Increment"
    ],
    "correct": 3,
    "explanation": "In Scrum, 'Developers' refers to ALL people committed to creating any aspect of a usable Increment each Sprint, regardless of their specific skills.",
    "source": "Scrum Guide 2020 — Developers section",
    "tip": "Developers = everyone who builds the Increment. Not just coders."
  },
  {
    "id": 200,
    "category": "DevOps & Engineering",
    "difficulty": "Easy",
    "question": "True or False: The more code a Developer writes the better.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. More code ≠ better. Good developers write the MINIMUM code needed. Less code means less to maintain, fewer bugs, and lower complexity. Quality over quantity.",
    "source": "PSD Course — Code Quality",
    "tip": "Best code = least code that works. Simplicity is a virtue."
  }
];
