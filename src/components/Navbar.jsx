import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <a
          href="#hero"
          className="nav-logo"
          onClick={(e) => scrollToSection(e, "hero")}
          aria-label="Nashville Live Band Karaoke"
        >
          <span className="nav-logo-wordmark">
            <span className="nav-logo-line">Nashville Live</span>
            <span className="nav-logo-line nav-logo-line-accent">
              Band Karaoke
            </span>
          </span>
        </a>

        <button
          className={`nav-toggle ${isOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
          <li>
            <a
              href="#about"
              className="nav-link"
              onClick={(e) => scrollToSection(e, "about")}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#gallery"
              className="nav-link"
              onClick={(e) => scrollToSection(e, "gallery")}
            >
              Gallery
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="nav-link"
              onClick={(e) => scrollToSection(e, "services")}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#testimonials"
              className="nav-link"
              onClick={(e) => scrollToSection(e, "testimonials")}
            >
              Testimonials
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="nav-cta"
              onClick={(e) => scrollToSection(e, "contact")}
            >
              Request a Quote
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;