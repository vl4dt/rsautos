# RS Autos HN

Spanish-first vehicle import transparency platform for Honduras, built with Next.js App Router, Sanity, Tailwind CSS, and TypeScript.

## Local Setup

1. Copy `.env.example` to `.env.local`.
2. Fill the Sanity project values.
3. Install dependencies with `npm install`.
4. Run `npm run dev`.

The first implemented feature is the `/inventory` route with SEO-friendly server filtering through URL query parameters.

## Production Deployment

Deploy the app on Vercel from this repository. `vercel.json` uses `npm run build:production`, which validates the required production environment before `next build`.

Set these Vercel environment variables for Production, Preview, and Development as needed:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET=production`
- `NEXT_PUBLIC_SANITY_API_VERSION=2026-05-01`
- `NEXT_PUBLIC_SITE_URL=https://your-production-domain.com`
- `NEXT_PUBLIC_BUSINESS_NAME=RS Autos HN`
- `NEXT_PUBLIC_PRIMARY_MARKET=Honduras`
- `NEXT_PUBLIC_BUSINESS_LOCATION=Santa Rosa de Copan, Copan`
- `NEXT_PUBLIC_CONTACT_PHONE=50489057397`
- `SANITY_REVALIDATE_SECRET`

Sanity Studio is embedded at `/studio` and uses the same `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` values as the public site. Add the final Vercel domain to the Sanity project CORS origins with credentials enabled so Studio can authenticate in production.

## Sanity Publish Refresh

Inventory pages use ISR with a 1-hour revalidation window. To show newly published listings immediately, set `SANITY_REVALIDATE_SECRET` in the deployment environment and create a Sanity webhook:

- URL: `https://your-domain.com/api/revalidate`
- Method: `POST`
- Header: `x-revalidate-secret: your-secret`
- Trigger: create, update, and delete events for `carListing`

The endpoint revalidates `/inventory` and `/` without exposing internal listing fields.
