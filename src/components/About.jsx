import React from 'react';
import { motion } from 'framer-motion';
import { revealProps, viewportOnce, prefersReducedMotion } from '../animations';
import aboutData from '../data/about.json';
import './About.css';

// Same fadeUp language as revealProps, with a wider 0.15s stagger and a blur
// that resolves on entrance — the About cards are the only stacked column on
// the page, so they can afford the slower, softer chain.
const cardReveal = {
  hidden: prefersReducedMotion
    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
    : { opacity: 0, y: 20, filter: 'blur(6px)' },
  show: (slot = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: prefersReducedMotion
      ? { duration: 0 }
      : { duration: 0.45, ease: 'easeOut', delay: slot * 0.15 },
  }),
};

const cardRevealProps = (slot = 0) => ({
  variants: cardReveal,
  initial: 'hidden',
  whileInView: 'show',
  viewport: viewportOnce,
  custom: slot,
});

const About = () => {
  const aboutText = aboutData?.about_text ?? '';
  const features = aboutData?.features ?? [];

  return (
    <section id="about" className="section section-alt">
      <div className="container">
        <div className="about-split">
          <div className="about-copy">
            <motion.span className="section-eyebrow" {...revealProps(0)}>
              Who We Are
            </motion.span>
            <motion.h2 className="section-title" {...revealProps(1)}>
              About Us
            </motion.h2>
            <motion.p className="about-text" {...revealProps(2)}>
              {aboutText}
            </motion.p>
            <div className="about-features">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="feature"
                  {...cardRevealProps(index)}
                >
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div className="about-media" {...revealProps(2)}>
            <img
              src="/images/gallery/img_9001-2.jpg"
              alt="Nashville Live Band Karaoke performer on the mic with the full band behind them"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
