Changes
1. Imports — added the hooks
import React, { useEffect, useRef, useState } from 'react'. Same React default plus the three hooks the conversion needs. The other imports (fetchWithAuth, formatRelativeTime, Badge) are untouched.

2. tone() → module-level function
The original tone() was an instance method but used nothing from this — pure severity → string mapping. I lifted it to a module-scope function so it isn't recreated on every render and reads as the pure helper it always was. Behavior is byte-identical.

3. this.state → two useState hooks
{ items: [], loading: true } becomes useState([]) and useState(true), same initial values. I split them rather than using one state object because the two updates don't always move together (the .catch only sets loading), and that's the idiomatic hooks shape.

4. Lifecycle → one useEffect(…, [])

componentDidMount did this.load() then started the 30s interval → the effect body does exactly that.
componentWillUnmount cleared the timer → the effect's returned cleanup does the same guarded if (timerRef.current) clearInterval(...).
Empty dependency array [] makes it run once on mount / clean up on unmount, matching the class exactly.
5. this.timer → useRef
The interval id lives in timerRef so it survives renders without triggering one — the direct analog of the instance field, as the audit suggested.

6. load moved inside the effect
The original load was a standalone method. I defined it inside the effect because that's the only place it's used and it keeps the effect's dependencies honest (nothing external to declare). setState({ items, loading }) became two setter calls.

7. render() → returned JSX
const { items, loading } = this.state is gone (the values come straight from the hooks). this.tone(...) became tone(...). The JSX is otherwise character-for-character identical.

Flags on the original
setState-after-unmount race (latent in the original, preserved here). If a fetchWithAuth is in flight when the component unmounts, its .then/.catch still calls the state setters — React warns and it's a small leak. The class had this exact bug; clearing the interval doesn't cancel an already-started fetch. I did not fix it, to keep behavior identical as you asked, but it's the one thing worth a follow-up (a cancelled flag in the cleanup closure would close it).

Duplicated status→tone mapping (out of scope here). MIGRATION_AUDIT.md:61 flags this tone/severity mapping as one of three copies (also in DashboardPage.jsx:54 and formatters.js:32). Not a bug, but a consolidation target for the architectural-debt pass — I left it in place since this task is the hooks migration only.

Remount-on-poll hack at the call site. DashboardPage.jsx:407 renders <ActivityFeed key={'feed-' + pollTick} />. Because the key changes, the parent can force-remount this component (the audit calls pollTick a "remount hack" at line 100). That's external to this file and behavior is unchanged, but be aware: a remount tears down and re-runs our useEffect, which is fine — the cleanup clears the old interval correctly.

Nothing else in the original looked wrong — the interval cleanup was already guarded, and the conversion is a faithful 1:1.

I didn't run a build/lint since the repo wasn't set up for it in this session; want me to run the frontend lint/test to confirm it compiles?

Next, let's work on @frontend/src/components/dashboard/RevenueChart.jsx , same approach
"Same approach" — but this one has props (dateRange) and a flagged componentDidUpdate bug, so I need to check the call site before I can preserve behavior faithfully.

Bash Find RevenueChart usage and dateRange prop
IN
grep -rn "RevenueChart" --include=*.js --include=*.jsx frontend/src | grep -v "dashboard/RevenueChart.jsx:"; echo "---dateRange usage---"; grep -rn "dateRange" --include=*.jsx frontend/src/pages/DashboardPage.jsx

OUT
frontend/src/pages/DashboardPage.jsx:5:import RevenueChart from '../components/dashboard/RevenueChart'
frontend/src/pages/DashboardPage.jsx:244:  const planRevenueChart = (planRevenue || []).map(p => ({ label: p.plan, value: p.revenue || 0 }))
frontend/src/pages/DashboardPage.jsx:343:          <RevenueChart dateRange={(startDate || '') + '|' + (endDate || '')} />
frontend/src/pages/DashboardPage.jsx:365:              <BarChart data={planRevenueChart} dataKey="value" xKey="label" height={220} />
---dateRange usage---
frontend/src/pages/DashboardPage.jsx:343:          <RevenueChart dateRange={(startDate || '') + '|' + (endDate || '')} />
Before I write this one, there's a real problem at the call site that changes how "keep behavior identical" should be applied.

dateRange is passed as a string: DashboardPage.jsx:343 renders <RevenueChart dateRange={(startDate || '') + '|' + (endDate || '')} />. That interacts badly with the flagged componentDidUpdate bug, and it's worse than the audit's ">= should be !==" note suggests:

