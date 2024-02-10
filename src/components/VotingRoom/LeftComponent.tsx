import { Box, Typography } from '@mui/joy'
import React, { useState } from 'react'
import UserStories from './UserStories'
import Timer from './Timer'
import CustomButtonGroup from './CustonButtonGroup'
import VotingCards from './VotingCards'



const LeftComponent = () => {
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const startTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };
  const stopTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };
  return (
    <Box> 
     <UserStories/>
     <Timer isRunning={isTimerRunning}/>
     <CustomButtonGroup onStartTimer={startTimer}  stopTimer={stopTimer}/>
     <VotingCards/>
    </Box>
  )
}

export default LeftComponent
