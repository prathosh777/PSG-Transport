
// import React from "react";
// import {
//   FaInstagram,
//   FaFacebook,
//   FaWhatsapp,
//   FaArrowRight,
// } from "react-icons/fa";
// import ScrollLink from "../Components/ScrollLinks";
// import { motion } from "framer-motion";

// // Animation variants (no changes, as per your existing code)
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.3,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       type: "spring",
//       stiffness: 100,
//       damping: 10,
//     },
//   },
// };

// const socialIconVariants = {
//   hover: {
//     y: -5,
//     scale: 1.1,
//     transition: {
//       type: "spring",
//       stiffness: 400,
//       damping: 10,
//     },
//   },
// };

// const quickLinkVariants = {
//   hover: {
//     x: 5,
//     transition: {
//       type: "spring",
//       stiffness: 300,
//     },
//   },
// };

// const Footer = () => {
//   return (
//     <motion.footer
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, margin: "-100px" }}
//       // Adjusted width for mobile, keeping desktop width. Added responsive padding for overall footer.
//       className="bg-[#101014] rounded-lg w-full md:w-[98%] mx-auto text-white border-t border-gray-800 py-8 sm:py-12" // py-8 for mobile, py-12 for sm+
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4"> {/* Responsive horizontal padding, reduced vertical padding slightly */}
//         <motion.div
//           variants={containerVariants}
//           // Grid layout: 1 column on mobile, 2 columns on small-medium, 4 columns on desktop.
//           // Added gap-y-8 for vertical spacing between stacked columns on mobile.
//           className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 gap-y-8"
//         >
//           {/* Company Info */}
//           <motion.div variants={itemVariants} className="md:col-span-2 text-center sm:text-left"> {/* Center text on mobile, left on sm+ */}
//             {/* Responsive font size for heading */}
//             <h3 className="text-xl sm:text-2xl font-bold mb-4">PSG Transports</h3>
//             <div className="flex justify-center sm:justify-start gap-4"> {/* Center icons on mobile, left on sm+ */}
//               <motion.a
//                 href="#"
//                 className="text-gray-400 hover:text-white transition-colors"
//                 variants={socialIconVariants}
//                 whileHover="hover"
//               >
//                 <FaInstagram className="w-5 h-5" />
//               </motion.a>
//               <motion.a
//                 href="#"
//                 className="text-gray-400 hover:text-white transition-colors"
//                 variants={socialIconVariants}
//                 whileHover="hover"
//               >
//                 <FaFacebook className="w-5 h-5" />
//               </motion.a>
//               <motion.a
//                 href="https://wa.me/8508548119?text=Hello!%20I%20saw%20your%20transport%20services%20and%20wanted%20to%20reach%20out"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-400 hover:text-white transition-colors"
//                 variants={socialIconVariants}
//                 whileHover="hover"
//               >
//                 <FaWhatsapp className="w-5 h-5" />
//               </motion.a>
//             </div>
//           </motion.div>

//           {/* Quick Links */}
//           <motion.div variants={itemVariants} className="text-center sm:text-left"> {/* Center text on mobile, left on sm+ */}
//             {/* Responsive font size for heading */}
//             <h4 className="text-lg sm:text-xl font-semibold mb-4">Quick Links</h4>
//             <ul className="space-y-3">
//               {[
//                 { id: "about", label: "About" },
//                 { id: "services", label: "Services" },
//                 { id: "works", label: "Our Works" },
//                 { id: "faq", label: "FAQs" },
//                 { id: "contact", label: "Contact" },
//               ].map((item) => (
//                 <motion.li
//                   key={item.id}
//                   // Adjusted alignment for mobile (justify-center) and desktop (justify-start)
//                   className="group flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer justify-center sm:justify-start"
//                   variants={quickLinkVariants}
//                   whileHover="hover"
//                 >
//                   <motion.span
//                     className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
//                     initial={{ x: -10 }}
//                     animate={{ x: 0 }}
//                     transition={{ type: "spring" }}
//                   >
//                     <FaArrowRight />
//                   </motion.span>
//                   <ScrollLink to={item.id} smooth={true} duration={600}>
//                     <span className="text-sm sm:text-base">{item.label}</span> {/* Responsive font size for links */}
//                   </ScrollLink>
//                 </motion.li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* Contact Info */}
//           <motion.div variants={itemVariants} className="text-center sm:text-left"> {/* Center text on mobile, left on sm+ */}
//             {/* Responsive font size for heading */}
//             <h4 className="text-lg sm:text-xl font-semibold mb-4">Contact Us</h4>
//             <ul className="space-y-3 text-gray-400 text-sm sm:text-base"> {/* Responsive font size for contact info */}
//               <motion.li
//                 className="flex items-start gap-3 justify-center sm:justify-start" // Center on mobile, left on sm+
//                 // whileHover={{ x: 5 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 <svg
//                   className="w-5 h-5 mt-0.5 flex-shrink-0"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="1.5"
//                     d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                   ></path>
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="1.5"
//                     d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                   ></path>
//                 </svg>
//                 <span>
//                   Door No. 2/218, L&T Bypass Corner, opp. Sakthi Engineering
//                   College, Kulathur, Venlitapuram post, Coimbatore {" "}
//                 </span>
//               </motion.li>
//               <motion.li
//                 className="flex items-center gap-3 justify-center sm:justify-start" // Center on mobile, left on sm+
//                 // whileHover={{ x: 5 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 <svg
//                   className="w-5 h-5 flex-shrink-0"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="1.5"
//                     d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                   ></path>
//                 </svg>
//                 <span>psgtransport1@gmail.com</span>
//               </motion.li>
//               <motion.li
//                 className="flex items-center gap-3 justify-center sm:justify-start" // Center on mobile, left on sm+
//                 // whileHover={{ x: 5 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 <svg
//                   className="w-5 h-5 flex-shrink-0"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="1.5"
//                     d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                   ></path>
//                 </svg>
//                 <span>8508548119, 9790672119</span> {/* Added space for readability */}
//               </motion.li>
//             </ul>
//           </motion.div>
//         </motion.div>

