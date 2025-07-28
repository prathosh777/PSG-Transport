
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import faqs from "../data/FAQs-data.json";
import ScrollLink from "../Components/ScrollLinks";
import { useInView } from "react-intersection-observer";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const togglefaqs = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
        delayChildren: 0.2
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

  // Intersection observers
  const [leftContentRef, leftContentInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [faqContentRef, faqContentInView] = useInView({
    threshold: 0.05,
    triggerOnce: true
  });

  return (
    <div className="flex flex-col lg:flex-row w-[90%] max-w-7xl mx-auto py-16 gap-8 lg:gap-16">
      {/* Left Content */}
      <motion.div
        ref={leftContentRef}
        initial="hidden"
        animate={leftContentInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left"
      >
        <div className="max-w-md mx-auto lg:mx-0">
          <motion.span
            id="faq"
            className="inline-block rounded-full bg-[#343434] px-4 py-1 text-white mb-4 text-sm font-medium"
          >
            FAQs
          </motion.span>
          <motion.h3 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Answering your questions
          </motion.h3>
          <motion.p 
            className="text-lg text-gray-600 mb-8"
          >
            Got more questions? Send us your enquiry below
          </motion.p>

          {/* Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ScrollLink to="contact">
              <button
                className="flex justify-center items-center gap-2 mx-auto lg:mx-0 shadow-md text-lg font-semibold text-[#343434] bg-gray-50 backdrop-blur-md isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-black hover:text-white before:-z-10 before:aspect-square before:hover:scale-200 before:hover:duration-500 relative z-10 px-7 py-4 overflow-hidden rounded-full group"
                type="submit"
              >
                Work with us
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 19"
                  className="w-6 h-6 group-hover:rotate-90 group-hover:bg-black text-gray-50 ease-linear duration-300 rounded-full p-1 rotate-45"
                >
                  <path
                    className="fill-gray-500 group-hover:fill-white"
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                  ></path>
                </svg>
              </button>
            </ScrollLink>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Content - FAQ Items */}
      <motion.div
        ref={faqContentRef}
        initial="hidden"
        animate={faqContentInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="w-full lg:w-1/2"
      >
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="overflow-hidden border-b border-gray-200"
              variants={itemVariants}
            >
              <button
                className="w-full py-5 px-4 text-left flex justify-between items-center hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => togglefaqs(index)}
              >
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <motion.span
                  animate={{ rotate: activeIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-3xl font-light text-gray-500"
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
                    className="px-4"
                  >
                    <div>
                      {faq.answer.split("\n").map((line, i) => (
                        <p key={i} className="pb-2 text-gray-600">
                          {line}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FAQSection;