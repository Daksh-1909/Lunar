import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Heart, Share2, Download, Info } from "lucide-react";
import { useGallery } from "../../context/GalleryContext";

export const Lightbox: React.FC = () => {
  const {
    lightboxPhoto,
    isLightboxOpen,
    closeLightbox,
    nextLightboxPhoto,
    prevLightboxPhoto,
    likedPhotoIds,
    likePhoto
  } = useGallery();

  // Handle keyboard listener
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextLightboxPhoto();
      if (e.key === "ArrowLeft") prevLightboxPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock scroll
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isLightboxOpen, closeLightbox, nextLightboxPhoto, prevLightboxPhoto]);

  if (!isLightboxOpen || !lightboxPhoto) return null;

  const isLiked = likedPhotoIds.has(lightboxPhoto.id);

  const handleDownload = () => {
    // Open in new tab or trigger direct download
    window.open(lightboxPhoto.src, "_blank");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: lightboxPhoto.title,
        text: `Check out this breathtaking photography on Lunar: ${lightboxPhoto.title}`,
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback: Copy link to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Gallery photo link copied to clipboard!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 transition-opacity duration-300 animate-in fade-in">
      {/* Top action bar */}
      <div className="w-full flex items-center justify-between p-6 z-10">
        {/* Left corner: Photo Category + AI Badge */}
        <div className="flex items-center gap-3">
          <div className="text-xs font-mono uppercase tracking-widest text-silver">
            {lightboxPhoto.category.replace("-", " ")}
          </div>
          {lightboxPhoto.aiGenerated && (
            <span className="text-[10px] font-mono font-semibold tracking-wider px-2.5 py-1 rounded-full border border-violet-400/40 bg-violet-500/10 text-violet-300 flex items-center gap-1.5">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/></svg>
              AI Generated
            </span>
          )}
        </div>

        {/* Right corner: Actions */}
        <div className="flex items-center gap-3">
          {/* Like */}
          <button
            onClick={() => likePhoto(lightboxPhoto.id)}
            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 ${
              isLiked
                ? "bg-supernova border-supernova text-white"
                : "bg-white/5 border-white/10 text-silver hover:text-white"
            } active:scale-95`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-white" : ""}`} />
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="w-10 h-10 bg-white/5 border border-white/10 hover:bg-white/10 text-silver hover:text-white rounded-full flex items-center justify-center transition-all duration-200 active:scale-95"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Download */}
          <button
            onClick={handleDownload}
            className="w-10 h-10 bg-white/5 border border-white/10 hover:bg-white/10 text-silver hover:text-white rounded-full flex items-center justify-center transition-all duration-200 active:scale-95"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Close */}
          <button
            onClick={closeLightbox}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full flex items-center justify-center transition-all duration-200 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image content with sliding controllers */}
      <div className="flex-1 flex items-center justify-between px-4 md:px-10 relative">
        {/* Left Arrow */}
        <button
          onClick={prevLightboxPhoto}
          className="absolute left-6 z-10 w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-white flex items-center justify-center transition-all duration-200 active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* The active image container */}
        <div className="w-full h-full max-h-[75vh] flex items-center justify-center p-4">
          <img
            src={lightboxPhoto.src}
            alt={lightboxPhoto.title}
            className="max-w-full max-h-full object-contain rounded-lg transition-transform duration-300 ease-out select-none shadow-2xl"
          />
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextLightboxPhoto}
          className="absolute right-6 z-10 w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-white flex items-center justify-center transition-all duration-200 active:scale-95"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Photo Metadata overlay - Space Mono */}
      <div className="w-full bg-cosmos border-t border-stardust/40 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 z-10 select-none">
        <div className="flex items-start gap-4">
          <img
            src={lightboxPhoto.photographer.avatar}
            alt={lightboxPhoto.photographer.name}
            className="w-12 h-12 rounded-full object-cover border border-white/20 flex-shrink-0"
          />
          <div>
            <h3 className="text-2xl font-display font-medium text-white tracking-wide">
              {lightboxPhoto.title}
            </h3>
            <p className="text-xs text-silver font-ui mt-1.5 flex items-center gap-1.5">
              <span>By {lightboxPhoto.photographer.name}</span>
              <span className="text-silver/30">•</span>
              <span>{lightboxPhoto.location}</span>
            </p>
          </div>
        </div>

        {/* Camera settings grid - Space Mono */}
        {lightboxPhoto.cameraSettings && (
          <div className="font-mono text-xs text-silver flex flex-wrap items-center gap-x-6 gap-y-3 bg-white/5 border border-white/10 rounded-xl p-4 max-w-xl">
            <div className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-primary-on-dark" />
              <span className="text-white/60 font-semibold">{lightboxPhoto.cameraSettings.camera}</span>
            </div>
            <div className="flex gap-4">
              <div>
                <span className="text-silver/50 mr-1.5">ISO</span>
                <span className="text-white font-medium">{lightboxPhoto.cameraSettings.iso}</span>
              </div>
              <div>
                <span className="text-silver/50 mr-1.5">APERTURE</span>
                <span className="text-white font-medium">{lightboxPhoto.cameraSettings.aperture}</span>
              </div>
              <div>
                <span className="text-silver/50 mr-1.5">EXPOSURE</span>
                <span className="text-white font-medium">{lightboxPhoto.cameraSettings.shutterSpeed}</span>
              </div>
              <div>
                <span className="text-silver/50 mr-1.5">FOCAL</span>
                <span className="text-white font-medium">{lightboxPhoto.cameraSettings.focalLength}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
