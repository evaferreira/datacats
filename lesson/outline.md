1
Illustrate how to prepare a legacy codebase for AI-assisted refactoring

Explain the unique challenges of using AI tools with legacy codebases, including limited context windows, undocumented logic, tightly coupled components, and inconsistent coding patterns
Demonstrate how to use AI tools to explore, navigate, and build an understanding of an unfamiliar or legacy codebase before making modifications
Discuss how to scope and prioritize refactoring efforts, including identifying high-impact areas and breaking large refactoring tasks into manageable increments




Module 1 – Preparing a Legacy Codebase for AI-Assisted Refactoring
Clip 1: Understanding Legacy Systems (~6 minutes)
What is legacy code, really? What is the difference between code debt, “old code” and knowledge debt? Let’s understand the causes, consequences and common risks of legacy systems. This includes slower delivery speed, accidental regressions, difficult onboarding, and lower team morale. We will also discuss how AI is not only a speed tool, but also a way to understand systems, reduce uncertainty, and plan safer changes. 
Clip 2:  Exploring the Codebase with AI (~5 minutes)
Navigating unfamiliar codebases with the help of AI. Summarizing modules and dependencies. Auditing for inconsistencies. Fixing documentation gaps. Adding instructions to coding agents (Claude, Cursor, Codex).
Clip 3: Prioritization and Scoping  (~4 minutes)
Once we understand our challenges, it’s time to decide where to start. Not every problem deserves immediate action. Some issues reduce velocity daily, while others can be deferred safely. We will use the 2x2 framework to analyze Business Criticality against Change Pain. This framework helps us identify quick wins, high-risk bottlenecks, and areas that should be deferred.

                                                                              CHANGE PAIN
                                                                    Low                            High
HIGH Business Criticality                [A] Optimize          [B] Top Priority
LOW Business Criticality                 [C] Ignore               [D] Contain
Clip 4: Planning Safe Incremental Refactors  (~6 minutes)
We now know what we want to do and in which order. It’s time to break down these large efforts into smaller pieces by building refactor plans. Part of the refactor plans will include identifying areas with low or missing coverage. We will use coding agents to identify this and to help us generate the initial unit tests to reduce the risk of regressions.
Demo throughout the module:
For this module we will use a React frontend application as an example, in which we will plan how to remove old Bootstrap components in favor of the company’s internal design system.
2
Demonstrate how to apply AI-assisted techniques for improving and modernizing legacy code


Demonstrate using AI tools to refactor code for improved readability and maintainability, including renaming, restructuring, and enhancing documentation
Demonstrate using AI tools to apply design principles such as modularity, separation of concerns, and common design patterns to improve code structure
Demonstrate using AI tools to optimize code for performance, including identifying inefficiencies and suggesting more effective implementations
Demonstrate using AI tools for modernization tasks such as language migration, framework upgrades, and dependency updates




Module 2 – Improving and Modernizing Legacy Code with AI
Clip 1: Auditing Code Quality   (~4 minutes)
Before large migrations, many systems benefit from smaller improvements that make future work easier. We will work through a code audit to improve the quality of our codebase. We will search for inconsistencies, WET patterns, oversized files, unclear naming, and outdated coding patterns.
                Demo idea: Audit old React class components to identify candidates for migration to functional components.
Clip 2: Improving Maintainability   (~5 minutes)
Once we have an audit of our current codebase, we will create a plan, iterate on it, and then execute it incrementally. The goal will be to improve readability, naming conventions and to remove code duplication so we can follow the DRY coding pattern.
Demo idea: Continue the migration of old React class components to functional using modern hooks.
Clip 3:  Architectural Refactoring  (~7 minutes)
Now that our code is more understandable, it’s time to tackle architectural systems design. This time we will audit a large legacy frontend component and we will work alongside our AI coding agents to break this down into smaller, focused components, hooks, and utilities. This will teach us about modularity and separation of concerns. Finally, we will ask our AI coding agent to update tests and documentation accordingly.
Clip 4: Performance and Efficiency  (~5 minutes)
Not everything is about writing WET or DRY code, performance matters too. We will use AI to identify unnecessary renders, oversized components, duplicated requests, and other inefficiencies that affect performance. 
Clip 5: Modernizing Frameworks and Dependencies  (~5 minutes)
AI can accelerate repetitive modernization work. We will work through framework, library, and dependency upgrades to keep up with the latest standards, avoid compatibility issues and potential CVEs. 
3
Discuss how to apply AI tools to large scale legacy codebases and cross-cutting refactoring challenges

Explain strategies for refactoring across multiple files and modules while maintaining consistency, including coordinating changes and managing shared dependencies
Demonstrate how to use AI tools to identify and eliminate dead code, reduce duplication, and address accumulated technical debt across a codebase
Discuss the limitations of AI tools in large-scale refactoring, including incomplete context, hallucinated dependencies, and the risk of introducing regressions


