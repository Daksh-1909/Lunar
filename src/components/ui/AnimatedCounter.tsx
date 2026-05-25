import React, { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  targetValue: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  targetValue,
  duration = 1500,
  suffix = "",
  className = ""
}) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing curve (ease-out quad)
      const easeProgress = progress * (2 - progress);
      const currentValue = Math.floor(easeProgress * targetValue);
      
      setCount(currentValue);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(targetValue);
      }
    };

    window.requestAnimationFrame(step);
  }, [hasStarted, targetValue, duration]);

  // Format numbers nicely with commas if large
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <span ref={elementRef} className={`font-display tabular-nums ${className}`}>
      {formatNumber(count)}
      {suffix}
    </span>
  );
};
