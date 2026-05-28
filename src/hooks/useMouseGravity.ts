import { useRef, useState, useCallback, useEffect } from 'react';

export interface GravityDisplacement {
  x: number;
  y: number;
  scale: number;
  proximity: number; // 0–1, 1 = right on the black hole
}

export interface GravityMouseState {
  x: number;       // raw mouse X in container
  y: number;       // raw mouse Y in container
  lerpX: number;   // lerped X (smooth)
  lerpY: number;   // lerped Y (smooth)
  isActive: boolean;
}

export interface UseMouseGravityOptions {
  /** How fast the lerped position chases the raw mouse (0–1). Default 0.1 */
  lerpSpeed?: number;
  /** Pixels radius within which elements feel gravity. Default 160 */
  gravityRadius?: number;
  /** Max pixel displacement applied to elements. Default 10 */
  maxForce?: number;
  /** Max scale multiplier at the closest point. Default 1.06 */
  maxScale?: number;
}

export interface UseMouseGravityReturn {
  mouseState: GravityMouseState;
  containerRef: React.RefObject<HTMLElement>;
  getDisplacement: (elCX: number, elCY: number) => GravityDisplacement;
  registerGravityCallback: (cb: () => void) => () => void;
}

export function useMouseGravity(
  options: UseMouseGravityOptions = {}
): UseMouseGravityReturn {
  const {
    lerpSpeed   = 0.10,
    gravityRadius = 160,
    maxForce    = 10,
    maxScale    = 1.06,
  } = options;

  const containerRef  = useRef<HTMLDivElement>(null);
  const rawRef        = useRef({ x: 0, y: 0 });
  const lerpRef       = useRef({ x: 0, y: 0 });
  const rafRef        = useRef<number | null>(null);
  const isActiveRef   = useRef(false);
  const callbacksRef  = useRef<Set<() => void>>(new Set());

  const [mouseState, setMouseState] = useState<GravityMouseState>({
    x: 0, y: 0, lerpX: 0, lerpY: 0, isActive: false,
  });

  // ── Single shared rAF loop ─────────────────────────────────────
  const tick = useCallback(() => {
    lerpRef.current.x += (rawRef.current.x - lerpRef.current.x) * lerpSpeed;
    lerpRef.current.y += (rawRef.current.y - lerpRef.current.y) * lerpSpeed;

    setMouseState({
      x:        rawRef.current.x,
      y:        rawRef.current.y,
      lerpX:    lerpRef.current.x,
      lerpY:    lerpRef.current.y,
      isActive: isActiveRef.current,
    });

    // Notify every registered GravityItem so they update their springs
    callbacksRef.current.forEach(cb => cb());

    rafRef.current = requestAnimationFrame(tick);
  }, [lerpSpeed]);

  // ── Event listeners ───────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      rawRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onEnter = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      rawRef.current  = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      lerpRef.current = { ...rawRef.current }; // snap lerp on first entry
      isActiveRef.current = true;
      setMouseState(prev => ({ ...prev, isActive: true }));
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      isActiveRef.current = false;
      setMouseState(prev => ({ ...prev, isActive: false }));
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      // Notify callbacks one last time so elements spring back to 0
      callbacksRef.current.forEach(cb => cb());
    };

    el.addEventListener('mousemove',  onMove,   { passive: true });
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove',  onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  // ── Displacement calculator (reads refs, stable reference) ────
  const getDisplacement = useCallback(
    (elCX: number, elCY: number): GravityDisplacement => {
      if (!isActiveRef.current) return { x: 0, y: 0, scale: 1, proximity: 0 };

      const dx   = lerpRef.current.x - elCX;
      const dy   = lerpRef.current.y - elCY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist === 0 || dist >= gravityRadius)
        return { x: 0, y: 0, scale: 1, proximity: 0 };

      const proximity = 1 - dist / gravityRadius;
      // Inverse-square-ish falloff gives a realistic gravitational feel
      const force     = proximity * proximity * maxForce;
      const scale     = 1 + proximity * (maxScale - 1);

      return {
        x:         (dx / dist) * force,
        y:         (dy / dist) * force,
        scale,
        proximity,
      };
    },
    [gravityRadius, maxForce, maxScale]
  );

  // ── Callback registry (one rAF loop → many items) ─────────────
  const registerGravityCallback = useCallback((cb: () => void) => {
    callbacksRef.current.add(cb);
    return () => { callbacksRef.current.delete(cb); };
  }, []);

  return { mouseState, containerRef: containerRef as React.RefObject<HTMLElement>, getDisplacement, registerGravityCallback };
}
