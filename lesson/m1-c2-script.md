# Clip 2: Exploring the Codebase with AI — Script Draft

# **Total clip duration:** \~5:00 min **Demo portion:** \~2:30 (narrated over screen recording, \~400 words) **Spoken script budget:** \~5:00 min (\~750 words ±75 per the ±10% tolerance — \~350 words on slides + \~400 words narrating the demo) **Voice:** Eva — collaborative, warm, direct, conversational **Threaded thesis:** *understanding / mental model* — same vocabulary as Clip 1's closing so the course feels connected for sequential viewers, but the clip stands on its own for anyone arriving cold **Outline coverage status:** All bullets covered (see checklist at bottom)

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

# Let's imagine we have just joined a company and we are given this project. We can easily understand that it has a front end and a back end. But the README is very, very small. It doesn't tell us anything about it. So let's go into Gemini Code Assist or a similar AI tool and let's ask… What does this app do? Explain the backend and the frontend at a high level for me.

# Gemini will analyze it, it will let us know that it's an analytics dashboard called Data Cats. And that the front end is divided into different pages. We have a dashboard, data reporting, user management and settings.

# Next it begins to explain a little bit about the back end. This is an Express JS application running on Node JS and it has middleware and a couple of routing endpoints.

# Let's focus on the front end a little bit and ask how is the front end organized. What is inside the components UI directory and how this folder compares to what is used everywhere else.

# So Gemini answers that this is a common Create React App repository, organized into a components folder, pages, styles, utils, and constants.

# And it mentions that the components UI directory seems to be a component library that is not used very much. It seems like most of the files are waiting to be used, and only one of them right now is being imported. Other components are coming directly from the Bootstrap library.

# This helps us wonder whether we have duplicated components both in bootstrap and in our library that we could clean up.

# This is the type of audit research that AI tools do very well. They can quickly identify duplicated components such as cards, buttons, badges and more.

# So now that we know a little bit more about our code base, let's ask our AI assistant to write an AGENTS markdown document at the root of the repository. This could include an overview of what the application is, the key directories and what lives in each. The design system situation where it looks like we have Bootstrap plus an internal design system that isn't used very much. And anything else a contributor, whether human or AI, should know before making changes.

# This can also include preferences such as whether you'd rather new components be class or functional.

# You can name this file AGENTS to make it tool-agnostic, but you can also name it CLAUDE.md or GEMINI.md.

# And that's how we rebuild a mental model when we walk into an unfamiliar codebase.

# 

# \[back to slides\]

# Now, as we have seen, there’s something important we need to take into account. Don't ask AI to understand everything at once. Large codebases exceed context windows, and a vague "explain this repo" prompt will give us a vague answer back. Precise prompts work better. Pick one module, one flow, one file. Iterate and build your understanding piece by piece.

# \[slideshow\]

# And once we understand the system, it is time to upgrade it.