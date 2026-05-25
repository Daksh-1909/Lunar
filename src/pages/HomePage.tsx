import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight, ArrowLeft, Send } from "lucide-react";
import { StarField } from "../components/ui/StarField";
import { AnimatedCounter } from "../components/ui/AnimatedCounter";
import { photos, collections } from "../data/mockData";
import { useGallery } from "../context/GalleryContext";

export const HomePage: React.FC = () => {
  const { openLightbox } = useGallery();
  const filmstripRef = useRef<HTMLDivElement | null>(null);

  // Spotlight reveal refs
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const patternRef = useRef<SVGPatternElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const mousePos = useRef({ x: 0, y: 0 });
  const smoothMousePos = useRef({ x: 0, y: 0 });
  const gridOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");

    // Create offscreen canvas for Earth masking
    const offscreenCanvas = document.createElement("canvas");
    const offscreenCtx = offscreenCanvas.getContext("2d");

    // Preload Moon and Earth photographs
    const moonImg = new Image();
    moonImg.src = "/hero-bg.jpg";

    const earthImg = new Image();
    earthImg.src = "/hero-reveal.jpg";

    // Initialize cursor to the center of the screen
    mousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    smoothMousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    section.addEventListener("mousemove", handleMouseMove);

    const scrollPos = { y: window.scrollY };
    const smoothScroll = { y: window.scrollY };

    const handleScroll = () => {
      scrollPos.y = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // High-performance image cover calculation (matches CSS background-size: cover perfectly)
    const drawImageCover = (
      context: CanvasRenderingContext2D,
      img: HTMLImageElement,
      width: number,
      height: number,
      rotationAngle: number = 0
    ) => {
      if (!img.complete || img.naturalWidth === 0) return;

      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = width / height;

      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = width / imgRatio;
        offsetY = (height - drawHeight) / 2;
      } else {
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
      }

      if (rotationAngle !== 0) {
        context.save();
        context.translate(width / 2, height / 2);
        context.rotate(rotationAngle);
        context.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
        context.restore();
      } else {
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    // requestAnimationFrame Loop with smooth LERP and double-buffered canvas composition
    let animationFrameId: number;

    const updateAnimationFrame = () => {
      const rect = section.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        animationFrameId = requestAnimationFrame(updateAnimationFrame);
        return;
      }

      // Keep canvas resolution synced to viewport size instantly
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }

      const width = canvas.width;
      const height = canvas.height;

      // smooth += (target - smooth) * 0.1
      smoothMousePos.current.x += (mousePos.current.x - smoothMousePos.current.x) * 0.1;
      smoothMousePos.current.y += (mousePos.current.y - smoothMousePos.current.y) * 0.1;

      smoothScroll.y += (scrollPos.y - smoothScroll.y) * 0.1;
      const rotationAngle = smoothScroll.y * 0.0008;

      // normalized offsets
      const nx = (smoothMousePos.current.x / rect.width) - 0.5;
      const ny = (smoothMousePos.current.y / rect.height) - 0.5;

      // animate grid offset
      gridOffset.current.x += nx * 16;
      gridOffset.current.y += ny * 16;

      // Direct DOM manipulation of SVG pattern offset for maximum FPS performance
      if (patternRef.current) {
        patternRef.current.setAttribute("x", gridOffset.current.x.toString());
        patternRef.current.setAttribute("y", gridOffset.current.y.toString());
      }

      const cursorX = smoothMousePos.current.x;
      const cursorY = smoothMousePos.current.y;
      const radius = 260;

      // 1. Draw Earth on offscreen canvas and apply soft radial mask
      if (offscreenCtx) {
        offscreenCanvas.width = width;
        offscreenCanvas.height = height;

        // Draw Earth cover
        drawImageCover(offscreenCtx, earthImg, width, height, rotationAngle);

        // Mask it using radial gradient
        offscreenCtx.globalCompositeOperation = "destination-in";
        const gradient = offscreenCtx.createRadialGradient(
          cursorX,
          cursorY,
          0,
          cursorX,
          cursorY,
          radius
        );

        // specified stops
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(0.4, "rgba(255,255,255,1)");
        gradient.addColorStop(0.6, "rgba(255,255,255,0.75)");
        gradient.addColorStop(0.75, "rgba(255,255,255,0.4)");
        gradient.addColorStop(0.88, "rgba(255,255,255,0.12)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        offscreenCtx.fillStyle = gradient;
        offscreenCtx.fillRect(0, 0, width, height);
      }

      // 2. Draw final composite on master canvas
      if (ctx) {
        ctx.clearRect(0, 0, width, height);

        // Draw base Moon cover
        drawImageCover(ctx, moonImg, width, height, rotationAngle);

        // Overlay masked Earth layer
        ctx.drawImage(offscreenCanvas, 0, 0);
      }

      animationFrameId = requestAnimationFrame(updateAnimationFrame);
    };

    updateAnimationFrame();

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const categories = [
    {
      title: "Moon Phases",
      desc: "Witness the lunar cycle in all its magnificent glory.",
      count: "24",
      image: "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=600&auto=format&fit=crop&q=80",
      path: "/gallery?category=moon",
      badgeColor: "bg-eclipse text-black"
    },
    {
      title: "Eclipses",
      desc: "Total, partial, and annular solar alignments captured.",
      count: "12",
      image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=600&auto=format&fit=crop&q=80",
      path: "/gallery?category=eclipse",
      badgeColor: "bg-orange-500 text-white"
    },
    {
      title: "Nature Scenes",
      desc: "Earth's grand wilderness captured at dusk and dawn.",
      count: "16",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80",
      path: "/gallery?category=nature",
      badgeColor: "bg-twilight text-white"
    },
    {
      title: "Night Sky",
      desc: "Stars, distant nebulas, and the majestic Milky Way.",
      count: "8",
      image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=80",
      path: "/gallery?category=night-sky",
      badgeColor: "bg-blue-500 text-white"
    }
  ];

  const handleScrollLeft = () => {
    if (filmstripRef.current) {
      filmstripRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (filmstripRef.current) {
      filmstripRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col w-full relative overflow-x-hidden">
      {/* 1. HERO SECTION - 100vh Full Viewport */}
      <section 
        ref={sectionRef}
        className="relative w-full h-screen flex flex-col justify-between items-center text-center px-6 overflow-hidden bg-black"
      >
        {/* Main Interactive Canvas Backdrop */}
        <canvas
          ref={canvasRef}
          className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />

        {/* Grid Background */}
        <svg className="absolute inset-0 w-full h-full opacity-10 z-10 pointer-events-none">
          <defs>
            <pattern ref={patternRef} id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="#64748b"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Top/Bottom gradient overlays to protect nav/text contrast while keeping the center 100% clear and vivid */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none z-10" />

        {/* Performant drifting star background on top of canvas but behind content */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-70">
          <StarField />
        </div>

        {/* Space Spacer top */}
        <div className="h-[12vh] z-20 pointer-events-none" />

        {/* Centerpiece: Balanced empty spacer to perfectly frame the background photographic moon/earth */}
        <div className="h-[32vh] select-none pointer-events-none z-20" />

        {/* Headlines and CTAs */}
        <div className="max-w-4xl mx-auto z-10 flex flex-col items-center mt-6">
          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
            <Link to="/gallery" className="btn-primary group min-w-[170px] text-center shadow-lg shadow-primary/20">
              Explore Gallery
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/collections" className="btn-secondary min-w-[170px] text-center">
              View Collections
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mb-6 flex flex-col items-center gap-1.5 text-silver/50 z-10 animate-bounce">
          <span className="font-mono text-[10px] uppercase tracking-widest">
            SCROLL TO ENTER
          </span>
          <ChevronDown className="w-4 h-4 text-eclipse" />
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES SECTION - Void canvas */}
      <section className="w-full bg-void py-24 px-6 md:px-12 border-t border-stardust/40 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-eclipse">
              CURATED CHASSIS
            </span>
            <h2 className="text-4xl md:text-5xl font-display text-white mt-3 font-semibold display-tight">
              Discover Our Collections
            </h2>
            <div className="w-12 h-[1px] bg-stardust mx-auto mt-4" />
          </div>

          {/* 2x2 grid category layout - Apple Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                to={cat.path}
                className="group relative h-[360px] rounded-[18px] overflow-hidden border border-stardust/40 bg-cosmos flex flex-col justify-end p-8 transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl hover:shadow-black/60 cursor-pointer"
              >
                {/* Image underlay */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-[1.05] transition-transform duration-700 ease-out"
                />

                {/* Dark bottom gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Count Badge top-right */}
                <div className="absolute top-6 right-6 z-10">
                  <span className={`font-mono text-xs font-semibold px-3 py-1 rounded-full ${cat.badgeColor}`}>
                    {cat.count} Series
                  </span>
                </div>

                {/* Category Titles info */}
                <div className="relative z-10 translate-y-[10px] group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-3xl font-display font-medium text-white mb-2 leading-none">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-silver/80 font-ui leading-relaxed max-w-sm">
                    {cat.desc}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-eclipse mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>ENTER CHANNELS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STATS BAR SECTION - Cosmic luxury banner */}
      <section className="w-full bg-cosmos border-y border-stardust/40 py-16 px-6 md:px-12 z-10 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: 2400, suffix: "+", label: "Photos" },
            { value: 48, suffix: "", label: "Collections" },
            { value: 12, suffix: "", label: "Photographers" },
            { value: 190, suffix: "", label: "Countries Represented" }
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-1.5 p-4">
              <AnimatedCounter
                targetValue={stat.value}
                suffix={stat.suffix}
                className="text-4xl md:text-5xl font-semibold tracking-tight text-eclipse"
              />
              <span className="font-mono text-[10px] uppercase tracking-widest text-silver/60">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PHOTOS FILMSTRIP - Horizontal scroll */}
      <section className="w-full bg-void py-24 px-6 md:px-12 z-10 relative">
        <div className="max-w-7xl mx-auto flex items-end justify-between mb-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-eclipse">
              FILMSTRIP
            </span>
            <h2 className="text-3xl md:text-4xl font-display text-white mt-2 font-semibold display-tight">
              Featured Artworks
            </h2>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleScrollLeft}
              className="btn-icon-circular"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleScrollRight}
              className="btn-icon-circular"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filmstrip scrollable body */}
        <div
          ref={filmstripRef}
          className="flex gap-6 overflow-x-auto pb-8 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {photos.slice(0, 8).map((photo) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(photo.id)}
              className="flex-shrink-0 w-[300px] h-[400px] rounded-[18px] overflow-hidden bg-cosmos border border-stardust/40 relative group snap-start cursor-pointer hover:ring-1 hover:ring-eclipse/30 hover:shadow-lg hover:shadow-eclipse/10 active:scale-[0.98] transition-all duration-300"
            >
              <img
                src={photo.thumbnailSrc}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Bottom gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5" />

              {/* Title & Tag on Hover */}
              <div className="absolute inset-x-0 bottom-0 p-5 translate-y-[20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex flex-col">
                <h4 className="text-lg font-display font-medium text-white line-clamp-1 leading-snug">
                  {photo.title}
                </h4>
                <span className="text-[10px] font-mono text-eclipse mt-1">
                  {photo.category.replace("-", " ").toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. NEWSLETTER SECTION - Apple store utility card */}
      <section className="w-full bg-cosmos border-t border-stardust/40 py-24 px-6 md:px-12 z-10 relative">
        <div className="max-w-4xl mx-auto bg-void border border-stardust/40 rounded-[24px] p-8 md:p-16 text-center flex flex-col items-center relative overflow-hidden select-none">
          {/* subtle eclipse radial halo behind card */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-eclipse/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-aurora/5 rounded-full blur-3xl" />

          <span className="font-mono text-xs uppercase tracking-[0.25em] text-eclipse">
            CELESTIAL FEED
          </span>
          <h2 className="text-4xl md:text-5xl font-display text-white mt-3 font-semibold display-tight">
            Get Celestial Updates
          </h2>
          <p className="text-sm md:text-base text-silver/80 max-w-md mx-auto mt-4 leading-relaxed">
            Join 12,000+ cosmic sky gazers. Receive monthly astronomical alerts, full moon announcements, and limited print releases.
          </p>

          {/* Form inputs */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Subscribed! Thank you for joining our stargazing feed.");
            }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-lg mt-8"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="w-full h-11 bg-cosmos text-white font-ui border border-stardust/60 rounded-full px-5 focus:outline-none focus:border-eclipse focus:ring-1 focus:ring-eclipse/50 text-[14px] transition-all"
            />
            <button
              type="submit"
              className="btn-primary w-full sm:w-auto h-11 px-8 rounded-full shadow-lg shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
export default HomePage;
