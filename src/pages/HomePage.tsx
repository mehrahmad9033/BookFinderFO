import { SearchBar } from '../components/SearchBar'
import { ResultsList } from '../components/ResultsList'
import { EmptyState } from '../components/EmptyState'
import { useBookSearch } from '../hooks/useBookSearch'

export function HomePage() {
  const { candidates, loading, error, hasSearched, search, retry } =
    useBookSearch()

  const showInitialEmpty = !hasSearched && !loading && !error
  const showNoResults =
    hasSearched && !loading && !error && candidates.length === 0
  const showResults =
    hasSearched && !loading && !error && candidates.length > 0
  const showStaleWhileLoading =
    loading && !error && candidates.length > 0 && hasSearched

  const showList = showResults || showStaleWhileLoading

  return (
    <>
      <header className="mb-10 text-center sm:mb-12 sm:text-left">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-900/15 bg-amber-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-900/90 shadow-sm">
          <span
            className="h-1.5 w-1.5 rounded-full bg-amber-600"
            aria-hidden
          />
          Ebook catalog
        </p>
        <h1 className="font-serif text-4xl font-semibold leading-[1.15] tracking-tight text-stone-900 sm:text-5xl md:text-[2.75rem]">
          Find the title
          <span className="text-stone-500"> you can almost remember</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-stone-600 sm:mx-0 sm:text-lg">
          Type a messy query  , scraps of title, author, year, or plot  and
          we will list likely matches from the catalog, with a short note on why each one fits.
        </p>
      </header>

      <SearchBar onSearch={search} disabled={loading} loading={loading} />

      {error ? (
        <div
          className="mt-8 rounded-2xl border border-red-200/90 bg-red-50/95 px-5 py-4 text-sm text-red-950 shadow-md ring-1 ring-red-900/10"
          role="alert"
        >
          <p className="mb-4 font-medium leading-relaxed">{error}</p>
          <button
            type="button"
            onClick={() => void retry()}
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-red-900 shadow-sm ring-1 ring-red-200 transition hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800"
          >
            Try again
          </button>
        </div>
      ) : null}

      <section className="mt-12 sm:mt-14" aria-labelledby="results-heading">
        {showList ? (
          <div className="mb-6 flex items-end justify-between gap-4 border-b border-stone-300/70 pb-3">
            <h2
              id="results-heading"
              className="font-serif text-xl font-semibold text-stone-900 sm:text-2xl"
            >
              {loading ? 'Refreshing…' : 'Your matches'}
            </h2>
            {!loading && candidates.length > 0 ? (
              <span className="text-sm font-medium tabular-nums text-stone-500">
                {candidates.length}{' '}
                {candidates.length === 1 ? 'title' : 'titles'}
              </span>
            ) : null}
          </div>
        ) : null}

        {error ? null : showNoResults ? (
          <EmptyState variant="no-results" />
        ) : showInitialEmpty ? (
          <EmptyState variant="initial" />
        ) : showList ? (
          <div
            className={
              showStaleWhileLoading
                ? 'pointer-events-none opacity-40 transition-opacity duration-300'
                : undefined
            }
          >
            <ResultsList candidates={candidates} />
          </div>
        ) : null}
      </section>
    </>
  )
}
