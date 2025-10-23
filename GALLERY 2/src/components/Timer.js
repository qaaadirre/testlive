import React, { useEffect, useState } from 'react';

const Timer = () => {
  const dateEnv = process.env.REACT_APP_DATE || '2025-09-11,02-15';
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');

  useEffect(() => {
    const [datePart, timePart] = dateEnv.split(',');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute] = timePart.split('-').map(Number);
    const startDate = new Date(year, month - 1, day, hour, minute, 0);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = now - startDate;

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      let h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      let m = Math.floor((diff / (1000 * 60)) % 60);
      let s = Math.floor((diff / 1000) % 60);

      if (h < 10) h = '0' + h;
      if (m < 10) m = '0' + m;
      if (s < 10) s = '0' + s;

      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    }, 1000);

    return () => clearInterval(interval);
  }, [dateEnv]);

  return (
    <div id="timer">
      <b>{days}</b> Days
      <b>{hours}</b> Hours
      <b>{minutes}</b> Minutes
      <b>{seconds}</b> Seconds
    </div>
  );
};

export default Timer;
