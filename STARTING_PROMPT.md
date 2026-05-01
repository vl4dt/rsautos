# Starting Prompt — Honduras Car Import Transparency Platform

---

## Project Brief

Build a **professional, production-ready web platform** for `[BUSINESS NAME, e.g., "Autolote Toto"]`, a car import business that sells USA-auction vehicles in `[PRIMARY MARKET, e.g., "Honduras"]` with **100% condition transparency**.

The core differentiator is the **Transparency Toggle** — a UI component that lets buyers switch between the vehicle's original auction condition ("As-Is" from the USA) and its current post-repair state at the local lot. WhatsApp is the primary communication channel.

---

## Tech Stack

Analyze the proposed stack and determine improvements if appropriate.
Proposed stack:
 +**Next.js 16 + React 19** application with **App Router**
 +**Sanity.io** headless CMS
 +**Tailwind CSS v3**
 +**TypeScript**

## What Needs to Be Built

Research, analyze, plan and track the whole development process.

---

## Business description
(Spanish version)
El negocio opera en Honduras, importacion de vehiculos usados para la venta, los vehiculos pueden ser reparados previo a venderlos o el cliente puede estar interesado en comprarlo sin reparar y en ese caso la compañia presta el servicio de asistir al cliente en el proceso de seleccion del vehiculo e importacion. En ambos casos se le presenta toda la información del vehículo antes y después de la reparación, estado mecánico y todos los detalles relevantes.

## Proposed roadmap
Review the proposed roadmap and improve it if necessary

### Project Roadmap: Honduras Car Import Transparency Platform

This document outlines the development phases for the car import platform, focusing on building trust through the **Transparency Toggle** and localized **Honduran market** integrations.

---

#### 🏗 Phase 1: Planning & Infrastructure
- [ ] **Tech Stack Initialization**: Set up Next.js (App Router), Tailwind CSS, and Sanity.io.
- [ ] **Context Seeding**: Initialize `AGENTS.md` and `SCHEMA.md` to guide AI development.
- [ ] **Data Modeling**: Implement the Car Listing schema with dual-state objects (Auction vs. Current).
- [ ] **Deployment Pipeline**: Connect GitHub repository to Vercel for automated staging builds.

#### 🎨 Phase 2: Design & User Experience
- [ ] **The Transparency Toggle**: Design the UI for switching between "As-Imported" (USA Auction) and "Current State" (Repaired/Verified).
- [ ] **Vehicle Condition Dashboard**: Create a visual "Inspection Checklist" component for mechanical transparency.
- [ ] **Mobile-First Optimization**: Ensure high-res car galleries achieve a "Good" Core Web Vitals score (LCP < 2.5s).
- [ ] **Brand Identity**: Implement a "Professional & Trustworthy" theme with high-contrast typography and clear status badges.

#### 🛠 Phase 3: Core Building & Logic
- [ ] **Dynamic Inventory**: Build the `/inventory` listing page and `/inventory/[slug]` detail pages using Sanity GROQ queries.
- [ ] **VIN History Integration**: Implement a logic to fetch car specifications from the NHTSA API via the VIN.
- [ ] **Import Tax Calculator**: Create a utility to estimate Honduran customs (Aduana) and registration fees.
- [ ] **WhatsApp Lead Engine**: 
    - Integrate a "Direct to WhatsApp" CTA.
    - Implement pre-filled messages containing car VIN and current repair status.
- [ ] **PDF Generator**: Enable one-click downloads for "Technical Condition Reports" for clients' mechanics.

#### 🧪 Phase 4: Testing & Optimization
- [ ] **Visual Testing**: Verify the "Transparency Toggle" correctly swaps image arrays and repair logs.
- [ ] **API Resilience**: Test VIN decoder fallbacks for when external databases are unresponsive.
- [ ] **SEO & Performance**: 
    - Run Lighthouse audits to ensure passing Core Web Vitals.
    - Implement local SEO tags for "Carros importados Honduras."
