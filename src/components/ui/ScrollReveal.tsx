import React from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  scaleOffset?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  yOffset = 30,
  scaleOffset = 0.98,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, scale: scaleOffset }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98], // smooth Apple easeOut cubic
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
