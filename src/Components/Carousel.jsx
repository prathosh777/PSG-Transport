
import  { useEffect, useRef, useState, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
// import  from "../data/carousel-data.json";
import TruckImage1 from "../../public/Carousel-images/TruckImage1.jpg";
import TruckImage2 from "../../public/Carousel-images/TruckImage2.webp";
import TruckImage3 from "../../public/Carousel-images/TruckImage3.webp";
import TruckImage4 from "../../public/Carousel-images/TruckImage4.webp";
import TruckImage5 from "../../public/Carousel-images/TruckImage5.webp";
import TruckImage6 from "../../public/Carousel-images/TruckImage6.webp";
import TruckImage7 from "../../public/Carousel-images/TruckImage7.webp";
import TruckImage8 from "../../public/Carousel-images/TruckImage8.webp";
import TruckImage9 from "../../public/Carousel-images/TruckImage9.webp";
import TruckImage10 from "../../public/Carousel-images/TruckImage10.webp";
import TruckImage11 from "../../public/Carousel-images/TruckImage11.webp";
import TruckImage12 from "../../public/Carousel-images/TruckImage12.webp";
import TruckImage13 from "../../public/Carousel-images/TruckImage13.webp";
import TruckImage14 from "../../public/Carousel-images/TruckImage14.webp";
import TruckImage15 from "../../public/Carousel-images/TruckImage15.webp";
import TruckImage16 from "../../public/Carousel-images/TruckImage16.webp";
import TruckImage17 from "../../public/Carousel-images/TruckImage17.webp";
import TruckImage18 from "../../public/Carousel-images/TruckImage18.webp";
import TruckImage19 from "../../public/Carousel-images/TruckImage19.webp";
import { Truck } from "lucide-react";
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
const carouselData =[
  {
    "id": 1,
    "image": TruckImage1,
    "alt": "PSG Transport Fleet - Truck 1"
  },
  {
    "id": 2,
    "image": TruckImage2,
    "alt": "PSG Transport Fleet - Truck 2"
  },
  {
    "id": 3,
    "image": TruckImage3,
    "alt": "PSG Transport Fleet - Truck 3"
  },
  {
    "id": 4,
    "image": TruckImage4,
    "alt": "PSG Transport Fleet - Truck 4"
  },
  {
    "id": 5,
    "image": TruckImage5, 
    "alt": "PSG Transport Fleet - Truck 5"
  },
  {
    "id": 6,
    "image": TruckImage6,
    "alt": "PSG Transport Fleet - Truck 6"
  },
  {
    "id": 7,
    "image": TruckImage7,
    "alt": "PSG Transport Fleet - Truck 7"
  },
  {
    "id": 8,
    "image":TruckImage8,
    "alt": "PSG Transport Fleet - Truck 8"
  },
  {
    "id": 9,
    "image": TruckImage9,
    "alt": "PSG Transport Fleet - Truck 9"
  },
  {
    "id": 10,
    "image": TruckImage10,
    "alt": "PSG Transport Fleet - Truck 10"
  },
  {
    "id": 11,
    "image": TruckImage11,
    "alt": "PSG Transport Fleet - Truck 11"
  },
  {
    "id": 12,
    "image": TruckImage12,
    "alt": "PSG Transport Fleet - Truck 12"
  },
  {
    "id": 13,
    "image": TruckImage13,
    "alt": "PSG Transport Fleet - Truck 13"
  },
  {
    "id": 14,
    "image": TruckImage14,
    "alt": "PSG Transport Fleet - Truck 14"
  },
  {
    "id": 15,
    "image": TruckImage15,
    "alt": "PSG Transport Fleet - Truck 15"
  },
  {
    "id": 16,
    "image": TruckImage16,
    "alt": "PSG Transport Fleet - Truck 16"
  },
  {
    "id": 17,
    "image": TruckImage17,
    "alt": "PSG Transport Fleet - Truck 17"
  },
  {
    "id": 18,
    "image": TruckImage18,
    "alt": "PSG Transport Fleet - Truck 18"
  }
]
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