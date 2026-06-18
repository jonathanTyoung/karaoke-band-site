import React from 'react';
import { motion } from 'framer-motion';
import servicesData from '../data/services.json';
import './Services.css';

const Services = () => {
  const services = servicesData?.services ?? [];

  return (
    <section id="services" className="section section-alt">
      <div className="container">
        <motion.span
          className="section-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          What We Do
        </motion.span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Nashville Live Band Karaoke for Any Event
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We bring the live karaoke band to you
        </motion.p>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`service-card${service.image ? ' service-card--image' : ''}`}
              style={service.image ? { backgroundImage: `url(${service.image})` } : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={service.image ? undefined : { scale: 1.05, y: -10 }}
            >
              <p>{service.description}</p>
              <h3>{service.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;