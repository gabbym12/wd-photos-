import React, { useState, useRef } from 'react';
import { Album, Photo } from '../types';
import { X, Upload, Image as ImageIcon, Check } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  albums: Album[];
  onAddPhoto: (photo: Photo) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  albums,
  onAddPhoto,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [selectedAlbumId, setSelectedAlbumId] = useState(albums[0]?.id || '');
  const [category, setCategory] = useState<Photo['category']>('weddings');
  const [location, setLocation] = useState('');
  const [camera, setCamera] = useState('Sony α7R V');
  const [lens, setLens] = useState('FE 50mm F1.2 GM');
  const [tagsInput, setTagsInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    if (!title) {
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl && !title) return;

    const chosenAlbum = albums.find((a) => a.id === selectedAlbumId) || albums[0];
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().toLowerCase().replace(/^#/, ''))
      .filter(Boolean);

    const newPhoto: Photo = {
      id: `photo-user-${Date.now()}`,
      title: title.trim() || 'Untitled Capture',
      caption: caption.trim() || 'Added to WD Photos collection.',
      url: previewUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
      albumId: chosenAlbum ? chosenAlbum.id : 'custom',
      albumTitle: chosenAlbum ? chosenAlbum.title : 'Custom Album',
      category: category,
      orientation: 'landscape',
      date: new Date().toISOString().split('T')[0],
      location: location.trim() || 'Studio / On Location',
      photographer: 'Gabriella Miles (WD Photos)',
      isFavorite: false,
      rating: 5,
      clientStatus: 'pending',
      exif: {
        camera: camera.trim() || 'Sony α7R V',
        lens: lens.trim() || '50mm F1.2 GM',
        focalLength: '50mm',
        aperture: 'f/1.8',
        shutterSpeed: '1/500s',
        iso: 100,
        dimensions: '6000 × 4000 px',
      },
      tags: tags.length > 0 ? tags : ['new', 'studio', 'portfolio'],
    };

    onAddPhoto(newPhoto);
    onClose();
  };

  return (
    <div
      id="upload-photo-modal"
      className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-neutral-100">
                Upload to WD Photos
              </h3>
              <p className="text-xs text-neutral-400">
                Add high-resolution photography to your albums or client proofs
              </p>
            </div>
          </div>
          <button
            id="btn-close-upload-modal"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Drag and drop upload zone */}
          <div
            id="photo-dropzone"
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[160px] ${
              dragOver
                ? 'border-amber-400 bg-amber-500/10'
                : 'border-neutral-700 hover:border-neutral-500 bg-neutral-950/60'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileChange(e.target.files[0]);
                }
              }}
            />

            {previewUrl ? (
              <div className="relative w-full max-h-48 flex flex-col items-center">
                <img
                  src={previewUrl}
                  alt="Upload Preview"
                  className="max-h-40 rounded-lg object-contain shadow-lg border border-neutral-800"
                />
                <p className="text-xs text-amber-400 mt-2 flex items-center space-x-1 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span>Image selected. Click or drag to replace.</span>
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mx-auto text-neutral-400">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-200">
                    Drag and drop your photo here, or <span className="text-amber-400 underline">browse</span>
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Supports JPG, PNG, WEBP, TIFF (high-resolution)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Form details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Photo Title *
              </label>
              <input
                id="upload-title-input"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Sunset Ceremony Kiss"
                className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-700 rounded-lg text-neutral-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Assign Album
              </label>
              <select
                id="upload-album-select"
                value={selectedAlbumId}
                onChange={(e) => setSelectedAlbumId(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-700 rounded-lg text-neutral-100 focus:outline-none focus:border-amber-500"
              >
                {albums.map((album) => (
                  <option key={album.id} value={album.id}>
                    {album.title} ({album.category})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Category
              </label>
              <select
                id="upload-category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as Photo['category'])}
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
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Location
              </label>
              <input
                id="upload-location-input"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Lake Como, Italy"
                className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-700 rounded-lg text-neutral-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Camera Body
              </label>
              <input
                id="upload-camera-input"
                type="text"
                value={camera}
                onChange={(e) => setCamera(e.target.value)}
                placeholder="e.g. Sony α7R V"
                className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-700 rounded-lg text-neutral-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Lens Model
              </label>
              <input
                id="upload-lens-input"
                type="text"
                value={lens}
                onChange={(e) => setLens(e.target.value)}
                placeholder="e.g. 50mm F1.2 GM"
                className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-700 rounded-lg text-neutral-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Tags (comma-separated)
              </label>
              <input
                id="upload-tags-input"
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="ceremony, bride, sunset, fine art"
                className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-700 rounded-lg text-neutral-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Story / Caption
              </label>
              <textarea
                id="upload-caption-input"
                rows={2}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Artistic context or memory behind this capture..."
                className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-700 rounded-lg text-neutral-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-neutral-800">
            <button
              id="upload-cancel-btn"
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-neutral-200"
            >
              Cancel
            </button>
            <button
              id="upload-submit-btn"
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs tracking-wider uppercase transition-colors shadow-md"
            >
              Add to Gallery
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
