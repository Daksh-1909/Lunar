import React from "react";
import { Link } from "react-router-dom";
import { Moon, Instagram, Twitter, Compass, Youtube } from "lucide-react";
import { collections } from "../../data/mockData";

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-void border-t border-stardust/40 text-silver/80 pt-16 pb-8 overflow-hidden z-10 select-none">
      {/* Subtle star pattern background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none -z-10 bg-repeat bg-[size:20px_20px]">
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
          <circle cx="2" cy="2" r="0.5" fill="#ffffff" />
          <circle cx="12" cy="14" r="0.8" fill="#ffffff" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 pb-16">
        {/* Col 1: Logo & Tagline */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 select-none">
            <Moon className="w-5 h-5 text-eclipse rotate-45" />
            <span className="font-display text-2xl font-medium tracking-wide text-white">
              Lunar
            </span>
          </div>
          <p className="font-display text-lg italic text-silver/60 mt-2">
            "Where the Sky Meets the Soul."
          </p>
          <p className="text-xs text-silver/40 font-ui leading-relaxed mt-1">
            An atmospheric, photography-first gallery celebrating moon phases, eclipses, and the grand mysteries of our night sky.
          </p>
        </div>

        {/* Col 2: Navigation Links (2.41 line-height columns) */}
        <div>
          <h4 className="text-sm font-semibold text-white font-ui uppercase tracking-wider mb-5">
            Navigation
          </h4>
          <ul className="flex flex-col text-[14px]" style={{ lineHeight: "2.41" }}>
            <li>
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link>
            </li>
            <li>
              <Link to="/collections" className="hover:text-white transition-colors">Collections</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition-colors">About Mission</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition-colors">Contact Panel</Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Curated Collections Series */}
        <div>
          <h4 className="text-sm font-semibold text-white font-ui uppercase tracking-wider mb-5">
            Series
          </h4>
          <ul className="flex flex-col text-[14px]" style={{ lineHeight: "2.41" }}>
            {collections.slice(0, 5).map((col) => (
              <li key={col.id}>
                <Link to={`/collections/${col.slug}`} className="hover:text-white transition-colors truncate block max-w-full">
                  {col.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Socials & Newsletter proof */}
        <div className="flex flex-col gap-5">
          <h4 className="text-sm font-semibold text-white font-ui uppercase tracking-wider">
            Astronomy Feed
          </h4>
          <p className="text-xs leading-relaxed text-silver/50">
            Join 12,000+ space enthusiasts receiving our weekly celestial updates, lunar cycles, and galactic prints releases.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-silver hover:text-white transition-all hover:border-eclipse/50 active:scale-90">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-silver hover:text-white transition-all hover:border-eclipse/50 active:scale-90">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-silver hover:text-white transition-all hover:border-eclipse/50 active:scale-90">
              <Compass className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-silver hover:text-white transition-all hover:border-eclipse/50 active:scale-90">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-stardust/20 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] text-silver/40">
        <div>
          © 2026 Lunar. Built with ♥ for the universe.
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-silver/60 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-silver/60 cursor-pointer">Terms of Use</span>
          <span className="hover:text-silver/60 cursor-pointer">Licensing</span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
