# Clip 2: Exploring the Codebase with AI — Script Draft

# **Total clip duration:** 5:00 min **Demo portion:** \~2:30 (TBD content — placeholder below) **Spoken script budget:** \~2:30 min (375 words ±37 per the ±15 sec tolerance) **Voice:** Eva — collaborative, warm, direct, conversational **Threaded thesis:** *understanding / mental model* — same vocabulary as Clip 1's closing so the course feels connected for sequential viewers, but the clip stands on its own for anyone arriving cold **Outline coverage status:** All bullets covered (see checklist at bottom)

# ---

# When we walk into a legacy system, the hardest part is often not the code itself. It is that we have lost the mental model we need to change it safely. So let's talk about how we rebuild that mental model.

SLIDE

# First we understand, then we refactor. We cannot improve what we cannot understand. So let's talk about how we get that clarity back.

SLIDE

When we walk into an unfamiliar codebase, we are usually fighting all of these at once. **Unfamiliar architecture**. **Unclear ownership** of which team owns which part. **Outdated patterns** that no one uses anymore but the system still depends on. **Missing or stale documentation**. And **hidden dependencies** that only reveal themselves when something breaks.

# SLIDE

# This is where AI becomes our compass.

# AI plays three roles here. It is a **navigator**, helping us move through unfamiliar territory. It is a **translator**, turning code we do not understand into language we do. And it is an **explainer**, surfacing the why behind a pattern, not just the what.

# Concretely, AI can summarize folders and modules so we can see the shape of the system at a glance. It can explain how parts of the system relate to each other. It can trace execution flows from a user action all the way down to the database. It can identify the entry points we should start reading from. And it can explain unfamiliar patterns we have never seen before.

# 

# \[demo time\]

# So let's take a look at how this works in practice.

# *\[Demo runs here — approximately 2:30. Content TBD by Eva. Likely candidates from the broader outline: auditing for inconsistencies, fixing documentation gaps, adding instructions to coding agents like Claude / Cursor / Codex.\]*

# 

# \[back to slides\]

# Now, as we have seen, there’s something important we need to take into account. Don't ask AI to understand everything at once. Large codebases exceed context windows, and a vague "explain this repo" prompt will give us a vague answer back. Precise prompts work better. Pick one module, one flow, one file. Iterate and build your understanding piece by piece.

# \[slideshow\]

# And once we understand the system, it is time to upgrade it.