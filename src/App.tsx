import React, { useState } from 'react';
import { ZoomIn, X, Trophy, Sparkles, Heart } from 'lucide-react';

export interface SportPhoto {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  accent: string;
}

const SPORTS_PHOTOS: SportPhoto[] = [
  // 3 Football Images
  {
    id: 'football-1',
    name: 'Football',
    category: 'Football',
    description: 'Game day intensity, stadium lights, and teamwork on the gridiron.',
    url: '/football.jpg',
    accent: '#9d174d',
  },
  {
    id: 'football-2',
    name: 'Football',
    category: 'Football',
    description: 'High-energy offensive drive, crisp passing, and athletic pursuit under the floodlights.',
    url: '/football-2.jpg',
    accent: '#9d174d',
  },
  {
    id: 'football-3',
    name: 'Football',
    category: 'Football',
    description: 'Breaking through the defensive line with speed, power, and team determination.',
    url: '/football-3.jpg',
    accent: '#9d174d',
  },

  // 3 Baseball Images
  {
    id: 'baseball-1',
    name: 'Baseball',
    category: 'Baseball',
    description: 'Stepping up to the plate with razor-sharp focus, ready to drive the ball deep into the outfield.',
    url: '/baseball-1.jpg',
    accent: '#be185d',
  },
  {
    id: 'baseball-2',
    name: 'Baseball',
    category: 'Baseball',
    description: 'High-speed pitch delivery from the mound, executing pinpoint command and control.',
    url: '/baseball-2.jpg',
    accent: '#be185d',
  },
  {
    id: 'baseball-3',
    name: 'Baseball',
    category: 'Baseball',
    description: 'Fielding a grounder at shortstop and turning a seamless double play.',
    url: '/baseball-3.jpg',
    accent: '#be185d',
  },

  // 3 Basketball Images
  {
    id: 'basketball-1',
    name: 'Basketball',
    category: 'Basketball',
    description: 'Fast breaks, precision dribbling, and soaring high to score at the rim.',
    url: '/basketball-1.jpg',
    accent: '#9d174d',
  },
  {
    id: 'basketball-2',
    name: 'Basketball',
    category: 'Basketball',
    description: 'Lockdown defense and smooth transition offense in full flow on the hardwood.',
    url: '/basketball-2.jpg',
    accent: '#9d174d',
  },
  {
    id: 'basketball-3',
    name: 'Basketball',
    category: 'Basketball',
    description: 'Sinking the buzzer-beater through the net under bright arena stadium lights.',
    url: '/basketball-3.jpg',
    accent: '#9d174d',
  },
];

export interface SportRow {
  id: string;
  title: string;
  rowLabel: string;
  description: string;
  photos: SportPhoto[];
  startIndex: number;
}

const SPORT_ROWS: SportRow[] = [
  {
    id: 'row-football',
    title: 'Football',
    rowLabel: 'Row 1',
    description: '3 Football Action Highlights',
    photos: SPORTS_PHOTOS.slice(0, 3),
    startIndex: 0,
  },
  {
    id: 'row-baseball',
    title: 'Baseball',
    rowLabel: 'Row 2',
    description: '3 Baseball Highlights',
    photos: SPORTS_PHOTOS.slice(3, 6),
    startIndex: 3,
  },
  {
    id: 'row-basketball',
    title: 'Basketball',
    rowLabel: 'Row 3',
    description: '3 Basketball Highlights',
    photos: SPORTS_PHOTOS.slice(6, 9),
    startIndex: 6,
  },
];

