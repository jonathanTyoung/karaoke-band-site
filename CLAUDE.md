# CLAUDE.md — Nashville Live Band Karaoke (NLBK)

Marketing/booking site for a Nashville live-band-karaoke act. Single-page React app
with a contact form that emails the owner (Alex) and a Decap CMS at `/admin`.

> This file documents the codebase **as it actually is** (verified 2026-06-03, develop @ `329fd39`).
> Where it corrects an earlier draft or stale assumptions, that's noted inline. Trust the code.

---

## Stack

- **React 19.2** on **Create React App** (`react-scripts` 5.0.1). No eject.
- **Framer Motion v12** — entrance/scroll animations, `whileHover`/`whileTap`.
- **Swiper v12** — Gallery carousel only.
- **Plain global CSS** — one `.css` file per component, imported by that component.
  No Tailwind, no CSS modules, no styled-components.
- **No TypeScript.** Plain `.jsx`/`.js`. No `tsc`. ESLint via CRA's `react-app` preset.
- **No router.** Single page; navigation is in-page anchor scrolling (`scrollIntoView`).
- **No tests** beyond the CRA default (`App.test.js`, `setupTests.js`). `npm test` exists but isn't a gate.
- **Netlify** hosting + **Netlify Forms** + **Netlify Identity** (gates the CMS).
- **Decap CMS** (formerly Netlify CMS) loaded from unpkg at `/admin`.

## Scripts

```
npm start     # CRA dev server (localhost:3000)
npm run build # production build → build/
npm test      # CRA test runner (not a CI gate)
```

## Deploy

`netlify.toml`: `npm run build` → publish `build/`. SPA fallback redirect
`/* → /index.html 200`. Pushing to a branch triggers a Netlify build; **`main` is the
production branch** (Decap's git-gateway also commits to `main` — see CMS section).

---

## Branch model

- **`main`** — production. Netlify deploys this. Decap CMS writes here via git-gateway.
- **`develop`** — integration branch. Currently in sync with `main` (`329fd39`).
- **`feature/*`** — branch off `develop`, PR back into `develop`.

There are stale local/remote branches (`css-updates`, `ui-styling-experiments`) — abandoned,
do not build on them. `ui-styling-experiments` contains an earlier CLAUDE.md draft whose
design-token table and ContactForm claims are **inaccurate** for the current code; this file
supersedes it.

---

## Architecture

`src/App.jsx` is the whole page. It renders, in order:

```
Navbar → Hero → About → Gallery → Services → Testimonials → [#contact section] → Footer
```

Each is a self-contained component in `src/components/` with a sibling `.css` file.

**Structural note (load-bearing):** the `#contact` `<section>` wrapper, `.container`,
`<h2>Book Your Event</h2>`, and the subtitle `<p>` live in **`App.jsx`**, *not* inside
`ContactForm`. `ContactForm` renders only `.contact-form-wrapper` and the `<form>`.

### Component map

| Component | JSX | CSS | Renders | Notes |
|---|---|---|---|---|
| Navbar | `Navbar.jsx` (107) | `Navbar.css` (238) | Sticky nav, hamburger toggle, scroll-shadow, anchor links | `useState` open/scrolled + scroll listener. Logo swaps desktop/mobile img. |
| Hero | `Hero.jsx` (55) | `Hero.css` (155) | Logo, tagline, "Book Your Event" CTA | Framer entrance anims. Image `/hero-logo2.png`. |
| About | `About.jsx` (71) | `About.css` (103) | Blurb + 3 feature cards | **Features hardcoded in JSX** (icon/title/desc). |
| Gallery | `Gallery.jsx` (77) | `Gallery.css` (100) | Swiper carousel of images | **Only CMS-connected component** — reads `src/data/gallery.json`. |
| Services | `Services.jsx` (67) | `Services.css` (80) | 3 service cards | Hardcoded in JSX. |
| Testimonials | `Testimonials.jsx` (55) | `Testimonials.css` (242) | 3 testimonial cards, 5-star | Hardcoded, real client quotes. No Framer (plain divs). |
| ContactForm | `ContactForm.jsx` (585) | `ContactForm.css` (533) | Single-page booking form, 3 sections | See constraints below. |
| Footer | `Footer.jsx` (43) | `Footer.css` (106) | Contact info + social links | Instagram + YouTube live; Facebook commented out (`Footer.jsx:23`). |

---

## ⚠️ ContactForm — Netlify Forms + Zapier field-name constraint (DO NOT BREAK)

The live form works: owner Alex receives submission emails. Two systems key off the field
**`name` attributes**, so **renaming any field `name` silently breaks production**:

1. **Netlify Forms** detects fields by their `name` attribute at build/deploy time.
2. **A Zapier integration** maps Netlify submissions by these exact **kebab-case** keys.
   Commit `78a4681` ("updated contact form to match zapier kebab casing") deliberately
   renamed the multi-word fields to kebab-case to match Zapier's keys.

### Current field `name` / `id` attributes (verified — both kebab-case for multi-word fields)

| Field | `name` (and `id`) | element |
|---|---|---|
| Full Name | `name` | input |
| Email | `email` | input |
| Phone | `phone` | input |
| Preferred Contact Method | `contact-preference` | select |
| Event Type | `event-type` | select |
| Event Date | `event-date` | input[date] |
| Venue Location | `venue-location` | input |
| Expected Guests | `guest-count` | select |
| Event Start Time | `event-time` | input |
| Estimated Duration | `event-duration` | select |
| Additional Details | `message` | textarea |
| How did you hear | `how-heard` | select |

Hidden, **must survive untouched**:
```jsx
<input type="hidden" name="bot-field" />            {/* honeypot */}
<input type="hidden" name="form-name" value="contact" />
```
And on the `<form>`: `name="contact"`, `method="POST"`, `data-netlify="true"`,
`data-netlify-honeypot="bot-field"`.

> **Note on internal state:** React state keys are camelCase (`contactPreference`, `eventType`, …).
> `handleChange` converts the kebab-case `name` attribute → camelCase via regex
> (`ContactForm.jsx:38-56`). The **DOM `name` attributes** are the contract with Netlify/Zapier —
> the camelCase state is internal and can change freely; the kebab-case `name`s cannot.

### How submission works

`handleSubmit` (`ContactForm.jsx:93`) → `validate()` → `fetch("/", { method: "POST",
Content-Type: application/x-www-form-urlencoded, body: URLSearchParams(FormData) })` →
success toast (`🎉`, auto-dismiss 5s) + reset. Required fields: name, email, phone,
event-type, event-date, message (min 20 chars). It is **not** a multi-step wizard — it's
one page with three `.form-section` blocks (Your Information / Event Details / Tell Us More).

---

## CMS — actual state (mostly NOT wired to the rendered site)

Decap CMS via **git-gateway** backend → commits to `main`. Auth is **Netlify Identity**
(the `netlify-identity-widget` in `public/index.html` and `public/admin/index.htm` handles
login + the invite/recovery token redirect to `/admin/`).

**What actually ships and works:**
- The CMS served in production comes from **`public/admin/`** (CRA copies `public/` → `build/`).
- **`public/admin/config.yml`** is the *live* config. It defines a single **Gallery**
  collection editing one file: **`src/data/gallery.json`** (`images[]` of `url`/`alt`/`caption`),
  media folder `public/images/gallery`.
- **`Gallery.jsx` is the only component that consumes CMS data** — it imports
  `src/data/gallery.json`. Current contents are placeholder Unsplash URLs.

**What does NOT work / is disconnected (landmines for CMS work):**
- There are **two divergent configs**. The repo-root **`admin/config.yml`** is *aspirational
  and NOT served* (only `public/` ships). It defines gallery-folder, settings (general/about/
  services) and testimonials collections that **nothing reads** and whose target folders
  (`content/gallery`, `content/testimonials`) don't exist. Editing it has no effect in prod.
- **`content/settings/*.json` exist but no component imports them.** About, Services,
  Testimonials, Hero, Footer all **hardcode** their content in JSX. `content/settings/about.json`
  duplicates About.jsx's text; `content/settings/services.json` is wrong (it's a copy of
  about.json, not service cards); `general.json` has placeholder `band_name: "Band Name"`
  and empty social URLs.
