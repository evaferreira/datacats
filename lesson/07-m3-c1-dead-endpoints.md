# Demo Brief — Module 3, Clip 1: Identifying Dead API Endpoints

## What this demo covers
Using AI to cross-reference backend routes against frontend API calls to identify
endpoints that are registered but never called — a common large-codebase problem.

## What to demonstrate
1. Ask the AI to list all registered API endpoints in the backend
2. Ask the AI to search the frontend for all fetch/API calls and extract the URLs
3. Ask the AI to cross-reference: which backend endpoints are never called from the frontend?
4. Ask the AI to check `routes/legacyExport.js` specifically — is anything in there called?
5. Ask the AI to update `ENDPOINT_REGISTRY.md` with its findings and flag removal candidates

## What to ignore for this clip
- Fixing the dead endpoints (just identify them)
- Frontend duplicate fetch patterns (Module 2)

## Suggested opening AI prompt
"I want to identify dead API endpoints in this codebase. Can you:
1. List all routes registered in the backend (server.js + all route files)
2. Search the frontend src/ for all API calls and extract the endpoint URLs
3. Cross-reference them and tell me which backend endpoints are never called from the frontend"

## Key files to reference
- `backend/server.js` — where all routes are registered
- `backend/routes/legacyExport.js` — entire file is dead
- `backend/routes/reports.js` — 2 dead endpoints
- `backend/routes/settings.js` — 1 dead endpoint
- `backend/ENDPOINT_REGISTRY.md` — the incomplete audit to complete
- `frontend/src/utils/api.js`, `apiHelpers.js`, `apiClient.js` — the 3 fetch clients

## Dead endpoints to find (6 total)
- GET /api/v1/reports/export
- POST /api/v1/reports/schedule
- GET /api/v1/legacy/export/csv
- GET /api/v1/legacy/export/pdf
- POST /api/v1/legacy/export/bulk
- POST /api/v1/settings/migrate
