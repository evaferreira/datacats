# Demo Brief — Module 3, Clip 1: Identifying Dead API Endpoints

## What this demo covers
Using AI to cross-reference backend routes against frontend API calls in a single pass —
the kind of whole-repo question that is painful to answer by hand and is exactly where AI
earns its keep on a large codebase. The goal is to sort endpoints into three buckets:
**truly uncalled**, **still wired to the UI but obsolete** (the dangerous middle), and
genuinely active.

## ⚠️ Reality check — verified against the code (read before scripting)
The original brief claimed "`legacyExport.js` — entire file is dead." That is **not
accurate**. A frontend cross-reference shows **2 of its 3 routes are still called from the
UI**. Of the six removal candidates, only **four are truly uncalled**; the other **two are
"zombies"** — reachable from a live component but pointing at obsolete, fake-data endpoints.

**Truly dead — no frontend caller, safe to flag for removal:**
- `GET  /api/v1/reports/export` — replaced by a third-party tool, never removed ([reports.js:66](backend/routes/reports.js#L66))
- `POST /api/v1/reports/schedule` — never finished ([reports.js:71](backend/routes/reports.js#L71))
- `GET  /api/v1/legacy/export/pdf` — returns 501 Not Implemented ([legacyExport.js:23](backend/routes/legacyExport.js#L23))
- `POST /api/v1/settings/migrate` — one-off 2022 data migration, never cleaned up ([settings.js:92](backend/routes/settings.js#L92))

**Called-but-obsolete — "zombies," NOT safe to delete blind:**
- `GET  /api/v1/legacy/export/csv` — called by [ApiKeyManager.jsx:57](frontend/src/components/settings/ApiKeyManager.jsx#L57) (`handlePreviewExport`). The endpoint returns a **hardcoded 2-row CSV**, so the "Preview export" feature renders stale, fake data.
- `POST /api/v1/legacy/export/bulk` — called by [UserExportButton.jsx:16](frontend/src/components/users/UserExportButton.jsx#L16). The endpoint **fabricates a random `jobId` and does nothing**, so the "Export users" button looks successful but is a no-op.

Why this matters for the clip: a naive "grep for dead routes and delete them" would break
two on-screen features — and those features are arguably broken already. That is the
large-codebase lesson worth landing: **"dead" is a claim you verify by reading both sides
of the call, not a grep result.** It is also the natural bridge into the cross-cutting
planning work (retire vs. migrate, and coordinate the caller changes *before* the deletion).

## What to demonstrate
1. Ask the AI to list all registered API endpoints in the backend (server.js + all route files)
2. Ask the AI to search the frontend `src/` for all fetch/API calls and extract the URLs
3. Ask the AI to cross-reference: which backend endpoints are never called from the frontend?
4. Push on `routes/legacyExport.js` specifically — the payoff is the AI discovering that 2 of its 3 routes ARE still called (ApiKeyManager, UserExportButton), so the file is not cleanly dead
5. Ask the AI to update `ENDPOINT_REGISTRY.md` with its findings, **splitting "truly uncalled" from "called but obsolete,"** and flag removal candidates accordingly

## What to ignore for this clip
- Fixing or removing anything (just identify and classify)
- Planning the retirement or rewiring the zombie callers (that is the cross-cutting planning clip)
- Frontend duplicate fetch patterns (Module 2)

## Suggested opening AI prompt
"I want to identify dead API endpoints in this codebase. Can you:
1. List all routes registered in the backend (server.js + all route files)
2. Search the frontend src/ for all API calls and extract the endpoint URLs
3. Cross-reference them and tell me which backend endpoints are never called from the frontend"

(Then push further: "For anything that looks dead, double-check whether a component still
calls it — I don't want to remove something the UI depends on." This is what surfaces the
two zombies.)

## Key files to reference
- `backend/server.js` — where all five routers are mounted ([server.js:37](backend/server.js#L37))
- `backend/routes/legacyExport.js` — 3 routes; `pdf` is dead, `csv` + `bulk` are still called from the UI
- `backend/routes/reports.js` — 2 truly-dead endpoints (`export`, `schedule`)
- `backend/routes/settings.js` — 1 truly-dead endpoint (`migrate`)
- `backend/ENDPOINT_REGISTRY.md` — the incomplete audit to complete (added on the recording branch; not present on `module2`)
- `frontend/src/utils/api.js`, `apiHelpers.js`, `apiClient.js` — the 3 fetch clients (the cross-reference must account for all three)
- `frontend/src/components/settings/ApiKeyManager.jsx`, `frontend/src/components/users/UserExportButton.jsx` — the two zombie callers

## Removal candidates (6 total — but only 4 are clean)
- ✅ Safe to flag: `GET /api/v1/reports/export`, `POST /api/v1/reports/schedule`, `GET /api/v1/legacy/export/pdf`, `POST /api/v1/settings/migrate`
- ⚠️ Needs a caller decision first: `GET /api/v1/legacy/export/csv` (ApiKeyManager), `POST /api/v1/legacy/export/bulk` (UserExportButton)
