# Agent Notes

- UI language is Spanish-first for `es-HN`.
- Public inventory queries must not expose internal acquisition fields such as `usaAuctionPrice` or `priceBreakdown`.
- WhatsApp phone number and business metadata must come from environment variables.
- Sanity-fetched pages should use ISR with `revalidate = 3600`.
- Prefer shared components in `components/` when a pattern appears more than once.
