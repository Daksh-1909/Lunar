import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Moon, ArrowUpRight, Compass, ShieldCheck, HelpCircle, Award } from "lucide-react";
import { photographers } from "../data/mockData";

export const AboutPage: React.FC = () => {
  const milestones = [
    {
      year: "2023",
      title: "First Eclipse Expedition",
      desc: "Four telescopes, two astrophotographers, and one perfect sky in Western Australia capturing the rare hybrid solar alignment."
    },
    {
      year: "2024",
      title: "Great American Totality",
      desc: "Expanded team tracking the eclipse path from Texas to Maine, generating over 5,000 extreme-resolution RAW canvases."
    },
    {
      year: "2025",
      title: "Launch of Lunar",
      desc: "Inception of our dark digital museum to catalog these rare visual alignment milestones for students and collectors worldwide."
    },
    {
      year: "2026",
      title: "Fine Art Printing & AR",
      desc: "Partnering with premium archival laboratories to introduce silver halide physical prints and immersive cosmic view apps."
    }
  ];

  return (
    <div className="w-full bg-transparent min-h-screen pb-24 overflow-hidden relative">
      {/* 1. HERO BANNER */}
      <section className="relative w-full py-24 md:py-36 px-6 md:px-12 flex flex-col items-center justify-center text-center overflow-hidden border-b border-stardust/40">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-repeat bg-[size:16px_16px]">
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <circle cx="2" cy="2" r="0.5" fill="#ffffff" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto z-10 flex flex-col items-center select-none">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-eclipse">
            THE MANIFESTO
          </span>
          
          <h1 className="text-5xl md:text-7xl font-display font-semibold tracking-wide text-white mt-4 display-tight">
            Our Mission
          </h1>
          
          <div className="w-12 h-[1.5px] bg-eclipse mx-auto mt-4" />

          <p className="text-2xl md:text-3xl font-display font-light italic text-silver/90 max-w-3xl mx-auto mt-8 leading-relaxed">
            "Lunar exists to celebrate the impossible beauty of our natural world — from the craters of the moon to the canopy of ancient forests."
          </p>
        </div>
      </section>

      {/* 2. THREE PHOTOGRAPHERS PROFILES */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16 select-none">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-eclipse">
            MEET THE ARTISTS
          </span>
          <h2 className="text-4xl font-display text-white mt-3 font-semibold display-tight">
            Behind the Lenses
          </h2>
          <div className="w-12 h-[1px] bg-stardust mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {photographers.map((p) => (
            <div
              key={p.id}
              className="group bg-cosmos/40 backdrop-blur-sm border border-stardust/40 rounded-[24px] p-6 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02] hover:ring-1 hover:ring-eclipse/20 select-none"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-eclipse/40 mb-5 relative">
                <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
              </div>

              <h3 className="text-xl font-display font-medium text-white group-hover:text-eclipse transition-colors">
                {p.name}
              </h3>
              
              <span className="font-mono text-[9px] uppercase tracking-widest text-silver/50 mt-1">
                {p.location}
              </span>

              <p className="text-xs text-silver/70 font-ui leading-relaxed mt-4 flex-grow line-clamp-4">
                {p.bio}
              </p>

              <div className="mt-6 pt-4 border-t border-stardust/20 w-full flex items-center justify-center gap-4 text-xs font-mono">
                <a
                  href={`https://instagram.com/${p.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-silver hover:text-white flex items-center gap-0.5 transition-colors"
                >
                  <span>IG</span>
                  <ArrowUpRight className="w-2.5 h-2.5" />
                </a>
                <span className="text-silver/20">•</span>
                <span className="text-primary-on-dark hover:text-white cursor-pointer transition-colors">
                  Portfolio
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TIMELINE SECTION */}
      <section className="w-full bg-cosmos/40 backdrop-blur-sm border-y border-stardust/40 py-24 px-6 md:px-12 relative overflow-hidden select-none">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-eclipse">
              CHRONOLOGY
            </span>
            <h2 className="text-4xl font-display text-white mt-3 font-semibold display-tight">
              Timeline of Milestones
            </h2>
          </div>

          <div className="relative border-l border-stardust/60 pl-6 md:pl-10 space-y-12 max-w-3xl mx-auto">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1 w-4 h-4 rounded-full bg-void border border-eclipse flex items-center justify-center group-hover:bg-eclipse transition-colors duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-eclipse group-hover:bg-void" />
                </div>

                <span className="font-mono text-sm font-semibold text-eclipse">
                  {milestone.year}
                </span>
                
                <h3 className="text-xl font-display font-medium text-white mt-1.5">
                  {milestone.title}
                </h3>
                
                <p className="text-sm text-silver/80 font-ui leading-relaxed mt-2">
                  {milestone.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PARTNER/SPONSOR LOGOS ROW */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 select-none opacity-40 hover:opacity-60 transition-opacity duration-300">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center text-center justify-items-center">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-white" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-white">HASSELBLAD ACADEMY</span>
          </div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-white" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-white">NATIONAL OBSERVATORY</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-white" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-white">FINE ART PRINT ASSOC</span>
          </div>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-white" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-white">ASTRONOMY MONTHLY</span>
          </div>
        </div>
      </section>
    </div>
  );
};
export default AboutPage;
