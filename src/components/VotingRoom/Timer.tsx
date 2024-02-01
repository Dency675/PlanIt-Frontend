import React, { useState, useEffect } from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import { Typography } from '@mui/joy';


const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);

      // Clear the interval after 10 seconds
      setTimeout(() => {
        setIsRunning(false);
      }, 10000);
    }

    // Cleanup function to clear the interval
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartTimer = () => {
    setSeconds(0); // Reset seconds to 0 before starting
    setIsRunning(true);
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      {/* <h1>{formatTime(seconds)}</h1> */}
      {/* <button onClick={handleStartTimer}>Start Timer</button> */}
      <Card variant="outlined"
      sx={{
      
        maxHeight: 40,
        maxWidth: 60,
        mx: 'auto',
         mt:2,  
        overflow: 'auto',
      }}>
        <CardContent>
<Typography   color="danger"
        level="h3">{formatTime(seconds)}</Typography>
        </CardContent>
      </Card>
    </div>
    
  );
};

export default Timer;
