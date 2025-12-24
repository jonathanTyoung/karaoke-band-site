import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Services from "./components/Services";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <Services />
      <section
        id="contact"
        className="section section-alt"
        style={{ paddingBottom: "6rem" }}
      >
        <div className="container">
          <h2 className="section-title">Book Your Event</h2>
          <p className="section-subtitle">
            Fill out the form below and we'll get back to you within 24 hours
          </p>
          <ContactForm />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default App;
