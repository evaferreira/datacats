**Clip 1: Why Refactors Break Production**   (~3 minutes)

Even well-intentioned refactors can introduce regressions when behavior changes unintentionally. We will explore common failure modes such as hidden dependencies, large rewrite scope, insufficient testing, and overconfidence in AI-generated changes. We will also discuss why small, controlled iterations are safer than big-bang rewrites.

                **Demo:** None — this clip is slides only.

## Slide outline

### Slide 1

1. **Title — "Safe and controlled AI-assisted refactoring"** *(module title slide)*
   - Eva Ferreira — Lead Product Engineer
   - @evaferreira92 | www.evaferreira.com

### Slide 2

**Why refactors break production** *(section title)*

### Slide 3

**Over-reliance in AI output.**

Script note: *False confidence. AI sounds authoritative while being wrong.*

### Slide 4

**Common pitfalls**

- Hidden dependencies
- Oversized scope
- Missing validation
- Confidently wrong output

### Slide 5

**Hidden dependencies**

- Give the agent tools to see beyond the open file
- Map dependencies before modifying code
- Cross-check with a second agent or session

Script note: *Ask your agent, "what else reads / writes this?" Ask it to find references and run the full build, not just look at the open file.*

### Slide 6

**Oversized scope**

- Plan and execute milestones
- Prefer smaller diffs
- Commit in small steps

Script note: *When planning, ask for milestones so you can build one slice at a time. Easy to review, easy to revert.*

### Slide 7

**Missing validation**

- Add tests before changes, not after
- Observe the output

Script note: *If it builds, it doesn't mean it works.*

### Slide 8

**Confidently wrong output**

- Treat output as a draft, not a final answer
- Ground claims in the codebase
- Re-run in other agents or sessions

Script note: *Independent verification. Re-run the prompt or hand the plan to a second agent to verify.*

### Slide 9

**"Treat AI output as a draft to be checked, not an answer to be trusted."**
