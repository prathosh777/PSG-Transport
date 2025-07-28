
import React from "react";
import Carousel from "../Components/Carousel";
import StatsSection from "../Components/Stats";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const AboutPage = () => {
  const [headerRef, headerInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [featuresRef, featuresInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [carouselRef, carouselInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [statsRef, statsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    // Main container for the AboutPage
    // Added pt-16 for mobile top padding, pb-16 for mobile bottom padding
    // md:mt-28 and md:pb-40 for desktop specific margins/padding
    <div className="pt-16 pb-16 md:mt-28 md:pb-40  mx-auto min-h-screen">
      {/* Header Section */}
      {/* w-[90%] mx-auto for consistent content width and centering */}
      <div className="w-[83%] mx-auto py-12">
        <motion.div
          id="about"
          className="flex flex-col md:flex-row justify-around gap-8 md:gap-0" // Added gap for mobile spacing
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Left Column - About Us Header */}
          {/* md:w-1/2 ensures it takes half width on desktop, w-full on mobile */}
          <motion.div className="w-full md:w-1/2" variants={containerVariants}>
            <motion.span
              className="inline-block rounded-full bg-[#343434] px-4 py-1 text-white mb-6 text-sm" // Added py-1 and text-sm for better styling
              variants={itemVariants}
            >
              About us
            </motion.span>
            <motion.h1
              // w-full for mobile to prevent awkward wrapping on small screens
              // md:w-[60%] for desktop to maintain specific width
              // text-left ensures consistent alignment
              className="w-full md:w-[70%] text-4xl md:text-5xl font-semibold leading-tight mb-6 text-left"
              variants={itemVariants}
            >
              Experts in Nationwide Goods Movement
            </motion.h1>
          </motion.div>

          {/* Right Column - Features List */}
          {/* md:w-1/2 ensures it takes half width on desktop, w-full on mobile */}
          <motion.div
            className="w-full md:w-1/2 space-y-4"
            ref={featuresRef}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {[
              "Reliable Solutions: Nationwide cargo transport with 99% on-time delivery",
              "Modern Fleet: GPS-enabled trucks for real-time tracking and safety",
              "Expert Handling: Specialized in heavy machinery, perishables, and oversized loads",
              "Warehousing: Secure storage with inventory management",
              "24/7 Support: Dedicated team for emergency logistics needs",
              "Customized Service: Tailored transport plans for your business"
            ].map((feature, index) => (
              <motion.p
                key={index}
                className="flex items-start gap-2 text-base" // text-base for consistent font size
                variants={itemVariants}
              >
                <span className="text-green-400 flex-shrink-0">✓</span> {/* flex-shrink-0 to prevent checkmark from shrinking */}
                <span className="flex-1">
                  <strong>{feature.split(':')[0]}:</strong> {feature.split(':')[1]}
                </span>
              </motion.p>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Carousel Section */}
      {/* py-10 for vertical padding, w-full mx-auto for full width and centering */}
      <motion.div
        className="md:py-10 w-[90%] md:w-full mx-auto"
        ref={carouselRef}
        initial={{ opacity: 0, y: 50 }}
        animate={carouselInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <Carousel />
      </motion.div>

      {/* Stats Section */}
      {/* py-10 for vertical padding on mobile, w-[95%] mx-auto for content width */}
      <motion.div
        className="py-10 w-full mx-auto"
        ref={statsRef}
        initial={{ opacity: 0 }}
        animate={statsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <StatsSection />
      </motion.div>
    </div>
  );
};

export default AboutPage;