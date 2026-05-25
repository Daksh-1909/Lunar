import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Moon, Menu, X, Search, Heart, User, Compass } from "lucide-react";
import { useGallery } from "../../context/GalleryContext";
import { OrbitButton } from "../ui/OrbitButton";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { likedPhotoIds, setSearchQuery } = useGallery();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 44) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
    { name: "Collections", path: "/collections" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];
  return (
    <header
        className={`sub-nav-frosted ${
          scrolled ? "border-stardust/60 shadow-xl bg-cosmos/95" : "border-stardust/30"
        }`}
      >
        <div className="flex items-center gap-2">
          {/* Logo Crescent Moon */}
          <Link to="/" className="flex items-center gap-2 select-none group">
            <Moon className="w-5 h-5 text-eclipse rotate-[35deg] transition-transform duration-500 group-hover:rotate-[80deg]" />
            <span className="font-display text-2xl font-medium tracking-wide text-white bg-gradient-to-r from-moonbeam to-eclipse bg-clip-text text-transparent">
              Lunar
            </span>
          </Link>
        </div>

        {/* Navigation links - Center */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative font-ui text-[14px] font-medium tracking-wide transition-colors duration-200 py-1.5 ${
                isActive(link.path) ? "text-white" : "text-silver hover:text-white"
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-eclipse rounded-full animate-in fade-in zoom-in-50 duration-300" />
              )}
            </Link>
          ))}
        </nav>

        {/* Action Button - Right */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-4 text-silver">
            {/* Likes count indicator */}
            <Link to="/gallery" className="relative flex items-center hover:text-white transition-colors">
              <Heart className="w-[18px] h-[18px]" />
              {likedPhotoIds.size > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-supernova text-white font-mono text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  {likedPhotoIds.size}
                </span>
              )}
            </Link>
            <User className="w-[18px] h-[18px] hover:text-white transition-colors cursor-pointer" />
          </div>

          <OrbitButton
            color="blue"
            onClick={() => navigate("/gallery")}
            className="py-2.5 px-6 min-w-[120px]"
          >
            <Compass className="w-4 h-4" />
            Explore
          </OrbitButton>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center md:hidden gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-eclipse transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-[96px] z-30 bg-black/95 backdrop-blur-lg flex flex-col justify-between p-8 animate-in slide-in-from-top duration-300 md:hidden">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
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
    </header>
  );
};
export default Navbar;
