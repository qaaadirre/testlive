import React, { useEffect, useState } from 'react';

const Timer = () => {
  const dateEnv = process.env.REACT_APP_DATE || '2025-09-11,02-15';
  const [time, setTime] = useState({d:0,h:0,m:0,s:0});

  useEffect(() => {
    const [datePart, timePart] = dateEnv.split(',');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute] = timePart.split('-').map(Number);
    const start = new Date(year, month-1, day, hour, minute, 0);

    const interval = setInterval(() => {
      const now = new Date();
      const t = now - start;

      const d = Math.floor(t / (1000*60*60*24));
      const h = Math.floor((t / (1000*60*60)) % 24);
      const m = Math.floor((t / (1000*60)) % 60);
      const s = Math.floor((t / 1000) % 60);

      setTime({d,h,m,s});
    }, 1000);

    return () => clearInterval(interval);
  }, [dateEnv]);

  return (
    <div id="timer">
      <b>{time.d}</b> Days 
      <b>{time.h}</b> Hours
      <b>{time.m}</b> Minutes
      <b>{time.s}</b> Seconds
    </div>
  );
};

export default Timer;
