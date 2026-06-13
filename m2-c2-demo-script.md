We are kicking off our migration based on the migration audit we did earlier. That audit lists several class components we can migrate to functional, and those are categorized as complex, medium and simple.
Let's begin with a simple one. Let's ask Claude to use this audit plan and migrate ActivityFeed, which is the first file we want to work on. Let's be clear that we want to have a functional component with hooks and that we must keep the behavior identical. So, let’s run it!
Once it’s done we can read the recap of the work it did. It's turned the file into a functional component using different hooks. For example, it modified the this.state to a useState hook, the componentDidMount to a useEffect and the timer interval to a useRef.
It also mentions some red flags in the original code. Many of those are currently preserved in the migrated component. This is ok, because they are out of scope based on what we requested. Remember the best thing we can do is go step by step. Once the migration is done, make sure to take a look at the diff, run the app and the tests to confirm it’s working as expected.
Next, let's work on the RevenueChart file to get another example.
In this scenario, something funny happened. Claude not only found a red flag, it also found an actual bug: the application is getting into an infinite loop!
Claude wants to know if we want to go ahead and fix it during this migration. Now, in this case, it makes sense to take this opportunity to fix the bug so our users can have a better experience.
Similar to our previous component, it also let us know which changes it made, how we turned it into a functional component, and how we replaced a few of the class methods with hooks. At the end it also mentions some red flags or some code smells which we can take a look at and work on in a future iteration.
Finally, don't forget to ask Claude or your AI to update the migration plan so we can track our progress and mark these as done.

