**Clip 3: CI/CD Quality Gates**   (~7 minutes)

Automated pipelines are essential for safe refactoring at scale. We will use characterization tests, regression tests, linting, type checking, build validation, and visual or end-to-end checks to catch issues before production, while AI helps generate missing tests, stabilize flaky suites, and explain pipeline failures.

                **Demo:** A minimal CI pipeline is already green — but green isn't safe when the business logic has no tests. AI generates the missing characterization tests (coverage %), a PR gate catches a regression, and AI explains the failure. (Baseline `ci.yml` set up ahead of recording; runs on module4.)

## Slide outline

### Slide 1

**CI/CD quality gates** *(section title)*

Script note: *Quality gates build confidence in the code we ship. They are validations that always run, we don't need to remember about them, we just build them once.*

### Slide 2

**Pipelines**

- Humans define the standards
- Technology enforces them

Script note: *AI lets you code faster than you can verify it, so you automate the verification.*

### Slide 3

**Quality gates**

- Lint
- Type check
- Tests
- Build
- Deploy

Script note: *Types to hold the contracts… deploys only after the pipeline is green.*

### Slide 4

**The role of AI**

- Generate missing coverage
- Explain failing pipelines
- Stabilize flaky tests
- Suggest improvements

### Slide 5

demo introduction

**The value of a CI/CD pipeline**

Script note: *Coverage %*

### Slide 6

**"A gate is only as good as what's behind it."**

Script note: *A pipeline with no meaningful tests is a false sense of security, which is worse than not having any tests at all.*
