import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Moon, Compass, ShieldCheck, HelpCircle, Award } from "lucide-react";
import { SpaceBackground } from "../components/ui/SpaceBackground";

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
      <SpaceBackground />
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
