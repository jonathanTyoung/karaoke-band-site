import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { revealProps } from "../animations";
import galleryData from "../data/gallery.json";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
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

        <motion.div {...revealProps(2)}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            className="gallery-swiper"
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="gallery-slide">
                  <img
                    src={image.url}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  {image.caption && (
                    <p className="image-caption">{image.caption}</p>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
