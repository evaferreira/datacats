# Clip 3: Sustaining the Investment — Script Draft

**Total clip duration:** ~4:56 min (slides only) — **Demo portion:** none (this clip is slides only) — **Spoken slide budget:** ~4:56 min (690 words at Eva's 140 wpm pace) — **Voice:** Eva — collaborative, warm, direct, conversational; audience = tech leads & engineering managers (this final module) — **Threaded thesis:** *a migration succeeds when the old patterns stop coming back — so we make the healthy path the default and let AI keep it that way; the goal is a codebase that becomes easy to change* — **Outline coverage status:** all slide bullets covered (definition of success; good defaults — linter/deps/templates/components; AI enforces — audit/detect/identify/recommend; AI automates — AGENTS.md/skills/PR templates/scheduled audits/dependency policies; improve→enforce→measure→repeat); this is the **course finale** — slide 8 is a deliberate course recap; no demo.

---

[slideshow]

Let's talk about sustaining the investment. Everything we've built — cleaner code, better tests, a more modern stack — has a way of quietly eroding. A few months of deadline pressure, a couple of new hires who don't know the conventions yet, and the old patterns start sneaking back in. So the best outcome we can design for isn't a one-time cleanup — it's a system where the good patterns are easy to reach for, and the bad ones set off alarms. That's what sustaining really is: making the healthy path the path of least resistance.

[slideshow]

Which means we need a sharper definition of success. A migration isn't done when the pull request merges. It's done when the old pattern stops coming back. If we migrate away from something, and three months later it's quietly reappearing in new code, we didn't finish the job — we just paused it. Success is when the thing we removed stays removed, without anyone having to stand guard over it.

[slideshow]

And here's the principle that gets us there: good defaults beat good intentions. We can ask everyone to remember the new convention — but memory doesn't scale, and it fails exactly when people are busiest. So instead of relying on intentions, we build the standard into the tools. A linter rule that flags the old pattern automatically. Dependency restrictions that block the library we're trying to retire. Templates and shared components, so the easiest way to build something is also the correct way. Every one of these turns "please remember" into "you don't have to, we got your back." We're not adding discipline — we're removing the need for it.

[slideshow]

AI helps us enforce all of this, at a scale that used to be impractical... or even impossible for humans. It can audit the whole codebase for the patterns we're trying to eliminate. It can detect regressions — new code sliding back towards the old way. It can identify the legacy patterns still lurking that we haven't gotten to yet. And it can recommend the cleanups, ranked by impact.

[slideshow]

Beyond spotting problems, AI helps us automate the guardrails themselves.

It can maintain the AGENTS.md file that tells every coding agent about our conventions. It can capture reusable skills that encode how we do things here. It can help with pull request reviews and keep our templates up to date. It can run scheduled modernization audits, and enforce dependency policies — flagging a risky package before it ever lands. That monthly audit that used to cost an engineer a week now runs on a schedule — and it also works as a way of validating that the guardrails themselves are actually working.

The point isn't to automate people out of the loop; it's to let the routine enforcement run quietly in the background, so our attention goes to the judgment calls that actually need us.

[slideshow]

Put together, this is a loop, not a project. We improve something. We enforce the improvement so it sticks. We measure whether it's actually holding. And we repeat. Each turn of that loop leaves the codebase a little healthier — and, just as importantly, makes the next migration easier than the last.

[slideshow]

And that's really the whole point. The goal was never to finish a refactor — refactoring is never truly finished. The goal is to build codebases that become easy to change. A system where the reasoning is preserved, the standards enforce themselves, and improvement is routine rather than heroic. That's what turns modernization from a one-time effort into simply how the team works.

[slideshow]

So let's step back and look at the whole journey. We learned to make sense of legacy systems — turning the unfamiliar into something we could reason about. We improved them safely, in small, controlled steps. We scaled that modernization across large codebases. We controlled the risk, with version control, quality gates, and early detection. And in this final step, we made those improvements last. All of it alongside AI — not as a replacement for our judgment, but as a tireless partner for the work around it. That's the toolkit. The rest is practice.

---

## Notes for Eva

- **Word count (spoken, slides only):** 690 words ≈ 4:56 at your 140 wpm pace — right on the ~5 min you're targeting. Slides-only, no demo. (Re-verify with a tool after edits.)
- **This is the course finale.** Slide 8 is a deliberate recap of all five modules (understand → improve → scale → control → sustain). That's the one intentional "look back at the course" moment — it's written self-contained (it states the arc, doesn't say "as we saw in module N"), so it still stands alone, but it's meant to feel like a closing. Land it warmly; "the rest is practice" is the final line of the whole course.
- **Audience lens (tech leads / EMs):** governance framing throughout — "make the healthy path the path of least resistance," "good defaults beat good intentions," "memory doesn't scale," "routine rather than heroic." The whole clip is about designing a system that holds without depending on any one person.
- **Thread to lean into:** "old patterns stop coming back" → "make the healthy path the default" → "a codebase that becomes easy to change." Plant on slide 1 (bad patterns set off alarms), define on slide 2 (merged ≠ done), and land on slide 7. Keyword: **defaults**.
- **Safest cut if running long:** slide 5's automation list can drop to three items (AGENTS.md, scheduled audits, dependency policies), recovering ~25 words. Slide 1's erosion setup is the next trim. Don't cut slides 7–8 — they're the close.
- **Demo:** none — continuous narration.
- **Swappable reference:** "AGENTS.md" and "skills" are tool-specific (Claude Code) — swap for your team's equivalents (a CONTRIBUTING/conventions doc, CODEOWNERS, custom lint plugins) if that reads better for a leadership audience.
