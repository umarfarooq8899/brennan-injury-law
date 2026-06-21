

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

, and stats with the real client's info.
- Swap the monogram avatar for a real headshot if the client has one.
