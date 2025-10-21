import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  MapPin, Globe, Heart, X, ChevronLeft, ChevronRight, Star, Plane,
  MessageCircle, Camera, Sparkles, Music, Gift
} from 'lucide-react';

const App = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  // Get the photos path from environment variable
  const photosPath = process.env.REACT_APP_PHOTOS_PATH || 'public/ell';

  // Photo paths using the environment variable path
  const photos = useMemo(() => [
    { 
      id: 1, 
      src: `https://i.ibb.co/LDSzZXpS/Whats-App-Image-2025-09-15-at-19-03-47-b658db6d.jpg`, 
      caption: 'First Beautiful Memory 🌸', 
      location: 'Special Place',
      date: '2024'
    },
    { 
      id: 2, 
      src: `${photosPath}/photo2.jpg`, 
      caption: 'Precious Moments Together 💫', 
      location: 'Heartwarming Spot',
      date: '2024'
    },
    { 
      id: 3, 
      src: `${photosPath}/photo3.jpg`, 
      caption: 'Unforgettable Times ✨', 
      location: 'Memory Lane',
      date: '2024'
    },
    { 
      id: 4, 
      src: `${photosPath}/photo4.jpg`, 
      caption: 'Wonderful Days 🌟', 
      location: 'Happy Place',
      date: '2024'
    },
    { 
      id: 5, 
      src: `${photosPath}/photo5.jpg`, 
      caption: 'Amazing Memories 💖', 
      location: 'Special Corner',
      date: '2024'
    },
    { 
      id: 6, 
      src: `${photosPath}/photo6.jpg`, 
      caption: 'Cherished Moments 🌈', 
      location: 'Beautiful Memory',
      date: '2024'
    },
  ], [photosPath]);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 300);
  }, []);

  const openPhoto = useCallback((photo, index) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  }, []);

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

  const toggleMusic = useCallback(() => {
    setMusicPlaying(!musicPlaying);
  }, [musicPlaying]);

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

  // Floating hearts background
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
        >
          ❤️
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-pink-50 relative overflow-hidden">
      <FloatingHearts />
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-love-pattern opacity-10 z-0"></div>

      {/* Music Player */}
      <button
        onClick={toggleMusic}
        className={`fixed top-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${
          musicPlaying 
            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white animate-glow' 
            : 'bg-white/80 backdrop-blur-sm text-orange-600 hover:bg-white'
        }`}
      >
        <Music size={24} fill={musicPlaying ? "currentColor" : "none"} />
      </button>

      {/* Hero Section */}
      <header className="relative pt-20 pb-24 px-4 z-10">
        <div className={`max-w-6xl mx-auto text-center transform transition-all duration-1000 ${
          loaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
        }`}>
          
          {/* Animated Title */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text bg-clip-text text-transparent">
              Our Special Bond
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-light">
              Where Distance Fades and Friendship Shines ✨
            </p>
          </div>

          {/* Flags and Distance */}
          <div className="flex justify-center items-center gap-8 mb-12">
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="text-7xl mb-3 float-element">🇮🇳</div>
              <p className="text-lg font-semibold text-gray-800">India</p>
              <p className="text-sm text-gray-600">Kochi</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="relative">
                <Plane className="text-orange-500 animate-bounce-custom mb-4" size={40} />
                <Sparkles className="absolute -top-2 -right-2 text-yellow-500 animate-pulse" size={20} />
              </div>
              <div className="flex items-center gap-3 text-lg text-gray-700 font-medium">
                <Globe size={20} />
                <span>~4,500 km apart</span>
              </div>
              <p className="text-sm text-gray-500 mt-2 font-light">but hearts connected 💝</p>
            </div>

            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="text-7xl mb-3 float-element" style={{animationDelay: '1s'}}>🇮🇩</div>
              <p className="text-lg font-semibold text-gray-800">Indonesia</p>
              <p className="text-sm text-gray-600">Beautiful Soul</p>
            </div>
          </div>

          {/* Special Message */}
          <div className="mt-12 max-w-3xl mx-auto glass-effect rounded-3xl p-8 shadow-2xl border border-white/50">
            <div className="flex items-center justify-center gap-3 mb-6">
              <MessageCircle className="text-orange-500" size={28} />
              <h2 className="text-2xl font-bold text-gray-800">A Message From My Heart</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed italic text-center font-light">
              "In the vast ocean that separates our lands, our friendship stands as a beautiful bridge. 
              You've colored my world with joy, laughter, and precious memories that I'll cherish forever. 
              No distance can diminish the bond we share. Thank you for being such an amazing friend! 🌸"
            </p>
            <div className="mt-6 flex items-center justify-center gap-3 text-orange-600">
              <Heart className="heart-pulse" size={20} fill="currentColor" />
              <span className="font-semibold">From your friend in India</span>
              <Heart className="heart-pulse" size={20} fill="currentColor" />
            </div>
          </div>
        </div>
      </header>

      {/* Photo Gallery */}
      <main className="max-w-7xl mx-auto px-4 pb-32 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-6">
            <Camera className="text-orange-500" size={32} />
            <h2 className="text-4xl font-bold text-gray-800">Our Precious Memories</h2>
            <Camera className="text-orange-500" size={32} />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Every snapshot tells the beautiful story of our friendship - 
            moments filled with laughter, love, and unforgettable memories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-400 to-pink-500 opacity-10 rounded-bl-full"></div>
                  
                  {/* Main Photo */}
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Cdefs%3E%3ClinearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23fed7aa;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23fecaca;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="400" fill="url(%23grad)"/%3E%3Ctext x="50%25" y="42%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="48" fill="%23c2410c"%3E%F0%9F%93%B7%3C/text%3E%3Ctext x="50%25" y="60%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="18" fill="%23dc2626"%3E${encodeURIComponent(photo.caption)}%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                    <p className="text-white text-xl font-semibold mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {photo.caption}
                    </p>
                    <div className="flex items-center justify-between transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-2 text-white/90">
                        <MapPin size={16} />
                        <span className="text-sm">{photo.location}</span>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <Star key={i} className="text-yellow-400" size={18} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Photo Number Badge */}
                  <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-lg">
                    <span className="text-sm font-bold text-orange-600">#{String(index + 1).padStart(2, '0')}</span>
                  </div>

                  {/* Date Badge */}
                  <div className="absolute top-5 right-5 bg-black/70 backdrop-blur-sm rounded-2xl px-3 py-2">
                    <span className="text-sm font-medium text-white">{photo.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={closePhoto}
            className="absolute top-6 right-6 text-white hover:text-orange-400 transition-all duration-300 z-10 bg-white/10 rounded-2xl p-4 backdrop-blur-sm hover:bg-white/20 hover:scale-110"
          >
            <X size={28} />
          </button>

          <button
            onClick={prevPhoto}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-orange-400 transition-all duration-300 z-10 bg-white/10 rounded-2xl p-4 backdrop-blur-sm hover:bg-white/20 hover:scale-110"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={nextPhoto}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-orange-400 transition-all duration-300 z-10 bg-white/10 rounded-2xl p-4 backdrop-blur-sm hover:bg-white/20 hover:scale-110"
          >
            <ChevronRight size={32} />
          </button>

          <div className="max-w-6xl max-h-[90vh] flex flex-col items-center">
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.caption}
              className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
              onError={(e) => {
                e.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"%3E%3Cdefs%3E%3ClinearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23fed7aa;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23fecaca;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="800" height="600" fill="url(%23grad)"/%3E%3Ctext x="50%25" y="45%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="72" fill="%23c2410c"%3E%F0%9F%93%B7%3C/text%3E%3Ctext x="50%25" y="60%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="28" fill="%23dc2626"%3E${encodeURIComponent(selectedPhoto.caption)}%3C/text%3E%3C/svg%3E`;
              }}
            />
            <div className="mt-8 text-center glass-effect rounded-2xl p-8 backdrop-blur-md border border-white/20">
              <h3 className="text-white text-3xl font-bold mb-4">{selectedPhoto.caption}</h3>
              <div className="flex items-center justify-center gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin size={20} />
                  <span>{selectedPhoto.location}</span>
                </div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>{selectedPhoto.date}</span>
              </div>
              <p className="text-gray-400 text-lg mt-4">
                Memory {currentIndex + 1} of {photos.length} • Forever Cherished 💖
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative bg-gradient-to-r from-orange-100/80 to-pink-100/80 border-t border-orange-200/50 py-16 mt-20 backdrop-blur-sm z-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-6 mb-8">
            <span className="text-4xl transform hover:scale-110 transition-transform duration-300">🇮🇳</span>
            <Gift className="text-red-500 heart-pulse" size={40} />
            <span className="text-4xl transform hover:scale-110 transition-transform duration-300">🇮🇩</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 mb-4 gradient-text bg-clip-text text-transparent">
            Friendship Knows No Borders
          </p>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
            This digital memory book is a small token of appreciation for the incredible friendship we share. 
            No matter the distance, you'll always have a special place in my heart.
          </p>
          <div className="flex items-center justify-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Heart size={20} className="text-red-500" fill="currentColor" />
              <span>Made with Love</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span>India to Indonesia</span>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span>Forever Friends</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
