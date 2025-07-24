
// import React, { useEffect, useRef } from "react";
// import { motion, useAnimation } from "framer-motion";
// import carouselData from "../data/carousel-data.json";

// const CarouselSlider = () => {
//   const sliderRef = useRef(null);
//   const controls = useAnimation();
//   const itemWidth = 400; // Width of each carousel item
//   const gap = 12; // Gap between items
//   const totalWidth = (itemWidth + gap) * carouselData.length;
//   const duplicates = 3; // Number of duplicate sets for seamless looping

//   // Combine original data with duplicates
//   const extendedData = [...Array(duplicates)].flatMap(() => carouselData);

//   useEffect(() => {
//     let currentX = 0;
//     let animationFrameId;
//     let lastTimestamp = performance.now();
//     const speed = 1; // Pixels per frame to move

//     const animate = (timestamp) => {
//       const deltaTime = timestamp - lastTimestamp;
//       lastTimestamp = timestamp;

//       // Only update position based on consistent frame timing
//       currentX -= speed * (deltaTime / 16); // Normalize to 60fps

//       // When we've scrolled one full width, reset position seamlessly
//       if (Math.abs(currentX) >= totalWidth) {
//         currentX += totalWidth;
//       }

//       controls.start({ x: currentX });
//       animationFrameId = requestAnimationFrame(animate);
//     };

//     animationFrameId = requestAnimationFrame(animate);

//     return () => {
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, [controls, totalWidth]);

//   return (
//     <div className="w-full overflow-hidden h-[500px] relative">
//       <motion.div
//         ref={sliderRef}
//         className="flex gap-[12px]"
//         animate={controls}
//         transition={{ ease: "linear" }}
//         style={{ width: totalWidth * duplicates }}
//       >
//         {extendedData.map((item, index) => (
//           <img
//             key={`${item.id}-${index}`}
//             src={item.image}
//             alt={item.alt}
//             className="h-[500px] w-[400px] object-cover flex-shrink-0"
//           />
//         ))}
//       </motion.div>
//     </div>
//   );
// };

// export default CarouselSlider;
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import carouselData from "../data/carousel-data.json";

const CarouselSlider = () => {
  const sliderRef = useRef(null);
  const controls = useAnimation();

  const MD_BREAKPOINT = 768; // Tailwind's 'md' breakpoint

  // State to hold dynamic dimensions
  const [itemDimensions, setItemDimensions] = useState({
    width: 400, // Default desktop width
    height: 500, // Default desktop height
    gap: 12,
  });

  // Calculate dimensions based on current window width
  const calculateDimensions = useCallback(() => {
    const currentWindowWidth = window.innerWidth;
    if (currentWindowWidth < MD_BREAKPOINT) {
      // Mobile/Tablet dimensions
      // Use a percentage of viewport width for fluid scaling on smaller screens
      const newWidth = currentWindowWidth * 0.85; // e.g., 85% of viewport width
      setItemDimensions({
        width: newWidth,
        // Calculate height to maintain aspect ratio, or set a fixed max/min height
        height: Math.min(newWidth * (500 / 400), 300), // Max 300px, maintains aspect ratio
        gap: 8,
      });
    } else {
      // Desktop dimensions
      setItemDimensions({
        width: 400,
        height: 500,
        gap: 12,
      });
    }
  }, []);

  // Effect to set initial dimensions and listen for resize events
  useEffect(() => {
    calculateDimensions(); // Set initial dimensions
    window.addEventListener('resize', calculateDimensions); // Listen for resize
    return () => window.removeEventListener('resize', calculateDimensions); // Clean up
  }, [calculateDimensions]);

  const { width: itemWidth, height: itemHeight, gap } = itemDimensions;

  // Recalculate totalWidthOfOneSet whenever itemWidth or gap changes
  const totalWidthOfOneSet = (itemWidth + gap) * carouselData.length;
  const duplicates = 3; // Number of duplicate sets for seamless looping
  const extendedData = [...Array(duplicates)].flatMap(() => carouselData);

  // Animation logic using dynamic dimensions
  useEffect(() => {
    let currentX = 0;
    let animationFrameId;
    let lastTimestamp = performance.now();
    // Speed now depends on itemWidth to ensure consistent visual speed regardless of size
    // Adjust '200' to control the speed (smaller number = faster)
    const speed = itemWidth / 200;

    const animate = (timestamp) => {
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      // Only update position based on consistent frame timing
      currentX -= speed * (deltaTime / 16.6667); // Normalize to 60fps (1000ms / 60 frames ≈ 16.6667ms per frame)

      // When we've scrolled one full set, reset position seamlessly
      if (Math.abs(currentX) >= totalWidthOfOneSet) {
        currentX += totalWidthOfOneSet;
      }

      controls.start({ x: currentX }, { type: "tween", duration: 0 });
      animationFrameId = requestAnimationFrame(animate);
    };

    // Only start animation if dimensions are valid and data exists
    if (itemWidth > 0 && totalWidthOfOneSet > 0 && carouselData.length > 0) {
      animationFrameId = requestAnimationFrame(animate);
    }


    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [controls, totalWidthOfOneSet, itemWidth, carouselData.length]); // Dependencies for useEffect

  return (
    // Outer container for the carousel.
    // Its height is dynamic based on itemHeight.
    // It hides overflow, crucial for the horizontal slider.
    <div className="w-full overflow-hidden relative" style={{ height: itemHeight }}>
      <motion.div
        ref={sliderRef}
        className="flex flex-row flex-nowrap" // Ensure items stay in a single row
        animate={controls}
        transition={{ ease: "linear" }}
        style={{
          width: totalWidthOfOneSet * duplicates, // Overall width of the animated strip
          gap: `${gap}px`, // Dynamic gap between items
        }}
      >
        {extendedData.map((item, index) => (
          <img
            key={`${item.id}-${index}`}
            src={item.image}
            alt={item.alt}
            // flex-shrink-0 is crucial to prevent images from shrinking below itemWidth
            // object-cover ensures the image fills its container without distortion
            // rounded-lg shadow-lg for styling
            className="object-cover flex-shrink-0 rounded-lg shadow-lg"
            style={{
              width: `${itemWidth}px`,   // Apply dynamic width
              height: `${itemHeight}px`, // Apply dynamic height
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default CarouselSlider;