**Clip 6: Limits and Guardrails for AI at Scale**   (~4 minutes)

AI can help accelerate broad changes, but large codebases introduce context-window limits, hallucinated dependencies, invented APIs and unsafe assumptions. We will learn to set up guardrails, verification workflows and when human reviews are essential.

## Slide outline

### Slide 1

**Title — "Limits and guardrails for AI at scale"**

### Slide 2

**Guardrails for AI at scale**

| Small change | Large change |
| ----- | ----- |
| Small mistake | Large consequences |

Script note: *A bad suggestion in one file is annoying, a bad assumption across 100 files becomes expensive. AI increases throughput, but not certainty. Amplifies both strengths and weaknesses.*

### Slide 3

**Failure modes**

- **Visibility failure**
- **Inference failure**
- **Scope failure**

### Slide 4

**Guardrails reduce blast radius**

- Limit scope
- Review outputs
- Validate assumptions
- Expand gradually

### Slide 5

**Different risks, different controls**

- Tests
- Git discipline
- CI/CD quality gates
- Phased rollouts

### Slide 6

**Human review**

- Validate functionality
- Validate standards
- Challenge assumptions

Script note: *No longer line by line of code.*

### Slide 7

**"Safety is found on processes, not automation."**
