import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { useGallery } from "../context/GalleryContext";

export const CollectionsPage: React.FC = () => {
  const { collections } = useGallery();
  const [activeSlide, setActiveSlide] = useState(0);

  // Rotating background images slideshow every 5s
  const slideshowCovers = [
    "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=1600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1483168527879-c66136b56105?w=1600&auto=format&fit=crop&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideshowCovers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slideshowCovers.length]);

  return (
    <div className="w-full bg-transparent min-h-screen pb-24 overflow-hidden">
      {/* 1. HERO BANNER - Slideshow Carousel */}
      <section className="relative w-full h-[50vh] min-h-[360px] flex items-center justify-center text-center px-6 overflow-hidden select-none">
        
        {/* Slideshow underlay with transitions */}
        {slideshowCovers.map((src, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out -z-10 ${
              idx === activeSlide ? "opacity-45" : "opacity-0"
            }`}
          >
            <img
              src={src}
              alt="slide cover"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[5000ms]"
            />
          </div>
        ))}

        {/* Ambient Dark layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-void/50 to-void -z-10" />

        {/* Hero content */}
        <div className="max-w-3xl mx-auto z-10 animate-in fade-in zoom-in-95 duration-500">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-eclipse">
            MUSEUM ARCHIVES
          </span>
          <h1 className="text-5xl md:text-6xl font-display font-semibold tracking-wide text-white mt-3 display-tight">
            Curated Collections
          </h1>
          <div className="w-12 h-[1.5px] bg-eclipse mx-auto mt-4" />
          <p className="text-sm md:text-base text-silver/80 font-ui max-w-lg mx-auto mt-4 leading-relaxed body-apple">
            Handpicked astronomical and terrestrial series capturing deep space dynamics, atmospheric forces, and silent forest floors.
          </p>
        </div>
      </section>

      {/* 2. COLLECTIONS DECK - 3 Column Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((col) => (
            <Link
              key={col.id}
              to={`/collections/${col.slug}`}
              className="group flex flex-col bg-cosmos/40 backdrop-blur-sm border border-stardust/40 rounded-[24px] overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/70 hover:ring-1 hover:ring-eclipse/20 active:scale-[0.98]"
            >
              {/* Cover Aspect Ratio 16:9 */}
              <div className="w-full aspect-[16/10] overflow-hidden relative border-b border-stardust/40">
                <img
                  src={col.coverImage}
                  alt={col.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Count badge */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-mono text-white flex items-center gap-1.5 border border-white/10">
                  <BookOpen className="w-3 h-3 text-eclipse" />
                  <span>{col.photoIds.length} Captures</span>
                </div>
              </div>

              {/* Card info */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-display font-medium text-white mb-3 group-hover:text-eclipse transition-colors leading-snug">
                    {col.title}
                  </h3>
                  <p className="text-[13px] text-silver/70 font-ui leading-relaxed line-clamp-3">
                    {col.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stardust/20 flex flex-col gap-3">
                  {/* Tag capsules */}
                  <div className="flex flex-wrap gap-1.5">
                    {col.tags.slice(0, 3).map((tag, tIdx) => (
                      <span key={tIdx} className="text-[9px] font-mono uppercase bg-white/5 text-silver/60 border border-white/5 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA link */}
                  <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-primary-on-dark mt-2 select-none">
                    <span>VIEW PORTFOLIO</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
export default CollectionsPage;
