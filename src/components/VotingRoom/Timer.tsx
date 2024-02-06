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
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);

      // Clear the interval after 10 seconds
      setTimeout(() => {
        clearInterval(interval);
      }, 10000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
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
