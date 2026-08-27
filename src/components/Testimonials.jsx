import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  revealProps,
  viewportOnce,
  prefersReducedMotion,
} from "../animations";
import testimonialsData from "../data/testimonials.json";
import "./Testimonials.css";

// Same fadeUp language as revealProps, stretched to a 0.1s stagger so the
// three wide cards don't land on top of each other.
const cardReveal = {
  hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
  show: (slot = 0) => ({
    opacity: 1,
    y: 0,
    transition: prefersReducedMotion
      ? { duration: 0 }
      : { duration: 0.45, ease: "easeOut", delay: slot * 0.1 },
  }),
};

const cardRevealProps = (slot = 0) => ({
  variants: cardReveal,
  initial: "hidden",
  whileInView: "show",
  viewport: viewportOnce,
  custom: slot,
});

const Testimonials = () => {
  const items = testimonialsData?.testimonials ?? [];
  // Cards expand independently, so track the open ones by index.
  const [expanded, setExpanded] = useState([]);

  const toggleQuote = (index) =>
    setExpanded((prev) =>
      prev.includes(index)
        ? prev.filter((openIndex) => openIndex !== index)
        : [...prev, index]
    );

  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="container">
        <motion.span className="section-eyebrow" {...revealProps(0)}>
          Reviews
        </motion.span>
        <motion.h2 className="section-title" {...revealProps(1)}>
          What People Are Saying
        </motion.h2>
        <div
          className={
            expanded.length
              ? "testimonials-grid has-expanded"
              : "testimonials-grid"
          }
        >
          {items.map((testimonial, index) => {
            const isExpanded = expanded.includes(index);
            const quoteId = `quote-${index}`;

            return (
              <motion.div
                key={index}
                className={
                  isExpanded
                    ? "testimonial-card is-expanded"
                    : "testimonial-card"
                }
                {...cardRevealProps(index)}
              >
                <div className="star-rating">
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
                <div className="quote-mark">"</div>
                <p className="testimonial-text" id={quoteId}>
                  {testimonial.text}
                </p>
                <button
                  type="button"
                  className="quote-toggle"
                  aria-controls={quoteId}
                  aria-expanded={isExpanded}
                  onClick={() => toggleQuote(index)}
                >
                  {isExpanded ? "Read less" : "Read more"}
                </button>
                <div className="testimonial-footer">
                  <div className="author-info">
                    <div className="author-name">{testimonial.author}</div>
                    <div className="author-company">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
