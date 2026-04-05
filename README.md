# Find That Book
 
---

## Set up and running

**What you need:** Node.js 20+ (or any current LTS that plays nicely with Vite 8) and npm.

1. Clone the repo and install dependencies:

   ```bash
   npm install
   ```

2. **Local API (optional):** If your backend runs somewhere other than the default, create a `.env` file in the project root:

   ```env
   VITE_API_URL=https://localhost:7156
   ```

   If you skip this, the app falls back to `https://localhost:7156` when `VITE_API_URL` is not set.

3. Start the dev server:

   ```bash
   npm run dev
   ```

   Open the URL Vite prints (usually `http://localhost:5173`).

4. **Production build:**

   ```bash
   npm run build
   ```

   Output goes to `dist/`. Vite loads `.env.production` for this command, which in this repo points the client at the hosted Azure API (see below).

5. **Preview the production build locally:**

   ```bash
   npm run preview
   ```

**Useful scripts**

| Command        | Purpose                                      |
| -------------- | -------------------------------------------- |
| `npm run dev`  | Dev server with HMR                          |
| `npm run build`| Typecheck + Vite production bundle → `dist` |
| `npm run preview` | Serve `dist` locally                    |
| `npm run lint` | ESLint over the codebase                     |

---

## Environment variables

| Variable         | When it applies | Purpose |
| ---------------- | --------------- | ------- |
| `VITE_API_URL`   | Optional in dev; set in `.env.production` for live builds | Base URL of the API **without** a trailing slash. Requests go to `{VITE_API_URL}/api/book-search`. |

---

## Overview of the implementation

The UI is a single-page experience built with **Vite**, **React 19**, and **TypeScript**. Styling is **Tailwind CSS v4** (via the official Vite plugin) with no component library—everything is custom markup and utility classes.

**Routing:** `react-router-dom` wraps the app in a shared **layout** (header, nav, footer). Routes include the home search page, an About page, a redirect from `/home` to `/`, and a catch-all 404.

**Data flow:** Search logic lives in a custom hook, `useBookSearch`. It POSTs JSON `{ query: string }` to `/api/book-search`, then keeps candidates (capped at five), loading, error state, whether a search has completed, and the last query (for retry). The search bar owns the input value locally and calls the hook on submit—no debounce, by design.

**Types:** `BookCandidate` matches the backend shape (title, author, year, explanation, `workUrl`, `coverImageUrl`, `matchStrength`, etc.) so the UI stays typed end to end.

**Deploy:** Production builds bake in `VITE_API_URL` from `.env.production` (currently the Azure App Service host). For **Azure Static Web Apps**, set app location to `/`, output to **`dist`**, and leave API location empty if the API is a separate service. Ensure CORS on the API allows your static site origin.

---

## Assumptions and design decisions

- **Backend is the source of truth.** The UI does not rank or filter beyond taking the first five candidates from the response. Any “match strength” badge is display-only.
- **HTTPS dev API:** The default base URL uses `https://localhost:7156` to match a typical ASP.NET Core dev certificate setup. You may need to trust the dev cert in your browser.
- **CORS:** Cross-origin calls only work if the API exposes the right `Access-Control-Allow-Origin` (and related headers) for wherever the front end is hosted.
- **No sample data in the UI anymore:** The first-run state is an empty catalog message until the user runs a real search. That keeps dev honest against the API contract.
- **Loading UX:** While a request is in flight, the primary feedback is a spinner and label inside the search button. If you search again with results already on screen, the list dims slightly so it’s obvious something is updating.
- **Aesthetic:** The layout leans “bookstore / ebook catalog” (serif headlines, warm paper tones) rather than a generic dashboard look, while staying readable and accessible.

---

## Features implemented

- **Catalog search** — Large search field + “Search catalog” button; explicit submit (no debounced auto-search).
- **Results** — Up to five cards per response: cover (or placeholder), title, year, author, optional match-strength chip, explanation block, and “View on Open Library” using `workUrl`.
- **States** — Initial empty prompt, no-results message after a successful empty response, inline error with retry, loading state on the button (and dimmed stale results when re-searching).
- **Navigation** — Sticky-style header with Browse / About; footer note linking to Open Library.
- **About page** — Short description of the API endpoint and env configuration.
- **404 route** — Friendly not-found page with a link home.

---

## Testing strategy

Right now there is **no automated test suite** in the repo (no Jest/Vitest/Playwright configs). What we do rely on in practice:

- **TypeScript** — `npm run build` runs `tsc -b` before Vite bundles, so type errors block a production build.
- **ESLint** — `npm run lint` catches a range of React and TS issues.
- **Manual checks** — Happy path (search returns cards), empty results, network/API errors and retry, navigation between routes, direct URL loads for client-side routes (needs correct SPA hosting fallback, e.g. `staticwebapp.config.json` or host rules).

If this were extended for production hardening, the next steps would be **unit tests** for `useBookSearch` (mock `fetch`), **component tests** for the search bar and result cards, and optionally **one or two E2E flows** against a mocked API or a fixed test environment.

---

## Future improvements (with more time)

- **Automated tests** — Vitest + React Testing Library for hooks and components; MSW to stub `/api/book-search`; optional Playwright for smoke tests.
- **SPA hosting config** — Commit `staticwebapp.config.json` (or equivalent) so `/about` and deep links work everywhere without extra host configuration.
- **Accessibility audit** — Keyboard order, focus rings, live regions for async search results, and stricter contrast checks on warm backgrounds.
- **Resilience** — Timeouts and clearer messages for slow or offline networks; optional request cancellation if the user submits twice quickly.
- **i18n** — Extract copy for multiple languages if the product expands beyond English.
- **Analytics / observability** — Lightweight client logging or metrics for search latency and error rates (privacy-conscious).

---

## License

Private / task use unless otherwise noted.
