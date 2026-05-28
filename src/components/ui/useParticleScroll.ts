import { useEffect, useRef, useState } from 'react';

export interface UseParticleScrollProps {
  id: string;
  entryThreshold?: number;
  exitThreshold?: number;
  enabled?: boolean;
}

export const useParticleScroll = ({
  id,
  entryThreshold = 0.25,
  exitThreshold = 0.12,
  enabled = true
}: UseParticleScrollProps) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [phase, setPhase] = useState<'hidden' | 'dissolving' | 'rebuilding' | 'visible'>('visible');
  
  // Track visibility states
  const hasBeenVisible = useRef<boolean>(false);
  const prevRatio = useRef<number>(0);

  useEffect(() => {
    if (!enabled || !elementRef.current) {
      setPhase('visible');
      return;
    }

    const element = elementRef.current;

    // Use double thresholds for robust scroll up/down entry-exit trigger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;
          const isIntersecting = entry.isIntersecting;

          // Determine if we are scrolling in or scrolling out
          const isEntering = ratio > prevRatio.current;
          
          if (isIntersecting) {
            // Scrolling INTO Viewport
            if (ratio >= entryThreshold && isEntering && phase !== 'visible' && phase !== 'rebuilding') {
              setPhase('rebuilding');
              hasBeenVisible.current = true;
            } 
            // Scrolling OUT OF Viewport
            else if (ratio <= exitThreshold && !isEntering && hasBeenVisible.current && phase === 'visible') {
              setPhase('dissolving');
            }
          } else {
            // Completely off-screen
            if (hasBeenVisible.current && phase === 'visible') {
              setPhase('dissolving');
            } else if (!hasBeenVisible.current) {
              // Hide initially if off-screen to allow particle rebuild upon scroll entry
              setPhase('hidden');
            }
          }

          prevRatio.current = ratio;
        });
      },
      {
        threshold: [0, exitThreshold, entryThreshold, 0.5, 0.8],
        rootMargin: '0px 0px -5% 0px' // offset bottom slightly to trigger before hitting the raw fold
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [enabled, entryThreshold, exitThreshold, phase]);

  return {
    elementRef,
    phase,
    setPhase
  };
};
export default useParticleScroll;
