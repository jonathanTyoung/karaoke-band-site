import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  const features = [
    {
      icon: '🎵',
      title: 'Huge Song Library',
      description: 'Thousands of songs across all genres'
    },
    {
      icon: '🎙️',
      title: 'Pro Equipment',
      description: 'Crystal clear sound and lighting'
    },
    {
      icon: '🎉',
      title: 'Experienced Hosts',
      description: 'We keep the energy high all night'
    }
  ];

  return (
    <section id="about" className="section">
      <div className="container">
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
            We're Nashville's premier karaoke entertainment, bringing unforgettable 
            experiences to weddings, corporate events, birthday parties, and more. 
            With thousands of songs and professional equipment, we guarantee your 
            guests will have the time of their lives.
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
                whileHover={{ scale: 1.05 }}
              >
                <span className="feature-icon">{feature.icon}</span>
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