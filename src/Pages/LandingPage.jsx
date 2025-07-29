
import React, { useState } from "react";
import ScrollLink from "../Components/ScrollLinks";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

// Animation variants (these remain the same)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.95,
  },
};

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div id="home" className="bg-[#101014] text-white min-h-screen  flex flex-col overflow-hidden">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between md:relative fixed left-5 top-2 rounded-xl h-16  md:h-32 w-[90%] mx-auto bg-[#101014] md:bg-opacity-0 bg-opacity-80 items-center px-4  z-20"
      >
        <div>
          <h3 className="font-extrabold text-2xl">PSG Transport</h3>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex text z-10 font-extrabold gap-10">
          {['about', 'services', 'works', 'faq', 'contact'].map((item) => (
            <motion.li
              key={item}
              whileHover="hover"
              className="hover:text-blue-400  transition-colors cursor-pointer md:text-lg capitalize"
            >
              <ScrollLink to={item} className="hover:text-blue-500">
                {item === 'works' ? 'Our Works' : item}
              </ScrollLink>
            </motion.li>
          ))}
        </ul>

        {/* Hamburger Menu Icon */}
        <div className="md:hidden z-20 flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.ul
          initial={false}
          animate={isMenuOpen ? "open" : "closed"}
          variants={{
            open: { opacity: 1, x: 0 },
            closed: { opacity: 0, x: "100%" },
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className={`fixed top-0 right-0 h-full w-full bg-[#1a1a1e]  md:bg-transparent bg-opacity-95 flex flex-col items-center justify-center gap-8 md:hidden transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out`}
        >
          {['about', 'services', 'works', 'faq', 'contact'].map((item) => (
            <motion.li
              key={item}
              whileHover="hover"
              className="text-white text-2xl font-bold hover:text-blue-400 transition-colors cursor-pointer capitalize"
              onClick={() => setIsMenuOpen(false)} // Close menu on link click
            >
              <ScrollLink to={item}>
                {item === 'works' ? 'Our Works' : item}
              </ScrollLink>
            </motion.li>
          ))}
        </motion.ul>
      </motion.nav>

      <motion.main
  initial="hidden"
  animate="visible"
  variants={containerVariants}
  className="flex flex-col items-start px-6 relative z-10 text-left w-[95%] h-[95vh] top-5 mx-auto
             bg-[url('/src/assets/truck-(8).jpg')] bg-cover bg-no-repeat bg-left md:bg-none rounded-lg
             md:w-[85%] md:h-[calc(100vh-8rem)] md:mx-auto md:flex-row md:justify-start md:items-center md:px-4"
  style={{
    minHeight: 'calc(100vh - 8rem)',
    justifyContent: 'flex-start',
  }}
>
  {/* Your content here */}

        {/* Content Wrapper for Text and Button */}
        <div className="w-full md:w-[50%] space-y-6 z-10 sm:pt-52 pt-32 md:pt-0
                        text-left md:relative md:-top-20"> {/* Kept text-left for mobile */}
          <motion.div
            variants={itemVariants}
            className="inline-flex global items-center gap-2 rounded-full bg-[#343434] px-2 pr-4 text-white text-sm"
          >
            <div className="relative h-8 w-8">
              <div className="absolute z-10 h-3 w-3 rounded-full bg-white   transform translate-x-2.5 translate-y-2.5"></div>
              <div className="absolute h-full w-full rounded-full bg-white animate-[pulse-ring_1s_cubic-bezier(0.4,0,0.2,1)_infinite]"></div>
            </div>
    
            <span className="text-sm font-medium">Available for work</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-semibold leading-tight  mt-4 md:mt-0"
          >
            Your Trusted Partner in Safe & Timely Deliveries
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg opacity-90 w-full md:w-[70%] md:mx-0" // Removed mx-auto from here for mobile left alignment
          >
            PSG Transports delivers reliable logistics solutions, ensuring safe
            and timely deliveries with unmatched precision.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8">
            <ScrollLink to="contact">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="flex justify-start gap-2 items-center shadow-xl text-base font-semibold text-gray-50 bg-[#343434] backdrop-blur-md lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-[#FFFFFF] hover:text-black before:-z-10 before:aspect-square before:hover:scale-200 before:hover:duration-500 relative z-10 px-7 py-3 overflow-hidden rounded-full group"
                type="submit"
              >
                Work with us
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 19"
                  className="w-8 h-8 ml-3 justify-end bg-gray-50 group-hover:rotate-90 text-gray-50 ease-linear duration-300 rounded-full b p-2 rotate-45"
                >
                  <path
                    className="fill-gray-500 group-hover:fill-gray-800"
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                  ></path>
                </svg>
              </motion.button>
            </ScrollLink>
          </motion.div>
        </div>

        {/* Desktop-only Image */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="hidden md:block absolute md:-right-20 right-0  transform bottom-10 -translate-y-1/2 w-[50%] h-[95vh] bg-[url('/public/HeroTruckImage.jpg')] bg-cover  bg-left bg-no-repeat rounded-md"
          style={{
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        />
      </motion.main>
    </div>
  );
};

export default LandingPage;
