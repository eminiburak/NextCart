# TODO EDIT README.md file better
# NextCart

A minimal e‑commerce demo built with Next.js App Router, NextAuth, and Tailwind CSS. It fetches products from FakeStoreAPI and demonstrates server components, dynamic imports, client state via localStorage, and image optimization with `next/image`.

## What's included

- App Router (`src/app/*`) with route groups for home, products, cart, profile, auth
- Authentication with NextAuth (Google OAuth + credentials via Firebase Admin)
- Cart state persisted to `localStorage`
- Theme toggle (light/dark) with a background image that switches by theme
- Image optimization everywhere (`next/image`) with proper `sizes`, `priority`, and lazy loading
- Dynamic imports for client-heavy UI (`AuthButtons`, `ThemeToggle`) to reduce JS
- Production‑ready `next.config.mjs` (SWC minify, AVIF/WebP, remote image hosts, removed X‑Powered‑By)
- Error and loading boundaries (`src/app/error.js`, `src/app/loading.js`)

## Recent improvements (performance and DX)

- Replaced global heavy background with a `BackgroundImage` client component that renders only the active theme image and updates instantly when toggling
- Removed global providers from `layout` and scoped them where needed to reduce initial JS
  - `Header` wraps only `AuthButtons` with a local `SessionProvider`
  - `cart/page.js` wraps the page with `SessionProvider` + `CartProvider`
  - `products/[id]/page.js` wraps `ProductDetails` with `CartProvider`
  - `profile/page.js` wraps `ProfileExtras` with `CartProvider`
- Optimized LCP and product images (`sizes`, `priority`, lazy)
- Avoided request‑chaining by removing data fetching from `generateMetadata`
- Fixed hydration mismatches by deferring `localStorage` reads in `useLocalStorage`
- Cleaned unused components and assets (Button, Card, CartDrawer, EmptyState and unused SVGs)
- Lint fixes and accessibility/contrast tweaks (e.g., cart page text)

## Requirements

- Node.js 18+ (or the version supported by your environment)
- A `.env.local` file with the following variables for auth and Firebase Admin:

```
NEXTAUTH_SECRET=your_strong_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=service_account_email@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

Notes:
- Ensure newlines in `FIREBASE_PRIVATE_KEY` are escaped as `\n`.
- If you don't plan to use Google or credentials login, you can comment out providers in `src/app/api/auth/[...nextauth]/route.js`.

## Getting started

1) Install dependencies

```bash
npm install
```

2) Create `.env.local` in the project root and fill in the variables above.

3) Run the dev server

```bash
npm run dev
```

Open http://localhost:3000

- Sign in at `/auth/signin`
- Products at `/products`
- Cart at `/cart`
- Profile at `/profile`

## Production build

```bash
npm run build
npm start
```

## Project structure (high level)

```
src/
  app/
    api/
      auth/[...nextauth]/route.js     # NextAuth config (Google + credentials via Firebase Admin)
      auth/register/route.js          # Simple register endpoint (credentials)
      diag/firebase/route.js          # Firebase admin health check
    cart/page.js                      # Cart page (SessionProvider + CartProvider)
    products/[id]/page.js             # Product detail (CartProvider)
    profile/page.js                   # Profile (CartProvider)
    error.js, loading.js, not-found.js
    layout.js, page.js
  components/
    Header.jsx (dynamic imports for ThemeToggle/AuthButtons)
    BackgroundImage.jsx (theme-aware background)
    ProductCard.jsx, ProductDetails.jsx, Modal.jsx, ...
  context/
    CartContext.jsx                   # Cart state persisted to localStorage
  hooks/
    useLocalStorage.js                # SSR-safe localStorage hydration
  lib/
    api.js                            # FakeStoreAPI helpers
```

## Image optimization

- `next.config.mjs` enables AVIF/WebP and remote hosts (`fakestoreapi.com`, Google/GitHub avatars)
- Key images use `sizes`, `priority` (for LCP), and `loading="lazy"` for offscreen
- Background images: `public/lightImg.png` (light) and `public/test1.jpg` (dark)

## Linting

```bash
npm run lint
```

## Troubleshooting

- Hydration error on cart/profile: ensure `useLocalStorage.js` changes are present; try clearing `localStorage` for the site
- Google sign-in issues: verify OAuth credentials and authorized redirect URIs
- Firebase admin: verify `.env.local` values and IAM roles; check `/api/diag/firebase`


