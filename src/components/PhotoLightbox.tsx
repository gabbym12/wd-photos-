import React, { useState, useEffect } from 'react';
import { Photo } from '../types';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Download,
  Info,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  Camera,
  MapPin,
  Calendar,
  User,
  Star,
  MessageSquare,
  Share2,
} from 'lucide-react';

interface PhotoLightboxProps {
  photo: Photo | null;
  photos: Photo[];
  onClose: () => void;
  onNavigate: (direction: 'next' | 'prev') => void;
  onToggleFavorite: (id: string) => void;
  onUpdatePhotoProofing: (
    photoId: string,
    updates: {
      rating?: number;
      clientStatus?: 'approved' | 'rejected' | 'pending';
      clientNotes?: string;
    }
  ) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  photos,
  onClose,
  onNavigate,
  onToggleFavorite,
  onUpdatePhotoProofing,
}) => {
  const [showInfo, setShowInfo] = useState(true);
  const [isPlayingSlideshow, setIsPlayingSlideshow] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [clientNotesText, setClientNotesText] = useState(photo?.clientNotes || '');
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Sync client notes when photo changes
  useEffect(() => {
    setClientNotesText(photo?.clientNotes || '');
    setZoomLevel(1);
  }, [photo]);

  // Keyboard navigation
  useEffect(() => {
    if (!photo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate('next');
      if (e.key === 'ArrowLeft') onNavigate('prev');
      if (e.key === 'i' || e.key === 'I') setShowInfo((prev) => !prev);
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlayingSlideshow((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, onClose, onNavigate]);

  // Slideshow interval
  useEffect(() => {
    if (!isPlayingSlideshow) return;

    const interval = setInterval(() => {
      onNavigate('next');
    }, 4500);

    return () => clearInterval(interval);
  }, [isPlayingSlideshow, onNavigate]);

  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.3, 2.5));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.3, 0.7));
  const handleResetZoom = () => setZoomLevel(1);

  const handleDownload = () => {
    // Open in new tab or download
    const link = document.createElement('a');
    link.href = photo.url;
    link.download = `${photo.title.toLowerCase().replace(/\s+/g, '-')}-wd-photos.jpg`;
    link.target = '_blank';
    link.rel = 'noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleNotesSave = () => {
    onUpdatePhotoProofing(photo.id, { clientNotes: clientNotesText });
  };

  return (
    <div
      id="photo-lightbox-modal"
      className="fixed inset-0 z-50 bg-neutral-950/98 backdrop-blur-xl flex flex-col justify-between select-none animate-in fade-in duration-200"
    >
      {/* Lightbox Top Action Bar */}
      <header className="h-16 px-6 border-b border-neutral-800/80 flex items-center justify-between z-20 bg-neutral-950/80 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <span className="font-display text-sm font-semibold text-neutral-200">
            {photo.albumTitle}
          </span>
          <span className="text-xs text-neutral-500">•</span>
          <span className="text-xs text-neutral-400">
            {currentIndex + 1} of {photos.length}
          </span>
          {photo.clientStatus && (
            <span
              className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                photo.clientStatus === 'approved'
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                  : photo.clientStatus === 'rejected'
                  ? 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                  : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
              }`}
            >
              {photo.clientStatus}
            </span>
          )}
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Slideshow button */}
          <button
            id="lightbox-btn-slideshow"
            onClick={() => setIsPlayingSlideshow(!isPlayingSlideshow)}
            className={`p-2 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all ${
              isPlayingSlideshow
                ? 'bg-amber-500 text-neutral-950 font-semibold'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
            }`}
            title="Toggle Slideshow (Space)"
          >
            {isPlayingSlideshow ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="hidden sm:inline">{isPlayingSlideshow ? 'Pause' : 'Play'}</span>
          </button>

          {/* Zoom In/Out */}
          <div className="hidden sm:flex items-center bg-neutral-900 rounded-lg p-0.5 border border-neutral-800">
            <button
              id="lightbox-btn-zoom-out"
              onClick={handleZoomOut}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              id="lightbox-btn-zoom-reset"
              onClick={handleResetZoom}
              className="px-1.5 text-[11px] text-neutral-400 hover:text-white"
              title="Reset Zoom"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              id="lightbox-btn-zoom-in"
              onClick={handleZoomIn}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Favorite button */}
          <button
            id="lightbox-btn-favorite"
            onClick={() => onToggleFavorite(photo.id)}
            className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
            title="Toggle favorite"
          >
            <Heart
              className={`w-4 h-4 ${photo.isFavorite ? 'fill-rose-500 text-rose-500' : ''}`}
            />
          </button>

          {/* Download button */}
          <button
            id="lightbox-btn-download"
            onClick={handleDownload}
            className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
            title="Download full resolution"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Share Link */}
          <button
            id="lightbox-btn-share"
            onClick={handleShare}
            className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors relative"
            title="Copy link to photo"
          >
            <Share2 className="w-4 h-4" />
            {copyFeedback && (
              <span className="absolute -bottom-7 right-0 text-[10px] bg-amber-500 text-neutral-950 font-bold px-1.5 py-0.5 rounded whitespace-nowrap">
                Copied!
              </span>
            )}
          </button>

          {/* Info toggle */}
          <button
            id="lightbox-btn-toggle-info"
            onClick={() => setShowInfo(!showInfo)}
            className={`p-2 rounded-lg transition-all ${
              showInfo
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
            title="Toggle Details & EXIF (I)"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Close button */}
          <button
            id="lightbox-btn-close"
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors ml-2"
            title="Close Lightbox (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Display Area (Photo + Optional Sidebar) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Nav Arrow */}
        <button
          id="lightbox-btn-prev"
          onClick={() => onNavigate('prev')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-neutral-950/70 hover:bg-neutral-900 border border-neutral-700/60 text-neutral-200 hover:text-amber-400 flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-105"
          title="Previous Photo (Left Arrow)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Center Canvas / Stage */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-auto relative">
          <div
            className="transition-transform duration-200 ease-out flex items-center justify-center max-w-full max-h-full"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={photo.url}
              alt={photo.title}
              referrerPolicy="no-referrer"
              className="max-h-[78vh] max-w-[85vw] object-contain rounded-md shadow-2xl border border-neutral-900"
            />
          </div>
        </div>

        {/* Right Nav Arrow */}
        <button
          id="lightbox-btn-next"
          onClick={() => onNavigate('next')}
          className="absolute right-4 md:right-80 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-neutral-950/70 hover:bg-neutral-900 border border-neutral-700/60 text-neutral-200 hover:text-amber-400 flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-105"
          style={{ right: showInfo ? '21rem' : '1rem' }}
          title="Next Photo (Right Arrow)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Right Sidebar: EXIF & Client Proofing */}
        {showInfo && (
          <aside className="w-80 border-l border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md overflow-y-auto p-5 space-y-6 z-20 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Photo Title & Caption */}
              <div className="space-y-1.5 border-b border-neutral-800 pb-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                  {photo.category} Collection
                </span>
                <h3 className="font-display text-xl font-bold text-neutral-100">
                  {photo.title}
                </h3>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {photo.caption}
                </p>
              </div>

              {/* Client Proofing & Feedback Section */}
              <div className="space-y-3 p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider flex items-center space-x-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-400" />
                    <span>Client Selection & Rating</span>
                  </h4>
                </div>

                {/* Rating stars */}
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      id={`star-rating-${star}`}
                      onClick={() => onUpdatePhotoProofing(photo.id, { rating: star })}
                      className="p-1 text-neutral-500 hover:text-amber-400 transition-colors"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          (photo.rating || 0) >= star
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-neutral-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-neutral-400 ml-2 font-medium">
                    {photo.rating ? `${photo.rating} / 5` : 'Unrated'}
                  </span>
                </div>

                {/* Status selection buttons */}
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  <button
                    id="btn-status-approved"
                    onClick={() => onUpdatePhotoProofing(photo.id, { clientStatus: 'approved' })}
                    className={`px-2 py-1.5 rounded text-[11px] font-semibold transition-all border ${
                      photo.clientStatus === 'approved'
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                        : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border-neutral-800'
                    }`}
                  >
                    Approved
                  </button>
                  <button
                    id="btn-status-pending"
                    onClick={() => onUpdatePhotoProofing(photo.id, { clientStatus: 'pending' })}
                    className={`px-2 py-1.5 rounded text-[11px] font-semibold transition-all border ${
                      photo.clientStatus === 'pending'
                        ? 'bg-amber-600 text-white border-amber-500 shadow-sm'
                        : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border-neutral-800'
                    }`}
                  >
                    Review
                  </button>
                  <button
                    id="btn-status-rejected"
                    onClick={() => onUpdatePhotoProofing(photo.id, { clientStatus: 'rejected' })}
                    className={`px-2 py-1.5 rounded text-[11px] font-semibold transition-all border ${
                      photo.clientStatus === 'rejected'
                        ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                        : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border-neutral-800'
                    }`}
                  >
                    Declined
                  </button>
                </div>

                {/* Client Notes input */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[10px] uppercase font-semibold text-neutral-400 flex items-center space-x-1">
                      <MessageSquare className="w-3 h-3 text-neutral-400" />
                      <span>Retouching / Print Notes</span>
                    </label>
                  </div>
                  <textarea
                    id="lightbox-client-notes-textarea"
                    rows={2}
                    value={clientNotesText}
                    onChange={(e) => setClientNotesText(e.target.value)}
                    onBlur={handleNotesSave}
                    placeholder="e.g. Please crop tighter for album page..."
                    className="w-full px-2.5 py-1.5 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Technical EXIF Metadata */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider flex items-center space-x-1.5">
                  <Camera className="w-3.5 h-3.5 text-amber-400" />
                  <span>Camera & Exposure Metadata</span>
                </h4>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800/80">
                    <span className="text-[10px] text-neutral-400 block uppercase">Camera</span>
                    <span className="text-neutral-200 font-medium truncate block">
                      {photo.exif.camera}
                    </span>
                  </div>
                  <div className="bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800/80">
                    <span className="text-[10px] text-neutral-400 block uppercase">Lens</span>
                    <span className="text-neutral-200 font-medium truncate block">
                      {photo.exif.lens}
                    </span>
                  </div>
                  <div className="bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800/80">
                    <span className="text-[10px] text-neutral-400 block uppercase">Aperture</span>
                    <span className="text-neutral-200 font-medium">{photo.exif.aperture}</span>
                  </div>
                  <div className="bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800/80">
                    <span className="text-[10px] text-neutral-400 block uppercase">Shutter</span>
                    <span className="text-neutral-200 font-medium">{photo.exif.shutterSpeed}</span>
                  </div>
                  <div className="bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800/80">
                    <span className="text-[10px] text-neutral-400 block uppercase">ISO</span>
                    <span className="text-neutral-200 font-medium">{photo.exif.iso}</span>
                  </div>
                  <div className="bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800/80">
                    <span className="text-[10px] text-neutral-400 block uppercase">Focal</span>
                    <span className="text-neutral-200 font-medium">{photo.exif.focalLength}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-neutral-400 pt-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-400/80" />
                    <span>{photo.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{photo.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{photo.photographer}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {photo.tags && photo.tags.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-neutral-800">
                  <span className="text-[10px] uppercase font-semibold text-neutral-400">
                    Tags
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {photo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Credit */}
            <div className="text-[11px] text-neutral-400 border-t border-neutral-800 pt-3 flex items-center justify-between">
              <span>WD Photos Fine Art</span>
              <span className="text-neutral-400">{photo.exif.dimensions}</span>
            </div>
          </aside>
        )}
      </div>

      {/* Bottom Thumbnail Filmstrip */}
      <footer className="h-20 bg-neutral-950/90 border-t border-neutral-800/80 px-4 flex items-center space-x-3 overflow-x-auto z-20">
        {photos.map((p) => (
          <button
            key={p.id}
            id={`filmstrip-thumb-${p.id}`}
            onClick={() => {
              // Set selected photo
              const target = photos.find((item) => item.id === p.id);
              if (target) {
                // Navigate directly
                const event = new CustomEvent('selectPhotoDirect', { detail: target });
                window.dispatchEvent(event);
              }
            }}
            className={`h-14 w-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
              p.id === photo.id
                ? 'border-amber-400 scale-105 shadow-md shadow-amber-500/20'
                : 'border-transparent opacity-50 hover:opacity-100'
            }`}
          >
            <img
              src={p.url}
              alt={p.title}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </footer>
    </div>
  );
};
