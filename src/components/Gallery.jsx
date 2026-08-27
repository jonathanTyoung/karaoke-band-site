import React from "react";
import { motion } from "framer-motion";
import { revealProps } from "../animations";
import galleryData from "../data/gallery.json";
import "./Gallery.css";

const Gallery = () => {
  const images = galleryData.images || galleryData;

  return (
    <section id="gallery" className="section">
      <div className="container">
        <motion.span className="section-eyebrow" {...revealProps(0)}>
          The Experience
        </motion.span>
        <motion.h2 className="section-title" {...revealProps(1)}>
          Nashville Live Band Karaoke in Action
        </motion.h2>
        <motion.p className="section-subtitle" {...revealProps(2)}>
          See us performing at weddings, parties, and events across Nashville
        </motion.p>
      </div>

      {/* Edge-to-edge elastic accordion — lives outside .container so it can
          break the 1200px column and the section's horizontal padding. */}
      <motion.div className="gallery-accordion" {...revealProps(2)}>
        {images.map((image, index) => (
          <div className="gallery-panel" key={index}>
            <img
              src={image.url}
              alt={image.alt}
              loading="lazy"
              decoding="async"
            />
            <div
              className={
                image.caption
                  ? "gallery-panel-overlay has-caption"
                  : "gallery-panel-overlay"
              }
            >
              {image.caption && (
                <p className="gallery-panel-caption">{image.caption}</p>
              )}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Gallery;
