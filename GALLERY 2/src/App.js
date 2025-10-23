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

      <header style={{position:'fixed', top:'20px', width:'100%', textAlign:'center', zIndex:2}}>
        <Timer />
      </header>

      <main style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', zIndex:2, marginTop:'100px'}}>
        <ImageSlideshow />
        <TypeWriter />
      </main>

      <footer style={{position:'fixed', bottom:'0', width:'100%', textAlign:'center', zIndex:2, padding:'10px 0', background:'rgba(0,0,0,0.4)', color:'#fff'}}>
        Made with ❤️ by Qaaadir
      </footer>
    </div>
  );
}

export default App;
