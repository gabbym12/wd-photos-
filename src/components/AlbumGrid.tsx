import React, { useState } from 'react';
import { Album } from '../types';
import { MapPin, Calendar, Layers, PlusCircle, ArrowRight, Sparkles } from 'lucide-react';

interface AlbumGridProps {
  albums: Album[];
  photoCounts: Record<string, number>;
  onSelectAlbum: (albumId: string) => void;
  onCreateAlbum: (album: Omit<Album, 'id'>) => void;
}

export const AlbumGrid: React.FC<AlbumGridProps> = ({
  albums,
  photoCounts,
  onSelectAlbum,
  onCreateAlbum,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCreatingAlbum, setIsCreatingAlbum] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newCategory, setNewCategory] = useState<Album['category']>('weddings');
  const [newLocation, setNewLocation] = useState('');
  const [newCoverUrl, setNewCoverUrl] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const categories = [
    { id: 'all', label: 'All Collections' },
    { id: 'weddings', label: 'Weddings & Celebrations' },
    { id: 'portraits', label: 'Portraits & Studio' },
    { id: 'landscapes', label: 'Landscapes & Nature' },
    { id: 'architecture', label: 'Architecture & Spaces' },
    { id: 'editorial', label: 'Editorial & Fashion' },
  ];

  const filteredAlbums = albums.filter((album) => {
    if (selectedCategory === 'all') return true;
    return album.category === selectedCategory;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onCreateAlbum({
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || 'Curated Collection',
      description: newDescription.trim() || 'A hand-selected series of photographs.',
      category: newCategory,
      coverUrl: newCoverUrl.trim() || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      location: newLocation.trim() || 'WD Studio'
    });

    setNewTitle('');
    setNewSubtitle('');
    setNewLocation('');
    setNewCoverUrl('');
    setNewDescription('');
    setIsCreatingAlbum(false);
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 border border-neutral-800 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gabriella Miles Fine Art Photography</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-100">
            Timeless Imagery & Curated Stories
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
            Welcome to the WD Photos portfolio. Explore destination wedding memoirs, fine art portraits, Nordic landscapes, and private client proofing archives.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              id="album-banner-create-btn"
              onClick={() => setIsCreatingAlbum(true)}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-amber-500/30 text-xs font-semibold tracking-wider transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Album</span>
            </button>
            <button
              id="album-banner-browse-all"
              onClick={() => onSelectAlbum('all')}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-semibold tracking-wider transition-all shadow-md"
            >
              <span>View Complete Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-neutral-800 pb-4">
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`category-pill-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                  : 'bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/80 border border-neutral-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button
          id="btn-add-album-header"
          onClick={() => setIsCreatingAlbum(!isCreatingAlbum)}
          className="text-xs font-medium text-amber-400 hover:text-amber-300 flex items-center space-x-1.5 transition-colors"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>{isCreatingAlbum ? 'Cancel New Album' : 'New Collection'}</span>
        </button>
      </div>

      {/* Modal / Inline form for creating a new album */}
      {isCreatingAlbum && (
        <form
          id="create-album-form"
          onSubmit={handleCreateSubmit}
          className="p-6 rounded-xl bg-neutral-900 border border-amber-500/30 space-y-4 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-display text-neutral-100 flex items-center space-x-2">
              <PlusCircle className="w-5 h-5 text-amber-400" />
              <span>Create New Photo Album</span>
            </h3>
            <span className="text-xs text-neutral-400">Add custom collection to WD Photos</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Album Title *</label>
              <input
                id="album-new-title-input"
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Maya & Daniel Wedding"
                className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-700 rounded-lg text-neutral-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Subtitle / Series</label>
              <input
                id="album-new-subtitle-input"
                type="text"
                value={newSubtitle}
                onChange={(e) => setNewSubtitle(e.target.value)}
                placeholder="e.g. Amalfi Coast Ceremony"
                className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-700 rounded-lg text-neutral-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Category</label>
              <select
                id="album-new-category-select"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as Album['category'])}
                className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-700 rounded-lg text-neutral-100 focus:outline-none focus:border-amber-500"
              >
                <option value="weddings">Weddings</option>
                <option value="portraits">Portraits</option>
                <option value="landscapes">Landscapes</option>
                <option value="architecture">Architecture</option>
                <option value="editorial">Editorial</option>
                <option value="client">Client Proofing</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Location</label>
              <input
                id="album-new-location-input"
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder="e.g. Positano, Italy"
                className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-700 rounded-lg text-neutral-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-neutral-300 mb-1">Cover Image URL (Optional)</label>
              <input
                id="album-new-cover-input"
                type="url"
                value={newCoverUrl}
                onChange={(e) => setNewCoverUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-700 rounded-lg text-neutral-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-neutral-300 mb-1">Description</label>
              <textarea
                id="album-new-desc-input"
                rows={2}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Story, notes, or artistic direction for this album..."
                className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-700 rounded-lg text-neutral-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              id="album-cancel-create-btn"
              type="button"
              onClick={() => setIsCreatingAlbum(false)}
              className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-neutral-200"
            >
              Cancel
            </button>
            <button
              id="album-submit-create-btn"
              type="submit"
              className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs transition-colors"
            >
              Create Album
            </button>
          </div>
        </form>
      )}

      {/* Grid of Albums */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredAlbums.map((album) => {
          const count = photoCounts[album.id] || 0;
          return (
            <div
              key={album.id}
              id={`album-card-${album.id}`}
              onClick={() => onSelectAlbum(album.id)}
              className="group cursor-pointer flex flex-col overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800/80 hover:border-amber-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-black/60"
            >
              {/* Cover Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950">
                <img
                  src={album.coverUrl}
                  alt={album.title}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                {/* Badge Top Left */}
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] uppercase font-semibold px-2.5 py-1 rounded bg-neutral-900/80 backdrop-blur-md text-amber-300 border border-amber-500/30">
                    {album.category}
                  </span>
                </div>

                {/* Photo Count Top Right */}
                <div className="absolute top-3 right-3 flex items-center space-x-1.5 px-2.5 py-1 rounded bg-neutral-900/80 backdrop-blur-md text-neutral-200 text-xs border border-neutral-700/60">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>{count} {count === 1 ? 'photo' : 'photos'}</span>
                </div>

                {/* Bottom Overlay Text */}
                <div className="absolute bottom-3 left-4 right-4 text-neutral-100">
                  <p className="text-xs text-amber-400/90 font-medium tracking-wide uppercase">
                    {album.subtitle}
                  </p>
                  <h3 className="font-display text-xl font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
                    {album.title}
                  </h3>
                </div>
              </div>

              {/* Card Meta & Description */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-light">
                  {album.description}
                </p>

                <div className="flex items-center justify-between text-[11px] text-neutral-400 border-t border-neutral-800/80 pt-3">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400/80" />
                    <span>{album.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{album.date}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
