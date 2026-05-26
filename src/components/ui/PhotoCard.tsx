import React from "react";
import { Heart, Maximize2 } from "lucide-react";
import { Photo } from "../../types";

interface PhotoCardProps {
  photo: Photo;
  isLiked: boolean;
  onLike: (id: string) => void;
  onClick: (id: string) => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  isLiked,
  onLike,
  onClick
}) => {
  const { id, title, thumbnailSrc, category, photographer, likes, aiGenerated } = photo;

  // Category specific styles/colors matching the design spec
  const categoryPills: Record<string, string> = {
    "red-moon": "bg-red-500/10 text-red-400 border-red-500/20",
    "full-moon": "bg-eclipse/10 text-eclipse border-eclipse/20",
    eclipse: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    nature: "bg-twilight/10 text-violet-400 border-twilight/20",
    "night-sky": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    auroras: "bg-aurora/10 text-aurora border-aurora/20",
    "sunrise-sunset": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    storms: "bg-supernova/10 text-supernova border-supernova/20",
    forests: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    oceans: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    mountains: "bg-neutral-500/10 text-neutral-400 border-neutral-500/20"
  };

  const getCategoryLabel = (cat: string) => {
    return cat.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike(id);
  };

  return (
    <div
      onClick={() => onClick(id)}
      className="group relative rounded-[18px] overflow-hidden bg-cosmos border border-stardust/40 cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:ring-1 hover:ring-eclipse/30 hover:shadow-lg hover:shadow-eclipse/10 active:scale-[0.98] select-none"
    >
      {/* Photo Render */}
      <img
        src={thumbnailSrc}
        alt={title}
        loading="lazy"
        className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Static category pill top-left */}
      <div className="absolute top-4 left-4 z-20">
        <span className={`text-[11px] font-ui font-semibold tracking-wide px-2.5 py-1 rounded-full border ${categoryPills[category] || "border-white/10 bg-white/5 text-white"}`}>
          {getCategoryLabel(category)}
        </span>
      </div>

      {/* AI Generated badge - top right */}
      {aiGenerated && (
        <div className="absolute top-4 right-4 z-20">
          <span className="text-[10px] font-mono font-semibold tracking-wider px-2 py-0.5 rounded-full border border-violet-400/40 bg-violet-500/10 text-violet-300 flex items-center gap-1">
            <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/></svg>
            AI
          </span>
        </div>
      )}

      {/* Dark gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 z-10" />

      {/* Hover information panel sliding up */}
      <div className="absolute inset-x-0 bottom-0 p-5 z-20 translate-y-[20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-xl font-display font-medium text-white line-clamp-1 leading-snug">
              {title}
            </h4>
            <div className="flex items-center gap-2 mt-1.5">
              <img
                src={photographer.avatar}
                alt={photographer.name}
                className="w-5 h-5 rounded-full object-cover border border-white/20"
              />
              <span className="text-xs text-silver font-ui">
                {photographer.name}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5">
            {/* View Fullscreen Icon */}
            <div className="w-[34px] h-[34px] bg-white/10 rounded-full flex items-center justify-center text-silver hover:text-white transition-colors">
              <Maximize2 className="w-4 h-4" />
            </div>
            
            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`w-[34px] h-[34px] rounded-full flex items-center justify-center border transition-all duration-200 ${
                isLiked
                  ? "bg-supernova border-supernova text-white scale-110"
                  : "bg-white/10 border-white/10 text-silver hover:text-white"
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-white" : ""}`} />
            </button>
          </div>
        </div>

        {/* Displays like count on hover */}
        <div className="text-[11px] text-silver font-mono flex items-center gap-1">
          <span>{isLiked ? likes + 1 : likes}</span>
          <span className="text-silver/60">likes</span>
        </div>
      </div>

      {/* Simple mobile indicator if hover is absent */}
      <div className="absolute bottom-3 right-3 group-hover:opacity-0 transition-opacity duration-200 md:hidden z-10">
        <div className="bg-black/60 backdrop-blur-sm rounded-full p-2 text-white">
          <Maximize2 className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
