import React from "react";
import { motion } from "framer-motion";
import "./Hero.css";

const Hero = () => {
  const scrollToContact = (e) => {
    e.preventDefault();
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
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

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We bring the band, you bring the voice!
        </motion.p>
        <motion.a
          href="#contact"
          className="cta-button"
          onClick={scrollToContact}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileTap={{ scale: 0.98 }}
        >
          Book Your Event
        </motion.a>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
