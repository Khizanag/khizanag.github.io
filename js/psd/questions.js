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
  },
  {
    "id": 201,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "What are the three pillars of empiricism in Scrum?",
    "options": [
      "Planning, Execution, Review",
      "Transparency, Inspection, Adaptation",
      "Commitment, Courage, Respect",
      "Vision, Strategy, Delivery"
    ],
    "correct": 1,
    "explanation": "Scrum is founded on empiricism and lean thinking. Empiricism asserts that knowledge comes from experience and making decisions based on what is observed. The three pillars are Transparency, Inspection, and Adaptation.",
    "tip": "Remember TIA: Transparency, Inspection, Adaptation.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 202,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "What are the five Scrum values?",
    "options": [
      "Commitment, Focus, Openness, Respect, Courage",
      "Integrity, Teamwork, Quality, Speed, Innovation",
      "Planning, Execution, Testing, Review, Delivery",
      "Transparency, Inspection, Adaptation, Empiricism, Lean Thinking"
    ],
    "correct": 0,
    "explanation": "The five Scrum values are Commitment, Focus, Openness, Respect, and Courage. Successful use of Scrum depends on people becoming more proficient in living these five values.",
    "tip": "Remember CFORC: Commitment, Focus, Openness, Respect, Courage.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 203,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "Who are the three accountabilities in Scrum?",
    "options": [
      "Project Manager, Development Team, Stakeholders",
      "Product Owner, Scrum Master, Development Team",
      "Product Owner, Scrum Master, Developers",
      "Business Owner, Scrum Master, Developers"
    ],
    "correct": 2,
    "explanation": "The Scrum Team consists of one Scrum Master, one Product Owner, and Developers. In the 2020 Scrum Guide, the term 'Development Team' was replaced with 'Developers' to reinforce that everyone on the Scrum Team is a Developer.",
    "tip": "The 2020 Scrum Guide uses 'Developers' not 'Development Team'.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 204,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "True or False: The Scrum Master is the leader of the Scrum Team and has the final say on technical decisions.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. The Scrum Master is a servant-leader for the Scrum Team. Developers are self-managing and determine how to accomplish their work. The Scrum Master does not make technical decisions for the team.",
    "tip": "The Scrum Master serves rather than commands.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 205,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "What is the recommended size of a Scrum Team?",
    "options": [
      "3 to 5 people",
      "5 to 9 people",
      "10 or fewer people",
      "As many people as needed to complete the work"
    ],
    "correct": 2,
    "explanation": "The Scrum Guide recommends that Scrum Teams are small enough to remain nimble and large enough to complete significant work within a Sprint, typically 10 or fewer people. Teams larger than 10 should consider whether a reorganization into multiple cohesive Scrum Teams, each focused on the same product, makes sense.",
    "tip": "10 or fewer is the guidance, including the Product Owner and Scrum Master.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 206,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "What are the three Scrum artifacts?",
    "options": [
      "Sprint Plan, Sprint Board, Release Plan",
      "Product Backlog, Sprint Backlog, Increment",
      "Product Vision, Product Roadmap, Product Backlog",
      "User Stories, Acceptance Criteria, Test Cases"
    ],
    "correct": 1,
    "explanation": "The three Scrum artifacts are the Product Backlog, the Sprint Backlog, and the Increment. Each artifact contains a commitment: the Product Goal, the Sprint Goal, and the Definition of Done, respectively.",
    "tip": "Product Backlog → Product Goal; Sprint Backlog → Sprint Goal; Increment → Definition of Done.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 207,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "What is the maximum length of a Sprint according to the Scrum Guide?",
    "options": [
      "2 weeks",
      "4 weeks",
      "1 month",
      "6 weeks"
    ],
    "correct": 2,
    "explanation": "Sprints are fixed-length events of one month or less to create consistency. A Sprint's horizon should not be so long that risk increases or the ability to adapt is lost.",
    "tip": "One calendar month is the stated maximum in the Scrum Guide.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 208,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "Can the Sprint Goal be changed during a Sprint?",
    "options": [
      "Yes, if the Product Owner requests it",
      "Yes, if the Developers request it",
      "No, the Sprint Goal is fixed for the duration of the Sprint",
      "Yes, if all Scrum Team members agree"
    ],
    "correct": 2,
    "explanation": "The Sprint Goal is fixed during the Sprint. While the scope of a Sprint may be clarified and renegotiated between the Product Owner and Developers, the Sprint Goal cannot be changed. Only if the Sprint Goal becomes obsolete can a Sprint be cancelled.",
    "tip": "Scope can flex, but the Sprint Goal is fixed.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 209,
    "category": "Scrum Framework",
    "difficulty": "Hard",
    "question": "Who has the authority to cancel a Sprint?",
    "options": [
      "The Scrum Master",
      "The Developers",
      "The Product Owner",
      "Any stakeholder with sufficient authority"
    ],
    "correct": 2,
    "explanation": "Only the Product Owner has the authority to cancel a Sprint. A Sprint can be cancelled if the Sprint Goal becomes obsolete. This might occur if the company changes direction, or if market or technology conditions change.",
    "tip": "Only the Product Owner can cancel a Sprint.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 210,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "Which statement best describes the Product Goal?",
    "options": [
      "A short description of the next Sprint's target",
      "A long-term objective for the Scrum Team that provides context for the Product Backlog",
      "A list of features to be delivered in the next release",
      "The acceptance criteria for the product increment"
    ],
    "correct": 1,
    "explanation": "The Product Goal describes a future state of the product which can serve as a target for the Scrum Team to plan against. It is the long-term objective for the Scrum Team. The Scrum Team must fulfill (or abandon) one objective before taking on the next.",
    "tip": "Product Goal is the long-term objective embedded in the Product Backlog.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 211,
    "category": "Sprint Events",
    "difficulty": "Easy",
    "question": "What is the purpose of the Daily Scrum?",
    "options": [
      "To report progress to the Product Owner and stakeholders",
      "To inspect progress toward the Sprint Goal and adapt the Sprint Backlog",
      "To update the project management tool with completed tasks",
      "To resolve impediments raised by the Scrum Master"
    ],
    "correct": 1,
    "explanation": "The Daily Scrum is a 15-minute event for the Developers to inspect progress toward the Sprint Goal and adapt the Sprint Backlog as necessary. It is not a status report; it is a planning event for the Developers.",
    "tip": "Daily Scrum = inspect Sprint progress + adapt Sprint Backlog.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 212,
    "category": "Sprint Events",
    "difficulty": "Easy",
    "question": "What is the time-box for the Daily Scrum?",
    "options": [
      "30 minutes",
      "15 minutes",
      "As long as needed to cover all impediments",
      "1 hour"
    ],
    "correct": 1,
    "explanation": "The Daily Scrum is a 15-minute event held every day of the Sprint for the Developers.",
    "tip": "Daily Scrum is always 15 minutes, no exceptions.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 213,
    "category": "Sprint Events",
    "difficulty": "Medium",
    "question": "Who is required to attend the Daily Scrum?",
    "options": [
      "The Developers, the Scrum Master, and the Product Owner",
      "The Developers only",
      "The entire Scrum Team",
      "The Developers and the Scrum Master"
    ],
    "correct": 1,
    "explanation": "The Daily Scrum is for the Developers. If the Product Owner or Scrum Master are actively working on Sprint Backlog items, they participate as Developers. The Scrum Master ensures the event occurs but need not be present.",
    "tip": "Daily Scrum is a Developers' meeting; others are optional attendees.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 214,
    "category": "Sprint Events",
    "difficulty": "Medium",
    "question": "What is the time-box for Sprint Planning for a one-month Sprint?",
    "options": [
      "4 hours",
      "6 hours",
      "8 hours",
      "As long as it takes"
    ],
    "correct": 2,
    "explanation": "Sprint Planning is time-boxed to a maximum of eight hours for a one-month Sprint. For shorter Sprints, the event is usually shorter.",
    "tip": "Sprint Planning = max 8 hours for a 1-month Sprint.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 215,
    "category": "Sprint Events",
    "difficulty": "Medium",
    "question": "What are the three topics addressed during Sprint Planning?",
    "options": [
      "Why is this Sprint valuable, What can be Done this Sprint, How will the chosen work get Done",
      "Who does what, When will it be done, How much will it cost",
      "Product vision, Sprint goal, Release plan",
      "Requirements, Design, Testing"
    ],
    "correct": 0,
    "explanation": "Sprint Planning addresses three topics: Why is this Sprint valuable (Sprint Goal), What can be Done this Sprint (selecting Product Backlog items), and How will the chosen work get Done (creating the Sprint Backlog plan).",
    "tip": "Why, What, How — the three topics of Sprint Planning.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 216,
    "category": "Sprint Events",
    "difficulty": "Easy",
    "question": "What is the time-box for the Sprint Review for a one-month Sprint?",
    "options": [
      "2 hours",
      "4 hours",
      "6 hours",
      "8 hours"
    ],
    "correct": 1,
    "explanation": "The Sprint Review is time-boxed to a maximum of four hours for a one-month Sprint.",
    "tip": "Sprint Review = max 4 hours for a 1-month Sprint.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 217,
    "category": "Sprint Events",
    "difficulty": "Medium",
    "question": "What is the primary purpose of the Sprint Review?",
    "options": [
      "To demonstrate completed work to the Product Owner for acceptance",
      "To inspect the outcome of the Sprint and determine future adaptations",
      "To update the team's velocity and burndown chart",
      "To celebrate the team's achievements"
    ],
    "correct": 1,
    "explanation": "The purpose of the Sprint Review is to inspect the outcome of the Sprint and determine future adaptations. The Scrum Team presents the results of their work to stakeholders and progress toward the Product Goal is discussed.",
    "tip": "Sprint Review = inspect the Increment + adapt the Product Backlog.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 218,
    "category": "Sprint Events",
    "difficulty": "Easy",
    "question": "What is the time-box for the Sprint Retrospective for a one-month Sprint?",
    "options": [
      "1 hour",
      "2 hours",
      "3 hours",
      "4 hours"
    ],
    "correct": 2,
    "explanation": "The Sprint Retrospective is time-boxed to a maximum of three hours for a one-month Sprint.",
    "tip": "Sprint Retrospective = max 3 hours for a 1-month Sprint.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 219,
    "category": "Sprint Events",
    "difficulty": "Medium",
    "question": "What is the primary purpose of the Sprint Retrospective?",
    "options": [
      "To review the product increment with stakeholders",
      "To plan improvements to the way the Scrum Team works",
      "To update the Product Backlog with new items",
      "To assign blame for any Sprint failures"
    ],
    "correct": 1,
    "explanation": "The purpose of the Sprint Retrospective is to plan ways to increase quality and effectiveness. The Scrum Team inspects how the last Sprint went with regards to individuals, interactions, processes, tools, and their Definition of Done.",
    "tip": "Retrospective = inspect how the team works + create actionable improvements.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 220,
    "category": "Sprint Events",
    "difficulty": "Hard",
    "question": "Can improvements identified in the Sprint Retrospective be added to the Sprint Backlog?",
    "options": [
      "No, they must go on the Product Backlog",
      "Yes, the most impactful improvements may be added to the Sprint Backlog for the next Sprint",
      "Yes, but only with the Product Owner's approval",
      "No, retrospective items are tracked separately from the Sprint Backlog"
    ],
    "correct": 1,
    "explanation": "The most impactful improvements are addressed as soon as possible and may even be added to the Sprint Backlog for the next Sprint. The Sprint Retrospective concludes the Sprint.",
    "tip": "High-priority retrospective improvements can go into the next Sprint Backlog.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 221,
    "category": "Sprint Events",
    "difficulty": "Medium",
    "question": "During Sprint Planning, who determines how many Product Backlog items the team will take into the Sprint?",
    "options": [
      "The Product Owner alone",
      "The Scrum Master based on historical velocity",
      "The Developers — only they can assess what is achievable",
      "The Product Owner and Scrum Master jointly"
    ],
    "correct": 2,
    "explanation": "Through discussion with the Product Owner, the Developers select items from the Product Backlog to include in the current Sprint. The Developers are the only ones who can assess what is achievable over the upcoming Sprint.",
    "tip": "Developers decide how much work to take; they are the only ones who can assess capacity.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 222,
    "category": "Sprint Events",
    "difficulty": "Hard",
    "question": "True or False: The Daily Scrum must use the three questions format (What did I do yesterday? What will I do today? What impediments do I have?).",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. The Scrum Guide 2020 no longer prescribes the three questions format. The Developers can select whatever structure and techniques they want as long as the Daily Scrum focuses on progress toward the Sprint Goal and produces an actionable plan for the next day of work.",
    "tip": "The 2020 Scrum Guide removed the mandatory three-question format for the Daily Scrum.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 223,
    "category": "Backlog Management",
    "difficulty": "Easy",
    "question": "Who is responsible for managing the Product Backlog?",
    "options": [
      "The Scrum Master",
      "The Developers",
      "The Product Owner",
      "The entire Scrum Team jointly"
    ],
    "correct": 2,
    "explanation": "The Product Owner is accountable for effective Product Backlog management, which includes developing and explicitly communicating the Product Goal, creating and clearly communicating Product Backlog items, ordering Product Backlog items, and ensuring the Product Backlog is transparent, visible, and understood.",
    "tip": "Product Owner is accountable for the Product Backlog.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 224,
    "category": "Backlog Management",
    "difficulty": "Medium",
    "question": "Who is responsible for sizing (estimating) Product Backlog items?",
    "options": [
      "The Product Owner",
      "The Scrum Master",
      "The Developers",
      "The Product Owner with input from the Developers"
    ],
    "correct": 2,
    "explanation": "The Developers who will be doing the work are responsible for sizing. The Product Owner may influence the Developers by helping them understand and select trade-offs, but the people who will perform the work make the final estimate.",
    "tip": "Developers size PBIs; Product Owner may influence but not impose estimates.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 225,
    "category": "Backlog Management",
    "difficulty": "Medium",
    "question": "What is Product Backlog refinement?",
    "options": [
      "Removing old items from the Product Backlog at the end of each Sprint",
      "The act of breaking down and further defining Product Backlog items into smaller, more precise items",
      "Reprioritizing the Product Backlog based on stakeholder feedback",
      "Estimating all Product Backlog items in story points"
    ],
    "correct": 1,
    "explanation": "Product Backlog refinement is the act of breaking down and further defining Product Backlog items into smaller, more precise items. This is an ongoing activity to add details, estimates, and order to items in the Product Backlog.",
    "tip": "Refinement = break down + add detail + re-order PBIs.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 226,
    "category": "Backlog Management",
    "difficulty": "Hard",
    "question": "How much time should Developers spend on Product Backlog refinement?",
    "options": [
      "No time — that is the Product Owner's responsibility",
      "Usually no more than 10% of the Developers' capacity",
      "At least 20% of the Sprint to ensure quality items",
      "As determined by the Scrum Master"
    ],
    "correct": 1,
    "explanation": "The Developers who will be doing the work are responsible for the sizing, and usually no more than 10% of the Developers' capacity is consumed in refining Product Backlog items.",
    "tip": "~10% of Developers' capacity is the guideline for refinement.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 227,
    "category": "Backlog Management",
    "difficulty": "Medium",
    "question": "What attribute is most important for Product Backlog items at the top of the backlog compared to those lower down?",
    "options": [
      "They must have business value assigned in monetary terms",
      "They are usually clearer and more detailed",
      "They must be estimated in hours",
      "They must have identified developers assigned to them"
    ],
    "correct": 1,
    "explanation": "Product Backlog items that will occupy the Developers for the upcoming Sprint are refined so that any one item can reasonably be done within the Sprint. Items higher in the Product Backlog are usually clearer and more detailed than lower ones.",
    "tip": "High-priority PBIs = clearer and more detailed; lower-priority = less refined.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 228,
    "category": "Backlog Management",
    "difficulty": "Hard",
    "question": "True or False: The Product Backlog is never complete.",
    "options": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "True. The Product Backlog is dynamic; it constantly changes to identify what the product needs to be appropriate, competitive, and useful. As long as a product exists, its Product Backlog also exists.",
    "tip": "The Product Backlog always evolves; it is never truly 'done'.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 229,
    "category": "Backlog Management",
    "difficulty": "Medium",
    "question": "What does the Sprint Backlog consist of?",
    "options": [
      "The Sprint Goal, the selected Product Backlog items, and a plan for delivering the Increment",
      "Only the tasks assigned to individual Developers",
      "The entire Product Backlog items ordered by the Product Owner for the Sprint",
      "Only story cards accepted by the Product Owner"
    ],
    "correct": 0,
    "explanation": "The Sprint Backlog is composed of the Sprint Goal (why), the set of Product Backlog items selected for the Sprint (what), as well as an actionable plan for delivering the Increment (how).",
    "tip": "Sprint Backlog = Sprint Goal + selected PBIs + delivery plan.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 230,
    "category": "Backlog Management",
    "difficulty": "Medium",
    "question": "Who owns the Sprint Backlog?",
    "options": [
      "The Product Owner",
      "The Scrum Master",
      "The Developers",
      "The entire Scrum Team"
    ],
    "correct": 2,
    "explanation": "The Sprint Backlog is a plan by and for the Developers. It is a highly visible, real-time picture of the work that the Developers plan to accomplish during the Sprint. Only the Developers can change the Sprint Backlog during the Sprint.",
    "tip": "The Sprint Backlog belongs to the Developers — only they can change it.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 231,
    "category": "Done & Quality",
    "difficulty": "Easy",
    "question": "What is the Definition of Done?",
    "options": [
      "A list of acceptance criteria for a specific Product Backlog item",
      "A formal description of the state of the Increment when it meets the quality measures required for the product",
      "A checklist of tasks to complete before the Sprint Review",
      "The criteria used by the Product Owner to accept completed work"
    ],
    "correct": 1,
    "explanation": "The Definition of Done is a formal description of the state of the Increment when it meets the quality measures required for the product. The moment a Product Backlog item meets the Definition of Done, an Increment is born.",
    "tip": "DoD is a shared understanding of quality standards, not per-item acceptance criteria.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 232,
    "category": "Done & Quality",
    "difficulty": "Medium",
    "question": "Who creates the Definition of Done?",
    "options": [
      "The Scrum Master",
      "The Product Owner",
      "If the organization has no existing standard, the Scrum Team must create one",
      "The Developers only"
    ],
    "correct": 2,
    "explanation": "If the Definition of Done for an Increment is part of the standards of the organization, all Scrum Teams must follow it as a minimum. If it is not an organizational standard, the Scrum Team must create a Definition of Done appropriate for the product.",
    "tip": "Organization may provide the DoD; if not, the Scrum Team creates one.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 233,
    "category": "Done & Quality",
    "difficulty": "Hard",
    "question": "What happens to work that does not meet the Definition of Done at the end of a Sprint?",
    "options": [
      "It is carried over automatically to the next Sprint",
      "It is returned to the Product Backlog and re-estimated",
      "It is discarded and must be re-done",
      "It is accepted by the Product Owner with documented exceptions"
    ],
    "correct": 1,
    "explanation": "If a Product Backlog item does not meet the Definition of Done, it cannot be released or presented at the Sprint Review. It returns to the Product Backlog for future consideration.",
    "tip": "Undone work returns to the Product Backlog — it is NOT carried to the Sprint Backlog.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 234,
    "category": "Done & Quality",
    "difficulty": "Medium",
    "question": "Can the Definition of Done be expanded during a Sprint Retrospective?",
    "options": [
      "No, it can only be changed before a new product is started",
      "Yes, Developers may discover that more stringent criteria are needed",
      "Only with the Product Owner's approval",
      "No, it is set once and cannot be changed"
    ],
    "correct": 1,
    "explanation": "Developers are required to conform to the Definition of Done. If there are multiple Scrum Teams working on a product, they must mutually define and comply with the same Definition of Done. Each Sprint Retrospective is an opportunity to update it.",
    "tip": "DoD can only get stricter — never be relaxed — to improve quality.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 235,
    "category": "Done & Quality",
    "difficulty": "Hard",
    "question": "True or False: Each Increment must be usable regardless of whether the Product Owner decides to release it.",
    "options": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "True. An Increment is a concrete stepping stone toward the Product Goal. Each Increment is additive to all prior Increments and thoroughly verified, ensuring that all Increments work together. In order to provide value, the Increment must be usable.",
    "tip": "Usability is required; actual release is the Product Owner's decision.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 236,
    "category": "Done & Quality",
    "difficulty": "Medium",
    "question": "What is technical debt in the context of Scrum?",
    "options": [
      "The total cost of all development tools and licenses",
      "The implied cost of additional rework caused by choosing a quick solution instead of a better approach",
      "The backlog items deferred to future Sprints",
      "The number of defects found after a product release"
    ],
    "correct": 1,
    "explanation": "Technical debt reflects the implied cost of additional rework caused by choosing an easy (limited) solution now instead of using a better approach that would take longer. Observing a good Definition of Done is the main safeguard against accumulating technical debt.",
    "tip": "A strong DoD prevents technical debt from accumulating.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 237,
    "category": "Done & Quality",
    "difficulty": "Hard",
    "question": "Where should technical debt be tracked?",
    "options": [
      "In a separate technical backlog owned by the Scrum Master",
      "On the Product Backlog",
      "In the team's wiki or documentation system",
      "Technical debt does not need to be formally tracked in Scrum"
    ],
    "correct": 1,
    "explanation": "Any technical debt which has been incurred needs to be accounted for on the Product Backlog. The Product Backlog must tell the truth at all times about the total amount of work remaining and this includes technical debt.",
    "tip": "Technical debt is a Product Backlog item — the Product Backlog must remain truthful.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 238,
    "category": "Cross-functional Teams",
    "difficulty": "Easy",
    "question": "What does 'cross-functional' mean in the context of a Scrum Team?",
    "options": [
      "Team members can work across multiple Scrum Teams simultaneously",
      "The team has all the skills necessary to create value each Sprint without depending on others outside the team",
      "Team members rotate responsibilities each Sprint",
      "The team includes members from multiple departments or business units"
    ],
    "correct": 1,
    "explanation": "Cross-functional teams have all the competencies needed to accomplish the work without depending on others not part of the team. This is essential for Scrum Teams to deliver a potentially releasable Increment each Sprint.",
    "tip": "Cross-functional = self-sufficient; the team doesn't need external help to complete its work.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 239,
    "category": "Cross-functional Teams",
    "difficulty": "Medium",
    "question": "True or False: In Scrum, Developers may specialize in one area (e.g., front-end, back-end, testing), but the team as a whole must be cross-functional.",
    "options": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "True. Individual Developers may have specialized skills, but accountability belongs to the Developers as a whole. The team collectively must possess all necessary skills to create the Increment without relying on people outside the team.",
    "tip": "Specialization is fine; collective cross-functionality is required.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 240,
    "category": "Cross-functional Teams",
    "difficulty": "Medium",
    "question": "What does 'self-managing' mean for Developers in Scrum?",
    "options": [
      "Developers report to no one and work independently without accountability",
      "Developers internally decide who does what, when, and how",
      "Developers choose their own product features to build",
      "Developers set their own salaries and working hours"
    ],
    "correct": 1,
    "explanation": "Self-managing means the Developers internally decide who does what, when, and how. This is different from 'self-organizing' (the term used in the 2017 Scrum Guide), reflecting that the team manages its own work rather than being directed.",
    "tip": "Self-managing = internal decisions about who/what/when/how.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 241,
    "category": "Cross-functional Teams",
    "difficulty": "Hard",
    "question": "A Scrum Team includes a Database Administrator (DBA) who is only needed part-time. The team lacks testing expertise. What is the best approach?",
    "options": [
      "Hire a dedicated tester and have the DBA work with multiple teams",
      "Encourage the DBA to also develop testing skills so the team becomes more cross-functional",
      "Ask the Scrum Master to perform testing duties",
      "Reduce Sprint length to accommodate the resource constraint"
    ],
    "correct": 1,
    "explanation": "Cross-functional teams benefit from team members broadening their skills. Encouraging the DBA to also develop testing skills improves the team's cross-functionality and reduces external dependencies. All team members are 'Developers' in Scrum and should contribute to all aspects of work.",
    "tip": "Encourage T-shaped skills — deep expertise in one area, broad capability in others.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 242,
    "category": "Cross-functional Teams",
    "difficulty": "Hard",
    "question": "A Developer is struggling with a task outside their core expertise. What is the Scrum approach?",
    "options": [
      "Reassign the task to a specialist from another team",
      "The Scrum Master should resolve the impediment by finding a specialist",
      "The Developers should collaborate and help each other; the whole team is accountable for the Sprint Goal",
      "Move the task to the next Sprint when the right specialist is available"
    ],
    "correct": 2,
    "explanation": "In Scrum, Developers are collectively accountable for creating a valuable, useful Increment every Sprint. They should help each other, swarm on problems, and not wait for a specialist. The team's accountability is shared, not siloed.",
    "tip": "Swarm and collaborate — the team's accountability is collective.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 243,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What is Test-Driven Development (TDD)?",
    "options": [
      "Writing all tests after all code has been written to verify correctness",
      "A development technique where tests are written before production code, then code is written to make the tests pass",
      "A process where testers lead the development team",
      "Using automated test tools to drive the development pipeline"
    ],
    "correct": 1,
    "explanation": "In TDD, developers write a failing test first, then write the minimum production code to make it pass, then refactor the code. The cycle is Red (failing test) → Green (passing test) → Refactor.",
    "tip": "TDD cycle: Red → Green → Refactor.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 244,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What are the desirable characteristics of a good unit test? (choose the best four)",
    "options": [
      "Makes assertions about only one logical concept, independent of other tests, small and fast, readable and maintainable",
      "Tests the entire application end-to-end, requires a database, runs only in production environment, tests multiple scenarios per test",
      "Written by a dedicated QA team, runs weekly, covers 100% code paths, integrates with external services",
      "Uses real production data, runs only during Sprint Review, requires manual execution, tests entire user flows"
    ],
    "correct": 0,
    "explanation": "Good unit tests are focused (one logical concept per test), independent of others, small and fast to execute, and readable and maintainable. They should not require external dependencies like databases or networks.",
    "tip": "Unit tests: focused, independent, fast, readable (FIFR).",
    "source": "PSD I Study Guide"
  },
  {
    "id": 245,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What is the primary benefit of Test-Driven Development?",
    "options": [
      "It eliminates the need for integration testing",
      "It promotes good design, separation of concerns, and results in higher code quality",
      "It allows developers to work faster by skipping design",
      "It guarantees zero defects in production"
    ],
    "correct": 1,
    "explanation": "TDD promotes good design because writing tests first forces developers to think about interfaces before implementation. It results in better separation of concerns, higher code quality, and a comprehensive regression test suite.",
    "tip": "TDD's main benefit is design improvement, not just bug detection.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 246,
    "category": "Testing & Quality",
    "difficulty": "Hard",
    "question": "What is Behavior-Driven Development (BDD)?",
    "options": [
      "A project management approach that focuses on measurable business outcomes",
      "A software development methodology that extends TDD by describing behavior from the user's perspective using Given-When-Then syntax",
      "A testing technique that focuses exclusively on system behavior at the UI level",
      "A Scrum-specific practice for defining the Definition of Done"
    ],
    "correct": 1,
    "explanation": "BDD is an Agile software development practice that extends TDD by using natural language constructs (Given-When-Then) to describe desired behavior. It focuses on user and system interactions and bridges the communication gap between business and technical teams.",
    "tip": "BDD uses Given-When-Then to express behavior from the user's perspective.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 247,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What is the difference between acceptance tests and unit tests?",
    "options": [
      "Acceptance tests are written by developers; unit tests are written by customers",
      "Acceptance tests verify the system meets business requirements from the user's perspective; unit tests verify individual components in isolation",
      "Acceptance tests are manual; unit tests are automated",
      "There is no meaningful difference; both terms are interchangeable"
    ],
    "correct": 1,
    "explanation": "Unit tests verify individual components or functions in isolation. Acceptance tests verify that the system meets business requirements from the user's perspective. Both types of tests are valuable and serve different purposes in a quality strategy.",
    "tip": "Unit tests = technical correctness; acceptance tests = business correctness.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 248,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What is a 'test double' in software testing?",
    "options": [
      "Running the same test twice to verify consistency",
      "A test object that stands in for a real dependency, such as a mock, stub, spy, fake, or dummy",
      "A secondary test environment that mirrors production",
      "An automated test that runs twice per day"
    ],
    "correct": 1,
    "explanation": "Test doubles are objects that stand in for real dependencies in tests. Types include mocks (verify interactions), stubs (return predefined values), spies (record interactions), fakes (simplified working implementations), and dummies (placeholder objects).",
    "tip": "Test doubles replace real dependencies to enable isolated unit testing.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 249,
    "category": "Testing & Quality",
    "difficulty": "Hard",
    "question": "Is code coverage percentage a reliable measure of code quality?",
    "options": [
      "Yes, 100% code coverage means the code is bug-free",
      "Yes, code coverage above 80% guarantees sufficient quality",
      "No, code coverage is only an indicator; high coverage does not ensure test quality or prevent all bugs",
      "No, code coverage is irrelevant to software quality"
    ],
    "correct": 2,
    "explanation": "Code coverage is only an indicator. It tells you which lines were executed, not whether the tests are meaningful or the assertions are correct. 100% coverage can still miss edge cases. Coverage should be used alongside other quality measures.",
    "tip": "Coverage = indicator only; it's about test quality, not just line execution.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 250,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What is regression testing?",
    "options": [
      "Testing features from previous Sprints to ensure new changes have not broken them",
      "Testing the product by reverting to an earlier version",
      "Testing the product in a degraded environment to measure performance",
      "A type of test performed only at product launch"
    ],
    "correct": 0,
    "explanation": "Regression testing verifies that previously working functionality still works after code changes. Automated regression test suites are critical in Scrum because code is changed frequently and each change could potentially break existing functionality.",
    "tip": "Regression tests protect existing functionality when new code is added.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 251,
    "category": "Testing & Quality",
    "difficulty": "Hard",
    "question": "At what point in the Sprint should testing occur?",
    "options": [
      "Only at the end of the Sprint before the Sprint Review",
      "In a dedicated testing Sprint after development is complete",
      "Continuously throughout the Sprint as code is written",
      "After all development tasks in the Sprint Backlog are complete"
    ],
    "correct": 2,
    "explanation": "Testing should occur continuously throughout the Sprint, not just at the end. This is a key practice for producing a potentially releasable Increment. Deferring testing creates a 'mini-waterfall' within the Sprint and risks quality issues.",
    "tip": "Test continuously during the Sprint — not just at the end.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 252,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What is the purpose of a Definition of Ready (DoR)?",
    "options": [
      "It is a mandatory Scrum artifact that defines when PBIs can enter a Sprint",
      "It is an optional team agreement describing when a Product Backlog item is sufficiently understood to be brought into Sprint Planning",
      "It defines the conditions under which the team can start the next Sprint",
      "It is the same as the Definition of Done but applied to Sprint Planning"
    ],
    "correct": 1,
    "explanation": "The Definition of Ready is NOT part of Scrum. It is an informal, optional practice some teams use to define when a PBI is 'ready' enough to be pulled into a Sprint. Overusing it can create unnecessary gates and slow refinement.",
    "tip": "DoR is NOT in the Scrum Guide — it's optional and can become an anti-pattern if misused.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 253,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What is Continuous Integration (CI)?",
    "options": [
      "Deploying the product to production every Sprint",
      "A software development practice where developers integrate and verify their work frequently, often multiple times each day",
      "A process of integrating new team members into the Scrum Team",
      "The automatic deployment of code to a staging environment once per day"
    ],
    "correct": 1,
    "explanation": "Continuous Integration is a software development practice where members of a team integrate their work frequently — usually each person integrates at least daily, leading to multiple integrations per day. Each integration is verified by an automated build to detect errors as quickly as possible.",
    "tip": "CI = frequent integration + automated build + fast feedback.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 254,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "When a Continuous Integration build fails, who should ideally repair it?",
    "options": [
      "The Scrum Master, as they are responsible for removing impediments",
      "A dedicated build engineer",
      "The person who broke the build or the whole team treats it as their highest priority",
      "The Product Owner, as it impacts the product quality"
    ],
    "correct": 2,
    "explanation": "When a CI build fails, fixing it should be the team's highest priority. Ideally, the person who made the change that broke the build fixes it immediately. The team should treat a broken build as a critical impediment.",
    "tip": "Broken build = team's #1 priority. Don't commit on a broken build.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 255,
    "category": "DevOps & Engineering",
    "difficulty": "Easy",
    "question": "What triggers a Continuous Integration build?",
    "options": [
      "A scheduled timer (e.g., nightly)",
      "A manual request from the Product Owner",
      "When new or changed code is committed to version control",
      "Only at the end of a Sprint"
    ],
    "correct": 2,
    "explanation": "CI builds should be triggered automatically whenever new or changed code is committed (checked in) to version control. This provides immediate feedback on integration issues.",
    "tip": "Commit triggers build — automated and immediate.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 256,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What is the difference between Continuous Delivery and Continuous Deployment?",
    "options": [
      "They are the same thing — both automatically deploy to production",
      "Continuous Delivery ensures software is always releasable but may require human approval for production; Continuous Deployment deploys every change to production automatically",
      "Continuous Delivery is for small changes; Continuous Deployment is for major releases",
      "Continuous Delivery is a Scrum practice; Continuous Deployment is a DevOps practice"
    ],
    "correct": 1,
    "explanation": "Continuous Delivery means every change is releasable to production at any time but a human decides when to deploy. Continuous Deployment goes further — every change that passes automated tests is deployed to production automatically without human intervention.",
    "tip": "CD (Delivery) = always releasable; CD (Deployment) = always deployed.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 257,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What is the primary benefit of automating the build and deployment process?",
    "options": [
      "It eliminates the need for developers to understand the deployment process",
      "It reduces human error, accelerates feedback, and enables frequent reliable releases",
      "It replaces the need for a Scrum Team to have a Definition of Done",
      "It allows the Product Owner to deploy features directly"
    ],
    "correct": 1,
    "explanation": "Automation reduces human error in build and deployment, provides fast and consistent feedback, and enables teams to release more frequently and reliably. This directly supports the Scrum goal of creating a potentially releasable Increment every Sprint.",
    "tip": "Automation = less error + faster feedback + more frequent releases.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 258,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "What is Infrastructure as Code (IaC)?",
    "options": [
      "Writing application code that manages itself in production",
      "Managing and provisioning computing infrastructure through machine-readable definition files rather than manual configuration",
      "The process of documenting infrastructure for the operations team",
      "A technique for embedding infrastructure logic within application code"
    ],
    "correct": 1,
    "explanation": "Infrastructure as Code (IaC) is the practice of managing and provisioning infrastructure (servers, networks, databases) through code and configuration files rather than through manual processes. This enables consistent, repeatable infrastructure setup and supports DevOps practices.",
    "tip": "IaC = treat infrastructure configuration like application code — version controlled, tested, automated.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 259,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What is a 'branching strategy' in version control?",
    "options": [
      "A plan for creating new Scrum Teams from an existing team",
      "A defined approach for using branches in version control to manage code changes and releases",
      "A sprint planning technique for dividing work among team members",
      "A management approach for handling team conflicts"
    ],
    "correct": 1,
    "explanation": "A branching strategy defines how a team uses branches in a version control system (e.g., Git) to organize code changes, manage features, fixes, and releases. Common strategies include trunk-based development, GitFlow, and feature branching.",
    "tip": "Short-lived feature branches and trunk-based development align best with CI practices.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 260,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "Why is trunk-based development preferred over long-lived feature branches when practicing Continuous Integration?",
    "options": [
      "It is easier to manage releases from a single branch",
      "It reduces merge conflicts and integration risk by keeping changes small and integrating frequently",
      "It prevents developers from overwriting each other's code",
      "It is required by the Scrum Guide"
    ],
    "correct": 1,
    "explanation": "Trunk-based development encourages developers to commit to the main branch frequently (multiple times per day), keeping changes small and reducing merge complexity. Long-lived branches can diverge significantly, making integration painful and delaying feedback.",
    "tip": "Trunk-based dev + CI = small commits, fast integration, less merge pain.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 261,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What is a 'feature toggle' (also called a feature flag)?",
    "options": [
      "A UI element that allows users to enable or disable product features",
      "A technique to deploy code to production while keeping a feature hidden until it is ready to be enabled",
      "A version control tag that marks completed features",
      "A sprint planning tool for toggling story priorities"
    ],
    "correct": 1,
    "explanation": "Feature toggles allow teams to deploy code to production with a feature disabled, then enable it when it's ready. This supports Continuous Deployment without exposing incomplete features to users and enables experimentation and gradual rollouts.",
    "tip": "Feature toggles decouple deployment from release — deploy any time, release when ready.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 262,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "True or False: The Scrum Guide requires teams to use specific engineering practices like CI/CD and TDD.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. The Scrum Guide does not prescribe specific technical practices. However, the PSD certification recognizes that practices like CI/CD, TDD, and automated testing are highly beneficial for producing a potentially releasable Increment each Sprint.",
    "tip": "Scrum framework is silent on specific technical practices — but quality must be maintained.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 263,
    "category": "Agile Principles",
    "difficulty": "Easy",
    "question": "How many principles are in the Agile Manifesto?",
    "options": [
      "4",
      "8",
      "12",
      "16"
    ],
    "correct": 2,
    "explanation": "The Agile Manifesto contains 4 values and 12 principles. The 12 principles guide agile teams in how to apply the four core values.",
    "tip": "Agile Manifesto = 4 values + 12 principles.",
    "source": "Agile Manifesto"
  },
  {
    "id": 264,
    "category": "Agile Principles",
    "difficulty": "Easy",
    "question": "What are the four values of the Agile Manifesto?",
    "options": [
      "Planning, Executing, Reviewing, Adapting",
      "Individuals and interactions over processes and tools; Working software over comprehensive documentation; Customer collaboration over contract negotiation; Responding to change over following a plan",
      "Speed, Quality, Collaboration, Transparency",
      "Scrum, Kanban, XP, SAFe"
    ],
    "correct": 1,
    "explanation": "The four Agile values are: Individuals and interactions over processes and tools; Working software over comprehensive documentation; Customer collaboration over contract negotiation; Responding to change over following a plan.",
    "tip": "Both sides have value — but the left side is valued more.",
    "source": "Agile Manifesto"
  },
  {
    "id": 265,
    "category": "Agile Principles",
    "difficulty": "Medium",
    "question": "What does the Agile principle 'Welcome changing requirements, even late in development' imply for Scrum teams?",
    "options": [
      "Teams should accept any change at any time without question",
      "Requirements can change even during a Sprint",
      "Agile harnesses change for the customer's competitive advantage through iterative delivery",
      "Developers should refactor code continuously to accommodate future changes"
    ],
    "correct": 2,
    "explanation": "This principle means that Agile processes embrace changing requirements even late in development because change creates customer competitive advantage. In Scrum, the Product Backlog allows priorities and scope to be adjusted between Sprints to maximize value.",
    "tip": "Change is embraced as a competitive advantage, not just tolerated.",
    "source": "Agile Manifesto"
  },
  {
    "id": 266,
    "category": "Agile Principles",
    "difficulty": "Medium",
    "question": "What is the Agile principle regarding working software as the primary measure of progress?",
    "options": [
      "Progress should be measured by the number of completed tasks",
      "Working software is the primary measure of progress",
      "Velocity and story points are the primary measures of progress",
      "Progress should be measured by adherence to the project plan"
    ],
    "correct": 1,
    "explanation": "The sixth principle of the Agile Manifesto states: 'Working software is the primary measure of progress.' This aligns with Scrum's emphasis on producing a potentially releasable Increment every Sprint.",
    "tip": "Working software, not docs or tasks completed, measures progress.",
    "source": "Agile Manifesto"
  },
  {
    "id": 267,
    "category": "Agile Principles",
    "difficulty": "Hard",
    "question": "What does the Agile principle 'Simplicity — the art of maximizing the amount of work not done — is essential' mean for developers?",
    "options": [
      "Developers should always choose the simplest possible implementation even if it creates technical debt",
      "Developers should build only what is needed now and avoid over-engineering or adding unrequested features",
      "The team should reduce the Sprint Backlog whenever possible",
      "Developers should skip documentation to focus on coding"
    ],
    "correct": 1,
    "explanation": "This principle advocates for YAGNI (You Aren't Gonna Need It) — building only what is required now. Over-engineering or adding speculative features wastes effort and adds complexity. Scrum supports this by delivering in small increments and refining needs as they emerge.",
    "tip": "YAGNI: build what's needed now; don't speculate about future needs.",
    "source": "Agile Manifesto"
  },
  {
    "id": 268,
    "category": "Agile Principles",
    "difficulty": "Medium",
    "question": "What is the Agile concept of 'sustainable pace'?",
    "options": [
      "Sprints should always have the same number of story points to create predictability",
      "Agile processes promote sustainable development where sponsors, developers, and users maintain a constant pace indefinitely",
      "Teams should work overtime to complete Sprint commitments",
      "Release cycles should be sustainable for the business, even if this means skipping a Sprint"
    ],
    "correct": 1,
    "explanation": "The eighth Agile principle promotes sustainable development: sponsors, developers, and users should be able to maintain a constant pace indefinitely. Overworking teams leads to burnout, declining quality, and increased technical debt.",
    "tip": "Sustainable pace: no death marches; teams must maintain quality long-term.",
    "source": "Agile Manifesto"
  },
  {
    "id": 269,
    "category": "Scrum Master",
    "difficulty": "Easy",
    "question": "What is the role of the Scrum Master in relation to the Scrum Team?",
    "options": [
      "To manage the Developers and assign tasks",
      "To serve the Scrum Team by coaching in self-management and cross-functionality and removing impediments",
      "To represent the Scrum Team to external stakeholders",
      "To track metrics and report progress to management"
    ],
    "correct": 1,
    "explanation": "The Scrum Master serves the Scrum Team in several ways, including coaching the team members in self-management and cross-functionality, helping focus on creating high-value Increments, causing the removal of impediments, and ensuring Scrum events take place and are positive, productive, and kept within the time-box.",
    "tip": "Scrum Master is a servant-leader, not a manager.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 270,
    "category": "Scrum Master",
    "difficulty": "Medium",
    "question": "What is the Scrum Master's responsibility regarding impediments?",
    "options": [
      "To personally resolve all impediments blocking the Developers",
      "To cause the removal of impediments to the Scrum Team's progress",
      "To escalate all impediments to management",
      "To log impediments in the Sprint Backlog as additional tasks"
    ],
    "correct": 1,
    "explanation": "The Scrum Master causes the removal of impediments, which may mean removing them directly, facilitating others to remove them, or coaching the team to remove them. The Scrum Master does not always resolve impediments personally.",
    "tip": "Scrum Master 'causes removal' — may facilitate rather than personally remove.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 271,
    "category": "Scrum Master",
    "difficulty": "Hard",
    "question": "How does the Scrum Master serve the Product Owner?",
    "options": [
      "By managing the Product Owner's calendar and stakeholder meetings",
      "By helping find techniques for effective Product Goal definition and Product Backlog management, facilitating stakeholder collaboration on request",
      "By creating the Product Backlog on behalf of the Product Owner",
      "By enforcing that the Product Owner attend all Scrum events"
    ],
    "correct": 1,
    "explanation": "The Scrum Master serves the Product Owner by helping find techniques for effective Product Goal definition and Product Backlog management; helping the Scrum Team understand the need for clear and concise Product Backlog items; helping establish empirical product planning for a complex environment; and facilitating stakeholder collaboration as requested or needed.",
    "tip": "Scrum Master helps the PO with backlog management, goal definition, and stakeholder facilitation.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 272,
    "category": "Scrum Master",
    "difficulty": "Medium",
    "question": "How does the Scrum Master serve the organization?",
    "options": [
      "By managing the organization's Scrum implementation program",
      "By leading and training the organization in Scrum adoption, planning Scrum implementations, and helping employees and stakeholders understand Scrum",
      "By reporting team velocity and burn-down to management",
      "By ensuring all teams in the organization use the same Sprint length"
    ],
    "correct": 1,
    "explanation": "The Scrum Master serves the organization by leading, training, and coaching the organization in its Scrum adoption; planning and advising Scrum implementations; helping employees and stakeholders understand and enact Scrum and empirical product development; and removing barriers between stakeholders and Scrum Teams.",
    "tip": "Scrum Master is a change agent for the whole organization, not just the team.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 273,
    "category": "Scrum Master",
    "difficulty": "Hard",
    "question": "True or False: The Scrum Master is responsible for tracking the team's velocity and presenting it to management.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. Velocity tracking is not prescribed by Scrum. The Scrum Guide does not mention velocity. If a team chooses to track velocity, it is a team tool, not a management reporting metric. The Scrum Master serves the team and organization but does not report team metrics to management for control purposes.",
    "tip": "Velocity is NOT in the Scrum Guide and not a Scrum Master responsibility.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 274,
    "category": "Advanced Scrum",
    "difficulty": "Hard",
    "question": "True or False: 'Sprint 0' is a legitimate Scrum practice to set up infrastructure before development begins.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. 'Sprint 0' is not part of the Scrum framework. The Scrum Guide states that each Sprint produces a potentially releasable Increment of 'Done' product. A Sprint focused only on setup or infrastructure does not produce a usable Increment and is considered an anti-pattern.",
    "tip": "Sprint 0 is an anti-pattern — infrastructure setup should be done as part of regular Sprints.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 275,
    "category": "Advanced Scrum",
    "difficulty": "Hard",
    "question": "True or False: A 'hardening Sprint' used to fix bugs and stabilize software before release is a legitimate Scrum practice.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. A hardening Sprint indicates the team has not been producing 'Done' Increments. If testing and bug-fixing are not part of every Sprint, the team violates the spirit of Scrum. The need for a hardening Sprint signals problems with the Definition of Done.",
    "tip": "Hardening Sprints are an anti-pattern — quality must be built in, not bolted on.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 276,
    "category": "Advanced Scrum",
    "difficulty": "Hard",
    "question": "What is emergent architecture in the context of Scrum?",
    "options": [
      "Architecture decided upfront by an architect before development begins",
      "Architecture that evolves incrementally as the team learns more about the domain and requirements",
      "Architecture that automatically adapts to user load",
      "Architecture defined by a steering committee outside the Scrum Team"
    ],
    "correct": 1,
    "explanation": "In Scrum, architecture emerges incrementally — the Scrum Team makes architectural decisions just-in-time as they learn from building and delivering Increments. This contrasts with big-design-up-front (BDUF) where all architecture is specified before development starts.",
    "tip": "Emergent architecture = just-in-time design decisions informed by working software.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 277,
    "category": "Advanced Scrum",
    "difficulty": "Hard",
    "question": "Who is responsible for the architecture of the system being built in Scrum?",
    "options": [
      "The Scrum Master",
      "A dedicated software architect outside the Scrum Team",
      "The Developers collectively",
      "The Product Owner"
    ],
    "correct": 2,
    "explanation": "In Scrum, the Developers are collectively responsible for design and architecture decisions. There is no separate architect role. Architectural decisions should emerge from the team based on working software and empirical learning.",
    "tip": "Architecture is owned by the Developers collectively — no separate architect role in Scrum.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 278,
    "category": "Advanced Scrum",
    "difficulty": "Medium",
    "question": "What does 'potentially releasable Increment' mean?",
    "options": [
      "The increment has been released to production",
      "The increment meets the Definition of Done and can be released to production at the Product Owner's discretion",
      "The increment has been approved by stakeholders in the Sprint Review",
      "The increment has passed automated tests but not yet been manually tested"
    ],
    "correct": 1,
    "explanation": "A 'potentially releasable Increment' means the Increment meets the Definition of Done and is in a state where the Product Owner can decide to release it. Whether it is actually released is the Product Owner's decision, but the technical readiness must be there.",
    "tip": "Potentially releasable = meets DoD and technically ready; actual release is PO's call.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 279,
    "category": "Advanced Scrum",
    "difficulty": "Hard",
    "question": "A Scrum Team is struggling because multiple teams are working on the same product and integration is difficult. What is the best approach?",
    "options": [
      "Assign an integration team to handle all cross-team integration",
      "Adopt a scaled Scrum framework like Nexus and create a shared Definition of Done, integrated backlog, and shared integration practices",
      "Have each team release independently and integrate at the end of the quarter",
      "Reduce the number of teams working on the product"
    ],
    "correct": 1,
    "explanation": "When multiple Scrum Teams work on the same product, they need coordinated practices. Nexus is Scrum.org's scaling framework that adds a Nexus Integration Team and coordination events to manage dependencies. A shared Definition of Done and integrated Product Backlog are essential.",
    "tip": "Multi-team integration requires shared DoD, integrated backlog, and frameworks like Nexus.",
    "source": "Nexus Guide"
  },
  {
    "id": 280,
    "category": "Advanced Scrum",
    "difficulty": "Medium",
    "question": "What is the purpose of refactoring in software development?",
    "options": [
      "To add new features to existing code",
      "To improve the internal structure of code without changing its external behavior",
      "To rewrite legacy code from scratch",
      "To remove features that are no longer needed"
    ],
    "correct": 1,
    "explanation": "Refactoring is the process of improving the internal structure of code (making it cleaner, simpler, more maintainable) without changing its external behavior. It is a critical practice for managing technical debt and keeping code adaptable.",
    "tip": "Refactoring = improve structure, not behavior; requires a safety net of tests.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 281,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What is Acceptance Test-Driven Development (ATDD)?",
    "options": [
      "A practice where the Product Owner writes acceptance tests before developers write code",
      "A collaborative practice where developers, testers, and business stakeholders write acceptance tests before writing the code to pass them",
      "A technique for automatically generating acceptance tests from user stories",
      "A method for managing the Definition of Done using acceptance criteria"
    ],
    "correct": 1,
    "explanation": "ATDD is a test-first practice where developers, testers, and business stakeholders collaborate to write acceptance tests before implementation. This ensures shared understanding of requirements and builds in quality from the start.",
    "tip": "ATDD involves business, dev, and QA together writing tests first — it's a team sport.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 282,
    "category": "Testing & Quality",
    "difficulty": "Hard",
    "question": "What is the primary difference between black-box testing and white-box testing?",
    "options": [
      "Black-box testing is automated; white-box testing is manual",
      "Black-box testing tests behavior without knowledge of internals; white-box testing tests with knowledge of the internal structure",
      "Black-box testing is for acceptance; white-box testing is for unit tests",
      "Black-box testing is done by testers; white-box testing is done by developers"
    ],
    "correct": 1,
    "explanation": "Black-box testing treats the system as a black box — testers know the inputs and expected outputs but not the internal code. White-box testing (also called glass-box or structural testing) involves testing with knowledge of the internal code structure, paths, and logic.",
    "tip": "Black-box = behavior-only testing; white-box = knowledge of internal code.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 283,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What is exploratory testing?",
    "options": [
      "Running the same test cases repeatedly to verify consistency",
      "Simultaneous learning, test design, and test execution where testers actively explore the product",
      "Testing all possible input combinations systematically",
      "Testing based on pre-defined scripts with no deviation allowed"
    ],
    "correct": 1,
    "explanation": "Exploratory testing involves simultaneous learning, test design, and execution. Testers actively explore the software without following scripted test cases, using their domain knowledge and creativity to find defects. It complements automated tests and finds unexpected issues.",
    "tip": "Exploratory testing = learn + design + execute simultaneously; unscripted and creative.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 284,
    "category": "Testing & Quality",
    "difficulty": "Hard",
    "question": "What is the 'test pyramid' concept?",
    "options": [
      "A hierarchy where acceptance tests are at the bottom and unit tests at the top",
      "A model suggesting that teams should have many unit tests, fewer integration tests, and even fewer end-to-end tests",
      "A framework for prioritizing which tests to automate first",
      "A Scrum-specific artifact for tracking testing progress"
    ],
    "correct": 1,
    "explanation": "The test pyramid describes an ideal distribution of test types: a broad base of fast, cheap unit tests; a smaller layer of integration tests; and a small apex of slow, expensive end-to-end/UI tests. This distribution maximizes test speed and reliability.",
    "tip": "Test pyramid: many unit tests + fewer integration + fewest E2E tests.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 285,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What is pair programming?",
    "options": [
      "Two programmers working independently on the same user story",
      "Two programmers working together at one workstation, with one typing and the other reviewing",
      "A developer pairing with a tester to write acceptance tests",
      "Two developers comparing their implementations of the same feature"
    ],
    "correct": 1,
    "explanation": "Pair programming is an XP (Extreme Programming) practice where two developers work together at one workstation — one writes code (the 'driver') while the other reviews (the 'navigator'). They switch roles frequently. It produces higher quality code, spreads knowledge, and catches defects earlier.",
    "tip": "Pair programming: driver + navigator; roles switch regularly.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 286,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What are the benefits of pair programming?",
    "options": [
      "Doubles team velocity by having two people write code simultaneously",
      "Reduces defects, improves code quality, spreads knowledge, and provides real-time code review",
      "Eliminates the need for separate code reviews",
      "Allows a developer to rest while the other codes"
    ],
    "correct": 1,
    "explanation": "Pair programming reduces defect rates (the navigator catches issues immediately), improves code design, spreads knowledge across the team, provides real-time code review, and helps junior developers learn from seniors. The upfront time investment pays off in reduced rework.",
    "tip": "Pairing = fewer bugs, shared knowledge, better design — worth the time cost.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 287,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What is the SOLID principle 'Single Responsibility Principle' (SRP)?",
    "options": [
      "A class should do only one thing and do it extremely well",
      "A class should have only one reason to change",
      "Each method should be responsible for a single variable",
      "A module should have a single public interface"
    ],
    "correct": 1,
    "explanation": "The Single Responsibility Principle states that a class should have only one reason to change, meaning it should have only one job or responsibility. This reduces coupling and makes code more maintainable.",
    "tip": "SRP: one class, one responsibility, one reason to change.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 288,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What is the SOLID principle 'Open/Closed Principle' (OCP)?",
    "options": [
      "Code should be open for modification but closed for extension",
      "Software entities should be open for extension but closed for modification",
      "Public APIs should be open; internal code should be closed to external access",
      "Open-source code should be closed once released to avoid instability"
    ],
    "correct": 1,
    "explanation": "The Open/Closed Principle states that software entities (classes, modules, functions) should be open for extension (you can add new behavior) but closed for modification (you don't change existing code). This is typically achieved through abstraction and polymorphism.",
    "tip": "OCP: extend, don't modify. Add new code rather than changing existing code.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 289,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "What is the SOLID principle 'Liskov Substitution Principle' (LSP)?",
    "options": [
      "Subclasses should be substitutable for their parent classes without altering the correctness of the program",
      "Derived classes should always override all methods of their parent class",
      "Base classes should be abstract and never instantiated directly",
      "A class hierarchy should have no more than three levels of inheritance"
    ],
    "correct": 0,
    "explanation": "The Liskov Substitution Principle states that if S is a subtype of T, then objects of type T may be replaced with objects of type S without altering any of the desirable properties of the program. Violating LSP usually indicates a poor inheritance hierarchy.",
    "tip": "LSP: subclass must be substitutable for its parent without breaking the program.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 290,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "What is the SOLID principle 'Interface Segregation Principle' (ISP)?",
    "options": [
      "All interfaces should be implemented by a single class",
      "Clients should not be forced to depend on interfaces they do not use",
      "Interfaces should be private by default to reduce coupling",
      "Each interface should contain exactly one method"
    ],
    "correct": 1,
    "explanation": "The Interface Segregation Principle states that no client should be forced to depend on methods it does not use. Large interfaces should be split into smaller, more specific ones so that clients only need to know about the methods relevant to them.",
    "tip": "ISP: many small, specific interfaces are better than one large, general interface.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 291,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "What is the SOLID principle 'Dependency Inversion Principle' (DIP)?",
    "options": [
      "High-level modules should depend on low-level modules directly",
      "High-level modules should not depend on low-level modules; both should depend on abstractions",
      "Dependencies should always be injected through constructors",
      "The application should depend on a single framework or library"
    ],
    "correct": 1,
    "explanation": "The Dependency Inversion Principle states that high-level modules should not depend on low-level modules — both should depend on abstractions. Also, abstractions should not depend on details; details should depend on abstractions. This enables loose coupling and testability.",
    "tip": "DIP: depend on abstractions (interfaces), not concrete implementations.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 292,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What is 'coupling' in software design?",
    "options": [
      "The degree to which a module has a single, focused responsibility",
      "The degree of interdependence between software modules",
      "The process of connecting two software systems via an API",
      "The relationship between a parent class and its subclasses"
    ],
    "correct": 1,
    "explanation": "Coupling is the degree of interdependence between software modules. High coupling means modules are tightly interconnected and changes to one can affect others. Low (loose) coupling is desirable as it makes modules easier to change, test, and maintain independently.",
    "tip": "Low coupling = easier to change independently; high coupling = brittle code.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 293,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What is 'cohesion' in software design?",
    "options": [
      "The degree to which elements of a module belong together and serve a single purpose",
      "The process of merging code branches in version control",
      "The ability of a system to function under high load conditions",
      "The consistency of coding standards across the team"
    ],
    "correct": 0,
    "explanation": "Cohesion refers to how closely the responsibilities within a module are related to each other. High cohesion means a module has a well-defined, focused responsibility. The goal is high cohesion and low coupling.",
    "tip": "High cohesion = focused, single-purpose module. High cohesion + low coupling = good design.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 294,
    "category": "Backlog Management",
    "difficulty": "Medium",
    "question": "What is the difference between a Product Backlog item (PBI) and a task?",
    "options": [
      "PBIs and tasks are the same — both represent work to be done",
      "PBIs are value-delivering items from the Product Backlog; tasks are the technical work Developers identify in Sprint Planning to accomplish a PBI",
      "Tasks are in the Product Backlog; PBIs are in the Sprint Backlog",
      "PBIs are created by the Product Owner; tasks are created by the Scrum Master"
    ],
    "correct": 1,
    "explanation": "Product Backlog items describe value-delivering work (e.g., user stories, features, bugs). During Sprint Planning, Developers decompose selected PBIs into tasks — technical activities needed to complete the PBI. Tasks live in the Sprint Backlog.",
    "tip": "PBIs = what value to deliver; tasks = how to technically deliver it.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 295,
    "category": "Backlog Management",
    "difficulty": "Hard",
    "question": "True or False: Tasks in the Sprint Backlog must be estimated in hours.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. The Scrum Guide does not prescribe how tasks should be estimated or tracked. Teams may use hours, story points, T-shirt sizes, or any other technique — or none at all. The Sprint Backlog must be visible and reflect the current state of work, but the estimation unit is the team's choice.",
    "tip": "No prescribed estimation unit in Scrum — the team chooses their approach.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 296,
    "category": "Backlog Management",
    "difficulty": "Medium",
    "question": "What is the purpose of backlog ordering (previously called prioritization)?",
    "options": [
      "To ensure the most important work is available at the top and ready to be pulled into the next Sprint",
      "To ensure equal distribution of work across Sprints",
      "To sort items alphabetically for easier navigation",
      "To separate technical debt from feature work"
    ],
    "correct": 0,
    "explanation": "The Product Owner orders the Product Backlog to maximize value. Items at the top are highest priority and ready to be selected for the next Sprint. Ordering considers value, risk, dependencies, and learning opportunities.",
    "tip": "Ordering is not just priority — it also considers risk, dependencies, and value.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 297,
    "category": "Backlog Management",
    "difficulty": "Hard",
    "question": "Can a Developer add items to the Sprint Backlog during a Sprint?",
    "options": [
      "No — the Sprint Backlog is fixed at Sprint Planning",
      "Yes — Developers can add tasks and re-plan within the Sprint Backlog as they learn more",
      "Yes — but only with the Product Owner's approval",
      "Yes — but only the Scrum Master can authorize additions"
    ],
    "correct": 1,
    "explanation": "The Sprint Backlog is a living plan. As Developers learn more during the Sprint, they may add new tasks or remove unnecessary ones. The Sprint Backlog is updated throughout the Sprint — the Sprint Goal is fixed, but the plan to achieve it can adapt.",
    "tip": "Sprint Backlog is a living plan; the Sprint Goal is fixed but the plan can change.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 298,
    "category": "Scrum Framework",
    "difficulty": "Hard",
    "question": "What does 'transparency' mean as a pillar of Scrum?",
    "options": [
      "All code must be open-source and publicly available",
      "The emergent process and work must be visible to those performing the work as well as those receiving the work",
      "Team members must share their personal performance metrics with management",
      "The Product Backlog must be publicly visible to all organizational stakeholders"
    ],
    "correct": 1,
    "explanation": "Transparency in Scrum means that the process and work must be visible to those doing the work and those receiving it. Low transparency impedes inspection and adaptation. The Scrum artifacts (Product Backlog, Sprint Backlog, Increment) are the primary transparency tools.",
    "tip": "Transparency enables inspection; inspection enables adaptation.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 299,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "What is meant by 'inspection' in Scrum?",
    "options": [
      "A formal audit of the team's code quality by an external reviewer",
      "Scrum Team members frequently inspect the Scrum artifacts and progress toward agreed-upon goals to detect potentially undesirable variances",
      "The Product Owner's review of completed work before accepting it",
      "Management reviewing the team's velocity and burndown charts"
    ],
    "correct": 1,
    "explanation": "Inspection means the Scrum artifacts and the progress toward agreed-upon goals must be inspected frequently and diligently to detect potentially undesirable variances or problems. Inspection occurs at all five Scrum events.",
    "tip": "Inspection happens in all five Scrum events — not just the Sprint Review.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 300,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "What is meant by 'adaptation' in Scrum?",
    "options": [
      "Changing the Scrum framework to fit the organization's existing processes",
      "If inspection reveals that aspects of the process deviate outside acceptable limits, the process or product being built must be adjusted",
      "Developers adapting their individual work styles to team norms",
      "Updating the Scrum Guide based on new learning"
    ],
    "correct": 1,
    "explanation": "Adaptation means that if inspection reveals deviations outside acceptable limits, an adjustment must be made as soon as possible to minimize further deviation. This is why Scrum events are both inspection and adaptation opportunities.",
    "tip": "Adaptation = course-correct based on inspection findings.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 301,
    "category": "Scrum Framework",
    "difficulty": "Hard",
    "question": "What are the five Scrum events?",
    "options": [
      "Sprint, Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective",
      "Sprint Kickoff, Sprint Planning, Daily Standup, Sprint Demo, Sprint Retrospective",
      "Project Initiation, Sprint Planning, Daily Scrum, Sprint Demo, Sprint Close",
      "Backlog Refinement, Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective"
    ],
    "correct": 0,
    "explanation": "The five Scrum events are the Sprint (which contains all other events), Sprint Planning, the Daily Scrum, the Sprint Review, and the Sprint Retrospective. The Sprint itself is a container event for all the others.",
    "tip": "The Sprint is the container; the other four events occur within it.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 302,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "True or False: Backlog Refinement is a mandatory Scrum event.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. Backlog Refinement is not one of the five formal Scrum events. It is an ongoing activity that happens throughout the Sprint. The Scrum Guide states it is 'an ongoing activity to add details, estimates, and order to items in the Product Backlog,' not a formal event.",
    "tip": "Refinement is an ongoing activity, not a formal Scrum event.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 303,
    "category": "Scrum Framework",
    "difficulty": "Hard",
    "question": "What is the commitment associated with the Sprint Backlog?",
    "options": [
      "The Product Goal",
      "The Definition of Done",
      "The Sprint Goal",
      "The team's velocity commitment"
    ],
    "correct": 2,
    "explanation": "The Sprint Goal is the commitment for the Sprint Backlog. Each artifact contains a commitment: the Product Backlog has the Product Goal, the Sprint Backlog has the Sprint Goal, and the Increment has the Definition of Done.",
    "tip": "Product Backlog → Product Goal; Sprint Backlog → Sprint Goal; Increment → DoD.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 304,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "Can a Scrum Team deliver multiple Increments within a single Sprint?",
    "options": [
      "No — only one Increment can be delivered per Sprint",
      "Yes — multiple Increments may be created within a Sprint",
      "Yes — but only if the Sprint is longer than two weeks",
      "No — Increments are only created at Sprint Review time"
    ],
    "correct": 1,
    "explanation": "Multiple Increments may be created within a Sprint. The sum of all Increments is presented at the Sprint Review supporting empiricism. An Increment may be delivered to stakeholders prior to the end of the Sprint. The Sprint Review should never be considered a gate to releasing value.",
    "tip": "Multiple Increments per Sprint is allowed and encouraged.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 305,
    "category": "Scrum Framework",
    "difficulty": "Hard",
    "question": "True or False: The Scrum Team should change the Sprint length frequently to adapt to workload changes.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. Sprints should have a consistent, fixed length to create rhythm and enable learning. Changing Sprint length disrupts the team's ability to inspect and adapt, measure velocity, and establish sustainable pace. Consistency is a key principle.",
    "tip": "Fixed-length Sprints create cadence; frequent changes disrupt learning and predictability.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 306,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What is the purpose of code reviews in a Scrum Team?",
    "options": [
      "To assess developer performance for HR purposes",
      "To improve code quality, share knowledge, and catch defects before they reach production",
      "To ensure the Scrum Master approves all code changes",
      "To replace unit testing as a quality assurance mechanism"
    ],
    "correct": 1,
    "explanation": "Code reviews (or peer reviews) improve code quality by catching defects early, spreading knowledge across the team, ensuring coding standards are met, and supporting collective code ownership. They complement automated testing but do not replace it.",
    "tip": "Code reviews = quality gate, knowledge sharing, and standards enforcement.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 307,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What is 'collective code ownership' in Extreme Programming (XP)?",
    "options": [
      "The organization owns all code produced by employees",
      "Any team member can change any part of the code at any time — no one has exclusive ownership of any module",
      "Code ownership is shared equally among all developers based on contribution",
      "A legal framework for protecting software intellectual property"
    ],
    "correct": 1,
    "explanation": "Collective code ownership means any developer can change any part of the codebase at any time. This encourages responsibility for the whole system, prevents knowledge silos, and enables the team to work on any part of the code as needed.",
    "tip": "Collective ownership = no silos; anyone can improve any part of the code.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 308,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What is the 'Definition of Done' and how does it relate to engineering practices?",
    "options": [
      "It is a list of acceptance criteria for each user story",
      "It is the team's standard of quality that every Increment must meet; engineering practices like automated tests, code reviews, and CI builds are often part of it",
      "It is a document listing all features delivered in the Sprint",
      "It is a management report showing work completed"
    ],
    "correct": 1,
    "explanation": "The Definition of Done is the quality standard that every Increment must meet. Engineering practices like automated tests passing, code review completed, CI build passing, and no known defects are common DoD elements. A strong DoD prevents technical debt.",
    "tip": "Engineering practices (CI, automated tests, code review) typically appear in the DoD.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 309,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "What is 'continuous testing' in a DevOps context?",
    "options": [
      "Running tests continuously on a 24/7 schedule",
      "Executing automated tests at every stage of the software delivery pipeline to provide rapid feedback on business risks",
      "Having a dedicated QA team continuously test the product in parallel with development",
      "Testing every code commit manually before it is merged"
    ],
    "correct": 1,
    "explanation": "Continuous testing means executing automated tests at every stage of the pipeline — unit tests, integration tests, acceptance tests, and performance tests — to provide rapid feedback. It enables teams to detect defects as close to when they are introduced as possible.",
    "tip": "Continuous testing = automated tests at every pipeline stage for rapid risk feedback.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 310,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What is the role of monitoring and observability in a DevOps pipeline?",
    "options": [
      "To track developer productivity and task completion rates",
      "To understand system behavior in production, detect issues quickly, and enable data-driven decisions",
      "To monitor the Scrum Team's velocity and burndown",
      "To alert the Scrum Master when impediments occur"
    ],
    "correct": 1,
    "explanation": "Monitoring and observability enable teams to understand how the system behaves in production, detect and diagnose issues quickly, measure the impact of changes, and make data-driven product decisions. They support the empirical nature of Scrum by providing real-world feedback.",
    "tip": "Monitoring closes the feedback loop from production back to the team.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 311,
    "category": "Cross-functional Teams",
    "difficulty": "Medium",
    "question": "What is the Scrum Team's responsibility regarding quality?",
    "options": [
      "Quality is the responsibility of the dedicated QA team",
      "Developers are responsible for quality; the Scrum Master is responsible for quality practices",
      "The entire Scrum Team is accountable for creating a high-quality, valuable Increment every Sprint",
      "Quality is the Product Owner's concern — developers focus on speed"
    ],
    "correct": 2,
    "explanation": "The entire Scrum Team is accountable for creating a valuable, useful Increment. All team members — Developers, Product Owner, and Scrum Master — contribute to quality. Developers adhere to the Definition of Done; the Product Owner ensures value; the Scrum Master coaches practices.",
    "tip": "Quality is a whole-team accountability, not just the QA person's job.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 312,
    "category": "Cross-functional Teams",
    "difficulty": "Hard",
    "question": "A Scrum Team has a 'tester' who only tests and a 'developer' who only codes. What is the risk of this arrangement?",
    "options": [
      "No risk — functional specialization is efficient",
      "It can create bottlenecks, reduce flexibility, and undermine cross-functionality and collective ownership",
      "It violates Scrum rules about team composition",
      "It may cause the Scrum Master to lose authority"
    ],
    "correct": 1,
    "explanation": "Hard functional silos within the Scrum Team undermine cross-functionality, create bottlenecks (testers overwhelmed at Sprint end), reduce flexibility, and prevent collective ownership. Everyone should be willing to work outside their primary specialty to achieve the Sprint Goal.",
    "tip": "Silos within the team = bottlenecks, reduced adaptability, and reduced ownership.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 313,
    "category": "Cross-functional Teams",
    "difficulty": "Medium",
    "question": "What is the ideal team structure in Scrum when the team has 15 developers?",
    "options": [
      "Keep all 15 as one large Scrum Team for maximum collaboration",
      "Create multiple Scrum Teams, each small enough (typically 3-9 developers) focused on the same product",
      "Split into three teams of 5, each focused on different product components",
      "Add a second Scrum Master to manage the large team effectively"
    ],
    "correct": 1,
    "explanation": "The Scrum Guide recommends 10 or fewer people per Scrum Team. With 15 developers, the recommendation is to reorganize into multiple smaller Scrum Teams, each focused on the same product. They should share the same Product Backlog and Product Owner.",
    "tip": "Large teams should split; multiple Scrum Teams share one Product Backlog and one Product Owner.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 314,
    "category": "Advanced Scrum",
    "difficulty": "Hard",
    "question": "What is meant by 'incremental delivery' in Scrum?",
    "options": [
      "Delivering features in alphabetical order to ensure consistency",
      "Delivering small, working pieces of the product in each Sprint rather than delivering everything at the end",
      "Incrementally hiring team members as the project grows",
      "Providing stakeholders with regular status reports"
    ],
    "correct": 1,
    "explanation": "Incremental delivery means each Sprint produces a working Increment of the product that adds value. Over time, these Increments accumulate into a complete product. This approach reduces risk, enables early value delivery, and incorporates stakeholder feedback.",
    "tip": "Each Sprint's Increment adds to prior Increments — building the product step by step.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 315,
    "category": "Advanced Scrum",
    "difficulty": "Hard",
    "question": "What is 'iterative development' in the context of Scrum?",
    "options": [
      "Repeating the same Sprint activities until the team reaches its velocity target",
      "Revisiting and improving features based on feedback from each Sprint, refining understanding and implementation over time",
      "Using loops in code to process data efficiently",
      "Running multiple parallel Sprints simultaneously"
    ],
    "correct": 1,
    "explanation": "Iterative development means revisiting and refining features based on what was learned in previous Sprints. Combined with incremental delivery, it enables the product to evolve based on real feedback, reducing the risk of building the wrong thing.",
    "tip": "Iterative = refine based on learning; incremental = add piece by piece.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 316,
    "category": "Advanced Scrum",
    "difficulty": "Medium",
    "question": "What is the relationship between Scrum and Extreme Programming (XP)?",
    "options": [
      "XP and Scrum are competing frameworks and should not be combined",
      "XP practices (TDD, pair programming, refactoring, CI) are engineering practices that complement Scrum's management framework",
      "Scrum supersedes XP and includes all XP practices",
      "XP provides the management framework while Scrum provides engineering practices"
    ],
    "correct": 1,
    "explanation": "Scrum is a lightweight management framework that does not prescribe specific engineering practices. XP (Extreme Programming) provides technical practices like TDD, pair programming, refactoring, and CI that complement Scrum. Many PSD exam topics come from XP practices.",
    "tip": "Scrum = process framework; XP = engineering practices. They pair well together.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 317,
    "category": "Advanced Scrum",
    "difficulty": "Hard",
    "question": "When multiple Scrum Teams work on the same product, who is responsible for the overall product?",
    "options": [
      "Each team's Scrum Master coordinates and shares responsibility",
      "There is one Product Owner for the entire product with a single Product Backlog",
      "Each team has its own Product Owner who coordinates with others",
      "A program manager coordinates across all Product Owners"
    ],
    "correct": 1,
    "explanation": "When multiple Scrum Teams work on the same product, they must share one Product Backlog and one Product Owner. Having multiple Product Owners for the same product creates conflicting priorities and undermines alignment.",
    "tip": "One product = one Product Backlog = one Product Owner, regardless of the number of teams.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 318,
    "category": "Advanced Scrum",
    "difficulty": "Hard",
    "question": "What is meant by 'forecasting' in Scrum (e.g., release forecasting)?",
    "options": [
      "A guaranteed delivery date provided by the Scrum Team to stakeholders",
      "An estimate of when features will be delivered based on current velocity and remaining backlog, subject to change as more is learned",
      "A formal project plan with committed milestones",
      "The Product Owner's prediction of market demand for the product"
    ],
    "correct": 1,
    "explanation": "In Scrum, forecasts are probabilistic estimates of when work might be completed based on current velocity and remaining backlog size. They are not commitments. Forecasts change as the team learns more and the Product Backlog evolves.",
    "tip": "Forecasts are probabilistic, not commitments — they change with new information.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 319,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What is a 'mock' object in unit testing?",
    "options": [
      "A simplified version of a class used for performance testing",
      "An object that simulates a dependency and verifies that specific interactions occurred",
      "A fake database used for integration testing",
      "A copy of a production object used for destructive testing"
    ],
    "correct": 1,
    "explanation": "A mock is a test double that simulates a dependency and records interactions so the test can verify that specific method calls were made with expected parameters. Mocks are used to isolate the unit under test from its dependencies.",
    "tip": "Mock = verify interactions; Stub = control return values.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 320,
    "category": "Testing & Quality",
    "difficulty": "Hard",
    "question": "What is a 'stub' in unit testing?",
    "options": [
      "An incomplete method that is not yet implemented",
      "A test double that provides predefined return values to control the behavior of a dependency",
      "A test that is intentionally left failing to indicate work in progress",
      "A summary of the unit test results"
    ],
    "correct": 1,
    "explanation": "A stub is a test double that provides canned (predefined) responses to method calls. Unlike a mock, a stub does not verify interactions — it just provides controlled return values to drive the unit under test through specific code paths.",
    "tip": "Stub = provide controlled return values; doesn't verify interactions.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 321,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What is an integration test?",
    "options": [
      "A test of the entire application from the user's perspective",
      "A test that verifies that multiple components work correctly together",
      "A performance test that simulates multiple users simultaneously",
      "A test that validates the integration of new team members"
    ],
    "correct": 1,
    "explanation": "Integration tests verify that two or more components work together correctly. They are broader than unit tests (which test in isolation) but narrower than end-to-end tests (which test the entire system). Integration tests often involve databases, APIs, or external services.",
    "tip": "Integration tests = multiple components working together; broader than unit, narrower than E2E.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 322,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What is the benefit of having automated regression tests in a Scrum Team?",
    "options": [
      "They eliminate the need for a QA team",
      "They provide a safety net that allows Developers to refactor and add features with confidence",
      "They replace the Sprint Review by automatically verifying new features",
      "They ensure that no bugs are ever introduced into production"
    ],
    "correct": 1,
    "explanation": "Automated regression tests act as a safety net. They allow Developers to confidently change, refactor, and add code knowing that if they break something, the tests will catch it quickly. This enables sustainable pace of development.",
    "tip": "Regression tests = confidence to change code; support refactoring and rapid iteration.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 323,
    "category": "Agile Principles",
    "difficulty": "Medium",
    "question": "What does the Agile principle 'deliver working software frequently' imply for a Scrum Team?",
    "options": [
      "The team must deploy to production at least once per week",
      "The team must produce a potentially releasable Increment at least every Sprint",
      "Developers must commit code to version control daily",
      "The Product Owner must demonstrate the product to stakeholders weekly"
    ],
    "correct": 1,
    "explanation": "The Agile Manifesto principle of delivering working software frequently, with a preference for a shorter timescale, is embodied in Scrum by producing a potentially releasable Increment every Sprint. This is the primary measure of progress.",
    "tip": "Each Sprint = a potentially releasable Increment; working software is the measure.",
    "source": "Agile Manifesto"
  },
  {
    "id": 324,
    "category": "Agile Principles",
    "difficulty": "Medium",
    "question": "What does 'business people and developers must work together daily throughout the project' mean in practice for a Scrum Team?",
    "options": [
      "The Product Owner and Developers must be co-located in the same office",
      "The Product Owner must participate in the Daily Scrum every day",
      "The Product Owner must be available to answer questions, refine the Product Backlog, and collaborate with Developers throughout each Sprint",
      "Business analysts must review every piece of code written"
    ],
    "correct": 2,
    "explanation": "This Agile principle means continuous collaboration between business (represented by the Product Owner) and developers. The Product Owner must be available throughout the Sprint to answer questions, clarify requirements, and participate in refinement — not just at events.",
    "tip": "PO availability throughout the Sprint (not just at events) is critical.",
    "source": "Agile Manifesto"
  },
  {
    "id": 325,
    "category": "Agile Principles",
    "difficulty": "Hard",
    "question": "What does 'continuous attention to technical excellence and good design enhances agility' mean?",
    "options": [
      "Developers should spend at least 20% of each Sprint on technical improvements",
      "Good engineering practices like TDD, refactoring, and clean code enable the team to respond to change quickly and sustainably",
      "The team should hire senior developers to maintain code quality",
      "Architecture should be defined by a dedicated architect to ensure technical excellence"
    ],
    "correct": 1,
    "explanation": "This Agile principle means that technical excellence (clean code, TDD, refactoring, CI) directly enables agility. Poorly crafted code becomes difficult to change quickly. Good engineering practices maintain the ability to adapt rapidly to changing requirements.",
    "tip": "Technical excellence = agility. Poor code quality = reduced ability to adapt.",
    "source": "Agile Manifesto"
  },
  {
    "id": 326,
    "category": "Scrum Master",
    "difficulty": "Hard",
    "question": "A Developer on the team is consistently missing Daily Scrums. What should the Scrum Master do?",
    "options": [
      "Escalate to the Developer's manager",
      "Make attendance mandatory and document violations",
      "Understand why the Developer is missing the events and coach the team on the value of the Daily Scrum",
      "Remove the Developer from the team"
    ],
    "correct": 2,
    "explanation": "The Scrum Master should coach the team and the individual Developer on the purpose and value of the Daily Scrum. The goal is to help the team self-manage and understand that the Daily Scrum is for the Developers to inspect progress and adapt their plan — not as a management reporting tool.",
    "tip": "Scrum Master coaches behavior; doesn't mandate or escalate to management.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 327,
    "category": "Scrum Master",
    "difficulty": "Hard",
    "question": "Management is asking the Scrum Master for a weekly status report from each Developer. How should the Scrum Master respond?",
    "options": [
      "Create the reports to maintain organizational harmony",
      "Ask the Product Owner to create the reports instead",
      "Explain how Scrum artifacts and events provide transparency and coach management on using them instead of individual status reports",
      "Tell management that status reports are prohibited in Scrum"
    ],
    "correct": 2,
    "explanation": "The Scrum Master should help management understand how Scrum's built-in transparency mechanisms (Product Backlog, Sprint Backlog, Increment, events) provide the information they need. Individual status reports undermine self-management. The goal is to coach, not to simply comply or refuse.",
    "tip": "Coach management to use Scrum's transparency mechanisms; don't just say 'no' or comply.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 328,
    "category": "Scrum Master",
    "difficulty": "Medium",
    "question": "What is the Scrum Master's responsibility when the team identifies a significant impediment during the Sprint?",
    "options": [
      "Solve the impediment personally before the next Daily Scrum",
      "Add the impediment to the Product Backlog",
      "Help the team address the impediment — either by removing it, coaching the team to remove it, or escalating to organizational leadership",
      "Cancel the Sprint if the impediment cannot be resolved"
    ],
    "correct": 2,
    "explanation": "The Scrum Master's role regarding impediments is to 'cause' their removal. This may mean personally removing some impediments, coaching the team to handle others, or escalating systemic organizational impediments to leadership. The Scrum Master is not solely responsible for resolving all impediments.",
    "tip": "Scrum Master 'causes removal' — direct action, coaching, or escalation as appropriate.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 329,
    "category": "Done & Quality",
    "difficulty": "Medium",
    "question": "Why is having a weak or incomplete Definition of Done a problem for a Scrum Team?",
    "options": [
      "It makes the Sprint Review harder to conduct",
      "It leads to undone work accumulating, increasing technical debt, and producing Increments that may not be releasable",
      "It prevents the team from completing Sprint Planning effectively",
      "It makes it difficult to measure team velocity"
    ],
    "correct": 1,
    "explanation": "A weak DoD means work is being called 'done' before it truly meets quality standards. This creates hidden undone work, accumulates technical debt, and means the Increment may not actually be releasable. Over time, this undermines trust and predictability.",
    "tip": "Weak DoD = hidden debt, false transparency, unreliable Increment.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 330,
    "category": "Done & Quality",
    "difficulty": "Hard",
    "question": "Multiple Scrum Teams are working on the same product. How should the Definition of Done be handled?",
    "options": [
      "Each team creates its own DoD to fit their working style",
      "The Scrum Masters from all teams negotiate a shared Definition of Done",
      "All teams must share a common DoD for the product; individual teams may have stricter DoDs but not weaker ones",
      "The Product Owner defines a single DoD that all teams must use exactly"
    ],
    "correct": 2,
    "explanation": "When multiple Scrum Teams work on the same product, they must all use the same definition of what it means for an Increment to be 'Done' to ensure all Increments can be integrated. Individual teams may apply stricter standards but cannot use a weaker DoD than the shared standard.",
    "tip": "Shared DoD ensures all teams' Increments integrate correctly; teams can be stricter, not looser.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 331,
    "category": "Sprint Events",
    "difficulty": "Hard",
    "question": "What should happen at the Sprint Review when the Developers did not complete all selected Product Backlog items?",
    "options": [
      "The Sprint is considered failed and must be restarted",
      "Incomplete items are discussed, and the Product Owner decides whether to re-order or drop them — they are NOT automatically placed in the next Sprint",
      "The team must work overtime to complete the items before the Sprint ends",
      "Incomplete items are automatically carried over to the next Sprint Backlog"
    ],
    "correct": 1,
    "explanation": "Incomplete Product Backlog items are returned to the Product Backlog. The Product Owner then decides (based on updated ordering) whether these items should appear in the next Sprint or be dropped. They are not automatically committed to the next Sprint.",
    "tip": "Undone PBIs return to the Product Backlog; the PO re-orders them.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 332,
    "category": "Sprint Events",
    "difficulty": "Medium",
    "question": "What is the Sprint Review NOT?",
    "options": [
      "An inspection of the Increment",
      "A demonstration to stakeholders",
      "A formal approval gate where the Product Owner signs off on the Sprint",
      "An opportunity to update the Product Backlog"
    ],
    "correct": 2,
    "explanation": "The Sprint Review is not a formal approval gate or sign-off event. It is a collaborative working session where the Scrum Team and stakeholders inspect the Increment and adapt the Product Backlog based on what was learned. The Product Owner may 'accept' or 'reject' work, but this is not the primary purpose.",
    "tip": "Sprint Review is collaborative inspection, not a formal sign-off ceremony.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 333,
    "category": "Sprint Events",
    "difficulty": "Medium",
    "question": "Who should attend the Sprint Review?",
    "options": [
      "The Scrum Team only — no external stakeholders",
      "The Scrum Team and key stakeholders invited by the Product Owner",
      "The Scrum Team and all organizational stakeholders",
      "The Product Owner and external stakeholders only"
    ],
    "correct": 1,
    "explanation": "The Sprint Review is attended by the entire Scrum Team and key stakeholders invited by the Product Owner. The Scrum Guide emphasizes that this is an informal working session, not a demonstration, and that the right stakeholders are present to enable meaningful conversation.",
    "tip": "PO invites relevant stakeholders; it should be a collaborative session, not a show.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 334,
    "category": "Sprint Events",
    "difficulty": "Hard",
    "question": "During Sprint Planning, the Developers realize that a high-priority Product Backlog item is unclear. What should happen?",
    "options": [
      "Skip the item and select the next one on the backlog",
      "The Scrum Master should clarify the item based on stakeholder input",
      "The Developers and Product Owner discuss and clarify the item during Sprint Planning",
      "Move the item to a special 'clarification' backlog for analysis"
    ],
    "correct": 2,
    "explanation": "Sprint Planning is the appropriate time to clarify Product Backlog items. The Product Owner (who is present) should clarify requirements so the Developers can confidently forecast the work. Ongoing refinement between Sprints should prevent this from being a surprise.",
    "tip": "Unclear PBIs should be clarified in Sprint Planning (or preferably in refinement before).",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 335,
    "category": "Backlog Management",
    "difficulty": "Medium",
    "question": "What is the 'INVEST' criteria for user stories?",
    "options": [
      "Integrated, Networked, Versioned, Estimated, Secure, Tested",
      "Independent, Negotiable, Valuable, Estimable, Small, Testable",
      "Innovative, Novel, Valuable, Efficient, Scoped, Technical",
      "Iterative, New, Verified, Executable, Staged, Tested"
    ],
    "correct": 1,
    "explanation": "INVEST is a checklist for evaluating user stories: Independent (minimal dependencies), Negotiable (scope can be adjusted), Valuable (delivers value to users/business), Estimable (can be estimated), Small (fits in a Sprint), Testable (has acceptance criteria).",
    "tip": "INVEST: Independent, Negotiable, Valuable, Estimable, Small, Testable.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 336,
    "category": "Backlog Management",
    "difficulty": "Hard",
    "question": "A Developer raises a concern that a Product Backlog item will require significant architectural work not visible in the estimate. What is the appropriate action?",
    "options": [
      "The Developer should complete the architectural work and not raise it since estimates are commitments",
      "The Developer should raise this in the Daily Scrum so the team and Product Owner are aware",
      "The Scrum Master should add architecture work as a separate Product Backlog item",
      "The team should discuss this with the Product Owner and revise the Sprint Plan accordingly, potentially splitting the item"
    ],
    "correct": 3,
    "explanation": "Transparency is crucial in Scrum. If a Developer identifies hidden complexity, this should be surfaced to the team and Product Owner. The Sprint Plan may need to be adjusted — the item may be split, descoped, or carry a revised estimate. Hiding known complexity undermines empirical planning.",
    "tip": "Hidden complexity must surface immediately — transparency enables adaptation.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 337,
    "category": "Backlog Management",
    "difficulty": "Medium",
    "question": "What is the relationship between the Sprint Goal and the selected Product Backlog items?",
    "options": [
      "The Sprint Goal is derived from the selected PBIs and must match their sum of value",
      "The Sprint Goal provides a coherent objective; the selected PBIs create a plan for achieving it, with scope that can flex",
      "The Sprint Goal and PBIs are independently determined by the Product Owner and Developers respectively",
      "The Sprint Goal is set by the Scrum Master to summarize the Sprint Backlog"
    ],
    "correct": 1,
    "explanation": "The Sprint Goal is the single objective for the Sprint. The selected Product Backlog items serve the Sprint Goal, but the scope may be clarified and renegotiated between the Product Owner and Developers as more is learned. The Sprint Goal remains fixed while specific PBIs may flex.",
    "tip": "Sprint Goal = fixed; scope of selected PBIs can flex. They work together.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 338,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "What is the recommended approach to database changes in a CI/CD pipeline?",
    "options": [
      "Apply database changes manually before deploying the application",
      "Use database migration scripts that are version-controlled and applied automatically as part of the deployment pipeline",
      "Recreate the database from scratch with each deployment",
      "Keep the database unchanged and adapt the application code to the existing schema"
    ],
    "correct": 1,
    "explanation": "Database changes should be managed through version-controlled migration scripts (e.g., Liquibase, Flyway) that are applied automatically in the deployment pipeline. This enables repeatable, auditable database changes that are consistent across environments.",
    "tip": "DB changes = version-controlled migration scripts applied in the pipeline.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 339,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What is the purpose of a staging or pre-production environment?",
    "options": [
      "A place for developers to experiment with new technologies",
      "An environment that mirrors production and is used to validate deployments before releasing to production",
      "A permanent environment where the Product Owner reviews work during the Sprint",
      "A backup environment in case production fails"
    ],
    "correct": 1,
    "explanation": "A staging environment mirrors the production environment and is used to validate that deployments work correctly, integrations behave as expected, and the system is ready for release before it reaches actual end users. It reduces the risk of production failures.",
    "tip": "Staging = prod-like environment for final validation before release.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 340,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What does 'shift left' mean in software quality?",
    "options": [
      "Moving QA testers to earlier in the recruitment process",
      "Moving testing and quality activities earlier in the development process to find defects sooner",
      "Prioritizing left-to-right layout in UI design for better usability",
      "Shifting development work from one sprint to an earlier sprint"
    ],
    "correct": 1,
    "explanation": "'Shift left' means performing testing and quality activities as early as possible in the development process. The earlier a defect is found, the cheaper it is to fix. TDD, pair programming, and code reviews are all shift-left practices.",
    "tip": "Shift left = find defects earlier; earlier detection = cheaper to fix.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 341,
    "category": "Scrum Framework",
    "difficulty": "Hard",
    "question": "What does the Scrum Guide say about estimation techniques?",
    "options": [
      "Story points must be used for Product Backlog estimation",
      "Developers must estimate in hours during Sprint Planning",
      "The Scrum Guide does not prescribe any specific estimation technique",
      "Planning poker is the recommended estimation technique"
    ],
    "correct": 2,
    "explanation": "The Scrum Guide does not prescribe any specific estimation technique. Story points, planning poker, t-shirt sizing, ideal days, and other techniques are all valid choices. The team selects the approach that works best for them.",
    "tip": "Scrum doesn't prescribe estimation techniques — teams choose what works for them.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 342,
    "category": "Scrum Framework",
    "difficulty": "Hard",
    "question": "True or False: The Scrum Team can use Kanban within the Sprint to manage their work.",
    "options": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "True. Scrum does not prescribe how Developers manage their work within the Sprint. Using a Kanban board to visualize and manage Sprint Backlog items is a common and effective practice. Scrum provides the overall framework while teams choose complementary practices.",
    "tip": "Scrum is a framework, not a rigid process; complementary practices like Kanban boards are fine.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 343,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "What is the purpose of the Sprint Goal?",
    "options": [
      "To list all features that must be completed in the Sprint",
      "To create coherence and focus by providing a single objective that the Scrum Team commits to achieving during the Sprint",
      "To communicate team capacity to the Product Owner",
      "To set the priority of items in the Sprint Backlog"
    ],
    "correct": 1,
    "explanation": "The Sprint Goal creates coherence and focus for the Scrum Team. It is a single objective for the Sprint that gives the Developers flexibility in what they build while keeping the team focused on a common target. The Sprint Goal is a commitment by the Developers.",
    "tip": "Sprint Goal = single objective; creates focus and flexibility within the Sprint.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 344,
    "category": "Scrum Framework",
    "difficulty": "Hard",
    "question": "True or False: The Product Owner can be a committee of multiple people.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. The Product Owner is one person, not a committee. While the Product Owner may represent the needs of many stakeholders, this accountability rests with one individual. Others may influence the Product Backlog through the Product Owner, but they cannot override the Product Owner's decisions.",
    "tip": "Product Owner = one person; committees cannot be a Product Owner.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 345,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "What are the three commitments added to Scrum artifacts in the 2020 Scrum Guide?",
    "options": [
      "Definition of Ready, Definition of Done, Sprint Goal",
      "Product Goal, Sprint Goal, Definition of Done",
      "Vision, Sprint Goal, Acceptance Criteria",
      "Product Roadmap, Sprint Goal, Quality Standards"
    ],
    "correct": 1,
    "explanation": "The 2020 Scrum Guide added commitments to each artifact: the Product Backlog has the Product Goal, the Sprint Backlog has the Sprint Goal, and the Increment has the Definition of Done. These commitments enhance transparency and focus.",
    "tip": "2020 addition: Product Goal (PB), Sprint Goal (SB), Definition of Done (Increment).",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 346,
    "category": "Advanced Scrum",
    "difficulty": "Hard",
    "question": "What is the Nexus framework?",
    "options": [
      "A Scrum anti-pattern to avoid when teams grow",
      "A framework published by Scrum.org for scaling Scrum across multiple teams working on one product",
      "A tool for managing the Product Backlog across multiple products",
      "An alternative to Scrum for large organizations"
    ],
    "correct": 1,
    "explanation": "Nexus is a framework published by Scrum.org for scaling Scrum to multiple Scrum Teams working on a single product. It adds a Nexus Integration Team, a Nexus Sprint Planning event, and a Nexus Daily Scrum to coordinate work across teams and manage dependencies.",
    "tip": "Nexus = Scrum.org's scaling framework; adds integration team and coordination events.",
    "source": "Nexus Guide"
  },
  {
    "id": 347,
    "category": "Advanced Scrum",
    "difficulty": "Hard",
    "question": "What does 'YAGNI' stand for and what principle does it represent?",
    "options": [
      "You Always Get New Ideas; a reminder to innovate continuously",
      "You Aren't Gonna Need It; a principle to avoid building features before they are actually needed",
      "Your Architecture Gets Noticed Incrementally; a principle for emergent design",
      "Yet Another Good New Iteration; a reminder to keep Sprints short"
    ],
    "correct": 1,
    "explanation": "YAGNI stands for 'You Aren't Gonna Need It' — an XP principle that discourages adding functionality until it is needed. Speculative features add complexity, waste effort, and often end up unused. Build only what is needed in the current Sprint.",
    "tip": "YAGNI = don't build features 'just in case.' Build what's needed now.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 348,
    "category": "Advanced Scrum",
    "difficulty": "Medium",
    "question": "What is 'DRY' in software development?",
    "options": [
      "Deploy Reliably Yesterday — a principle for frequent releases",
      "Don't Repeat Yourself — every piece of knowledge should have a single, authoritative representation",
      "Design Refactor Yearly — a principle for annual architecture reviews",
      "Deliver Rapidly Yesterday — an Agile delivery principle"
    ],
    "correct": 1,
    "explanation": "DRY stands for 'Don't Repeat Yourself.' It means every piece of knowledge or logic should have a single, unambiguous representation in the codebase. Code duplication creates maintenance problems — changing one copy without the other leads to inconsistencies.",
    "tip": "DRY: single source of truth for every piece of logic. Duplication = maintenance risk.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 349,
    "category": "Advanced Scrum",
    "difficulty": "Hard",
    "question": "When scaling Scrum with multiple teams working on a single product, what is the most critical requirement according to the Scrum Guide?",
    "options": [
      "Each team must have its own Product Owner and Product Backlog",
      "All teams must share a single Product Backlog ordered by a single Product Owner, and all teams must use the same Definition of Done",
      "A Scrum of Scrums meeting must be held daily to coordinate between teams",
      "Each team must work on separate components with defined interfaces"
    ],
    "correct": 1,
    "explanation": "When multiple Scrum Teams work on the same product, the Scrum Guide requires: one Product Backlog (single source of requirements), one Product Owner (single authority on ordering), and a shared Definition of Done (consistent quality standard). Without these, teams will have conflicting priorities, duplicate work, and inconsistent quality. The Scrum Guide does not prescribe specific scaling frameworks but maintains these fundamental constraints.",
    "tip": "Scaling = one Product Backlog + one PO + shared DoD. Non-negotiable foundations.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 350,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "Which three accountabilities exist in the Scrum Framework?",
    "options": [
      "Project Manager, Development Team, and Business Analyst",
      "Scrum Master, Product Owner, and Developers",
      "Team Lead, Product Owner, and QA Engineer",
      "Scrum Master, Stakeholders, and Developers"
    ],
    "correct": 1,
    "explanation": "The Scrum Guide 2020 defines exactly three accountabilities: the Scrum Master, Product Owner, and Developers. There are no other formal roles in Scrum. Stakeholders, managers, and other titles are not Scrum accountabilities.",
    "source": "Scrum Guide 2020 — Scrum Team section",
    "tip": "Scrum has exactly 3 accountabilities: SM + PO + Developers. Nothing more."
  },
  {
    "id": 351,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "Who is accountable for the Product Backlog?",
    "options": [
      "The entire Scrum Team",
      "The Scrum Master",
      "The Developers",
      "The Product Owner"
    ],
    "correct": 3,
    "explanation": "The Product Owner is solely accountable for managing the Product Backlog. This includes ordering items, ensuring transparency, and making the Backlog visible to stakeholders. While Developers may help refine items, accountability lies with the Product Owner.",
    "source": "Scrum Guide 2020 — Product Owner section",
    "tip": "PO = Product Backlog accountability. Period."
  },
  {
    "id": 352,
    "category": "Scrum Master",
    "difficulty": "Easy",
    "question": "What is the primary role of the Scrum Master?",
    "options": [
      "To manage the Scrum Team and assign tasks",
      "To ensure the team meets its Sprint commitments",
      "To cause the effectiveness of the Scrum Team by helping everyone understand Scrum theory and practice",
      "To report team progress to upper management"
    ],
    "correct": 2,
    "explanation": "The Scrum Master is accountable for the Scrum Team's effectiveness. They do this by enabling everyone to understand Scrum theory, practice, rules, and values. The Scrum Master is a true leader who serves the Scrum Team — not a manager or task assigner.",
    "source": "Scrum Guide 2020 — Scrum Master section",
    "tip": "SM = servant-leader who enables effectiveness through Scrum understanding."
  },
  {
    "id": 353,
    "category": "Sprint Events",
    "difficulty": "Medium",
    "question": "What is the primary purpose of the Sprint Goal?",
    "options": [
      "To define every task the Developers must complete during the Sprint",
      "To provide a single objective that gives the Sprint coherence and focus",
      "To communicate team velocity to stakeholders",
      "To lock in scope so no changes can be made during the Sprint"
    ],
    "correct": 1,
    "explanation": "The Sprint Goal is the single objective for the Sprint. It gives the Developers flexibility in the work needed to achieve it while providing focus and coherence. It is created during Sprint Planning and represents a commitment by the Developers.",
    "source": "Scrum Guide 2020 — Sprint Goal section",
    "tip": "Sprint Goal = ONE objective. Coherence + focus, not a task list."
  },
  {
    "id": 354,
    "category": "Sprint Events",
    "difficulty": "Medium",
    "question": "During the Sprint, a stakeholder asks the Developers to add a high-priority item that will jeopardize the Sprint Goal. What should the Developers do?",
    "options": [
      "Add the item immediately since stakeholders have authority over the team",
      "Refuse the request entirely because Sprint scope is locked",
      "Discuss the situation with the Product Owner, who can negotiate scope with the stakeholder",
      "Extend the Sprint to accommodate the new item"
    ],
    "correct": 2,
    "explanation": "Only the Product Owner has the authority to cancel a Sprint. If new work arises that would jeopardize the Sprint Goal, the Developers should engage the Product Owner. The PO can negotiate scope adjustments without necessarily cancelling the Sprint. The Sprint Goal should remain intact.",
    "source": "Scrum Guide 2020 — Sprint section",
    "tip": "Sprint Goal threatened? Escalate to PO. Only PO can cancel a Sprint."
  },
  {
    "id": 355,
    "category": "Cross-functional Teams",
    "difficulty": "Easy",
    "question": "What does it mean for a Scrum Team to be self-managing?",
    "options": [
      "The team works without a Scrum Master",
      "The team decides internally who does what, when, and how",
      "The team manages its own budget and hiring",
      "The team has no external dependencies"
    ],
    "correct": 1,
    "explanation": "Self-managing means the Scrum Team internally decides who does the work, how it gets done, and when. No one outside the Scrum Team tells the Developers how to turn Product Backlog items into Increments of value. This is a core property of Scrum Teams.",
    "source": "Scrum Guide 2020 — Scrum Team section",
    "tip": "Self-managing = WHO does WHAT, WHEN, and HOW — decided internally."
  },
  {
    "id": 356,
    "category": "Cross-functional Teams",
    "difficulty": "Medium",
    "question": "A Scrum Team lacks testing skills and consistently delivers low-quality Increments. What is the BEST course of action?",
    "options": [
      "Hire a dedicated QA team to test the Increment after each Sprint",
      "The Scrum Team should acquire or develop the testing skills needed to deliver a Done Increment",
      "Ask the Scrum Master to perform testing",
      "Accept the lower quality and address it in future Sprints"
    ],
    "correct": 1,
    "explanation": "Scrum Teams must be cross-functional — they have all the skills necessary to create value each Sprint. If testing skills are missing, the team must acquire or develop them. Handing testing off to a separate team violates the cross-functional nature and delays feedback.",
    "source": "Scrum Guide 2020 — Developers section",
    "tip": "Cross-functional = ALL skills inside the team. No external handoffs."
  },
  {
    "id": 357,
    "category": "Done & Quality",
    "difficulty": "Medium",
    "question": "Who creates the Definition of Done?",
    "options": [
      "The Scrum Master defines it based on industry standards",
      "The Product Owner defines it to protect stakeholder interests",
      "If not an organizational standard, the Scrum Team creates it during Sprint 0",
      "If the organization has no standard, the Developers create the Definition of Done"
    ],
    "correct": 3,
    "explanation": "If the organization does not provide a Definition of Done, the Developers must create one. If multiple Scrum Teams work on the same product, they must together define a shared Definition of Done. There is no 'Sprint 0' in Scrum.",
    "source": "Scrum Guide 2020 — Definition of Done section",
    "tip": "DoD: org standard if exists, else Developers define it. No Sprint 0."
  },
  {
    "id": 358,
    "category": "Done & Quality",
    "difficulty": "Hard",
    "question": "An organization mandates that all releases require a security audit by an external team after each Sprint. This audit takes two weeks. How should this be handled?",
    "options": [
      "Add the two-week audit to the Sprint duration, making each Sprint three weeks long",
      "Work to incorporate security auditing capabilities into the team and make it part of the Definition of Done",
      "Schedule security audits once per quarter to reduce overhead",
      "Exclude security auditing from the Definition of Done since it is done externally"
    ],
    "correct": 1,
    "explanation": "The Definition of Done should represent the quality required to release. External audit gates that delay release signal an incomplete Definition of Done. The team should strive to bring security auditing into each Sprint — ideally automated — so the Increment is truly Done at Sprint end. This is the spirit of empiricism and continuous improvement.",
    "source": "Scrum Guide 2020 — Definition of Done; PSD Engineering Practices",
    "tip": "External release gates = incomplete DoD. Bring them inside the Sprint."
  },
  {
    "id": 359,
    "category": "Done & Quality",
    "difficulty": "Hard",
    "question": "What happens to Product Backlog items that do not meet the Definition of Done at Sprint end?",
    "options": [
      "They are shipped anyway and marked as technical debt",
      "They are returned to the Product Backlog for future consideration by the Product Owner",
      "They are automatically moved to the next Sprint",
      "The Sprint is extended until they are Done"
    ],
    "correct": 1,
    "explanation": "If a Product Backlog item does not meet the Definition of Done, it cannot be included in the Sprint Review or considered part of the Increment. It is returned to the Product Backlog. The Product Owner may reorder it. Sprints are never extended.",
    "source": "Scrum Guide 2020 — Increment and Definition of Done sections",
    "tip": "Not Done? Back to the Backlog. Never extend a Sprint."
  },
  {
    "id": 360,
    "category": "Sprint Events",
    "difficulty": "Medium",
    "question": "What are the two topics addressed during Sprint Planning?",
    "options": [
      "What to build and who will build it",
      "Why is the Sprint valuable, what can be Done, and how will it be done",
      "Backlog ordering and team velocity calculation",
      "Risk assessment and resource allocation"
    ],
    "correct": 1,
    "explanation": "Sprint Planning addresses three topics: (1) WHY is this Sprint valuable — establishing the Sprint Goal; (2) WHAT can be Done — selecting Product Backlog items; and (3) HOW will the chosen work get done — creating a plan. The Scrum Guide 2020 explicitly defines these three topics.",
    "source": "Scrum Guide 2020 — Sprint Planning section",
    "tip": "Sprint Planning = WHY (Goal) + WHAT (selection) + HOW (plan)."
  },
  {
    "id": 361,
    "category": "Sprint Events",
    "difficulty": "Easy",
    "question": "What is the timebox for Sprint Planning for a one-month Sprint?",
    "options": [
      "4 hours",
      "8 hours",
      "2 hours",
      "As long as needed to plan the entire Sprint"
    ],
    "correct": 1,
    "explanation": "Sprint Planning is timeboxed to a maximum of 8 hours for a one-month Sprint. For shorter Sprints, the event is usually shorter proportionally. Timeboxes create focus and prevent over-planning.",
    "source": "Scrum Guide 2020 — Sprint Planning section",
    "tip": "Sprint Planning timebox: 8 hours max for a 1-month Sprint."
  },
  {
    "id": 362,
    "category": "Backlog Management",
    "difficulty": "Medium",
    "question": "What is the purpose of Product Backlog refinement?",
    "options": [
      "To lock in all Sprint work before Sprint Planning",
      "To add detail, estimates, and order to Product Backlog items",
      "To remove completed items from the backlog after each Sprint",
      "To reassign priorities based on team capacity"
    ],
    "correct": 1,
    "explanation": "Product Backlog refinement is the act of breaking down and further defining Product Backlog items into smaller, more precise items. This includes adding details, estimates, and ordering. It is an ongoing activity, not a one-time event.",
    "source": "Scrum Guide 2020 — Product Backlog section",
    "tip": "Refinement = add detail + estimate + order. Ongoing, not one-time."
  },
  {
    "id": 363,
    "category": "Backlog Management",
    "difficulty": "Hard",
    "question": "How much time should Developers spend on Product Backlog refinement?",
    "options": [
      "No more than 10% of the Developers' capacity",
      "At least 20% of each Sprint",
      "It depends on the Sprint length and backlog size",
      "As much time as the Product Owner requests"
    ],
    "correct": 0,
    "explanation": "The Scrum Guide suggests that Developers usually spend no more than 10% of their capacity on refinement. This is a guideline, not a hard rule, but it ensures the team balances building valuable increments with keeping the backlog ready.",
    "source": "Scrum Guide 2020 — Product Backlog refinement section",
    "tip": "Refinement guideline: no more than 10% of Developers' capacity."
  },
  {
    "id": 364,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What is Continuous Integration (CI)?",
    "options": [
      "Releasing software to production after every commit",
      "A practice where developers frequently merge code into a shared mainline, triggering automated builds and tests",
      "Integrating team members from different departments into one team",
      "Running manual regression tests at the end of each Sprint"
    ],
    "correct": 1,
    "explanation": "Continuous Integration is the practice of frequently merging code changes into a shared repository (often multiple times per day), where automated builds and tests are triggered. This provides rapid feedback on code quality and integration issues, supporting a sustainable pace.",
    "source": "PSD Course — Continuous Integration",
    "tip": "CI = frequent merges + automated build+test = fast feedback."
  },
  {
    "id": 365,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "Which statement BEST describes the relationship between Continuous Integration and the Definition of Done?",
    "options": [
      "CI and the Definition of Done are unrelated practices",
      "CI replaces the need for a Definition of Done",
      "A robust CI pipeline helps teams consistently meet and enforce the Definition of Done",
      "The Definition of Done should only contain manual acceptance criteria"
    ],
    "correct": 2,
    "explanation": "A strong CI pipeline automates many quality checks (build, tests, static analysis, security scans) that form part of the Definition of Done. When CI runs on every commit, it helps the team maintain Done quality continuously rather than discovering failures at Sprint end.",
    "source": "PSD Course — CI and Definition of Done",
    "tip": "CI enforces DoD automatically. Good CI = consistently Done."
  },
  {
    "id": 366,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What is the main benefit of pair programming?",
    "options": [
      "It halves the amount of code produced per day",
      "It produces code faster because two people work simultaneously",
      "It improves code quality through continuous real-time code review and knowledge sharing",
      "It is required by the Scrum Guide for all Developers"
    ],
    "correct": 2,
    "explanation": "Pair programming involves two developers working together at one workstation. One writes code (driver) while the other reviews (navigator). This continuous real-time review catches defects early, spreads knowledge, and typically produces higher-quality code — often offsetting the apparent cost of using two people.",
    "source": "PSD Course — Pair Programming; Extreme Programming practices",
    "tip": "Pair programming = real-time review + knowledge sharing = higher quality."
  },
  {
    "id": 367,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "When should testing ideally occur in a Sprint?",
    "options": [
      "During a dedicated testing phase at the end of the Sprint",
      "In a separate Sprint reserved for integration and testing",
      "Continuously throughout the Sprint, alongside development",
      "Only after the Product Owner approves the completed features"
    ],
    "correct": 2,
    "explanation": "Testing should be integrated into the development workflow and happen continuously throughout the Sprint — not saved for the end. Late testing creates a bottleneck, reduces feedback speed, and risks not completing work within the Sprint timebox. This is a core principle of Agile engineering.",
    "source": "PSD Course — Testing Practices; Agile Testing principles",
    "tip": "Test continuously, not at the end. Testing is part of Done, not after."
  },
  {
    "id": 368,
    "category": "Testing & Quality",
    "difficulty": "Hard",
    "question": "A team consistently finds that manual testing near Sprint end prevents them from delivering a Done Increment. What is the BEST long-term solution?",
    "options": [
      "Add more testers to the Scrum Team",
      "Automate tests and shift testing left so defects are caught earlier in development",
      "Extend the Sprint by a few days to complete testing",
      "Remove some backlog items to make room for testing"
    ],
    "correct": 1,
    "explanation": "Test automation and 'shifting left' (testing earlier in the development process) is the sustainable solution. Automated tests run fast, are repeatable, and integrate into CI pipelines. Simply adding more manual testers doesn't address the root cause — late, slow feedback — and adding Sprint days violates Scrum's fixed timebox principle.",
    "source": "PSD Course — Test Automation; Shift Left Testing",
    "tip": "Automate + shift left = sustainable quality. Don't extend Sprints."
  },
  {
    "id": 369,
    "category": "Agile Principles",
    "difficulty": "Easy",
    "question": "What is empiricism in the context of Scrum?",
    "options": [
      "Making decisions based on historical project data and projections",
      "Making decisions based on what is known from experience, observation, and experimentation",
      "Following a fixed process based on proven best practices",
      "Applying scientific research to software development methodologies"
    ],
    "correct": 1,
    "explanation": "Scrum is founded on empiricism — the philosophy that knowledge comes from experience and making decisions based on what is observed. The three pillars of empiricism in Scrum are Transparency, Inspection, and Adaptation. This contrasts with a predictive or plan-driven approach.",
    "source": "Scrum Guide 2020 — Scrum Theory section",
    "tip": "Empiricism = decisions from observation and experience. T + I + A."
  },
  {
    "id": 370,
    "category": "Agile Principles",
    "difficulty": "Medium",
    "question": "What are the three pillars of empiricism that support Scrum?",
    "options": [
      "Planning, Execution, and Review",
      "Transparency, Inspection, and Adaptation",
      "Communication, Collaboration, and Commitment",
      "Velocity, Quality, and Predictability"
    ],
    "correct": 1,
    "explanation": "The three pillars of empiricism in Scrum are Transparency (making the work visible), Inspection (frequently examining the work and progress), and Adaptation (adjusting based on what is found). All Scrum events are designed to support these three pillars.",
    "source": "Scrum Guide 2020 — Scrum Theory section",
    "tip": "Three pillars: Transparency → Inspection → Adaptation. TIA."
  },
  {
    "id": 371,
    "category": "Agile Principles",
    "difficulty": "Medium",
    "question": "Which Scrum value describes a Scrum Team member's willingness to share concerns, failures, and progress honestly with teammates and stakeholders?",
    "options": [
      "Commitment",
      "Focus",
      "Openness",
      "Courage"
    ],
    "correct": 2,
    "explanation": "Openness is the Scrum value that relates to being transparent and honest about work, challenges, and progress. Scrum Team members and stakeholders practice openness about all the work and challenges. It underpins the Transparency pillar of empiricism.",
    "source": "Scrum Guide 2020 — Scrum Values section",
    "tip": "Openness = honest transparency about work AND challenges."
  },
  {
    "id": 372,
    "category": "Agile Principles",
    "difficulty": "Hard",
    "question": "A team is reluctant to show the Sprint Review stakeholders an Increment that is not fully polished. Which Scrum value are they failing to embody?",
    "options": [
      "Focus",
      "Respect",
      "Courage",
      "Commitment"
    ],
    "correct": 2,
    "explanation": "Courage is the Scrum value of doing the right thing and working on tough problems even when difficult. Showing an unpolished but Done Increment requires courage — to invite feedback, to be vulnerable, and to prioritize learning over appearances. Avoiding the review due to imperfection undermines transparency and empiricism.",
    "source": "Scrum Guide 2020 — Scrum Values section",
    "tip": "Courage = doing the right thing even when uncomfortable. Show the real work."
  },
  {
    "id": 373,
    "category": "Scrum Master",
    "difficulty": "Medium",
    "question": "How does the Scrum Master serve the Developers?",
    "options": [
      "By assigning tasks and tracking individual velocity",
      "By coaching team members on self-management, removing impediments, and protecting the team from distractions",
      "By making technical decisions when the team is blocked",
      "By reporting Developer performance to the Product Owner"
    ],
    "correct": 1,
    "explanation": "The Scrum Master serves the Developers by coaching them on self-management and cross-functionality, helping them focus on creating high-value Increments, removing impediments, and ensuring all Scrum events are positive and productive. The SM does not manage individuals or make technical decisions for the team.",
    "source": "Scrum Guide 2020 — Scrum Master section",
    "tip": "SM serves Devs: coach self-management, remove impediments, protect focus."
  },
  {
    "id": 374,
    "category": "Scrum Master",
    "difficulty": "Hard",
    "question": "The organization's management wants the Scrum Master to provide weekly individual performance reports for each Developer. What should the Scrum Master do?",
    "options": [
      "Provide the reports as requested to maintain good organizational relations",
      "Provide aggregated team-level metrics but not individual performance data",
      "Explain to management how Scrum works and help them understand more effective ways to track team performance",
      "Ask the Product Owner to provide the reports instead"
    ],
    "correct": 2,
    "explanation": "The Scrum Master serves the organization by helping management understand Scrum empiricism and self-management. Individual performance reporting undermines team cohesion and self-management. The SM should coach management on how to use Scrum artifacts and events to gain the information they need without micromanaging individuals.",
    "source": "Scrum Guide 2020 — Scrum Master serving the organization",
    "tip": "SM coaches org on Scrum. Individual tracking undermines self-management."
  },
  {
    "id": 375,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What is the key difference between Continuous Delivery and Continuous Deployment?",
    "options": [
      "Continuous Delivery requires more automation than Continuous Deployment",
      "Continuous Delivery ensures the software is always releasable; Continuous Deployment automatically releases every change to production",
      "Continuous Deployment is slower and more controlled than Continuous Delivery",
      "They are the same practice with different names"
    ],
    "correct": 1,
    "explanation": "Continuous Delivery means the software is always in a releasable state after every change — but releasing to production is a business decision made manually. Continuous Deployment goes further: every passing change is automatically deployed to production without human intervention.",
    "source": "PSD Course — CD Pipeline; Humble & Farley 'Continuous Delivery'",
    "tip": "CD delivery = always releasable (manual trigger). CD deployment = auto to prod."
  },
  {
    "id": 376,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "A team's CI pipeline takes 45 minutes to complete. What is the most significant problem this creates?",
    "options": [
      "The pipeline costs too much to run",
      "Developers lose context and receive slow feedback, making it harder to fix integration issues quickly",
      "Management cannot track progress in real time",
      "The Sprint Review cannot happen until the pipeline finishes"
    ],
    "correct": 1,
    "explanation": "Long CI pipeline feedback cycles mean developers have moved on to new work by the time a failure is reported. They must context-switch back, re-familiarize with the code, and fix it — costly and error-prone. Fast CI (ideally under 10 minutes) is critical for maintaining rapid feedback loops.",
    "source": "PSD Course — CI Feedback Loops; Continuous Delivery best practices",
    "tip": "Slow CI = slow feedback = expensive context switches. Aim for under 10 min."
  },
  {
    "id": 377,
    "category": "Backlog Management",
    "difficulty": "Hard",
    "question": "The Product Owner wants to add a new item to the current Sprint Backlog that would not compromise the Sprint Goal. Who decides whether to accept it?",
    "options": [
      "The Scrum Master, who must protect the team's Sprint commitments",
      "The Developers, since they own the Sprint Backlog",
      "The Product Owner, since they own the Product Backlog",
      "The whole Scrum Team must vote on it"
    ],
    "correct": 1,
    "explanation": "The Sprint Backlog belongs to the Developers. Only the Developers can change the Sprint Backlog during the Sprint. While the Product Owner can communicate a desire to add work, the Developers decide whether to accept it. If accepting it doesn't jeopardize the Sprint Goal, the Developers may agree to it.",
    "source": "Scrum Guide 2020 — Sprint Backlog section",
    "tip": "Sprint Backlog = Developers' property. They decide what gets added."
  },
  {
    "id": 378,
    "category": "Backlog Management",
    "difficulty": "Medium",
    "question": "What makes a Product Backlog item 'ready' for Sprint Planning?",
    "options": [
      "It has been approved by the Product Owner and signed off by stakeholders",
      "It has been assigned to a specific Developer",
      "It is sufficiently detailed, estimated, and understood by the Developers to be selected and worked on in a Sprint",
      "It has passed a formal readiness review by the Scrum Master"
    ],
    "correct": 2,
    "explanation": "A 'ready' backlog item is one that is small enough to fit in a Sprint, sufficiently understood so that Developers can commit to completing it, and has a clear enough description. The concept of 'Ready' is informal — the Scrum Guide doesn't define it formally, but it is a widely used practice.",
    "source": "PSD Course — Definition of Ready; Scrum Guide 2020 refinement section",
    "tip": "Ready = sufficiently small, detailed, and understood. No formal gate required."
  },
  {
    "id": 379,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What is Test-Driven Development (TDD)?",
    "options": [
      "Writing all tests after all code is written, then fixing failures",
      "A process where test plans drive project scheduling decisions",
      "Writing a failing test before writing the production code that makes it pass, then refactoring",
      "Letting automated testing tools drive the development process"
    ],
    "correct": 2,
    "explanation": "TDD follows the Red-Green-Refactor cycle: (1) Write a failing test (Red), (2) Write the minimum code to make it pass (Green), (3) Refactor both test and code while keeping tests passing. TDD drives better design, built-in test coverage, and confidence in refactoring.",
    "source": "PSD Course — TDD; Kent Beck 'Test-Driven Development'",
    "tip": "TDD = Red (fail) → Green (pass) → Refactor. Test BEFORE code."
  },
  {
    "id": 380,
    "category": "Testing & Quality",
    "difficulty": "Hard",
    "question": "Which type of test provides the fastest feedback in a well-structured test suite?",
    "options": [
      "End-to-end (UI) tests",
      "Integration tests",
      "Unit tests",
      "Manual exploratory tests"
    ],
    "correct": 2,
    "explanation": "Unit tests operate on small, isolated pieces of code and have no external dependencies. They run in milliseconds, providing the fastest feedback. The 'Test Pyramid' concept recommends having many unit tests at the base, fewer integration tests in the middle, and fewest end-to-end tests at the top — because speed and cost of failure increase as you move up.",
    "source": "PSD Course — Test Pyramid; Mike Cohn testing concepts",
    "tip": "Test Pyramid: Unit (fastest) → Integration → E2E (slowest). More at base."
  },
  {
    "id": 381,
    "category": "Advanced Scrum",
    "difficulty": "Hard",
    "question": "Multiple Scrum Teams work on the same product. How should they coordinate to produce a single integrated Increment?",
    "options": [
      "Each team delivers its own separate Increment; they are merged at the end of the release",
      "Teams use a Program Board managed by the Scrum Master of the largest team",
      "Teams align on a shared Definition of Done, shared Sprint cadence, and integrate continuously to produce one combined Increment",
      "A separate integration team is created to merge each team's work"
    ],
    "correct": 2,
    "explanation": "When multiple Scrum Teams work on one product, the Scrum Guide requires them to share a Definition of Done and produce a single integrated Increment. This requires shared Sprint cadence, continuous integration, and coordination between teams. A separate integration team is an anti-pattern that creates handoffs and delays.",
    "source": "Scrum Guide 2020 — Multiple Scrum Teams section",
    "tip": "Multiple teams, one product = shared DoD + shared cadence + single Increment."
  },
  {
    "id": 382,
    "category": "Advanced Scrum",
    "difficulty": "Hard",
    "question": "What is the primary cause of 'Technical Debt' in a Scrum context?",
    "options": [
      "Using outdated programming languages or frameworks",
      "Delivering work that does not meet the Definition of Done and accumulating shortcuts that compromise quality",
      "Having too many items in the Product Backlog",
      "Insufficient Sprint Planning that leads to unrealistic commitments"
    ],
    "correct": 1,
    "explanation": "Technical debt accumulates when work is delivered without meeting the Definition of Done — shortcuts taken, tests skipped, designs compromised. This creates future rework and slows velocity over time. A strong, enforced Definition of Done is the primary defense against technical debt in Scrum.",
    "source": "PSD Course — Technical Debt; Definition of Done",
    "tip": "Technical debt = shipping below DoD. Strong DoD prevents debt accumulation."
  },
  {
    "id": 383,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "What is the maximum recommended size for the Developers group within a Scrum Team?",
    "options": [
      "5 people",
      "7 people",
      "10 people",
      "There is no maximum; it depends on the product complexity"
    ],
    "correct": 1,
    "explanation": "The Scrum Guide 2020 recommends that the Scrum Team (including Scrum Master and Product Owner) should have 10 or fewer members. The Developers group typically has 3 to no more than about 7-8 people. Small enough to be nimble, large enough to be cross-functional.",
    "source": "Scrum Guide 2020 — Scrum Team section",
    "tip": "Scrum Team: 10 or fewer total. Small = nimble communication."
  },
  {
    "id": 384,
    "category": "Agile Principles",
    "difficulty": "Hard",
    "question": "A Scrum Team has been delivering working software every Sprint for six months but stakeholder satisfaction keeps declining. The Scrum Master notices that Sprint Reviews are superficial and stakeholders feel unheard. Which of the following BEST explains the root problem?",
    "options": [
      "The team's velocity is too low to satisfy stakeholder demand",
      "The Sprint Review is not being used as a genuine feedback loop — it is being treated as a demo rather than an adaptive planning event",
      "Stakeholders should not attend Sprint Reviews since it creates pressure on the team",
      "The Product Owner needs to reduce stakeholder expectations"
    ],
    "correct": 1,
    "explanation": "The Sprint Review is not just a demo — it is an Inspect and Adapt event where the whole Scrum Team and stakeholders collaborate on what was done, what changed in the environment, and what to do next. If stakeholders feel unheard, the team is not leveraging the Sprint Review as a genuine feedback loop, which undermines empiricism and trust.",
    "source": "Scrum Guide 2020 — Sprint Review section",
    "tip": "Sprint Review = collaborative feedback loop, NOT a one-way demo."
  },
  {
    "id": 385,
    "category": "DevOps & Engineering",
    "difficulty": "Easy",
    "question": "In Test-Driven Development (TDD), what is the correct order of the red-green-refactor cycle?",
    "options": [
      "Write code, write a failing test, then refactor",
      "Write a failing test, write just enough code to pass it, then refactor",
      "Refactor existing code, write a test, then write code",
      "Write a passing test, write code, then refactor"
    ],
    "correct": 1,
    "explanation": "TDD follows a strict red-green-refactor cycle: (1) Red — write a failing test that describes the desired behavior; (2) Green — write the minimum code necessary to make the test pass; (3) Refactor — clean up the code without breaking the test. This cycle ensures tests drive design and every line of production code is justified by a test.",
    "tip": "Red = failing test first. Green = minimal code to pass. Refactor = clean up.",
    "source": "PSD Course — Test-Driven Development"
  },
  {
    "id": 386,
    "category": "Testing & Quality",
    "difficulty": "Easy",
    "question": "What is the primary purpose of the 'red' phase in the TDD red-green-refactor cycle?",
    "options": [
      "To indicate that the build pipeline has failed",
      "To write a failing test that defines the expected behavior before writing production code",
      "To mark code that needs to be deleted",
      "To run all existing tests and identify which ones are broken"
    ],
    "correct": 1,
    "explanation": "In TDD, the 'red' phase means writing a test that currently fails (shown as red in most test runners) because the production code does not yet exist or does not yet implement the required behavior. Writing the test first forces developers to think about the interface and behavior before implementation, driving better design.",
    "tip": "Red = test written BEFORE code. It fails because the feature doesn't exist yet.",
    "source": "PSD Course — Test-Driven Development"
  },
  {
    "id": 387,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "A Developer following TDD writes a test, runs it, and it passes immediately without writing any production code. What should the Developer do?",
    "options": [
      "Proceed to the refactor phase — a passing test means the feature is done",
      "The test is invalid because it should have failed first; rewrite it to actually fail, then proceed",
      "Skip this test and write the next one",
      "Delete the test because it provides no value"
    ],
    "correct": 1,
    "explanation": "In TDD, a test that passes without any production code being written is a bad test — it does not verify anything meaningful. The 'red' phase requires that the test fails first. If the test passes immediately, either the behavior already exists (which is fine) or the test is not actually testing the right thing. The Developer should verify the test is asserting the correct behavior and, if not, rewrite it so it properly fails before writing the implementation.",
    "tip": "A test that never fails is a test that never proves anything. Red first = required.",
    "source": "PSD Course — Test-Driven Development"
  },
  {
    "id": 388,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What is the purpose of the 'refactor' phase in TDD?",
    "options": [
      "To add new features now that the tests are passing",
      "To improve the internal structure of the code without changing its external behavior, keeping all tests green",
      "To delete the tests that are no longer needed after implementation",
      "To write additional tests for edge cases"
    ],
    "correct": 1,
    "explanation": "The refactor phase is about improving code quality — removing duplication, improving naming, simplifying logic — while the test suite acts as a safety net ensuring no behavior is broken. All tests must remain green throughout refactoring. New features are NOT added during refactoring; that would start a new red-green-refactor cycle.",
    "tip": "Refactor = improve structure, not behavior. Tests stay green throughout.",
    "source": "PSD Course — Test-Driven Development"
  },
  {
    "id": 389,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "A team practicing TDD discovers that writing tests first is difficult because their codebase has many hard-coded dependencies and global state. What does this reveal about the codebase?",
    "options": [
      "TDD is not suitable for this type of codebase and should be abandoned",
      "The tests need to be written differently to accommodate the existing design",
      "The difficulty writing tests is a symptom of poor design; the code is not testable because it lacks proper separation of concerns",
      "The team needs better testing frameworks before adopting TDD"
    ],
    "correct": 2,
    "explanation": "One of the most powerful benefits of TDD is that it reveals design problems immediately. Hard-coded dependencies, global state, and tight coupling make code untestable. When TDD is difficult, it is a direct signal that the design needs improvement — specifically around dependency injection, separation of concerns, and modularity. TDD acts as a design tool, not just a testing tool.",
    "tip": "Painful TDD = code smell. Testability problems reveal design problems.",
    "source": "PSD Course — Test-Driven Development & SOLID Principles"
  },
  {
    "id": 390,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What is a feature toggle (also called a feature flag)?",
    "options": [
      "A branch in version control used to isolate work on a new feature",
      "A configuration mechanism that allows features to be enabled or disabled at runtime without deploying new code",
      "A test that verifies a specific feature works correctly",
      "A Scrum ceremony where the team decides which features to include in the next Sprint"
    ],
    "correct": 1,
    "explanation": "Feature toggles (feature flags) are configuration-driven switches that control whether a feature is active at runtime. They decouple deployment from release, allowing code to be deployed to production but kept disabled until the business decides to enable it. This enables trunk-based development, A/B testing, gradual rollouts, and quick rollbacks without redeployment.",
    "tip": "Feature toggle = deploy without releasing. Enable/disable at runtime via config.",
    "source": "PSD Course — Continuous Delivery & Feature Management"
  },
  {
    "id": 391,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "Which of the following is a key benefit of using feature toggles in a Scrum team's development workflow?",
    "options": [
      "They eliminate the need for automated testing",
      "They allow incomplete features to be merged to the main branch and deployed without being visible to users",
      "They replace the need for a Definition of Done",
      "They allow the team to skip Sprint Reviews"
    ],
    "correct": 1,
    "explanation": "Feature toggles allow developers to merge code to the main branch continuously (supporting CI/CD and trunk-based development) even when features are not fully complete. The toggle keeps the incomplete feature hidden from users until it is ready. This avoids long-lived feature branches and the integration pain they cause.",
    "tip": "Feature toggles enable trunk-based dev: merge early, hide until ready.",
    "source": "PSD Course — Continuous Integration & Feature Toggles"
  },
  {
    "id": 392,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "A team has accumulated dozens of feature toggles over many Sprints and the codebase is becoming hard to maintain. What is the recommended practice?",
    "options": [
      "Keep all toggles forever as insurance for future rollbacks",
      "Convert all toggles into permanent configuration options",
      "Remove toggles once the feature is fully released and the toggle is no longer needed, treating toggle cleanup as technical debt",
      "Use feature toggles only in test environments, never in production"
    ],
    "correct": 2,
    "explanation": "Feature toggles are temporary by nature. Once a feature is fully released and stable, the toggle and its associated conditional logic should be removed. Accumulating unused toggles creates technical debt: increased complexity, harder-to-read code, and difficult testing of toggle combinations. Teams should treat toggle cleanup as a regular hygiene activity, often adding a cleanup task to the Product Backlog when a toggle is created.",
    "tip": "Old toggles = tech debt. Remove toggles after full release. They have a lifespan.",
    "source": "PSD Course — Technical Debt & Feature Toggles"
  },
  {
    "id": 393,
    "category": "DevOps & Engineering",
    "difficulty": "Easy",
    "question": "What is trunk-based development?",
    "options": [
      "A branching strategy where all developers commit directly to a single shared branch (trunk/main) frequently",
      "A strategy where each developer maintains their own long-lived branch",
      "A release process where code is merged to a release branch at the end of each Sprint",
      "A version control strategy where the production branch is separate from the development branch"
    ],
    "correct": 0,
    "explanation": "Trunk-based development is a branching strategy where all developers integrate their changes into a single shared branch (trunk, main, or master) at least once per day. This avoids long-lived feature branches, reduces merge conflicts, and enables true Continuous Integration. Short-lived branches (hours, not days) are acceptable, but code must be integrated frequently.",
    "tip": "Trunk-based = everyone commits to main frequently. No long-lived branches.",
    "source": "PSD Course — Branching Strategies & CI"
  },
  {
    "id": 394,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "Which branching strategy is most compatible with true Continuous Integration?",
    "options": [
      "GitFlow with long-lived develop, release, and hotfix branches",
      "Feature branching where branches last 2-4 weeks",
      "Trunk-based development with short-lived branches integrated at least daily",
      "Release branching where a new branch is created each Sprint"
    ],
    "correct": 2,
    "explanation": "True Continuous Integration requires code to be integrated and verified frequently — ideally multiple times per day. Long-lived branches (GitFlow, feature branches lasting weeks) delay integration and accumulate merge conflicts. Trunk-based development, where code is committed to the main branch at least daily (with short-lived branches acceptable), is the branching strategy most aligned with CI principles.",
    "tip": "CI requires frequent integration. Trunk-based = integrate daily. Long branches break CI.",
    "source": "PSD Course — Continuous Integration & Branching Strategies"
  },
  {
    "id": 395,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "A team using GitFlow with long-lived feature branches finds that Sprint Reviews rarely produce a truly integrated Increment. What is the most likely root cause?",
    "options": [
      "The team needs more Sprint time to integrate branches",
      "Long-lived branches delay integration, causing large merge conflicts and integration issues that are only discovered late in the Sprint",
      "The team should adopt a stricter Definition of Done",
      "The Product Owner should create smaller Product Backlog Items"
    ],
    "correct": 1,
    "explanation": "GitFlow's long-lived feature branches violate the principle of Continuous Integration. When branches diverge for days or weeks, merging them together creates complex conflicts and integration issues. By the time integration happens (often at the end of the Sprint), fixing problems is costly and may prevent delivery of a done Increment. Trunk-based development or very short-lived branches solve this by integrating continuously.",
    "tip": "Long branches = late integration = late conflict discovery = risky Sprints.",
    "source": "PSD Course — Branching Strategies & Continuous Integration"
  },
  {
    "id": 396,
    "category": "Done & Quality",
    "difficulty": "Medium",
    "question": "What is technical debt in the context of software development?",
    "options": [
      "The financial cost of software licenses and infrastructure",
      "The accumulated cost of shortcuts, poor design decisions, and deferred quality work that makes future development slower and riskier",
      "A formal ledger of all bugs and defects in the system",
      "The time spent on non-functional requirements"
    ],
    "correct": 1,
    "explanation": "Technical debt is a metaphor coined by Ward Cunningham describing the implied cost of future rework caused by choosing an easy solution now instead of a better approach that would take longer. Like financial debt, it accrues 'interest' — the longer it is ignored, the more expensive it becomes to fix. It includes poor design, missing tests, outdated dependencies, and anything that makes the codebase harder to work with.",
    "tip": "Tech debt = future pain deferred from today's shortcut. It compounds like financial interest.",
    "source": "PSD Course — Technical Debt Management"
  },
  {
    "id": 397,
    "category": "Done & Quality",
    "difficulty": "Medium",
    "question": "According to Scrum principles, how should a Scrum Team handle technical debt?",
    "options": [
      "Dedicate a separate Sprint exclusively to paying off technical debt at the end of each quarter",
      "Address technical debt continuously within each Sprint as part of the Definition of Done and normal development work",
      "Log technical debt items and address them only when the business approves",
      "Technical debt is acceptable as long as features are delivered on time"
    ],
    "correct": 1,
    "explanation": "Technical debt should be managed continuously, not in isolated 'cleanup Sprints.' Addressing debt within each Sprint — through refactoring, improving the Definition of Done, and building quality in from the start — prevents accumulation. Dedicated 'debt Sprints' suggest that quality is optional rather than integral. The Definition of Done is the primary mechanism for preventing new debt from being introduced.",
    "tip": "No 'debt Sprints' — manage debt continuously inside every Sprint via DoD and refactoring.",
    "source": "PSD Course — Technical Debt & Definition of Done"
  },
  {
    "id": 398,
    "category": "Done & Quality",
    "difficulty": "Hard",
    "question": "A Scrum Team consistently delivers features but the codebase is growing harder to change. Velocity is declining each Sprint. What is the most likely cause and recommended action?",
    "options": [
      "The team is too small; hire more Developers",
      "The Definition of Done is too strict and should be relaxed to improve velocity",
      "Accumulated technical debt is slowing development; the team should strengthen the Definition of Done and allocate capacity to address debt as part of normal Sprint work",
      "The Product Backlog needs to be reprioritized by the Product Owner"
    ],
    "correct": 2,
    "explanation": "Declining velocity despite consistent feature delivery is a classic sign of accumulating technical debt. Each shortcut taken to deliver features faster creates debt that slows future work. The solution is not to relax the DoD (which accelerates debt) but to strengthen it, refactor proactively, and address debt continuously. Attempting to speed up by cutting quality always makes things slower in the long run.",
    "tip": "Declining velocity = tech debt signal. Strengthen DoD, refactor continuously. Never relax quality.",
    "source": "PSD Course — Technical Debt & Sustainable Development"
  },
  {
    "id": 399,
    "category": "Sprint Events",
    "difficulty": "Easy",
    "question": "What is the maximum time-box for a Sprint Retrospective in a one-month Sprint?",
    "options": [
      "1 hour",
      "2 hours",
      "3 hours",
      "4 hours"
    ],
    "correct": 2,
    "explanation": "According to the Scrum Guide 2020, the Sprint Retrospective is time-boxed to a maximum of three hours for a one-month Sprint. For shorter Sprints, the event is usually shorter. The Retrospective occurs after the Sprint Review and before the next Sprint Planning.",
    "tip": "Retrospective max = 3 hours for 1-month Sprint. Scale down for shorter Sprints.",
    "source": "Scrum Guide 2020 — Sprint Retrospective"
  },
  {
    "id": 400,
    "category": "Sprint Events",
    "difficulty": "Medium",
    "question": "What is the primary purpose of the Sprint Retrospective according to the Scrum Guide 2020?",
    "options": [
      "To review the Increment with stakeholders and gather feedback",
      "To plan ways to increase quality and effectiveness by inspecting how the last Sprint went and creating a plan for improvements",
      "To update the Product Backlog based on what was learned during the Sprint",
      "To assign blame for items that were not completed during the Sprint"
    ],
    "correct": 1,
    "explanation": "The Sprint Retrospective's purpose, per the Scrum Guide 2020, is for the Scrum Team to inspect how the last Sprint went with regard to individuals, interactions, processes, tools, and their Definition of Done. The Scrum Team identifies the most helpful changes to improve effectiveness and the most impactful improvements are addressed as soon as possible.",
    "tip": "Retrospective = inspect HOW the team works, not WHAT was built. Process improvement.",
    "source": "Scrum Guide 2020 — Sprint Retrospective"
  },
  {
    "id": 401,
    "category": "Scrum Master",
    "difficulty": "Medium",
    "question": "During a Sprint Retrospective, the team keeps identifying the same problems Sprint after Sprint but never implements improvements. What should the Scrum Master do?",
    "options": [
      "Cancel the Retrospective since it is not producing value",
      "Escalate the issues to management to force resolution",
      "Help the team create specific, actionable improvement items with owners and add them to the Sprint Backlog to ensure accountability",
      "Reduce the Retrospective time-box since the team is not using it effectively"
    ],
    "correct": 2,
    "explanation": "When retrospective improvements are never acted upon, the Scrum Master must help the team move from identifying problems to committing to specific actions. Best practice is to formulate improvements as concrete Sprint Backlog items with clear owners and acceptance criteria. The Scrum Guide states that the Scrum Team should identify the most impactful improvements and may add them to the next Sprint Backlog. Concrete commitments create accountability.",
    "tip": "Unacted improvements = Scrum Master failure. Convert retrospective outputs to Sprint Backlog items.",
    "source": "Scrum Guide 2020 — Sprint Retrospective & Scrum Master accountabilities"
  },
  {
    "id": 402,
    "category": "Sprint Events",
    "difficulty": "Hard",
    "question": "A Scrum Master wants to improve Sprint Retrospective effectiveness. Which facilitation technique is LEAST effective?",
    "options": [
      "Using a structured format such as Start/Stop/Continue to focus discussion",
      "Ensuring psychological safety so team members speak honestly",
      "Having the Scrum Master pre-determine the improvement items before the Retrospective begins",
      "Using dot-voting to prioritize the most important improvement items"
    ],
    "correct": 2,
    "explanation": "Pre-determining improvement items before the Retrospective completely undermines its purpose. The Retrospective must be a collaborative inspection by the whole Scrum Team. If the Scrum Master has already decided the outcomes, the team's input is invalidated, psychological safety is harmed, and the team loses ownership of improvements. Effective facilitation creates space for the team to self-discover and self-select improvements.",
    "tip": "Retrospective improvements must come FROM the team, not be imposed by the Scrum Master.",
    "source": "Scrum Guide 2020 — Sprint Retrospective & Scrum Master as facilitator"
  },
  {
    "id": 403,
    "category": "Scrum Master",
    "difficulty": "Medium",
    "question": "What does the Scrum Guide 2020 say the Scrum Master should do during the Sprint Retrospective?",
    "options": [
      "Observe silently and take notes without participating",
      "Ensure that the event takes place and that attendants understand its purpose, and participate as a team member, ensuring a positive and productive event",
      "Act as the meeting chairperson and make all final decisions on improvement items",
      "Report the retrospective findings to management after the meeting"
    ],
    "correct": 1,
    "explanation": "The Scrum Guide 2020 states that the Scrum Master ensures that the Sprint Retrospective takes place and that it is positive and productive. The Scrum Master participates as a team member (not just a facilitator) since the Scrum Master is also part of the Scrum Team. The Scrum Master teaches all team members to keep it within the time-box.",
    "tip": "Scrum Master participates AS a team member in Retrospective, not just as facilitator.",
    "source": "Scrum Guide 2020 — Scrum Master accountabilities"
  },
  {
    "id": 404,
    "category": "Advanced Scrum",
    "difficulty": "Hard",
    "question": "What is emergent architecture in the context of Agile and Scrum?",
    "options": [
      "The practice of defining the complete system architecture before development begins",
      "An approach where architecture evolves incrementally through iterative development and refactoring, just enough to meet current needs while remaining open to change",
      "Using microservices to replace monolithic systems",
      "The Scrum Team's responsibility to document all architectural decisions in a shared wiki"
    ],
    "correct": 1,
    "explanation": "Emergent architecture (also called evolutionary or incremental architecture) rejects big upfront design. Instead, architecture evolves through iterative delivery and continuous refactoring as requirements are better understood. Teams implement just enough architecture to meet the current Sprint's needs, then adapt. This aligns with Scrum's empiricism — inspect and adapt applies to architecture as much as to product features.",
    "tip": "Emergent = evolve architecture iteratively. Just enough, just in time. No Big Design Up Front.",
    "source": "PSD Course — Emergent Architecture & Agile Principles"
  },
  {
    "id": 405,
    "category": "Advanced Scrum",
    "difficulty": "Hard",
    "question": "A Scrum Team is building a system and an architect insists on defining the full system architecture for the next 12 months before any development begins. How does this conflict with Scrum principles?",
    "options": [
      "It does not conflict — architecture should always be defined upfront for quality",
      "It violates empiricism: big upfront design assumes knowledge the team does not yet have, prevents adaptation, and delays value delivery",
      "It only conflicts if the architect is not a member of the Scrum Team",
      "It conflicts only if the Sprint length is less than two weeks"
    ],
    "correct": 1,
    "explanation": "Scrum is founded on empiricism — transparency, inspection, and adaptation. Big upfront architecture assumes all requirements and technical constraints are known at the start, which contradicts empirical process control. Requirements and technical understanding emerge through iterative delivery. Locking architecture upfront prevents teams from adapting to new information, often resulting in overengineered systems that don't meet real needs.",
    "tip": "Big Design Up Front (BDUF) violates empiricism. Architecture should emerge, not be pre-planned.",
    "source": "Scrum Guide 2020 — Empiricism; PSD Course — Emergent Architecture"
  },
  {
    "id": 406,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "Which SOLID principle states that a class should have only one reason to change?",
    "options": [
      "Open/Closed Principle",
      "Liskov Substitution Principle",
      "Single Responsibility Principle",
      "Interface Segregation Principle"
    ],
    "correct": 2,
    "explanation": "The Single Responsibility Principle (SRP) states that a class should have only one responsibility — one reason to change. If a class handles multiple concerns (e.g., data access and business logic), changes to one concern may break another. SRP promotes cohesion, makes classes easier to test, and reduces the scope of change when requirements evolve.",
    "tip": "SRP = one class, one responsibility, one reason to change. S in SOLID.",
    "source": "PSD Course — SOLID Principles"
  },
  {
    "id": 407,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "Which SOLID principle states that software entities should be open for extension but closed for modification?",
    "options": [
      "Single Responsibility Principle",
      "Open/Closed Principle",
      "Dependency Inversion Principle",
      "Interface Segregation Principle"
    ],
    "correct": 1,
    "explanation": "The Open/Closed Principle (OCP) states that software entities (classes, modules, functions) should be open for extension but closed for modification. You should be able to add new behavior without changing existing code. This is typically achieved through abstraction, polymorphism, and inheritance. It reduces the risk of breaking existing functionality when adding features.",
    "tip": "OCP = add behavior via extension, not by editing existing code. Open/Closed = O in SOLID.",
    "source": "PSD Course — SOLID Principles"
  },
  {
    "id": 408,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "Which SOLID principle is violated when a high-level module directly imports and uses a concrete low-level database class instead of depending on an abstraction?",
    "options": [
      "Single Responsibility Principle",
      "Liskov Substitution Principle",
      "Dependency Inversion Principle",
      "Interface Segregation Principle"
    ],
    "correct": 2,
    "explanation": "The Dependency Inversion Principle (DIP) states that high-level modules should not depend on low-level modules; both should depend on abstractions. When a high-level module directly references a concrete database class, it is tightly coupled to that implementation. Changes to the database class break the high-level module and testing requires a real database. Using interfaces/abstractions allows low-level details to be swapped without affecting high-level logic.",
    "tip": "DIP = depend on interfaces, not concrete classes. High-level -> abstraction <- low-level.",
    "source": "PSD Course — SOLID Principles & Dependency Injection"
  },
  {
    "id": 409,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What type of testing is most appropriate for verifying that individual microservices work correctly in isolation?",
    "options": [
      "End-to-end tests that test the full microservices stack",
      "Unit tests and component tests that mock external service dependencies",
      "Manual exploratory testing by QA engineers",
      "Integration tests that require all microservices to be deployed simultaneously"
    ],
    "correct": 1,
    "explanation": "In a microservices architecture, individual services should be testable in isolation using unit and component tests with mocked dependencies (other services, databases). This provides fast feedback, avoids complex test environment setup, and pinpoints failures to a specific service. End-to-end and integration tests are also valuable but are slower, more brittle, and harder to maintain — they form the top of the test pyramid.",
    "tip": "Test microservices in isolation first. Mock dependencies. End-to-end tests are slow and fragile.",
    "source": "PSD Course — Testing in Microservices & Test Pyramid"
  },
  {
    "id": 410,
    "category": "Testing & Quality",
    "difficulty": "Hard",
    "question": "What is contract testing in a microservices architecture?",
    "options": [
      "Testing that service-level agreements (SLAs) are met by each microservice",
      "A technique where each consumer of a service defines the interface (contract) it expects, and the provider verifies it fulfills those contracts — enabling services to be tested independently",
      "Testing that all microservices are deployed under the same legal contract",
      "Integration tests that verify all microservices work together end-to-end"
    ],
    "correct": 1,
    "explanation": "Contract testing (popularized by tools like Pact) is a technique where consumer services define the shape of data and interactions they expect from a provider. The provider then runs those consumer-driven contracts as tests to verify it meets all consumer expectations. This allows microservices to be tested independently without running the full stack, catching integration breaks early while keeping tests fast and isolated.",
    "tip": "Contract testing = consumer defines expectations, provider verifies. No full stack needed.",
    "source": "PSD Course — Microservices Testing Strategies"
  },
  {
    "id": 411,
    "category": "DevOps & Engineering",
    "difficulty": "Easy",
    "question": "What is Docker primarily used for?",
    "options": [
      "Managing virtual machines on cloud infrastructure",
      "Packaging applications and their dependencies into lightweight, portable containers that run consistently across environments",
      "Orchestrating deployments across multiple Scrum teams",
      "A continuous integration server that runs automated tests"
    ],
    "correct": 1,
    "explanation": "Docker is a containerization platform that packages applications with all their dependencies (libraries, runtime, configuration) into isolated containers. Containers are lightweight, start quickly, and run consistently regardless of the host environment — solving the 'it works on my machine' problem. This makes deployments predictable and enables reliable CI/CD pipelines.",
    "tip": "Docker = package app + dependencies into portable container. Same behavior everywhere.",
    "source": "PSD Course — Containerization & DevOps"
  },
  {
    "id": 412,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "How does containerization with Docker support the Scrum value of continuous delivery of working software?",
    "options": [
      "It eliminates the need for a Definition of Done",
      "It provides environment consistency across development, testing, and production — reducing integration failures and enabling reliable, repeatable deployments",
      "It replaces the need for automated testing since containers isolate problems",
      "It allows Developers to deploy directly to production without a CI/CD pipeline"
    ],
    "correct": 1,
    "explanation": "Containers ensure that code runs the same way in all environments by packaging the application with its exact dependencies and configuration. This eliminates environment-specific bugs and makes deployments reliable and repeatable. Teams can confidently move an Increment from development through testing to production knowing the behavior will be consistent, directly supporting CI/CD and the ability to deploy at the end of every Sprint.",
    "tip": "Containers = consistency across environments = reliable deployments = CI/CD enabler.",
    "source": "PSD Course — Containerization & Continuous Delivery"
  },
  {
    "id": 413,
    "category": "DevOps & Engineering",
    "difficulty": "Easy",
    "question": "What is the purpose of build automation in a software development workflow?",
    "options": [
      "To replace manual code reviews with automated analysis",
      "To automatically compile, test, and package software on every code change, providing fast feedback and eliminating manual build errors",
      "To automate the creation of Product Backlog Items from user stories",
      "To generate Sprint burndown charts automatically"
    ],
    "correct": 1,
    "explanation": "Build automation uses tools (Maven, Gradle, Make, npm, etc.) to automatically compile source code, run tests, and produce deployment artifacts on every code change. This eliminates manual, error-prone build steps, provides fast feedback on regressions, and is the foundation of Continuous Integration. Automated builds ensure that every change is verified consistently and quickly.",
    "tip": "Build automation = compile + test + package automatically on every change. Foundation of CI.",
    "source": "PSD Course — Build Automation & Continuous Integration"
  },
  {
    "id": 414,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "A team's build takes 45 minutes to run. Developers avoid running it locally and only discover failures after pushing code. What is the most significant risk this creates?",
    "options": [
      "It increases the Sprint velocity metric",
      "It delays feedback loops — failures are discovered late, making root cause analysis harder and increasing the cost of fixing bugs",
      "It forces the team to use a stricter Definition of Done",
      "It requires more frequent Sprint Reviews"
    ],
    "correct": 1,
    "explanation": "Fast feedback is a core principle of CI/CD. When builds are slow, developers delay triggering them, which means failures are discovered long after the code was written. The cost of fixing a bug increases dramatically the longer it sits undetected. A 45-minute build discourages the frequent integration that CI requires. Teams should invest in parallelizing tests, optimizing build scripts, and using test impact analysis to keep builds fast.",
    "tip": "Slow builds = delayed feedback = expensive bugs. Target: builds under 10 minutes.",
    "source": "PSD Course — Continuous Integration & Build Optimization"
  },
  {
    "id": 415,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "What is a blue-green deployment strategy?",
    "options": [
      "A branching strategy that uses blue branches for features and green branches for bug fixes",
      "A deployment approach where two identical production environments exist; traffic is switched from the current (blue) to the new (green) version instantly, enabling zero-downtime releases and instant rollback",
      "A testing strategy where blue tests run in staging and green tests run in production",
      "A Scrum-specific release strategy aligned with Sprint colors in a burndown chart"
    ],
    "correct": 1,
    "explanation": "Blue-green deployment maintains two identical production environments. The 'blue' environment runs the current live version. The 'green' environment has the new version deployed and tested. When ready, a load balancer or DNS switch redirects all traffic from blue to green instantly. If issues arise, traffic is switched back to blue immediately (rollback). This achieves zero-downtime deployments and very fast, safe rollbacks.",
    "tip": "Blue-green = two identical envs. Switch traffic instantly. Instant rollback = switch back.",
    "source": "PSD Course — Deployment Strategies & Continuous Delivery"
  },
  {
    "id": 416,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "What distinguishes a canary deployment from a blue-green deployment?",
    "options": [
      "Canary deployments use containers; blue-green deployments use virtual machines",
      "In canary deployments, the new version is released to a small subset of users first to validate behavior before rolling out to all users; blue-green switches all traffic at once",
      "Canary deployments require feature toggles; blue-green deployments do not",
      "Blue-green is used for microservices; canary is used for monolithic applications"
    ],
    "correct": 1,
    "explanation": "Canary deployments (named after the canary-in-a-coal-mine metaphor) release the new version to a small percentage of users (e.g., 5%) first. Real user traffic and behavior is monitored. If metrics look healthy, the rollout percentage is gradually increased until 100% of users are on the new version. Blue-green switches all traffic at once. Canary is safer for detecting subtle production issues that didn't appear in testing, at the cost of more complexity.",
    "tip": "Canary = gradual rollout to small % first. Blue-green = all-at-once switch. Canary = safer validation.",
    "source": "PSD Course — Deployment Strategies & Progressive Delivery"
  },
  {
    "id": 417,
    "category": "Scrum Master",
    "difficulty": "Medium",
    "question": "A senior Developer consistently dismisses other team members' ideas during Sprint Planning and Retrospectives. The Scrum Master has noticed this pattern. What is the most appropriate Scrum Master response?",
    "options": [
      "Report the Developer's behavior to management for disciplinary action",
      "Allow the team to self-organize and handle the situation without intervention",
      "Coach the Developer privately about their behavior's impact on team dynamics and facilitate a team discussion about healthy collaboration norms",
      "Remove the Developer from the Scrum Team"
    ],
    "correct": 2,
    "explanation": "The Scrum Master serves the Scrum Team by fostering an environment where all voices are heard and psychological safety is maintained. Coaching the Developer privately about the impact of their behavior (not attacking their character) and facilitating team agreements about collaboration are appropriate interventions. The Scrum Master should not escalate immediately to management or stay passive — both fail the team. The goal is to help the team become more effective.",
    "tip": "Scrum Master coaches behaviors, doesn't punish. Private coaching first, then team-level facilitation.",
    "source": "Scrum Guide 2020 — Scrum Master accountabilities; PSD coaching principles"
  },
  {
    "id": 418,
    "category": "Scrum Master",
    "difficulty": "Hard",
    "question": "Which of the following BEST describes a Scrum Master coaching a team toward self-management?",
    "options": [
      "Telling the team exactly how to solve impediments so they can move forward faster",
      "Assigning work to Developers each day to ensure the Sprint Goal is met",
      "Asking powerful questions that help the team discover their own solutions rather than providing answers, building the team's capability to self-organize",
      "Attending all team meetings and approving all technical decisions to ensure quality"
    ],
    "correct": 2,
    "explanation": "A Scrum Master coaching toward self-management focuses on building the team's capability, not creating dependency on the Scrum Master. Asking powerful questions (coaching technique) rather than providing answers empowers the team to develop their own problem-solving skills. When a Scrum Master always provides answers, the team never learns to self-organize. The Scrum Master's goal is to make themselves less necessary over time, not more.",
    "tip": "Coach by asking, not telling. Build team capability. Self-management = team solves its own problems.",
    "source": "Scrum Guide 2020 — Scrum Master accountabilities; Agile coaching principles"
  },
  {
    "id": 419,
    "category": "Scrum Master",
    "difficulty": "Medium",
    "question": "A Scrum Team is working on a technically complex product and the Developers frequently ask the Scrum Master (who has a software background) to make technical decisions. What should the Scrum Master do?",
    "options": [
      "Make the decisions quickly to prevent Sprint delays",
      "Refuse to engage with any technical discussion",
      "Redirect technical decision-making back to the Developers while offering to facilitate discussion or help them access information — preserving their self-management and accountability for the technical work",
      "Escalate all technical questions to the Product Owner"
    ],
    "correct": 2,
    "explanation": "Developers are accountable for all technical decisions in Scrum. When a Scrum Master with technical expertise makes decisions on behalf of Developers, it undermines self-management, reduces Developer ownership, and creates a bottleneck. The Scrum Master's role is to coach and facilitate — not to be the technical decision-maker. Redirecting decisions back to the team (even when the Scrum Master knows the answer) builds team capability and preserves proper accountability.",
    "tip": "Scrum Master redirects technical decisions to Developers. Facilitation != decision-making.",
    "source": "Scrum Guide 2020 — Scrum Master accountabilities & Developer accountability"
  },
  {
    "id": 420,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "Who is the ONLY person who can cancel a Sprint?",
    "options": [
      "The Scrum Master, if the Sprint Goal becomes obsolete",
      "The Product Owner",
      "The Developers, by consensus vote",
      "Any Scrum Team member if the Sprint Goal cannot be met"
    ],
    "correct": 1,
    "explanation": "According to the Scrum Guide 2020, only the Product Owner has the authority to cancel a Sprint. A Sprint can be cancelled if the Sprint Goal becomes obsolete, which can happen when the company changes direction or market/technology conditions change. Although stakeholders may influence the decision, the cancellation authority rests solely with the Product Owner.",
    "source": "Scrum Guide 2020 — Sprint Cancellation section",
    "tip": "Only the PO cancels Sprints. No one else has this authority."
  },
  {
    "id": 421,
    "category": "Scrum Framework",
    "difficulty": "Hard",
    "question": "A Sprint is cancelled with 5 days remaining. The Scrum Team has completed three Product Backlog Items that meet the Definition of Done. What happens to those completed items?",
    "options": [
      "They are discarded because the Sprint was cancelled before completion",
      "They are reviewed at the next Sprint Review and accepted then",
      "They are released or kept — any completed and 'Done' items are reviewed and may be accepted by the Product Owner",
      "They automatically become part of the next Sprint Backlog"
    ],
    "correct": 2,
    "explanation": "When a Sprint is cancelled, any Product Backlog Items that are 'Done' (meeting the Definition of Done) are reviewed. If any represent a usable increment, they may be accepted by the Product Owner. Incomplete items are re-estimated and returned to the Product Backlog. Cancelled Sprints do not invalidate work that already meets the Definition of Done.",
    "source": "Scrum Guide 2020 — Sprint Cancellation section",
    "tip": "Done items survive Sprint cancellation and may be accepted. Incomplete items go back to the backlog."
  },
  {
    "id": 422,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "Which of the following best describes a valid reason for the Product Owner to cancel a Sprint?",
    "options": [
      "The team is not meeting velocity targets",
      "The Sprint Goal has become obsolete",
      "Key Developers are on vacation",
      "The Sprint is taking longer than expected"
    ],
    "correct": 1,
    "explanation": "A Sprint can be cancelled when the Sprint Goal becomes obsolete. This happens when the company changes direction, market conditions shift, or technology makes the goal irrelevant. Velocity, absences, or timeline issues are not valid cancellation triggers per the Scrum Guide 2020.",
    "source": "Scrum Guide 2020 — Sprint Cancellation section",
    "tip": "Obsolete Sprint Goal = only valid cancellation reason in Scrum Guide 2020."
  },
  {
    "id": 423,
    "category": "Backlog Management",
    "difficulty": "Medium",
    "question": "Which of the following is an accountability of the Product Owner as defined in the Scrum Guide 2020?",
    "options": [
      "Managing the Developers' daily work assignments",
      "Maximizing the value of the product resulting from the Scrum Team's work",
      "Facilitating all Scrum events if the Scrum Master is unavailable",
      "Defining the technical approach for Developers to follow"
    ],
    "correct": 1,
    "explanation": "The Product Owner is accountable for maximizing the value of the product resulting from the Scrum Team's work. This includes developing and explicitly communicating the Product Goal, ordering the Product Backlog, and ensuring the Product Backlog is transparent, visible, and understood. The PO does not manage Developers' daily work or define technical approaches.",
    "source": "Scrum Guide 2020 — Product Owner section",
    "tip": "PO = maximize product VALUE. Not managing people or defining technical solutions."
  },
  {
    "id": 424,
    "category": "Backlog Management",
    "difficulty": "Easy",
    "question": "Who is accountable for ordering the Product Backlog?",
    "options": [
      "The Scrum Master",
      "The Developers",
      "The Product Owner",
      "Stakeholders"
    ],
    "correct": 2,
    "explanation": "The Product Owner is accountable for ordering the Product Backlog to maximize value. While the PO may delegate certain tasks, they remain accountable for the ordering decisions. Stakeholders may influence the backlog, but the PO has the final authority.",
    "source": "Scrum Guide 2020 — Product Owner section",
    "tip": "PO orders the backlog. Always. Delegation possible but accountability stays with PO."
  },
  {
    "id": 425,
    "category": "Done & Quality",
    "difficulty": "Medium",
    "question": "When is an Increment considered releasable per the Scrum Guide 2020?",
    "options": [
      "When the Product Owner approves it at the Sprint Review",
      "When all Sprint Backlog items are complete",
      "When it meets the Definition of Done",
      "When it has been deployed to production"
    ],
    "correct": 2,
    "explanation": "An Increment is releasable when it meets the Definition of Done. The Scrum Guide 2020 states that an Increment must meet the Definition of Done before it can be considered releasable. The Product Owner decides whether to actually release it, but releasability is defined by the DoD, not by PO approval or production deployment.",
    "source": "Scrum Guide 2020 — Increment section",
    "tip": "Releasable = meets DoD. The PO DECIDES to release, but DoD determines IF it CAN be released."
  },
  {
    "id": 426,
    "category": "Done & Quality",
    "difficulty": "Hard",
    "question": "A Scrum Team's Definition of Done requires automated integration tests to pass. During a Sprint, Developers discover that automated tests for a completed feature cannot pass due to a dependent service being unavailable. What should happen?",
    "options": [
      "The item should be considered Done since the Developers completed their part",
      "The item cannot be included in the Sprint's Increment — it does not meet the Definition of Done",
      "The Scrum Master can waive the DoD requirement for this Sprint",
      "The Product Owner can accept the item and mark it Done to meet the Sprint Goal"
    ],
    "correct": 1,
    "explanation": "If a Product Backlog Item does not meet the Definition of Done, it cannot be included in the Increment. The Scrum Guide 2020 is explicit: work that does not meet the DoD must be returned to the Product Backlog and considered for a future Sprint. No individual — not the Scrum Master, not the Product Owner — can waive the Definition of Done.",
    "source": "Scrum Guide 2020 — Definition of Done section",
    "tip": "DoD is non-negotiable. No one can waive it — not PO, not SM. Undone items go back to backlog."
  },
  {
    "id": 427,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What is the primary goal of monitoring and observability in a production system?",
    "options": [
      "To replace manual testing with automated alerts",
      "To understand the internal state of a system by examining its external outputs",
      "To measure developer productivity through deployment frequency",
      "To ensure code coverage metrics are maintained above 80%"
    ],
    "correct": 1,
    "explanation": "Observability is the ability to understand the internal state of a system by examining its external outputs (logs, metrics, traces). Monitoring tracks known failure modes; observability enables exploring unknown failure modes. Together, they allow teams to detect, diagnose, and resolve issues in production systems quickly.",
    "source": "PSD Curriculum — Monitoring & Observability",
    "tip": "Observability = understand INTERNAL state from EXTERNAL outputs. Monitoring = known failures; observability = unknown failures."
  },
  {
    "id": 428,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "Which three pillars are foundational to observability in distributed systems?",
    "options": [
      "Logs, Metrics, and Traces",
      "Unit Tests, Integration Tests, and E2E Tests",
      "Alerts, Dashboards, and Runbooks",
      "CPU Usage, Memory Usage, and Disk I/O"
    ],
    "correct": 0,
    "explanation": "The three pillars of observability are: Logs (records of discrete events), Metrics (numeric measurements over time, e.g. request rate, error rate, latency), and Traces (end-to-end tracking of requests across distributed services). Together they provide complete visibility into system behavior and enable root cause analysis.",
    "source": "PSD Curriculum — Observability & Distributed Systems",
    "tip": "Three pillars = Logs + Metrics + Traces. Remember: LMT."
  },
  {
    "id": 429,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "What is chaos engineering, and what is its primary purpose?",
    "options": [
      "A testing methodology that introduces random delays to measure performance under load",
      "A discipline for experimenting on a system to build confidence in its capability to withstand turbulent conditions in production",
      "A technique for deliberately breaking unit tests to find missing coverage",
      "An approach to writing deliberately disorganized code to simulate real-world complexity"
    ],
    "correct": 1,
    "explanation": "Chaos engineering is the discipline of experimenting on a system in order to build confidence in its capability to withstand turbulent conditions in production. Teams intentionally inject failures (network partitions, service crashes, resource exhaustion) to discover weaknesses before they cause production incidents. It was pioneered by Netflix (Chaos Monkey) and follows the scientific method: hypothesize, experiment, observe.",
    "source": "PSD Curriculum — Chaos Engineering & Resilience",
    "tip": "Chaos engineering = controlled experiments that inject failure to build CONFIDENCE in resilience."
  },
  {
    "id": 430,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What is Behavior-Driven Development (BDD)?",
    "options": [
      "A testing approach where testers write test scripts before code is written",
      "A collaboration practice that uses concrete examples in natural language to illustrate desired system behavior, driving development from the outside in",
      "A development technique where all behavior is validated through performance tests",
      "A method where Developers document behavior after code is written to improve readability"
    ],
    "correct": 1,
    "explanation": "BDD (Behavior-Driven Development) is a collaboration practice that uses concrete examples in plain language (often Given-When-Then format) to illustrate desired behavior, creating shared understanding between business, QA, and development. BDD drives development from the outside-in, using executable specifications (e.g., Cucumber, SpecFlow) as living documentation.",
    "source": "PSD Curriculum — BDD & ATDD",
    "tip": "BDD = Given-When-Then scenarios written collaboratively by business + QA + Dev. Executable specs."
  },
  {
    "id": 431,
    "category": "Testing & Quality",
    "difficulty": "Hard",
    "question": "How does Acceptance Test-Driven Development (ATDD) differ from Test-Driven Development (TDD)?",
    "options": [
      "ATDD focuses on unit tests written by Developers; TDD focuses on acceptance tests written by stakeholders",
      "ATDD starts with acceptance criteria agreed upon by the whole team before implementation; TDD starts with unit tests written by Developers",
      "ATDD is used only in waterfall projects; TDD is used in agile projects",
      "There is no practical difference — both terms describe the same practice"
    ],
    "correct": 1,
    "explanation": "ATDD (Acceptance Test-Driven Development) begins with acceptance criteria defined collaboratively by customers, testers, and developers before implementation begins. These criteria become automated acceptance tests. TDD begins with Developers writing unit tests before writing production code. ATDD operates at the system/acceptance level; TDD operates at the unit level. Both drive development from tests, but at different levels of the testing pyramid.",
    "source": "PSD Curriculum — BDD/ATDD vs TDD",
    "tip": "ATDD = customer-facing acceptance tests first (whole team). TDD = developer unit tests first. Different levels."
  },
  {
    "id": 432,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What is the primary purpose of acceptance testing in a Scrum context?",
    "options": [
      "To verify that the system meets performance benchmarks defined in the SLA",
      "To confirm that a Product Backlog Item meets its acceptance criteria and satisfies the stakeholder's needs",
      "To ensure that security vulnerabilities have been addressed before release",
      "To validate that all unit tests pass in the CI pipeline"
    ],
    "correct": 1,
    "explanation": "Acceptance testing verifies that a Product Backlog Item meets the acceptance criteria agreed upon before the Sprint. It confirms the software behaves as expected from the user's or business's perspective. In Scrum, acceptance tests are ideally automated and run as part of the Definition of Done, ensuring each increment is truly usable.",
    "source": "PSD Curriculum — Acceptance Testing & Definition of Done",
    "tip": "Acceptance testing = does it meet the ACCEPTANCE CRITERIA? User perspective, not technical."
  },
  {
    "id": 433,
    "category": "Agile Principles",
    "difficulty": "Medium",
    "question": "In Lean, which of the following is classified as a type of waste (Muda)?",
    "options": [
      "Pair programming",
      "Partially done work",
      "Automated testing",
      "Continuous integration"
    ],
    "correct": 1,
    "explanation": "Lean identifies 7 types of waste in software development (from Mary and Tom Poppendieck's adaptation): partially done work, extra features, relearning, handoffs, task switching, delays, and defects. Partially done work is waste because it occupies resources, creates risk, and delivers no value until complete. Pair programming, automated testing, and CI are practices that REDUCE waste.",
    "source": "PSD Curriculum — Lean Principles & Waste Elimination",
    "tip": "7 Lean wastes in software: partially done work, extra features, relearning, handoffs, task switching, delays, defects."
  },
  {
    "id": 434,
    "category": "Agile Principles",
    "difficulty": "Hard",
    "question": "Which of the following BEST represents the Lean waste of 'extra features'?",
    "options": [
      "Writing code that has not yet been integrated",
      "Building features that were not requested and may never be used",
      "Spending too much time in Sprint Planning",
      "Having too many items in the Product Backlog"
    ],
    "correct": 1,
    "explanation": "The Lean waste of 'extra features' (also called 'over-production' or 'gold plating') refers to building functionality beyond what was requested or needed. In software, this is often driven by developers wanting to add 'nice to have' features. These features consume development time, add maintenance burden, increase complexity, and may never provide value if users don't use them.",
    "source": "PSD Curriculum — Lean Waste Types (Poppendieck)",
    "tip": "Extra features = building things no one asked for. YAGNI principle: 'You Ain't Gonna Need It.'"
  },
  {
    "id": 435,
    "category": "Advanced Scrum",
    "difficulty": "Hard",
    "question": "A Scrum Team adopts a Kanban board alongside Scrum. Which Kanban flow metric is MOST useful for predicting when a Product Backlog Item will be completed?",
    "options": [
      "Throughput — the number of items completed per Sprint",
      "Work In Progress (WIP) — the number of items currently being worked on",
      "Cycle Time — the elapsed time from when work starts on an item to when it is done",
      "Lead Time — the elapsed time from when an item enters the backlog to when it is delivered"
    ],
    "correct": 2,
    "explanation": "Cycle Time measures the elapsed time from when work actually starts on an item to when it meets the Definition of Done. It is the most useful metric for predicting future completion times within the team's control. Lead Time includes wait time in the backlog (outside team control). Throughput measures volume, and WIP measures current load. For forecasting individual item completion, Cycle Time provides the most actionable data.",
    "source": "PSD Curriculum — Kanban Metrics in Scrum",
    "tip": "Cycle Time = work started → done. Best for PREDICTING completion. Lead Time includes backlog wait."
  },
  {
    "id": 436,
    "category": "Advanced Scrum",
    "difficulty": "Medium",
    "question": "When a Scrum Team uses Kanban flow metrics, what does 'throughput' measure?",
    "options": [
      "The speed at which individual Developers complete tasks",
      "The number of Product Backlog Items completed per unit of time",
      "The total time a story spends in the backlog before being started",
      "The percentage of stories completed without defects"
    ],
    "correct": 1,
    "explanation": "Throughput in Kanban measures the number of items (Product Backlog Items, user stories, etc.) completed per unit of time (e.g., per Sprint, per week). It is a key flow metric used for forecasting: if a team has a historical throughput of 8 items per Sprint, you can use probabilistic forecasting to predict how many Sprints a set of items will take.",
    "source": "PSD Curriculum — Kanban Metrics & Forecasting",
    "tip": "Throughput = items COMPLETED per time period. Use it for probabilistic forecasting."
  },
  {
    "id": 437,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What is Infrastructure as Code (IaC), and what is its primary benefit for Scrum Teams?",
    "options": [
      "Writing application code that automatically provisions cloud resources at runtime",
      "Managing and provisioning infrastructure through machine-readable configuration files rather than manual processes, enabling repeatability and version control",
      "A coding standard that enforces infrastructure-related naming conventions in application code",
      "A technique for embedding infrastructure monitoring directly into application source code"
    ],
    "correct": 1,
    "explanation": "Infrastructure as Code (IaC) is the practice of managing and provisioning infrastructure (servers, networks, databases, cloud resources) through version-controlled configuration files (e.g., Terraform, Ansible, CloudFormation) rather than manual processes. For Scrum Teams, IaC enables: repeatability (same infra every time), version control (audit trail), automated testing of infrastructure, faster environment creation, and reduced 'works on my machine' problems.",
    "source": "PSD Curriculum — Infrastructure as Code & DevOps",
    "tip": "IaC = infrastructure defined in code, version-controlled, automated. Eliminates manual, error-prone provisioning."
  },
  {
    "id": 438,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "A Scrum Team needs to deploy database schema changes alongside application code changes continuously. Which strategy BEST minimizes downtime and deployment risk?",
    "options": [
      "Deploy all schema changes manually before deploying the application code",
      "Use expand-contract (parallel change) migrations: add new schema elements while keeping old ones, deploy the application, then remove old schema elements in a later migration",
      "Roll back the database to its previous state if the deployment fails, then re-deploy",
      "Deploy schema changes only at the end of each Sprint to batch them together"
    ],
    "correct": 1,
    "explanation": "The expand-contract pattern (also called parallel change) is the safest strategy for continuous database migrations: (1) Expand: add new columns/tables while keeping old ones — both old and new app versions work. (2) Deploy new application code that uses new schema. (3) Contract: once confirmed, remove old schema elements. This enables zero-downtime deployments and easy rollback. Batching migrations or requiring downtime contradicts continuous delivery principles.",
    "source": "PSD Curriculum — Database Migration Strategies & Continuous Delivery",
    "tip": "Expand-contract = add new schema first, deploy app, then remove old schema. Zero downtime, easy rollback."
  },
  {
    "id": 439,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What is Static Application Security Testing (SAST)?",
    "options": [
      "Security testing performed by penetration testers attempting to breach the running application",
      "Analysis of source code, bytecode, or binaries for security vulnerabilities without executing the application",
      "Load testing that simulates malicious traffic patterns to identify security weaknesses",
      "A process where security experts review the application architecture documents"
    ],
    "correct": 1,
    "explanation": "SAST (Static Application Security Testing) analyzes source code, bytecode, or binary code for security vulnerabilities without executing the application. It is a 'white-box' testing approach that can be integrated into CI/CD pipelines to catch vulnerabilities early (e.g., SQL injection, XSS, hardcoded credentials). Common SAST tools include SonarQube, Checkmarx, and Veracode. SAST finds issues early but can produce false positives.",
    "source": "PSD Curriculum — Security Testing: SAST & DAST",
    "tip": "SAST = static analysis of SOURCE CODE for security flaws. No running app needed. White-box. Shift-left security."
  },
  {
    "id": 440,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What is Dynamic Application Security Testing (DAST)?",
    "options": [
      "Analysis of application source code for insecure coding patterns without running the application",
      "Security testing performed against a running application by simulating external attacks",
      "A process of dynamically generating test data to improve code coverage",
      "Automated regression testing that validates security headers in HTTP responses"
    ],
    "correct": 1,
    "explanation": "DAST (Dynamic Application Security Testing) tests a running application from the outside, simulating how an attacker would interact with it. It sends malicious inputs, examines responses, and identifies runtime vulnerabilities like SQL injection, XSS, and authentication flaws. Common DAST tools include OWASP ZAP and Burp Suite. Unlike SAST, DAST is a 'black-box' approach — it doesn't need source code access but requires a running environment.",
    "source": "PSD Curriculum — Security Testing: SAST & DAST",
    "tip": "DAST = tests RUNNING application from outside. Black-box. Simulates real attacker. Finds runtime vulnerabilities."
  },
  {
    "id": 441,
    "category": "Testing & Quality",
    "difficulty": "Hard",
    "question": "A Scrum Team wants to integrate security testing into their Definition of Done. Which combination of security practices provides the most comprehensive coverage in a CI/CD pipeline?",
    "options": [
      "Manual penetration testing at each Sprint Review",
      "SAST in the CI pipeline on every commit, plus DAST against a staging environment before each release",
      "Only DAST, since it tests the actual running application and catches more real-world vulnerabilities",
      "Code review by a security team after each Sprint"
    ],
    "correct": 1,
    "explanation": "Combining SAST and DAST provides complementary coverage: SAST runs on every commit in the CI pipeline (fast feedback, catches code-level vulnerabilities early, shift-left security), while DAST runs against a staging environment to catch runtime vulnerabilities that only manifest when the application is running. This layered approach is a security testing best practice — SAST alone misses runtime issues; DAST alone misses code-level issues and runs too late.",
    "source": "PSD Curriculum — Security in CI/CD Pipelines",
    "tip": "SAST + DAST = complementary. SAST in CI (every commit) + DAST in staging (runtime). Both are needed."
  },
  {
    "id": 442,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "Which performance testing type validates that a system can handle the maximum expected load under normal conditions?",
    "options": [
      "Stress testing",
      "Load testing",
      "Soak testing",
      "Spike testing"
    ],
    "correct": 1,
    "explanation": "Load testing validates system behavior under the maximum expected normal load (e.g., peak concurrent users, transactions per second). It verifies the system meets performance requirements under realistic conditions. Stress testing goes beyond normal limits to find breaking points. Soak testing checks for degradation over extended periods. Spike testing validates behavior under sudden traffic surges.",
    "source": "PSD Curriculum — Performance Testing Types",
    "tip": "Load = normal max load. Stress = beyond limits. Soak = extended duration. Spike = sudden surge."
  },
  {
    "id": 443,
    "category": "Testing & Quality",
    "difficulty": "Hard",
    "question": "A Scrum Team's application shows increasing response times after running for 48 hours, but performs well in short tests. Which type of performance test should they run?",
    "options": [
      "Load testing with peak concurrent users",
      "Stress testing to find the breaking point",
      "Soak (endurance) testing over an extended period",
      "Spike testing with sudden traffic surges"
    ],
    "correct": 2,
    "explanation": "The described symptom — performance degrading over extended runtime despite good short-term performance — is a classic sign of memory leaks, connection pool exhaustion, or resource accumulation. Soak testing (also called endurance testing) runs the system under normal load for an extended period (hours or days) to detect these types of gradual degradation issues that don't appear in short-duration tests.",
    "source": "PSD Curriculum — Performance Testing & Endurance Testing",
    "tip": "Slow degradation over time = memory leak suspect. Run SOAK testing. Endurance reveals what short tests miss."
  },
  {
    "id": 444,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "What is a 'code smell', and how does it relate to refactoring?",
    "options": [
      "A code smell is a security vulnerability identified by SAST tools; refactoring fixes it",
      "A code smell is a surface-level indicator in code that suggests a deeper problem may exist; refactoring is the technique used to improve the code's structure without changing its behavior",
      "A code smell is any line of code longer than 120 characters; refactoring reformats it",
      "A code smell is a failing unit test; refactoring is writing new code to make it pass"
    ],
    "correct": 1,
    "explanation": "A code smell (term coined by Kent Beck, popularized by Martin Fowler) is a characteristic in source code that suggests a deeper structural problem. Examples include: Long Method, Large Class, Duplicate Code, Feature Envy, Data Clumps, Primitive Obsession, and Shotgun Surgery. Code smells are not bugs — they don't prevent the code from working — but they indicate areas that may benefit from refactoring. Refactoring addresses code smells by restructuring the code without changing its external behavior.",
    "source": "PSD Curriculum — Code Smells & Refactoring (Martin Fowler)",
    "tip": "Code smell = structural indicator of deeper problems. Refactor to address them WITHOUT changing behavior."
  },
  {
    "id": 445,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "A method has grown to over 200 lines and handles database queries, business logic, and email sending all in one place. Which refactoring pattern BEST addresses this?",
    "options": [
      "Rename Method — give the method a more descriptive name",
      "Extract Method — break the large method into smaller, focused methods",
      "Move Method — move the method to a more appropriate class",
      "Inline Method — replace the method with its body at each call site"
    ],
    "correct": 1,
    "explanation": "The 'Long Method' code smell is best addressed by the 'Extract Method' refactoring pattern: identify cohesive groups of code within the large method and extract them into separate, well-named methods. This improves readability, testability, and reuse. The extracted methods can then be further improved — some may need to be moved to more appropriate classes (Move Method), but the first step is extraction.",
    "source": "PSD Curriculum — Refactoring Patterns (Martin Fowler)",
    "tip": "Long Method → Extract Method. Pull out cohesive chunks into separate, well-named methods."
  },
  {
    "id": 446,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "Which refactoring pattern is MOST appropriate when two classes perform the same logic in different ways?",
    "options": [
      "Extract Superclass — move shared behavior to a common base class",
      "Rename Variable — standardize naming across both classes",
      "Extract Method — create a new method within one of the classes",
      "Inline Class — collapse one class into the other"
    ],
    "correct": 0,
    "explanation": "When two classes perform similar logic, the 'Duplicate Code' code smell is present. 'Extract Superclass' (or Extract Interface, or Pull Up Method) addresses this by moving shared behavior to a common base class or abstraction, allowing both classes to inherit or implement it. This eliminates duplication and creates a single point of maintenance. This is a classic application of the DRY (Don't Repeat Yourself) principle through refactoring.",
    "source": "PSD Curriculum — Refactoring Patterns & DRY Principle",
    "tip": "Duplicate logic in two classes → Extract Superclass (or Pull Up Method). DRY through inheritance."
  },
  {
    "id": 447,
    "category": "Scrum Master",
    "difficulty": "Easy",
    "question": "The Scrum Master notices that the Daily Scrum is consistently running 30 minutes. What should the Scrum Master do?",
    "options": [
      "Cancel the Daily Scrum until the team learns to be more efficient",
      "Coach the Developers on the purpose of the Daily Scrum and help them inspect and adapt their approach to keep it within 15 minutes",
      "Allow it — the Scrum Guide says 15 minutes is a guideline, not a rule",
      "Take over facilitation and enforce strict time limits by interrupting speakers"
    ],
    "correct": 1,
    "explanation": "The Scrum Master serves the Developers by coaching them in self-management and Scrum practices. The Daily Scrum has a 15-minute timebox per the Scrum Guide 2020. The Scrum Master should coach the team on the purpose (inspect progress, adapt the Sprint Backlog plan) and help them find ways to stay within the timebox — not enforce it through interruption or cancel the event.",
    "source": "Scrum Guide 2020 — Daily Scrum & Scrum Master Accountabilities",
    "tip": "SM coaches, doesn't control. Help the team understand WHY 15 minutes, and let them adapt HOW."
  },
  {
    "id": 448,
    "category": "Scrum Master",
    "difficulty": "Medium",
    "question": "A Product Owner is struggling to communicate product vision to stakeholders and Developers. How should the Scrum Master respond?",
    "options": [
      "Take over the stakeholder communication responsibilities from the Product Owner",
      "Escalate the issue to management so they can coach the Product Owner",
      "Coach the Product Owner on effective techniques for communicating product vision and facilitating stakeholder engagement",
      "Advise the Developers to interpret the Product Backlog items themselves without relying on the Product Owner"
    ],
    "correct": 2,
    "explanation": "The Scrum Master serves the Product Owner by coaching them in Product Goal and Product Backlog management, helping them understand the need for clear and concise Product Backlog items, and facilitating stakeholder collaboration. The Scrum Master coaches and supports the PO rather than taking over their responsibilities or escalating unnecessarily.",
    "source": "Scrum Guide 2020 — Scrum Master serving the Product Owner",
    "tip": "SM serves the PO through coaching, not by taking over. Coach on vision communication and stakeholder engagement."
  },
  {
    "id": 449,
    "category": "Sprint Events",
    "difficulty": "Medium",
    "question": "What is the maximum timebox for a Sprint Review in a one-month Sprint?",
    "options": [
      "1 hour",
      "2 hours",
      "4 hours",
      "8 hours"
    ],
    "correct": 2,
    "explanation": "Per the Scrum Guide 2020, the Sprint Review is timeboxed to a maximum of 4 hours for a one-month Sprint. For shorter Sprints, the event is usually shorter. The Sprint Review is a working session where the Scrum Team and stakeholders inspect the Increment and adapt the Product Backlog — not a formal presentation or status meeting.",
    "source": "Scrum Guide 2020 — Sprint Review section",
    "tip": "Sprint Review: 4 hours max for 1-month Sprint. Shorter sprint = shorter review."
  },
  {
    "id": 450,
    "category": "Cross-functional Teams",
    "difficulty": "Easy",
    "question": "Which of the following BEST describes a cross-functional Scrum Team?",
    "options": [
      "A team where each member can perform every other member's role",
      "A team that has all the skills necessary to create value each Sprint without depending on people outside the team",
      "A team composed of members from multiple departments within the organization",
      "A team where the Scrum Master, Product Owner, and Developers rotate roles each Sprint"
    ],
    "correct": 1,
    "explanation": "A cross-functional team in Scrum has all the skills necessary to create value each Sprint without requiring external dependencies. The Scrum Guide 2020 states: 'Scrum Teams are cross-functional, meaning the members have all the skills necessary to create value each Sprint.' This does not mean every member can do everything — it means the team collectively has all required capabilities.",
    "source": "Scrum Guide 2020 — Scrum Team section",
    "tip": "Cross-functional = team COLLECTIVELY has all skills needed. Not that each person can do everything."
  },
  {
    "id": 451,
    "category": "Cross-functional Teams",
    "difficulty": "Medium",
    "question": "A Scrum Team realizes they lack the security expertise needed to properly address security requirements in the Product Backlog. What is the BEST approach?",
    "options": [
      "Remove security-related items from the Product Backlog until a security expert is hired",
      "Have the Scrum Master coordinate with a separate security team to review work after each Sprint",
      "Grow security skills within the team through training, pairing, or adding a member with security expertise so the team becomes self-sufficient",
      "Ask the Product Owner to accept items without meeting security acceptance criteria until the skill gap is resolved"
    ],
    "correct": 2,
    "explanation": "Cross-functional teams should have all skills needed to deliver value. When a skill gap exists, the best approach is to close it — through training existing members, pairing with experts, bringing in a consultant to upskill the team, or hiring someone with the needed expertise. Routing work to an external team creates dependencies and handoffs (Lean waste), and removing requirements compromises quality.",
    "source": "Scrum Guide 2020 — Cross-functional Teams; PSD Curriculum — Team Skills",
    "tip": "Skill gaps → grow the skill within the team. External dependencies are Lean waste (handoffs)."
  },
  {
    "id": 452,
    "category": "Advanced Scrum",
    "difficulty": "Hard",
    "question": "A team uses Scrum with a Kanban board and wants to use WIP limits. Where should WIP limits be applied for maximum benefit?",
    "options": [
      "Only on the 'In Progress' column to limit concurrent tasks",
      "On each workflow state (column) to expose bottlenecks and improve flow across the entire value stream",
      "On the entire Sprint Backlog to limit total Sprint scope",
      "Only on the 'Done' column to control the rate of completed work"
    ],
    "correct": 1,
    "explanation": "WIP (Work In Progress) limits should be applied to each workflow state (column) in the Kanban board. When a column fills up, it signals a bottleneck that forces the team to swarm and resolve the constraint before pulling more work in. Limiting WIP only on 'In Progress' misses bottlenecks in other states. WIP limits are a key Kanban practice that improves flow, reduces cycle time, and makes system constraints visible.",
    "source": "PSD Curriculum — Kanban Flow Metrics & WIP Limits",
    "tip": "WIP limits per COLUMN expose bottlenecks. A full column = system constraint. Stop starting, start finishing."
  },
  {
    "id": 453,
    "category": "Agile Principles",
    "difficulty": "Medium",
    "question": "Which Lean waste type does 'task switching' (working on multiple items simultaneously) represent?",
    "options": [
      "Partially done work",
      "Extra features",
      "Task switching (motion waste)",
      "Delays"
    ],
    "correct": 2,
    "explanation": "Task switching is explicitly identified as one of the 7 Lean wastes in software (Poppendieck). Every context switch incurs cognitive overhead — research shows it takes 15-20 minutes to regain deep focus after an interruption. In software development, task switching leads to increased cycle time, more defects (from context loss), and reduced throughput. WIP limits and focus on finishing started work are the countermeasures.",
    "source": "PSD Curriculum — Lean Waste Types in Software Development",
    "tip": "Task switching = Lean waste. Context switches kill productivity. Stop starting, start finishing."
  },
  {
    "id": 454,
    "category": "Done & Quality",
    "difficulty": "Hard",
    "question": "An organization's Definition of Done does not include security testing. A Scrum Team wants to add SAST scanning to their Definition of Done. Who has the authority to update the Definition of Done?",
    "options": [
      "Only the Product Owner, since they are accountable for product quality",
      "Only the Scrum Master, since they are accountable for Scrum adoption",
      "The Developers create the Definition of Done if no organizational standard exists; if an organizational standard exists, the team must at minimum comply with it and may add stricter criteria",
      "The organization's quality assurance department, since they own quality standards"
    ],
    "correct": 2,
    "explanation": "Per the Scrum Guide 2020: if the Definition of Done is not an organizational standard, the Scrum Team must create a Definition of Done appropriate for the product. If the organization has a standard, all Scrum Teams must follow it as a minimum. Teams may adopt a stricter Definition of Done than the organizational standard. Adding SAST to the DoD is an excellent quality improvement — the Developers (as part of the Scrum Team) can and should propose and adopt stricter criteria.",
    "source": "Scrum Guide 2020 — Definition of Done section",
    "tip": "No org standard = team creates DoD. Org standard exists = minimum floor, team can be stricter. Developers own DoD."
  },
  {
    "id": 455,
    "category": "DevOps & Engineering",
    "difficulty": "Easy",
    "question": "What is the primary benefit of using automated testing in a CI/CD pipeline?",
    "options": [
      "It eliminates the need for human developers to understand the code being tested",
      "It provides fast, consistent, automated verification of code changes — catching regressions immediately and giving developers confidence to integrate frequently",
      "It replaces manual QA entirely, reducing headcount and cost",
      "It documents the codebase automatically so developers do not need to write comments"
    ],
    "correct": 1,
    "explanation": "Automated tests in CI pipelines provide: fast feedback (minutes vs. days for manual testing), consistency (same tests run the same way every time), confidence to change code (regression safety net), early defect detection (cheaper to fix), and unblocked frequent integration. Without automation, CI becomes impractical — manual testing can't keep up with dozens of daily commits. Automation is the technical enabler that makes Continuous Integration genuinely continuous.",
    "tip": "Automated tests in CI = fast + consistent + safe to change; enables truly continuous integration",
    "source": "PSD I Study Guide"
  },
  {
    "id": 456,
    "category": "Scrum Master",
    "difficulty": "Medium",
    "question": "How should a Scrum Master handle a situation where two Developers have a persistent conflict that is affecting team collaboration?",
    "options": [
      "Ignore the conflict since Developers should resolve interpersonal issues themselves",
      "Escalate immediately to HR and management to formally document the conflict",
      "Facilitate a private conversation between the two Developers, coach them on effective communication, and if needed facilitate a structured conflict resolution session — treating the conflict as an impediment to the team's effectiveness",
      "Reassign one of the Developers to a different Scrum Team to resolve the tension"
    ],
    "correct": 2,
    "explanation": "Interpersonal conflict is a legitimate impediment the Scrum Master should help resolve. The SM should first facilitate a private, structured conversation using techniques like non-violent communication (NVC) or active listening. If that doesn't work, a facilitated three-way discussion with clear ground rules may help. The goal is resolution that preserves the team's self-management and collaborative culture. Escalating to HR immediately or reassigning people are last resorts that signal the SM failed to resolve the conflict through coaching.",
    "tip": "Conflict = impediment; SM facilitates resolution through coaching + structured conversation",
    "source": "PSD I Study Guide"
  },
  {
    "id": 457,
    "category": "Agile Principles",
    "difficulty": "Hard",
    "question": "How does the Agile principle of 'simplicity — the art of maximizing the amount of work not done — is essential' apply to software architecture decisions?",
    "options": [
      "Teams should write as few lines of code as possible regardless of code quality",
      "Architecture decisions should favor the simplest design that meets current needs (YAGNI, KISS), avoiding over-engineering features or abstractions for hypothetical future requirements that may never materialize",
      "Teams should never document architecture since documentation is unnecessary work",
      "The principle means teams should deliver fewer features per Sprint to reduce complexity"
    ],
    "correct": 1,
    "explanation": "YAGNI (You Aren't Gonna Need It) and KISS (Keep It Simple, Stupid) are the engineering embodiment of this Agile principle. Over-engineering — building complex abstractions, frameworks, and extensibility for hypothetical future needs — is wasted work. Every unnecessary abstraction adds complexity that must be maintained, understood, and navigated. The discipline of building the simplest thing that works, then refactoring as needs evolve, produces cleaner code than upfront speculation about future requirements.",
    "tip": "YAGNI + KISS = maximize work not done; build simplest thing now, refactor when needed",
    "source": "Agile Manifesto"
  },
  {
    "id": 458,
    "category": "Testing & Quality",
    "difficulty": "Hard",
    "question": "What is property-based testing and how does it differ from example-based testing?",
    "options": [
      "Property-based testing tests the properties (fields) of objects; example-based testing tests methods",
      "Property-based testing defines properties (invariants) that should hold for all valid inputs, then automatically generates hundreds of test cases to find counterexamples — catching edge cases that humans rarely think to test explicitly",
      "Property testing uses real production data; example-based testing uses synthetic test data",
      "They are the same approach with different names used in functional vs. object-oriented languages"
    ],
    "correct": 1,
    "explanation": "Example-based testing (standard unit tests) verify specific inputs produce expected outputs. Property-based testing (e.g., QuickCheck, Hypothesis) specifies invariants: 'For any valid list, sorting and reversing should produce the same result as reversing and sorting.' The framework then generates hundreds of random inputs to find counterexamples. This uncovers edge cases — boundary conditions, empty collections, special characters, extreme values — that developers wouldn't think to test manually. It's particularly powerful for pure functions and data transformation code.",
    "tip": "Property-based = define invariants, auto-generate test cases; finds edge cases humans miss",
    "source": "PSD I Study Guide"
  },
  {
    "id": 459,
    "category": "Cross-functional Teams",
    "difficulty": "Easy",
    "question": "According to the Scrum Guide 2020, can a Scrum Team member have a title or specialized role within the team (e.g., 'Senior Backend Developer')?",
    "options": [
      "No, all team members are simply called 'Developers' with no distinction or title",
      "Yes, Developers may have specialized skills and focus areas, but within the Scrum Team there is no hierarchy — no sub-teams or titles that create divisions",
      "Yes, and specialized roles are encouraged to enable efficient task assignment in Sprint Planning",
      "Only the Scrum Master and Product Owner have titles; all others are generic Developers"
    ],
    "correct": 1,
    "explanation": "The Scrum Guide 2020 states: 'Within a Scrum Team, there are no sub-teams or hierarchies. It is a cohesive unit of professionals focused on one objective at a time, the Product Goal.' In practice, people certainly have different skills and job titles (iOS Developer, DevOps Engineer), but within the Scrum Team, these don't create formal divisions or hierarchies. Everyone is a 'Developer' contributing to the product, and the team collectively owns the work.",
    "tip": "No sub-teams or hierarchies within Scrum Team; job titles exist but don't create divisions",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 460,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "What is GitOps and how does it apply DevOps principles to infrastructure management?",
    "options": [
      "A GitHub-specific workflow that uses pull requests for all code reviews",
      "A practice where Git is the single source of truth for both application code and infrastructure configuration, with automated systems reconciling the actual state of environments to the desired state declared in Git",
      "A CI/CD tool that automatically resolves Git merge conflicts using machine learning",
      "A branching strategy that requires all infrastructure changes to be made on separate Git branches"
    ],
    "correct": 1,
    "explanation": "GitOps treats Git as the single source of truth for declarative infrastructure and application configuration. Operators commit changes to Git; automated reconciliation systems (like Argo CD, Flux) continuously compare the desired state (Git) with actual state (cluster/environment) and automatically apply differences. Benefits: full audit trail of all changes, ability to roll back infrastructure by reverting Git commits, pull-request-based peer review for infrastructure changes, and consistent, reproducible environments. It extends DevOps principles (version control, review, automation) to infrastructure management.",
    "tip": "GitOps = Git as source of truth for infra; auto-reconcile desired (Git) -> actual (environment)",
    "source": "PSD I Study Guide"
  },
  {
    "id": 461,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "A Scrum Team's stakeholders want a detailed feature roadmap with specific delivery dates six months out. How should this request be handled?",
    "options": [
      "Provide a detailed roadmap with exact dates since stakeholders need this for business planning",
      "Refuse entirely — Scrum does not support long-term planning or roadmaps",
      "Collaborate with the Product Owner to provide a transparent forecast using historical velocity and the Product Backlog, communicating the inherent uncertainty and offering probability ranges rather than fixed dates",
      "Have management create the roadmap since it's a business planning activity, not a Scrum activity"
    ],
    "correct": 2,
    "explanation": "Scrum supports empirical forecasting, not promise-based scheduling. Using historical team velocity and Product Backlog ordering, the team can provide a probabilistic forecast (e.g., 'Based on current velocity, there's ~80% confidence we'll complete these features by Q3'). This is honest transparency about uncertainty. The Product Owner should communicate the Scrum's empirical nature to stakeholders, explain that the forecast becomes more accurate over time, and commit to updating it regularly as learning occurs.",
    "tip": "Roadmap = probabilistic forecast based on velocity + backlog; communicate uncertainty honestly",
    "source": "PSD I Study Guide"
  },
  {
    "id": 462,
    "category": "Backlog Management",
    "difficulty": "Medium",
    "question": "What is 'Definition of Ready' and what are its risks?",
    "options": [
      "A formal Scrum artifact equivalent in importance to the Definition of Done",
      "An informal checklist teams use to determine if a PBI is sufficiently refined for Sprint Planning; risk is it becomes a rigid gate that blocks flow, creates handoff mentality, and slows value delivery",
      "The criteria the Product Owner uses to accept items from stakeholders into the Product Backlog",
      "A Scrum Master responsibility to verify team readiness before each Sprint"
    ],
    "correct": 1,
    "explanation": "The Definition of Ready is not mentioned in the Scrum Guide 2020 — it's an optional team practice, not a Scrum rule. When used well, it helps teams have productive Sprint Planning by ensuring items are refined enough. The risks: it can become a bureaucratic gate that prevents important work from entering Sprints until 'ready' (even if the team could refine during the Sprint), it can create a 'pre-sprint sprint' refinement ceremony, and it can foster a handoff mentality where PO 'throws items over the wall.' Use thoughtfully if at all.",
    "tip": "Definition of Ready = not in Scrum Guide; useful but risks becoming a flow-blocking gate",
    "source": "PSD I Study Guide"
  },
  {
    "id": 463,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What is the difference between black-box and white-box testing?",
    "options": [
      "Black-box testing uses dark themes in the IDE; white-box testing uses light themes",
      "Black-box testing tests from the external perspective without knowledge of internal implementation; white-box testing uses knowledge of internal code structure to guide test design",
      "Black-box testing is performed by QA teams; white-box testing is performed by developers",
      "Black-box tests run in isolated environments; white-box tests run against live production systems"
    ],
    "correct": 1,
    "explanation": "Black-box testing (also called specification-based or behavioral testing) treats the system as an opaque box — testers verify outputs for given inputs without knowing internal implementation. It aligns with user/business requirements. White-box testing (structural testing) uses knowledge of the internal code structure to design tests — for example, ensuring all branches of a conditional are covered. Both approaches are valuable: black-box catches functional gaps; white-box catches implementation-level bugs and ensures thorough code path coverage.",
    "tip": "Black-box = what it does (external view); White-box = how it does it (internal view)",
    "source": "PSD I Study Guide"
  },
  {
    "id": 464,
    "category": "Sprint Events",
    "difficulty": "Easy",
    "question": "What is the timebox for the Sprint Retrospective for a one-month Sprint?",
    "options": [
      "1 hour maximum",
      "2 hours maximum",
      "3 hours maximum",
      "As long as needed to complete all improvement items"
    ],
    "correct": 2,
    "explanation": "The Sprint Retrospective is timeboxed to 3 hours maximum for a one-month Sprint, proportionally shorter for shorter Sprints (e.g., 1.5 hours for a 2-week Sprint). It is the last event of the Sprint. The Retrospective should be long enough for meaningful reflection and identification of improvements but timeboxed to maintain focus. A well-facilitated Retrospective can accomplish its purpose well within the timebox.",
    "tip": "Retrospective timebox: 3h max / month; pro-rate for shorter Sprints (1.5h for 2-week)",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 465,
    "category": "Advanced Scrum",
    "difficulty": "Hard",
    "question": "What is the 'Last Responsible Moment' (LRM) principle, and how does it apply to architectural decisions in Scrum?",
    "options": [
      "The last moment before the end of a Sprint when decisions can be made without affecting Sprint delivery",
      "The principle of delaying decisions until the point where delaying further would cause harm — maximizing options and learning before committing, enabling better-informed decisions based on actual discovery rather than speculation",
      "The last Sprint in a release where architectural refactoring can occur before deployment",
      "A risk management technique identifying the latest safe date to begin contingency planning"
    ],
    "correct": 1,
    "explanation": "LRM, from lean software development (Poppendieck), says decisions should be made when you have the most information — but not so late that inaction itself becomes harmful. Applied to architecture: don't commit to a database choice in Sprint 1 if you can delay that decision until Sprint 4 when you understand data access patterns better. Make reversible decisions early if needed; delay irreversible ones. This pairs with emergent architecture and prevents costly early commitments to assumptions that prove wrong.",
    "tip": "LRM = delay decision until max info + before inaction causes harm; preserves options",
    "source": "PSD I Study Guide"
  },
  {
    "id": 466,
    "category": "Scrum Master",
    "difficulty": "Easy",
    "question": "The Scrum Master is not the 'boss' of the Scrum Team. Which statement best describes the Scrum Master's authority?",
    "options": [
      "The Scrum Master has full authority over process decisions but no authority over product decisions",
      "The Scrum Master has no formal authority; they lead through influence, facilitation, coaching, and expertise in Scrum",
      "The Scrum Master has authority over all team members except the Product Owner",
      "The Scrum Master has authority granted by upper management to enforce Scrum compliance"
    ],
    "correct": 1,
    "explanation": "The Scrum Master has no positional authority over team members. Unlike a traditional manager, they cannot assign work, override technical decisions, or evaluate performance. Their effectiveness comes from: deep Scrum expertise, facilitation skills, coaching ability, organizational influence, and trust built through serving the team. This servant leadership model is intentional — it supports self-management. A Scrum Master who tries to lead through authority will undermine the very self-management they should be cultivating.",
    "tip": "SM authority = zero positional; leads through expertise, coaching, facilitation, and influence",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 467,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What is 'shift right' testing and how does it complement 'shift left' testing?",
    "options": [
      "Moving all testing to later in the project when requirements are fully understood",
      "Testing in production environments using real users and real data — through techniques like A/B testing, feature flags, canary releases, and production monitoring — to learn things impossible to discover in pre-production",
      "Deferring test automation to the right side of the team board (post-Sprint)",
      "A regression testing approach that validates right-to-left language support"
    ],
    "correct": 1,
    "explanation": "Shift right testing validates behavior in production with real users and real data. Pre-production environments can never fully replicate production scale, data variety, user behavior, and infrastructure complexity. Shift right techniques: A/B testing (compare feature variants), canary deployments (monitor real traffic on new versions), feature flags (gradually expose features), chaos engineering (test resilience with real load), and production monitoring/alerting. Together, shift left (test early) and shift right (test in production) provide comprehensive quality assurance.",
    "tip": "Shift right = test in production with real users; complements shift left; A/B + canary + monitoring",
    "source": "PSD I Study Guide"
  },
  {
    "id": 468,
    "category": "Scrum Framework",
    "difficulty": "Easy",
    "question": "What is the purpose of the Scrum Guide's five Scrum events?",
    "options": [
      "They are mandatory ceremonies that must be completed for regulatory compliance",
      "Each event is an opportunity for inspection and adaptation of either the product or the team's processes",
      "They provide status checkpoints for management to monitor team progress",
      "They are time management tools that structure the team's work schedule"
    ],
    "correct": 1,
    "explanation": "The Scrum Guide 2020 states that events are used to create regularity and minimize the need for other meetings. Each event enables inspection and adaptation: Sprint Planning (inspect Product Backlog, adapt Sprint plan), Daily Scrum (inspect Sprint progress, adapt daily plan), Sprint Review (inspect Increment, adapt Product Backlog), Sprint Retrospective (inspect team process, adapt ways of working). The Sprint itself is a container for all other events. All events are opportunities for the three pillars of empiricism.",
    "tip": "All 5 Scrum events = inspect + adapt; they embody the three empirical pillars",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 469,
    "category": "Cross-functional Teams",
    "difficulty": "Medium",
    "question": "What is 'collective code ownership' and why is it important for Scrum Teams?",
    "options": [
      "A legal arrangement where the company owns all code and developers have no individual rights",
      "A practice where any team member can modify any part of the codebase, supported by automated tests, shared standards, and collaborative culture — preventing knowledge silos and single points of failure",
      "A code review process where the entire team must approve every change",
      "An open-source model where code is publicly available for community contribution"
    ],
    "correct": 1,
    "explanation": "Collective code ownership (XP practice) means no individual 'owns' a section of code — any developer can modify any part of the codebase. This is enabled by: automated test suites (confidence to change), coding standards (everyone can read anyone's code), pair programming (knowledge transfer), and team culture. Benefits: eliminates 'hero' bottlenecks (waiting for one person), spreads architectural knowledge, enables flexible task assignment, and reduces bus factor. Combined with self-managing teams, it supports Scrum's collaborative nature.",
    "tip": "Collective ownership = anyone can change anything; enabled by tests + standards + pairing",
    "source": "PSD I Study Guide"
  },
  {
    "id": 470,
    "category": "Backlog Management",
    "difficulty": "Hard",
    "question": "What is the 'INVEST' criteria for well-written user stories?",
    "options": [
      "Important, Negotiable, Vertical, Estimable, Small, Testable",
      "Independent, Negotiable, Valuable, Estimable, Small, Testable",
      "Incremental, Necessary, Verifiable, Executable, Scoped, Timely",
      "Integrated, Novel, Validated, Efficient, Scalable, Transparent"
    ],
    "correct": 1,
    "explanation": "INVEST (Bill Wake) describes characteristics of good user stories: Independent (stories can be developed in any order, minimal dependencies), Negotiable (details are discussed, not fixed contracts), Valuable (delivers value to users or business), Estimable (team can size it), Small (fits in a Sprint), Testable (has clear acceptance criteria). INVEST is a quality checklist for Product Backlog items. Stories failing INVEST criteria should be refined before Sprint Planning — splitting large stories, clarifying vague ones, breaking dependencies.",
    "tip": "INVEST = Independent, Negotiable, Valuable, Estimable, Small, Testable; story quality checklist",
    "source": "PSD I Study Guide"
  },
  {
    "id": 471,
    "category": "Done & Quality",
    "difficulty": "Hard",
    "question": "A team wants to add 'all code is pair programmed' to their Definition of Done. What considerations should guide this decision?",
    "options": [
      "This is inappropriate; the DoD should only contain testing and documentation criteria",
      "The team should consider: does this reflect a genuinely desired quality standard, can the team consistently meet this for all items every Sprint, does it improve the actual quality of the Increment, and is the team genuinely committed to it versus feeling pressured",
      "The Scrum Master must approve all changes to the Definition of Done",
      "DoD criteria must be measurable with automated tools; pair programming cannot be verified automatically"
    ],
    "correct": 1,
    "explanation": "The DoD can include any criteria the team believes represents a truly Done, high-quality Increment. Pair programming as a DoD item is legitimate if: the team genuinely believes it improves quality and knowledge sharing, they can consistently meet it without forcing corner-cutting near Sprint end, and it reflects their collective professional standard. The risk: if the team can't consistently pair on everything, they'll either cut corners or feel constant pressure. The DoD should represent achievable excellence, not aspirational perfection that's regularly not met.",
    "tip": "DoD items = achievable quality standards; pair programming DoD valid if team can consistently meet it",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 472,
    "category": "Testing & Quality",
    "difficulty": "Hard",
    "question": "What is test-driven development's effect on software design, and why do practitioners call TDD a 'design practice' rather than just a testing practice?",
    "options": [
      "TDD has no effect on design; it only adds a safety net through tests",
      "TDD forces code to be testable, which inherently requires well-separated concerns, loose coupling, and single responsibility — making testability a proxy for good design; the tests drive design decisions rather than just verifying them",
      "TDD is called a design practice because tests serve as living design documentation",
      "TDD affects only database design by requiring schema to be defined before coding begins"
    ],
    "correct": 1,
    "explanation": "TDD's profound insight is that testability is a design quality metric. Code that is hard to test is usually hard to maintain — tightly coupled, has many dependencies, violates single responsibility. When developers write tests first, they must make code testable: inject dependencies (enabling mocking), keep functions focused (easier to test in isolation), avoid global state, and use clear interfaces. These same properties — low coupling, high cohesion, single responsibility — are hallmarks of good OO design. TDD makes good design the path of least resistance.",
    "tip": "TDD = design practice; testability forces low coupling + SRP + dependency injection = good design",
    "source": "PSD I Study Guide"
  },
  {
    "id": 473,
    "category": "Agile Principles",
    "difficulty": "Medium",
    "question": "The Agile Manifesto says 'Welcome changing requirements, even late in development.' How does this apply to a Scrum Team mid-Sprint?",
    "options": [
      "The team must accept any requirement change at any time during the Sprint, including mid-Sprint",
      "Changes are only welcomed between Sprints; mid-Sprint changes should always be rejected",
      "The Sprint Goal provides stability for the Sprint; scope changes that don't threaten the Sprint Goal can be negotiated with the Product Owner, while Sprint-Goal-threatening changes may warrant Sprint cancellation",
      "The Scrum Master decides which mid-Sprint changes are acceptable based on team capacity"
    ],
    "correct": 2,
    "explanation": "Welcoming change doesn't mean accepting disruption. Scrum's Sprint structure provides a short, stable planning horizon that protects the team from constant interruption while enabling regular adaptation. The Sprint Goal is the stability mechanism — the team commits to achieving it, and scope can flex around it. Minor scope changes that don't compromise the Sprint Goal can be negotiated. Major business priority changes that make the Sprint Goal obsolete are the only justification for Sprint cancellation. Change is welcomed at the right cadence: Sprint boundaries.",
    "tip": "Change welcome at Sprint boundaries; Sprint Goal provides mid-Sprint stability; scope can flex around Goal",
    "source": "Agile Manifesto"
  },
  {
    "id": 474,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What is 'immutable infrastructure' and what problem does it solve?",
    "options": [
      "Infrastructure that cannot be modified after procurement, reducing costs through standardization",
      "A practice where servers are never modified in place; instead, new server images are created with changes and existing servers are replaced — eliminating configuration drift and making deployments reliable and reversible",
      "A security model where infrastructure configuration is locked and requires special authorization to modify",
      "Infrastructure that uses immutable data structures to prevent race conditions in distributed systems"
    ],
    "correct": 1,
    "explanation": "Immutable infrastructure means servers are never patched or modified after deployment. Instead, to make a change: create a new server image with the change, test it, deploy new instances, and terminate old ones. This eliminates 'configuration drift' — the phenomenon where servers diverge from their intended state through manual changes over time. Benefits: perfectly reproducible environments, no 'snowflake servers,' easy rollback (deploy previous image), and consistent behavior across environments. Tools: Docker, Packer, Terraform enable this pattern.",
    "tip": "Immutable infra = never modify servers; replace entirely; eliminates configuration drift",
    "source": "PSD I Study Guide"
  },
  {
    "id": 475,
    "category": "Scrum Master",
    "difficulty": "Hard",
    "question": "An organization is adopting Scrum for the first time. After three Sprints, management is frustrated because velocity is low and the team is spending a lot of time in ceremonies. What should the Scrum Master do?",
    "options": [
      "Reduce the number of Scrum events to decrease overhead and improve velocity",
      "Explain that Scrum adoption always decreases velocity initially and teams should be patient",
      "Inspect whether the team is experiencing the normal adoption learning curve versus genuine problems; educate management on the J-curve effect of new practice adoption, while also genuinely examining whether events are being run effectively and if the team has the right skills",
      "Recommend abandoning Scrum since the organization is not ready for it"
    ],
    "correct": 2,
    "explanation": "Initial Scrum adoption often follows a J-curve: velocity dips before improving as teams learn new practices. However, the Scrum Master should not just cite this as an excuse — they should genuinely inspect: Are events run effectively (is the Daily Scrum actually 15 minutes and useful)? Are there skill gaps causing slowdowns? Are there organizational impediments? Management education is key: measure value delivered, not just velocity; show the investment is building capability. Three Sprints is very early in adoption — patterns, not single Sprint data, should guide conclusions.",
    "tip": "Early adoption dip = J-curve; educate management + inspect genuine problems; measure value not just velocity",
    "source": "PSD I Study Guide"
  },
  {
    "id": 476,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What is exploratory testing and when should it be used in a Scrum context?",
    "options": [
      "Testing without any prior planning or documentation, done only when there is no time for structured testing",
      "A simultaneous learning, test design, and execution approach where the tester actively explores the system, using their creativity and domain knowledge to find unexpected issues that scripted tests miss",
      "A technique for discovering undocumented features that developers added without Product Owner approval",
      "A performance testing approach that explores system behavior under unknown load conditions"
    ],
    "correct": 1,
    "explanation": "Exploratory testing (ET) is skilled, simultaneous learning and testing where the tester interacts with the system, following hunches and designing tests in real time. Unlike scripted testing, ET leverages tester creativity and domain knowledge to find bugs that pre-specified tests never cover — usability issues, unexpected interactions, edge cases, and business logic flaws. In Scrum, ET complements automated regression testing: automation covers known scenarios; ET discovers unknown problems. It's especially valuable near Sprint end when Developers explore the Sprint's completed work.",
    "tip": "Exploratory testing = simultaneous learning + test design + execution; finds what scripts miss",
    "source": "PSD I Study Guide"
  },
  {
    "id": 477,
    "category": "Advanced Scrum",
    "difficulty": "Hard",
    "question": "What is the difference between velocity and throughput, and which is more useful for forecasting?",
    "options": [
      "They are identical metrics; velocity is the Scrum term and throughput is the Kanban term",
      "Velocity measures story points completed per Sprint; throughput measures the number of items completed per time period. Throughput is often more stable and less influenced by estimation inconsistency, making it useful for flow-based forecasting with Monte Carlo simulation",
      "Velocity is used for short-term planning; throughput is used for annual capacity planning",
      "Velocity measures team speed; throughput measures product quality output"
    ],
    "correct": 1,
    "explanation": "Velocity (story points per Sprint) has limitations: point values vary over time, teams can manipulate points, and it's abstract. Throughput (number of items completed per Sprint/week) is concrete and less gameable. For forecasting, Monte Carlo simulation using historical throughput distribution provides probabilistic forecasts (e.g., '85% confidence to complete 20 items in 4 Sprints'). This is more statistically rigorous than using average velocity. Neither is perfect — both depend on consistent item sizing and stable team composition.",
    "tip": "Throughput = items/time (concrete); Velocity = points/Sprint (abstract); Monte Carlo + throughput = better forecasts",
    "source": "PSD I Study Guide"
  },
  {
    "id": 478,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "Can a Scrum Team work on multiple Products simultaneously?",
    "options": [
      "Yes, Scrum Teams commonly manage several products to maximize resource utilization",
      "No, each Scrum Team has one Product Owner and one Product Backlog — this focus is essential to delivering value; working on multiple products fragments focus and reduces effectiveness",
      "Yes, but only if the Scrum Master approves the additional work",
      "It depends on team capacity; teams can take on a second product if they have remaining Sprint capacity"
    ],
    "correct": 1,
    "explanation": "The Scrum Guide 2020 states each Scrum Team has one Product Owner and one Product Backlog. A Scrum Team focused on one product has a single Sprint Goal, coherent direction, and can build deep domain expertise. Managing multiple products would require multiple Sprint Goals, fragmented focus, competing priorities, and context switching — all of which reduce effectiveness. If an organization has multiple products, each should have its own Scrum Team (though team members may overlap in small organizations, ideally they don't).",
    "tip": "One Scrum Team = one Product Backlog + one Product Goal; focused teams deliver more value",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 479,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "What is the concept of 'mean time to recovery' (MTTR) versus 'mean time between failures' (MTBF), and which should DevOps teams optimize?",
    "options": [
      "Both are equally important; teams should optimize MTBF first and then MTTR",
      "MTBF measures how often failures occur; MTTR measures how quickly recovery happens. DevOps teams should primarily optimize MTTR because in complex systems, failures are inevitable — the ability to recover quickly matters more than preventing every failure",
      "MTBF is the only metric that matters; if failures don't occur, MTTR is irrelevant",
      "MTTR is relevant only for hardware failures; software teams should focus exclusively on MTBF"
    ],
    "correct": 1,
    "explanation": "MTBF (Mean Time Between Failures) = average time between incidents. MTTR (Mean Time to Recovery) = average time to restore service after failure. In complex systems (highly distributed, many dependencies), MTBF improvement becomes exponentially harder and costly. MTTR optimization through: automated monitoring and alerting, feature flags for quick rollback, deployment pipelines for fast hotfixes, runbooks, and on-call practices, provides more practical resilience. High-performing DevOps teams accept failures will happen and invest in rapid recovery rather than perfect uptime prevention.",
    "tip": "MTTR > MTBF focus; failures are inevitable in complex systems; optimize how fast you recover",
    "source": "PSD I Study Guide"
  },
  {
    "id": 480,
    "category": "Sprint Events",
    "difficulty": "Hard",
    "question": "A Sprint Review is attended by only the Scrum Team — no stakeholders are present. What should happen and what does this signal?",
    "options": [
      "This is acceptable; the Sprint Review is primarily an internal Scrum Team event",
      "The Scrum Master should cancel the Sprint Review and reschedule when stakeholders are available",
      "The Sprint Review should proceed since the Scrum Team can still inspect the Increment, but the absence of stakeholders signals a systemic problem — lack of engagement may indicate low product value, poor communication, or organizational issues requiring the Scrum Master and PO to investigate",
      "The Sprint Review should be replaced with a written report sent to stakeholders"
    ],
    "correct": 2,
    "explanation": "The Sprint Review can technically proceed with just the Scrum Team — they can still inspect the Increment and discuss the Product Backlog. However, the Scrum Guide emphasizes stakeholder collaboration in the Sprint Review. Persistent stakeholder absence is a serious signal: Is the product not valuable to them? Have they not been informed? Are they disengaged from the process? Is the Sprint Review too technical or too presentation-focused? The Scrum Master and Product Owner should investigate root causes and take corrective action to restore meaningful stakeholder engagement.",
    "tip": "Stakeholder absence = proceed but investigate root cause; Sprint Review without stakeholders loses its purpose",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 481,
    "category": "Agile Principles",
    "difficulty": "Hard",
    "question": "How does lean thinking's concept of 'flow' relate to a Scrum Team's Sprint workflow?",
    "options": [
      "Flow means team members should always be 100% utilized with no idle time",
      "Flow means work items should move smoothly through the development process with minimal waiting, queuing, and work-in-progress; Scrum Teams optimize flow by limiting WIP, reducing batch sizes, and eliminating bottlenecks",
      "Flow is a psychological state of optimal performance that Scrum Teams should strive for individually",
      "Flow refers to the fluid communication style encouraged by Scrum's collaborative events"
    ],
    "correct": 1,
    "explanation": "Lean thinking defines flow as the smooth movement of value-creating work through the system with minimal waste (waiting, queuing, rework, handoffs). For Scrum Teams, flow optimization means: limiting WIP (too many in-progress items creates queuing), small batch sizes (smaller PBIs complete faster), reducing handoffs (cross-functional teams work together rather than throwing work over walls), eliminating blockers quickly (Daily Scrum surfaces impediments), and visualizing work (task boards show flow). The Sprint itself is a lean cadence — a regular delivery rhythm that creates flow predictability.",
    "tip": "Flow = work moves smoothly; limit WIP + small batches + remove blockers + eliminate handoffs",
    "source": "Agile Manifesto"
  },
  {
    "id": 482,
    "category": "Cross-functional Teams",
    "difficulty": "Hard",
    "question": "A Scrum Team wants to improve collaboration but its members are distributed across multiple time zones (e.g., UTC, EST, and PST). What engineering and process practices support effective distributed Scrum?",
    "options": [
      "Distributed teams cannot effectively practice Scrum; teams should be co-located",
      "Use asynchronous communication for everything to accommodate all time zones",
      "Find sufficient overlap hours for synchronous events (Daily Scrum, Sprint Planning), invest in strong async communication tools (shared docs, detailed PR descriptions, recorded demos), establish clear team working agreements, and leverage collaboration tools to maintain shared context and transparency",
      "Rotate the Scrum Master role to each time zone to ensure all members feel represented"
    ],
    "correct": 2,
    "explanation": "Distributed Scrum is challenging but viable with the right practices: 1) Find minimal overlap hours for essential synchronous events, 2) Async collaboration tools (Confluence, Notion, async video) for cross-timezone knowledge sharing, 3) Detailed PR descriptions and commit messages (code review across time zones), 4) Recorded Sprint Reviews for missed stakeholders, 5) Working agreements about response time expectations and availability, 6) Strong digital task boards for shared Sprint visibility, 7) Investment in relationship building during any co-location opportunities. Asynchronous-only is insufficient for Scrum's collaborative nature.",
    "tip": "Distributed Scrum = overlap for key events + strong async tools + clear working agreements",
    "source": "PSD I Study Guide"
  },
  {
    "id": 483,
    "category": "Scrum Master",
    "difficulty": "Medium",
    "question": "A Scrum Team is consistently completing Sprint Goals but never improving their engineering practices despite discussing it in Retrospectives. What pattern does this represent and how should the Scrum Master address it?",
    "options": [
      "This is ideal — Sprint Goal achievement is the primary success measure for Scrum Teams",
      "This represents 'improvement theater' — identifying improvements but not implementing them; the Scrum Master should help the team commit to specific, actionable improvement items added to the Sprint Backlog, then hold the team accountable to completing them",
      "The Scrum Master should mandate specific engineering practices the team must adopt",
      "This pattern shows the team is appropriately focused on delivery rather than process improvement"
    ],
    "correct": 1,
    "explanation": "'Improvement theater' happens when teams discuss improvements in Retrospectives but never actually implement them. This degrades trust in the Retrospective as a useful event. The Scrum Master should facilitate the team to: select one high-priority improvement (not three), create a concrete Sprint Backlog task for it, assign it (or have someone volunteer), and review it in the next Retrospective. Small, completed improvements build a culture of continuous improvement. The Sprint Retrospective's output should include actionable items in the next Sprint Backlog.",
    "tip": "Improvement theater = discussing but not doing; one concrete improvement per Sprint in backlog",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 484,
    "category": "Advanced Scrum",
    "difficulty": "Hard",
    "question": "What does the Scrum Guide 2020 mean when it says 'The Scrum Team is responsible for all product-related activities from stakeholder collaboration, verification, maintenance, operation, experimentation, research and development, and anything else that might be required'?",
    "options": [
      "The Scrum Team must perform all technical operations including server maintenance and customer support",
      "This statement reflects a DevOps mindset — the team owns the full product lifecycle end-to-end, including deployment, operations, and monitoring, rather than throwing features over the wall to separate ops, QA, or support teams",
      "The Scrum Team is accountable for business activities like sales and marketing in addition to development",
      "This statement only applies to products in their initial development phase, not mature products in production"
    ],
    "correct": 1,
    "explanation": "The Scrum Guide 2020's expansion of Scrum Team responsibilities to include 'maintenance, operation, experimentation' reflects the 'you build it, you run it' DevOps philosophy. Teams that own the full lifecycle make better decisions: they design for operability (knowing they'll be on call), build observability into features (knowing they'll diagnose production issues), and care about deployment complexity (because they do deployments). This end-to-end ownership eliminates the wall between 'Dev' and 'Ops,' creates accountability, and leads to better-quality products that are actually maintainable in production.",
    "tip": "'You build it, you run it' = full product lifecycle ownership; removes Dev/Ops wall",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 485,
    "category": "Testing & Quality",
    "difficulty": "Medium",
    "question": "What is 'continuous feedback' in the context of Scrum and DevOps?",
    "options": [
      "Providing daily feedback to developers about their individual performance",
      "Establishing short feedback loops at all levels — from automated tests on every commit to user feedback from production — that enable rapid learning and adaptation",
      "Having the Product Owner provide feedback to developers after every task",
      "Conducting weekly feedback sessions between the Scrum Master and each Developer"
    ],
    "correct": 1,
    "explanation": "Continuous feedback means creating short feedback loops at every stage: automated tests catch defects immediately, CI builds signal integration issues, Sprint Reviews gather stakeholder input, and production monitoring reveals real user behavior. Short feedback loops are central to empirical process control.",
    "tip": "Short feedback loops at every level: code, integration, stakeholder, and production.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 486,
    "category": "Scrum Framework",
    "difficulty": "Hard",
    "question": "True or False: The Scrum Guide 2020 removed the concept of 'commitment' from the Scrum framework.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. The 2020 Scrum Guide actually reinforced the concept of commitment by adding explicit commitments to each artifact: the Product Goal (Product Backlog), the Sprint Goal (Sprint Backlog), and the Definition of Done (Increment). These commitments enhance transparency and focus.",
    "tip": "2020 Scrum Guide ADDED commitments to artifacts: Product Goal, Sprint Goal, DoD.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 487,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "What is the concept of 'mean time to restore' (MTTR) and why does it matter?",
    "options": [
      "The average time to complete a Sprint relative to its planned duration",
      "The average time to recover from a production failure, which measures a team's resilience and ability to respond to incidents",
      "The average time to merge a pull request after code review",
      "The time required to restore a database backup after data loss"
    ],
    "correct": 1,
    "explanation": "Mean Time to Restore (MTTR) measures how quickly a team can recover from a production failure. Low MTTR indicates good observability, automated deployment/rollback capabilities, and an effective incident response process. Teams that deploy frequently and can recover quickly have lower deployment risk.",
    "tip": "Low MTTR = fast recovery from failures; enables more frequent, lower-risk deployments.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 488,
    "category": "Agile Principles",
    "difficulty": "Hard",
    "question": "How do the Agile values relate to the Scrum values?",
    "options": [
      "They are identical — Scrum copied the Agile values directly",
      "Scrum's values (Commitment, Focus, Openness, Respect, Courage) complement and reinforce the Agile Manifesto values; when Scrum values are embodied, the Agile values naturally follow",
      "The Agile values are broader and supersede Scrum values when they conflict",
      "Scrum values apply only to the Scrum Team; Agile values apply to the entire organization"
    ],
    "correct": 1,
    "explanation": "Scrum's five values (Commitment, Focus, Openness, Respect, Courage) complement the Agile Manifesto's four values. When Scrum Team members embody Scrum values, they naturally align with Agile principles. The values reinforce each other and together create the foundation for effective empirical work.",
    "tip": "Scrum values + Agile values work together; neither supersedes the other.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 489,
    "category": "Cross-functional Teams",
    "difficulty": "Medium",
    "question": "What does it mean for a Scrum Team to be 'focused'?",
    "options": [
      "Each Developer works exclusively on one task at a time",
      "The team concentrates on the Sprint Goal and the work of the Sprint, avoiding distractions from outside the Sprint scope",
      "The Scrum Master ensures no team member works on more than one project simultaneously",
      "The team focuses on technical excellence above all other concerns"
    ],
    "correct": 1,
    "explanation": "Focus is one of the five Scrum values. In the context of the Scrum Team, focus means concentrating on the Sprint Goal and delivering the Increment. The Sprint provides focus by establishing a clear goal and time-box. This prevents the context-switching and scope creep that reduce effectiveness.",
    "tip": "Scrum value Focus: Sprint Goal + time-box enable concentrated, effective work.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 490,
    "category": "Sprint Events",
    "difficulty": "Medium",
    "question": "During Sprint Planning, the Developers think the Sprint Goal proposed by the Product Owner is unachievable. What should happen?",
    "options": [
      "The Developers must accept the Sprint Goal since the Product Owner has authority over it",
      "The Scrum Master should mediate and impose a compromise Sprint Goal",
      "The Developers and Product Owner negotiate until they agree on a Sprint Goal that is both valuable and achievable given the team's capacity",
      "The Sprint should be skipped until the Product Owner proposes a more realistic goal"
    ],
    "correct": 2,
    "explanation": "Sprint Planning is a collaborative negotiation. The Product Owner proposes a goal and the Developers assess feasibility. If the Developers believe the goal is unachievable, they should negotiate with the Product Owner — adjusting scope, reducing the goal, or extending the timeline understanding of what is needed.",
    "tip": "Sprint Goal = collaborative negotiation; PO proposes value, Developers assess feasibility.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 491,
    "category": "Backlog Management",
    "difficulty": "Hard",
    "question": "What is meant by 'just-in-time' refinement in Scrum?",
    "options": [
      "Refining all Product Backlog items at once at the start of the project",
      "Refining Product Backlog items only when they are likely to be needed soon, avoiding over-investing in items that may never be built",
      "Refining items the day before Sprint Planning begins",
      "Delaying refinement until after the Sprint Review so feedback can be incorporated"
    ],
    "correct": 1,
    "explanation": "Just-in-time refinement means adding detail to Product Backlog items only when they are close to being worked on. Over-refining items far in the future wastes effort because requirements may change before the team gets to them. This lean principle minimizes investment in potentially discarded work.",
    "tip": "Refine just enough, just in time: don't over-invest in items that might never be built.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 492,
    "category": "Advanced Scrum",
    "difficulty": "Hard",
    "question": "What is the 'last responsible moment' principle in Agile decision-making?",
    "options": [
      "Making all decisions before the first Sprint to avoid delays later",
      "Deferring decisions until the last possible moment when you have the most information, without causing irreversible delays",
      "Making decisions as quickly as possible to maintain Sprint velocity",
      "The moment after which the Scrum Master takes over decision-making"
    ],
    "correct": 1,
    "explanation": "The Last Responsible Moment principle from Lean Software Development advocates deferring decisions until you have maximum information, but not so long that delay itself causes harm. This enables better-informed decisions, reduces the cost of change, and avoids over-committing to solutions prematurely.",
    "tip": "Last Responsible Moment: delay decisions until you have enough information, but not too long.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 493,
    "category": "DevOps & Engineering",
    "difficulty": "Medium",
    "question": "What is 'dependency management' and why is it a concern in software development?",
    "options": [
      "Managing the dependencies between Scrum Teams in a scaled environment",
      "Managing third-party libraries, frameworks, and packages that a software project depends on — including versioning, security vulnerabilities, and license compliance",
      "Managing task dependencies within the Sprint Backlog",
      "The process of identifying and resolving blockers between teams"
    ],
    "correct": 1,
    "explanation": "Dependency management tracks the external libraries and packages a project uses. Key concerns include keeping dependencies updated (for security patches), avoiding version conflicts, managing transitive dependencies, checking license compliance, and automated scanning for known vulnerabilities in dependencies.",
    "tip": "Outdated dependencies = security risk + technical debt. Automate dependency scanning in CI.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 494,
    "category": "Scrum Framework",
    "difficulty": "Medium",
    "question": "What is the Scrum Team's obligation when the organization's Definition of Done is less rigorous than what the team believes is necessary for quality?",
    "options": [
      "Follow only the organizational DoD since it is the official standard",
      "Use the organizational DoD as a minimum and expand it to include additional criteria needed for product quality",
      "Negotiate with the organization to adopt the team's preferred standards",
      "The team can choose whichever DoD they prefer"
    ],
    "correct": 1,
    "explanation": "If the organization has a Definition of Done, all Scrum Teams must use it as a minimum. However, teams may adopt a stricter DoD to address the specific quality needs of their product. Teams cannot use a weaker DoD than the organizational standard.",
    "tip": "Org DoD = minimum standard; teams can be STRICTER, never LOOSER.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 495,
    "category": "Testing & Quality",
    "difficulty": "Hard",
    "question": "What is the purpose of 'dead code detection' in software quality tools?",
    "options": [
      "Identifying code that was written by developers who have left the team",
      "Automatically finding code that is never executed in the running application, which is a maintenance liability and source of confusion",
      "Detecting code that will cause a system crash under specific conditions",
      "Finding code that has not been reviewed since the previous Sprint"
    ],
    "correct": 1,
    "explanation": "Dead code is code that is never executed — unreachable code paths, unused variables, deprecated methods never removed, etc. Static analysis tools detect dead code. It should be removed because it adds confusion, maintenance burden, and potential for bugs when someone tries to 'reactivate' it inappropriately.",
    "tip": "Dead code = confusion + maintenance cost. Remove it; version control preserves history.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 496,
    "category": "Scrum Master",
    "difficulty": "Hard",
    "question": "What is 'servant leadership' as practiced by the Scrum Master?",
    "options": [
      "The Scrum Master does whatever the team asks without question",
      "A leadership philosophy where the leader's primary goal is to serve and enable others — removing obstacles, providing support, and empowering the team to achieve their goals",
      "The Scrum Master reports to the team rather than to management",
      "A leadership style where the Scrum Master makes all decisions to serve the team's needs"
    ],
    "correct": 1,
    "explanation": "Servant leadership means the leader's primary purpose is to serve others — removing impediments, enabling self-management, coaching, and creating conditions for the team to succeed. The Scrum Master leads by serving, not by commanding. This is contrasted with the traditional command-and-control leadership style.",
    "tip": "Servant leader: enable, empower, remove obstacles. Lead by serving, not commanding.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 497,
    "category": "Advanced Scrum",
    "difficulty": "Hard",
    "question": "What is the key insight behind the 'cone of uncertainty' in software estimation?",
    "options": [
      "Estimates are always uncertain and should never be trusted",
      "Uncertainty is highest at the start of a project and decreases as more is built and learned, making early estimates much less reliable than later ones",
      "Larger stories have more uncertainty than smaller stories",
      "The further into the future you plan, the more staff you need to reduce uncertainty"
    ],
    "correct": 1,
    "explanation": "The cone of uncertainty shows that early in a project, estimates may vary by a factor of 4x or more. As work progresses and more is learned, estimates become increasingly accurate. This supports Scrum's just-in-time approach — rather than committing to detailed long-range plans, refine estimates as work gets closer.",
    "tip": "Cone of uncertainty: early estimates are unreliable; Scrum's iterative approach compensates.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 498,
    "category": "DevOps & Engineering",
    "difficulty": "Hard",
    "question": "What is 'trunk-based development' and what practices must support it?",
    "options": [
      "A branching strategy where each feature gets a permanent trunk branch",
      "All developers commit directly to the main branch (trunk) multiple times per day, supported by feature toggles, comprehensive automated tests, and a discipline of small incremental changes",
      "A strategy where only the technical lead commits to the main branch",
      "A release strategy where all code is merged to trunk only at the end of a Sprint"
    ],
    "correct": 1,
    "explanation": "Trunk-based development means all developers integrate to the main branch multiple times per day. This requires: feature toggles for incomplete work, comprehensive automated tests for fast feedback, small incremental commits, and strong CI discipline. It maximizes integration frequency and minimizes merge conflicts.",
    "tip": "Trunk-based dev: commit to main frequently + feature toggles + strong CI = maximum integration.",
    "source": "PSD I Study Guide"
  },
  {
    "id": 499,
    "category": "Scrum Framework",
    "difficulty": "Hard",
    "question": "A Scrum Team is asked by management to provide a fixed-price, fixed-scope estimate for a year-long project. How should the Scrum Master respond?",
    "options": [
      "Provide the estimate since management needs it for budgeting",
      "Refuse completely since Scrum does not support fixed-price contracts",
      "Educate management about the cone of uncertainty and propose an alternative: a high-level forecast with confidence intervals, frequent review points, and mechanisms to adjust scope as learning occurs",
      "Provide the estimate but add a 50% buffer to account for uncertainty"
    ],
    "correct": 2,
    "explanation": "Fixed-price, fixed-scope, one-year estimates are fundamentally at odds with empirical process control. The Scrum Master should educate management about estimation uncertainty and propose Agile contracting alternatives: a target price with variable scope, frequent checkpoints, and a mechanism to re-evaluate after each Sprint or release.",
    "tip": "Scrum Master educates on empiricism; propose time-and-materials with Sprint checkpoints or target cost with variable scope.",
    "source": "Scrum Guide 2020"
  },
  {
    "id": 500,
    "category": "Advanced Scrum",
    "difficulty": "Hard",
    "question": "What is the ultimate goal of applying Scrum with all its complementary engineering practices (TDD, CI/CD, refactoring, etc.)?",
    "options": [
      "To maximize developer productivity and team velocity",
      "To pass the PSD certification exam",
      "To enable the Scrum Team to deliver a potentially releasable, high-quality Increment every Sprint sustainably and indefinitely, adapting to change while continuously improving",
      "To eliminate the need for traditional project management"
    ],
    "correct": 2,
    "explanation": "The ultimate goal is sustainable, high-quality delivery every Sprint — not just for a few months but indefinitely. This requires both the Scrum framework (transparency, inspection, adaptation) and engineering excellence (TDD, CI/CD, clean code, refactoring) working together. Neither alone is sufficient.",
    "tip": "The goal: sustainable delivery of value every Sprint, every time, indefinitely.",
    "source": "Scrum Guide 2020"
  }
];
