import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Heart, User, Compass } from "lucide-react";
import { useGallery } from "../../context/GalleryContext";
import { OrbitButton } from "../ui/OrbitButton";
import { useMouseGravity } from "../../hooks/useMouseGravity";
import { BlackHoleEffect } from "../ui/BlackHoleEffect";
import { GravityItem } from "../ui/GravityItem";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen]   = useState(false);
  const navigate               = useNavigate();
  const location               = useLocation();
  const { likedPhotoIds }      = useGallery();

  // ── Black-hole gravity system ────────────────────────────────
  const { mouseState, containerRef, getDisplacement, registerGravityCallback } =
    useMouseGravity({
      gravityRadius: 160,  // px — how far elements start feeling the pull
      maxForce:      10,   // px — max positional displacement
      lerpSpeed:     0.10, // smoothness of the black hole following cursor
      maxScale:      1.05, // max scale of elements near the event horizon
    });

  // ── Scroll state (for future scroll-responsive styling) ──────
  useEffect(() => {
    const onScroll = () => {};
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const isHome   = location.pathname === "/";

  const navLinks = [
    { name: "Home",                                     path: "/"            },
    { name: isHome ? "Gallery"     : "Space Sanctuary", path: "/gallery"     },
    { name: isHome ? "Collections" : "Space Journeys",  path: "/collections" },
    { name: isHome ? "About"       : "Cosmic Vision",   path: "/about"       },
    { name: isHome ? "Contact"     : "Transmit Signal", path: "/contact"     },
  ];

  // ── Shared GravityItem props (avoids repetition) ─────────────
  const gravityProps = {
    containerRef:     containerRef as React.RefObject<HTMLElement>,
    getDisplacement,
    registerCallback: registerGravityCallback,
  };

  return (
    <>
      <header className="sub-nav-frosted">

        {/* ── Floating Island Pill ─────────────────────────────── */}
        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="sub-nav-island"
          style={{ position: "relative" }}
        >

          {/* ── Black Hole — rendered below all content (z-20) ── */}
          <BlackHoleEffect
            x={mouseState.x}
            y={mouseState.y}
            isActive={mouseState.isActive}
          />

          {/* ══ LOGO ════════════════════════════════════════════ */}
          <GravityItem {...gravityProps}>
            <Link
              to="/"
              className="relative z-30 flex items-center gap-2.5 select-none group"
            >
              <img
                src="/logo.png"
                alt="Lunar Logo"
                className="w-6 h-6 object-contain transition-transform duration-500 group-hover:scale-110"
              />
              <span className="font-display text-2xl font-medium tracking-wide bg-gradient-to-r from-moonbeam to-eclipse bg-clip-text text-transparent">
                Lunar
              </span>
            </Link>
          </GravityItem>

          {/* ══ NAV LINKS ════════════════════════════════════════ */}
          <nav className="relative z-30 hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <GravityItem key={link.name} {...gravityProps}>
                <Link
                  to={link.path}
                  className={`relative font-ui text-[14px] font-medium tracking-wide transition-colors duration-200 py-1.5 ${
                    isActive(link.path)
                      ? "text-white"
                      : "text-silver hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-eclipse rounded-full animate-in fade-in zoom-in-50 duration-300" />
                  )}
                </Link>
              </GravityItem>
            ))}
          </nav>

          {/* ══ RIGHT ACTIONS ════════════════════════════════════ */}
          <div className="relative z-30 hidden md:flex items-center gap-5">

            {/* Icon cluster */}
            <GravityItem {...gravityProps}>
              <div className="flex items-center gap-4 text-silver">
                <Link
                  to="/gallery"
                  className="relative flex items-center hover:text-white transition-colors"
                >
                  <Heart className="w-[18px] h-[18px]" />
                  {likedPhotoIds.size > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-supernova text-white font-mono text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center">
                      {likedPhotoIds.size}
                    </span>
                  )}
                </Link>
                <User className="w-[18px] h-[18px] hover:text-white transition-colors cursor-pointer" />
              </div>
            </GravityItem>

            {/* Explore CTA */}
            {!isActive("/gallery") && (
              <GravityItem {...gravityProps}>
                <OrbitButton
                  color="blue"
                  onClick={() => navigate("/gallery")}
                  className="py-2 px-5 min-w-[110px] text-[13px]"
                >
                  <Compass className="w-4 h-4" />
                  Explore
                </OrbitButton>
              </GravityItem>
            )}
          </div>

          {/* ══ MOBILE HAMBURGER ═════════════════════════════════ */}
          <div className="relative z-30 flex items-center md:hidden gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-eclipse transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* ── Mobile Drawer ─────────────────────────────────────── */}
      {isOpen && (
        <div className="fixed inset-0 top-[72px] z-30 bg-black/95 backdrop-blur-lg flex flex-col justify-between p-8 animate-in slide-in-from-top duration-300 md:hidden">
          <div className="flex flex-col gap-6">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`font-display text-3xl font-medium tracking-wide border-b border-stardust/40 pb-3 transition-colors ${
                  isActive(link.path) ? "text-eclipse" : "text-moonbeam"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="w-full">
            <Link
              to="/gallery"
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full py-4 text-center justify-center text-lg rounded-xl"
            >
              Explore Gallery
            </Link>
            <p className="text-center text-xs text-silver/40 font-mono mt-4">
              LUNAR PHOTOGRAPHY © 2026
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