export function App() {
  const [selectedPhoto, setSelectedPhoto] = useState<SportPhoto | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div
      id="sports-gallery-page"
      className="min-h-screen bg-[#f3e8ff] py-10 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden font-sans"
      style={{
        background: 'radial-gradient(circle at 50% 8%, #faf5ff 0%, #f3e8ff 45%, #e9d5ff 100%)',
      }}
    >
      {/* Background ambient accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-pink-200/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-purple-300/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with Gabriella Miles and Date of Birth */}
        <header id="gallery-header" className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100 border border-pink-200 text-[#9d174d] text-xs font-semibold uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>Sports Portfolio & Showcase</span>
          </div>

          <h1
            id="page-title"
            className="text-4xl sm:text-6xl font-bold tracking-tight text-[#9d174d] mb-2 leading-tight drop-shadow-xs"
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontWeight: 500,
              letterSpacing: '0.02em',
              WebkitTextStroke: '0.2px currentColor',
            }}
          >
            Gabriella Miles
          </h1>

          <p
            id="dob-text"
            className="text-base sm:text-xl text-[#be185d] font-medium tracking-wide"
            style={{
              fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
            }}
          >
            Date of Birth: 06/15/12
          </p>

          <p className="mt-3 text-neutral-600 text-sm max-w-lg mx-auto">
            Organized in 3 rows of 3 images: Football (Row 1), Baseball (Row 2), and Basketball (Row 3).
          </p>
        </header>

        {/* 9 Sports Organized in Rows of 3 */}
        <main id="sports-grid-container" className="space-y-12 sm:space-y-16">
          {SPORT_ROWS.map((row) => (
            <section
              key={row.id}
              id={row.id}
              className="bg-white/40 backdrop-blur-xs p-4 sm:p-6 lg:p-8 rounded-3xl border border-pink-200/70 shadow-[0_8px_30px_rgba(157,23,77,0.04)]"
            >
              {/* Row Header */}
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-pink-200/60">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-[#be185d] bg-pink-100/90 border border-pink-200 px-3 py-1 rounded-full uppercase tracking-wider">
                    {row.rowLabel}
                  </span>
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-[#9d174d] tracking-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {row.title}
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[#be185d] font-semibold bg-pink-50/80 px-3 py-1 rounded-full border border-pink-100">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>3 Images</span>
                </div>
              </div>

              {/* Row of 3 Equal Dimensions Images */}
              <div
                id={`grid-${row.id}`}
                className="grid grid-cols-3 gap-3 sm:gap-6 lg:gap-8"
              >
                {row.photos.map((sport, colIdx) => {
                  const overallIndex = row.startIndex + colIdx;
                  const isFav = favorites.includes(sport.id);

                  return (
                    <article
                      key={sport.id}
                      id={`sport-card-${sport.id}`}
                      onClick={() => setSelectedPhoto(sport)}
                      className="group cursor-pointer bg-white/95 backdrop-blur-xs rounded-xl sm:rounded-2xl overflow-hidden border border-pink-200/90 shadow-[0_6px_20px_rgba(157,23,77,0.06)] hover:shadow-[0_16px_36px_rgba(157,23,77,0.14)] hover:-translate-y-1 transition-all duration-300 flex flex-col min-w-0"
                    >
                      {/* Equal 1:1 Aspect Ratio Square Image Container */}
                      <div className="relative w-full aspect-square overflow-hidden bg-pink-100/70">
                        <img
                          src={sport.url}
                          alt={sport.name}
                          loading={overallIndex < 3 ? 'eager' : 'lazy'}
                          className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Favorite Button on Top-Right */}
                        <button
                          id={`fav-btn-${sport.id}`}
                          onClick={(e) => toggleFavorite(sport.id, e)}
                          aria-label={`Favorite ${sport.name} photo`}
                          className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full bg-white/85 hover:bg-white backdrop-blur-md shadow-md text-pink-600 transition-transform active:scale-90"
                        >
                          <Heart
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFav ? 'fill-pink-600 text-pink-600' : 'text-neutral-600'}`}
                          />
                        </button>

                        {/* Sport Index Badge on Top-Left */}
                        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-black/60 backdrop-blur-md text-white font-mono text-[10px] sm:text-[11px] px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full">
                          0{overallIndex + 1}
                        </div>

                        {/* REQUIRED: Text on the BOTTOM OF THE IMAGE */}
                        <div
                          id={`bottom-label-${sport.id}`}
                          className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent pt-6 sm:pt-8 pb-2 sm:pb-3 px-2 sm:px-3.5 flex items-end justify-between text-white"
                        >
                          <div className="min-w-0">
                            <p className="text-[9px] sm:text-[10px] tracking-widest text-pink-200 uppercase font-medium truncate">
                              Sport
                            </p>
                            <h3 className="text-xs sm:text-base lg:text-lg font-bold tracking-wide uppercase drop-shadow-md text-white leading-tight truncate">
                              {sport.name}
                            </h3>
                          </div>
                          <span className="hidden xs:inline-block text-[10px] sm:text-[11px] bg-white/25 backdrop-blur-xs px-2 py-0.5 rounded-full font-medium text-white/95 whitespace-nowrap ml-1">
                            #{colIdx + 1}
                          </span>
                        </div>

                        {/* Subtle Hover Action Layer */}
                        <div className="absolute inset-0 bg-pink-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
                          <span className="bg-white/90 text-[#9d174d] rounded-full p-2 sm:p-3 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                            <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
                          </span>
                        </div>
                      </div>

                      {/* Card Content Below Image */}
                      <div className="p-3 sm:p-4 lg:p-5 flex-1 flex flex-col justify-between bg-white">
                        <div>
                          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-[#be185d] bg-pink-50 px-2 sm:px-2.5 py-0.5 rounded-full border border-pink-100">
                              {sport.category}
                            </span>
                            <span className="text-[10px] sm:text-xs font-mono text-neutral-400">
                              0{overallIndex + 1} / 09
                            </span>
                          </div>

                          <h4
                            id={`title-${sport.id}`}
                            className="text-sm sm:text-lg lg:text-xl font-bold text-[#9d174d] mb-1 sm:mb-1.5 leading-snug group-hover:text-[#be185d] transition-colors truncate"
                            style={{
                              fontFamily: "'Playfair Display', serif",
                            }}
                          >
                            {sport.name} #{colIdx + 1}
                          </h4>

                          <p
                            id={`desc-${sport.id}`}
                            className="text-neutral-600 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3"
                          >
                            {sport.description}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 sm:mt-4 sm:pt-3 border-t border-pink-100 flex items-center justify-between text-[11px] sm:text-xs text-[#be185d] font-medium">
                          <span>View photo</span>
                          <ZoomIn className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-70" />
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </main>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-pink-200/70 text-center text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-medium text-neutral-600">
            WD Photos &bull; Gabriella Miles Sports Showcase
          </p>
          <p>
            9 Signature Sports &bull; High Resolution Gallery
          </p>
        </footer>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          id="photo-lightbox-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative bg-white rounded-2xl overflow-hidden max-w-2xl w-full border border-pink-200 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              id="close-lightbox-btn"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              aria-label="Close sport preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full aspect-square bg-neutral-900">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 text-white">
                <span className="text-xs uppercase tracking-widest text-pink-300 font-semibold">
                  {selectedPhoto.category}
                </span>
                <h2
                  className="text-3xl font-bold mt-0.5 drop-shadow-md text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {selectedPhoto.name}
                </h2>
              </div>
            </div>

            <div className="p-6">
              <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
                {selectedPhoto.description}
              </p>
              <div className="mt-5 pt-4 border-t border-pink-100 flex items-center justify-between text-xs text-neutral-500">
                <span>Athlete Showcase &bull; Gabriella Miles</span>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="px-4 py-2 rounded-xl bg-pink-700 text-white font-medium hover:bg-pink-800 transition-colors"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
