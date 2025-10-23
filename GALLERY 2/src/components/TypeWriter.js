import React, { useEffect, useState } from 'react';

const TypeWriter = () => {
  const name = process.env.REACT_APP_NAME || 'Qaaadir';
  const text1 = name;
  const text2 = 'Do you know thaaat!';
  const [display1, setDisplay1] = useState('');
  const [display2, setDisplay2] = useState('');
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (step === 0) {
        setDisplay1(text1.slice(0, index + 1));
        setIndex(index + 1);
        if (index + 1 === text1.length) setStep(1);
      } else if (step === 1) {
        setDisplay2(text2.slice(0, index - text1.length + 1));
        setIndex(index + 1);
        if (index - text1.length + 1 === text2.length) setStep(2);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [index, step, text1, text2]);

  return (
    <div id="typeDiv">
      <span>{display1}</span><br/>
      <span>{display2}</span>
    </div>
  );
};

export default TypeWriter;
