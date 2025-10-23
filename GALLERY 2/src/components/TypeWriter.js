import React, { useEffect, useState } from 'react';

const TypeWriter = () => {
  const name = process.env.REACT_APP_NAME || 'Qaaadir';
  const text1 = `Hi ${name}~`;
  const text2 = "Do you know thaaat!";
  const [i, setI] = useState(0);
  const [text, setText] = useState('');

  useEffect(() => {
    let current = 0;
    let txtArray = [text1, text2];
    let idx = 0;

    const interval = setInterval(() => {
      if(current < txtArray[idx].length){
        setText(prev => prev + txtArray[idx][current]);
        current++;
      } else {
        current = 0;
        setText('');
        idx = (idx+1) % txtArray.length;
      }
    }, 150);
    return () => clearInterval(interval);
  }, [text1, text2]);

  return (
    <div id="typeDiv" style={{position:'fixed', bottom:'100px', width:'100%', textAlign:'center'}}>
      {text}
    </div>
  );
};

export default TypeWriter;