componentDidUpdate fires after every update, including the re-render caused by fetchChartData's own setState.
On a state-triggered update, props haven't changed, so this.props.dateRange === prevProps.dateRange. The condition dateRange >= prevProps.dateRange is then "x|y" >= "x|y" → true.
So each fetch resolves → setState → componentDidUpdate → condition true → fetch again → … a continuous refetch loop hammering /metrics/mrr back-to-back (no spacing).
With !== (the audit's intended fix), a state-only update gives dateRange !== dateRange → false → no refetch, and it only re-fetches when dateRange actually changes. That's the idiomatic useEffect(..., [dateRange]) behavior.

So a literal behavior-preserving migration would reproduce an infinite loop, which is almost certainly not what anyone wants. How do you want me to handle it?

AskUserQuestion
OUT
Your questions have been answered: "The original RevenueChart's componentDidUpdate (`>=`) causes a continuous refetch loop. How should the migrated hooks version behave?"="Implement intended behavior". You can now continue with these answers in mind.
Good call. Here's the migration with the intended (loop-free) refetch behavior:

Write RevenueChart.jsx
46 lines
import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { fetchWithAuth } from '../../utils/apiHelpers'

function RevenueChart({ dateRange }) {
  const [series, setSeries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWithAuth('/metrics/mrr')
      .then(data => {
        const series = (data.history || []).map(p => ({ label: p.date, value: p.value }))
        setSeries(series)
        setLoading(false)
      })
      .catch(() => {
        setSeries([])
        setLoading(false)
      })
  }, [dateRange])

  return (
    <div className="card">
      <div className="card-header">Monthly Recurring Revenue</div>
      <div className="card-body" style={{ height: 280 }}>
        {loading ? (
          <div className="dc-loading">Loading chart…</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={series}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="label" stroke="#6b7280" fontSize={14} />
              <YAxis stroke="#6b7280" fontSize={14} />
              <Tooltip isAnimationActive={false} animationDuration={0} />
              <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} isAnimationActive={false} animationDuration={0} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

export default RevenueChart
</content>
Changes
1. Imports — useEffect, useState
Added the two hooks. recharts and fetchWithAuth imports unchanged. Note this file imports fetchWithAuth from apiHelpers (the sessionStorage('authToken') + /api/v1-prefixing variant), unlike ActivityFeed which used api — I left that as-is, but flag below.

2. dateRange prop destructured in the signature
function RevenueChart({ dateRange }) replaces this.props.dateRange. It's the only prop the component reads.

3. State → two useState hooks
{ series: [], loading: true } → useState([]) + useState(true), same initial values, split for the same reason as ActivityFeed (the .catch path sets both, but they're conceptually independent).

4. componentDidMount + componentDidUpdate → one useEffect(..., [dateRange])
This is the consolidation that fixes the bug, per your choice:

The empty-deps-equivalent mount fetch (componentDidMount) and the dateRange-driven refetch (componentDidUpdate) collapse into a single effect keyed on [dateRange].
It runs on mount and whenever dateRange actually changes — and crucially not on the component's own setState, because the dependency value is unchanged. That's the !== semantics the audit wanted, and it eliminates the continuous refetch loop.
5. fetchChartData inlined into the effect
Same as ActivityFeed — the method had one caller, so it lives in the effect. this.setState(...) → the setSeries/setLoading setters. The inner const series = ... mapping is byte-identical.

6. render() → returned JSX
const { series, loading } = this.state dropped (values come from hooks). JSX otherwise unchanged character-for-character.

Flags
The >= bug (now fixed, per your call). As discussed, the literal original continuously refetched. The migrated version fetches on mount + on real dateRange changes only. This is the one intentional behavior change in the diff — worth calling out explicitly in code review since a migration is normally behavior-preserving.

Same setState-after-unmount race as ActivityFeed. If a fetch is in flight when the component unmounts (or when dateRange changes mid-flight), the resolving .then/.catch still calls the setters. With the [dateRange] dep there's now also a stale-response race: if dateRange changes while a request is in flight, an out-of-order response could overwrite newer data. A cancelled flag (or AbortController) in the effect cleanup closes both. I left it out to keep the diff focused on the migration — happy to add it as a follow-up.

apiHelpers vs api inconsistency (architectural, out of scope). MIGRATION_AUDIT.md:48-57 flags three competing fetchWithAuth implementations with different token keys. This file uses apiHelpers (sessionStorage/authToken), so it authenticates differently than ActivityFeed/DashboardPage. Not touched here — that's the architectural-debt pass.

Want me to run the frontend lint/build to confirm both migrated files compile, or keep moving to the next component?