- **`public/admin/index.htm`** has a `.htm` extension (not `.html`). Netlify's default
  directory index is `index.html`, so `/admin/` may fall through to the SPA redirect instead
  of loading the CMS — verify the admin actually loads at `/admin/` before relying on it.

**Net:** today the CMS edits gallery images only. Wiring About/Services/Testimonials/Footer/
settings to CMS content is **future work, not done.**

---

## Landmines / gotchas

- **Never rename ContactForm field `name` attributes** (Netlify + Zapier). See above.
- **Two admin configs** — edit `public/admin/config.yml` (the one that ships), not
  `admin/config.yml`. Reconcile or delete the dead one before extending the CMS.
- **`content/settings/services.json` holds the wrong data** (a copy of about.json).
- **`public/admin/index.htm`** extension — confirm `/admin/` loads.
- **`gray-matter` and `raw-loader`** are in `package.json` but **imported nowhere** in source —
  dead dependencies (likely leftovers from an abandoned CMS-rendering approach).
- **Footer social label bug** (`Footer.jsx:29`): the YouTube link has `aria-label="TikTok"`
  and visible text "Youtube". Facebook link is commented out (`Footer.jsx:23`).
- **`src/logo.svg`** — unused CRA default leftover.
- Design tokens live in `App.css :root`: `--primary-gold #ffd700`, `--primary-pink #ff1493`,
  `--primary-purple #00d9ff`, `--bg-dark #0a0a0a`, `--bg-medium #1a1a1a`, `--bg-light #2a2a2a`,
  `--border-color rgba(255,215,0,0.2)`. Body font is the **system stack** (`-apple-system…`);
  there are **no Bebas Neue / Poppins** font tokens despite what an earlier draft claimed.
  Aesthetic: dark concert venue, gold/pink accents. Reference tokens, don't hardcode hex.
- **Mobile breakpoint:** `@media (max-width: 768px)`, used consistently across components.

## Conventions

- One component = one `.jsx` + one `.css`, CSS imported in the JSX.
- In-page nav via anchor IDs (`#hero #about #gallery #services #testimonials #contact`) and
  `scrollIntoView`. Adding/renaming a section means updating Navbar links + the section `id`.
- Framer Motion for entrance/scroll reveals (`whileInView` + `viewport={{ once: true }}`).
