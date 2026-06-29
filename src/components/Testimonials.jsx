import React from "react";
import { motion } from "framer-motion";
import testimonialsData from "../data/testimonials.json";
import "./Testimonials.css";

const Testimonials = () => {
  const items = testimonialsData?.testimonials ?? [];

  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="container">
        <motion.span
          className="section-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Reviews
        </motion.span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What People Are Saying
        </motion.h2>
        <div className="testimonials-grid">
          {items.map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <div className="star-rating">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <div className="quote-mark">"</div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-footer">
                <div className="author-info">
                  <div className="author-name">{testimonial.author}</div>
                  <div className="author-company">{testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
