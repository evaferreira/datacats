// Author: Sarah – Oct 2021
// I couldn't get the original api.js to work with the new endpoints, so I made my own.

export async function fetchWithAuth(endpoint, options = {}) {
  const token = sessionStorage.getItem('authToken')  // different key!
  const res = await fetch(`/api/v1${endpoint}`, {    // adds prefix — different behavior!
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(err || `Request failed: ${res.status}`)
  }
  return res.json()
}
