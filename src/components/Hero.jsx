import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Hero.css";

const Hero = () => {
  // Subtle scroll parallax: lift the hero content as the user scrolls past it.
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 400], [0, -70]);

  const scrollToContact = (e) => {
    e.preventDefault();
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <motion.div className="hero-content" style={{ y: parallaxY }}>
        <h1 className="sr-only">
          Nashville Live Band Karaoke — Premium Live Band Karaoke for Weddings,
          Birthdays &amp; Corporate Events
        </h1>
        <motion.div
          className="hero-logo-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/hero-logo2.png"
            alt="Nashville Live Band Karaoke"
            className="hero-logo"
          />
        </motion.div>

        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="hero-headline">
            For one night, you&apos;re the headliner.
          </p>
          <p className="hero-subline">
            Professional musicians back you up while you sing your favorite
            songs — weddings, parties, and corporate events across Nashville.
          </p>
        </motion.div>
        <motion.a
          href="#contact"
          className="cta-button"
          onClick={scrollToContact}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileTap={{ scale: 0.95 }}
        >
          Request a Quote
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
