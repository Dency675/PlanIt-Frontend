import { Box, Typography } from '@mui/joy'
import React from 'react'
import UserStories from './UserStories'
import Timer from './Timer'
import CustomButtonGroup from './CustonButtonGroup'
import VotingCards from './VotingCards'



const LeftComponent = () => {
  return (
    <Box> {/* Apply background color and padding */}
     <UserStories/>
     <Timer/>
     <CustomButtonGroup/>
     <VotingCards/>
    </Box>
  )
}

export default LeftComponent