Module 3 – Scaling AI-Assisted Refactoring Across Large Codebases
Clip 1: Why Large-Scale Refactoring Is Different (~4 minutes)
Explore the difference between small refactors and large-scale modernization efforts. AI can help us with multi-team coordination, merge conflicts, ownership and hidden dependencies. A codebase with daily commits requires a different strategy than a system untouched for years. 
                Demo idea: Use AI to identify unused API endpoints by reviewing backend and frontend repositories simultaneously
Clip 2:  Choosing the Right Refactor Strategy  (~4 minutes)
Different systems require different approaches. We will compare continuous cleanup strategies such as the Boy Scout Rule against batched migration initiatives designed for larger modernization programs. We will also compare active systems, dormant systems, ownership models, and release cadence.
Clip 3:  Planning Cross-Cutting Changes (~5 minutes)
Use AI to map dependencies, identify obsolete modules that should be retired instead of migrated, and reduce modernization scope. Then generate checklists, milestones, phased rollouts, and rollback plans.  
Clip 4: Design Debt and Consistency Audits (~5 minutes)
Tech debt is not always about code, it is also about design debt. Large code bases often generate design inconsistencies that lower maintainability and reduce the perceived product quality of our applications. We will use AI to audit font sizes, spacing values, and color usage, then propose tokens and standards for gradual migration.
                Demo idea: Use AI to review and fix lack of design consistency in a React application
Clip 5: Using AI for Example-Driven, Repetitive Migrations (~5 minutes)
Once one or two examples are complete, AI can accelerate the remaining work. We will use example-driven migrations to scale changes consistently across many files.
                Demo idea: Use two Bootstrap migrations as an example to migrate 15 files in one go.
Clip 6: Limits and Guardrails for AI at Scale (~4 minutes)
AI can help accelerate broad changes, but large codebases introduce context-window limits, hallucinated dependencies, invented APIs and unsafe assumptions. We will learn to set up guardrails, verification workflows and when human reviews are essential.
4
Explain how to execute safe and controlled AI-assisted refactoring

Discuss how to detect and mitigate unintended side effects introduced during AI-assisted refactoring, including strategies such as isolating changes, validating in small steps, and avoiding large-scale rewrites 
Demonstrate how to establish safety mechanisms such as characterization tests, regression tests, and behavioral baselines before applying AI-generated refactoring changes
Demonstrate how to apply version control practices that support safe AI-assisted refactoring, including branching strategies, commit discipline, and rollback approaches
Describe how to integrate AI-assisted refactoring into CI/CD pipelines to automatically detect regressions and enforce quality gates

Module 4 – Safe and Controlled AI-Assisted Refactoring
Clip 1: Why Refactors Break Production (~3 minutes)
Even well-intentioned refactors can introduce regressions when behavior changes unintentionally. We will explore common failure modes such as hidden dependencies, large rewrite scope, insufficient testing, and overconfidence in AI-generated changes. We will also discuss why small, controlled iterations are safer than big-bang rewrites.
Clip 2: Git Discipline for AI Changes  (~5 minutes)
AI can generate changes quickly, but version control discipline keeps those changes manageable. We will cover branching strategies, focused pull requests, conventional commits, and rollback approaches while using AI to split large diffs into smaller commits, draft commit messages, summarize pull requests, and identify appropriate reviewers.
Clip 3: CI/CD Quality Gates  (~7 minutes)
Automated pipelines are essential for safe refactoring at scale. We will use characterization tests, regression tests, linting, type checking, build validation, and visual or end-to-end checks to catch issues before production, while AI helps generate missing tests, stabilize flaky suites, and explain pipeline failures.  
Clip 4: Detecting Side Effects Early  (~5 minutes)
Some regressions appear only after deployment. We will discuss staged rollouts, canary releases, logs, monitoring, error rates, performance baselines, and user feedback loops, using AI to analyze logs, group errors, compare release metrics, and highlight suspicious changes quickly.    


5
Sustaining and Governing AI-Assisted Refactoring

Explain how to document refactoring decisions and rationale, including how AI tools can assist in preserving context and institutional knowledge


Module 5 – Sustaining Modernization Gains
Clip 1: Documenting Decisions and Preserving Context (~4 minutes)
Refactors create lasting changes that future teams must understand. We will use AI to generate migration notes, architecture decision records, changelogs, and summaries that preserve rationale and institutional knowledge. 
Clip 2: Measuring Refactoring Success  (~4 minutes)
Successful refactoring should create measurable improvements, not just cleaner-looking code. We will define metrics such as delivery speed, defect rates, migration progress, dependency reduction, and performance trends. AI can help gather signals from repositories, tickets, and pipelines, then generate progress reports for teams and stakeholders.
Clip 3: Sustaining the Investment  (~6 minutes)
Refactoring is not complete when the PR merges. It is complete when the old patterns stop coming back. Using AI, we will enforce standards through coding guidelines, ESLint rules, dependency restrictions, pull request templates, and progress metrics that keep the codebase healthy over time, with AI assisting in recurring audits and identifying regressions towards old patterns.  



