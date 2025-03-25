import React, { memo } from 'react';
import { motion, useSpring, useScroll } from 'framer-motion';

const SmoothScrollContainer = memo(({ children }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {children}
      <motion.div 
        className="progress-bar" 
        style={{ 
          scaleX,
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          height: '4px', 
          background: 'linear-gradient(to right, #4A90E2, #7B68EE)', 
          transformOrigin: '0%',
          zIndex: 1000 
        }} 
      />
    </>
  );
});

// ✅ Fix: Set display name to avoid warnings
SmoothScrollContainer.displayName = "SmoothScrollContainer";

export default SmoothScrollContainer;
