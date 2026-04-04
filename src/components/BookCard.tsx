import type { BookCandidate } from '../types/book'

export interface BookCardProps {
  book: BookCandidate
}

function formatMatchStrength(raw: string): string {
  return raw
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .trim()
}

export function BookCard({ book }: BookCardProps) {
  const src = book.coverImageUrl?.trim() || null
  const extra =
    book.contributors && book.contributors.length > 0
      ? book.contributors.join(', ')
      : null
  const strength = book.matchStrength?.trim()
  const showMatchBadge = Boolean(
    strength && strength.length > 0 && strength !== 'None',
  )

  return (
    <article className="group relative flex flex-col gap-5 rounded-2xl border border-stone-300/70 bg-[#faf8f5] p-5 shadow-[0_8px_30px_-12px_rgba(28,25,23,0.2)] ring-1 ring-stone-900/[0.04] transition duration-300 hover:-translate-y-0.5 hover:border-amber-900/25 hover:shadow-[0_16px_40px_-14px_rgba(28,25,23,0.28)] sm:flex-row sm:gap-6 sm:p-6">
      <div className="mx-auto shrink-0 sm:mx-0">
        <div className="relative">
          <div
            className="absolute -right-1 top-2 h-[85%] w-3 rounded-sm bg-gradient-to-l from-stone-800/25 to-transparent opacity-60"
            aria-hidden
          />
          <div className="relative h-[11.25rem] w-[7.5rem] overflow-hidden rounded-md bg-stone-200 shadow-[4px_8px_24px_-4px_rgba(28,25,23,0.35),inset_0_1px_0_rgba(255,255,255,0.4)] ring-1 ring-stone-900/10 sm:h-[12.5rem] sm:w-[8.25rem]">
            {src ? (
              <img
                src={src}
                alt=""
                width={132}
                height={200}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
            ) : (
              <div
                className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-stone-100 to-stone-200 px-2 text-center"
                aria-hidden
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-10 w-10 text-stone-400"
                >
                  <path d="M11.25 4.533A9.707 9.707 0 006 3.493v11.07A9.706 9.706 0 0112 16.5a9.71 9.71 0 016 1.063V4.493a9.708 9.708 0 01-5.25-1.04v13.044A1.125 1.125 0 0111.25 18h-1.5a1.125 1.125 0 01-1.125-1.125V4.533z" />
                </svg>
                <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-stone-500">
                  No jacket
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="min-w-0 flex-1 space-y-3 text-left">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md border border-stone-200 bg-stone-100/90 px-2 py-0.5 font-sans text-xs font-semibold tabular-nums text-stone-600">
              {book.firstPublishYear}
            </span>
            {showMatchBadge && strength ? (
              <span
                className="rounded-md border border-amber-200/80 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-950/80"
                title="Match signal from the catalog"
              >
                {formatMatchStrength(strength)}
              </span>
            ) : null}
          </div>
          <h2 className="font-serif text-xl font-semibold leading-snug tracking-tight text-stone-900 sm:text-2xl">
            {book.title}
          </h2>
          <p className="text-sm font-medium uppercase tracking-[0.12em] text-stone-500">
            {book.author}
            {extra ? (
              <span className="font-normal normal-case tracking-normal text-stone-500">
                {' '}
                · {extra}
              </span>
            ) : null}
          </p>
        </div>
        <blockquote className="border-l-[3px] border-amber-800/50 bg-amber-50/50 py-3 pl-4 pr-3 font-serif text-[0.9375rem] leading-relaxed text-stone-700">
          {book.explanation}
        </blockquote>
        {book.workUrl ? (
          <a
            href={book.workUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-stone-800 bg-transparent px-4 py-2 text-sm font-semibold text-stone-900 transition hover:border-amber-900 hover:bg-stone-900 hover:text-[#faf8f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-900"
          >
            View on Open Library
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </a>
        ) : null}
      </div>
    </article>
  )
}
