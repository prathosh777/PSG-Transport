
import React from "react";

const ScrollDownButton = () => {


  return (
    <button 
      // onClick={handleScroll}
      className="flex flex-col items-center justify-center px-4 py-2 rounded-full bg-slate-900 text-white hover:bg-gray-700 transition-all animate-bounce"
    >
      <svg
        className="w-8 h-8 mt-1 "
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
};

export default ScrollDownButton;