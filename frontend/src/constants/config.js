export const API_BASE = '/api/v1'
export const APP_VERSION = '8.2.1'
export const DEFAULT_PAGE_SIZE = 25
export const MAX_PAGE_SIZE = 100
export const SUPPORT_EMAIL = 'support@datacats.local'
// Brand color lives in the design tokens (--dc-primary in src/styles/main.css),
// not here — reference var(--dc-primary) in styles instead of a JS constant.
export const HEALTH_THRESHOLDS = {
  good: 75,
  warning: 50,
  danger: 25,
}
export const POLL_INTERVAL_MS = 30000
