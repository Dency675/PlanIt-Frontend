import React, { useState, useEffect } from "react";

import { Typography, Card, CardContent } from "@mui/joy";

interface TimerProps {
  isRunning: boolean;
  timer: string;
}

const Timer: React.FC<TimerProps> = ({ isRunning, timer }) => {
  const [seconds, setSeconds] = useState<number>(0);

  // useEffect(() => {
  //   const seconds = convertToSeconds(timer);
  //   let interval: NodeJS.Timeout;

  //   if (isRunning) {
  //     setSeconds(0); // Reset the timer to 0 if isRunning becomes true
  //   } else {
  //     interval = setInterval(() => {
  //       setSeconds((prevSeconds) => {
  //         if (prevSeconds > seconds) {
  //           return prevSeconds - 1;
  //         } else {
  //           clearInterval(interval); // Clear interval after 10 seconds
  //           return prevSeconds;
  //         }
  //       });
  //     }, 1000);
  //   }

  //   return () => clearInterval(interval);
  // }, [isRunning]);
  // const convertToSeconds = (timeString: string): number => {
  //   const [hours, minutes, seconds] = timeString.split(":").map(Number);
  //   const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  //   return totalSeconds;
  // };
  // const formatTime = (timer: string): string => {
  //   const [hours, minutes, seconds] = timer.split(":").map(Number);
  //   const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  //   const minutesDisplay = Math.floor(totalSeconds / 60);
  //   const remainingSeconds = totalSeconds % 60;
  //   return `${minutesDisplay.toString().padStart(2, "0")}:${remainingSeconds
  //     .toString()
  //     .padStart(2, "0")}`;
  // };

  useEffect(() => {
    const convertToSeconds = (timeString: string): number => {
      const [hours, minutes, seconds] = timeString.split(":").map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    };

    const totalSeconds = convertToSeconds(timer);
    let interval: NodeJS.Timeout;

    if (isRunning) {
      setSeconds(totalSeconds); // Set the timer to the total seconds if isRunning becomes true
    } else {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            clearInterval(interval); // Clear interval when timer reaches 0
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
