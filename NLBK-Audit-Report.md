# NLBK SEO Audit Report — Day 1

**Site:** Nashville Live Band Karaoke — https://nashvillelivebandkaraoke.com
**Stack:** React 19.2 (CRA, client-side rendered) · Netlify · Decap CMS
**Audited:** 2026-06-11 · branch `develop` @ `9220539`

---

## 1. Executive Summary

**Overall SEO readiness: 58/100**

The basics are better than expected — title, meta description, Open Graph, Twitter cards, and geo tags are all present and well-written, and a sitemap.xml + robots.txt already exist. But the site has zero structured data, **no H1 anywhere on the page**, a domain-identity split (meta tags say `nashvillelivebandkaraoke.com`, sitemap/robots say `kaleidoscopic-croissant-847552.netlify.app`, and both URLs serve the site with no redirect between them), and several multi-megabyte images with no lazy-loading.

### Top 5 critical gaps
1. **No H1 on the page.** The Hero renders the band name as an `<img>` only ([Hero.jsx:27-31](src/components/Hero.jsx#L27-L31)). The single most important on-page ranking element is missing.
2. **Zero JSON-LD structured data** — no LocalBusiness, Organization, or Service schema. For a local entertainment business, this is the biggest local-search lever ("karaoke band near me", map pack, rich results).
3. **Domain split / duplicate content.** Verified live: both `nashvillelivebandkaraoke.com` and `kaleidoscopic-croissant-847552.netlify.app` return HTTP 200 with identical content (same etag) and no redirect. [robots.txt](public/robots.txt) and [sitemap.xml](public/sitemap.xml) reference the **Netlify subdomain**, actively telling Google the wrong canonical host.
4. **No `<link rel="canonical">`** in [index.html](public/index.html) — compounds #3.
5. **Sitemap is built from hash fragments** (`/#about`, `/#services`, …). Google ignores `#fragment` URLs in sitemaps; effectively the sitemap contains one real URL on the wrong domain with a stale lastmod (2025-12-16).

### Top 5 quick wins
1. Add a canonical tag + fix the sitemap/robots URLs to `nashvillelivebandkaraoke.com` — three one-line edits.
2. Add an SEO-only H1 in Hero (visible text alongside/below the logo, or visually-hidden) — one component edit.
3. Paste the LocalBusiness JSON-LD (template in §3 below) into `public/index.html` — all required data already exists in `content/settings/general.json`.
4. Set the Netlify primary-domain redirect (Netlify dashboard: Domain management → set custom domain as primary with "redirect netlify.app subdomain") — zero code.
5. Compress `services-wedding.jpg` (2.1 MB), `services-corporate.jpg` (1.8 MB), `hero-logo2.png` (536 KB), `navbar-logo4.png` (476 KB) — biggest LCP/page-weight offenders.

---

## 2. Meta Tags & Open Graph

All from [public/index.html](public/index.html). Current state is largely good.

| Tag | Current Value | Recommendation | Priority |
|---|---|---|---|
| `<title>` | "Nashville Live Band Karaoke \| Sing with Professional Musicians" (66 chars) | Good. Optionally front-load event keywords: "Nashville Live Band Karaoke \| Weddings, Parties & Corporate Events" | Low |
| `<meta name="description">` | Present, 232 chars — well written but long | Trim to ≤160 chars so it doesn't truncate: *"Live band karaoke in Nashville, TN. Professional musicians back you up at weddings, corporate events & parties. Book your rockstar moment today!"* (146) | Med |
| `<meta name="keywords">` | Present | Ignored by Google since 2009; harmless. Leave or delete. | Low |
| `<meta name="robots">` | **Missing** | Not required (default is index,follow) — skip. | Low |
| `<link rel="canonical">` | **Missing** | Add `<link rel="canonical" href="https://nashvillelivebandkaraoke.com/" />` | **High** |
| `og:type` / `og:url` / `og:title` / `og:description` / `og:image` | All present; url = custom domain ✅ | Add `og:image:width` (1200), `og:image:height` (630), `og:image:alt`, and `og:site_name`. Verify `preview-image.jpg` is actually 1200×630. | Med |
| `twitter:card` etc. | All present (`summary_large_image`) | Fine as-is. | — |
| `geo.region` / `geo.placename` | Present (US-TN / Nashville) | Fine (minor signal, superseded by LocalBusiness schema). | — |
| viewport | Present ✅ | — | — |
| favicon / apple-touch-icon | Present, but **duplicate** `apple-touch-icon` links at [index.html:6](public/index.html#L6) and [index.html:64](public/index.html#L64) pointing to different files | Remove one (keep `apple-touch-icon.png`). | Low |
| `lang` | `<html lang="en">` ✅ | — | — |

**Note (informational):** `preview-image.jpg` exists in `public/` ✅ but is 536 KB — compress to <200 KB for faster social scraping.

---

## 3. Schema Markup Gaps

**Current state: no `<script type="application/ld+json">` blocks exist anywhere.** Every schema below is missing. All templates are ready to paste into `public/index.html` `<head>`; values were pulled from `content/settings/general.json`, `src/data/services.json`, and `Footer.jsx`.

### 3.1 LocalBusiness — **Priority: HIGH (do first)**

Single most impactful addition for local search. Use `EntertainmentBusiness` (a LocalBusiness subtype). NLBK is mobile (performs at client venues), so no street address — use `areaServed` instead. *(Ask Alex if he wants a service-area radius beyond Nashville.)*

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "EntertainmentBusiness",
  "@id": "https://nashvillelivebandkaraoke.com/#business",
  "name": "Nashville Live Band Karaoke",
  "description": "Live band karaoke entertainment for weddings, birthday parties, corporate events, and private parties in Nashville, TN. Professional musicians back you up as you sing.",
  "url": "https://nashvillelivebandkaraoke.com",
  "telephone": "+16155546020",
  "email": "info@nashvillelivebandkaraoke.com",
  "image": "https://nashvillelivebandkaraoke.com/preview-image.jpg",
  "logo": "https://nashvillelivebandkaraoke.com/logo512.png",
  "priceRange": "$$",
  "areaServed": {
    "@type": "City",
    "name": "Nashville",
    "containedInPlace": { "@type": "State", "name": "Tennessee" }
  },
  "sameAs": [
    "https://www.instagram.com/nashvillelivebandkaraoke/",
    "https://www.youtube.com/channel/UCz_99924laysy_Jqhc9X4hg"
  ]
}
</script>
```

### 3.2 Organization — **Priority: LOW (skip)**

Redundant with `EntertainmentBusiness` (which inherits from Organization). Adding both creates duplicate-entity ambiguity. The `logo` + `sameAs` fields above cover what Organization would add. **Recommendation: don't add a separate Organization block.**

### 3.3 Service (×3: Wedding / Birthday / Corporate) — **Priority: HIGH**

Matches `src/data/services.json`. Embed as one block via `@graph`, with `provider` referencing the business `@id`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Wedding Live Band Karaoke",
      "serviceType": "Wedding Entertainment",
      "description": "Make your special day unforgettable with interactive live band karaoke entertainment at your Nashville wedding or reception.",
      "provider": { "@id": "https://nashvillelivebandkaraoke.com/#business" },
      "areaServed": { "@type": "City", "name": "Nashville" }
    },
    {
      "@type": "Service",
      "name": "Birthday Party Live Band Karaoke",
      "serviceType": "Party Entertainment",
      "description": "Celebrate in style — live band karaoke fun for all ages at birthday parties across Nashville.",
      "provider": { "@id": "https://nashvillelivebandkaraoke.com/#business" },
      "areaServed": { "@type": "City", "name": "Nashville" }
    },
    {
      "@type": "Service",
      "name": "Corporate Event Live Band Karaoke",
      "serviceType": "Corporate Entertainment",
      "description": "Team building and entertainment your employees will love — live band karaoke for corporate events in Nashville.",
      "provider": { "@id": "https://nashvillelivebandkaraoke.com/#business" },
      "areaServed": { "@type": "City", "name": "Nashville" }
    }
  ]
}
</script>
```

> No `priceRange`/`offers` on Services — pricing is quote-based via the contact form. Don't invent prices.

### 3.4 AggregateRating + Review — **Priority: MEDIUM, with a caveat**

There ARE 3 strong testimonials in `src/data/testimonials.json` (author + company + text), **but no `rating` or `date` fields** — the 5 stars are hardcoded UI decoration ([Testimonials.jsx:16-22](src/components/Testimonials.jsx#L16-L22)).

**Caveat:** Google's guidelines flag self-serving review markup — `AggregateRating` on a LocalBusiness sourced from reviews the business itself displays is exactly the pattern Google stopped showing stars for (and can draw a manual action if the numbers aren't backed by real collected ratings). **Recommendation:** add `review` markup (the three real testimonials, which are genuine) without a fabricated `aggregateRating`, OR skip entirely and push Google-Business-Profile reviews instead (those generate the map-pack stars that actually matter for a local business).

If Alex wants the Review markup, first add `rating` and `date` fields to the Testimonials CMS collection (additive field — safe per CLAUDE.md rules), then nest under the business:

```json
"review": [
  {
    "@type": "Review",
    "author": { "@type": "Person", "name": "Matt Heller" },
    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
    "reviewBody": "As an Entertainment Manager I cannot recommend Nashville Live Band Karaoke enough! ..."
  }
]
```

### 3.5 Event — **Priority: LOW / N-A for now**

The site advertises private bookings, not public performances. The Gallery is "Recent Events" (past, not upcoming). Skip unless Alex starts promoting public shows — revisit then (would pair well with a CMS "Upcoming Shows" collection).

---

## 4. Content & On-Page SEO

### H-tag structure (actual, as rendered)

```
(NO H1 — ❌ critical gap)
├── H2 "About Us"                    (About.jsx)
├── H2 "Recent Events"               (Gallery.jsx)
├── H2 "Perfect For Any Event"       (Services.jsx)
├── H2 "What People Are Saying"      (Testimonials.jsx)
├── H2 "Book Your Event"             (App.jsx — #contact section)
│
├── H3 ×3 feature titles             (About.jsx — under "About Us" ✅)
├── H3 ×3 service titles             (Services.jsx ✅ — but rendered AFTER the <p> description, Services.jsx:52-53)
├── H3 ×5 wizard step titles         (ContactForm.jsx — "What's the occasion?" etc. ✅ under "Book Your Event")
├── H3 "Thank You!"                  (ContactForm success toast)
└── H3 "Nashville Live Band Karaoke" + H4 "Contact" / "Follow Us"   (Footer.jsx)
```

**Findings:**
- **No H1 exists.** Every H2 technically "skips" because there is nothing above it. Fix: add an H1 to Hero. Two options:
  - Visible: render the tagline area with an H1 like *"Live Band Karaoke in Nashville"* above the existing subtitle.
  - Minimal-design-impact: wrap the band name in a visually-hidden H1 (`<h1 className="sr-only">Nashville Live Band Karaoke — Live Band Karaoke for Nashville Events</h1>`). Visible is better for SEO+UX; hidden is acceptable.
- No skipped levels below that (H2→H3 everywhere, H3→H4 in footer). ✅
- [Services.jsx:52-53](src/components/Services.jsx#L52-L53) renders `<p>` *before* `<h3>` inside each card — works visually but inverted document order; swap when convenient.
- Footer headings (H3/H4) are stylistic; fine to leave, or demote to `<p>`/`<div>` for purity. Low priority.

### Semantic HTML

| Element | Status |
|---|---|
| `<nav>` | ✅ Navbar.jsx |
| `<section>` | ✅ every section, with anchor ids |
| `<footer>` | ✅ Footer.jsx |
| `<main>` | ❌ Missing — App.jsx renders sections directly in a `<div>`. Wrap Hero→Contact in `<main>`. |
| `<header>` | ❌ Missing — optional; could wrap Navbar (or Hero). Low value. |

### Alt text audit

| Image | Location | Alt | Status |
|---|---|---|---|
| `/navbar-logo4.png` | Navbar.jsx:38 | "Nashville Live Band Karaoke" | ✅ |
| `/apple-touch-icon.png` (mobile logo) | Navbar.jsx:43 | "Nashville Live Band Karaoke" | ✅ (consider `alt=""` — duplicate announcement of the same link text for screen readers) |
| `/hero-logo2.png` | Hero.jsx:27 | "Nashville Live Band Karaoke" | ✅ — but enrich since it's the de-facto H1: `"Nashville Live Band Karaoke — live band karaoke entertainment"` (or better, add a real H1 and keep alt as-is) |
| Gallery images ×5 | gallery.json via Gallery.jsx:72 | "Live music performance", "Concert crowd", "Event atmosphere", "Stage performance", "Event Party" | ⚠️ Present but generic. See per-image recs below. |
| Service card images ×3 | services.json | **None possible** — rendered as CSS `background-image` ([Services.jsx:45](src/components/Services.jsx#L45)) | ❌ Invisible to crawlers entirely. Either switch to `<img>` with alt, or accept (they're decorative-ish backgrounds; the H3+description carry the content). Medium. |

**Gallery alt-text recommendations** (edit in `/admin` → Gallery, or directly in [gallery.json](src/data/gallery.json)) — work the location + service keywords in naturally, don't stuff:

| File | Current | Recommended |
|---|---|---|
| img_5065.jpg | "Live music performance" | "Nashville Live Band Karaoke performing with a guest singer at a private event" |
| img_5066-2.jpg | "Concert crowd" | "Crowd singing along at a live band karaoke party in Nashville" |
| img_5063.jpg | "Event atmosphere" | "Stage lighting and band setup at a Nashville corporate event" |
| img_8847-3.jpg | "Stage performance" | "Guest performing live band karaoke with full band backing" |
| karaokefriends.jpg | "Event Party" | "Friends celebrating on stage at a live band karaoke birthday party" |

*(I described these from filenames/context — have Alex confirm the actual photo contents before shipping.)*

> CLAUDE.md note: it says gallery.json contains "placeholder Unsplash URLs" — **stale**; it now contains 5 real local images under `/images/gallery/`. Worth a CLAUDE.md touch-up.

### Internal linking

Single-page site → internal linking is anchor navigation only (Navbar ✅, Hero CTA → #contact ✅). Opportunities:
- Link service mentions inside the About blurb text to `#services`, and add a "See what clients say → #testimonials" tail to the Services section. (Marginal on a one-pager.)
- Footer: make the email a `mailto:` and phone a `tel:` link — currently plain `<p>` text ([Footer.jsx:16-17](src/components/Footer.jsx#L16-L17)). Helps mobile users and entity recognition.
- The real internal-linking win would come from breaking out `/weddings`, `/corporate-events`, `/birthday-parties` landing pages — but that requires a router/prerendering (see §7 LOW).

### Keyword opportunities by section

| Section | Current heading | Target keywords to work into copy |
|---|---|---|
| Hero | (none — logo img) | **"live band karaoke Nashville"** (primary, in new H1), "Nashville karaoke band" |
| About | "About Us" | "live band karaoke experience", "professional musicians Nashville" — consider H2 "About Nashville Live Band Karaoke" |
| Gallery | "Recent Events" | "Nashville events", "live karaoke party" (via captions/alt) |
| Services | "Perfect For Any Event" | "wedding entertainment Nashville", "corporate event entertainment Nashville", "birthday party band" — consider H2 "Live Band Karaoke for Weddings, Parties & Corporate Events" |
| Testimonials | "What People Are Saying" | "reviews" — fine as-is; venue names (Tin Roof) are good local signals already |
| Contact | "Book Your Event" | "book live band karaoke Nashville", "request a quote" |

All section copy except headings is CMS-driven (`src/data/*.json`) — keyword edits can ship through `/admin` without a code deploy.

---

## 5. Technical SEO

| Item | Status | Detail / Recommendation |
|---|---|---|
| **sitemap.xml** | ⚠️ Present but wrong | [public/sitemap.xml](public/sitemap.xml): all URLs on `kaleidoscopic-croissant-847552.netlify.app`; 4 of 5 entries are `#fragment` URLs Google ignores; lastmod stale (2025-12-16). **Fix:** reduce to a single entry, `https://nashvillelivebandkaraoke.com/`, current lastmod. Drop the fragment entries. |
| **robots.txt** | ⚠️ Present but wrong domain | [public/robots.txt](public/robots.txt): rules are fine (`Disallow: /admin/` ✅); `Sitemap:` line points at Netlify subdomain → change to custom domain. `Disallow: /thank-you.html` references a page that doesn't exist (harmless; remove for tidiness). |
| **Canonical** | ❌ Missing | Add to `index.html` head. Especially important given the live duplicate-host situation. |
| **Domain redirect** | ❌ **Verified live problem** | Both hosts return 200 with identical etags — no 301 from `*.netlify.app` → custom domain. Fix in Netlify dashboard (set primary domain) — Netlify then 301s the subdomain automatically. Owner/dashboard action. |
| **HTTPS** | ✅ | Netlify-managed cert, HTTP/2 confirmed. |
| **Mobile** | ✅ | Responsive (768px breakpoint), viewport tag, mobile form wizard. |
| **SPA fallback** | ✅ | `/* → /index.html 200` in netlify.toml — correct for SPA; no soft-404 risk on a one-pager. |
| **Rendering** | ⚠️ Inherent CRA limitation | All content is client-rendered; the raw HTML body is an empty `<div id="root">`. Googlebot renders JS (fine), but other crawlers/AI scrapers may not. Head metadata is static ✅ so social previews work. Full fix = prerender/SSG (see §7 LOW). |
| **Page weight** | ❌ | `services-wedding.jpg` **2.1 MB**, `services-corporate.jpg` **1.8 MB**, `img_0359-3.jpg` 1.0 MB, `dsc07006-3.jpg` 796 KB, `hero-logo2.png` 536 KB, `preview-image.jpg` 536 KB, `navbar-logo4.png` 476 KB. ~9 MB of imagery for one page. Compress + resize (services cards render ≈400–600px wide; 2.1 MB source is ~10× oversized). Convert photos to WebP (keep `.jpg` fallback or just re-encode — CMS media folder accepts any format). |
| **Lazy-loading** | ❌ None | No `loading="lazy"` anywhere. Add to Gallery `<img>` ([Gallery.jsx:72](src/components/Gallery.jsx#L72)) — below-the-fold carousel is the main candidate. Keep hero/navbar logos eager (hero is LCP). |
| **Fonts** | ✅ | Google Fonts with `preconnect` ×2 + `display=swap` — correct pattern. |
| **manifest.json** | ✅ Mostly | Complete (name, icons, start_url, display). Nit: `theme_color` `#000000` vs site `#0a0a0a`; `background_color` white vs dark site. Cosmetic. |
| **Hero LCP** | ⚠️ | `hero-logo2.png` (536 KB) is the LCP element. Compress and add `<link rel="preload" as="image" href="/hero-logo2.png">` + `fetchpriority="high"` on the img. |

---

## 6. Semantic HTML & Accessibility

- **Semantic structure:** `nav` ✅ / `section` ✅ / `footer` ✅ / **`main` missing** / `header` missing (optional).
- **ARIA on interactive elements — generally good:**
  - Hamburger: `aria-label="Toggle navigation"` ✅ ([Navbar.jsx:49](src/components/Navbar.jsx#L49)) — consider adding `aria-expanded={isOpen}`.
  - Social links: `aria-label` ✅ ([Footer.jsx:23-26](src/components/Footer.jsx#L23-L26)). **Note:** CLAUDE.md's "YouTube link has `aria-label="TikTok"`" landmine is **fixed/stale** — current code correctly says `aria-label="YouTube"`.
  - Form: every input has a proper `<label htmlFor>` ✅; wizard cards use `role="group"` + `aria-label` + `aria-pressed` ✅; mobile nav buttons have aria-labels ✅; honeypot is Netlify-standard ✅.
  - Gaps: error messages aren't associated via `aria-describedby`/`aria-invalid`, and the success toast lacks `role="status"`/`aria-live` — screen readers won't announce them. The required-field markers are visual-only (`<span className="required">*</span>`) — add `required`/`aria-required` to the actual inputs.
  - Decorative star ratings ([Testimonials.jsx:16-22](src/components/Testimonials.jsx#L16-L22)) should get `aria-hidden="true"` (5 ★ characters get read aloud individually).
- **Color contrast:** dark bg + gold/white text is generally high-contrast. Not measured in this pass — flag `--primary-gold #ffd700` on light surfaces if any get introduced; pink-on-dark (`#ff1493`) is the most likely borderline pair. (Run Lighthouse a11y for hard numbers — Day 2 candidate.)
- **Keyboard navigation:** all interactive elements are real `<button>`/`<a>`/inputs ✅. The mobile wizard correctly removes hidden selects from tab order (`tabIndex={-1}` + `aria-hidden`) ✅.

> CLAUDE.md staleness note: ContactForm is now a **5-step mobile wizard** (desktop renders all steps stacked), not "3 form-section blocks" — the Netlify/Zapier field-name contract is intact, but the doc's structural description is out of date.

---

## 7. Recommendations by Priority

### 🔴 CRITICAL (do first — blocks marketing launch)
- [ ] **Add H1 to Hero** — visible "Live Band Karaoke in Nashville" (or visually-hidden band-name H1 if design must stay logo-only). `Hero.jsx`
- [ ] **Add LocalBusiness (EntertainmentBusiness) JSON-LD** — template in §3.1, paste into `public/index.html` head.
- [ ] **Add Service schema ×3** — template in §3.3.
- [ ] **Fix domain split:** set primary domain in Netlify dashboard so `*.netlify.app` 301s to `nashvillelivebandkaraoke.com` *(Alex/dashboard action)*.
- [ ] **Add canonical tag** → `https://nashvillelivebandkaraoke.com/`.
- [ ] **Fix sitemap.xml** — single canonical-domain URL, drop `#fragment` entries, fresh lastmod.
- [ ] **Fix robots.txt** — Sitemap line → custom domain.

### 🟡 HIGH (do soon — foundational)
- [ ] Compress/resize the 7 oversized images (2.1 MB → ~150–250 KB each; WebP where possible).
- [ ] Upgrade gallery alt text to descriptive, keyword-bearing copy (§4 table — confirm photo contents with Alex; editable via `/admin`).
- [ ] Trim meta description to ≤160 chars.
- [ ] Add `og:site_name`, `og:image:width/height/alt`; compress `preview-image.jpg`; verify it's 1200×630.
- [ ] Wrap page content in `<main>` (`App.jsx`).
- [ ] Add `loading="lazy"` to Gallery imgs; preload + `fetchpriority="high"` the hero logo.
- [ ] Make footer phone/email `tel:`/`mailto:` links.

### 🟢 MEDIUM (incremental gains)
- [ ] Review markup for the 3 testimonials (no fabricated AggregateRating — see §3.4 caveat). Prereq: add `rating`/`date` fields to the Testimonials CMS collection (additive only).
- [ ] Services cards: swap CSS background-image for real `<img>` + alt (or accept as decorative); fix `<p>`-before-`<h3>` order.
- [ ] Keyword-tune section headings + CMS copy (§4 keyword table).
- [ ] A11y polish: `aria-expanded` on hamburger, `aria-invalid`/`aria-describedby` on form errors, `role="status"` on success toast, `aria-hidden` on star glyphs, `required` on required inputs.
- [ ] Remove duplicate apple-touch-icon link; align manifest `theme_color` with `#0a0a0a`.
- [ ] Run Lighthouse for Core Web Vitals + contrast baseline (after image compression, to measure the win).

### ⚪ LOW (long-term / defer)
- [ ] Prerender or migrate (react-snap as a cheap CRA option; Vite+SSG or Next.js as the real fix) so content exists in raw HTML.
- [ ] Per-service landing pages (`/weddings`, `/corporate-events`, `/birthday-parties`) — unlocks real internal linking and per-page titles; requires routing.
- [ ] Event schema + "Upcoming Shows" CMS collection if Alex starts promoting public gigs.
- [ ] Breadcrumb schema (only meaningful post-multi-page).
- [ ] **Google Business Profile** — *Alex action item.* For a local entertainment business this likely outranks everything else in this report for "near me" queries; the §3.4 review strategy should funnel there.
- [ ] Update CLAUDE.md stale notes found during this audit: gallery is real photos (not Unsplash), Footer aria-label bug is fixed, ContactForm is a 5-step wizard.

---

## Next steps (suggested Day 2 sequence)

1. Ship the CRITICAL code items in one PR (`feature/seo-foundation` off `develop`): H1, canonical, JSON-LD ×2, sitemap, robots, `<main>`. All are head/markup-only — zero risk to the Netlify/Zapier form contract.
2. Alex (dashboard): set Netlify primary domain redirect; start Google Business Profile.
3. Image compression pass + lazy-loading (separate PR — touches CMS media files; pull `main` first per CLAUDE.md).
4. Re-run: Lighthouse, Google Rich Results Test (validate the JSON-LD), and `site:nashvillelivebandkaraoke.com` check after the next crawl.
