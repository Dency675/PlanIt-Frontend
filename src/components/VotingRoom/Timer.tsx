import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent } from "@mui/joy";
import { TimerProps } from "./types";

const Timer: React.FC<TimerProps> = ({ isRunning, timer }) => {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const convertToSeconds = (timeString: string): number => {
      const [hours, minutes, seconds] = timeString.split(":").map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    };

    const totalSeconds = convertToSeconds(timer);
    let interval: NodeJS.Timeout;

    if (isRunning) {
      setSeconds(totalSeconds);
    } else {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            clearInterval(interval);
            return 0;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer, isRunning]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
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