- [ ] **UAT (User Acceptance Testing)**: Simulate a full buyer journey from USA Auction view to WhatsApp inquiry.

---

#### 🚀 Future Features (Phase 5)
- [ ] **Partner Workshop Portal**: Allow repair partners to upload logs and photos directly.
- [ ] **Live Auction Tracking**: Integration for clients to track their specific car's shipping status from the USA.
- [ ] **Lempira/USD Currency Switcher**: Real-time exchange rate updates for pricing.


## User Interface

Build the RS Autos HN website using a premium dark automotive glassmorphism UI style.

Visual direction:
- Dark luxury automotive interface.
- Background in black, charcoal, and deep navy with subtle brushed-metal or carbon-fiber texture.
- Use glassmorphism panels: translucent dark cards, backdrop blur, thin semi-transparent borders, soft shadows, and subtle inner highlights.
- Use RS Autos HN accent colors: red, electric blue, white, silver, and black.
- Add neon red and blue glow accents on borders, buttons, active menu items, section dividers, and card highlights.
- Typography should feel bold, sporty, premium, and automotive. Use large metallic-style headings and clean modern sans-serif body text.
- Cards should have rounded corners, glossy depth, and layered UI hierarchy.
- Buttons should be strong and conversion-focused: red for primary CTAs, blue/dark glass for secondary actions.
- Keep the layout professional, responsive, and readable, not overly decorative.

Core UI elements:
- Sticky dark navigation bar with RS Autos HN logo, menu links, active red underline, and red WhatsApp button.
- Hero sections with large metallic headings, cinematic black vehicle images, red/blue light streaks, and glass CTA cards.
- Inventory cards with vehicle image, badges, specs, price in red, “Ver detalles” and “WhatsApp” buttons.
- Technical detail pages with glass spec panels, document/report cards, auction-origin CTA, and Carfax report CTA.
- Forms and modals using glass panels, icon fields, upload dropzones, summary sidebar, and red submit buttons.
- Use consistent spacing, grid layout, rounded cards, glowing hover states, and accessible contrast.

CSS implementation:
- Use rgba backgrounds, backdrop-filter blur, border: 1px solid rgba(255,255,255,.10), box-shadow, and gradient overlays.
- Use red/blue CSS variables for brand accents.
- Avoid flat white backgrounds.
- Maintain high contrast for text.

RS Autos HN Design System:
Dark luxury automotive glassmorphism, neon red/blue accents, metallic typography, frosted glass cards, cinematic vehicle imagery, dashboard-style dealership UI.

### CSS

Define variables like:

```css
:root {
  --bg: #05070a;
  --panel: rgba(14, 18, 28, 0.68);
  --panel-strong: rgba(10, 14, 22, 0.86);
  --border: rgba(255, 255, 255, 0.12);
  --text: #ffffff;
  --muted: #a7afbf;
  --red: #e30613;
  --blue: #0b53d7;
  --silver: #d2d7df;
  --radius: 18px;
}
```

And reusable classes like:

```css
.glass-card {
  background: linear-gradient(
    180deg,
    rgba(18, 24, 36, 0.78),
    rgba(8, 11, 17, 0.62)
  );
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-radius: 18px;
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.neon-red {
  box-shadow: 0 0 22px rgba(227, 6, 19, 0.32);
}

.neon-blue {
  box-shadow: 0 0 22px rgba(11, 83, 215, 0.32);
}

.btn-primary {
  background: linear-gradient(180deg, #ff1f1f, #b80000);
  color: white;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(227, 6, 19, 0.35);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: white;
  border-radius: 12px;
}
```

Do not make the site look like a generic car dealership template. Make it feel like a premium automotive dashboard with glassmorphism, dark luxury colors, neon red/blue accents, cinematic vehicle imagery, and high-conversion WhatsApp CTAs.

## Customization Placeholders

Replace these before running the prompt:

