import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface GridPhoto {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
}

const NINE_PHOTOS: GridPhoto[] = [
  {
    id: 'photo-1',
    title: 'Football',
    description: 'Powerful plays, fast breaks, and the teamwork that makes every drive count.',
    category: 'Team Sports',
    url: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=800&h=800&q=80',
  },
  {
    id: 'photo-2',
    title: 'Football',
    description: 'Game-day focus, explosive movement, and the energy of every play.',
    category: 'Team Sports',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDfb3_asN8jx9IfaYkERj4gYXCQs0z8HAnNtZ1yBt9vw&s=10',
  },
  {
    id: 'photo-3',
    title: 'Football',
    description: 'Strength, speed, and teamwork captured in the middle of the action.',
    category: 'Team Sports',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI2x9ytrV_tnOIyoFSWf1yqmFvrlZw4VSnbP1bhGCJ8A&s=10',
  },
  {
    id: 'photo-4',
    title: 'Baseball',
    description: 'A classic swing, a perfectly placed pitch, and the excitement of the diamond.',
    category: 'Diamond Sports',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHRFJW5qfjcaBVZi9YRNSEiGV4DF9wjltagYo1X2Rvg&s=10',
  },
  {
    id: 'photo-5',
    title: 'Baseball',
    description: 'Sharp focus, quick reactions, and the anticipation of the next pitch.',
    category: 'Diamond Sports',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6J07Z-ceqFnmqedAbhyGLicq3hA3kMoJD25bwAah8aw&s=10',
  },
  {
    id: 'photo-6',
    title: 'Baseball',
    description: 'The crack of the bat, a fast runner, and the timeless spirit of the game.',
    category: 'Diamond Sports',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMNYxJvEY_FO07ER35n7vG5mG_dNl9i1ALbDGsx1MKwQ&s=10',
  },
  {
    id: 'photo-7',
    title: 'Soccer',
    description: 'Quick footwork, creative passes, and nonstop energy from kickoff to the final whistle.',
    category: 'Individual Sports',
    url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&h=800&q=80',
  },
  {
    id: 'photo-8',
    title: 'Basketball',
    description: 'Fast cuts, high-flying rebounds, and the focus needed for the perfect shot.',
    category: 'Team Sports',
    url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&h=800&q=80',
  },
  {
    id: 'photo-9',
    title: 'Volleyball',
    description: 'Strong serves, quick sets, and perfectly timed teamwork above the net.',
    category: 'Team Sports',
    url: 'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=800&h=800&q=80',
  },
];

export function App() {
  const [selectedPhoto, setSelectedPhoto] = useState<GridPhoto | null>(null);

  return (
    <div
      id="gallery-page"
      className="min-h-screen bg-[#f3e8ff] py-10 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden font-sans"
      style={{
        background: 'radial-gradient(circle at 50% 10%, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%)',
      }}
    >
      {/* Background ambient accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-pink-200/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-purple-300/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Simple Header */}
        <header id="gallery-header" className="text-center mb-10 sm:mb-14">
          <h1
            id="page-title"
            className="text-4xl sm:text-6xl font-bold tracking-tight text-[#9d174d] mb-2 leading-tight"
            style={{
              fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
            }}
          >
            Gabriella Miles Sports
          </h1>
          <p
            id="dob-text"
            className="text-base sm:text-lg text-[#be185d] font-medium tracking-wide"
            style={{
              fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
            }}
          >
            Date of Birth: 06/15/12
          </p>
        </header>

        {/* 9 Photo Grid: 3 Rows x 3 Columns (All Equal Dimensions) */}
        <main id="photo-grid-container">
          <div
            id="photos-3x3-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {NINE_PHOTOS.map((photo, index) => (
              <article
                key={photo.id}
                id={`photo-card-${photo.id}`}
                onClick={() => setSelectedPhoto(photo)}
                className="group cursor-pointer bg-white/90 backdrop-blur-xs rounded-2xl overflow-hidden border border-pink-200/80 shadow-[0_10px_30px_rgba(157,23,77,0.06)] hover:shadow-[0_20px_40px_rgba(157,23,77,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Equal Dimension (1:1 Aspect Ratio Square Image) */}
                <div className="relative w-full aspect-square overflow-hidden bg-pink-50">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    loading={index < 3 ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 justify-between">
                    <span className="text-white text-xs font-medium bg-black/40 backdrop-blur-md px-3 py-1 rounded-full">
                      {photo.category}
                    </span>
                    <span className="text-white bg-pink-600/90 rounded-full p-2">
                      <ZoomIn className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Title and Descriptive Text */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#be185d] bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">
                        {photo.category}
                      </span>
                      <span className="text-xs font-mono text-neutral-400">
                        0{index + 1} / 09
                      </span>
                    </div>
                    <h3
                      id={`title-${photo.id}`}
                      className="text-xl font-bold text-[#9d174d] mb-2 leading-snug group-hover:text-[#be185d] transition-colors"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      {photo.title}
                    </h3>
                    <p
                      id={`desc-${photo.id}`}
                      className="text-neutral-600 text-sm leading-relaxed"
                    >
                      {photo.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-pink-200/60 text-center text-xs text-neutral-500">
            <p>WD Photos &bull; Gabriella Miles Sports &bull; 9-Sport Showcase</p>
        </footer>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          id="photo-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative bg-white rounded-2xl overflow-hidden max-w-2xl w-full border border-pink-200 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              id="close-modal-btn"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full aspect-square bg-neutral-900">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#be185d]">
                {selectedPhoto.category}
              </span>
              <h2
                className="text-2xl font-bold text-[#9d174d] mt-1 mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {selectedPhoto.title}
              </h2>
              <p className="text-neutral-700 text-sm leading-relaxed">
                {selectedPhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
