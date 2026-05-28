import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Moon, Instagram, Linkedin, Github } from "lucide-react";

export const Footer: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const percent = Math.min(100, Math.round((window.scrollY / scrollHeight) * 100));
        setScrollPercent(percent);
      } else {
        setScrollPercent(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  return (
    <footer className="relative bg-void border-t border-stardust/40 text-silver/80 pt-16 pb-8 overflow-hidden z-10 select-none">
      {/* Subtle star pattern background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none -z-10 bg-repeat bg-[size:20px_20px]">
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
          <circle cx="2" cy="2" r="0.5" fill="#ffffff" />
          <circle cx="12" cy="14" r="0.8" fill="#ffffff" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
        {/* Col 1: Logo, Description & Socials */}
        <div className="md:col-span-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 select-none">
            <span className="w-8 h-8 rounded-lg bg-eclipse/10 border border-eclipse/20 flex items-center justify-center">
              <Moon className="w-4 h-4 text-eclipse rotate-45" />
            </span>
            <span className="font-display text-2xl font-medium tracking-wide text-white">
              Lunar
            </span>
          </div>
          <p className="text-sm text-silver/60 font-ui leading-relaxed max-w-md mt-2">
            An atmospheric, photography-first gallery celebrating moon phases, eclipses, and the grand mysteries of our night sky. Built with meticulous precision and premium interactive mechanics.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-[10px] bg-white/5 border border-white/10 flex items-center justify-center text-silver hover:text-white transition-all hover:border-eclipse/50 active:scale-95"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/daksh-patel-7a57b222a/"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-[10px] bg-white/5 border border-white/10 flex items-center justify-center text-silver hover:text-white transition-all hover:border-eclipse/50 active:scale-95"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/daksh_patel199/"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-[10px] bg-white/5 border border-white/10 flex items-center justify-center text-silver hover:text-white transition-all hover:border-eclipse/50 active:scale-95"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Navigate links */}
        <div className="md:col-span-3">
          <h4 className="text-xs font-semibold text-silver/40 font-mono uppercase tracking-[0.2em] mb-6">
            Navigate
          </h4>
          <ul className="flex flex-col gap-3.5 text-[14px]">
            <li>
              <Link to="/" className="text-silver/70 hover:text-white transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/gallery" className="text-silver/70 hover:text-white transition-colors">Gallery</Link>
            </li>
            <li>
              <Link to="/collections" className="text-silver/70 hover:text-white transition-colors">Collections</Link>
            </li>
            <li>
              <Link to="/about" className="text-silver/70 hover:text-white transition-colors">About Mission</Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Resources & System Status */}
        <div className="md:col-span-3 flex flex-col gap-6">
          <div>
            <h4 className="text-xs font-semibold text-silver/40 font-mono uppercase tracking-[0.2em] mb-6">
              Resources
            </h4>
            <ul className="flex flex-col gap-3.5 text-[14px]">
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="text-silver/70 hover:text-white transition-colors">GitHub Repo</a>
              </li>
              <li>
                <Link to="/contact" className="text-silver/70 hover:text-white transition-colors">Report a Bug</Link>
              </li>
              <li>
                <a href="https://daksh-patel.vercel.app/" target="_blank" rel="noreferrer" className="text-silver/70 hover:text-white transition-colors">Author Portfolio</a>
              </li>
            </ul>
          </div>

          <div className="flex items-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00e5a0]/10 border border-[#00e5a0]/20 text-[#00e5a0] text-xs font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-pulse" />
              ALL SYSTEMS LIVE
            </span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-stardust/20 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-[11px] text-silver/40">
        <div>
          © 2026 LUNAR — Built for stargazers.
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <img src="/moon-icon.png" alt="Moon Icon" className="w-6 h-6 object-contain" />
            <span className="uppercase tracking-wider text-[10px] text-silver/50 font-normal">MADE WITH LOVE BY</span>
            <a
              href="https://daksh-patel.dakshp860.workers.dev/"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-eclipse transition-colors font-bold uppercase tracking-wider text-[11px]"
            >
              Daksh Patel
            </a>
          </div>

          {/* Radial Scroll Progress / Scroll-to-Top Button */}
          <button
            onClick={scrollToTop}
            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:scale-105 active:scale-95 transition-transform cursor-pointer focus:outline-none"
            title="Scroll to Top"
          >
            <svg className="w-10 h-10 transform -rotate-90">
              <circle
                cx="20"
                cy="20"
                r={radius}
                className="stroke-stardust/20 fill-transparent"
                strokeWidth="2"
              />
              <circle
                cx="20"
                cy="20"
                r={radius}
                className="stroke-[#00e5a0] fill-transparent transition-all duration-100"
                strokeWidth="2"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-[8px] font-mono font-bold text-white">
              {scrollPercent}%
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
