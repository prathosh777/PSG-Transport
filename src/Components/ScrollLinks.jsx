import React from 'react';
import { smoothScrollTo } from '../utils/smoothScroll';

const ScrollLink = ({ 
  to, 
  children, 
  offset = 80, 
  className = '', 
  onClick = () => {} 
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    smoothScrollTo(to, offset);
    onClick();
  };

  return (
    <a 
      href={`#${to}`} 
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
};

export default ScrollLink;