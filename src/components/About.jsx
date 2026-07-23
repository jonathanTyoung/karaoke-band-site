import React from 'react';
import { motion } from 'framer-motion';
import { revealProps } from '../animations';
import aboutData from '../data/about.json';
import './About.css';

const About = () => {
  const aboutText = aboutData?.about_text ?? '';
  const features = aboutData?.features ?? [];

  return (
    <section id="about" className="section section-alt">
      <div className="container">
        <motion.span className="section-eyebrow" {...revealProps(0)}>
          Who We Are
        </motion.span>
        <motion.h2 className="section-title" {...revealProps(1)}>
          About Us
        </motion.h2>
        <div className="about-content">
          <motion.p className="about-text" {...revealProps(2)}>
            {aboutText}
          </motion.p>
          <div className="about-features">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature"
                {...revealProps(index)}
              >
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
