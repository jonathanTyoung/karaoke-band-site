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
        >
          🎤 Nashville Live Band Karaoke
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
              href="#contact"
              className="nav-cta"
              onClick={(e) => scrollToSection(e, "contact")}
            >
              Book Now
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
