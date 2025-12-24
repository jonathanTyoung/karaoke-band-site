import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const scrollToContact = (e) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Nashville's Best Karaoke Experience
        </motion.h1>
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          We bring the hits, you bring the voice!
        </motion.p>
        <motion.a 
          href="#contact" 
          className="cta-button"
          onClick={scrollToContact}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Book Your Event
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;