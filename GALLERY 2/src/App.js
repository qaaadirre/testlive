import React from 'react';
import Timer from './components/Timer';
import TypeWriter from './components/TypeWriter';
import ImageSlideshow from './components/ImageSlideshow';
import HeartBackground from './components/HeartBackground';
import './styles.css';

function App() {
  return (
    <div className="App">
      <audio autoPlay loop>
        <source src="music/music.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating hearts */}
      <HeartBackground />

      {/* Center photo card */}
      <ImageSlideshow />

      {/* Top timer */}
      <div id="content">
        <h2>We have been together</h2>
        <Timer />
      </div>

      {/* Bottom typewriter */}
      <TypeWriter />

      <footer>
        Made with ❤️ by <span>Qaaadir</span>
      </footer>
    </div>
  );
}

export default App;
