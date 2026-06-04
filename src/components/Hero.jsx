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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Request a Quote
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
