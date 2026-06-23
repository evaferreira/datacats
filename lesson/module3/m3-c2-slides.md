**Clip 2: Choosing the Right Refactor Strategy**   (~4 minutes)

Different systems require different approaches. We will compare continuous cleanup strategies such as the Boy Scout Rule against batched migration initiatives designed for larger modernization programs. We will also compare active systems, dormant systems, ownership models, and release cadence.

## Slide outline

### Slide 1

**Title — "Choosing the right refactor strategy"**

Script note: *After understanding scale, we need an execution model. How does change move through the system.*

### Slide 2

**How does change move through the system?**

Not all systems absorb change the same way

Script note: *Not all systems absorb change the same way*

### Slide 3

**Migration strategies depend on two factors**

- Change capacity
- Coordination cost

### Slide 4

**Change capacity**

| Low change capacity | High change capacity |
| ----- | ----- |
| Daily releases | Dedicated migration window |
| Limited engineering time | Available engineer capacity |
| Customer deadlines | Slower release cadence |

### Slide 5

**Active systems differ from dormant**

| Dormant | Active |
| ----- | ----- |
| Few commits | Daily changes |
| Stable ownership | Multiple teams |
| Large migration window | Merge pressure |

Script note: *System activity affects coordination cost. Dormant usually high capacity. Active low.*

### Slide 6

**Coordination cost**

| Low coordination cost | High coordination cost |
| ----- | ----- |
| One team | Multiple teams |
| Clear ownership | Shared libraries |
| Isolated module | Cross-service dependencies |
| Independent deploy | Synchronized releases |

Script note: *Capacity alone doesn't tell us how difficult change will be. More coordination, slower execution*

### Slide 7

**Strategy selector**

|  | **Low change capacity** | **High change capacity** |
| ----- | ----- | ----- |
| **Low coordination cost** | **Continuous cleanup** — Boy scout rule | **Continuous + Opportunistic** — Gradual modernization |
| **High coordination cost** | **Hybrid strategy** — Standards + incremental rollout | **Dedicated strategy** — Coordinated execution |

Script note: *Safer execution | More coordinated execution. Match execution to system behavior.*

### Slide 8

**Most refactors have a hybrid strategy**

- Plan centrally
- Create examples
- Adopt incrementally
- Retire old patterns

Script note: *Not all systems absorb change the same way*

### Slide 9

**"Match execution to the behavior of your system."**
