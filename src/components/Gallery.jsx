import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import matter from "gray-matter";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Gallery.css";

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Import all markdown files from the gallery folder
    const importAll = (r) => {
      return r.keys().map((fileName) => {
        const fileContent = r(fileName);
        const { data } = matter(fileContent.default);
        return {
          url: data.image,
          alt: data.alt || "Gallery image",
          caption: data.caption || "",
        };
      });
    };

    try {
      const context = require.context(
        "!!raw-loader!../data/gallery",
        false,
        /\.md$/
      );
      const galleryImages = importAll(context);

      // Fallback to placeholder images if no CMS images yet
      if (galleryImages.length === 0) {
        setImages([
          {
            url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
            alt: "Live music performance",
          },
          {
            url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
            alt: "Concert crowd",
          },
          {
            url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
            alt: "Event atmosphere",
          },
        ]);
      } else {
        setImages(galleryImages);
      }
    } catch (error) {
      // If folder doesn't exist yet, use placeholders
      setImages([
        {
          url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
          alt: "Live music performance",
        },
        {
          url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
          alt: "Concert crowd",
        },
      ]);
    }
  }, []);

  return (
    <section id="gallery" className="section section-alt">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Recent Events
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          See us in action at recent gigs
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
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
                  <img src={image.url} alt={image.alt} />
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
