import React from "react";
import { motion } from "framer-motion";

interface FloatingTextRevealProps {
  text: string;
  className?: string;
}

export const FloatingTextReveal: React.FC<FloatingTextRevealProps> = ({
  text,
  className = "",
}) => {
  // Split text into characters, preserving spaces
  const characters = text.split("");

  return (
    <div className={`flex flex-wrap justify-center overflow-visible py-4 select-none ${className}`}>
      {characters.map((char, idx) => {
        if (char === " ") {
          // Render a wider space to account for character wrapping
          return <span key={idx} className="w-4 sm:w-6" />;
        }

        // Generate a random initial translation and rotation for each character
        const randomX = (Math.random() - 0.5) * 350; // -175px to 175px
        const randomY = (Math.random() - 0.5) * 350; // -175px to 175px
        const randomRotate = (Math.random() - 0.5) * 180; // -90deg to 90deg

        return (
          <motion.span
            key={idx}
            initial={{
              opacity: 0,
              x: randomX,
              y: randomY,
              rotate: randomRotate,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
            }}
            viewport={{ once: false, margin: "-120px" }}
            transition={{
              duration: 1.2,
              delay: idx * 0.03, // fluid staggered wave
              ease: [0.21, 0.47, 0.32, 0.98], // smooth Apple easeOutCubic
            }}
            className="inline-block origin-center will-change-transform"
          >
            {char}
          </motion.span>
        );
      })}
    </div>
  );
};

export default FloatingTextReveal;
