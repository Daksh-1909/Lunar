import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Camera } from "lucide-react";
import { useGallery } from "../context/GalleryContext";
import { PhotoCard } from "../components/ui/PhotoCard";
import { SpaceBackground } from "../components/ui/SpaceBackground";

export const CollectionDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const {
    collections,
    photos,
    likedPhotoIds,
    likePhoto,
    openLightbox
  } = useGallery();

  const collection = collections.find((c) => c.slug === slug);

  // Scroll to top on slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!collection) {
    return (
      <div className="w-full bg-transparent min-h-screen py-32 text-center flex flex-col items-center justify-center">
        <SpaceBackground variant="spa" />
        <h2 className="text-3xl font-display font-medium text-white">
          Collection Not Found
        </h2>
        <p className="text-sm text-silver/60 font-ui mt-2">
          The requested celestial archive does not exist.
        </p>
        <Link to="/collections" className="btn-primary mt-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Collections
        </Link>
      </div>
    );
  }

  // Get photos belonging to this collection
  const collectionPhotos = photos.filter((p) => p.collectionIds.includes(collection.id));

  // Get unique photographers credited in this collection
  const creditedPhotographers = Array.from(
    new Map(collectionPhotos.map((p) => [p.photographer.id, p.photographer])).values()
  );

  // Get related collections (not the active one)
  const relatedCollections = collections
    .filter((c) => c.id !== collection.id)
    .slice(0, 3);

  return (
    <div className="w-full bg-transparent min-h-screen pb-24 overflow-hidden relative">
      <SpaceBackground variant="spa" />
      {/* 1. COMPONENT HERO BANNER */}
      <section className="relative w-full py-20 md:py-32 px-6 md:px-12 flex items-center justify-center text-center overflow-hidden border-b border-stardust/40">
        <img
          src={collection.coverImage}
          alt={collection.title}
          className="absolute inset-0 w-full h-full object-cover opacity-25 -z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-void/80 to-void -z-10" />

        <div className="max-w-4xl mx-auto z-10 flex flex-col items-center">
          <Link
            to="/collections"
            className="flex items-center gap-2 text-xs font-mono text-eclipse hover:text-eclipse/80 transition-colors mb-6 select-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            BACK TO COLLECTIONS
          </Link>

          <h1 className="text-4xl md:text-6xl font-display font-semibold tracking-wide text-white display-tight">
            {collection.title}
          </h1>

          <div className="w-12 h-[1.5px] bg-eclipse mx-auto mt-4" />

          <p className="text-sm md:text-base text-silver/80 font-ui max-w-2xl mx-auto mt-4 leading-relaxed body-apple">
            {collection.description}
          </p>

          <div className="mt-6 flex items-center gap-6 text-xs font-mono text-silver/60">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-eclipse" />
              {collectionPhotos.length} Artworks
            </span>
            <span>•</span>
            <span>Created {new Date(collection.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </section>

      {/* 2. PHOTOGRAPHERS CREDIT CARD BLOCK */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-10 border-b border-stardust/20 select-none">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-eclipse" />
            <span className="font-mono text-xs uppercase tracking-wider text-white">
              Credited Artists
            </span>
          </div>

          <div className="flex flex-wrap gap-6 items-center">
            {creditedPhotographers.map((photographer) => (
              <div key={photographer.id} className="flex items-center gap-3">
                <img
                  src={photographer.avatar}
                  alt={photographer.name}
                  className="w-8 h-8 rounded-full object-cover border border-white/20"
                />
                <div>
                  <h4 className="text-sm font-semibold text-white font-ui">{photographer.name}</h4>
                  <p className="text-[10px] text-silver/50 font-mono uppercase">{photographer.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MASONRY PHOTO GRID */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {collectionPhotos.map((photo) => (
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
      </section>

      {/* 4. RELATED COLLECTIONS SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-stardust/20 select-none">
        <div className="mb-10 text-center md:text-left">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-eclipse">
            MORE SERIES
          </span>
          <h2 className="text-3xl font-display text-white mt-2 font-semibold display-tight">
            Related Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedCollections.map((col) => (
            <Link
              key={col.id}
              to={`/collections/${col.slug}`}
              className="group flex flex-col bg-cosmos/40 backdrop-blur-sm border border-stardust/40 rounded-[20px] overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:ring-1 hover:ring-eclipse/20 cursor-pointer active:scale-[0.98]"
            >
              <div className="w-full aspect-[16/10] overflow-hidden relative">
                <img
                  src={col.coverImage}
                  alt={col.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-display font-medium text-white truncate group-hover:text-eclipse transition-colors">
                  {col.title}
                </h3>
                <p className="text-[12px] text-silver/60 font-mono mt-1.5">
                  {col.photoIds.length} CAPTURES
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CollectionDetailPage;
