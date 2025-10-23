import React from 'react';
import HeartBackground from './components/HeartBackground';
import Timer from './components/Timer';
import ImageSlideshow from './components/ImageSlideshow';
import TypeWriter from './components/TypeWriter';
import './styles.css';

function App() {
  return (
    <div className="App">
      <audio autoPlay loop>
        <source src="music/music.mp3" type="audio/mpeg" />
      </audio>

      <HeartBackground />

      {/* Header – Timer */}
      <header className="header">
        <Timer />
      </header>

      {/* Main Content */}
      <main className="main">
        {/* Typewriter now above image card */}
        <TypeWriter />
        <ImageSlideshow />
      </main>

      {/* Footer */}
      <footer className="footer">
        Made with ❤️ by Qaaadir
      </footer>
    </div>
  );
}

export default App;
