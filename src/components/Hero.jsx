import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { entranceProps, prefersReducedMotion } from "../animations";
import heroData from "../data/hero.json";
import "./Hero.css";

const DEFAULT_VIDEO_DESKTOP = "/videos/nlbk-reel-horizontal.mp4";
const DEFAULT_VIDEO_MOBILE = "/videos/nlbk-reel.mp4";
const DEFAULT_POSTER = "/videos/nlbk-horizontal-poster.jpg";

const Hero = () => {
  const videoDesktop = heroData?.video_desktop || DEFAULT_VIDEO_DESKTOP;
  const videoMobile = heroData?.video_mobile || DEFAULT_VIDEO_MOBILE;
  const poster = heroData?.poster || DEFAULT_POSTER;

  // Subtle scroll parallax: lift the hero content as the user scrolls past it.
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 400], [0, -70]);

  const scrollToContact = (e) => {
    e.preventDefault();
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="hero-section">
      {/* Sibling of .hero-content (not a child) so it stays fixed while the
          content parallaxes. Source order is the media-query contract:
          browsers pick the first matching <source> at load time. */}
      <video
        className="hero-bg-video"
        autoPlay={!prefersReducedMotion}
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-hidden="true"
        tabIndex={-1}
      >
        <source media="(min-width: 769px)" src={videoDesktop} />
        <source src={videoMobile} />
      </video>
      <div className="hero-scrim" aria-hidden="true" />
      <motion.div className="hero-content" style={{ y: parallaxY }}>
        <h1 className="sr-only">
          Nashville Live Band Karaoke — Premium Live Band Karaoke for Weddings,
          Birthdays &amp; Corporate Events
        </h1>
        <motion.div className="hero-logo-container" {...entranceProps(0)}>
          <img
            src="/hero-logo2.png"
            alt="Nashville Live Band Karaoke"
            className="hero-logo"
          />
        </motion.div>

        <motion.div className="hero-copy" {...entranceProps(1)}>
          <p className="hero-headline">
            For one night, you&apos;re the headliner.
          </p>
          <p className="hero-subline">
            Professional musicians back you up while you sing your favorite
            songs — weddings, parties, and corporate events across Nashville.
          </p>
        </motion.div>
        <motion.a
          href="#contact"
          className="cta-button"
          onClick={scrollToContact}
          {...entranceProps(2)}
          whileTap={{ scale: 0.95 }}
        >
          Request a Quote
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
