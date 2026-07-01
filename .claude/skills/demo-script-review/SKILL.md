---
name: demo-script-review
description: Review a recorded demo-script transcript for one of Eva's course clips — grammar/typos, technical accuracy checked against the codebase, content warnings, a reads-aloud sayability pass (catch tongue-twisters before recording), clip-independence, reconciling the planning note, and updating the script's speaking-time duration and notes. Use when Eva says "review the demo script", "review the script for clip N", "I recorded the demo, check it", "check my demo transcript", or points to a demo narration to be checked. Assumes the screen recording is locked (only trim/accelerate) and the voiceover can be re-recorded.
---

# Demo Script Review

Review the spoken narration Eva recorded over a demo — the transcript she pastes into the
clip's script (`lesson/module3/m3-cN-script.md`, usually replacing or sitting under the
`[demo time]` cue).

**Invoking this skill always means the video is already recorded.** Never treat a review as
pre-record, and never ask whether the demo has been shot — if Eva reached for this skill, the
screen is locked. (She may also say "review the demo script" / "I recorded the demo, check it".)

**Hard constraint:** the screen recording is fixed. Eva can only **trim or accelerate** the
video and **re-record the audio**. So every fix must be deliverable as a re-recorded
voiceover line. Never propose a change that would require re-shooting the screen — if you
spot something that would (the screen shows the wrong thing), flag it as unfixable-without-
reshoot, separately.

Respect Eva's teaching voice throughout (collaborative "we", warm, direct, no filler praise,
no exclamation-point hype) — see the `eva-course-script` skill at
`~/mabl/.claude/skills/eva-script/SKILL.md`.

---

## Before reviewing — verify, don't trust

1. Read the clip script (`m3-cN-script.md`) and its demo brief (`lesson/0X-…md`).
2. **Verify every technical claim against the actual code.** Counts, file/line references,
   API call directions, token/variable names, "X is dead / unused / doesn't exist" claims.
   The transcript reports what an AI said on screen — the AI can be wrong, and so can the
   narration. Things this has caught before:
   - a hallucinated dependency version;
   - `var(--dp-spacing-*)` written everywhere when the real token is `var(--dc-spacing-*)`;
   - "endpoints called from the backend into the frontend" (reversed — the frontend calls
     the backend);
   - "propose a token system" when `main.css :root` already defined one.
3. If a claim can **only** come from the recording (the agent's on-screen summary numbers,
   the exact plan it produced), **ask Eva what's on screen** — she keeps the recording open.
   The narration has to match what the video actually shows.

---

## Output format — split findings three ways

Always group suggestions like this; Eva decides B and C:

- **(A) Safe grammar / typo fixes** — comma splices, missing words, subject–verb, fragments,
  broken phrases, number/word normalization. Re-recordable cleanly. Quote the line, give
  **before → after**.
- **(B) Flow / wording** — improvements that change what she said (diverge from the recorded
  audio). Her call. Offer options.
- **(C) Content / accuracy warnings** — anything wrong, misleading, or risky: a claim that
  contradicts the code or the screen, a number that's off, a stale note, a clip-independence
  slip, an overstatement.

Then: apply what she approves, and update durations + notes.

---

## What to check

