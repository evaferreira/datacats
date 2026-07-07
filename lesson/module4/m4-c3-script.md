# Clip 3: CI/CD Quality Gates — Script Draft

**Total clip duration:** ~3:54 speaking time (recorded; voiceover transcribed below) — **Demo portion:** one demo (green pipeline → AI writes characterization tests → PR gate goes green → red → green), transcribed below — 295 words ≈ 2:02 at Eva's 145 wpm demo pace; instructor brief in HTML comment under slide 5 — **Spoken slide budget:** ~1:52 min (261 words at Eva's 140 wpm pace) — **Voice:** Eva — collaborative, warm, direct, conversational — **Threaded thesis:** *a gate is only as good as what's behind it — a green pipeline isn't safe when nothing meaningful is tested* — **Outline coverage status:** all slide bullets covered; outline bullets (characterization / regression tests, lint, type check, build, visual/e2e; AI generates coverage / stabilizes flaky suites / explains failures) land across slides 3–4 + the demo.

---

[slideshow]

Let's talk about CI/CD quality gates. When AI can generate changes faster than we can review them, we need a way to check every change automatically — validations that always run, that we never have to remember to trigger, because we built them once. That's how we build confidence in the code we ship.

[slideshow]

A pipeline is where those gates live. Humans define the standards — what "good" means for our codebase — and the pipeline enforces them, on every push to the repository.

[slideshow]

So what runs in that pipeline? A stack of gates. Lint, to catch style slips and common mistakes. Type checks, to hold the contracts between our functions. Tests — unit, characterization, regression, and where it's worth it, visual or end-to-end. A build, to prove it all still compiles. And only once every gate is green, we deploy.

[slideshow]

AI helps on both sides of that gate. It can generate the coverage we're missing. It can explain a failing pipeline in plain language, instead of us digging through logs. It can stabilize flaky tests that fail at random and erode our trust. And it can suggest improvements to the gates themselves. We set the bar; AI helps us reach it and enforce it.

[slideshow]

Let's look at the real value of a pipeline.

[demo time]

In this monorepo, I have a pipeline that runs on every pull request. This has a series of steps. It first downloads and installs all dependencies, then it runs our unit tests. Next, it runs two CSS and design-system linters and finally, it makes sure the app builds correctly.

The main gap of my pipeline is test coverage — the threshold is very low.

For example, if I wanted to edit the metrics.js file, one that has many math functions, I wouldn’t know for sure I was breaking anything, because we don’t have a test for that. So the pipeline would always be green.

So in this case, before modifying anything, I will first make sure that we have coverage. I will ask our agent to write tests for this file, making sure we are covering the current behavior.

See how it creates the tests, 27 in this case, and then it runs them to make sure they work correctly in our local environment.

Once that is done, I will push these changes on a branch.

When the pull request gets created, the pipeline will trigger. Let’s take a closer look at the status. It installs dependencies and then it begins to run the tests. Once they pass, it goes ahead and runs the linters and the build.

So, in this case, this pipeline with our new coverage passes, as expected.

Now, let’s see if we can break it! Let’s make a small change to the Calculate retention score function, a 6 for a 7, and let’s commit and push that mistake…

This time, when the pipeline runs, it catches the bug. Thanks to our new coverage and our pipeline, we now know when something is about to break before we merge it to production.

[slideshow]

A gate is only as good as what's behind it. A pipeline with no meaningful tests isn't just weak — it's worse than having none, because it's a false sense of security. The gates always run; our job is to make sure there's something real behind them.

---

## Notes for Eva

- **Word count:** slides 261 words ≈ 1:52 @140 + demo voiceover 295 words ≈ 2:02 @145 = **~3:54 speaking time** (recorded; voiceover transcribed below). Excludes the HTML-comment brief. Demo covers AI test-gen + the green → red → green regression beat.
- **Safest cut if running long:** slide 4's four AI roles can compress to a quick list ("generate missing coverage, explain failures, stabilize flaky tests, suggest improvements"), recovering ~25 words. Slide 1's open is the next most trimmable.
- **Thread to lean into:** "a gate is only as good as what's behind it." With the slide-5 lead-in trimmed to one line, the "green ≠ safe" framing no longer lives in the slides — it'll land live over the demo (the Actions-tab hook) and in the close (slide 6). If it feels abrupt, consider seeding "a gate only guards what it tests" out loud as you open the demo.
- **Clip independence:** no references to other clips; "characterization test" is introduced on slide 3 ("Tests — unit, characterization, regression…"), and the close stays thematic. Stands alone for anyone landing here cold.
- **Demo note:** recorded; voiceover transcribed above (was narrated live). Full brief = `lesson/13-m4-c3-cicd-quality-gates.md`; setup/rehearsal in the plan file. **Precondition:** the baseline `ci.yml` must be green on `module4` before recording (already set up + pushed). The green → red → green regression beat is the payoff — rehearse so the gate actually bites.
- **Swappable reference:** the demo pins `calculateRetentionScore` (real + used, genuinely undocumented) — swappable to another untested `metrics.js` function, but retention score is the strongest target. Slide 3's "type check" is a general gate category; our JS pipeline runs lint / test / build (no type-check step) — keep slide 3 conceptual, let the demo show the real gates.
