// Shared scroll-reveal animation language — one energy level for every section.
// Use revealProps(slot) for whileInView reveals and entranceProps(slot) for
// on-mount entrances (hero). `slot` staggers siblings 0.08s apart; keep sibling
// chains ≤ ~0.6s total (slot 0–4).

// Static check at load: marketing page, no need to react to live changes.
export const prefersReducedMotion =
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// -10% bottom root margin fires the reveal just before the element enters the
// viewport (element-height-independent, unlike `amount` on tall blocks), so no
// section is ever blank once its top edge is 20%+ into the viewport.
export const viewportOnce = { once: true, margin: "0px 0px -10% 0px" };

export const fadeUp = {
  hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
  show: (slot = 0) => ({
    opacity: 1,
    y: 0,
    transition: prefersReducedMotion
      ? { duration: 0 }
      : { duration: 0.45, ease: "easeOut", delay: slot * 0.08 },
  }),
};

export const revealProps = (slot = 0) => ({
  variants: fadeUp,
  initial: "hidden",
  whileInView: "show",
  viewport: viewportOnce,
  custom: slot,
});

export const entranceProps = (slot = 0) => ({
  variants: fadeUp,
  initial: "hidden",
  animate: "show",
  custom: slot,
});
