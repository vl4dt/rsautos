# Roadmap

## Product Direction

RS Autos HN should feel like a premium automotive dashboard, not a generic dealership template. The visual system is dark luxury automotive glassmorphism: black/charcoal/navy backgrounds, frosted glass panels, metallic headings, red and electric-blue neon accents, cinematic vehicle imagery, compact technical data, and strong WhatsApp conversion paths.

Core trust promise: every public vehicle experience should help the buyer compare origin condition, current condition, documentation, inspection status, and next action without exposing internal acquisition fields such as `usaAuctionPrice` or `priceBreakdown`.

## Phase 1: Inventory Foundation

- [x] Scaffold Next.js App Router, TypeScript, Tailwind, and Sanity structure.
- [x] Add typed Sanity vehicle listing schema.
- [x] Build `/inventory` with URL query filters for make, year, price, import status, and sort order.
- [x] Add WhatsApp lead CTAs driven by environment configuration.
- [x] Apply premium dark automotive glassmorphism styling to homepage, inventory, header, footer, cards, filters, and CTAs.
- [x] Add curated RS Autos logo and vehicle imagery as public assets.
- [ ] Connect production Sanity dataset and Vercel deployment.
- [ ] Confirm production env variables for business name, market, location, WhatsApp phone, site URL, and Sanity config.
- [ ] Add seeded sample listings that match the visual references for QA when Sanity has limited data.

## Phase 2: Brand System and UI Polish

- [ ] Formalize the RS Autos HN design system in shared components/classes: glass panels, neon panels, section titles, badges, stat cards, CTA bands, and form fields.
- [ ] Audit all pages for responsive layout, text clipping, button fit, and accessible contrast on mobile and desktop.
- [ ] Add consistent active navigation states for route and in-page sections.
- [ ] Add social icons/links and business metadata from env or Sanity site settings.
- [ ] Add Open Graph images using the RS Autos visual identity.
- [ ] Replace placeholder testimonial/social content with CMS-managed content.

## Phase 3: Vehicle Transparency Detail

- [ ] Build `/inventory/[slug]` detail pages with ISR (`revalidate = 3600`).
- [ ] Implement the auction/current Transparency Toggle.
- [ ] Add glass spec panels for VIN, mileage, drivetrain, fuel, transmission, title status, location, and import status.
- [ ] Add inspection checklist and repair log presentation.
- [ ] Add before/after image comparison galleries for auction-origin and current-state photos.
- [ ] Add document/report cards for VIN verification, inspection report, Carfax or equivalent links, and import documents.
- [ ] Add high-conversion WhatsApp CTAs that include vehicle title, slug, VIN when public, and import status.
- [ ] Add PDF technical report generation for public buyer-facing data only.

## Phase 4: Lead and Conversion Flows

- [ ] Build `Importamos tu auto` page with a guided import quote flow.
- [ ] Build `Vende tu auto` page with valuation intake, photos, vehicle details, and WhatsApp handoff.
- [ ] Build `Contacto` page with location, direct WhatsApp CTA, contact options, and response expectations.
- [ ] Add reusable glass form patterns: icon fields, select controls, upload dropzones, progress/summary sidebar, and success state.
- [ ] Add lead source tagging to WhatsApp messages for inventory, import, sell, contact, and detail pages.
- [ ] Add optional CMS-backed FAQ sections for importing, buying, selling, and documentation.

## Phase 5: Content and Trust Pages

- [ ] Build `Sobre nosotros` page around transparency, process, verification, and Honduras-focused service.
- [ ] Add process sections: choose vehicle, verify and buy, import safely, deliver with documentation.
- [ ] Add trust modules for VIN verification, mechanical review, documentation clarity, and personalized attention.
- [ ] Add customer testimonials with name, city, vehicle/context, and rating.
- [ ] Add a public explanation of what buyers can verify and what data remains internal.

## Phase 6: Integrations

- [ ] VIN decode route using NHTSA with typed fallback behavior.
- [ ] Honduran import tax estimate utility.
- [ ] Analytics and local SEO instrumentation.
- [ ] Add event tracking for WhatsApp clicks, filter submits, detail views, report downloads, and form starts/completions.
- [ ] Add sitemap/robots metadata and local business structured data.
- [ ] Add Sanity webhook revalidation for inventory/detail/content updates.

## Phase 7: Operations and QA

- [ ] Add business owner CMS guide updates for new pages, forms, reports, and trust content.
- [ ] Add smoke tests for homepage, inventory filters, detail pages, and key CTA links.
- [ ] Add visual QA checklist for desktop/mobile against the curated reference images in `chatgpt-sessions/imagenes`.
- [ ] Add performance pass for image sizes, priority loading, and layout shift.
- [ ] Add privacy/safety review to ensure public inventory queries never expose acquisition/internal pricing fields.
