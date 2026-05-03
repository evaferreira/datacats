// DEPRECATED — use ./config.js instead.
// Kept around because UserTable, ReportTable, and ApiKeyManager still import from here.
// TODO: remove in v2

export const API_BASE = '/api'                 // missing /v1 prefix vs. config.js
export const APP_VERSION = '7.4.0'             // stale
export const DEFAULT_PAGE_SIZE = 50            // different from config.js (25)
export const MAX_PAGE_SIZE = 250               // different from config.js (100)
export const BRAND_PRIMARY = '#1d4ed8'         // different blue from config.js (#2563eb)
export const SUPPORT_EMAIL = 'help@datacats.local'
export const HEALTH_LABELS = {
  high: 'Healthy',
  mid: 'Watch',
  low: 'At-risk',
}
