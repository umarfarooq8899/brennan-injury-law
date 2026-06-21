
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

