import { NavLink, Outlet } from 'react-router-dom'

function navTab({ isActive }: { isActive: boolean }) {
  return [
    'rounded-lg px-4 py-2 text-sm font-semibold tracking-wide transition',
    isActive
      ? 'bg-stone-900 text-[#faf8f5] shadow-md shadow-stone-900/20'
      : 'text-stone-600 hover:bg-white/80 hover:text-stone-900',
  ].join(' ')
}

export function AppLayout() {
  return (
    <div className="relative min-h-svh overflow-x-hidden bg-[#f0ebe3] font-sans text-stone-900 antialiased">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -left-32 top-0 h-[24rem] w-[24rem] rounded-full bg-amber-200/35 blur-3xl" />
        <div className="absolute -right-24 top-32 h-[20rem] w-[20rem] rounded-full bg-rose-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-stone-300/25 blur-3xl" />
      </div>

      <header className="sticky top-0 z-10 border-b border-stone-300/60 bg-[#faf8f5]/85 shadow-sm shadow-stone-900/5 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <NavLink
            to="/"
            end
            className="group flex items-center justify-center gap-3 sm:justify-start"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-900 text-[#faf8f5] shadow-md ring-2 ring-amber-900/20 transition group-hover:ring-amber-700/40">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden
              >
                <path d="M11.25 4.533A9.707 9.707 0 006 3.493v11.07A9.706 9.706 0 0112 16.5a9.71 9.71 0 016 1.063V4.493a9.708 9.708 0 01-5.25-1.04v13.044A1.125 1.125 0 0111.25 18h-1.5a1.125 1.125 0 01-1.125-1.125V4.533zM12.75 20.636a8.284 8.284 0 001-1.064v-2.065a8.63 8.63 0 00-1-.064v2.129zM18 3.495a8.755 8.755 0 011.25.91v11.07a8.5 8.5 0 01-1.25.91V3.495z" />
              </svg>
            </span>
            <span className="text-left">
              <span className="font-serif text-lg font-semibold tracking-tight text-stone-900 sm:text-xl">
                Find That Book
              </span>
              <span className="block text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
                Catalog search
              </span>
            </span>
          </NavLink>
          <nav
            className="flex items-center justify-center gap-1 rounded-xl border border-stone-200/90 bg-[#f5f0e8]/90 p-1 shadow-inner sm:justify-end"
            aria-label="Main"
          >
            <NavLink to="/" end className={navTab}>
              Browse
            </NavLink>
            <NavLink to="/about" className={navTab}>
              About
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="relative mx-auto max-w-5xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
        <Outlet />
      </main>

      <footer className="relative border-t border-stone-300/50 bg-[#ebe4d8]/80 py-8 text-center text-xs text-stone-500 backdrop-blur-sm">
        <p className="mx-auto max-w-lg px-4">
          Results link to{' '}
          <a
            href="https://openlibrary.org"
            className="font-medium text-stone-700 underline decoration-stone-400 underline-offset-2 hover:text-rose-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Library
          </a>
          . Covers and metadata may vary by edition.
        </p>
      </footer>
    </div>
  )
}
