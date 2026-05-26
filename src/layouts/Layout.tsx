import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Lightbox } from "../components/ui/Lightbox";

const Layout: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") || 
        target.closest(".group") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("cursor-pointer");
        
      if (isInteractive) {
        cursor.classList.add("custom-cursor-hover");
        dot.classList.add("custom-cursor-dot-hover");
      } else {
        cursor.classList.remove("custom-cursor-hover");
        dot.classList.remove("custom-cursor-dot-hover");
      }
    };

    const handleMouseDown = () => {
      cursor.classList.add("custom-cursor-active");
    };

    const handleMouseUp = () => {
      cursor.classList.remove("custom-cursor-active");
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = "0";
      dot.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = "1";
      dot.style.opacity = "1";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    let animationId: number;
    const updateCursor = () => {
      // Smooth interpolation for the trailing outer ring (LERP coefficient: 0.15)
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      cursor.style.transform = `translate3d(calc(${currentX}px - 50%), calc(${currentY}px - 50%), 0)`;
      dot.style.transform = `translate3d(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%), 0)`;

      animationId = requestAnimationFrame(updateCursor);
    };

    animationId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-void text-moonbeam relative">
      {/* Premium SVG noise grain overlay */}
      <div className="grain-overlay" />

      {/* Custom celestial hover cursor - Outer trailing ring */}
      <div ref={cursorRef} className="custom-cursor" />
      
      {/* Custom celestial hover cursor - Inner precise dot */}
      <div ref={cursorDotRef} className="custom-cursor-dot" />

      {/* Navbar Pinned & Sticky */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer Pinned */}
      <Footer />

      {/* Lightbox Trigger Modal */}
      <Lightbox />
    </div>
  );
};

export default Layout;
