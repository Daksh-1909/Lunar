import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, ArrowRight, Send } from "lucide-react";
import { StarField } from "../components/ui/StarField";
import { AnimatedCounter } from "../components/ui/AnimatedCounter";
import { photos, collections } from "../data/mockData";
import { useGallery } from "../context/GalleryContext";
import { OrbitButton } from "../components/ui/OrbitButton";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { FloatingTextReveal } from "../components/ui/FloatingTextReveal";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { openLightbox } = useGallery();

  // Spotlight reveal refs
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const patternRef = useRef<SVGPatternElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const mousePos = useRef({ x: 0, y: 0 });
  const smoothMousePos = useRef({ x: 0, y: 0 });
  const gridOffset = useRef({ x: 0, y: 0 });
  const gridSvgRef = useRef<SVGSVGElement | null>(null);

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
    moonImg.crossOrigin = "anonymous"; // Enable cross-origin for canvas compatibility
    moonImg.src = "https://res.cloudinary.com/di17osvrd/image/upload/v1780028792/normal_red_2K_202605290955_c5b0su.jpg";

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
    // Smooth scroll value for the moon pop effect (separate lerp target)
    const popScroll = { smooth: window.scrollY };

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

      // ── Moon pop: lerp scroll value at 0.08 for extra smoothness ──
      popScroll.smooth += (scrollPos.y - popScroll.smooth) * 0.08;
      const s = popScroll.smooth;
      const popProgress = Math.min(1, Math.max(0, (s - 30) / 110));  // 0→1 over 30–140px
      const popScale    = 1 + popProgress * 0.06;                     // 1.00→1.06
      const popBright   = 1 + popProgress * 0.12;                     // slight brighten

      // Directly mutate canvas styles — canvas stays in background (z-0) always
      const c = canvasRef.current;
      if (c) {
        c.style.transform = `scale(${popScale})`;
        c.style.filter    = `brightness(${popBright})`;
        // z-index stays at 0 — page sections with bg-colors sit on top naturally
      }

      // Grid SVG fades out as moon pops
      const gridSvg = gridSvgRef.current;
      if (gridSvg) {
        gridSvg.style.opacity = String(Math.max(0, 0.1 * (1 - popProgress)));
      }

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
      title: "Full Moon / Supermoon",
      desc: "Witness the lunar cycle and glorious supermoons in high detail.",
      count: "3 Series",
      image: "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=600&auto=format&fit=crop&q=80",
      path: "/gallery?category=full-moon",
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


  return (
    <div className="flex flex-col w-full relative overflow-x-hidden">
      {/* 1. HERO SECTION - 100vh Full Viewport */}
      <section 
        ref={sectionRef}
        className="relative w-full h-screen flex flex-col justify-between items-center text-center px-6 overflow-hidden bg-black"
      >
        {/* Main Interactive Canvas — styles driven by RAF loop, no re-renders */}
        <canvas
          ref={canvasRef}
          className="fixed inset-0 w-full h-full object-cover pointer-events-none"
          style={{ transformOrigin: "center center", willChange: "transform, opacity, filter" }}
        />

        {/* Grid Background — fades as moon pops (opacity driven by RAF loop) */}
        <svg
          ref={gridSvgRef}
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
          style={{ opacity: 0.1 }}
        >
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
          <div className="flex flex-col sm:flex-row items-center gap-2 mt-4">
            <OrbitButton
              color="blue"
              onClick={() => navigate("/gallery")}
              className="min-w-[170px]"
            >
              Explore Gallery
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </OrbitButton>
            <OrbitButton
              color="cyan"
              onClick={() => navigate("/collections")}
              className="min-w-[170px]"
            >
              View Collections
            </OrbitButton>
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

      {/* 2. GOAL SECTION - Observatory Manifesto */}
      <section className="w-full bg-void py-28 px-6 md:px-12 z-10 relative overflow-hidden border-t border-stardust/40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-silver/60">
                OBSERVATORY MANIFESTO
              </span>
              <FloatingTextReveal
                text="OUR MISSION & GOAL"
                className="text-5xl sm:text-7xl md:text-8xl font-display text-eclipse mt-4 font-semibold tracking-widest leading-tight"
              />
              <h2 className="text-2xl md:text-3xl font-display text-white mt-6 font-light italic opacity-90 leading-relaxed max-w-2xl mx-auto">
                Bridging Fine Art & Celestial Grandeur
              </h2>
              <div className="w-16 h-[1px] bg-accent mx-auto mt-8" />
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal delay={0.1} yOffset={40}>
              <div className="flex flex-col gap-6 text-left">
                <h3 className="text-2xl md:text-3xl font-display font-medium text-white leading-snug">
                  To archive and celebrate the universe's quiet alignments.
                </h3>
                <p className="text-base text-silver/80 font-ui leading-relaxed">
                  Lunar was founded as an independent digital sanctuary. Our goal is to capture the fleeting moments of astronomical alignment—where the moon, sun, and earth share a perfect path—and present them in raw, uncompromising visual clarity.
                </p>
                <p className="text-base text-silver/80 font-ui leading-relaxed">
                  We believe that witnessing the grandeur of eclipses, corona rays, and deep space nebulae invites a profound stillness. Each image is meticulously cataloged with environmental metadata, preserving both the aesthetic and scientific truth of the cosmos.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} yOffset={40}>
              <div className="relative p-8 rounded-2xl bg-cosmos border border-stardust/40 overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-eclipse/5 rounded-full blur-2xl group-hover:bg-eclipse/10 transition-all" />
                <h4 className="font-mono text-xs text-eclipse uppercase tracking-wider mb-4">THE LUNAR PROMISE</h4>
                <ul className="space-y-4">
                  {[
                    { title: "Archival Fidelity", desc: "No compression artifacts. Every canvas is rendered in original wide-gamut colors." },
                    { title: "Scientific Preservation", desc: "Includes precise ISO, focal length, phase angles, and geo-coordinates." },
                    { title: "Zero Ads or Clutter", desc: "A museum-first interface designed solely for reverent contemplation." }
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-4">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center font-mono text-[10px] text-accent font-semibold mt-0.5">
                        {idx + 1}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-display font-medium text-white text-base">{item.title}</span>
                        <span className="text-xs text-silver/70 leading-relaxed mt-0.5">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CATEGORIES SECTION - Void canvas */}
      <section className="w-full bg-void py-24 px-6 md:px-12 border-t border-stardust/40 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-eclipse">
                CURATED CHASSIS
              </span>
              <h2 className="text-4xl md:text-5xl font-display text-white mt-3 font-semibold display-tight">
                Discover Our Collections
              </h2>
              <div className="w-12 h-[1px] bg-stardust mx-auto mt-4" />
            </div>
          </ScrollReveal>

          {/* 2x2 grid category layout - Apple Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((cat, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1} yOffset={30}>
                <Link
                  to={cat.path}
                  className="group relative block h-[360px] rounded-[18px] overflow-hidden border border-stardust/40 bg-cosmos p-8 transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl hover:shadow-black/60 cursor-pointer"
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
                  <div className="absolute bottom-8 left-8 right-8 z-10 translate-y-[10px] group-hover:translate-y-0 transition-transform duration-300">
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
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STATS BAR SECTION - Cosmic luxury banner */}
      <section className="w-full bg-cosmos border-y border-stardust/40 py-16 px-6 md:px-12 z-10 relative">
        <ScrollReveal>
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
        </ScrollReveal>
      </section>

      {/* 5. FEATURES SECTION - Cosmic Capabilities */}
      <section className="w-full bg-void py-28 px-6 md:px-12 border-b border-stardust/40 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-eclipse">
                CELESTIAL CAPABILITIES
              </span>
              <h2 className="text-4xl md:text-5xl font-display text-white mt-4 font-semibold display-tight">
                Designed for Deep Contemplation
              </h2>
              <div className="w-16 h-[1px] bg-accent mx-auto mt-6" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="w-6 h-6 text-eclipse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="3" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" />
                    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
                title: "Gravity Engine",
                desc: "UI elements dynamically react to your cursor position, simulating astronomical gravity fields."
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-aurora" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 19V5l12-3v14M9 10H5M9 15H5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="6" cy="10" r="2" strokeWidth="1.5" />
                    <circle cx="6" cy="15" r="2" strokeWidth="1.5" />
                  </svg>
                ),
                title: "Astral Audio Player",
                desc: "Curated ambient soundscapes to deepen your visual journey while browsing cosmic horizons."
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: "Archival Catalog",
                desc: "High-resolution astrophotography series categorized and detailed with full exposure metrics."
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-supernova" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="1.5" />
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: "Fullscreen Lightbox",
                desc: "Examine every crater and star cluster up close using our responsive lightbox viewer."
              }
            ].map((feature, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1} yOffset={30}>
                <div className="h-full p-8 rounded-2xl bg-cosmos border border-stardust/40 flex flex-col items-start text-left relative overflow-hidden group hover:border-eclipse/40 transition-colors">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-full blur-xl group-hover:bg-accent/10 transition-all" />
                  <div className="p-3 rounded-xl bg-void border border-stardust/40 mb-6 shrink-0 shadow-inner">
                    {feature.icon}
                  </div>
                  <h3 className="font-display font-medium text-white text-xl mb-3">{feature.title}</h3>
                  <p className="text-sm text-silver/70 font-ui leading-relaxed">{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURED PHOTOS INFINITE MARQUEE */}
      <section className="w-full bg-void py-24 z-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
          <ScrollReveal>
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-eclipse">
                INFINITY FEED
              </span>
              <h2 className="text-3xl md:text-4xl font-display text-white mt-2 font-semibold display-tight">
                Featured Artworks
              </h2>
            </div>
          </ScrollReveal>
        </div>

        {/* Infinite Scroll Marquee Body */}
        <div className="relative w-full overflow-hidden py-4 select-none">
          {/* Subtle fade masks at left/right edges for a premium vignette look */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-void to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-void to-transparent z-20 pointer-events-none" />

          <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused] py-2 px-6">
            {[...photos.slice(0, 8), ...photos.slice(0, 8)].map((photo, idx) => (
              <div
                key={`${photo.id}-${idx}`}
                onClick={() => openLightbox(photo.id)}
                className="flex-shrink-0 w-[300px] h-[400px] rounded-[18px] overflow-hidden bg-cosmos border border-stardust/40 relative group cursor-pointer hover:ring-1 hover:ring-eclipse/30 hover:shadow-lg hover:shadow-eclipse/10 active:scale-[0.98] transition-all duration-300"
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
        </div>
      </section>

      {/* 7. NEWSLETTER SECTION - Apple store utility card */}
      <section className="w-full bg-cosmos border-t border-stardust/40 py-24 px-6 md:px-12 z-10 relative">
        <ScrollReveal>
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
        </ScrollReveal>
      </section>
    </div>
  );
};
export default HomePage;
