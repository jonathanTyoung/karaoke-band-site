import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Gallery.css';

const Gallery = () => {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
      alt: 'Live music performance'
    },
    {
      url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
      alt: 'Concert crowd'
    },
    {
      url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
      alt: 'Event atmosphere'
    },
    {
      url: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800',
      alt: 'Stage performance'
    }
  ];

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