import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Photo, Collection, PhotoCategory } from "../types";
import { photos as mockPhotos, collections as mockCollections } from "../data/mockData";

interface GalleryContextType {
  photos: Photo[];
  collections: Collection[];
  activeCategory: PhotoCategory | "all";
  sortBy: "newest" | "likes" | "views" | "alphabetical";
  likedPhotoIds: Set<string>;
  lightboxPhoto: Photo | null;
  lightboxPhotoIndex: number;
  isLightboxOpen: boolean;
  isLoading: boolean;
  searchQuery: string;
  likePhoto: (id: string) => void;
  openLightbox: (photoId: string) => void;
  closeLightbox: () => void;
  nextLightboxPhoto: () => void;
  prevLightboxPhoto: () => void;
  setCategory: (category: PhotoCategory | "all") => void;
  setSortBy: (sort: "newest" | "likes" | "views" | "alphabetical") => void;
  setSearchQuery: (query: string) => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }
  return context;
};

interface GalleryProviderProps {
  children: ReactNode;
}

export const GalleryProvider: React.FC<GalleryProviderProps> = ({ children }) => {
  const [photos, setPhotos] = useState<Photo[]>(mockPhotos);
  const [collections] = useState<Collection[]>(mockCollections);
  const [activeCategory, setCategory] = useState<PhotoCategory | "all">("all");
  const [sortBy, setSortBy] = useState<"newest" | "likes" | "views" | "alphabetical">("newest");
  const [likedPhotoIds, setLikedPhotoIds] = useState<Set<string>>(new Set());
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);
  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState<number>(-1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Load liked items from localStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem("lunar_likes");
    if (savedLikes) {
      try {
        setLikedPhotoIds(new Set(JSON.parse(savedLikes)));
      } catch (e) {
        console.error("Failed to parse liked photo IDs", e);
      }
    }
  }, []);

  const likePhoto = (id: string) => {
    setLikedPhotoIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        // Decrease like count in photos
        setPhotos(photos.map(p => p.id === id ? { ...p, likes: p.likes - 1 } : p));
      } else {
        next.add(id);
        // Increase like count in photos
        setPhotos(photos.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
      }
      localStorage.setItem("lunar_likes", JSON.stringify(Array.from(next)));
      return next;
    });
  };

  // Filter photos based on search query and category first to enable navigation in Lightbox
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

  const openLightbox = (photoId: string) => {
    const currentList = getFilteredPhotos();
    const index = currentList.findIndex(p => p.id === photoId);
    if (index !== -1) {
      setLightboxPhoto(currentList[index]);
      setLightboxPhotoIndex(index);
      setIsLightboxOpen(true);
    }
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setTimeout(() => {
      setLightboxPhoto(null);
      setLightboxPhotoIndex(-1);
    }, 300); // Wait for transition fade-out
  };

  const nextLightboxPhoto = () => {
    const currentList = getFilteredPhotos();
    if (lightboxPhotoIndex !== -1 && currentList.length > 0) {
      const nextIndex = (lightboxPhotoIndex + 1) % currentList.length;
      setLightboxPhoto(currentList[nextIndex]);
      setLightboxPhotoIndex(nextIndex);
    }
  };

  const prevLightboxPhoto = () => {
    const currentList = getFilteredPhotos();
    if (lightboxPhotoIndex !== -1 && currentList.length > 0) {
      const prevIndex = (lightboxPhotoIndex - 1 + currentList.length) % currentList.length;
      setLightboxPhoto(currentList[prevIndex]);
      setLightboxPhotoIndex(prevIndex);
    }
  };

  // Simulate loader on category or sort changes for premium feel
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [activeCategory, sortBy, searchQuery]);

  return (
    <GalleryContext.Provider
      value={{
        photos,
        collections,
        activeCategory,
        sortBy,
        likedPhotoIds,
        lightboxPhoto,
        lightboxPhotoIndex,
        isLightboxOpen,
        isLoading,
        searchQuery,
        likePhoto,
        openLightbox,
        closeLightbox,
        nextLightboxPhoto,
        prevLightboxPhoto,
        setCategory,
        setSortBy,
        setSearchQuery,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};
