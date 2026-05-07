# Visual QA Checklist

Use this checklist before production releases and after major UI/content updates.

## Viewports

- Desktop: 1440 x 900.
- Laptop: 1280 x 720.
- Tablet: 768 x 1024.
- Mobile: 390 x 844.
- Mobile small: 360 x 740.

## Pages

- `/`
- `/inventory`
- `/inventory/[slug]`
- `/inventory/[slug]/report`
- `/importamos-tu-auto`
- `/sobre-nosotros`
- `/contacto`
- `/studio`

## Reference Direction

Compare against curated visual references in:

```text
chatgpt-sessions/imagenes
```

## Checks

- Header logo is readable and nav items do not wrap awkwardly.
- Active navigation underline matches the current route.
- Hero vehicle imagery is visible, not blank, not overly cropped, and does not cover text.
- Text fits inside buttons, cards, filters, and form controls on mobile and desktop.
- Inventory cards keep stable image aspect ratio and CTA buttons align.
- Vehicle detail transparency toggle switches between subasta and actual without layout shift.
- PDF report opens in the browser viewer.
- Import quote form controls are easy to scan and WhatsApp handoff button is visible.
- Contact cards maintain equal rhythm and buttons do not overflow.
- `Sobre nosotros` trust modules and testimonials are readable on mobile.
- Glass panels have enough contrast against the dark background.
- WhatsApp CTAs remain visible without hiding core content.
- No visible internal acquisition cost language appears on public pages.

## Performance Checks

- `npm run qa:images` passes.
- Hero and card images use `next/image` where rendered by React.
- Above-the-fold hero images use `priority` only where needed.
- Fixed-ratio media containers prevent layout shift.
- No public image in `public/images/rs-autos` exceeds the configured image budget.
