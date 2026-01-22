import React from "react";
import "./Testimonials.css";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      text: "I booked the band for a company event and received the most compliments from my colleagues stating this event was the best by far! We chose to do live band karaoke. They were amazing to work with. Booking was easy. Very reliable they showed up on time and sent me all of the info in a timely manner. 10/10 experience! I have since told all my friends and colleagues that they need to do it for their next event!",
      author: "Eliana",
      company: "Premise Health"
    },
    {
      id: 2,
      text: "As an Entertainment Manager I cannot recommend Nashville Live Band Karaoke enough! Not only are they all phenomenal musicians, but they are always punctual, friendly, and reliable! They have the ability to hold any crowd for any event and are consummate professionals. They communicate well and can make any participant feel comfortable and welcome! Hire them for your next event, you won't regret it!",
      author: "Matt Heller",
      company: "Entertainment Manager, Tin Roof"
    },
    {
      id: 3,
      text: "As the owner of The Ave booking agency, I've worked with hundreds of acts across the country—and this band is easily in the top echelon of performers I've ever booked. I've hired them multiple times for a wide range of venues and client types, and they deliver every single time. Their energy is off the charts whether they're playing to 30 people or hundreds. The vocals are exceptional, with harmonies that blend seamlessly like a family, and their musicianship is truly unrivaled—it feels like a full-scale concert experience every night. Beyond the performance, they are some of the nicest, most professional musicians you'll ever work with: punctual, accommodating, and incredibly respectful to guests and venue staff alike. I've never had a client finish a show without immediately asking how they can book them again for their next event.",
      author: "Andrew Valez",
      company: "The Ave Agency"
    }
  ];

  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="container">
        <h2 className="section-title">What People Are Saying</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
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