import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Services from "./components/Services";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import "./App.css";

// Desktop breakpoint matches the ContactForm mobile/desktop split exactly
// (mobile wizard <=768px, desktop two-column >=769px). Used to render the
// desktop-only left intro column without ever touching the mobile render.
function useIsDesktop() {
  const query = "(min-width: 769px)";
  const [isDesktop, setIsDesktop] = useState(
    () =>
      typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    setIsDesktop(mq.matches);
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isDesktop;
}

function App() {
  const isDesktop = useIsDesktop();

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <Services />
      <Testimonials />
      <section
        id="contact"
        className="section section-alt"
        style={{ paddingBottom: "6rem" }}
      >
        {/* Desktop (>=769px): two-column grid — intro copy left, form right.
            Mobile (<=768px): unchanged single-column header + wizard. */}
        <div className={`container${isDesktop ? " contact-grid" : ""}`}>
          {isDesktop ? (
            <div className="contact-intro">
              <span className="section-eyebrow">Get Started</span>
              <h2 className="section-title">Ready to Book?</h2>
              <p className="section-subtitle">
                Tell us a little about your event and we'll follow up with
                availability, format options, and a quote for your Nashville
                date.
              </p>
              <div className="contact-intro-details">
                <a href="mailto:info@nashvillelivebandkaraoke.com">
                  info@nashvillelivebandkaraoke.com
                </a>
                <a href="tel:+16155546020">(615) 554-6020</a>
              </div>
            </div>
          ) : (
            <>
              <span className="section-eyebrow">Get Started</span>
              <h2 className="section-title">Book Your Event</h2>
              <p className="section-subtitle">
                Tell us about your event and we'll get back to you within 24
                hours
              </p>
            </>
          )}
          <ContactForm />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default App;
