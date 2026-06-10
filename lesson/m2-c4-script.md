# Clip 4: Performance and Efficiency — Script Draft

**Total clip duration:** ~5:00 min — **Demo portion:** ~3:00 (runtime observation — DevTools → AI → fix, narrated live, not scripted here) — **Spoken slide budget:** ~1:55 min (~270 words at Eva's 140 wpm pace) — **Voice:** Eva — collaborative, warm, direct, conversational — **Threaded thesis:** *you can't fix what you can't see — performance is its own lens, and the runtime tells the truth* — **Outline coverage status:** all slide bullets covered (slides 1–4 and 6; demo intentionally unscripted)

---

[slideshow]

Let's talk about performance and efficiency. Clean, well-structured code can still be slow — performance is a different lens, and it calls for a different method.

[slideshow]

Let's start with why performance debt is so easy to ignore. We engineers tend to have fancy machines, so we often don't feel the slowness our users feel every day — the pain lands on them long before it lands on us. And there's also cost. Every small inefficiency — a duplicate request, an extra query — adds up, and multiplied by every active user, it turns into a real number on the cloud bill.

[slideshow]

So before we change anything, let's measure first. The network tab is our friend. Code review is great at finding dead imports and messy states, but it almost never catches a duplicate request, a slow query, a component re-rendering far more than it needs to, or a React useEffect that re-fires on every single render. Those problems live in the gap between the code and the runtime. And the best way to see them is to actually run the app!

[slideshow]

So let's spot and fix a real performance bug.

[demo time]

<!-- Demo not scripted — narrated live over the screen recording. Runtime observation (Option D from the brief).
 First, we open DevTools and spot the symptom. Then we bring in AI to trace the root cause. And finally, we make the change and confirm the fix right there in the network tab.
     Audit is conversational — findings live in chat, NO new markdown doc this clip.

     Note to self (four beats on the dashboard):
       1. (~30s) Open DevTools network tab. Repeated MRR requests fire on every interaction — "that's not right."
          Optional: throttle bandwidth to dramatize a slow connection.
       2. (~1 min) Ask AI to explain the network behavior. It traces to the inline filters object
          (DashboardPage.jsx:36) — rebuilt every render, breaking the useEffect([filters]) dep check (line 88).
       3. (~1 min) AI proposes the fix (useMemo or stable primitive deps). Pick one on camera, AI applies.
       4. (~30s) Refresh, reopen DevTools — requests are stable now.
-->

[back to slides]

You can't fix what you can't see. Performance bugs live in that gap between the code and the runtime, and AI can read our code, but the running app is what tells the truth. AI is remarkably good at tracing a root cause once we hand in the evidence — but we have to spot the symptom first. So let's open the network tab. Let's open the profiler. Let the running app be our starting point — and then ask AI why.

---

## Notes for Eva

- **Word count (spoken, slides only):** ~270 words — roughly 1:55 of slide time at your 140 wpm pace. Pairs with a ~3:00 runtime-observation demo (now including the DevTools → AI → network-tab method walkthrough you moved into the demo block) for a clip around 5:00.
- **Demo not scripted:** the `[demo time]` note-to-self block holds the four beats and the inline-filters root cause from the brief — narrate those live. This is the only runtime-observation demo in the module, so the before/after network waterfall is the whole payoff; make sure the camera catches both.
- **Thread to lean into:** "you can't fix what you can't see" and "the runtime tells the truth" — set up "measure first" on slide 3, land it in the close. Slide 1's "performance is a different lens, and it calls for a different method" is the scoped-audit callback; the method here is opening DevTools, not writing a prompt.
- **Clip independence:** the clip never points at a previous audit — it frames performance as a separate lens in its own words, so it stands alone for anyone landing here cold.
- **Safest cut if running long:** in the close, drop "Let's open the profiler." — the network tab is already named and is what the demo actually uses, so the line is the most expendable. Recovers a short beat.
