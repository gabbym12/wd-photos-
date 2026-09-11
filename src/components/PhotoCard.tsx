import React from 'react';
import { Photo } from '../types';
import { Heart, Maximize2, Camera, Check, Clock, AlertCircle, Star } from 'lucide-react';

interface PhotoCardProps {
  photo: Photo;
  onSelectPhoto: (photo: Photo) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  onSelectPhoto,
  onToggleFavorite,
}) => {
  return (
    <div
      id={`photo-item-${photo.id}`}
      onClick={() => onSelectPhoto(photo)}
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800/80 hover:border-amber-500/40 transition-all duration-300 shadow-md hover:shadow-2xl hover:shadow-black/70 flex flex-col break-inside-avoid mb-5"
    >
      {/* Image container */}
      <div className="relative w-full overflow-hidden bg-neutral-950">
        <img
          src={photo.url}
          alt={photo.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Top Badges overlay */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
          {/* Client Status Badge */}
          {photo.clientStatus ? (
            <div className="pointer-events-auto flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-md shadow-sm border ${
              photo.clientStatus === 'approved'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                : photo.clientStatus === 'rejected'
                ? 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
            }">
              {photo.clientStatus === 'approved' && <Check className="w-3 h-3 text-emerald-400" />}
              {photo.clientStatus === 'rejected' && <AlertCircle className="w-3 h-3 text-rose-400" />}
              {photo.clientStatus === 'pending' && <Clock className="w-3 h-3 text-amber-400" />}
              <span className="capitalize">{photo.clientStatus}</span>
            </div>
          ) : (
            <div />
          )}

          {/* Favorite heart button */}
          <button
            id={`btn-fav-${photo.id}`}
            onClick={(e) => onToggleFavorite(photo.id, e)}
            className="pointer-events-auto w-8 h-8 rounded-full bg-neutral-950/70 hover:bg-neutral-900 backdrop-blur-md flex items-center justify-center border border-neutral-700/60 transition-all text-neutral-300 hover:text-white"
            title={photo.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                photo.isFavorite
                  ? 'fill-rose-500 text-rose-500 scale-110'
                  : 'text-neutral-300 hover:text-rose-400'
              }`}
            />
          </button>
        </div>

        {/* Hover overlay with details */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
          <div className="space-y-1.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-semibold text-amber-400 tracking-wider">
                {photo.albumTitle}
              </span>
              {photo.rating ? (
                <div className="flex items-center space-x-0.5 text-amber-400">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-semibold">{photo.rating}</span>
                </div>
              ) : null}
            </div>

            <h4 className="text-sm font-bold text-neutral-100 font-display line-clamp-1">
              {photo.title}
            </h4>

            <p className="text-[11px] text-neutral-300 line-clamp-1 font-light">
              {photo.caption}
            </p>

            {/* EXIF Quick Snippet */}
            <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-800">
              <div className="flex items-center space-x-1 truncate max-w-[70%]">
                <Camera className="w-3 h-3 text-amber-400/80 shrink-0" />
                <span className="truncate">{photo.exif.camera} • {photo.exif.lens}</span>
              </div>
              <div className="flex items-center space-x-1 text-amber-300 font-medium">
                <Maximize2 className="w-3 h-3" />
                <span>View</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
