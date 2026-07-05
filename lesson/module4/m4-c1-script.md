# Clip 1: Why Refactors Break Production — Script Draft

**Total clip duration:** ~3:09 min (slides only) — **Demo portion:** none (this clip is slides only) — **Spoken slide budget:** ~3:09 min (441 words at Eva's 140 wpm pace) — **Voice:** Eva — collaborative, warm, direct, conversational — **Threaded thesis:** *AI output is a draft to be checked, not an answer to be trusted — confidence isn't correctness* — **Outline coverage status:** module welcome (slide 1) + all slide bullets covered (over-reliance / false confidence; the four pitfalls; hidden dependencies — 3 habits; oversized scope — 3 habits + big-bang vs. small steps; missing validation + "builds ≠ works"; confidently-wrong — 3 habits); no demo.

---

[slideshow]

Welcome to Safe and Controlled AI-Assisted Refactoring. AI can change our code faster than ever before — but that speed is only an advantage if we stay in control. Across this module we will build that control: the version-control discipline, the automated quality gates, and the early-detection habits that keep fast, AI-driven change from breaking the things that matter. And it starts with understanding how those breaks happen.

[slideshow]

So let's talk about why refactors break production.

[slideshow]

Most of the time, it comes down to over-reliance on AI output. The danger isn't that AI could be wrong. The danger is that it's wrong while sounding completely convincing! It hands us clean, confident code and responses, and that false confidence is what makes us stop double-checking its answers.

[slideshow]

That over-reliance shows up as four common pitfalls: hidden dependencies, oversized scope, missing validation, and confidently wrong output.

[slideshow]

First, hidden dependencies. An agent looking at one open file can't see everything that reads or writes to it — so a change that's safe locally quietly breaks something three files away. So we give the agent tools to see beyond the open file, we map the dependencies before we modify anything, and we cross-check with a second agent or session.

[slideshow]

Second, oversized scope. The bigger the change in one go, the harder it is to review and to undo. So instead of one big-bang rewrite, we plan and execute in milestones, we prefer smaller diffs, and we commit in small steps. When planning, ask the agent to write down the steps in independent, controlled milestones. This will be safer than one large rewrite — easier to review, and easier to revert.

[slideshow]

Third, missing validation. The fact that it builds doesn't mean that it works — a clean compile tells us the shape is right, not that the behavior is the expected one. So let's add tests before the changes, not after, so we have a baseline to compare against, and let's observe the output instead of assuming it is correct.

[slideshow]

And fourth, confidently wrong output. The fix is to treat what the agent produces as a draft, not a final answer. We ground its claims in the codebase — does this function, this dependency, actually exist? And we get a second opinion: we take the plan to another session and ask it to give feedback to the first agent, so the two check each other before we trust them.

[slideshow]

So, treat AI output as a draft to be checked, not an answer to be trusted. The speed is real, and it's worth having — we just have to pair it with the discipline to verify it.

---

## Notes for Eva

- **Word count (spoken, slides only):** 441 words ≈ 3:09 at your 140 wpm pace (comfortably under the 3.5-min ceiling). Slides-only clip, no demo.
- **Safest cut if running long:** the module-welcome opener (slide 1) can shrink to a lean welcome — drop the themes preview sentence ("Across this module we will build that control… things that matter."), recovering ~40 words / ~17s. The clip still opens cleanly on "why refactors break production."
- **Thread to lean into:** "confidence isn't correctness" and "a draft to be checked, not an answer to be trusted." Plant it on slide 3 (false confidence is what makes us stop checking), reinforce it as the *habit* under each pitfall (map / small steps / baseline / verify), and land it on slide 9. The one word doing the work across all four is **verify**.
- **Clip independence:** slide 1 previews the module's *themes* (version control, quality gates, early detection) as areas of work, not "the next clips" — keep it that way so this stands alone for anyone landing here cold. The close now lands on the thesis itself ("a draft to be checked, not an answer to be trusted"), with no forward reference to other clips.
- **Demo:** none — the deck has no demo slide for this clip, so it's continuous narration.
- **Swappable reference:** none — no names, code references, or external specifics in this clip.
