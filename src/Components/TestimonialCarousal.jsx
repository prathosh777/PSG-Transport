
import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const TestimonialCarousel = ({ testimonials, direction = "left", speed = 50 }) => {
  const controls = useAnimation();
  const containerRef = useRef(null);

  const isRight = direction === "right";

  const totalCards = testimonials.length;
  const cardWidth = 400; // adjust to your desired testimonial card width
  const gap = 32; // 2rem = gap-8 (Tailwind)
  const totalWidth = (cardWidth + gap) * totalCards;

  useEffect(() => {
    let currentX = 0;
    const animate = () => {
      currentX += isRight ? 1 : -1;
      if (Math.abs(currentX) >= totalWidth) {
        currentX = 0;
      }
      controls.start({ 
        x: isRight ? -currentX : currentX,
        transition: { ease: "linear", duration: 0 } 
      });
    };
    const interval = setInterval(animate, speed);
    return () => clearInterval(interval);
  }, [controls, isRight, totalWidth, speed]);

  return (
    <div ref={containerRef} className="overflow-hidden w-full">
      <motion.div
        className="flex gap-8"
        animate={controls}
        style={{ width: totalWidth * 2 }} // double for seamless loop
      >
        {[...testimonials, ...testimonials].map((t, i) => (
          <div
            key={`${t.id}-${i}`}
            className="bg-white rounded-xl shadow-lg p-6 w-[400px] flex-shrink-0"
          >
            <div className="flex items-center mb-4">
              {/* <img
                src={t.image}
                alt={t.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
              /> */}
              <div className="ml-4">
                <h3 className="font-bold text-lg text-gray-900">{t.name}</h3>
                <p className="text-gray-600 text-sm">{t.role}</p>
              </div>
            </div>
            <p className="text-gray-700 italic mt-4">"{t.content}"</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TestimonialCarousel; 