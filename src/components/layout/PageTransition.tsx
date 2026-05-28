import React from "react";
import { motion } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 15,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -15,
  },
};

const pageTransitionConfig = {
  type: "tween" as const,
  ease: "easeInOut" as const,
  duration: 0.35,
};

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransitionConfig}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
