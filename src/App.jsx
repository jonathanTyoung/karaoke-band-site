import React, { useState, useEffect } from "react";
import { motion, MotionConfig } from "framer-motion";
import { revealProps } from "./animations";
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
    // reducedMotion="user" also covers animate/exit cases (toast, wizard)
    // beyond the instant-render reveals handled in animations.js.
    <MotionConfig reducedMotion="user">
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
                <motion.span className="section-eyebrow" {...revealProps(0)}>
                  Get Started
                </motion.span>
                <motion.h2 className="section-title" {...revealProps(1)}>
                  Ready to Book?
                </motion.h2>
                <motion.p className="section-subtitle" {...revealProps(2)}>
                  Tell us a little about your event and we'll follow up with
                  availability, format options, and a quote for your Nashville
                  date.
                </motion.p>
                <motion.div
                  className="contact-intro-details"
                  {...revealProps(3)}
                >
                  <a href="mailto:info@nashvillelivebandkaraoke.com">
                    info@nashvillelivebandkaraoke.com
                  </a>
                  <a href="tel:+16155546020">(615) 554-6020</a>
                </motion.div>
              </div>
            ) : (
              <>
                <motion.span className="section-eyebrow" {...revealProps(0)}>
                  Get Started
                </motion.span>
                <motion.h2 className="section-title" {...revealProps(1)}>
                  Book Your Event
                </motion.h2>
                <motion.p className="section-subtitle" {...revealProps(2)}>
                  Tell us about your event and we'll get back to you within 24
                  hours
                </motion.p>
              </>
            )}
            <ContactForm />
          </div>
        </section>
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
