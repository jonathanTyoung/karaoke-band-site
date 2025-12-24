import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Nashville Live Band Karaoke</h3>
            <p>Nashville's Premier Karaoke Entertainment</p>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>📧 bookings@nashvillekaraoke.com</p>
            <p>📱 (615) 555-1234</p>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                Facebook
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                Instagram
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Nashville Live Band Karaoke. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;