import React, { useRef, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import { ParticleEngine, EngineStatus } from './ParticleEngine';
import { useScrollParticles } from './ScrollParticleProvider';
import { useParticleScroll } from './useParticleScroll';

interface ParticleWrapperProps {
  children: React.ReactNode;
  id: string;
  entryThreshold?: number;
  exitThreshold?: number;
}

export const ParticleWrapper: React.FC<ParticleWrapperProps> = ({
  children,
  id,
  entryThreshold = 0.25,
  exitThreshold = 0.12
}) => {
  const { settings, registerActiveInstance, unregisterActiveInstance } = useScrollParticles();
  
  // Custom hook to handle IntersectionObserver states
  const { elementRef, phase, setPhase } = useParticleScroll({
    id,
    entryThreshold,
    exitThreshold,
    enabled: settings.enabled
  });

  const contentRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cachedCanvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });
  const [padding, setPadding] = useState({ x: 150, y: 100 }); // overflow bounds for drifting

  const engineRef = useRef<ParticleEngine | null>(null);
  const isCapturing = useRef<boolean>(false);

  // Synchronize dynamic paddings based on element scale
  useEffect(() => {
    if (!elementRef.current) return;
    const updateSize = () => {
      const rect = elementRef.current?.getBoundingClientRect();
      if (rect) {
        const px = Math.min(250, Math.max(100, rect.width * 0.2));
        const py = Math.min(200, Math.max(80, rect.height * 0.15));
        setPadding({ x: px, y: py });
        setCanvasDimensions({
          width: rect.width + px * 2,
          height: rect.height + py * 2
        });
      }
    };

    updateSize();
    
    // Clear snapshot cache on window resize as visual boundaries change
    const handleResize = () => {
      cachedCanvasRef.current = null;
      updateSize();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [elementRef]);

  // Handle phase changes
  useEffect(() => {
    if (!settings.enabled || !canvasRef.current || !contentRef.current || canvasDimensions.width === 0) {
      return;
    }

    const canvas = canvasRef.current;
    const content = contentRef.current;
    
    // Create engine instance if not present
    if (!engineRef.current) {
      engineRef.current = new ParticleEngine(canvas, settings);
      
      // Register engine completion callback
      engineRef.current.onComplete((completeType: EngineStatus) => {
        if (completeType === 'dissolving') {
          setPhase('hidden');
        } else if (completeType === 'rebuilding') {
          setPhase('visible');
        }
        unregisterActiveInstance(id);
      });
    }

    const engine = engineRef.current;

    // Apply canvas standard attributes for razor-sharp rendering
    canvas.width = canvasDimensions.width;
    canvas.height = canvasDimensions.height;

    const triggerAnimation = (targetCanvas: HTMLCanvasElement) => {
      const rect = content.getBoundingClientRect();
      
      // Prepare engine particles
      engine.generateParticlesFromImage(
        targetCanvas,
        rect.width,
        rect.height,
        padding.x,
        padding.y
      );

      registerActiveInstance(id);

      if (phase === 'dissolving') {
        engine.dissolve();
      } else if (phase === 'rebuilding') {
        engine.rebuild();
      }
    };

    // Capture visual representation using html2canvas
    const captureAndAnimate = () => {
      if (cachedCanvasRef.current) {
        triggerAnimation(cachedCanvasRef.current);
        return;
      }

      if (isCapturing.current) return;
      isCapturing.current = true;

      // Temporarily ensure content is visible for canvas grab
      const prevOpacity = content.style.opacity;
      content.style.opacity = '1';

      html2canvas(content, {
        backgroundColor: null,
        logging: false,
        scale: window.devicePixelRatio || 1,
        useCORS: true
      })
        .then((capturedCanvas) => {
          content.style.opacity = prevOpacity;
          cachedCanvasRef.current = capturedCanvas;
          isCapturing.current = false;
          triggerAnimation(capturedCanvas);
        })
        .catch((err) => {
          console.error('[ParticleWrapper] html2canvas capture failed:', err);
          content.style.opacity = prevOpacity;
          isCapturing.current = false;
          // Fallback immediately to avoid getting stuck
          setPhase(phase === 'dissolving' ? 'hidden' : 'visible');
        });
    };

    if (phase === 'dissolving') {
      captureAndAnimate();
    } else if (phase === 'rebuilding') {
      captureAndAnimate();
    } else if (phase === 'visible' || phase === 'hidden') {
      engine.stop();
      unregisterActiveInstance(id);
    }

    return () => {
      // Cleanup running instances
      if (engineRef.current) {
        engineRef.current.stop();
      }
      unregisterActiveInstance(id);
    };
  }, [phase, canvasDimensions, padding, settings, id, registerActiveInstance, unregisterActiveInstance, setPhase]);

  // Determine visibility states for DOM content and canvas overlay
  const isContentVisible = phase === 'visible' || phase === 'hidden';
  const isCanvasVisible = phase === 'dissolving' || phase === 'rebuilding';

  return (
    <div
      ref={elementRef}
      className="relative w-full group/particle-wrapper"
    >
      {/* Content wrapper with smooth visual opacity flip */}
      <div
        ref={contentRef}
        style={{
          opacity: isContentVisible ? 1 : 0,
          transition: 'opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
          pointerEvents: isContentVisible ? 'auto' : 'none'
        }}
      >
        {children}
      </div>

      {/* Physics overlay canvas positioned with negative padding to drift off borders */}
      {isCanvasVisible && (
        <canvas
          ref={canvasRef}
          className="absolute pointer-events-none z-30"
          style={{
            top: -padding.y,
            left: -padding.x,
            width: canvasDimensions.width,
            height: canvasDimensions.height
          }}
        />
      )}
    </div>
  );
};
export default ParticleWrapper;
