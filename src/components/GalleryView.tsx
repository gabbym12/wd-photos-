import React, { useState, useMemo } from 'react';
import { Photo, Album, ViewLayout } from '../types';
import { PhotoCard } from './PhotoCard';
import {
  LayoutGrid,
  Columns3,
  ArrowLeft,
  MapPin,
  Calendar,
  Layers,
  RotateCcw,
} from 'lucide-react';

interface GalleryViewProps {
  photos: Photo[];
  albums: Album[];
  selectedAlbumId: string | null;
  onClearAlbum: () => void;
  searchQuery: string;
  onSelectPhoto: (photo: Photo) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  initialFavoritesOnly?: boolean;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  photos,
  albums,
  selectedAlbumId,
  onClearAlbum,
  searchQuery,
  onSelectPhoto,
  onToggleFavorite,
  initialFavoritesOnly = false,
}) => {
  const [layout, setLayout] = useState<ViewLayout>('masonry');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [orientationFilter, setOrientationFilter] = useState<'all' | 'portrait' | 'landscape' | 'square'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating'>('newest');

  const activeAlbum = useMemo(() => {
    if (!selectedAlbumId || selectedAlbumId === 'all') return null;
    return albums.find((a) => a.id === selectedAlbumId) || null;
  }, [selectedAlbumId, albums]);

  // Filter and sort photos
  const filteredPhotos = useMemo(() => {
    return photos
      .filter((photo) => {
        // Album filter
        if (selectedAlbumId && selectedAlbumId !== 'all' && photo.albumId !== selectedAlbumId) {
          return false;
        }

        // Favorites filter
        if (initialFavoritesOnly && !photo.isFavorite) {
          return false;
        }

        // Category filter
        if (categoryFilter !== 'all' && photo.category !== categoryFilter) {
          return false;
        }

        // Orientation filter
        if (orientationFilter !== 'all' && photo.orientation !== orientationFilter) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = photo.title.toLowerCase().includes(q);
          const matchCaption = photo.caption.toLowerCase().includes(q);
          const matchLocation = photo.location.toLowerCase().includes(q);
          const matchCamera = photo.exif.camera.toLowerCase().includes(q);
          const matchAlbum = photo.albumTitle.toLowerCase().includes(q);
          const matchTags = photo.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchCaption && !matchLocation && !matchCamera && !matchAlbum && !matchTags) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') {
          return (b.rating || 0) - (a.rating || 0);
        }
        if (sortBy === 'oldest') {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [
    photos,
    selectedAlbumId,
    initialFavoritesOnly,
    categoryFilter,
    orientationFilter,
    searchQuery,
    sortBy,
  ]);

  return (
    <div className="space-y-6">
      {/* Active Album Hero Header (if scoped to an album) */}
      {activeAlbum && (
        <div className="relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 p-6 sm:p-10 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <button
                id="btn-back-to-albums"
                onClick={onClearAlbum}
                className="inline-flex items-center space-x-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors pb-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to All Collections</span>
              </button>
              <div className="inline-block text-[11px] uppercase font-bold tracking-widest text-amber-400/90 ml-3">
                {activeAlbum.category}
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-100">
                {activeAlbum.title}
              </h2>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                {activeAlbum.description}
              </p>
              <div className="flex items-center space-x-4 text-xs text-neutral-400 pt-2">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400/80" />
                  <span>{activeAlbum.location}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{activeAlbum.date}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Layers className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{filteredPhotos.length} Photos</span>
                </span>
              </div>
            </div>

            {/* Thumbnail preview */}
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-xl overflow-hidden shrink-0 border border-neutral-700 shadow-2xl">
              <img
                src={activeAlbum.coverUrl}
                alt={activeAlbum.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Filter and Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        {/* Left Side: Category Pills or Summary */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          <button
            id="filter-category-all"
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              categoryFilter === 'all'
                ? 'bg-neutral-800 text-amber-300 border border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            All Categories
          </button>
          <button
            id="filter-category-weddings"
            onClick={() => setCategoryFilter('weddings')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              categoryFilter === 'weddings'
                ? 'bg-neutral-800 text-amber-300 border border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Weddings
          </button>
          <button
            id="filter-category-portraits"
            onClick={() => setCategoryFilter('portraits')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              categoryFilter === 'portraits'
                ? 'bg-neutral-800 text-amber-300 border border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Portraits
          </button>
          <button
            id="filter-category-landscapes"
            onClick={() => setCategoryFilter('landscapes')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              categoryFilter === 'landscapes'
                ? 'bg-neutral-800 text-amber-300 border border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Landscapes
          </button>
          <button
            id="filter-category-architecture"
            onClick={() => setCategoryFilter('architecture')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              categoryFilter === 'architecture'
                ? 'bg-neutral-800 text-amber-300 border border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Architecture
          </button>
        </div>

        {/* Right Side: Layout toggle & filter drawer button */}
        <div className="flex items-center space-x-3 self-end sm:self-auto">
          {/* Sort Selector */}
          <select
            id="gallery-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'rating')}
            className="px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 focus:outline-none focus:border-amber-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="rating">Highest Rated</option>
          </select>

          {/* Orientation Filter */}
          <select
            id="gallery-orientation-select"
            value={orientationFilter}
            onChange={(e) => setOrientationFilter(e.target.value as any)}
            className="hidden sm:block px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 focus:outline-none focus:border-amber-500"
          >
            <option value="all">All Orientations</option>
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
          </select>

          {/* Layout Grid Buttons */}
          <div className="flex items-center bg-neutral-900 rounded-lg p-0.5 border border-neutral-800">
            <button
              id="btn-layout-masonry"
              onClick={() => setLayout('masonry')}
              className={`p-1.5 rounded ${
                layout === 'masonry'
                  ? 'bg-neutral-800 text-amber-300 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
              title="Masonry Flow"
            >
              <Columns3 className="w-4 h-4" />
            </button>
            <button
              id="btn-layout-grid"
              onClick={() => setLayout('grid')}
              className={`p-1.5 rounded ${
                layout === 'grid'
                  ? 'bg-neutral-800 text-amber-300 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
              title="Equal Grid"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Tags Bar (if filters active) */}
      {(searchQuery || categoryFilter !== 'all' || orientationFilter !== 'all' || activeAlbum) && (
        <div className="flex items-center space-x-2 text-xs text-neutral-400 flex-wrap gap-y-2">
          <span>Showing {filteredPhotos.length} matching photos</span>
          {searchQuery && (
            <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-200 border border-neutral-700">
              Query: "{searchQuery}"
            </span>
          )}
          {categoryFilter !== 'all' && (
            <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-200 border border-neutral-700">
              Category: {categoryFilter}
            </span>
          )}
          {orientationFilter !== 'all' && (
            <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-200 border border-neutral-700">
              Orientation: {orientationFilter}
            </span>
          )}
          <button
            id="btn-reset-filters"
            onClick={() => {
              setCategoryFilter('all');
              setOrientationFilter('all');
              if (activeAlbum) onClearAlbum();
            }}
            className="text-amber-400 hover:text-amber-300 ml-2 underline flex items-center space-x-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset filters</span>
          </button>
        </div>
      )}

      {/* Photo Render Container */}
      {filteredPhotos.length === 0 ? (
        <div className="text-center py-20 bg-neutral-900/40 rounded-2xl border border-neutral-800 space-y-3">
          <p className="font-display text-lg text-neutral-300 font-semibold">
            No photographs match your criteria
          </p>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Try adjusting your search query, switching categories, or clearing active filters.
          </p>
          <button
            onClick={() => {
              setCategoryFilter('all');
              setOrientationFilter('all');
              if (activeAlbum) onClearAlbum();
            }}
            className="mt-2 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200"
          >
            Show All Photos
          </button>
        </div>
      ) : layout === 'masonry' ? (
        /* Masonry Multi-column */
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              onSelectPhoto={onSelectPhoto}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        /* Uniform Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              onSelectPhoto={onSelectPhoto}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};
