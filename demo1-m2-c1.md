For this example, we will be using Claude Code and improving a React and Node.js application. Once we have our IDE open, let's go and select Plan mode. This will allow us to create a migration plan without implementing any code changes.
Our prompt will focus on requesting a code quality audit of the codebase covering 2 main dimensions plus a bonus.
First, we will focus on our class components. We will ask it to list each one and rank by migration complexity. Simple, medium and complex.
Then we will ask it to run an audit of architectural debt, where we'll ask it to find oversized files, mixed responsibilities, duplicated logic, and so on and so forth.
Last, we'll ask it to find dead code, which is a very nice bonus because something every developer loves is deleting code that is not needed. So, we will ask it to find any imports that are never used, functions that are defined but never called and commented-out code blocks that look stale.
We will save the result of this audit as a migration audit markdown file at the root of the repository and we will focus mostly on those three things. Let's make sure to mention that we don't need to focus right now on performance or dependency analysis because those areas will be covered later.
Alright, let's send it and wait for a couple of minutes, be patient because it might take a while. As you can see, while it is processing, it is requesting separate agents to go and research different parts of the codebase based on the prompt that we have just sent.
Once it's done, it will open this plan file.
It starts by mentioning a little bit of the context that it has from the repository and also from the prompt and the request that we made. Let's take a look at our findings!
It begins with Section 1. The class components that we requested. As you can see, it categorizes our class components into three different categories. Complex, which will require lots of testing and even a little bit of extra work before migrating. Medium and simple, which are the ones we can quickly migrate to functional components without any issues.
Next it moves on to Section 2, which is architectural debt. In here it mentions, for example, oversized files, files that have mixed responsibilities and duplicated logic. Quick hits that will allow us to improve the codebase quality.
The last section is DEAD code. These include things like unused imports, functions that are never called, or even unused exports or files. This is the code that we can quickly delete to clean up a little bit of our repository.
At the very end, it has a verification section where it mentions how it found this data.
If we want to test the result of this audit, we can switch back to auto-edit mode and ask it to delete an unused file based on the audit it has just made.
