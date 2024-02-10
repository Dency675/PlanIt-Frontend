import { Box, Typography } from "@mui/joy";
import React, { useState } from "react";
import UserStories from "./UserStories";
import Timer from "./Timer";
import CustomButtonGroup from "./CustonButtonGroup";
import VotingCards from "./VotingCards";
import io from "socket.io-client";

const LeftComponent = () => {
  const socket = io("http://localhost:3001", {
    transports: ["websocket"],
  });
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const startTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };
  const stopTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };
  return (
    <Box>
      <UserStories />
      <Timer isRunning={isTimerRunning} />
      <CustomButtonGroup onStartTimer={startTimer} stopTimer={stopTimer} />
      <VotingCards />
    </Box>
  );
};

export default LeftComponent;
