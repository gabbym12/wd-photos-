import React, { useState } from 'react';
import { Photo } from '../types';
import { PhotoCard } from './PhotoCard';
import { CheckCircle2, AlertCircle, Clock, Copy, Send, Check } from 'lucide-react';

interface ClientProofingViewProps {
  photos: Photo[];
  onSelectPhoto: (photo: Photo) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export const ClientProofingView: React.FC<ClientProofingViewProps> = ({
  photos,
  onSelectPhoto,
  onToggleFavorite,
}) => {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [submittedToStudio, setSubmittedToStudio] = useState(false);

  // Group photos that have proofing status or are part of client albums
  const proofingPhotos = photos.filter((p) => p.clientStatus !== undefined || p.albumTitle.includes('&'));

  const approvedCount = proofingPhotos.filter((p) => p.clientStatus === 'approved').length;
  const pendingCount = proofingPhotos.filter((p) => p.clientStatus === 'pending' || !p.clientStatus).length;
  const rejectedCount = proofingPhotos.filter((p) => p.clientStatus === 'rejected').length;
  const totalCount = proofingPhotos.length;
  const approvedPercentage = totalCount > 0 ? Math.round((approvedCount / totalCount) * 100) : 0;

  const filteredPhotos = proofingPhotos.filter((p) => {
    if (selectedStatusFilter === 'all') return true;
    if (selectedStatusFilter === 'pending') return p.clientStatus === 'pending' || !p.clientStatus;
    return p.clientStatus === selectedStatusFilter;
  });

  const handleExportSelections = () => {
    const approvedList = proofingPhotos
      .filter((p) => p.clientStatus === 'approved')
      .map((p) => ({
        id: p.id,
        title: p.title,
        album: p.albumTitle,
        rating: p.rating || 5,
        notes: p.clientNotes || '',
        exif: `${p.exif.camera} • ${p.exif.lens}`,
      }));

    const exportText = JSON.stringify(
      {
        gallery: 'WD Photos Client Proofing Export',
        date: new Date().toLocaleDateString(),
        totalSelected: approvedList.length,
        photos: approvedList,
      },
      null,
      2
    );

    navigator.clipboard.writeText(exportText);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const handleSubmitProofing = () => {
    setSubmittedToStudio(true);
    setTimeout(() => setSubmittedToStudio(false), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Proofing Client Header Card */}
      <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Active Client Proofing Portal</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-100">
              Wedding & Portrait Proofing Suite
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl">
              Select your favorite captures for album binding, wall prints, and high-resolution retouching.
              Mark each frame as Approved, Leave revision notes, or Request adjustments.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              id="proofing-export-selections-btn"
              onClick={handleExportSelections}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-xs font-semibold transition-all relative"
            >
              <Copy className="w-4 h-4 text-amber-400" />
              <span>Export Approved List</span>
              {copiedNotification && (
                <span className="absolute -top-8 right-0 text-[10px] bg-amber-500 text-neutral-950 font-bold px-2 py-0.5 rounded shadow">
                  Copied JSON to clipboard!
                </span>
              )}
            </button>

            <button
              id="proofing-submit-studio-btn"
              onClick={handleSubmitProofing}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Submit to Gabriella Miles</span>
            </button>
          </div>
        </div>

        {submittedToStudio && (
          <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center space-x-2.5 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Your selections and revision notes have been submitted directly to WD Photos Studio. We will begin fine-art color grading!
            </span>
          </div>
        )}

        {/* Progress & Stat Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800">
            <span className="text-[11px] text-neutral-400 block font-medium">Total Proofs</span>
            <span className="text-xl font-bold text-neutral-100 mt-1 block">{totalCount}</span>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800">
            <span className="text-[11px] text-emerald-400 block font-medium flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Approved</span>
            </span>
            <span className="text-xl font-bold text-emerald-300 mt-1 block">{approvedCount}</span>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800">
            <span className="text-[11px] text-amber-400 block font-medium flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>In Review</span>
            </span>
            <span className="text-xl font-bold text-amber-300 mt-1 block">{pendingCount}</span>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800">
            <span className="text-[11px] text-rose-400 block font-medium flex items-center space-x-1">
              <AlertCircle className="w-3 h-3" />
              <span>Changes / Decline</span>
            </span>
            <span className="text-xl font-bold text-rose-300 mt-1 block">{rejectedCount}</span>
          </div>
        </div>

        {/* Approval Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>Album Selection Progress</span>
            <span className="font-semibold text-neutral-200">{approvedPercentage}% Selected</span>
          </div>
          <div className="w-full h-2 rounded-full bg-neutral-950 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-500 rounded-full"
              style={{ width: `${approvedPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs for Proofing status */}
      <div className="flex items-center space-x-2 border-b border-neutral-800 pb-3">
        <button
          id="proof-tab-all"
          onClick={() => setSelectedStatusFilter('all')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            selectedStatusFilter === 'all'
              ? 'bg-neutral-800 text-amber-300 border border-neutral-700'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          All Proofs ({totalCount})
        </button>

        <button
          id="proof-tab-approved"
          onClick={() => setSelectedStatusFilter('approved')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 ${
            selectedStatusFilter === 'approved'
              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>Approved ({approvedCount})</span>
        </button>

        <button
          id="proof-tab-pending"
          onClick={() => setSelectedStatusFilter('pending')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 ${
            selectedStatusFilter === 'pending'
              ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Clock className="w-3 h-3 text-amber-400" />
          <span>Pending Review ({pendingCount})</span>
        </button>

        <button
          id="proof-tab-rejected"
          onClick={() => setSelectedStatusFilter('rejected')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 ${
            selectedStatusFilter === 'rejected'
              ? 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <AlertCircle className="w-3 h-3 text-rose-400" />
          <span>Declined ({rejectedCount})</span>
        </button>
      </div>

      {/* Grid of Proofing Photos */}
      {filteredPhotos.length === 0 ? (
        <div className="text-center py-16 bg-neutral-900/40 rounded-xl border border-neutral-800">
          <p className="text-neutral-400 text-sm">No photos found with this proofing status.</p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
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
