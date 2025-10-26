# NextCart

A minimal e‑commerce demo built with Next.js App Router, NextAuth, and Tailwind CSS. It fetches products from FakeStoreAPI and demonstrates server components, dynamic imports, client state via localStorage, and image optimization with `next/image`.

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

## Getting started

1) Install dependencies

```bash
npm install --legacy-peer-deps
```

2) Create `.env.local` in the project root and fill in the variables above.

3) Run the dev server

```bash
npm run dev
```

Open http://localhost:3000

## Linting

```bash
npm run lint
```
## What's included

- App Router (`src/app/*`) with route groups for home, products, cart, profile, auth
- Authentication with NextAuth (Google OAuth + credentials via Firebase Admin)
- Cart state persisted to `localStorage`
- Theme toggle (light/dark) with a background image that switches by theme
- Dynamic imports for client-heavy UI (`AuthButtons`, `ThemeToggle`) to reduce JS
- Error and loading boundaries (`src/app/error.js`, `src/app/loading.js`)