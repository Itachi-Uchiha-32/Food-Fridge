import React, { useEffect, useState } from 'react';

const CountUpTimer = ({ expiryDate }) => {
     const [timeSince, setTimeSince] = useState('');
    
      useEffect(() => {
        const interval = setInterval(() => {
          const now = new Date();
          const expiry = new Date(expiryDate);
          const diff = now - expiry;
    
          if (diff <= 0) {
            setTimeSince('');
            clearInterval(interval);
            return;
          }
    
          const seconds = Math.floor(diff / 1000);
          const minutes = Math.floor(seconds / 60);
          const hours = Math.floor(minutes / 60);
          const days = Math.floor(hours / 24);
    
          const remainingHours = hours % 24;
          const remainingMinutes = minutes % 60;
          const remainingSeconds = seconds % 60;
    
          setTimeSince(
            `${days}d ${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s ago`
          );
        }, 1000);
    
        return () => clearInterval(interval);
      }, [expiryDate]);
    
      if (!timeSince) return null;
    
      return (
        <div className="mt-2 text-red-500 font-medium">
          Expired {timeSince}
        </div>
      );
    };
    

export default CountUpTimer;