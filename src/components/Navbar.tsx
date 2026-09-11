import React from 'react';
import { Camera, Image as ImageIcon, Heart, Upload, CheckSquare, Search, FolderArchive } from 'lucide-react';

interface NavbarProps {
  activeTab: 'albums' | 'all' | 'proofing' | 'favorites';
  setActiveTab: (tab: 'albums' | 'all' | 'proofing' | 'favorites') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  favoritesCount: number;
  proofingCount: number;
  totalPhotosCount: number;
  onOpenUpload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  favoritesCount,
  proofingCount,
  totalPhotosCount,
  onOpenUpload,
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-neutral-950/85 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Monogram & Title */}
          <div 
            id="brand-logo"
            onClick={() => setActiveTab('albums')}
            className="flex items-center space-x-3.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-neutral-800 border border-amber-500/40 flex items-center justify-center text-amber-300 group-hover:border-amber-400 transition-all shadow-sm">
              <Camera className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-display text-xl font-bold tracking-widest text-neutral-100 group-hover:text-amber-300 transition-colors">
                  WD PHOTOS
                </span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 tracking-wider">
                  STUDIO
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-light tracking-wide">
                Fine Art, Weddings & Curated Editorial
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex items-center flex-1 max-w-xs mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                id="navbar-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search photos, camera, tags..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-neutral-900/90 text-neutral-200 placeholder-neutral-500 rounded-full border border-neutral-800 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-all"
              />
              {searchQuery && (
                <button
                  id="navbar-search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-200"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              id="nav-tab-albums"
              onClick={() => setActiveTab('albums')}
              className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center space-x-2 ${
                activeTab === 'albums'
                  ? 'bg-neutral-800 text-amber-400 shadow-sm border border-neutral-700'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              }`}
            >
              <FolderArchive className="w-4 h-4" />
              <span>Albums</span>
            </button>

            <button
              id="nav-tab-all-photos"
              onClick={() => setActiveTab('all')}
              className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center space-x-2 ${
                activeTab === 'all'
                  ? 'bg-neutral-800 text-amber-400 shadow-sm border border-neutral-700'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Gallery</span>
              <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-neutral-800/80 text-neutral-400 border border-neutral-700/60">
                {totalPhotosCount}
              </span>
            </button>

            <button
              id="nav-tab-proofing"
              onClick={() => setActiveTab('proofing')}
              className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center space-x-2 ${
                activeTab === 'proofing'
                  ? 'bg-neutral-800 text-amber-400 shadow-sm border border-neutral-700'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Proofing</span>
              {proofingCount > 0 && (
                <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                  {proofingCount}
                </span>
              )}
            </button>

            <button
              id="nav-tab-favorites"
              onClick={() => setActiveTab('favorites')}
              className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center space-x-2 ${
                activeTab === 'favorites'
                  ? 'bg-neutral-800 text-amber-400 shadow-sm border border-neutral-700'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              }`}
            >
              <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span className="hidden sm:inline">Favorites</span>
              {favoritesCount > 0 && (
                <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              id="nav-btn-upload-photo"
              onClick={onOpenUpload}
              className="ml-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 text-xs sm:text-sm font-semibold flex items-center space-x-1.5 shadow-md hover:shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4 text-neutral-950" />
              <span className="hidden sm:inline">Upload</span>
            </button>
          </nav>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              id="mobile-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search photos, tags, albums..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-neutral-900 text-neutral-200 placeholder-neutral-500 rounded-full border border-neutral-800 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
