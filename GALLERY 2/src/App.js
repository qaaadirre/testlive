import React, { useState } from 'react';
import Timer from './components/Timer';
import TypeWriter from './components/TypeWriter';
import ImageSlideshow from './components/ImageSlideshow';
import './styles.css';

function App() {
  const [showContent, setShowContent] = useState(true);

  return (
    <div className="App">
      <audio autoPlay loop>
        <source src="music/music.mp3" type="audio/mpeg" />
      </audio>

      <ImageSlideshow />

      {showContent && (
        <div id="content">
          <h2>We have been together</h2>
          <Timer />
        </div>
      )}

      <TypeWriter />

      <footer>
        Made with ❤️ by <span>{process.env.REACT_APP_NAME || 'Qaaadir'}</span>
      </footer>
    </div>
  );
}

export default App;
