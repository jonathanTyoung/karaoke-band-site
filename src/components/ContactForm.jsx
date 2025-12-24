import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ContactForm.css";

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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
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

  return (
    <div className="contact-form-wrapper">
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
              <span className="success-icon">🎉</span>
              <h3>Thank You!</h3>
              <p>
                We'll get back to you within 24 hours to discuss your event.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form
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

        {/* Personal Information Section */}
        <motion.div
          className="form-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="form-section-title">
            {/* <span className="section-icon">👤</span> */}
            Your Information
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
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                className={errors.name ? "error" : ""}
                placeholder="John Smith"
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
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className={errors.email ? "error" : ""}
                placeholder="john@example.com"
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
                onFocus={() => setFocusedField("phone")}
                onBlur={() => setFocusedField(null)}
                className={errors.phone ? "error" : ""}
                placeholder="(615) 555-1234"
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
                name="contactPreference"
                value={formData.contactPreference}
                onChange={handleChange}
                onFocus={() => setFocusedField("contact-preference")}
                onBlur={() => setFocusedField(null)}
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="text">Text Message</option>
                <option value="any">Any</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Event Details Section */}
        <motion.div
          className="form-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="form-section-title">
            {/* <span className="section-icon">🎊</span> */}
            Event Details
          </h3>

          <div className="form-group">
            <label
              htmlFor="event-type"
              className={focusedField === "event-type" ? "focused" : ""}
            >
              Event Type <span className="required">*</span>
            </label>
            <select
              id="event-type"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              onFocus={() => setFocusedField("event-type")}
              onBlur={() => setFocusedField(null)}
              className={errors.eventType ? "error" : ""}
            >
              <option value="">Select event type</option>
              <option value="wedding">Wedding</option>
              <option value="birthday">Birthday Party</option>
              <option value="corporate">Corporate Event</option>
              <option value="private-party">Private Party</option>
              <option value="other">Other</option>
            </select>
            {errors.eventType && (
              <motion.span
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.eventType}
              </motion.span>
            )}
          </div>

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
              name="eventDate"
              value={formData.eventDate}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, eventDate: e.target.value }));
                if (errors.eventDate) {
                  setErrors((prev) => ({ ...prev, eventDate: "" }));
                }
              }}
              onFocus={() => setFocusedField("event-date")}
              onBlur={() => setFocusedField(null)}
              className={errors.eventDate ? "error" : ""}
              min={new Date().toISOString().split("T")[0]}
            />
            <span className="field-hint">Select your event date</span>
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
                htmlFor="venue-location"
                className={focusedField === "venue-location" ? "focused" : ""}
              >
                Venue Location
              </label>
              <input
                type="text"
                id="venue-location"
                name="venueLocation"
                value={formData.venueLocation}
                onChange={handleChange}
                onFocus={() => setFocusedField("venue-location")}
                onBlur={() => setFocusedField(null)}
                placeholder="Nashville, TN or venue name"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="guest-count"
                className={focusedField === "guest-count" ? "focused" : ""}
              >
                Expected Guests
              </label>
              <select
                id="guest-count"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleChange}
                onFocus={() => setFocusedField("guest-count")}
                onBlur={() => setFocusedField(null)}
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

          <div className="form-row">
            <div className="form-group">
              <label
                htmlFor="event-time"
                className={focusedField === "event-time" ? "focused" : ""}
              >
                Event Start Time
              </label>
              <input
                type="time"
                id="event-time"
                name="eventTime"
                value={formData.eventTime}
                onChange={handleChange}
                onFocus={() => setFocusedField("event-time")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="event-duration"
                className={focusedField === "event-duration" ? "focused" : ""}
              >
                Estimated Duration
              </label>
              <select
                id="event-duration"
                name="eventDuration"
                value={formData.eventDuration}
                onChange={handleChange}
                onFocus={() => setFocusedField("event-duration")}
                onBlur={() => setFocusedField(null)}
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

        {/* Additional Information Section */}
        <motion.div
          className="form-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="form-section-title">
            {/* <span className="section-icon">✍️</span> */}
            Tell Us More
          </h3>

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
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
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
              name="howHeard"
              value={formData.howHeard}
              onChange={handleChange}
              onFocus={() => setFocusedField("how-heard")}
              onBlur={() => setFocusedField(null)}
            >
              <option value="">Select one</option>
              <option value="google">Google Search</option>
              <option value="social-media">Social Media</option>
              <option value="friend-referral">Friend/Family Referral</option>
              <option value="saw-you-perform">Saw You Perform</option>
              <option value="venue-recommendation">Venue Recommendation</option>
              <option value="other">Other</option>
            </select>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="submit-button"
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

        <p className="form-footer">
          <span className="required">*</span> Required fields
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
