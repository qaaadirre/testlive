import React, { useEffect, useState } from 'react';

const TypeWriter = () => {
  const name = process.env.REACT_APP_NAME || 'Qaaadir';
  const textArray = [name, 'Do you know thaaat!'];
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (charIndex < textArray[textIndex].length) {
        setDisplayText(prev => prev + textArray[textIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => {
          setDisplayText('');
          setCharIndex(0);
          setTextIndex((prev) => (prev + 1) % textArray.length);
        }, 1500);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [charIndex, textIndex, textArray]);

  return (
    <div id="typeDiv">
      <span>{displayText}</span>
    </div>
  );
};

export default TypeWriter;
