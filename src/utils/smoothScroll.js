// export const smoothScrollTo = (id, offset = 80) => {
//   const element = document.getElementById(id);
//   if (element) {
//     const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
//     window.scrollTo({ top: y, behavior: 'smooth' });
//   }
// };
export const smoothScrollTo = (id, offset = 80) => {
  const element = document.getElementById(id);
  if (!element) return;

  const targetY = element.getBoundingClientRect().top + window.pageYOffset - offset;
  const startY = window.pageYOffset;
  const distance = Math.abs(targetY - startY);

  // Duration based on distance (e.g. 0.5ms per pixel), capped between 800ms and 6000ms
  const duration = Math.min(6000, Math.max(800, distance * 0.5));

  const startTime = performance.now();

  const easeInOutQuad = (t) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const step = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutQuad(progress);
    window.scrollTo(0, startY + (targetY - startY) * easedProgress);
    if (elapsed < duration) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};
