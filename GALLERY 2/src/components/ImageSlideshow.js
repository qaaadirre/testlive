import React, { useState, useEffect } from 'react';

const ImageSlideshow = () => {
  const photosPath = process.env.REACT_APP_PHOTOS_PATH || 'https://raw.githubusercontent.com/qaaadirre/INDOGF/main/qaaadir';
  const images = [
    `${photosPath}/photo1.jpg`,
    `${photosPath}/photo2.jpg`,
    `${photosPath}/photo3.jpg`,
    `${photosPath}/photo4.jpg`,
    `${photosPath}/photo5.jpg`,
    `${photosPath}/photo6.jpg`
  ];

  const texts = [
    "Hello, little cutie~",
    "When we first met, the girl's serious little eyes, hehe",
    "I was also comparing my feelings at that time~(. ・ω・。) ノ♡",
    "It's my first time to go to Chongqing to meet a girl, and a little fairy appears",
    "By the river, the moonlight is so beautiful tonight",
    "Walking with claws, happy~o(≧v≦)o"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev+1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div id="imgTxt" style={{position:'relative', zIndex:1, marginTop:'50px'}}>
      <img src={images[index]} alt="photo" style={{
        width:'320px', height:'400px', borderRadius:'16px',
        boxShadow:'0 8px 25px rgba(255,105,135,0.3)',
        objectFit:'contain', backdropFilter:'blur(5px)',
      }} />
      <div id="Txt" style={{marginTop:'10px', textAlign:'center'}}>
        {texts[index]}
      </div>
    </div>
  );
};

export default ImageSlideshow;
