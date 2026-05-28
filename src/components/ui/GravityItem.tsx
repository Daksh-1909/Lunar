import React, { useRef, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import type { GravityDisplacement } from '../../hooks/useMouseGravity';

interface GravityItemProps {
  children:           React.ReactNode;
  containerRef:       React.RefObject<HTMLElement>;
  getDisplacement:    (cx: number, cy: number) => GravityDisplacement;
  registerCallback:   (cb: () => void) => () => void;
  className?:         string;
  style?:             React.CSSProperties;
}

/**
 * Wraps any navbar element so it smoothly drifts toward the black hole
 * when the cursor is nearby, and springs back when it moves away.
 *
 * One shared rAF loop (from useMouseGravity) drives all items — no per-item rAF.
 */
export const GravityItem: React.FC<GravityItemProps> = ({
  children,
  containerRef,
  getDisplacement,
  registerCallback,
  className,
  style,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  const springCfg = { stiffness: 260, damping: 22, mass: 0.7 };
  const x     = useSpring(0, springCfg);
  const y     = useSpring(0, springCfg);
  const scale = useSpring(1, { stiffness: 300, damping: 26 });

  useEffect(() => {
    const updateSprings = () => {
      const item      = itemRef.current;
      const container = containerRef.current;
      if (!item || !container) return;

      const iRect = item.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();

      const cx = iRect.left - cRect.left + iRect.width  / 2;
      const cy = iRect.top  - cRect.top  + iRect.height / 2;

      const disp = getDisplacement(cx, cy);
      x.set(disp.x);
      y.set(disp.y);
      scale.set(disp.scale);
    };

    return registerCallback(updateSprings);
  }, [getDisplacement, registerCallback, containerRef, x, y, scale]);

  return (
    <motion.div
      ref={itemRef}
      className={className}
      style={{ x, y, scale, willChange: 'transform', ...style }}
    >
      {children}
    </motion.div>
  );
};
