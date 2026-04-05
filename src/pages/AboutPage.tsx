import { Link } from 'react-router-dom'

export function AboutPage() {
  return (
    <div className="rounded-2xl border border-stone-300/80 bg-[#faf8f5]/95 p-8 shadow-[0_12px_40px_-12px_rgba(28,25,23,0.15)] ring-1 ring-stone-900/5 sm:p-12">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-900/80">
        About this site
      </p>
      <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
        A reader-friendly search interface for the book catalog.
      </h1>
      <Link
        to="/"
        className="mt-10 inline-flex rounded-full border-2 border-stone-900 bg-stone-900 px-6 py-2.5 text-sm font-semibold text-[#faf8f5] shadow-md transition hover:border-amber-900 hover:bg-amber-950"
      >
        Back to catalog
      </Link>
    </div>
  )
}
