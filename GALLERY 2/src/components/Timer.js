import React, { useEffect, useState } from 'react';

const Timer = () => {
  const dateEnv = process.env.REACT_APP_DATE || '2025-09-11,02-15';
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');

  const [datePart, timePart] = dateEnv.split(',');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hour, minute] = timePart.split('-').map(Number);
  const startDate = new Date(year, month - 1, day, hour, minute, 0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = now - startDate;
      setDays(Math.floor(diff / 86400000));
      setHours(String(Math.floor((diff / 3600000) % 24)).padStart(2, '0'));
      setMinutes(String(Math.floor((diff / 60000) % 60)).padStart(2, '0'));
      setSeconds(String(Math.floor((diff / 1000) % 60)).padStart(2, '0'));
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div id="timer">
      <b>{days}</b> Days <b>{hours}</b> Hours <b>{minutes}</b> Minutes <b>{seconds}</b> Seconds
    </div>
  );
};

export default Timer;
