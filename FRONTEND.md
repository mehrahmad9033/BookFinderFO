# Frontend — Find That Book

React + TypeScript SPA for catalog search. Calls a separate backend; no API code lives in this repo.

## Stack

Vite 8, React 19, React Router 7, Tailwind CSS 4, ESLint.

## Quick start

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Environment

| Variable | Purpose |
| -------- | ------- |
| `VITE_API_URL` | API base URL, **no** trailing slash. Requests: `{VITE_API_URL}/api/book-search` |

- **Local:** optional `.env` — if unset, the app defaults to `https://localhost:7156`.
- **Production build:** `.env.production` is read automatically when you run `npm run build`.

## Scripts

| Command | What it does |
| ------- | ------------ |
| `npm run dev` | Dev server + HMR |
| `npm run build` | Typecheck + output to `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run lint` | ESLint |

## Deploy (Static Web Apps)

Build output folder is **`dist`** (not `build`). Point your host or Azure Static Web Apps **output location** at `dist`.

More detail (CORS, architecture, testing): see **README.md**.
