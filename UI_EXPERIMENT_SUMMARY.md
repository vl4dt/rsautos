# Premium Import Transparency UI Experiment

Branch: `codex-premium-import-transparency-ui`

## Direction

This experiment positions RS Autos HN as a premium, transparency-first import dealer:

- Showcase vehicles with evidence, not hype.
- Separate origin/subasta condition from current condition.
- Help buyers understand title status, repairs, documents, and pending questions.
- Route WhatsApp leads by intent so RS Autos receives useful context.
- Keep acquisition cost, margin, and internal operating details private.

## Public Website Changes

- Homepage converted into a decision hub for inventory, buyer guide, import quote, and contact.
- Inventory page converted into a curated showroom with featured vehicle, summary chips, and low-inventory framing.
- Vehicle detail page expanded with buyer decision summary, condition disclosure, guide link, evidence gallery, intent CTAs, and mobile sticky WhatsApp CTA.
- New buyer guide page at `/guia-compra-importados`.
- Contact page converted into a guided contact router.
- Import quote flow expanded with vehicle type, risk tolerance, condition preference, timeline, city, and must-have priorities.
- About page refocused around buyer protection and the publishing process.

## Sanity Studio Changes

- Added vehicle buyer guidance fields:
  - `buyerGuidance`
  - `recommendedQuestions`
- Added grouped vehicle editor sections:
  - Public listing
  - Vehicle specs
  - Transparency
  - Buyer guidance
  - Internal only
- Added validations/warnings for public listings:
  - current image required
  - condition disclosure required
  - recommended buyer questions encouraged
- Added `Buyer Guide` singleton document for managing the guide page content in Studio.

## Privacy

Public inventory queries continue to avoid internal acquisition fields such as:

- `usaAuctionPrice`
- `priceBreakdown`

The privacy scan passes.

## Verification

Final checks run during release prep:

- `npm run build`
- `npm run lint`
- `npm run qa:privacy`
- `npm run qa:images`

Browser checks covered:

- `/`
- `/inventory`
- `/inventory/hyundai-sonata-sel-sport-2026`
- `/guia-compra-importados`
- `/contacto`
- `/importamos-tu-auto`
- `/sobre-nosotros`

