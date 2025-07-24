
import React from "react";
import testimonials from "../data/testimonial-data.json";
import TestimonialCarousel from "../Components/TestimonialCarousal";
import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
const TestimonialSection = () => {
  const top = testimonials.slice(0, 10);
  const bottom = testimonials.slice(10);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  return (
    <div  className="py-20 bg-gray-50 space-y-16">
      {/* <div className="text-center">
        <span id="testimonials" className="inline-block rounded-full bg-black text-white px-4 py-1 mb-4">
          Testimonials
        </span>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          What Our Clients Say
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Hear from businesses that transformed their logistics with SwiftShift
        </p>
      </div> */}
      <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.15 },
        },
      }}
      className="text-center"
    >
      <motion.span
        id="testimonials"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        className="inline-block rounded-full bg-black text-white px-4 py-1 mb-4"
      >
        Testimonials
      </motion.span>

      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        className="text-4xl font-bold text-gray-900 mb-4"
      >
        What Our Clients Say
      </motion.h2>

      <motion.p
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        className="text-lg text-gray-600 max-w-3xl mx-auto"
      >
        Hear from businesses that transformed their logistics with SwiftShift
      </motion.p>
    </motion.div>

      <div>
        <TestimonialCarousel 
          testimonials={top} 
          direction="left"  // Top carousel moves right-to-left
          speed={50} 
        />
      </div>

      <div>
        <TestimonialCarousel 
          testimonials={bottom} 
          direction="left" // Bottom carousel moves left-to-right
          speed={10}
        />
      </div>
    </div>
  );
};

export default TestimonialSection;