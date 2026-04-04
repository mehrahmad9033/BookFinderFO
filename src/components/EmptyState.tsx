export interface EmptyStateProps {
  variant: 'initial' | 'no-results'
}

const copy: Record<EmptyStateProps['variant'], { title: string; hint?: string }> =
  {
    initial: {
      title: 'Search the catalog',
      hint: 'Enter a title fragment, author name, year, or anything you recall — then press Search catalog.',
    },
    'no-results': {
      title: 'No titles matched',
      hint: 'Try broader words, another spelling, or fewer filters in your query.',
    },
  }

export function EmptyState({ variant }: EmptyStateProps) {
  const { title, hint } = copy[variant]

  return (
    <div className="rounded-2xl border border-dashed border-stone-400/50 bg-[#faf8f5]/90 px-8 py-16 text-center shadow-inner ring-1 ring-stone-900/[0.03] sm:px-12 sm:py-20">
      <div
        className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-stone-200 text-amber-950/70 shadow-sm ring-1 ring-amber-900/10"
        aria-hidden
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.25}
          stroke="currentColor"
          className="h-8 w-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
          />
        </svg>
      </div>
      <p className="font-serif text-xl font-semibold text-stone-900 sm:text-2xl">
        {title}
      </p>
      {hint ? (
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone-600">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
