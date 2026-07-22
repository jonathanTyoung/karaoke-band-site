import React, { useState } from 'react';
import { motion } from 'framer-motion';
import aboutData from '../data/about.json';
import './About.css';

const DEFAULT_REEL_VIDEO = '/videos/nlbk-reel.mp4';
const DEFAULT_REEL_POSTER = '/videos/nlbk-reel-poster.jpg';

const About = () => {
  const aboutText = aboutData?.about_text ?? '';
  const features = aboutData?.features ?? [];
  const reelVideo = aboutData?.reel_video || DEFAULT_REEL_VIDEO;
  const reelPoster = aboutData?.reel_poster || DEFAULT_REEL_POSTER;
  const [reducedMotion] = useState(
    () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  );

  return (
    <section id="about" className="section section-alt">
      <div className="container">
        <div className="about-grid">
          <div className="about-copy">
            <motion.span
              className="section-eyebrow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Who We Are
            </motion.span>
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              About Us
            </motion.h2>
            <div className="about-content">
              <motion.p
                className="about-text"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {aboutText}
              </motion.p>
              <div className="about-features">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="feature"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <motion.div
            className="about-reel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <video
              className="about-reel-video"
              src={reelVideo}
              poster={reelPoster}
              muted
              playsInline
              loop
              autoPlay={!reducedMotion}
              preload="metadata"
              aria-label="Nashville Live Band Karaoke performance reel"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
