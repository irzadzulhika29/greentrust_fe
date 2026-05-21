import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Wrapper around fetch that injects headers needed for ngrok tunnels.
 */
export function apiFetch(url, options = {}) {
  const headers = new Headers(options.headers ?? {})
  headers.set('ngrok-skip-browser-warning', '1')
  return fetch(url, { ...options, headers })
}

/**
 * Decode the auth JWT and return its payload.
 * Returns null if token is missing or malformed.
 * Payload shape: { UserID, RoleName, exp }
 */
export function getAuthPayload() {
  try {
    const token = localStorage.getItem('auth_token')
    if (!token) return null
    return JSON.parse(atob(token.split('.')[1]))
  } catch {
    return null
  }
}

/**
 * Perform a proposal action: send | accept | reject
 * Returns the updated proposal data on success, throws on failure.
 */
export async function proposalAction(proposalId, action) {
  const token = localStorage.getItem('auth_token') ?? ''
  const res = await apiFetch(
    `${import.meta.env.VITE_BASE_API}/proposals/${proposalId}/${action}`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  const json = await res.json()
  if (!res.ok) throw new Error(json?.message ?? `Error ${res.status}`)
  return json.data
}
