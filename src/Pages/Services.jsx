import React, { useState } from "react";
import defaultImage from "../assets/carousel images/truck (12).jpg";
import img8ft from "../assets/carousel images/truck (1).jpg";
import img20ft from "../assets/carousel images/truck (1).jpg";
import img22ft from "../assets/carousel images/truck (1).jpg";
import deliveryImage from "../assets/carousel images/truck (1).jpg";
import loadingImage from "../assets/carousel images/truck (1).jpg";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Animation variants (No changes here, as they are part of your existing code)
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

  const services = [
    {
      question: "Our Container Transport Solutions",
      answer:
        "PSG Transports specializes in three standard container sizes: compact 8ft containers for small loads, versatile 20ft containers (most common), and extended 22ft containers for larger shipments. All containers are transported with secure tie-downs and GPS tracking.",
    },
    {
      question: "8ft Container Specifications",
      answer:
        "Our 8ft container service features:\n\n" +
        `• Dimensions: 8' L x 7'8" W x 7'10" H\n` +
        `• Capacity: 1,100 kg payload\n` +
        "• Ideal for: Small businesses, retail goods, personal moves\n" +
        "• Special features: Side door access, forklift compatible",
    },
    {
      question: "20ft Container Specifications",
      answer:
        "Our 20ft container service includes:\n\n" +
        `• Dimensions: 20' L x 8' W x 8'6" H (standard)\n` +
        "• Capacity: 25,000 kg maximum gross\n" +
        "• Ideal for: Industrial equipment, bulk commodities\n" +
        "• Special features: CSC certified, wind/water tight",
    },
    {
      question: "22ft Container Specifications",
      answer:
        "Our extended 22ft container service offers:\n\n" +
        `• Dimensions: 22' L x 8' W x 8'6" H\n` +
        `• Capacity: 28,000 kg maximum gross\n` +
        "• Ideal for: Oversized machinery, construction materials\n" +
        "• Special features: Reinforced floors, high cube option",
    },
    {
      question: "Our delivery timeframes",
      answer:
        "Standard delivery schedules:\n\n" +
        "• Local (within city): Same/next day\n" +
        "• Statewide (Maharashtra): 1-2 business days\n" +
        "• Interstate: 3-5 business days\n" +
        "• Priority service: Available at 25% premium (guaranteed 24-48hr)",
    },
  ];

  const serviceImages = [
    defaultImage,
    img8ft,
    img20ft,
    img22ft,
    deliveryImage,
    loadingImage,
  ];

  const displayedImage = activeIndex === null || activeIndex === 0
    ? defaultImage
    : serviceImages[activeIndex];

  const toggleServices = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-[#fafafa] py-12">
      {/* Header Section */}
      <motion.div
        ref={headerRef}
        initial="hidden"
        animate={headerInView ? "visible" : "hidden"}
        variants={containerVariants}
        // Added horizontal padding for small screens, kept md:mb-12 for desktop
        className="max-w-7xl mx-auto text-center px-4 mb-8 md:mb-12" // Added px-4 and mb-8
      >
        <span
          id="services"
          // Added responsive font size for the tag
          className="inline-block rounded-full bg-[#343434] px-[15px] py-[1px] text-white mb-4 text-sm sm:text-base font-medium" // text-sm for mobile, sm:text-base for tablet+
        >
          Services
        </span>
        {/* Adjusted h3 font size for responsive scaling */}
        <h3 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-gray-900 mb-2">
          What we do
        </h3>
        {/* Adjusted p font size for responsive scaling */}
        <p className="text-base sm:text-lg md:text-xl text-gray-600"> {/* text-base for mobile, sm:text-lg for tablet+ */}
          Match Your Cargo With Our Ideal Service
        </p>
      </motion.div>

      {/* Main Content Sections */}
      <motion.div
        ref={contentRef}
        initial="hidden"
        animate={contentInView ? "visible" : "hidden"}
        variants={staggerContainer}
        // Added horizontal padding for small screens, maintained w-[90%] for overall width
        className="w-[88%] mx-auto flex flex-col-reverse md:flex-row gap-8 px-4 sm:px-0" // px-4 for mobile, sm:px-0 to remove it at sm breakpoint
      >
        {/* Image Section */}
        <motion.div
          variants={itemVariants}
          className="w-full md:w-1/2 flex items-start justify-center"
        >
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
                // Crucial responsiveness:
                // w-full h-auto for mobile (scales down maintaining aspect ratio)
                // md:w-[600px] md:h-[690px] to retain original fixed size on desktop
                className="w-full h-auto object-cover rounded-lg shadow-lg md:w-[600px] md:h-[690px]"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/600x690?text=Service+Image";
                  e.target.className =
                    "w-full h-auto object-cover rounded-lg shadow-lg bg-gray-200 md:w-[600px] md:h-[690px]";
                }}
              />
            ) : (
              <img
                src={defaultImage}
                alt="Service Visual"
                // Crucial responsiveness:
                // w-full h-auto for mobile
                // md:w-[600px] md:h-[690px] to retain original fixed size on desktop
                className="w-full h-auto object-cover rounded-lg shadow-lg md:w-[600px] md:h-[690px]"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/600x690?text=Default+Image";
                  e.target.className =
                    "w-full h-auto object-cover rounded-lg shadow-lg bg-gray-200 md:w-[600px] md:h-[690px]";
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Services Accordion */}
        <motion.div
          variants={itemVariants}
          // Adjusted py-padding for responsiveness
          className="w-full md:w-1/2 px-4 py-4 md:py-16" // py-4 for mobile, md:py-16 for desktop
        >
          <div className="space-y-4">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="overflow-hidden border-b-2 border-gray-200"
                variants={itemVariants}
              >
                <button
                  // Adjusted padding for responsiveness
                  className="w-full p-4 sm:p-5 text-left flex justify-between items-center" // p-4 for mobile, sm:p-5 for tablet+
                  onClick={() => toggleServices(index)}
                >
                  {/* Adjusted h3 font size for responsiveness */}
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold"> {/* text-base for mobile, sm:text-lg for tablet+ */}
                    {service.question}
                  </h3>
                  {/* Adjusted '+' icon font size for responsiveness */}
                  <motion.span
                    animate={{ rotate: activeIndex === index ? 135 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl sm:text-4xl font-thin" // text-3xl for mobile, sm:text-4xl for tablet+
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
                      // Adjusted padding for responsiveness
                      className="px-4 sm:px-5" // px-4 for mobile, sm:px-5 for tablet+
                    >
                      <div
                        // Adjusted padding for responsiveness
                        className="pb-4 sm:pb-5 text-gray-600 whitespace-pre-line"> {/* pb-4 for mobile, sm:pb-5 for tablet+ */}
                        {/* Adjusted p font size for responsiveness */}
                        <p className="text-sm sm:text-base cursor-pointer">{service.answer}</p> {/* text-sm for mobile, sm:text-base for tablet+ */}
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