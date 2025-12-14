// ==========================================
// BURGER MENU TOGGLE
// ==========================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

// Toggle menu on burger click
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close menu when clicking a nav link
const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  }
});

// ==========================================
// SWIPER CAROUSEL INITIALIZATION
// ==========================================

const swiper = new Swiper('.gallery-swiper', {
  // How many slides visible at once
  slidesPerView: 1,
  spaceBetween: 30,
  
  // Center the active slide
  centeredSlides: true,
  
  // Loop through slides infinitely
  loop: false,
  
  // Autoplay (optional - remove if you don't want auto-advance)
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  
  // Smooth effect
  effect: 'slide',
  speed: 800,
  
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  
  // Pagination dots
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },
  
  // Keyboard control
  keyboard: {
    enabled: true,
  },
  
  // Mouse wheel scroll
  mousewheel: {
    forceToAxis: true,
  },
  
  // Responsive breakpoints
  breakpoints: {
    // When window width is >= 768px
    768: {
      slidesPerView: 1.5,
      spaceBetween: 40,
    },
    // When window width is >= 1024px
    1024: {
      slidesPerView: 2,
      spaceBetween: 50,
    },
  },
});

// ==========================================
// SMOOTH SCROLL BEHAVIOR (Enhanced)
// ==========================================

// Already handled by CSS (scroll-behavior: smooth)
// But adding JS for better control

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const navHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = target.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ==========================================
// NAVBAR SCROLL EFFECT (Optional Enhancement)
// ==========================================

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Add shadow when scrolled
  if (currentScroll > 50) {
    navbar.style.boxShadow = '0 5px 30px rgba(255, 0, 110, 0.3)';
  } else {
    navbar.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// ==========================================
// FORM ENHANCEMENT (Optional)
// ==========================================

const contactForm = document.querySelector('form[name="contact"]');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    // Netlify handles the actual submission
    // This is just for UX feedback
    
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Form will submit normally to Netlify
    // After submission, user will see thank you page or success message
  });
}

// ==========================================
// SCROLL ANIMATIONS (Optional - Fade in on scroll)
// ==========================================

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for fade-in effect
const fadeElements = document.querySelectorAll('.feature, .service-card, .section-title');
fadeElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ==========================================
// NEON CURSOR TRAIL (Extra Edgy Effect - Optional)
// ==========================================

// Uncomment below for cursor trail effect (might be too much)
/*
const cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  trail.style.left = e.pageX + 'px';
  trail.style.top = e.pageY + 'px';
  document.body.appendChild(trail);
  
  cursorTrail.push(trail);
  
  if (cursorTrail.length > trailLength) {
    cursorTrail.shift().remove();
  }
  
  setTimeout(() => {
    trail.remove();
  }, 500);
});
*/

// ==========================================
// CONSOLE MESSAGE (Easter Egg)
// ==========================================

console.log('%c🎤 Nashville Karaoke Rocks! 🎸', 
  'font-size: 20px; font-weight: bold; color: #ff006e; text-shadow: 0 0 10px #ff006e;');
console.log('%cLooking for a web developer? Contact us!', 
  'font-size: 14px; color: #ffbe0b;');