Let's put that to work on a single file: a dashboard page that has grown to around 460 lines of code. We'll do it in three beats. First, clean — we delete the dead code our audit already flagged. Then, extract — we pull the data-fetching out into its own custom hook. And finally, capture — we make a note of the new rules so they stick around. 460 lines of code, let's find out what they are doing!

[demo time]

First, let’s use our previous research, our migration audit file, as the basis to remove the code we know is not in use right now. Let's make sure to mention not to touch any working code. We're not refactoring yet. We're just cleaning the noise.

Once it finishes we can see that it has removed some unused functions, old Internet Explorer–specific code and stale commented-out code blocks. This lowers our lines of code from 455 to 375.

Now, we are ready for step two. You can do this in the same session or in a new one. We will ask our AI agent to decompose the file. We will ask it to review it and propose what should be a hook and what could move to existing utilities. Let’s make sure we keep our scope small, just refactor the file into a cleaner abstraction. For this prompt, don’t forget to use Plan mode.

Our AI agent has a question for us. Do we wish to have only one hook created for all our Dashboard page use cases, or split it into several? In this case, I’ll keep it as one dashboard data hook only for now.

Once the plan is done, we can iterate on it by adding comments. For example, we can add one more task to remove an old comment in the codebase that is not needed anymore.

Alright, let’s run it!

When it finishes, it displays a breakdown of the task it has done. And we have reduced a complex 460 lines of code into two clear, independently testable files. From now on, this will be easier to maintain, test, and collaborate on.

All this work began thanks to our migration audit file, so do not forget to request our AI agent to keep it up to date. Another valuable update is the line counts the audit references — by asking Claude to refresh the audit, we make sure those numbers stay accurate.

Finally, since this is our first file with a custom React hook, we will ask Claude to write guidelines for the next time we update or create components. Think about what usually happens otherwise — we refactor, we ship, we move on, and six months later someone reinvents the old pattern, simply because nobody wrote the new one down. So let's capture the rule now, while it's still fresh, for both humans and bots alike.
