import React, { useState, useEffect } from "react";

import { Typography, Card, CardContent } from "@mui/joy";

interface TimerProps {
  isRunning: boolean;
}

const Timer: React.FC<TimerProps> = ({ isRunning }) => {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
  
    if (isRunning) {
      setSeconds(0); // Reset the timer to 0 if isRunning becomes true
    } else {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds < 10) {
            return prevSeconds + 1;
          } else {
            clearInterval(interval); // Clear interval after 10 seconds
            return prevSeconds;
          }
        });
      }, 1000);
    }
  
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  return (
    <Card
      variant="outlined"
      sx={{
        // maxHeight: 40,
        maxWidth: "fit-content",
        mx: "auto",
        mt: 2,
        overflow: "auto",
      }}
    >
      <CardContent>
        <Typography color="danger" level="h3">
          {formatTime(seconds)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Timer;
