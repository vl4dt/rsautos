# RS Autos HN

Spanish-first vehicle import transparency platform for Honduras, built with Next.js App Router, Sanity, Tailwind CSS, and TypeScript.

## Local Setup

1. Copy `.env.example` to `.env.local`.
2. Fill the Sanity project values.
3. Install dependencies with `npm install`.
4. Run `npm run dev`.

The first implemented feature is the `/inventory` route with SEO-friendly server filtering through URL query parameters.

## Sanity Publish Refresh

Inventory pages use ISR with a 1-hour revalidation window. To show newly published listings immediately, set `SANITY_REVALIDATE_SECRET` in the deployment environment and create a Sanity webhook:

- URL: `https://your-domain.com/api/revalidate`
- Method: `POST`
- Header: `x-revalidate-secret: your-secret`
- Trigger: create, update, and delete events for `carListing`

The endpoint revalidates `/inventory` and `/` without exposing internal listing fields.
