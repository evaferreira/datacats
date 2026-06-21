**Clip 4: Performance and Efficiency**   (\~5 minutes)

Not everything is about writing WET or DRY code, performance matters too. We will use AI to identify unnecessary renders, oversized components, duplicated requests, and other inefficiencies that affect performance.

                **Demo idea:** Diagnose a duplicate-request bug from the network tab. Eva sees it, AI traces it.

## Slide outline

### Slide 1

**Title — "Performance and Efficiency"**

### Slide 2

**Performance debt**

- Users feel the pain more than engineers
- Bad patterns turn into big cloud bills

Script note: *Us engineers have fancy computers, we sometimes don't notice the bad performace that our users might be feeling. And every small inefficiency — a duplicate request, an extra query — adds up to a real number on the cloud bill once you multiply by all the active users*

### Slide 3

**Measure first**

"The network tab is your friend"

Script note: *The network tab is your friend. Code review will find dead imports and ugly states, but it almost never finds a duplicate request, a slow query, or an effect that re-fires every render. Those live in the gap between code and runtime. To see them, you have to run the app.*

### Slide 4

demo introduction

**Spotting and fixing performance bugs**


### DEMO HERE (around 3 minutes)

**\[demo placeholder — four beats on the dashboard:**

- DevTools → spot the symptom
- AI → trace the root cause
- code change → confirm in the network tab

- **Beat 1 (~30s):** Eva opens DevTools network tab on the dashboard. Repeated MRR requests fire on every interaction. *"That's not right."*
- we can also focus on how to "lower the bandwidth on our app to show an slow connection"
- **Beat 2 (~1 min):** Eva asks AI to explain the network behavior. AI traces it to the inline `filters` object on [`DashboardPage.jsx:36`](frontend/src/pages/DashboardPage.jsx#L36) — rebuilt every render, breaks the `useEffect([filters])` dependency check.
- **Beat 3 (~1 min):** AI proposes the fix (`useMemo` or stable primitive deps). Eva picks one, AI applies.
- **Beat 4 (~30s):** Eva refreshes the dashboard, reopens DevTools — requests are stable now.**\]**

### Slide 6

**You can't fix what you can't see.**

Script note: *Performance bugs live in the gap between code and runtime. AI can read code, but the runtime is what tells the truth. Open the network tab. Open the profiler. Let the running app be your starting point — then ask AI why.*
