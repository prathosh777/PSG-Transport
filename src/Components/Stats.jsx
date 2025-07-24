// import { useEffect, useState, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';

// const StatsSection = () => {
//   const stats = [
//     { id: 1, value: 8, unit: '+', label: 'Years of Experience', description: 'Reliable transport solutions since 2015' },
//     { id: 2, value: 500, unit: '+', label: 'Satisfied Clients', description: 'Trusted by businesses nationwide' },
//     { id: 3, value: 100, unit: '%', label: 'Client satisfaction', description: 'All of our clients are satisfied with our work and service' },
//     { id: 4, value: 99, unit: '%', label: 'On-Time Delivery', description: 'Consistent record of punctuality' }
//   ];

//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.5
//   });

//   return (
//     <div ref={ref} className=" ">
//       <div className=" mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {stats.map((stat) => (
//             <StatItem 
//               key={stat.id}
//               value={stat.value}
//               unit={stat.unit}
//               label={stat.label}
//               description={stat.description}
//               shouldAnimate={inView}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const StatItem = ({ value, unit, label, description, shouldAnimate }) => {
//   const [count, setCount] = useState(0);
//   const duration = 2000; // 2 seconds for all animations
//   const startTime = useRef(null);

//   useEffect(() => {
//     if (!shouldAnimate) return;

//     let animationFrame;
//     const animate = (timestamp) => {
//       if (!startTime.current) startTime.current = timestamp;
//       const progress = timestamp - startTime.current;
//       const percentage = Math.min(progress / duration, 1);
//       setCount(Math.floor(percentage * value));

//       if (percentage < 1) {
//         animationFrame = requestAnimationFrame(animate);
//       }
//     };

//     animationFrame = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(animationFrame);
//   }, [shouldAnimate, value]);

//   return (
//     <motion.div 
//       className="text-start  p-6 "
//     //   whileHover={{ y: -5 }}
//     //   transition={{ duration: 0.3 }}
//     >
//       <div className="flex justify-start item">
//         <h1 className="text-7xl font-light text-[#0A0D2D]">
//           {shouldAnimate ? count : 0}
//         </h1>
//         <span className="text-2xl text-[#0A0D2D] ml-1">{unit}</span>
//       </div>
//       <h3 className="text-xl font-semibold mt-2 text-[#333]">{label}</h3>
//       <p className="text-gray-600 mt-2">{description}</p>
//     </motion.div>
//   );
// };

// export default StatsSection;
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const StatsSection = () => {
  const stats = [
    { id: 1, value: 8, unit: '+', label: 'Years of Experience', description: 'Reliable transport solutions since 2015' },
    { id: 2, value: 500, unit: '+', label: 'Satisfied Clients', description: 'Trusted by businesses nationwide' },
    { id: 3, value: 100, unit: '%', label: 'Client satisfaction', description: 'All of our clients are satisfied with our work and service' },
    { id: 4, value: 99, unit: '%', label: 'On-Time Delivery', description: 'Consistent record of punctuality' }
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3 // Adjusted threshold slightly for better trigger on various devices
  });

  return (
    // Only added padding for overall section and ensures full width
    <div ref={ref} className="w-[90%] mx-auto py-8"> {/* Added w-full and py-8 for vertical padding */}
      <div className="mx-auto px-4"> {/* Kept existing mx-auto px-4 for content centering and horizontal padding */}
        {/* Responsive grid setup:
            grid-cols-1: 1 column on extra small screens (mobile)
            sm:grid-cols-2: 2 columns on small screens (e.g., larger phones, tablets)
            md:grid-cols-4: 4 columns on medium screens (desktop)
            gap-8: Consistent spacing between grid items
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <StatItem
              key={stat.id}
              value={stat.value}
              unit={stat.unit}
              label={stat.label}
              description={stat.description}
              shouldAnimate={inView}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ value, unit, label, description, shouldAnimate }) => {
  const [count, setCount] = useState(0);
  const duration = 2000; // 2 seconds for all animations
  const startTime = useRef(null);

  useEffect(() => {
    if (!shouldAnimate) return;

    let animationFrame;
    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = timestamp - startTime.current;
      const percentage = Math.min(progress / duration, 1);
      setCount(Math.floor(percentage * value));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value); // Ensure it snaps to the final value
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [shouldAnimate, value, duration]);

  return (
    <motion.div
      className="text-start p-2 w-[90%] mx-auto" // Retained original text-start; reduced padding slightly for mobile fit
      // Removed whileHover and transition for minimal changes
      // Added initial/animate/transition for an appearance animation only
      initial={{ opacity: 0, y: 20 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex justify-start items-baseline"> {/* Use items-baseline for unit alignment */}
        {/* Responsive font sizes for the main number */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-light text-[#0A0D2D]">
          {shouldAnimate ? count : 0}
        </h1>
        {/* Responsive font sizes for the unit */}
        <span className="text-xl sm:text-2xl text-[#0A0D2D] ml-1">{unit}</span>
      </div>
      {/* Responsive font sizes for the label */}
      <h3 className="text-lg sm:text-xl font-semibold mt-2 text-[#333]">{label}</h3>
      {/* Responsive font sizes for the description */}
      <p className="text-sm sm:text-base text-gray-600 mt-2">{description}</p>
    </motion.div>
  );
};

export default StatsSection;