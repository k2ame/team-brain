---
name: testing-governaxis-website
description: Run and end-to-end test the Governaxis Advisory website (Vite + React SPA). Use when verifying UI changes in this repo.
---

# Testing the Governaxis Advisory website

## Run locally
1. Requires Node >= 20.19. The default system Node may be older — if `npm run build` fails with rolldown/oxlint "Cannot find native binding" or MODULE_NOT_FOUND errors, switch to Node 22 (`nvm install 22 && nvm use 22`), then `rm -rf node_modules package-lock.json && npm install` (the native-binding error persists until deps are reinstalled under the right Node).
2. `npm install`
3. `npm run dev` → http://localhost:5173

## Checks
- Lint: `npm run lint` (oxlint)
- Build: `npm run build`
- No unit tests exist (as of 2026-07); testing is manual through the browser.

## App structure for testing
- Single-page app; all "pages" (home/about/services/team/testimonials/contact) are React state switches in `src/App.jsx` — the URL never changes, so navigate by clicking header nav buttons, not URLs.
- Contact form is a template: submitting only swaps in a confirmation box client-side; nothing is sent anywhere.
- Placeholder content (phone, team profiles, testimonials) is intentional and marked in the footer.

## Golden-path test
Load home → click each nav item and verify page headings → submit the contact form (all 4 fields) and verify the confirmation box → click the GA logo to return home.

## Devin Secrets Needed
None — fully local, no external services.
