First, let's open our application. I don't know if you've already given it a shot on your own laptop, but on my computer, at least, it isn't as smooth as it should be. So I'm going to open the network tab and take a look at what's going on.
And look at that, this is definitely a problem. As you can see, requests are piling up one after the other. It looks like we are fetching revenue-by-plan and MRR every half a second. This can't be good!
This is a real performance issue — and it also means our cloud bill is going to be wild, for requests we don't even need. We probably don't need to refresh this data every half a second. So let's take our concern to our AI agent, ask what's going on, and see if it can help.
It seems like our AI agent found the culprit. A useEffect whose dependency isn't stable — it gets rebuilt on every render, so React thinks it changed and re-runs the effect every time, re-fetching the same data over and over. There also seems to be a Force Refresh button somewhere on the page that is supposed to be refetching data, but on demand, not constantly. It’s this button at the bottom of the page. We don't want to remove it, we just want it to work as expected.
Claude has presented its plan to break that loop, so the data only loads when it actually needs to. At the end of the plan, it tells us how to verify the fix — running the application again and making sure we're not stuck re-fetching like we are right now.
Let’s send it!
Once done, it does a quick recap of its work and how it fixed the loop. Let’s take a look at the diff to understand the changes better and then, let’s re-run the app to confirm this has been fixed!
Immediately the app feels much smoother on my machine and if we take a look at the network tab, there's nothing wild going on as before. Let’s refresh just in case to validate what loads up front, so we can confirm nothing strange happens.
We can also validate the same thing by looking at the terminal. Before this change, we used to have a million requests going on and now it's all quiet.
Finally, I want to send one more prompt to this session. Based on what we just found, it's likely there are other performance issues or bottlenecks in the app. So let's ask Claude to audit the DataCats application and save that audit as a markdown file at the root of the repository.
There it is! Claude has found a couple of additional performance issues in both the frontend and backend. It has kindly organized them by severity. Whenever we feel ready to tackle them, we now know that they exist!


