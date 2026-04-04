import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="rounded-2xl border border-dashed border-stone-400/50 bg-[#faf8f5]/90 px-8 py-16 text-center shadow-inner sm:py-20">
      <p className="font-serif text-7xl font-semibold tabular-nums text-stone-200">
        404
      </p>
      <h1 className="mt-2 font-serif text-2xl font-semibold text-stone-900">
        This page is missing
      </h1>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-stone-600">
        The URL is not in our catalog. Return to browse and search from there.
      </p>
      <Link
        to="/"
        className="mt-10 inline-flex rounded-full border-2 border-stone-900 bg-stone-900 px-6 py-2.5 text-sm font-semibold text-[#faf8f5] shadow-md transition hover:border-amber-900 hover:bg-amber-950"
      >
        Open catalog
      </Link>
    </div>
  )
}
