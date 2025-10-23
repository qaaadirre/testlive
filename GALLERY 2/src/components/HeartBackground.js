import React, { useEffect, useState } from 'react';
import './HeartBackground.css';

const HeartBackground = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const heartCount = 20;
    const newHearts = [];
    for (let i = 0; i < heartCount; i++) {
      newHearts.push({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 20 + 10,
        delay: Math.random() * 5
      });
    }
    setHearts(newHearts);
  }, []);

  return (
    <div className="heart-bg">
      {hearts.map(h => (
        <span
          key={h.id}
          className="heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDelay: `${h.delay}s`
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
};

export default HeartBackground;