| Placeholder | Description | Example |
|---|---|---|
| `[BUSINESS NAME]` | Company/trade name | `RS Autos HN` |
| `[PRIMARY MARKET]` | Target country | `Honduras` |
| `[COUNTRY]` | Same as above (used in tax/customs context) | `Honduras` |
| `[LOCAL CURRENCY]` | Local currency name and code | `HNL (Lempira)` |
| `[EXCHANGE RATE API]` | Currency conversion service | `exchangerate-api.com` |
| `[ANALYTICS PROVIDER]` | Web analytics tool | `Vercel Analytics` |
| `[ALTERNATIVE VIN API]` | VIN decoding service | `NHTSA API` |
| `[SHIPPING TRACKER]` | Logistics tracking integration | `ship2ship` |
| `[BRAND COLORS]` | Primary brand colors for Tailwind | `Rojo (#E10613) + Azul (#0A4DB8) + Negro (#000000) + Blanco (#FFFFFF) + Plata (#D9D9D9)` |
| `[CONTACT PHONE]` | WhatsApp business number | `50489057397` |
| `[BUSINESS LOCATIONS]` | Physical locations | `Santa Rosa de Copán, Copán` |
| `[DEPLOYMENT PLATFORM]` | Hosting target | `Vercel` |
| `[DOMAIN]` | Production domain | `To Be Determined` |
| `[TARGET AUDIENCE]` | Who buys these cars | `Honduran professionals, fleet buyers, first-time car buyers` |

---

## Development Standards

- **Language**: Spanish-first UI (`es-HN` locale). All user-facing strings in Spanish with English as optional toggle.
- **Images** use Sanity's Image Pipeline (`imageBuilder`) for automatic optimization.
- **Lead generation** must route to WhatsApp with a pre-filled, car-specific message.
- **`usaAuctionPrice`** and **`priceBreakdown`** are internal-only — never exposed in public GROQ queries or client-side code.
- **ISR** with `revalidate = 3600` (1-hour stale-while-revalidate) on all Sanity-fetched pages.
- **Mobile-first** responsive design. WhatsApp is the primary CTA — it should be prominent on every page.
- **Accessibility**: Respect `prefers-reduced-motion`, use semantic HTML, ARIA labels on interactive elements.
- **TypeScript strict mode** — no `any` types. All API responses typed.

---

## Instructions for the AI Agent

You are building the next phase of this project. Follow these rules:

1. **Read existing files before making changes.** The codebase is already structured — respect the existing architecture, naming conventions, and component patterns.
2. **One feature at a time.** Implement features in priority order (🔴 → 🟡 → 🟢). Ask for confirmation before moving to the next feature.
3. **Share components.** If a UI pattern is used in 2+ places, extract it into `components/`.
4. **Type-safe everything.** New GROQ queries must include TypeScript interfaces in `lib/queries.ts`. New API routes must type their request/response bodies.
5. **Sanity schema changes** go in `schemas/carListing.ts` and must be registered in `sanity/schemaTypes/index.ts`.
6. **Test as you go.** After each feature, verify with `npx tsc --noEmit` and ensure no regressions.
7. **Document new features** by updating `SITEMAP.md` and `ROADMAP.md` as needed.
8. **Never hardcode business data.** Phone numbers, prices, car listings — all from env vars or Sanity.

---

## First Task

Determine what should be the first so that we can build it incrementally and logically.

The filter bar should support:
- **Make** (dynamic dropdown from available cars in Sanity)
- **Year range** (min-max sliders or inputs)
- **Price range** (in the active currency)
- **Import status** (auctionWon, inTransit, customsClearance, atWorkshop, readyForSale)
- **Sort by** (newest, price ascending, price descending, mileage ascending)

Decide whether to use URL query params (server-side re-render with ISR) or client-side state. Given that Sanity supports GROQ filtering, prefer **server-side filtering via URL search params** for SEO benefits, with client-side sort as a progressive enhancement.

---

> **End of starting prompt.