//         {/* Divider */}
//         <motion.div
//           className="border-t border-gray-800 my-8"
//           initial={{ scaleX: 0 }}
//           whileInView={{ scaleX: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//         ></motion.div>

//         {/* Copyright */}
//         <motion.div
//           // Flex direction: `flex-col` (stacks vertically) on mobile, `md:flex-row` (side-by-side) on desktop.
//           // Centering: `justify-center` and `items-center` for both layouts.
//           // Padding/Margin: `py-4` for vertical padding, `mb-4` for mobile spacing.
//           className="flex flex-col md:flex-row justify-center items-center text-gray-500 text-sm py-4"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.2 }}
//         >
//           <div className="mb-2 md:mb-0 text-center"> {/* mb-2 for spacing between copyright and text on mobile */}
//             © {new Date().getFullYear()} PSG Transports. All rights reserved.
//           </div>
//         </motion.div>
//       </div>
//     </motion.footer>
//   );
// };

// export default Footer;

import React from "react";
import {
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaArrowRight,
} from "react-icons/fa";
import ScrollLink from "../Components/ScrollLinks";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
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

const socialIconVariants = {
  hover: {
    y: -5,
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

const quickLinkVariants = {
  hover: {
    x: 5,
    transition: {
      type: "spring",
      stiffness: 300,
    },
  },
};

const Footer = () => {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="bg-[#101014] w-full text-white border-t border-gray-800 py-8 sm:py-12"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 gap-y-8 w-full max-w-7xl mx-auto"
        >
          {/* Company Info */}
          <motion.div 
            variants={itemVariants} 
            className="md:col-span-2 flex flex-col items-center sm:items-start"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4">PSG Transports</h3>
            <div className="flex gap-4">
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <FaInstagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <FaFacebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://wa.me/8508548119?text=Hello!%20I%20saw%20your%20transport%20services%20and%20wanted%20to%20reach%20out"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <FaWhatsapp className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            variants={itemVariants} 
            className="flex flex-col items-center sm:items-start"
          >
            <h4 className="text-lg sm:text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 w-full">
              {[
                { id: "about", label: "About" },
                { id: "services", label: "Services" },
                { id: "works", label: "Our Works" },
                { id: "faq", label: "FAQs" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <motion.li
                  key={item.id}
                  className="group flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer justify-center sm:justify-start"
                  variants={quickLinkVariants}
                  whileHover="hover"
                >
                  <motion.span
                    className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    animate={{ x: 0 }}
                    transition={{ type: "spring" }}
                  >
                    <FaArrowRight />
                  </motion.span>
                  <ScrollLink to={item.id} smooth={true} duration={600}>
                    <span className="text-sm sm:text-base">{item.label}</span>
                  </ScrollLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            variants={itemVariants} 
            className="flex flex-col items-center sm:items-start"
          >
            <h4 className="text-lg sm:text-xl font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-gray-400 text-sm sm:text-base w-full">
              <motion.li
                className="flex items-start gap-3"
                transition={{ type: "spring", stiffness: 300 }}
              >
                <svg
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <div className="text-left">
                  <p>Door No. 2/218, L&T Bypass Corner,</p>
                  <p>opp. Sakthi Engineering College, Kulathur,</p>
                  <p>Venlitapuram post, Coimbatore</p>
                </div>
              </motion.li>
              <motion.li
                className="flex items-center gap-3 justify-center sm:justify-start"
                transition={{ type: "spring", stiffness: 300 }}
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                <span>psgtransport1@gmail.com</span>
              </motion.li>
              <motion.li
                className="flex items-center gap-3 justify-center sm:justify-start"
                transition={{ type: "spring", stiffness: 300 }}
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                <span>8508548119, 9790672119</span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="border-t border-gray-800 my-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        ></motion.div>

        {/* Copyright */}
        <motion.div
          className="flex flex-col md:flex-row justify-center items-center text-gray-500 text-sm py-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center">
            © {new Date().getFullYear()} PSG Transports. All rights reserved.
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;