**Clip 1: Auditing Code Quality**   (\~4 minutes)

Before large migrations, many systems benefit from smaller improvements that make future work easier. We will work through a code audit to improve the quality of our codebase. We will search for inconsistencies, WET patterns, oversized files, unclear naming, and outdated coding patterns.

                **Demo idea:** Audit old React class components to identify candidates for migration to functional components.

## Slide outline

### Slide 1

1. **Title — "Improving and Modernizing Legacy Code with AI"**  
     
2. **What this module covers** *(quick map, not much detail needed)*  
     
   - Audit code quality  
   - Improve maintainability (DRY, naming)  
   - Refactor architecture (modularity, separation of concerns)  
   - Optimize for performance  
   - Modernize frameworks and dependencies

   

3. **The thesis** — *"AI accelerates the doing, but only if we audit first."* 

### Slide 2:

* lets begin with “Auditing code quality”

### Slide 3

**Why audit before refactoring?** 

- before “the codebase is messy”  
  - after “concrete, actionable backlog”

We don't fix what we haven't named. The audit is what turns "this codebase is messy" into a concrete, prioritized backlog.

### Slide 4

**The shape of an audit**

- *Weak:* a flat list. "Here are the class components." No priorities, no rationale, no opinion.  
  - *Good:* structured, opinionated, predictive. The audit *is* the plan.

| Weak | Strong |
| ----- | ----- |
| Flat | Prioritized |
| Vague | Specific |
| Descriptive | Actionable |
| Static | Living |

Each pair captures a different dimension so they don't overlap:

* **Flat → Prioritized** \= ranking  
* **Vague → Specific** \= evidence / file paths  
* **Descriptive → Actionable** \= names the next move  
  * **(includes Reactive → Predictive** \= surfaces what'll bite you, not just what already did)  
* **Static → Living** \= becomes a backlog, not a one-time report

### Slide 5

**Scope your audit by lens** *(the meta-lesson)* Code quality, performance, and dependencies are three different audits. Different prompts, different findings, different decisions. Bundling them produces noise.

### Slide 6

demo introduction

**Today: the code-quality lens** Two dimensions \+ a bonus:

- Class components (ranked by migration complexity)   
  - Architectural debt (oversized files, mixed responsibilities, inline duplicates)   
  - Dead code (bonus surface)

### DEMO HERE (around 2 minutes)

**\[demo placeholder** — produce `MIGRATION_AUDIT.md`.**\]**

### Slide 7

audit is done

* backlog is built  
* priorities have been set  
* evidence has been captured