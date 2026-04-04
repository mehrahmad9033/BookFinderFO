import { useState, type FormEvent } from 'react'

export interface SearchBarProps {
  onSearch: (query: string) => void
  disabled?: boolean
  loading?: boolean
}

function Spinner() {
  return (
    <span className="relative inline-flex h-5 w-5" aria-hidden>
      <span className="absolute inset-0 rounded-full border-2 border-[#faf8f5]/25" />
      <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[#faf8f5] border-r-[#faf8f5]/80" />
    </span>
  )
}

export function SearchBar({ onSearch, disabled, loading = false }: SearchBarProps) {
  const [query, setQuery] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="rounded-2xl border border-stone-300/80 bg-[#faf8f5]/95 p-2 shadow-[0_12px_40px_-12px_rgba(28,25,23,0.18)] ring-1 ring-stone-900/5 sm:p-2.5">
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-2">
          <div className="relative min-h-12 flex-1">
            <span
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
              aria-hidden
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='e.g. “twain huckleberry river boy”'
              disabled={disabled}
              autoComplete="off"
              className="min-h-12 w-full rounded-xl border border-stone-200/90 bg-white py-3 pl-12 pr-4 text-base text-stone-900 shadow-inner outline-none ring-0 transition placeholder:text-stone-400 focus:border-amber-800/40 focus:ring-2 focus:ring-amber-800/20 disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="Search the catalog"
            />
          </div>
          <button
            type="submit"
            disabled={disabled}
            aria-busy={loading}
            className="relative min-h-12 min-w-[10.5rem] shrink-0 overflow-hidden rounded-xl bg-gradient-to-b from-amber-900 to-rose-950 px-6 py-3 text-base font-semibold text-[#faf8f5] shadow-[0_4px_14px_-3px_rgba(69,10,10,0.45)] transition hover:from-amber-800 hover:to-rose-900 hover:shadow-[0_6px_20px_-4px_rgba(69,10,10,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-900 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-90 disabled:active:scale-100 data-[busy=true]:shadow-[0_6px_24px_-4px_rgba(120,53,15,0.4)]"
            data-busy={loading || undefined}
          >
            {loading ? (
              <>
                <span
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent animate-[search-shimmer_1.25s_ease-in-out_infinite]"
                  aria-hidden
                />
                <span className="relative flex items-center justify-center gap-2.5">
                  <Spinner />
                  <span className="text-[0.95rem] font-semibold tracking-wide text-[#faf8f5] drop-shadow-sm">
                    Searching
                  </span>
                </span>
              </>
            ) : (
              <span className="relative">Search catalog</span>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
