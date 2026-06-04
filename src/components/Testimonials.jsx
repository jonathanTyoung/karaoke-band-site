import React from "react";
import testimonialsData from "../data/testimonials.json";
import "./Testimonials.css";

const Testimonials = () => {
  const items = testimonialsData?.testimonials ?? [];

  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="container">
        <span className="section-eyebrow">Reviews</span>
        <h2 className="section-title">What People Are Saying</h2>
        <div className="testimonials-grid">
          {items.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;