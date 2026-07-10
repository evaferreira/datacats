# Clip 1: Documenting Decisions and Preserving Context — Script Draft

**Total clip duration:** ~3:15 min (slides only) — **Demo portion:** none (this clip is slides only) — **Spoken slide budget:** ~3:15 min (456 words at Eva's 140 wpm pace) — **Voice:** Eva — collaborative, warm, direct, conversational; audience = tech leads & engineering managers (this final module) — **Threaded thesis:** *knowledge is part of the deliverable — a refactor that leaves no "why" behind just trades code debt for knowledge debt* — **Outline coverage status:** module welcome (slide 1) + all slide bullets covered (knowledge/context loss, the three questions, the three outputs, the capture prompt + ADR / changelog / AGENTS.md outputs); AI-generates-notes/ADRs/changelogs/summaries lands on slide 6; no demo.

---

[slideshow]

Welcome to Sustaining modernization gains. So far, the focus has been on making changes. This module is about making them last — because modernization isn't a one-time event on a roadmap, it's an ongoing choice a team makes. And for those of us leading teams, that's where the real return lives: not in any single migration, but in whether the improvements survive the next hire, the next reorganization, the next quarter. So across this module we'll talk about how to preserve the knowledge behind our changes, measure whether modernization actually paid off, and keep old patterns from returning; because the work doesn't finish when we merge.

[slideshow]

Let's start with documenting decisions and preserving context.

[slideshow]

Knowledge disappears faster than code. The code stays in the repository, exactly as we left it. But the reasoning behind it — why we chose this approach, what alternatives we considered — lives in people's heads. And teams change over time. Six months later the code is still there, and the story behind it is gone.

[slideshow]

When that context disappears, we can no longer answer important questions such as: Why was this done this way? What assumptions were we making at the time? And what still needs work — what did we consciously leave for later?

[slideshow]

So let's be intentional about those three outputs. Better code is the implementation — the part we already review carefully. Better knowledge is the rationale and the architectural decisions — the "why" behind the "what." And better process is the conventions we leave behind, so the next change starts from a better place. A refactor that produces only the first one is leaving two-thirds of its value on the table.

[slideshow]

This is where AI helps, and it costs us almost nothing. The moment a piece of work is done — while the context is still fresh — we hand the agent a prompt like this one. 

Summarize this migration for an engineer joining the team six months from now: why the changes were made, what architectural decisions were taken, what assumptions remain, what's still pending, and what future contributors should avoid.

The output can live wherever the team will actually find it — a changelog, an architecture decision record, our AGENTS.md, the coding guidelines, a project skill. The format matters far less than capturing the knowledge while someone still has it in their head.

[slideshow]

Because knowledge is part of the deliverable. A refactor shouldn't pay down code debt by quietly creating knowledge debt — that's just trading one problem for another. When we treat the "why" as something we ship alongside the code, the next engineer — including our future selves — inherits a decision they can understand, instead of a mystery they have to reverse-engineer.

---

## Notes for Eva

- **Word count (spoken, slides only):** 456 words ≈ 3:15 at your 140 wpm pace. Slides-only clip, no demo. (Re-verify with a tool after any edits.)
- **Audience lens (tech leads / EMs):** the org-cost framing is deliberate — "survive the next hire, the next reorganization, the next quarter" and "two-thirds of its value on the table." Keep it peer-to-peer, not preachy; you're talking to people who own team outcomes, so the hook is risk and return, not process for its own sake.
- **Safest cut if running long:** slide 1's module preview sentence ("So across this module we'll…") can shorten to just "preserve knowledge, measure success, keep old patterns from creeping back" — recovers ~20 words. Slide 3 is the next most trimmable.
- **Thread to lean into:** "knowledge is part of the deliverable" and the "why." Plant it on slide 2 (three outputs), sharpen on slide 3 ("the story behind it is gone"), and land it on slide 7. The recurring idea: the code survives, the *why* doesn't — unless we capture it.
- **Clip independence:** slide 1 is a module opener — it frames the module's own themes and says "so far the focus has been on making changes" as scene-setting, not "in the last module we…". No references to sibling clips. Stands alone.
- **Demo:** none — the deck has no demo slide; continuous narration. Slide 6 shows the capture prompt on screen, so you can gesture to it rather than read every word.
- **Swappable reference:** "AGENTS.md" and "project skill" are tool-specific — swap for wherever your team actually keeps institutional knowledge (an ADR folder, Confluence, the README) if that lands better for a leadership audience.
