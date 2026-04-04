import { useCallback, useState } from 'react'
import type { BookCandidate } from '../types/book'

function apiBase(): string {
  const raw = import.meta.env.VITE_API_URL?.trim()
  if (raw) return raw.replace(/\/$/, '')
  return 'https://localhost:7156'
}

export interface UseBookSearchResult {
  candidates: BookCandidate[]
  loading: boolean
  error: string | null
  hasSearched: boolean
  search: (query: string) => Promise<void>
  retry: () => Promise<void>
}

export function useBookSearch(): UseBookSearchResult {
  const [candidates, setCandidates] = useState<BookCandidate[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [lastQuery, setLastQuery] = useState('')

  const runSearch = useCallback(async (query: string) => {
    const trimmed = query.trim()
    if (!trimmed) {
      setError('Please enter a search query.')
      setCandidates([])
      setHasSearched(true)
      return
    }

    setLastQuery(trimmed)
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${apiBase()}/api/book-search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmed }),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `Request failed (${res.status})`)
      }

      const data = (await res.json()) as { candidates?: BookCandidate[] }
      const list = Array.isArray(data.candidates) ? data.candidates : []
      setCandidates(list.slice(0, 5))
      setHasSearched(true)
    } catch (e) {
      const message =
        e instanceof Error ? e.message : 'Something went wrong. Try again.'
      setError(message)
      setCandidates([])
      setHasSearched(true)
    } finally {
      setLoading(false)
    }
  }, [])

  const retry = useCallback(() => runSearch(lastQuery), [lastQuery, runSearch])

  return {
    candidates,
    loading,
    error,
    hasSearched,
    search: runSearch,
    retry,
  }
}
