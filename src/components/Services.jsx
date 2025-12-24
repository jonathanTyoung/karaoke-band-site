import React from 'react';
import { motion } from 'framer-motion';
import './Services.css';

const Services = () => {
  const services = [
    {
      icon: '💍',
      title: 'Weddings',
      description: 'Make your special day unforgettable with interactive entertainment'
    },
    {
      icon: '🎂',
      title: 'Birthday Parties',
      description: 'Celebrate in style with karaoke fun for all ages'
    },
    {
      icon: '🏢',
      title: 'Corporate Events',
      description: 'Team building and entertainment your employees will love'
    }
  ];

  return (
    <section id="services" className="section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Perfect For Any Event
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We bring the party to you
        </motion.p>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="service-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <span className="service-icon">{service.icon}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;