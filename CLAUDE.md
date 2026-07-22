# CLAUDE.md — Nashville Live Band Karaoke (NLBK)

Marketing/booking site for a Nashville live-band-karaoke act. Single-page React app
with a contact form that emails the owner (Alex) and a Decap CMS at `/admin`.

> This file documents the codebase **as it actually is** (verified 2026-06-03, after the
> CMS-wiring sprint that connected About/Services/Testimonials to Decap — see CMS section).
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
| About | `About.jsx` | `About.css` (103) | Blurb + 3 feature cards | **CMS-driven** — reads `src/data/about.json` (`about_text` + `features[]`). Fallbacks: `?? ''` / `?? []`. |
| Gallery | `Gallery.jsx` (77) | `Gallery.css` (100) | Swiper carousel of images | **CMS-driven** — reads `src/data/gallery.json`. Current contents are placeholder Unsplash URLs. |
| Services | `Services.jsx` | `Services.css` (80) | 3 service cards | **CMS-driven** — reads `src/data/services.json` (`services[]`). Fallback `?? []`. |
| Testimonials | `Testimonials.jsx` | `Testimonials.css` (242) | 3 testimonial cards, 5-star | **CMS-driven** — reads `src/data/testimonials.json` (`testimonials[]` of author/company/text). 5 stars hardcoded (no `rating` field). Fallback `?? []`. No Framer. |
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

## CMS — actual state (Gallery, Testimonials, About, Services are wired)

Decap CMS via **git-gateway** backend → commits to `main`. Auth is **Netlify Identity**
(the `netlify-identity-widget` in `public/index.html` and `public/admin/index.htm` handles
login + the invite/recovery token redirect to `/admin/`).

- The CMS served in production comes from **`public/admin/`** (CRA copies `public/` → `build/`).
- **`public/admin/config.yml`** is the *live* config (the only one — the dead repo-root
  `admin/config.yml` was deleted). It defines four **file collections**, each editing one
  JSON file under `src/data/`.

### CMS data flow (what each collection edits → what consumes it)

| Collection | Edits file | Consumed by | Fields |
|---|---|---|---|
| Gallery | `src/data/gallery.json` | `Gallery.jsx` | `images[]`: url / alt / caption. Media folder `public/images/gallery`. |
| Testimonials | `src/data/testimonials.json` | `Testimonials.jsx` | `testimonials[]`: author / company / text |
| About | `src/data/about.json` | `About.jsx` | `about_text` + `features[]` (icon / title / description) |
| Services | `src/data/services.json` | `Services.jsx` | `services[]`: icon / title / description |

Every consuming component has an empty-state fallback (`?? []` / `?? ''`), so deleting all
entries in `/admin` renders nothing rather than crashing.

**How a CMS edit reaches the live site:** Alex edits in `/admin` → **git-gateway commits the
changed JSON directly to `main`** → Netlify auto-deploys `main` → the new content ships. No
manual code deploy needed. (Because edits land on `main`, pull `main` before starting new work
so you don't clobber Alex's content commits.)

**Still hardcoded (not CMS-driven):** Hero, Navbar, Footer.

**Not yet wired:** `content/settings/general.json` exists (real band name, phone, email,
Instagram + YouTube URLs) but **no component imports it** — candidate for a future general-settings
sprint. It has no `src/data/` counterpart yet. The stale `content/settings/about.json` and
`content/settings/services.json` duplicates were deleted once `src/data/` became the source of truth.

**Verify in prod:** **`public/admin/index.htm`** has a `.htm` extension (not `.html`). Netlify's
default directory index is `index.html`, so confirm `/admin/` actually loads the CMS and doesn't
fall through to the SPA redirect.

---

## Landmines / gotchas

- **Never rename ContactForm field `name` attributes** (Netlify + Zapier). See above.
- **Only one admin config now** — edit `public/admin/config.yml` (the one that ships). The dead
  repo-root `admin/config.yml` was deleted; don't recreate it. New CMS collections are **additive** —
  never edit/reorder existing collection blocks (Alex's content keys map to them).
- **`src/data/` is the source of truth** for CMS content — not `content/settings/`. The stale
  `content/settings/about.json` and `services.json` duplicates were removed; only `general.json`
  remains there (unwired).
- **`public/admin/index.htm`** extension — confirm `/admin/` loads.
- **Footer social label bug** (`Footer.jsx:29`): the YouTube link has `aria-label="TikTok"`
  and visible text "Youtube". Facebook link is commented out (`Footer.jsx:23`).
- **`src/logo.svg`** — unused CRA default leftover.
- Design tokens live in `App.css :root`. Brand pair is **pink + cyan** (`--brand-pink #ff1493`,
  `--accent`/`--brand-cyan #00d9ff`, `--gradient-brand` pink→cyan, solid-cyan `--cta-bg`);
  **gold was fully retired (July 2026)** — `--primary-gold`, `--primary-purple`, and
  `--gradient-title` no longer exist, don't reintroduce them. Warm-charcoal backdrop tokens
  (`--bg-base/-alt/-card/-elevated`, legacy `--bg-dark/-medium/-light` aliases), Anton display +
  Inter body font tokens. Aesthetic: dark concert venue, pink/cyan neon. Reference tokens,
  don't hardcode hex; keep hover glows subtle (`color-mix` alphas ≤ ~0.3).
- **Mobile breakpoint:** `@media (max-width: 768px)`, used consistently across components.

## Conventions

- One component = one `.jsx` + one `.css`, CSS imported in the JSX.
- In-page nav via anchor IDs (`#hero #about #gallery #services #testimonials #contact`) and
  `scrollIntoView`. Adding/renaming a section means updating Navbar links + the section `id`.
- Framer Motion for entrance/scroll reveals (`whileInView` + `viewport={{ once: true }}`).
