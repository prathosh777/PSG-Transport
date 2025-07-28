
import React, { useState, useRef, useEffect } from "react";
import defaultImage from "../assets/Services-images/8ftTruckImage.webp";
// import img8ft from "../assets/Services-images/8ftTruckImage.webp";
import img20ft from "../assets/Services-images/20ftTruckImage.webp";
import img22ft from "../assets/Services-images/22ftTruckImage.webp";
import img32ftMxl from "../assets/Services-images/32ftMxlTruckImage.webp";
import img32ftSxl from "../assets/Services-images/32ftSxlTruckImage.webp";
import OpenTruckImage17ft from "../assets/Services-images/17ftOpenTruckImage.webp";
import OpenTruckImage19ft from "../assets/Services-images/19ftOpenTruckImage.webp";
import OpenTruckImage20ft from "../assets/Services-images/20ftOpenTruckImage.webp";
import OpenTruckImage22ft from "../assets/Services-images/22ftOpenTruckImage.webp";
// import loadingImage from "../assets/Services-images/32ft.jpeg";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import services from "../data/services-data.json";

const serviceImages = [
  defaultImage,
  // img8ft,
  img20ft,
  img22ft,
  img32ftMxl,
  img32ftSxl,
  OpenTruckImage17ft,
  OpenTruckImage19ft,
  OpenTruckImage20ft,
  OpenTruckImage22ft
];
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

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [headerRef, headerInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const [contentRef, contentInView] = useInView({
    threshold: 0.05,
    triggerOnce: true
  });
  const faqContainerRef = useRef(null);
  const imageContainerRef = useRef(null);


  const displayedImage = activeIndex === null || activeIndex === 0
    ? defaultImage
    : serviceImages[activeIndex];

  const toggleServices = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-[#fafafa] py-12 md:pb-32">
      {/* Header Section */}
      <motion.div
        ref={headerRef}
        initial="hidden"
        animate={headerInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-7xl mx-auto text-center px-4 mb-8 md:mb-12"
      >
        <span
          id="services"
          className="inline-block rounded-full bg-[#343434] px-[15px] py-[1px] text-white mb-4 text-sm sm:text-base font-medium"
        >
          Services
        </span>
        <h3 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-gray-900 mb-2">
          What we do
        </h3>
        <p className="text-base sm:text-lg md:text-xl text-gray-600">
          Match Your Cargo With Our Ideal Service
        </p>
      </motion.div>

      {/* Main Content Sections */}
      <motion.div
        ref={contentRef}
        initial="hidden"
        animate={contentInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="w-[88%] mx-auto flex flex-col-reverse md:flex-row gap-8 px-4 sm:px-0"
      >
        {/* Image Section - Made sticky */}
        <motion.div
          variants={itemVariants}
          className="w-full md:w-1/2 flex items-start justify-center"
          ref={imageContainerRef}
        >
          <div className="sticky top-24 w-full transition-all duration-300">
            <AnimatePresence mode="wait">
              {(activeIndex !== null && activeIndex !== 0) ? (
                <motion.img
                  key={activeIndex}
                  src={displayedImage}
                  alt="Service Visual"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-auto max-h-[80vh] object-cover rounded-lg shadow-lg"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/600x690?text=Service+Image";
                    e.target.className = "w-full h-auto max-h-[80vh] object-cover rounded-lg shadow-lg bg-gray-200";
                  }}
                />
              ) : (
                <img
                  src={defaultImage}
                  alt="Service Visual"
                  className="w-full h-auto max-h-[80vh] object-cover rounded-lg shadow-lg"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/600x690?text=Default+Image";
                    e.target.className = "w-full h-auto max-h-[80vh] object-cover rounded-lg shadow-lg bg-gray-200";
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Services Accordion */}
        <motion.div
          ref={faqContainerRef}
          variants={itemVariants}
          className="w-full md:w-1/2 px-4 py-4 md:py-6"
        >
          <div className="space-y-4">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="overflow-hidden border-b-2 border-gray-200"
                variants={itemVariants}
              >
                <button
                  className="w-full p-4 sm:p-5 text-left flex justify-between items-center"
                  onClick={() => toggleServices(index)}
                >
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold">
                    {service.question}
                  </h3>
                  <motion.span
                    animate={{ rotate: activeIndex === index ? 135 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl sm:text-4xl font-thin"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="px-4 sm:px-5"
                    >
                      <div className="pb-4 sm:pb-5 text-gray-600 whitespace-pre-line">
                        <p className="text-sm sm:text-base cursor-pointer">{service.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Services;