import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function apiFetch(url, options = {}) {
  const headers = new Headers(options.headers ?? {})
  headers.set('ngrok-skip-browser-warning', '1')
  return fetch(url, { ...options, headers }).then((res) => {
    if (res.status === 401) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('reg_session_token')
      const isInvestorPath = window.location.pathname.startsWith('/investor')
      window.location.href = isInvestorPath ? '/investor/login' : '/login'
    }
    return res
  })
}

export function getAuthPayload() {
  try {
    const token = localStorage.getItem('auth_token')
    if (!token) return null
    return JSON.parse(atob(token.split('.')[1]))
  } catch {
    return null
  }
}

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
