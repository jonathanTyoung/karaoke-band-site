import React from 'react';
import { motion } from 'framer-motion';
import { revealProps } from '../animations';
import servicesData from '../data/services.json';
import './Services.css';

const Services = () => {
  const services = servicesData?.services ?? [];

  return (
    <section id="services" className="section section-alt">
      <div className="container">
        <motion.span className="section-eyebrow" {...revealProps(0)}>
          What We Do
        </motion.span>
        <motion.h2 className="section-title" {...revealProps(1)}>
          Nashville Live Band Karaoke for Any Event
        </motion.h2>
        <motion.p className="section-subtitle" {...revealProps(2)}>
          We bring the live karaoke band to you
        </motion.p>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`service-card${service.image ? ' service-card--image' : ''}`}
              style={service.image ? { backgroundImage: `url(${service.image})` } : undefined}
              {...revealProps(index)}
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