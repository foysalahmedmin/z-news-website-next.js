# Z-NEWS WEBSITE (<a href="https://admin.dainikeidin.com/">LIVE</a>)

A modern, high-performance news website built with Next.js 15, React 19, TypeScript, and Tailwind CSS 4. The project features dynamic routing for news, categories, and search; modular UI components; SEO-friendly architecture; and a clean state management setup with Redux Toolkit.

## Features

- **Next.js App Router** with server and client components
- **TypeScript-first** development
- **Tailwind CSS 4** with typography plugin
- **Reusable UI library** (buttons, dropdowns, modals, tabs, tables, etc.)
- **Dynamic routes** for news details, categories, and search
- **Redux Toolkit** store provider
- **API abstraction** via a typed `Fetch` wrapper with interceptors
- **SEO scaffolding** and image optimization config
- **Prettier + ESLint** preconfigured

## Tech Stack

- **Framework**: Next.js 15 (React 19)
- **Language**: TypeScript
- **Styles**: Tailwind CSS 4, custom CSS modules
- **State**: Redux Toolkit, React Redux
- **UI/UX**: Lucide icons, Embla carousel, custom components
- **Utilities**: clsx, class-variance-authority, cookies-next / js-cookie

## Getting Started

### Prerequisites

- Node.js 18+ (recommended LTS)
- pnpm (preferred) or npm/yarn

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Runs Next.js locally with Turbopack. The app is served at `http://localhost:3000` by default.

### Build

```bash
pnpm build
```

### Start (production)

```bash
pnpm start
```

## Environment Variables

The app reads environment variables through `src/config/env/index.ts`.

- `NEXT_PUBLIC_APP_URL` — public app URL. Defaults to `https://test.dainikeidin.com`
- `NEXT_PUBLIC_API_URL` — API base URL. Defaults to `https://admin.dainikeidin.com`

These feed into the centralized config exported by `src/config/index.ts` and are consumed by the `Fetch` API client and URL helpers.

Create a `.env.local` file in the project root for local development:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Project Structure

```text
src/
  app/
    (common)/
      (home)/
      about/
      category/[slug]/
      contact/
      news/[slug]/
      search/
      layout.tsx          # Shared header/footer layout
    layout.tsx            # Root layout, fonts, globals
    globals.css
  assets/
    styles/               # Base styles and utilities
  components/             # Reusable UI and page sections
  config/                 # ENV, endpoints, settings, SEO, URLs
  hooks/                  # Custom hooks (state, UI, observers)
  lib/
    api.ts                # Typed Fetch wrapper with interceptors
    utils.ts
  providers/
    ReduxProvider.tsx     # Redux store provider
  redux/
    store.ts
  services/               # API layer (auth, news, comments, etc.)
  types/                  # App-wide TypeScript types
  utils/                  # Generic utility functions
```

## Pages and Routes

- `/` — Home page
  - File: `src/app/(common)/(home)/page.tsx`
  - Loading UI: `src/app/(common)/(home)/loading.tsx`
- `/about` — About page
  - File: `src/app/(common)/about/page.tsx`
- `/contact` — Contact page
  - File: `src/app/(common)/contact/page.tsx`
- `/category/[slug]` — Category listing page for a given category slug
  - File: `src/app/(common)/category/[slug]/page.tsx`
  - Loading UI: `src/app/(common)/category/[slug]/loading.tsx`
- `/news/[slug]` — News details page for a given news/article slug
  - File: `src/app/(common)/news/[slug]/page.tsx`
  - Loading UI: `src/app/(common)/news/[slug]/loading.tsx`
- `/search` — Search page for querying news/articles
  - File: `src/app/(common)/search/page.tsx`
  - Loading UI: `src/app/(common)/search/loading.tsx`

Shared layouts and app-level files:

- Root layout: `src/app/layout.tsx` (fonts, global CSS, metadata)
- Common layout (header/footer): `src/app/(common)/layout.tsx`
- App-level loading: `src/app/loading.tsx`
- Favicon: `src/app/favicon.ico`
- Global styles: `src/app/globals.css`

## API Client

The `src/lib/api.ts` file exposes a strongly-typed `Fetch` class with request/response interceptors, timeout handling, and JSON parsing. It is instantiated with `ENV.api_url`.

Key helpers:

- `ENDPOINTS` in `src/config/endpoints/index.ts`
- `getFullEndpoint(key)` to resolve absolute paths
- `URLS` in `src/config/urls/index.ts` for static asset bases

## Images and Optimization

`next.config.ts` whitelists remote image sources:

- `http://localhost:5000`
- `https://admin.dainikeidin.com`
- `https://images.unsplash.com`

Adjust as needed for your deployment.

## Linting and Formatting

- ESLint config is in `eslint.config.mjs` (Next.js + TypeScript + Prettier)
- Run checks:

```bash
pnpm lint
pnpm lint:fix
```

## Deployment

This project includes a `vercel.json` with defaults:

- Install: `pnpm install`
- Build: `pnpm build`
- Output: `.next`
- Framework: Next.js

For Vercel, connect the repository and set environment variables in the dashboard.

## Available Scripts

- `pnpm dev` — start development server (Turbopack)
- `pnpm build` — build production assets
- `pnpm start` — run production server
- `pnpm lint` — run ESLint
- `pnpm lint:fix` — fix lint issues

## Naming and Branding

Config files reference the project as "Daini keidin" and Bengali titles (e.g., metadata: "দৈনিক এইদিন"). Update `src/config/project/index.ts`, `src/config/seo/index.ts`, and `public` assets to match your branding.

## Contributing

1. Fork and clone
2. Create a feature branch
3. Commit with clear messages
4. Open a pull request

## License

This project is proprietary to its owners unless a license is added. Consider adding a suitable license file if open-sourcing.
