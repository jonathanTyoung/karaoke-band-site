// ==========================================
// BURGER MENU TOGGLE
// ==========================================

const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

// Toggle menu on burger click
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Close menu when clicking a nav link
const navLinks = document.querySelectorAll(".nav-link, .nav-cta");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  }
});

// ==========================================
// SWIPER CAROUSEL INITIALIZATION
// ==========================================

const swiper = new Swiper(".gallery-swiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  centeredSlides: true,
  loop: false,

  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },

  effect: "slide",
  speed: 800,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  keyboard: {
    enabled: true,
  },

  mousewheel: {
    forceToAxis: true,
  },

  breakpoints: {
    768: {
      slidesPerView: 1.5,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 50,
    },
  },
});

// ==========================================
// SMOOTH SCROLL BEHAVIOR
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const navHeight = document.querySelector(".navbar").offsetHeight;
      const targetPosition = target.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    navbar.style.boxShadow = "0 5px 30px rgba(255, 0, 110, 0.3)";
  } else {
    navbar.style.boxShadow = "none";
  }

  lastScroll = currentScroll;
});

// ==========================================
// ENHANCED FORM VALIDATION
// ==========================================

// Set minimum date to today (can't book in the past)
const eventDateInput = document.getElementById("event-date");
if (eventDateInput) {
  const today = new Date().toISOString().split("T")[0];
  eventDateInput.setAttribute("min", today);

  // Set max date to 2 years from now
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 2);
  eventDateInput.setAttribute("max", maxDate.toISOString().split("T")[0]);
}

// Phone number formatting (auto-formats as user types)
const phoneInput = document.getElementById("phone");
if (phoneInput) {
  phoneInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits

    if (value.length >= 10) {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(
        6,
        10
      )}`;
    } else if (value.length >= 6) {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
    } else if (value.length >= 3) {
      value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    }

    e.target.value = value;
  });
}

// Form submission enhancement (SINGLE VERSION - NO DUPLICATES)
const contactForm = document.querySelector('form[name="contact"]');
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    const submitButton = contactForm.querySelector(".submit-button");

    submitButton.textContent = "Sending... 🎵";
    submitButton.disabled = true;

    // Form will submit to Netlify normally
  });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for fade-in effect
const fadeElements = document.querySelectorAll(
  ".feature, .service-card, .section-title"
);
fadeElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// ==========================================
// CONSOLE MESSAGE (Easter Egg)
// ==========================================

console.log(
  "%c🎤 Nashville Karaoke Rocks! 🎸",
  "font-size: 20px; font-weight: bold; color: #ff006e; text-shadow: 0 0 10px #ff006e;"
);
console.log(
  "%cLooking for a web developer? Contact us!",
  "font-size: 14px; color: #ffbe0b;"
);
