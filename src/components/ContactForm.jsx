import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ContactForm.css";

// Mobile wizard option sets (cards drive the SR-only <select>s on mobile)
const EVENT_TYPE_OPTIONS = [
  { value: "wedding", label: "Wedding" },
  { value: "birthday", label: "Birthday" },
  { value: "corporate", label: "Corporate" },
  { value: "private-party", label: "Private Party" },
  { value: "other", label: "Other" },
];

const GUEST_COUNT_OPTIONS = [
  { value: "1-25", label: "1–25" },
  { value: "26-50", label: "26–50" },
  { value: "51-100", label: "51–100" },
  { value: "101-200", label: "101–200" },
  { value: "200+", label: "200+" },
];

const TOTAL_STEPS = 5;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    contactPreference: "email",
    eventType: "",
    eventDate: "",
    venueLocation: "",
    guestCount: "",
    eventTime: "",
    eventDuration: "",
    message: "",
    howHeard: "",
  });

  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Mobile wizard step state
  const [currentStep, setCurrentStep] = useState(1);
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px)").matches
  );

  const formRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Scroll to first error on validation failure (mobile UX improvement)
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [errors]);

  // Handle input changes - converts kebab-case to camelCase for state.
  // Kebab DOM names (event-type) -> camel state keys (eventType); the wizard
  // cards fire synthetic camelCase names (eventType) which pass through unchanged.
  // The DOM name= attributes stay kebab-case (Netlify + Zapier contract).
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert kebab-case name to camelCase for state
    const camelName = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

    setFormData((prev) => ({
      ...prev,
      [camelName]: value,
    }));

    // Clear error when user starts typing
    if (errors[camelName]) {
      setErrors((prev) => ({
        ...prev,
        [camelName]: "",
      }));
    }
  };

  // Validate form
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = "Please enter your full name";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const phoneRegex = /^[\d\s\-()]+$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.eventType) {
      newErrors.eventType = "Please select an event type";
    }

    if (!formData.eventDate.trim()) {
      newErrors.eventDate = "Please provide an event date";
    }

    if (!formData.message.trim() || formData.message.length < 20) {
      newErrors.message = "Please provide more details (minimum 20 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Per-step validation for the mobile wizard (does not replace validate()).
  // The real submit still runs the full validate() via handleSubmit.
  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1 && !formData.eventType) {
      newErrors.eventType = "Please select an event type";
    }
    if (step === 2 && !formData.eventDate.trim()) {
      newErrors.eventDate = "Please provide an event date";
    }
    if (step === 4) {
      if (!formData.name.trim() || formData.name.length < 2)
        newErrors.name = "Please enter your full name";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "Please enter a valid email address";
      if (!formData.phone.trim() || !/^[\d\s\-()]+$/.test(formData.phone))
        newErrors.phone = "Please enter a valid phone number";
    }
    if (
      step === 5 &&
      (!formData.message.trim() || formData.message.length < 20)
    ) {
      newErrors.message = "Please provide more details (minimum 20 characters)";
    }
    return newErrors;
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...stepErrors }));
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Validates the final step then triggers the real form submit (handleSubmit).
  const handleMobileSubmit = () => {
    const stepErrors = validateStep(5);
    if (Object.keys(stepErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...stepErrors }));
      return;
    }
    formRef.current?.requestSubmit();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Netlify form submission
    const formElement = e.target;
    const formDataToSend = new FormData(formElement);

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formDataToSend).toString(),
      });

      setSubmitSuccess(true);

      // Scroll to top to show success message on mobile
      window.scrollTo({ top: 0, behavior: 'smooth' });

      setFormData({
        name: "",
        email: "",
        phone: "",
        contactPreference: "email",
        eventType: "",
        eventDate: "",
        venueLocation: "",
        guestCount: "",
        eventTime: "",
        eventDuration: "",
        message: "",
        howHeard: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle focus for better mobile UX
  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <motion.div
      className="contact-form-wrapper"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <AnimatePresence>
        {submitSuccess && (
          <motion.div
            className="success-message"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <div className="success-content">
              <h3>Thank You!</h3>
              <p>
                We'll get back to you within 24 hours to discuss your event.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form
        ref={formRef}
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        className="premium-contact-form"
      >
        {/* Honeypot spam protection */}
        <input type="hidden" name="bot-field" />
        <input type="hidden" name="form-name" value="contact" />

        {/* Mobile progress chrome (hidden on desktop via CSS — Day 3) */}
        <div className="mobile-stepper" aria-hidden="true">
          <span className="step-counter-text">
            Step {currentStep} of {TOTAL_STEPS}
          </span>
          <div className="progress-track">
            <motion.div
              className="progress-fill"
              animate={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Steps viewport / carousel. On desktop CSS neutralizes the track
            transform so all five slides stack as plain form sections. */}
        <div className="steps-viewport">
          <motion.div
            className="steps-track"
            animate={{ x: isMobile ? `${-(currentStep - 1) * 100}%` : "0%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
          >

            {/* STEP 1 — Event Type */}
            <motion.div
              className="step-slide form-section"
              data-step="1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="form-section-title step-title">
                What's the occasion?
              </h3>

              {/* Mobile: tap-target cards (camelCase synthetic events) */}
              <div
                className="event-type-cards mobile-only"
                role="group"
                aria-label="Select event type"
              >
                {EVENT_TYPE_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    className={`event-type-card${
                      formData.eventType === opt.value ? " selected" : ""
                    }`}
                    onClick={() =>
                      handleChange({
                        target: { name: "eventType", value: opt.value },
                      })
                    }
                    aria-pressed={formData.eventType === opt.value}
                  >
                    <span className="card-label">{opt.label}</span>
                  </button>
                ))}
              </div>

              {/* Real select stays in the DOM for Netlify detection. Kebab-case
                  name=. SR-only + non-interactive on mobile (cards drive it). */}
              <div className="form-group event-type-select-wrapper">
                <label
                  htmlFor="event-type"
                  className={focusedField === "event-type" ? "focused" : ""}
                >
                  Event Type <span className="required">*</span>
                </label>
                <select
                  id="event-type"
                  name="event-type"
                  value={formData.eventType}
                  onChange={handleChange}
                  onFocus={() => handleFocus("event-type")}
                  onBlur={handleBlur}
                  className={errors.eventType ? "error" : ""}
                  tabIndex={isMobile ? -1 : 0}
                  aria-hidden={isMobile}
                >
                  <option value="">Select event type</option>
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday Party</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="private-party">Private Party</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {errors.eventType && (
                <motion.span
                  className="error-message"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.eventType}
                </motion.span>
              )}
            </motion.div>

            {/* STEP 2 — Date & Time */}
            <motion.div
              className="step-slide form-section"
              data-step="2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="form-section-title step-title">When is it?</h3>

              <div className="form-group">
                <label
                  htmlFor="event-date"
                  className={focusedField === "event-date" ? "focused" : ""}
                >
                  Event Date <span className="required">*</span>
                </label>
                <input
                  type="date"
                  id="event-date"
                  name="event-date"
                  value={formData.eventDate}
                  onChange={handleChange}
                  onFocus={() => handleFocus("event-date")}
                  onBlur={handleBlur}
                  className={errors.eventDate ? "error" : ""}
                  min={new Date().toISOString().split("T")[0]}
                />
                {errors.eventDate && (
                  <motion.span
                    className="error-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.eventDate}
                  </motion.span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label
                    htmlFor="event-time"
                    className={focusedField === "event-time" ? "focused" : ""}
                  >
                    Event Start Time
                  </label>
                  <input
                    type="text"
                    id="event-time"
                    name="event-time"
                    value={formData.eventTime}
                    onChange={handleChange}
                    onFocus={() => handleFocus("event-time")}
                    onBlur={handleBlur}
                    placeholder="7:00 PM"
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="event-duration"
                    className={
                      focusedField === "event-duration" ? "focused" : ""
                    }
                  >
                    Estimated Duration
                  </label>
                  <select
                    id="event-duration"
                    name="event-duration"
                    value={formData.eventDuration}
                    onChange={handleChange}
                    onFocus={() => handleFocus("event-duration")}
                    onBlur={handleBlur}
                  >
                    <option value="">Select duration</option>
                    <option value="1-2-hours">1-2 hours</option>
                    <option value="2-3-hours">2-3 hours</option>
                    <option value="3-4-hours">3-4 hours</option>
                    <option value="4+-hours">4+ hours</option>
                    <option value="all-day">All day</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* STEP 3 — Venue & Guests */}
            <motion.div
              className="step-slide form-section"
              data-step="3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="form-section-title step-title">
                Where's the party?
              </h3>

              <div className="form-group">
                <label
                  htmlFor="venue-location"
                  className={focusedField === "venue-location" ? "focused" : ""}
                >
                  Venue Location
                </label>
                <input
                  type="text"
                  id="venue-location"
                  name="venue-location"
                  value={formData.venueLocation}
                  onChange={handleChange}
                  onFocus={() => handleFocus("venue-location")}
                  onBlur={handleBlur}
                  placeholder="Nashville, TN or venue name"
                />
              </div>

              {/* Mobile: guest count cards (camelCase synthetic events) */}
              <div className="form-group">
                <label className="guest-label">Expected Guests</label>
                <div
                  className="guest-count-cards mobile-only"
                  role="group"
                  aria-label="Select expected guest count"
                >
                  {GUEST_COUNT_OPTIONS.map((opt) => (
                    <button
                      type="button"
                      key={opt.value}
                      className={`guest-count-card${
                        formData.guestCount === opt.value ? " selected" : ""
                      }`}
                      onClick={() =>
                        handleChange({
                          target: { name: "guestCount", value: opt.value },
                        })
                      }
                      aria-pressed={formData.guestCount === opt.value}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {/* Real select stays in the DOM for Netlify. Kebab-case name=. */}
                <div className="guest-count-select-wrapper">
                  <select
                    id="guest-count"
                    name="guest-count"
                    value={formData.guestCount}
                    onChange={handleChange}
                    onFocus={() => handleFocus("guest-count")}
                    onBlur={handleBlur}
                    tabIndex={isMobile ? -1 : 0}
                    aria-hidden={isMobile}
                  >
                    <option value="">Select approximate count</option>
                    <option value="1-25">1-25 guests</option>
                    <option value="26-50">26-50 guests</option>
                    <option value="51-100">51-100 guests</option>
                    <option value="101-200">101-200 guests</option>
                    <option value="200+">200+ guests</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* STEP 4 — About You */}
            <motion.div
              className="step-slide form-section"
              data-step="4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="form-section-title step-title">
                Who are we working with?
              </h3>

              <div className="form-row">
                <div className="form-group">
                  <label
                    htmlFor="name"
                    className={focusedField === "name" ? "focused" : ""}
                  >
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus("name")}
                    onBlur={handleBlur}
                    className={errors.name ? "error" : ""}
                    placeholder="John Smith"
                    autoComplete="name"
                  />
                  {errors.name && (
                    <motion.span
                      className="error-message"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.name}
                    </motion.span>
                  )}
                </div>

                <div className="form-group">
                  <label
                    htmlFor="email"
                    className={focusedField === "email" ? "focused" : ""}
                  >
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus("email")}
                    onBlur={handleBlur}
                    className={errors.email ? "error" : ""}
                    placeholder="john@example.com"
                    autoComplete="email"
                    inputMode="email"
                  />
                  {errors.email && (
                    <motion.span
                      className="error-message"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.email}
                    </motion.span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label
                    htmlFor="phone"
                    className={focusedField === "phone" ? "focused" : ""}
                  >
                    Phone Number <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => handleFocus("phone")}
                    onBlur={handleBlur}
                    className={errors.phone ? "error" : ""}
                    placeholder="(615) 555-1234"
                    autoComplete="tel"
                    inputMode="tel"
                  />
                  {errors.phone && (
                    <motion.span
                      className="error-message"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.phone}
                    </motion.span>
                  )}
                </div>

                <div className="form-group">
                  <label
                    htmlFor="contact-preference"
                    className={
                      focusedField === "contact-preference" ? "focused" : ""
                    }
                  >
                    Preferred Contact Method
                  </label>
                  <select
                    id="contact-preference"
                    name="contact-preference"
                    value={formData.contactPreference}
                    onChange={handleChange}
                    onFocus={() => handleFocus("contact-preference")}
                    onBlur={handleBlur}
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="text">Text Message</option>
                    <option value="any">Any</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* STEP 5 — Final Details */}
            <motion.div
              className="step-slide form-section"
              data-step="5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="form-section-title step-title">Anything else?</h3>

              <div className="form-group">
                <label
                  htmlFor="message"
                  className={focusedField === "message" ? "focused" : ""}
                >
                  Additional Details <span className="required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus("message")}
                  onBlur={handleBlur}
                  className={errors.message ? "error" : ""}
                  rows="6"
                  placeholder="Tell us about your event...

- What's the vibe you're going for?
- Any special song requests?
- Is there a theme?
- Anything else we should know?"
                />
                {errors.message && (
                  <motion.span
                    className="error-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.message}
                  </motion.span>
                )}
              </div>

              <div className="form-group">
                <label
                  htmlFor="how-heard"
                  className={focusedField === "how-heard" ? "focused" : ""}
                >
                  How did you hear about us?
                </label>
                <select
                  id="how-heard"
                  name="how-heard"
                  value={formData.howHeard}
                  onChange={handleChange}
                  onFocus={() => handleFocus("how-heard")}
                  onBlur={handleBlur}
                >
                  <option value="">Select one</option>
                  <option value="google">Google Search</option>
                  <option value="social-media">Social Media</option>
                  <option value="friend-referral">Friend/Family Referral</option>
                  <option value="saw-you-perform">Saw You Perform</option>
                  <option value="venue-recommendation">
                    Venue Recommendation
                  </option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Desktop submit — hidden on mobile (mobile-nav handles it, Day 3) */}
              <motion.button
                type="submit"
                className="submit-button desktop-submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>Send Inquiry</>
                )}
              </motion.button>

              {errors.submit && (
                <motion.p
                  className="submit-error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {errors.submit}
                </motion.p>
              )}
            </motion.div>

          </motion.div>
        </div>

        {/* Mobile navigation — Back / Next / Submit (hidden on desktop, Day 3) */}
        <div className="mobile-nav">
          <motion.button
            type="button"
            className="mobile-nav-btn mobile-nav-back"
            onClick={handleBack}
            whileTap={{ scale: 0.97 }}
            style={{ visibility: currentStep === 1 ? "hidden" : "visible" }}
            aria-label="Go to previous step"
          >
            Back
          </motion.button>

          {currentStep < TOTAL_STEPS ? (
            <motion.button
              type="button"
              className="mobile-nav-btn mobile-nav-next"
              onClick={handleNext}
              whileTap={{ scale: 0.97 }}
              aria-label={`Continue to step ${currentStep + 1}`}
            >
              Next
            </motion.button>
          ) : (
            <motion.button
              type="button"
              className="mobile-nav-btn mobile-nav-next"
              onClick={handleMobileSubmit}
              disabled={isSubmitting}
              whileTap={{ scale: 0.97 }}
              aria-label="Submit booking inquiry"
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : (
                "Send Inquiry"
              )}
            </motion.button>
          )}
        </div>

        <p className="form-footer">
          <span className="required">*</span> Required fields
        </p>
      </form>
    </motion.div>
  );
};

export default ContactForm;
