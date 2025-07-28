import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ContactPage = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Animation variants for staggering child elements
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Animation variants for individual items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Intersection observers for triggering animations on scroll
  const { ref: leftContentRef, inView: leftContentInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: formRef, inView: formInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Function to handle form submission
  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(null);

    // NOTE: Replace with your actual EmailJS environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const adminTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ADMIN;
    const userTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_USER;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !adminTemplateId || !userTemplateId || !publicKey) {
      console.error("EmailJS environment variables are not configured.");
      setSubmitError("Configuration error. Please contact support.");
      setIsSubmitting(false);
      return;
    }

    // Send email to admin
    emailjs
      .sendForm(serviceId, adminTemplateId, form.current, publicKey)
      .then(() => {
        // On success, send a confirmation email to the user
        return emailjs.sendForm(
          serviceId,
          userTemplateId,
          form.current,
          publicKey
        );
      })
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          setSubmitSuccess(true);
          form.current.reset();
          setTimeout(() => setSubmitSuccess(false), 5000); // Hide success message after 5s
        },
        (error) => {
          console.log("FAILED...", error.text);
          setSubmitError("Failed to send message. Please try again later.");
          setTimeout(() => setSubmitError(null), 5000); // Hide error message after 5s
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="md:min-h-screen w-full mx-auto bg-[#101014] text-white flex items-center py-16 mb-3 md:py-24">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* The `id="contact"` is added to the container for better anchor linking */}
        <div
          id="contact"
          className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16"
        >
          {/* Left Side - Contact Info */}
          <motion.div
            ref={leftContentRef}
            initial="hidden"
            animate={leftContentInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="lg:w-5/12 flex flex-col justify-center text-center lg:text-left"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
            >
              Get in touch
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-gray-300 mb-8 md:mb-12 max-w-md mx-auto lg:mx-0"
            >
              Have a question or a project in mind? Use the form or contact us
              directly. We're here to help you.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              className="space-y-6 mb-8 md:mb-12 flex flex-col items-center lg:items-start"
            >
              {/* Contact Details */}
              <motion.div
                variants={itemVariants}
                className="flex items-start gap-4"
              >
                {/* SVG Icon for Location */}
                <svg
                  className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <div className="text-left">
                  <p className="text-gray-300">
                    Door No. 2/218, L&T Bypass Corner,
                  </p>
                  <p className="text-gray-300">
                    opp. Sakthi Engineering College, Kulathur,
                  </p>
                  <p className="text-gray-300">
                    Coimbatore, Tamil Nadu - 641062
                  </p>
                </div>
              </motion.div>
              <motion.a
                href="mailto:psgtransport1@gmail.com"
                variants={itemVariants}
                className="flex items-center gap-4 hover:text-blue-400 transition-colors justify-center lg:justify-start"
              >
                <svg
                  className="w-6 h-6 text-blue-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                <p className="text-gray-300">psgtransport1@gmail.com</p>
              </motion.a>
              <motion.a
                href="tel:+918508548119"
                variants={itemVariants}
                className="flex items-center gap-4 hover:text-blue-400 transition-colors justify-center lg:justify-start"
              >
                <svg
                  className="w-6 h-6 text-blue-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                <p className="text-gray-300">8508548119, 9790672119</p>
              </motion.a>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-medium mb-4">Follow us</h3>
              <div className="flex gap-5 justify-center lg:justify-start">
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaInstagram className="w-7 h-7" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaFacebook className="w-7 h-7" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="https://wa.me/918508548119?text=Hello!%20I%20saw%20your%20transport%20services%20and%20wanted%20to%20reach%20out"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaWhatsapp className="w-7 h-7" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            ref={formRef}
            initial="hidden"
            animate={formInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="lg:w-7/12 bg-[#16161a] p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl shadow-black/20 w-full"
          >
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-gray-400"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 bg-[#1E1E24] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-gray-400"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-[#1E1E24] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-2 text-gray-400"
                >
                  Phone{" "}
                  <span className="text-xs text-gray-500">(Optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 bg-[#1E1E24] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-gray-400"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full px-4 py-3 bg-[#1E1E24] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow resize-none"
                  required
                ></textarea>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-2">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </motion.div>

              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    className="mt-4 p-3 text-center bg-green-500/20 text-green-300 border border-green-500/30 rounded-lg"
                  >
                    Message sent successfully! We'll get back to you soon.
                  </motion.div>
                )}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    className="mt-4 p-3 text-center bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg"
                  >
                    {submitError}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;