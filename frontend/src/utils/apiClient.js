// rewriting this properly in v9 — for now just wrapping the old one

export function fetchWithAuth(url, config = {}) {
  return fetch(url, {
    method: config.method || 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('dc_access_token')}`, // yet another key!
      'Content-Type': 'application/json',
    },
    body: config.data ? JSON.stringify(config.data) : undefined,
  }).then(r => {
    if (!r.ok) throw { status: r.status, message: 'Request failed' }
    return r.json()
  })
}

export function get(url) {
  return fetchWithAuth(url, { method: 'GET' })
}

export function post(url, data) {
  return fetchWithAuth(url, { method: 'POST', data })
}
