import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
//  Accretion Particles  –  canvas-drawn orbiting dust & plasma dots
// ─────────────────────────────────────────────────────────────────────────────
interface ParticlesProps { size: number }

const AccretionParticles: React.FC<ParticlesProps> = ({ size }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Hi-DPI support
    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
    canvas.width  = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width  = `${size}px`;
    canvas.style.height = `${size}px`;

    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;

    // Seed particles with random orbital params
    const NUM = 24;
    const particles = Array.from({ length: NUM }, (_, i) => ({
      angle:      (Math.PI * 2 / NUM) * i + Math.random() * 0.3,
      baseRadius: size * 0.26 + (Math.random() - 0.5) * size * 0.06,
      speed:      (0.007 + Math.random() * 0.006) * (Math.random() > 0.5 ? 1 : -1),
      dotSize:    0.7 + Math.random() * 1.6,
      opacity:    0.35 + Math.random() * 0.55,
      tilt:       0.22 + Math.random() * 0.18, // scaleY for elliptic orbit
      phase:      Math.random() * Math.PI * 2,
    }));

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      t++;

      for (const p of particles) {
        p.angle += p.speed;

        const r  = p.baseRadius + Math.sin(t * 0.03 + p.phase) * 3;
        const px = cx + Math.cos(p.angle) * r;
        const py = cy + Math.sin(p.angle) * r * p.tilt;

        // Depth fade: particles "behind" the black hole fade
        const depth   = (Math.sin(p.angle) + 1) / 2;       // 0 (behind) → 1 (front)
        const flicker = (Math.sin(t * 0.06 + p.phase * 3) + 1) / 2;
        const alpha   = p.opacity * (0.25 + depth * 0.75) * (0.7 + flicker * 0.3);

        // Blue-white gradient glow per particle
        const grd = ctx.createRadialGradient(px, py, 0, px, py, p.dotSize * 4);
        grd.addColorStop(0, `rgba(210, 225, 255, ${alpha})`);
        grd.addColorStop(0.4, `rgba(106, 127, 219, ${alpha * 0.6})`);
        grd.addColorStop(1,   `rgba(44, 62, 145, 0)`);

        ctx.beginPath();
        ctx.arc(px, py, p.dotSize * (1 + flicker * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:  'absolute',
        top:       '50%',
        left:      '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}
    />
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  Lensing Ring  –  an animated concentric pulse ring
// ─────────────────────────────────────────────────────────────────────────────
const LensingRing: React.FC<{ size: number; delay: number; opacity: number }> =
  ({ size, delay, opacity }) => (
    <motion.div
      style={{
        position:     'absolute',
        width:        size,
        height:       size,
        top:          '50%',
        left:         '50%',
        marginTop:    -size / 2,
        marginLeft:   -size / 2,
        borderRadius: '50%',
        border:       `1px solid rgba(106, 127, 219, ${opacity})`,
        pointerEvents: 'none',
      }}
      animate={{ scale: [1, 1.08, 1], opacity: [opacity, opacity * 0.3, opacity] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );

// ─────────────────────────────────────────────────────────────────────────────
//  BlackHoleEffect  –  main export
// ─────────────────────────────────────────────────────────────────────────────
interface BlackHoleEffectProps {
  /** Raw mouse X relative to the island container */
  x: number;
  /** Raw mouse Y relative to the island container */
  y: number;
  isActive: boolean;
}

export const BlackHoleEffect: React.FC<BlackHoleEffectProps> = ({
  x, y, isActive,
}) => {
  // High-stiffness spring for snappy but cinematic follow
  const springCfg = { stiffness: 200, damping: 24, mass: 0.5 };
  const sx = useSpring(x, springCfg);
  const sy = useSpring(y, springCfg);

  useEffect(() => { sx.set(x); }, [x, sx]);
  useEffect(() => { sy.set(y); }, [y, sy]);

  const PARTICLE_CANVAS = 140; // px — canvas size for orbiting particles

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          // Zero-size anchor that follows the cursor
          style={{
            position:      'absolute',
            top:           0,
            left:          0,
            width:         0,
            height:        0,
            x:             sx,
            y:             sy,
            pointerEvents: 'none',
            zIndex:        20,
          }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {/* ── 1. Vast outer atmospheric glow ── */}
          <div style={{
            position:     'absolute',
            width:        260,
            height:       260,
            top:          -130,
            left:         -130,
            borderRadius: '50%',
            background:   `radial-gradient(circle,
              rgba(44,62,145,0.22) 0%,
              rgba(44,62,145,0.10) 25%,
              rgba(106,127,219,0.04) 55%,
              transparent 70%)`,
          }} />

          {/* ── 2. Gravitational lensing rings ── */}
          <LensingRing size={180} delay={0}    opacity={0.10} />
          <LensingRing size={130} delay={0.5}  opacity={0.14} />
          <LensingRing size={90}  delay={1.0}  opacity={0.18} />

          {/* ── 3. Orbiting plasma particles (canvas) ── */}
          <AccretionParticles size={PARTICLE_CANVAS} />

          {/* ── 4. Outer accretion disk  (spinning conic gradient ring) ── */}
          <motion.div
            style={{
              position:     'absolute',
              width:        76,
              height:       76,
              top:          -38,
              left:         -38,
              borderRadius: '50%',
              background: `conic-gradient(
                from 0deg,
                transparent        0%,
                rgba(44,62,145,0.25)  8%,
                rgba(106,127,219,0.85) 22%,
                rgba(190,210,255,1)   33%,
                rgba(106,127,219,0.70) 44%,
                transparent        55%,
                rgba(44,62,145,0.15)  75%,
                transparent        100%
              )`,
              WebkitMask: 'radial-gradient(circle, transparent 50%, black 56%, black 100%)',
              mask:       'radial-gradient(circle, transparent 50%, black 56%, black 100%)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          />

          {/* ── 5. Inner counter-rotating ring (dimmer, slower) ── */}
          <motion.div
            style={{
              position:     'absolute',
              width:        54,
              height:       54,
              top:          -27,
              left:         -27,
              borderRadius: '50%',
              background: `conic-gradient(
                from 120deg,
                transparent        0%,
                rgba(44,62,145,0.45)  20%,
                rgba(106,127,219,0.65) 38%,
                transparent        58%,
                rgba(44,62,145,0.25)  80%,
                transparent        100%
              )`,
              WebkitMask: 'radial-gradient(circle, transparent 48%, black 54%, black 100%)',
              mask:       'radial-gradient(circle, transparent 48%, black 54%, black 100%)',
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
          />

          {/* ── 6. Photon sphere glow ring ── */}
          <div style={{
            position:     'absolute',
            width:        38,
            height:       38,
            top:          -19,
            left:         -19,
            borderRadius: '50%',
            boxShadow: `
              0 0 0 1.5px rgba(106,127,219,0.85),
              0 0 8px  5px  rgba(106,127,219,0.50),
              0 0 20px 10px rgba(44,62,145,0.35),
              0 0 40px 18px rgba(44,62,145,0.15)`,
          }} />

          {/* ── 7. Event horizon – pitch-black core ── */}
          <div style={{
            position:     'absolute',
            width:        24,
            height:       24,
            top:          -12,
            left:         -12,
            borderRadius: '50%',
            background:   'radial-gradient(circle, #000000 40%, #020410 80%, transparent 100%)',
            boxShadow:    'inset 0 0 6px rgba(0,0,0,0.95)',
          }} />

          {/* ── 8. Energy bloom pulse ── */}
          <motion.div
            style={{
              position:     'absolute',
              width:        52,
              height:       52,
              top:          -26,
              left:         -26,
              borderRadius: '50%',
              background:   'radial-gradient(circle, rgba(106,127,219,0.18) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0.15, 0.7] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* ── 9. Backdrop lens-blur halo (gravitational lensing illusion) ── */}
          <div style={{
            position:      'absolute',
            width:         80,
            height:        80,
            top:           -40,
            left:          -40,
            borderRadius:  '50%',
            backdropFilter:         'blur(2px) brightness(0.92)',
            WebkitBackdropFilter:   'blur(2px) brightness(0.92)',
            WebkitMask: 'radial-gradient(circle, black 0%, transparent 70%)',
            mask:       'radial-gradient(circle, black 0%, transparent 70%)',
          }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
