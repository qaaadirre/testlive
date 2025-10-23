import React, { useState, useEffect } from 'react';

const ImageSlideshow = () => {
  const photosPath = process.env.REACT_APP_PHOTOS_PATH;
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
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % images.length), 2500);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleError = () => setIndex((prev) => (prev + 1) % images.length);

  return (
    <div id="imgTxt">
      <span id="Txt">{texts[index % texts.length]}</span>
      <img src={images[index]} alt="slideshow" onError={handleError} />
    </div>
  );
};

export default ImageSlideshow;