- **Grammar & typos** (A).
- **Technical accuracy vs the code** (C) — see "Before reviewing."
- **Narration matches the screen** (C) — if the agent flagged a nuance on screen (e.g. a
  `/health` route that's uncalled but must NOT be deleted), the narration must not overstate
  ("almost 10, all can be removed"). The words describe the real recording.
- **Directional / technical correctness** (C) — who-calls-whom, what each phase actually does.
- **Clip independence** — no "previous clip / earlier we did / as we saw / coming up."
  Re-establish context locally. Flag soft slips ("based on the previous research" →
  "Earlier, we identified…").
- **Cross-clip consistency** — numbers and terms match sibling clips (e.g. "28 endpoints"
  everywhere; token names; the threaded thesis). Mismatches between clips are confusing.
- **Reconcile the planning note / brief with what was recorded** — the `[demo time]` note
  or brief often drifts from reality (e.g. a brief's 3 planned phases vs a recorded 5). The
  **transcript is the source of truth**; condense or replace the stale note so it doesn't
  contradict the recording.
- **Thread still lands** — the demo narration should reinforce the clip's threaded thesis and
  set up the close.

---

## Reads-aloud (sayability) pass

Cheapest *before* recording — but since this skill always runs **post-record**, treat each
flagged word as an audio re-record (the locked screen stays; only the voiceover changes). Read
the spoken copy (slides *and* demo narration) as if saying it out loud, and flag anything hard
to deliver. Treat these as **(B)** — they change wording, so they're Eva's call — and always
offer a smoother spoken alternative.

- **Tongue-twisters / words Eva trips on.** Canonical example: **"throughput"** (Eva won't
  say it — use "output" or "speed"). Watch for technical words that are easy to type but
  awkward to say. Keep a running list of words she's rejected and pre-flag them.
- **Consonant pile-ups and accidental alliteration** — phrases that knot the tongue.
- **Symbols / code / paths that don't speak.** Inline code read aloud is rough —
  `var(--dc-spacing-md)` becomes "var dash dash dc dash spacing dash em-dee." If she'll say
  it on camera, give a spoken form ("the spacing token") or flag it.
- **Run-on sentences with no breath point** — suggest a break or a full stop.
- **Numbers / acronyms** — make sure they're sayable as written ("19" is fine; spell out or
  rephrase things like "v8.2.1" if she'll voice them).

If a flagged word is already recorded, the swap is an audio re-record (the video stays).

---

## Duration & notes — speaking time only

**Count speaking time only. Never account for "waiting time"** (agent thinking, screen
pauses, scrolling, loading). The voiceover word count *is* the duration the skill reports.
The raw video may run longer than the voiceover; that is **not** this skill's concern — if
Eva wants the true clip length, give her the speaking-time figure and ask her for the
recorded video length, but the skill's number is always speaking time.

- **Rates:** slide narration ≈ **140 wpm**; demo narration ≈ **145 wpm** (Eva talks a little
  faster on demos). These are Eva's measured pace.
- **Count spoken words only** — exclude screen cues (`[slideshow]`, `[demo time]`,
  `[back to slides]`), HTML-comment notes, the header line, and the "Notes for Eva" sidebar.
  **Verify with a tool, never eyeball.** Count the slide segments (under `[slideshow]` /
  `[back to slides]`) and the demo segment (under `[demo time]`) **separately**, because they
  use different wpm.
- A reliable counter walks the body, tracks the current cue, and sums words per segment, e.g.:

  ```python
  import re
  body = open(path).read().split('## Notes for Eva')[0].split('\n---\n',1)[1]
  body = re.sub(r'<!--.*?-->', '', body, flags=re.DOTALL)   # drop note comments
  mode='slide'; sw=dw=0
  for ln in body.splitlines():
      s=ln.strip()
      if not s or s=='---' or s.startswith('#'): continue
      if s=='[demo time]': mode='demo'; continue
      if s=='[back to slides]': mode='slide'; continue
      if s.startswith('[') and s.endswith(']'): continue
      n=len(s.split())
      dw,sw=(dw+n,sw) if mode=='demo' else (dw,sw+n)
  # slides: sw/140 min ; demo: dw/145 min ; total = sum
  ```

- **Report:** slides (words → min @140) + demo voiceover (words → min @145) = total.
- **Update the header line** (Total clip duration / Demo portion / Spoken slide budget) and
  the **Notes word-count line** to match. Once a demo is recorded and transcribed, change
  "narrated live, not scripted here" → "recorded; voiceover transcribed below," and split the
  count into slides + demo.
- Keep the **safest-cut**, **thread**, **clip-independence**, **demo**, and
  **swappable-reference** notes accurate to the current text after edits.
- No-demo clips are all slides @140; same word-count rules.

---

## Process

1. Read the script + brief; verify claims against the code; ask Eva about anything only the
   screen can confirm.
2. Present findings as **(A) / (B) / (C)** with quotes and before → after.
3. Apply the fixes Eva approves — audio-recordable only.
4. Recompute **speaking-time** durations and update the header + Notes.
5. Re-verify the counts with the tool after editing.

---

## Gotchas this skill exists to catch

- Reversed technical directions ("the backend calls the frontend").
- Numbers that don't match the code or the screen — and overstatements like "all can be
  removed" when one item (e.g. a health check) must stay.
- Stale token/variable names (`--dp-` vs `--dc-`).
- A planning note that no longer matches the recorded demo (phase counts, beat order).
- Soft clip-independence slips.
- Counting waiting time as duration — don't; speaking time only.
