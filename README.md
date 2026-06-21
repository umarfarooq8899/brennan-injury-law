# Brennan Injury Law — Demo Site

A portfolio demo for a personal injury law firm, built in Next.js 14 (App Router) + Tailwind CSS.

This was built as a **Fiverr portfolio piece** to show prospective lawyer clients a finished example
rather than a blank promise. All firm details, attorney name, phone number, and client quotes are
fictional placeholders — swap them out before showing this to a real client or deploying it live.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build for production

```bash
npm run build
npm run start
```

## Deploy

This is a stock Next.js app, so it deploys cleanly to Vercel (recommended — `vercel deploy`), Netlify,
or any Node host. No environment variables or backend services are required to run it as-is.

## Structure

```
app/
  layout.jsx          — global shell (nav + footer)
  page.jsx             — Home
  about/page.jsx        — Attorney bio
  practice-areas/page.jsx — Practice area index
  contact/page.jsx      — Intake form (client-side only — see below)
  globals.css           — design tokens, fonts, "case file" utility classes
components/
  Navbar.jsx, Footer.jsx, Stamp.jsx
```

## Design concept

A "case file" visual language instead of the generic navy-and-gold law-firm template:
folder-tab navigation, ink-stamp badges, monospace case numbers/file codes, document corner-folds.
Colors and fonts are defined in `tailwind.config.js` (`ink`, `paper`, `oxblood`) and loaded via
Google Fonts in `globals.css` (Fraunces / Source Sans 3 / IBM Plex Mono).

## Things to change before using this for a real client

- **Contact form has no backend.** It currently just shows a "submitted" confirmation in the browser.
  Wire it to an API route, Formspree, or an email service (e.g. Resend) before going live.
- **Testimonial and case results** are placeholders. Most state bars regulate how attorneys can
  display results/testimonials — confirm exact wording rules with the client's bar association
  before publishing real ones.
- **Disclaimer text** in the footer and contact page ("Attorney Advertising...", "no attorney-client
  relationship...") is a reasonable starting point but should be reviewed against the client's
  state bar advertising rules — don't treat it as legal sign-off.
- Replace firm name, attorney name/credentials, phone, address, and stats with the real client's info.
- Swap the monogram avatar for a real headshot if the client has one.
