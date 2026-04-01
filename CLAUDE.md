# CLAUDE.md — Nashville Live Band Karaoke Site
## Mobile UX Overhaul Session

Branch: `ui-styling-experiments`
Stack: React (CRA, react-scripts), vanilla global CSS (one file per component), Framer Motion v12, Swiper v12
No Tailwind. No CSS modules. No styled-components. All styles go in the component's existing `.css` file.

---

## Design System — DO NOT DEVIATE

All values are already defined in `App.css :root`. Reference these tokens — never hardcode raw hex values.

| Token | Value | Use |
|---|---|---|
| `--primary-pink` | `#ff1493` | CTAs, progress bars, active states |
| `--primary-gold` | `#ffd700` | Accents |
| `--primary-teal` | `#00d9ff` | Secondary accents |
| `--bg-dark` | `#060608` | Page/section backgrounds |
| `--bg-medium` | `#111116` | Card backgrounds |
| `--bg-light` | `#1e1e26` | Elevated surfaces |
| `--text-primary` | `#ffffff` | Headings, labels |
| `--text-secondary` | `rgba(255,255,255,0.9)` | Body copy |
| `--text-muted` | `rgba(255,255,255,0.6)` | Hints, placeholders |
| `--border-color` | `rgba(232,137,12,0.25)` | Input borders, card borders |
| `--font-display` | `'Bebas Neue', sans-serif` | All headings, step titles, button text |
| `--font-body` | `'Poppins', sans-serif` | All body copy, labels, inputs |

Aesthetic: dark Nashville concert venue. Hot pink primary CTAs. Bebas Neue for all display text. Poppins for all body/UI text.

---

## ⚠️ NETLIFY FORMS — ABSOLUTE CONSTRAINTS

The form submits via Netlify Forms. `handleSubmit` POSTs to `"/"` with `application/x-www-form-urlencoded`.

**The following must not change under any circumstances:**

### Field name attributes (Netlify keys off these)
- `name` — Full Name
- `email` — Email Address
- `phone` — Phone Number
- `contactPreference` — Preferred Contact Method
- `eventType` — Event Type
- `eventDate` — Event Date
- `venueLocation` — Venue Location
- `guestCount` — Expected Guests
- `eventTime` — Event Start Time
- `eventDuration` — Estimated Duration
- `message` — Additional Details
- `howHeard` — How did you hear about us?
- `bot-field` — Honeypot (must remain a hidden input, never visible)

### Field id attributes
`name`, `email`, `phone`, `contact-preference`, `event-type`, `event-date`, `venue-location`, `guest-count`, `event-time`, `event-duration`, `message`, `how-heard`

### Hidden fields — must survive untouched
```jsx
<input type="hidden" name="form-name" value="contact" />
<input type="hidden" name="bot-field" />
```

### Submission handler
`handleSubmit` in `ContactForm.jsx` — do not modify. The mobile flow's final step "Submit" button triggers the same handler. No changes to the POST logic, error handling, or success state.

**Rule:** The multi-step mobile flow is a visual UX layer on top of existing fields. Same inputs, same names, same IDs, same handler. Fields are revealed one step at a time — they are never removed from the DOM or restructured.

---

## Mobile Strategy

- **Breakpoint:** `@media (max-width: 768px)` — universal breakpoint already used across all components
- **Scope:** Mobile styles only. Desktop form (`min-width: 769px`) is completely untouched.
- **Approach:** The mobile flow wraps existing fields in a step controller. It does not replace or restructure the form — it controls visibility of field groups per step.
- **Animations:** Use Framer Motion (already installed, v12). Use `AnimatePresence` for step transitions. Match the motion style already used in the codebase (entrance animations, `whileHover`, `whileTap`).
- **Tap targets:** Minimum 48px height on all interactive elements.
- **No layout-shift on focus:** Remove `transform: translateY(-2px)` from `.form-group input:focus, select:focus, textarea:focus` in `ContactForm.css` — this is a known bug, fix it during this pass.

---

## Component File Map

| Component | JSX | CSS |
|---|---|---|
| App | `src/App.jsx` | `src/App.css` |
| Navbar | `src/components/Navbar.jsx` | `src/components/Navbar.css` |
| Hero | `src/components/Hero.jsx` | `src/components/Hero.css` |
| About | `src/components/About.jsx` | `src/components/About.css` |
| Gallery | `src/components/Gallery.jsx` | `src/components/Gallery.css` |
| Services | `src/components/Services.jsx` | `src/components/Services.css` |
| Testimonials | `src/components/Testimonials.jsx` | `src/components/Testimonials.css` |
| ContactForm | `src/components/ContactForm.jsx` | `src/components/ContactForm.css` |
| Footer | `src/components/Footer.jsx` | `src/components/Footer.css` |

**Structural note:** The `#contact` section wrapper, `.container`, `<h2>Book Your Event</h2>` heading, and subtitle `<p>` are in `App.jsx` — not inside `ContactForm`. ContactForm only renders `.contact-form-wrapper` and the `<form>` inside it.

---

## Session Progress

- [ ] ContactForm — multi-step mobile flow
- [ ] Hero — mobile-first hero experience
- [ ] Navbar — hamburger menu (already partially present per intel)
- [ ] Services / About — proper stacking, font sizing
- [ ] Gallery — touch/swipe carousel (Swiper already installed)
- [ ] Testimonials — clean mobile stack
- [ ] Footer — simplified, essentials only

---

## Known Issues (fix on contact during this pass)
- `transform: translateY(-2px)` on input focus — `ContactForm.css:164` — causes layout shift on every focused field. Remove it.
- `.calendar-button` in `ContactForm.css` — dead code, class styled but no element uses it. Leave it, do not remove (harmless).
- Framer Motion `whileHover={{ scale: 1.02 }}` on submit button duplicates the CSS hover transform. Leave it.
- One surviving emoji `🎉` in success toast (`ContactForm.jsx:137`) — leave it.