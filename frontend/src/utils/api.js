// Author: Jake – Dec 2019
// Original auth-aware fetch helper.

export async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem('token')
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers
    }
  })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return response.json()
}
