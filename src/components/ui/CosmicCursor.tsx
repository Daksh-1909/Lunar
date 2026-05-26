import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  life: number;
};

const lerp = (start: number, end: number, factor: number) =>
  start + (end - start) * factor;

export const CosmicCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, {
    damping: 20,
    stiffness: 220,
    mass: 0.4,
  });

  const springY = useSpring(cursorY, {
    damping: 20,
    stiffness: 220,
    mass: 0.4,
  });

  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);

  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const smooth = { x: mouse.x, y: mouse.y };

    const createParticle = (x: number, y: number) => {
      const newParticle: Particle = {
        id: particleId.current++,
        x,
        y,
        size: Math.random() * 5 + 2,
        opacity: 1,
        life: 1,
      };

      setParticles((prev) => [...prev.slice(-40), newParticle]);
    };

    const updateParticles = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            opacity: p.opacity - 0.03,
            life: p.life - 0.03,
            size: p.size * 0.985,
          }))
          .filter((p) => p.life > 0)
      );
    };

    const animate = () => {
      smooth.x = lerp(smooth.x, mouse.x, 0.18);
      smooth.y = lerp(smooth.y, mouse.y, 0.18);

      cursorX.set(smooth.x);
      cursorY.set(smooth.y);

      trailRef.current.push({ x: smooth.x, y: smooth.y });

      if (trailRef.current.length > 12) {
        trailRef.current.shift();
      }

      createParticle(smooth.x, smooth.y);
      updateParticles();

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMove);

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main Cursor Glow */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{
          x: springX,
          y: springY,
        }}
      >
        <div className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
          {/* Outer Glow */}
          <div className="absolute h-20 w-20 rounded-full bg-cyan-400/20 blur-3xl" />

          {/* Middle Glow */}
          <div className="absolute h-10 w-10 rounded-full bg-cyan-300/40 blur-xl" />

          {/* Star Core */}
          <div className="relative h-4 w-4 rounded-full bg-white shadow-[0_0_25px_10px_rgba(34,211,238,0.8)]" />

          {/* Cross Light */}
          <div className="absolute h-[1px] w-16 bg-cyan-200/70 blur-[1px]" />
          <div className="absolute h-16 w-[1px] bg-cyan-200/70 blur-[1px]" />
        </div>
      </motion.div>

      {/* Particle Trail */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="pointer-events-none fixed z-[9998] rounded-full bg-cyan-300 hidden md:block"
          initial={{
            opacity: particle.opacity,
            scale: 1,
          }}
          animate={{
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            boxShadow: "0 0 12px rgba(34,211,238,0.9)",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Smooth Energy Trail */}
      {trailRef.current.map((point, index) => (
        <motion.div
          key={index}
          className="pointer-events-none fixed z-[9997] rounded-full bg-cyan-200 hidden md:block"
          animate={{
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          style={{
            left: point.x,
            top: point.y,
            width: Math.max(1, 8 - index * 0.45),
            height: Math.max(1, 8 - index * 0.45),
            opacity: 1 - index * 0.08,
            filter: "blur(1px)",
            boxShadow: "0 0 10px rgba(34,211,238,0.8)",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Hide Default Cursor on Desktop */}
      <style>{`
        @media (min-width: 768px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default CosmicCursor;
