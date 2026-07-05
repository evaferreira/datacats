# Clip 3: CI/CD Quality Gates — Script Draft

**Total clip duration:** ~6 min (recorded) — **Demo portion:** one demo, not scripted — green pipeline → AI writes characterization tests → PR gate goes green → red → green; narrated live over the recording, instructor brief in HTML comment under slide 5 — **Spoken slide budget:** ~1:52 min (261 words at Eva's 140 wpm pace) — **Voice:** Eva — collaborative, warm, direct, conversational — **Threaded thesis:** *a gate is only as good as what's behind it — a green pipeline isn't safe when nothing meaningful is tested* — **Outline coverage status:** all slide bullets covered; outline bullets (characterization / regression tests, lint, type check, build, visual/e2e; AI generates coverage / stabilizes flaky suites / explains failures) land across slides 3–4 + the demo.

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

<!-- Demo — NOT scripted; narrate live over the recording. Full brief: lesson/13-m4-c3-cicd-quality-gates.md.
 Setup/rehearsal: ~/.claude/plans/great-for-the-cicd-playful-patterson.md.
 Precondition (off-camera): baseline .github/workflows/ci.yml is committed and GREEN on module4 (verified 2026-07-02).
 Beats: (1) Open the Actions tab — pipeline is GREEN. Hook: metrics.js has zero tests → green ≠ safe; a gate only
 guards what it tests. (2) Branch off module4; ask AI to write a characterization test for calculateRetentionScore
 (real call shape: activeUsers, churnedUsers, avgSessionDays) + tests for the rest of metrics.js; watch it flag the
 dead calculateMRRNew. (3) Commit, push, open a PR into module4 → CI runs the new tests green on the PR. (4) Regression
 beat: change calculateRetentionScore's math → push → gate goes RED → ask AI to explain the failure → revert → green.
 Watch-for: don't let AI "fix" calculateRetentionScore while testing — a characterization test pins current behavior,
 bugs and all. Rehearse so the gate actually bites (see plan). -->

[slideshow]

A gate is only as good as what's behind it. A pipeline with no meaningful tests isn't just weak — it's worse than having none, because it's a false sense of security. The gates always run; our job is to make sure there's something real behind them.

---

## Notes for Eva

- **Word count (spoken slide narration only):** 261 words ≈ 1:52 at your 140 wpm pace. Excludes the demo (narrated live) and the HTML-comment brief. Total clip lands ~6 min — ~1:52 of slides leaves ~4:00 for the demo (AI test-gen + the green → red → green regression beat).
- **Safest cut if running long:** slide 4's four AI roles can compress to a quick list ("generate missing coverage, explain failures, stabilize flaky tests, suggest improvements"), recovering ~25 words. Slide 1's open is the next most trimmable.
- **Thread to lean into:** "a gate is only as good as what's behind it." With the slide-5 lead-in trimmed to one line, the "green ≠ safe" framing no longer lives in the slides — it'll land live over the demo (the Actions-tab hook) and in the close (slide 6). If it feels abrupt, consider seeding "a gate only guards what it tests" out loud as you open the demo.
- **Clip independence:** no references to other clips; "characterization test" is introduced on slide 3 ("Tests — unit, characterization, regression…"), and the close stays thematic. Stands alone for anyone landing here cold.
- **Demo note:** unscripted — live narration over the recording. Full brief = `lesson/13-m4-c3-cicd-quality-gates.md`; setup/rehearsal in the plan file. **Precondition:** the baseline `ci.yml` must be green on `module4` before recording (already set up + pushed). The green → red → green regression beat is the payoff — rehearse so the gate actually bites.
- **Swappable reference:** the demo pins `calculateRetentionScore` (real + used, genuinely undocumented) — swappable to another untested `metrics.js` function, but retention score is the strongest target. Slide 3's "type check" is a general gate category; our JS pipeline runs lint / test / build (no type-check step) — keep slide 3 conceptual, let the demo show the real gates.
