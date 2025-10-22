import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { 
  MapPin, Globe, Heart, X, ChevronLeft, ChevronRight, Star, Plane,
  MessageCircle, Camera, Sparkles, Music, Gift
} from 'lucide-react';

// Tailwind CSS Utility Styles for Animation and Custom Classes
// We assume these custom utilities are defined or interpreted by the Tailwind environment:
// - .animate-float: For FloatingHearts
// - .animate-glow: For Music Button
// - .animate-bar: For Music Visualizer
// - .animate-bounce-custom: For Plane icon
// - .heart-pulse: For Footer Hearts
// - .gradient-text: For text color gradient
// - .glass-effect: For the Special Message box

const App = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const audioRef = useRef(null);

  // Environment variables
  const placename = process.env.REACT_APP_PLACE_NAME || 'INDONESIA'; // Default fallback updated for consistency
  const photosPath = process.env.REACT_APP_PHOTOS_PATH || 'https://raw.githubusercontent.com/qaaadirre/INDOGF/refs/heads/main/A/B/C/D/E/F/G/H/I/M/N/O/GDGDG/DJDJD/DJDJDJGDJGJD/DJDHJJ/lia';
  const musicUrl = process.env.REACT_APP_MUSIC_URL || 'https://raw.githubusercontent.com/qaaadirre/INDOGF/refs/heads/main/A/B/C/D/E/F/G/H/I/M/N/O/GDGDG/DJDJD/DJDJDJGDJGJD/DJDHJJ/lia/tosanaina.mp3';

  const photos = useMemo(() => [
    { id: 1, src: `${photosPath}/photo1.jpg`, caption: 'First Beautiful Memory 🌸', location: 'Special Place', date: '2025' },
    { id: 2, src: `${photosPath}/photo2.jpg`, caption: 'Precious Moments Together 💫', location: 'Heartwarming Spot', date: '2025' },
    { id: 3, src: `${photosPath}/photo3.jpg`, caption: 'Unforgettable Times ✨', location: 'Memory Lane', date: '2025' },
    { id: 4, src: `${photosPath}/photo4.jpg`, caption: 'Wonderful Days 🌟', location: 'Happy Place', date: '2025' },
    { id: 5, src: `${photosPath}/photo5.jpg`, caption: 'Amazing Memories 💖', location: 'Special Corner', date: '2025' },
    { id: 6, src: `${photosPath}/photo6.jpg`, caption: 'Cherished Moments 🌈', location: 'Beautiful Memory', date: '2025' },
  ], [photosPath]);

  // Simulate loading delay for initial animation transition
  useEffect(() => {
    setTimeout(() => setLoaded(true), 300);
  }, []);

  // Lightbox Handlers
  const openPhoto = useCallback((photo, index) => { setSelectedPhoto(photo); setCurrentIndex(index); }, []);
  const closePhoto = useCallback(() => setSelectedPhoto(null), []);
  const nextPhoto = useCallback(() => { 
    const newIndex = (currentIndex + 1) % photos.length; 
    setCurrentIndex(newIndex); 
    setSelectedPhoto(photos[newIndex]); 
  }, [currentIndex, photos]);
  const prevPhoto = useCallback(() => { 
    const newIndex = (currentIndex - 1 + photos.length) % photos.length; 
    setCurrentIndex(newIndex); 
    setSelectedPhoto(photos[newIndex]); 
  }, [currentIndex, photos]);

  // Music Controls
  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
    } else {
      // Attempt to play, catch potential autoplay errors
      audioRef.current.play().catch(err => console.log('Autoplay blocked:', err));
    }
    setMusicPlaying(!musicPlaying);
  }, [musicPlaying]);

  // Keyboard Navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedPhoto) return;
      if (e.key === 'Escape') closePhoto();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, currentIndex, nextPhoto, prevPhoto, closePhoto]);

  // Decorative Component
  const FloatingHearts = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute text-red-400 opacity-20 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${20 + Math.random() * 30}px`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${4 + Math.random() * 4}s`
          }}
        >❤️</div>
      ))}
    </div>
  );

  return (
    // Responsive root container
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-pink-50 relative overflow-hidden">
      <style jsx global>{`
        /* Custom Keyframes and Utility Classes */
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          25% { opacity: 0.2; }
          50% { transform: translateY(-50vh) rotate(5deg); }
          75% { opacity: 0.1; }
          100% { transform: translateY(-100vh) rotate(-5deg); opacity: 0; }
        }
        .animate-float {
          animation: float;
          animation-iteration-count: infinite;
        }

        .heart-pulse {
          animation: pulse 1s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .animate-glow {
          box-shadow: 0 0 10px #f97316, 0 0 20px #dc2626;
        }

        @keyframes bar-animation {
          0%, 100% { height: 20%; }
          50% { height: 100%; }
        }
        .animate-bar {
          animation: bar-animation 0.6s ease-in-out infinite alternate;
        }
        
        .gradient-text {
          background-image: linear-gradient(to right, #f97316, #dc2626);
        }
        
        /* Glassmorphism Effect for Modal/Message Box */
        .glass-effect {
          background-color: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        /* Custom Bounce for Plane */
        @keyframes bounce-custom {
          0%, 100% { transform: translateY(0) rotate(5deg); }
          50% { transform: translateY(-5px) rotate(-5deg); }
        }
        .animate-bounce-custom {
          animation: bounce-custom 1.5s infinite ease-in-out;
        }

        /* Float for Emojis */
        .float-element {
          animation: float-element-animation 3s ease-in-out infinite alternate;
        }
        @keyframes float-element-animation {
          0% { transform: translateY(0); }
          100% { transform: translateY(-5px); }
        }

        /* Decorative background pattern (Mocked) */
        .bg-love-pattern {
          background-image: radial-gradient(#f97316 1px, transparent 1px), radial-gradient(#dc2626 1px, transparent 1px);
          background-size: 20px 20px;
          background-position: 0 0, 10px 10px;
        }

        /* Custom Shadow for Gallery Cards */
        .shadow-3xl {
          box-shadow: 0 20px 25px -5px rgba(249, 115, 22, 0.3), 0 10px 10px -5px rgba(220, 38, 38, 0.3);
        }
      `}</style>

      <FloatingHearts />
      
      {/* Audio element */}
      <audio ref={audioRef} src={musicUrl} loop />

      {/* Music Button with Visualizer (Fixed position for all sizes) */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-3">
        <button
          onClick={toggleMusic}
          className={`p-3 sm:p-4 rounded-full shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300/50 ${
            musicPlaying
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white animate-glow'
              : 'bg-white/80 backdrop-blur-sm text-orange-600 hover:bg-white'
          }`}
          aria-label={musicPlaying ? "Pause music" : "Play music"}
        >
          <Music size={24} fill={musicPlaying ? 'currentColor' : 'none'} />
        </button>

        {musicPlaying && (
          <div className="flex gap-[3px] items-end h-5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-[3px] bg-orange-500 rounded-full animate-bar"
                style={{ animationDelay: `${i * 0.15}s` }}
              ></div>
            ))}
          </div>
        )}
      </div>

    {/* Background pattern */}
    <div className="absolute inset-0 bg-love-pattern opacity-10 z-0"></div>

      {/* Hero Section */}
      <header className="relative pt-16 pb-20 px-4 z-10">
        <div className={`max-w-6xl mx-auto text-center transform transition-all duration-1000 ${
          loaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
        }`}>
          
          {/* Animated Title */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-3 gradient-text bg-clip-text text-transparent">
              Our Special Bond
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 font-light max-w-4xl mx-auto px-2">
              Where Distance Fades and Friendship Shines ✨
            </p>
          </div>

          {/* Flags and Distance (Responsive Layout) */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 mb-10 sm:mb-12">
            
            {/* My Location */}
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              {/* Responsive Emoji Size: text-5xl on mobile, text-7xl on md+ */}
              <div className="text-5xl md:text-7xl mb-2 float-element">ME</div>
              <p className="text-base sm:text-lg font-semibold text-gray-800">INDIA</p>
              <p className="text-xs sm:text-sm text-gray-600">Kochi</p>
            </div>
            
            {/* Distance Indicator */}
            <div className="flex flex-col items-center py-4">
              <div className="relative">
                <Plane className="text-orange-500 animate-bounce-custom mb-2" size={40} />
                <Sparkles className="absolute -top-2 -right-2 text-yellow-500 animate-pulse" size={20} />
              </div>
              <div className="flex items-center gap-2 text-base sm:text-lg text-gray-700 font-medium mt-1">
                <Globe size={18} />
                <span>~4,500 km apart</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 font-light">but hearts connected 💝</p>
            </div>

            {/* Your Location */}
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              {/* Responsive Emoji Size: text-5xl on mobile, text-7xl on md+ */}
              <div className="text-5xl md:text-7xl mb-2 float-element" style={{animationDelay: '1s'}}>YOU</div>
              <p className="text-base sm:text-lg font-semibold text-gray-800">{placename}</p>
              <p className="text-xs sm:text-sm text-gray-600">Beautiful Soul</p>
            </div>
          </div>

          {/* Special Message (Responsive Padding and Text Size) */}
          <div className="mt-8 max-w-3xl mx-auto glass-effect rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/50">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <MessageCircle className="text-orange-500" size={28} />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">A Message From My Heart</h2>
            </div>
            <p className="text-sm sm:text-lg text-gray-700 leading-relaxed italic text-center font-light">
              "In the vast ocean that separates our lands, our friendship stands as a beautiful bridge. 
              You've colored my world with joy, laughter, and precious memories that I'll cherish forever. 
              No distance can diminish the bond we share. Thank you for being such an amazing friend! 🌸"
            </p>
            <div className="mt-4 sm:mt-6 flex items-center justify-center gap-3 text-orange-600">
              <Heart className="heart-pulse" size={18} fill="currentColor" />
              <span className="font-semibold text-sm sm:text-base">From your friend in India</span>
              <Heart className="heart-pulse" size={18} fill="currentColor" />
            </div>
          </div>
        </div>
      </header>

      {/* Photo Gallery (Responsive Grid) */}
      <main className="max-w-7xl mx-auto px-4 pb-24 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <Camera className="text-orange-500" size={32} />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Our Precious Memories</h2>
            <Camera className="text-orange-500" size={32} />
          </div>
          <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Every snapshot tells the beautiful story of our friendship - 
            moments filled with laughter, love, and unforgettable memories
          </p>
        </div>

        {/* Gallery grid adapts perfectly: 1 column on mobile, 2 on medium, 3 on large */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className={`group relative cursor-pointer transform transition-all duration-700 ${
                loaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onClick={() => openPhoto(photo, index)}
            >
              {/* Photo Card */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-orange-100 to-pink-100 border-2 border-white/50 group-hover:border-orange-300/50 transition-all duration-500 group-hover:shadow-3xl">
                
                {/* Photo Container */}
                <div className="aspect-square relative overflow-hidden">
                  
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-bl from-orange-400 to-pink-500 opacity-10 rounded-bl-full"></div>
                  
                  {/* Main Photo */}
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    // Fallback to SVG placeholder on error
                    onError={(e) => {
                      e.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Cdefs%3E%3ClinearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23fed7aa;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23fecaca;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="400" fill="url(%23grad)"/%3E%3Ctext x="50%25" y="42%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="48" fill="%23c2410c"%3E%F0%9F%93%B7%3C/text%3E%3Ctext x="50%25" y="60%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="18" fill="%23dc2626"%3E${encodeURIComponent(photo.caption)}%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                  
                  {/* Overlay (Responsive Padding) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4 sm:p-6">
                    <p className="text-white text-lg sm:text-xl font-semibold mb-2 sm:mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {photo.caption}
                    </p>
                    <div className="flex items-center justify-between transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-2 text-white/90">
                        <MapPin size={16} />
                        <span className="text-xs sm:text-sm">{photo.location}</span>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <Star key={i} className="text-yellow-400" size={16} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Photo Number Badge */}
                  <div className="absolute top-4 left-4 sm:top-5 sm:left-5 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl px-3 py-1 shadow-lg">
                    <span className="text-xs sm:text-sm font-bold text-orange-600">#{String(index + 1).padStart(2, '0')}</span>
                  </div>

                  {/* Date Badge */}
                  <div className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-black/70 backdrop-blur-sm rounded-xl sm:rounded-2xl px-3 py-1">
                    <span className="text-xs sm:text-sm font-medium text-white">{photo.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox Modal (Fully Responsive) */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          
          {/* Close Button (Large touch target) */}
          <button
            onClick={closePhoto}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-orange-400 transition-all duration-300 z-10 bg-white/10 rounded-full p-3 sm:p-4 backdrop-blur-sm hover:bg-white/20 hover:scale-110"
            aria-label="Close photo"
          >
            <X size={28} />
          </button>

          {/* Previous Button (Large touch target) */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-orange-400 transition-all duration-300 z-10 bg-white/10 rounded-full p-3 sm:p-4 backdrop-blur-sm hover:bg-white/20 hover:scale-110"
            aria-label="Previous photo"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Next Button (Large touch target) */}
          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-orange-400 transition-all duration-300 z-10 bg-white/10 rounded-full p-3 sm:p-4 backdrop-blur-sm hover:bg-white/20 hover:scale-110"
            aria-label="Next photo"
          >
            <ChevronRight size={32} />
          </button>

          <div className="max-w-6xl max-h-[95vh] flex flex-col items-center">
            {/* Image display (constrained by viewport height) */}
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.caption}
              className="w-full max-w-full max-h-[60vh] sm:max-h-[75vh] object-contain rounded-xl sm:rounded-2xl shadow-2xl"
              onError={(e) => {
                e.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"%3E%3Cdefs%3E%3ClinearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23fed7aa;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23fecaca;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="800" height="600" fill="url(%23grad)"/%3E%3Ctext x="50%25" y="45%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="72" fill="%23c2410c"%3E%F0%9F%93%B7%3C/text%3E%3Ctext x="50%25" y="60%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="28" fill="%23dc2626"%3E${encodeURIComponent(selectedPhoto.caption)}%3C/text%3E%3C/svg%3E`;
              }}
            />
            {/* Caption (Responsive Padding and Text Size) */}
            <div className="mt-4 sm:mt-8 text-center glass-effect rounded-2xl p-4 sm:p-8 backdrop-blur-md border border-white/20 w-full">
              <h3 className="text-white text-xl sm:text-3xl font-bold mb-3 sm:mb-4">{selectedPhoto.caption}</h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>{selectedPhoto.location}</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>{selectedPhoto.date}</span>
              </div>
              <p className="text-gray-400 text-sm sm:text-lg mt-3 sm:mt-4">
                Memory {currentIndex + 1} of {photos.length} • Forever Cherished 💖
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer (Responsive Padding and Text Size) */}
      <footer className="relative bg-gradient-to-r from-orange-100/80 to-pink-100/80 border-t border-orange-200/50 py-12 sm:py-16 mt-16 sm:mt-20 backdrop-blur-sm z-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            <span className="text-3xl sm:text-4xl transform hover:scale-110 transition-transform duration-300">ME</span>
            <Gift className="text-red-500 heart-pulse" size={40} />
            <span className="text-3xl sm:text-4xl transform hover:scale-110 transition-transform duration-300">YOU</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 gradient-text bg-clip-text text-transparent">
            Friendship Knows No Borders
          </p>
          <p className="text-sm sm:text-lg text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
            This digital memory book is a small token of appreciation for the incredible friendship we share. 
            No matter the distance, you'll always have a special place in my heart.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-gray-600 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <Heart size={18} className="text-red-500" fill="currentColor" />
              <span>Made with Love</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
            <span>INDIA to {placename}</span>
            <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
            <span>Forever Friends</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
