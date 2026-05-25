import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Grid, Eye, ThumbsUp, Calendar, ArrowDownAz, RefreshCcw } from "lucide-react";
import { useGallery } from "../context/GalleryContext";
import { PhotoCard } from "../components/ui/PhotoCard";
import { PhotoCategory } from "../types";
import { SpaceBackground } from "../components/ui/SpaceBackground";

export const GalleryPage: React.FC = () => {
  const {
    photos,
    activeCategory,
    sortBy,
    isLoading,
    searchQuery,
    likedPhotoIds,
    likePhoto,
    openLightbox,
    setCategory,
    setSortBy,
    setSearchQuery
  } = useGallery();

  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(12);
  const [simulatedLoading, setSimulatedLoading] = useState(false);

  // Sync React Router Search parameters (e.g. ?category=moon)
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setCategory(cat as PhotoCategory | "all");
    }
  }, [searchParams, setCategory]);

  const categories: { label: string; value: PhotoCategory | "all" }[] = [
    { label: "All", value: "all" },
    { label: "Red Moon", value: "red-moon" },
    { label: "Full Moon", value: "full-moon" },
    { label: "Eclipse", value: "eclipse" },
    { label: "Nature", value: "nature" },
    { label: "Night Sky", value: "night-sky" },
    { label: "Sunrise/Sunset", value: "sunrise-sunset" },
    { label: "Storms", value: "storms" },
    { label: "Forests", value: "forests" },
    { label: "Oceans", value: "oceans" },
    { label: "Mountains", value: "mountains" },
    { label: "Auroras", value: "auroras" }
  ];

  const sortOptions = [
    { label: "Newest Captured", value: "newest", icon: Calendar },
    { label: "Most Liked", value: "likes", icon: ThumbsUp },
    { label: "Most Viewed", value: "views", icon: Eye },
    { label: "A-Z Order", value: "alphabetical", icon: ArrowDownAz }
  ];

  const handleCategoryChange = (cat: PhotoCategory | "all") => {
    setCategory(cat);
    setVisibleCount(12); // reset batch size
    if (cat === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  // Get active filtered dataset
  const getFilteredPhotos = () => {
    let filtered = [...photos];
    if (activeCategory !== "all") {
      filtered = filtered.filter(p => p.category === activeCategory);
    }
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          p.photographer.name.toLowerCase().includes(query) ||
          p.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    if (sortBy === "newest") {
      filtered.sort((a, b) => b.dateTaken.localeCompare(a.dateTaken));
    } else if (sortBy === "likes") {
      filtered.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "views") {
      filtered.sort((a, b) => b.views - a.views);
    } else if (sortBy === "alphabetical") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  };

  const filteredPhotos = getFilteredPhotos();
  const paginatedPhotos = filteredPhotos.slice(0, visibleCount);

  const loadMore = () => {
    setSimulatedLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 12, filteredPhotos.length));
      setSimulatedLoading(false);
    }, 600);
  };

  return (
    <div className="w-full bg-transparent min-h-screen pt-4 pb-24 px-6 md:px-12 relative overflow-hidden">
      <SpaceBackground />
      {/* 1. FILTER BAR - Sticky under frosted subnav */}
      <div className="max-w-7xl mx-auto flex flex-col gap-6 mb-12 select-none">
        
        {/* Search Input Card */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 border-b border-stardust/40 pb-6">
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              placeholder="Search by title, location, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 bg-cosmos text-white font-ui border border-stardust/60 rounded-full px-5 focus:outline-none focus:border-eclipse focus:ring-1 focus:ring-eclipse/50 text-[14px] transition-all"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <span className="text-xs text-silver font-mono">SORT:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-cosmos border border-stardust/60 rounded-full py-2 pl-4 pr-10 text-xs text-white focus:outline-none focus:border-eclipse cursor-pointer appearance-none"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-silver/60">
                <Grid className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>

        {/* Categories horizontal pill slider */}
        <div className="flex gap-2.5 overflow-x-auto pb-3 w-full scrollbar-none" style={{ scrollbarWidth: "none" }}>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={`px-4 py-2 text-xs font-medium rounded-full border transition-all duration-200 cursor-pointer shrink-0 active:scale-95 ${
                activeCategory === cat.value
                  ? "bg-eclipse border-eclipse text-black font-semibold shadow-md shadow-eclipse/10"
                  : "bg-cosmos border-stardust/60 text-silver hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. GALLERY GRID SECTION */}
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          /* SKELETON LOADER SCREEN */
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {Array.from({ length: 9 }).map((_, idx) => (
              <div
                key={idx}
                className="w-full rounded-[18px] bg-cosmos border border-stardust/40 p-4 relative overflow-hidden"
                style={{ height: `${250 + (idx % 3) * 80}px` }}
              >
                <div className="w-full h-full bg-gradient-to-r from-stardust/10 via-stardust/20 to-stardust/10 bg-[length:1000px_100%] animate-shimmer" />
              </div>
            ))}
          </div>
        ) : filteredPhotos.length === 0 ? (
          /* EMPTY STATE SCREEN */
          <div className="w-full py-32 text-center flex flex-col items-center justify-center select-none animate-in fade-in">
            <MoonCircleEmpty />
            <h3 className="text-3xl font-display font-medium text-white mt-6">
              No Celestial Alignments Found
            </h3>
            <p className="text-sm text-silver/60 font-ui mt-2 max-w-sm mx-auto">
              Our astronomical lens couldn't locate any matching captures. Try relaxing your filters or queries!
            </p>
            <button
              onClick={() => {
                setCategory("all");
                setSearchQuery("");
                setSearchParams({});
              }}
              className="btn-primary mt-6 shrink-0"
            >
              <RefreshCcw className="w-4 h-4" />
              Reset Filters
            </button>
          </div>
        ) : (
          /* RENDER MASONRY GRID */
          <>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 animate-in fade-in duration-500">
              {paginatedPhotos.map((photo) => (
                <div key={photo.id} className="break-inside-avoid">
                  <PhotoCard
                    photo={photo}
                    isLiked={likedPhotoIds.has(photo.id)}
                    onLike={likePhoto}
                    onClick={openLightbox}
                  />
                </div>
              ))}
            </div>

            {/* Simulated Shimmer Batch when Loading More */}
            {simulatedLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="w-full h-[320px] rounded-[18px] bg-cosmos border border-stardust/40 p-4 relative overflow-hidden"
                  >
                    <div className="w-full h-full bg-gradient-to-r from-stardust/10 via-stardust/20 to-stardust/10 bg-[length:1000px_100%] animate-shimmer" />
                  </div>
                ))}
              </div>
            )}

            {/* Load More Trigger Button */}
            {visibleCount < filteredPhotos.length && !simulatedLoading && (
              <div className="w-full flex justify-center mt-16 select-none">
                <button
                  onClick={loadMore}
                  className="btn-secondary px-10 py-3"
                >
                  Load More Captures
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Subcomponent: Moon Empty State illustration
const MoonCircleEmpty = () => {
  return (
    <div className="w-24 h-24 rounded-full border-2 border-dashed border-stardust/60 flex items-center justify-center relative opacity-60">
      <div className="w-16 h-16 rounded-full border border-stardust/40 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-stardust/20 relative" />
      </div>
    </div>
  );
};

export default GalleryPage;
