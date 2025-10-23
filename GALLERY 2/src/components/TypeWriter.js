import React, { useEffect, useState } from 'react';

const TypeWriter = () => {
  const name = process.env.REACT_APP_NAME || 'Qaaadir';
  const texts = [
    `Hi ${name}~  Do you know that , this is our friendship days count  till now `
  ];

  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (charIndex < texts[textIndex].length) {
        setDisplayText(prev => prev + texts[textIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => {
          setDisplayText('');
          setCharIndex(0);
          setTextIndex(prev => (prev + 1) % texts.length);
        }, 2000);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [charIndex, textIndex, texts]);

  return (
    <div className="typewriter-container">
      <h3 className="typewriter-text">{displayText}</h3>
    </div>
  );
};

export default TypeWriter;
