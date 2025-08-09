import React, { useEffect, useState } from 'react';

const CountDownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const expiry = new Date(expiryDate);
      const diff = expiry - now;

      if (diff <= 0) {
        setTimeLeft('Expired');
        clearInterval(interval);
        return;
      }

      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  return (
    <p className="text-green-600 font-medium mt-2">
      {timeLeft === 'Expired' ? 'This item has expired.' : `Time left: ${timeLeft}`}
    </p>
  );
};

export default CountDownTimer;
