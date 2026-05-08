# RS Autos HN

Spanish-first vehicle import transparency platform for Honduras, built with Next.js App Router, Sanity, Tailwind CSS, and TypeScript.

## Local Setup

1. Copy `.env.example` to `.env.local`.
2. Fill the Sanity project values.
3. Install dependencies with `npm install`.
4. Run `npm run dev`.

Implemented public routes include `/inventory` with SEO-friendly server filtering, `/inventory/[slug]` transparency detail pages, `/inventory/[slug]/report` buyer-facing PDF reports generated from public data only, `/importamos-tu-auto` guided import quote flow, `/sobre-nosotros` transparency and trust content, and `/contacto` WhatsApp contact options.

Integration routes include `/api/vin/decode` for NHTSA vPIC VIN decoding, `/api/import-estimate` for Honduras import estimate guidance, `/api/analytics` for lightweight event intake, `/sitemap.xml`, and `/robots.txt`.

In Sanity Studio, the `VIN` field on `Car Listing` includes a NHTSA prefill helper. Enter a VIN, then click `Decodificar VIN y llenar ficha` to patch buyer-facing specs such as title, make, model, year, fuel type, drivetrain, and transmission.

CMS-managed visual slots live in Studio under `Site Settings`. Use them to rotate decorative images without code changes:

- Home hero image.
- Home CTA background image.
- About page hero image.

If a slot is empty, the site falls back to the bundled image in `public/images/rs-autos`.

## QA Commands

- `npm run typecheck` - TypeScript validation.
- `npm run lint` - ESLint validation.
- `npm run build` - Production build.
- `npm run qa:privacy` - Scans public app code for internal acquisition fields.
- `npm run qa:images` - Checks local image size budget.
- `npm run qa:smoke` - Runs smoke tests against `SMOKE_BASE_URL` or `http://localhost:3000`.

Optional smoke-test detail coverage:

```text
SMOKE_DETAIL_SLUG=toyota-hilux-sr5-2020 npm run qa:smoke
```

Visual QA guidance lives in `VISUAL_QA_CHECKLIST.md`.

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
- `NEXT_PUBLIC_FACEBOOK_URL`
- `NEXT_PUBLIC_INSTAGRAM_URL`
- `NEXT_PUBLIC_YOUTUBE_URL`
- `NEXT_PUBLIC_TIKTOK_URL`
- `SANITY_REVALIDATE_SECRET`

Sanity Studio is embedded at `/studio` and uses the same `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` values as the public site. Add the final Vercel domain to the Sanity project CORS origins with credentials enabled so Studio can authenticate in production.

Run `npm run confirm:env` after setting production values. The command confirms business metadata, WhatsApp, the production HTTPS site URL, Sanity config, and the ISR webhook secret without printing secret values.

## Sanity Publish Refresh

Inventory and vehicle detail pages use ISR with a 1-hour revalidation window. To show newly published listings immediately, set `SANITY_REVALIDATE_SECRET` in the deployment environment and create a Sanity webhook:

- URL: `https://your-domain.com/api/revalidate`
- Method: `POST`
- Header: `x-revalidate-secret: your-secret`
- Trigger: create, update, and delete events for `carListing`

The endpoint revalidates `/inventory`, `/`, content pages, and matching detail/report paths when a webhook payload includes `slug.current`, without exposing internal listing fields.

## Sample Inventory Seed

When the production Sanity dataset has limited inventory, seed QA listings from the curated vehicle images:

1. Create a Sanity API token with write access.
2. Set `SANITY_API_WRITE_TOKEN` locally, or add it to `.env.production.local`.
3. Preview the seed data with `npm run seed:sanity:dry`.
4. Write the sample listings with `npm run seed:sanity`.

The seed script creates or replaces four public documents with stable `sample-*` ids. It only writes buyer-facing fields and does not include `usaAuctionPrice` or `priceBreakdown`.
