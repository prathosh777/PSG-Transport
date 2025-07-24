import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import delivery1 from "../assets/Works/work-1.jpg";
import delivery2 from "../assets/Works/work-2.jpg";
import delivery3 from "../assets/carousel images/truck (13).jpg";

const WorksPage = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const sections = [
    {
      image: delivery1,
      title: "Delivered in 3 Days",
      description: "From Mumbai to Pune with full safety tracking.",
      bg: "bg-[#e9ebf4]",
      textColor: "text-[#0A0D2D]",
    },
    {
      image: delivery2,
      title: "Delivered in 5 Days",
      description: "From Delhi to Bangalore, high-value cargo.",
      bg: "bg-[#110f15]",
      textColor: "text-white",
    },
    {
      image: delivery3,
      title: "Delivered in 2 Days",
      description: "From Chennai to Hyderabad with forklift support.",
      bg: "bg-[#e9ebf4]",
      textColor: "text-[#0A0D2D]",
    },
  ];

  // Track active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const containerTop = containerRef.current.offsetTop;
      const scrollPosition = window.scrollY - containerTop;
      const sectionHeight = window.innerHeight;

      // Calculate active index based on scroll position
      const index = Math.min(
        Math.floor(scrollPosition / sectionHeight),
        sections.length - 1
      );

      setActiveIndex(index);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections.length]);

  // Calculate animation values for each section
  const getAnimationValues = (index) => {
    // For active card
    if (index === activeIndex) {
      return {
        scale: 1,
        y: 0,
        zIndex: 30,
      };
    }

    if (index < activeIndex) {
      const distance = activeIndex - index;
      return {
        scale: 1 - distance * 0.05, // Scale down based on distance
        y: -30 * distance, // Move up based on distance
        zIndex: 20 - distance,
      };
    }

    return {
      scale: 0.95,
      y: 30,
      zIndex: 10 - index,
    };
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  return (
    <div className="relative">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              ease: "easeOut",
              staggerChildren: 0.15,
            },
          },
        }}
        className="max-w-7xl  md:pb-0 mx-auto text-center md:py-12 py-8 mb-0 md:mb-12"
      >
        <motion.span
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          id="works"
          className="inline-block rounded-full bg-[#343434] px-[15px] py-[1px] text-white mb-4 text-base font-medium"
        >
          Our work
        </motion.span>

        <motion.h3
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          className="text-2xl md:text-5xl font-semibold text-gray-900 mb-2"
        >
          What we do
        </motion.h3>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          className="text-xl text-gray-600"
        >
          Experience our fleet in action
        </motion.p>
      </motion.div>
      {/* <div ref={containerRef} style={{ height: `${sections.length * 100}vh` }}> */}
      <div
        ref={containerRef}
        style={{ height: `${sections.length * 100}vh` }}
        className=""
      >
        {sections.map((item, idx) => {
          const animation = getAnimationValues(idx);

          return (
            <motion.section
              key={idx}
              className="h-screen w-full flex items-center justify-center sticky top-0"
              style={{ top: "60px" }}
              initial={false}
              animate={animation}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 0.5,
              }}
            >
              <div
                className={`${item.bg} shadow-xl rounded-xl p-6 md:p-10 w-[90%] max-w-7xl flex flex-col md:flex-row items-center justify-between gap-10`}
              >
                {/* Left Image (40% width) */}
                <div className="md:w-[40%] w-full h-[250px] md:h-[550px]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                  />
                </div>

                {/* Right Content (60% width) */}
                <div className="md:w-[60%]">
                  {/* Tag group (similar to "Our Works" at top) */}
                  {/* <div className="flex items-center justify-between w-[50%] mx-auto gap-2 mb-4">
                    <span className="inline-block rounded-full bg-[#0A0D2D] px-4 py-1 text-white text-sm font-medium">
                      3 days
                    </span>
                    <span className="inline-block rounded-full bg-[#0A0D2D] px-4 py-1 text-white text-sm font-medium">
                      Secure Transport
                    </span>
                  </div> */}

                  {/* Heading */}
                  <h2
                    className={`text-lg sm:text-xl md:text-3xl lg:text-5xl font-bold mb-6 text-center ${item.textColor}`}
                  >
                    {item.title}
                  </h2>

                  <p
                    className={`text-sm sm:text-base md:text-lg lg:text-xl mb-8 mx-auto max-w-3xl px-4 
    ${item.textColor.includes("white") ? "text-gray-300" : "text-gray-600"}
  `}
                  >
                    {item.description}
                    <br />
                    <br />
                    Our dedicated team ensures timely delivery with real-time
                    tracking and premium safety measures. All cargo is handled
                    with specialized equipment for maximum protection.
                  </p>

               
                </div>
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
};

export default WorksPage;
